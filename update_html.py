import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace sec-1
old_sec_1 = """  <div class="section-container glass" id="sec-1">
    <div class="content">
      <span class="eyebrow">Introducing Strata</span>
      <h1>Time, Reimagined.</h1>
      <hr class="gold-rule">
      <p>A masterpiece of mechanical engineering, revealed in its purest form.</p>
    </div>
  </div>"""

new_sec_1 = """  <div class="section-container glass" id="sec-1">
    <div class="content" style="display: flex; flex-direction: column; align-items: center; gap: 2rem;">
      <img src="hero.png" alt="Strata Watch" style="max-width: 100%; height: auto; max-height: 45vh; object-fit: contain; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
      <div>
        <span class="eyebrow">Introducing Strata</span>
        <h1 style="margin-bottom: 0.5rem;">Time, Reimagined.</h1>
        <hr class="gold-rule" style="margin: 1.5rem auto;">
        <p>A masterpiece of mechanical engineering, revealed in its purest form.</p>
      </div>
    </div>
  </div>"""

content = content.replace(old_sec_1, new_sec_1)

# Remove canvas
content = re.sub(r'<!-- Three\.js Canvas -->\n\s*<canvas id="bg-canvas"></canvas>\n', '', content)

# Remove three.js script import
content = re.sub(r'<script src="https://cdnjs\.cloudflare\.com/ajax/libs/three\.js/r128/three\.min\.js"></script>\n\s*', '', content)

# Remove update3D call from updateScroll
content = content.replace("update3D(globalProgress);\n      \n      requestAnimationFrame(updateScroll);", "requestAnimationFrame(updateScroll);")

# Find the start of the Three.js Scene code and remove it all the way down to just before the start loop
start_idx = content.find('    // --- Three.js Scene ---')
end_idx = content.find('    // Start loop')

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + content[end_idx:]

with open('index.html', 'w') as f:
    f.write(content)
