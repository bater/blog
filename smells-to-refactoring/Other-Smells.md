---
sidebar_position: 6
title: Incomplete Library Class
---

# Incomplete Library Class

We all love third-party libraries. They save us time, they are often well-tested, and they prevent us from reinventing the wheel. But sometimes, the wheel they give us is missing a spoke.

You find a library that does 99% of what you need, but that one crucial method—like `GetDateNextTuesday()`—is missing. You can't change the library because it's read-only or managed by a package manager. So, you end up writing raw, complex logic in your own code to bridge the gap. That is the Incomplete Library Class smell.

It’s annoying, but you don’t have to suffer with scattered workarounds.

## Signs of the Smell

- You find yourself writing the same helper logic around a library class in multiple places.
- You wish you could just extend the library class, but you can't (or haven't).
- Your code is littered with static helper methods that take an instance of the library class as the first argument.

## Reasons of the Smell

**Unfinished Libraries**: The library author didn't foresee your specific use case.
**Locked Code**: You can't modify the library source code directly (e.g., it's a compiled JAR or a remote module).

## Refactoring Recipe

- Introduce Foreign Method
- Introduce Local Extension

### Introduce Foreign Method

If you only need one or two methods, create a method in your client class that acts like it belongs to the library class. Since you can't add it to the library, you pass the library instance as the first argument.

**Before:**
```java
class Report {
    void send() {
        Date nextDay = new Date(previousDate.getYear(), previousDate.getMonth(), previousDate.getDate() + 1);
        // ...
    }
}
```

**After:**
```java
class Report {
    void send() {
        Date nextDay = nextDay(previousDate);
        // ...
    }

    // This method "should" be on the Date class
    private static Date nextDay(Date arg) {
        return new Date(arg.getYear(), arg.getMonth(), arg.getDate() + 1);
    }
}
```

### Introduce Local Extension

If you need many methods or need to override behavior, create a new class that extends the library class (inheritance) or wraps it (composition).

**Subclassing (Inheritance):**
```java
class MfDateSub extends Date {
    public MfDateSub(String dateString) {
        super(dateString);
    }
    public Date nextDay() {
        return new Date(getYear(), getMonth(), getDate() + 1);
    }
}
```

**Wrapper (Composition):**
```java
class MfDateWrap {
    private Date original;
    
    public MfDateWrap(Date original) {
        this.original = original;
    }

    // Delegate existing methods
    public int getYear() {
        return original.getYear();
    }
    
    // Add new methods
    public Date nextDay() {
        return new Date(original.getYear(), original.getMonth(), original.getDate() + 1);
    }
}
```

## References

- [Refactoring Guru - Incomplete Library Class](https://refactoring.guru/smells/incomplete-library-class)
- [Martin Fowler - Incomplete Library Class](https://refactoring.com/catalog/incompleteLibraryClass.html)