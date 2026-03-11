---
layout: post.njk
title: "Prompt Engineering: The Practical Guide That Actually Works"
date: 2026-03-11
description: "Skip the vague tips. Here's a systematic approach to writing prompts that get reliable, high-quality results from any LLM."
tags: ["post", "Prompt Engineering"]
---

Most "prompt engineering" guides are just lists of magic phrases. This one isn't. Understanding *why* certain prompts work makes you far more effective than memorizing templates — and helps you adapt when a model doesn't behave as expected.

## Why Prompting Is a Real Skill

LLMs are not search engines. You don't query them — you *converse* with them, and the framing of your input shapes their output dramatically.

The same underlying question, phrased differently, can produce an expert-level answer or a generic non-answer. Prompting is the skill of collapsing that gap consistently.

> A bad prompt doesn't mean the model is dumb. It usually means the model is solving the wrong problem.

## The Mental Model: Role + Task + Format + Constraints

Before writing any prompt, nail down these four things:

- **Role** — Who should the model be? (an expert, a critic, a copywriter)
- **Task** — What exactly needs to happen?
- **Format** — How should the output look? (bullet list, table, essay, code)
- **Constraints** — What should it avoid? What assumptions should it not make?

Skipping any of these is the most common reason prompts produce mediocre results.

## Technique 1 — Be Explicit About the Output Format

Vague prompt:
```
Summarize this article.
```

Better prompt:
```
Summarize this article in exactly 3 bullet points. 
Each bullet should be one sentence. 
Do not include opinions — only facts from the text.
```

The model doesn't know what "summarize" means to *you*. Define it explicitly and you'll get consistent results.

## Technique 2 — Chain-of-Thought Prompting

For any task involving reasoning, logic, or multi-step problems, tell the model to think before answering.

```
Before giving your final answer, work through this step-by-step.
Show your reasoning.
```

This simple instruction dramatically improves accuracy on math problems, code debugging, and analytical tasks. The model "externalizes" its reasoning, which both improves quality and lets you catch errors.

For harder problems, use **zero-shot chain-of-thought**:

```
Let's think through this carefully, step by step.
```

That phrase alone was shown in research to significantly boost performance on reasoning benchmarks.

## Technique 3 — Give Examples (Few-Shot Prompting)

If you want a specific style, tone, or structure — show it, don't describe it.

```
Classify the sentiment of customer reviews. Use only: Positive, Negative, Neutral.

Review: "The battery lasts forever, love it."
Sentiment: Positive

Review: "Arrived broken and support was useless."
Sentiment: Negative

Review: "It works fine I guess."
Sentiment:
```

Two or three examples are usually enough. The model extrapolates the pattern rather than trying to interpret your description of the pattern.

## Technique 4 — Assign a Role

Roles prime the model to draw on a specific cluster of knowledge and communication style.

```
You are a senior backend engineer doing a code review. 
Be direct and prioritise security and performance issues over style.
```

vs.

```
Review this code.
```

The role prompt doesn't restrict what the model knows — it shapes *how* it applies that knowledge and what it chooses to surface.

## Technique 5 — Specify What NOT to Do

Negative constraints are underused and powerful.

```
Do not include a disclaimer at the end.
Do not suggest consulting a professional.
Do not repeat the question back to me.
```

Models have strong default behaviours baked in from alignment training. Explicit negative constraints let you override them when you already know the context and just need the output.

## Technique 6 — Iterative Refinement

Treat the first response as a draft, not a final answer.

```
That's a good start. Now make it 30% shorter 
and replace any jargon with plain language.
```

```
Good. Now restructure it so the most important 
point comes first.
```

LLMs maintain context across the conversation. You don't need to re-explain everything — just specify the delta from the previous response. Professionals who get consistently great results from AI almost always iterate rather than expecting a perfect first output.

## Technique 7 — Ask the Model to Ask You

When you're not sure what information the model needs:

```
I want you to help me write a job posting for a software engineer role.
Before you write anything, ask me the questions you need answered 
to do this well.
```

This surfaces your own knowledge gaps and produces much more targeted output than starting from scratch.

## Common Mistakes to Avoid

**Overloading a single prompt.** If you need the model to research, then analyse, then write — break it into separate prompts. Chaining tasks together often degrades quality on each individual task.

**Being vague about audience.** "Explain this simply" means different things to different people. Try: *"Explain this to someone who knows Python but has never used an API."*

**Ignoring system prompts.** If you're using the API or a tool with system prompt access, use it. The system prompt sets persistent context and behaviour across the whole conversation — it's far more efficient than repeating instructions in every message.

**Assuming the model knows your context.** It doesn't. If you're a doctor asking about drug interactions, say so. If you're building a children's app, say so. Context changes everything.

## A Template to Steal

Here's a general-purpose structure that works across most tasks:

```
# Role
You are [specific role/expertise].

# Task
[Clear description of what needs to happen.]

# Context
[Relevant background the model needs. What's the goal? Who's the audience?]

# Format
[How should the output be structured? Length? Style?]

# Constraints
- Do not [X]
- Avoid [Y]
- Assume [Z]

# Input
[The actual content to work on, if applicable.]
```

You don't need all six sections every time. But running through this checklist mentally before writing any significant prompt will improve your hit rate dramatically.

## Where Prompt Engineering Is Heading

As models get better at instruction-following, the gap between a mediocre and excellent prompt narrows. But it never closes — because the bottleneck shifts from "making the model understand you" to "knowing exactly what you want."

The real skill, now and in the future, is **clarity of thinking**. Prompt engineering is just that clarity, made explicit.