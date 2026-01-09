# Day 27. Dispensables > Speculative Generality 通用畫大餅

Created: July 29, 2023 9:52 PM

## 氣味的徵兆

通用畫大餅（Speculative Generality）是指當我們撰寫的程式碼是用來應對未來需求，但現實中卻可能永遠都派不上用場的這種情況。這與「亡靈程式碼（Dead Code）」氣味相當相似，亡靈程式碼通常是指目前專案內無用的程式碼片段。儘管這兩種氣味都涉及「未使用」的程式碼，但其原因不同。

當我們仔細比較這兩種氣味時，可以找到以下差異：

- 本**質**：通用畫大餅指的是過度設計和產生了不必要的複雜性；而亡靈程式碼則指的是程式碼庫中未被使用或無效的部分。
- **時機**：通用畫大餅通常涉及預先添加不必要的抽象或功能；而亡靈程式碼通常是由程式碼庫隨時間迭代而產生的。
- **影響**：這兩種程式碼異味都可能使程式碼專案更加難以維護和理解；但通用畫大餅引入了不必要的複雜性，而亡靈程式碼則更多關乎於整潔。
- **緩解**：通用畫大餅可以透過遵循「你不會需要它」（YAGNI）原則並避免過度設計來緩解；亡靈程式碼可以透過定期程式碼審查和使用靜態程式碼分析工具來偵測並刪除未使用的程式碼片段來緩解。

這兩種氣味之間的核心差異在於，如果試著使用靜態程式碼分析工具在程式碼庫中想去查找「通用畫大餅」氣味，會發現實際上這些程式碼很可能並不是「未使用」的。然而，從業務邏輯或需求的角度來看，卻可以被視為「無用」的程式碼。

這種混淆是基於「未使用的程式碼」的定義不同導致。亡靈程式碼指的是**未被其他程式碼使用的程式碼；**另一方面，通用畫大餅則是**從業務邏輯或需求的角度來看無用的程式碼**。

最後有一個有趣的事實是，與其他異味不同，通用畫大餅通常是由有經驗的程式設計師創建的，有時他們會陷入過度設計的陷阱。

## 氣味的原因

以下是為何通用畫大餅會被視為程式碼氣味的一些原因：

- **降低可讀性**：包含不必要的抽象或繼承關係的程式碼可能變得難以閱讀。當程式碼過於抽象時，很難追蹤其邏輯和流程，使得除錯和維護都變得更加困難。
- **違反YAGNI原則**：YAGNI代表「你不會需要它（You Aren't Gonna Need It）」，這是一項軟體開發原則，建議在實際需要之前不要添加功能或抽象方法。通用畫大餅正是違反了這個原則，因為它添加了一些永遠不會用上的複雜性和功能，浪費了開發者的時間和精力。
- **增加複雜性**：不必要的抽象、類別、方法或功能增加了程式碼專案的複雜性。這種複雜性可能使開發人員難理解程式碼，並增加錯誤和維護問題的風險。
- **容易困惑**：通用畫大餅可能會讓開發人員感到困惑，他們會難以確定程式碼的哪些部分才是必要的，哪些是又只是對未來的猜測。開發者可能不確定實作時要使用哪些類別或方法，這會導致程式碼設計的不一致性風險。
- **程式碼腫漲**：不必要的程式碼增加了程式碼庫的大小，可能對性能造成負面影響，增加編譯時間，並消耗更多的儲存空間。這也可能使程式碼庫變得低效能，拖慢開發速度變慢。
- **無意義的風險**：通用畫大餅可能不符合實際未來的需求，即使最終這些需求出現。這意味著為了應對這些需求而創建的程式碼，在真正需要時也可能實際上無法發揮原本預期的作用，因為已經間隔了一段時間。
- **維護負擔**：通用畫大餅的程式碼需要更多的維護。開發人員可能需要時時更新或修復為未來需求而創建的程式碼，即使目前未使用也沒需求。這會浪費開發者寶貴的時間和精力。

## 對應氣味的重構手段

