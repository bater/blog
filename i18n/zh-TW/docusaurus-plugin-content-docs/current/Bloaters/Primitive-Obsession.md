---
sidebar_position: 5
title: 基本型別偏執
---

# 基本型別偏執

讓我們玩個遊戲：數數你見過多少次像 `String userId`、`String phoneNumber`、`int statusCode` 或 `boolean isActiveAndNotDeletedAndVerified` 這樣的程式碼。如果你和大多數開發者一樣，答案是「太多次了」。這就是基本型別偏執——傾向於對所有東西使用基本資料型別（字串、整數、布林值）而不是創建適當的領域物件。

這是一個可以理解的模式，尤其是對於剛接觸物件導向程式設計的開發者。僅僅為了包裝一個電話號碼就創建一整個類別似乎是過度設計，對吧？當你可以只用一個 `double` 表示金額和一個 `String` 表示貨幣時，為什麼要用 `Money` 類別？當你可以傳遞兩個獨立的日期時，為什麼要創建 `DateRange`？

事實是，基本型別之所以是「基本的」是有原因的——它們是基本構建塊，而不是領域概念。當我們用它們來表示業務邏輯時，我們失去了型別安全性，驗證邏輯散布各處，而且程式碼更難理解和維護。

## 氣味的跡象

**對所有東西使用字串**：當你看到 `String userId`、`String orderId`、`String customerId` 到處傳遞時，你就有基本型別偏執。這些不只是字串——它們是有特定規則和行為的領域概念。

**魔術數字**：散布在程式碼中的常數：`if (status == 1)` 或 `price * 0.08`（0.08 是什麼？稅？折扣？誰知道？）。

**驗證重複**：同樣的驗證邏輯在多個類別中重複。每個處理電話號碼的類別都複製相同的正則表達式模式。每個處理電子郵件地址的類別都重複相同的格式檢查。

**缺少行為**：當你有像 `PhoneNumberUtils.format()` 或 `EmailValidator.isValid()` 這樣的工具類別，而不是讓這些行為與資料本身一起存在時。

**複雜的條件式**：檢查基本型別來決定行為：`if (userType.equals("admin") || userType.equals("superadmin"))` 而不是有適當的型別。

## 氣味的原因

**缺乏可重用性**：當你依賴基本型別時，你無法將行為與資料封裝在一起。一個 `PhoneNumber` 類別可以格式化自己、驗證自己，並處理地區差異。一個 `String` 無法做到這些事情——你需要散布在程式碼庫中的外部工具方法。

**缺乏抽象**：充斥著基本型別的程式碼在更高層次上更難理解。閱讀 `processPayment(double amount, String currency, String accountNumber, String routingNumber)` 告訴你的比 `processPayment(Money amount, BankAccount account)` 少。後者清楚地傳達了業務概念。

**程式碼重複**：當多個類別需要驗證電話號碼時，它們要麼複製驗證邏輯，要麼調用相同的工具函式。無論哪種方式，都不理想。有了 `PhoneNumber` 類別，驗證只在一個地方發生——建構子——而且你知道任何 `PhoneNumber` 實例都是有效的。

**有限的行為**：基本型別無法封裝領域邏輯。你不能對字串調用 `email.domain()`，但你可以對 `Email` 物件調用。你不能問一個 double 是否是特定市場的有效價格，但你可以問一個 `Price` 物件。

**增加的複雜性**：隨著程式碼庫增長，管理基本型別變得越來越複雜。你最終會有充滿相關基本型別的參數列表、到處散布的複雜驗證，以及失控增長的工具類別。

## 重構配方

- 用物件替換資料值
- 用類別替換型別代碼
- 用子類別替換型別代碼
- 用狀態/策略替換型別代碼
- 提取類別
- 引入參數物件
- 用物件替換陣列

### 用物件替換資料值

這是處理基本型別偏執的首選重構。取那些基本型別值並將它們包裝在適當的值物件中。

**之前：**

```typescript
class Order {
  customerEmail: string;
  customerPhone: string;
  amount: number;
  currency: string;

  constructor(email: string, phone: string, amount: number, currency: string) {
    // 散布的驗證
    if (!email.includes('@')) throw new Error('無效的電子郵件');
    if (phone.length < 10) throw new Error('無效的電話');
    if (amount < 0) throw new Error('無效的金額');

    this.customerEmail = email;
    this.customerPhone = phone;
    this.amount = amount;
    this.currency = currency;
  }
}
```

**之後：**

