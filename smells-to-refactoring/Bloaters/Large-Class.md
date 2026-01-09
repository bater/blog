---
sidebar_position: 3
title: Large Class
---

# Large Class

We've all been there. You open a file, start scrolling, and keep scrolling, and scrolling... By the time you reach line 800, you're wondering if you accidentally opened the entire Lord of the Rings trilogy instead of a single class. Welcome to the world of Large Classes, where one class tries to do everything and ends up doing nothing particularly well.

Just like its cousin Long Method, a class always starts with good intentions. It begins small, focused, and manageable. But then feature requests come in: "Can we just add this one field?" "Let's throw in this method too." "Oh, and we need these helper functions." Before you know it, your once-elegant class has ballooned into a thousand-line monster that nobody wants to touch.

Based on experience, if you encounter a class with more than 500 lines, it's time to be suspicious. That's not a hard rule—context matters—but it's a good threshold to start asking questions. Is this class trying to do too much? Could it be broken down into smaller, more focused components?

## Signs of the Smell

Large Class manifests when a single class becomes overly complex and tries to handle too many responsibilities at once. Here's what to look for:

**Excessive Line Count**: Classes stretching beyond 500 lines should raise eyebrows. While not every 501-line class is problematic, length often correlates with complexity.

**Too Many Fields**: If your class has dozens of instance variables, it's probably managing too much state. This is especially telling when you notice clusters of related fields that could be extracted into their own objects.

**Low Cohesion**: When you can't quickly explain what the class does in one clear sentence, or when methods in the class don't really relate to each other, you've got a cohesion problem.

**Multiple Responsibilities**: Does your `UserManager` class handle authentication, validation, email notifications, logging, and data persistence? That's five jobs where there should be one.

**Difficulty Finding Things**: If you need to use Ctrl+F just to locate methods within a single class, that's a red flag. Developers should be able to navigate a class intuitively.

## Reasons of the Smell

**Reduced Readability**: A large class is overwhelming to read and understand. Developers have to scroll through hundreds or thousands of lines just to grasp what's happening, making maintenance and modifications significantly harder. The cognitive load of keeping track of all the moving parts becomes exhausting.

**Code Duplication**: Large classes often breed duplication. When a class is already massive, developers are tempted to copy-paste code within it rather than refactor properly. After all, who wants to reorganize a 1000-line file? This creates multiple versions of similar logic that can drift out of sync over time.

**Low Cohesion**: Large classes typically suffer from low cohesion—they contain multiple unrelated responsibilities mashed together. You'll find payment processing logic sitting next to email formatting functions sitting next to data validation. This makes it challenging to determine what the class actually does and how its parts relate to each other.

**Complexity Management**: The sheer complexity of large classes makes them hard to reason about. With so many methods, fields, and interactions, it becomes difficult to predict how changes will ripple through the system. This complexity leads to bugs and makes it challenging for new developers to understand and contribute effectively.

**Brittleness**: When many unrelated responsibilities coexist in one class, modifying one section can unexpectedly break another. You fix the login logic and suddenly the password reset stops working. This brittleness makes developers afraid to touch the code, leading to workarounds and technical debt accumulation.

**Testing Challenges**: Testing large classes is exhausting. Writing comprehensive unit tests for a class that does ten different things requires mocking dozens of dependencies and covering countless scenarios. The result? Either inadequate test coverage or an equally massive test file that's hard to maintain.

## Refactoring Recipe

- Extract Class
- Extract Subclass
- Extract Interface
- Replace Data Value with Object
- Duplicate Observed Data

### Extract Class

This is your primary weapon against Large Classes. When you notice a class doing too much, identify a cohesive subset of functionality and move it to its own class.

**Before:**

```java
public class UserManager {
  private String username;
  private String email;
  private String password;
  private String street;
  private String city;
  private String zipCode;
  private String country;

  public void validateEmail() { /* ... */ }
  public void hashPassword() { /* ... */ }
  public void validateAddress() { /* ... */ }
  public void formatAddress() { /* ... */ }
  public void saveUser() { /* ... */ }
  public void sendWelcomeEmail() { /* ... */ }
}
```

Notice how `UserManager` is handling user authentication AND address management AND email functionality? Let's extract the address logic into its own class.

**After:**

```java
public class Address {
  private String street;
  private String city;
  private String zipCode;
  private String country;

  public void validate() { /* ... */ }
  public String format() { /* ... */ }
}

public class UserManager {
  private String username;
  private String email;
  private String password;
  private Address address;

  public void validateEmail() { /* ... */ }
  public void hashPassword() { /* ... */ }
  public void saveUser() { /* ... */ }
  public void sendWelcomeEmail() { /* ... */ }
}
```

Now each class has a clear, focused responsibility. The `Address` class handles everything address-related, making it reusable across different contexts—not just for users, but potentially for businesses, shipping locations, or billing addresses.

### Extract Subclass

When a class has behavior that's only used in certain cases, consider extracting a subclass for those special cases.

**Before:**

```javascript
class Employee {
  constructor(name, salary, commission) {
    this.name = name;
    this.salary = salary;
    this.commission = commission; // Only used by salespeople
  }

  calculatePay() {
    if (this.commission !== null) {
      return this.salary + this.commission;
    }
    return this.salary;
  }
}
```

**After:**

```javascript
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  calculatePay() {
    return this.salary;
  }
}

class Salesperson extends Employee {
  constructor(name, salary, commission) {
    super(name, salary);
    this.commission = commission;
  }

  calculatePay() {
    return this.salary + this.commission;
  }
}
```

This removes conditional logic from the base class and makes the distinction between regular employees and salespeople explicit in the type system.

### Extract Interface

When different parts of your codebase use different subsets of a large class's functionality, extract interfaces to make these usage patterns explicit.

```java
public interface Authenticatable {
  boolean authenticate(String password);
}

public interface Notifiable {
  void sendNotification(String message);
}

public class User implements Authenticatable, Notifiable {
  // Implementation
}
```

This allows different parts of your system to depend only on the interfaces they actually need, rather than the entire large class. It's a form of Interface Segregation Principle in action.

### Replace Data Value with Object

Sometimes a large class is full of primitive fields that should be proper objects. We covered this in detail in [Primitive Obsession](/smells/Bloaters/Primitive-Obsession), but it applies to Large Classes too.

**Quick example:**

```java
// Before: Primitives scattered in a large class
private String emailAddress;
private String phoneNumber;

// After: Proper value objects
private Email email;
private PhoneNumber phone;
```

Each value object can encapsulate its own validation and behavior, reducing the large class's responsibilities.

## Wrapping Up

Large Classes don't appear overnight—they grow gradually as features are added and deadlines loom. But each time we choose convenience over structure, we're making the codebase a little harder to maintain.

The good news? You don't have to refactor everything at once. Start small: extract one clear responsibility into its own class. Run your tests. Commit. Then do it again. Gradually, that unwieldy monster becomes a collection of focused, understandable components.

Your future self will thank you when they can navigate the codebase without getting lost.

## References

- [Refactoring Guru - Large Class](https://refactoring.guru/smells/large-class)
- [Martin Fowler - Extract Class](https://refactoring.com/catalog/extractClass.html)
