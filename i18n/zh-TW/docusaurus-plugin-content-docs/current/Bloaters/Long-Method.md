---
sidebar_position: 2
title: 過長方法
---

# 過長方法

過長方法是你會遇到的最常見的程式碼氣味。如果你看到一個超過十行的方法，就應該保持懷疑。每個方法在第一次提交時都很小，但隨著新功能的到來，開發者經常認為添加「幾行」比適當的重構更容易。

透過每個 sprint 重複這個過程，方法變得越來越長，創造了一連串的問題，使你的程式碼更難維護、測試和理解。

## 氣味的跡象

### 方法超過 10 行以上
雖然不是硬性規則，但這是一個值得懷疑的好門檻：

```javascript
// 警告：這個方法做了太多事情
function processOrder(order) {
  // 驗證
  if (!order.items || order.items.length === 0) {
    throw new Error('訂單必須有項目');
  }
  if (!order.customer || !order.customer.email) {
    throw new Error('訂單必須有客戶電子郵件');
  }

  // 計算總額
  let subtotal = 0;
  for (let item of order.items) {
    subtotal += item.price * item.quantity;
  }
  let tax = subtotal * 0.08;
  let total = subtotal + tax;

  // 套用折扣
  if (order.customer.isVIP) {
    total *= 0.9;
  }

  // 處理付款
  const paymentResult = paymentService.charge(order.payment, total);
  if (!paymentResult.success) {
    throw new Error('付款失敗');
  }

  // 發送確認
  emailService.send(order.customer.email, '訂單確認', `總計: $${total}`);

  // 更新庫存
  for (let item of order.items) {
    inventory.reduce(item.productId, item.quantity);
  }

  return { orderId: generateId(), total, paymentResult };
}
```

### 多個抽象層次
當一個方法同時處理高階邏輯和低階細節時：

```javascript
function generateReport(users) {
  // 高階：報告生成邏輯
  const report = {
    title: '使用者報告',
    generatedAt: new Date(),
    users: []
  };

  // 低階：資料處理細節
  for (let user of users) {
    if (user.isActive && user.lastLoginDate) {
      const daysSinceLogin = Math.floor(
        (Date.now() - user.lastLoginDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceLogin <= 30) {
        report.users.push({
          name: user.firstName + ' ' + user.lastName,
          email: user.email,
          lastLogin: user.lastLoginDate.toISOString().split('T')[0],
          status: daysSinceLogin <= 7 ? '最近' : '活躍'
        });
      }
    }
  }

  // 更多低階格式化
  report.summary = `${report.users.length} 位活躍使用者（共 ${users.length} 位）`;

  return report;
}
```

## 為什麼過長方法是有問題的

### 難以閱讀和理解
當方法變長時，理解和維護變得越來越困難。這很容易導致錯誤和 bug。開發者花更多時間解讀程式碼做什麼，而不是專注於業務邏輯。

### 違反單一職責原則
過長方法經常違反 SRP，這是 SOLID 設計原則的一部分。一個方法應該只有一個職責，並完全被該職責所封裝。

### 潛在的副作用
過長方法經常涉及多個子任務，這可能導致意外的行為。這些方法負責比必要更多的任務，而且可能有多個需要變更的原因。

### 程式碼重複
當比較兩個過長方法時，它們經常包含重複的程式碼。透過將它們拆分成更小的方法，你可以識別它們共享邏輯的方式。

### 效能問題
「沒有程式碼比沒有程式碼更快。」最快的程式碼通常做最少的工作。過長方法經常做比必要更多的工作，影響效能。

### 測試困難
如果一個方法執行大量程式碼，它需要大量的測試案例來覆蓋所有可能的路徑。這使測試耗時，並可能導致缺陷。

## 重構技術

### 1. 提取方法
拆分過長方法的主要技術：

```javascript
// 之前：過長方法做太多事情
function processOrder(order) {
  // 驗證邏輯
  if (!order.items || order.items.length === 0) {
    throw new Error('訂單必須有項目');
  }
  if (!order.customer || !order.customer.email) {
    throw new Error('訂單必須有客戶電子郵件');
  }

  // 計算邏輯
  let subtotal = 0;
  for (let item of order.items) {
    subtotal += item.price * item.quantity;
  }
  let tax = subtotal * 0.08;
  let total = subtotal + tax;

  // 付款處理
  const paymentResult = paymentService.charge(order.payment, total);
  if (!paymentResult.success) {
    throw new Error('付款失敗');
  }

  return { orderId: generateId(), total, paymentResult };
}

// 之後：提取成專注的方法
function processOrder(order) {
  validateOrder(order);
  const totals = calculateOrderTotals(order);
  const paymentResult = processPayment(order.payment, totals.total);

  return { orderId: generateId(), total: totals.total, paymentResult };
}

function validateOrder(order) {
  if (!order.items || order.items.length === 0) {
    throw new Error('訂單必須有項目');
  }
  if (!order.customer || !order.customer.email) {
    throw new Error('訂單必須有客戶電子郵件');
  }
}

function calculateOrderTotals(order) {
  const subtotal = order.items.reduce((sum, item) =>
    sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return { subtotal, tax, total };
}

function processPayment(paymentInfo, amount) {
  const result = paymentService.charge(paymentInfo, amount);
  if (!result.success) {
    throw new Error('付款失敗');
  }
  return result;
}
```

