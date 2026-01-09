# Day 25. Duplicated Code > Refactoring 重構重複的程式碼

Created: September 25, 2023 1:42 PM

根據Joshua Kerievsky於2005年創建的「[程式碼氣味到重構速查表](https://www.industriallogic.com/img/blog/2005/09/smellstorefactorings.pdf)」中，我們可以得到以下十二種對應「重複的程式碼」這種氣味的重構技巧。但如同上一篇文章中提到，根據重複的程式碼片段或所在位置不同，能夠對應的手法自然有很大的差異。為了應對這樣的差距，我認為更好的分類方式是依照重複程式碼片段的性質而重新分群，同時參考[Refactoring Guru網站](https://refactoring.guru/smells/duplicate-code)上所建議的重構技巧。

### Smells to Refactorings Quick Reference Guide: Duplicated Code 部分

- Chain Constructors
- Extract Composite
- Extract Method
- Extract Class
- Form Template Method
- Introduce Null Object
- Introduce Polymorphic Creation with the Factory Method
- Pull Up Method
- Pull Up Field
- Replace One/Many Distinctions with Composite
- Substitute Algorithm
- Unify Interfaces with Adapter

---

## 重複的片段處於相同類別

- Chain Constructors

### Chain Constructors 構造函數鏈

當多個構造函數具有共同的「初始化邏輯」時，我們可以使用構造函數鏈（Chain Constructors）這種技巧來消除重複的程式碼氣味。這個技巧的主要目標是將「初始化邏輯」集中到一個地方，以減少程式碼的重複。

在同一個類別中，我們可以創造一個主要的構造函數（Constructors），其中包含共用的初始化邏輯，然後在其他構造函數中調用這個主要構造函數來重複使用邏輯。這樣做有助於確保初始化邏輯集中在一個地方，提高程式碼的可讀性和可維護性。

## 重複的片段處於相同位階不同子類別

- Introduce Polymorphic Creation with the Factory Method
- Pull Up Method
- Pull Up Field
- Pull Up Constructor Body
- [**Form Template Method**](https://refactoring.guru/form-template-method)
- [**Substitute Algorithm**](https://refactoring.guru/substitute-algorithm)

### Introduce Polymorphic Creation with the Factory Method

正式介紹這個重構技巧之前，首先必須先來認識何謂「工廠方法設計模式（Factory Method, aka Virtual Constructor）」。

工廠方法是一種專注於創造物件階段的設計模式，在父類別（SuperClass）定義了建立新物件的介面（Interface），但是允許繼承的子類別依照自身需求去覆寫。在父類別定義了共通框架的同時，也透過多型（Polymorphic）在子類別的具體實作中能夠保留彈性。透過這個方法可以大量消除原本可能在不同類別中大量重複的物件建構流程與步驟，由父類別統一管理，子類別只專注於不同的部分。

這個設計模式特別適合下列兩種情境：當有相同父類別的子類別擁有相似的建立新物件邏輯，但是建立物件的步驟略微不同；以及當父類別與子類別擁有相似的建立新物件邏輯，但是建立物件的步驟略微不同。

### Pull Up Method / Pull Up Field / Pull Up Constructor Body

這三種重構技巧基本上都是講同一件事，只是推往父類別上移的對象不同，所以放在同一處一起講。當兩個子類別或子類別與父類別具有重複的程式碼片段，我們可以考慮直接取消在子類別的實作，一情況上移方法、屬性、或是建構子單元。

### Form Template Method 表單模板方法

當你發現多個子類別中有實作步驟類似的邏輯運算時，我們可以考慮透過「模板方法（Template Method）」設計模式，將這些步驟流程抽出到父類別中來做共用，並且將差異用覆寫的方式保留在子類別中。

### Substitute Algorithm 替換演算法

將原本存在於方法內的複雜、冗長、重複的程式片段，以更佳的演算法取代。具體實作還是取決於語言而有不同，也可以考慮直接以第三方套件來取代，雖然會增加外部依賴，但可以減少維護複雜不明的邏輯。

## 重複的片段位於條件子句中

- Introduce Null Object
- [**Consolidate Conditional Expression**](https://refactoring.guru/consolidate-conditional-expression)
- [**Consolidate Duplicate Conditional Fragments**](https://refactoring.guru/consolidate-duplicate-conditional-fragments)
- Replace One/Many Distinctions with Composite

### Introduce Null Object 引入空物件

在物件導向中，我們不時需要檢查物件是否為空，然後按照規格編寫許多例外處理。尤其是當一個物件在專案中被廣泛使用時，這些相同的檢查邏輯可能會散佈在專案各處造成重複。我們可以透過「空物件（Null Object）」來定義當這些物件為空時的行為，把邏輯與行為集中在同一處，避免大量重複。

### Consolidate Conditional Expression 整合條件子句

當你發現你有多個條件子句會導致出相同的行為或結果，我們可以考慮透過調整條件來讓邏輯更簡化。舉例來說，如果不論布林値的結果為「是」或「否」都會導致相同結果，這個條件判斷根本就不該存在。

### Consolidate Duplicate Conditional Fragments 整合條件子句重複的片段

如果多個條件子句內的行為都有包括相同的步驟或流程，這些步驟應該抽出於條件之外。舉例來說，如果每一天早上起床「刷牙洗臉」都是一日開始的標準流程，我們在撰寫判斷今天星期幾執行不同任務的程式碼區塊中，就不該把「刷牙洗臉」重複寫七次。

### Replace One/Many Distinctions with Composite

這個重構技巧可以視為抽出組合（Extract Composite）的其中一種特例（謎之聲：到底抽出組合總共有多少種特例？），但是聚焦在簡化程式碼中複雜冗長的條件邏輯，而且這些條件邏輯的結果會互相影響。

這個重構技巧與抽出組合最主要的差別之處在於，透過複合式組合結構來取代原本複雜的條件判斷句，來提高程式碼可讀性與可重用性，並減少重複的效果。

## 重複的片段處於任意位置

不論重複的程式碼片段出現在何處，都可以考慮使用下列重構技巧。

- Extract Composite
- Extract Method
- Extract Class
- Extract SuperClass
- Unify Interfaces with Adapter

### Extract Composite 抽出組合

抽出組合（Extract Composite）是一種重構技巧，可以用來消除重複的程式碼氣味，特别是在邏輯條件重複的情況下。這個技巧的主要目標是將重複的邏輯抽出到一個獨立的方法、函式或類別之內，來減少程式碼的重複片段。

### Extract Method 抽出方法

抽出方法（Extract Method）可以視為抽出組合的其中一種特例，將重複的程式碼片段抽出到一個獨立的方法內，來減少原有的程式碼重複。

### Extract Class 抽出類別

抽出類別（Extract Class）也可以視為抽出組合的其中一種特例，將重複的程式碼片段抽出到一個獨立的類別內，來減少原有的程式碼重複。

### Extract SuperClass 抽出父類別

如果把組合（Composite）單純視為一種結構物件來看待，那麼抽出父類別（Extract SuperClass）當然還是可以視為抽出組合的其中一種特例，將重複的程式碼片段抽出到一個新的父類別中透過繼承使用，來減少原有的程式碼重複。

### Unify Interfaces with Adapter 透過轉接器來整合介面

當兩個類別想要通用但卻遭遇介面差異的問題，這時候我們可以透過轉接器（Adapter）設計方法來作為兩個類別之間介接的橋樑。

這個設計模式的優點是可以大幅增加現有類別的運用場合提高可重用性，不需要僅僅為了介面差異而去創造不同介面版本的相同實作，減少重複程式碼的產生。

### Reference

[https://refactoring.guru/smells/duplicate-code](https://refactoring.guru/smells/duplicate-code)

[https://www.industriallogic.com/xp/refactoring/chainConstructors.html](https://www.industriallogic.com/xp/refactoring/chainConstructors.html)

[https://www.industriallogic.com/xp/refactoring/extractComposite.html](https://www.industriallogic.com/xp/refactoring/extractComposite.html)

[https://refactoring.guru/design-patterns/composite](https://refactoring.guru/design-patterns/composite)

[https://www.informit.com/articles/article.aspx?p=1398606&seqNum=4](https://www.informit.com/articles/article.aspx?p=1398606&seqNum=4)

[https://refactoring.guru/design-patterns/factory-method](https://refactoring.guru/design-patterns/factory-method)

[https://www.industriallogic.com/xp/refactoring/interfacesWithAdapter.html](https://www.industriallogic.com/xp/refactoring/interfacesWithAdapter.html)