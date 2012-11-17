---
layout: post
title: "A Brief Introduction to WinJS"
date: 2012-08-01 16:42
comments: true
categories: [JavaScript, WinJS, Windows 8, HTML]
---

I'm a few weeks into my [latest p&p project](http://hilojs.codeplex.com/). We're exploring how to build Windows 8 applications with HTML and JavaScript. I'll refer to these apps as "WinJS apps".

This post is a very brief overview and introduction to some terminology related to WinJS. It's my personal take and it's certainly not official. All of the official documentation can be found at the [Dev Center](http://msdn.microsoft.com/windows/apps/).

## What is a WinJS app?

In my recent expereince there is often some confusion about Windows 8 apps in general, so let's begin there. 

Windows 8 apps are similar to what you would find on Windows Phone, iOS, or Android, in that they are sandboxed and they have to declare to user when they use more _advanced_ APIs (like location awareness for example). The only way for users to get Windows 8 apps is through the [store](http://msdn.microsoft.com/library/windows/apps/br230836).

Windows 8 apps can be built with C++ and XAML, C#/VB.NET and XAML, and JavaScript and HTML. All three choices have access to the [Windows Runtime](http://msdn.microsoft.com/en-US/library/windows/apps/br211377). It's the consolidated API was interacting with the OS.

When using JavaScript, the Windows Runtime is available as the global object `Windows`.

In addition to the Windows Runtime (which I sometimes personally call WinRT), there is the _Windows Library for JavaScript_ or _WinJS_. This is different from WinRT. It's pure JavaScript and only availabe to JavaScript apps. It's automatically referenced when you create a new project. It is available as the global object `WinJS`.

WinJS includes lots of helpful bits:

* an implementation of [CommonJS Promises/A](http://wiki.commonjs.org/wiki/Promises/A).
* some advanced UI controls
* DOM utilities
* navigation and xhr helpers
* and more

Technically, you don't _have_ to use WinJS. If you wanted to, you could ignore it. In practice though, it can be pretty useful.

Finally, you can develop with standards-based HTML, CSS, and JavaScript without worrying about cross-browser issues. For example, I haven't felt the need for jQuery because I can just use [`document.querySelector`](http://www.w3.org/TR/selectors-api/) without fear. 

Likewise, don't go looking through WinJS for standard controls; just use the native HTML controls that you already know and love.