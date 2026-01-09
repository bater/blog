# Day 29. Couplers > Feature Envy 依戀情節

Created: July 29, 2023 9:52 PM

## 氣味的徵兆

當一個方法過於貪心依戀屬於另外一個類別的屬性或資料時，稱為「依戀情節（Feature Envy）」的程式碼氣味。這個氣味代表了該方法所需要資料或是實作行為，應該被定義在更適當的位置。在這個氣味中，最常見的外部依戀是屬於其他類別的資料。另外一個相似的程式碼氣味是「Data Envy」（資料依戀），它指涉方法或類別過度依賴於另外一個物件的資料，但這個氣味並沒有被廣泛接受為一種不同的獨立的氣味，通常會被視為是「依戀情節」的一部分。

依戀情節指的是一個**方法**過度依賴於另一個類別；但如果一個**類別**過度依賴於另一個類別，則屬於「不適當的親密類別」氣味，會在下一篇介紹到。

## 氣味的原因

- **高度耦合：**依戀情節增加了類別之間的耦合，使程式碼更難以單獨被維護或修改。一個方法對另一個類別的過度依賴可能導致每次需要改動時，都不得不同時改動許多其他類別，猶如「散彈槍手術（Shotgun Surgery）」。
- **低內聚度：**依戀情節通常是「低內聚」的其中一種症狀。當一個類別內的方法需要時常訪問另外一個類別，才能夠執行與該類別本身職責相關的操作。這些方法並沒有在自身內部適當封裝這些操作，就會出現這種情況。
- **違反封裝原則：**當一個方法需要經常訪問另一個類別的內部實體時，這違反了封裝原則。可能導致資料不一致或是錯誤產生。
- **貧血領域模型：**依戀情節通常表示當前方法所在的類別出現「貧血領域模型（**Anemic Domain Models**）」的情況。這是因為它暗示與特定功能相關的行為分散在多個不同類別中，而不是被封裝在原本方法所在的類別中。
- **違反**「**直說勿問原則」：**直說勿問原則建議我們應該直接告訴物件要進行什麼操作，而不是透過詢問查詢資料後，才據此資料判斷決策要執行什麼內容。依戀情節通常發生在一個物件不斷要求從另一個類別獲取資料的情況下，違反了此原則。
- **迪米特法則：**迪米特法則也稱為「最少知識原則」，揭示了一個類別應該對另一個類別的內部結構保持最少的了解。依戀情節發生在一個方法過度依賴並瞭解另一個類別的內部實作，而不是通過明確的界面來進行互動。

## 對應的重構技巧

- Extract Method
- Move Method
- Move Field

### 抽出方法 Extract Method

首先，識別出方法中過度依賴屬於其他類別的屬性或方法的方法。然後，將這段程式碼抽出獨立成一個新的方法，放在擁有所需資料或屬性的類別當中。這個新方法應該封裝與所需實作相關的邏輯，以便管理上下文脈絡和理解。

### 移動方法 Move Method

為了處理依戀情節氣味，我們可以將對另一個類別的資料或屬性感到嫉妒的方法移動到實際擁有這些資料的類別當中。透過重新安排方法的對應類別位置來追求更好的職責相符配置。

### 移動屬性 Move Field

這個重構技巧是指在一個類別和另一個更相關的類別之間搬移欄位、屬性或變數。

為了適當消除依戀情節氣味，我們可以考慮將另一個類別經常訪問的欄位移動到在業務邏輯上更適合於它的類別中。這將確保資料被更適當的類別封裝和管理。

---

## Sign of Smell

When a method is envious and contains behavior that rightly belongs to another class, it is considered a smell called Feature Envy. This smell indicates that the feature could be defined in a better location. The most common focus of envy in this smell is the data. Another similar code smell is Data Envy, which focuses on the data of another object but is not widely accepted as an independent smell.

"Feature Envy" refers to a **method** that excessively depends on another class. If a **class** excessively depends on another class, please refer to "Inappropriate Intimacy".

## Reason of Smell

- **High Coupling**: Feature envy increases coupling between classes, making code harder to maintain and modify. Excessive dependence in one method on another class may require corresponding changes, leading to a fragile codebase.
- **Low Cohesion**: ****Feature envy is often a symptom of low cohesion. It occurs when a method in a class accesses another class to perform actions that are related to a different responsibility, instead of encapsulating those actions within itself.
- **Violation of Encapsulation**: Feature envy occurs when one method frequently accesses the internals of another class, violating encapsulation. This can result in data inconsistencies and bugs.
- **Anemic Domain Models**: ****Feature envy often indicates the presence of anemic domain models. This is because it implies that behavior related to a specific feature is spread out across multiple classes, instead of being encapsulated within the domain model where it logically belongs.
- **Tell, Don't Ask**: ****The principle of "Tell, Don't Ask" suggests instructing objects to perform actions instead of constantly querying data and making decisions based on it. Feature envy often occurs when an object repeatedly requests data from another class.
- **Law of Demeter**: The Law of Demeter, also called the "principle of least knowledge," states that a class should have limited knowledge of another class's internal structure. Feature envy happens when a method excessively relies on and knows about another class's internals, instead of interacting through well-defined interfaces.

## Refactoring Recipes

- Extract Method
- Move Method
- Move Field

### Extract Method

First, identify any code in the method that excessively accesses properties or methods of another class. Then, extract this code into a new method within the class that owns the data or behavior.

This new method should encapsulate the logic related to the desired feature, making it easier to manage and understand.

### Move Method

To address Feature Envy, move the method that is envious of another class's features to the class that actually owns those features. This reorganizes the code and assigns responsibilities more appropriately.

### Move Field

The "Move Field" refactoring skill involves transferring a field (property or variable) from one class to another when it is more closely related to the latter class.

To address Feature Envy, consider relocating a field that another class frequently accesses to the class where it logically belongs. This will ensure that the data is encapsulated and managed by the appropriate class.

### Reference

[https://wiki.c2.com/?FeatureEnvySmell](https://wiki.c2.com/?FeatureEnvySmell)

[https://code-smells.com/couplers/feature-envy](https://code-smells.com/couplers/feature-envy)

[https://refactoring.guru/smells/feature-envy](https://refactoring.guru/smells/feature-envy)

[https://github.com/troessner/reek/blob/master/docs/Feature-Envy.md](https://github.com/troessner/reek/blob/master/docs/Feature-Envy.md)

[https://devlead.io/DevTips/FeatureEnvy](https://devlead.io/DevTips/FeatureEnvy)