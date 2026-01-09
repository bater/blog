# Day 13. Tool Abusers > Refused Bequest 被拒絕的遺產與如何重構

Created: July 29, 2023 9:47 PM
Tags: Tool Abusers

## 氣味的徵兆

這個氣味專屬於「子類別（Subclass）」，當子類別並沒有用到多數從「父類別」所繼承而來的屬性與方法，或是雖然繼承了，但是覆寫（override）為空的方法或是無意義的實作。換句話說，父類別與子類別的意圖與行為有很大的差異。所以子類別比起被動「繼承」，寧願選擇拒絕（Refused）這些不請自來的遺產（bequest）。

## 氣味的原因

- **違反里氏替換原則 (LSP)**：里氏替換原則（Liskov Substitution principle）主張，父類別的實體應該可以被子類別的實體給替代，而不影響行為的正確性。當一個子類別拒絕繼承的方法時，它就違反了里氏替換原則。這將會使得難以將子類視作為父類別的替代品。這個原則規範了理想的繼承精神：子類別必須擁有父類別的全部屬性和方法，並且避免子類別覆寫父類別的功能。
- **誤導性設計**：當一個子類繼承了父類的方法，但不使用它們或提供虛假的實作時，它可能會使開發人員感到困惑，因為他們期望繼承的方法按預期運行。
- **不完整的行為**：預期繼承的方法應提供某種行為或功能。如果一個子類拒絕繼承的方法，它可能缺乏必要的行為，或者在使用這些方法時導致意外錯誤。
- **維護挑戰**：將來可能需要更新子類，因為父類中的變更或實現缺失的行為。這可能導致行為或預期上的不一致性，並增加維護工作的努力。
- **資源浪費**：繼承未使用或使用無操作實現覆蓋的方法會浪費記憶體和開發工作，並可能使代碼的理解變得複雜。
- **代碼重用性差**：繼承的主要目的是促進代碼重用。當一個子類拒絕繼承時，繼承的方法的可重用性受到損害。

## 對應氣味的重構技巧

能夠對應氣味的技巧如下：

- Push Down Field
- Push Down Method
- Replace Inheritance with Delegation

### Push Down Field 屬性下移

如果父類別的屬性（Field）並沒有被所有子類別所需要，我們可以考慮將屬性實作由父類別往下搬移到子類別本身身上。藉此來避免不需要這些屬性的子類別在繼承時，無意義的也一樣繼承了這些用不上的屬性。

### Push Down Method 方法下移

跟屬性相同原理，只是下移的對象改為方法。

### Replace Inheritance with Delegation 以委託取代繼承

當子類別只有使用到一部分的父類別屬性或方法時，我們繼續使用繼承是不合理的。因此這個時候我們可以考慮使用委託（Delegation）來取代繼承。在原有的子類別屬性中放入一個父類別的實體，然後「委託」這個實體去取得父類別的特定屬性，藉此來避免掉過度繼承無謂的部分。

---

## Sign of Smell

The subclass does not use most of the functionalities of its parents or overrides them with empty or meaningless implementations. In fact, the SuperClass and SubClass are quite different from each other. Rather than tolerating inheritance, you tend to write code that refuses the "bequest".

## Reason of Smell

- **Violation of Liskov Substitution Principle (LSP)**: The Liskov Substitution Principle states that objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program. When a subclass refuses inherited methods, it violates the LSP, making it difficult to use the subclass as a true substitute for the parent class.
- **Misleading Design**: When a subclass inherits methods from a parent class but doesn't use them or provides empty implementations, it can confuse developers who expect the inherited methods to work as intended.
- **Incomplete Behavior**: Inherited methods are expected to provide certain behavior or functionality. If a subclass refuses the inherited methods, it might lack the necessary behavior or cause unexpected errors when those methods are invoked.
- **Maintenance Challenges**: The subclass might need to be updated in the future due to changes in the parent class or to implement the missing behavior. This can lead to inconsistencies and increased maintenance effort.
- **Wasted Resources**: Inheriting methods that are not used or are overridden with no-op implementations wastes memory, and development effort, and can complicate the understanding of the code.
- **Poor Code Reusability**: The main purpose of inheritance is to promote code reusability. When a subclass refuses bequest, the reusability of the inherited methods is compromised.

## Refactoring Recipe

To address this code smell, we can try the following refactoring skills:

- Push Down Field
- Push Down Method
- Replace Inheritance with Delegation

### Reference

[https://refactoring.guru/smells/refused-bequest](https://refactoring.guru/smells/refused-bequest)

[https://ithelp.ithome.com.tw/articles/10212037](https://ithelp.ithome.com.tw/articles/10212037)

[https://refactoring.guru/push-down-field](https://refactoring.guru/push-down-field)

[https://refactoring.guru/replace-inheritance-with-delegation](https://refactoring.guru/replace-inheritance-with-delegation)