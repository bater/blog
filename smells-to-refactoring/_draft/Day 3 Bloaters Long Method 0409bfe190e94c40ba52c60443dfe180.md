# Day 3. Bloaters: Long Method

Created: July 24, 2023 7:04 AM
Tags: bloaters, smell

## Sign of Smell

Long methods may be doing too many things within a single method. If you come across a method with more than ten lines, be suspicious.

Every method begins as very small pieces when first committed into Git. When new features arrive, developers tend to believe that adding a few lines of code to an existing method is easier. It may seem harmless to add one more feature to a method with only a couple of lines of code. However, by repeating this process every sprint, the method becomes longer and longer.

## Reason of Smell

Long methods are problematic for the following reasons:

- **It's hard to read and understand.** When a method grows longer, it becomes increasingly difficult to understand and maintain. This can lead to mistakes or bugs easily.
- **It might violate the Single Responsibility Principle** (SRP), which is part of the SOLID design principles. This principle states that a method or function should have only one responsibility, and it should be completely encapsulated by that responsibility.
- **It might have side effects.** Long methods often involve multiple subtasks, which can result in unexpected behavior easily. These methods can be responsible for more tasks than necessary and are likely to have multiple reasons for requiring changes.
- **It might have duplicated code.** When we compare two long methods, they may contain duplicated code. By breaking them down into smaller methods, you can often identify ways for the two to share logic.
- **It’s slower to run.** ”No code is faster than no code*”.* A simplified version of this principle is: "The fastest code is usually the code that does the least." Generally speaking, if you want your code to run as quickly as possible, you should try to achieve the same results while doing less work.
- **It’s hard to test.** If a method executes a lot of code, it may require a large number of test cases to adequately cover all possible paths. This can make it more time-consuming to test the code and can lead to defects.

Overall, it's important to be aware of the signs of long methods and to refactor them when necessary. By breaking up long methods into smaller, more manageable pieces, developers can improve code readability and make it easier to maintain and test.

## Refactoring Recipe

In Sandi's talk, she provides a table outlining how to convert from code smell to refactoring treatment. Each refactoring skill can be referenced in two books: "*Improving the Design of Existing Code*" by Martin Fowler and "*Refactoring to Patterns*" by Joshua Kerievsky. 

1. Extract Method
2. Compose Method
3. Introduce Parameter Object
4. Move Accumulation to Collecting Parameter
5. Move Accumulation to Visitor
6. Decompose Conditional
7. Preserve Whole Object 
8. Replace Conditional Dispatcher with Command
9. Replace Conditional Logic with Strategy
10. Replace Method with Method Object
11. Replace Temp with Query

But on the Refactoring Guru website and in Martin's book, they state that Composing Method is a catalog of refactoring techniques that also includes the Extract Method and other techniques, which is also a good match for long methods. So, we can reorganize the smell-refactoring pairs into two levels as shown below:

1. Composing Method
    1. Extract Method
    2. Inline Method
    3. Inline Temp
    4. Extract Variable (Introduce Explaining Variable)
    5. Replace Temp with Query
    6. Replace Method with Method Object
    7. Substitute Algorithm
2. Simplifying Method Calls
    1. Introduce Parameter Object
    2. Preserve Whole Object
3. Simplifying Conditional Expressions
    1. Decompose Conditional
    2. Replace Conditional Logic with Strategy
    3. Replace Conditional Dispatcher with Command
4. Move Accumulation to Collecting Parameter
5. Move Accumulation to Visitor

If the Long Method is the most common code smell, then Compose Method would be the most common refactoring technique for addressing it as a smell-refactoring pair. But I removed some of the skills that I think are not 100% targeted to the Long Method smell, like "Split Temporary Variable" and "Remove Assignments to Parameters". These techniques can definitely make the method clearer, but they do not make it shorter.

### Reference

[https://www.jobsity.com/blog/how-to-identify-code-smells](https://www.jobsity.com/blog/how-to-identify-code-smells)

[https://refactoring.guru/smells/long-method](https://refactoring.guru/smells/long-method)

[https://medium.com/@joshsaintjacque/reacting-to-code-smells-bloaters-3e452d0c01b](https://medium.com/@joshsaintjacque/reacting-to-code-smells-bloaters-3e452d0c01b)

[https://www.industriallogic.com/img/blog/2005/09/smellstorefactorings.pdf](https://www.industriallogic.com/img/blog/2005/09/smellstorefactorings.pdf)

F - Fowler, Martin. Refactoring: Improving the Design of Existing Code.

K - Kerievsky, Joshua. Refactoring to Patterns.