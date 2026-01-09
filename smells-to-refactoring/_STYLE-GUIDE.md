# Code Smells Writing Style Guide

This guide defines the standard format and writing style for all code smell articles in this documentation.

## Article Structure

Every code smell article should follow this structure:

```markdown
---
sidebar_position: [number]
title: [Smell Name]
---

# [Smell Name]

[Small Talk - 2-3 paragraphs introducing the smell in a conversational, engaging way]

## Signs of the Smell

[Clear indicators that this smell is present, with examples if applicable]

## Reasons of the Smell

[Bullet points explaining why this smell is problematic]

## Refactoring Recipe

[List of refactoring techniques with explanations and code examples]

## References

[Links to external resources]
```

## Writing Tone and Style

### Small Talk Section
- **Purpose**: Hook the reader with a relatable scenario
- **Length**: 2-3 paragraphs
- **Style**: Conversational, engaging, slightly humorous
- **Content**:
  - Start with a relatable developer experience
  - Explain what the smell is in plain language
  - Provide context or interesting observations

**Example:**
```markdown
Have you ever encountered a method that looks something like this:
`calculatePrice(basePrice, discount, tax, shippingFee, insuranceFee, handlingFee, ...)`?
By the time you reach the sixth parameter, you've probably forgotten what the first one
was for. Welcome to the world of Long Parameter List, one of the classic code smells
that makes developers sigh in frustration.
```

### Signs of the Smell
- **Style**: Clear and diagnostic
- **Format**: Brief explanation followed by indicators
- **Include**: Code examples when helpful
- Use concrete examples that developers can recognize immediately

**Good:**
```markdown
## Signs of the Smell

If deleting one of the data values would make the others meaningless, it's a sign
of data clumps. When identical groups of variables appear together in multiple places—
like `street, city, zipCode` always traveling as a trio—they're begging to become
their own class.
```

### Reasons of the Smell
- **Format**: Bullet points with bold headers
- **Style**: Technical but accessible
- **Length**: 2-4 sentences per reason
- **Include**: Real-world implications

**Structure:**
```markdown
## Reasons of the Smell

**Reduced Readability**: [Explain how it makes code hard to read]. [Provide specific
example or scenario]. [Describe the impact on developers].

**Maintenance Difficulty**: [Explain maintenance issues]. [Connect to real-world
consequences].
```

Common reasons to consider:
- Reduced Readability
- Code Duplication
- Increased Coupling/Tight Coupling
- Single Responsibility Violation
- Brittleness/Fragility
- Testing Challenges/Difficulties
- Maintenance Difficulty/Hell

### Refactoring Recipe
- **Format**: List techniques, then explain each with subsections
- **Include**:
  - Clear before/after code examples
  - Explanation of what changes and why
  - Real-world context for when to use each technique
- **Style**: Instructional but friendly

**Structure:**
```markdown
## Refactoring Recipe

- [Technique 1]
- [Technique 2]
- [Technique 3]

### [Technique 1]

[Brief explanation of what this technique does]

**Before:**
```java
[problematic code]
```

[Point out the specific issues in this code]

**After:**
```java
[refactored code]
```

[Explain the improvements and benefits]
```

### References
- Use bullet points with markdown links
- Include primary sources (Refactoring Guru, Martin Fowler, etc.)
- Keep it clean and minimal

```markdown
## References

- [Refactoring Guru - Smell Name](url)
- [Martin Fowler - Technique Name](url)
```

## Language and Tone Guidelines

### DO:
- Use conversational language and contractions ("you'll", "it's", "let's")
- Address the reader directly ("you", "your")
- Use rhetorical questions to engage readers
- Include relatable scenarios developers face daily
- Use metaphors and analogies sparingly but effectively
- Add personality with phrases like "Beautiful, isn't it?" or "Let's be honest..."
- Write in active voice
- Keep paragraphs short (3-5 sentences)

### DON'T:
- Use overly formal academic language
- Write in passive voice unless necessary
- Include Chinese translations (English only)
- Use emojis or excessive exclamation marks
- Be condescending or preachy
- Assume advanced knowledge without explanation

## Code Examples

### Best Practices:
- Always show before AND after code
- Keep examples short and focused (10-20 lines max)
- Use common, recognizable scenarios (orders, users, prices)
- Add comments only when necessary to clarify
- Prefer Java, JavaScript, or TypeScript
- Ensure proper syntax highlighting with language tags

## Markdown Formatting

### Required Elements:
```markdown
---
sidebar_position: [number]
title: [Exact Smell Name]
---
```

### Heading Hierarchy:
- `#` - Article title (same as frontmatter title)
- `##` - Main sections (Signs, Reasons, Refactoring Recipe, References)
- `###` - Subsections (individual refactoring techniques)

### Code Blocks:
- Always specify language: ```java, ```javascript, ```typescript
- Add blank lines before and after code blocks
- Use `inline code` for method names, variables, and small code snippets in text

## Section Templates

### Complete Article Template

```markdown
---
sidebar_position: X
title: Smell Name
---

# Smell Name

[2-3 engaging paragraphs introducing the problem in a relatable way. Start with a
scenario, explain what the smell is, and provide interesting context or observations.]

## Signs of the Smell

[Clear description of how to identify this smell. Include specific indicators and
code examples where helpful.]

## Reasons of the Smell

**Reduced Readability**: [Explanation with real-world impact]

**Maintenance Difficulty**: [Explanation with consequences]

**[Other Reason]**: [Explanation]

## Refactoring Recipe

- Technique 1
- Technique 2
- Technique 3

### Technique 1

[Brief introduction to the technique and when to use it]

**Before:**
```java
// Problematic code example
```

[Explanation of what's wrong]

**After:**
```java
// Refactored code example
```

[Explanation of improvements and benefits]

### Technique 2

[Same structure as Technique 1]

## References

- [Source Name](url)
- [Source Name](url)
```

## Quality Checklist

Before publishing, ensure:
- [ ] Frontmatter includes correct sidebar_position and title
- [ ] Small talk section is engaging and relatable (2-3 paragraphs)
- [ ] Signs section clearly explains how to identify the smell
- [ ] Reasons section has 4-6 bullet points with bold headers
- [ ] Refactoring Recipe lists all techniques first, then explains each
- [ ] Each refactoring technique has before/after code examples
- [ ] Code blocks have language tags and proper formatting
- [ ] References section includes relevant sources
- [ ] Only English content (no Chinese translations)
- [ ] Conversational tone throughout
- [ ] No markdown linter warnings
- [ ] File ends with single newline character

## Example Article

See `/smells-to-refactoring/Bloaters/Long-Parameter-List.md` for a complete example that follows this style guide.