"Rename Method"（重新命名方法）這項重構技巧有列在[Smells to Refactorings Cheatsheet](https://www.industriallogic.com/blog/smells-to-refactorings-cheatsheet/)的氣味對應技巧中。然而，我個人認為它並不太適用於通用畫大餅氣味。其他三個技巧洽好與對應「亡靈程式碼」的重構手法相同。

- Collapse Hierarchy
- ~~Rename Method~~
- Remove Parameter
- Inline Class

### Collapse Hierarchy 折疊階層

當我們發現某個類別的功能非常有限，同時它又是一個子類別時，我們可以將其與其父類別合併。

### Remove Parameter 刪除參數

當我們注意到某個參數未被使用時，應該考慮將其刪除。

### Inline Class 內聯類別

當我們發現某個類別幾乎沒有作用時，我們可以考慮將該類別中的剩餘所有功能移至另一個類別中。

---

## Sign of Smell

Speculative Generality is a code smell that occurs when code is written to handle potential future requirements or scenarios that may never actually be needed. It is similar to the Dead Code smell, which refers to unused code that serves no purpose in the current implementation. While both of these smells involve unused code, but they arise for different reasons.

When we compare these two smells closely, we can find the following differences.

- **Nature**: Speculative Generality refers to over-engineering and creating unnecessary complexity, while Dead Code refers to unused or obsolete parts of the codebase.
- **Timing**: Speculative Generality often involves preemptively adding unnecessary abstractions or features, while Dead Code typically arises from changes in the codebase over time.
- **Impact**: Both code smells can make the codebase harder to maintain and understand, but Speculative Generality introduces unnecessary complexity, while Dead Code is more about cleanliness and removing unnecessary clutter.
- **Mitigation**: Speculative Generality can be mitigated by following the YAGNI (You Aren't Gonna Need It) principle and avoiding over-engineering. Dead Code can be mitigated by conducting regular code reviews and using static code analysis tools to detect and remove unused code.

The main difference between the two code smells is that Speculative Generality may not really be “unused code” if you use static code analysis tools to detect it in your codebase. However, from a business or requirement perspective, it can be considered unused code. 

This confusion is based on the definition of "unused code." Dead Code refers to code that is **unused by other code.** On the other hand, Speculative Generality refers to code that is currently **unused from a business or requirement** perspective.

One last funny fact is that, unlike other smells, Speculative Generality is often created by experienced programmers who sometimes engage in over-engineering.

## Reason of Smell

Here are some reasons why Speculative Generality is considered a code smell:

- **Reduced Readability**: Code that includes unnecessary abstractions or layers can become less readable. It can be challenging to follow the logic and flow of the code when it is overly abstracted, making it harder to debug and maintain.
- **YAGNI Violation**: YAGNI stands for "You Aren't Gonna Need It," which is a software development principle that advises against adding functionality or abstractions until they are actually needed. Speculative Generality violates this principle, as it adds complexity and features that may never be required, wasting development time and effort.
- **Increased Complexity**: Unnecessary abstractions, classes, methods, or features add complexity to the codebase. This complexity can make it more challenging for developers to understand the code and can increase the likelihood of bugs and maintenance issues.
- **Confusion for Developers**: Speculative Generality can confuse developers who may struggle to determine which parts of the code are essential and which are speculative. They may not be sure which classes or methods to use, leading to inconsistency in code design.
- **Bloat**: Unnecessary code increases the size of the codebase, which can negatively impact performance, increase compilation times, and consume more storage. It can also make the codebase less efficient and slower to develop.
- **Risk of Misalignment**: Code that is overly generalized may not align with actual future requirements if they do eventually arise. This means that the code created speculatively may not actually serve its intended purpose when those requirements become relevant.
- **Maintenance Overhead**: Code that is overly generalized or abstracted requires more maintenance. Developers may need to update or fix code that was created in anticipation of future requirements but is not currently used. This can waste time and effort.

## Refactoring Recipes

The refactoring skill "Rename Method" is listed in the [Smells to Refactorings Cheatsheet](https://www.industriallogic.com/blog/smells-to-refactorings-cheatsheet/). However, I personally don't think it's a good match for the Speculative Generality smell.

The other three skills are exactly the same as the countermeasure for the Dead Code smell.

- Collapse Hierarchy
- ~~Rename Method~~
- Remove Parameter
- Inline Class

### Collapse Hierarchy

When we find that a class is doing very little and it is a subclass, we can merge it with its superclass.

### Remove Parameter

When we notice that a parameter is currently not used, we should consider removing it.

### Inline Class

When we find that your class is doing almost nothing, we can definitely consider moving all the features from the class to another one.

### Reference

[https://refactoring.guru/smells/speculative-generality](https://refactoring.guru/smells/speculative-generality)

[https://code-smells.com/dispensables/speculative-generality](https://code-smells.com/dispensables/speculative-generality)