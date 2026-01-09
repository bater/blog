---
sidebar_position: 2
title: Divergent Change
---

# Divergent Change

You know that feeling when you're working on a class, and it seems like every time you get a new requirement—whether it's for the database, the UI, or the business logic—you end up modifying the *same* file? It's like that class has its fingers in too many pies.

Meet Divergent Change. It is the code smell that occurs when one module is often changed in different ways for different reasons. If you look at a class and say, "Well, if I want to add a new product type, I have to change these three methods; but if I want to change the database schema, I have to change these *other* four methods," you've got Divergent Change.

It violates the Single Responsibility Principle, and it drives developers crazy because you can't touch one part of the system without wading through code that has nothing to do with what you're trying to accomplish.

## Signs of the Smell

You find yourself changing the same class for multiple, unrelated reasons. Distinct sets of methods within the class seem to change independently of each other. For example, "If I add a new payment type, I change this class. If I change the logging format, I also change this class."

## Reasons of the Smell

**Single Responsibility Violation**: The class is doing too much. It's handling business logic, data persistence, and maybe even some formatting.

**Code Duplication**: Often, mixing responsibilities leads to copy-pasting code because proper abstractions aren't in place.

**Maintenance Difficulty**: It makes the system fragile. You might break the persistence layer while trying to update a business rule.

**Testing Challenges**: You have to mock out everything (database, network, etc.) just to test a simple calculation.

## Refactoring Recipe

- Extract Class
- Extract Superclass / Subclass

### Extract Class

When a class does two distinct things, split it into two classes. Use delegation to keep them connected if needed.

**Before:**
```java
// A class handling both user data and report formatting
class User {
    private String name;
    private String dbConnectionString;

    public void saveUser() {
        // SQL code using dbConnectionString
        System.out.println("Saving user to DB...");
    }

    public String generateReport() {
        // Formatting code for a report
        return "Report for " + name;
    }
}
```

**After:**
```java
// Separated responsibilities
class User {
    private String name;
    private UserRepository repository;

    public User(String name) {
        this.name = name;
        this.repository = new UserRepository();
    }

    public String getName() { return name; }

    public void save() {
        repository.save(this);
    }
}

class UserRepository {
    public void save(User user) {
        // SQL code
        System.out.println("Saving " + user.getName() + " to DB...");
    }
}

class UserReport {
    public String generate(User user) {
        return "Report for " + user.getName();
    }
}
```

By extracting `UserRepository` and `UserReport`, the `User` class now focuses on its core data, while persistence and formatting are handled elsewhere.

## References

- [Refactoring Guru - Divergent Change](https://refactoring.guru/smells/divergent-change)
- [Martin Fowler - Divergent Change](https://refactoring.com/catalog/divergentChange.html)