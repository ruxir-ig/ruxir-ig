#!/bin/bash
typst compile resume/main.typ
python typst_to_md.py ../resume/main.typ
git add ../resume/main.typ ../resume/main.pdf ../resume/main.md
git commit -m "Updated Resume"
git push
