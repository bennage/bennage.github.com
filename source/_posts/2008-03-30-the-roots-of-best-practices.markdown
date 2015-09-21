---
layout: post
title: "The Roots of Best Practices"
date: 2008-03-30 1:55
comments: false
categories: [design patterns, software architecture, best practices]
---

{% img right /images/posts/roots.jpg %}

I've been asked about best practices and good design several times over the last few months. A few questions have been from students, or newcomers to .NET, and I have found their questions very insightful. They ask questions I remember asking myself. One good example was "I know I should separate my app into three layers, but how should I do it?"

I'm rather to sensitive to the idea of "answering the wrong question". I believe that it's easy to do that when talking about best practices.  My intention with this post is build a foundation for discussing good design. A starting point to make sure we are solving the right riddle. I certainly don't consider myself a [master](http://www.pragprog.com/the-pragmatic-programmer) on this topic, but I do have a lot of thoughts.

## Acknowledging My Bias

I'm a fan of [Object Orient Programming](http://en.wikipedia.org/wiki/Object-oriented_programming), [Domain-Driven Design](http://en.wikipedia.org/wiki/Domain-driven_design), [Design Patterns](http://en.wikipedia.org/wiki/Design_patterns), [Test Driven Development](http://en.wikipedia.org/wiki/Test_Driven_Development), and [agile methodologies](http://en.wikipedia.org/wiki/Agile_software_development). I use a lot of [open source software](http://www.ohloh.net/accounts/10381/stacks/14905). Foremost, I like to think that I am pragmatic.   I'm motivated by getting stuff done.

## The Point of Best Practices

There are a long list of principles out that are generally acknowledged as best practices. They range from generalities like "your code should be well commented" to very specific and named rules such as the [Liskov substitution principle](http://en.wikipedia.org/wiki/Liskov_substitution_principle). Regardless of the type, I think it's important to know why a given principle is better than its alternatives.

I'll use the [Law of Demeter](http://en.wikipedia.org/wiki/Law_Of_Demeter) (LoD) as an example. Overly simplified, the law says that an object should only invoke methods that it owns.  In other words, you'll break the law with something.child.Method() whereas something.Method() does not. 

Why is LoD good? One quick answer is that you never know when something.child might be null, and applying LoD helps you avoid the nasty [NullReferenceException](http://msdn2.microsoft.com/en-us/library/system.nullreferenceexception.aspx). Wikipedia has a nice summary the benefits:

<blockquote>

The advantage of following the Law of Demeter is that the resulting software tends to be more maintainable and adaptable. Since objects are less dependent on the internal structure of other objects, object containers can be changed without reworking their callers.

</blockquote>

Now we are approaching the real heart of the matter, we want software that is easy to maintain and easy to extend. LoD promotes those values. In facts, most of the generally accepted principles are meant to produce software that is _maintainable and extensible_. Here is my [Grand Unification Theory](http://en.wikipedia.org/wiki/Grand_unification_theory) of software best practices: the guiding, or root, principles are **Maintainability** and **Extensibility**. (These two are close cousins, and you might arguably combine them.)

Okay, so maybe there are other guiding principles as well, such as **Scalability** and **Performance**. I'd even add that the most important root principle is **Value**. By Value, I mean that the software needs to do _what the user wants done_.  So maybe, Maintainability and Extensibility are just like electromagnetism and the weak nuclear force of good software design.

## The Root of the Matter

Now, let's deconstruct further.  Why do we care about Maintainability and Extensibility? We care because they result in _reduced_ costs.  The bulk of cost with custom software is _not_ building it, but [maintaining it](http://users.jyu.fi/~koskinen/smcosts.htm). If you are in business, reduced costs equals more money; if you are a hobbyist or open source developer then reduced costs means getting to the desired result in less time.  That's the bottom line: _time and money_. We employ best practices to save ourselves time and money.

Okay, well, nothing new here. You probably already knew this.  I emphasize it though because I've found that "best practices" have a tendency to degrade into a set of arbitrarily applied rules, enforced without exception, irrespective of whether or not they are useful. A great example is "always comment your code". The intention of this rule is improve maintainability.  We've all seen the end result.

	//open the file 
	FileStream stream = File.Open(pathToFile, FileMode.Open);

Does this improve maintainability? Perhaps if you can't read C#, but even then it seems unlikely. Does one extraneous little comment hurt? Not by itself. A poppy flower is beautiful, a thousand poppies is dangerous. If 50% of your source is extraneous comments, it's nothing but noise and it's reducing maintainability.

## My Point

Let's take a look at the question I was asked again:

"I know I should separate my app into three layers, but how should I do it?"

To answer this correctly, we need to start with the motivation for layering an application in the first place. "Three-tier architecture" has a good intention, just as "well commented code" does. However, the principle has can easily be lost in the arbitrary application of the rule.

## Epilogue

For more reading on this topic, check out the [series of posts over at Los Techies on SOLID Principles](http://lostechies.com/blogs/chad_myers/archive/2008/03/07/pablo-s-topic-of-the-month-march-solid-principles.aspx). There is some great discussion in the comments too.

What do you think?
