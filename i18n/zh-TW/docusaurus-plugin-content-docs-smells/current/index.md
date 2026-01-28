---
sidebar_position: 1
title: 簡介
slug: /
---

# 程式碼氣味與重構

一種系統性的方法來識別程式碼氣味，並應用重構技術來系統性的提升程式碼品質。

## 概覽

我邊寫了這份指南來探討程式碼氣味及其對應重構技巧之間的關係。這個系列的靈感來自於 Sandi Metz 在 RailsConf 2016 的精彩技術演講「Get a Whiff of This」，為識別和消除常見的程式碼品質問題提供了實用的指導。

## 什麼是程式碼氣味？

Sandi Metz 演講中的一個重要概念是，程式碼氣味是**中性的**——它們不一定總是**壞的**，但它們提供了有價值的資訊。正因如此，有別於中文世界常見的通用翻譯會稱之為程式碼「異味」，這份指南會統一稱之為「氣味」，以此來特別標示其中性的性質。如果什麼都不曾改變，可能沒問題。然而，在大多數情況下，新需求會不斷出現而不得不需要改變程式碼，這也正是為什麼公司會雇用像我們這樣的開發者來維護專案。

程式碼氣味**不是 bug**——它們按預期工作。重構涉及重新安排程式碼而不改變其行為。因此，重構一個壞氣味與修復 bug 不同，因為重構後行為預計保持不變。實務上會建議在修復 bug 或實現新功能時，能夠同時應用上這些重構技術來保持程式碼品質。

### 「沒壞就別修」？

有些人不喜歡重構，正是因為它並不會增加任何新功能或修復 bug，而且可能還會在穩定的舊程式碼中帶來額外的風險。很多時候維持系統穩定是最高優先級，特別是在政府機構、銀行或是保險會計系統中，時常可以見到比開發者更年長的程式碼片段。但讓我們面對現實，如果我們持續抗拒改變也同樣存在著風險。

除非專案有一個非常具體的到期日（如行銷活動）並且不會再次使用，否則考慮到長期維護成本，定期清理程式碼總是更好的選擇。

### AI 時代還需要在乎氣味與重構嗎？

本系列最初撰寫於 2023 年底。當時 GitHub Copilot 已經出現，但多半仍被視為輔助性的工具，更多是一種新奇體驗，而不是開發流程的核心組成。但到了 2026 年，情況已經完全不同。以 Anthropic 為例，他們公開提到超過七成的程式碼由 AI 生成。在這樣的規模下，人類已經不可能再用傳統方式進行逐行程式碼審核，品質把關勢必得交由另一個 AI Agent 協助完成。

在 Vibe Coding 盛行的環境中，甚至有人主張：程式碼本身應該被視為一次性產物，真正需要被長期維護的只有 Prompt、規格與文件，實作細節則完全交給模型自由發揮。

於是，一個問題自然浮現——當開發與審核都逐步黑箱化，而人類角色退守到最終行為驗證時，程式碼品質，甚至那種對程式碼細節精雕細琢的工匠精神，還有存在的必要嗎？

坦白說，這個問題曾困擾我很長一段時間，直到我遇到一個極其現實的限制。

即使閱讀與修改程式碼的主體從人類轉換成 AI，較少氣味、結構清楚的程式碼，對 AI 來說依然是「更容易理解與修改」的專案。相反地，當專案本身充滿氣味，在現代 IDE 與分析工具大量拋出警告的情況下，這些低品質雜訊會快速消耗寶貴的 token，甚至誤導模型的判斷方向。

也正因如此，在 2026 年這個「AI 開發能力已普遍超越九成人類」的時代，維護程式碼品質依然是重要且實際的工程選擇，而不只是老派工匠的情懷或潔癖。

當然，這裡必須留下一個但書。如果未來的開發模式演進到：程式碼本身退化成類似編譯後的機器碼，人類僅以自然語言與 AI 溝通，而 AI 能在可忽略的時間內生成一次性應用並完成任務，那麼我同意——在那樣的條件下，討論程式碼品質本身確實可能失去意義，就如同我們不會去檢視壓縮後的 min.js 是否優雅。

但即使走到那一步，氣味並不會消失，只是轉移位置。它們會從程式碼，轉移到文件與需求之中。模稜兩可、彼此矛盾、過度耦合的規格與說明，一樣會產出品質低劣的系統，一樣會讓最終使用者感到挫折與不滿。

### 我們的程式碼正是我們的工作環境

