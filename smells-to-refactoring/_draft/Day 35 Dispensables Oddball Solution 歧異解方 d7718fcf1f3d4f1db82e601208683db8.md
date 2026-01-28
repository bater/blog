# Day 35. Dispensables > Oddball Solution 歧異解方

Created: October 4, 2023 12:47 PM

## 氣味的徵兆

當你在專案內的不同地方發現存在實現相同功能但卻不同實作細節的程式碼片段，這種現象被稱為「歧異解方（**Oddball Solution**）」氣味，或被稱為「不一致解決方案（Inconsistent Solution）」。一般來說，我們應該盡量以相同的方式（最好也只用一種方式）來解決相同的問題，來保持程式碼的一致性。這種情況可能發生在忽略專案內已經存在相同實作的情況，或者當兩個或更多開發人員各自獨立地同時處理類似的開發需求時，彼此卻不清楚對方的工作細節導致。

根據馬塞爾·耶爾茨克（Marcel Jerzyk）在他的書《程式碼氣味：網路目錄和分類》中的說法，他將「歧異解方」歸類為「臃腫怪（Bloaters）」。然而，在我看來，我認為「歧異解方」氣味更屬於「非必要的存在（**Dispensables**）」分類之類，類似於「重複程式碼（Duplicated Code）」，共同特徵是最好消除這些不必要的不一致性片段。

當你發現氣味定義中出現「以不同方式解決相同問題」的字眼，可能會開始懷疑它是否與「重複程式碼」程式碼氣味相似。如果我們比較「歧異解方」和「重複程式碼」兩種氣味，我們可以發現「歧異解方」指的是**不同的**程式碼片段卻解決了**相同的**問題；另一方面，重複程式碼則是由**相似的**程式碼（或完全相同的程式碼）用於解決某些問題。請留意這裡「重複程式碼」不一定需要用於解決**相同**的問題；有時它只是意外地重複了。這種重複通常是由複製貼上所引起的。

當你遇到**兩個類別**試圖解決相同問題但具有不同的實作細節或介面時，可以被視為「異曲同工的類別（Alternative Classes with Different Interfaces）」氣味。換句話說，「異曲同工的類別」近似於「歧異解方」的類別版本。

## 氣味的原因

- **可讀性**：歧異解方會讓程式碼變得更加難以閱讀和理解。開發者需要學習並記住多種不同完成相同任務的方式。
- **可重用性**：物件導向程式設計的主要好處之一是能夠重複使用程式碼。然而，當我們試圖用不同的解決方案解決相同的問題時，將它們互換使用可能會很具挑戰性，這會降低程式碼的可重用性。同時還可能會影響軟體的效能，並使其更難以維護和擴充。
- **違反 DRY（Don't Repeat Yourself） 原則**：DRY（不要重複自己）鼓勵開發者以模組化和可重複使用的方式編寫程式碼。當你的程式碼中有歧異解方氣味時，實質上是在多個地方實現相似的邏輯，可說是正在重複自己。這種無謂的冗余增加了錯誤風險和不一致性的可能性。
- **不一致性**：當程式碼的多個部分執行相似的功能，但具有不同的實現方式時，可能會讓開發者感到困惑。不一致的命名、方法簽章或資料結構等會使程式碼變得難以理解和維護。
- **維護挑戰**：當嘗試修改散佈在程式碼庫中的多種不同解決方案時，會導致新的維護挑戰。如果在其中之一的解決方案中發現並修復了一個錯誤，很容易忘記同時在其他相似的解決方案中也進行相應的修復。每次更改都必須注意到多個不同位置，這增加了導致不一致或產生錯誤的風險。

## 對應的重構技巧

- Unify Interfaces with Adapter
- Rename Method

### Unify Interfaces with Adapter 將介面統一為轉接器模式

我們可以考慮使用「轉接器設計模式（Adapter Design Pattern）」來整合多個不同介面。

