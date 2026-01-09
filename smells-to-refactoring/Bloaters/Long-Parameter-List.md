---
sidebar_position: 7
title: Long Parameter List
---

# Long Parameter List

When Parameters Get Out of Hand

## Signs of the Smell

Have you ever encountered a method that looks something like this: `calculatePrice(basePrice, discount, tax, shippingFee, insuranceFee, handlingFee, ...)`? By the time you reach the sixth parameter, you've probably forgotten what the first one was for. Welcome to the world of Long Parameter List, one of the classic code smells that makes developers sigh in frustration.

As a rule of thumb, when a function has more than 7 parameters, it's time to raise an eyebrow and ask: "Is this getting too complicated?" This smell perfectly embodies the "Bloater" category—where code grows beyond its ideal size. And our ideal? Reasonably small is always better.

Now that we've looked at a few different smells, here's an interesting observation: this is the first smell we've encountered that has only three refactoring techniques listed in the [reference chart](https://www.industriallogic.com/img/blog/2005/09/smellstorefactorings.pdf)—and two of them we've already covered! But don't worry, I've added a couple more techniques that I believe can also tackle this smell effectively.

## Why Long Parameter Lists Hurt

Let's talk about why having too many parameters is problematic:

**Reduced Readability**: When a method has a long parameter list, it becomes a cognitive burden. Developers need to remember not just what each parameter does, but also their order. Mix up the order? Congratulations, you've just introduced a subtle bug that might take hours to debug.

**Code Duplication**: Ever found yourself copy-pasting a method call because you don't want to deal with gathering all those parameters again? That's code duplication sneaking in through the back door.

**Tight Coupling**: Methods with long parameter lists create tight coupling between the caller and the callee. The calling code needs to know and provide every single parameter, making it difficult to change the function without touching all its call sites.

**Single Responsibility Violation**: If a method needs many parameters, it's probably trying to do too much. A clear, focused method should have a single, well-defined purpose.

**Fragility**: Change the order or type of one parameter, and you might break dozens of existing calls. It's like a house of cards—one small change can bring the whole thing tumbling down.

**Testing Nightmares**: Writing comprehensive unit tests for methods with long parameter lists is exhausting. You need to test various combinations of parameter values to cover different scenarios. More parameters = exponentially more test cases.

**Maintenance Hell**: As your codebase evolves, adding yet another parameter to an already bloated method becomes increasingly painful. This can lead to other code smells like "Shotgun Surgery," where changing one thing forces you to modify code in multiple places.

## How to Refactor Long Parameter Lists

According to the reference chart, we have three primary refactoring techniques for dealing with Long Parameter Lists. But as I mentioned earlier, these techniques all fall under the "Simplifying Method Calls" category, which means there are actually more ways to tackle this smell. I've marked my additional suggestions with asterisks (*).

- Replace Parameter with Method Call
- Introduce Parameter Object
- Preserve Whole Object
- *Remove Parameter*
- *Replace Parameter with Explicit Methods*

### Replace Parameter with Method Call

This technique is about moving the responsibility of preparing parameter values from the caller into the method itself. Let's see it in action:

**Before:**

```java
int basePrice = quantity * itemPrice;
double seasonDiscount = this.getSeasonalDiscount();
double fees = this.getFees();
double finalPrice = discountedPrice(basePrice, seasonDiscount, fees);
```

Notice how `seasonDiscount` and `fees` are just return values from other methods, with no additional logic in between? We can move these calls inside the `discountedPrice` method.

**After:**

```java
int basePrice = quantity * itemPrice;
double finalPrice = discountedPrice(basePrice);
```

Beautiful, isn't it? Now the caller only needs to prepare one parameter—`basePrice`. This dramatically reduces the cost of using the `discountedPrice` method.

Think about it: if this method is called in multiple places throughout your codebase, each call site now saves two lines of parameter preparation. Less code duplication, cleaner interfaces, happier developers.

### Introduce Parameter Object

We covered this technique in detail in the "[Long Method Refactoring](/smells/Bloaters/Long-Method#introduce-parameter-object)" article. The idea is simple: when you have several parameters that naturally belong together, wrap them in a dedicated object. Instead of passing `firstName, lastName, email, phoneNumber` separately, create a `UserContact` object and pass that instead.

### Preserve Whole Object

Also covered in the "[Long Method Refactoring](/smells/Bloaters/Long-Method#preserve-whole-object)" article. When you're extracting multiple values from an object to pass as parameters, just pass the whole object instead. Your method can then extract what it needs internally.

### Remove Parameter

This one is almost too obvious to explain, but it's surprisingly common: sometimes parameters just aren't used. Maybe they were needed once upon a time, or maybe they were added "just in case." Either way, unused parameters should be removed.

One caveat: in object-oriented languages with method overriding, you might intentionally keep unused parameters to maintain method signatures. In these cases, consider renaming the unused parameter to `_` (underscore) or prefixing it with an underscore (like `_unusedData`) to signal its status.

Before removing any parameter, always check all usage contexts and run your tests to ensure behavior remains consistent. Many developers have been burned by "obviously unused" parameters that turned out to be not so unused after all.

### Replace Parameter with Explicit Methods

At first glance, this might sound similar to "Replace Parameter with Method Call," but it's actually quite different. This technique is about splitting a method based on parameter-driven behavior.

**Before:**

```java
void setValue(String name, int value) {
  if (name.equals("height")) {
    height = value;
    return;
  }
  if (name.equals("width")) {
    width = value;
    return;
  }
  Assert.shouldNeverReachHere();
}
```

The `name` parameter is being used to determine which logic path to take. This is a sign that we should split this into separate methods:

**After:**

```java
void setHeight(int arg) {
  height = arg;
}

void setWidth(int arg) {
  width = arg;
}
```

We've transformed one method with two parameters into two methods with one parameter each. This is the essence of "Keep Things Small"—multiple small methods with single responsibilities are always clearer and easier to understand than one large method with many parameters and multiple unrelated responsibilities.

## Wrapping Up

Long Parameter Lists might seem harmless at first—after all, the code still works, right? But as your codebase grows, these bloated method signatures become increasingly painful to work with. The good news is that we have several proven techniques to slim them down.

Next time you find yourself adding yet another parameter to a method, pause and ask: "Is there a better way to structure this?" Your future self (and your teammates) will thank you.

## References

- [Refactoring Guru - Long Parameter List](https://refactoring.guru/smells/long-parameter-list)
- [Refactoring Guru - Replace Parameter with Method Call](https://refactoring.guru/replace-parameter-with-method-call)
- [Industrial Logic - Smells to Refactorings Cheat Sheet](https://www.industriallogic.com/img/blog/2005/09/smellstorefactorings.pdf)
