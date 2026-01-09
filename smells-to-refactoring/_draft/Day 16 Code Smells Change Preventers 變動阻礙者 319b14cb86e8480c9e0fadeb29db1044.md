# Day 16. Code Smells > Change Preventers 變動阻礙者

Created: July 29, 2023 9:49 PM

經過兩週共16天的挑戰，完成了兩個氣味的介紹進入第三種氣味分類：「改變的阻礙者（Change Preventers）」。

如果我在系列文[首日的文章](https://ithelp.ithome.com.tw/articles/10314249)提及，許多人不喜愛重構，因為他們認為重構的過程並沒有新增功能或是修復錯誤，徒然增加更多的變動風險與成本，影響了現有系統的穩定。這個觀點固然有其根據，在Sandi的演講中也提及，如果你的專案有明確的結束時間或是再也不需要任何改動，那我們其實可以大方選擇忽視這些氣味，大步走過、恍若未聞。

但假如真的存在一個現有專案沒有任何修改需求的情況下，實際上公司與團隊也無需花錢聘請開發者（我們的薪水）。所以我認為普遍來說，新需求總是接踵而來。

> 世上唯一不變的只有改變本身。 — D.B. Coulson
> 

正因為「改變」是如此無法阻擋也難以預期，作為開發者，想盡辦法讓「改變」能夠安全有效率的進行，我認為是我們的專業之一。測試驅動開發（Test-Driven Development, aka TDD）之父Kent Beck曾經提供一個關於應對改變與重構非常簡短卻震撼人心的指導原則：

> 面對即將來臨的改變時，首先讓「改變」本身變得簡單（警告：這可能相當困難），接著我們進行「簡單」的改變。— Kent Beck
> 

話句話說，當你的程式碼面對改變到來之時，需要付出龐大且高額的代價時，你的程式碼可能正散發著「變動阻礙者（Change Preventers）」的氣味，讓你無法輕易對程式碼作出改動。

接下來我們看看這個分類下有哪些氣味：

### Divergent Change 發散式修改

當你要對程式碼的某一處作出修正時，你必須同時對不相關但卻相對應的某些地方同時改動。

### Shotgun Surgery 散彈槍手術

做出一個改動需的同時必須對許多小地方同時改動。

### Parallel Inheritance Hierarchies 平行繼承的階層關係

當你新增一個子類別時，你發現你必須在另外一個類別同時也建立子類別。

我們在接下來的文章會分別介紹這三種氣味。

---

> These are smells that make change hard.
> 

As mentioned in my first article, some people dislike refactoring because they believe that it does not add any new features or fix bugs, and it may introduce additional risks to the stable old code. This is a valid point. Sandi Metz has also stated that if your project is only used once and never requires any new features or modifications, then code smell might be acceptable. In such cases, we can choose to ignore it and move on. However, in cases where no requirements or modifications are needed, it is pointless to hire a developer. So, I believe that in most cases, new features and requirements keep coming to the developers.

> The only thing that never changes is change itself. — D.B. Coulson
> 

Because change is unavoidable and hard to predict, knowing how to do it safely and efficiently is one of the key skills for developers when writing code. Kent Beck, the father of Test-Driven Development (TDD), suggests a specific direction to target when performing the refactoring task.

> For each desired change, make the change easy (warning: this may be hard), then make the easy change. — Kent Beck
> 

In short, when your code is hard to change, it might be a sign of code smell called “Change Preventers”. Let's take a look at some common code smells in this catalog:

### Divergent Change

When you need to change something in one part of your code, you often have to make many corresponding changes in other unrelated parts as well.

### Shotgun Surgery

Making changes requires many small changes to be made to various classes at the same time.

### Parallel Inheritance Hierarchies

When you create a new subclass for a class, you may find yourself needing to create a subclass for another class as well.

### Reference

[https://twitter.com/KentBeck/status/250733358307500032](https://twitter.com/KentBeck/status/250733358307500032)

[https://refactoring.guru/refactoring/smells/change-preventers](https://refactoring.guru/refactoring/smells/change-preventers)