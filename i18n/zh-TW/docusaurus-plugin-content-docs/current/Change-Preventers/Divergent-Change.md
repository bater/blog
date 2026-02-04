---
sidebar_position: 2
title: 發散式變更
---

# 發散式變更

你知道那種感覺嗎？當你在處理一個類別時，似乎每次你得到一個新需求——無論是資料庫、UI 還是業務邏輯——你最終都在修改*同一個*檔案？這就像那個類別把手指伸進太多的派裡了。

認識發散式變更。這是當一個模組經常因為不同的原因以不同的方式被改變時發生的程式碼氣味。如果你看一個類別然後說：「好吧，如果我想添加一個新的產品類型，我必須改變這三個方法；但如果我想改變資料庫結構，我必須改變*另外*這四個方法」，你就有發散式變更了。

它違反了單一職責原則，並且讓開發者抓狂，因為你無法觸碰系統的一部分而不涉入與你試圖完成的事情無關的程式碼。

## 氣味的跡象

你發現自己因為多個不相關的原因改變同一個類別。類別內的不同方法群組似乎彼此獨立地改變。例如，「如果我添加一個新的付款類型，我改變這個類別。如果我改變日誌格式，我也改變這個類別。」

## 氣味的原因

**單一職責違規**：這個類別做太多事情。它處理業務邏輯、資料持久化，甚至可能還有一些格式化。

**程式碼重複**：通常，混合職責會導致複製貼上程式碼，因為適當的抽象沒有到位。

**維護困難**：這使系統變得脆弱。你可能在試圖更新業務規則時破壞持久化層。

**測試挑戰**：你必須模擬所有東西（資料庫、網路等）才能測試一個簡單的計算。

## 重構配方

- 提取類別
- 提取超類別 / 子類別

### 提取類別

當一個類別做兩件不同的事情時，將它拆分成兩個類別。如果需要，使用委派來保持它們的連接。

**之前：**
```java
// 一個處理使用者資料和報表格式化的類別
class User {
    private String name;
    private String dbConnectionString;

    public void saveUser() {
        // 使用 dbConnectionString 的 SQL 程式碼
        System.out.println("正在將使用者儲存到資料庫...");
    }

    public String generateReport() {
        // 報表的格式化程式碼
        return "報表：" + name;
    }
}
```

**之後：**
```java
// 分離的職責
class User {
    private String name;
    private UserRepository repository;

    public User(String name) {
        this.name = name;
        this.repository = new UserRepository();
    }

    public String getName() { return name; }

    public void save() {
        repository.save(this);
    }
}

class UserRepository {
    public void save(User user) {
        // SQL 程式碼
        System.out.println("正在將 " + user.getName() + " 儲存到資料庫...");
    }
}

class UserReport {
    public String generate(User user) {
        return "報表：" + user.getName();
    }
}
```

透過提取 `UserRepository` 和 `UserReport`，`User` 類別現在專注於其核心資料，而持久化和格式化則在其他地方處理。

## 參考資料

- [Refactoring Guru - Divergent Change](https://refactoring.guru/smells/divergent-change)
- [Martin Fowler - Divergent Change](https://refactoring.com/catalog/divergentChange.html)
