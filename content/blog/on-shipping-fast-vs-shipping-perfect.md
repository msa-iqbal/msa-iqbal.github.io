---
external: false
title: On shipping fast vs shipping perfect
description: How to balance between shipping fast vs shipping perfect?
date: 2024-09-15
---

I recently came across an interview with Pieter Levels on the Lex Fridman podcast
{% youtube url="https://www.youtube.com/embed/oFtjKbXKqbg?si=TqQukJOBPOXPhEKI" label="Pieter Levels: Programming, Viral AI Startups, and Digital Nomad Life | Lex Fridman Podcast" /%}

not gonna lie, when I heard about how he was able to ship multiple products/startups in a short amount of time, the first thing I thought of was "are you me?". You see, when I was a broke high school/college student, I was hungry, hungry to make money. As a young child of a hard working immigrant family, I understood the value of money and how money can free my parents from working 12+ hour days.

I was young and curious, I discovered programming, and more importantly the ability to make money on the internet. I've dabbed into affiliate marketing, Adsense, Amazon Affiliates, Ebay flipping, Flippa, just to name a few.

## Ship fast

Similar to Pieter, money was the single goal that motivated me to do all that. The single most important factor that helped me succeed, is the the ability to ship fast and adapt to the market. I shipped ideas fast, and by fast I mean in a couple of hours. It's not uncommon for me to come up with an idea, buy a domain and shipped a v1 of that project in a day. I used to do things in PHP because there's no setup like we have today, I had a simple shared hosting setup that runs PHP or Wordpress out of the box (they often include MySQL access), I would write some PHP (often in a single file like Pieter) and drag and drop the file over FTP (FileZilla) and socialize.

## Test Test Test

I don't mean software unit testing, actually I didn't have any test! What I mean is whenever you release a project to the wild, TEST what folks are saying about it, TEST what's working and what's not, TEST how much traction it's gaining. If a project has no traction, no buzz and isn't getting much interaction from users, then I usually try to make some changes and see if it improves, and if it doesn't after a while, then shut it down and move on to the next idea. I don't have time to ship perfect code or set up a perfect server/CI/deployment pipeline etc, because perfect is the enemy of progress. Why wasting time setting all that up when no one cares about your project?

## Conclusion

As engineers, we are often zoomed in our craft, and I don't blame you, engineering is an ART. Engineering is just a part of your worry, because you need to focus on SURVIVING and GAINING users. When my project reached the front page of Reddit, my server crashed because my traffic went up to 1,000,000 users a day. I had my project hosted on a $5/month server. When it happened, did I focus on perfect code? NO, I simply did not have time for that, I was in survival mode, I needed to change my server from Apache to Nginx, add Redis to my site for caching, and set up auto scaling to handle the onslaught of traffic. I focused on that because I needed to make sure the website is working so I can serve and grow my users! In a way, this is the invisible hand that drives you forward.
