---
sidebar_position: 7
title: Other Smells
---

# Other Smells

This section covers code smells that don't fit neatly into the main categories but are still important to recognize and address.

## Incomplete Library Class

In today's software industry, developers rarely write code from scratch. We rely heavily on third-party libraries and frameworks to meet our business requirements. The industry often reminds us to "avoid reinventing the wheel," and it's true that modern developers stand on the shoulders of community giants.

However, no matter how convenient third-party libraries are, they can never perfectly satisfy all our needs. We inevitably encounter those "almost there" moments when we wish these convenient tools could completely fulfill our requirements.

### Signs of the Smell

**Incomplete Library Class** occurs when:
- A third-party library lacks functionality you need
- The library author has refused to implement requested features
- Pull requests have been ignored for extended periods
- You cannot modify the library directly due to constraints

This is a special code smell because it doesn't belong to any of the main code smell categories and is typically listed under "other code smells."

### Why It's Problematic

#### Poor Documentation
Incomplete library classes often lack proper documentation, making it difficult for developers to understand how to use them correctly. This leads to errors, confusion, and wasted time.

#### Limited Functionality
When a library doesn't provide expected or necessary functionality, developers must work around it or write additional code, leading to increased complexity and reduced productivity.

#### Unpredictable Behavior
Incomplete libraries may exhibit unpredictable behavior or fail to handle edge cases properly, causing unexpected bugs in dependent applications.

#### Increased Technical Debt
Developers may need to create workarounds or patches to compensate for missing functionality, adding technical debt that makes future maintenance harder.

#### Risk of Abandonment
Libraries that remain incomplete for extended periods risk being abandoned by maintainers, leaving users with unresolved issues and no updates.

#### Maintenance Issues
Incomplete libraries often indicate poor maintenance practices. Libraries should evolve to address user needs, fix bugs, and improve performance.

### Example

```javascript
// Problem: Third-party date library lacks needed functionality
const DateLibrary = require('some-date-library');

class ReportGenerator {
  generateMonthlyReport(date) {
    // Library doesn't have a method to get business days
    // We need to implement this functionality ourselves
    const startOfMonth = DateLibrary.startOfMonth(date);
    const endOfMonth = DateLibrary.endOfMonth(date);
    
    // Custom implementation needed - code smell!
    const businessDays = this.calculateBusinessDays(startOfMonth, endOfMonth);
    
    return this.createReport(businessDays);
  }
  
  // We have to implement what should be in the library
  calculateBusinessDays(start, end) {
    let count = 0;
    let current = new Date(start);
    
    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not weekend
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    
    return count;
  }
}
```

### Refactoring Techniques

When you cannot directly modify an incomplete library, consider these approaches:

#### 1. Introduce Foreign Method

Add the needed method to a client class, passing the library object as a parameter to extend its functionality.

```javascript
// Before: Scattered custom logic
class ReportGenerator {
  generateReport(date) {
    // Custom business day calculation scattered throughout
    const businessDays = this.calculateBusinessDays(date);
    return this.createReport(businessDays);
  }
  
  calculateBusinessDays(date) {
    // Implementation here
  }
}

// After: Foreign method approach
class DateUtils {
  static getBusinessDaysInMonth(dateLibraryDate) {
    const start = DateLibrary.startOfMonth(dateLibraryDate);
    const end = DateLibrary.endOfMonth(dateLibraryDate);
    
    let count = 0;
    let current = new Date(start);
    
    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    
    return count;
  }
}

class ReportGenerator {
  generateReport(date) {
    const businessDays = DateUtils.getBusinessDaysInMonth(date);
    return this.createReport(businessDays);
  }
}
```

#### 2. Introduce Local Extension

Create a new class that extends or wraps the existing library class, adding the functionality you need locally.

```javascript
// Approach 1: Inheritance (if possible)
class ExtendedDate extends DateLibrary {
  getBusinessDaysInMonth() {
    const start = this.startOfMonth();
    const end = this.endOfMonth();
    
    let count = 0;
    let current = new Date(start);
    
    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    
    return count;
  }
  
  isBusinessDay() {
    const dayOfWeek = this.getDay();
    return dayOfWeek !== 0 && dayOfWeek !== 6;
  }
}

// Approach 2: Composition (wrapper)
class EnhancedDateLibrary {
  constructor(date) {
    this.dateLib = new DateLibrary(date);
  }
  
  // Delegate existing functionality
  startOfMonth() {
    return this.dateLib.startOfMonth();
  }
  
  endOfMonth() {
    return this.dateLib.endOfMonth();
  }
  
  // Add missing functionality
  getBusinessDaysInMonth() {
    const start = this.startOfMonth();
    const end = this.endOfMonth();
    
    let count = 0;
    let current = new Date(start);
    
    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    
    return count;
  }
  
  isBusinessDay() {
    const dayOfWeek = this.dateLib.getDay();
    return dayOfWeek !== 0 && dayOfWeek !== 6;
  }
}

// Usage
class ReportGenerator {
  generateReport(date) {
    const enhancedDate = new EnhancedDateLibrary(date);
    const businessDays = enhancedDate.getBusinessDaysInMonth();
    return this.createReport(businessDays);
  }
}
```

### When to Apply These Techniques

- **Foreign Method**: When you need just one or two additional methods
- **Local Extension**: When you need several additional methods or want to modify existing behavior
- **Wrapper Pattern**: When you can't inherit from the library class or want to completely control the interface

### Benefits

- **Encapsulation**: Keeps library-specific workarounds in dedicated places
- **Reusability**: Extensions can be reused across your application
- **Maintainability**: Easier to update when the library eventually adds the functionality
- **Testability**: You can test your extensions independently

### Prevention

- **Evaluate libraries thoroughly** before adoption
- **Check maintenance status** and community activity
- **Consider multiple options** and choose the most complete solution
- **Contribute back** to open-source libraries when possible

## References

- [Refactoring Guru - Incomplete Library Class](https://refactoring.guru/smells/incomplete-library-class)
- [Introduce Foreign Method](https://refactoring.guru/introduce-foreign-method)
- [Introduce Local Extension](https://refactoring.guru/introduce-local-extension)
- Fowler, Martin. *Refactoring: Improving the Design of Existing Code*