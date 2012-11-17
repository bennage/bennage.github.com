---
layout: post
title: "Finding Files by Name with Git"
date: 2012-01-30 7:02
comments: true
categories: [git, source control, powershell, windows]
---

_Acknowledgment: This is meant to be the Windows equivalent of [Anders Janmyr](http://blog.jayway.com/author/andersjanmyr)'s [excellent post](http://blog.jayway.com/2012/01/25/finding-with-git/) on the subject of finding stuff with Git. Essentially, I'm translating some of Anders' examples to Powershell and providing explanations for things that many Windows devs might not be familiar with._

This is the first in a series of posts providing a set of recipes for locating sundry and diverse _thingies_ in a Git repository.

## Finding files by name
Let's say that you want locate all the files in a git repository that contain 'monkey' in the file name. (Finding monkeys is a very common task.)

	# find all files whose name matches 'monkey'
	PS:\> git ls-files | Select-String monkey

This _pipes_ the output of `git ls-files` into the Powershell cmdlet `Select-String` which filters the output line-by-line. To better understand what this means, run just `git ls-files`.

Of course, you can also pass a regular expression to`Select-String` (that is, if you hate yourself.)

## References
* [git ls-files](http://schacon.github.com/git/git-ls-files.html)
* [Select-String](http://technet.microsoft.com/en-us/library/dd315403.aspx)
* [the pipe operator `|`](http://technet.microsoft.com/en-us/library/ee176927.aspx)
* [Better Git with Powershell by Phil Haack](http://haacked.com/archive/2011/12/13/better-git-with-powershell.aspx)

[Next, searching for files with specific content.](/blog/2012/02/01/finding-stuff-in-your-git-repo-2/)