"""
TOOL:    build_master.py
FAMILY:  VA_Presentation_Template
VERSION: 1.0.1
DATE:    2026-11-28
CHAT:    Rebuild VA A4 landscape PowerPoint template
CHANGES: 1.0.1 - Smaller card corner radius.
         1.0.0 - Branding moved into slide master; 15 custom layouts; Aptos theme fonts;
         live slide number; colour-safe chart palette; logo downsized.
"""
__version__ = "1.0.1"

import os, re, shutil, sys, zipfile
from PIL import Image

SRC, OUT = sys.argv[1], sys.argv[2]
WORK = "/home/claude/build/pkg"
shutil.rmtree(WORK, ignore_errors=True)
zipfile.ZipFile(SRC).extractall(WORK)
P = lambda *a: os.path.join(WORK, *a)

MM = 36000
W, H = 10689336, 7562088
WMM, HMM = W / MM, H / MM
E = lambda v: int(round(v * MM))

NS = ('xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
      'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
      'xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"')

NAVY, RED, GOLD, INK, GREY, TINT = "0A1F4E", "C71920", "F2B705", "1A1A1A", "5B6470", "EEF2F8"
FOOTER_TEXT = "K Vijay Anand  |  Technical Paper Series"

# ---------------------------------------------------------------- logo
img = Image.open(P("ppt/media/image1.png")).convert("RGBA").resize((600, 600), Image.LANCZOS)
img.save(P("ppt/media/image1.png"), optimize=True)

# ---------------------------------------------------------------- theme
th = open(P("ppt/theme/theme1.xml"), encoding="utf-8").read()
clr = ('<a:clrScheme name="VA Technical">'
       f'<a:dk1><a:srgbClr val="{INK}"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1>'
       f'<a:dk2><a:srgbClr val="{NAVY}"/></a:dk2><a:lt2><a:srgbClr val="{TINT}"/></a:lt2>'
       f'<a:accent1><a:srgbClr val="{NAVY}"/></a:accent1><a:accent2><a:srgbClr val="{GOLD}"/></a:accent2>'
       '<a:accent3><a:srgbClr val="2E86C1"/></a:accent3><a:accent4><a:srgbClr val="E67E22"/></a:accent4>'
       f'<a:accent5><a:srgbClr val="7F8C8D"/></a:accent5><a:accent6><a:srgbClr val="{RED}"/></a:accent6>'
       '<a:hlink><a:srgbClr val="1F5FAD"/></a:hlink><a:folHlink><a:srgbClr val="6B3FA0"/></a:folHlink>'
       '</a:clrScheme>')
fnt = ('<a:fontScheme name="VA Aptos"><a:majorFont><a:latin typeface="Aptos Display"/><a:ea typeface=""/>'
       '<a:cs typeface=""/></a:majorFont><a:minorFont><a:latin typeface="Aptos"/><a:ea typeface=""/>'
       '<a:cs typeface=""/></a:minorFont></a:fontScheme>')
th = re.sub(r'<a:clrScheme .*?</a:clrScheme>', clr, th, flags=re.S)
th = re.sub(r'<a:fontScheme .*?</a:fontScheme>', fnt, th, flags=re.S)
th = re.sub(r'(<a:theme [^>]*name=")[^"]*"', r'\1VA Technical Paper"', th)
open(P("ppt/theme/theme1.xml"), "w", encoding="utf-8").write(th)

# ---------------------------------------------------------------- xml helpers
def xfrm(x, y, w, h):
    return f'<a:xfrm><a:off x="{E(x)}" y="{E(y)}"/><a:ext cx="{E(w)}" cy="{E(h)}"/></a:xfrm>'

def solid(c, alpha=None):
    a = f'<a:alpha val="{alpha}"/>' if alpha else ''
    return f'<a:solidFill><a:srgbClr val="{c}">{a}</a:srgbClr></a:solidFill>'

