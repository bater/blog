---
sidebar_position: 3
title: 霰彈式修改
---

# 霰彈式修改

想像一下發射霰彈槍。彈丸四處散落，一槍擊中多個目標。這正是當你試圖修改患有霰彈式修改的程式碼時的感覺。你只想改變一件簡單的事情——也許是資料庫欄位名稱或稅金計算規則——但你發現自己必須訪問 15 個不同的類別來進行小的、煩人的更新。

這是乏味的、容易出錯的、令人沮喪的。如果你錯過了這 15 個地方中的任何一個，你的應用程式可能會崩潰或行為異常。與「發散式變更」不同（一個類別承受太多變更），「霰彈式修改」是當一個變更波及（或需要修復）許多類別時。

## 氣味的跡象

- 你進行一個單一的邏輯變更（例如，「添加一個新的狀態碼」），你必須更新多個不同的類別。
- 變更很小且散布在整個程式碼庫中。
- 你經常忘記一兩個地方，導致 bug。

## 氣味的原因

**高耦合**：類別與特定細節耦合太緊密。如果許多類別知道資料庫表的內部結構，當該表改變時它們都會崩潰。

**程式碼重複**：邏輯（如驗證或格式化）在許多檔案中重複，而不是被集中化。

**違反單一職責**：單一業務規則的職責被分散在多個類別中。

## 重構配方

- 移動方法
- 移動欄位
- 內聯類別

### 移動方法 / 移動欄位

如果你看到相同的邏輯或資料使用散布各處，將它們全部移到一個符合該職責的單一類別中。如果沒有這樣的類別存在，就創建一個！

**之前：**
```java
class Account {
    void check() {
        if (email.contains("@") && email.contains(".")) { ... }
    }
}
class Order {
    void validate() {
        if (email.contains("@") && email.contains(".")) { ... }
    }
}
```

**之後：**
```java
class EmailValidator {
    public static boolean isValid(String email) {
        return email.contains("@") && email.contains(".");
    }
}

class Account {
    void check() {
        if (EmailValidator.isValid(email)) { ... }
    }
}
```

### 內聯類別

有時職責的執行分散在幾個太小或做得不夠多的類別中。將它們合併成一個類別（內聯）可以集中邏輯，避免需要在檔案之間跳來跳去。

## 參考資料

- [Refactoring Guru - Shotgun Surgery](https://refactoring.guru/smells/shotgun-surgery)
- [Martin Fowler - Shotgun Surgery](https://refactoring.com/catalog/shotgunSurgery.html)
