# Day 4. Bloaters: Large Class

Created: July 29, 2023 9:07 PM
Tags: bloaters, smell

## Sign of Smell

Similar to the “Long Method” smell, a class always starts small and grows over time as developers keep adding more features to it. However, as the class grows, it becomes increasingly difficult to read and understand, and it becomes more challenging to make changes to it.

The Large Class smell is a code smell that occurs when a single class in a software system becomes overly large and complex, often trying to do too many things at once. When a class has too many responsibilities, it can result in a bloated class with duplicate code, chaos, and death. This makes class harder to maintain and refactor.

Based on my personal experience, if you come across a class with more than 500 lines, be suspicious that it may be too large.

## Reason of Smell

- **Reduced Readability**: A large class can be overwhelming to read and understand. Developers may have to scroll through a massive file to comprehend its functionality, making it harder to maintain or modify the code later on.
- **Code Duplication**: Large classes often result in code duplication because developers might be tempted to copy-paste code within the class rather than create smaller, reusable components.
- **Low Cohesion**: Large classes tend to have low cohesion, meaning they contain multiple unrelated responsibilities and functionalities. This makes it challenging to determine the class's main purpose and can lead to confusion about which methods and attributes are related.
- **Complexity Management**: Large classes are more likely to be complex, making it harder to manage and reason about the code. The complexity can lead to bugs and make it challenging for new developers to onboard and contribute effectively.
- **Brittleness**: When many responsibilities are grouped together in a single class, modifying one part of a large class can unexpectedly impact other unrelated sections and easily lead to side effects, making it hard to predict the consequences of changes.
- **Testing Challenges**: Testing large classes can be cumbersome and time-consuming. Writing comprehensive unit tests for a class that does many things can be difficult and may not cover all possible scenarios effectively.

## Refactoring Recipe

To address this issue, developers can use several refactoring techniques. One approach is to extract a part of the Large Class into a new class, thereby reducing the complexity of the original class. This technique, known as Extract Class, allows for more focused and specialized classes, which are easier to understand and maintain. Other techniques include Extract Subclass, Extract Interface, Replace Data Value with Object, Replace Conditional Dispatcher with Command, Replace Implicit Language with Interpreter, Replace State-Altering Conditionals with State, and Duplicate Observed Data.

By addressing the "Large Class" smell, developers can improve the quality of their code and make it more maintainable, extensible, and readable.

1. Extract Class (Moving Features between Objects)
2. Extract Subclass (Dealing with Generalization)
3. Extract Interface (Dealing with Generalization)
4. Replace Data Value with Object (Organizing Data)
5. Duplicate Observed Data (Organizing Data)
6. Replace Conditional Dispatcher with Command (Simplifying Conditional Expressions)
7. Replace Implicit Language with Interpreter
8. Replace State-Altering Conditionals with State

### Reference

[https://refactoring.guru/smells/large-class](https://refactoring.guru/smells/large-class)