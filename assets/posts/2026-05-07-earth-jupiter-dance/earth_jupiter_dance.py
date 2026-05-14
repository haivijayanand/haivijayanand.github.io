"""
Earth-Jupiter Dance: Orbital Locus Visualiser
==============================================
Generates two PDF documents showing the star-shaped interference pattern
formed by connecting Earth and Jupiter with a line each day over one
Jovian year (~11.86 years).

Author : K Vijay Anand, Sc-F
         Centre for Aero Mechanical Technologies (CAMT)
         CVRDE / DRDO, Avadi, Chennai 600071, India
GitHub : haivijayanand
Date   : 2026-05-07

Requirements
------------
    pip install numpy matplotlib reportlab

Usage
-----
    python earth_jupiter_dance.py

Output
------
    Earth_Jupiter_Dance.pdf             -- 3-page overview
    Earth_Jupiter_Dance_StepByStep.pdf  -- 15-page step-by-step build
"""

import io
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.backends.backend_agg import FigureCanvasAgg
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas as rl_canvas
from reportlab.lib.utils import ImageReader

# ── Constants ──────────────────────────────────────────────────────────────────
T_E   = 365.25    # Earth orbital period (days)
T_J   = 4332.59   # Jupiter orbital period (days)
R_E   = 1.0       # Visual orbital radius - Earth
R_J   = 2.6       # Visual orbital radius - Jupiter (compressed)

BG      = '#04040f'
C_SUN   = '#FFD060'
C_EARTH = '#4A9EFF'
C_JUP   = '#FF4A8A'
C_LINE  = '#5A7FCC'
C_DIM   = '#7070A0'

# ── Compute positions ──────────────────────────────────────────────────────────
total_days = int(T_J)
t_all      = np.arange(0, total_days, 1)

def planet_pos(t, R, T):
    th = 2 * np.pi * t / T
    return R * np.cos(th), R * np.sin(th)

xe_all, ye_all = planet_pos(t_all, R_E, T_E)
xj_all, yj_all = planet_pos(t_all, R_J, T_J)
orbit_th       = np.linspace(0, 2 * np.pi, 500)


# ── Helpers ────────────────────────────────────────────────────────────────────
def fig_to_bytes(fig):
    buf = io.BytesIO()
    FigureCanvasAgg(fig).print_png(buf)
    buf.seek(0)
    return buf

def setup_ax(ax):
    ax.set_facecolor(BG)
    ax.set_xlim(-3.3, 3.3)
    ax.set_ylim(-3.3, 3.3)
    ax.set_aspect('equal')
    ax.axis('off')

def draw_orbits(ax):
    ax.plot(R_E * np.cos(orbit_th), R_E * np.sin(orbit_th), color='#1a2a4a', lw=0.6, alpha=0.55)
    ax.plot(R_J * np.cos(orbit_th), R_J * np.sin(orbit_th), color='#1a2a5a', lw=0.6, alpha=0.45)

def draw_sun(ax, s=200):
    ax.scatter([0], [0], color=C_SUN, s=s, zorder=15)

def draw_locus(ax, indices, step=3, alpha_mul=1.0):
    for i in indices[::step]:
        frac  = i / total_days
        alpha = (0.05 + 0.18 * np.sin(frac * np.pi)) * alpha_mul
        blue  = 0.4 + 0.4 * frac
        ax.plot([xe_all[i], xj_all[i]], [ye_all[i], yj_all[i]],
                color=(0.28, 0.48, blue, alpha), lw=0.5)

def page_bg(c):
    c.setFillColorRGB(0.016, 0.016, 0.059)
    c.rect(0, 0, *A4, fill=1, stroke=0)

def header_bar(c, title, subtitle=''):
    W, H = A4
    c.setFillColorRGB(0.04, 0.04, 0.18)
    c.rect(0, H - 62, W, 62, fill=1, stroke=0)
    c.setFillColorRGB(1, 1, 1)
    c.setFont('Helvetica-Bold', 15)
    c.drawString(28, H - 30, title)
    if subtitle:
        c.setFont('Helvetica', 9)
        c.setFillColorRGB(0.65, 0.65, 0.88)
        c.drawString(28, H - 48, subtitle)

def footer_bar(c, note=''):
    W, _ = A4
    c.setFillColorRGB(0.04, 0.04, 0.18)
    c.rect(0, 0, W, 26, fill=1, stroke=0)
    c.setFont('Helvetica', 7)
    c.setFillColorRGB(0.5, 0.5, 0.72)
    base = 'Earth T=365.25 d  |  Jupiter T=4332.59 d (~11.86 yr)  |  Radii not to scale'
    c.drawCentredString(W / 2, 8, base + ('   |   ' + note if note else ''))

def place_image(c, buf, x, y, w, h):
    c.drawImage(ImageReader(buf), x, y, w, h, preserveAspectRatio=True, anchor='c')


