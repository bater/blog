---
sidebar_position: 3
title: 純資料類別
---

# 純資料類別

「純資料類別」是一個只包含欄位和存取它們的粗糙方法（getter 和 setter）的類別。這些基本上是被其他類別使用的資料容器。它們不包含任何功能，也不自行驗證任何東西。

雖然純資料類別本質上是「結構體」，但在物件導向程式設計中，它們通常是行為被放錯位置的跡象。「告知，別詢問」原則建議資料和對該資料的操作應該住在一起。如果你看到純資料類別，問問自己：「誰在使用這些資料？」邏輯可能應該移到這個類別中。

## 氣味的跡象

- 這個類別只有欄位、getter 和 setter。
- 其他類別大量查詢這個類別來執行計算。

## 氣味的原因

**貧血領域模型**：這是一種資料和處理分離的風格。雖然有時是有效的（如 DTO），但它經常導致邏輯在「服務」層之間重複。
**懶惰**：創建一個資料袋比弄清楚行為的正確抽象更容易。

## 重構配方

- 移動方法
- 封裝集合

### 移動方法

如果一個服務類別頻繁存取純資料類別，將那個邏輯移*進*純資料類別。

**之前：**
```java
class Order { // 純資料類別
    public List<Item> items;
}

class OrderService {
    public double calculateTotal(Order order) {
        double total = 0;
        for (Item item : order.items) {
            total += item.price;
        }
        return total;
    }
}
```

**之後：**
```java
class Order {
    private List<Item> items;

    public double calculateTotal() { // 邏輯移到這裡了！
        double total = 0;
        for (Item item : items) {
            total += item.price;
        }
        return total;
    }
}
```

### 封裝集合

如果一個類別直接暴露一個列表（如 `public List<Item> items`），任何人都可以清空它或添加壞資料。封裝它。

**之前：**
```java
order.items.add(item);
```

**之後：**
```java
order.addItem(item); // 受控存取
```

## 參考資料

- [Refactoring Guru - Data Class](https://refactoring.guru/smells/data-class)
- [Martin Fowler - Anemic Domain Model](https://martinfowler.com/bliki/AnemicDomainModel.html)
