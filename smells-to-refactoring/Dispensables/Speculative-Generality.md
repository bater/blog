---
sidebar_position: 8
title: Speculative Generality
---

# Speculative Generality

"Speculative Generality" is identifying "Just in Case" code. It’s when you add bells and whistles to your code to handle cases that *might* happen in the future, but currently don't exist.

Arguments are added to functions that are always passed the same value. Abstract classes are created that have only one subclass. Interfaces are defined for things that only have one implementation. It’s over-engineering at its finest.

> "YAGNI: You Aren't Gonna Need It."

## Signs of the Smell

- Methods with unused parameters.
- Class hierarchies that seem pointless (single subclass).
- Methods named `processAnything`, `handleGenericInput` when simple names would do.
- Code that handles "future requirements."

## Reasons of the Smell

**Over-Enthusiasm**: "I bet we’re going to need this later, so I’ll build it now to save time!" (Spoiler: It rarely saves time).
**Lack of Focus**: Focusing on a framework rather than the immediate business problem.

## Refactoring Recipe

- Collapse Hierarchy
- Inline Class
- Remove Parameter
- Rename Method

### Collapse Hierarchy

If you have an abstract class `AbstractAnimal` but only one actual animal `Dog`, just merge them.

**Before:**
```java
abstract class AbstractVehicle {
    abstract void drive();
}
class Car extends AbstractVehicle {
    void drive() { ... }
}
// No other vehicles exist
```

**After:**
```java
class Car {
    void drive() { ... }
}
```

### Remove Parameter

If a parameter is always passed as `null` or `0` or `true`, remove it.

**Before:**
```java
// "isTest" is always false in production code
public void save(Data d, boolean isTest) { ... }
```

**After:**
```java
public void save(Data d) { ... }
```

## References

- [Refactoring Guru - Speculative Generality](https://refactoring.guru/smells/speculative-generality)
- [Martin Fowler - Yagni](https://martinfowler.com/bliki/Yagni.html)