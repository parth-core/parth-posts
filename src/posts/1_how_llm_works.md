---
layout: post.njk
title: "How Large Language Models Actually Work"
date: 2026-03-11
description: "A clear, no-fluff breakdown of what LLMs are, how they're trained, and why they sometimes confidently get things wrong."
tags: ["post", "Artificial Intelligence"]
---

Large Language Models are everywhere right now — but most explanations either drown you in math or oversimplify to the point of being useless. This article sits in the middle: enough depth to actually understand what's happening, zero unnecessary jargon.

## What Is a Language Model, Really?

At its core, a language model does one thing: **predict the next token**.

A "token" is roughly a word or word-fragment. Given the sequence *"The capital of France is"*, the model assigns probabilities to every possible next token. "Paris" gets a very high probability. "Banana" gets essentially zero.

That's it. Everything you see from ChatGPT, Gemini, or Claude — the reasoning, the code, the essays — emerges from chaining that one operation millions of times.

> The miracle isn't that the model knows facts. It's that predicting tokens well enough, at scale, forces the model to build an internal model of the world.

## How Training Works

Modern LLMs are trained in two main phases.

### Phase 1 — Pre-training

The model reads an enormous corpus of text: web pages, books, code, academic papers. For each piece of text, it repeatedly tries to predict the next token, measures how wrong it was, and nudges its internal weights to do better next time.

This is called **self-supervised learning** — the "labels" (correct next tokens) come from the data itself. No human has to annotate anything. This is why you can train on trillions of tokens; the internet is the dataset.

After pre-training, the model is "base" — highly capable but raw. It'll complete your sentence, but not necessarily in a helpful way.

### Phase 2 — Alignment (RLHF)

Reinforcement Learning from Human Feedback teaches the model to be *useful and safe*, not just statistically plausible.

Human raters compare pairs of model outputs and pick the better one. A separate "reward model" is trained on these preferences, then used to fine-tune the main model via reinforcement learning.

This is why Claude feels different from GPT-4 even if both are large transformers — the alignment process shapes personality, caution, and communication style.

## The Transformer Architecture

All major LLMs use the **Transformer** architecture, introduced in the 2017 paper *"Attention Is All You Need"*.

The key innovation is **self-attention**: for every token in a sequence, the model learns which other tokens are most relevant to understanding it.

In the sentence *"The trophy didn't fit in the suitcase because it was too big"* — self-attention figures out that "it" refers to "trophy", not "suitcase". That disambiguation happens through learned attention weights, not explicit rules.

Stack enough of these attention layers, scale up parameters, and you get emergent capabilities that nobody explicitly programmed.

## Why LLMs Hallucinate

This is the most important thing to understand about deploying LLMs.

The model doesn't "know" facts the way a database does. It has **compressed statistical patterns** from its training data. When you ask something outside that distribution — a niche fact, a recent event, a precise calculation — the model still has to output *something*. It picks the most statistically plausible-sounding continuation.

Plausible-sounding ≠ true.

This is called **hallucination**, and it's not a bug that will simply be patched. It's a structural property of how these models work. The mitigations are:

- **Retrieval-Augmented Generation (RAG)** — give the model real documents to reference
- **Tool use** — let the model call a calculator, search engine, or API
- **Grounding prompts** — explicitly instruct the model to say "I don't know" when uncertain

## Context Windows

Every LLM has a context window — the maximum amount of text it can "see" at once. Early GPT models had 4,000 tokens (~3,000 words). Modern models like Gemini 1.5 Pro support over 1 million tokens.

What matters practically: **everything outside the context window doesn't exist to the model**. For long documents, coding projects, or multi-session tasks, managing context is as important as writing good prompts.

## What "Parameters" Actually Means

You'll hear numbers like "70 billion parameters" or "GPT-4 has over a trillion parameters". A parameter is just a number — a weight in the neural network that gets adjusted during training.

More parameters ≈ more capacity to store patterns. But it's not linear. A well-trained 7B model often outperforms a poorly-trained 70B model on specific tasks. **Training data quality and alignment matter as much as size.**

## Where This Is All Going

The current scaling hypothesis — more data + more compute + more parameters = smarter models — has held for years. But there are signs of diminishing returns on raw pre-training data.

The frontier is shifting toward:

- **Reasoning models** (like o1/o3) that spend more compute at inference time, thinking before answering
- **Multimodal models** that natively process images, audio, and video
- **Agentic systems** where models take actions in the world, not just produce text

Understanding the fundamentals above will help you make sense of every major development as this field moves fast.