在日本文化中，即使有專職的環境清潔人員，員工親手清理自己所在的工作環境非常受重視。這種做法不僅是為了維持衛生，也是表達對工作環境的紀律和感謝的儀式。

作為軟體開發者，我們的程式碼專案就是我們的數位工作環境。保持程式碼整潔乾淨是我們工作職責的重要組成部分，某種程度上也可以視為是一種職業道德操守，也是職人精神的一環。

## 程式碼氣味分類

為了更清楚地了解需要重構什麼，我們首先需要了解什麼特徵會構成「程式碼氣味」。每個程式碼氣味都有一個特定的名稱和定義，以及相應的改進解決方案。正如 Sandi 在她的演講中提到的，每個程式碼氣味都可以透過特定的重構配方來補救。遵循這些配方，我們可以系統性地提升程式碼品質。

我們可以將經典的程式碼氣味分為五個主要類別：

### [膨脹者（Bloaters）](./Bloaters/)

它不需要那麼大。程式碼已經增長到太大而無法有效處理：

- [過長方法](./Bloaters/Long-Method)
- [過大的類別](./Bloaters/Large-Class)
- [基本型別偏執](./Bloaters/Primitive-Obsession)
- [過長參數列](./Bloaters/Long-Parameter-List)
- [資料泥團](./Bloaters/Data-Clumps)

### [工具濫用者（Tool Abusers）](./Tool-Abusers/)

這些是物件導向程式設計中常見的工具，但你可能會很容易誤用它們，導致物件導向程式設計原則的誤用或不完整應用：

- [Switch 語句](./Tool-Abusers/Switch-Statements)
- [被拒絕的遺贈](./Tool-Abusers/Refused-Bequest)
- [具有不同介面的替代類別](./Tool-Abusers/Alternative-Classes-Different-Interfaces)
- [臨時欄位](./Tool-Abusers/Temporary-Field)

### [變更阻礙者（Change Preventers）](./Change-Preventers/)

這些是使變更困難的氣味。使修改變得困難的程式碼：

- [發散式變更](./Change-Preventers/Divergent-Change)
- [霰彈式修改](./Change-Preventers/Shotgun-Surgery)
- [平行繼承層級](./Change-Preventers/Parallel-Inheritance-Hierarchies)
- [組合爆炸](./Change-Preventers/Combinatorial-Explosion)

### [可有可無者（Dispensables）](./Dispensables/)

可有可無者是不必要的東西，如果移除，會使程式碼更乾淨、更高效、更容易理解：

- [冗贅類別](./Dispensables/Lazy-Class)
- [推測性通用](./Dispensables/Speculative-Generality)
- [資料類別](./Dispensables/Data-Class)
- [重複程式碼](./Dispensables/Duplicated-Code)
- [註解](./Dispensables/Comments)
- [死程式碼](./Dispensables/Dead-Code)
- [古怪解決方案](./Dispensables/Oddball-Solution)

### [耦合者（Couplers）](./Couplers/)

它將物件綁定在一起，你永遠無法進入並取出一個在另一個上下文中使用。它們總是一起出現，全有或全無，或是類別之間的過度耦合：

- [功能羨慕](./Couplers/Feature-Envy)
- [不當親密](./Couplers/Inappropriate-Intimacy)
- [訊息鏈](./Couplers/Message-Chains)
- [中間人](./Couplers/Middle-Man)
- [不雅暴露](./Couplers/Indecent-Exposure)

### [其他氣味](./Other-Smells)

不完全適合主要類別但仍值得理解的程式碼氣味。

## 如何使用本指南

1. **識別氣味** - 學習識別有問題的模式
2. **理解影響** - 了解為什麼每個氣味是有問題的
3. **應用重構技術** - 使用系統性的方法來改進程式碼
4. **驗證改進** - 確保重構在改進設計的同時維持功能

## 關鍵原則

- **讓變更變得容易，然後進行這個容易的變更**
- **程式碼應該為人類閱讀而編寫**
- **重構在改進設計的同時保持行為**
- **小而漸進的改進比大規模重寫更好**

## 參考資料

- [Get a Whiff of This - Sandi Metz](https://youtu.be/PJjHfa5yxlU)
- [Refactoring: Improving the Design of Existing Code - Martin Fowler](https://martinfowler.com/books/refactoring.html)
- [Refactoring Guru](https://refactoring.guru/)
- [Industrial Logic Refactoring Catalog](https://www.industriallogic.com/xp/refactoring/catalog.html)
- [快速參考指南](./Quick-Reference)
