---
layout: post
title: "What is Functional Programming? Part 5, Bindings"
date: 2010-10-05 11:07
comments: false
categories: [functional programming, F#]
---

<p><em>N.B. this is unrelated to the concept of bindings in Silverlight and WPF.</em></p>  <p>One of my aha moments in learning F# occurred while I was reading <a href="http://www.amazon.com/gp/product/1933988924?ie=UTF8&amp;tag=bluspiconinc-20&amp;linkCode=as2&amp;camp=1789&amp;creative=390957&amp;creativeASIN=1933988924" target="_blank">Real World Functional Programming</a>. Specifically, it was when the meaning of the <code>let</code> keyword really clicked. Before I explain, here are couple of samples:</p>  <pre>let x = 42

let multiply a b = a * b</pre>

<p>I was predisposed to interpret <code>let</code> as merely declaring a variable. but you will recall from <a title="it all begins here" href="/blog/2010/09/06/what-is-functional-programming/">the first post</a> that we made a distinction between working with mutable “variables” and immutable “values”. Functional languages <span title="you should also eschew obsfucation">eschew</span> mutability.</p>

<p>If you look up <code>let</code> in the <a title="let Bindings (F#)" href="http://msdn.microsoft.com/en-us/library/dd233238.aspx" target="_blank">official documentation</a> and you’ll see that it is called a <em>binding</em> and it is very clearly described:</p>

<blockquote>
  <p>A binding associates an identifier with a value or function. You use the let keyword to bind a name to a value or function.</p>
</blockquote>

<p>This also aligns with the concept of <a href="http://en.wikipedia.org/wiki/Referential_transparency_(computer_science)" target="_blank">referential transparency</a> we mentioned way back in the first post. </p>

<p>This may seem obvious or even a subtle distinction to make, but I think it is fundamental in understanding the functional approach.</p>

<p><em>Update: This next part is <strong>not</strong> technically accurate and I do not mean to imply that it is. Rather, this is how my poetic eye has begun to see the code.</em></p>

<p>After this clicked with me, I also to think of</p>

<pre>let x = 42</pre>

<p>as a function with no arguments that returns a value of 42. The distinction between <em>binding to a value</em> and <em>binding to a function</em> blurs (for me). It is the <span title="With all due respect to William Blake, even though I reject the core idea of his poem.">Marriage of Value and Function</span>.</p>

<p>Next stop, pattern matching in F#.</p>