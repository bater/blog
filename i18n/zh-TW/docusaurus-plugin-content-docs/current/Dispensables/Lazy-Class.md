---
sidebar_position: 7
title: 冗員類別
---

# 冗員類別

「冗員類別」是一個白吃白喝的傢伙。它是一個做得不夠多、不足以證明其存在價值的元件。也許它曾經很重要，但在重構之後，它失去了大部分職責。或者也許它是為了一個從未到來的未來功能而設計的。

你專案中的每個類別都會增加複雜性和維護成本。如果一個類別沒有發揮作用，它應該被解僱（或內聯）。

## 氣味的跡象

- 一個有很少方法或欄位的類別。
- 一個只被另一個類別使用且做得很少的類別。
- 一個沒有為其父類別添加任何新行為的子類別。

## 氣味的原因

**重構殘留物**：你將程式碼移出這個類別，留下它空空如也。
**過度設計**：你為一個從未被建構的「計劃中」功能創建了類別結構。

## 重構配方

- 內聯類別
- 摺疊層級

### 內聯類別

如果一個類別太小，將它合併到最常使用它的類別中。

**之前：**
```java
class Person {
    private Office office;
    public String getOfficeAreaCode() {
        return office.getAreaCode();
    }
}

class Office { // 冗員類別！
    private String areaCode;
    public String getAreaCode() { return areaCode; }
}
```

**之後：**
```java
class Person {
    private String officeAreaCode; // 合併到 Person
    public String getOfficeAreaCode() { return officeAreaCode; }
}
```

### 摺疊層級

如果一個子類別和超類別幾乎完全相同，就合併它們。

**之前：**
```java
class Employee { ... }
class Salesman extends Employee { } // 什麼都沒加？
```

**之後：**
```java
class Employee { ... } // 合併
```

## 參考資料

- [Refactoring Guru - Lazy Class](https://refactoring.guru/smells/lazy-class)
- [Martin Fowler - Lazy Class](https://refactoring.com/catalog/lazyClass.html)
