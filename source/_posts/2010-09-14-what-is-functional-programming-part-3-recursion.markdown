---
layout: post
title: "What is Functional Programming? Part 3, Recursion"
date: 2010-09-14 07:26
comments: false
categories: [functional programming, F#]
---

<p>In the <a title="part 1 of What is Functional Programming?" href="/blog/2010/09/06/what-is-functional-programming/">first post in this series</a>, I provided a list of concepts that I found to be characteristic of functional languages. We’ve talked bout the first four so far.</p> <ul> <li><strike>First Class Functions </strike> <li><strike>Higher Order Functions </strike> <li><strike>Pure Functions</strike>  <li><strike>Currying or Partial Application</strike> <a href="/blog/2010/09/09/what-is-functional-programming-part-2-currying/">Covered in the 2nd post.</a>  <li><a title="this is a joke! get it?" href="/blog/2010/09/14/what-is-functional-programming-part-3-recursion/">Recursion</a>  <li>Pattern Matching  <li>Memoization </li></ul> <p><em>Updated: Thanks to <a href="http://bradwilson.typepad.com/" target="_blank">Brad Wilson</a> for recommendation to use !Any() instead of Count()==0.</em></p> <h4>Recursion</h4><pre></pre>
<p>A recursive function is a function that calls itself. To quote Wikipedia,</p>
<blockquote>
<p>“Recursion […] is a method of defining functions in which the function being defined is applied within its own definition” <br>- <a href="http://en.wikipedia.org/wiki/Recursion" target="_blank">en.wikipedia.org/wiki/Recursion</a></p></blockquote>
<p>In general, we programmers are shy about using recursion as it can easily lead to the dreaded <a href="http://en.wikipedia.org/wiki/Stack_overflow" target="_blank">stack overflow</a>. However, recursion is crucial aspect of using functional languages. The problem of overflowing the stack can be avoided using something called <a title="tail call is not to be confused with booty call" href="http://en.wikipedia.org/wiki/Tail-call_optimization" target="_blank">tail recursion</a>. But this post is not about <a title="if you don't know how to use the interweb" href="http://lmgtfy.com/?q=what+is+recursion%3F" target="_blank">explaining what recursion is</a>, rather it is about <em>explaining its role</em> in functional languages.</p>
<p>Recursion is a mechanism for controlling flow. In fact, you’ll hardly ever see a loop when writing functional code; you’ll use recursion instead.</p>
<p>Let’s jump straight into an example. Consider our C# function <em>Reduce</em> from the first post:</p><pre class="c#:nogutter:nocontrols" name="code">static int Reduce(Func&lt;int, int, int&gt; reducer, IEnumerable&lt;int&gt; values)  
{  
    int accum = 0;  
    foreach (var i in values)  
    {  
        accum = reducer(accum, i);  
    }  
    return accum;  
} </pre>
<p>Now, we can define another function that produces the same output, but uses recursion instead of a loop:</p><pre class="c#:nogutter:nocontrols" name="code">static int ReduceF(Func&lt;int, int, int&gt; reducer, IEnumerable&lt;int&gt; values, int seed)
{
    if (!values.Any()) return seed; // #5

    var first = values.First();       // #1
    var remainder = values.Skip(1);   // #2
    var next = reducer(seed, first);  // #3

    return ReduceF(reducer, remainder, next);  //#4
}</pre>
<p>The first thing to note is that <em>ReduceF</em> includes an extra parameter, <em>seed</em>. This new parameter plays a role analogous to the variable <em>accum</em> in the original <em>Reduce</em>. In order to have the same behavior as <em>Reduce</em>, we’d need to pass in an intial value of 0 for <em>seed</em> when calling <em>ReduceF</em>. Don’t get hung up on the extra parameter though. Let’s step through the logic.</p>
<ol>
<li>Skipping over #5, we’ll come back to that. The first real step is to grab the first element in the list. We’ll use the extension method defined in System.Linq to do so. In functional terms, we’d refer to this as the <em>head</em> of the list. 
<li>Next we want to grab the remainder of the list. That is everything remaining after we’ve removed the head. The remainder is called the <em>tail</em>. Depending on the length of the list it might be any number of elements or it might be empty. Again, we’ll use a System.Linq extension method to skip over the first element and return the rest. 
<li>Here we apply our reducer function using the head of the list and the seed value. I named the value <em>next</em> because it will be the seed in our next call to <em>ReduceF</em>. 
<li>This is the recursive call. The reducer function is merely passed through. Notice though that we are passing <em>remainder</em> and <em>next</em>. Each time the function is called, the remainder has one less item. You’ll also see here how the <em>seed</em> parameter takes the place of our mutable <em>accum</em> variable from <em>Reduce</em>. 
<li>Eventually, we’ll pass in a list with no remaining items. When we detect that, we know that <em>seed</em> contains the final reduced value and so we return it. </li></ol>
<p>If the code still doesn’t make sense, spin up a quick console application and execute this</p><pre class="c#:nogutter:nocontrols" name="code">Func&lt;int, int, int&gt; add = (i, j) =&gt; i + j;
var integers = new[] {1, 2, 3, 4, 5};
var sum = ReduceF(add, integers, 0);</pre>
<p>and step through each call to <em>ReduceF</em>. Pay attention to the value of <em>seed</em> during each call as well as the count of elements in <em>values</em>.</p>
<h5>Recursion Helps Us Avoid Mutable Data</h5>
<p>We mentioned before that <em>Reduce</em> is a higher order function. Of course, the same is true for <em>ReduceF</em>. However, <em>ReduceF</em> is also more <em>pure</em>.</p>
<p>In our original <em>Reduce</em>, we maintained the state of our reduction using the variable <em>accum</em>. In each iteration of the loop we mutated the value of <em>accum</em>. At first glance, you might think that we are doing something similar in <em>ReduceF</em>. After all, we are defining even more variables inside of it. However, I added these superfluous variables just for readability. We can easily refactor <em>ReduceF</em> into</p><pre class="c#:nogutter:nocontrols" name="code">static int ReduceF(Func&lt;int, int, int&gt; reducer, IEnumerable&lt;int&gt; values, int seed)
{
    return (!values.Any()) 
        ? seed 
        : ReduceF(reducer, values.Skip(1), reducer(seed, values.First()));
}</pre>
<p>All I did here was to replace the variables with the functions that I was using to set their values. (Well, I also threw in the glorious <a title="I LOVE this guy!" href="http://msdn.microsoft.com/en-US/library/ty67wk28(v=VS.100).aspx" target="_blank">conditional operator</a> too.)</p>
<p>Now we’ve done away with any internal state! Or, well, at least there is no mutable data. Technically we are still have a state, only it is now in the form of our <em>seed </em>parameter. We’ll see why this is vitally important when we begin discussing “why should we care about functional programming”.</p>
<p><em>Check out the comment from Irné Barnard under </em><a href="/blog/2010/09/06/what-is-functional-programming/"><em>the first post</em></a><em> to see an example of Reduce in Lisp.</em></p>
<p><a href="/blog/2010/09/22/what-is-functional-programming-part-4-linq/">Continue to Part 4.</a></p>