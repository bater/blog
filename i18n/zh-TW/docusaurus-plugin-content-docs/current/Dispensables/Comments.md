---
sidebar_position: 2
title: 註釋
---

# 註釋

「註釋」是一個有爭議的氣味，因為我們在學校經常被教導「好的程式碼有很多註釋」。實際上，**好的程式碼會自我解釋。**

如果你必須寫註釋來解釋一段程式碼在做*什麼*，那是表達上的失敗。程式碼應該被重構，使變數名稱和方法呼叫能夠講述故事。註釋應該保留用來解釋*為什麼*做某事（業務背景或奇怪的限制），而不是*如何*做。

> 「不要註釋糟糕的程式碼——重寫它。」—— Brian W. Kernighan 和 P. J. Plauger

## 氣味的跡象

- 你看到一段程式碼前面有一個註釋解釋它做什麼（例如，`// 檢查使用者是否有資格`）。
- 你看到註釋解釋複雜的表達式。
- 你看到方法名稱與註釋不符。

## 氣味的原因

**複雜的程式碼**：作者意識到程式碼很難理解，所以他們寫了註釋來澄清它，而不是簡化程式碼。
**懶惰**：寫 `// 排序列表` 比提取一個叫做 `sortList()` 的方法更快。

## 重構配方

- 提取方法
- 重新命名方法
- 引入斷言

### 提取方法

最常見的解決方案。如果你有一個註釋說「計算總價」，那麼抓取它下面的程式碼並提取到一個叫做 `calculateTotalPrice()` 的方法中。

**之前：**
```java
void printOwing() {
    printBanner();

    // 計算未付金額
    double outstanding = 0.0;
    for (Order order : orders) {
        outstanding += order.getAmount();
    }

    // 印出詳情
    System.out.println("name: " + name);
    System.out.println("amount: " + outstanding);
}
```

**之後：**
```java
void printOwing() {
    printBanner();
    double outstanding = calculateOutstanding();
    printDetails(outstanding);
}

double calculateOutstanding() {
    double result = 0.0;
    for (Order order : orders) {
        result += order.getAmount();
    }
    return result;
}

void printDetails(double outstanding) {
    System.out.println("name: " + name);
    System.out.println("amount: " + outstanding);
}
```

現在註釋是不必要的，因為方法名稱準確地告訴你正在發生什麼。

### 重新命名方法

如果一個註釋解釋方法做什麼是因為方法名稱太模糊，就重新命名方法！

**之前：**
```java
/**
 * 檢查使用者是否有有效的訂閱
 */
boolean check() { ... }
```

**之後：**
```java
boolean hasValidSubscription() { ... }
```

## 參考資料

- [Refactoring Guru - Comments](https://refactoring.guru/smells/comments)
- [Clean Code by Robert C. Martin](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
