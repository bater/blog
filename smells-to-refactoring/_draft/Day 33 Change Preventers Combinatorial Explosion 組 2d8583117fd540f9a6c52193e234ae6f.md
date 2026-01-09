# Day 33. Change Preventers > Combinatorial Explosion 組合爆發

Created: July 29, 2023 9:52 PM

## 氣味的徵兆

這個程式碼氣味發生在多個程式碼片段執行「幾乎相同」的任務，但卻使用了不同的資料或行為組合。請特別留意事「幾乎相同」而不是真正完全相同。

如果當你注意到「以不同方式執行相似任務」的關鍵字，可能會懷疑這是不是與「重複的程式碼（Duplicated Code）」或「奇特解決方案（Oddball Solution）」氣味雷同。實際上，這個氣味卻是「平行繼承階層」氣味的遠親，只不過所有重複的片段都存在於相同階層之內。

根據Marcel Jerzyk在他的書中《程式碼氣味：綜合線上目錄與分類》，「組合爆發」和「奇特解決方案」都屬於Bloaters分類。然而，依我之見，我認為「組合爆炸」味道應該屬於變動阻礙者（Change Preventers）分類下。關鍵原因是，當我們修改一部分「組合爆發」程式碼時，我們還需要同時對另外一部分也進行相應修改，這正好符合變動阻礙者下的定義。

當我們與「重複的程式碼」相比較時：「組合爆發」是指由於平行設計而導致重複的相似程式碼，因為必須遍歷所有可能的組合而成；另一方面，重複的程式碼則是發現有偶然相似的程式碼片段解決相同或不同的任務，並非有意為之。

此外，如果與「奇特解決方案」比較時，我們可以發現這是一種試圖在不同地方使用不同方法解決相同問題的氣味。不必要的差異和重複造成程式碼不一致，我認為它屬於非必要的存在（Dispensables）分類。

## 氣味的原因

- **可讀性**：當程式碼具有高度的組合爆發氣味，會讓人難以閱讀。開發人員可能會難以理解不同資料或行為之間的交互作用，進而導致程式碼品質下降。
- **複雜性**：當輸入或選項的可能組合數量增加時，程式碼會變得更加複雜且難以理解。這種複雜性可能導致錯誤、除錯困難以及維護成本上升。
- **違反「不要重複原則（DRY）」**：當發生組合爆發時，通常會導致程式碼片段重複，因為開發人員可能會編寫類似或相同的邏輯來處理各種可能選項的組合。這些重複不僅違反了「不要重複原則」，還使得程式碼專案更容易出錯或是不一致。
- **違反開閉原則（OCP）**：開閉原則是物件導向設計中的SOLID原則之一，強調軟體實體（例如類別、模組、函數）應該對擴充保持開放但卻對修改維持封閉。組合爆發很可能會違反這一原則，因為處理新的組合需要打開修改現有程式碼，可能會導致錯誤風險。
- **高度耦合**：組合複雜性通常表示程式碼不同部分之間的高度耦合。實際上，平行性是耦合的指示。這意味著我們必須像一對程式碼一樣執行相同的變更。
- **測試挑戰**：隨著組合數量的增加，測試所有可能的情境組合變得不切實際且耗時。這可能間接造成測試不確實，進而導致錯誤發生。

## 對應的重構技巧

- Replace Implicit Language with Interpreter
- Replace Inheritance with Delegation
- Move Embellishment to Decorator

### 以解譯器（Interpreter）替代隱式語言

「隱式語言」指的是一組邏輯或規則，以間接和不明顯的方式表達。這其中可能包括複雜的條件語句、決策流程、數值運算和其他邏輯元件。然而，它缺乏適當的結構整理，這使得它相當不容易理解。

解譯器是一種設計模式，通過使用特定領域語言（DSL）來解決問題。這個DSL以結構化的方式表示配置或組合，遵循一套定義的語法或規則。

為了解決組合爆發的氣味，我們可以將條件組合邏輯與核心應用邏輯拆分開來。不要將複雜的條件語句處理分散到整個程式碼庫中不斷重複，而是使用解譯器來評估和實際執行DSL表達式。

### 以委託（Delegation）替代繼承

我們通常可以通過以委託替代繼承來解決這個程式碼氣味，這種方法有助於減少複雜性、改善程式碼結構，並消除組合爆發的問題。

在這種重構技術中，我們可以使用基於「組合（composition-based）」的元件來替換組合爆發。我們可以將責任委託給具有特定功能的實體物件，而不是從繼承而來。這可以讓我們輕鬆混合和搭配不同的功能，比起繼承有了更高的靈活度。

### 移動裝飾（Embellishment）到裝飾者（Decorator）

在物件導向程式語言中，將共同的邏輯分享給多個類別通常是通過「繼承」來完成的。然而，繼承有些缺點。首先它是靜態的，這意味著我們無法在運行時更改物件的繼承關係。此外，大多數語言只允許一個類別從另外一個父類別繼承。由於子類別共享一個共同的父類別，它們很可能其實只需要其功能的一小部分，這會導致意外的副作用發生。