### 2. 分解條件式
將複雜的條件邏輯拆分成獨立的方法：

```javascript
// 之前：過長方法中的複雜條件式
function calculateDiscount(customer, order) {
  let discount = 0;

  if (customer.isVIP && customer.yearsActive > 2 && order.total > 100) {
    if (order.items.some(item => item.category === 'premium')) {
      discount = order.total * 0.15;
    } else {
      discount = order.total * 0.10;
    }
  } else if (customer.isVIP && order.total > 50) {
    discount = order.total * 0.05;
  } else if (order.total > 200) {
    discount = order.total * 0.02;
  }

  return Math.min(discount, order.total * 0.3); // 最高 30% 折扣
}

// 之後：分解的條件式
function calculateDiscount(customer, order) {
  if (isEligibleForVIPDiscount(customer, order)) {
    return calculateVIPDiscount(customer, order);
  }

  if (isEligibleForLargeOrderDiscount(order)) {
    return calculateLargeOrderDiscount(order);
  }

  return 0;
}

function isEligibleForVIPDiscount(customer, order) {
  return customer.isVIP && order.total > 50;
}

function calculateVIPDiscount(customer, order) {
  const baseRate = isPremiumVIP(customer, order) ? 0.15 : 0.10;
  const discount = order.total * baseRate;
  return Math.min(discount, order.total * 0.3);
}

function isPremiumVIP(customer, order) {
  return customer.yearsActive > 2 &&
         order.total > 100 &&
         order.items.some(item => item.category === 'premium');
}
```

### 3. 用方法物件替換方法
對於極其複雜的方法，轉換成一個類別：

```javascript
// 之前：有很多區域變數的超長方法
function calculateComplexPricing(product, customer, order, promotions) {
  // 50 行以上的複雜定價邏輯和很多變數
  let basePrice = product.price;
  let customerDiscount = 0;
  let volumeDiscount = 0;
  let seasonalAdjustment = 1.0;
  // ... 更多變數和複雜計算
}

// 之後：方法物件
class PricingCalculator {
  constructor(product, customer, order, promotions) {
    this.product = product;
    this.customer = customer;
    this.order = order;
    this.promotions = promotions;

    this.basePrice = product.price;
    this.customerDiscount = 0;
    this.volumeDiscount = 0;
    this.seasonalAdjustment = 1.0;
  }

  calculate() {
    this.calculateBasePrice();
    this.applyCustomerDiscount();
    this.applyVolumeDiscount();
    this.applySeasonalAdjustment();
    this.applyPromotions();

    return this.getFinalPrice();
  }

  calculateBasePrice() {
    this.basePrice = this.product.price * this.order.quantity;
  }

  applyCustomerDiscount() {
    if (this.customer.isVIP) {
      this.customerDiscount = this.basePrice * 0.1;
    }
  }

  // ... 其他專注的方法
}

// 使用
function calculateComplexPricing(product, customer, order, promotions) {
  return new PricingCalculator(product, customer, order, promotions).calculate();
}
```

## 完整重構目錄

### 組合方法
1. **提取方法** - 將邏輯區塊提取到獨立方法
2. **內聯方法** - 移除不必要的方法間接性
3. **提取變數** - 為複雜表達式引入解釋性變數
4. **用查詢替換臨時變數** - 用方法呼叫替換臨時變數
5. **用方法物件替換方法** - 將複雜方法轉換成類別
6. **替換演算法** - 用更清晰的演算法替換整個演算法

### 簡化方法呼叫
1. **引入參數物件** - 將相關參數分組到物件中
2. **保持整個物件** - 傳遞整個物件而非個別欄位

### 簡化條件表達式
1. **分解條件式** - 將條件、then 和 else 部分提取成方法
2. **用策略替換條件邏輯** - 對複雜條件使用策略模式
3. **用命令替換條件分派器** - 使用命令模式進行分派

## 關鍵要點

- **對超過 10 行的方法保持懷疑** - 它們通常做太多事情
- **提取方法是你的主要武器** - 將長方法拆分成專注、命名良好的函式
- **專注於單一職責** - 每個方法應該做好一件事
- **提升可測試性** - 較小的方法更容易測試和除錯
- **增強可讀性** - 命名良好的小方法就是文件

記住：重構過長方法不只是讓程式碼變短——而是讓它對未來的你和你的團隊更可維護、更可測試、更易理解。

## 參考資料

- [Refactoring Guru - Long Method](https://refactoring.guru/smells/long-method)
- [Industrial Logic Smells to Refactorings](https://www.industriallogic.com/img/blog/2005/09/smellstorefactorings.pdf)
- Fowler, Martin. *Refactoring: Improving the Design of Existing Code*
- Kerievsky, Joshua. *Refactoring to Patterns*
