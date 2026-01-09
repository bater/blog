# Day 15. Tool Abusers > Temporary Field 臨時欄位

Created: July 29, 2023 9:48 PM

## 氣味徵兆

當一個類別或物件有一個或多個欄位只有在特定情況下才會使用到，例如在方法呼叫階段用來暫時儲存資料，其他多數時候只是空值或沒有相關的值。這種實作模式我們可以稱之為「臨時欄位（Temporary Field）」氣味。

上述的情況中，這些欄位並不包含在該類別的主要職責當中，通常只存在特定前提條件下才有意義。這些欄位可能會導致各種問題，也可能讓開發者容易產生誤解。這個氣味通常也會導致 Long Parameter List 氣味，包含許多冗長也無效的參數。

## 氣味的原因

- **降低可讀性：**當一個類別或物件包含臨時欄位時，可能會使程式碼變得難以理解。閱讀程式碼的開發者可能會想知道為什麼需要存下某些資料，或者可能會誤以為這些資料對於該類別的主要功能很重要。這可能會在維護期間引起混亂，並導致潛在的錯誤風險。
- **增加複雜度：**臨時欄位可能會給一個類別增加不必要的複雜性。開發人員需要跟蹤這些欄位的使用情境和方式，這可能會使代碼理解和維護的成本增加。
- **違反單一職責原則（SRP）：**臨時欄位的存在通常代表著一個類別已經承擔了過多不同職責。理想情況下，每個類別應該只具有單一職責，所有的欄位都有存在的必要與確定單一的用途。這樣設計可以更容易理解、維護和測試。
- **多執行緒（Multithreading）安全問題：**如果一個具有臨時欄位的類別在多執行緒環境中使用，可能會導致「並發（concurrency）」問題。多個執行緒可能同時修改某個臨時欄位，從而導致意外行為和錯誤。
- **測試困難：**當存在臨時欄位時，測試可能變得更具挑戰性。因為您可能需要設置特定條件來確保這些欄位正確初始值和使用方式，這可能導致更複雜的測試案例。

## 對應氣味的重構技巧

- Extract Class 抽出類別
- Introduce Null Object 導入空物件

### Extract Class

當類別中出現「臨時欄位」氣味時，很可能代表這個類別中出現差異頗大的不同使用情境，擔負了超過一個以上的職責。這種時候我們最好依照職責將原有的類別一分為二，根據職責而重新劃分為新的類別，讓類別中的每一個欄位都完全符合類別的意圖，以方便開發者掌握與理解。

### Introduce Null Object 導入空物件

當我們的物件中存在許多臨時欄位以空值來表示「例外」或不預期的使用情境時，我們可以將臨時欄位轉換為一個 Null 空物件來實作與原本實際物件相同的介面，定義我們規格上所需的預設行為。過這個手法我們可以消除原本臨時欄位存在的需求，而改用空物件取代。

另一個好處是這個手法有助於提升單一職責原則，讓原有的物件能專注在預期設計的行為，把非預期的其他狀況處理職責，轉交由空物件來實作。藉由這樣職責分離的設計，來提升程式碼的簡潔與清晰程度。

---

## Sign of Smell

When a class or object has a field (or member variable) that is only used temporarily or sporadically, it is considered a “Temporary Field” smell. This field is not part of the class's primary responsibility or purpose and is often used to store data temporarily during a specific operation or method call. Such a field can lead to various issues and can indicate a design problem in your code.

This is often an alternative to the “Long Parameter List” smell.

## Reason of Smell

- **Decreased Readability**: When a class contains temporary fields, it can make the code more difficult to understand. Developers reading the code may wonder why certain data is being stored or may assume that the data is important for the class's primary functionality, leading to confusion and potential mistakes during maintenance.
- **Increased Complexity:** Temporary Fields can add unnecessary complexity to a class. Developers need to keep track of when and how these fields are used, which can make the code harder to reason about and maintain.
- **Violation of Single Responsibility Principle (SRP):** Temporary Fields often indicate that a class is taking on multiple responsibilities. Ideally, each class should have a single responsibility, making it easier to understand, maintain, and test. The presence of temporary fields suggests that a class may be doing too much.
- **Thread Safety Issues:** If a class with Temporary Fields is used in a multi-threaded environment, it can lead to concurrency issues. Temporary Fields might be modified concurrently by multiple threads, causing unexpected behavior and bugs.
- **Difficulty in Testing:** Testing can become more challenging when Temporary Fields are present because you may need to set up specific conditions to ensure that these fields are correctly initialized and used. This can result in more complex test cases.

## Refactoring Recipes

- Extract Class
- Introduce Null Object

### Reference

[https://refactoring.guru/smells/temporary-field](https://refactoring.guru/smells/temporary-field)