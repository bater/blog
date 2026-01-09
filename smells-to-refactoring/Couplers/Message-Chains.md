---
sidebar_position: 4
title: Message Chains
---

# Message Chains

You've probably seen code that looks like a conga line of method calls:
`customer.getAddress().getCity().getZipCode().getProvider().getName()`.

This is a Message Chain, also affectionately known as the "Law of Demeter violation" or "Train Wreck." It occurs when a client asks one object for another object, which the client then asks for yet another object, and so on.

The problem? The client is now coupled to the structure of the navigation. If definition of `Address` changes (e.g., zip code moves to a `Zip` object), your code breaks.

## Signs of the Smell

- A chain of method calls: `a.b().c().d()`.
- You rely on the internal structure of dependencies of dependencies.

## Reasons of the Smell

**Lack of Encapsulation**: Objects are exposing their relationships too freely.
**Quick Access**: It's the fastest way to get data deep in the hierarchy without writing new methods.

## Refactoring Recipe

- Hide Delegate
- Extract Method
- Move Method

### Hide Delegate

Instead of the client navigating the chain, ask the middleman to do the work.

**Before:**
```java
// Client code
String managerName = employee.getDepartment().getManager().getName();
```

**After:**
```java
// Client code
String managerName = employee.getManagerName();

// Inside Employee class
public String getManagerName() {
    return this.department.getManager().getName();
}
```
*Note: Be careful not to create a "Middle Man" smell by doing this too much.*

### Extract Method

Sometimes you can't push the method down. In that case, extract the chain usage into a method to isolate the coupling.

**Before:**
```java
public void printZip(Customer c) {
    String zip = c.getAddress().getCity().getZip(); // Chain
    System.out.println(zip);
}
```

**After:**
```java
public void printZip(Customer c) {
    String zip = getZipCode(c);
    System.out.println(zip);
}

private String getZipCode(Customer c) {
    // The coupling is now contained in this one method
    return c.getAddress().getCity().getZip();
}
```

## References

- [Refactoring Guru - Message Chains](https://refactoring.guru/smells/message-chains)
- [Martin Fowler - Message Chains](https://refactoring.com/catalog/messageChains.html)