---
sidebar_position: 8
title: Data Clumps
---

# Data Clumps

Ever notice how some variables are like inseparable friends—they show up everywhere together? You see `firstName`, `lastName`, and `email` traveling as a trio. Or `street`, `city`, `zipCode`, and `country` forming their own little gang. When you spot the same group of variables appearing together in multiple places, congratulations: you've found a Data Clump.

The term might sound funny, but the problem is real. These clumps of data are screaming to become their own objects, yet they remain scattered as loose primitives throughout your codebase. It's like watching a band perform without ever actually forming the band—they keep showing up at the same venues, playing the same songs, but never making it official.

Here's a simple test: if removing one piece of data from the group would make the remaining pieces meaningless or incomplete, you've got a Data Clump. Three coordinates defining a point in 3D space? That's a clump. A start date and end date for a booking? Definitely a clump. They belong together, so why keep them apart?

## Signs of the Smell

**Repeated Parameter Groups**: The same set of parameters appears in multiple method signatures. You keep passing `startDate, endDate` to different methods, or `width, height` shows up in half a dozen function calls.

**Related Fields**: Multiple fields in a class that always relate to the same concept. Your `User` class has `billingStreet`, `billingCity`, `billingZip`, `billingCountry`, `shippingStreet`, `shippingCity`, `shippingZip`, `shippingCountry`—that's two address clumps hiding in plain sight.

**Deletion Test Failure**: If you removed one data value from the group, the others would become meaningless. Remove `zipCode` from your street/city/zip/country quartet, and suddenly the address is incomplete. That's a sign they should be grouped together.

**Validation Scattered Everywhere**: The same set of validations appears wherever the clump appears. Every time you work with a date range, you validate that the end date is after the start date. Every time you handle coordinates, you check they're within valid bounds.

**Parameters that Travel Together**: When you change a method signature to add one parameter from the clump, you often need to add the others too. They have high cohesion with each other but low cohesion with the rest of the code.

## Reasons of the Smell

**Reduced Readability and Understandability**: Code with data clumps is harder to read, especially for developers new to the codebase. The relationships between data elements aren't immediately clear. Is `x`, `y`, `z` representing a point? A dimension? A direction vector? Without proper encapsulation, readers have to infer the meaning from context.

**Code Duplication**: When the same group of data appears in multiple places, you're duplicating not just the data declarations but also the logic that operates on them. The validation for a date range gets copied wherever date ranges appear. The calculation for an address's display format gets repeated in multiple classes.

**Maintenance Difficulty**: Updating scattered data becomes a maintenance nightmare. Need to add timezone information to your date range? Better search through the entire codebase to find every place those dates appear together. Miss one spot, and you've got inconsistency. This is exactly what Martin Fowler calls "Shotgun Surgery"—one conceptual change requires modifications in many places.

**Brittleness**: Because the data and its associated logic are spread across multiple locations, changes in one area can inadvertently break others. You modify the date validation in one place, forgetting it's duplicated elsewhere. Suddenly, different parts of your system have different rules for what constitutes a valid date range.

**Missing Abstraction**: Data clumps hide what should be clear domain concepts. `startDate` and `endDate` aren't just two dates—they represent a `DateRange` with its own rules and behaviors. `street`, `city`, `zipCode` aren't just strings—they're an `Address`. By keeping them as primitives, you miss opportunities for abstraction and encapsulation.

## Refactoring Recipe

- Extract Class
- Introduce Parameter Object
- Preserve Whole Object

### Extract Class

The fundamental solution to data clumps is creating a dedicated class to hold the related data. This gives you a place to put validation, behavior, and meaning.

**Before:**

```java
public class Booking {
  private String guestFirstName;
  private String guestLastName;
  private String guestEmail;
  private String guestPhone;

  private LocalDate checkInDate;
  private LocalDate checkOutDate;

  public void validateDates() {
    if (checkOutDate.isBefore(checkInDate)) {
      throw new IllegalArgumentException("Check-out must be after check-in");
    }
  }

  public String formatGuestInfo() {
    return guestFirstName + " " + guestLastName + " (" + guestEmail + ")";
  }

  // Constructor with 6 parameters
  public Booking(String guestFirstName, String guestLastName,
                 String guestEmail, String guestPhone,
                 LocalDate checkInDate, LocalDate checkOutDate) {
    this.guestFirstName = guestFirstName;
    this.guestLastName = guestLastName;
    this.guestEmail = guestEmail;
    this.guestPhone = guestPhone;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    validateDates();
  }
}
```

Notice the clumps? Guest information (firstName, lastName, email, phone) travels together, as does the date range (checkIn, checkOut). Let's extract them.

**After:**

