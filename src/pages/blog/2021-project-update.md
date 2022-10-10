---
title: March 2021 Project Update
description: I was blessed/cursed with a desire to understand, deeply, the world. Well, I have understood only a fraction of it so far and I can tell you, the world is a ridiculous place...
author: Greg Slepak
date: March 23, 2021
isoDate: "2021-03-22T17:00:00.000Z"
pubDate: "2021-03-22T17:00:00.000Z"
layout: "../../layouts/BlogPost.astro"
---

I was blessed/cursed with a desire to understand, deeply, the world. Well, I have understood only a fraction of it so far and I can tell you, the world is a ridiculous place. It is painful, joyful, frightening, enlightening, evil, dark, ruthless, good, sweet, honest, deceitful, villainous, virtuous, malicious, kind, ugly, beautiful, and everything in between and beyond.

2020 hit the world hard, and it hit us hard too. I got to understand COVID-19 more deeply than I cared to, and yet the disease remains a mystery to me. I understand it affects some severely while leaving barely a scratch on others, though why I do not know. What I do know is that COVID-19, or some other disease, significantly delayed the launch of Group Income. The 2020 hackathon had to be cancelled. In spite of taking recommended precautions, several team members got sick and had to take time off to recover. Thankfully, our team is decentralized, and contributors from around the world continued working on the project.

Group Income is a tool for powering self-sufficient communities. It is a kind of insurance too. We are designing a tool to help people deal with life's challenges. A tool to make your existing relationships and communities more resilient in the face of crisis, and better in times of tranquility.

It is again time for a progress update.

What have we done so far?

### Framework

We've created a framework for designing decentralized end-to-end encrypted applications. This is a framework that does not rely on blockchains, but incorporates some of the lessons from them. Really, it's nothing new, and yet, something exactly such as this doesn't exist in any appreciable fashion. We expect our framework to be one of many choices future developers will have when designing apps with similar requirements to Group Income.

Group Income contributor Tamas Kalman created a stunning visualization of the changes to the codebase over the past several years:

<iframe id="lbry-iframe" width="560" height="315" src="https://lbry.tv/$/embed/Group-Income-Coding-Progress-Update/571d95e54562f8aa15789f54fc9c5016c799fa99?r=3LGxbupVxyTdCdQxjP7NvFsaiaYtnNXJ" allowfullscreen></iframe>

At the moment the framework and the app are closely intertwined, and it is our intention to separate the two in the future. If you are interested in learning more, [join our Slack](https://groupincome.org/community/).

### Distribution Algorithm

Group Income's core algorithm distributes funds from those who have them to those who need them. Pretty simple, right?

Well, it turns out this problem isn't so simple. There are many edge cases the algorithm must handle. For example, what happens if pledges or incomes are modified in the middle of distribution? What happens if new members join or leave? What happens if the mincome is changed? What if the mincome's currency is changed? How do we minimize the number of payments that need to be made? Etc. etc.

To this end we've made many great strides, and we look forward to sharing them in a dedicated post.

### End-to-End Encryption

We've completed (for the most part) the design of our solution for end-to-end encryption, and have taken the first steps toward implementing it.

### Hiring + Bounties!

Are you interested in cryptocurrencies and basic income? Does the Lightning Network fascinate you? Are your sysadmin skills noteworthy?

If so, have a look at one of our [open positions](https://groupincome.org/positions/) or [open bounties](https://github.com/okTurtles/group-income-simple/issues?q=is%3Aissue+is%3Aopen+label%3ANote%3ABounty). If you see something you'd like to work on and would like us to post a bounty to it, let us know via [Gitter or Slack](/community).

Thanks for reading this far and joining us on this journey!

**Group Income: Secure, Decentralized, Voluntary Basic Income for you and your friends.**

<center style="font-weight: bold; color: green;">Donating = <span style="font-weight: bold; color: #e82d2d;">Loving</span>!<br/>
<a href="/donate/">Support our work by donating.</a><br/>
<span style="font-size:70%">(USD, BTC and ETH accepted!)</span></center>