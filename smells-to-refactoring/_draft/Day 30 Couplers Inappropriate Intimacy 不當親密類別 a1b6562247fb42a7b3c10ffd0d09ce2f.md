# Day 30. Couplers > Inappropriate Intimacy 不當親密類別

Created: July 29, 2023 9:53 PM

## 氣味的徵兆

Inappropriate是不當、不妥的意思，Intimacy是親密的意思，兩個字合起來可以直接翻譯為「不當的親密關係」。中文版的《Refactoring》翻譯為「狎暱關係」，用語比較古典，好似武俠小說。我自己則翻譯成「不當親密類別」，更明白揭示了這是一個屬於「類別」的氣味。

這種氣味是當兩個類別過度相互依賴，導致耦合度過高所產生的情形。這可能發生在類別之間變得過於糾纏，並花了太多時間訪問彼此的私有資料、屬性或方法。「繼承」通常是導致不當親密類別的主要原因之一。子類別有時候會對其父類別的有超出合理範圍的依賴與過度理解。

不當親密類別是指一個「類別」對另一個類別過度依賴。如果是一個「方法」對一個類別產生過度依賴，請參考上一篇介紹的氣味「依戀情節」。

## 氣味的原因

- **高耦合度**：不當親密類別通常揭示了類別之間的高度耦合。高耦合意味著一個類別的變更可能會同時影響其他類別，引發一連串的變動反應。這會使得程式碼變得脆弱且難以維護。
- **違反封裝原則**：類別應該盡可能隱藏內部實作細節，並且只對外公開預先定義好最低限度的介面。不當親密類別發生在一個類別直接訪問另一個類別的內部狀態、屬性或方法，這違反了物件導向程式語言中的封裝原則。
- **迪米特法則**：迪米特法則又可稱之為「最少知識原則」，建議我們一個類別對另外一個類別的內部知識應該越少越好。不當親密類別指的是一個類別過度依賴並且對於另一個類別的內部訊息太過瞭解，而不是通過明確定義的介面進行互動。
- **降低可重用性**：當類別之間有高度依賴時，它們變得不太可重用（**Reusability**）。如果在另外一個不同情境下，當我們想要重複使用一個類別時，可能會需要攜帶所有與其緊密耦合的類別，這會造成不必要的外部相依性與成本。
- **複雜性**：帶有不當親密類別的程式碼通常更複雜，且難以理解。開發者需要追蹤類別之間的相互作用和相依性，使得除錯和維護都變得更加具有挑戰性。
- **測試困難**：不當親密類別會使得單元測試變得更加困難，因為當一個類別與其他類別密切相關時，很難隔離單一類別的行為。這可能會阻礙有效的測試實踐的採用。

## 對應的重構技巧

- Change Bidirectional Association to Unidirectional Association
- Extract Class
- Move Method
- Move Field
- Hide Delegate
- Replace Inheritance with Delegation

### Change Bidirectional Association to Unidirectional Association

「將雙向關聯改為單向關聯」建議我們當兩個類別之間存在雙向關聯時，如果其中一個類別不使用另一個類別的功能時，我們可以考慮移除未使用的關聯。這有助於簡化程式碼並減少不必要的類別相依性。通過移除未使用的關聯，我們可以提高程式碼的清晰度和可維護性。

### 抽出類別 Extract Class

抽出類別的重構技巧可以用來解決不當親密類別的氣味，我們可以將相關的職責和資料抽出分離到一個新建立的類別之中。這種方法有助於減少類別之間的過度相互依賴和耦合。

### 移動方法 Move Method

當我們遇到兩個緊密耦合的類別時，可以嘗試將一個方法從原本的類別移動到另外一個在業務邏輯上更加接近的類別內來解決這個過度依賴問題。這種方法有助於減少類別之間的高度耦合。

### 移動欄位 Move Field

類似於「移動方法」技巧，這個技巧涉及將一個欄位從一個類別移動到在業務邏輯上更加接近的另外一個類別內。這種方法當然也有助於減少類別之間的相互依賴關係。

### 隱藏代理 Hide Delegate

「隱藏代理」重構技巧用於解決不當親密類別的程式碼異味，是通過將對另一個類別的訪問封裝在一個代理方法或屬性中。這隱藏了類別之間的直接連接，減少了相互依賴，並改善封裝。

然而，這個技巧會在兩個類別之間引入了一個「中間人（Middle Man）」，可能會引發另外一種程式碼氣味。

