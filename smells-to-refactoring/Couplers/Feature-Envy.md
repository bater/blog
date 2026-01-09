---
sidebar_position: 2
title: Feature Envy
---

# Feature Envy

Have you ever met someone who seems more interested in your family than their own? They know your cousin’s birthday, your aunt’s favorite color, and your dog’s medical history. In the world of code, we call this "Feature Envy."

Feature Envy happens when a method in one class seems more interested in the data of another class than in its own data. It’s like a method that wishes it were somewhere else. It constantly reaches out to another object, asking for getters, grabbing fields, and doing calculations that really belong to that other object.

## Signs of the Smell

- A method accesses the data of another object more than its own data.
- You see repeated calls like `order.getPrice()`, `order.getTax()`, `order.getDiscounts()` inside a class that isn't `Order`.
- The method feels like it's just manipulating another object's fields.

## Reasons of the Smell

**Data and Logic Separation**: Often happens when data is kept in "Data Classes" (just getters and setters) and logic is put in "Service Classes." This breaks encapsulation.

**Evolution**: Code evolves, and sometimes a method that started in the right place drifts away as new features are added, eventually becoming more coupled to a different class.

## Refactoring Recipe

- Move Method
- Extract Method

### Move Method

If a method is fully obsessed with another class, simply move it there.

**Before:**
```java
class Customer {
    private String address;
    // ...
}

class Order {
    private Customer customer;

    // This method only uses customer data!
    public String getCustomerPrintableAddress() {
        String address = customer.getAddress();
        if (address == null) return "No Address";
        return "Address: " + address;
    }
}
```

**After:**
```java
// Logic moved to where the data is
class Customer {
    private String address;

    public String getPrintableAddress() {
        if (address == null) return "No Address";
        return "Address: " + address;
    }
}

class Order {
    private Customer customer;

    public String getCustomerPrintableAddress() {
        return customer.getPrintableAddress();
    }
}
```

### Extract Method

If only *part* of a method suffers from Feature Envy, extract that part into a new method, and then move that new method to the target class.

## References

- [Refactoring Guru - Feature Envy](https://refactoring.guru/smells/feature-envy)
- [Martin Fowler - Feature Envy](https://refactoring.com/catalog/featureEnvy.html)