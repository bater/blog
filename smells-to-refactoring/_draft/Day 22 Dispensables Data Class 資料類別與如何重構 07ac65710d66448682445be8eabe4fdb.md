# Day 22. Dispensables > Data Class 資料類別與如何重構

Created: July 29, 2023 9:52 PM

## 氣味的徵兆

Data Class（資料類別）氣味是指當一個類別內缺乏足夠的實作功能來證明其存在意義時所出現的一種情況。它指的是一個僅包含屬性欄位和用於訪問這些資料的基本內建方法（如getter 和 setter）的類別。這些類別本質上是用於儲存資料提供其他類別使用，並且沒有額外的獨立功能。

一個新建的類別最初僅具有少量公開屬性是很常見的。然而，**物件導向程式語言的真正威力**在於它們能夠「封裝」這些資料和行為…。

假如我文章在這裡停下來而轉向下一個氣味，這就只會成為茫茫網海上的又一篇極其普通泛用的介紹程式碼氣味文章。然而，有關於何謂物件導向程式語言（OOP）的真正最佳實踐，是一個高度有爭議性的話題。

如果你在 Stack Overflow 上向開發人員的老朋友們詢問有關充血領域模型（Rich Domain Model）和貧血領域模型（Anemic Domain Model）哪一個更好時，網站上會說現在還沒有可接受的「正確答案」，這個問題的答案暫且是因個人觀點不同而有所差異的。

支持充血領域模型的人們深信將資料與行為結合起來的類別更好，他們認為 Martin Fowler 也可能同意這一點，這可以通過他著名的「直說，別問！」原則得到證明。

> 「直說，別問！」是一個幫助開發者記住物件導向程式語言是將「資料與操作該資料的方法綁定在一起」的原則。它提醒了我們，與其向物件請求資料並根據該資料來執行操作，我們應該告訴物件要做什麼。這鼓勵將「行為」移入物件本身來跟「資料」一同使用。 — Martin Fowler
> 

另一方面，在最開發者中最著名的書籍之一《Clean Code》中，Robert Martin（ Bob 叔叔）則是主張使用資料類別。他認為「資料結構物件」和「資料傳遞物件」是相當有益的，因為它們僅只包含資料而不包含任何方法。根據Bob叔叔的說法，建議將資料類別與物件導向（OO）類別分開。如果一個類別具有邏輯，它應該是一個 OO 類別。但是，如果會通過 getter 和 setter 暴露內部資源則會被認為是不佳實踐。

總結一下，讓我們再度參考《重構》一書的作者 Martin Fowler 對「資料類別」的看法。他認為「資料類別通常是錯誤地放置行為的跡象，...」這邊要特別注意到語句上提到「通常…跡象」這一詞語的使用，這意味著「資料類別」作為一種氣味徵兆，並不總是有問題的。

在本系列的第一篇文章中，Metz 強調了一個非常重要的概念，它很大程度上改變了我原本對於「壞氣味（Bad Smell）」的想法。

> 程式碼氣味是中性的，它們不一定是壞的。 — Sandi Metz
> 

如果我們在缺乏具體案例的情況下展開討論，它可能很快會變成一場無意義的辯論。僅因為某些東西有程式碼氣味，並不一定意味著它是壞的。程式碼氣味不過就是一些有用的資訊，來幫助我們寫出更好的程式碼。這種狀況在「資料類別」這個氣味情況下格外明顯。

## 氣味的原因

**貧血領域模型（Anemic Domain Model）**：如果您的整個專案中僅包含資料類別，並缺乏有意義的行為或行為封裝，這可能是貧血領域模型的跡象。在領域驅動設計（DDD）中，鼓勵使用豐富的領域模型，其中物件包含了資料和與該資料相關的行為。資料類別應該「補充」具有豐富行為的類別，而不是取代它們。

