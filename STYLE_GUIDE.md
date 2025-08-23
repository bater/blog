# Blog Style and Formatting Guide

## 1. Core Principles

This guide ensures a consistent voice, tone, and structure for all blog posts. Our goal is to create content that is:

-   **Authoritative & Opinionated:** We write with a strong, clear perspective, backed by experience. We are not just reporting news; we are sharing insights.
-   **Conversational & Accessible:** We write as we would speak to a respected colleague. The tone is professional but not academic. We use personal anecdotes to connect with the reader.
-   **Educational & Thought-Provoking:** Every post should teach the reader something new or give them a new way to think about a topic. It should end with a question that encourages discussion.

---

## 2. File Naming and Frontmatter

### File Naming Convention

All post files must be placed in the `_posts` directory and follow this format:

```
YYYY-MM-DD-kebab-case-title.md
```
-   **Example:** `2025-08-08-prompt-engineering-is-dead.md`

### YAML Frontmatter

Every post must begin with a YAML frontmatter block. Ensure the following fields are included:

```yaml
---
layout: post
title: "A Catchy, Assertive Title Goes Here"
date: YYYY-MM-DD
tags: ["tag1", "tag2", "relevant-tag"]
comments: true
---
```

-   **title:** Use sentence case for titles.
-   **tags:** Use lowercase, kebab-case for tags.

---

## 3. Post Structure

A post should follow this narrative structure to maximize engagement and clarity.

1.  **Title (`#`):** A strong, often opinionated headline.
2.  **Hook (Blockquote):** Immediately after the title, include a compelling quote or a single, powerful sentence that encapsulates the article's main idea.
    ```markdown
    > "This is the core message of the entire post, stated boldly."
    ```
3.  **Thematic Break (`---`):** Use a horizontal rule to separate the hook from the main content.
4.  **Introduction (`##`):** Start with a personal story, a relatable problem, or a surprising fact. This section should set the stage and explain *why* the reader should care about this topic.
5.  **Main Body (Multiple `##` and `###` sections):**
    -   Develop the core argument using clear headings.
    -   Break down complex ideas into smaller, digestible sections.
    -   Use lists, tables, and examples to clarify points.
6.  **Key Takeaways / Summary (`##`):** Near the end, provide a bulleted list summarizing the most important points. This helps reinforce the main message.
7.  **Conclusion / Final Thoughts (`##`):** A short, powerful section to wrap up the argument and offer a forward-looking perspective.
8.  **Thematic Break (`---`):** Separate the main content from the post-script.
9.  **Next Post Teaser:** Use the `📍` emoji to tease the next article in a series.
10. **Engagement Question:** End with a bolded question to encourage comments.

---

## 4. Formatting and Markdown Usage

-   **Headings:** Use `#` for the title, `##` for major sections, and `###` for sub-sections. Do not go deeper than `####`.
-   **Emphasis:** Use `**bold**` for key terms and concepts to guide the reader's attention. Use `*italics*` sparingly for emphasis or foreign words.
-   **Blockquotes:** Use `>` for direct quotes or to highlight a central argument.
-   **Lists:** Use bulleted lists (`-` or `*`) for non-sequential items. Use numbered lists for step-by-step instructions.
-   **Code Blocks:** Use fenced code blocks with language identifiers for all code examples.
    ````markdown
    ```yaml
    feature: exampleSpec
    description: "This is how to format a code block."
    ```
    ````
-   **Tables:** Use Markdown tables to present structured data, like comparisons.

---

## 5. Translation and Adaptation Guide

When translating a post (e.g., from Chinese to English) for this blog, a direct, literal translation is not sufficient. The content must be *adapted*.

1.  **Adapt the Title and Hook:** Translate the *idea*, not the words. Craft a new title and hook that is idiomatic and compelling to a global/Western tech audience.
2.  **Adjust the Tone:** The core message should remain, but the tone may need to be more direct and conversational. Remove any cultural references that may not translate well.
3.  **Clarify Concepts:** Do not assume the reader shares the same context. Briefly explain any region-specific concepts or trends.
4.  **Review and Refine:** After translating, read the post aloud. Does it sound natural? Does it flow well? Edit until it reads like it was originally written in English.
