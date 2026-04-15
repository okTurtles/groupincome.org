---
title: Group Income 2.8
description: End-to-end encrypted music and more!
author: Group Income Team
date: April 16, 2026
image: '/wp-content/uploads/2026/04/gi_2.8.jpg'
isoDate: '2026-04-16T07:00:00Z'
pubDate: '2026-04-16T07:00:00Z'
layout: "../layouts/BlogPost.astro"
permalink: /2026/04/group-income-2.8/
categories:
    - Uncategorized
---

You might be wondering, "2.8?! What happened to 2.6 and 2.7?"

We needed a bug fixed before making another release. A rather [serious edge-case mystery bug related to key rotations](https://crib.social/notice/B48JEjJ8DmPkWmmwyG) that could happen in rare circumstances when members left the group. 

Meanwhile, our frontend developer kept turning out feature after feature. So once the important low-level fixes were complete, the release had accumulated several versions worth of new features.

Welcome to Group Income 2.8. Greater stability and resilience, and several awesome new features!

### Audio Player

2.5 introduced an [end-to-end encrypted video player](/2025/11/group-income-2.5/), so it's only right that 2.8 introduces an end-to-end encrypted audio player! 🥳

<!-- for whatever retina-related reasons displaying at half-width seems to work best -->

<img src="/wp-content/uploads/2026/04/soul_remix.jpg" class="aligncenter" width="529" />

As always, users can rest easy knowing their privacy is completely protected. All our features are end-to-end encrypted.

But sometimes data doesn't need to be end-to-end encrypted, because it never hits the server to begin with. That brings us to message drafts.

### Draft messages

No more fear that your message drafts will be lost if you switch conversations:

<img src="/wp-content/uploads/2026/04/drafts.jpg" class="aligncenter" width="263" />

### New Table Rendering

This:

```
| Feature Icon | Description |
| --- | --- |
| 🎵 | Built-in audio player for chat attachments |
| 📝 | Draft messages are now preserved when switching channels |
| 📊 | **New and improved table rendering for Markdown in chat messages** |
| ⏳ | Spinner shown during file uploads and downloads |
| ⚙️ | Ability to modify defaults for chatroom notification and sound settings |
```

Now gets rendered like this:

<img src="/wp-content/uploads/2026/04/table.jpg" class="aligncenter" width="915" />

### New Settings UI

Both the user and group settings UIs have received a major revamp. They are now no longer all jumbled together on one page but neatly organized into sections:

<img src="/wp-content/uploads/2026/04/settings.jpg" class="aligncenter" width="987" />


### Progress spinners

Little quality-of-life UI tweaks have been added, like progress spinners for both uploading and download file attachments:

<img src="/wp-content/uploads/2026/04/spinner.jpg" class="aligncenter" width="458" />

Many other little UI/UX improvements have been made as well (e.g. support for foreign language chatroom names). See a complete list below.

### Technical Plumbing

We spent a lot of time fixing some very complicated edge cases related to:

- Handling key rotations
- Key sharing
- Memory leaks from service worker <-> page message passing

This release includes updates to the underlying Chelonia framework as well.

### Release Notes

**New Features**

- Built-in audio player for chat attachments
- Draft messages are now preserved when switching channels
- New and improved table rendering for Markdown in chat messages
- Spinner shown during file uploads and downloads
- Ability to modify defaults for chatroom notification and sound settings

**Improvements**

- Redesigned user settings menu with better structure and navigation
- Improved default sounds for chat message notifications
- Chatrooms now support non-English names
- Better unread indicators and interaction patterns in chat
- New chat menu icon and fixed unread count not resetting
- Loaded media is now cached to avoid redundant downloads
- Dashboard bar graphs now show current and empty periods
- Currency formatting now respects browser locale and fixes BTC symbol
- Clearer messaging in login error dialog
- External chat links now open in a new tab
- Added helper text to channel name field for validation
- BrowserSync port is now configurable via `--browsersync-port=<port>`
- More reliable key rotation on member changes
- General API improvements including refactoring, bugfixes, and Chelonia API migration
- Updated Russian translations
- Bumped dependencies

**Bugfixes**

- Sent `.gif` files no longer lose animation
- You can now attach the same file consecutively
- You can now attach files from multiple folders at once
- Mentions no longer match special characters in chatrooms
- Exited or removed users are now hidden from the @-mention list
- Badge count now respects all-messages setting, not just mentions
- Fixed missing logic and UI issues in edit channel modal
- Emojis after markdown now size correctly
- Fixed layout for vertical videos in the video player
- Chat loading indicators now clear on room switch
- Revoke invite prompt no longer appears twice
- Fixed text overflowing in polls and various UI areas
- Checkboxes and radio buttons now scale correctly with text sizes
- Fixed blob URL and cache memory leaks
- Unused MessagePorts are now closed after use to stop memory leaks
- Namespace lookup now fails silently for missing usernames
- Fix ESC not dismissing emoticons popup
- Two bugfixes related to rendering "replying to:" UI


See the [complete list of changes](https://github.com/okTurtles/group-income/releases/tag/v2.8.0).

-----

We hope you enjoyed this release!

Try it out on [our official server](https://groupincome.app)!


💌 Subscribe to our low-volume newsletter at the bottom of this page 👇 and follow us (off of Big Tech if you want to see our posts!) for the latest news about Group Income, Chelonia, and more!

👇👇👇
