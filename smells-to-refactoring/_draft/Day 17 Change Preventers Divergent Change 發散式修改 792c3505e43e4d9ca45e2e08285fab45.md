# Day 17. Change Preventers > Divergent Change 發散式修改

Created: July 29, 2023 9:49 PM

## 氣味的徵兆

「發散式修改（Divergent Change）」 有時候會與另一種乍看之下相似的氣味「散彈槍手術（Shotgun Surgery）」混淆，但實際上它們恰好是相反的氣味。

「Divergent Change」是指一個類別或模組可能因為許多不同的原因而需要改動。另一方面，「Shotgun Surgery」則是指為了進行單一修改，我們必須同時修改同一個類別中許多不同的地方。

簡言之，「Shotgun Surgery」觸發了多個修改，但「Divergent Change」則是由多個修改所觸發。

## 氣味的原因

- **違反單一職責原則（Single Responsibility Principle, SRP）**：SRP主張一個類別應該只有一個需要改變的原因，意味著它應該具有一個主要的職責。而發散式修改明顯的違反了這樣的原則，因此需要被迫時常被牽連修改。
- **程式碼重複**：發散式修改通常肇因於程式碼重複。如果專案中的不同部分對同一模組進行類似的修改，這代表著這些功能與行為應該抽出分離為不同的模組或類別，以避免冗餘。
- **缺乏封裝（Encapsulation）**：「封裝」是物件導向程式語言中的重要基本概念。當一個類別或模組存在「發散式修改」氣味時，這代表著它可能並未適當地「封裝」其職責，而導致抽象和關注點分離的崩潰。
- **脆弱的程式碼**：由於程式碼的一處變更可能影響無關的部分，因此難以預測修改的影響和副作用。這將會使得專案內的程式碼變得脆弱，使其在進行改動時更容易出現難以預期的行為。
- **可維護性**：當一個類別或模組負責多個不相關的行為或功能時，對其中一處的修改都可能無意中影響其他部分。這增加了維護專案的複雜性與提高難度。因為開發者需要更謹慎，才能夠避免引發錯誤或意外的副作用。
- **測試困難**：具有這個氣味的程式碼編寫測試可能會更加具有挑戰。因為需要廣泛的測試覆蓋率，來確保類別或模組的所有不同職責與行為在改動後都能正確運作，符合預期。

## 對應氣味的重構手段

### Extract Class 抽出類別

當我們透過氣味注意到目前的程式碼很可能已經違反了單一職責原則（SRP）時，這表示該類別具有多於一個以上的職責。最好的做法是將額外的職責與不相關行為拆分為另一個獨立的新類別。這樣可以確保我們可以保持類別與模組中的程式碼始終維持簡潔和乾淨。

### Extract Superclass / Extract Subclass 抽出父類別 / 抽出子類別

在面對「發散式修改」氣味中，當我們發現不同類別之間存在共通的方法或行為時，我們也可以考慮透過「繼承」關係來共用這些相同的部分，而在類別本身只留下不同之處。根據繼承的上下階層關係，我們可以分別考慮使用「抽出父類別」或是「抽出子類別」來進行重構。

---

## Sign of Smell

"Divergent Change" is sometimes confused with another related code smell called "Shotgun Surgery," but it is actually the opposite smell.

"Divergent Change" is a class or a module that might be changed for many different reasons all the time. On the other hand, “Shotgun Surgery” is, to make one single change, we have to change many different places at the same time.

In short, “Shotgun Surgery” triggers many changes, but “Divergent Change” is triggered by many changes.

## Reason of Smell

- **Violates the Single Responsibility Principle (SRP):** The SRP states that a class should have only one reason to change, meaning it should have a single responsibility.
- **Code Duplication:** Divergent Change often leads to code duplication. If different parts of the codebase are making similar changes to the same module, it's a sign that functionality should be separated into distinct modules or classes to avoid redundancy.
- **Lack of Encapsulation:** Encapsulation is a fundamental concept in object-oriented programming. When a class or module is undergoing divergent changes, it suggests that it may not be properly encapsulating its responsibilities, leading to a breakdown in the abstraction and separation of concerns.
- **Code Fragility:** Since changes in one area of the code can affect unrelated parts, it becomes difficult to predict the impact of a modification. This makes the codebase fragile, making it more likely to break when changes are made.
- **Maintainability:** When a module is responsible for multiple concerns or functionalities, any change in one of these concerns can inadvertently affect the others. This increases the complexity of maintaining the codebase because developers need to be cautious not to introduce bugs or unintended side effects.
- **Testing Challenges:** Writing tests for a module that exhibits Divergent Change can be more complicated. It may require extensive test coverage to ensure that all the different aspects of the module are functioning correctly after changes.

## Refactoring Recipes

### Extract Class

When a code smell indicates that the current design may violate the Single Responsibility Principle (SRP), it means that the class has more than one responsibility. The recommended countermeasure is to split the extra responsibility into another independent class. This helps keep the target class simple and clean.

### Extract Superclass / Extract Subclass

If different classes exhibit the same behavior, we can consider combining them through inheritance, using other refactoring techniques such as Extract Superclass or Extract Subclass.

### Reference

[https://refactoring.guru/smells/divergent-change](https://refactoring.guru/smells/divergent-change)

[http://teddy-chen-tw.blogspot.com/2014/04/3long-parameter-list-divergent-change.html](http://teddy-chen-tw.blogspot.com/2014/04/3long-parameter-list-divergent-change.html)

補充Kent Beck說法

[https://www.facebook.com/91agile/posts/pfbid0cSUN3mpAffcySBPNzYZUjf4kmnHA2hLJrjfwVTd5PjZJrJyy43dPXcfS198GT2H6l](https://www.facebook.com/91agile/posts/pfbid0cSUN3mpAffcySBPNzYZUjf4kmnHA2hLJrjfwVTd5PjZJrJyy43dPXcfS198GT2H6l)