---
sidebar_position: 3
title: Data Class
---

# Data Class

A "Data Class" is a class that contains only fields and crude methods for accessing them (getters and setters). These are basically containers for data used by other classes. They contain no functionality and verify nothing on their own.

While Data Classes are essentially "structs," in Object-Oriented Programming, they are often a sign that behavior is misplaced. The "Tell, Don't Ask" principle suggests that data and the operations on that data should live together. If you see a Data Class, ask yourself: "Who is using this data?" The logic should probably move into this class.

## Signs of the Smell

- The class only has fields, getters, and setters.
- Other classes query this class heavily to perform calculations.

## Reasons of the Smell

**Anemic Domain Model**: This is a style where data and process are separated. While sometimes valid (like DTOs), it often leads to duplication of logic across "service" layers.
**Laziness**: It's easier to create a bag of data than to figure out the right abstraction for behavior.

## Refactoring Recipe

- Move Method
- Encapsulate Collection

### Move Method

If a service class access a Data Class frequently, move that logic *into* the Data Class.

**Before:**
```java
class Order { // Data Class
    public List<Item> items;
}

class OrderService {
    public double calculateTotal(Order order) {
        double total = 0;
        for (Item item : order.items) {
            total += item.price;
        }
        return total;
    }
}
```

**After:**
```java
class Order {
    private List<Item> items;

    public double calculateTotal() { // Logic moved here!
        double total = 0;
        for (Item item : items) {
            total += item.price;
        }
        return total;
    }
}
```

### Encapsulate Collection

If a class exposes a list directly (like `public List<Item> items`), anyone can clear it or add bad data. Encapsulate it.

**Before:**
```java
order.items.add(item);
```

**After:**
```java
order.addItem(item); // Controlled access
```

## References

- [Refactoring Guru - Data Class](https://refactoring.guru/smells/data-class)
- [Martin Fowler - Anemic Domain Model](https://martinfowler.com/bliki/AnemicDomainModel.html)