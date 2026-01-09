# Day 31. Couplers > Message Chains 訊息鏈

Created: July 29, 2023 9:53 PM

## 氣味的徵兆

訊息鏈（Message Chains）又被稱為「火車殘骸（Train Wrecks）」，當我們執行方法時會需要呼叫一個物件，然後該物件又需要呼叫另外一個物件，以此類推長長串在一起。在一連串物件互動中傳遞資料與訊息可能會導致過長而緊密耦合的訊息鏈。這個現象表示該方法在類別結構中實作時，物件之間彼此的相依性過高。

一長串有先後順序的的方法呼叫同時也表示著在其中隱藏著關係依賴。同樣地，使用一連串臨時變數來承接方法的回傳結果，也可能隱藏了方法串問題。這個氣味的困難點在於，訊息鏈中的任何改動都需要成員物件同時進行相應的更改，擴大改動的範圍。

然而，有些情況下，透過物件委託成串是有其必要的，帶有少數外部依賴連結的訊息鏈通常被認可為是無害的。訊息鏈是否可以合理存在，通常取決於許多因素。對於高度耦合的訊息鏈設計，可以參考下面提到的各種設計原則。

需要特別留意「Message Chain」和「Middle Man」這兩種氣味密切相關，有時互為因果。需要在兩者氣味之間取得平衡。

## 氣味的原因

以下是 Message Chains 為何成為問題的原因：

- **高耦合**：訊息鏈會在物件之間建立緊密耦合，諸如 **`objectA.getObjectB().getObjectC().getValue()`** 這樣的方法呼叫中，每個物件都直接依賴於訊息鏈中的下一個物件。這種緊耦合會使得程式碼變得不夠靈活，且難以修改，因為鏈中的一小部分變更都可能會對其他部分產生連鎖反應。
- **違反「直說勿問」原則**：訊息鏈違反「直說勿問」原則。在鏈中的初始物件不斷查詢其他物件以獲得資料，並根據該資料做出決策，而不是直接下指示讓物件執行操作。這會導致違反以物件導向風格，而是更多以流水線（procedural）風格的程式碼。
- **違反迪米特法則**：訊息鏈違反「迪米特法則」，這也被稱之為「最少知識原則」。該原則建議物件對其他物件的內部結構所知越少越好。在訊息鏈中，一個物件通常需要對鏈中其他成員的結構有很多了解。
- **降低封裝性**：訊息鏈需要將物件的內部細節暴露給呼叫者。例如，如果 **`objectA`** 需要訪問 **`objectB`** 的方法，它可能需要公開這些方法，這違反了封裝原則並暴露了實作細節。
- **脆弱性**：對訊息鏈中的結構或中間物件的行為進行任何改變都可能導致訊息鏈斷裂。這種脆弱性使得程式碼變得不夠堅固，更容易出錯。
- **維護挑戰**：當訊息鏈很長時，維護和理解程式碼也會變得更加具有挑戰性。開發人員需要追蹤整個訊息鏈才得以理解正在發生的事情，且除錯可能也會變得繁瑣。
- **降低可測試性**：訊息鏈存在時進行測試變得更加困難，因為隔離單一物件的行為以進行單元測試變得困難。可能不得不需要測試整個訊息鏈，這會使得單元測試變得不夠集中且維護成本增加。

## 對應的重構技巧

- Hide Delegate
- Extract Method
- Move Method

### 隱藏中介 Hide Delegate

這個技巧透過方法或屬性的中介（Delegate）來封裝來自訊息鏈中的訪問，解決了訊息鏈過長的問題。這隱藏了類別之間的直接連接，減少了相互依賴，促進更好的封裝。

然而，這也引入了兩個類別之間的「中間人（Middle Man）」，這可能潛在地導致另一個程式碼異味。

### 抽出方法 Extract Method

「抽出方法」可以用來解決訊息鏈的氣味，方法是建立一個新的方法來封裝訊息鏈中過長的呼叫。訊息鏈實質上不過是在多個物件上進行方法呼叫的序列，因此我們可以通過在包含訊息鏈的類別中創建出一個新方法來取而代之。這個新方法將取代整個物件方法鏈，返回最終所需的結果或執行必要的操作。

### 移動方法 Move Method

