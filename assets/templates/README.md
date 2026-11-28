# VA presentation templates

| File | What it is |
|---|---|
| `VA_A4_Landscape_Template_v2.pptx` | Blank template: A4 landscape (297 × 210 mm), branding in the slide master, 15 "VA" layouts, Aptos fonts, footer "K Vijay Anand \| Technical Paper Series", live slide number |
| `VA_A4_Template_Guide_v2.pptx` | Same template with one filled sample slide per layout and usage notes in the speaker notes |
| `VA_Template_Layouts_Overview.jpg` | Contact sheet of all 15 layouts |
| `src/build_master.py` | Rebuilds the master, theme and layouts from the v1 original (`python3 build_master.py src/VA_A4_Landscape_PowerPoint_Template_v1_original.pptx out.pptx`) |
| `src/build_samples.py` | Adds the sample slides (`python3 build_samples.py out.pptx guide.pptx`) |

Raw download URL used by Claude sessions:
`https://raw.githubusercontent.com/haivijayanand/haivijayanand.github.io/main/assets/templates/VA_A4_Landscape_Template_v2.pptx`

## Layouts (index → name → placeholder idx)

0 VA Title Slide (0 title, 1 subtitle, 10 author, 11 series, 12 date/venue) ·
1 VA Outline (0, 1 numbered list) ·
2 VA Section Divider (10 number, 0 title, 11 subtitle) ·
3 VA Title and Content (0, 1) ·
4 VA Two Content (0, 1, 2) ·
5 VA Text and Figure (0, 1 text, 2 picture, 3 caption) ·
6 VA Full Figure (0, 1 picture, 2 caption) ·
7 VA Table (0, 2 caption, 1 table, 3 note) ·
8 VA Equations (0, 1 equations, 2 where-list) ·
9 VA Key Result (0, 1 chart, 2 key number, 3 takeaway) ·
10 VA Conclusions (0, 10/1 conclusions heading/points, 11/2 future-work heading/points) ·
11 VA References (0, 1 two-column IEEE list) ·
12 VA Title Only · 13 VA Blank · 14 VA Thank You (0, 1 closing line, 10 contact)

Theme colours: navy 0A1F4E, gold F2B705, sky 2E86C1, orange E67E22, grey 7F8C8D, red C71920 (brand only).
