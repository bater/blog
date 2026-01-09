---
sidebar_position: 5
title: Middle Man
---

# Middle Man

In the previous section on "Message Chains," we talked about "Hiding the Delegate." We said that if you have `a.getB().getC().doIt()`, you might want to create a method in `A` called `doIt()` that calls `B`.

Well, "Middle Man" is what happens when you do that too much.

If you look at a class and realize that half of its methods are just delegating to another class without adding any value, you have a Middle Man. It's like a colleague who just forwards emails without reading them. "I'm not doing the work, I'm just passing it along."

## Signs of the Smell

- A class has many methods that do nothing but delegate to another object.
- You find yourself thinking, "Why am I calling this class? I should just talk to the real worker directly."

## Reasons of the Smell

**Overzealous Encapsulation**: You tried so hard to avoid Message Chains that you wrapped every single method of a dependency.
**Refactoring Residue**: Maybe the class used to do more, but logic was moved out, leaving only the delegation.

## Refactoring Recipe

- Remove Middle Man
- Inline Method

### Remove Middle Man

If the middle man is doing nothing useful, just let the client call the delegate directly. This is the reverse of "Hide Delegate."

**Before:**
```java
class Person {
    Department department;
    
    // Middle Man method
    public Manager getManager() {
        return department.getManager();
    }
}

// usage
Manager m = person.getManager();
```

**After:**
```java
// Logic moved to client
class Person {
    // Provide access to the delegate
    public Department getDepartment() {
        return department;
    }
}

// usage
Manager m = person.getDepartment().getManager();
```
*Yes, this looks like it could cause a Message Chain. Balance is key!*

### Inline Method

If a method effectively just calls another method, use Inline Method to remove the indirection.

## References

- [Refactoring Guru - Middle Man](https://refactoring.guru/smells/middle-man)
- [Martin Fowler - Middle Man](https://refactoring.com/catalog/middleMan.html)