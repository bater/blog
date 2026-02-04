---
sidebar_position: 8
title: 資料泥團
---

# 資料泥團

有沒有注意到有些變數像形影不離的朋友——它們到處一起出現？你看到 `firstName`、`lastName` 和 `email` 作為三人組一起旅行。或者 `street`、`city`、`zipCode` 和 `country` 形成自己的小團體。當你發現同一組變數在多個地方一起出現時，恭喜：你找到了資料泥團。

這個術語可能聽起來很有趣，但問題是真實的。這些資料群組正在呼喊著要成為自己的物件，但它們仍然作為鬆散的基本型別散布在你的程式碼庫中。這就像看一個樂團表演但從未真正組成樂團——他們一直出現在相同的場地，演奏相同的歌曲，但從未正式組合。

這裡有一個簡單的測試：如果從群組中移除一個資料會使剩餘的資料變得無意義或不完整，你就有了資料泥團。定義 3D 空間中一個點的三個座標？那是一個泥團。預訂的開始日期和結束日期？絕對是泥團。它們屬於一起，那為什麼要把它們分開？

## 氣味的跡象

**重複的參數群組**：同一組參數出現在多個方法簽名中。你一直向不同的方法傳遞 `startDate, endDate`，或者 `width, height` 出現在六個函式呼叫中。

**相關欄位**：類別中總是關聯到同一概念的多個欄位。你的 `User` 類別有 `billingStreet`、`billingCity`、`billingZip`、`billingCountry`、`shippingStreet`、`shippingCity`、`shippingZip`、`shippingCountry`——那是兩個藏在眼前的地址泥團。

**刪除測試失敗**：如果你從群組中移除一個資料值，其他的會變得無意義。從你的 street/city/zip/country 四重奏中移除 `zipCode`，地址突然就不完整了。這是它們應該被分組在一起的信號。

**到處散布的驗證**：同樣的驗證組合出現在泥團出現的任何地方。每次你處理日期範圍時，你都驗證結束日期在開始日期之後。每次你處理座標時，你都檢查它們是否在有效範圍內。

**一起旅行的參數**：當你改變方法簽名以添加泥團中的一個參數時，你經常需要也添加其他的。它們彼此之間有高內聚性，但與程式碼的其餘部分內聚性低。

## 氣味的原因

**降低可讀性和可理解性**：有資料泥團的程式碼更難閱讀，特別是對程式碼庫陌生的開發者。資料元素之間的關係不是立即清楚的。`x`、`y`、`z` 代表一個點？一個尺寸？一個方向向量？沒有適當的封裝，讀者必須從上下文推斷意義。

**程式碼重複**：當同一組資料出現在多個地方時，你不僅在複製資料宣告，還有操作它們的邏輯。日期範圍的驗證被複製到日期範圍出現的任何地方。地址顯示格式的計算在多個類別中重複。

**維護困難**：更新散布的資料成為維護噩夢。需要向你的日期範圍添加時區資訊？最好搜索整個程式碼庫找到那些日期一起出現的每個地方。漏掉一個地方，你就有了不一致。這正是 Martin Fowler 所說的「霰彈式修改」——一個概念性的變更需要在很多地方修改。

**脆弱性**：因為資料及其相關邏輯散布在多個位置，一個區域的變更可能意外破壞其他區域。你在一個地方修改了日期驗證，忘記它在別處也有重複。突然間，系統的不同部分對什麼構成有效的日期範圍有不同的規則。

**缺少抽象**：資料泥團隱藏了應該清晰的領域概念。`startDate` 和 `endDate` 不只是兩個日期——它們代表一個有自己規則和行為的 `DateRange`。`street`、`city`、`zipCode` 不只是字串——它們是一個 `Address`。透過保持它們為基本型別，你錯過了抽象和封裝的機會。

## 重構配方

- 提取類別
- 引入參數物件
- 保持整個物件

### 提取類別

資料泥團的根本解決方案是創建一個專用類別來持有相關資料。這給了你一個放置驗證、行為和意義的地方。

**之前：**

```java
public class Booking {
  private String guestFirstName;
  private String guestLastName;
  private String guestEmail;
  private String guestPhone;

  private LocalDate checkInDate;
  private LocalDate checkOutDate;

  public void validateDates() {
    if (checkOutDate.isBefore(checkInDate)) {
      throw new IllegalArgumentException("退房日期必須在入住日期之後");
    }
  }

  public String formatGuestInfo() {
    return guestFirstName + " " + guestLastName + " (" + guestEmail + ")";
  }

  // 有 6 個參數的建構子
  public Booking(String guestFirstName, String guestLastName,
                 String guestEmail, String guestPhone,
                 LocalDate checkInDate, LocalDate checkOutDate) {
    this.guestFirstName = guestFirstName;
    this.guestLastName = guestLastName;
    this.guestEmail = guestEmail;
    this.guestPhone = guestPhone;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    validateDates();
  }
}
```

注意到泥團了嗎？客人資訊（firstName, lastName, email, phone）一起旅行，日期範圍（checkIn, checkOut）也是。讓我們提取它們。

**之後：**

