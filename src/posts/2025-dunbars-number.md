---
title: "No Eyeballs Needed: How We Solve the Sybil Attack for Group Income"
description: Tackling fraud using Dunbar's number.
author: Group Income Team
date: June 12, 2025
image: '/wp-content/uploads/2025/06/dunbar.jpg'
isoDate: '2025-06-12T07:00:00+00:00'
pubDate: '2025-06-12T07:00:00+00:00'
layout: "../layouts/BlogPost.astro"
permalink: /2025/06/no-eyeballs-needed/
categories:
    - Uncategorized
---

One of the issues facing all financial safety nets is fraud.

Group Income is able to address fraud in a privacy-preserving way, without needing [to scan your eyeballs](https://whitepaper.worldcoin.org/technical-implementation#the-orb).

You may have heard of ["voter fraud"](https://en.wikipedia.org/wiki/Electoral_fraud), ["social security fraud"](https://www.ssa.gov/fraud/), and ["charity fraud"](https://en.wikipedia.org/wiki/Charity_fraud). All of these types of fraud have something in common: an inability to accurately identify individuals. Also known as a ["Sybil attack"](https://en.wikipedia.org/wiki/Sybil_attack), fraudsters create fake identities and use those to abuse the system.

Let's dive in.

- [What is a Sybil Attack?](#what-is-a-sybil-attack)
- [Why Are Sybil Attacks Effective?](#why-are-sybil-attacks-effective)
- [Examples of Sybil Attacks](#examples-of-sybil-attacks)
- [How Existing Systems Protect Against Sybil Attacks](#how-existing-systems-protect-against-sybil-attacks)
- [How Group Income Protects Against Sybil Attacks](#how-group-income-protects-against-sybil-attacks)

## What is a Sybil Attack?

In a Sybil attack, an attacker creates fake identities and uses them to influence a system. The name "Sybil" alludes to [Flora Rheta Schreiber's chronicles of the pseudonymous Sybil](https://en.wikipedia.org/wiki/Sybil_(Schreiber_book)), who struggled with dissociative identity disorder. In 2002, [it was used for the first time](https://www.freehaven.net/anonbib/cache/sybil.pdf) to describe a type of cyberattack.

## Why Are Sybil Attacks Effective?

Sybil attacks take advantage of weaknesses in identity systems and the fact that you can't know everyone. In large communities or systems, an attacker can slowly grow their network of fake identities under the radar. As their network of fakes grows, the attacker can use these fake identities to vouch for other fake users.

## Examples of Sybil Attacks

These attacks are not merely theoretical; there have been numerous instances of successful Sybil attacks in recent years:

- **Tor:** In 2014, a black hat hacking group named ["Lizard Squad" launched a Sybil attack on the Tor network](https://en.wikipedia.org/wiki/Lizard_Squad#Tor_sybil_attack) by registering a large number of new relays, presumably hoping to become a significant portion of the network. The attack was [detected and defeated](https://www.twitlonger.com/show/n_1sjg365) before the group acquired any meaningful presence.
- **Twitter:** A [2017 study](https://arxiv.org/pdf/1703.03107.pdf) estimates that between 9% and 15% of Twitter's active monthly users are bots (nearly 48 million). This is likely an underestimate, as researchers [repeatedly](https://www.bbc.com/news/technology-38724082) [point](https://www.wired.com/story/new-tool-shows-how-bots-drive-conversation-for-news-events/) to countless fake accounts being used for malicious purposes.
- **Keybase:** In 2019, Stellar Development Foundation (SDF) [announced](https://www.coindesk.com/markets/2019/09/09/stellar-to-give-away-2-billion-xlm-valued-at-120-million-today/) that Keybase users would receive monthly XLM airdrops (around 2 billion XLM over the period of 20 months). Scammers began [creating fake profiles](https://github.com/keybase/keybase-issues/issues/3546) at a rate far [beyond Keybase's capacity to filter them](https://www.publish0x.com/airdrop-united/keybase-the-big-stellar-space-drop-ended-xdxxqr). Eventually, [Keybase ended the giveaway](https://decrypt.co/14672/keybase-ends-stellar-airdrop-thanks-hordes-crappy-fake-accounts).
- **Covid relief funds:** Since the beginning of the pandemic, the U.S. [spent trillions in Covid relief funds](https://www.covidmoneytracker.org). Recent news reports that [nearly $100 billion](https://www.cnbc.com/2021/12/21/criminals-have-stolen-nearly-100-billion-in-covid-relief-funds-secret-service.html) [was stolen](https://republicbrief.com/secret-service-report-of-100-billion-theft-has-been-covered-up-by-the-white-house/) by fraudsters. Investigators found that hackers easily dumped money into digital platforms by setting up accounts with stolen identities.
- **Student financial aid:** In 2021, the California Student Aid Commission recorded one of the [state’s biggest financial aid scam attempts](https://www.latimes.com/california/story/2021-09-01/california-college-financial-aid-scam-fake-students) in recent history. The suspected fake applications surpassed 65,000, and officials struggled to distinguish real students from bots.
- **Worldcoin:** In 2023, WorldCoin [announced](https://worldcoin.org/blog/announcements/worldcoin-project-launches) the official release of their Worldcoin Project, which released the Worldcoin token (WLD) to anyone participating in their World ID program. Less than a week later, Trusta Labs detected [Sybil attacks on the WorldCoin network](https://twitter.com/TrustaLabs/status/1684144715661455360). It is trivial for someone to pay others to scan their eyeballs and thereby collect multiple streams of worldcoin tokens.

## How Existing Systems Protect Against Sybil Attacks

Existing systems employ various mechanisms to attempt to protect against Sybil attacks:

- [Proof of Legal Identity: ID Systems](https://id4d.worldbank.org/guide/types-id-systems)
- [Proof of Work](https://en.bitcoin.it/wiki/Proof_of_work)
- [Proof of Stake](https://en.bitcoin.it/wiki/Proof_of_Stake)
- [Proof of Burn](https://en.bitcoin.it/wiki/Proof_of_burn)
- [Proof of Humanity](https://en.wikipedia.org/wiki/Proof_of_personhood)
- [Proof of Eyeball](https://whitepaper.worldcoin.org/technical-implementation#the-orb)

## Group Income Uses Dunbar's Number

Group Income addresses the Sybil attack in a decentralized and fully privacy-preserving way by _working with_ the constraints of human social structures. We limit the size of groups to **[Dunbar's Number](https://en.wikipedia.org/wiki/Dunbar%27s_number)**, the average number of meaningful relationships an individual can maintain, estimated to be about 150 people. At this size, group members can personally know each other and readily identify fake accounts.

More importantly, the platform encourages genuine personal connections and regular communication between members, all within the safe confines of a fully end-to-end encrypted experience so that your group activity and communications stay private.

In short, Group Income protects against Sybil attacks by fostering real, meaningful relationships among its users.

------

##### Want to support our work?

- Become a [sponsor on GitHub](https://github.com/sponsors/okTurtles)!
- Make a [tax-deductible donation to the okTurtles Foundation](https://okturtles.org/donate/)!
- Join our community (see links below) and contribute to the project!
