#!/bin/bash

# Check if argument is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <project_name>"
    exit 1
fi

# Directory where the HTML files are located
dir="./docs"

# Check if directory exists
if [ ! -d "$dir" ]; then
    echo "Directory $dir does not exist."
    exit 1
fi

# Find all .html files in the directory and perform the replacement
find "$dir" -type f -name "*.html" -print0 | while IFS= read -r -d '' file; do
    # Use sed for in-place editing, macOS version, with more flexible matching
    sed -i '' "s|<[[:space:]]*base[[:space:]]*href[[:space:]]*=[[:space:]]*\"/\"[[:space:]]*>|<base href=\"/$1\">|i" "$file"
    echo "Updated $file"
    # Show the first 5 lines of the file after modification to verify the change
    head -n 5 "$file"
done