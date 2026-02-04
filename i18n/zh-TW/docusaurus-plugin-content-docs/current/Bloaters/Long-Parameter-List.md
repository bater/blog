---
sidebar_position: 7
title: 過長參數列
---

# 過長參數列

當參數失控時

## 氣味的跡象

你有沒有遇過這樣的方法：`calculatePrice(basePrice, discount, tax, shippingFee, insuranceFee, handlingFee, ...)`？當你到達第六個參數時，你可能已經忘記第一個是做什麼的了。歡迎來到過長參數列的世界，這是經典的程式碼氣味之一，讓開發者沮喪地嘆氣。

根據經驗，當一個函式有超過 7 個參數時，就該皺眉並問：「這是不是變得太複雜了？」這個氣味完美體現了「膨脹者」類別——程式碼增長超出其理想大小。而我們的理想？合理地小永遠更好。

現在我們已經看了幾個不同的氣味，這裡有一個有趣的觀察：這是我們遇到的第一個在[參考表](https://www.industriallogic.com/img/blog/2005/09/smellstorefactorings.pdf)中只列出三種重構技術的氣味——而且其中兩種我們已經介紹過了！但別擔心，我添加了幾種我認為也能有效解決這個氣味的技術。

## 為什麼過長參數列有害

讓我們談談為什麼參數太多是有問題的：

**降低可讀性**：當一個方法有很長的參數列時，它成為認知負擔。開發者不僅需要記住每個參數做什麼，還要記住它們的順序。搞混順序？恭喜，你剛剛引入了一個可能需要幾小時才能除錯的微妙 bug。

**程式碼重複**：有沒有發現自己複製貼上一個方法呼叫，因為你不想再次處理收集所有那些參數？這就是程式碼重複從後門溜進來。

**緊密耦合**：有長參數列的方法在調用者和被調用者之間創建緊密耦合。調用程式碼需要知道並提供每一個參數，使得改變函式而不觸及所有調用點變得困難。

**違反單一職責**：如果一個方法需要很多參數，它可能試圖做太多事情。一個清晰、專注的方法應該有一個單一、明確定義的目的。

**脆弱性**：改變一個參數的順序或型別，你可能會破壞數十個現有的呼叫。這就像一疊紙牌——一個小變化可能讓整個東西倒塌。

**測試噩夢**：為有長參數列的方法編寫全面的單元測試是令人疲憊的。你需要測試各種參數值的組合來覆蓋不同的場景。更多參數 = 指數級更多的測試案例。

**維護地獄**：隨著程式碼庫演進，向已經臃腫的方法添加另一個參數變得越來越痛苦。這可能導致其他程式碼氣味如「霰彈式修改」，其中改變一件事迫使你在多個地方修改程式碼。

## 如何重構過長參數列

根據參考表，我們有三種主要的重構技術來處理過長參數列。但正如我之前提到的，這些技術都屬於「簡化方法呼叫」類別，這意味著實際上有更多方法來解決這個氣味。我用星號（*）標記了我額外的建議。

- 用方法呼叫替換參數
- 引入參數物件
- 保持整個物件
- *移除參數*
- *用明確方法替換參數*

### 用方法呼叫替換參數

這種技術是關於將準備參數值的責任從調用者移到方法本身。讓我們看看它的實際應用：

**之前：**

```java
int basePrice = quantity * itemPrice;
double seasonDiscount = this.getSeasonalDiscount();
double fees = this.getFees();
double finalPrice = discountedPrice(basePrice, seasonDiscount, fees);
```

注意 `seasonDiscount` 和 `fees` 只是其他方法的返回值，中間沒有額外的邏輯？我們可以將這些呼叫移到 `discountedPrice` 方法內部。

**之後：**

```java
int basePrice = quantity * itemPrice;
double finalPrice = discountedPrice(basePrice);
```

漂亮，不是嗎？現在調用者只需要準備一個參數——`basePrice`。這大大降低了使用 `discountedPrice` 方法的成本。

想想看：如果這個方法在你的程式碼庫中被多個地方調用，每個調用點現在都節省了兩行參數準備。更少的程式碼重複，更乾淨的介面，更開心的開發者。

### 引入參數物件

我們在「[過長方法重構](/smells/Bloaters/Long-Method#introduce-parameter-object)」文章中詳細介紹了這種技術。想法很簡單：當你有幾個自然屬於一起的參數時，將它們包裝在一個專用物件中。不要分開傳遞 `firstName, lastName, email, phoneNumber`，而是創建一個 `UserContact` 物件並傳遞它。

### 保持整個物件

同樣在「[過長方法重構](/smells/Bloaters/Long-Method#preserve-whole-object)」文章中介紹過。當你從一個物件中提取多個值作為參數傳遞時，只需傳遞整個物件。你的方法可以在內部提取它需要的東西。

### 移除參數

這個幾乎太明顯而不需要解釋，但它出奇地常見：有時參數根本沒有被使用。也許它們曾經需要，或者也許它們是「以防萬一」添加的。無論如何，未使用的參數應該被移除。

一個警告：在有方法覆寫的物件導向語言中，你可能有意保留未使用的參數以維護方法簽名。在這些情況下，考慮將未使用的參數重命名為 `_`（底線）或加上底線前綴（如 `_unusedData`）來表明其狀態。

在移除任何參數之前，總是檢查所有使用上下文並運行你的測試以確保行為保持一致。許多開發者被「明顯未使用」但結果並非如此的參數燙傷過。

### 用明確方法替換參數

乍一看，這可能聽起來類似於「用方法呼叫替換參數」，但它實際上相當不同。這種技術是關於基於參數驅動的行為拆分方法。

**之前：**

```java
void setValue(String name, int value) {
  if (name.equals("height")) {
    height = value;
    return;
  }
  if (name.equals("width")) {
    width = value;
    return;
  }
  Assert.shouldNeverReachHere();
}
```

`name` 參數被用來決定走哪條邏輯路徑。這是一個我們應該將其拆分成獨立方法的信號：

**之後：**

```java
void setHeight(int arg) {
  height = arg;
}

void setWidth(int arg) {
  width = arg;
}
```

我們將一個有兩個參數的方法轉換成了兩個各有一個參數的方法。這就是「保持事物小」的本質——多個具有單一職責的小方法總是比一個有很多參數和多個不相關職責的大方法更清晰、更容易理解。

## 總結

過長參數列一開始可能看起來無害——畢竟，程式碼仍然能運作，對吧？但隨著程式碼庫增長，這些臃腫的方法簽名變得越來越難以處理。好消息是我們有幾種經過驗證的技術來精簡它們。

下次當你發現自己向方法添加另一個參數時，暫停並問：「有沒有更好的方式來結構化這個？」未來的你（和你的隊友）會感謝你。

## 參考資料

- [Refactoring Guru - Long Parameter List](https://refactoring.guru/smells/long-parameter-list)
- [Refactoring Guru - Replace Parameter with Method Call](https://refactoring.guru/replace-parameter-with-method-call)
- [Industrial Logic - Smells to Refactorings Cheat Sheet](https://www.industriallogic.com/img/blog/2005/09/smellstorefactorings.pdf)
