# Day 36. Other Smell > Incomplete Library Class 不完美的外部套件

Created: October 3, 2023 10:01 AM

## 氣味的徵兆

今日的軟體產業中，幾乎沒有開發者會是真正一行一行從頭開始寫專案，或多或少會引用各種便利的第三方套件來滿足我們的業務需求。業界也常提醒大家「避免重複造輪」，就是這樣的道理。俗話說站在巨人的肩膀上能看得更遠，要說今日的開發者們通通是站在社群大神的肩膀上也不為過。

然而，不論多麽方便的第三方開源套件，都不可能足以完全隨心所欲，總是會遇到那些「差一點點」的時刻，會希望這些便利的工具或外部資源能夠徹底滿足自己的需求。有些人會透過各種管道對作者許願，或是直接提交修改後的程式碼。但這些做法並不總是能如願，有時也是會遇到無法修改的情況，我們可以稱之為「不完美的外部套件（Incomplete Library Class）」。

這是一個相當特殊的程式氣味，無法被歸類之前介紹過的五種氣味類別之中，通常會被稱為「其他氣味」。

## 氣味的原因

以下是為何不完美的程式庫可能被視為程式碼氣味的一些原因：

- **文件不齊全：**不完美的外部套件可能缺乏適當的文件，使開發者難以正確了解如何使用它們。這可能導致錯誤、混淆和浪費時間。
- **功能侷限：**如果一個外部套件未提供執行任務所需的預期功能，開發者可能需要繞過它或編寫額外的程式碼，進而增加複雜性並降低生產力。
- **行為難以預測：**不完美的外部套件可能表現出開發者不可預測的行為，或無法正確處理極端的情況，導致依賴它們的專案出現意外的錯誤。
- **技術債增加：**開發者可能需要自行創建解決不完美的外部套件缺失功能的解決方案或補丁。這將增加程式碼庫的技術債務，使未來更加難以維護和擴充軟體功能。
- **被遺棄的風險：**如果一個不完美的外部套件長時間保持功能不完整，這很可能代表存在被其維護者遺棄的風險，這會使得使用者面臨各種遺留的問題和缺乏安全更新風險。
- **維護問題：**不完美的外部套件通常難以確保維護品質。許多開源專案依靠志願者維護，隨著語言或框架演進，需要時常更新來滿足用戶需求，並且修復錯誤與提高校能。如果未能如此，隨著其周圍的軟體生態系統變化，可能會引發各種問題，包括相當致命的安全性風險。

## 對應的重構技巧

有些情況下我們無法直接修改不完美的外部套件，這時我們可以考慮建立額外的階層或引入外部方法來解決氣味問題：

- Introduce Foreign Method
- Introduce Local Extension

### 引入外部方法 Introduce Foreign Method

當你發現目前的程式碼依賴於某些外部套件但是缺乏一些功能實作，同時我們無法直接修改外部套件時，我們可以考慮在呼叫端類別中新增所需的方法，將外部套件的方法作為參數傳入其中，藉此來擴充套件原本的功能，來達到客製化需求變更。

### 引入本地擴充 Introduce Local Extension

當我們遭遇不完美的外部套件，而且無法直接修改時，我們可以考慮在本地新增一個類別，透過繼承或包裝外部套件的方式，在專案內去複寫或擴充出客製化需要的實作。這個方法提供了高度靈活性，可以在不修改原有套件的情況下調整出我們所需要的功能。

---

## Sign of Smell

Nowadays, developers rarely write code from scratch. In the software industry, there is a saying that encourages us not to reinvent the wheel repeatedly. There are numerous useful open-source frameworks or third-party libraries available that can help us code more efficiently on a daily basis. However, we eventually discovered that the libraries don't always perfectly meet our needs. Furthermore, the library author has refused to implement them or has simply ignored the pull request over the long time. In this case, we face the code smell called “Incomplete Library Class”.

This is a special code smell because it does not belong to any of the code smell catalogs. It is always listed under "other code smells.”

## Reason of Smell

Here are some reasons why an incomplete library class can be considered a code smell:

- **Poor Documentation**: Incomplete library classes often lack proper documentation, making it difficult for developers to understand how to use them correctly. This can lead to errors, confusion, and wasted time.
- **Limited Functionality**: If a library class doesn't provide the expected or necessary functionality to perform a task, developers may have to work around it or write additional code, leading to increased complexity and reduced productivity.
- **Unpredictable Behavior**: Incomplete library classes may exhibit unpredictable behavior or fail to handle edge cases properly, causing unexpected bugs or crashes in applications that depend on them.
- **Increased Technical Debt**: Developers may need to create workarounds or patches to make up for the missing functionality in an incomplete library class. This adds technical debt to the codebase, making it harder to maintain and extend the software in the future.
- **Risk of Abandonment**: If a library class remains incomplete for an extended period, there's a risk that it may be abandoned by its maintainers, leaving users with unresolved issues and no updates.
- **Maintenance Issues**: Incomplete library classes are often indicative of poor maintenance practices. A library or framework should evolve over time to address user needs, fix bugs, and improve performance. If it doesn't, it can lead to problems as the software ecosystem around it changes.

## Refactoring Recipes

Unfortunately, there are situations where it is not possible to directly modify the library. In such cases, it is necessary to address the issue by creating an additional layer or introducing a foreign method.

- Introduce Foreign Method
- Introduce Local Extension

### Introduce Foreign Method

When you have code that uses the data and methods of a certain class but can't add or modify the class itself, such as when it is located in a read-only third-party library, you can consider adding the needed method to a client class. This involves passing an object of the library class as an argument to the client class.

### Introduce Local Extension

When you encounter a situation where a library class lacks the necessary methods that you require, and you find yourself unable to add those methods to the class due to certain constraints or limitations, here is a solution. You can create a new class that extends the existing library class, thus incorporating the additional methods you need. 

This approach allows you to either inherit from the utility class or wrap around it, providing you with the flexibility to seamlessly enhance its functionality according to your specific requirements locally.

### Reference

[https://refactoring.guru/smells/incomplete-library-class](https://refactoring.guru/smells/incomplete-library-class)

[https://luzkan.github.io/smells/incomplete-library-class](https://luzkan.github.io/smells/incomplete-library-class)

[https://refactoring.guru/introduce-foreign-method](https://refactoring.guru/introduce-foreign-method)

[https://refactoring.guru/introduce-local-extension](https://refactoring.guru/introduce-local-extension)