RED_GRAD = ('<a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:srgbClr val="8B0000"/></a:gs>'
            '<a:gs pos="50000"><a:srgbClr val="C71920"/></a:gs><a:gs pos="100000"><a:srgbClr val="F04438"/></a:gs>'
            '</a:gsLst><a:lin ang="0" scaled="1"/></a:gradFill>')
SHADOW = ('<a:effectLst><a:outerShdw blurRad="50800" dist="19050" dir="5400000" algn="t" rotWithShape="0">'
          '<a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw></a:effectLst>')

class Ids:
    def __init__(self): self.n = 1
    def __call__(self): self.n += 1; return self.n

def rect(i, name, x, y, w, h, fill, shadow=False, geom="rect"):
    return (f'<p:sp><p:nvSpPr><p:cNvPr id="{i()}" name="{name}"/><p:cNvSpPr/><p:nvPr userDrawn="1"/></p:nvSpPr>'
            f'<p:spPr>{xfrm(x, y, w, h)}<a:prstGeom prst="{geom}"><a:avLst>{'<a:gd name="adj" fmla="val 4500"/>' if geom=="roundRect" else ""}</a:avLst></a:prstGeom>{fill}<a:ln><a:noFill/></a:ln>'
            f'{SHADOW if shadow else ""}</p:spPr><p:txBody><a:bodyPr rtlCol="0" anchor="ctr"/><a:lstStyle/><a:p><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp>')

def pic(i, name, rid, x, y, w, h):
    return (f'<p:pic><p:nvPicPr><p:cNvPr id="{i()}" name="{name}" descr="VA logo"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr>'
            f'<p:nvPr userDrawn="1"/></p:nvPicPr><p:blipFill><a:blip r:embed="{rid}"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>'
            f'<p:spPr>{xfrm(x, y, w, h)}<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr></p:pic>')

def rpr(sz, color, b=False, i=False, font=None):
    f = f'<a:latin typeface="{font}"/>' if font else ''
    return f'<a:rPr lang="en-US" sz="{sz*100:.0f}" b="{1 if b else 0}" i="{1 if i else 0}" dirty="0">{solid(color)}{f}</a:rPr>'

def textbox(i, name, x, y, w, h, text, sz, color, algn="l", b=False, field=False):
    run = (f'<a:fld id="{{B6F15528-21DE-4FAA-801E-634DDDAF4B2B}}" type="slidenum">{rpr(sz, color, b)}<a:t>‹#›</a:t></a:fld>'
           if field else f'<a:r>{rpr(sz, color, b)}<a:t>{text}</a:t></a:r>')
    return (f'<p:sp><p:nvSpPr><p:cNvPr id="{i()}" name="{name}"/><p:cNvSpPr txBox="1"/><p:nvPr userDrawn="1"/></p:nvSpPr>'
            f'<p:spPr>{xfrm(x, y, w, h)}<a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/></p:spPr>'
            f'<p:txBody><a:bodyPr wrap="none" lIns="0" tIns="0" rIns="0" bIns="0" rtlCol="0" anchor="ctr"><a:noAutofit/></a:bodyPr><a:lstStyle/>'
            f'<a:p><a:pPr algn="{algn}"/>{run}</a:p></p:txBody></p:sp>')

def lvl(n=1, sz=18, color=INK, b=False, i=False, algn="l", bu="none", marL=0, indent=0, spcBef=0, font=None, bucolor=NAVY):
    if bu == "none":
        b_xml = '<a:buNone/>'
    elif bu == "auto":
        b_xml = f'<a:buClr><a:srgbClr val="{bucolor}"/></a:buClr><a:buFont typeface="+mj-lt"/><a:buAutoNum type="arabicPeriod"/>'
    else:
        b_xml = f'<a:buClr><a:srgbClr val="{bucolor}"/></a:buClr><a:buFont typeface="Arial"/><a:buChar char="{bu}"/>'
    f = f'<a:latin typeface="{font}"/>' if font else ''
    return (f'<a:lvl{n}pPr marL="{E(marL)}" indent="{E(indent)}" algn="{algn}"><a:spcBef><a:spcPts val="{spcBef*100}"/></a:spcBef>{b_xml}'
            f'<a:defRPr sz="{sz*100:.0f}" b="{1 if b else 0}" i="{1 if i else 0}">{solid(color)}{f}</a:defRPr></a:lvl{n}pPr>')

