#!/usr/bin/env python3
"""
Typst to Markdown Converter CLI
Converts a Typst resume to Markdown format - fully generic and future-proof
"""

import re
import sys
import argparse
from pathlib import Path


def parse_typst_variables(content):
    """Extract variables defined with #let"""
    variables = {}
    let_pattern = r'#let\s+([\w-]+)\s*=\s*"([^"]*)"'
    for match in re.finditer(let_pattern, content):
        var_name = match.group(1)
        var_value = match.group(2)
        variables[var_name] = var_value
    return variables


def find_matching_bracket(content, start_pos):
    """Find the matching closing bracket for an opening bracket"""
    count = 1
    i = start_pos
    while i < len(content) and count > 0:
        if content[i] == '[':
            count += 1
        elif content[i] == ']':
            count -= 1
        i += 1
    return i if count == 0 else -1


def extract_sections(content):
    """Extract all custom-title sections with proper bracket matching"""
    sections = []
    pattern = r'#custom-title\("([^"]+)"\)\['
    
    for match in re.finditer(pattern, content):
        title = match.group(1)
        start = match.end()
        end = find_matching_bracket(content, start)
        
        if end != -1:
            section_content = content[start:end-1].strip()
            sections.append((title, section_content))
    
    return sections


def convert_typst_markup(text):
    """Convert Typst markup to Markdown"""
    # Convert bold: *text* to **text**
    text = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'**\1**', text)
    
    # Remove datetime expressions
    text = re.sub(r'datetime\([^)]+\)', '', text)
    
    # Remove remaining # symbols (but not in URLs)
    text = re.sub(r'(?<!https:)(?<!http:)#(?!\s)', '', text)
    
    # Clean up multiple spaces
    text = re.sub(r'  +', ' ', text)
    
    return text


def parse_function_call(text, func_name):
    """
    Generic parser for function calls like:
    func_name("arg1", "arg2", ...)[content]
    
    Returns list of (args, content) tuples
    """
    results = []
    pattern = rf'{re.escape(func_name)}\(((?:[^()]*|\([^)]*\))*)\)\[([^\]]*(?:\[[^\]]*\])*[^\]]*)\]'
    
    pos = 0
    while pos < len(text):
        # Find function name
        func_start = text.find(f'{func_name}(', pos)
        if func_start == -1:
            break
        
        # Find opening parenthesis
        paren_start = func_start + len(func_name)
        
        # Find matching closing parenthesis
        paren_count = 1
        i = paren_start + 1
        paren_end = -1
        in_string = False
        while i < len(text) and paren_count > 0:
            if text[i] == '"' and (i == 0 or text[i-1] != '\\'):
                in_string = not in_string
            elif not in_string:
                if text[i] == '(':
                    paren_count += 1
                elif text[i] == ')':
                    paren_count -= 1
                    if paren_count == 0:
                        paren_end = i
            i += 1
        
        if paren_end == -1:
            pos = func_start + 1
            continue
        
        # Extract arguments
        args_text = text[paren_start+1:paren_end]
        args = []
        current_arg = []
        in_string = False
        paren_depth = 0
        
        for char in args_text:
            if char == '"' and (not current_arg or current_arg[-1] != '\\'):
                in_string = not in_string
                current_arg.append(char)
            elif char == '(' and not in_string:
                paren_depth += 1
                current_arg.append(char)
            elif char == ')' and not in_string:
                paren_depth -= 1
                current_arg.append(char)
            elif char == ',' and not in_string and paren_depth == 0:
                arg = ''.join(current_arg).strip()
                if arg.startswith('"') and arg.endswith('"'):
                    arg = arg[1:-1]
                args.append(arg)
                current_arg = []
            else:
                current_arg.append(char)
        
        if current_arg:
            arg = ''.join(current_arg).strip()
            if arg.startswith('"') and arg.endswith('"'):
                arg = arg[1:-1]
            if arg:  # Only add non-empty args
                args.append(arg)
        
        # Find content in brackets
        bracket_start = text.find('[', paren_end)
        if bracket_start == -1 or bracket_start > paren_end + 5:
            pos = paren_end + 1
            continue
        
        bracket_end = find_matching_bracket(text, bracket_start + 1)
        if bracket_end == -1:
            pos = bracket_start + 1
            continue
        
        content = text[bracket_start+1:bracket_end-1].strip()
        results.append((args, content))
        pos = bracket_end
    
    return results


