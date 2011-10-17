---
layout: post
title: "Mobile Developent: Detecting Devices & Features"
date: 2011-10-20 16:51
comments: true
categories: [mobile,web]
published: false
---

_Take my mobile posts cum granlis salis. I'm trying to figure this stuff out, and I'm thinking out loud._

Whenver a browser makes a request, it includes a string identifying itself to the server. We commonly refer to this as the *user agent string*. This string identifies the browser and the platform and the version and a great deal more such nonsense.

This sounds great in theory. We should be able to use this data to optimize what's being sent to the (mobile) browser. However, there's been something of a [sordid history for user agent strings](http://webaim.org/blog/user-agent-string-history/ "History of the browser user-agent string by Aaron Andersen"). At this point, we've realized that [user agent sniffing](http://en.wikipedia.org/wiki/User_agent#User_agent_sniffing) is a tool that has hurt more often than it has helped.

So, we've learned to _favor feature detection over browser detection_ (or device detection). Take a look at [modernizr](http://www.modernizr.com/) and [haz.io](http://haz.io/) for more on the that front.  The success of feature detection has also resulted in a shift from server logic to client logic. We detect features on the client but we detect user agent strings on the server, before we send anthing to the client.

We it comes to mobile devices, one of the key features we are interested in is _screen size_. Luckily for us, the W3C has blessed us with [media queries](http://www.w3.org/TR/css3-mediaqueries/). In a nutshell, media queries allow you to conditionally apply CSS based properties of the display device. This has given rise to something known as [Responsive Web Design](http://www.alistapart.com/articles/responsive-web-design/). Responsive Web Design is about having a single set of markup whose layout can _respond_ to the device present (primarily using CSS media queries). Unfortunately, there are a few [rough edges](http://www.webdesignshock.com/responsive-design-problems/) with this approach.

## Moving backwards
As we begin to focus again on mobile, we find that client-side feature detection isn't quite as effective. Primarily because feature detection requires extra code to be sent to the browsers and it takes additional processing on the client. It's also likely that you'll end up sending more than is really needed (or that you'll need to make additional requests).

## So, um...

There's an open source "database" called [WURLF](http://wurfl.sourceforge.net/).


