---
sidebar_position: 3
title: 不當親密
---

# 不當親密

「不當親密」聽起來很聳動，不是嗎？在程式碼中，它指的是兩個類別對彼此的私生活了解得太多。它們花太多時間在一起，存取彼此的私有欄位，並且普遍忽視封裝的邊界。

良好的物件導向設計是關於禮貌的。類別應該透過定義良好的公開介面互動。當一個類別開始伸手進入另一個類別的內部資料，或者當一個子類別對其父類別的實作了解太多時，你就有了不當親密。這使得程式碼變得脆弱，因為改變一個類別幾乎肯定會破壞另一個。

## 氣味的跡象

- 類別有不必要的雙向關聯（A 知道 B，B 也知道 A）。
- 子類別直接存取其父類別的私有或受保護欄位（如果語言允許），或嚴重依賴特定的實作細節。
- 一個類別頻繁存取另一個類別的內部欄位。

## 氣味的原因

**過度合作**：有時開發者讓兩個類別一起成長，結果它們變得糾纏在一起。
**懶惰**：通常將欄位設為 `public` 或 `package-private` 以便快速存取比設計一個適當的介面更容易。

## 重構配方

- 移動方法 / 移動欄位
- 將雙向關聯改為單向
- 用委派替換繼承

### 移動方法 / 移動欄位

如果類別 A 與類別 B 親密是因為它使用了類別 B 的欄位，也許那些欄位（或使用它們的方法）實際上屬於類別 A（反之亦然）。移動這些部分來分離它們。

**之前：**
```java
class Wallet {
    public int cash;
    public CreditCard card;
}

class Person {
    Wallet wallet;

    void makePayment(int amount) {
        // 直接存取 Wallet 的內部
        if (wallet.cash >= amount) {
            wallet.cash -= amount;
        } else {
            wallet.card.charge(amount);
        }
    }
}
```

**之後：**
```java
class Wallet {
    private int cash;
    private CreditCard card;

    // 封裝行為
    public void pay(int amount) {
        if (cash >= amount) {
            cash -= amount;
        } else {
            card.charge(amount);
        }
    }
}

class Person {
    Wallet wallet;

    void makePayment(int amount) {
        wallet.pay(amount);
    }
}
```

### 將雙向關聯改為單向

如果類別 A 和類別 B 都互相引用，看看是否可以切斷其中一個連結。B 真的需要知道 A 嗎？

## 參考資料

- [Refactoring Guru - Inappropriate Intimacy](https://refactoring.guru/smells/inappropriate-intimacy)
- [C2 Wiki - Inappropriate Intimacy](https://wiki.c2.com/?InappropriateIntimacy)
