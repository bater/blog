---
sidebar_position: 4
title: 平行繼承層級
---

# 平行繼承層級

你有沒有曾經在系統的某一部分添加一個新的子類別，結果發現你立即必須在另一個繼承樹中添加一個對應的子類別？感覺就像你看到了雙重影像。如果你有一個 `Car` 層級和一個 `CarDriver` 層級，每次你添加一個 `Tesla` 你也必須添加一個 `TeslaDriver`，你就是在處理平行繼承層級。

這個氣味實際上是霰彈式修改的一個特例。問題在於兩個層級緊密耦合。你無法改變一個而不改變另一個。隨著時間推移，這導致程式碼庫中添加一個簡單的功能需要一個檢查清單：「我是否在這裡添加了對應的類別？還有這裡？還有這裡？」

## 氣味的跡象

- 每次你創建類別 `A` 的子類別時，你發現自己被迫創建類別 `B` 的子類別。
- 兩個層級中類別名稱的前綴或後綴經常匹配（例如，`CivilEngineer` 和 `CivilJob`，`MechanicalEngineer` 和 `MechanicalJob`）。

## 氣味的原因

**高耦合**：兩個層級依賴彼此的結構。
**程式碼重複**：通常，「平行」邏輯只是在做類似的事情或持有應該在一起的相關資料。
**維護開銷**：它使擴展系統的工作量加倍。

## 重構配方

- 移動方法
- 移動欄位

### 移動方法 / 移動欄位

要修復這個氣味，我們想要合併層級或至少使一個依賴另一個，而不需要子類別化。一般策略是將方法和欄位從一個層級移到另一個，直到第二個層級實際上消失或成為一個單一類別。

**之前：**
```java
// 層級 1：領域物件
abstract class Engineer {}
class CivilEngineer extends Engineer {}
class ComputerEngineer extends Engineer {}

// 層級 2：與它們相關的動作/描述
abstract class JobDescription {
    abstract String getTitle();
}
class CivilJobDescription extends JobDescription {
    String getTitle() { return "土木工程"; }
}
class ComputerJobDescription extends JobDescription {
    String getTitle() { return "電腦工程"; }
}
```

**之後：**
```java
// 合併/簡化
abstract class Engineer {
    abstract String getJobTitle();
}

class CivilEngineer extends Engineer {
    String getJobTitle() { return "土木工程"; }
}

class ComputerEngineer extends Engineer {
    String getJobTitle() { return "電腦工程"; }
}
// JobDescription 層級現在消失了。
```

透過將 `getJobTitle` 邏輯（方法）移到 `Engineer` 類別中，我們消除了對整個 `JobDescription` 層級的需求。

## 參考資料

- [Refactoring Guru - Parallel Inheritance Hierarchies](https://refactoring.guru/smells/parallel-inheritance-hierarchies)
- [Martin Fowler - Parallel Inheritance Hierarchies](https://refactoring.com/catalog/parallelInheritanceHierarchies.html)
