---
sidebar_position: 4
title: 介面不同的替代類別
---

# 介面不同的替代類別

這是「兩個類別做相同的事情但看起來不同」的花俏說法。

想像你的系統中有兩個類別：`EmailSender` 和 `Mailer`。一個有方法 `send(to, body)`，另一個有 `deliver(recipient, content)`。它們做完全相同的工作。但因為它們的介面不同，你無法輕易地互換它們。你無法使用多型。你被困住了，必須寫重複的程式碼來處理每一個。

## 氣味的跡象

- 兩個類別似乎執行相同的功能。
- 方法有不同的名稱或參數順序，但做相同的邏輯。

## 氣味的原因

**缺乏溝通**：兩個不同的開發者為相同的目的寫了兩個不同的類別。
**不一致的演進**：一個函式庫以一種方式更新，另一個以不同方式更新。

## 重構配方

- 重新命名方法
- 移動方法
- 提取超類別

### 重新命名方法

最簡單的第一步。如果 `Mailer` 有 `deliver()` 而 `EmailSender` 有 `send()`，重新命名其中一個使它們匹配。

**之前：**
```java
class AmazonCloud {
    void uploadFile(File f) { ... }
}
class GoogleCloud {
    void push(File f) { ... }
}
```

**之後：**
```java
class AmazonCloud {
    void upload(File f) { ... } // 重新命名
}
class GoogleCloud {
    void upload(File f) { ... } // 重新命名
}
```

現在簽名匹配了，你可以提取一個共同的介面 `CloudStorage` 並以多型方式對待它們！

### 移動方法

有時一個類別是「替代的」因為它只缺少另一個類別有的*一個*功能。移動方法直到它們真正相等，然後啟用多型。

## 參考資料

- [Refactoring Guru - Alternative Classes with Different Interfaces](https://refactoring.guru/smells/alternative-classes-with-different-interfaces)
