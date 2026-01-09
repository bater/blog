# Day 34. Couplers > Indecent Exposure 過度揭露

Created: October 3, 2023 10:01 AM

## 氣味的徵兆

當我們發現類別或方法毫無節操的對外洩漏內部實作細節時，我們可能發現了「過度揭露」氣味（Indecent Exposure or Excessive Exposure）。作為開發者，我們應該盡可能將程式碼中的所有實體預設為較有隱私的內部方法。畢竟如果一個方法僅僅被內部互叫，實在沒有需要昭告天下對全世界保持開放。

你可能會發現這個氣味與「依戀情節（Feature Envy）」和「不當親密類別（Inappropriate Intimacy）」有些相似，他們確實屬於相同一個氣味分類「耦合怪（Couplers）」。依戀情節是指一個方法過度依賴外部類別；而不當親密類別則是兩個類別依賴程度過高。另一方面，「過度揭露」事實上可以被視為是上述兩種氣味的根本原因。如果我們能夠將「過度揭露」的氣味消除，另外兩種氣味也可能同時迎刃而解。

## 氣味的原因

- **違反狄米特法則（Law of Demeter）**：又可稱為「最少知識原則」，是指一個類別或方法應該對另外一個類別的內部細節所知越少越好。當一個方法或類別過度對外公開內部細節，而不是通過預先明確定義的介面來進行互動時，就會發生資訊過度曝露。
- **缺乏封裝**：公開內部細節同時也違反封裝原則，封裝對於維護乾淨且易理解的程式碼非常重要。封裝可以隱藏複雜的內部實現細節，僅公開必要的乾淨介面。當開發者不小心公開太多不相關的細節時，理解程式碼會變得更加困難，因為不必要的細節通通都被揭示出來。
- 高**複雜性**：公開這些內部的程式碼細節意味著呼叫端知道太多不太重要或是間接相關的程式碼片段，這增加了程式設計的複雜性。
- **高度耦合**：當內部實作細節沒有經過適當封裝時，往往會導致專案中的不同部分之間的高度耦合。高耦合會使得修改程式碼的其中一部分而不影響其他部分變得非常困難，也增加了產生意料之外副作用的風險，同時也降低了程式碼的可維護性。
- **修改困難**：過度公開的細節可能會成為程式碼的其他部分的依賴增加。當開發者稍後需要修改內部實現或重構程式碼時，可能必須在多個不同地方進行同步更改，這會增加導致錯誤的可能性，使程式碼維護變得更加困難。
- **安全風險**：公開太多細節也可能帶來安全風險。如果敏感數據或實現細節可供未經授權的程式碼部分或外部實體訪問，可能會導致漏洞和潛在的違規事件。

## 對應的重構技巧

- Encapsulate Classes with Factory
- Encapsulate Field
- Encapsulate Collection

### 使用工廠設計模式封裝類別

使用工廠方法或工廠類別來封裝類別。透過這樣的技巧，我們可以抽象化具體的類別實作，並建立出一個更靈活和抽象的介面。

### 封裝欄位

使用取值器（getter）和設值器（setter）方法來封裝對欄位的訪問，讓開發者能夠控制和驗證訪問和修改。

### 封裝集合

使用方法來封裝對集合的訪問和修改，使開發者能夠控制和驗證操作。

---

## Sign of Smell

When a class or method unnecessarily exposes its internal details, this is referred to as indecent exposure, also known as excessive exposure. We should strive to keep everything private as much as possible. If a function is only used internally within its own class, there is no need for it to be public.

You may notice that this smell is very similar to Feature Envy and Inappropriate Intimacy. That's true because they are all related. "Feature Envy" refers to a method that excessively depends on another class, while "Inappropriate Intimacy" refers to a class that excessively depends on another class. Indecent Exposure is, in a way, the root cause of Feature Envy and Inappropriate Intimacy. If we solve the Indecent Exposure in one way, we might also solve the other two smells at the same time.

## Reason of Smell

- **Law of Demeter**: The Law of Demeter, also called the "principle of least knowledge," states that a class or a method should have limited knowledge of another class's internal structure. Indecent exposure occurs when a method or class excessively reveals its internal details to the public, rather than interacting through well-defined interfaces.
- **Lack of Encapsulation**: Exposing internal details violates the principle of Encapsulation, which is essential for maintaining a clean and understandable codebase. Encapsulation hides complex internal implementation details and exposes only the necessary high-level interfaces. When you expose too much, it becomes harder to reason about the code because unnecessary implementation details are revealed.
- **Complexity**: Exposing such code means that clients are aware of code that is either unimportant or only indirectly important. This adds to the complexity of a design.
- **High Coupling**: When you expose internal details, it often leads to high coupling between different parts of the codebase. High coupling makes it difficult to change one part of the code without affecting other parts, increasing the risk of unintended side effects and making the code less maintainable.
- **Reduced Modifiability**: Exposed details can become dependencies for other parts of the code. When you later need to modify the internal implementation or refactor the code, you may have to make changes in multiple places, increasing the likelihood of introducing bugs and making code maintenance more challenging.
- **Security Risks**: Exposing too much can also pose security risks. If sensitive data or implementation details are accessible to unauthorized parts of the code or external entities, it can lead to vulnerabilities and potential breaches.

## Refactoring Recipes

- Encapsulate Classes with Factory
- Encapsulate Field
- Encapsulate Collection

### Encapsulate Classes with Factory

Use a factory method or factory class to encapsulate the instantiation of objects. By this way, you can abstract away the concrete class and expose a more flexible and abstract interface.

### Encapsulate Field

Use getter and setter methods to encapsulate access to fields, allowing you to control and validate access and modifications.

### Encapsulate Collection

Use methods to encapsulate access and modification of the collection, allowing you to control and validate operations.

### Reference

[https://luzkan.github.io/smells/indecent-exposure](https://luzkan.github.io/smells/indecent-exposure)

[https://ducmanhphan.github.io/2020-01-10-Refactoring-couplers/#excessive-exposure](https://ducmanhphan.github.io/2020-01-10-Refactoring-couplers/#excessive-exposure)