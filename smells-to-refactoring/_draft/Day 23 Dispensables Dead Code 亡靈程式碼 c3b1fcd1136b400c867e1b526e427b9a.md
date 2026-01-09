# Day 23. Dispensables > Dead Code 亡靈程式碼

Created: July 29, 2023 9:52 PM

## 氣味的徵兆

在軟體開發的世界中，術語「亡靈程式碼（Dead Code）」可能含有多重定義。作為一種程式碼氣味，我們也可以將亡靈程式碼稱之為「未執行的程式碼（Unreachable code）」，這是指因為沒有辦法從任何程式碼流程中觸及到，所以永遠不會被執行的程式碼。亡靈程式碼還可能指雖然能夠被執行，但是對最終行為或產出結果沒有影響的程式碼。

在2019年的RubyConf中，Noah Matisoff介紹了「挖掘Ruby中的程式碼墳墓（Digging Up Code Graves in Ruby）」這個題目。他強調了亡靈程式碼是「程式碼衛生」的一部分，而「程式碼衛生」又是技術債的一環。「程式碼衛生」包括與程式碼庫內與健康和專案壽命相關的各種實踐，程式碼氣味與亡靈代碼只是其中一部分。

[https://www.youtube.com/watch?v=ffrv-JppavY](https://www.youtube.com/watch?v=ffrv-JppavY)

接下來，我將解釋幾種類型的亡靈程式碼。

### 未執行的程式碼 Unreachable code

這是指永遠不會被使用的程式碼，它超出了控制流程路徑並且無法從程式的其餘部分到達。有時，您可能會遇到一種情況，即使條件語句存在，但條件永遠為真或為假。無法達到的程式碼隱藏在永遠不會發生的條件中。

另一個常見的情況是，當您刪除或重構程式碼時，導致某些部分在更改後永遠不會被觸發或呼叫。然而，在程式碼審查期間，卻沒有人注意到這一點。

### 無意義的程式碼 Pointless Code

無意義的程式碼是指已執行但對最終結果或行為毫無影響的程式碼。它通常也稱為死代碼，但在這裡我使用了不同的名稱以避免混淆。

### 功能開關 Feature Toggles

功能開關是一種軟體開發設計典範，用在不修改程式碼的情況下啟用或關閉軟體應用程式中的特定功能。它提供了一種以靈活和動態的方式控制特定功能的可用性和行為的方法，通常在運行階段而不是通過靜態程式碼更改或不同的程式碼分支進行操作。

然而，如果不小心管理，功能開關可能會在程式碼中引入亡靈程式碼的問題。《重構》的作者Martin Fowler曾分享過他對功能開關的看法。

> 精明的團隊將他們的功能開關視為庫存，並意識到這些庫存會產生成本，因此努力將庫存保持在最低限度。 — Martin Fowler
> 

功能開關固然是有用的設計典範，但如果沒有謹慎使用，很可能會帶來亡靈程式碼這種氣味，不可不慎。

## 氣味的原因

- **可讀性**：不必要的程式碼混亂了整個專案，也降低了整體的可讀性。這可能使開發人員更難理解程式碼，並引入了分散注意力的雜訊噪音，使實際有用的功能變得更加難以辨認。
- **程式碼腫脹**：亡靈程式碼增加了專案內程式碼的大小，但並不增加任何價值。這可能導致更大的編譯檔案或迫使網頁應用程式需要下載時間更長，影響使用者體驗。
- **潛在的錯誤**：亡靈程式碼可能隱藏或混淆真正的潛在問題。如果存在未使用的變數、方法或程式碼區塊，而這些本來應該是要被使用的，它們可能會在程式碼專案的其他地方進行更改時導致不可預期的意外風險。開發人員也可能錯誤地認為未使用的程式碼仍在使用，並在進行更動時引入其他錯誤。
- **性能耗損**：儘管亡靈程式碼不一定會執行，但它仍然占用記憶體內存空間並增加程式碼專案的大小。儘管對於小型軟體應用程式來說可能不是一個顯著的問題，但它仍然可能會影響較大或資源有上限的專案的性能和記憶體使用問題。
- **可維護性**：亡靈程式碼使程式碼專案更難以維護。開發人員可能會浪費時間嘗試理解和處理毫無用處的程式碼。這可能會導致混亂，使識別程式碼專案的相關部分變得困難。

## 對應氣味的重構手段

令人驚訝的是，「亡靈程式碼」這種程式碼氣味在由Joshua Kerievsky於2005年創建的「程式碼氣味到重構速查表」中並未出現。不過，我們仍然可以在其他指南中找到一些相應的重構技巧，例如[Refactoring Guru網站](https://refactoring.guru/smells/dead-code)。

- Inline Class 內聯類別
- Collapse Hierarchy 折疊階層
- Remove Parameter 刪除參數

亡靈程式碼可以指我們程式碼專案中的任何東西：變數、參數、屬性、方法，甚至不會再使用的整個類別。因此，進行重構所需的技巧也因代碼的格式不同而異。

### Inline Class 內聯類別

當我們發現某個類別幾乎沒有作用時，我們可以考慮將該類別中的剩餘所有功能移至另一個類別中。

### Collapse Hierarchy 折疊階層

當我們發現某個類別的功能非常有限，同時它又是一個子類別時，我們可以將其與其父類別合併。

### Remove Parameter 刪除參數

當我們注意到某個參數未被使用時，應該考慮將其刪除。

---

## Sign of Smell

In computer programming, the term "dead code" has multiple definitions. As a code smell, we can also refer to dead code as "unreachable code," which is code that can never be executed because there is no control flow path to reach it from the rest of the program. Dead code can also refer to code that is executed but has no effect on the final behavior or result.

At RubyConf 2019, Noah Matisoff discussed the topic of "Digging Up Code Graves in Ruby". He emphasized that dead code is a part of code hygiene, which in turn is a component of technical debt. Code hygiene encompasses various practices related to the health and longevity of a codebase.

[https://www.youtube.com/watch?v=ffrv-JppavY](https://www.youtube.com/watch?v=ffrv-JppavY)

Next, I will explain several types of dead code.

### Unreachable code

The code that would never used, it’s out of the control flow path and unreachable from the rest of the program. Sometimes, you may encounter a situation where you have a conditional statement, but the conditions are always true or false. The unreachable code is hidden within a condition that will never occur.

Another common case is when you delete or refactor code, causing some parts to never be triggered after the change. However, during the code review, no one notices this.

### Pointless Code

Pointless code refers to code that is executed or run but has no impact on the final result or behavior. It is also commonly known as dead code, but I am using a different name to avoid confusion here.

### Feature Toggles

Feature toggles, also known as feature flags or feature switches, are a software development technique used to enable or disable specific features or functionalities in a software application without modifying the codebase. They provide a way to control the availability and behavior of specific features in a flexible and dynamic manner, often at runtime, rather than through static code changes or separate code branches.

However, if not managed carefully, feature toggles can introduce the "Dead Code" smell in your codebase. Martin Fowler, the author of "Refactoring", once shared his thoughts about Feature Toggles.

> Savvy teams view their Feature Toggles as inventory which comes with a carrying cost, and work to keep that inventory as low as possible. — Martin Flower
> 

It is a powerful design that is beneficial in most cases, but we should also be concerned about the code smell it might cause.

## Reason of Smell

- **Readability**: Unnecessary code clutters the codebase, reducing its overall readability. This can make it harder for developers to comprehend the code and can introduce noise that distracts from the actual functionality.
- **Code Bloat**: Dead code increases the size of the codebase without adding any value. This can lead to larger binaries or longer download times for web applications, impacting user experience.
- **Potential Bugs**: Dead code can hide real issues. If there are unused variables, functions, or blocks of code that were intended to be active, they might lead to unexpected behavior when changes are made elsewhere in the codebase. Developers may also mistakenly believe that unused code is still in use and could introduce bugs when they make changes.
- **Performance Overhead**: Even though dead code is not executed, it still occupies memory and contributes to the size of the codebase. While this may not be a significant concern for small applications, it can impact performance and memory usage in larger or resource-constrained projects.
- **Maintainability**: Dead code makes the codebase more challenging to maintain. Developers may waste time trying to understand and work with code that serves no purpose. It can lead to confusion and make it difficult to identify the relevant parts of the codebase.

## Refactoring Recipes

Surprisingly, the "Dead Code" smell does not appear on the [Smells to Refactorings Cheatsheet](https://www.industriallogic.com/blog/smells-to-refactorings-cheatsheet/) created by Joshua Kerievsky in 2005. However, we can still find some matching refactoring skills from other guidelines, such as the [Refactoring Guru website](https://refactoring.guru/smells/dead-code).

- Inline Class
- Collapse Hierarchy
- Remove Parameter

Dead code can refer to anything in our codebase - a variable, parameter, field, method, or even an entire class that is no longer used. Therefore, the skills required for refactoring also vary depending on the format of the dead code.

### Inline Class

When we find that your class is doing almost nothing, we can definitely consider moving all the features from the class to another one.

### Collapse Hierarchy

When we find that a class is doing very little and it is a subclass, we can merge it with its superclass.

### Remove Parameter

When we notice that a parameter is not used, we should consider removing it.

### Reference

[Digging Up Code Graves in Ruby](https://youtu.be/ffrv-JppavY?si=4LDftv3eI4LRb2iy) by Noah Matisoff at RubyConf 2019

[https://en.wikipedia.org/wiki/Unreachable_code](https://en.wikipedia.org/wiki/Unreachable_code)

[https://refactoring.guru/inline-class](https://refactoring.guru/inline-class)

[https://refactoring.guru/collapse-hierarchy](https://refactoring.guru/collapse-hierarchy)