```java
public class Guest {
  private final String firstName;
  private final String lastName;
  private final String email;
  private final String phone;

  public Guest(String firstName, String lastName, String email, String phone) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }

  public String getFullName() {
    return firstName + " " + lastName;
  }

  public String formatContactInfo() {
    return getFullName() + " (" + email + ")";
  }
}

public class DateRange {
  private final LocalDate start;
  private final LocalDate end;

  public DateRange(LocalDate start, LocalDate end) {
    if (end.isBefore(start)) {
      throw new IllegalArgumentException("End date must be after start date");
    }
    this.start = start;
    this.end = end;
  }

  public long getDays() {
    return ChronoUnit.DAYS.between(start, end);
  }

  public boolean overlaps(DateRange other) {
    return !this.end.isBefore(other.start) && !other.end.isBefore(this.start);
  }
}

public class Booking {
  private final Guest guest;
  private final DateRange period;

  public Booking(Guest guest, DateRange period) {
    this.guest = guest;
    this.period = period;
  }
}
```

Look at that transformation! The `Booking` constructor went from 6 parameters to 2. Each extracted class now has its own validation, behavior, and clear purpose. The `DateRange` class can tell you how many days it spans or whether it overlaps with another range. The `Guest` class knows how to format its own contact information.

### Introduce Parameter Object

When data clumps appear repeatedly in method parameters, wrap them in a parameter object.

**Before:**

```typescript
class ReportGenerator {
  generateSalesReport(
    startDate: Date,
    endDate: Date,
    minAmount: number,
    maxAmount: number,
    region: string
  ): Report {
    // ...
  }

  exportSalesData(
    startDate: Date,
    endDate: Date,
    minAmount: number,
    maxAmount: number,
    format: string
  ): void {
    // ...
  }

  calculateTotalSales(
    startDate: Date,
    endDate: Date,
    minAmount: number,
    maxAmount: number
  ): number {
    // ...
  }
}
```

See how `startDate`, `endDate`, `minAmount`, `maxAmount` keep traveling together? That's a clump begging for extraction.

**After:**

```typescript
class SalesFilter {
  constructor(
    public readonly dateRange: DateRange,
    public readonly amountRange: AmountRange,
  ) {}
}

class DateRange {
  constructor(
    public readonly start: Date,
    public readonly end: Date
  ) {
    if (end < start) {
      throw new Error('End date must be after start date');
    }
  }
}

class AmountRange {
  constructor(
    public readonly min: number,
    public readonly max: number
  ) {
    if (max < min) {
      throw new Error('Max amount must be greater than min amount');
    }
  }

  contains(amount: number): boolean {
    return amount >= this.min && amount <= this.max;
  }
}

class ReportGenerator {
  generateSalesReport(filter: SalesFilter, region: string): Report {
    // ...
  }

  exportSalesData(filter: SalesFilter, format: string): void {
    // ...
  }

  calculateTotalSales(filter: SalesFilter): number {
    // ...
  }
}
```

Now the methods are cleaner, and the filter concept is explicit. Future changes to filtering criteria only need to touch the `SalesFilter` class.

### Preserve Whole Object

When you're extracting multiple fields from an object to pass as parameters, just pass the whole object instead.

**Before:**

```python
class Rectangle:
    def __init__(self, x, y, width, height):
        self.x = x
        self.y = y
        self.width = width
        self.height = height

def check_overlap(x1, y1, width1, height1, x2, y2, width2, height2):
    return (x1 < x2 + width2 and
            x1 + width1 > x2 and
            y1 < y2 + height2 and
            y1 + height1 > y2)

# Usage
rect1 = Rectangle(0, 0, 10, 10)
rect2 = Rectangle(5, 5, 10, 10)
overlaps = check_overlap(
    rect1.x, rect1.y, rect1.width, rect1.height,
    rect2.x, rect2.y, rect2.width, rect2.height
)
```

Eight parameters! And they're all coming from two objects. Let's preserve the whole objects.

**After:**

```python
class Rectangle:
    def __init__(self, x, y, width, height):
        self.x = x
        self.y = y
        self.width = width
        self.height = height

    def overlaps(self, other):
        return (self.x < other.x + other.width and
                self.x + self.width > other.x and
                self.y < other.y + other.height and
                self.y + self.height > other.y)

# Usage
rect1 = Rectangle(0, 0, 10, 10)
rect2 = Rectangle(5, 5, 10, 10)
overlaps = rect1.overlaps(rect2)
```

Much cleaner! The overlap logic now lives where it belongs—with the Rectangle class itself. And the method call is crystal clear.

## Wrapping Up

Data clumps are one of those smells that seem harmless at first. Sure, those three variables always appear together, but creating a whole class just for them seems like overkill, right? Until you realize you've copy-pasted the same validation logic five times. Until you spend an hour tracking down why one part of the system treats the data differently than another.

The pattern is simple: when you see variables that always travel together, group them into a class. When you see the same parameters appearing in multiple methods, create a parameter object. When you're extracting fields from an object just to pass them elsewhere, pass the whole object instead.

Start with the most obvious clumps—the ones causing you the most pain. Extract them into proper objects. Give those objects meaningful names and useful methods. Watch as your code becomes more readable, more maintainable, and more resistant to bugs.

## References

- [Refactoring Guru - Data Clumps](https://refactoring.guru/smells/data-clumps)
- [Martin Fowler - Introduce Parameter Object](https://refactoring.com/catalog/introduceParameterObject.html)
- [Martin Fowler - Preserve Whole Object](https://refactoring.com/catalog/preserveWholeObject.html)