裝飾者設計模式通過提供一種靈活的方法來動態擴展和共享功能，以解決「繼承」的限制。與繼承不同，它允許裝飾者更好地遵守單一職責原則，將核心邏輯、結構和額外的功能分開，讓程式碼簡化。

---

> When multiple pieces of code achieve almost the same thing but with different combinations of data or behavior.
> 

## Sign of Smell

This smell occurs when multiple pieces of code achieve almost the same task but use different combinations of data or behavior.

If you catch up the keyword like “Doing the same thing in different ways”, you might doubt that it’s the same smell as “Duplicated Code” or “Oddball Solution”, but in fact, it’s a relative of Parallel Inheritance Hierarchies code smell, but everything has been folded into one hierarchy.

According to Marcel Jerzyk in his book "Code Smells: A Comprehensive Online Catalog and Taxonomy," both "Combinatorial Explosion" and "Oddball Solution" are categorized under Bloaters. However, in my opinion, I believe the “Combinatorial Explosion” smell belongs to the Change Preventers catalog instead. The key factor supporting my point is that when we modify one part, we also need to make simultaneous changes to another part when dealing with the Combinatorial Explosion code, and it exactly fits the definition of the Change Preventers catalog.

When comparing this smell to the Duplicated Code smell, the "Combinatorial Explosion" refers to repeated similar code caused by a parallel design, where it has to go through all possible combinations. On the other hand, Duplicated Code has similar code to solve the same or different tasks incidentally, not intentionally.

Additionally, when we compare it to the Oddball Solution smell, it's the smell that tries to solve the same problem in a different place using a different approach. The unnecessary difference and repetition make this code inconsistent. As a result, I believe it belongs in the Dispensables catalog.

## Reason of Smell

- **Readability**: Code with a high degree of combinatorial complexity can be difficult to read. Developers may struggle to understand the interactions between different data or behaviors, leading to reduced code quality.
- **Complexity**: As the number of possible combinations of inputs or options increases, the code becomes more complex and harder to understand. This complexity can lead to bugs, difficult debugging, and increased maintenance costs.
- **Don’t Repeat Yourself Principle Violation**: When a Combinatorial Explosion occurs, it often leads to code duplication because developers may write similar or identical logic to handle various combinations of options. This duplication not only violates the DRY principle but also makes the codebase more error-prone.
- **Open-Closed Principle Violation**: The OCP is one of the SOLID principles of object-oriented design, and it emphasizes that software entities (e.g., classes, modules, functions) should be open for extension but closed for modification. Combinatorial Explosion can violate this principle when handling new combinations requires modifying existing code, leading to potential risks.
- **High Coupling:** Combinatorial Complexity often indicates high coupling between different parts of codes. In fact, parallelism is an indication of coupling. It means that we have to perform the same changes as if it were a couple of codes.
- **Test Challenges**: With a large number of combinations, testing all possible scenarios becomes impractical and time-consuming. This can result in inadequate testing, leading to undiscovered bugs.

## Refactoring Recipes

There’s only one refactoring skill on the origin table, but I added other 2 skills that I think are also well-matched.

- Replace Implicit Language with Interpreter
- Replace Inheritance with Delegation
- Move Embellishment to Decorator

### Replace Implicit Language with Interpreter

"Implicit Language" refers to a set of logic or rules that are expressed indirectly and non-obviously. It may involve complex conditionals, decision flows, numerical calculations, and other elements. However, it lacks proper structuring, which makes it less immediately understandable.

The Interpreter is a design pattern that addresses problems by utilizing a Domain-Specific Language (DSL). This DSL represents configurations or combinations in a structured manner, following a defined grammar or set of rules.

To address the issue of Combinatorial Explosion, refactor your code by separating the configuration or combination logic from the core application logic. Instead of scattering complex conditional statements or configuration handling throughout your codebase, use an interpreter to evaluate and execute DSL expressions.

### Replace Inheritance with Delegation

We can often solve this smell by replacing inheritance with delegation. This approach can help reduce complexity, improve code organization, and eliminate the need for Combinatorial Explosion.

In this refactoring technique, we can replace the Combinatorial Explosion with a composition-based approach. Instead of inheriting from a base class, we can delegate responsibilities to feature-specific objects. This allows for easy mixing and matching of different features.

### Move Embellishment to Decorator

In object-oriented programming, sharing common logic among multiple classes is often done through "inheritance." However, inheritance has drawbacks. It is static, meaning we can't change an object's inheritance at runtime. Additionally, most languages only allow a class to inherit from one parent class. As subclasses share a common base class, they may only need a small portion of its functionality, resulting in unintended side effects.

The Decorator design pattern addresses the limitations of "inheritance" by offering a flexible approach to dynamically extend and share functionality, minimizing the dependency between subclasses and their parent classes. Unlike inheritance, which extends a single base class, the Decorator pattern allows decorators to better adhere to the Single Responsibility Principle by separating the core logic, structure, and additional features.

### Reference

[https://luzkan.github.io/smells/combinatorial-explosion](https://luzkan.github.io/smells/combinatorial-explosion)

[https://github.com/Luzkan/smells/blob/main/docs/thesis.pdf](https://github.com/Luzkan/smells/blob/main/docs/thesis.pdf)