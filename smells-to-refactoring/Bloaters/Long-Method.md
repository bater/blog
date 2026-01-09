---
sidebar_position: 2
title: Long Method
---

# Long Method

Long methods are the most common code smell you'll encounter. If you see a method with more than ten lines, be suspicious. Every method starts small when first committed, but as new features arrive, developers often think adding "just a few more lines" is easier than proper refactoring.

By repeating this process every sprint, methods become longer and longer, creating a cascade of problems that make your code harder to maintain, test, and understand.

## Signs of the Smell

### Methods Exceeding 10+ Lines
While not a hard rule, this is a good threshold for suspicion:

```javascript
// Warning: This method is doing too much
function processOrder(order) {
  // Validation
  if (!order.items || order.items.length === 0) {
    throw new Error('Order must have items');
  }
  if (!order.customer || !order.customer.email) {
    throw new Error('Order must have customer email');
  }
  
  // Calculate totals
  let subtotal = 0;
  for (let item of order.items) {
    subtotal += item.price * item.quantity;
  }
  let tax = subtotal * 0.08;
  let total = subtotal + tax;
  
  // Apply discounts
  if (order.customer.isVIP) {
    total *= 0.9;
  }
  
  // Process payment
  const paymentResult = paymentService.charge(order.payment, total);
  if (!paymentResult.success) {
    throw new Error('Payment failed');
  }
  
  // Send confirmation
  emailService.send(order.customer.email, 'Order Confirmation', `Total: $${total}`);
  
  // Update inventory
  for (let item of order.items) {
    inventory.reduce(item.productId, item.quantity);
  }
  
  return { orderId: generateId(), total, paymentResult };
}
```

### Multiple Levels of Abstraction
When a method handles both high-level logic and low-level details:

```javascript
function generateReport(users) {
  // High-level: Report generation logic
  const report = {
    title: 'User Report',
    generatedAt: new Date(),
    users: []
  };
  
  // Low-level: Data processing details
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
          status: daysSinceLogin <= 7 ? 'Recent' : 'Active'
        });
      }
    }
  }
  
  // More low-level formatting
  report.summary = `${report.users.length} active users out of ${users.length} total`;
  
  return report;
}
```

## Why Long Methods Are Problematic

### Hard to Read and Understand
When a method grows longer, it becomes increasingly difficult to understand and maintain. This leads to mistakes and bugs easily. Developers spend more time deciphering what the code does rather than focusing on business logic.

### Violates Single Responsibility Principle
Long methods often violate SRP, part of the SOLID design principles. A method should have only one responsibility and be completely encapsulated by that responsibility.

### Potential Side Effects
Long methods often involve multiple subtasks, which can result in unexpected behavior. These methods are responsible for more tasks than necessary and likely have multiple reasons for requiring changes.

### Code Duplication
When comparing two long methods, they often contain duplicated code. By breaking them into smaller methods, you can identify ways for them to share logic.

### Performance Issues
"No code is faster than no code." The fastest code usually does the least work. Long methods often do more work than necessary, impacting performance.

### Testing Difficulties
If a method executes lots of code, it requires numerous test cases to cover all possible paths. This makes testing time-consuming and can lead to defects.

## Refactoring Techniques

### 1. Extract Method
The primary technique for breaking down long methods:

```javascript
// Before: Long method doing too much
function processOrder(order) {
  // Validation logic
  if (!order.items || order.items.length === 0) {
    throw new Error('Order must have items');
  }
  if (!order.customer || !order.customer.email) {
    throw new Error('Order must have customer email');
  }
  
  // Calculation logic
  let subtotal = 0;
  for (let item of order.items) {
    subtotal += item.price * item.quantity;
  }
  let tax = subtotal * 0.08;
  let total = subtotal + tax;
  
  // Payment processing
  const paymentResult = paymentService.charge(order.payment, total);
  if (!paymentResult.success) {
    throw new Error('Payment failed');
  }
  
  return { orderId: generateId(), total, paymentResult };
}

// After: Extracted into focused methods
function processOrder(order) {
  validateOrder(order);
  const totals = calculateOrderTotals(order);
  const paymentResult = processPayment(order.payment, totals.total);
  
  return { orderId: generateId(), total: totals.total, paymentResult };
}

function validateOrder(order) {
  if (!order.items || order.items.length === 0) {
    throw new Error('Order must have items');
  }
  if (!order.customer || !order.customer.email) {
    throw new Error('Order must have customer email');
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
    throw new Error('Payment failed');
  }
  return result;
}
```

### 2. Decompose Conditional
Break complex conditional logic into separate methods:

```javascript
// Before: Complex conditional in long method
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
  
  return Math.min(discount, order.total * 0.3); // Max 30% discount
}

// After: Decomposed conditionals
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

### 3. Replace Method with Method Object
For extremely complex methods, convert to a class:

```javascript
// Before: Very long method with many local variables
function calculateComplexPricing(product, customer, order, promotions) {
  // 50+ lines of complex pricing logic with many variables
  let basePrice = product.price;
  let customerDiscount = 0;
  let volumeDiscount = 0;
  let seasonalAdjustment = 1.0;
  // ... many more variables and complex calculations
}

// After: Method object
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
  
  // ... other focused methods
}

// Usage
function calculateComplexPricing(product, customer, order, promotions) {
  return new PricingCalculator(product, customer, order, promotions).calculate();
}
```

## Complete Refactoring Catalog

### Composing Methods
1. **Extract Method** - Pull out logical chunks into separate methods
2. **Inline Method** - Remove unnecessary method indirection
3. **Extract Variable** - Introduce explaining variables for complex expressions
4. **Replace Temp with Query** - Replace temporary variables with method calls
5. **Replace Method with Method Object** - Convert complex methods to classes
6. **Substitute Algorithm** - Replace entire algorithms with clearer ones

### Simplifying Method Calls
1. **Introduce Parameter Object** - Group related parameters into objects
2. **Preserve Whole Object** - Pass entire objects instead of individual fields

### Simplifying Conditional Expressions
1. **Decompose Conditional** - Extract condition, then, and else parts into methods
2. **Replace Conditional Logic with Strategy** - Use strategy pattern for complex conditions
3. **Replace Conditional Dispatcher with Command** - Use command pattern for dispatching

### Advanced Techniques
1. **Move Accumulation to Collecting Parameter** - Use parameter objects to collect results
2. **Move Accumulation to Visitor** - Use visitor pattern for complex traversals

## Key Takeaways

- **Be suspicious of methods over 10 lines** - They're often doing too much
- **Extract Method is your primary weapon** - Break long methods into focused, well-named functions
- **Focus on single responsibility** - Each method should do one thing well
- **Improve testability** - Smaller methods are easier to test and debug
- **Enhance readability** - Well-named small methods serve as documentation

Remember: refactoring long methods isn't just about making code shorter - it's about making it more maintainable, testable, and understandable for your future self and your team.

## References

- [Refactoring Guru - Long Method](https://refactoring.guru/smells/long-method)
- [Industrial Logic Smells to Refactorings](https://www.industriallogic.com/img/blog/2005/09/smellstorefactorings.pdf)
- Fowler, Martin. *Refactoring: Improving the Design of Existing Code*
- Kerievsky, Joshua. *Refactoring to Patterns*