---
sidebar_position: 5
title: Temporary Field
---

# Temporary Field

A "Temporary Field" is a variable inside a class that is only set and used during a specific algorithm or under certain conditions. The rest of the time, it sits there as `null` or 0.

This is confusing because objects are supposed to represent a complete state. If a field `result` is only valid while `calculate()` is running, why is it a field of the class? It confuses developers who inspect the object and wonder, "Why is `result` null? Is it broken?"

## Signs of the Smell

- A field is null most of the time.
- A method takes no arguments but relies on a field validation that happens in a *different* method.
- You have to call `initAlgo()` before calling `runAlgo()`.

## Reasons of the Smell

**Long Parameter List**: A developer tried to avoid passing lots of parameters to helper methods, so they just saved them as instance fields (global to the class).

## Refactoring Recipe

- Extract Class
- Replace Method with Method Object

### Extract Class

If the temporary fields are used together for a specific operation, move them and that operation into a new class.

**Before:**
```java
class Order {
    // These are only used during "calculation"
    private double tempTax;
    private double tempDiscount;

    public double calculateTotal() {
        tempTax = 0.1;
        tempDiscount = 0.5;
        // ... complex logic using fields
        return result; 
    }
}
```

**After:**
```java
class Order {
    public double calculateTotal() {
        return new PriceCalculator(this).calculate();
    }
}

class PriceCalculator {
    private double tax;
    private double discount;
    private Order order;

    public PriceCalculator(Order order) {
        this.order = order;
    }
    
    public double calculate() {
        // Now "tax" and "discount" are permanent fields of *this* object
        // They are no longer temporary fields of Order.
    }
}
```

### Replace Method with Method Object

Similar to Extract Class, this technique turns a method into its own object, so local variables become fields of that new object.

## References

- [Refactoring Guru - Temporary Field](https://refactoring.guru/smells/temporary-field)