def ph(i, name, x, y, w, h, typ=None, idx=None, lst="", prompt="", anchor=None, autofit="norm", extra_body=""):
    t = f' type="{typ}"' if typ else ''
    ix = f' idx="{idx}"' if idx is not None else ''
    anc = f' anchor="{anchor}"' if anchor else ''
    fit = '<a:normAutofit/>' if autofit == "norm" else '<a:noAutofit/>'
    paras = "".join(f'<a:p><a:r><a:rPr lang="en-US"/><a:t>{l}</a:t></a:r></a:p>' for l in prompt.split("\n")) if prompt else '<a:p><a:endParaRPr lang="en-US"/></a:p>'
    return (f'<p:sp><p:nvSpPr><p:cNvPr id="{i()}" name="{name}"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr>'
            f'<p:nvPr><p:ph{t}{ix}/></p:nvPr></p:nvSpPr><p:spPr>{xfrm(x, y, w, h)}</p:spPr>'
            f'<p:txBody><a:bodyPr{anc} {extra_body}>{fit}</a:bodyPr><a:lstStyle>{lst}</a:lstStyle>{paras}</p:txBody></p:sp>')

GRP = ('<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/>'
       '<a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>')

# shared geometry (mm)
HDR_H, FTR_Y = 29.5, 199.1
FTR_H = HMM - FTR_Y
CX, CY, CW, CH = 12.7, 36.0, WMM - 25.4, 157.0       # content area
TITLE_BOX = (34.0, 2.5, WMM - 40.0, 24.5)

def header_footer(i, rid, footer=True, header=True):
    s = ""
    if header:
        s += rect(i, "VA Header Band", 0, 0, WMM, HDR_H, RED_GRAD, shadow=True)
        s += pic(i, "VA Logo", rid, 4.6, 2.55, 24.4, 24.4)
    if footer:
        s += rect(i, "VA Footer Band", 0, FTR_Y, WMM, FTR_H, solid(NAVY))
        s += textbox(i, "VA Footer Text", 7.1, FTR_Y + 1.6, 200, 7.6, FOOTER_TEXT, 10, "FFFFFF")
        s += textbox(i, "VA Slide Number", WMM - 31, FTR_Y + 1.6, 24, 7.6, "", 10, "FFFFFF", algn="r", field=True)
    return s

# ---------------------------------------------------------------- master
i = Ids()
title_lst = lvl(1, 28, "FFFFFF", b=True)
master_tree = (GRP + header_footer(i, "rIdLogo")
               + ph(i, "Title Placeholder", *TITLE_BOX, typ="title", anchor="ctr", prompt="Slide heading")
               + ph(i, "Text Placeholder", CX, CY, CW, CH, typ="body", idx=1,
                    prompt="First level\nSecond level\nThird level"))
body_style = (lvl(1, 18, INK, bu="•", marL=6.5, indent=-6.5, spcBef=8)
              + lvl(2, 16, INK, bu="–", marL=13, indent=-5.5, spcBef=4)
              + lvl(3, 14, GREY, bu="•", marL=19, indent=-5, spcBef=3, bucolor=GREY)
              + lvl(4, 14, GREY, bu="–", marL=24, indent=-5, spcBef=3, bucolor=GREY)
              + lvl(5, 14, GREY, bu="–", marL=29, indent=-5, spcBef=3, bucolor=GREY))
title_style = lvl(1, 28, "FFFFFF", b=True).replace('<a:defRPr', '<a:defRPr kern="0"').replace(
    '</a:defRPr>', '<a:latin typeface="+mj-lt"/></a:defRPr>').replace('<a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin', '<a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:latin')
