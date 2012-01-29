---
layout: post
title: "Finding Stuff in Your Git Repo 3"
date: 2012-02-03 15:00
comments: true
categories:  [git, source control, powershell, windows]
published: false
---

_Acknowledgment: This post is meant to be the Windows equivalent of [Anders Janmyr](http://blog.jayway.com/author/andersjanmyr)'s [excellent post](http://blog.jayway.com/2012/01/25/finding-with-git/) on the subject of finding stuff with Git. Essentially, I'm translating some of Anders' examples to Powershell and providing explanations for things that many Windows devs might not be familiar with._

This is a set of recipes for locating content in a Git repository.

## Determining when a file was added, deleted, modified, or renamed

You can include the `--diff-filter` argument with `git log` to find commits that include specifc operations. For example:

	git log --diff-filter=D # delete
	git log --diff-filter=A # add
	git log --diff-filter=M # modified
	git log --diff-filter=R # rename

There are additional flags as well. Check the [documentation](http://schacon.github.com/git/git-log.html).

_N.B. If you run a `git log` command and your prompt turns into a `:` simple press `q` to exit._

But what if we need to find a specifc file

The screenshots
http://haacked.com/archive/2011/12/13/better-git-with-powershell.aspx