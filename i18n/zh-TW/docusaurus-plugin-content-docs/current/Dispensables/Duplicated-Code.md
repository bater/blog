---
sidebar_position: 5
title: 重複程式碼
---

# 重複程式碼

「重複程式碼」通常是軟體中萬惡之源。當你從 Stack Overflow 複製貼上一段程式碼，甚至從你自己的檔案複製，因為「只是幾行而已」時，它就會悄悄潛入你的專案。

問題是每次你複製程式碼，你就加倍了維護負擔。如果你在一個副本中發現 bug，你必須記得在其他副本中也修復它。老實說：你會忘記的。

> 「重複是設計良好的系統的首要敵人。」—— Robert C. Martin

## 氣味的跡象

- 相同的程式碼結構出現在多個地方。
- 你看到兩個類別執行幾乎相同的任務，但變數名稱不同。
- 你發現自己複製一段程式碼並進行小的調整。

## 氣味的原因

**懶惰**：複製貼上比思考如何抽象邏輯更快。
**多個作者**：兩個開發者在不同的地方實作相同的功能，沒有互相交流。
**趕時間**：「我以後會清理這個」（通常意味著「永遠不會」）。

## 重構配方

- 提取方法
- 上移方法
- 形成模板方法

### 提取方法

處理同一個類別內重複的最簡單修復。

**之前：**
```java
void printOwing() {
    printBanner();
    System.out.println("name: " + name);
    System.out.println("amount: " + getOutstanding());
}

void printCredit() {
    printBanner(); // 重複了！
    System.out.println("name: " + name);
    System.out.println("credit: " + getCredit());
}
```

**之後：**
```java
void printOwing() {
    printDetails(getOutstanding(), "amount");
}

void printCredit() {
    printDetails(getCredit(), "credit");
}

void printDetails(double val, String label) {
    printBanner();
    System.out.println("name: " + name);
    System.out.println(label + ": " + val);
}
```

### 上移方法

如果兩個子類別共享相同的方法，將它上移到超類別。

**之前：**
```java
class Car extends Vehicle {
    void turn() { ... }
}
class Truck extends Vehicle {
    void turn() { ... } // 與 Car.turn() 相同
}
```

**之後：**
```java
class Vehicle {
    void turn() { ... }
}
```

## 參考資料

- [Refactoring Guru - Duplicate Code](https://refactoring.guru/smells/duplicate-code)
- [Martin Fowler - Duplicated Code](https://refactoring.com/catalog/duplicatedCode.html)
