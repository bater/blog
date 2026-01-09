# Day 9. Bloaters > Long Parameter List

Created: July 29, 2023 9:07 PM
Tags: bloaters, smell

(English follows Chinese)

## 氣味的徵兆

過長參數列（Long Parameter List）氣味是當函式（Function）或方法（Method）擁有了太多參數。經驗上來說，當參數超過三或四個以上，我們應該開始懷疑是不是已經過長了。

這個氣味非常符合「臃腫怪（Bloaters）」的典型，就是程式大小超過理想的尺寸，而我們的理想是合理的越小越好。因此太長的方法、太大的類別、太多參數列表，都是我們想要重構的目標。

行筆至此，突然覺得上一個介紹的氣味「基本型別偏執（**Primitive Obsession**）」會歸類在Bloaters之下，是一件有點奇怪的事。因為偏離本篇主題，只能先把這個疑問暫且擱下。

## 氣味的原因

- **降低可讀性**：具有長參數列表的方法較難以閱讀和理解。開發人員可能需要理解每個參數的順序和用途，這可能導致混淆和錯誤，也增加了進入專案的學習成本。
- **重複的程式碼**：在某些情況下，具有長參數列表的方法可能導致出現重複的程式碼片段。因為開發人員可能會複製貼上來建立多個類似的方法，讓這些長參數列表散佈在專案的不同地方。
- **增加耦合度**：具有長參數列表的方法與調用方法的程式碼片段之間出現緊密耦合，因為調用程式碼需要知道並提供所有的參數。這可能會讓不影響調用程式碼的情況下修改函數變得非常困難。
- **違反單一職責原則（SRP）**：具有許多參數的方法可能表明該函數試圖做太多事情，並違反了SRP。理想情況下，一個函數應該具有清晰且單一的職責。
- **脆弱性**：當一個函數具有許多參數時，對參數的順序或類型進行任何更改都可能破壞對該函數的現有使用方式，從而導致出現未預期的錯誤或副作用。
- **測試困難**：為具有長參數列表的方法編寫全面的單元測試可能很繁瑣，因為測試人員需要為每個參數提供各種值的組合，來涵蓋不同情景。
- **維護困難**：隨著專案的演變，在已經具有長參數列表的方法新增參數會變得越來越繁瑣，並可能導致進一步的代碼氣味，如「散彈槍式修改（Shotgun Surgery）」。意思是當我們意圖修改一處邏輯時，不得不同時改動多處不同檔案，牽一髮而動全身。

## 對應氣味的重構方法

