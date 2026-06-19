#!/bin/bash
# Add empty front matter (---) to markdown files that don't have it.
# Usage: ./add-frontmatter.sh

find . -name "*.md" \
  ! -path "*/node_modules/*" \
  ! -path "*/vendor/*" \
  ! -path "./_site/*" \
  ! -path "./.git/*" \
  ! -path "./.githooks/*" \
  ! -path "./.github/*" \
  ! -path "./.codebuddy/*" \
  ! -path "./.baoyu-skills/*" \
  ! -path "./.claude/*" \
  ! -path "*/program/*" \
  ! -path "*/prompts/*" \
  ! -name "README.md" \
  ! -name "outline.md" \
  ! -name "draft1.md" \
  ! -name "*.bak" | while read f; do
  firstline=$(head -1 "$f")
  if [ "$firstline" != "---" ]; then
    echo "  + $f"
    { echo "---"; echo "---"; cat "$f"; } > "${f}.tmp" && mv "${f}.tmp" "$f"
  fi
done

echo "Done."
