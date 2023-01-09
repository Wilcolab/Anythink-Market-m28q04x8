#!/bin/bash

file="$1"

names=$(grep -i "@amazon.com" "$file" | cut -d ',' -f 2,3 | tr ',' ' ' )

echo "$names"
