---
sidebar_position: 9
title: Oddball Solution
---

# Oddball Solution

"Oddball Solution" is when a problem is solved one way throughout the system, but in one specific place, it’s solved completely differently. It’s the inconsistency that confuses developers.

If 9 out of 10 times you use `HttpClient` to make requests, but one class uses `curl` via command line, that’s an Oddball Solution. If everyone uses `Log4j` but one developer decided to use `System.out.println` or their own custom reference, it’s an Oddball.

## Signs of the Smell

- Inconsistent libraries (e.g., using two different JSON parsers).
- Inconsistent naming conventions.
- Solving the same problem (e.g., date formatting) in two arguably valid but different ways.

## Reasons of the Smell

**Lack of Communication**: Different teams or developers solving the same problem without checking existing solutions.
**Copy-Paste from Internet**: Copying a solution from a blog that uses a different style than the project.

## Refactoring Recipe

- Substitute Algorithm
- Unify Interfaces

### Substitute Algorithm

Replace the oddball code with the standard solution used elsewhere.

**Before:**
```java
// Standard way in project:
List<String> userNames = users.stream().map(User::getName).collect(Collectors.toList());

// Oddball way in one specific class:
List<String> adminNames = new ArrayList<>();
for (int i=0; i<admins.size(); i++) {
    adminNames.add(admins.get(i).getName());
}
```

**After:**
```java
// Consistently use Streams
List<String> adminNames = admins.stream().map(Admin::getName).collect(Collectors.toList());
```

### Unify Interfaces with Adapter

If you must use two different libraries, wrap them in a common Adapter interface so the rest of the app doesn't see the difference.

## References

- [Refactoring - Oddball Solution](https://sourcemaking.com/refactoring/smells/oddball-solution)