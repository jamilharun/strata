import re

with open('index.html', 'r') as f:
    content = f.read()

# We need to replace everything from <div class="section-container glass" id="sec-1" to the closing </div> of sec-1
# Since it's nested, we'll just use a regex or string find that grabs the block.

old_block_start = '<div class="section-container glass" id="sec-1"'
old_block_end = '<!-- 2. Brand Intro (Solid) -->'

start_idx = content.find(old_block_start)
end_idx = content.find(old_block_end)

new_sec_1 = """  <div class="section-container glass" id="sec-1" style="padding: 1rem; justify-content: flex-start;">
    <div class="content" style="max-width: 98vw; width: 100%; height: 100%; display: flex; align-items: center;">
      <div style="display: grid; grid-template-columns: 1fr 2.5fr; gap: 2rem; align-items: center; width: 100%;">
        <div style="text-align: left; padding-left: 2rem;">
          <span class="eyebrow">Introducing Strata</span>
          <h1 style="margin-bottom: 0.5rem; font-size: 3.5rem; line-height: 1.1;">Time,<br>Reimagined.</h1>
          <hr class="gold-rule" style="margin: 1.5rem 0;">
          <p style="font-size: 1.1rem; max-width: 400px;">A masterpiece of mechanical engineering, revealed in its purest form.</p>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem;">
          <div style="position: relative; overflow: hidden; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); aspect-ratio: 1/1;">
            <img src="hero.png" alt="Skeleton Watch" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          </div>
          <div style="position: relative; overflow: hidden; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); aspect-ratio: 1/1;">
            <img src="dive.png" alt="Dive Watch" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          </div>
          <div style="position: relative; overflow: hidden; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); aspect-ratio: 1/1;">
            <img src="dress.png" alt="Dress Watch" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          </div>
          <div style="position: relative; overflow: hidden; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); aspect-ratio: 1/1;">
            <img src="chrono.png" alt="Chronograph Watch" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          </div>
          <div style="position: relative; overflow: hidden; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); aspect-ratio: 1/1;">
            <img src="pilot.png" alt="Pilot Watch" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          </div>
          <div style="position: relative; overflow: hidden; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); aspect-ratio: 1/1;">
            <img src="field.png" alt="Field Watch" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          </div>
          <div style="position: relative; overflow: hidden; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); aspect-ratio: 1/1;">
            <img src="moonphase.png" alt="Moonphase Watch" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          </div>
          <div style="position: relative; overflow: hidden; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); aspect-ratio: 1/1;">
            <img src="aviator.png" alt="Aviator Watch" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          </div>
          <div style="position: relative; overflow: hidden; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); aspect-ratio: 1/1;">
            <img src="dial.png" alt="Dial Detail" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          </div>
        </div>
      </div>
    </div>
  </div>

  """

content = content[:start_idx] + new_sec_1 + content[end_idx:]

with open('index.html', 'w') as f:
    f.write(content)