就像我們在真實世界中如果旅行到世界各地，我們很可能也需要為電源插座準備一個轉接頭一樣。當現有的介面無法相容支援時，我們可保留行為，但是創造一個中繼的轉接問件來做對接，擴充使用彈性。

優點是符合單一職責原則，原有的介面不需要繼續處理轉換問題，而把這些介面轉化的邏輯由轉接器全權處理，做到職責分離；第二個優點是是符合開放封閉原則，原有的類別對修改保持封閉，維持原有介面，但是透過轉接器來擴充更多使用情境，對擴充保持開放。缺點是「轉接器設計模式」會讓程式碼的複雜度增加。

### Rename Method 重新命名方法

如果兩種不同解法的唯一不同之處是方法名稱，我們可以考慮變更名稱來讓他們保持相同。請注意這可能是一連串重構手法中的第一步，當我們發現相似但不同的程式碼片段，首先讓他們相似度提高，藉此來觀察出合適抽象提出的部分作為共用。

---

## Sign of Smell

When you encounter different solutions implemented in different places for the same problem in your codebase, it is referred to as the "Oddball Solution" smell, also known as the "Inconsistent Solution" smell. Generally, we should solve the same problem in the same way (and only one way) to keep the code consistency. 

This smell may occur when there is an oversight that a functionally equivalent solution already exists, or when two or more developers are independently working on code to handle a similar situation without knowledge of each other's work.

According to Marcel Jerzyk in his book "Code Smells: A Comprehensive Online Catalog and Taxonomy," "Oddball Solution" is categorized as Bloaters. However, in my opinion, I believe the "Oddball Solution" smell belongs to the Dispensables catalog, similar to the "Duplicated Code" smell. It is better to remove the unnecessary inconsistency.

If you come across the keyword "Solving the same problem in different ways," you might question whether it is similar to the "Duplicated Code" code smells. When comparing the "Oddball Solution" with the "Duplicated Code" smell, the "Oddball Solution" refers to **different** code that solves the **same** problem. On the other hand, duplicated code consists of **similar** code (or exactly the same code) used to solve some problems.  Duplicated code doesn't always need to be used to solve the same problem; sometimes it is just repeated by accident. This duplication is often caused by copy-paste.

When you encounter **two classes** that attempt to solve the same problem but with different implementations or interfaces, it can be considered an "Alternative Classes with Different Interfaces" smell. In other words, the "Alternative Classes with Different Interfaces" smell is similar to the class-specific version of the "Oddball Solution" smell.

## Reason of Smell

- **Readability**: Oddball Solution make the code harder to read and understand. Developers need to learn and remember multiple ways of accomplishing the same task.
- **Reusability**: One of the main benefits of object-oriented programming is the ability to reuse code. However, when we try to solve the same problem with different solutions, it can be challenging to use them interchangeably, which reduces code reusability. This can affect the performance of the software and make it harder to maintain and extend.
- **Violation of DRY Principle**: DRY (Don't Repeat Yourself) encourages developers to write code in a modular and reusable manner. When you have Oddball Solution smell, you're essentially repeating yourself by implementing similar logic in multiple places. This redundancy increases the risk of bugs and inconsistencies.
- **Inconsistency**: When multiple parts of code are intended to perform similar functions but have different implementations, it can create confusion for developers. Inconsistent naming, method signatures, or data structures make the codebase harder to understand and maintain.
- **Maintenance Challenge**: When attempting to modify a problem that has different solutions scattered throughout the codebase, it introduces a new challenge for maintenance. If a bug is found and fixed in one solution, it is easy to forget to make the same fix in other similar solutions. Each change must be applied to multiple locations, which increases the likelihood of introducing inconsistencies or errors.

## Refactoring Recipes

- Unify Interfaces with Adapter
- Rename Method

### Reference

[https://luzkan.github.io/smells/oddball-solution](https://luzkan.github.io/smells/oddball-solution)