```typescript
class Email {
  constructor(private value: string) {
    if (!value.includes('@')) {
      throw new Error('無效的電子郵件');
    }
  }

  toString(): string { return this.value; }
  domain(): string { return this.value.split('@')[1]; }
}

class PhoneNumber {
  constructor(private value: string) {
    if (value.length < 10) {
      throw new Error('無效的電話');
    }
  }

  toString(): string { return this.value; }
  format(): string { /* ... */ }
}

class Money {
  constructor(private amount: number, private currency: string) {
    if (amount < 0) {
      throw new Error('無效的金額');
    }
  }

  add(other: Money): Money { /* ... */ }
  toString(): string { return `${this.amount} ${this.currency}`; }
}

class Order {
  constructor(
    private customerEmail: Email,
    private customerPhone: PhoneNumber,
    private price: Money
  ) {
    // 不需要驗證 - 值物件處理它！
  }
}
```

現在每個領域概念都是一個有自己驗證和行為的適當型別。Order 類別變得更簡單，因為它委派給它的值物件。

### 用類別替換型別代碼

當你使用字串或整數作為型別代碼時，用適當的類別替換它們。

**之前：**

```java
public class Employee {
  private static final int ENGINEER = 0;
  private static final int SALESPERSON = 1;
  private static final int MANAGER = 2;

  private int type;

  public Employee(int type) {
    this.type = type;
  }

  public int getType() {
    return type;
  }
}
```

**之後：**

```java
public class EmployeeType {
  private final String name;

  private EmployeeType(String name) {
    this.name = name;
  }

  public static final EmployeeType ENGINEER = new EmployeeType("工程師");
  public static final EmployeeType SALESPERSON = new EmployeeType("銷售人員");
  public static final EmployeeType MANAGER = new EmployeeType("經理");

  public String getName() {
    return name;
  }
}

public class Employee {
  private EmployeeType type;

  public Employee(EmployeeType type) {
    this.type = type;
  }

  public EmployeeType getType() {
    return type;
  }
}
```

這防止了無效值（如果有人傳遞 `3` 作為型別呢？）並使程式碼更明確和型別安全。

### 用子類別替換型別代碼

當不同的型別代碼有不同的行為時，使用多型而不是條件式。

**之前：**

```javascript
class Employee {
  constructor(name, type) {
    this.name = name;
    this.type = type; // 'engineer', 'salesperson', 'manager'
  }

  calculateBonus() {
    switch(this.type) {
      case 'engineer':
        return this.salary * 0.10;
      case 'salesperson':
        return this.salary * 0.15 + this.commissions;
      case 'manager':
        return this.salary * 0.20;
    }
  }
}
```

**之後：**

```javascript
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  calculateBonus() {
    // 由子類別覆寫的抽象方法
    throw new Error('必須由子類別實作');
  }
}

class Engineer extends Employee {
  calculateBonus() {
    return this.salary * 0.10;
  }
}

class Salesperson extends Employee {
  constructor(name, salary, commissions) {
    super(name, salary);
    this.commissions = commissions;
  }

  calculateBonus() {
    return this.salary * 0.15 + this.commissions;
  }
}

class Manager extends Employee {
  calculateBonus() {
    return this.salary * 0.20;
  }
}
```

現在型別系統強制每個員工類型實作自己的獎金計算，而且你不能創建無效類型的員工。

### 提取類別

當你有相關基本型別的群組時，將它們提取到自己的類別中。這與用物件替換資料值結合使用尤其強大。

```java
// 之前：相關基本型別散布各處
private int startHour;
private int startMinute;
private int endHour;
private int endMinute;

// 之後：內聚的物件
private TimeRange schedule;
```

## 總結

基本型別偏執很誘人，因為基本型別簡單且熟悉。但每次你在應該使用領域物件的地方使用字串時，你都是在用短期便利換取長期痛苦。如果使用者 ID 和訂單 ID 都是字串，你的 IDE 無法捕捉你意外交換它們。當有人傳遞無效的電子郵件格式時，你的編譯器無法幫助你。

解決方案不是為所有東西創建物件——有時字串真的就是字串。但當你發現自己多次驗證相同的基本型別值，或者需要工具類別來處理行為時，那就是你創建適當領域物件的提示。

從小處開始：挑一個讓你痛苦的基本型別並將其包裝在值物件中。一旦你體驗到好處——型別安全、集中驗證、更清晰的程式碼——你會想知道自己以前是怎麼沒有它過日子的。

## 參考資料

- [Refactoring Guru - Primitive Obsession](https://refactoring.guru/smells/primitive-obsession)
- [Martin Fowler - Replace Primitive with Object](https://refactoring.com/catalog/replacePrimitiveWithObject.html)
- [Value Object Pattern](https://martinfowler.com/bliki/ValueObject.html)
