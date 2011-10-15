---
layout: post
title: "Mobile Developent: Detecting Devices & Features"
date: 2011-10-14 16:51
comments: true
categories: [mobile,web]
---

Just in case you're completely new to web development. Whenver a browser makes a request, it includes a string identifying itself to the server. We commonly refer to this as the `user agent`. This string identifies the browser and  platform and version and a great deal more nonsense.

This sounds great in theory. However, there's been something of a [sordid history for user agent strings](http://webaim.org/blog/user-agent-string-history/ "History of the browser user-agent string by Aaron Andersen"). At this point, we've realized that [user agent sniffing](http://en.wikipedia.org/wiki/User_agent#User_agent_sniffing) is a tool that has hurt more often than it has helped. So, we've learned to favor feature detection over browser (or device) detection. Take a look at [modernizr](http://www.modernizr.com/) and [haz.io](http://haz.io/) for more on that front.  The success of feature detection has also resulted in a shift, since we detect features on the client but we examined user agent strings on the server. 

However, as we beginning to focus again on mobile, client feature detection isn't quite as effective. Primarily because feature detection requires extra code to be sent to the browsers and it takes additional processing on the client. It's also likely that you'll end up sending more than is really needed (or that you'll need to make additional requests). 

## So, um...

There's an open source "database" called [WURLF](http://wurfl.sourceforge.net/).


