---
title: Group Income 2.0
description: A brand new beginning.
author: Greg Slepak
date: June 10, 2025
image: '/wp-content/uploads/2025/06/Version2.0.png'
isoDate: '2025-06-10T07:00:00+00:00'
pubDate: '2025-06-10T07:00:00+00:00'
layout: "../layouts/BlogPost.astro"
permalink: /2025/06/group-income-2.0/
categories:
    - Uncategorized
---


<iframe style="width:100%; aspect-ratio:16 / 9;" src="https://www.youtube-nocookie.com/embed/md54gZAtWA8?si=QH8HqnBwWWHVeKOf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Welcome to Group Income 2.0: private community software with a financial safety net, so you can focus on what matters.

## The Final Breaking Changes

Group Income 2.0 introduces polish and a solidified foundation for all future versions.

Unlike most web software, Group Income is built on top of an [open decentralized protocol](https://shelterprotocol.net).

This has pros and cons.

Pros:

- Users are guaranteed that unlike Facebook, X, Apple, Google, and every other Big Tech megacorp out there, our software will behave in a predictable manner that can be verified by anyone.
- Our software will outlive proprietary Big Tech software that is constantly being modified and end-of-lifed.
- Anyone can build on top of our protocol and have their software interact with ours.

Cons:

- There is one major drawback: any time we need to make a fundamental change to the protocol, we have to reset the server. This means all groups have to be recreated from scratch.

This version makes final breaking changes to the protocol Group Income is built upon, laying down the foundation for the rest of the software's life, and requiring a final server reset.

Existing users can find a read-only archive of their old groups at this URL: https://archive.groupincome.org

More details on the low-level changes can be found below.

## Polish

With over [90 issues closed](https://github.com/okTurtles/group-income/releases/tag/v2.0.0) since the previous release, Group Income 2.0 features not only foundational improvements but also a significant amount of polish.

The bulk of the changes in this release all had to do with improvements to the underlying end-to-end encryption framework.[^1]

[^1]: We'll be sharing more about Chelonia soon! Subscribe to our newsletter below to be the first to know.

## Online Mom & Pop Shops

Since Group Income is open source and open protocol, anyone can host their own Group Income server.

One very important thing that's been missing from the server has been the ability to keep track of how much data users are using.

Group Income 2.0 now runs on a new server that is able to keep track of all of this information for billing purposes.

Speaking of billing: **we are offering free hosting for at least a year to groups that sign up this month.**[^2]

And when we start charging, we *will not* charge yet another arbitrary "monthly subscription fee", but will instead charge only *for the data your group actually uses.*

Want to host and charge for your own Group Income server? You'll be able to do that too!

We're bringing online mom & pop shops to the Internet, baby! 😎

Add your server to our list of public servers by [editing this page](https://github.com/okTurtles/groupincome.org/edit/master/src/components/Servers.vue).

[^2]: Limited up to our server's hosting capacity. First-come-first-serve. If too many people take advantage of this we will have to close sign ups.

## Localization

Group Income is now fully localized into **French** (thanks to contributions from Simon Grondin, Snowteamer, Pierre, and Christophe Dupas!).

It's [simple to translate it into your favorite language](https://github.com/okTurtles/group-income/blob/master/CONTRIBUTING.md#how-to-help-by-translating).

## Full Release Notes

### New Features

- Long chatroom messages are now truncated with a "Show more" link
- Notification volume can now be adjusted in settings
- You can now mark messages as unread in chatrooms and DMs
- French localization
- Server: admins can now display custom messages on login/signup screen
- Server: archive mode lets server admins set Group Income to read-only
- Server: data accounting logic now keeps track of data usage

### Improvements

- Chatroom names now displayed in bold when they have new messages
- Replying to a message no longer quotes entire message
- You can now delete your group, your identity, everything
- Push notifications much more reliable, and toggling them on and off in the settings fixes most issues
- Handling of unread messages greatly improved
- Extensionless files can now be uploaded in chat
- Darktheme arrows now used for picture viewer
- Profile cards can be opened in the Contributions page
- Set notification settings in private chatrooms to behave the same as DMs by default
- Server now keeps track of data usage
- Various low-level improvements to Shelter Protocol and Chelonia
- Various low-level server-side improvements related to data storage

### Bugfixes

- Fixed missing "Delete message" button in menu on mobile
- Chat remembers chatroom scroll position
- Tooltips not disappearing when they should
- Various text alignment and overflow issues fixed
- Payment streaks are properly reset when switching to non-participant (pledging $0)
- Properly scroll chat on new message when window is in background
- Properly play notification sounds for chatroom events
- Multiple bugfixes for issues preventing chatrooms from rendering properly
- Fixed a bug that prevented multilingual translations from working
- Fixed instances of contractID showing up instead of user display name
- Various UI bugfixes
- Various bugfixes to Chelonia

For a complete list of changes please [visit the release on Github](https://github.com/okTurtles/group-income/releases/tag/v2.0.0).

💌 Subscribe to our low-volume newsletter at the bottom of this page 👇 and follow our socials 👇 for the latest news about Group Income, Chelonia, and more!
