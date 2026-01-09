---
sidebar_position: 1
title: Overview
slug: /Dispensables
---

# Overview

"Dispensables" are the things in your code that shouldn't be there. They are the clutter, the excess baggage, the "just in case" logic that never got used. If you removed them, the code would work exactly the same (or better), but it would be cleaner, easier to understand, and faster to modify.

Think of it like cleaning your house. You have a drawer full of old cables, broken pens, and receipts from 2015. They don't help you live your life; they just make it harder to find the one working charging cable you actually need.

Dispensable smells are usually the easiest to fix: just delete them! But sometimes, they are hiding in plain sight, disguised as "helpful" comments or "future-proof" classes.

## Smell List

Here are the classic smells in this category:

### Comments

When you feel the need to write a comment to explain *what* the code is doing, it usually means the code isn't clear enough.

### Duplicate Code

The same code structure appears in more than one place. It’s copy-paste programming at its finest.

### Lazy Class

A class that doesn't do enough to justify its existence. It's just taking up space.

### Data Class

A class that has fields and getters/setters but no behavior. It's a sign that logic is in the wrong place.

### Dead Code

Variable, parameter, field, method or class which is no longer used (usually because it is obsolete).

### Speculative Generality

"I'll add this hook/interface/parameter just in case we need it later." (Spoiler: You won't).

### Oddball Solution

A problem is solved in a different way than the rest of the project. It stands out like a sore thumb.

---

In this section, we'll look at how to identify this clutter and confidently hit the delete key (or refactor it into something useful).