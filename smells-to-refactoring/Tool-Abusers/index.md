---
sidebar_position: 1
title: Overview
slug: /Tool-Abusers
---

# Overview

Software development offers us many powerful tools: inheritance, switch statements, and temporary fields. But as the saying goes, "If the only tool you have is a hammer, you tend to see every problem as a nail."

"Tool Abusers" (also known as Object-Orientation Abusers) are code smells that occur when developers misuse otherwise valid programming constructs. These implementations technically work, but they violate the principles of good design—like polymorphism, encapsulation, and the Liskov Substitution Principle.

Inheritance is great, but not if you refuse half the parent's logic. Switch statements are part of the language, but spreading them everywhere makes code brittle.

## Smell List

Here are the classic smells in this category:

### Switch Statements

You have complex `switch` or `if-else` sequences scattered throughout your code. It's often a sign that you should be using polymorphism.

### Refused Bequest

A subclass inherits methods and data from a parent but only uses a few of them. It’s like inheriting a mansion but living in the garage.

### Alternative Classes with Different Interfaces

Two classes do the same thing but have different method names. It makes them hard to swap out.

### Temporary Field

A field in a class is used only in certain circumstances. The rest of the time, it's empty or irrelevant, confusing anyone trying to understand the object's state.

---

In this section, we will see how to leverage Object-Oriented principles correctly to fix these abuses.