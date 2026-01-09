---
sidebar_position: 5
title: Primitive Obsession
---

# Primitive Obsession

Let's play a game: count how many times you've seen code like `String userId`, `String phoneNumber`, `int statusCode`, or `boolean isActiveAndNotDeletedAndVerified`. If you're like most developers, the answer is "way too many times." This is Primitive Obsession—the tendency to use primitive data types (strings, integers, booleans) for everything instead of creating proper domain objects.

It's an understandable pattern, especially for developers new to object-oriented programming. Creating a whole class just to wrap a phone number seems like overkill, right? Why bother with a `Money` class when you can just use a `double` for the amount and a `String` for the currency? Why create a `DateRange` when you can pass around two separate dates?

The truth is, primitives are primitive for a reason—they're basic building blocks, not domain concepts. When we use them to represent business logic, we're losing type safety, scattering validation logic everywhere, and making our code harder to understand and maintain.

## Signs of the Smell

**Strings for Everything**: When you see `String userId`, `String orderId`, `String customerId` being passed around, you've got Primitive Obsession. These aren't just strings—they're domain concepts with specific rules and behaviors.

**Magic Numbers**: Constants scattered throughout your code: `if (status == 1)` or `price * 0.08` (what's 0.08? Tax? Discount? Who knows?).

**Validation Duplication**: The same validation logic repeated across multiple classes. Every class that deals with phone numbers duplicates the same regex pattern. Every class handling email addresses repeats the same format checking.

**Missing Behavior**: When you have utility classes like `PhoneNumberUtils.format()` or `EmailValidator.isValid()` instead of having that behavior live with the data itself.

**Complex Conditionals**: Checking primitives to determine behavior: `if (userType.equals("admin") || userType.equals("superadmin"))` instead of having proper types.

## Reasons of the Smell

**Lack of Reusability**: When you rely on primitives, you can't encapsulate behavior with your data. A `PhoneNumber` class can format itself, validate itself, and handle regional differences. A `String` can do none of those things—you need external utility methods scattered across your codebase.

**Lack of Abstraction**: Code littered with primitives is harder to understand at a higher level. Reading `processPayment(double amount, String currency, String accountNumber, String routingNumber)` tells you less than `processPayment(Money amount, BankAccount account)`. The latter communicates business concepts clearly.

**Code Duplication**: When multiple classes need to validate phone numbers, they either duplicate the validation logic or call the same utility function. Either way, it's not ideal. With a `PhoneNumber` class, validation happens in one place—the constructor—and you know any `PhoneNumber` instance is valid.

**Limited Behavior**: Primitives can't encapsulate domain logic. You can't call `email.domain()` on a string, but you could on an `Email` object. You can't ask a double if it's a valid price for a specific market, but you could ask a `Price` object.

**Increased Complexity**: As your codebase grows, managing primitives becomes increasingly complex. You end up with parameter lists full of related primitives, complex validation scattered everywhere, and utility classes that grow out of control.

## Refactoring Recipe

- Replace Data Value with Object
- Replace Type Code with Class
- Replace Type Code with Subclasses
- Replace Type Code with State/Strategy
- Extract Class
- Introduce Parameter Object
- Replace Array With Object

### Replace Data Value with Object

This is your go-to refactoring for Primitive Obsession. Take those primitive values and wrap them in proper value objects.

**Before:**

```typescript
class Order {
  customerEmail: string;
  customerPhone: string;
  amount: number;
  currency: string;

  constructor(email: string, phone: string, amount: number, currency: string) {
    // Scattered validation
    if (!email.includes('@')) throw new Error('Invalid email');
    if (phone.length < 10) throw new Error('Invalid phone');
    if (amount < 0) throw new Error('Invalid amount');

    this.customerEmail = email;
    this.customerPhone = phone;
    this.amount = amount;
    this.currency = currency;
  }
}
```

**After:**

```typescript
class Email {
  constructor(private value: string) {
    if (!value.includes('@')) {
      throw new Error('Invalid email');
    }
  }

  toString(): string { return this.value; }
  domain(): string { return this.value.split('@')[1]; }
}

class PhoneNumber {
  constructor(private value: string) {
    if (value.length < 10) {
      throw new Error('Invalid phone');
    }
  }

  toString(): string { return this.value; }
  format(): string { /* ... */ }
}

class Money {
  constructor(private amount: number, private currency: string) {
    if (amount < 0) {
      throw new Error('Invalid amount');
    }
  }

  add(other: Money): Money { /* ... */ }
  toString(): string { return `${this.amount} ${this.currency}`; }
}

class Order {
  constructor(
    private customerEmail: Email,
    private customerPhone: PhoneNumber,
    private price: Money
  ) {
    // No validation needed - the value objects handle it!
  }
}
```

Now each domain concept is a proper type with its own validation and behavior. The Order class becomes simpler because it delegates to its value objects.

### Replace Type Code with Class

When you're using strings or integers as type codes, replace them with proper classes.

**Before:**

```java
public class Employee {
  private static final int ENGINEER = 0;
  private static final int SALESPERSON = 1;
  private static final int MANAGER = 2;

  private int type;

  public Employee(int type) {
    this.type = type;
  }

  public int getType() {
    return type;
  }
}
```

**After:**

```java
public class EmployeeType {
  private final String name;

  private EmployeeType(String name) {
    this.name = name;
  }

  public static final EmployeeType ENGINEER = new EmployeeType("Engineer");
  public static final EmployeeType SALESPERSON = new EmployeeType("Salesperson");
  public static final EmployeeType MANAGER = new EmployeeType("Manager");

  public String getName() {
    return name;
  }
}

public class Employee {
  private EmployeeType type;

  public Employee(EmployeeType type) {
    this.type = type;
  }

  public EmployeeType getType() {
    return type;
  }
}
```

This prevents invalid values (what if someone passes `3` as the type?) and makes the code more explicit and type-safe.

### Replace Type Code with Subclasses

When different type codes have different behaviors, use polymorphism instead of conditionals.

**Before:**

```javascript
class Employee {
  constructor(name, type) {
    this.name = name;
    this.type = type; // 'engineer', 'salesperson', 'manager'
  }

  calculateBonus() {
    switch(this.type) {
      case 'engineer':
        return this.salary * 0.10;
      case 'salesperson':
        return this.salary * 0.15 + this.commissions;
      case 'manager':
        return this.salary * 0.20;
    }
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

  calculateBonus() {
    // Abstract method to be overridden
    throw new Error('Must be implemented by subclass');
  }
}

class Engineer extends Employee {
  calculateBonus() {
    return this.salary * 0.10;
  }
}

class Salesperson extends Employee {
  constructor(name, salary, commissions) {
    super(name, salary);
    this.commissions = commissions;
  }

  calculateBonus() {
    return this.salary * 0.15 + this.commissions;
  }
}

class Manager extends Employee {
  calculateBonus() {
    return this.salary * 0.20;
  }
}
```

Now the type system enforces that each employee type implements its own bonus calculation, and you can't create an employee with an invalid type.

### Extract Class

When you have groups of related primitives, extract them into their own class. This is especially powerful when combined with Replace Data Value with Object.

```java
// Before: Related primitives scattered everywhere
private int startHour;
private int startMinute;
private int endHour;
private int endMinute;

// After: Cohesive object
private TimeRange schedule;
```

## Wrapping Up

Primitive Obsession is seductive because primitives are easy and familiar. But every time you use a string where you should use a domain object, you're trading short-term convenience for long-term pain. Your IDE can't catch when you accidentally swap a user ID with an order ID if they're both strings. Your compiler can't help you when someone passes an invalid email format.

The solution isn't to create objects for everything—sometimes a string really is just a string. But when you find yourself validating the same primitive values multiple times, or when you need utility classes to handle behavior, that's your cue to create proper domain objects.

Start small: pick one primitive that's causing you pain and wrap it in a value object. Once you experience the benefits—type safety, centralized validation, clearer code—you'll wonder how you ever lived without it.

## References

- [Refactoring Guru - Primitive Obsession](https://refactoring.guru/smells/primitive-obsession)
- [Martin Fowler - Replace Primitive with Object](https://refactoring.com/catalog/replacePrimitiveWithObject.html)
- [Value Object Pattern](https://martinfowler.com/bliki/ValueObject.html)
