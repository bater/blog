---
sidebar_position: 6
title: 不雅暴露
---

# 不雅暴露

我們教導孩子要遮蓋，我們也應該教導程式碼做同樣的事。「不雅暴露」發生在一個類別或方法揭露得比應該的更多時。它涉及將方法、欄位或類別設為 `public`，而它們實際上應該是 `private` 或 `protected`。

每次你把某個東西設為公開，你就是在與世界其他部分（或至少是程式碼庫的其餘部分）簽訂一份合約，說：「我承諾支援這個方法/欄位。」如果你暴露你的內部，其他開發者*會*使用它們，然後你就*無法*在不破壞他們程式碼的情況下改變它們。

## 氣味的跡象

- 欄位是 `public`（除非它們是常數）。
- 僅在內部使用的輔助方法被標記為 `public`。
- 用於內部套件使用的類別暴露給整個專案。

## 氣味的原因

**懶惰**：「我就把它設為公開這樣我可以輕鬆測試」或「我需要從另一個地方呼叫它，設為公開最快。」
**缺乏理解**：沒有完全掌握封裝或語言的特定可見性修飾符。

## 重構配方

- 封裝欄位
- 降低可見性（改變存取修飾符）

### 封裝欄位

永遠不要把欄位設為公開。總是提供 getter 和 setter（而且只在必要時）。

**之前：**
```java
class Student {
    public int score; // 任何人都可以把這改成 -100
}
```

**之後：**
```java
class Student {
    private int score;

    public int getScore() {
        return score;
    }

    // 也許我們甚至不想要 setter！
    public void addPoints(int points) {
        if (points > 0) this.score += points;
    }
}
```

### 降低可見性

如果一個方法只在類別內部使用，把它設為 `private`。如果它只在套件中使用，把它設為 package-private（Java 中的預設值）。

**之前：**
```java
public class OrderProcessor {
    // 這是一個內部輔助方法，為什麼是公開的？
    public void validateInternalState() { ... }

    public void process() {
        validateInternalState();
        // ...
    }
}
```

**之後：**
```java
public class OrderProcessor {
    private void validateInternalState() { ... }

    public void process() {
        validateInternalState();
        // ...
    }
}
```

## 參考資料

- [Refactoring Guru - Encapsulate Field](https://refactoring.guru/refactoring/encapsulate-field)
