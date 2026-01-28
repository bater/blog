---
sidebar_position: 1
title: Introduction
slug: /
---

# Code Smells to Refactorings

A systematic approach to identifying code smells and applying refactoring techniques to improve code quality.

## Overview

I wrote this guide while exploring the relationship between code smells and their corresponding refactoring solutions. Originally inspired by Sandi Metz's brilliant tech talk "Get a Whiff of This" at RailsConf 2016, this series provides practical guidance for recognizing and eliminating common code quality issues.

## What Are Code Smells?

One of the important concepts from Sandi Metz's talk is that code smells are **neutral** - they're not always **bad**, but they provide valuable information. If nothing ever changes, it is probably okay. However, in most cases, new requirements will keep coming and code will need to change - that's exactly why companies hire developers like us to maintain their projects.

Code smells are **not bugs** - they work just as intended. Refactoring involves rearranging code without altering its behavior. Thus, refactoring a bad smell is not the same as fixing a bug because the behavior is expected to remain the same after refactoring. In practice, it's recommended to apply these refactoring techniques while fixing bugs or implementing new features to maintain code quality.

### "If It Ain't Broke, Don't Fix It"?

Some people dislike refactoring precisely because it doesn't add any new features or fix bugs, and may introduce additional risks into stable old code. Maintaining system stability is often the top priority, especially in government institutions, banks, or insurance accounting systems - where you can often find code fragments older than the developers themselves. But let's face reality: if we continue to resist change, there are also risks.

Unless the project has a very specific expiration date (like a marketing campaign) and will not be used again, considering long-term maintenance costs, regular code cleanup is always a better choice.

### Do We Still Need to Care About Smells and Refactoring in the AI Era?

This series was originally written in late 2023. At that time, GitHub Copilot had already appeared, but it was mostly seen as an auxiliary tool - more of a novelty experience than a core part of the development process. By 2026, the situation has completely changed. Anthropic, for example, has publicly stated that over 70% of their code is AI-generated. At this scale, it's no longer possible for humans to perform traditional line-by-line code reviews - quality control must be assisted by another AI agent.

In an environment where Vibe Coding (a development style that relies entirely on AI-generated code, where developers only describe requirements in natural language) is prevalent, some even argue that code itself should be treated as a disposable artifact. What truly needs long-term maintenance are only prompts, specifications, and documentation - implementation details are left entirely to the model's discretion.

And so, a question naturally emerges: when both development and review become increasingly black-boxed, and the human role retreats to final behavior verification, does code quality - or even that craftsman spirit of meticulously refining code details - still have a reason to exist?

Honestly, this question troubled me for a long time, until I encountered an extremely practical constraint.

Even when the entity reading and modifying code shifts from humans to AI, code with fewer smells and clearer structure remains "easier to understand and modify" for AI as well. Conversely, when a project is full of smells and modern IDEs and analysis tools throw out massive warnings, this low-quality noise rapidly consumes precious tokens and can even mislead the model's judgment.

It's precisely for this reason that in 2026 - an era where "AI development capabilities have generally surpassed 90% of humans" - maintaining code quality remains an important and practical engineering choice, not just nostalgia or fastidiousness of old-school craftsmen.

Of course, a caveat must be noted here. If future development models evolve to the point where code itself degrades into something like compiled machine code, humans communicate with AI only through natural language, and AI can generate disposable applications and complete tasks in negligible time - then I agree: under those conditions, discussing code quality itself may indeed lose its meaning, just as we wouldn't examine whether minified .min.js is elegant.

But even if we reach that point, smells won't disappear - they'll just relocate. They'll shift from code to documentation and requirements. Ambiguous, contradictory, and overly coupled specifications and descriptions will still produce low-quality systems and still frustrate end users.

### Our Code Is Our Working Environment

In Japanese culture, even when there are dedicated cleaning staff, there is significant emphasis on employees cleaning their own working environment. This practice is not only about maintaining sanitation, but also a ceremony to express discipline and appreciation for the working environment.

