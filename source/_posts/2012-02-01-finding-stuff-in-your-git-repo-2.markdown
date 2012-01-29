---
layout: post
title: "Finding Content in Files with Git"
date: 2012-02-01 23:50
comments: true
categories:  [git, source control, powershell, windows]
published: false
---

_Acknowledgment: This is meant to be the Windows equivalent of [Anders Janmyr](http://blog.jayway.com/author/andersjanmyr)'s [excellent post](http://blog.jayway.com/2012/01/25/finding-with-git/) on the subject of finding stuff with Git. Essentially, I'm translating some of Anders' examples to Powershell and providing explanations for things that many Windows devs might not be familiar with._

This is the second in a series of posts providing a set of recipes for locating sundry and diverse _thingies_ in a Git repository.

## Finding content in files
Let's say that you there are hidden monkeys inside your files that you need to find. You can search _the content_ of files in a Git repositor by using `git grep`. (For all you Windows devs, [`grep`](http://en.wikipedia.org/wiki/Grep) is a kind of magical pony from Unixland whose special talent is finding things.)

	# find all files whose content contains the string 'monkey'
	PS:\> git grep monkey

There several arguments you can pass to grep to modify the behavior. These special arguments make the pony do different tricks.

	# return the line number where the match was found
	PS:\> git grep -n monkey

	# return just the file names
	PS:\> git grep -l monkey
	
	# count the number of match in each file
	PS:\> git grep -c monkey

You can pass an arbitrary number of commits after the pattern that you are trying to match. Remember a commit can be the id (or SHA) of a commit, the name of a branch, a tag, or one of the special identifier like HEAD. 

	# search the master branch, two commits by id, 
	# and the commit two before the HEAD
	PS:\> git grep monkey master d0fb0d 032086 HEAD~2

We only need enough of the SHA for Git to uniquely identify the commit. Six or eight character is generally enough.

Here's an example using the [RavenDB repo](https://github.com/ravendb/ravendb).

	PS:\> git grep -n monkey master f45c08bb8 HEAD~2

	master:Raven.Tests/Storage/CreateIndexes.cs:83:			db.PutIndex("monkey", new IndexDefinition { Map = unimportantIndexMap });
	master:Raven.Tests/Storage/CreateIndexes.cs:90:			Assert.Equal("monkey", indexNames[1]);
	f45c08bb8:Raven.Tests/Storage/CreateIndexes.cs:82:			db.PutIndex("monkey", new IndexDefinition { Map = unimportantIndexMap });
	f45c08bb8:Raven.Tests/Storage/CreateIndexes.cs:89:			Assert.Equal("monkey", indexNames[1]);
	HEAD~2:Raven.Tests/Storage/CreateIndexes.cs:83:			db.PutIndex("monkey", new IndexDefinition { Map = unimportantIndexMap });
	HEAD~2:Raven.Tests/Storage/CreateIndexes.cs:90:			Assert.Equal("monkey", indexNames[1]);

Notice that each line begins with the name of the commit where the match was found. In the example above, where we asked for the line numbers the results are in the pattern:

	[commit ref]:[file path]:[line no]:[matching content]

## References
* [grep](http://en.wikipedia.org/wiki/Grep)
* [SHA](http://book.git-scm.com/1_the_git_object_model.html) (just the first paragraph)
* [ways of referencing commits](http://book.git-scm.com/4_git_treeishes.html)

_N.B. I had one repository that did not work with `git grep`. It was because my 'text' files were encoded UTF-16 and git interpretted them as binary. I converted them to UTF-8 and the world became a happy place._

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