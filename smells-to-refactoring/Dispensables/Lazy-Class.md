---
sidebar_position: 7
title: Lazy Class
---

# Lazy Class

A "Lazy Class" is a freeloader. It’s a component that doesn't do enough to justify its existence. Maybe it used to be important, but after refactoring, it lost most of its responsibilities. Or maybe it was designed for a future feature that never arrived.

Each class in your project adds complexity and maintenance cost. If a class isn't pulling its weight, it should be fired (or inline-d).

## Signs of the Smell

- A class that has very few methods or fields.
- A class that is only used by one other class and does very little.
- A subclass that doesn't add any new behavior to its parent.

## Reasons of the Smell

**Refactoring Residue**: You moved code out of this class, leaving it empty.
**Over-Design**: You created a class structure for a "planned" feature that never got built.

## Refactoring Recipe

- Inline Class
- Collapse Hierarchy

### Inline Class

If a class is too small, merge it into the class that uses it most.

**Before:**
```java
class Person {
    private Office office;
    public String getOfficeAreaCode() {
        return office.getAreaCode();
    }
}

class Office { // Lazy Class!
    private String areaCode;
    public String getAreaCode() { return areaCode; }
}
```

**After:**
```java
class Person {
    private String officeAreaCode; // Merged into Person
    public String getOfficeAreaCode() { return officeAreaCode; }
}
```

### Collapse Hierarchy

If a subclass and superclass are nearly practically identical, merge them.

**Before:**
```java
class Employee { ... }
class Salesman extends Employee { } // Adds nothing?
```

**After:**
```java
class Employee { ... } // Combined
```

## References

- [Refactoring Guru - Lazy Class](https://refactoring.guru/smells/lazy-class)
- [Martin Fowler - Lazy Class](https://refactoring.com/catalog/lazyClass.html)