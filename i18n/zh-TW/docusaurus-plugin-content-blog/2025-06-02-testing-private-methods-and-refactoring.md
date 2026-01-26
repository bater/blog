---
authors:
- bater
date: '2025-06-02'
slug: testing-private-methods-and-refactoring
tags:
- Testing
- Refactoring
- Clean Code
- TDD
- Software Design
title: 精通私有方法與重構：實用指南
---

在軟體開發的世界裡，我們不斷在**封裝**和**可測試性**之間取得平衡。你希望有乾淨、隱藏的實作細節來保持程式碼的模組化，但你也需要測試關鍵邏輯以避免討厭的 bug。最近，我們團隊處理了一個龐然大物般的公開方法——龐大、複雜，而且迫切需要重構。我們把它拆分成私有輔助方法以增加清晰度，但隨後問題來了：**我們該如何測試這些私有方法？**

<!-- truncate -->

這個爭論和程式碼本身一樣古老，但它仍然是個熱門話題。讓我們深入探討測試私有方法和重構大型函式的優缺點和實用策略，並加上一些程式碼讓它更具體。

## 你應該測試私有方法嗎？

業界對此意見分歧。純粹主義者說**絕不**——他們有很好的理由：

- **違反封裝**：私有方法本應保持隱藏。使用反射等技巧來測試它們會讓你的測試與內部細節綁定，使測試變得脆弱並違背封裝的精神。
- **脆弱的測試**：針對私有方法的測試在重構時很容易失敗，累積技術債。
- **專注於行為**：單元測試應該驗證類別**做什麼**，而不是它如何做。透過公開 API 進行測試以保持穩健性。

但有時候，規則是可以變通的。以下是測試私有方法可能有意義的情況：

- **複雜邏輯**：如果私有方法處理關鍵的業務規則，直接測試可以捕捉邊緣案例。
- **TDD 工作流程**：在測試驅動開發中，你可能會在小邏輯單元成為公開 API 的一部分之前先測試它們。
- **覆蓋率要求**：如果你的團隊要求 80% 以上的程式碼覆蓋率，私有方法可能需要直接測試才能達到這些目標。

## 真正的問題：你的設計是否在求救？

如果你很想測試一個私有方法，這通常是一個設計需要重新思考的警訊。那個方法可能做了太多事情，渴望成為它自己的類別或模組。這就是**單一職責原則（SRP）**發光的地方。讓我們重構來使測試更容易*同時*改善你的程式碼結構。

### 範例：重構大型方法

這是一個混亂的公開方法，根據使用者類型和購買歷史計算折扣。它是個龐然大物，所以讓我們來拆解它。

```java
public class OrderProcessor {
    public double calculateDiscount(Order order, User user) {
        double discount = 0.0;
        if (user.isPremium()) {
            if (order.getTotal() > 100) {
                discount = order.getTotal() * 0.2;
            } else {
                discount = order.getTotal() * 0.1;
            }
            if (user.getPurchaseHistory().size() > 5) {
                discount += 5.0;
            }
        } else {
            if (order.getTotal() > 200) {
                discount = order.getTotal() * 0.05;
            }
        }
        return discount;
    }
}
```

這個方法做了太多事情——高級會員檢查、購買歷史邏輯和折扣計算全部混在一起。讓我們把它重構成私有輔助方法，然後考慮測試。

```java
public class OrderProcessor {
    public double calculateDiscount(Order order, User user) {
        if (user.isPremium()) {
            return calculatePremiumDiscount(order, user);
        }
        return calculateStandardDiscount(order);
    }

    private double calculatePremiumDiscount(Order order, User user) {
        double baseDiscount = order.getTotal() > 100 ? order.getTotal() * 0.2 : order.getTotal() * 0.1;
        return baseDiscount + applyLoyaltyBonus(user);
    }

    private double calculateStandardDiscount(Order order) {
        return order.getTotal() > 200 ? order.getTotal() * 0.05 : 0.0;
    }

    private double applyLoyaltyBonus(User user) {
        return user.getPurchaseHistory().size() > 5 ? 5.0 : 0.0;
    }
}
```

現在程式碼更乾淨了，但我們應該測試那些私有方法嗎？相反，考慮將 `calculatePremiumDiscount` 和 `applyLoyaltyBonus` 提取到一個 `DiscountCalculator` 類別中。這使它們成為公開的、可測試的和可重用的。

```java
public class DiscountCalculator {
    public double calculatePremiumDiscount(Order order, User user) {
        double baseDiscount = order.getTotal() > 100 ? order.getTotal() * 0.2 : order.getTotal() * 0.1;
        return baseDiscount + applyLoyaltyBonus(user);
    }

    public double applyLoyaltyBonus(User user) {
        return user.getPurchaseHistory().size() > 5 ? 5.0 : 0.0;
    }
}

public class OrderProcessor {
    private final DiscountCalculator discountCalculator;

    public OrderProcessor(DiscountCalculator discountCalculator) {
        this.discountCalculator = discountCalculator;
    }

    public double calculateDiscount(Order order, User user) {
        if (user.isPremium()) {
            return discountCalculator.calculatePremiumDiscount(order, user);
        }
        return order.getTotal() > 200 ? order.getTotal() * 0.05 : 0.0;
    }
}
```

現在你可以直接測試 `DiscountCalculator` 的方法而不破壞封裝。問題解決！

## 測試和重構的實用策略

以下是你的選項快速指南：

| 方法 | 優點 | 缺點 | 何時使用 |
| ---------- | ------ | ------ | ------------- |
| **透過公開 API 測試** | 保持封裝完整；測試真實世界的使用 | 可能遺漏邊緣案例 | 穩健測試的預設選擇 |
| **使用反射** | 無需修改程式碼即可測試私有邏輯 | 脆弱且維護成本高 | 僅用於除錯或遺留程式碼 |
| **更改可見性** | 使測試更容易 | 削弱封裝 | 很少使用，除非沒有更好的選項 |
| **提取到類別** | 增強模組化和可測試性 | 增加複雜性 | 適合複雜邏輯 |

## 最後的想法：設計驅動可測試性

測試不僅僅是關於覆蓋率——它是你程式碼設計的鏡子。難以測試的程式碼在呼喊著要重構。透過擁抱 SRP、高內聚和低耦合，你將打造出天生就可測試且可維護的系統。

所以，下次當你想測試一個私有方法時，暫停一下並問：**這個邏輯是否在試圖掙脫束縛？** 明智地重構，你的程式碼——和你的測試——都會感謝你。

祝你編碼愉快，讓我們一起繼續建構優雅、有韌性的系統！
