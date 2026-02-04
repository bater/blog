---
sidebar_position: 4
title: 死碼
---

# 死碼

「死碼」是永遠不會被執行的程式碼。它就像你房子裡多年前砌起來然後忘記的一個房間。它消耗編譯時間，困惑新開發者（「這個 `calculateOldTax()` 方法是用來做什麼的？」），並讓 IDE 變得雜亂。

它表現為未使用的方法、變數、參數，甚至整個類別。

## 氣味的跡象

- 一個方法被定義但從未被呼叫。
- 一個變數被賦值但從未被讀取。
- 一個參數被傳遞給函式但在內部從未被使用。
- 永遠無法到達的複雜條件分支（例如，`if (true == false)`）。

## 氣味的原因

**需求改變了**：你停止使用一個功能，但你忘記刪除它的程式碼。
**過時的修復**：來自以前 bug 修復的程式碼，不再相關。
**恐懼**：「我最好不要刪除這個，我可能某天會需要它！」（這就是版本控制的用途！）。

## 重構配方

- 分而治之
- 移除參數

### 分而治之（直接刪除它！）

死碼的主要修復是刪除。現代 IDE 非常擅長找到未使用的引用。信任它們。如果它是灰色的，就刪除它。

**之前：**
```java
public void doSomething(int x, int unused) {
    int y = x + 10;
    // int z = y * 2;  <-- 被註釋掉的程式碼也是死碼！
    System.out.println(y);
}
```

**之後：**
```java
public void doSomething(int x) {
    int y = x + 10;
    System.out.println(y);
}
```

### 移除參數

如果一個方法參數不再被使用，從簽名中移除它。

**之前：**
```java
void printDate(Date date, boolean oldFormat) {
    System.out.println(date.toString());
}
```

**之後：**
```java
void printDate(Date date) {
    System.out.println(date.toString());
}
```

## 參考資料

- [Refactoring Guru - Dead Code](https://refactoring.guru/smells/dead-code)
- [C2 Wiki - Dead Code](https://wiki.c2.com/?DeadCode)
