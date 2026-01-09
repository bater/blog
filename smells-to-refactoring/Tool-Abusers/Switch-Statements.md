---
sidebar_position: 2
title: Switch Statements
---

# Switch Statements

You might be thinking, "What's wrong with a switch statement? It's a basic feature of the language!" You're right. A single switch statement is fine. But when you start seeing the *same* switch statement scattered across your codebase—switching on the same type code or enum—you have a smell.

If you add a new type (e.g., a new `EmployeeType`), you have to remember to find and update every single one of those switch statements. If you miss one, you get a bug. This violates the Open/Closed Principle: you should be able to add new types without modifying existing code.

> "Most times you see a switch statement you should consider polymorphism." — Martin Fowler

## Signs of the Smell

- You see the same `switch` or `if-else` chain in multiple places.
- The switch is based on a type code (e.g., `if (type == "MANAGER")`).
- You have to modify existing code whenever you add a new type.

## Reasons of the Smell

**Procedural Thinking**: It's easy to just write a list of instructions. Thinking in objects (polymorphism) takes a bit more effort upfront but pays off in flexibility.

## Refactoring Recipe

- Replace Conditional with Polymorphism (The big one!)
- Replace Type Code with State/Strategy
- Replace Parameter with Explicit Methods

### Replace Conditional with Polymorphism

The goal is to move the logic for each specific type into its own class.

**Before:**
```java
class Bird {
    int type;
    double getSpeed() {
        switch (type) {
            case EUROPEAN:
                return getBaseSpeed();
            case AFRICAN:
                return getBaseSpeed() - getLoadFactor();
            case NORWEGIAN_BLUE:
                return (isNailed) ? 0 : getBaseSpeed();
        }
        throw new RuntimeException("Should be unreachable");
    }
}
```

**After:**
```java
abstract class Bird {
    abstract double getSpeed();
}

class EuropeanBird extends Bird {
    double getSpeed() { return getBaseSpeed(); }
}

class AfricanBird extends Bird {
    double getSpeed() { return getBaseSpeed() - getLoadFactor(); }
}

class NorwegianBlueBird extends Bird {
    double getSpeed() { return (isNailed) ? 0 : getBaseSpeed(); }
}
```
Now, adding a new bird only requires creating a new class. No existing code needs to be touched.

### Replace Parameter with Explicit Methods

If a method switches on a parameter to decide what to do, just split it into two methods.

**Before:**
```java
void setValue(String name, int value) {
    if (name.equals("height")) {
        this.height = value;
    }
    if (name.equals("width")) {
        this.width = value;
    }
}
```

**After:**
```java
void setHeight(int value) { this.height = value; }
void setWidth(int value) { this.width = value; }
```

## References

- [Refactoring Guru - Switch Statements](https://refactoring.guru/smells/switch-statements)
- [Martin Fowler - Replace Conditional with Polymorphism](https://refactoring.com/catalog/replaceConditionalWithPolymorphism.html)