當我們遇到緊密耦合的長訊息鏈時，解決這個問題的一種方式是將方法從原本的類別位置移動到另外一個邏輯上更適合的類別中。這將有助於打破長長的訊息鏈並改善程式碼組織結構，同時也有助於減少類別之間的相互依賴關係。

---

## Sign of Smell

Message Chains, also known as Train Wrecks, occur when a client requests an object, which in turn requests another object, and so on. Navigating through a series of object interactions can result in long and tightly coupled chains. These chains indicate that the client depends heavily on traversing the class structure.

Long sequences of method calls indicate hidden dependencies as intermediaries. Similarly, using a sequence of temporary variables could also hide the sequence of methods. The issue with this problem is that any modification in the intermediate relationship requires the client to make changes as well.

However, there are situations where delegations become necessary, and delegation chains with a few links are generally considered to be harmless. The number of links that a chain can reasonably have is often dependent on other factors. For more guidance on designs with highly coupled chained delegations, consider the other design maxims mentioned below.

Notice that Message Chain and Middle Man are closely related and often one leads to the other.

## Reason of Smell

Here's why Message Chains are problematic:

- **Tight Coupling**: Message Chains create tight coupling between objects. In a chain of method calls like **`objectA.getObjectB().getObjectC().getValue()`**, each object depends directly on the next one in the chain. This tight coupling makes the code less flexible and more difficult to modify because changes in one part of the chain can have a ripple effect on other parts.
- **Violation of "Tell, Don't Ask"**: Message Chains often violate the "Tell, Don't Ask" principle. Instead of instructing objects to perform actions, the client object in the chain repeatedly queries other objects for data and makes decisions based on that data. This leads to a less object-oriented and more procedural style of code.
- **Violation of Law of Demeter**: Message Chains often violate the Law of Demeter, also known as the "principle of least knowledge." This principle suggests that an object should have limited knowledge of the internal structure of other objects. In Message Chains, one object often has to know a lot about the structure of several other objects in the chain.
- **Reduced Encapsulation**: Message Chains often require exposing internal details of objects to the caller. For example, if **`objectA`** needs to access methods from **`objectB`**, it may need to expose those methods publicly, violating the principle of encapsulation and hiding implementation details.
- **Brittleness**: Any changes to the structure of the chain or the behavior of intermediate objects can break the chain. This brittleness makes the code less robust and more prone to errors.
- **Maintenance Challenges**: When you have long chains of method calls, it becomes challenging to maintain and understand the code. Developers need to trace the entire chain to comprehend what's happening, and debugging can be cumbersome.
- **Reduced Testability**: Testing becomes more challenging when there are message chains because isolating the behavior of a single object for testing purposes is difficult. Testing the entire chain may be necessary, making unit tests less focused and harder to maintain.

## Refactoring Recipes

- Hide Delegate
- Extract Method
- Move Method

### Hide Delegate

It solves the Message Chains by encapsulating access from a long object or method chain within a delegating method or property. This hides the direct connection between classes, reducing interdependence and promoting better encapsulation.

However, it introduces a "Middle Man" between the two classes, which could potentially cause another code smell.

### Extract Method

The “Extract Method” can solve the smell by encapsulating the chain of method calls within a single method. A Message Chain is nothing but a sequence of method calls on multiple objects, so we can replace it by creating a new method in the class that contains the Message Chain. This method will replace the entire chain and should return the desired result or perform the necessary action.

### Move Method

When we come across a tightly coupled long method chain, one way to address this issue is by moving a method from one class to another, where it logically belongs. This helps to break the chain and improve code organization. This approach helps to reduce the interdependence between the classes.

### Reference

[https://luzkan.github.io/smells/message-chain](https://luzkan.github.io/smells/message-chain)

[https://refactoring.guru/smells/message-chains](https://refactoring.guru/smells/message-chains)

[https://oowisdom.csse.canterbury.ac.nz/index.php/Message_chain_smell](https://oowisdom.csse.canterbury.ac.nz/index.php/Message_chain_smell)

[https://stackoverflow.com/questions/6609296/message-chains-vs-middle-man](https://stackoverflow.com/questions/6609296/message-chains-vs-middle-man)

[https://wiki.c2.com/?TrainWreck](https://wiki.c2.com/?TrainWreck)