As software developers, our codebase is our digital working environment. Keeping the code tidy and clean is an essential part of our job duties - in a sense, it can be seen as professional ethics and part of the craftsman spirit.

## Understanding Code Smell Categories

To gain a clearer understanding of what needs to be refactored, we first need to understand what constitutes "code smell". Each code smell has a specific name and definition, with corresponding solutions for improvement. As Sandi mentioned in her talk, each code smell can be remedied by a specific refactoring recipe. By following these recipes, we can systematically improve our code quality.

We can classify classic code smells into five main categories:

### [Bloaters](./Bloaters/)

It doesn't need to be that big. Code that has grown too large to handle effectively:

- [Long Method](./Bloaters/Long-Method)
- [Large Class](./Bloaters/Large-Class)
- [Primitive Obsession](./Bloaters/Primitive-Obsession)
- [Long Parameter List](./Bloaters/Long-Parameter-List)
- [Data Clumps](./Bloaters/Data-Clumps)

### [Tool Abusers](./Tool-Abusers/)

These are common tools in object-oriented programming, but you can easily misuse them, resulting in incorrect or incomplete application of OOP principles:

- [Switch Statements](./Tool-Abusers/Switch-Statements)
- [Refused Bequest](./Tool-Abusers/Refused-Bequest)
- [Alternative Classes with Different Interfaces](./Tool-Abusers/Alternative-Classes-Different-Interfaces)
- [Temporary Field](./Tool-Abusers/Temporary-Field)

### [Change Preventers](./Change-Preventers/)

These are smells that make change hard. Code that makes modifications difficult:

- [Divergent Change](./Change-Preventers/Divergent-Change)
- [Shotgun Surgery](./Change-Preventers/Shotgun-Surgery)
- [Parallel Inheritance Hierarchies](./Change-Preventers/Parallel-Inheritance-Hierarchies)
- [Combinatorial Explosion](./Change-Preventers/Combinatorial-Explosion)

### [Dispensables](./Dispensables/)

A dispensable is something unnecessary that, if removed, would make the code cleaner, more efficient, and easier to understand:

- [Lazy Class](./Dispensables/Lazy-Class)
- [Speculative Generality](./Dispensables/Speculative-Generality)
- [Data Class](./Dispensables/Data-Class)
- [Duplicated Code](./Dispensables/Duplicated-Code)
- [Comments](./Dispensables/Comments)
- [Dead Code](./Dispensables/Dead-Code)
- [Oddball Solution](./Dispensables/Oddball-Solution)

### [Couplers](./Couplers/)

It binds objects together - you can never reach in and get one out to use in another context. They come as a bundle, all or nothing. Excessive coupling between classes:

- [Feature Envy](./Couplers/Feature-Envy)
- [Inappropriate Intimacy](./Couplers/Inappropriate-Intimacy)
- [Message Chains](./Couplers/Message-Chains)
- [Middle Man](./Couplers/Middle-Man)
- [Indecent Exposure](./Couplers/Indecent-Exposure)

### [Other Smells](./Other-Smells)

Code smells that don't fit neatly into the main categories but are still worth understanding.

## How to Use This Guide

1. **Identify the Smell** - Learn to recognize problematic patterns
2. **Understand the Impact** - See why each smell is problematic
3. **Apply Refactoring Techniques** - Use systematic approaches to improve the code
4. **Verify Improvements** - Ensure the refactoring maintains functionality while improving design

## Key Principles

- **Make the change easy, then make the easy change**
- **Code should be written for humans (and AI) to read**
- **Refactoring preserves behavior while improving design**
- **Small, incremental improvements are better than large rewrites**

## References

- [Get a Whiff of This - Sandi Metz](https://youtu.be/PJjHfa5yxlU)
- [Refactoring: Improving the Design of Existing Code - Martin Fowler](https://martinfowler.com/books/refactoring.html)
- [Refactoring Guru](https://refactoring.guru/)
- [Industrial Logic Refactoring Catalog](https://www.industriallogic.com/xp/refactoring/catalog.html)
- [Quick Reference Guide](./Quick-Reference)
