---
title: "Futures and options in India: how F&O actually works, and why nine in ten retail traders lose"
excerpt: "A plain explanation of futures, calls and puts using Nifty numbers, what SEBI's 2024 and 2025 rule changes did to the market, and the regulator's own study of what happened to more than a crore of individual traders."
category: "Bazaar Advanced"
lesson: 1
module: "advanced-1"
outcomes:
  - "Explain the difference between a future, a call and a put."
  - "Work out the profit, loss and break-even of a simple option trade."
  - "Say why most retail F&O traders lose money, using SEBI's own numbers."
quiz:
  - q: "You buy a call with a strike of 25,200 for a premium of 100. Where is your break-even at expiry?"
    a: "25,300: the strike plus the premium you paid."
  - q: "What is the most the buyer of an option can lose? And the buyer of a future?"
    a: "An option buyer can lose only the premium. A futures position has no such limit and can lose more than the margin."
  - q: "What share of individual F&O traders lost money in SEBI's study of 2022 to 2024?"
    a: "About 93 percent."
tags: ["Advanced", "Derivatives", "Options", "SEBI"]
author: "Bazaar School Team"
date: "2026-10-26"
image: "/images/articles/futures-and-options-explained.jpg"
readTime: "13 min"
draft: false
---

This lesson exists so that you understand futures and options, not so that you trade them. By the end you will know how they work, who they are for, what they cost, and what SEBI found when it added up the results of every individual who tried. Keep that order in mind.

## A contract about a price

A derivative is a contract whose value comes from something else, the underlying. In India the underlyings that matter are the Nifty 50, the Bank Nifty, the Sensex and a couple of hundred large stocks. Index contracts settle in cash; nobody delivers fifty shares in a bag. Stock contracts settle by delivery of the shares.

Contracts come in lots, not single units. You cannot buy a future on one Nifty point; you buy a lot. In late 2024 SEBI raised the minimum size of a contract to about 15 lakh rupees, and the exchange resets lot sizes from average prices every few months: the Nifty lot went to 75 units in late 2024 and down to 65 from the January 2026 expiries. The examples below use 65. Check the exchange's current figure before doing any sums.

## Futures

A futures contract is an agreement to buy or sell the underlying at a fixed price on a fixed date. If the Nifty is at 25,000 and you buy one December future at 25,050, you have agreed to "buy the Nifty" at 25,050 in December. If the index ends at 25,550, you are paid 500 points times 65 units, which is 32,500 rupees. If it ends at 24,550, you pay the same.

You do not put up the roughly 16.3 lakh the contract represents. You post a margin, typically 10 to 15 percent, and the exchange settles your profit or loss in cash every evening, the mark to market. That is where the danger lives. A 2 percent move in the index is a 32,500 rupee swing on a margin of perhaps 2 lakh, about 16 percent of your money in a day. The leverage that makes a good week feel brilliant makes a bad week fatal, and a sharp move can take more than you deposited. Remember the first Basics chapter: a share can only lose what you paid. A future has no such floor.

## Options

An option is a right without an obligation. A call gives you the right to buy the underlying at a set price, the strike, on or before expiry. A put gives you the right to sell. You pay a premium for the right, and that premium is the most a buyer can lose.

Work one through. Nifty at 25,000. You buy a 25,200 call expiring next Tuesday for a premium of 100 rupees per unit, which with a lot of 65 costs 6,500 rupees. If the Nifty ends the week at 25,500, your right to buy at 25,200 is worth 300 points, so 19,500 rupees, a profit of 13,000 on 6,500. If it ends at 25,100, the right is worthless and you lose the full 6,500. If it ends at 25,250, you get back 3,250 and lose the other half.

Notice what the index had to do. It had to rise 0.8 percent just for you to break even, within a week. Most weeks it does not, which is why a large share of options expire worthless and why the person on the other side of your trade, the seller, collects premiums for a living. The seller's position is the mirror image: a small, regular income and an occasional enormous loss, which is why exchanges demand large margins from sellers and why "option selling income" strategies tend to work beautifully until the one week they do not.

Premiums also decay with time. An option is a melting ice cube; even if the index goes nowhere, the right to a move that has not happened is worth a little less every day.

## Who these instruments are for

Derivatives exist to transfer risk. A fund manager holding 500 crore of shares buys puts before a budget announcement as insurance. An exporter sells currency futures to lock in a rupee rate. A market maker quotes both sides all day for a tiny spread. All of them have a position to protect or a cost advantage.

A retail trader with a phone has neither. In the market's ecology, the individual buying weekly options is mostly the person paying the insurance premiums that the professionals collect.

## What SEBI found

In September 2024 SEBI published a study of individual traders in equity futures and options over the three financial years 2022 to 2024. About 93 percent of them lost money. Across more than a crore of individuals, the net loss came to roughly 1.8 lakh crore rupees, an average of about 2 lakh per person over three years. Only around one in a hundred earned more than a lakh after costs. The regulator's follow-up for 2024-25 showed the same shape: around nine in ten lost, and the net loss for the single year exceeded a lakh crore.

Read those numbers again, slowly, because every advertisement for an options course is written by someone hoping you will not.

## What changed in the rules

SEBI responded with a series of measures, most of which took effect from 20 November 2024. Each exchange may offer weekly expiries on only one index, so the NSE kept the Nifty and the BSE kept the Sensex, and the daily expiry carnival of 2023 and 2024 ended. The minimum contract value was raised, as above. Brokers must collect option premiums from buyers upfront. Sellers face an extra margin on expiry day, and the margin relief for calendar spreads disappears on the day one leg expires. Position limits are now watched during the day, not just at the close. In 2025 the regulator went further, moving to position limits based on the actual market exposure of a portfolio rather than raw contract counts, and standardising expiry days so that the NSE's contracts expire on Tuesdays and the BSE's on Thursdays.

The direction of all of it is the same: make it harder to lose money quickly with small sums.

## What it costs

Securities transaction tax has been raised twice. From October 2024 it was 0.1 percent of the premium on options sold and 0.02 percent of the contract value on futures sold. The 2026 Budget raised it again from 1 April 2026, to 0.15 percent of the premium on options, 0.05 percent on futures, and 0.15 percent of the intrinsic value when an option is exercised. Add exchange charges, SEBI fees, GST on brokerage and a flat brokerage per order, and an active trader turning over a few lakh of premium a week pays thousands of rupees in friction before the market has moved an inch. In SEBI's study, costs alone turned many small winners into losers.

## Taxes

Profit or loss from F&O is treated as business income, not capital gains, under India's income tax rules. You file a different return (ITR-3), you can set a loss off against most other income and carry it forward for eight years, and if your turnover crosses certain thresholds you need a tax audit. The capital gains lesson later in this course goes through it. The short version: the taxman considers F&O a business, and it is worth asking yourself whether you are running one or visiting a casino.

## If you still want to learn

There is a respectable way to study this. Open the NSE's option chain for the Nifty, the table of every strike with its call and put premiums, and watch the at-the-money contracts for a month without trading them. Draw the payoff diagram of a bought call and a sold call by hand. Paper trade a position through an expiry, costs included. Most people who do this honestly for a month decide they would rather own shares, which is the correct conclusion for most people, and the course moves on to the arithmetic of staying solvent.

*Lot sizes, expiry days and STT rates were rechecked in November 2026 against published reports of the exchange notices and the 2026 Budget. They change often, so confirm the current figures on the exchange website before relying on them.*
