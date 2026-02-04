---
sidebar_position: 8
title: 投機通用性
---

# 投機通用性

「投機通用性」是識別「以防萬一」的程式碼。當你在程式碼中添加花俏的東西來處理*可能*在未來發生、但目前不存在的情況時，就是這種情況。

參數被添加到函式中，但總是傳遞相同的值。抽象類別被創建，但只有一個子類別。介面被定義，但只有一個實作。這是過度工程的極致表現。

> 「YAGNI：你不會需要它的。」

## 氣味的跡象

- 方法有未使用的參數。
- 看起來毫無意義的類別層級（單一子類別）。
- 方法名稱叫做 `processAnything`、`handleGenericInput`，而簡單的名稱就可以了。
- 處理「未來需求」的程式碼。

## 氣味的原因

**過度熱心**：「我敢打賭我們以後會需要這個，所以我現在就建構它來節省時間！」（劇透：它很少節省時間）。
**缺乏焦點**：專注於框架而不是眼前的業務問題。

## 重構配方

- 摺疊層級
- 內聯類別
- 移除參數
- 重新命名方法

### 摺疊層級

如果你有一個抽象類別 `AbstractAnimal` 但只有一個實際的動物 `Dog`，就合併它們。

**之前：**
```java
abstract class AbstractVehicle {
    abstract void drive();
}
class Car extends AbstractVehicle {
    void drive() { ... }
}
// 沒有其他車輛存在
```

**之後：**
```java
class Car {
    void drive() { ... }
}
```

### 移除參數

如果一個參數總是被傳遞為 `null` 或 `0` 或 `true`，就移除它。

**之前：**
```java
// "isTest" 在正式程式碼中總是 false
public void save(Data d, boolean isTest) { ... }
```

**之後：**
```java
public void save(Data d) { ... }
```

## 參考資料

- [Refactoring Guru - Speculative Generality](https://refactoring.guru/smells/speculative-generality)
- [Martin Fowler - Yagni](https://martinfowler.com/bliki/Yagni.html)
