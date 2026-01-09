# Day 14. Tool Abusers > Alternative Classes with Different Interfaces 異曲同工的類別

Created: July 29, 2023 9:47 PM
Tags: Tool Abusers, smell

## 氣味的徵兆

這個氣味的名稱很長，根據「重構」一書的中文版翻譯為「異曲同工的類別」。當存在兩個彼此具有相同功能可以彼此取代的類別，但是這些類別的「介面（Interface）」卻不同。介面在這裡的意思是泛指類別與外界互動接觸的窗口，所以包括屬性名稱、方法名稱、參數等都包括在其中。

扣除掉介面不同的部分，這個氣味其實與「重複的程式碼（Duplicated Code）」很接近，都具備有功能重複的要素。但Alternative Classes with Different Interfaces並不是著重於「重複」本身，相反的，這個氣味希望讓重複能更加「明顯」，改善相同目的卻不同實作的問題。比起「相同」與「重複」，更在意不同的部分。

> Duplication is far cheaper than the wrong abstraction. — Sandi Metz
> 

Sandi在RailsConf 2014的演講「[All the liittle things](https://youtu.be/8bZh5LMaSmE)」中提過「重複比錯誤的抽象成本更低」。當我們在進行重構時，為了避免過早抽象化而導致欠下更多技術債，有時我們會透過將程式碼「反抽象化」，利用大量的程式碼重複排列比較，來觀察出程式碼中隱含的意圖與商業邏輯關係。這樣重構的過程中雖然可能會反而讓程式碼變得更長，但是到達終點以後的果實是豐碩美好的。Alternative Classes with Different Interfaces這個氣味就屬於這樣的技巧，讓相似之物更相似，更容易觀察出脈絡。

## 氣味的理由

- **不一致性**：當多個類別應該執行類似的功能但具有不同的界面時，可能會讓開發人員感到困惑，而困惑製造風險。不一致的命名、方法或參數結構會使專案程式碼變得更難理解和維護。
- **減少可重用性**：物件導向程式語言的主要優勢之一是通過繼承或界面重用程式碼。當具有相似目的的類別具有不同的界面時，很難將它們互換使用，降低了程式碼的可重用性。
- **減少可讀性**：不一致的界面使程式碼更難閱讀和理解。開發人員需要學習和記住完成相同任務的多種不同方式。
- **重複的程式碼**：具有不同界面的類別可能會重複相似的程式碼，即使它們具有相同的目的。這種冗余增加了錯誤和不一致性的風險。
- **維護複雜性**：對分散在不同類別中的相似功能進行更改成為維護的挑戰。每個更改都需要應用於多個類別，導致出錯的可能性增加。
- **違反DRY原則**：不要重複自己（DRY）原則鼓勵程式碼重用。當您有具有不同界面的替代類別時，實際上是在多個地方實現類似的邏輯，從而違反了這一原則。
- **學習曲線增加**：新加入專案的開發人員必須學習和了解不同的類別及其界面，這給他們的入職過程增加了不必要的複雜性。
- **溝通低效**：團隊成員在討論程式碼時，可能會引用不同的類別名稱或方法名稱來表示相同的概念，導致混淆和誤解。

## 對應氣味的重構技巧

- Rename Method
- Move Method
- Unify Interfaces with Adapter

### Rename Method 方法重新命名

當兩個類別有相同方法卻具有不同名稱時，我們可以首先把方法名稱修改為一樣。同常這個手法可以作為一系列重構的第一步。畢竟如果方法名稱與方法內容都完全相同之後，將會是另外一個氣味「重複的程式碼」

### Move Method 移動方法

當兩個類別相似，而某Ａ方法存在Ｂ類別會比Ａ類別來得更加合理，使用上也更直覺時，我們可以考慮透過將Ａ方法移動到Ｂ類別來讓方法與類別的關係更緊密。

### Unify Interfaces with Adapter 將介面統一為轉接器模式

文章的上半部已經充分說明了不一致的介面會對類似的類別造成各種問題，因此我們可以考慮使用「轉接器設計模式（Adapter Design Pattern）」來整合介面。

就像我們在真實世界中如果旅行到世界各地，我們很可能也需要為電源插座準備一個轉接頭一樣。當類別現有的介面無法相容支援時，我們可保留行為，但是創造一個中繼的轉接問件來做對接，擴充使用彈性。

優點是符合單一職責原則，原有的類別介面不需要繼續處理轉換問題，而把這些介面轉化的邏輯由轉接器全權處理，做到職責分離；第二個優點是是符合開放封閉原則，原有的類別對修改保持封閉，維持原有介面，但是透過轉接器來擴充更多使用情境，對擴充保持開放。缺點是「轉接器設計模式」會讓程式碼的複雜度增加。

## 後記

在Refactoring Guru的網站中，還有提到另外三個技巧也可能可以對應這個氣味，分別是「[Add **Parameter**](https://refactoring.guru/add-parameter)」、「[**Parameterize Method**](https://refactoring.guru/parameterize-method)」、「[**Extract Superclass**](https://refactoring.guru/extract-superclass)」。在某些情境下我同意確實是可以改善介面不一致的問題，但總覺得這些也列進去，未免過於瑣碎（其實Move Method就已經太瑣碎了）。

考慮了一下，放進去有違本人美學，所以只在後記提及。

---

## Sign of Smell

"Alternative Classes with Different Interfaces" is a code smell that occurs when you have multiple classes in your codebase that serve similar purposes but have different method names, parameter lists, or interfaces. In other words, these classes should ideally share a common interface due to their conceptual similarities, but they don't.

## Reason of Smell

- **Inconsistency**: When multiple classes are supposed to perform similar functions but have different interfaces, it can create confusion for developers. Inconsistent naming, method signatures, or data structures make the codebase harder to understand and maintain.
- **Reduced Reusability**: One of the primary advantages of object-oriented programming is the ability to reuse code through inheritance or interfaces. When classes with similar purposes have different interfaces, it becomes challenging to use them interchangeably, reducing code reusability.
- **Reduced Readability**: Inconsistent interfaces make the code harder to read and understand. Developers need to learn and remember multiple ways of accomplishing the same task.
- **Code Duplication**: Classes with different interfaces might end up duplicating similar code, even if they serve the same purpose. This redundancy increases the risk of bugs and inconsistencies.
- **Maintenance Complexity**: Making changes to similar functionality spread across different classes becomes a maintenance challenge. Each change needs to be applied to multiple classes, leading to higher chances of errors.
- **Violation of DRY Principle**: The Don't Repeat Yourself (DRY) principle encourages code reuse. When you have alternative classes with different interfaces, you're essentially repeating yourself by implementing similar logic in multiple places.
- **Increased Learning Curve**: New developers joining the project have to learn and understand the different classes and their interfaces, which adds unnecessary complexity to their onboarding process.
- **Inefficient Communication**: When team members communicate about the code, they might refer to different class names or method names for the same concept, leading to confusion and misunderstandings.

## Refactoring Recipe

- Unify Interfaces with Adapter
- Rename Method
- Move Method

### Reference

[https://refactoring.guru/smells/alternative-classes-with-different-interfaces](https://refactoring.guru/smells/alternative-classes-with-different-interfaces)

[http://teddy-chen-tw.blogspot.com/2014/05/11alternative-classes-with-different.html](http://teddy-chen-tw.blogspot.com/2014/05/11alternative-classes-with-different.html)

[https://refactoring.guru/design-patterns/adapter](https://refactoring.guru/design-patterns/adapter)