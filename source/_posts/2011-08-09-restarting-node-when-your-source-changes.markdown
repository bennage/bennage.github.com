---
layout: post
title: "Restarting Node.js When Your Source Changes"
date: 2011-08-09 4:47
comments: true
categories: [development tools, web, javascript, .NET, tips & tricks, nodejs]
---

I’m lazy. I remember reading somewhere that that was a desirable trait to have in a developer. I’m not sure where though, and honestly it’s just too much effort to bingle it. This laziness came to the forefront recently as I was playing with Node.

In my last post, I showed you how to spin up a quick web app using Node. As I was playing with this app, I found that I had to restart Node every time I made a change to the source. This meant I had to switch to the console, stop the process, start the process and THEN refresh my page to see the effect of my change. Too much work I say.
<!--more-->
So I wondered if Node had something built-in for monitoring changes to the file. I didn’t see anything useful from `node.exe –help` and researching it on the Web is just so tedious, so I decided to write my own solution.

### Looking for Some Change
In .NET, there is a class `System.IO.FileSystemWatcher`. With an instance of this class you can monitor the files in a directory for changes. I set it up like this:

``` csharp 
var watcher = new FileSystemWatcher(); 
watcher.Path = @"C:\node.js\stuff"; 
watcher.NotifyFilter = NotifyFilters.LastWrite | NotifyFilters.FileName; 
watcher.Filter = "*.js"; 

watcher.Changed += Changed; 
watcher.Created += Changed; 
watcher.Deleted += Changed; 
watcher.Renamed += Renamed; 

// Begin watching 
watcher.EnableRaisingEvents = true;
```

The `NotifyFilter` property allows you to specify the sort of changes you are interested in. You can check out the full list here. You’ll also notice that I used the `Filter` property to narrow it down just to js files.

Next, there are a number of events to wire to respond to changes. I reused the same handler as much as I could because I always want to do the same thing: restart Node. It’s also not entirely obvious how these events relate to `NotifyFilter`, but I didn’t dig too deep into that. (I’m lazy remember.)

It’s also important to set `EnableRaisingEvents`. If you don’t, then the (guess what) no event are raised.

### Kill, Kill, Kill
Now whenever a significant change occurs, it’ll be time to restart Node. For this I used `System.Diagnostics.Process`. This is a bit of a tricky classs, with a number of not-so-obvious knobs to turn.

First, I’ll need to get a reference to the Node process. I noticed in Task Manager that the process name was “node”. So I used `Process.GetProcessesByName("node")`.  

This returns an array of processes, and so I did this:
``` csharp
var matches = Process.GetProcessesByName("node");  
  
matches.ToList().ForEach(match => {  
    Console.WriteLine("attempting to close node.js [" + match.Id + "]");  
    match.Kill();  
    match.WaitForExit(300); // it shouldn’t take this long, we’re just being cautious  
    Console.WriteLine("successfully closed");  
});
```

Admittedly, this is hitting it with a hammer. It’s okay, because this is just a quick and dirty helper tool for me and not a production application.

After killing the process, I’ll want to start another one. Now, I don’t care for another console window to pop up each time I restart, instead I’d like to simply redirect the input and output to my little helper app. This can be a little tricky, and I had to do some experimentation to find the right combination in order keep things from hanging. If you find it misbehaving, I recommend searching StackOverflow. I found several useful questions there. One of the keys that came up more than once was capturing and closing the stream for the standard input.

``` csharp
var start = new ProcessStartInfo();  
start.FileName = @"C:\node.js\node.exe";  
// start the process directly, as opposed to going thu the shell  
start.UseShellExecute = false; 
// we don’t want a new window  
start.CreateNoWindow = true; 
start.RedirectStandardOutput = true;  
start.RedirectStandardInput = true;  
start.Arguments = Path.Combine(@"C:\node.js\stuff", @"server.js");  
  
var node = new Process();  
node.EnableRaisingEvents = true;  
node.OutputDataReceived += OutputHandler;  
node.StartInfo = start;  
node.Start();  

// refresh the metadata stored in the instance of Process   
node.Refresh();
Console.WriteLine(node.ProcessName);  
Console.WriteLine("[" + node.Id + "] node.exe started");  
  
// close the input, we won't use it  
var input = node.StandardInput;  
input.Close();  
  
// and now for the output  
node.BeginOutputReadLine();  
```

First we create an object that contains the configuration for starting an instance of Node. Notice that we are passing in the server.js file as an argument.

Also note that after starting the process, I call `Refresh`. I need to do this so that I’ll have the correct info to write out to the console. This data is not captured automatically.

Finally, I handled the redirection of the input and output.

The complete code for the app is available at <https://gist.github.com/1108727>.

### Epilogue
This is very much a hack and I am not an expert on the proper usage of these classes. Please feel free to offer improvements.