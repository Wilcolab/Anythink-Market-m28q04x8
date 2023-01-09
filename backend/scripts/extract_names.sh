#!/bin/bash

file="$1"

names=$(grep -i "@amazon.com" "$file" | awk -F, '{print $3, $2}' )

echo "$names"