# ── Build overview PDF ─────────────────────────────────────────────────────────
def build_overview_pdf(path='Earth_Jupiter_Dance.pdf'):
    W, H = A4
    c = rl_canvas.Canvas(path, pagesize=A4)

    fig, ax = plt.subplots(figsize=(6, 6), facecolor=BG)
    setup_ax(ax); draw_orbits(ax); draw_locus(ax, t_all, step=3); draw_sun(ax)
    plt.tight_layout(pad=0.2)
    buf1 = fig_to_bytes(fig); plt.close(fig)

    page_bg(c)
    header_bar(c, 'EARTH-JUPITER DANCE',
               'Locus of connecting lines over one Jovian year (11.86 yr)')
    place_image(c, buf1, 90, H - 530, W - 180, 440)
    footer_bar(c, 'Page 1 of 3')
    c.showPage()

    fig2, axes = plt.subplots(2, 3, figsize=(10, 7), facecolor=BG)
    fig2.patch.set_facecolor(BG)
    for idx, (frac, lbl) in enumerate(zip(
        [0.05, 0.20, 0.40, 0.60, 0.80, 1.0],
        ['Yr 0.6', 'Yr 2.4', 'Yr 4.7', 'Yr 7.1', 'Yr 9.5', 'Yr 11.9']
    )):
        ax = axes[idx // 3][idx % 3]
        setup_ax(ax); draw_orbits(ax); draw_sun(ax, 80)
        ni = max(10, int(frac * total_days))
        draw_locus(ax, np.arange(0, ni), step=max(1, ni // 200), alpha_mul=0.8)
        ax.set_title(lbl, color=C_DIM, fontsize=8, fontfamily='monospace')
    fig2.suptitle('Pattern Evolution', color='white', fontsize=12, y=0.98)
    plt.tight_layout(pad=0.4)
    buf2 = fig_to_bytes(fig2); plt.close(fig2)

    page_bg(c)
    header_bar(c, 'PATTERN EVOLUTION', 'Six snapshots -- watch the star emerge')
    place_image(c, buf2, 15, H - 420, W - 30, 330)
    footer_bar(c, 'Page 2 of 3')
    c.showPage()

    c.save()
    print(f'Saved: {path}')


# ── Build step-by-step PDF ─────────────────────────────────────────────────────
LAP_DESCRIPTIONS = [
    "Earth completes its 1st orbit. Jupiter has barely moved -- only 30 degrees. A few lines fan out forming the first spoke.",
    "Earth finishes lap 2. Jupiter has advanced ~60 deg. A second spoke appears. You can see the pattern wants to be symmetric.",
    "Lap 3 done. Jupiter at ~90 deg (one quarter of its orbit). Three spokes visible and the centre fills with a soft glow.",
    "Four Earth orbits complete. Jupiter past 120 deg. Four spokes -- the star outline begins to feel like a real geometric figure.",
    "Lap 5. Jupiter ~150 deg through its orbit. Five spokes and the inner star-shape clearly emerges from line intersections.",
    "Halfway through Jupiter's journey (lap 6, ~180 deg). Beautiful 6-fold symmetry in progress; the bright core glows strongly.",
    "Seven Earth laps. Jupiter at 210 deg. Seven prominent arms and the swept arcs on the outer ring become visible.",
    "Lap 8. Jupiter ~240 deg. Eight spokes; outer arc segments trace almost a full semicircle -- the envelope appears.",
    "Nine Earth orbits. Jupiter at 270 deg (three-quarters done). Nine spokes and the inner star polygon is dense and bright.",
    "Ten laps. Jupiter ~300 deg. The figure is nearly complete; the 10-pointed star is almost fully drawn.",
    "Eleven Earth orbits. Jupiter at ~330 deg -- almost home. Eleven spokes, outer arcs form a nearly closed ring.",
]

def build_stepbystep_pdf(path='Earth_Jupiter_Dance_StepByStep.pdf'):
    W, H = A4
    c = rl_canvas.Canvas(path, pagesize=A4)

    # Title page
    page_bg(c)
    c.setFont('Helvetica-Bold', 26); c.setFillColorRGB(0.9, 0.9, 1.0)
    c.drawCentredString(W/2, H-110, 'THE EARTH-JUPITER DANCE')
    c.setFont('Helvetica', 13); c.setFillColorRGB(0.6, 0.6, 0.85)
    c.drawCentredString(W/2, H-135, 'A Step-by-Step Build -- One Earth Orbit at a Time')
    footer_bar(c, 'Page 1 of 15')
    c.showPage()

    # Lap pages
    for lap in range(1, 12):
        t_start = int((lap-1) * T_E)
        t_end   = min(int(lap * T_E), total_days-1)

        fig_p, (axL, axR) = plt.subplots(1, 2, figsize=(9, 5), facecolor=BG)
        for ax, indices, ttl in [
            (axL, np.arange(t_start, t_end), f'This lap only\n(Earth orbit {lap})'),
            (axR, np.arange(0, t_end),       f'Cumulative\n(all {lap} lap(s))'),
        ]:
            setup_ax(ax); draw_orbits(ax); draw_sun(ax)
            ax.set_title(ttl, color=C_DIM, fontsize=8, fontfamily='monospace', pad=4)
            draw_locus(ax, indices, step=max(1, len(indices)//200))
            ei = min(t_end, total_days-1)
            ax.scatter([xe_all[ei]], [ye_all[ei]], color=C_EARTH, s=55, zorder=14)
            ax.scatter([xj_all[ei]], [yj_all[ei]], color=C_JUP,   s=70,  zorder=14)
            ax.plot([xe_all[ei],xj_all[ei]], [ye_all[ei],yj_all[ei]],
                    color=C_LINE, lw=1.0, alpha=0.8, zorder=13)
        plt.tight_layout(pad=0.4)
        buf_p = fig_to_bytes(fig_p); plt.close(fig_p)

        jup_deg = (lap * T_E / T_J) * 360
        page_bg(c)
        header_bar(c, f'LAP {lap}  --  Earth orbited {lap}x, Jupiter moved {jup_deg:.0f} deg',
                   f'Days elapsed: {int(lap*T_E):,} of 4,333  ({lap*T_E/T_J*100:.1f}% of Jupiter orbit)')
        place_image(c, buf_p, 20, H-395, W-40, 315)

        c.setFillColorRGB(0.05,0.05,0.20)
        c.roundRect(20, 80, W-40, 165, 7, fill=1, stroke=0)
        c.setFont('Helvetica-Bold',9); c.setFillColorRGB(1.0,0.85,0.3)
        c.drawString(32, 230, f'WHAT YOU ARE SEEING -- LAP {lap}')

        words = LAP_DESCRIPTIONS[lap-1].split()
        lines_out, cur = [], ''
        for w in words:
            if len(cur)+len(w)+1 <= 90: cur += (' ' if cur else '')+w
            else: lines_out.append(cur); cur = w
        if cur: lines_out.append(cur)

        c.setFont('Helvetica',9); c.setFillColorRGB(0.85,0.85,1.0)
        yy = 214
        for ln in lines_out: c.drawString(32, yy, ln); yy -= 13
        c.setFont('Helvetica-Bold',8); c.setFillColorRGB(0.55,0.75,1.0)
        c.drawString(32, yy-4, f'Lines this lap: ~{int(T_E):,}     Cumulative: ~{int(lap*T_E):,}     Jupiter: {jup_deg:.1f} deg')

        footer_bar(c, f'Page {lap+1} of 15')
        c.showPage()

    # Full pattern
    fig_f, ax_f = plt.subplots(figsize=(6,6), facecolor=BG)
    setup_ax(ax_f); draw_orbits(ax_f); draw_locus(ax_f, t_all, step=3); draw_sun(ax_f)
    plt.tight_layout(pad=0.2)
    buf_f = fig_to_bytes(fig_f); plt.close(fig_f)
    page_bg(c)
    header_bar(c,'THE COMPLETE PATTERN','All 4,332 days -- one full Jupiter orbit')
    place_image(c, buf_f, 100, H-500, W-200, 400)
    footer_bar(c,'Page 13 of 15'); c.showPage()

    # Maths page
    page_bg(c)
    header_bar(c,'THE MATHEMATICS','Why does the pattern have ~11 arms?')
    c.setFillColorRGB(0.05,0.05,0.20)
    c.roundRect(20,55,W-40,H-135,7,fill=1,stroke=0)
    yy = H-100
    for title, lines in [
        ('1. SYNODIC PERIOD', ['1/P_syn = 1/365.25 - 1/4332.59', 'P_syn = 398.9 days', '']),
        ('2. LAPS PER JUPITER ORBIT', ['N = 4332.59 / 365.25 = 11.86 orbits', 'Each lap: Jupiter advances 360/11.86 = 30.3 deg', '']),
        ('3. WHY ~11 ARMS?', ['11 x 30.3 = 333 deg. The 12th lap closes the figure.', '']),
        ('4. ENVELOPE CURVE', ['The outer boundary is an epicycloid.', 'Inner star = intersections of all line segments.', '']),
    ]:
        c.setFont('Helvetica-Bold',9.5); c.setFillColorRGB(1.0,0.85,0.3)
        c.drawString(32,yy,title); yy -= 16
        for ln in lines:
            if not ln: yy -= 5; continue
            c.setFont('Courier' if '=' in ln or '/' in ln else 'Helvetica', 9)
            c.setFillColorRGB(0.85,0.85,1.0)
            c.drawString(40,yy,ln); yy -= 13
        yy -= 8
    footer_bar(c,'Page 14 of 15'); c.showPage()

    # Other dances
    page_bg(c)
    header_bar(c,'OTHER PLANETARY DANCES','Every pair of planets draws its own unique pattern')
    footer_bar(c,'Page 15 of 15'); c.showPage()

    c.save()
    print(f'Saved: {path}')


if __name__ == '__main__':
    build_overview_pdf()
    build_stepbystep_pdf()
    print('All done.')
