---
sidebar_position: 6
title: Indecent Exposure
---

# Indecent Exposure

We teach our kids to cover up, and we should teach our code to do the same. "Indecent Exposure" occurs when a class or method reveals more than it should. It involves making methods, fields, or classes `public` when they really should be `private` or `protected`.

Every time you make something public, you are signing a contract with the rest of the world (or at least the rest of your codebase) that says, "I promise to support this method/field." If you expose your internals, other developers *will* use them, and then you *can't* change them without breaking their code.

## Signs of the Smell

- Fields are `public` (unless they are constants).
- Helper methods used only internally are marked `public`.
- Classes meant for internal package use are exposed to the whole project.

## Reasons of the Smell

**Laziness**: "I'll just make it public so I can test it easily" or "I need to call it from this one other place, making it public is fastest."
**Lack of Understanding**: Not fully grasping encapsulation or the specific visibility modifiers of the language.

## Refactoring Recipe

- Encapsulate Field
- Reduce Visibility (Change access modifiers)

### Encapsulate Field

Never make fields public. Always provide getters and setters (and only if necessary).

**Before:**
```java
class Student {
    public int score; // Anyone can change this to -100
}
```

**After:**
```java
class Student {
    private int score;

    public int getScore() {
        return score;
    }
    
    // Maybe we don't even want a setter!
    public void addPoints(int points) {
        if (points > 0) this.score += points;
    }
}
```

### Reduce Visibility

If a method is only used inside the class, make it `private`. If it's only used in the package, make it package-private (default in Java).

**Before:**
```java
public class OrderProcessor {
    // This is an internal helper, why is it public?
    public void validateInternalState() { ... }
    
    public void process() {
        validateInternalState();
        // ...
    }
}
```

**After:**
```java
public class OrderProcessor {
    private void validateInternalState() { ... }
    
    public void process() {
        validateInternalState();
        // ...
    }
}
```

## References

- [Refactoring Guru - Encapsulate Field](https://refactoring.guru/refactoring/encapsulate-field)