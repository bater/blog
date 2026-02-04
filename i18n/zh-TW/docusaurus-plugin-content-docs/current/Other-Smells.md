---
sidebar_position: 6
title: 不完整的函式庫類別
---

# 不完整的函式庫類別

我們都喜歡第三方函式庫。它們節省我們的時間，通常經過良好測試，並防止我們重新發明輪子。但有時候，他們給我們的輪子缺少一根輻條。

你找到一個能滿足你 99% 需求的函式庫，但那一個關鍵的方法——如 `GetDateNextTuesday()`——卻是缺失的。你無法更改函式庫，因為它是唯讀的或由套件管理器管理。所以，你最終在自己的程式碼中編寫原始、複雜的邏輯來彌補這個差距。這就是不完整的函式庫類別氣味。

這很煩人，但你不必忍受分散的變通方法。

## 氣味的跡象

- 你發現自己在多個地方圍繞一個函式庫類別編寫相同的輔助邏輯。
- 你希望能夠擴展函式庫類別，但你不能（或沒有這樣做）。
- 你的程式碼充斥著將函式庫類別實例作為第一個參數的靜態輔助方法。

## 氣味的原因

**未完成的函式庫**：函式庫作者沒有預見到你的特定使用情況。
**鎖定的程式碼**：你無法直接修改函式庫原始碼（例如，它是一個編譯的 JAR 或遠端模組）。

## 重構配方

- 引入外來方法
- 引入本地擴展

### 引入外來方法

如果你只需要一兩個方法，在你的客戶端類別中創建一個看起來像屬於函式庫類別的方法。由於你不能將它添加到函式庫，你將函式庫實例作為第一個參數傳遞。

**之前：**
```java
class Report {
    void send() {
        Date nextDay = new Date(previousDate.getYear(), previousDate.getMonth(), previousDate.getDate() + 1);
        // ...
    }
}
```

**之後：**
```java
class Report {
    void send() {
        Date nextDay = nextDay(previousDate);
        // ...
    }

    // 這個方法「應該」在 Date 類別上
    private static Date nextDay(Date arg) {
        return new Date(arg.getYear(), arg.getMonth(), arg.getDate() + 1);
    }
}
```

### 引入本地擴展

如果你需要很多方法或需要覆寫行為，創建一個擴展函式庫類別（繼承）或包裝它（組合）的新類別。

**子類別（繼承）：**
```java
class MfDateSub extends Date {
    public MfDateSub(String dateString) {
        super(dateString);
    }
    public Date nextDay() {
        return new Date(getYear(), getMonth(), getDate() + 1);
    }
}
```

**包裝器（組合）：**
```java
class MfDateWrap {
    private Date original;

    public MfDateWrap(Date original) {
        this.original = original;
    }

    // 委派現有方法
    public int getYear() {
        return original.getYear();
    }

    // 添加新方法
    public Date nextDay() {
        return new Date(original.getYear(), original.getMonth(), original.getDate() + 1);
    }
}
```

## 參考資料

- [Refactoring Guru - Incomplete Library Class](https://refactoring.guru/smells/incomplete-library-class)
- [Martin Fowler - Incomplete Library Class](https://refactoring.com/catalog/incompleteLibraryClass.html)
