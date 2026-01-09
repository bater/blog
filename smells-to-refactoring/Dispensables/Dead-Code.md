---
sidebar_position: 4
title: Dead Code
---

# Dead Code

"Dead Code" is code that is never executed. It’s like a room in your house that you bricked up years ago and forgot about. It consumes compile time, confuses new developers ("What is this `calculateOldTax()` method used for?"), and clutters the IDE.

It manifests as unused methods, variables, parameters, or even entire classes.

## Signs of the Smell

- A method is defined but never called.
- A variable is assigned but never read.
- A parameter is passed to a function but never used inside.
- Complex conditional branches that can never be reached (e.g., `if (true == false)`).

## Reasons of the Smell

**Requirements Changed**: You stopped using a feature, but you forgot to delete the code for it.
**Obsolete Fixes**: Code left over from a previous bug fix that is no longer relevant.
**Fear**: "I better not delete this, I might need it someday!" (This is what Version Control is for!).

## Refactoring Recipe

- Divide and Conquer
- Remove Parameter

### Divide and Conquer (Just Delete It!)

The primary fix for Dead Code is deletion. Modern IDEs are great at finding unused references. Trust them. If it's greyed out, delete it.

**Before:**
```java
public void doSomething(int x, int unused) {
    int y = x + 10;
    // int z = y * 2;  <-- Commented out code is also Dead Code!
    System.out.println(y);
}
```

**After:**
```java
public void doSomething(int x) {
    int y = x + 10;
    System.out.println(y);
}
```

### Remove Parameter

If a method parameter is no longer used, remove it from the signature.

**Before:**
```java
void printDate(Date date, boolean oldFormat) {
    System.out.println(date.toString());
}
```

**After:**
```java
void printDate(Date date) {
    System.out.println(date.toString());
}
```

## References

- [Refactoring Guru - Dead Code](https://refactoring.guru/smells/dead-code)
- [C2 Wiki - Dead Code](https://wiki.c2.com/?DeadCode)