---
sidebar_position: 1
title: Introduction
slug: /
---

# Code Smells to Refactorings

A systematic approach to identifying code smells and applying refactoring techniques to improve code quality.

## Overview

This comprehensive guide explores the relationship between code smells and their corresponding refactoring solutions. Originally inspired by Sandi Metz's brilliant tech talk "Get a Whiff of This" at RailsConf 2016, this series provides practical guidance for recognizing and eliminating common code quality issues.

## What Are Code Smells?

One of the important concepts from Sandi Metz's talk is that code smells are **neutral** - they're not always **bad**, but they provide valuable information. If nothing ever changes, it is probably okay. However, in most cases, new requirements will keep coming, and that is why the company hires developers like us to maintain the project.

Code smells are not bugs - they work just as intended. Refactoring involves rearranging code without altering its behavior. Thus, refactoring a bad smell is not the same as fixing a bug because the behavior is expected to remain the same after refactoring. It is recommended to apply these refactoring techniques when fixing bugs or implementing new features.

### "If It Ain't Broke, Don't Fix It"?

Some people dislike refactoring because it doesn't add any new features or fix bugs, and may introduce additional risks into the stable old code. While maintaining stable behavior is sometimes the top priority, especially in banking or accounting systems, there are also risks if we don't change code.

Unless the project has a very specific expiration date (like marketing event) and will not be used again, it is always better to clean the code, considering the long-term prospects.

### Our Code Is Our Working Environment

In Japanese culture, there is a significant emphasis on employees cleaning their own working environment. This practice is not only about maintaining sanitation, but it is also a ceremony to express discipline and appreciation for the working environment.

As software developers, our codebase is our working environment. Keeping the code tidy and clean is an essential part of our job duties.

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

These are ideas that are available in object-oriented programming that you can misuse. Incorrect or incomplete application of object-oriented programming principles:

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

It binds the objects together, you can't ever reach in and get one out and use it in another context. They come as a bundle, all or nothing. Excessive coupling between classes:

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
- **Code should be written for humans to read**
- **Refactoring preserves behavior while improving design**
- **Small, incremental improvements are better than large rewrites**

## References

- [Get a Whiff of This - Sandi Metz](https://youtu.be/PJjHfa5yxlU)
- [Refactoring: Improving the Design of Existing Code - Martin Fowler](https://martinfowler.com/books/refactoring.html)
- [Refactoring Guru](https://refactoring.guru/)
- [Industrial Logic Refactoring Catalog](https://www.industriallogic.com/xp/refactoring/catalog.html)
- [Quick Reference Guide](./Quick-Reference)