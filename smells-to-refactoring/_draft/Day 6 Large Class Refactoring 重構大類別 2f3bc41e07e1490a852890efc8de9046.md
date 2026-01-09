# Day 6 Large Class > Refactoring 重構大類別

Created: September 4, 2023 10:36 PM

為了消除 Large Class 氣味，開發者可以考慮使用下列八種重構氣巧：

1. Extract Class
2. Extract Subclass
3. Extract Interface
4. Replace Data Value with Object
5. Duplicate Observed Data
6. Replace Conditional Dispatcher with Command
7. Replace Implicit Language with Interpreter
8. Replace State-Altering Conditionals with State

---

### Extract Class 抽出類別

抽出類別（Extract Class）在重構技巧分類上屬於「Moving Features between Objects」，這個分類聚焦在優化類別本身。例如將不同功能（Features）在類別之間搬動，或是收納到新的類別之中。顧名思義，當我們發現了一個 Large Class，我們會很直觀聯想到將其一分為二，甚至拆解為更小的多個類別，而 Extract Class 正是這樣的技巧。

### Extract Subclass 抽出子類別

抽出子類別（Extract Subclass）與下面會介紹的抽出介面（Extract Interface）一樣，都屬於另一個重構分類「Dealing with Generalization」而不是上面介紹的 Extract Class 所屬「Moving Features between Objects」重構分類。這個發現讓我對於原本先介紹「重構分類」，再介紹「重構技巧」的文章結構產生懷疑。所以從本篇文章開始，我決定省略重構分類，或是將簡短說明包含在重構技法內。

如果我們比較「Moving Features between Objects」與「Dealing with Generalization」這兩種重構類別，我們會觀察到裡面包含的技巧相當接近（如 Extract Class 與 Extract Subclass），甚至讓我一度疑問為何需要如此劃分為不同的重構分類。

如果說「Moving Features between Objects」是類別之間的「水平」整理，那「Dealing with Generalization」就屬於類別的「垂直」關係，活用物件導向中的「繼承（inheritance）」與「委派模式（delegation）」來進行類別的優化。

當類別中有部分的功能只有符合特定條件之下執行，我們可以將符合這些條件的行為收納集中，抽出作為一個新的子類別（Subclass），這便是抽出子類別（Extract Subclass）。

### Extract Interface 抽出介面

抽出介面（Extract Interface）與上述抽出子類別（Extract Subclass）一樣，屬於「Dealing with Generalization」重構分類的技巧。差別在於繼承關係上，前者是向上（父類別、介面）抽出，後者是向下（子類別）抽出。

### Replace Data Value with Object 轉換資料為物件

當我們觀察到類別中有部分的資料屬性有其專屬的行為與方法，可以考慮將其從類別內的數值（data value）轉換為新的物件類別（object），藉此來搜集與整合其所有相關的方法與行為。這個重構技巧可以被視為是抽出類別（Extract Class）的其中一種特例，但是聚焦在類別中的資料與相關的行為整理上。

[https://refactoring.guru/replace-data-value-with-object](https://refactoring.guru/replace-data-value-with-object)

### Duplicate Observed Data

當同一個類別同時包括不同的職責，例如同時兼具商業邏輯（business logic）與使用者圖性介面邏輯（*Graphical User Interface, aka GUI*），且GUI可能還不止一種，例如有桌上型軟體介面與手機APP、或是Web UI等。這種情況下，當商業邏輯與多種不同的ＧＵＩ混雜在相同類別內，會讓開發者難以維護。

這個重構技巧建議將ＧＵＩ邏輯（GUI Class）由商業邏輯中抽離出來，依照使用情境數量分別安置在不同的新類別之上。讓兩個不同職責的類別都能專注在各自的業務上，提高內聚性也增加可讀性。

這個重構技巧是奠基於「[觀察者設計模式（Observer Design Patterns）](https://refactoring.guru/design-patterns/observer)」，又可稱為「Event-Subscriber」。

### Replace Conditional Dispatcher with Command

這個重構技巧我在前幾天的「[Long Method > Refactoring 如何重構 Long Method](https://ithelp.ithome.com.tw/articles/10314510)」中已經提及。嚴格來說，每一種能夠適用長方法（Long Method）氣味的重構技巧，也都能間接讓大類別變得更小。畢竟方法是物件的具體行為，當各別方法都能夠成功縮減尺寸時，類別本身當然也會達到瘦身效果。

### Replace Implicit Language with Interpreter

要理解這個重構技巧，首先我們需要先了解兩個名詞：「Implicit Language」與「Interpreter Pattern」。

「Implicit Language」在華文軟體開發的世界目前尚未找到普遍通用的合適翻譯，或可稱之為「隱式語言」，相對於「Explicit Language（顯式語言）」。Implicit Language 指得是有一組邏輯或規則，用隱晦不明、非直接的方式來表達。可能包含了複雜的條件判斷、決策流、數值計算等，卻沒有經過合理結構化讓人一目瞭然。

「Interpreter Pattern（解譯器模式）」是一種設計模式，

> 解譯器模式 (interpreter)，給定一個語言，定義它的語法的一種表示，並定義一個解釋器，這個解釋器使用該表示來解釋語言中的句子。 — *Design Pattern by GoF*
> 

當名詞解釋明確以後，這個重構技巧的意圖就相當明確，是將隱晦不明的複雜邏輯用「解譯器模式」來取代。

### Replace State-Altering Conditionals with State

當類別中存在依賴狀態（state）觸發的複雜條件判斷句，且「狀態」自身會因為進行修改時，我們可以考慮使用「狀態」來重構。

[https://www.informit.com/articles/article.aspx?p=1398607&seqNum=4](https://www.informit.com/articles/article.aspx?p=1398607&seqNum=4)

[https://www.industriallogic.com/xp/refactoring/alteringConditionalsWithState.html](https://www.industriallogic.com/xp/refactoring/alteringConditionalsWithState.html)

### Reference

[https://www.industriallogic.com/img/blog/2005/09/smellstorefactorings.pdf](https://www.industriallogic.com/img/blog/2005/09/smellstorefactorings.pdf)

[https://www.refactoring.com/catalog/](https://www.refactoring.com/catalog/)

[https://refactoring.guru/replace-data-value-with-object](https://refactoring.guru/replace-data-value-with-object)

[https://refactoring.guru/duplicate-observed-data](https://refactoring.guru/duplicate-observed-data)

[https://www.industriallogic.com/xp/refactoring/implicitLanguageWithInterpreter.html](https://www.industriallogic.com/xp/refactoring/implicitLanguageWithInterpreter.html)

[https://ithelp.ithome.com.tw/articles/10208556](https://ithelp.ithome.com.tw/articles/10208556)