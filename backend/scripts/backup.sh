#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Please provide a file name as an argument."
    exit 1
fi

file=$1

if [ ! -f "$file" ]; then
    echo "File not found."
    exit 1
fi

tar -czvf "../backup.tar.gz" "$file"

echo "Archiving complete: /backup.tar.gz"
