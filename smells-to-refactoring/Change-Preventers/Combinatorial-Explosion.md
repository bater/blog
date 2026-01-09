---
sidebar_position: 5
title: Combinatorial Explosion
---

# Combinatorial Explosion

Imagine you're building a car game. You start with a `Car` class. Then you decide to support `Electric` and `Gas` engines. Easy enough: `ElectricCar` and `GasCar`. But wait, you also need to support `Manual` and `Automatic` transmissions. Now you have `ElectricManualCar`, `ElectricAutomaticCar`, `GasManualCar`, and `GasAutomaticCar`.

Then you add `Convertible` and `Sedan` body types. Suddenly, your class hierarchy explodes into dozens of subclasses trying to cover every possible combination of engine, transmission, and body type. This is Combinatorial Explosion. It happens when you use inheritance to handle component variations that should be independent.

## Signs of the Smell

- You have a huge number of subclasses in a hierarchy.
- Adding a new feature (like "Hybrid Engine") forces you to create many new subclasses (e.g., `HybridManualCar`, `HybridAutomaticCar`).
- You find duplicated code across these subclasses because `ElectricManualCar` and `GasManualCar` share the same manual transmission logic.

## Reasons of the Smell

**Overuse of Inheritance**: Using inheritance for everything instead of composition.
**High Complexity**: It becomes impossible to navigate the class tree.
**Code Duplication**: Logic for one feature is scattered across multiple subclasses.

## Refactoring Recipe

- Replace Inheritance with Delegation (Composition)
- Move Embellishment to Decorator

### Replace Inheritance with Delegation

Instead of incorrectly using inheritance to share code, use composition. Pass the "engine" and "transmission" as objects to the `Car`.

**Before:**
```java
abstract class Car { abstract void drive(); }

class ElectricManualCar extends Car {
    void drive() {
        System.out.println("Electric sound...");
        System.out.println("Shifting gears manually...");
    }
}

class GasManualCar extends Car {
    void drive() {
        System.out.println("Vroom vroom...");
        System.out.println("Shifting gears manually..."); // Duplicated!
    }
}
```

**After:**
```java
class Car {
    private Engine engine;
    private Transmission transmission;

    public Car(Engine engine, Transmission transmission) {
        this.engine = engine;
        this.transmission = transmission;
    }

    void drive() {
        engine.start();
        transmission.shift();
    }
}

interface Engine { void start(); }
interface Transmission { void shift(); }

class ElectricEngine implements Engine {
    public void start() { System.out.println("Electric sound..."); }
}

class ManualTransmission implements Transmission {
    public void shift() { System.out.println("Shifting gears manually..."); }
}
```

Now, adding a `HybridEngine` just means creating one new class, not multiplying the total number of classes.

### Move Embellishment to Decorator

If your objects are composed of layers that wrap each other (like an InputStream that is Buffered and GZipped), use the Decorator pattern.

**After (Decorator):**
```java
// Usage:
DataSource source = new CompressionDecorator(
                        new EncryptionDecorator(
                            new FileDataSource("data.txt")));
source.writeData(salaryRecords);
```

This allows you to mix and match behaviors dynamically at runtime without creating a class for every combination.

## References

- [Refactoring Guru - Combinatorial Explosion](https://refactoring.guru/smells/combinatorial-explosion)
- [Martin Fowler - Composition over Inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance)