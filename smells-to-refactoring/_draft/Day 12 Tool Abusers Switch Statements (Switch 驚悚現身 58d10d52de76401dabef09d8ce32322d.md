# Day 12. Tool Abusers > Switch Statements (Switch 驚悚現身)

Created: July 29, 2023 9:08 PM
Tags: Tool Abusers

## 氣味的徵兆

相較於之前介紹過的氣味，我認為這個程式碼氣味存在一些爭議。

Switch Statements（Switch 條件語句）在多數語言中都存在，雖然不如IF Statements一樣隨處可見，但也可以說是邏輯的基本。『重構（Refactoring - Improving the Design of Existing Code）』一書的作者Martin曾主張：

> Most times you see a switch statement you should consider polymorphism. — Martin
> 

多數時候當我們看到Switch Statements時，我們應該考慮使用多型（Polymorphism）來取代他。這句話是如此的武斷，彷彿我們使用了Switch Statements像是一種罪惡一樣（所以命名為氣味）。這樣的看法在網路上興起了熱烈的討論，也有許多不同觀點。多年後作者針對這些討論，發表了新的回應看法：

> 因為在二十世紀九零年代末（初版之前），當時的開發者大多忽視了物件導向中多型的價值，所以我們才希望能矯正這樣的風氣。現代的開發者已經更習慣使用多型，而Switch Statements 條件語句也不像多年前那樣有害無益。很多語言現在也支持複雜的Switch Statements條件句，而不是只根據基本型別或類別碼來作為條件判斷。因此，我們現在更關注「重複」的Switch Statements。
> 

有鑑於此，作者 Martin 在第二版的『重構』書中，將這個氣味更名為「Repeated Switches」。比起「Switch Statements」，我們更應該聚焦在「重複（Repeated）」所造成的混亂與邪惡之上。

值得留意的是，不論是「Switch Statements」或是「Repeated Switches」，這個氣味關注的焦點始終都不僅僅限縮於「Switch Statements 條件語句」，同時也包括了「If/else Statements 條件語句」。正因為如此，原本的氣味命名更顯得有誤導之嫌，可能會讓人對複雜的「If/else Statements 條件語句」喪失戒心。

考慮到上述原因，我認為更能切合這個氣味精神的名稱應該是「Repeated Conditional Statements（重複的條件語句）」，如此來表示同時包括「重複」的「Switch Statements 條件語句」與「If/else Statements 條件語句」。但為了便利於網路搜尋查找，我依然在標題處保留原名。畢竟我本人就是那個時常苦惱於名稱不同而無法對應的受害者。

## 成為氣味的理由

- **可讀性降低**：Switch Statements 條件句可能會變得冗長和複雜，使程式碼難以閱讀和理解。每個 case 具有不同的邏輯，這讓追蹤程式碼內的資料流變得相當具有挑戰性。
- **重複的程式碼**：相似的程式碼可能在不同的 case 中重複出現，導致程式碼重複的問題。這種重複可能會導致不一致性，讓維護變得困難。
- 難以**擴展**：如果將來需要增加新的行為或修改條件，要把這些新的邏輯加入到現有的 Switch Statements 條件句中可能會導致更為錯綜複雜的條件結構。
- 可**維護性差**：隨著 Switch Statements 條件句中 case 條件的數量增加，維護也會變得更加困難。對 case 的任何新增或改動都可能導致散彈槍手術（**Shotgun Surgery**），增加變動帶來的風險。
- **違反開放封閉原則（Open/Closed Principle）**：開放封閉原則建議物件成員（類別、模組、方法等）應該對「擴充」保持開放，但對「修改」則維持封閉。簡言之，是容易擴充的程式碼。Switch Statements 條件句通常在添加新 case 時需要修改，違反了這一原則。
- **缺乏封裝性**：Switch Statements 條件句傾向於集中決策邏輯，導致程式碼不同部分之間緊密耦合。這種缺乏封裝特性可能使專案變得脆弱且難以重構。
- 難以**測試**：在 Switch Statements 條件句內測試不同 case 可能更困難。因為每個 case 可能具有需要逐個測試不同情境的獨特邏輯。

## 對應的重構技巧

參考對照表，共有下列幾種重構技巧，大部分在系列文章都已經介紹過：

- Replace Conditional with Polymorphism
- Replace Type Code with Subclasses
- Replace Type Code with State/Strategy
- Replace Parameter with Explicit Methods
- Move Accumulation to Visitor
- Replace Conditional Dispatcher with Command
- Introduce Null Object

我發現透過重複的重構技巧比例，其實可以用來觀察氣味之間的關係。Switch Statements對應的重構技巧多數與「Long Method」氣味相同，正代表著複雜混亂的條件時常是造成方法過長的原因之一。

## Replace Conditional with Polymorphism

如果這個氣味只能選擇一種技巧，那毫無疑問就會是「Replace Conditional with Polymorphism」。畢竟重構的作者已經說過，每當我們看到Switch Statements都應該好好考慮使用多型（Polymorphism）來取代他。

這個重構技巧在系列文中首次出現在「[Long Method > Refactoring 重構長方法](https://ithelp.ithome.com.tw/articles/10314510)」中。

## Replace Type Code with Subclasses

Type Code 很常被拿來當作Switch Statements 條件判斷句中的條件使用，依照 Type Code不同進行不同行為。這些依照 Type Code 而有不同行為的程式碼，可以考慮抽出為子類別來進行有效隔離。

這個重構技巧在系列文中首次出現在「[**Primitive Obsession > Refactoring 如何重構基本型別偏執**](https://ithelp.ithome.com.tw/articles/10315937)」中。

## Replace Type Code with State/Strategy

狀態物件（State Object）與策略物件（Strategy Object）是包含狀態的實體物件，藉由每個物件具體實作的行為差異，可以省略複雜的條件判斷子句。

這個重構技巧在系列文中首次出現在「[**Primitive Obsession > Refactoring 如何重構基本型別偏執**](https://ithelp.ithome.com.tw/articles/10315937)」中。

## Replace Parameter with Explicit Methods

當方法內會因為參數而進行不同的業務邏輯，最好拆分為不同的方法。首次出現在「[**Long Parameter List**](https://ithelp.ithome.com.tw/articles/10316245)」中。

## Move Accumulation to Visitor

透過「訪問者設計模式（Visitor Design Pattern）」來分離物件上的資料結構與操作或命令。首次出現在「[Long Method > Refactoring 重構長方法](https://ithelp.ithome.com.tw/articles/10314510)」中。

## Replace Conditional Dispatcher with Command

將條件判斷以命令物件（Command objects）來取代的一種重構技巧。首次出現在「[Long Method > Refactoring 重構長方法](https://ithelp.ithome.com.tw/articles/10314510)」中。

## Introduce Null Object

在部分的物件導向程式語言中（例如[Ruby](https://thoughtbot.com/blog/rails-refactoring-example-introduce-null-object)），「Null」也是一種物件，屬於「NullClassl」的實體。既然是物件，就可以編寫定義出新的方法與行為。

透過自訂義「Null」物件的行為，可以省略例外處理。在許多條件判斷邏輯中，都會需要額外考慮到驗證過濾資料為「Null」的情況。這種時候可以透過定義「Null」物件來取代原本的「Null」條件，來達到簡化的效果。

---

When you encounter repeated complex "switch" operators or sequences of "if" statements.

## Sign of Smell

Repeated Conditional Complexity has many different names. One of the reasons for this is that I combined two code smells: "Switch Statements" and "Conditional Complexity". Switch Statements, also known as "Repeated Switches" in later versions, focuses on repeated conditional logic. On the other hand, "Conditional Complexity" is more focused on complexity itself. I understand that "repeated" and "complex" are not the same, but I believe it is unnecessary for them to coexist as two separate code smells. 

It occurs when conditional statements such as a switch statements (or "if-else" statements) are used to control the flow of a program based on different values or conditions. Although these statements are a fundamental part of many programming languages, relying too heavily on them can result in less maintainable, extensible, and error-prone code.

## Reason of Smell

- **Reduced Readability**: Switch statements can become long and complex, making the code harder to read and understand. Each case can have different logic, and it becomes challenging to follow the code flow.
- **Duplication**: Similar code might be repeated across different cases, leading to code duplication. This duplication can introduce inconsistencies and make it harder to maintain.
- **Limited Extensibility**: If you need to add new behavior or conditions in the future, adding them to an existing switch statement can lead to a more convoluted and complex code structure.
- **Low Maintainability**: As the number of cases in a switch statement grows, it becomes harder to maintain. Any changes or additions to the cases can lead to cascading changes throughout the codebase, increasing the risk of introducing bugs.
- **Violation of Open/Closed Principle**: The Open/Closed Principle suggests that software entities (classes, modules, functions) should be open for extension but closed for modification. Switch statements often require modification whenever a new case is added, violating this principle.
- **Lack of Encapsulation**: Switch statements tend to centralize decision-making logic, leading to tight coupling between different parts of the code. This lack of encapsulation can make the codebase more brittle and harder to refactor.
- **Testability**: Testing different cases within a switch statement can be more challenging, as each case might have unique logic that needs to be tested individually.

## Refactoring Recipe

To address the "Switch Statements" code smell, you can use several strategies:

- Move Accumulation to Visitor
- Replace Conditional Dispatcher with Command
- Replace Conditional with Polymorphism
- Replace Type Code with Subclasses
- Replace Type Code with State/Strategy
- Replace Parameter with Explicit Methods
- Introduce Null Object

### Reference

[https://refactoring.guru/smells/switch-statements](https://refactoring.guru/smells/switch-statements)

[https://luzkan.github.io/smells/conditional-complexity](https://luzkan.github.io/smells/conditional-complexity)

[https://www.jianshu.com/p/50a9510673b7](https://www.jianshu.com/p/50a9510673b7)

[https://www.informit.com/articles/article.aspx?p=2952392&seqNum=12](https://www.informit.com/articles/article.aspx?p=2952392&seqNum=12)

[https://refactoring.guru/introduce-null-object](https://refactoring.guru/introduce-null-object)