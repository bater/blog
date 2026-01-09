---
sidebar_position: 2
title: Comments
---

# Comments

"Comments" are a controversial smell because we are often taught in school that "good code has lots of comments." In reality, **good code explains itself.**

If you have to write a comment to explain *what* a block of code is doing, that's a failure of expression. The code should be refactored so that the variable names and method calls tell the story. Comments should be reserved for explaining *why* something is done (the business context or weird constraints), not *how* it is done.

> "Don't comment bad code—rewrite it." — Brian W. Kernighan and P. J. Plauger

## Signs of the Smell

- You see a block of code preceded by a comment explaining what it does (e.g., `// Check if user is eligible`).
- You see comments explaining complex expressions.
- You see methods with names that don't match the comments.

## Reasons of the Smell

**Complex Code**: The author realized the code was hard to understand, so they wrote a comment to clarify it instead of simplifying the code.
**Laziness**: It's faster to write `// sort list` than to extract a method named `sortList()`.

## Refactoring Recipe

- Extract Method
- Rename Method
- Introduce Assertion

### Extract Method

The most common solution. If you have a comment that says "Calculate total price", then grab the code under it and extract it into a method called `calculateTotalPrice()`.

**Before:**
```java
void printOwing() {
    printBanner();

    // Calculate outstanding
    double outstanding = 0.0;
    for (Order order : orders) {
        outstanding += order.getAmount();
    }

    // Print details
    System.out.println("name: " + name);
    System.out.println("amount: " + outstanding);
}
```

**After:**
```java
void printOwing() {
    printBanner();
    double outstanding = calculateOutstanding();
    printDetails(outstanding);
}

double calculateOutstanding() {
    double result = 0.0;
    for (Order order : orders) {
        result += order.getAmount();
    }
    return result;
}

void printDetails(double outstanding) {
    System.out.println("name: " + name);
    System.out.println("amount: " + outstanding);
}
```

Now the comments are unnecessary because the method names tell you exactly what is happening.

### Rename Method

If a comment explains what a method does because the method name is vague, just rename the method!

**Before:**
```java
/**
 * Checks if the user has valid subscription
 */
boolean check() { ... }
```

**After:**
```java
boolean hasValidSubscription() { ... }
```

## References

- [Refactoring Guru - Comments](https://refactoring.guru/smells/comments)
- [Clean Code by Robert C. Martin](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)