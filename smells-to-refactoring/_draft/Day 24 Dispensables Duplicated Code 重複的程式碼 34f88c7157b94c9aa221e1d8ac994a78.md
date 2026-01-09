# Day 24. Dispensables > Duplicated Code 重複的程式碼

Created: July 29, 2023 9:52 PM

## 氣味的徵兆

重複的程式碼可能發生在多名開發者在同一個程式碼專案的不同部分同時工作時，或者當團隊的新成員在撰寫自己的新程式碼時未詳細檢查現有程式碼。會發生這種情況，是因為他們過於專注於眼前的任務，可能不清楚他們的同事（或者前同事）可能已經編寫過可以用於他們所需目的的相同程式碼。

結果，程式碼專案會變得臃腫複雜，並且引入了不必要的重複，這會導致了可維護性的降低以及錯誤和缺陷的增加可能。開發者之間有效的溝通和協作至關重要，以最小化重複，最大化程式碼重用，確保更高效率和流暢的開發過程。

還有更難發現的重複片段，是當程式碼的實作部分看上去不同，但實際上執行相同的任務。這種重複可能很難辨認。

有時候重複是有原因。當死線追趕著團隊成員沒日沒夜趕工，現有的程式碼「幾乎合適」於新需求時，開發者可能無法抵擋「複製和貼上」類似程式碼的誘惑。在某些情況下，開發者可能只是懶得清理現有程式碼，導致散發出重複的氣味。

## 氣味的原因

- **可讀性不佳：**程式碼重複會使得程式碼專案變得更加難以閱讀和理解。在這樣氣味的專案裡工作的開發者，可能會難以把握重複程式碼片段背後的意圖和邏輯，因為他們必須在多個不同地方之間進行來回比較，來拼湊出完整個功能的全貌。
- **違反DRY原則：** DRY（Don't Repeat Yourself、不要重複自己）原則鼓勵開發者以模組化和可重用的方式來編寫程式碼。這意味著大量使用通用功能並將其封裝在函數、類別或模組之中。這樣做可以使該功能可以在程式碼專案的多個部分中被重複使用，而無需大量重複自己。
- **程式碼膨脹：**重複的程式碼可能導致程式碼膨脹，使程式碼專案變得不必要地龐大和複雜。這可能會影響專案的性能不佳，使其更加難以維護和擴充。
- **容易出錯：**重複的程式碼增加了導入錯誤到專案中的可能性。如果在重複的程式碼中的一個片段發現了錯誤並進行了修復，很容易忘記在其他重複的片段進行相同的修正。這可能導致邏輯不一致的行為和難以追蹤除錯的問題。
- 可**維護差：** 當相同的程式碼片段在程式碼專案的多個地方重複時，維護和更新專案會變得更加困難。必須在多個地方進行同步的修復錯誤或更新，這增加了導致邏輯不一致的風險或錯誤的可能性。

## 對應氣味的重構手段

與亡靈程式碼氣味類似，重複程式碼也可能指我們程式碼專案中的任何程式碼片段，其中包括變數、參數、屬性、方法、函式，甚至可能是一個類別。但是在多數情況下，比較常見是方法或函數的重複。因此，根據重複程式碼的類型，所需的重構技能也不同。

以下是一些可以應對重複程式碼氣味的重構技巧，來自[重構氣味速查表](https://www.industriallogic.com/blog/smells-to-refactorings-cheatsheet/)：

- Chain Constructors
- Extract Composite
- Extract Method
- Extract Class
- Form Template Method
- Introduce Null Object
- Introduce Polymorphic Creation with Factory Method
- Pull Up Method
- Pull Up Field
- Replace One/Many Distinctions with Composite
- Substitute Algorithm
- Unify Interfaces with Adapter

因為內容較多，我會在下一篇文章中逐一介紹。

---

## Sign of Smell

Duplication can occur when multiple developers work on different sections of the same codebase, or when a newbie fails to check the existing code while creating their own one. This happens because they are focused on their current tasks too much and may not know that their colleagues have already written similar code that could be reused for their purpose. 

As a result, the codebase becomes fragmented, and unnecessary repetition is introduced, leading to decreased maintainability and increased chances of bugs and errors. It is crucial for developers to communicate and collaborate effectively to minimize duplication and maximize code reuse, ensuring a more efficient and streamlined development process.

There’s also more subtle duplication when specific parts of code look different but actually perform the same job. This kind of duplication can be hard to find and fix.

Sometimes duplication is purposeful. When rushing to meet deadlines and the existing code is “almost right” for the job, novice programmers may not be able to resist the temptation of copying and pasting the relevant code. And in some cases, the programmer is simply too lazy to de-clutter.

## Reason of Smell

- **Readability**: Code duplication makes the codebase harder to read and understand. Developers who work on the codebase may struggle to grasp the intent and logic behind duplicated sections, as they have to navigate between multiple locations to piece together the entire functionality.
- **Violation of the DRY principle**: DRY (Don't Repeat Yourself) encourages developers to write code in a modular and reusable manner. This means identifying common functionality and encapsulating it in functions, classes, or modules. By doing so, this functionality can be accessed from multiple parts of the codebase without duplication.
- **Code Bloat**: Duplicated code can lead to code bloat, where the codebase becomes unnecessarily large and complex. This can affect the performance of the software and make it harder to maintain and extend.
- **Error-Prone**: Duplicated code increases the chances of introducing errors into your software. If a bug is found in one instance of duplicated code and fixed, it's easy to forget to make the same fix in other duplicated instances. This can lead to inconsistent behavior and hard-to-trace bugs.
- **Maintenance**: When the same code is duplicated in multiple places within a codebase, it becomes more difficult to maintain and update the software. Any changes or bug fixes that need to be applied to that code must be made in multiple locations, increasing the likelihood of introducing inconsistencies or errors.

## Refactoring Recipes

Similar to the Dead code smell, duplicate code can also refer to anything in our codebase - a variable, parameter, field, method, or even a class. However, in most cases, it is likely to be methods or functions. Hence, the skills needed for refactoring also differ based on the type of duplicate code.

Here are some refactoring skills that can match Duplicated Code smell from [Smells to Refactorings Cheatsheet](https://www.industriallogic.com/blog/smells-to-refactorings-cheatsheet/).

- Chain Constructors
- Extract Composite
- Extract Method
- Extract Class
- Form Template Method
- Introduce Null Object
- Introduce Polymorphic Creation with Factory Method
- Pull Up Method
- Pull Up Field
- Replace One/Many Distinctions with Composite
- Substitute Algorithm
- Unify Interfaces with Adapter

I will explain the details of each refactoring skill in the next blog.

### Reference

[https://refactoring.guru/smells/duplicate-code](https://refactoring.guru/smells/duplicate-code)