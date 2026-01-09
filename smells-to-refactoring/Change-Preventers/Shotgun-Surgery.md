---
sidebar_position: 3
title: Shotgun Surgery
---

# Shotgun Surgery

Imagine firing a shotgun. The pellets scatter everywhere, hitting multiple targets with a single shot. That's exactly what it feels like when you try to modify code suffering from Shotgun Surgery. You want to change just one simple thing—perhaps a database column name or a tax calculation rule—but you find yourself having to visit 15 different classes to make small, annoying updates.

It’s tedious, error-prone, and frustrating. If you miss just one of those 15 places, your application might crash or behave unexpectedly. Unlike "Divergent Change," where one class suffers from too many changes, "Shotgun Surgery" is when one change ripples out to damage (or require fixes in) many classes.

## Signs of the Smell

- You make a single logical change (e.g., "Add a new status code"), and you have to update multiple different classes.
- The changes are small and scattered across the codebase.
- You often forget one or two places, leading to bugs.

## Reasons of the Smell

**High Coupling**: Classes are too tightly coupled to specific details. If many classes know about the internal structure of a database table, they all break when that table changes.

**Code Duplication**: Logic (like validation or formatting) is repeated across many files instead of being centralized.

**Violation of Single Responsibility**: The responsibility for a single business rule is spread across multiple classes.

## Refactoring Recipe

- Move Method
- Move Field
- Inline Class

### Move Method / Move Field

If you see the same logic or data usage scattered, move it all into a single class that fits that responsibility. If no such class exists, create one!

**Before:**
```java
class Account {
    void check() {
        if (email.contains("@") && email.contains(".")) { ... }
    }
}
class Order {
    void validate() {
        if (email.contains("@") && email.contains(".")) { ... }
    }
}
```

**After:**
```java
class EmailValidator {
    public static boolean isValid(String email) {
        return email.contains("@") && email.contains(".");
    }
}

class Account {
    void check() {
        if (EmailValidator.isValid(email)) { ... }
    }
}
```

### Inline Class

Sometimes execution of a responsibility is spread across a few classes that are too small or don't do enough. Merging them into a single class (Inlining) can centralize the logic, preventing the need to jump between files.

## References

- [Refactoring Guru - Shotgun Surgery](https://refactoring.guru/smells/shotgun-surgery)
- [Martin Fowler - Shotgun Surgery](https://refactoring.com/catalog/shotgunSurgery.html)