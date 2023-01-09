#!/bin/bash

file="$1"

names=$(grep -i "@amazon.com" "$file" | cut -d ',' -f 3,2 | tr ',' ' ' )

echo "$names"
