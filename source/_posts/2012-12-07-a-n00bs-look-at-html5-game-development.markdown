---
layout: post
title: "a n00b's look at HTML5 game development"
date: 2012-12-07 10:55
comments: true
categories: game development, JavaScript, HTML
---

## Preamble

Something disgusting, like six years ago, I [listed on 43Things](http://www.43things.com/things/view/33927/develop-a-video-game) that I wanted to write a video game. I've actually made numerous arrested attempts ever since I started programming with my TI-94a back in 1983. My last attempt has been much less arrested (though still incomplete).

I've learned a lot in my most recent endeavor, so it's time to share. You can follow the [actual work in progress](https://github.com/bennage/sidera), but my plan it to recreate the steps I've gone though so far over the course of a few posts. 

## Goals

I am too ambitious. With that in mind, I created a set of constraints for making a game.

* keep gameplay simple
* don't worry about art (that can come later)
* learn

I started off wanting to make a game for the Windows 8 store. I decided afterwards that I will target modern browsers in general. This means that I took no dependencies on the WinJS libraries. (Though the Windows store is still my endgame.)

I also decided to _not_ use any frameworks (such as [ImpactJS](http://impactjs.com/)). Not because they are bad, but because I wanted to learn.

## Gameplay

{% img right /images/posts/sidera-early-build.png [screen capture of the current build of my game]%}

This is my spec (well, more or less).

I decided to make a simple [tower defense](http://en.wikipedia.org/wiki/Tower_defense) game. My inspiration is [The Space Game](http://old.casualcollective.com/#games/TSG) from the Casual Collective, as well as plenty of influence from StarCraft.

The player will build structures in an asteroid field. Waves of enemy ships will attempt to destroy those structures. The player has to manage resources such as minerals and solar power, and fend of the attacks. Structures will cost minerals to build, and require power to operate.

The player can navigate the map (up, down, left, right) as well as zooming in and out. There will be a minimap.

Graphics will be sprite-based. The game should be touch-friendly (really, I want touch to be primary).

## Resources

* [Build New Games](http://buildnewgames.com/), a collaboration between Microsoft and [Bocoup](http://bocoup.com/), is an excellent set of articles on HTML/JavaScript game development.

* My friend, [Matt Peterson](http://mattmadegames.com/), currently a graduate student at [DigiPen](https://www.digipen.edu/), who's advice and guidance has been most useful.