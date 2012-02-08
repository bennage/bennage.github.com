---
layout: post
title: "Finding Out When Something Happened in Your Git Repo"
date: 2012-02-08 7:00
comments: true
categories:  [git, source control, powershell, windows]
---

_Acknowledgment: This is meant to be the Windows equivalent of [Anders Janmyr](http://blog.jayway.com/author/andersjanmyr)'s [excellent post](http://blog.jayway.com/2012/01/25/finding-with-git/) on the subject of finding stuff with Git. Essentially, I'm translating some of Anders' examples to Powershell and providing explanations for things that many Windows devs might not be familiar with._

This is the third in a series of posts providing a set of recipes for locating sundry and diverse _thingies_ in a Git repository.

## Determining when a file was added, deleted, modified, or renamed

You can include the `--diff-filter` argument with `git log` to find commits that include specific operations. For example:

	git log --diff-filter=D # delete
	git log --diff-filter=A # add
	git log --diff-filter=M # modified
	git log --diff-filter=R # rename

There are additional flags as well. Check the [documentation](http://schacon.github.com/git/git-log.html). By default, `git log` just returns the commit id, author, date, and message. When using these filters I like to include `--summary` so that the list of operations in the commit are included as well.

_N.B. If you run a `git log` command and your prompt turns into a `:` simply press `q` to exit._

I don't think that you would ever want to return _all_ of the operations of a specific type in the log however. Instead, you will probably want to find out when a specific file was operated on.

Let's say that something was deleted and you need to find out when and by whom. You can pass a path to `git log`, though you'll need to preced it with `-- ` and a space to disambiguate it from other arguments. Armed with this and following Ander's post you would expect to be able to do this:

	git log --diff-filter=D --summary -- /path/to/deleted/file

And if you aren't using Powershell this works as expected. I tested it with Git Bash (included with msysgit) and good ol' cmd as well. Both work as expected. 

However, when you attempt this in Powershell, git complains that the path is an _ambiguous arugment_. I was able to, um, "work around" it by creating an empty placeholder file at the location.  Fortunately, [Jay Hill](https://twitter.com/#!/Jittery) heard my anguish on Twitter and dug up [this post](http://blogs.popart.com/2011/11/command-line-git-and-windows-gotchas/) from [Ethan Brown](http://blogs.popart.com/author/ethanbrown/). In a nutshell, Powershell strips out the `--`. You can force it to be recognized by wrapping the argument in double qoutes:

	git log --diff-filter=D --summary "--" /path/to/deleted/file

That works!

I'm guessing that Powershell considers `--` to be an empty arugment and therefore something to be ignored. I also assume that when the file actually exists at the path that git is smart enough to recognize the argument as a path. (Indeed, the official documentations says that "paths _may_ need to be prefixed").

While we're here, I also want to point out that you can use wild cards in the path. Perhaps you don't know the exact path to the file, but you know that it was named `monkey.js`:

	git log --diff-filter=D --summary -- **/monkey.js


Happy hunting!