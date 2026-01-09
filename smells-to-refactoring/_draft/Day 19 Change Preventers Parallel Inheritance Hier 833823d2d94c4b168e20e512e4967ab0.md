# Day 19. Change Preventers > Parallel Inheritance Hierarchies 平行繼承的類別關係與重構

Created: July 29, 2023 9:49 PM

## 氣味的徵兆

這種氣味可以視為是「散彈槍手術（Shotgun Surgery）」的一種特例。但和散彈槍手術不同的地方在於，「平行繼承的類別關係」中我們僅只聚焦在新增的「子類別」這個行為之上。當我們為其中一個類別建立新的子類別時，我們同時也需要為另一個類別建立一個新的子類別。

這種氣味在物件導向程式語言中出現時，代表我們擁有兩組緊密相關且高度耦合，時時反映彼此變動的類別結構。當專案保持在較小規模時，一切看上去都還沒問題。然而，隨著組織與專案需求的膨脹和不斷新增類別，對類別階層進行修改也會變得越來越具有挑戰性。

## 氣味的原因

平行繼承的類別關係之所以被視為一種氣味，主要出於下列原因：

- **可讀性**：平行繼承的類別關係可能會使程式碼變得更加難以閱讀和理解，因為開發者需要在兩個相互對應結構的獨立類別之間不斷來回比較異同之處。這會妨礙多人同時協作，也讓新團隊成員難以理解程式碼的設計。
- **高耦合（High Coupling）**：「平行繼承的類別關係」通常表示程式碼專案不同部分之間的高度耦合。事實上，平行（Parallelism）是耦合的一種指標。這意味著我們必須總是向「成對的類別」做出相似的改動。
- **程式碼重複**：維護平行繼承的類別關係通常會導致程式碼大量重複。相似的程式碼或行為可能存在於兩個不同類別結構中，這不僅是一種多餘的浪費，而且如果兩個類別雙方隨著時間累積歧異，還會增加程式碼不一致和錯誤的風險。
- **複雜性**：平行繼承的類別關係為程式碼帶來了額外的複雜性。當你有兩組必須保持同步的類別結構時，一個類別中的任何更改通常都需要在另一個類別內也進行相應的改動。這種複雜性使程式碼更難理解和維護。
- **靈活性減少**：平行繼承的類別關係可能會使得添加新功能或應對不斷變化的需求變得更加具有挑戰性。任何修改變動通常都需要在兩個類別之中進行來回反覆修改，這將會導致開發時間和工作量增加。
- **維護挑戰**：保持兩個類別的同步可能容易出錯且耗時。當您在一個類別中添加新的子類別或進行更改時，你必須記得在另一個類別中也進行相應的新增。如果您忘記更新其中一側，則可能導致不一致和錯誤。

## 對應氣味的重構手段

從對應表中列出了兩種重構方法可以對應這個氣味，但我認為後面三種也可以有效改善程式碼：

- Move Method
- Move Field
- Extract SuperClass
- Extract Interface
- Replace Inheritance with Delegation

### Move Method / Move Field 搬移方法 / 搬移屬性

要解耦合平行繼承的類別關係，我們可以參考以下步驟：

1. 首先建立一個新的關聯，讓一個類別中的實體能夠參照另一個類別的實體，建立這兩個類別之間的關聯。
2. 透過使用「搬移方法」或「搬移屬性」等重構技巧，消除被參照的類別中的額外元素。這些技術可以幫助我們將方法或屬性移動到更適當的類別中。

透過實施這些步驟，我們可以有效地解耦合平行繼承的類別關係，使程式碼更具靈活性和可維護性。

### Extract SuperClass 抽出父類別

當我們有兩個類別，在其中一個建立新的子類別後，也需要在另一個類別也建造一個對應子類別時，這表示這兩個類別可能具有類似的行為可供共用。

在這種情況下，我們應該考慮為一個或兩個平行繼承的類別關係抽取出共通的父類別，然後繼承使用這些共通行為。

### Extract Interface 抽出介面

同樣地，我們還可以考慮定義一個共同的介面，提供一個或多個平行繼承的類別關係中的類別使用。這樣可以避免在創造新的子類別時，必須在另一個類別中也創建子類別的情況發生。

### **Replace Inheritance with Delegation 以委派模式取代繼承**

