# Day 28. Code Smell > Couplers 耦合怪

Created: July 29, 2023 9:52 PM

「耦合怪（Couplers）」是一種程式碼氣味的類別。這個氣味識別出將物件通通綁在一起，妨礙了在不同情境下的使用靈活性。這種高耦合阻礙了靈活性和模組化，迫使物件被視為一個單一整體，而無法選擇性地隔離和重複使用個別組件。在這種情況下，任何嘗試分離相互依賴的物件都需要對程式碼進行重大修改，難以實現程式碼的可重用性和可維護性。

「耦合怪」和「變動阻礙者（Change Preventers）」之間可能存在一些重疊的區塊。耦合怪的核心問題是高度耦合。正因如此，耦合怪這種氣味當然也會使得修改或擴充程式碼變得更加困難，進而阻止變動發生（Prevent Changes）。例如「散彈槍手術（Shotgun Surgery）」和「平行繼承類別關係（Parallel Inheritance Hierarchies）」都屬於「變動阻礙者」這個氣味分類，但它們的起因通常也是因為高度耦合所造成的。

耦合怪主要關注程式碼模組區塊之間的依賴關係和耦合；而「變動阻礙者」則更關心使程式碼難以修改或擴充的設計和實踐。解決耦合怪的重構方法通常包括「解耦」模組，使用依賴注入等設計模式，以及減少直接依賴等等。另一方面，解決「變動阻礙者」通常需要大幅重構程式碼，以符合單一責任原則（SRP）和開放/封閉原則（OCP）等原則，或將程式抽出後碼模組化，以便後續維護和擴充。

總而言之，耦合怪和變動阻礙者兩種分類都與程式碼的可維護性和修改靈活性有關，但它們關注程式碼的不同面向。耦合怪主要聚焦在依賴關係和耦合，而變動阻礙者則聚焦使程式碼難以修改或擴充的設計和結構問題。

以下是屬於此類別的一些程式碼氣味：

### Feature Envy 依戀情節

當一個方法依賴於另一個類別的多個屬性或方法時。

### Inappropriate Intimacy 不當親密類別

當類別之間相互關聯過多，彼此分享過多資訊。

### Message Chains 訊息鏈

當程式碼需要依賴查找一系列其他物件互動才能夠實現，建立了長而緊密耦合的鏈結。

### Middle Man 中間人

當一個類別僅提供很少的價值，並主要將大部分實作依賴另外的類別時。

---

> The objects are highly coupled together and cannot be used individually.
> 

Couplers are a code smell category that binds the objects together, preventing the ability to extract and utilize them in different contexts. This tight coupling hinders flexibility and modularity, forcing the objects to be treated as a single unit, without the option to selectively isolate and reuse individual components. In such cases, any attempt to separate the interdependent objects would require significant modifications to the codebase, making it difficult to achieve code reusability and maintainability.

There can be some overlap between "Couplers" and "Change Preventers". The main issue with Couplers is high coupling. Therefore, Couplers can also prevent changes by making it difficult to modify or extend code without impacting other parts of the system. For instance, code smells like "Shotgun Surgery" and "Parallel Inheritance Hierarchies" belong to the Change Preventers category, and they are commonly caused by high coupling as well.

Couplers primarily address the issue of dependencies and coupling between components, while Change Preventers are more concerned with code design and practices that make code hard to change or extend. The resolution for Couplers often involves decoupling components, using design patterns like Dependency Injection, and minimizing direct dependencies. On the other hand, addressing Change Preventers often requires refactoring code to adhere to principles like the Single Responsibility Principle (SRP) and Open/Closed Principle (OCP), or modularizing code for easier maintenance and extension.

In summary, Couplers and Change Preventers are both related to code maintainability and flexibility, but they focus on different aspects of code quality. Couplers primarily deal with dependencies and coupling, while Change Preventers address design and code structure issues that make code difficult to modify or extend.

Here are some smells that belong to this category.

### Feature Envy

When a method relies on multiple properties or methods from another class.

### Inappropriate Intimacy

When classes are overly interconnected, they share too much information with each other.

### Message Chains

When code navigates a series of object interactions, it creates long, tightly coupled chains.

### Middle Man

When a class only offers minimal value and mainly delegates most of its calls to another class.

### Reference

[https://refactoring.guru/refactoring/smells/couplers](https://refactoring.guru/refactoring/smells/couplers)