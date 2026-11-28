--[[
TOOL:    ieee.lua - pandoc Lua filter: IEEE-style two-column LaTeX floats, tables, abstract and references
FAMILY:  technical-papers / xfoil-improvements-convergence-multielement
VERSION: 1.1.0
DATE:    2026-11-28
CHAT:    XFOIL improvements, history, branches and multi-element airfoils (2026-11-28)
CHANGES: 1.0.0 - first version: figures to column width, tabularx tables (narrow/wide), bold abstract, reference list
         1.1.0 - figures whose caption ends with [wide] span both columns (figure*)
]]

local function tolatex(blocks)
  local s = pandoc.write(pandoc.Pandoc(blocks), 'latex')
  s = s:gsub('\n+$', ''):gsub('\n\n', ' ')
  return s
end

function Div(el)
  if el.classes:includes('abstract') or el.classes:includes('keywords') then
    local out = { pandoc.RawBlock('latex', '\\begingroup\\small\\bfseries') }
    for _, b in ipairs(el.content) do table.insert(out, b) end
    table.insert(out, pandoc.RawBlock('latex', '\\par\\endgroup\\smallskip'))
    return out
  end
  if el.classes:includes('refs') then
    local out = { pandoc.RawBlock('latex', '\\begingroup\\footnotesize\\begin{list}{}{\\setlength{\\leftmargin}{2.2em}\\setlength{\\labelwidth}{2em}\\setlength{\\labelsep}{0.3em}\\setlength{\\itemsep}{1pt}\\setlength{\\parsep}{0pt}}') }
    for _, b in ipairs(el.content) do
      local txt = tolatex({ b })
      local n, rest = txt:match('^{%[}(%d+){%]}%s*(.*)$')
      if not n then n, rest = txt:match('^%[(%d+)%]%s*(.*)$') end
      if n then
        table.insert(out, pandoc.RawBlock('latex', '\\item[{[' .. n .. ']}] ' .. rest))
      else
        table.insert(out, pandoc.RawBlock('latex', '\\item[] ' .. txt))
      end
    end
    table.insert(out, pandoc.RawBlock('latex', '\\end{list}\\endgroup'))
    return out
  end
end

function Figure(el)
  local src
  pandoc.walk_block(el, { Image = function(img) src = img.src end })
  local cap = tolatex(el.caption.long)
  local wide = cap:find('%[}?wide{?%]') ~= nil
  cap = cap:gsub('%s*{?%[}?wide{?%]}?', '')
  if wide then
    return pandoc.RawBlock('latex',
      '\\begin{figure*}[!t]\n\\centering\n\\includegraphics[width=0.92\\textwidth]{' .. src .. '}\n\\caption{' .. cap .. '}\n\\end{figure*}')
  end
  return pandoc.RawBlock('latex',
    '\\begin{figure}[!t]\n\\centering\n\\includegraphics[width=\\columnwidth]{' .. src .. '}\n\\caption{' .. cap .. '}\n\\end{figure}')
end

function Table(el)
  local captxt = pandoc.utils.stringify(el.caption.long)
  local wide = captxt:find('%[wide%]') ~= nil
  local nomen = captxt:find('%[nomen%]') ~= nil
  local capblocks = pandoc.walk_block(pandoc.Div(el.caption.long), {
    Str = function(s) if s.text == '[wide]' or s.text == '[nomen]' then return {} end end })
  local cap = tolatex(capblocks.content):gsub('%s+$', '')
  local num, title = cap:match('^(TABLE [IVXL]+)%.%s*(.*)$')

  local ncol = #el.colspecs
  local rows = {}
  local maxlen = {}
  for i = 1, ncol do maxlen[i] = 0 end
  local function addrow(r, isHead)
    local cells = {}
    for i, c in ipairs(r.cells) do
      local t = tolatex(c.contents)
      if isHead then t = '\\textbf{' .. t .. '}' end
      cells[#cells + 1] = t
      local L = #pandoc.utils.stringify(c.contents)
      if not isHead and L > maxlen[i] then maxlen[i] = L end
    end
    rows[#rows + 1] = table.concat(cells, ' & ') .. ' \\\\'
  end
  local head = {}
  for _, r in ipairs(el.head.rows) do addrow(r, true) end
  local nhead = #rows
  for _, b in ipairs(el.bodies) do for _, r in ipairs(b.body) do addrow(r, false) end end

  local thr = wide and 22 or 16
  local spec, anyX = {}, false
  for i, cs in ipairs(el.colspecs) do
    local al = cs[1]
    if maxlen[i] > thr then
      spec[i] = '>{\\raggedright\\arraybackslash}X'; anyX = true
    elseif al == 'AlignRight' then spec[i] = 'r'
    elseif al == 'AlignCenter' then spec[i] = 'c'
    else spec[i] = 'l' end
  end
  if nomen then spec[1] = 'l' end
  local width = wide and '\\textwidth' or '\\columnwidth'
  local body = {}
  if anyX then
    body[#body + 1] = '\\begin{tabularx}{' .. width .. '}{' .. table.concat(spec) .. '}'
  else
    body[#body + 1] = '\\begin{tabular}{' .. table.concat(spec) .. '}'
  end
  body[#body + 1] = '\\toprule'
  for i, r in ipairs(rows) do
    body[#body + 1] = r
    if i == nhead then body[#body + 1] = '\\midrule' end
  end
  body[#body + 1] = '\\bottomrule'
  body[#body + 1] = anyX and '\\end{tabularx}' or '\\end{tabular}'
  local tab = table.concat(body, '\n')

  if nomen then
    return pandoc.RawBlock('latex', '{\\footnotesize\\setlength{\\tabcolsep}{4pt}\\noindent ' .. tab .. '\\par}\\medskip')
  end
  local env = wide and 'table*' or 'table'
  local head_txt = num and ('{\\footnotesize ' .. num .. '\\par\\textsc{' .. title .. '}\\par}\\vspace{4pt}') or ('{\\footnotesize ' .. cap .. '\\par}\\vspace{4pt}')
  return pandoc.RawBlock('latex', '\\begin{' .. env .. '}[!t]\n\\centering\n' .. head_txt ..
    '\n{\\footnotesize\\setlength{\\tabcolsep}{4pt}\\renewcommand{\\arraystretch}{1.12}\n' .. tab .. '\n}\n\\end{' .. env .. '}')
end
