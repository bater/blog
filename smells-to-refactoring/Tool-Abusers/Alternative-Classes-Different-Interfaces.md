---
sidebar_position: 4
title: Alternative Classes with Different Interfaces
---

# Alternative Classes with Different Interfaces

This is a fancy way of saying "Two classes do the same thing but look different." 

Imagine you have two classes in your system: `EmailSender` and `Mailer`. One has a method `send(to, body)`, and the other has `deliver(recipient, content)`. They do the exact same job. But because their interfaces are different, you can't swap them out easily. You can't use polymorphism. You're stuck writing duplicate code to handle each one.

## Signs of the Smell

- Two classes appear to perform identical functions.
- Methods have different names or parameter orders but do the same logic.

## Reasons of the Smell

**Lack of Communication**: Two different developers wrote two different classes for the same purpose.
**Inconsistent Evolution**: One library was updated one way, another was updated differently.

## Refactoring Recipe

- Rename Method
- Move Method
- Extract Superclass

### Rename Method

The simplest first step. If `Mailer` has `deliver()` and `EmailSender` has `send()`, rename one of them so they match.

**Before:**
```java
class AmazonCloud {
    void uploadFile(File f) { ... }
}
class GoogleCloud {
    void push(File f) { ... }
}
```

**After:**
```java
class AmazonCloud {
    void upload(File f) { ... } // Renamed
}
class GoogleCloud {
    void upload(File f) { ... } // Renamed
}
```

Now that the signatures match, you can extract a common interface `CloudStorage` and treat them polymorphically!

### Move Method

Sometimes a class is "alternative" because it's missing just *one* piece of functionality that the other has. Move methods around until they truly are equivalent, then engage polymorphism.

## References

- [Refactoring Guru - Alternative Classes with Different Interfaces](https://refactoring.guru/smells/alternative-classes-with-different-interfaces)