def format_section_content(content):
    """Format section content generically"""
    lines = []
    
    # Check for common function patterns
    if 'education-heading(' in content:
        entries = parse_function_call(content, 'education-heading')
        for args, details in entries:
            if len(args) >= 4:
                lines.append(f"### {args[0]}")
                lines.append(f"**{args[2]}** - {args[3]}  ")
                lines.append(f"*{args[1]}*")
                if details:
                    lines.append("")
                    lines.append(convert_typst_markup(details))
                lines.append("")
    
    elif 'project-heading(' in content:
        entries = parse_function_call(content, 'project-heading')
        for args, details in entries:
            if args:
                lines.append(f"### {args[0]}")
                if details:
                    lines.append(convert_typst_markup(details))
                lines.append("")
    
    elif 'experience-heading(' in content:
        # Future-proof: handle experience sections
        entries = parse_function_call(content, 'experience-heading')
        for args, details in entries:
            if len(args) >= 3:
                lines.append(f"### {args[0]}")
                lines.append(f"**{args[1]}** | *{args[2]}*")
                if details:
                    lines.append("")
                    lines.append(convert_typst_markup(details))
                lines.append("")
    
    else:
        # Generic handling: just convert markup and preserve structure
        formatted = convert_typst_markup(content)
        
        # Check if it's a list (starts with -)
        if formatted.strip().startswith('-'):
            lines.append(formatted)
        else:
            # Regular paragraph text
            lines.append(formatted)
    
    return '\n'.join(lines)


def convert_typst_to_markdown(typst_content):
    """Main conversion function"""
    # Extract personal info
    variables = parse_typst_variables(typst_content)
    
    # Build markdown
    md = []
    
    # Header with personal info
    md.append(f"# {variables.get('name', 'Resume')}\n")
    
    contact = []
    if 'email' in variables:
        contact.append(variables['email'])
    if 'phone' in variables:
        contact.append(variables['phone'])
    if 'github' in variables:
        contact.append(f"[GitHub](https://github.com/{variables['github']})")
    if 'linkedin' in variables:
        contact.append(f"[LinkedIn](https://linkedin.com/in/{variables['linkedin']})")
    if 'personal-site' in variables:
        contact.append(f"[{variables['personal-site']}](https://{variables['personal-site']})")
    
    if contact:
        md.append(" | ".join(contact))
        md.append("\n---\n")
    
    # Parse all sections generically
    sections = extract_sections(typst_content)
    
    for title, content in sections:
        md.append(f"## {title}\n")
        md.append(format_section_content(content))
        md.append("\n")
    
    return "\n".join(md)


def main():
    parser = argparse.ArgumentParser(
        description="Convert Typst resume to Markdown",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python typst2md.py resume.typ
  python typst2md.py resume.typ -o output.md
  python typst2md.py resume.typ --watch
        """
    )
    
    parser.add_argument('input', help='Input Typst file')
    parser.add_argument('-o', '--output', help='Output Markdown file (default: same name as input with .md extension)')
    parser.add_argument('-w', '--watch', action='store_true', help='Watch for changes and auto-regenerate (requires watchdog)')
    
    args = parser.parse_args()
    
    input_path = Path(args.input)
    
    if not input_path.exists():
        print(f"Error: File '{args.input}' not found", file=sys.stderr)
        sys.exit(1)
    
    output_path = Path(args.output) if args.output else input_path.with_suffix('.md')
    
    def convert_file():
        print(f"Converting {input_path} to {output_path}...")
        try:
            typst_content = input_path.read_text(encoding='utf-8')
            markdown = convert_typst_to_markdown(typst_content)
            output_path.write_text(markdown, encoding='utf-8')
            print(f"✓ Successfully converted to {output_path}")
        except Exception as e:
            print(f"Error during conversion: {e}", file=sys.stderr)
            import traceback
            traceback.print_exc()
            sys.exit(1)
    
    convert_file()
    
    if args.watch:
        try:
            from watchdog.observers import Observer
            from watchdog.events import FileSystemEventHandler
            
            class TypstChangeHandler(FileSystemEventHandler):
                def on_modified(self, event):
                    if event.src_path == str(input_path.absolute()):
                        convert_file()
            
            event_handler = TypstChangeHandler()
            observer = Observer()
            observer.schedule(event_handler, str(input_path.parent), recursive=False)
            observer.start()
            
            print(f"\n👀 Watching {input_path} for changes... (Press Ctrl+C to stop)")
            try:
                import time
                while True:
                    time.sleep(1)
            except KeyboardInterrupt:
                observer.stop()
                print("\n✓ Stopped watching")
            observer.join()
            
        except ImportError:
            print("\nError: --watch requires 'watchdog' package", file=sys.stderr)
            print("Install with: pip install watchdog", file=sys.stderr)
            sys.exit(1)


if __name__ == "__main__":
    main()