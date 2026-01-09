---
sidebar_position: 3
title: Refused Bequest
---

# Refused Bequest

Inheritance is powerful, but it's often misused. "Refused Bequest" happens when a subclass inherits from a parent but doesn't actually want or use the functionality it inherited. It's like a child refusing their parent's inheritance.

Technically, the code compiles. But conceptually, it's wrong. If a `Dog` class inherits from `Chair` just to reuse a `getLegCount()` method, but throws an exception for `sit()`, that’s Refused Bequest. It often implies the hierarchy is wrong.

## Signs of the Smell

- A subclass throws "Not Supported" exceptions for inherited methods.
- A subclass leaves inherited methods empty.
- Clients of the subclass code have to know *not* to call certain parent methods.

## Reasons of the Smell

**Reuse over Correctness**: You wanted to reuse some code in the parent class, so you extended it, even though the "Is-A" relationship (Liskov Substitution Principle) doesn't hold.

## Refactoring Recipe

- Push Down Method / Field
- Replace Inheritance with Delegation

### Push Down Method / Field

If the parent class has logic that only *some* children use, maybe that logic belongs in those specific children, not the parent.

**Before:**
```java
class Animal {
    void fly() { ... } // Dogs can't fly!
    void bark() { ... }
}

class Dog extends Animal {
    // inherits fly() which is weird
}
```

**After:**
```java
class Animal {
    void bark() { ... }
}

class Bird extends Animal {
    void fly() { ... } // Moved down to where it belongs
}

class Dog extends Animal {
    // No longer refuses 'fly'
}
```

### Replace Inheritance with Delegation

If you only need to use *one* method from a class, don't inherit from it. Just put an instance of that class inside your class and call it.

**Before:**
```java
class MyList extends ArrayList {
    // I only want to use 'add' and 'size', but I inherited 100 other methods!
}
```

**After:**
```java
class MyList {
    private List list = new ArrayList(); // Delegate
    
    public void add(Object o) {
        list.add(o);
    }
}
```

## References

- [Refactoring Guru - Refused Bequest](https://refactoring.guru/smells/refused-bequest)
- [C2 Wiki - Refused Bequest](https://wiki.c2.com/?RefusedBequest)