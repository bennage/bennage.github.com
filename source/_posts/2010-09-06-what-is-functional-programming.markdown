---
layout: post
title: "What is Functional Programming?"
date: 2010-09-06 23:49
comments: false
categories: [functional programming, F#]
---

<p><em>Disclaimer: I’m still pretty green with functional programming. This is me working out my own understanding.</em></p>  <p>Wikipedia defines Functional Programming (FP) this way:</p>  <blockquote>   <p>“functional programming is a programming paradigm that treats computations as the evaluation of mathematical functions and avoids state and mutable data.” <a href="http://en.wikipedia.org/wiki/Functional_programming" target="_blank">[reference]</a></p> </blockquote>  <p>Let’s break this apart. </p>  <h4>Programming Paradigm</h4>  <p>What’s a “programming paradigm”? It’s a conceptual model for creating programs. The most popular paradigm (at least in tongue) would be <a href="http://en.wikipedia.org/wiki/Object-oriented_programming" target="_blank">Object Oriented Programming</a> (OOP). Other common paradigms are Imperative Programming (I suspect a majority of the world’s code is here) and Declarative (which includes languages like html and xaml). Here’s a list of <a title="because Wikipedia is my only reference" href="http://en.wikipedia.org/wiki/List_of_multi-paradigm_programming_languages#Paradigm_summaries" target="_blank">some other programming paradigms</a>.</p>  <p>It seems to me that most popular languages allow for the use of more than one paradigm. You’ll hear people referring to a language as “multi-paradigm”, this means it has characteristics from more than one model. For example, F# is described as having both functional and object-oriented characteristics. Some paradigms reinforce others. For example, OOP tends to be Imperative and FP tends to be Declarative. </p>  <h4>Computations</h4>  <p>In this definition, I take the term very generically. You can interpret it to mean “stuff the program does”.</p>  <h4>Evaluations of Mathematical Functions</h4>  <p>This is the core concept behind functional languages. In OOP we tend to think of functions as <em>methods that change the state of objects</em>. We have some object, say an <em>order</em>, and we call some method, like<em> submit()</em>, and the method changes the state of our object. Now, in a mathematical function we don’t really have the notion of an object or even a state. Consider a function that calculates (naively) the height of a projectile with respect to time:</p>  <blockquote>   <p>f(<em>t</em>) = -4.9<em>t</em><sup>2</sup> + 19.6<em>t</em> + 3 </p> </blockquote>  <p>With this function, we pass in a value for <em>t</em> and we get back a value representing the height. There is no “state” we are modifying in this function. There’s more to this concept, but let’s come back to it.</p>  <h4>Avoids State and Mutable Data</h4>  <p>This point follows naturally from the last one, however it was very confusing to my object-oriented mind. In fact, FP sounded a somewhat contrary to my understanding of how computers are working at a low level. Despite this, immutability is central to functional programming. In a functional language, such as F#, you don’t work with <em>variables</em>. Instead you work with <em>values</em>. Variables (as their name implies) can <a title="all is flux, nothing stays still" href="http://en.wikiquote.org/wiki/Heraclitus" target="_blank">change</a>, but values are constant. </p>  <h3>Characteristics of Functional Languages</h3>  <p>Even after breaking it apart, the definition is still a bit of an academic one. I found it beneficial to see how these concepts played out into actual features in a language. The following list is my compilation, and I’m certain it’s not exhaustive. These are common features or concepts found in many functional languages.</p>  <ul>   <li>First Class Functions </li>    <li>Higher Order Functions </li>    <li>Pure Functions </li>    <li>Currying or Partial Application </li>    <li>Recursion </li>    <li>Pattern Matching </li>    <li>Memoization </li> </ul>  <p>I’ll begin by discussing the first three items. The remaining will follow in subsequent posts.</p>  <h4>First-Class Functions </h4>  <p>This means that functions are basic types and can be passed around just like integers or strings. In C#, we have a couple of ways to do this. Here’s one example, we’ll create a function and name it “add”. It will accept two integers and returns an integer:</p>  <pre class="c#:nogutter:nocontrols" name="code">Func&lt;int, int, int&gt; add = (i, j) =&gt; i + j;</pre>

<p>This example relies on the type <a href="http://msdn.microsoft.com/en-us/library/bb534647.aspx" target="_blank">Func&lt;T1,T2,TResult&gt;</a> introduced in .NET 3.5 and we set the value using a <a href="http://msdn.microsoft.com/en-us/library/bb397687.aspx" target="_blank">lambda expression</a>.</p>

<p><em>Update: after writing this I found this </em><a href="http://msdn.microsoft.com/en-us/library/dd233158.aspx"><em>description of first-class functions</em></a><em> on MSDN.</em></p>

<h4>Higher Order Functions</h4>

<p>Higher order functions are functions that either take a functions as an argument or return it as a result. Let’s say that we need to write a program that takes a list of integers and then, depending on some user choice, will either add all the numbers together or subtract them. Building on our add function from above, we could create a higher order function in C# like this:</p>

<pre class="c#:nogutter:nocontrols" name="code">static int Reduce(Func&lt;int, int, int&gt; reducer, IEnumerable&lt;int&gt; values)
{
    int accum = 0;
    foreach (var i in values)
    {
        accum = reducer(accum, i);
    }
    return accum;
}</pre>

<p>I named the function “Reduce” since it reduces a list of integer down to a single integer. You can see that the first parameter matches the type of our add function from above. We can call Reduce like this:</p>

<pre class="c#:nogutter:nocontrols" name="code">var integers = new[] {1, 2, 3, 4, 5};
var sum = Reduce(add, integers);</pre>

<h4>Pure Functions</h4>

<p>A function is pure when it has <em>no side effects</em>. This mean that the function does not alter a state or mutate any data. For example, our add function is pure. We calculate a result but we do not modify any existing data. Our other function, Reduce, is pure too… well sort of. It’s pure in the sense that – if you treat it as a black box – then no state is modified. However, internally it does maintain a state. That is, the variable accum is the internal state that we modifying for each iteration of the loop. We’ll see how to remove the state from the Reduce function in another post. </p>

<p>Pure functions are closely tied to the concept of <a href="http://en.wikipedia.org/wiki/Referential_transparency_(computer_science)" target="_blank">Referential Transparency</a>, which says that an expression is considered referentially transparent when it can be replace with it’s value. For example,</p>

<pre class="c#:nogutter:nocontrols" name="code">var sum = add(3,4);</pre>

<p>can be replaced with</p>

<pre class="c#:nogutter:nocontrols" name="code">var sum = 7;</pre>

<p>and there will be no change in meaning.</p>

<p><a title="curry on, I mean, carry on" href="/blog/2010/09/09/what-is-functional-programming-part-2-currying/">Continue on to Currying…</a></p>