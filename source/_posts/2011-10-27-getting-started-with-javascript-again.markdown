---
layout: post
title: "Getting Started with JavaScript... again"
date: 2011-10-27 11:56
comments: true
categories: [javascript]
---

I've alluded before that I did a large chunk of my development in some form of [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript) for the first ten years of my professional life. Now, JavaScript is cool again for the first time. Everyone wants to learn it.

So, like me, you probably already kinda maybe knew JavaScript. But times have changed and now it's a serious language. How do you get up to speed? Here's what I did.

## Read Some Books

### [Eloquent JavaScript](http://eloquentjavascript.net/)

This is probably the best book to start with if you are _really_ rusty (which also includes plain ol' _new_ as well). Personally, I found the book a bit tedious and I didn't quite finish.

Did I mention that it's free?

### [JavaScript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do)

An essential read for modern JavaScript development. It's short and terse and easy to read. Douglas Crockford is highly regarded, though he can get occasionally [harsh some mellow](http://anton.kovalyov.net/2011/02/20/why-i-forked-jslint-to-jshint/). He's the <strike>supreme overlord</strike> author of [JSLint](http://jslint.com/), a nifty tool that's useful for detecting the _not so good_ parts in your own JavaScript. The information in this book is foundational and I recommend reading it soon.

### [JavaScript Patterns](http://shop.oreilly.com/product/9780596806767.do)

This book is awesome. Seriously. Someone should give [Stoyan](http://twitter.com/#!/stoyanstefanov) a trophy. It deals with higher level patterns in your JavaScript applications. Be sure to read it after you become comfortable with core language concepts.

### [High Performance JavaScript](http://shop.oreilly.com/product/9780596802806.do)

I haven't actually read this one yet, but it's on my list. I have however heard [Nicholas C. Zakas](http://twitter.com/#!/slicknet) speak and from that I suspect that the content will be excellent.

## Staying in Touch

I've found it a little difficult to stay abreast of what's having in the JavaSCript community.

### [JavaScript Weekly](http://javascriptweekly.com/)

The weekly podcast and its associated newsletter have been excellent. Highly recommended.

### On the Interwebz

Start with [Elijah Manor](http://www.elijahmanor.com/). Aside from just being a good guy, Elijah is a perpetual fountain of information. So, you'll want to [follow him](http://twitter.com/#!/elijahmanor) on Twitter. _Caveat: Following Elijah is drinking from a firehouse._

I also recommend:

* [Matthew Podwysocki](http://twitter.com/#!/mattpodwysocki) A fellow 'softie who is aware of all things JavaScripty.
* [Stoyan Stefanov](http://twitter.com/#!/stoyanstefanov) from Yahoo
* [John Resig](http://twitter.com/#!/jeresig) of jQuery fame
* [Nicholas C. Zakas](http://twitter.com/#!/slicknet)
* [Rey Bango](http://twitter.com/#!/reybango)
 * [script junkies {}](http://msdn.microsoft.com/en-us/scriptjunkie/default.aspx)

 I'm sure there are many other resources. Please add additional ones in the comments.

## Some Thoughts

Here's a few thoughts about learning JavaScript. Take them or leave them, but these are my current opinions.

### Prototypes, not classes

JavaScript is not a classical language (that's fancy talk for 'class based' language). Sometimes it looks classical, and may even taste a little classical, but really it's not. Don't try to force it. I think you'll be happier and you'll write [happy little functions](http://bobross.com/) if you embrace it's prototypical nature. If you don't understand the difference, that's okay. You will after reading the books I listed above.

### Don't confuse the language and the environment
We mostly know JavaScript through browser development. As such, we've generally confused the inside evil of the [DOM](http://www.w3.org/DOM/) with JavaScript itself. Or at least we did before jQuery rescued us.

However the browser isn't the only environment. For the troglodytes amongst us, you can use [Node.js](http://nodejs.org/) and write JavaScript on the server.

### Leverage the natural strengths

Each of these concepts deserves a post (or more) on their own, so I won't go into details. 

* It's a _dynamic_ language. JavaScript is squishy and that's good.
* It has many [_functional_](/blog/2010/09/06/what-is-functional-programming/) characteristics.
* It favors [_asynchronous patterns_](http://msdn.microsoft.com/en-us/library/windows/apps/hh464930%28v=VS.85%29.aspx).

### K.I.S.S.

Don't mix trying to learn JavaScript with trying to learn a framework or library. My initial attempt to learn Ruby was thwarted by Rails. I know that some folks will disagree with me on this point. Here are my reasons:

* It's likely that you'll encounter many new concepts _just learning_ the language.
* Sometimes it's difficult to discern between a language feature and a framework feature.
* Many frameworks embody an opinions that can (unintentionally) mislead you about the language (e.g., many frameworks attempt to make JavaScript classy).

Now, having said that, I do recommend exploring the vast diversity of frameworks and libraries out there after you've become comfortable with JavaScript.

## Some Resource

* [JSHint](http://www.jshint.com/about/) a community-driven port of the aforementioned JSLint. It's groovy. There's an [extension for Visual Studio 2010](http://jslint4vs2010.codeplex.com/). I also like to use it with the sublime [Sublime Text 2](http://www.sublimetext.com/download) by way of the the [SublimeLinter package](https://github.com/Kronuz/SublimeLinter).

* [jsfiddle](http://jsfiddle.net/) and [jsbin](http://jsbin.com) are two cool little online playgrounds for sharing bits of JavaScript.

* [NodeJS](http://nodejs.org/) can be very good for playing around with JavaScript. Be careful though of trying to learn all about Node at the same time. Here's a [Windows-friendly quick start](/blog/2011/07/28/node-js-on-windows/).

What else can you add?