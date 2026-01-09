# Day 7. Bloaters > Primitive Obsession 基本型別偏執

Created: July 29, 2023 9:08 PM
Tags: bloaters, smell

（English follows Chinese）

## 氣味的徵兆

Primitive Obsession（基本型別偏執）是指在程式碼撰寫過程中，過度依賴語言所提供的基本型別（例如整數、字串、布林值等）來表示某些包括業務邏輯的概念或實體。

對於物件導向的新手來說，很可能會錯失了是否應該將一些包含邏輯的資料型態轉換為小型物件的時機。例如，新手可能會很直觀地選擇分別使用字串與浮點數（Float）來儲存貨幣單位與金額欄位，而不是創造一個新的貨幣類別（Money Class）來整合所有與貨幣有關的商業邏輯與行為。其他常見的情境，例如資料欄位有某些限制（Limitation）、驗證（Validation）或規則（Rule）存在時，如資料數值上下限或是像電話、地址這類具有特殊規則的字串，可以考慮建立電話物件、地址物件來取代原始字串型別。

至於怎麼樣才算是「過度」依賴基本型別呢？不同開發者之間可能不存在一個絕對標準。如果沒有顯示以外的功能，將電話與驗證放在如學生或客戶一樣的實體物件上或許也無不可；但如果在企業這樣的物件，可能同時有負責人電話、營業處電話、窗口電話、工廠電話、經銷電話等，同時有多個電話號碼資料存在，且全都需要相同的電話規格驗證邏輯（長度、區碼、國碼等），那我們此時就可以考慮將所有電話號碼驗證邏輯全部整合到「電話類別」之中，而不是多次重複相同的程式碼。

如果我們發現相同的資料驗證邏輯或行為重複出現多次，不論是在相同類別之中或是出現在不同類別裡，我們可以合理懷疑是否已經「過度」依賴了資料基本型別，可以考慮進行重構。

## 氣味的原因

在物件導向的世界中，我們習慣用物件去解決問題。正如同 Ruby 語言有一句格言：「萬般皆物件（Everything is an Object）」，唯有物件化，我們才能夠將特定領域的行為與邏輯封裝在類別當中，以物件實作。過度依賴基本型別可能會有下列問題：

- **缺乏可重用性**：當開發者依賴原始資料類型而不是建立自訂類別或物件時，會限制程式碼的可重用性。自訂類型類別可以封裝行為和資料，使其更容易在程式碼庫的不同部分中重用。另一方面，原始資料類型缺乏這種封裝，使其難以有效地進行重用。
- **缺乏抽象性**：「基本型別偏執」通常導致程式碼缺乏抽象性。當程式碼中充斥著原始資料類型時，理解高階概念和業務邏輯會變得相當困難。這可能使程式碼難以維護、擴展和理解。
- **程式碼重複**：當需要為多個相同的原始資料實例實現類似的功能或行為時，開發者可能會複製程式碼。這種重複可能導致不一致性和維護上的麻煩。例如，所有類似用戶的類別應該共享相同的有效電話號碼字段驗證邏輯，而不是在多個地方重複它，如同上面所提到企業實體內可能有多組電話的例子。
- **功能有限**：原始資料類型在功能和能力方面受限，無法與自訂類別或物件相比。通過使用原始資料類型，開發者可能會錯過封裝、資料驗證和與自訂類別相關聯的行為帶來的好處。
- **增加複雜性**：隨著程式碼庫的成長，對原始資料類型的依賴可能增加程式碼的整體複雜性。這使得程式碼更難理解和修改。透過重複使用相同的驗證與資料行為，可以讓程式碼變得更簡潔易讀。

## 對應氣味的重構技巧

要重構「基本型別偏執」氣味，根據「[Smells to Refactorings Quick Reference Guide](https://www.industriallogic.com/img/blog/2005/09/smellstorefactorings.pdf)」一共列出14種重構手法。但如果仔細比對會發現其核心是相同的，就是創造新的類別來取代基本型別。嚴格來說，我認為全部都可以視為 Extract Class 抽出類別的變形：

1. Extract Class
2. Replace Data Value with Object
3. Encapsulate Composite with Builder
4. Introduce Parameter Object
5. Preserve Whole Object
6. Move Embellishment to Decorator
7. Replace Conditional Logic with Strategy
8. Replace Implicit Language with Interpreter
9. Replace Implicit Tree with Composite
10. Replace State-Altering Conditionals with State
11. Replace Type Code with Class
12. Replace Type Code with State/Strategy
13. Replace Type Code with Subclasses
14. Replace Array With Object

## 後記

開賽前粗略計算，開頭結尾、五種氣味分類、23種氣味合計約30篇文章的數量對於鐵人賽三十日挑戰來說恰到好處。但實際開賽後發現，要將氣味與重構技巧整合在單獨一篇文章內，有各式各樣的問難。按照目前到第三種氣味為止都是拆分的情況來看，或許總文章數會達到驚人的50幾篇之多，畢竟氣味加上重構手法本身就已經約46篇。

當然，計較數量是沒有意義的，不論如何有始有終，目標依然都是將所有氣味與重構之間的對應關係介紹一輪，這點不因為鐵人賽三十日結束之後而有任何改變。

---

## Sign of Smell

Primitive Obsession refers to the overuse or excessive reliance on primitive data types (e.g., integers, strings, booleans) to represent certain concepts or entities in the code.

People who are new to object-oriented programming often hesitate to use small objects for simple tasks. For example, they may not consider creating a money class that combines numbers and currency, a range class with an upper and lower bound, or special string classes for telephone numbers and ZIP codes.

## Reason of Smell

- **Lack of Reusability:** When developers rely on primitive data types instead of creating custom classes or objects, it limits the reusability of code. Custom type classes can encapsulate behavior and data, making it easier to reuse them in different parts of the codebase. Primitives, on the other hand, lack this encapsulation, making it harder to reuse them effectively.
- **Lack of Abstraction**: Primitive Obsession often leads to a lack of abstraction in the code. When the codebase is littered with primitives, it becomes challenging to understand the higher-level concepts and business logic. This can make the code harder to maintain, extend, and reason about.
- **Code Duplication**: When similar functionality or behavior needs to be implemented for multiple instances of the same primitive, developers may end up duplicating code. This duplication can lead to inconsistencies and maintenance headaches. For example, all user-like classes should share the same validation logic for valid telephone number fields, rather than duplicating it in multiple places.
- **Limited Behavior**: Primitives have limited behavior and capabilities compared to custom classes or objects. By using primitives, developers may miss out on the benefits of encapsulation, data validation, and behavior associated with a custom class.
- **Increased Complexity**: As the codebase grows, the reliance on primitives can increase the overall complexity of the code. This makes the code harder to understand and modify.

## Refactoring Recipe

1. Extract Class
2. Replace Data Value with Object
3. Encapsulate Composite with Builder
4. Introduce Parameter Object
5. Move Embellishment to Decorator
6. Replace Conditional Logic with Strategy
7. Replace Implicit Tree with Composite
8. Replace Type Code with Class
9. Replace Type Code with State/Strategy
10. Replace Type Code with Subclasses
11. Replace Array With Object

### Reference

[https://refactoring.guru/smells/primitive-obsession](https://refactoring.guru/smells/primitive-obsession)