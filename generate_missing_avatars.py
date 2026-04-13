import os
import random
import math
from PIL import Image

def rgb_to_hsv(r, g, b):
    maxc = max(r, g, b)
    minc = min(r, g, b)
    v = maxc
    if minc == maxc:
        return 0.0, 0.0, v
    s = (maxc-minc) / maxc
    rc = (maxc-r) / (maxc-minc)
    gc = (maxc-g) / (maxc-minc)
    bc = (maxc-b) / (maxc-minc)
    if r == maxc:
        h = bc-gc
    elif g == maxc:
        h = 2.0+rc-bc
    else:
        h = 4.0+gc-rc
    h = (h/6.0) % 1.0
    return h, s, v

def hsv_to_rgb(h, s, v):
    if s == 0.0:
        return v, v, v
    i = int(h*6.0) # XXX assume int() truncates!
    f = (h*6.0) - i
    p = v*(1.0 - s)
    q = v*(1.0 - s*f)
    t = v*(1.0 - s*(1.0-f))
    i = i%6
    if i == 0:
        return v, t, p
    if i == 1:
        return q, v, p
    if i == 2:
        return p, v, t
    if i == 3:
        return p, q, v
    if i == 4:
        return t, p, v
    if i == 5:
        return v, p, q

def shift_hue(image, shift):
    img = image.convert('RGBA')
    data = img.load()
    width, height = img.size
    for y in range(height):
        for x in range(width):
            r, g, b, a = data[x, y]
            if a == 0:
                continue
            h, s, v = rgb_to_hsv(r/255.0, g/255.0, b/255.0)
            h = (h + shift) % 1.0
            nr, ng, nb = hsv_to_rgb(h, s, v)
            data[x, y] = (int(nr*255), int(ng*255), int(nb*255), a)
    return img

base_images = [
    '/Users/mac/Desktop/antigravity/AI性格自测/public/images/avatar_rlcs.png',
    '/Users/mac/Desktop/antigravity/AI性格自测/public/images/avatar_recs.png',
    '/Users/mac/Desktop/antigravity/AI性格自测/public/images/avatar_aedu.png',
    '/Users/mac/.gemini/antigravity/brain/9e4650f5-b21b-43ff-a47d-050601d46a73/avatar_rlds_1776063779533.png'
]

# Move the newly generated one to public
new_rlds = '/Users/mac/Desktop/antigravity/AI性格自测/public/images/avatar_rlds.png'
if os.path.exists(base_images[3]) and not os.path.exists(new_rlds):
    import shutil
    shutil.copy(base_images[3], new_rlds)

existing_images_dir = '/Users/mac/Desktop/antigravity/AI性格自测/public/images/'

# Load one to use as a primary base for hue shifting
base_img = Image.open(new_rlds if os.path.exists(new_rlds) else base_images[0])

missing_codes = [
    'REDS', 'RLCU', 'RLDU', 'RECU', 'REDU', 
    'ALCS', 'ALDS', 'AECS', 'AEDS', 'ALCU', 'AECU'
]

# We want evenly spaced hues for these
hue_step = 1.0 / len(missing_codes)

for i, code in enumerate(missing_codes):
    path = os.path.join(existing_images_dir, f'avatar_{code.lower()}.png')
    if not os.path.exists(path):
        print(f"Generating image for {code}...")
        shifted = shift_hue(base_img, hue_step * (i + 1))
        shifted.save(path)
        print(f"Saved {path}")

# Rename AADU to ALDU
old_aadu = os.path.join(existing_images_dir, 'avatar_aadu.png')
new_aldu = os.path.join(existing_images_dir, 'avatar_aldu.png')
if os.path.exists(old_aadu) and not os.path.exists(new_aldu):
    os.rename(old_aadu, new_aldu)
    print("Renamed avatar_aadu.png to avatar_aldu.png")

print("All done!")
