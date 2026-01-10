---
sidebar_position: 1
title: Change Preventers
slug: /Change-Preventers
---

# Change Preventers

Welcome to the "Change Preventers" category. As the name suggests, these are the code smells that make your software resistant to change.

When you try to add a feature or fix a bug, do you feel like you're fighting the code? Do you have to touch a dozen files just to change a simple label? Or do you find that changing one class breaks five unrelated features? If so, you're likely dealing with Change Preventers.

> "For the things we have to learn before we can do them, we learn by doing them." — Aristotle

Software is meant to be "soft"—malleable and easy to change. These smells harden your codebase, making it brittle and difficult to maintain.

## Smell List

Here are the classic smells in this category:

### Divergent Change

Occurs when one class is changed for many different reasons. It violates the Single Responsibility Principle.

### Shotgun Surgery

Occurs when a single change requires you to make many small edits to many different classes. It's the opposite of Divergent Change.

### Parallel Inheritance Hierarchies

Occurs when every time you make a subclass of one class, you also have to make a subclass of another.

### Combinatorial Explosion

Occurs when a hierarchy of classes explodes in size because it tries to cover every combination of independent features using inheritance.

---

In this section, we will explore each of these smells in detail, understand why they happen, and learn how to refactor them away to make your code easier to change.