**過度使用 Getter 和 Setter**：資料類別通常具有相應的屬性欄位和 getter 和 setter 方法。如果你的資料類別具有大量屬性，並且發現自己寫了許多 getter 和 setter，這可能造成一個相當臃腫的類別，並違反封裝原則。這是一種程式碼氣味，因為它暴露了太多類別的內部結構。

**封裝（Encapsulation）**：資料類別通常通過 getter 和 setter 方法直接公開其內部屬性。這可能會打破封裝原則，因為它允許外部直接訪問類別的內部欄位，這可能導致意外的資料操作或非預期副作用，並使後續維護和更改類別變得更加困難。

**缺乏驗證**：如果您的資料類別不對其資料執行足夠的驗證，可能會導致應用程式中的無效或不一致狀態。如果資料類別包括商業邏輯中的關鍵資訊，則這尤其重要。

**違反直說別問（Tell-Don't-Ask，TDA）原則**：TDA 提醒我們，與其向物件請求資料並根據該資料執行操作，我們應該告訴物件要做什麼。資料類別不包含任何行為或方法，因此可能依賴其他類別來實現與資料相關的功能。

**低內聚性**：資料類別的主要目的是存儲資料，通常不具有任何顯著的行為或操作。這種缺乏行為或責任導致內聚性低，因為該類別沒有特定的目的或一組明確定義的資料相關任務，需要依賴其他類別實作。

## 對應氣味的重構手段

- Move Method
- Encapsulate Field
- Encapsulate Collection

### Move Method 移動方法

資料類別時常充當其他類別使用的資料容器。在這種情況下，我們可以考慮將方法移到資料類別中，這樣能讓程式碼更好維護。當資料和行為都可以保持在同一個類別中，也有助於保持高內聚性。

### Encapsulate Field 封裝屬性

封裝屬性的重構技巧涉及將公開屬性轉換為私有屬性，並提供getter和setter方法（或欄位，根據編程語言而有不同）來訪問和修改屬性的值。

Getter和setter方法提供了一種精確的方式來訪問和修改資料，允許在一系列的資料操作中包含驗證、業務邏輯或額外效果（例如Logging）。這可以有效地消除「資料類別」的氣味。

### Encapsulate Collection 封裝集合

「封裝集合」的重構技巧也可以幫助解決資料類別味道的問題，通過將集合（或陣列）封裝在一個類別中並提供對其元素的訪問的控制單元。當一個類別主要用於保存資料集合而缺乏更多行為或驗證時，可能會導致維護性問題、資料完整性問題和程式碼不好維護理解的問題。

---

## Sign of Smell

A Data Class smell occurs when a class lacks enough functionality to justify its existence. It refers to a class that only contains fields and basic methods (getters and setters) for accessing them. These classes are essentially containers for data used by other classes and do not have any additional independent functionality.

It is common for a newly created class to initially have only a few public fields. However, the **true power of objects** lies in their ability to encapsulate both data and behavior.

If I stop discussing this topic here and move on to the next section, it will become just another generic introduction blog post on the internet. However, the true power of object-oriented programming (OOP) is a highly controversial topic.

When you ask this question on Stack Overflow, the developer's best friend, about whether a Rich Domain Model or an Anemic domain model is better, it will say that there are no accepting answers for now and this question is opinion-based.

The proponents of the Rich Domain Model side, who believe that it is better to combine data with behavior, argue that Martin Fowler might also agree with this point, as evidenced by his famous "Tell-Don't-Ask principle".

> Tell-Don't-Ask is a principle that helps people remember that **object-orientation is about bundling data with the functions** that operate on that data. It reminds us that rather than asking an object for data and acting on that data, we should instead tell an object what to do. This encourages to move behavior into an object to go with the data. — Martin Fowler
> 

On the other hand, in the most well-known book "Clean Code," Robert Martin (Uncle Bob) argues in favor of data classes. He states that "Data Structure" objects and "Data Transfer Objects" can be beneficial as they only contain data without any functions. According to Uncle Bob, it is recommended to separate data classes from object-oriented (OO) classes. If a class has logic, it should be an OO class. However, exposing internals through getters and setters is considered bad practice.

To draw a conclusion, let's refer back to the author of "Refactoring" and see what Martin Fowler says about "Data Class". He states, "Data classes are **often a sign** of behavior in the wrong place, ..." It is important to note the use of the phrase "often a sign". This implies that data classes are not always problematic.

In my first blog of this series, Metz emphasizes a very important concept that changed my view significantly.

> Code smells are **neutral,** they are not always **bad.** — Sandi Metz
> 

If we jump into an argument without a concrete case, it may soon become a pointless debate. Just because something has a code smell doesn't necessarily mean it's bad. Code smells are nothing but useful information, helping us to write better code. This is especially true in the case of a Data Class smell.

## Reason of Smell

**Anemic Domain Model**: If your entire codebase consists of only data classes and lacks meaningful behavior or encapsulation of behavior, it might be a sign of an anemic domain model. In domain-driven design (DDD), a rich domain model is encouraged, where objects contain both data and the behavior related to that data. Data classes should complement behavior-rich classes rather than replace them.

**Overuse of Getters and Setters**: Data classes often have fields with corresponding getter and setter methods. If your data class has numerous fields, and you find yourself writing many getters and setters, it can lead to bloated classes and violate the principle of encapsulation. This can be a code smell because it exposes too much of the internal structure of the class.

**Encapsulation:** Data Classes often expose their internal fields directly through getter and setter methods. This can break the principle of encapsulation by allowing direct access to the class's internal state, which can lead to unintended data manipulation and make it harder to maintain and change the class later.

**Lack of Validation**: If your data class doesn't perform adequate validation of its data, it can lead to invalid or inconsistent states in your application. This is especially important if the data class represents critical information.

**Violate the Tell-Don't-Ask (TDA) principle**: The TDA reminds us that instead of asking an object for data and acting on that data, we should tell an object what to do. The Data Class doesn't include any behavior, so it might depend on other classes to implement the data-related functions.

**Low Cohesion**: The main purpose of a Data Class is to store data, and it usually does not have any significant behavior or operations. This lack of behavior or responsibility leads to low cohesion, as the class does not have a specific purpose or a defined set of data-related tasks.

## Refactoring Recipes

- Move Method
- Encapsulate Field
- Encapsulate Collection

### Move Method

The Data Class serves as a container for data used by other classes. In this case, it would be beneficial to consider moving the method into the Data Class. In this way, both the data and behavior can be kept within the same class, which maintains high cohesion.

### Encapsulate Field

The Encapsulate Field technique involves converting public fields into private fields and providing getter and setter methods (or properties, depending on the programming language) to access and modify the value of the field.

Getter and setter methods offer a precise means of accessing and modifying data, allowing for the inclusion of validation, business logic, or side effects (like logging) in data operations. This can effectively remove the "Data Class" smell.

### Encapsulate Collection

The "Encapsulate Collection" refactoring skill can help address the Data Class smell by encapsulating the collection (or array) within a class and providing controlled access to its elements. When a class primarily exists to hold a collection of data without any behavior or validation, it can lead to issues with maintainability, data integrity, and understanding of the codebase.

### Reference

[https://code-smells.com/dispensables/data-class](https://code-smells.com/dispensables/data-class)

[https://refactoring.guru/smells/data-class](https://refactoring.guru/smells/data-class)

[https://stackoverflow.com/questions/23314330/rich-vs-anemic-domain-model](https://stackoverflow.com/questions/23314330/rich-vs-anemic-domain-model)

[https://martinfowler.com/bliki/TellDontAsk.html](https://martinfowler.com/bliki/TellDontAsk.html)

[https://www.linkedin.com/pulse/clean-code-chapter6-objects-data-structures-mahmoud-ibrahim/](https://www.linkedin.com/pulse/clean-code-chapter6-objects-data-structures-mahmoud-ibrahim/)

[https://refactoring.guru/encapsulate-field](https://refactoring.guru/encapsulate-field)