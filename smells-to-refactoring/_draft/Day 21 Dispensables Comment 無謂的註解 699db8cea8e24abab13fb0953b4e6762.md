# Day 21. Dispensables > Comment 無謂的註解

Created: July 29, 2023 9:52 PM

## 氣味的徵兆

「無謂的註解」是一種非常特殊的「程式碼」氣味，因為註解本身並不算是真正的程式碼。

在文章繼續之前，為了表達我對於各種不同的程式語言中最佳實踐與慣例的理解與尊重，抱持著尊敬的心情合先敘明：本篇文章內所探討的「註解」僅侷限於不會影響最終表現行為或是程式碼慣例的那一種。例如說，有些程式語言會透過特殊註解來綁定某些框架或功能，便不在此限。

如果我們翻閱「重構聖經」，同時也是多數開發者所熟知的「Clean Code: A Handbook of Agile Software Craftsmanship」一書中也會發現，如果開發者不得不透過註解來表達程式碼的意圖，那代表這段程式碼仍存在努力改善的空間。

> No comment is better than no comment. — Bater, Chen (me)
> 

「沒有註解能夠比得上沒有註解」乍聽上去有些饒舌，這句話是仿作自「沒有程式碼能夠比沒有程式碼更快（No code is faster than no code）」代表更快的程式碼是做較少事情的程式碼。同樣地，最好的註解，莫過於沒有註解。這意味著程式碼本身就可以清楚表達其意圖，而不需要額外資訊輔助。重構的其中的一個目的，便是讓註解本身顯得多餘。

這個概念當然很理想，但在現實世界中卻相當困難。在我們的專案之中總是有各種原因讓我們能輕易找到不同的註解。所謂理想很豐滿，現實很骨感。

## 氣味的原因

接下來的段落，我會解釋幾種不同的註解，以及他們成為氣味的原因。

### Change Log 變動日誌

其中一個常見的註解類型就是「變動日誌」。某些公司甚至會為此訂下內部規則，每次變動程式碼時，都必須在方法或函式名稱上方用註解留下日期、作者、變動摘要來做紀錄。

我不能武斷的說這種做法百分百毫無用處，但比較合適的位置是放在文件，或者使用「git blame」功能來查詢變動歷史，而不是一長串歷史變動註解。

有些更有創造力的開發者甚至會試圖在註解中留下如同個人日記一般的文字紀錄，恩，不予置評（no comment 雙關）。

### Dead Features 死亡的功能

這種類型的註解實際上屬於另外一個氣味「**Speculative Generality**」，只不過保持註解型態。

有一天，友善的專案經理走到你的桌子前，對你說這個功能我們再也用不上了，但是難保哪一天又會改變心意，重新上線。有鑑於此，多數的開發者都會選擇最簡單的應對方式，暫時註解來取消實作。

然而，多數時候我們再也不會用到這些被註解的功能。更何況，當版本差異日益擴大以後，重寫可能反而還更有效率。

### Tasks or Steps explanation 步驟解釋

當你有一個功能相當複雜，有些開發者會選擇一步一步以註解說明步驟或意圖。事實上，假如眼前的程式碼真的複雜到這種程度，正是代表需要重構的氣味。

## 對應氣味的重構

要消除這種氣味，我們不能單純刪除掉註解。接下來我會介紹一些可以對應這個氣味的重構技巧。

- Rename Method 方法重新命名
- Extract Method 抽出方法
- Introduce Assertion 導入假設句

### Rename Method 方法重新命名

當你發現方法或函式名稱無法清楚表達意圖，而需要借助額外註解來說明時，此刻我們最好的做法是透過開發編輯器輔助重新選一個合適的名稱。

當你的方法無法使用單一名稱來表達所有的任務，可能是因為做了不只一件事，違反了單一職責原則，此時可以慎重考慮依照職責拆分為更小的方法。

### Extract Method 抽出方法

當你發現了「步驟解釋」型註解時，你當前的程式碼很可能已經違反了單一職責原則。代表同時間想完成過多的步驟或任務。

在這個情況下，我們可以考慮適度拆解，將不同步驟或流程抽出來為獨立的新方法，來達到清楚表達意圖、迴避註解需求的效果。

### Introduce Assertion 導入假設句

在一些物件導向程式語言如Java裏面，「Assertion」是一種能強制檢查條件的機制，如果未通過則拋出例外錯誤。

當你發現某些註解提醒開發者某段程式碼必須在特定條件下才能符合實作，我們可以將這些註解的意涵轉型為「假設句」，當不能符合時直接拋出錯誤處理，來達到減少註解並將邏輯實作進程式碼行為中的目的。

---

## Sign of Smell

“Comment” is a very special code smell case because it’s not really a “code”, it’s a comment. 

Firstly, to show my respect for all the best practices and conventions of each programming language, it is important to note that the code smell "comment" I discussed here is the comment that may not necessarily be present in the code, not the one that might have some impact on the real behavior. For example, some language connects framework features by comments, this is not the case we covered here.

The bible of clean code, called "Clean Code: A Handbook of Agile Software Craftsmanship," states that if you find yourself needing to add comments to help developers understand the intention of a function or method, it signifies that your code is not clear enough.

> No comment is better than no comment. — Bater, Chen (me)
> 

This phrase, inspired by "No code is faster than no code," means that the most efficient code is actually having no code at all. Similarly, the best comment for code is no comment at all. Clear code should express its intention itself without additional assistance.

This idea is nice, but in the real world, it can be extremely difficult to do. There are often numerous comments on the project for various reasons.

## Reason of Smell

In this section, I will explain several types of comments and why they are considered a bad smell.

### Change Log

One common type of useless comment is the "Change Log". In some companies, there may be a rule to record the date, author, and reason for change as a comment above the function or method name.

This kind of information is not 100% useless but should be placed in the document or checked by “git blame”, not a long list of comments. 

Some developers even write comments like a personal diary, well, better to not comment here.

### Dead Features

It’s actually another smell called “**Speculative Generality**”, but in comment status.

One day, the project manager came to the developer's desk and informed them that the current feature was no longer required, but there was a possibility of needing it again in the future. In response, the developer decided to comment out the feature. 

In fact, we no longer need that feature. Furthermore, it is usually faster to rewrite it to synchronize with the latest version of the codebase when we truly need it again.

### Tasks or Steps explanation

When we have a complicated function or method, some developers tend to write comments to better describe each step or sub-task of the function.

If your function is complex enough to require explanations through comments, it is a sign that you should refactor it and make it smaller and clearer.

## Refactoring Recipes

To eliminate this smell, it's not simply to delete the comment. Let's see some refactoring skills that match with this "comment" code smell.

- Rename Method
- Extract Method
- Introduce Assertion

### Rename Method

When a method name is not clear enough and requires additional comments to describe it, it is better to rename it with a clear name.

### Extract Method

When you come across the "Tasks or Steps explanation" comment, the current code might already be violating the Single Responsibility Principle (SRP), which means it is doing too much at once. 

In this case, we can consider splitting the original method into smaller pieces by using the "Extract Method" technique.

### Introduce Assertion

In programming languages like Java, an assertion is a mechanism used to check and enforce certain conditions or assumptions within your code. Assertions are typically used during the development and debugging process to detect and report errors and unexpected conditions in your program.

When you encounter a comment, remind the developers that the code only works in certain cases. We can replace such comments with assertions.

Reference

[https://refactoring.guru/introduce-assertion](https://refactoring.guru/introduce-assertion)