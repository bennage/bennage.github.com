---
layout: post
title: "Node.js on Windows (or JavaScript for the backend)"
date: 2011-07-28 04:04
comments: true
categories: [javascript,nodejs]
---

### What is Node?
The simplest answer, albeit a _simplistic_ answer, is that Node (or Node.js) is JavaScript on the server. Actually, it’s a more than just that, but you can read about the _more_ in [other places](http://www.nodejs.org/#about "Official NodeJS site"). This is a good enough answer for us n00bs.

Unless you’ve been living in in cave, you might have noticed that JavaScript is all the rage now. It’s the new [assembly language](http://www.hanselman.com/blog/JavaScriptIsAssemblyLanguageForTheWebPart2MadnessOrJustInsanity.aspx "the assorted ramblings of Hanselman") of the Web. (It’s even for the [enterprise](http://enterprise-js.com/ "this isn't serious btw").) With Node, you can now take that webby clienty goodness to your server applications.

The reason I’m brining all this up is because there’s now a version of Node.js for Windows. It’s currently the unstable release only, but it’s a sign of coolness to come. Furthermore, Microsoft has partnered with Joyent and Rackspace to make it happen. You can read about it [here](http://blogs.msdn.com/b/interoperability/archive/2011/06/23/microsoft-working-with-joyent-and-the-node-community-to-bring-node-js-to-windows.aspx "Microsoft and Node") and [here](http://blog.nodejs.org/2011/06/23/porting-node-to-windows-with-microsoft%E2%80%99s-help/ "More about Node and Windows"). The ultimate goal (according to the posts) is for Node.js to run on both Windows and Azure.

Now, I want to be clear too, since I have been [newly assimilated](http://devlicious.com/blogs/christopher_bennage/archive/2011/04/06/a-punctuated-life.aspx "moving to Microsoft"), Node is not a Microsoft product..

### Tutorial
I want to show you how easy it is to try out Node.

First, [download the exe](http://www.nodejs.org/#download). I grabbed v0.5.2.

Next, run it. Yeah, it’s that easy. It used to be [way harder](http://www.lazycoder.com/weblog/2010/03/18/getting-started-with-node-js-on-windows/ "Scott's just this guy you know").

You’ll be presented with a prompt and you can start writing JavaScript in paradigm-shifting [REPL](http://en.wikipedia.org/wiki/REPL "read-eval-print loop").

{% img screenie /images/posts/node-repl.png %}

Now, let’s say you want to create a web server. We’ll begin by yanking the ‘hello world’ snippet from [nodejs.org](http://www.nodejs.org/ "hello world!").

``` javascript
var http = require('http');  
http.createServer(function (req, res) {  
  res.writeHead(200, {'Content-Type': 'text/plain'});  
  res.end('Hello World\n');  
}).listen(8124, "127.0.0.1");  
console.log('Server running at <a href="http://127.0.0.1:8124/'">http://127.0.0.1:8124/'</a>);  
```

I saved this snippet into a file named `server.js`. Then from a PowerShell prompt, I ran

	.node.exe .\server.js

{% img screenie /images/posts/node-server.png %}

Next, I hit http://localhost:8124 with a browser and I got exactly what you’d expect.

{% img screenie /images/posts/hello-world-node.png %}

Now you know enough to be dangerous.

Of course, you have to restart Node when you make changes to the file (use Ctrl + C). I’ll show you how I got around that in another post.

Have fun!