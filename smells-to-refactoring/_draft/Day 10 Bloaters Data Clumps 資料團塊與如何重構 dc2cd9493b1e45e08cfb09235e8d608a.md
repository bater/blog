# Day 10. Bloaters > Data Clumps 資料團塊與如何重構

Created: July 29, 2023 9:07 PM
Tags: bloaters, smell

## 氣味的徵兆

如果我們在程式中發現一組相關的資料總是同時出現，而且當我們拿掉其中一個資料時，會讓剩下的部分失去意義或不完整，這就是資料團塊（Data Clumps，或稱數據泥團）的徵兆。譬如說，當我們要描述一個「點」在三維空間中的位置時，三維坐標的數值必須同時存在、缺一不可，否則這個「點」的資料就失去了意義。

這些資料團塊隨著功能新增擴充，可能會逐漸蔓延擴散到專案各處。其中也包括綁定在資料團塊之內的驗證邏輯或業務規則。例如說有一個時間區間資料，除了必須包括開始與結束兩個時間資料外，結束時間必須晚於開始時間。類似這樣的驗證邏輯也可能隨著資料團塊在專案中不斷出現，造成程式碼重複問題。

如果比較這個氣味與上一篇文章介紹的「[過長參數列（Long Parameter List）](https://ithelp.ithome.com.tw/articles/10316245)」，我們可以觀察到，雖然不能說百分之百，但「過長參數列」很可能同時也符合「資料團塊」的氣味，只要這些方法中的參數總是必須同時存在才有意義。但資料團塊聚焦的不只是參數，範圍還包括物件或類別中各種變數或資料同時出現的現象。

## 氣味的理由

Bloaters 氣味都有著相似的理由，具體有以下的缺點：

- 較低的**可讀性和理解性**：存在資料團塊的程式碼可能較難以閱讀和理解，特別是對於不熟悉專案的新進開發者來說。資料彼此之間的關係可能不會立即清晰可見，需要額外的理解成本。
- **重複的程式碼**：當相同的資料團塊在程式碼的不同位置大量出現時，會導致不必要的重複。這種重複使程式碼變得更加難以維護，也消耗無謂的閱讀理解時間。
- **維護困難**：當資料團塊多次分散在專案的各處時，更新或修改數據就變成了維護上的挑戰。如果資料結構需要更改，就必須在多個不同位置同時進行更新，有如「散彈槍式修改（Shotgun Surgery）」，增加了邏輯不一致性的風險。
- **脆弱性**：由於相似程式碼分散在多個地方，對程式碼的其中一部分進行更改可能會無意間影響依賴相同結構的其他部分，導致意外且難以診斷的錯誤與非預期的副作用。

## 對應氣味的重構手法

當我們進行到臃腫怪（Bloaters）分類中的最後一個氣味，能夠對應的重構技巧無可避免都是些熟悉的老朋友。根據[對照表](https://www.industriallogic.com/img/blog/2005/09/smellstorefactorings.pdf)上列出三種重構手法，在未來的系列中我可能會按照自己的心得補上其他：

- Extract Class
- Introduce Parameter Object
- Preserve Whole Object

## Extract Class 抽出類別

在物件導向的世界中，創造新的類別來解決問題可以說是我們的一種預設工具。每當我們發現了繁雜、大量的資料與附屬的行為散落在專案各處，我們總是會思考，是否能創造出一個新的類別來做整理。

這也是為何「抽出類別（Extract Class）」這個重構技巧在臃腫怪（Bloaters）氣味的對應中反覆出現，我們可以由對照表上觀察到「[Large Class](https://ithelp.ithome.com.tw/articles/10315243)」、「[Primitive Obsession](https://ithelp.ithome.com.tw/articles/10315937)」中找到對應關係，甚至上一篇氣味中關於如何重構「[Long Parameter List](https://ithelp.ithome.com.tw/articles/10316245)」的討論裡，雖然對照表沒有提及，但我認為抽出類別一樣可以用來重構參數列表過長所造成的問題。

## Introduce Parameter Object

老朋友二號（？）導入參數物件首次介紹於「[Long Method](https://ithelp.ithome.com.tw/articles/10314510)」重構方法一文，如果我們在參數列表發現到資料團塊，自然是可以透過這個熟悉的重構技巧。這個重構技巧同時也可以對應「[Long Parameter List](https://ithelp.ithome.com.tw/articles/10316245)」與「[Primitive Obsession](https://ithelp.ithome.com.tw/articles/10315937)」，一樣是應對臃腫怪（Bloaster）的熱門候選。

## Preserve Whole Object

這個技巧同時可參見於「[Long Method](https://ithelp.ithome.com.tw/articles/10314510)」與「[Long Parameter List](https://ithelp.ithome.com.tw/articles/10316245)」。當過長的參數列表中每一個參數都來自相同物件，此時我們自然無須新創一個物件，而是取用這個物件本身來替代長長的參數列表。

只有當這個共同的物件不存在時，我們才需要考慮使用「Introduce Parameter Object」或是「Extract Class」。

## 後記

鐵人賽很快進入第十天，或可說三分之一。但按照目前文章拆分的情況看，或許總文章數會上看到四時左右，畢竟此時才終於完結第一個氣味大類，介紹了五種氣味與對應重構的技巧。

寫作過程中，首先獲得最多利益的當人是我本人。為了寫成文章免不了需要去研讀、比較，然後產生困惑，再進一步找答案。下筆之後有了新的想法，反過來去推翻前幾日的看法是家常便飯。我並不是這個領域的專家，只是一個求道者。

對於到達終點以後的視野，我相當期待。再次感謝所有讀者，如果有任何反饋意見也相當歡迎留言，希望能提供更高品質的文字輸出留在網路上，對於社群提供一些貢獻。

---

Groups of variables that always appear together should be turned into their own object.

## Sign of Smell

If deleting one of the data values would make the others meaningless, it is a sign of data clumps. When we find identical groups of variables appearing in different parts of the code, they should be turned into their own classes to avoid data clumps.

## Reason of Smell

- **Readability and Understandability**: Code that uses data clumps can be difficult to read and understand, especially for developers who are not familiar with the codebase. The relationships between the data elements might not be immediately clear.
- **Duplication**: When the same group of data elements is repeated across different parts of the code, it leads to unnecessary duplication. This duplication makes the code harder to maintain because if the data needs to change, it must be updated in multiple places, increasing the risk of inconsistencies.
- **Maintenance Difficulty**: Updating or modifying the data becomes a maintenance challenge when it's scattered across the codebase. Any change in the data requires searching through the code to find all occurrences, which can be error-prone and time-consuming.
- **Brittleness**: Since the data is spread out across multiple locations, making changes to one part of the code can inadvertently impact other parts that rely on the same data, leading to unexpected and hard-to-diagnose bugs.

## Refactoring Recipe

- Extract Class
- Introduce Parameter Object
- Preserve Whole Object

### Reference

[https://refactoring.guru/smells/data-clumps](https://refactoring.guru/smells/data-clumps)