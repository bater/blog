# Blog Style and Formatting Guide

## 1. Core Principles

This guide ensures a consistent voice, tone, and structure for all blog posts. Our goal is to create content that is:

-   **Authoritative & Opinionated:** We write with a strong, clear perspective, backed by experience. We are not just reporting news; we are sharing insights. (e.g., "The real shift left needs to be AI collaboration, not just testing.")
-   **Conversational & Accessible:** We write as we would speak to a respected colleague. The tone is professional but not academic.
-   **Bilingual Friendly:** Whether writing in Chinese or English, the structure and logic remain the same.

---

## 2. File Naming and Frontmatter

### File Naming Convention

All post files must be placed in the `blog` directory and follow this format:

```
YYYY-MM-DD-kebab-case-title.md
```
-   **Example:** `2025-12-15-ai-agent-shift-left.md`

### YAML Frontmatter

Every post must begin with a YAML frontmatter block. Ensure the following fields are included:

```yaml
---
slug: kebab-case-slug-without-date
title: "A Catchy, Assertive Title Goes Here (Can be Chinese or English)"
authors:
  - bater
tags: [Tag1, Tag2, "Multi Word Tag"]
date: YYYY-MM-DD
---
```

-   **slug:** A short, url-friendly version of the title. Do not include the date.
-   **authors:** Always list authors. Default is `- bater`.
-   **tags:** Use Title Case or appropriate capitalization for tags (e.g., `DevAiOps`, `Clean Code`).

---

## 3. Post Structure

A post should follow this narrative structure to maximize engagement and clarity.

1.  **Title (`title` in Frontmatter):** A strong headline.
2.  **The Hook / Intro:** Immediately start with a personal story, a relatable problem, or a surprising fact.
    -   *Crucial:* Keep paragraphs short (1-3 sentences).
3.  **Truncate Marker:** Insert the truncation marker immediately after the intro to define the preview summary.
    ```html
    <!-- truncate -->
    ```
4.  **Thematic Break (`---`):** Use a horizontal rule to separate sections visually if needed.
5.  **Main Body (Multiple `##` sections):**
    -   **Headings:** Use `##` for major sections.
    -   **Arguments:** Develop the core argument using clear headings.
    -   **Blockquotes:** Use `>` to highlight key insights or "Gold Sentences".
    -   **Emphasis:** Use `**bold**` for key terms and concepts relative to the argument.
6.  **Conclusion / Final Thoughts (`##`):** A short, powerful section to wrap up the argument.
7.  **Call to Action:** End with a question to encourage thought or comments.

---

## 4. Writing Style & Formatting

### Tone and Voice
-   **Be Assertive:** Don't say "I think it might be better to..." -> Say "The better approach is..."
-   **Be Human:** Use "I" and "We". Share personal struggles and realizations.

### Visual Formatting
-   **Short Paragraphs:** Modern readers skim. A paragraph should rarely exceed 3-4 lines.
-   **Blockquotes for Emphasis:** Use blockquotes not just for citations, but for your own "takeaway" sentences.
    > Design drives testability.
-   **Code Blocks:** Always specify the language.
    ```markdown
    ```javascript
    console.log("Hello");
    ```
    ```
-   **Lists:** Use lists to break down complex sets of items.

### Language Specifics
-   **Chinese:** Use full-width punctuation (，。、) and keep space between English words and Chinese characters (e.g., "當 AI 協作左移").
-   **English:** Use standard English punctuation.

---

## 5. Translation and Adaptation Guide

When translating a post (e.g., Chinese to English or vice versa):

1.  **Adapt the Title:** Translate the *idea*, not the words.
2.  **Cultural Context:** Explain or remove region-specific metaphors.
3.  **Tone Check:** Ensure the "Opinionated" tone survives the translation. English often requires more directness than Chinese.