body_style = body_style.replace('</a:defRPr>', '<a:latin typeface="+mn-lt"/></a:defRPr>')
LAYOUT_COUNT = 15
layout_ids = "".join(f'<p:sldLayoutId id="{2147483649 + k}" r:id="rId{k + 1}"/>' for k in range(LAYOUT_COUNT))
master = (f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldMaster {NS}><p:cSld name="VA Technical Paper">'
          f'<p:bg><p:bgPr>{solid("FFFFFF")}<a:effectLst/></p:bgPr></p:bg><p:spTree>{master_tree}</p:spTree></p:cSld>'
          '<p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" '
          'accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>'
          f'<p:sldLayoutIdLst>{layout_ids}</p:sldLayoutIdLst>'
          f'<p:txStyles><p:titleStyle>{title_style}</p:titleStyle><p:bodyStyle>{body_style}</p:bodyStyle>'
          f'<p:otherStyle>{lvl(1, 14, INK).replace("</a:defRPr>", "<a:latin typeface=\"+mn-lt\"/></a:defRPr>")}</p:otherStyle></p:txStyles></p:sldMaster>')

# ---------------------------------------------------------------- layouts
L = []   # (name, showMasterSp, tree builder, needs_logo, type)

def lay_title(i):
    band_h = 128
    return (rect(i, "VA Title Band", 0, 0, WMM, band_h, RED_GRAD, shadow=True)
            + pic(i, "VA Logo Large", "rIdLogo", WMM - 74, (band_h - 56) / 2, 56, 56)
            + ph(i, "Title", 16, 18, 196, 66, typ="ctrTitle", anchor="b",
                 lst=lvl(1, 36, "FFFFFF", b=True), prompt="Paper title")
            + ph(i, "Subtitle", 16, 87, 196, 32, typ="subTitle", idx=1, anchor="t",
                 lst=lvl(1, 18, "FFFFFF"), prompt="Subtitle or one-line summary of the paper")
            + ph(i, "Author", 16, 138, 220, 13, typ="body", idx=10, anchor="ctr",
                 lst=lvl(1, 22, NAVY, b=True), prompt="K Vijay Anand")
            + ph(i, "Series", 16, 152, 220, 10, typ="body", idx=11, anchor="ctr",
                 lst=lvl(1, 14, GREY), prompt="Technical Paper Series  ·  haivijayanand.github.io")
            + ph(i, "Date / Venue", 16, 163, 220, 10, typ="body", idx=12, anchor="ctr",
                 lst=lvl(1, 14, GREY), prompt="Month YYYY  ·  Venue")
            + header_footer(i, "rIdLogo", header=False))

def std_title(i):
    return ph(i, "Title", *TITLE_BOX, typ="title", anchor="ctr", prompt="Slide heading")

def lay_outline(i):
    return (std_title(i)
            + ph(i, "Outline List", CX + 8, CY + 4, CW - 16, CH - 8, typ="body", idx=1,
                 lst=lvl(1, 22, INK, bu="auto", marL=12, indent=-12, spcBef=10, bucolor=RED)
                 + lvl(2, 16, GREY, bu="–", marL=20, indent=-6, spcBef=2, bucolor=GREY),
                 prompt="Background\nMethod\nResults\nConclusions"))

def lay_section(i):
    return (rect(i, "VA Section Background", 0, 0, WMM, HMM, solid(NAVY))
            + pic(i, "VA Logo", "rIdLogo", WMM - 36, 9, 24.4, 24.4)
            + ph(i, "Section Number", 20, 48, 80, 46, typ="body", idx=10, anchor="b", autofit="none",
                 lst=lvl(1, 80, GOLD, b=True), prompt="01")
            + ph(i, "Title", 20, 98, WMM - 40, 40, typ="title", anchor="t",
                 lst=lvl(1, 36, "FFFFFF", b=True), prompt="Section title")
            + ph(i, "Section Subtitle", 20, 140, WMM - 40, 22, typ="body", idx=11, anchor="t",
                 lst=lvl(1, 18, "C9D3E6"), prompt="What this section covers")
            + textbox(i, "VA Footer Text", 7.1, FTR_Y + 1.6, 200, 7.6, FOOTER_TEXT, 10, "9FB0CC")
            + textbox(i, "VA Slide Number", WMM - 31, FTR_Y + 1.6, 24, 7.6, "", 10, "9FB0CC", algn="r", field=True))

