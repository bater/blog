# Day 1. Code Smells to Refactorings

Created: July 22, 2023 7:36 AM

It's the beginning of a series of articles discussing code smells and how we can refactor them. The series was originally inspired by the tech talk "Get a Whiff of This" given by Sandi Metz at RailsConf in 2016. I love this tech talk video so much that I watch it repeatedly. Therefore, I decided to explore every smell-refactoring pair mentioned in this talk and extend it as an individual blog post.

[https://www.youtube.com/watch?v=PJjHfa5yxlU](https://www.youtube.com/watch?v=PJjHfa5yxlU)

One of the important concepts I learned from this talk is that code smells are **neutral**; they are not always **bad**, but they provide information. If nothing ever changes, it is probably okay. However, in most cases, new requirements will keep coming, and that is why the company hires developers like us to maintain the project.

Nevertheless, even the bad smell is not a bug; it works just as we intended. Refactoring involves rearranging code without altering its behavior. Thus, refactoring a bad smell is not the same as fixing a bug because the behavior is expected to remain the same after refactoring. On the other hand, it is recommended to apply these refactoring techniques when fixing bugs or implementing new features.

Some people dislike refactoring because it doesn't add any new features or fix bugs, and may introduce additional risks into the stable old code.

> If it ain’t broke, don’t fix it.

The saying goes that things should only be changed if they are wrong, not just because they have a bad smell, but I cannot fully agree with that. While I understand that in some cases, maintaining stable behavior is the top priority and there are few or no new features planned for the future, people tend to minimize changes to reduce the risk. Based on my personal experience, applications in the banking industry or accounting systems often mitigate risk by enforcing strict change rules.

Some people may feel nervous about the risks of changing code, but there are also some risks if we don't change it. Unless the project has a very specific expiration date and will not be used again soon, I believe it is always better to clean the code, considering the long-term prospects.

To gain a clearer understanding of what needs to be refactored, we first need to understand what constitutes "code smell". Each code smell has a specific name and definition, with corresponding solutions for improvement. As Sandi mentioned in her talk, each code smell can be remedied by a specific refactoring recipe. By following these recipes, we can systematically improve our code quality.

In Japanese culture, there is a significant emphasis on employees cleaning their own working environment instead of relying solely on a cleaner or someone else. This practice is not only about maintaining sanitation, but it is also a ceremony to express our discipline and appreciation for others, including the working environment.

As software developers, our code base is our working environment. Keeping the code tidy and clean is an essential part of our job duties, without a doubt.

I am not sure how quickly this process may be replaced by an AI assistant like Github Copilot, but one can only confirm the output if one understands the theory behind the scenes.

We can classify classic code smells into five main categories.

## Bloaters

It doesn‘t need to be that big.

- Long Method
- Large Class
- Primitive Obsession
- Long Parameter List
- Data Clumps

## Tool Abusers

These are ideas that are available in object-oriented programming that you can misuse.

1. Switch Statements
2. Refused Bequest
3. Alternative Classes with Different Interfaces
4. Temporary Field

## Change Preventers

These are smells that make change hard.

1. Divergent Change
2. Shotgun Surgery
3. Parallel Inheritance Hierarchies

## Dispensables

A dispensable is something unnecessary that, if removed, would make the code cleaner, more efficient, and easier to understand.

1. Lazy Class
2. Speculative Generality
3. Data Class
4. Duplicated Code
5. Comment
6. Dead Code

## Couplers

It binds the objects together, you can’t ever reach in and get one out and use it in another context. They come as a bundle, all or nothing.

1. Feature Envy
2. Inappropriate Intimacy
3. Message Chains
4. Middle Man

### Other Smells

- Incomplete Library Client

The categories for each code smell may differ depending on the author's perspective. For instance, in her talk, Sandi doesn't consider it appropriate to include "Comment" and "Dead Code" in the Dispensable category. However, following the Refactoring Guru's approach, I believe it's more suitable to group them together.

As a personal challenge, I will explain the details of each code smell with the corresponding refactoring recipe in the upcoming days. If you find this topic interesting, please feel free to leave any comments or feedback.

### Reference

Get a Whiff of This, Sandi Metz [**https://youtu.be/PJjHfa5yxlU**](https://youtu.be/PJjHfa5yxlU)

Refactoring Guru [https://refactoring.guru/refactoring/catalog](https://refactoring.guru/refactoring/catalog)

[https://www.industriallogic.com/xp/refactoring/catalog.html](https://www.industriallogic.com/xp/refactoring/catalog.html)

[https://www.refactoring.com/catalog/](https://www.refactoring.com/catalog/)

This series of articles can also be found from here:

[https://smells-to-refactorings.gitbook.io/smells](https://smells-to-refactorings.gitbook.io/smells)