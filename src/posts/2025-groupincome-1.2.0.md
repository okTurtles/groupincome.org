---
title: Web Push Notifications + Upcoming Server Reset
description: Introducing end-to-end encrypted web push notifications and more!
author: Greg Slepak
date: February 25, 2025
image: '/wp-content/uploads/2025/02/Version1.2.png'
isoDate: '2025-02-25T07:00:00+00:00'
pubDate: '2025-02-25T07:00:00+00:00'
layout: "../layouts/BlogPost.astro"
permalink: /2025/02/group-income-released/
categories:
    - Uncategorized
---

Group Income 1.2 introduces major internal rewrites to support end-to-end encrypted web push notifications!

## Web Push Notifications

What are "web push notifications"?

They're like normal app push notifications, but for websites and web apps.

On Desktop web browsers, everything should just work.

On mobile devices, install Group Income to your Home Screen as a web app to get web push notifications.

To do this:

- On iPhones: visit the Group Income app (e.g. using [our server](https://groupincome.app) or someone else's), and click the "Share" button (<img src="/wp-content/uploads/2025/02/share.png" style="display: inline; margin: 0; height: 20px;"></img>) and then "Add to Home Screen"
- On Android: click the 3 vertical dots (⠇) and then "Add to Home Screen"

Then the website will appear as an "app" and it should support mobile push notifications.

**iOS Note:** there are sometimes issues with web push notifications because of bugs in Safari. There's not much we can do about this except release Group Income as a real app bundle, something we may do in the future.

## New Troubleshooting Page

Building an app like Group Income is really difficult.

Every feature we want to implement is at least 10x harder to do in a safe & private way.

So sometimes [odd bugs](https://github.com/okTurtles/group-income/issues/2583) might crop up.

This releases introduces a new feature to help address these types of bugs.

![](/wp-content/uploads/2025/02/troubleshooting.png)

The new Troubleshooting page lets users rebuild the app's internal state from scratch, and this can fix many problems you might encounter. Find it under your User Settings (the little wheel icon next to your user name in the lower-left).


## Upcoming Server Reset

Version 2.0 is coming soon, and with it some major backwards-incompatible changes to the internals of Group Income. We will be forced to wipe all data on the [groupincome.app](https://groupincome.app) site.

Therefore, **please backup any important data** before the release to your computer. We will host a temporary backup site where users will be able to access their data for a period of time after the new version launches.

## Other Highlights

- Password changes: you can now change your password!
- Improved image handling: We've implemented image compression to speed up loading times and optimize storage
- Better file management: Chat attachments now display file sizes, and you can paste images directly into chats
- Enhanced image viewer: Navigate between multiple images using arrow keys, plus new download and delete options

## Full Release Notes

### New Features

- Push notifications! This version includes full support for end-to-end encrypted web push notifications. Works best on mobile as a [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing).
- Push notifications are now used for important in-group events and reminders.
- You can now change your password!
- Image compression: uploaded images will take up a maximum of ~400KB each to speed up loading times and save server space.
- Image viewer now supports left/right arrow keys to switch between multiple image attachments.
- Chat file attachments now show their size.
- You can now use the paste feature to add an image attachment.
- Mobile: `<enter>` key creates newline instead of sending message
- Chelonia now runs in a service worker to support push notifications and better state management with multiple open tabs.

### Bugfixes

- Prevent accidental creation of multiple DMs.
- Fixed rendering of payment table rows.
- Fixes for forced-color mode.
- Fixed remaining issues related to showing not-logged-in users under group inactivity.
- "See proposal" link should always lead to proposal.
- Fixed chat auto-scroll issue.
- Fixed various markdown rendering bugs in chat.
- Miscellaneous bug fixes.

### Improvements

- Added download/delete buttons to the image viewer.
- Emojis rendered slightly larger in chat now.
- Increased the maximum length of payment details to support long Lightning payment addresses.
- Various UI/UX improvements.


Subscribe to our low-volume newsletter at the bottom of this page and follow our socials for the latest news about Group Income, Chelonia, and more!