def lay_content(i):
    return std_title(i) + ph(i, "Content", CX, CY, CW, CH, idx=1, prompt="Text, bullets, table, chart or picture")

def lay_two(i):
    cw = (CW - 8) / 2
    return (std_title(i)
            + ph(i, "Left Content", CX, CY, cw, CH, idx=1, prompt="Left column")
            + ph(i, "Right Content", CX + cw + 8, CY, cw, CH, idx=2, prompt="Right column"))

def lay_text_fig(i):
    tw = 100
    fx = CX + tw + 8
    fw = WMM - CX - fx
    return (std_title(i)
            + ph(i, "Text", CX, CY, tw, CH, typ="body", idx=1,
                 lst=lvl(1, 16, INK, bu="•", marL=6, indent=-6, spcBef=8)
                 + lvl(2, 14, GREY, bu="–", marL=11, indent=-5, spcBef=3, bucolor=GREY),
                 prompt="Explain what the figure shows")
            + ph(i, "Figure", fx, CY, fw, CH - 17, typ="pic", idx=2, prompt="Click icon to add figure")
            + ph(i, "Figure Caption", fx, CY + CH - 15, fw, 15, typ="body", idx=3, anchor="t",
                 lst=lvl(1, 12, GREY, i=True, algn="ctr"), prompt="Fig. n: Caption"))

def lay_full_fig(i):
    return (std_title(i)
            + ph(i, "Figure", CX + 6, CY, CW - 12, CH - 16, typ="pic", idx=1, prompt="Click icon to add figure")
            + ph(i, "Figure Caption", CX + 6, CY + CH - 14, CW - 12, 14, typ="body", idx=2, anchor="t",
                 lst=lvl(1, 12, GREY, i=True, algn="ctr"), prompt="Fig. n: Caption"))

def lay_table(i):
    return (std_title(i)
            + ph(i, "Table Caption", CX, CY, CW, 10, typ="body", idx=2, anchor="ctr",
                 lst=lvl(1, 15, NAVY, b=True), prompt="Table n: Caption")
            + ph(i, "Table", CX, CY + 12, CW, CH - 27, typ="tbl", idx=1, prompt="Click icon to add table")
            + ph(i, "Table Note", CX, CY + CH - 13, CW, 13, typ="body", idx=3, anchor="t",
                 lst=lvl(1, 11, GREY, i=True), prompt="Source / notes"))

def lay_eq(i):
    return (std_title(i)
            + rect(i, "VA Equation Panel", CX + 6, CY + 2, CW - 12, 90, solid(TINT), geom="roundRect")
            + ph(i, "Equations", CX + 12, CY + 6, CW - 24, 82, typ="body", idx=1, anchor="ctr",
                 lst=lvl(1, 26, INK, algn="ctr", spcBef=10, font="Cambria Math"),
                 prompt="Insert → Equation, or type the equation here")
            + ph(i, "Where", CX + 6, CY + 98, CW - 12, CH - 98, typ="body", idx=2, anchor="t",
                 lst=lvl(1, 16, INK, bu="none", spcBef=4) + lvl(2, 14, GREY, bu="–", marL=6, indent=-5, spcBef=2, bucolor=GREY),
                 prompt="where  symbol = meaning (unit)"))

def lay_key(i):
    pw = 86
    px = WMM - CX - pw
    return (std_title(i)
            + ph(i, "Chart", CX, CY, px - CX - 8, CH, typ="chart", idx=1, prompt="Click icon to add chart")
            + rect(i, "VA Takeaway Panel", px, CY, pw, CH, solid(TINT), geom="roundRect")
            + textbox(i, "VA Takeaway Label", px + 7, CY + 6, pw - 14, 8, "KEY TAKEAWAY", 12, NAVY, b=True)
            + ph(i, "Key Number", px + 7, CY + 16, pw - 14, 30, typ="body", idx=2, anchor="ctr",
                 lst=lvl(1, 40, RED, b=True), prompt="+12 %")
            + ph(i, "Takeaway Text", px + 7, CY + 50, pw - 14, CH - 56, typ="body", idx=3, anchor="t",
                 lst=lvl(1, 15, INK, spcBef=6), prompt="One or two sentences on what the result means"))

