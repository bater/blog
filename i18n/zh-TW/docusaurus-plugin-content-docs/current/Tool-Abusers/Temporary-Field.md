---
sidebar_position: 5
title: 臨時欄位
---

# 臨時欄位

「臨時欄位」是類別內部只在特定演算法期間或在某些條件下設定和使用的變數。其餘時間，它坐在那裡是 `null` 或 0。

這令人困惑，因為物件應該代表一個完整的狀態。如果欄位 `result` 只在 `calculate()` 運行時有效，為什麼它是類別的欄位？這讓檢查物件的開發者感到困惑，並想知道，「為什麼 `result` 是 null？它壞了嗎？」

## 氣味的跡象

- 一個欄位大部分時間是 null。
- 一個方法不接受參數，但依賴在*不同*方法中發生的欄位驗證。
- 你必須在呼叫 `runAlgo()` 之前呼叫 `initAlgo()`。

## 氣味的原因

**過長參數列**：開發者試圖避免向輔助方法傳遞很多參數，所以他們只是把它們儲存為實例欄位（對類別來說是全域的）。

## 重構配方

- 提取類別
- 用方法物件替換方法

### 提取類別

如果臨時欄位一起用於特定操作，將它們和那個操作移到新類別中。

**之前：**
```java
class Order {
    // 這些只在「計算」期間使用
    private double tempTax;
    private double tempDiscount;

    public double calculateTotal() {
        tempTax = 0.1;
        tempDiscount = 0.5;
        // ... 使用欄位的複雜邏輯
        return result;
    }
}
```

**之後：**
```java
class Order {
    public double calculateTotal() {
        return new PriceCalculator(this).calculate();
    }
}

class PriceCalculator {
    private double tax;
    private double discount;
    private Order order;

    public PriceCalculator(Order order) {
        this.order = order;
    }

    public double calculate() {
        // 現在 "tax" 和 "discount" 是*這個*物件的永久欄位
        // 它們不再是 Order 的臨時欄位。
    }
}
```

### 用方法物件替換方法

類似於提取類別，這個技術將方法變成它自己的物件，所以局部變數變成那個新物件的欄位。

## 參考資料

- [Refactoring Guru - Temporary Field](https://refactoring.guru/smells/temporary-field)
