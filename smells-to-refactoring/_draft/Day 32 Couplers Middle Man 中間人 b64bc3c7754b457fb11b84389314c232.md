# Day 32. Couplers > Middle Man 中間人

Created: July 29, 2023 9:52 PM

## 氣味的徵兆

如果一個類別除了當作另外一個類別的中間通道之外，沒有提供額外更多的價值，我們可以稱呼這種情況為「中間人（Middle Man）」氣味。物件導向中一個非常核心的基本概念就是封裝（encapsulation），這可以幫助我們把內部的實作細節隱藏起來，只保留少數公開接口供外部使用。實作封裝時通常離不開中介（delegation），但有時我們可能會使用過頭，造成一些問題。當我們仔細檢查類別的介面時，可能會發現一些公開方法除了轉介其他類別資訊以外別無他用。

事實上，「中間人」這樣的設計在很多時候是有意為之。例如說，一些常見的設計模式，如代理模式（Proxy）或裝飾模式（Decorator），都會增加中間人來達到解耦合的效果。這同時也可以用來幫助我們改善「訊息鏈（Message Chain）」氣味，或是降低類別之間的相互依賴關係。然後，經歷多次的重構或過度「中介」，可能會使得「中間人」變成一個徒具形式的空殼，除了左手轉右手之外沒有其他存在的價值與意義。

## 氣味的原因

- **降低可讀性**：中間人的存在可能會掩蓋出發類別和目標類別之間的直接關係。閱讀程式碼的開發者可能需要透過中間人才能找到實際的實作，這可能會增加認知上的額外成本，也降低程式碼的可讀性。
- **不必要的抽象化**：在某些情況下，中間人增加了不必要的抽象層次，並不符合系統的最佳架構或設計。這種抽象化可能會使程式碼庫變得更複雜，但卻沒有得到相應的好處。
- **違反「直說勿問」原則**：中介物通常也會違反「直說勿問」原則。它僅僅將請求傳遞給其他物件，更像是一個被動等待訊息的郵差，而不是架構內的主動參與者，無法指示物件執行操作。
- **維護成本**：充斥中間人氣味的類別增加了無謂的維護成本。任何關於出發類別和目標類別之間互動的變動可能都需要在中間人類別中進行相應的變更，這將導致在程式碼維護方面需要更多的努力。

## 對應的重構技巧

在原有的對照表中只有三種，但我參考網路資料增加了Move Method對應。

- Remove Middle Man
- Inline Method
- Move Method
- Replace Delegation with Inheritance

### 移除中間人 Remove Middle Man

如果中間人類別除了傳遞請求之外沒有其他意圖或目的，我們可以考慮移除中間人，讓出發類別直接與目標類別互動，減少程式碼複雜度。

### 內聯方法 Inline Method

與上一個重構類似，但是把中間人的方法實作重構作為目標類別的內聯方法（Inline Method），然後由出發類別直接呼叫這個位於目標類別的內聯方法。

### 移動方法 **Move Method**

如果中間人除了中介呼叫以外，還有直接少量業務邏輯時，我們可以考慮將這個中介方法向前或向後搬移到出發類別或目標類別中，讓呼叫的流程更短更直接更簡潔。至於要往前還是往後搬移方法，則取決於哪一個移動方向後從架構上看更加合理。

### 將中介改為計程 Replace Delegation with Inheritance

透過這個重構技巧移除中間人類別，我們首先可以先識別中間人所在的位置，接著建立一個新的子類別，繼承自目標類別，並覆寫需要被中介的方法。將原本出發類別中透過中間人呼叫的方法替換為新的子類別的實體物件，這就是由繼承取代中介的技巧。

---

## Sign of Smell

If a class does nothing but just delegate to another class, it is commonly considered a middleman smell. One of the main features of objects is encapsulation, which involves hiding internal details from the outside world. Encapsulation often involves delegation, but it is possible for delegation to become excessive. When examining a class's interface, you may discover that a considerable portion of its methods are solely delegating to another class without any additional functionality.

Originally, the Middle Man smell was introduced into our codebase for good reasons. For instance, certain design patterns, like Proxy or Decorator, intentionally add a middleman as a decoupling pattern. It can also be used to address the Message Chains smell or to avoid dependencies between classes. However, after refactoring or becoming over-zealous, these middlemen may turn into empty shells that only delegate without performing any other meaningful actions.

## Reason of Smell

- **Reduced Readability**: The presence of a middleman can obscure the direct relationship between the client and the target class. Developers reading the code may need to navigate through the middleman to find the actual implementation, which can increase cognitive load and reduce code readability.
- **Unnecessary Abstraction**: In some cases, the Middle Man adds an unnecessary level of abstraction that doesn't align with the system's architecture or design. This abstraction can make the codebase more complex without a corresponding benefit.
- **Violation of "Tell, Don't Ask"**: The Middle Man often violates the "Tell, Don't Ask" principle. Instead of instructing objects to perform actions, it merely passes requests along, behaving more like a passive messenger than an active participant in the system.
- **Maintenance Overhead**: The Middle Man class adds maintenance overhead. Any changes or updates to the interactions between the client and the target class may require corresponding changes in the Middle Man, leading to more effort and complexity in code maintenance.

## Refactoring Recipes

- Remove Middle Man
- Inline Method
- Move Method
- Replace Delegation with Inheritance

### Remove Middle Man

If the middleman serves no purpose other than forwarding requests, we can remove it entirely and refactor the client to interact directly with the target class.

### Inline Method

If the Middle Man simply delegates all method calls to another class without adding any value, you can eliminate the Middle Man and directly call methods on the target class.

### **Move Method**

If the Middle Man does have some meaningful behavior but not enough to justify its existence, you can move its methods to the client or the target class, depending on where they make more sense.

### Replace Delegation with Inheritance

To remove the Middle Man class in your codebase by this skill, we can identify the class it delegates calls to. Create a new subclass that inherits from this target class and overrides the delegated methods. Replace instances of the Middle Man class with instances of the new subclass, updating the references accordingly.

### Reference

[https://refactoring.guru/smells/middle-man](https://refactoring.guru/smells/middle-man)

[https://luzkan.github.io/smells/middle-man](https://luzkan.github.io/smells/middle-man)

[https://www.informit.com/articles/article.aspx?p=1400866&seqNum=16](https://www.informit.com/articles/article.aspx?p=1400866&seqNum=16)

[https://refactoring.guru/remove-middle-man](https://refactoring.guru/remove-middle-man)

[https://refactoring.guru/inline-method](https://refactoring.guru/inline-method)

[https://refactoring.guru/replace-delegation-with-inheritance](https://refactoring.guru/replace-delegation-with-inheritance)