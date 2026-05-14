---
layout: post
title: "The Earth–Jupiter Dance: How Two Planets Draw a Star in Space"
date: 2026-05-07 09:00:00 +0530
categories: [Science Visualisation, Orbital Mechanics]
tags: [python, astronomy, matplotlib, orbital-mechanics, visualisation, pdf]
math: true
toc: true
image:
  path: /assets/posts/2026-05-07-earth-jupiter-dance/earth_jupiter_dance_preview.png
  alt: The star-shaped locus pattern formed by Earth-Jupiter connecting lines
---

## The Idea

Imagine standing in space and drawing a straight line between **Earth** and **Jupiter** every single day for about 12 years. What shape would all those lines make?

The answer is a beautiful, glowing **11-pointed star** — a pattern that emerges purely from the geometry of two planets orbiting the Sun at very different speeds.

This article builds that pattern step by step, explains the mathematics behind it, and provides all the Python source code so you can reproduce and extend it.

---

## The Setup

Both planets orbit the Sun in roughly circular paths:

| Planet  | Orbital Radius | Orbital Period      |
|---------|---------------|---------------------|
| Earth   | 1.00 AU       | 365.25 days (1 yr)  |
| Jupiter | 5.20 AU       | 4332.59 days (11.86 yr) |

The positions at any time $ t $ (in days) are simply:

$$
x_E(t) = R_E \cos\!\left(\frac{2\pi t}{T_E}\right), \quad
y_E(t) = R_E \sin\!\left(\frac{2\pi t}{T_E}\right)
$$

$$
x_J(t) = R_J \cos\!\left(\frac{2\pi t}{T_J}\right), \quad
y_J(t) = R_J \sin\!\left(\frac{2\pi t}{T_J}\right)
$$

Each day we draw the line segment from $ (x_E, y_E) $ to $ (x_J, y_J) $. After 4,332 days the pattern is complete.

---

## Why ~11 Arms?

### The Synodic Period

The **synodic period** $ P_{syn} $ is how long it takes Earth to "lap" Jupiter — i.e., return to the same relative alignment:

$$
\frac{1}{P_{syn}} = \frac{1}{T_E} - \frac{1}{T_J}
= \frac{1}{365.25} - \frac{1}{4332.59}
$$

$$
P_{syn} \approx 398.9 \text{ days}
$$

Earth laps Jupiter roughly every **399 days**.

### Number of Laps

In one Jupiter orbit (4332.59 days), Earth completes:

$$
N = \frac{T_J}{T_E} = \frac{4332.59}{365.25} \approx 11.86 \text{ orbits}
$$

Each orbit, Jupiter advances by $ 360° / 11.86 \approx 30.3° $. After 11 laps, Jupiter has moved $ 11 \times 30.3° \approx 333° $, and the 12th lap closes the figure — giving **11 distinct arms**.

### The Outer Envelope

The curved outer boundary of the pattern (the "petals") is an **epicycloid** — the curve traced by a point on a circle of radius $ r $ rolling outside a circle of radius $ R $:

$$
x(\theta) = (R+r)\cos\theta - r\cos\!\left(\tfrac{R+r}{r}\theta\right)
$$

$$
y(\theta) = (R+r)\sin\theta - r\sin\!\left(\tfrac{R+r}{r}\theta\right)
$$

---

## The Python Code

The full source generates:
- **Page 1** — concept introduction diagram
- **Pages 2–12** — one page per Earth orbit, showing the pattern building lap by lap
- **Page 13** — the complete pattern
- **Page 14** — the mathematics
- **Page 15** — comparison with Venus and Saturn dances

```python
import numpy as np
import matplotlib.pyplot as plt

# Orbital parameters
T_E, T_J = 365.25, 4332.59   # days
R_E, R_J = 1.0, 2.6          # visual radii (AU, compressed)

t = np.arange(0, int(T_J), 1)  # one day per step

# Planet positions
xe = R_E * np.cos(2 * np.pi * t / T_E)
ye = R_E * np.sin(2 * np.pi * t / T_E)
xj = R_J * np.cos(2 * np.pi * t / T_J)
yj = R_J * np.sin(2 * np.pi * t / T_J)

# Plot the locus
fig, ax = plt.subplots(figsize=(7, 7), facecolor='#04040f')
ax.set_facecolor('#04040f')

for i in range(0, len(t), 3):
    frac = i / len(t)
    alpha = 0.05 + 0.18 * np.sin(frac * np.pi)
    ax.plot([xe[i], xj[i]], [ye[i], yj[i]],
            color=(0.3, 0.5, 0.4 + 0.4*frac, alpha), lw=0.5)

ax.scatter([0], [0], color='#FFD060', s=200, zorder=10)  # Sun
ax.set_aspect('equal'); ax.axis('off')
plt.tight_layout()
plt.savefig('earth_jupiter_dance.png', dpi=150, bbox_inches='tight')
```

---

## Downloads

All files are freely available — no login required.

| File | Description |
|------|-------------|
| [📄 Step-by-Step PDF](/assets/posts/2026-05-07-earth-jupiter-dance/Earth_Jupiter_Dance_StepByStep.pdf) | 15-page illustrated guide building the pattern lap by lap |
| [📄 Pattern Overview PDF](/assets/posts/2026-05-07-earth-jupiter-dance/Earth_Jupiter_Dance.pdf) | 3-page overview with full pattern and orbital geometry |
| [🐍 Python Source](/assets/posts/2026-05-07-earth-jupiter-dance/earth_jupiter_dance.py) | Full source code — generates both PDFs |
| [📦 All Files (ZIP)](/assets/posts/2026-05-07-earth-jupiter-dance/earth_jupiter_dance_all.zip) | Everything in one download |

---

## Other Planetary Dances

Every pair of planets draws its own pattern. The shape depends entirely on the ratio of their periods:

- **Earth–Venus** (ratio ≈ 1.625) → a nearly perfect **5-petalled rose** (the "pentagram of Venus"). Venus and Earth are close to an 8:13 resonance, which is why this pattern nearly closes.
- **Earth–Saturn** (ratio ≈ 29.46) → a dense, intricate web with ~29 arms.
- **Earth–Mars** (ratio ≈ 1.88) → an open, looping pattern that takes many cycles to fill in.

These figures are a family of **Lissajous / spirograph curves** — the same geometry that appears in signal processing, pantographs, and harmonographs.

---

## Conclusion

What looks like an animated screensaver is in fact a direct consequence of Kepler's laws — the planets move in ellipses (approximated here as circles) at speeds set by their distance from the Sun, and the interference between those two rhythms writes a star in the sky.

The pattern will never repeat exactly, because 11.86 is irrational. Each Jupiter year, it shifts very slightly — meaning the dance goes on forever without ever quite retracing itself.

---

*Python 3.12 · matplotlib 3.8 · reportlab 4.x · NumPy 1.26*