def lay_concl(i):
    cw = (CW - 8) / 2
    s = std_title(i)
    for k, (hdr, idx_h, idx_b, bc) in enumerate([("Conclusions", 10, 1, NAVY), ("Future work", 11, 2, GOLD)]):
        x = CX + k * (cw + 8)
        s += rect(i, f"VA Card {k+1}", x, CY, cw, CH, solid(TINT), geom="roundRect")
        s += ph(i, f"{hdr} Heading", x + 7, CY + 5, cw - 14, 12, typ="body", idx=idx_h, anchor="ctr",
                lst=lvl(1, 20, NAVY, b=True), prompt=hdr)
        s += ph(i, f"{hdr} Points", x + 7, CY + 19, cw - 14, CH - 24, typ="body", idx=idx_b, anchor="t",
                lst=lvl(1, 16, INK, bu="■", marL=6, indent=-6, spcBef=8, bucolor=bc)
                + lvl(2, 14, GREY, bu="–", marL=11, indent=-5, spcBef=3, bucolor=GREY),
                prompt="Point")
    return s

def lay_refs(i):
    return (std_title(i)
            + ph(i, "References", CX, CY, CW, CH, typ="body", idx=1, anchor="t",
                 extra_body=f'numCol="2" spcCol="{E(10)}"',
                 lst=lvl(1, 12, INK, bu="none", marL=8, indent=-8, spcBef=5),
                 prompt="[1] A. Author, “Title,” Journal, vol. x, no. y, pp. 1–10, Year."))

def lay_title_only(i):
    return std_title(i)

def lay_blank(i):
    return ""

def lay_thanks(i):
    return (rect(i, "VA Thanks Background", 0, 0, WMM, FTR_Y, RED_GRAD)
            + pic(i, "VA Logo Large", "rIdLogo", (WMM - 56) / 2, 22, 56, 56)
            + ph(i, "Title", 20, 86, WMM - 40, 32, typ="title", anchor="ctr",
                 lst=lvl(1, 44, "FFFFFF", b=True, algn="ctr"), prompt="Thank You")
            + ph(i, "Closing Line", 20, 120, WMM - 40, 18, typ="body", idx=1, anchor="t",
                 lst=lvl(1, 20, "FFFFFF", algn="ctr"), prompt="Questions and discussion")
            + ph(i, "Contact", 20, 152, WMM - 40, 12, typ="body", idx=10, anchor="ctr",
                 lst=lvl(1, 14, "FFE7A3", algn="ctr"), prompt="haivijayanand.github.io  ·  haivijayanand@gmail.com")
            + header_footer(i, "rIdLogo", header=False))

LAYOUTS = [
    ("VA Title Slide", lay_title, False, "title"),
    ("VA Outline", lay_outline, True, None),
    ("VA Section Divider", lay_section, False, "secHead"),
    ("VA Title and Content", lay_content, True, "obj"),
    ("VA Two Content", lay_two, True, "twoObj"),
    ("VA Text and Figure", lay_text_fig, True, None),
    ("VA Full Figure", lay_full_fig, True, None),
    ("VA Table", lay_table, True, None),
    ("VA Equations", lay_eq, True, None),
    ("VA Key Result", lay_key, True, None),
    ("VA Conclusions", lay_concl, True, None),
    ("VA References", lay_refs, True, None),
    ("VA Title Only", lay_title_only, True, "titleOnly"),
    ("VA Blank", lay_blank, True, "blank"),
    ("VA Thank You", lay_thanks, False, None),
]
assert len(LAYOUTS) == LAYOUT_COUNT

