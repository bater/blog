---
sidebar_position: 1
title: Couplers
slug: /Couplers
---

# Couplers

"Couplers" are the code smells that represent excessive coupling between classes. Coupling is a measure of how closely connected two modules are. If they are too tightly coupled, changing one requires changing the other.

Think of your code like a stereo system. In a good system, you can unplug the speakers and plug in new ones because the connection (the interface) is standard and simple. In a bad system ("Coupled"), the speaker wires are soldered directly onto the motherboard. You can't upgrade the speakers without buying a new amplifier.

When classes are too intimate, know too much about each other, or envy each other's data, your system becomes rigid and fragile.

## Smell List

Here are the classic smells in this category:

### Feature Envy

A method seems more interested in a class other than the one it actually is in. It envies the data of another class.

### Inappropriate Intimacy

Classes spend too much time together, accessing each other's private parts. A subclass knowing too much about its parent is also a form of this.

### Message Chains

The classic `a.getB().getC().doSomething()`. The client is coupled to the structure of the navigation.

### Middle Man

The opposite of Message Chains. A class does too much simple delegation, acting as a wrapper that adds no value.

### Indecent Exposure

Classes or methods that are public when they ought to be private. It invites coupling where there shouldn't be any.

---

In this section, we will look at how to untangle these relationships and restore healthy boundaries to your objects.