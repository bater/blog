# Day 18. Change Preventers > Shotgun Surgery 散彈槍手術

Created: July 29, 2023 9:49 PM

## 氣味的徵兆

這個程式碼氣味是我最喜歡的氣味名稱之一，因為它生動地描述了當我們試圖修改具有這種味道的程式碼時會發生什麼情況。顧名思義，就像我們朝著的程式碼射上一發「散彈槍」，發散的子彈將會導致許多小修改，散落在專案各處，難以控制損害範圍也難以瞄準。當我們嘗試僅只進行單一變動時，無可避免會需要同時修改許多不同的其他片段。

這種氣味與「發散式修改」正好相反：「散彈槍手術」是單一變動引起了許多小變更，而「發散式修改」則是單一類別會被許多外在變動影響。

## 氣味的原因

以下是為什麼「散彈槍手術」被認為有問題的原因：

- **違反開放/封閉原則（Open/Closed Principle, OCP）：** OCP是物件導向設計的SOLID原則之一，它指出每個程式碼實體（Class, Module, Component）都應該對擴充保持開放、但對修改保持封閉。散彈槍手術這個氣味代表每次需要增加新功能或進行改動時，開發人員都被迫「打開」並修改現有程式碼，沒有辦法對修改保持「封閉」，這增加了導致錯誤並破壞系統穩定性的風險。
- **高度耦合：** 「耦合（**Coupling**）」是一種衡量一個類別或模塊與另一個之間的連接或相依性程度的方式。當您遭遇到散彈槍手術氣味時，通常表示程式碼中的不同部分之間存在高度耦合。這會讓我們牽一髮而動全身，每一段程式碼之間彷彿被膠水緊緊黏在一起。
- **高複雜性：** 在多個位置進行頻繁改動可能會使程式碼變得更加複雜且難以理解。這種複雜性可能會妨礙除錯、測試和理解程式碼的能力。
- **低可維護性：** 當一個小的更改需要在多個地方進行更新時，增加了導致錯誤的風險。開發人員可能會忘記更新其中一個受影響的區域，導致不一致和錯誤。這也使得理解程式碼變得更加困難，因為您需要追蹤可能發生更改的所有不同位置，徒然增加維護的困難度。
- **增加的開發時間：** 散彈槍手術會顯著地減緩開發過程。每個小的更改都變成了一項耗時的任務，因為開發者必須同時在多個地方進行這些修改，這可能導致效率低下和耗費更多開發時間。

## 對應氣味的重構手段

- Move Method
- Move Field
- Inline Class

### Move Method / Move Field 搬移方法/ 搬移屬性

當您在程式碼中遇到「散彈槍手術」的氣味時，表示應該待在相同地方的高相關程式碼卻四散分佈在整個程式碼專案中。為了解決這個問題，我們可以利用如「移動方法」或「移動屬性」，來將現有的行為整合到相同一個類別中。如果不存在合適的類別，也可以新增一個類別。

最終，我們可以將手中的「散彈槍」轉變為「狙擊步槍」，用一發子彈精確地擊中目標，沒有多餘無謂的傷害。

### Inline Class 內聯類別

如果將程式碼移到同一個類別後，原始的類別幾乎變得空無一物，我們應該考慮使用「Inline Class」技術來去除冗餘的類別。內聯類別是「抽出類別（Extract Class）」重構的相反手法，有助於我們消除不必要的類別。

---

> Making a single change requires simultaneous changes to multiple locations.
> 

## Sign of Smell

Shotgun Surgery, also known as Solution Sprawl, is one of my favorite code smells because its name vividly describes what happens when we try to modify code. In other words, it's like firing a "shotgun" at your codebase, resulting in scattered and widespread changes. When we try to make a single change, we often need to modify multiple pieces of code at the same time.

This smell is the opposite of "Divergent Change". When we compare these two smells, "Shotgun Surgery" causes many changes, while "Divergent Change" is caused by many changes.

## Reason of Smell

Here's why "Shotgun Surgery" is considered bad and problematic:

- **Violation of the Open/Closed Principle (OCP):** The OCP is one of the SOLID principles of object-oriented design, and it states that every code entity should be open for extension but closed for modification. Each time you need to add new behavior or make a change, you're forced to open and alter existing code, which increases the risk of introducing bugs and destabilizing the system.
- **High Coupling:** Coupling is a measure of how closely one class or module is connected to or dependent on another. When you have Shotgun Surgery, it often indicates high coupling between different parts of your codebase.
- **Complexity**: Frequent changes in multiple locations can make the code more complex and harder to follow. This complexity can hinder the ability to debug, test, and understand the code.
- **Maintainability**: When a small change requires updates in multiple places, it increases the risk of introducing errors. Developers might forget to update one of the affected areas, leading to inconsistencies and bugs. It also makes it harder to understand the code since you need to keep track of all the different places where a change might occur.
- **Increased Development Time**: Shotgun Surgery can significantly slow down the development process. Each small change becomes a time-consuming task because you have to make those changes in multiple locations, which can lead to inefficiency and increased development time.

## Refactoring Recipes

- Move Method
- Move Field
- Inline Class
- Move Creation Knowledge to Factory

### Move Method / Move Field

When you encounter the Shotgun Surgery smell in your codebase, it indicates that the related code that should be grouped together is scattered throughout the codebase. To address this, we can utilize refactoring techniques such as Move Method or Move Field to consolidate the existing behaviors in one class.

In the end, we can transition from a Shotgun to a Rifle, hitting our target precisely with a single shot.

### Inline Class

If moving code to the same class leaves the original class almost empty, we should consider applying the Inline Class technique to avoid redundant code. Inline Class is the opposite of Extract Class refactoring and helps us eliminate unnecessary classes. 

### Reference

[https://refactoring.guru/smells/shotgun-surgery](https://refactoring.guru/smells/shotgun-surgery)

[https://luzkan.github.io/smells/shotgun-surgery](https://luzkan.github.io/smells/shotgun-surgery)