```java
public class Guest {
  private final String firstName;
  private final String lastName;
  private final String email;
  private final String phone;

  public Guest(String firstName, String lastName, String email, String phone) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }

  public String getFullName() {
    return firstName + " " + lastName;
  }

  public String formatContactInfo() {
    return getFullName() + " (" + email + ")";
  }
}

public class DateRange {
  private final LocalDate start;
  private final LocalDate end;

  public DateRange(LocalDate start, LocalDate end) {
    if (end.isBefore(start)) {
      throw new IllegalArgumentException("結束日期必須在開始日期之後");
    }
    this.start = start;
    this.end = end;
  }

  public long getDays() {
    return ChronoUnit.DAYS.between(start, end);
  }

  public boolean overlaps(DateRange other) {
    return !this.end.isBefore(other.start) && !other.end.isBefore(this.start);
  }
}

public class Booking {
  private final Guest guest;
  private final DateRange period;

  public Booking(Guest guest, DateRange period) {
    this.guest = guest;
    this.period = period;
  }
}
```

看看這個轉變！`Booking` 建構子從 6 個參數變成了 2 個。每個提取的類別現在都有自己的驗證、行為和清晰的目的。`DateRange` 類別可以告訴你它跨越多少天或者是否與另一個範圍重疊。`Guest` 類別知道如何格式化自己的聯繫資訊。

### 引入參數物件

當資料泥團重複出現在方法參數中時，將它們包裝在參數物件中。

**之前：**

```typescript
class ReportGenerator {
  generateSalesReport(
    startDate: Date,
    endDate: Date,
    minAmount: number,
    maxAmount: number,
    region: string
  ): Report {
    // ...
  }

  exportSalesData(
    startDate: Date,
    endDate: Date,
    minAmount: number,
    maxAmount: number,
    format: string
  ): void {
    // ...
  }

  calculateTotalSales(
    startDate: Date,
    endDate: Date,
    minAmount: number,
    maxAmount: number
  ): number {
    // ...
  }
}
```

看到 `startDate`、`endDate`、`minAmount`、`maxAmount` 如何一直一起旅行？那是一個渴望被提取的泥團。

**之後：**

```typescript
class SalesFilter {
  constructor(
    public readonly dateRange: DateRange,
    public readonly amountRange: AmountRange,
  ) {}
}

class DateRange {
  constructor(
    public readonly start: Date,
    public readonly end: Date
  ) {
    if (end < start) {
      throw new Error('結束日期必須在開始日期之後');
    }
  }
}

class AmountRange {
  constructor(
    public readonly min: number,
    public readonly max: number
  ) {
    if (max < min) {
      throw new Error('最大金額必須大於最小金額');
    }
  }

  contains(amount: number): boolean {
    return amount >= this.min && amount <= this.max;
  }
}

class ReportGenerator {
  generateSalesReport(filter: SalesFilter, region: string): Report {
    // ...
  }

  exportSalesData(filter: SalesFilter, format: string): void {
    // ...
  }

  calculateTotalSales(filter: SalesFilter): number {
    // ...
  }
}
```

現在方法更乾淨了，過濾概念是明確的。未來對過濾標準的變更只需要觸及 `SalesFilter` 類別。

### 保持整個物件

當你從一個物件中提取多個欄位作為參數傳遞時，只需傳遞整個物件。

**之前：**

```python
class Rectangle:
    def __init__(self, x, y, width, height):
        self.x = x
        self.y = y
        self.width = width
        self.height = height

def check_overlap(x1, y1, width1, height1, x2, y2, width2, height2):
    return (x1 < x2 + width2 and
            x1 + width1 > x2 and
            y1 < y2 + height2 and
            y1 + height1 > y2)

# 使用
rect1 = Rectangle(0, 0, 10, 10)
rect2 = Rectangle(5, 5, 10, 10)
overlaps = check_overlap(
    rect1.x, rect1.y, rect1.width, rect1.height,
    rect2.x, rect2.y, rect2.width, rect2.height
)
```

八個參數！而且它們都來自兩個物件。讓我們保持整個物件。

**之後：**

```python
class Rectangle:
    def __init__(self, x, y, width, height):
        self.x = x
        self.y = y
        self.width = width
        self.height = height

    def overlaps(self, other):
        return (self.x < other.x + other.width and
                self.x + self.width > other.x and
                self.y < other.y + other.height and
                self.y + self.height > other.y)

# 使用
rect1 = Rectangle(0, 0, 10, 10)
rect2 = Rectangle(5, 5, 10, 10)
overlaps = rect1.overlaps(rect2)
```

乾淨多了！重疊邏輯現在住在它屬於的地方——Rectangle 類別本身。而且方法呼叫非常清楚。

## 總結

資料泥團是那種一開始看起來無害的氣味之一。當然，那三個變數總是一起出現，但僅僅為了它們創建一整個類別似乎是過度設計，對吧？直到你意識到你已經複製貼上了相同的驗證邏輯五次。直到你花了一個小時追蹤為什麼系統的一部分處理資料的方式與另一部分不同。

模式很簡單：當你看到總是一起旅行的變數時，將它們分組到一個類別中。當你看到相同的參數出現在多個方法中時，創建一個參數物件。當你從一個物件中提取欄位只是為了傳遞到別處時，傳遞整個物件。

從最明顯的泥團開始——那些給你帶來最多痛苦的。將它們提取成適當的物件。給那些物件有意義的名稱和有用的方法。看著你的程式碼變得更可讀、更可維護、更能抵抗 bug。

## 參考資料

- [Refactoring Guru - Data Clumps](https://refactoring.guru/smells/data-clumps)
- [Martin Fowler - Introduce Parameter Object](https://refactoring.com/catalog/introduceParameterObject.html)
- [Martin Fowler - Preserve Whole Object](https://refactoring.com/catalog/preserveWholeObject.html)
