---
title: "Algo trading in India: what SEBI now lets a retail investor do"
excerpt: "Until 2025, automating your own trades through a broker's API lived in a grey zone. SEBI's February 2025 framework made it legal with conditions: registered algos, an order-rate threshold, broker accountability, and a line between strategies you can see inside and ones you cannot."
category: "Bazaar AI"
tags: ["AI", "Algo trading", "SEBI", "APIs"]
author: "Bazaar School Team"
date: "2026-10-28"
image: "/images/articles/algo-trading-india-sebi-rules.jpg"
readTime: "9 min"
draft: false
---

Algorithmic trading means a computer placing orders according to rules, without a human clicking each one. Institutions have done it in India since 2008, when SEBI allowed direct market access, and most of the volume on the exchanges has been machine-generated for years. The question this article answers is narrower: what may an individual with a broking account and a laptop do, and under what rules?

## How it got to be a grey zone

From around 2015 the discount brokers began offering application programming interfaces, APIs, that let a customer's own program read prices and place orders. Developers built personal tools on them. Then a cottage industry grew up around them: platforms that sold "strategies" with advertised returns, connected to your broking account through the API, and ran trades on your behalf. Nobody regulated the platforms, nobody verified the returns, and when the strategies lost money, which they frequently did, the customer discovered that neither the platform nor the broker took responsibility.

SEBI's first move, in 2022, was to stop brokers associating with unregulated algo platforms or advertising past or expected returns. Its second, after a consultation in late 2024, was a full framework.

## The February 2025 framework

On 4 February 2025 SEBI issued a circular on safer participation of retail investors in algorithmic trading. The exchanges then wrote the detailed standards. The start date was pushed back and then phased in: brokers had to meet interim deadlines from late 2025, and the framework became mandatory for every broker from 1 April 2026. The main points, in plain terms:

The broker is responsible. Every algorithmic order from a retail client goes through the broker's systems, is tagged with a unique identifier issued by the exchange, and is the broker's problem if it misbehaves. Brokers must be able to pull the plug on a misfiring algo.

There is a speed threshold. If your program sends orders below a rate the exchanges set, the NSE chose ten orders per second, you may run it through your broker's API without registering the strategy, provided you access the API from a fixed internet address with two-factor login and you are the one who wrote it. Cross the threshold and the algo must be registered with the exchange through your broker.

Vendors must be empanelled. Anyone selling or providing algos to retail clients must be empanelled with an exchange and acts as the broker's agent, which makes the broker answerable for them.

White box or black box. If a strategy's logic is disclosed and could be replicated by the user, it is a white box algo. If the logic is hidden, it is a black box, and whoever provides it must be registered with SEBI as a research analyst and keep documentation of what it does and why. This is the clause that ended the business of selling secret "AI strategies" to the public without accountability.

## What it means for you

If you want to automate something sensible, you can. Buying a fixed rupee amount of an index fund on the first trading day of the month, rebalancing a portfolio back to target weights every quarter, placing stop losses computed from the position sizing rules in the Advanced course, sending yourself an alert when a holding breaks its 200-day average: all of this runs comfortably below the order threshold and is now unambiguously permitted through a broker API, with your own code, from your own machine.

If you want to buy somebody's strategy, you may do that too, but only from an empanelled provider, and if the provider will not show you the logic, they must be a registered research analyst. Anybody offering a black box strategy on Telegram with a screenshot of returns is operating outside the rules, and the rules now exist precisely so that you can tell.

## What automation does and does not do

It does not create an edge. A rule that loses money by hand loses money faster when a computer runs it. The retail APIs are rate limited and travel over the public internet; you are not competing with the exchange's co-located machines on speed, and any strategy that depends on being first is not available to you.

Backtesting, the step where you check a rule against past data, is where most retail algos are born and most of them are lies. The common sins: fitting the rule so tightly to the past that it describes noise, using information that was not available at the time, ignoring transaction costs and the securities transaction tax, and testing only on companies that survived. A strategy that returns 40 percent a year in a backtest and 4 percent live has not been unlucky. It was never real.

What automation genuinely offers is discipline. The rules you decided on calmly on a Sunday get executed on a Tuesday afternoon when you would have hesitated. For most investors that is worth more than any signal, and it is the honest reason to write a small program at all.

## The rest is the same

Taxes do not care whether a human or a program clicked. Delivery trades are capital gains, intraday is speculative business income, futures and options are business income, exactly as the Advanced tax lesson lays out. Charges per order are the same, which matters more for a program that trades often than for a person who trades rarely. And the regulator's finding that most frequent traders lose money was computed on orders placed by humans and machines alike.

*The rules summarised here come from SEBI's circular of 4 February 2025 and the exchanges' implementation standards, mandatory for all brokers from 1 April 2026. Rechecked in November 2026 against brokers' published notices. Thresholds and procedures are set by the exchanges and change, so confirm the current standards with your broker before running anything.*
