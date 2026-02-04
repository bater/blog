---
sidebar_position: 4
title: 訊息鏈
---

# 訊息鏈

你可能見過看起來像康加舞隊列的方法呼叫程式碼：
`customer.getAddress().getCity().getZipCode().getProvider().getName()`。

這就是訊息鏈，也被親切地稱為「迪米特法則違規」或「火車殘骸」。當客戶端向一個物件請求另一個物件，然後再向那個物件請求另一個物件，如此循環時，就會發生這種情況。

問題在哪裡？客戶端現在與導航的結構耦合了。如果 `Address` 的定義改變（例如，郵遞區號移到 `Zip` 物件），你的程式碼就會崩潰。

## 氣味的跡象

- 一連串的方法呼叫：`a.b().c().d()`。
- 你依賴依賴的依賴的內部結構。

## 氣味的原因

**缺乏封裝**：物件過於自由地暴露它們的關係。
**快速存取**：這是在層次結構深處獲取資料而不編寫新方法的最快方式。

## 重構配方

- 隱藏委派
- 提取方法
- 移動方法

### 隱藏委派

讓中間人代勞，而不是讓客戶端導航整個鏈。

**之前：**
```java
// 客戶端程式碼
String managerName = employee.getDepartment().getManager().getName();
```

**之後：**
```java
// 客戶端程式碼
String managerName = employee.getManagerName();

// Employee 類別內部
public String getManagerName() {
    return this.department.getManager().getName();
}
```
*注意：小心不要因為做太多這種事而產生「中間人」氣味。*

### 提取方法

有時你無法把方法下推。在這種情況下，將鏈的使用提取到一個方法中以隔離耦合。

**之前：**
```java
public void printZip(Customer c) {
    String zip = c.getAddress().getCity().getZip(); // 鏈
    System.out.println(zip);
}
```

**之後：**
```java
public void printZip(Customer c) {
    String zip = getZipCode(c);
    System.out.println(zip);
}

private String getZipCode(Customer c) {
    // 耦合現在被包含在這一個方法中
    return c.getAddress().getCity().getZip();
}
```

## 參考資料

- [Refactoring Guru - Message Chains](https://refactoring.guru/smells/message-chains)
- [Martin Fowler - Message Chains](https://refactoring.com/catalog/messageChains.html)