我們也可以考慮通過將繼承替換為委派模式（**Delegation Design Pattern**）來解決這個氣味。這種設計方法可以幫助減少複雜性，改善程式碼結構，並消除對平行繼承的類別關係。

在這種重構技術中，我們可以使用組合（composition）的方法，取代類別之間的階層關係。類別不再繼承自基礎類別，而是將特定功能委派給另一個專門提供該功能的類別。透過這種方式可以改善程式碼的靈活性與可維護性。

---

> When creating a new subclass, it may be necessary to create a subclass for another class too.

## Sign of Smell

This code smell is a special case of Shotgun Surgery. It occurs when making changes to one part of the code requires making simultaneous changes to another part. However, in this code smell, the focus is solely on creating new subclasses. When we create a new subclass for a class, we also need to create a subclass for another class. 

This smell typically occurs in object-oriented programming when you have two sets of class hierarchies that are closely related to each other and tend to reflect each other's changes. 

All was well as long as the hierarchy stayed small. However, as the organization grew and new classes were added, making changes to the hierarchy became increasingly challenging. 

## Reason of Smell

Let's explore why it's considered problematic:

- **Readability**: Parallel hierarchies can make the code harder to read and understand because developers need to navigate two separate hierarchies that mirror each other's structure. This can hinder collaboration and make it difficult for new team members to understand the code's design.
- **High Coupling:** Parallel hierarchies often indicate high coupling between different parts of your codebase. In fact, parallelism is an indication of coupling. It means that we have to perform the same changes as if it were a couple of classes.
- **Code Duplication**: Maintaining parallel hierarchies often leads to code duplication. Similar code or behavior might exist in both hierarchies, which is not only wasteful but also increases the likelihood of inconsistencies and bugs if the two sides diverge over time.
- **Complexity**: Parallel Inheritance Hierarchies introduce additional complexity into your codebase. You have two sets of hierarchies that must be kept in sync. Any change in one hierarchy often requires a corresponding change in the other. This complexity makes the code harder to understand and maintain.
- **Reduced Flexibility**: The presence of parallel hierarchies can make it more challenging to add new functionality or adapt to changing requirements. Any change may require modifications in both hierarchies, leading to increased development time and effort.
- **Maintenance Challenges**: Keeping two parallel hierarchies synchronized can be error-prone and time-consuming. When you add a new class or make a change in one hierarchy, you must remember to make the corresponding changes in the other hierarchy. This can lead to inconsistencies and errors if you forget to update one side.

## Refactoring Recipes

To address the Parallel Inheritance Hierarchies code smell, you can consider several refactoring techniques:

- Move Method
- Move Field
- Extract SuperClass
- Extract Interface
- Replace Inheritance with Delegation

### Move Method / Move Field

To de-couple parallel class hierarchies, we can follow these steps:

1. Establish a relationship between instances of one hierarchy and instances of another hierarchy by allowing instances of one hierarchy to refer to instances of the other hierarchy.
2. Eliminate the hierarchy in the referred class by using techniques like Move Method or Move Field, which involve relocating methods or fields to more suitable classes.

By implementing these steps, we can effectively decouple parallel inheritance hierarchies, resulting in a codebase that is more flexible and maintainable.

### Extract SuperClass

When we have two classes where creating a new subclass in one part necessitates creating a subclass in the other, it indicates that these two classes may have similar behavior that can be shared.

In this case, we should consider to extract the common superclass for classes in one or both of the parallel hierarchies

### Extract Interface

Similarly, we can also consider defining a common interface that classes in one or both of the parallel hierarchies can work with. To avoid we have to create a subclass in the other when we create a subclass in the base class.

### **Replace Inheritance with Delegation**

We can often solve this smell by replacing inheritance with delegation. This approach can help reduce complexity, improve code organization, and eliminate the need for parallel hierarchies.

In this refactoring technique, we can replace the hierarchical relationship between classes with a composition-based approach. Instead of inheriting from a base class, a class will delegate specific functionality to another class that specializes in providing that functionality.

### Reference

[https://refactoring.guru/smells/parallel-inheritance-hierarchies](https://refactoring.guru/smells/parallel-inheritance-hierarchies)

[https://www.jyt0532.com/2020/04/13/parallel-inheritance-hierarchies/](https://www.jyt0532.com/2020/04/13/parallel-inheritance-hierarchies/)

[https://refactoring.guru/replace-inheritance-with-delegation](https://refactoring.guru/replace-inheritance-with-delegation)