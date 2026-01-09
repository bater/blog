# Day 26. Dispensables > Lazy Class 冗余類別

Created: July 29, 2023 9:51 PM

## 氣味的徵兆

「冗余類別（Lazy Class）」也被稱為「遊手好閒者（Freeloader）」。當你發現存在一個無所事事的類別幾乎沒有實作任何職責，那正是這種程式碼氣味。

也許這個類別最初是被設計成具有完整功能的，具備所有必要的方法和實作能力。然而，在經歷多次重構和優化迭代以後，它不知不覺之間變得非常小巧、可有可無。也可能這個類別最初是為了支援未來的開發工作而設計的，但這些計劃工作從來沒有被正式實施或完成。這可能是出於各種可能原因，例如優先事項的變化、資源限制或專案需求的變更。儘管如此，這個類別仍然保持在最初的簡單狀態，仍然等待時機來臨去實現其最初的設計目的，並期待能為未來的開發工作做出貢獻。然而，多數的類別無法等到那天。

順帶一提，冗余類別是「大類別（Large Class）」的相反氣味。

## 氣味的原因

以下是為何冗余類別被視為程式碼氣味的一些原因：

- **可讀性下降：** 不必要的類別使程式碼變得更難閱讀和理解。它們可能會使程式碼專案變得混亂，讓人難以專注於系統的重要部分。
- **增加複雜性：** 冗余類別為程式碼引入不必要的複雜性，使其更難以理解和維護。
- **浪費資源：** 開發和維護一些沒有提供多少或根本沒有價值的類別所需的程式碼，會消耗開發時間和資源，這些資源本可以更好地用於其他地方。
- **降低可維護性：** 含有不必要類別的程式碼更難維護，因為開發人員必須篩選掉沒有實際用途的額外程式碼。

## 對應氣味的重構手段

- Collapse Hierarchy
- Inline Class
- Inline Singleton

### Collapse Hierarchy 折疊階層結構

如果在子類別中發現冗余類別氣味，我們可以考慮將其所剩不多的功能與實作通通合併到父類別之中。

### Inline Class 內聯類別

如果眼前這個類別的功能有限，沒有具體的職責，也沒有被分配的任務，未來也沒有計劃要賦予它額外的功能。在這樣的情況下，我們可以將這個類別的所有功能全部轉移到另一個類別中。

### Inline Singleton 內聯單例

單例（Singleton）是一種設計模式，確保一個類別同時只存在一個實例（類別實體），並提供對該實體的全域訪問點。如果發現實作單例的類別具有冗余類別氣味，我們可以考慮將其轉換為「內聯單例」。

首先，仔細審查冗余類別中單一實體的方法和屬性，以了解其功能以及它如何被使用的。接下來，從冗余類別中複製方法和屬性，並將它們直接複製貼上到使用它們的類別中。

一旦我們完成修改了使用這些單例方法和屬性的類別，我們現在就可以安全地刪除原始的冗余類別。

---

## Sign of Smell

Lazy Class also knows as Freeloader. When you encounter a class that isn’t doing enough to earn your attention, it’s a sign of this smell.

Perhaps a class was initially designed to be fully functional, with all the necessary features and capabilities. However, after undergoing multiple rounds of refactoring and optimization, it has inadvertently become ridiculously small in size. 

Alternatively, the class may have been initially designed with the intention of supporting future development work that was never implemented or completed. This could be due to various reasons such as shifting priorities, resource constraints, or changes in project requirements. Regardless, the class remains in its current state, waiting for the opportunity to fulfill its original purpose and contribute to future development efforts.

Lazy Class is the opposite code smell to Large Class.

## Reason of Smell

Here are some reasons why Lazy Classes are considered a code smell:

- **Reduced Readability**: Unnecessary classes make the code harder to read and understand. They can clutter the codebase, making it difficult to focus on the important parts of the system.
- **Complexity:** Lazy classes add unnecessary complexity to the code, making it harder to understand and maintain.
- **Wasted Resources:** Developing and maintaining code for classes that provide little or no value consumes development time and resources that could be better spent elsewhere.
- **Reduced Maintainability:** Code that contains unnecessary classes is more challenging to maintain because developers have to sift through extra code that doesn't serve a purpose.

## Refactoring Recipes

- Collapse Hierarchy
- Inline Class
- Inline Singleton

### Collapse Hierarchy

If you find the Lazy Class smell in a subclass, we can consider merging it into the superclass.

### Inline Class

The class currently has limited functionality and no specific responsibilities. It does not have any assigned tasks, and there are no plans to give it any additional responsibilities. Therefore, it is suggested to transfer all the features from this class to another class.

### Inline Singleton

A Singleton is a design pattern that ensures a class has only one instance and provides a global point of access to that instance. If you encounter a class with a code smell of Lazy Class and implement it as a singleton, you may consider transforming it into an inline singleton.

First, carefully review the methods and attributes of the Singleton instance in the Lazy Class to understand its functionality and how it is used by the consuming class. Next, copy the methods and attributes from the Singleton instance in the Lazy Class and paste them directly into the consuming class.

Once you have modified the consuming class to use the copied methods and attributes, you can safely delete the original Lazy Class.

### Reference

[https://refactoring.guru/smells/lazy-class](https://refactoring.guru/smells/lazy-class)

[https://www.informit.com/articles/article.aspx?p=1400866&seqNum=12](https://www.informit.com/articles/article.aspx?p=1400866&seqNum=12)

[https://refactoring.guru/design-patterns/singleton](https://refactoring.guru/design-patterns/singleton)