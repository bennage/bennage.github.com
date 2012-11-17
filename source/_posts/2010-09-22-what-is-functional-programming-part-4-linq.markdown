---
layout: post
title: "What is Functional Programming? Part 4, Linq"
date: 2010-09-22 07:30
comments: false
categories: [functional programming, F#]
---

<p>If you are new to this series, <a href="/blog/2010/09/06/what-is-functional-programming">start here</a>.</p>  <p>Before I move on to the two remaining items on my list (pattern matching and memoization), I’d like to take a brief excursion and talk about about Linq in C#. I never said it explicitly, but I have been writing this series for C# developers. I do plan to show you more F#, but while reading the aforementioned <a href="http://www.amazon.com/gp/product/1933988924?ie=UTF8&amp;tag=bluspiconinc-20&amp;linkCode=as2&amp;camp=1789&amp;creative=390957&amp;creativeASIN=1933988924" target="_blank">Real World Functional Programming</a> I found it very helpful to first learn these concepts in a familiar language.</p>  <h3>Linq is Functional</h3>  <p>You might have heard it mentioned that Linq was born from the influence of functional languages. Let’s take a moment and connect some dots.</p>  <p>It <a title="regarding recursion" href="/blog/2010/09/14/what-is-functional-programming-part-3-recursion">the last post</a>, I gave you a functional version of our Reduce function. However, both the <a href="http://gist.github.com/575854" target="_blank">imperative version</a> and the <a href="http://gist.github.com/575857" target="_blank">functional version</a> were tied to working just with integers.</p>  <p>Now you might have notice that these specific implementations can be abstracted into the concept of <em>reducing a list of items of a certain type to a single item of the same time</em>.</p>  <p>Starting with our imperative version, we just need to replace all of the <em>int</em>s with a generic type parameter:</p>  <pre class="c#:nogutter:nocontrols" name="code">// generic imperative version
static T Reduce&lt;T&gt;(Func&lt;T, T, T&gt; reducer, IEnumerable&lt;T&gt; values)
{
    T accum = default(T);
    foreach (var i in values)
    {
        accum = reducer(accum, i);
    }
    return accum;
}</pre>
Well, we’d also have to initialize the <em>accum</em> variable a bit differently. 

<p>A generic version of the functional one is </p>

<pre class="c#:nogutter:nocontrols" name="code">static T ReduceF&lt;T&gt;(Func&lt;T, T, T&gt; reducer, IEnumerable&lt;T&gt; values, T seed)
{
    if (!values.Any()) return seed;

    var first = values.First();
    var remainder = values.Skip(1);
    var next = reducer(seed, first);

    return ReduceF(reducer, remainder, next);
}</pre>

<p>or even better</p>

<pre class="c#:nogutter:nocontrols" name="code">static T ReduceF(Func&lt;T, T, T&gt; reducer, IEnumerable&lt;T&gt; values, T seed)   
{   
    return values.Any()    
        ? ReduceF(reducer, values.Skip(1), reducer(seed, values.First()))    
        : seed;   
}  </pre>

<p>Now, in C# would could save even more typing by implementing our Reduce using Linq</p>

<pre class="c#:nogutter:nocontrols" name="code">static T ReduceLinq&lt;T&gt;(Func&lt;T, T, T&gt; reducer, IEnumerable&lt;T&gt; values)
{
    return values.Aggregate(default(T), reducer);
}</pre>

<p>Of course, after we do, we realize that our Reduce function <em>is the same as</em> the Aggregate extension method that already exists in Linq!</p>

<p>You see, if you are using Linq then you are already utilizing functional language concepts.</p>

<p><em><strong>N.B.</strong> The implementations of ReduceF are not something that you’d want to use in practice. Even though I followed a </em><a href="http://en.wikipedia.org/wiki/Tail_call" target="_blank"><em>tail call</em></a><em> style for the recursion, you’d still end up with a stack overflow in C#.</em></p>

<h4>Removing the Extra Parameter</h4>

<p>Of course, the <a href="http://gist.github.com/575857" target="_blank">functional version</a> <em>ReduceF</em> still has that extra parameter that we named <em>seed</em>. We’d like to get rid of that. </p>

<p>The approach that I have frequently seen, is to wrap the recursion function in another function that provides the initial state. In other words, we’d leave ReduceF as it is (though we’d likely make it private) and then we’d add a new function that looked like this:</p>

<pre class="c#:nogutter:nocontrols" name="code">static T ReducePublic&lt;T&gt;(Func&lt;T, T, T&gt; reducer, IEnumerable&lt;T&gt; values)
{
    return ReduceF&lt;T&gt;(reducer, values, default(T));
}</pre>

<h3></h3>

<p><em>Update: there is some good discussion about removing the extra parameter in the </em><a href="/blog/2010/09/14/what-is-functional-programming-part-3-recursion/"><em>comments of part 3</em></a><em>. As mentioned there, the primary reason for doing it this way is an academic desire to preserve the tail call form.</em></p>

<p>In our <a href="/blog/2010/10/05/what-is-functional-programming-part-5-bindings/">next post</a>, we’ll start digging a little deeper into F#.</p>