---
sidebar_position: 3
title: Inappropriate Intimacy
---

# Inappropriate Intimacy

"Inappropriate Intimacy" sounds scandalous, doesn't it? In code, it refers to two classes that know way too much about each other's private lives. They are spending too much time together, accessing each other's private fields, and generally ignoring the boundaries of encapsulation.

Good object-oriented design is about politeness. Classes should interact through well-defined public interfaces. When one class starts reaching into another class's internal data, or when a subclass knows too much about its parent's implementation, you've got Inappropriate Intimacy. It makes the code fragile because changing one class almost certainly breaks the other.

## Signs of the Smell

- Classes have bidirectional associations (A knows B, and B knows A) unnecessary.
- A subclass accesses private or protected fields of its parent directly (if the language allows it) or relies heavily on specific implementation details.
- One class accesses the internal fields of another class frequently.

## Reasons of the Smell

**Over-cooperation**: Sometimes developers let two classes grow up together, and they end up intertwined.
**Laziness**: It's often easier to just make a field `public` or `package-private` to access it quickly, rather than designing a proper interface.

## Refactoring Recipe

- Move Method / Move Field
- Change Bidirectional Association to Unidirectional
- Replace Inheritance with Delegation

### Move Method / Move Field

If Class A is intimate with Class B because it uses Class B's fields, maybe those fields (or the method using them) actually belong in Class A (or vice versa). Move the pieces to separate them.

**Before:**
```java
class Wallet {
    public int cash;
    public CreditCard card;
}

class Person {
    Wallet wallet;
    
    void makePayment(int amount) {
        // Direct access to Wallet's internals
        if (wallet.cash >= amount) {
            wallet.cash -= amount;
        } else {
            wallet.card.charge(amount);
        }
    }
}
```

**After:**
```java
class Wallet {
    private int cash;
    private CreditCard card;
    
    // Encapsulate the behavior
    public void pay(int amount) {
        if (cash >= amount) {
            cash -= amount;
        } else {
            card.charge(amount);
        }
    }
}

class Person {
    Wallet wallet;
    
    void makePayment(int amount) {
        wallet.pay(amount);
    }
}
```

### Change Bidirectional Association to Unidirectional

If Class A and Class B both refer to each other code, see if you can cut one of the links. Does B really need to know about A?

## References

- [Refactoring Guru - Inappropriate Intimacy](https://refactoring.guru/smells/inappropriate-intimacy)
- [C2 Wiki - Inappropriate Intimacy](https://wiki.c2.com/?InappropriateIntimacy)