介紹完三種不同氣味後，終於有第一個氣味在[對照表](https://www.industriallogic.com/img/blog/2005/09/smellstorefactorings.pdf)上只存在三種重構手法對應，並且其中兩種在前面的氣味重構中已經介紹過，裏面只有一種新重構技巧。

其實對照表上不同氣味能夠對應的重構技巧多與少的落差極大，少的只有一種重構技巧，多則可以有到14種。這樣巨大的落差在盡量想平均每日文章產出量的情況下，就不得不動態調整體裁。

根據對照表，可以對「應過長參數列」氣味的重構技巧如下列前三項：

- Replace Parameter with Method Call
- Introduce Parameter Object
- Preserve Whole Object
- *Remove Parameter**
- *Replace Parameter with Explicit Methods**

人有時候是這樣，太多的時候想減少，太少的時候想增加。這三個重構技巧都屬於重構分類中的「簡化方法呼叫（**Simplifying Method Calls**）」，而這個分類的目標顧名思義，就是讓方法呼叫（Method Calling）時能夠更簡單明瞭，其中自然包括簡化參數的方法。換言之，除了對照表所列出的三種，實際上我認為還有其他重構手法，甚至在其他重構技巧分類中，也可以消除這個氣味。

考慮到這些以後，我在原本的列表上補上我認為也可以消除這個氣味的方法，以斜體加上星號（*）表示。經過這次系列寫作，能夠參考對照表而去修訂增補，我認為是很大的成就感，也希望能對社群提供一些貢獻。

## Replace Parameter with Method Call

對照表上的名稱為「Replace Parameter with Method」，我依照[Refactoring Guru的版本](https://refactoring.guru/replace-parameter-with-method-call)加上「Call」，更符合「方法呼叫」的原意。

這個重構手法是將原本在調用方法之前需要進行的參數準備工作，搬移到參數之內，藉此來移除不需要的方法參數。讓我們直接看範例：

```java
int basePrice = quantity * itemPrice;
double seasonDiscount = this.getSeasonalDiscount();
double fees = this.getFees();
double finalPrice = discountedPrice(basePrice, seasonDiscount, fees);
```

此處我們需要處理的方法為 discountedPrice，具有三個參數分別是basePrice、seasonDiscount與fees。但我們可發現其中seasonDiscount與fees都只是其他方法的回傳值，並沒有在調用方法階段有其他邏輯互動。這樣的情況下，我們可以將seasonDiscount與fees搬進discountedPrice方法內。

```java
int basePrice = quantity * itemPrice;
double finalPrice = discountedPrice(basePrice);
```

在重構的範例中，我們知道調用前唯一需要準備的參數basePrice，大幅降低了discountedPrice這個方法的使用成本。

我們可以想像discountedPrice不僅只在一個地方被呼叫，在這次重構以後，每一處被呼叫的地方，都可以減少兩行參數準備，也減少了重複多餘的程式碼片段。

## Introduce Parameter Object

請參考「[**Long Method > Refactoring 如何重構Long Method**](https://ithelp.ithome.com.tw/articles/10314510)」一文。

## Preserve Whole Object

請參考「[**Long Method > Refactoring 如何重構Long Method**](https://ithelp.ithome.com.tw/articles/10314510)」一文。

## Remove Parameter 移除參數

這是一個光看標題就能夠理解，讓解釋本身顯得有點多餘的重構技巧。當參數太多的時候，我們應該考慮移除沒有使用到的參數。

在不同的物件導向語言中，有時會因為繼承覆寫的緣故，會刻意留下使用不到的參數，因為參數本身是方法或函數同名時的識別之一。這個時候會建議至少將使用不到的參數變更為「_（底線）」或是加上底線前綴（如 _unusedData）。

即使是一眼看上去沒有用到的參數，要刪除前也要仔細檢查所有參數的使用情境，並通過測試來確保行為一致。否則可能會踩到意想不到的地雷。這也是有些開發者寧可留著看上去用不到的程式碼片段也不敢輕易刪除的原因，可能是曾經吃過這種大虧。

## Replace Parameter with Explicit Methods

這個方法乍看之下跟上面提到的「Replace Parameter with Method Call」有點相似，但實際上完全是不同的重構技巧。

當方法內會因為參數而進行不同的業務邏輯，最好拆分為不同的方法，請見以下範例：

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

如範例程式所示，當name的值分別等於height或是width時，會進行互不相關的兩段邏輯，這個時候應該根據條件不同拆分為兩個不同分法，重構後如下：

```java
void setHeight(int arg) {
  height = arg;
}
void setWidth(int arg) {
  width = arg;
}
```

將一個有兩個參數的方法，拆開為兩個各有一個參數的方法，正是我們想要追求的「Make the Small Thing」的精神。多個只有單一職責的小方法，比起一個擁有許多參數、許多不相關職責的大方法來得更簡潔、更好懂。

---

## Sign of Smell

The Long Parameter List is a code smell that occurs when a function or method has a large number of parameters. In general, if a method has more than three or four parameters, it is considered too long.

## Reason of Smell

- **Reduced Readability**: Methods with a long parameter list can be challenging to read and comprehend. Developers need to remember the order and purpose of each parameter, which can lead to confusion and mistakes.
- **Code Duplication**: In some cases, methods with long parameter lists may result in code duplication, as developers might create multiple similar functions to avoid passing numerous parameters.
- **Increased Coupling**: Methods with long parameter lists are tightly coupled to the calling code, as the calling code needs to know and provide all the required parameters. This can make it difficult to modify the function without impacting the calling code.
- **Violation of Single Responsibility Principle (SRP)**: Methods with many parameters may indicate that the function is trying to do too much and violates the SRP. Ideally, a function should have a clear and single responsibility.
- **Brittleness**: When a function has many parameters, any changes to the order or type of parameters can break existing calls to that function, leading to bugs that are hard to detect.
- **Testing Challenges**: Writing comprehensive unit tests for methods with long parameter lists can be cumbersome, as testers need to provide various combinations of values for each parameter to cover different scenarios.
- **Maintenance Difficulty**: As the codebase evolves, adding new parameters to a function with a long parameter list becomes increasingly cumbersome and can lead to further code smells like Shotgun Surgery.

## Refactoring Recipe

- Replace Parameter with Method Call
- Introduce Parameter Object
- Preserve Whole Object
- *Remove Parameter**
- *Replace Parameter with Explicit Methods**

### Reference

[https://refactoring.guru/smells/long-parameter-list](https://refactoring.guru/smells/long-parameter-list)

[https://refactoring.guru/replace-parameter-with-method-call](https://refactoring.guru/replace-parameter-with-method-call)