#!/bin/bash
typst compile ../resume/main.typ
git add ../resume/main.typ ../resume/main.pdf
git commit -m "Updated Resume"
git push
