---
sidebar_position: 4
title: Parallel Inheritance Hierarchies
---

# Parallel Inheritance Hierarchies

Have you ever added a new subclass to one part of your system, only to realize you immediately have to go and add a corresponding subclass to another inheritance tree? It feels like you're seeing double. If you have a `Car` hierarchy and a `CarDriver` hierarchy, and every time you add a `Tesla` you must also add a `TeslaDriver`, you're dealing with Parallel Inheritance Hierarchies.

This smell is really a special case of Shotgun Surgery. The problem is that the two hierarchies are tightly coupled. You can't change one without changing the other. Over time, this leads to a codebase where adding a simple feature requires a checklist of "Did I add the corresponding class here? And here? And here?"

## Signs of the Smell

- Every time you create a subclass of class `A`, you find yourself compelled to create a subclass of class `B`.
- The prefixes or suffixes of the class names in the two hierarchies often match (e.g., `CivilEngineer` and `CivilJob`, `MechanicalEngineer` and `MechanicalJob`).

## Reasons of the Smell

**High Coupling**: The two hierarchies depend on each other's structure.
**Code Duplication**: Often, the "parallel" logic is just doing similar things or holding related data that should be together.
**Maintenance Overhead**: It doubles the work for extending the system.

## Refactoring Recipe

- Move Method
- Move Field

### Move Method / Move Field

To fix this smell, we want to merge the hierarchies or at least make one dependent on the other in a way that doesn't require subclassing. The general strategy is to move methods and fields from one hierarchy into the other until the second hierarchy effectively disappears or becomes a single class.

**Before:**
```java
// Hierarchy 1: Domain Objects
abstract class Engineer {}
class CivilEngineer extends Engineer {}
class ComputerEngineer extends Engineer {}

// Hierarchy 2: Actions/descriptions related to them
abstract class JobDescription {
    abstract String getTitle();
}
class CivilJobDescription extends JobDescription {
    String getTitle() { return "Civil Engineering"; }
}
class ComputerJobDescription extends JobDescription {
    String getTitle() { return "Computer Engineering"; }
}
```

**After:**
```java
// Combined/Simplified
abstract class Engineer {
    abstract String getJobTitle();
}

class CivilEngineer extends Engineer {
    String getJobTitle() { return "Civil Engineering"; }
}

class ComputerEngineer extends Engineer {
    String getJobTitle() { return "Computer Engineering"; }
}
// JobDescription hierarchy is now gone.
```

By moving the `getJobTitle` logic (Method) into the `Engineer` class, we eliminated the need for the entire `JobDescription` hierarchy.

## References

- [Refactoring Guru - Parallel Inheritance Hierarchies](https://refactoring.guru/smells/parallel-inheritance-hierarchies)
- [Martin Fowler - Parallel Inheritance Hierarchies](https://refactoring.com/catalog/parallelInheritanceHierarchies.html)