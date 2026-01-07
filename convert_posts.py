#!/usr/bin/env python3
"""
Script to convert Jekyll blog posts to Docusaurus blog format
"""

import os
import re
import yaml
from pathlib import Path
from datetime import datetime

def convert_post(jekyll_file_path, docusaurus_blog_dir):
    """Convert a single Jekyll post to Docusaurus format"""

    with open(jekyll_file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract frontmatter and content
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            frontmatter = yaml.safe_load(parts[1])
            post_content = parts[2].strip()
        else:
            print(f"Warning: Could not parse frontmatter for {jekyll_file_path}")
            return
    else:
        print(f"Warning: No frontmatter found in {jekyll_file_path}")
        return

    # Extract filename components
    filename = Path(jekyll_file_path).name

    # Parse Jekyll filename (YYYY-MM-DD-title.md)
    match = re.match(r'(\d{4}-\d{2}-\d{2})-(.+)\.md$', filename)
    if not match:
        print(f"Warning: Could not parse Jekyll filename format for {filename}")
        return

    date_str = match.group(1)
    slug = match.group(2)

    # Create Docusaurus frontmatter
    docusaurus_frontmatter = {
        'slug': slug,
        'title': frontmatter.get('title', ''),
        'authors': ['bater'],
        'tags': frontmatter.get('tags', []),
        'date': date_str
    }

    # Remove duplicate title from content if it exists at the beginning
    lines = post_content.split('\n')
    if lines and lines[0].strip().startswith('# '):
        # Remove the first title line and any subtitle lines that follow
        while lines and (lines[0].strip().startswith('#') or lines[0].strip() == '' or lines[0].strip().startswith('—')):
            lines.pop(0)
        post_content = '\n'.join(lines).strip()

    # Create new Docusaurus post content
    new_content = '---\n'
    new_content += yaml.dump(docusaurus_frontmatter, default_flow_style=False, allow_unicode=True)
    new_content += '---\n\n'
    new_content += post_content

    # Create output filename (date-slug.md)
    output_filename = f"{date_str}-{slug}.md"
    output_path = Path(docusaurus_blog_dir) / output_filename

    # Write the converted post
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"Converted: {filename} -> {output_filename}")

def create_authors_file(docusaurus_blog_dir):
    """Create the authors.yml file for Docusaurus"""
    authors_content = """bater:
  name: Bater Chen
  title: Senior Full-Stack Engineer
  url: https://bater.github.io/blog
  image_url: https://github.com/bater.png
"""

    authors_path = Path(docusaurus_blog_dir) / 'authors.yml'
    with open(authors_path, 'w', encoding='utf-8') as f:
        f.write(authors_content)

    print("Created authors.yml")

def main():
    # Define paths
    jekyll_posts_dir = '_posts'
    docusaurus_blog_dir = 'docusaurus-blog/blog'

    # Create blog directory if it doesn't exist
    Path(docusaurus_blog_dir).mkdir(parents=True, exist_ok=True)

    # Create authors file
    create_authors_file(docusaurus_blog_dir)

    # Convert all Jekyll posts
    if os.path.exists(jekyll_posts_dir):
        for filename in os.listdir(jekyll_posts_dir):
            if filename.endswith('.md'):
                jekyll_file_path = os.path.join(jekyll_posts_dir, filename)
                convert_post(jekyll_file_path, docusaurus_blog_dir)
    else:
        print(f"Error: Jekyll posts directory '{jekyll_posts_dir}' not found")

if __name__ == '__main__':
    main()