---
layout: post
title: "What is Functional Programming? Part 2, Currying"
date: 2010-09-09 08:00
comments: false
categories: [functional programming, F#]
---

<p>In <a title="part 1 of What is Functional Programming?" href="/blog/2010/09/06/what-is-functional-programing/">my last post</a>, I provided a list of concepts that I found to be characteristic of functional languages. We’ve talked bout the first three so far.</p>  <ul>   <li><strike>First Class Functions </strike></li>    <li><strike>Higher Order Functions </strike></li>    <li><strike>Pure Functions</strike> </li>    <li>Currying or Partial Application </li>    <li>Recursion </li>    <li>Pattern Matching </li>    <li>Memoization </li> </ul>  <h4>Currying </h4>  <p><em>Updated based on some feedback from </em><a href="http://codebetter.com/blogs/Matthew.Podwysocki/" target="_blank"><em>Matthew Podwysocki</em></a><em>.</em></p>  <p>Let’s begin with the term “partial application”. This is application in the sense of “applying a function”. Based on my reading thus far, I am inferring that the term “apply” means to resolve the result of a function with a certain set of arguments. Thus, partial application is resolving the result of a function with only a <em>partial</em> set of arguments. The result will be another function that requires fewer arguments that the original function.</p>  <p><em>In light of this, currying is the act of structuring a function so that it can be partially applied.</em></p>  <p>Ok, that’s a pretty naive definition. Here’s what wikipedia says:</p>  <blockquote>   <p>“[Currying] is the technique of transforming a function that takes multiple arguments in such a way that it can be called as a chain of functions each with a single argument.” - <a href="http://en.wikipedia.org/wiki/Currying">en.wikipedia.org/wiki/Currying</a> </p> </blockquote>  <p>In the book <a href="http://www.amazon.com/gp/product/1933988924?ie=UTF8&amp;tag=bluspiconinc-20&amp;linkCode=as2&amp;camp=1789&amp;creative=390957&amp;creativeASIN=1933988924">Real World Functional Programming: With Examples in F# and C#</a> by Tomas Petricek and Jon Skeet (a book that I found immensely helpful), the authors define currying specifically as the act of converting a function with multiple arguments into a function that takes the first argument and returns a function taking the next argument (p140). This definition clarified my reading of the wikipedia definition.</p>  <p>Let’s consider an example based on these definitions. Recall our add function (in C#) from the last post:</p>  <pre class="c#:nogutter:nocontrols" name="code">Func&lt;int, int, int&gt; add = (i, j) =&gt; i + j;</pre>

<p>We can convert this into:</p>

<pre class="c#:nogutter:nocontrols" name="code">Func&lt;int, Func&lt;int,int&gt;&gt; add_c = i =&gt; j =&gt; i + j;</pre>

<p>That might be hard to read, so I’ll break it down a bit. </p>

<p><em>add_c</em> is a function that takes an integer and <em>returns another function</em>. That means add_c is a higher order function. The returned function takes an integer and returns an integer.</p>

<p>If we define Tx as Func&lt;int,int&gt; then would could define <em>add_c</em> as as having the type Func&lt;int,Tx&gt;. Remember that the final parameter is the return type.</p>

<p>In regards to the nested lambda expressions that define add_c, realize that the expression <em>j =&gt; i + j</em> is the actual returned function.</p>

<p>If we were to invoke these functions to add 3 and 4, it would look like this:</p>

<pre class="c#:nogutter:nocontrols" name="code">var sum = add(3,4);
var sum = add_c(3)(4);</pre>

<p>The expression, <em>add_c(3)</em>, actually returns a function. We invoke it (or apply it) immediately providing 4 as an argument. We could <em>partially</em> apply it like this:</p>

<pre class="c#:nogutter:nocontrols" name="code">var add3 = add_c(3); // no second set of parentheses</pre>

<p>or with the type made explicit:</p>

<pre class="c#:nogutter:nocontrols" name="code">Func&lt;int,int&gt; add3 = add_c(3);</pre>

<p>So now, our curried function is <em>partially applied</em> and we can reuse this function as needed. To complete our task of adding 3 and 4 (which I guess would be fully applying the function):</p>

<pre class="c#:nogutter:nocontrols" name="code">var sum = add3(4);</pre>

<p>The type signature can get ugly quickly in C#, not to mention those crazy nested lambda expressions. Also, we could not curry our original add function without rewriting it. Even though we are able to express these functional concepts in C#, they are not elegant. </p>

<h5>Introducing A Bit of F#</h5>

<p>F# has a cleaner syntax and functions are more, um, <em>curriable</em> by default. We could express our add function in F# like this:</p>

<pre>let add (i,j) = i + j</pre>

<p>This is very much equivalent to our original C# add function. However, a more natural way in F# would be this:</p>

<pre>let add_c i j = i + j</pre>

<p>This might seems like a trivial difference, but it is not. To fully understand it, we need to look at the way F# defines the signatures of these two functions.</p>

<p>In F#, the type for <em>add</em> is</p>

<pre>int * int -&gt; int</pre>

<p>The –&gt; indicate that something is returned. Specifically, something with the type designated after the –&gt;. In this case, an integer. Now the thing to the left of the arrow is what is passed into the function. What isn’t obvious though is that <em>int * int</em> is a single thing. That is, it is a single value comprised of two integers. That’s what the * means. It’s a way of separating the constituents of a single value. This single thing is called a <a title="A tuple is a grouping of unnamed but ordered values, possibly of different types." href="http://msdn.microsoft.com/en-us/library/dd233200.aspx" target="_blank">tuple</a>. We won’t dig deep into it yet, but the important thing to understand is that <em>add</em> takes a single value (a tuple consisting of two integers) and returns an integer.</p>

<p>This signature is actually a lot like Func&lt;int,int,int&gt;. <em>(Nitpickers: Yes, we could get very exact and use the new </em><a href="http://msdn.microsoft.com/en-us/library/dd268536.aspx" target="_blank"><em>Tuple&lt;T1,T2&gt;</em></a><em> in .NET 4.0. However, it doesn’t make much of a difference practically.)</em></p>

<p>Now, let’s move on to <em>add_c.</em> The signature for it is</p>

<pre>int -&gt; int -&gt; int</pre>

<p>Look back at the wikipedia definition for currying. In particular consider “<em>a chain of functions each with a single argument</em>”.</p>

<p>Okay, now compare this to the C# definition of add_c with the nested lambdas:</p>

<pre>i =&gt; j =&gt; i + j</pre>

<p>There are oddly similar, aren’t they?</p>

<p>Now I said to interpret the –&gt; as meaning that <em>whatever comes after it is returned</em> and that <em>whatever comes before is the input</em>. If that is so, then we can understand</p>

<pre>int -&gt; int –&gt; int</pre>

<p>as meaning that the function takes a single integer and then returns a function with a signature of</p>

<pre>int –&gt; int</pre>

<p>Are you thoroughly confused? Don’t be ashamed. It takes time to sink in.</p>

<p>What this means is that our F# version of <em>add_c</em> really does have the same type that we expressed in C#. That is Func&lt;int, Func&lt;int,int&gt;&gt;. However, it’s easier on the eyes (and fingers).</p>

<p>Ultimately, this means that the natural way of writing functions in F# makes them very easy to curry. </p>

<p>Now why is this helpful? Well, we can talk about that later.</p>

<p><a title="the next in series" href="http://devlicio.us/blogs/christopher_bennage/archive/2010/09/14/what-is-functional-programming-part-3-recursion.aspx" target="_blank">Continue on to Recursion…</a></p>