### 用代理替代繼承 Replace Inheritance with Delegation

這種重構技巧可用於解決「不當親密類別」氣味，特別是涉及類別之間的繼承關係時，例如當子類別與其父類別存在不當親密關係時。這種情況下，我們可以考慮將繼承關係替換為代理。

---

## Sign of Smell

Inappropriate Intimacy is a code smell that arises when two classes are excessively dependent on each other, resulting in a tight coupling. This can happen when classes become overly intertwined and spend an excessive amount of time accessing each other's private data or methods. 

Inheritance can often lead to over-intimacy and cause this smell. Subclasses sometimes know more about their parents than their parents would like them to know.

Inappropriate Intimacy refers to a class that is excessively dependent on another class. If a method is excessively dependent on a class, consider the previous smell called "Feature Envy.”

## Reason of Smell

- **High Coupling**: Inappropriate intimacy often leads to high coupling between classes. High coupling means that changes in one class can impact other classes, causing a chain reaction of changes. This makes the codebase fragile and difficult to maintain.
- **Violation of Encapsulation**: Classes should hide internal details and expose a defined interface. Inappropriate intimacy occurs when one class accesses another class's internal state or methods directly, bypassing encapsulation.
- **Law of Demeter**: The Law of Demeter, also called the "principle of least knowledge," states that a class should have limited knowledge of another class's internal knowledge. Inappropriate Intimacy refers to a class excessively relying on and knowing about another class's internals, instead of interacting through well-defined interfaces.
- **Reduced Reusability**: When classes are intimately connected, they become less reusable. Reusing one class in another context may require bringing along all the classes it's intimately connected to, creating unnecessary dependencies.
- **Complexity**: Code with inappropriate intimacy tends to be more complex and harder to understand. Developers need to keep track of the interactions and dependencies between classes, making it challenging to debug and maintain.
- **Testing Challenges**: Unit testing becomes more challenging because it's difficult to isolate the behavior of a single class when it's closely tied to other classes. This can hinder the adoption of effective testing practices.

## Refactoring Recipes

- Change Bidirectional Association to Unidirectional Association
- Extract Class
- Move Method
- Move Field
- Hide Delegate
- Replace Inheritance with Delegation

### Change Bidirectional Association to Unidirectional Association

When you have a bidirectional association between classes, but one of the classes does not use the features of the other, it is worth considering removing the unused association. This can help simplify the codebase and reduce unnecessary dependencies. By removing the unused association, you can improve the overall clarity and maintainability of the code.

### Extract Class

The Extract Class refactoring technique can solve the issue of Inappropriate Intimacy by separating closely related responsibilities and data into a new class. This approach helps to reduce excessive interdependence and coupling between classes.

### Move Method

When we encounter two classes that are tightly coupled, we can attempt to address this issue by moving a method from one class to another where it logically belongs. This approach helps to reduce the interdependence between the classes.

### Move Field

Similar to the "Move Method" skill, this skill involves moving a field from one class to another where it logically belongs. This approach can also help reduce the interdependence between the classes.

### Hide Delegate

The "Hide Delegate" refactoring skill is used to address the Inappropriate Intimacy code smell by encapsulating access to another class within a delegating method or property. This hides the direct connection between classes, reducing interdependence and promoting better encapsulation.

However, it introduces a "Middle Man" between the two classes, which could potentially cause another code smell.

### Replace Inheritance with Delegation

This refactoring skill can be used to address the "Inappropriate Intimacy" code smell, specifically when it involves inheritance relationships between classes. This is especially relevant when a subclass exhibits inappropriate intimacy with its parent class. Instead of inheriting behavior from another class, you can replace it with delegation.

### Reference

[http://teddy-chen-tw.blogspot.com/2014/05/10inappropriate-intimacy.html](http://teddy-chen-tw.blogspot.com/2014/05/10inappropriate-intimacy.html)

[https://www.informit.com/articles/article.aspx?p=1400866&seqNum=17](https://www.informit.com/articles/article.aspx?p=1400866&seqNum=17)

[https://code-smells.com/couplers/inappropriate-intimacy](https://code-smells.com/couplers/inappropriate-intimacy)

[https://refactoring.guru/smells/inappropriate-intimacy](https://refactoring.guru/smells/inappropriate-intimacy)

[https://refactoring.guru/change-bidirectional-association-to-unidirectional](https://refactoring.guru/change-bidirectional-association-to-unidirectional)