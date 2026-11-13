---
title: "How to read an annual report in 20 minutes with AI, and not get fooled by it"
excerpt: "A step-by-step workflow for letting a language model do the page-turning on a 300-page annual report: the prompts, the extraction table, the verification pass that catches invented numbers, and the questions a model cannot answer for you."
metaTitle: "How to read an annual report with AI"
metaDescription: "A step-by-step AI workflow for a 300-page annual report: the prompts, the check that catches invented numbers, and the questions AI can't answer."
category: "Bazaar AI"
tags: ["AI", "Annual report", "Workflow", "Research"]
author: "Bazaar School Team"
date: "2026-11-09"
image: "/images/articles/ai-annual-report-workflow.jpg"
readTime: "10 min"
draft: false
---

The Intermediate chapter on [reading an annual report](/how-to-read-an-annual-report/) teaches you to read one backwards and find the six pages that matter. Done by hand the first time, that takes about ninety minutes. This article gets the same result in twenty, by handing the page-turning to a language model and keeping the judgment for yourself. The split is the whole method: the model finds and extracts, you verify and decide.

## What you need

A PDF of the annual report, downloaded from the company's investor page or the exchange's filings section. Any AI tool that accepts a file upload and answers questions about it; the general chatbots all do this now, and Google's NotebookLM is particularly suited because it answers only from the documents you give it and cites the passage each answer came from. Annual reports are public documents, so uploading one raises no privacy question. Never upload your own account statements or anything with your personal details to the same tool.

Use the consolidated statements, and tell the model so.

## The twenty minutes

| Step | Minutes | What you do |
| --- | --- | --- |
| Set up | 2 | Download the PDF, note the financial year, upload it |
| Extract the numbers | 3 | Prompt A, below |
| The auditor | 3 | Prompt B |
| The notes | 4 | Prompt C |
| What changed | 3 | Prompt D, with last year's report |
| Verify | 5 | Open every cited page for the numbers that matter |

## Prompt A: the numbers table

```
Using only the attached annual report, and the consolidated statements where
both exist, build a table for the latest two financial years with these rows:
revenue from operations, net profit after tax, net cash from operating
activities, total borrowings, trade receivables, inventories, and the number
of shares outstanding. For each figure give the page number it came from and
the unit used on that page (lakh or crore). If a figure is not in the
document, write "not found". Do not estimate or fill gaps.
```

The unit instruction matters more than it looks. Indian reports switch between lakh, crore and millions, sometimes within the same table, and a model that silently converts will hand you a number off by a factor of a hundred.

## Prompt B: the auditor's report

```
Find the independent auditor's report on the consolidated financial
statements. Quote the opinion paragraph word for word and tell me whether the
opinion is unmodified, qualified, adverse or a disclaimer. Then list every key
audit matter as a one-line summary with its page number. Finally, tell me
whether the report mentions any emphasis of matter or material uncertainty
about going concern, quoting the sentence if so.
```

Read the quoted opinion yourself. If the model paraphrases instead of quoting, ask again. The exact words are the point.

## Prompt C: the two notes

```
From the notes to the consolidated financial statements, do two things.
First, list every related party transaction with a value above 10 crore
rupees: the party, the relationship, the nature of the transaction and the
amount, with page numbers. Second, list all contingent liabilities with their
amounts and a one-line description, with page numbers, and give the total.
```

Then ask one follow-up: "Which related parties are entities owned or controlled by the promoters or directors?" That is the list the annual report chapter told you to worry about.

## Prompt D: what changed

Upload last year's report alongside this year's and ask:

```
Compare the two annual reports. List the risk factors in the management
discussion that appear in the new report but not the old one. List any change
in the key audit matters. List any new borrowings, guarantees or related
parties that were not present last year. Cite pages in both documents.
```

Change is where the information is. A risk factor that appears for the first time was put there by a lawyer who insisted, and that is worth knowing.

## The verification pass

This is the step that makes the workflow safe, and the one everyone is tempted to skip.

For every number that would change your decision, open the cited page and read it with your own eyes. Models misread tables in PDFs. They pick the standalone column when you asked for consolidated. They drop a minus sign on a negative cash flow. They confuse the current year's column with the previous year's, which in Indian reports often sit side by side with the newer year on the left. They occasionally cite a page that contains no such number at all, with complete confidence.

Five minutes of checking usually finds one such error per report. If you find none, good. If you find several, discard the extraction and repeat it with a different tool, because a model that is wrong about the easy numbers is wrong about the hard ones too.

A useful habit: ask the model, at the end, "List every figure in your answers that you are not certain came directly from the document." Models asked this directly will often flag their own guesses.

## What the model cannot do

It cannot tell you whether receivables growing faster than sales is a problem in this particular industry, because that requires knowing the industry. It cannot see what management chose not to disclose. It cannot know whether the share price already reflects everything in the report, which is the only question that determines whether you make money. And it will not notice that the chairman's letter is talking around something unless you ask it to compare the letter's claims with the numbers, which is a good final prompt if you have a minute left.

## When it goes wrong

Scanned reports, common for smaller companies, need text recognition before a model can read them; most tools do this automatically now, but errors multiply. Very large files sometimes get silently truncated, so if answers about the notes come back thin, split the PDF and upload the financial statements section on its own. And be suspicious of fluency. The more confident and well organised an answer looks, the more it tempts you to skip the page check, and the page check is the only part of this workflow that is not optional.

Twenty minutes, four prompts, one verification pass. After the first few reports you will notice that the model's extraction has become the easy part, and that the questions you ask it have become the ones from the annual report chapter. That is the point at which the tool has made you a better reader rather than a lazier one.
