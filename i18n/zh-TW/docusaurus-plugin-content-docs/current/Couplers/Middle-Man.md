---
sidebar_position: 5
title: 中間人
---

# 中間人

在前一節關於「訊息鏈」中，我們談到了「隱藏委派」。我們說如果你有 `a.getB().getC().doIt()`，你可能想在 `A` 中創建一個叫做 `doIt()` 的方法來呼叫 `B`。

好吧，「中間人」就是當你做太多這種事時會發生的情況。

如果你看一個類別，發現它一半的方法只是委派給另一個類別而沒有增加任何價值，你就有了中間人。這就像一個只是轉發電子郵件而不閱讀它們的同事。「我不是在做工作，我只是在傳遞它。」

## 氣味的跡象

- 一個類別有很多方法只是委派給另一個物件。
- 你發現自己在想，「為什麼我要呼叫這個類別？我應該直接和真正的工作者對話。」

## 氣味的原因

**過度熱心的封裝**：你太努力避免訊息鏈，以至於你包裝了依賴的每一個方法。
**重構殘留物**：也許這個類別以前做更多事情，但邏輯被移出去了，只留下委派。

## 重構配方

- 移除中間人
- 內聯方法

### 移除中間人

如果中間人沒有做任何有用的事情，就讓客戶端直接呼叫委派。這是「隱藏委派」的反向操作。

**之前：**
```java
class Person {
    Department department;

    // 中間人方法
    public Manager getManager() {
        return department.getManager();
    }
}

// 使用
Manager m = person.getManager();
```

**之後：**
```java
// 邏輯移到客戶端
class Person {
    // 提供對委派的存取
    public Department getDepartment() {
        return department;
    }
}

// 使用
Manager m = person.getDepartment().getManager();
```
*是的，這看起來可能會造成訊息鏈。平衡是關鍵！*

### 內聯方法

如果一個方法實際上只是呼叫另一個方法，使用內聯方法來移除間接層。

## 參考資料

- [Refactoring Guru - Middle Man](https://refactoring.guru/smells/middle-man)
- [Martin Fowler - Middle Man](https://refactoring.com/catalog/middleMan.html)
