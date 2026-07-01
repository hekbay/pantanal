import os
import re

def migrate():
    with open('index.backup.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Extract CSS
    style_match = re.search(r'<style>(.*?)</style>', html, re.DOTALL)
    if style_match:
        css = style_match.group(1).strip()
        with open('src/app/globals.css', 'w', encoding='utf-8') as f:
            f.write(css)
            f.write("\n\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n")

    # Extract Custom Cursor Script
    script_match = re.search(r'<script>(.*?)</script>', html, re.DOTALL)
    if script_match:
        script_content = script_match.group(1).strip()
        # Convert JS to React safe JS
        script_content = script_content.replace('document.querySelector', 'document.body.querySelector')
        cursor_js = f"""'use client';
import {{ useEffect }} from 'react';

export default function CustomCursor() {{
  useEffect(() => {{
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    if (!cursorDot || !cursorRing) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animationFrameId;

    const handleMouseMove = (e) => {{
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(calc(${{mouseX}}px - 50%), calc(${{mouseY}}px - 50%))`;
    }};

    document.addEventListener('mousemove', handleMouseMove);

    const render = () => {{
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.transform = `translate(calc(${{ringX}}px - 50%), calc(${{ringY}}px - 50%))`;
      animationFrameId = requestAnimationFrame(render);
    }};
    render();

    const hoverables = document.querySelectorAll('a, button, .produto-card, .circulo-wrap, .download-card');
    const addHover = () => cursorRing.classList.add('hovering');
    const removeHover = () => cursorRing.classList.remove('hovering');

    hoverables.forEach(el => {{
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    }});

    return () => {{
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      hoverables.forEach(el => {{
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      }});
    }};
  }}, []);

  return null;
}}
"""
        os.makedirs('src/components', exist_ok=True)
        with open('src/components/CustomCursor.js', 'w', encoding='utf-8') as f:
            f.write(cursor_js)

    # Extract Body Content (everything inside <body> except the script and cursor divs)
    body_match = re.search(r'<body>(.*?)<!-- ── CUSTOM CURSOR ── -->', html, re.DOTALL)
    if body_match:
        body_content = body_match.group(1).strip()
        # Convert class= to className=
        body_content = body_content.replace('class=', 'className=')
        # Convert empty tags like <br> to <br/>
        body_content = body_content.replace('<br>', '<br/>')
        # Replace img tags to self closing if they aren't
        body_content = re.sub(r'(<img[^>]*?)(?<!/)>', r'\1 />', body_content)
        
        # We also need to fix style attributes
        # Find all style="..."
        def style_replacer(m):
            styles = m.group(1)
            # Basic conversion for style="display:none;"
            if 'display:none' in styles.replace(' ', ''):
                return 'style={{display: "none"}}'
            return 'style={{}}'
        
        body_content = re.sub(r'style="(.*?)"', style_replacer, body_content)

        page_js = f"""import CustomCursor from "../components/CustomCursor";

export default function Home() {{
  return (
    <>
      <CustomCursor />
      <div className="cursor-dot"></div>
      <div className="cursor-ring"></div>
{body_content}
    </>
  );
}}
"""
        with open('src/app/page.js', 'w', encoding='utf-8') as f:
            f.write(page_js)

    print("Migration extraction complete.")

if __name__ == '__main__':
    migrate()
