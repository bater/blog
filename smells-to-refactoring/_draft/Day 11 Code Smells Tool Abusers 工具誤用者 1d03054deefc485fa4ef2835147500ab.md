# Day 11. Code Smells > Tool Abusers 工具誤用者

Created: July 29, 2023 9:46 PM
Tags: smell

## 前言

系列文章進入到第二個氣味類別。在完成第一個氣味分類：臃腫怪（Bloaters）的過程中，我就隱約發現一件之前一直沒有注意到的事情。就是這個「氣味對應重構」的框架系統，事實上可以說是針對「物件導向程式語言」而來，似乎難以對應到函數式程式語言（Functional Programming）。不僅是氣味上可以觀察出這種徵兆，如果目光放在重構手法上這個傾向會更加明顯。

不少重構手法，可以說完全是依賴於物件導向而設計，不管是抽出類別、子類別、介面，轉換為物件，這些概念在函數式程式語言可能都不容易找到對應。當然這也興起我很大的興趣，這個懸念或許會成為系列文結束之後繼續探究的課題。

## Tool Abusers

Tool Abusers又可稱為「Object-Oriented Abusers」，可翻譯為「工具誤用」或是「物件導向濫用者」，從名稱就可以很直觀了解，這是基於違反了物件導向最佳實踐原則而導致的氣味。

> If the only tool you have is a hammer, you tend to see every problem as a nail. — Abraham Maslow （如果你手上只有錘子，什麼問題看上去都像是釘子。）
> 

這是一句網路上流傳廣泛的俗語，可稱為「工具法則」或是「馬斯洛的錘子」。作為每天使用物件導向的開發者來說，我必須承認我們有時太過依賴物件導向提供的便利性與技巧，但卻不一定有好好遵守那些物件導向中重要的精神與原則。

「我們所寫的程式碼是我們創造最終產品的工具。（The code we write is a tool for producing future software）」這句話是由Roman Kofman 在 RubyConf 2019 上的演講所提出。物件導向或許是當代最具影響力的程式概念之一，數以萬計開發者每天依賴著物件導向寫出不同的程式碼運作在不同環境上，但卻不是每一行程式碼都能夠很好地遵循物件導向精神。

現在的軟體圈子裡面，不少人對物件導向程式語言提出不少批評，也有不少人因此轉投入函數式程式語言（如Rust、Golang、Clojure等）。無可否認，物件導向設計確實存在一些缺點，但也有一些批評究其原因，實際上是程式碼氣味所導致。作為一位開發者，培養出能夠辨認程式碼氣味的能力是很重要的，我們才能真正了解手上工具的極限，並據此作出正確的選擇與判斷。

就我所見，當我們能夠遵循著物件導向最佳實踐的精神，我們可以創造出一個簡潔可維護的高度模組化程式碼。為了達成這些目標，認識一些物件導向中常見的「誤用」就格外重要，以下讓我們來看看這個分類下有哪些氣味：

## Switch Statements

當你在程式碼中發現大量複雜的「switch」判斷式，便屬於這種氣味。

## Refused Bequest

當物件從父類別繼承了過多無用的累贅。

## Alternative Classes with Different Interfaces

兩個相似的類別卻有著不同的介面或方法、名稱。

## Temporary Field

類別中的欄位只有特定方法或特定環境下才會被使用。

---

> These are misused smells in object-oriented programming.
> 

Tool Abusers, also known as "object-oriented abusers", are a type of code smell that only occurs in object-oriented programming (OOP) languages. This code smell refers to incorrect or incomplete implementation of Object-Oriented concepts or principles.

> If the only tool you have is a hammer, you tend to see every problem as a nail. — Abraham Maslow
> 

This is a famous quote commonly known as the "law of the instrument" or Maslow's Hammer. We sometimes over-rely on a familiar or favorite tool in the wrong way. "The code we write is a tool for producing future software," said Roman Kofman at RubyConf 2019. OOP may be the most powerful concept in the programming world. Billions of developers work with OOP every day, but not every line of code follows OOP principles properly.

As you may know, some developers have been criticizing OOP for decades, blaming it for various development challenges and inefficiencies. While it is true that certain pitfalls can arise in OOP, some of the criticism might just be pointing to code smells. It's important to recognize that these criticisms often arise from misuses and code smell issues rather than inherent flaws in the paradigm itself. 

In my point of view, OOP, when applied correctly with adherence to best practices, can lead to highly maintainable, scalable, and modular codebases. These are ideas that are available in object-oriented programming that you may misuse.

### Switch Statements

When you encounter complex "switch" statements or sequences of "if" statements in your code, it's a sign of this code smell.

### Refused Bequest

When a class unnecessarily inherits code from its parents.

### Alternative Classes with Different Interfaces

It appears that two different classes are performing similar responsibilities, but have different interfaces (method names, signatures, etc.).

### Temporary Field

Fields in the Class that are used only by one Method or only under certain circumstances.

### Reference

[https://bytelanguage.com/2018/02/25/code-smells-object-oriented-abusers/](https://bytelanguage.com/2018/02/25/code-smells-object-oriented-abusers/)

[https://refactoring.guru/refactoring/smells/oo-abusers](https://refactoring.guru/refactoring/smells/oo-abusers)