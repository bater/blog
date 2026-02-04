---
sidebar_position: 3
title: 過大的類別
---

# 過大的類別

我們都經歷過這種情況。你打開一個檔案，開始滾動，然後一直滾動，一直滾動⋯⋯當你到達第 800 行時，你開始懷疑是否不小心打開了整部魔戒三部曲而不是一個類別。歡迎來到過大類別的世界，一個類別試圖做所有事情，結果什麼都做不好。

就像它的表親過長方法一樣，一個類別總是以良好的意圖開始。它開始時很小、專注且可管理。但隨後功能需求來了：「我們可以只添加這一個欄位嗎？」「讓我們也加入這個方法。」「哦，我們還需要這些輔助函式。」不知不覺中，你曾經優雅的類別已經膨脹成一個沒人想碰的千行怪物。

根據經驗，如果你遇到一個超過 500 行的類別，就該開始懷疑了。這不是硬性規則——上下文很重要——但這是一個開始提問的好門檻。這個類別是否試圖做太多事情？它能否被拆分成更小、更專注的組件？

## 氣味的跡象

過大類別表現在單一類別變得過於複雜並試圖同時處理太多職責。以下是要注意的事項：

**過多的行數**：超過 500 行的類別應該引起注意。雖然不是每個 501 行的類別都有問題，但長度通常與複雜性相關。

**太多欄位**：如果你的類別有數十個實例變數，它可能管理了太多狀態。當你注意到可以被提取成自己物件的相關欄位群組時，這尤其明顯。

**低內聚性**：當你不能用一句清晰的話快速解釋類別做什麼，或者類別中的方法彼此不相關時，你就有內聚性問題。

**多重職責**：你的 `UserManager` 類別處理驗證、校驗、電子郵件通知、日誌記錄和資料持久化嗎？那是五個工作，應該只有一個。

**難以找到東西**：如果你需要使用 Ctrl+F 才能在單一類別中找到方法，那是一個警訊。開發者應該能夠直觀地瀏覽一個類別。

## 氣味的原因

**降低可讀性**：一個大類別讀起來和理解起來都很吃力。開發者必須滾動數百或數千行才能掌握正在發生的事情，使維護和修改變得顯著困難。追蹤所有移動部分的認知負擔變得令人疲憊。

**程式碼重複**：大類別經常滋生重複。當一個類別已經很龐大時，開發者傾向於在其中複製貼上程式碼而不是適當重構。畢竟，誰想重組一個 1000 行的檔案？這創造了類似邏輯的多個版本，隨著時間可能會不同步。

**低內聚性**：大類別通常遭受低內聚性——它們包含多個不相關的職責混雜在一起。你會發現付款處理邏輯挨著電子郵件格式化函式挨著資料驗證。這使得確定類別實際做什麼以及其部分如何相互關聯變得具有挑戰性。

**複雜性管理**：大類別的絕對複雜性使它們難以推理。有這麼多方法、欄位和互動，很難預測變更將如何在系統中傳播。這種複雜性導致 bug，並使新開發者難以理解和有效貢獻。

**脆弱性**：當許多不相關的職責共存在一個類別中時，修改一個部分可能意外破壞另一個。你修復了登入邏輯，突然密碼重設停止工作了。這種脆弱性使開發者害怕觸碰程式碼，導致變通方法和技術債累積。

**測試挑戰**：測試大類別是令人疲憊的。為一個做十件不同事情的類別編寫全面的單元測試需要模擬數十個依賴項並覆蓋無數場景。結果是？要麼測試覆蓋率不足，要麼是同樣龐大且難以維護的測試檔案。

## 重構配方

- 提取類別
- 提取子類別
- 提取介面
- 用物件替換資料值
- 複製觀察到的資料

### 提取類別

這是對抗過大類別的主要武器。當你注意到一個類別做太多事情時，識別出一個內聚的功能子集並將其移到自己的類別中。

**之前：**

```java
public class UserManager {
  private String username;
  private String email;
  private String password;
  private String street;
  private String city;
  private String zipCode;
  private String country;

  public void validateEmail() { /* ... */ }
  public void hashPassword() { /* ... */ }
  public void validateAddress() { /* ... */ }
  public void formatAddress() { /* ... */ }
  public void saveUser() { /* ... */ }
  public void sendWelcomeEmail() { /* ... */ }
}
```

注意 `UserManager` 如何處理使用者驗證、地址管理和電子郵件功能？讓我們把地址邏輯提取到它自己的類別中。

**之後：**

```java
public class Address {
  private String street;
  private String city;
  private String zipCode;
  private String country;

  public void validate() { /* ... */ }
  public String format() { /* ... */ }
}

public class UserManager {
  private String username;
  private String email;
  private String password;
  private Address address;

  public void validateEmail() { /* ... */ }
  public void hashPassword() { /* ... */ }
  public void saveUser() { /* ... */ }
  public void sendWelcomeEmail() { /* ... */ }
}
```

現在每個類別都有一個清晰、專注的職責。`Address` 類別處理所有地址相關的事情，使其在不同上下文中可重用——不只是用於使用者，還可能用於企業、送貨地址或帳單地址。

### 提取子類別

當一個類別有只在某些情況下使用的行為時，考慮為這些特殊情況提取子類別。

**之前：**

```javascript
class Employee {
  constructor(name, salary, commission) {
    this.name = name;
    this.salary = salary;
    this.commission = commission; // 只有銷售人員使用
  }

  calculatePay() {
    if (this.commission !== null) {
      return this.salary + this.commission;
    }
    return this.salary;
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

  calculatePay() {
    return this.salary;
  }
}

class Salesperson extends Employee {
  constructor(name, salary, commission) {
    super(name, salary);
    this.commission = commission;
  }

  calculatePay() {
    return this.salary + this.commission;
  }
}
```

這從基類中移除了條件邏輯，並使一般員工和銷售人員之間的區別在型別系統中變得明確。

### 提取介面

當程式碼庫的不同部分使用大類別功能的不同子集時，提取介面使這些使用模式明確。

```java
public interface Authenticatable {
  boolean authenticate(String password);
}

public interface Notifiable {
  void sendNotification(String message);
}

public class User implements Authenticatable, Notifiable {
  // 實作
}
```

這允許系統的不同部分只依賴它們實際需要的介面，而不是整個大類別。這是介面隔離原則的實踐。

### 用物件替換資料值

有時一個大類別充滿了應該是適當物件的基本型別欄位。我們在[基本型別偏執](/smells/Bloaters/Primitive-Obsession)中詳細討論了這一點，但它也適用於過大類別。

**快速範例：**

```java
// 之前：基本型別散布在大類別中
private String emailAddress;
private String phoneNumber;

// 之後：適當的值物件
private Email email;
private PhoneNumber phone;
```

每個值物件可以封裝自己的驗證和行為，減少大類別的職責。

## 總結

過大類別不會一夜之間出現——它們隨著功能被添加和截止日期逼近而逐漸增長。但每次我們選擇便利而非結構，我們都在讓程式碼庫更難維護。

好消息是？你不必一次重構所有東西。從小處開始：將一個清晰的職責提取到它自己的類別中。運行你的測試。提交。然後再做一次。逐漸地，那個難以處理的怪物變成了一個專注、可理解的組件集合。

未來的你會感謝你，因為他們可以在程式碼庫中導航而不會迷路。

## 參考資料

- [Refactoring Guru - Large Class](https://refactoring.guru/smells/large-class)
- [Martin Fowler - Extract Class](https://refactoring.com/catalog/extractClass.html)
