---
sidebar_position: 5
title: Duplicated Code
---

# Duplicated Code

"Duplicate Code" is often the root of all evil in software. It sneakily creeps into your project when you copy-paste a snippet from Stack Overflow or even from your own file because "it's just a few lines."

The problem is that every time you duplicate code, you double your maintenance burden. If you find a bug in one copy, you have to remember to fix it in the other copies too. And let's be honest: you will forget.

> "Duplication is the primary enemy of a well-designed system." — Robert C. Martin

## Signs of the Smell

- The same code structure appears in more than one place.
- You see two classes that perform almost the same task but with different variable names.
- You find yourself copying a block of code and making minor tweaks.

## Reasons of the Smell

**Laziness**: It’s faster to copy-paste than to think about how to abstract the logic.
**Multiple Authors**: Two developers implement the same feature in different places without talking to each other.
**Rush**: "I'll clean this up later" (which usually means "never").

## Refactoring Recipe

- Extract Method
- Pull Up Method
- Form Template Method

### Extract Method

The easiest fix for duplication within the same class.

**Before:**
```java
void printOwing() {
    printBanner();
    System.out.println("name: " + name);
    System.out.println("amount: " + getOutstanding());
}

void printCredit() {
    printBanner(); // Duplicated!
    System.out.println("name: " + name);
    System.out.println("credit: " + getCredit());
}
```

**After:**
```java
void printOwing() {
    printDetails(getOutstanding(), "amount");
}

void printCredit() {
    printDetails(getCredit(), "credit");
}

void printDetails(double val, String label) {
    printBanner();
    System.out.println("name: " + name);
    System.out.println(label + ": " + val);
}
```

### Pull Up Method

If two subclasses share the same method, move it up to the superclass.

**Before:**
```java
class Car extends Vehicle {
    void turn() { ... }
}
class Truck extends Vehicle {
    void turn() { ... } // Identical to Car.turn()
}
```

**After:**
```java
class Vehicle {
    void turn() { ... }
}
```

## References

- [Refactoring Guru - Duplicate Code](https://refactoring.guru/smells/duplicate-code)
- [Martin Fowler - Duplicated Code](https://refactoring.com/catalog/duplicatedCode.html)