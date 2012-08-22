---
layout: post
title: "WinJS: Unpacking Promises"
date: 2012-08-21 12:02
comments: true
categories: [JavaScript, WinJS, Windows 8, async]
---

N.B. _If you don't know anything about WinJS, take a moment to peruse [this primer](http://dev.bennage.com/blog/2012/08/01/a-brief-introduction-to-winjs/). Also, the context of this post is the [p&p Hilo project](http://hilojs.codeplex.com/)._

_In particular, you should read about promises and [asynchronous programming in JavaScript](http://msdn.microsoft.com/en-us/library/windows/apps/hh700330.aspx). Derick Bailey also wrote [about promises](http://lostechies.com/derickbailey/2012/07/19/want-to-build-win8winjs-apps-you-need-to-understand-promises/) on his blog._

## A Bit About Promises

A promise is an object. It is not a function and it is not the _value_ returned from the async operation. To get to the value, you need to call the `then` method on the promise object. You pass a callback function as an argument to `then`. The promise invokes the callback and passes the value you're interested in into the callback. Clear as mud, right?

Here's a fictitious example that pretends like calculating a random number requires an async operation:

	getRandomNumberAsync().then(function(someNumber) { 
		// do stuff with `someNumber`
	});

The call to `then` returns a promise itself. You could do this:

	getRandomNumberAsync().then(function(someNumber) { 
		// do stuff with `someNumber`
	}).then(function() {
		// more stuff
	});

Or written another way:

	var afterRandomNumber = getRandomNumberAsync().then(function(someNumber) { 
		// do stuff with `someNumber`
	});

	afterRandomNumber.then(function() {
		// more stuff
	});

The two example above are the _same_.

Now if our callback function returns a value, that value is passed along to the next promise's callback.

	getRandomNumberAsync().then(function(someNumber) { 
		return someNumber + 1;
	}).then(function(someNumberPlusOne) {

	});

This allows you to easily chain promises, piping the output of one into the next callback in the chain.

    getRandomNumberAsync().then(function(someNumber) { 
        return someNumber + 1;
    }).then(function(someNumberPlusOne) {
        return someNumberPlusOne + 1;
    }).then(function(someNumberPlusTwo) {
        
    });

Of course, this is a bit silly when then operations are not async. It's more interesting when the thing you return from the callback is also a promise. Let's make a another fictitious async function, this time one that needs input:

    getRandomNumberHigherThanAsync(10).then(function(someNumberOverTen){
        // do something with `someNumberOverTen`
    });

Now we can do this:

    getRandomNumberAsync().then(function(someNumber) { 
        return getRandomNumberHigherThanAsync(someNumber);
    }).then(function(something){
        // What will `something` be?
    });

In the example above, you might think that `something` will be the promise returned from `getRandomNumberHigherThanAsync`. It's not. Instead, it's the _value_ that `getRandomNumberHigherThanAsync` produces and would pass into its callback. _Returning another promise from within the callback for a promise is a special case._ Though it's probably the most frequent case.

## Putting Promises Together

Now let's pretend we have a set of functions that all return promises, named `A` through `E`. If we wanted to execute them in sequence, passing the results from one to the next, we _could_ write it this:

    A().then(function(a) {
        return B(a).then(function(b){
            return C(b).then(function(c){
                return D(c).then(function(d){
                    return E(d);
                });
            });
        });
    });

Yeah, that hurts my eyes too. Though I found that I was writing my code _just like this_ at first.

However, we should realize that `A.then()` returns a promise and that that promise completes only when all of the nested promises have completed. If we wanted to execute a new function `F` after all these steps, we could do it like this:

    var waitForAllToBeDone = A().then(function(a) {
        return B(a).then(function(b){
            return C(b).then(function(c){
                return D(c).then(function(d){
                    return E(d);
                });
            });
        });
    });

    waitForAllToBeDone().then(function(e){
        return F(e);
    });

However, that last inline callback has the same signature as `F`. That means that we can simplify to this:

    waitForAllToBeDone().then(F);

Now we realize that what we did for `F` is also true for `E`. In fact, it is true for the entire chain. We can simplify that nasty nested beast to:

	A().then(B).then(C).then(D).then(E).then(F);

Much nicer.

## A Real Example

Let's bring this home. While working on [HiloJS](http://hilojs.codeplex.com/) we needed to copy an image thumbnail to a new file. It sounds simple, but it requires the following steps:

1. Open a file that we will write _to_. We'll call this the **target** file.
1. Get the thumbnail image from another file. We'll call this the **source** file. (WinRT creates the thumbnail for us from the source.)
1. Copy the stream from the thumbnail source to the target file's input stream.
1. Flush the output stream.
1. Close both the input and the output stream.

(Actually we don't really care about the order of the first two steps. They could be switched.)

Our initial implementation looked liked this:

    function writeThumbnailToFile(sourceFile, targetFile) {

        var whenFileIsOpen = targetFile.openAsync(fileAccessMode.readWrite);

        return whenFileIsOpen.then(function (outputStream) {

            return sourceFile.getThumbnailAsync(thumbnailMode.singleItem)).then(function (thumbnail) {
                var inputStream = thumbnail.getInputStreamAt(0);
                return randomAccessStream.copyAsync(inputStream, outputStream).then(function () {
                    return outputStream.flushAsync().then(function () {
                        inputStream.close();
                        outputStream.close();
                    });
                });
            });
        });
    }

Then we had a code review with the always helpful Chris Tavares. He pointed us in a more excellent direction. We were able to change the code to this:

    function writeThumbnailToFile(sourceFile, targetFile) {

        var whenFileIsOpen = targetFile.openAsync(fileAccessMode.readWrite);
        var whenThumbailIsReady = sourceFile.getThumbnailAsync(thumbnailMode.singleItem);

        var whenEverythingIsReady = WinJS.Promise.join([whenFileIsOpen, whenThumbailIsReady]);

        var inputStream, outputStream;

        whenEverythingIsReady.then(function (args) {
            outputStream = args[0];
            var thumbnail = args[1];
            inputStream = thumbnail.getInputStreamAt(0);
            return randomAccessStream.copyAsync(inputStream, outputStream);

        }).then(function () {
            return outputStream.flushAsync();

        }).then(function () {
            inputStream.close();
            outputStream.close();
        });
    }

A couple of notable differences:

1. In the first implementation, we passed along some values via the closure (e.g., `inputStream` and `outputStream`). In the second, we had to declare them in the outer scope because there was no common closure.

1. In the first implementation, we chained `targetFile.openAsync` and `sourceFile.getThumbnailAsync`, but we didn't really need to. We made the real relationship more explicit in the second using `WinJS.Promise.join`. That mean the values of these two promises came to us in an arrays (we named it `args`).

## Summary

Understanding how promises can be composed really helped us to make the code more readable. It can be difficult to wrap your head around the way they work, but (like it or not) promises are an essential part of writing apps with WinJS.

## Fictitious Functions Implementations

    // an example implementation of getRandomNumberAsync

    function getRandomNumberAsync() {
    	return WinJS.Promise.as(Math.random());
    }

    // an example implementation of getRandomNumberHigherThanAsync

    function getRandomNumberHigherThanAsync(minimum) {
        var someNumber = Math.random() + minimum;
        return WinJS.Promise.as(someNumber);
    }