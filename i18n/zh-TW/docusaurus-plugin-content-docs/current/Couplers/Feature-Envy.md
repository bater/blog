---
sidebar_position: 2
title: 功能羨慕
---

# 功能羨慕

你有沒有遇過一個似乎對你的家庭比對自己的家庭更感興趣的人？他們知道你表親的生日、你阿姨最喜歡的顏色，還有你狗的病歷。在程式碼的世界裡，我們稱之為「功能羨慕」。

功能羨慕發生在一個類別中的方法似乎對另一個類別的資料比對自己的資料更感興趣時。這就像一個方法希望自己在別處。它不斷地向另一個物件伸手，要求 getter，抓取欄位，並做那些真正屬於那個其他物件的計算。

## 氣味的跡象

- 一個方法存取另一個物件的資料比存取自己的資料更多。
- 你在一個不是 `Order` 的類別中看到重複的呼叫，如 `order.getPrice()`、`order.getTax()`、`order.getDiscounts()`。
- 這個方法感覺就像只是在操作另一個物件的欄位。

## 氣味的原因

**資料和邏輯分離**：經常發生在資料被放在「資料類別」（只有 getter 和 setter）而邏輯被放在「服務類別」時。這破壞了封裝。

**演進**：程式碼會演進，有時一個開始在正確位置的方法會隨著新功能的添加而漂移，最終變得與不同的類別耦合更緊密。

## 重構配方

- 移動方法
- 提取方法

### 移動方法

如果一個方法完全迷戀另一個類別，就直接把它移過去。

**之前：**
```java
class Customer {
    private String address;
    // ...
}

class Order {
    private Customer customer;

    // 這個方法只使用 customer 資料！
    public String getCustomerPrintableAddress() {
        String address = customer.getAddress();
        if (address == null) return "無地址";
        return "地址: " + address;
    }
}
```

**之後：**
```java
// 邏輯移到資料所在的地方
class Customer {
    private String address;

    public String getPrintableAddress() {
        if (address == null) return "無地址";
        return "地址: " + address;
    }
}

class Order {
    private Customer customer;

    public String getCustomerPrintableAddress() {
        return customer.getPrintableAddress();
    }
}
```

### 提取方法

如果只有方法的*一部分*有功能羨慕，提取那部分到一個新方法，然後把那個新方法移到目標類別。

## 參考資料

- [Refactoring Guru - Feature Envy](https://refactoring.guru/smells/feature-envy)
- [Martin Fowler - Feature Envy](https://refactoring.com/catalog/featureEnvy.html)