# wipe old layouts and the sample slide
shutil.rmtree(P("ppt/slideLayouts")); os.makedirs(P("ppt/slideLayouts/_rels"))
shutil.rmtree(P("ppt/slides"), ignore_errors=True)
LREL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
for n, (name, fn, show, typ) in enumerate(LAYOUTS, 1):
    i = Ids()
    t = f' type="{typ}"' if typ else ''
    sm = '' if show else ' showMasterSp="0"'
    xml = (f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldLayout {NS}{t}{sm} preserve="1" userDrawn="1">'
           f'<p:cSld name="{name}"><p:spTree>{GRP}{fn(i)}</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>')
    open(P(f"ppt/slideLayouts/slideLayout{n}.xml"), "w", encoding="utf-8").write(xml)
    rels = (f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            f'<Relationship Id="rId1" Type="{LREL}/slideMaster" Target="../slideMasters/slideMaster1.xml"/>'
            + ('' if show else f'<Relationship Id="rIdLogo" Type="{LREL}/image" Target="../media/image1.png"/>')
            + '</Relationships>')
    open(P(f"ppt/slideLayouts/_rels/slideLayout{n}.xml.rels"), "w", encoding="utf-8").write(rels)

open(P("ppt/slideMasters/slideMaster1.xml"), "w", encoding="utf-8").write(master)
mrels = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
         + "".join(f'<Relationship Id="rId{k}" Type="{LREL}/slideLayout" Target="../slideLayouts/slideLayout{k}.xml"/>' for k in range(1, LAYOUT_COUNT + 1))
         + f'<Relationship Id="rIdTheme" Type="{LREL}/theme" Target="../theme/theme1.xml"/>'
         + f'<Relationship Id="rIdLogo" Type="{LREL}/image" Target="../media/image1.png"/></Relationships>')
open(P("ppt/slideMasters/_rels/slideMaster1.xml.rels"), "w", encoding="utf-8").write(mrels)

# presentation.xml: drop slide list, keep everything else
pres = open(P("ppt/presentation.xml"), encoding="utf-8").read()
pres = re.sub(r'<p:sldIdLst>.*?</p:sldIdLst>', '', pres, flags=re.S)
pres = pres.replace('type="screen4x3"', 'type="custom"')
open(P("ppt/presentation.xml"), "w", encoding="utf-8").write(pres)
prels = open(P("ppt/_rels/presentation.xml.rels"), encoding="utf-8").read()
prels = re.sub(r'<Relationship Id="rId7"[^>]*/>', '', prels)
open(P("ppt/_rels/presentation.xml.rels"), "w", encoding="utf-8").write(prels)

ct = open(P("[Content_Types].xml"), encoding="utf-8").read()
ct = re.sub(r'<Override PartName="/ppt/slideLayouts/[^>]*/>', '', ct)
ct = re.sub(r'<Override PartName="/ppt/slides/[^>]*/>', '', ct)
ct = ct.replace('</Types>', "".join(
    f'<Override PartName="/ppt/slideLayouts/slideLayout{k}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>'
    for k in range(1, LAYOUT_COUNT + 1)) + '</Types>')
open(P("[Content_Types].xml"), "w", encoding="utf-8").write(ct)

# app.xml: neutral
open(P("docProps/app.xml"), "w", encoding="utf-8").write(
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" '
    'xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>Microsoft Office PowerPoint</Application>'
    '<PresentationFormat>Custom</PresentationFormat><Slides>0</Slides></Properties>')
os.remove(P("docProps/thumbnail.jpeg")) if os.path.exists(P("docProps/thumbnail.jpeg")) else None
r = open(P("_rels/.rels"), encoding="utf-8").read()
r = re.sub(r'<Relationship [^>]*thumbnail[^>]*/>', '', r)
open(P("_rels/.rels"), "w", encoding="utf-8").write(r)

if os.path.exists(OUT): os.remove(OUT)
with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
    z.write(P("[Content_Types].xml"), "[Content_Types].xml")
    for root, _, files in os.walk(WORK):
        for f in files:
            full = os.path.join(root, f); arc = os.path.relpath(full, WORK)
            if arc != "[Content_Types].xml": z.write(full, arc)
print("written", OUT)
