# + ------------------------------------------------------------+
# | Harmonic Mult - Pattern Indicator |
# | Robert Payne |
# | http://funwiththinkscript.com                |
# + ------------------------------------------------------------+
    script LookAhead {
    input x = 0;
    input v = 0;
    def bn = BarNumber();
    def lastbar = HighestAll(if IsNaN(close) then 0 else bn);
    def osR = CompoundValue(1, osR[1] + 2, bn - lastbar);
    def revX = GetValue(x, osR);
    def count = if GetValue(revX, 1) then 1 else count[1] + 1;
    def os1 = GetValue(count, osR);
    plot one = GetValue(v, -os1);
    plot two = GetValue(one, -os1);
    plot three = GetValue(two, -os1);
}
script LookBack {
    input x = 0;
    input v = 0;
    def count = if GetValue(x, 1) then 1 else count[1] + 1;
    plot one = GetValue(v, count);
    plot two = GetValue(one, count);
}
script PRZ {
    input x = 0;
    input a = 0;
    input b = 0;
    input c = 0;
    input cd1 = 0;
    input cd2 = 0;
    input xd1 = 0;
    input xd2 = 0;
    input abcd1 = 0;
    input abcd2 = 0;
    def XArng = (a - x);
    def ABrng = (a - b);
    def BCrng = (c - b);
    def ex1 = c - (BCrng * cd1);
    def ex2 = c - (BCrng * cd2);
    def ex3 = c - (ABrng * abcd1);
    def ex4 = c - (ABrng * abcd2);
    def z = a - (XArng * xd2);
    def t1 = if AbsValue(a - ex1) > AbsValue(a - z) then ex2 else ex1;
    def t2 = if AbsValue(a - ex2) > AbsValue(a - z) then ex1 else ex2;
    def t3 = if AbsValue(a - ex3) > AbsValue(a - z) then ex4 else ex3;
    def t4 = if AbsValue(a - ex4) > AbsValue(a - z) then ex3 else ex4;
    def diff1 = AbsValue(t1 - z);
    def diff2 = AbsValue(t2 - z);
    def diff3 = AbsValue(t3 - z);
    def diff4 = AbsValue(t4 - z);
    def prz1 = if diff1 < diff2 then t1 else t2;
    def prz2 = if diff3 < diff4 then t3 else t4;
    plot omega = z;
    def prz3 = Max(Max(prz1, prz2), omega);
    def prz4 = Min(Min(prz1, prz2), omega);
    plot max = prz4 + (prz3 - prz4) * 1.009;
    plot min = prz3 - (prz3 - prz4) * 1.009;
}
input length = 13;
def bn = BarNumber();
def lastBar = HighestAll(if IsNaN(close) then 0 else bn);
def os1 = Min(length - 1, lastBar - bn);
def _high = Highest(high, length);
def _low = Lowest(low, length);
def ph = high == _high and high == GetValue(_high, -os1);
def pl = low == _low and low == GetValue(_low, -os1);
def cph = if ph[1] then 1 else cph[1] + 1;
def cpl = if pl[1] then 1 else cpl[1] + 1;
def ph1 = (ph and!pl and cph >= length) or(ph and pl and cph >= cpl) or(ph and bn <= length);
def pl1 = (pl and!ph and cpl >= length) or(pl and ph and cpl >= cph) or(pl and bn <= length);
def cph1 = if ph1[1] then 1 else cph1[1] + 1;
def cpl1 = if pl1[1] then 1 else cpl1[1] + 1;
def sh = if pl1[1] then high else if high > sh[1] and!pl1 then high else sh[1];
def shb = if ph1 or sh <> sh[1] then bn else shb[1];
def sl = if ph1[1] then low else if low < sl[1] and!ph1 then low else sl[1];
def slb = if pl1 or sl <> sl[1] then bn else slb[1];
def h1 = if ph1 then high else if pl1 and cph1 > cpl1 then sh else h1[1];
def h2 = if h1 <> h1[1] then h1[1] else h2[1];
def h3 = if h1 <> h1[1] then h2[1] else h3[1];
def l1 = if pl1 then low else if ph1 and cpl1 > cph1 then sl else l1[1];
def l2 = if l1 <> l1[1] then l1[1] else l2[1];
def l3 = if l1 <> l1[1] then l1[1] else l3[1];
def sl1 = if bn == lookahead(ph1, slb) and cph1 < cpl1 then 1 else Double.NaN;
def sh1 = if bn == lookahead(pl1, shb) and cpl1 < cph1 then 1 else Double.NaN;
def crest = ph1 or!IsNaN(sh1);
def trough = pl1 or!IsNaN(sl1);
def wh1 = if crest then high else wh1[1];
def wh2 = if crest then wh1[1] else wh2[1];
def wh3 = if crest then wh2[1] else wh3[1];
def wl1 = if trough then low else wl1[1];
def wl2 = if trough then wl1[1] else wl2[1];
def wl3 = if trough then wl2[1] else wl3[1];
def bl_XAB = Round(AbsValue((wl1 - wh2) / (wh2 - wl2)), 2);
def bl_ABC = Round(AbsValue((wh1 - wl1) / (wl1 - wh2)), 2);
def bl_XAD = if IsNaN(lookahead(trough, low)) then 0 else Round(AbsValue((lookahead(trough, low) - wh2) / (wh2 - wl2)), 2);
def br_XAB = Round(AbsValue((wh1 - wl2) / (wl2 - wh2)), 2);
def br_ABC = Round(AbsValue((wl1 - wh1) / (wh1 - wl2)), 2);
def br_XAD = if IsNaN(lookahead(crest, high)) then 0 else Round(AbsValue((lookahead(crest, high) - wl2) / (wl2 - wh2)), 2);
def bl_Crab = Between(bl_XAB, 0.35, 0.75) and Between(bl_ABC, 0.35, 0.92) and Between(bl_XAD, 1.16, 1.97);
def bl_aBat = !bl_Crab and Between(bl_XAB, 0.35, 0.41) and Between(bl_ABC, 0.35, 0.92) and Between(bl_XAD, 0.97, 1.16);
def bl_xBat = !bl_Crab and!bl_aBat and Between(bl_XAB, 0.35, 0.65) and Between(bl_ABC, 0.35, 0.92) and bl_XAD >= 0.82;
def bl_Gart = !bl_Crab and!bl_xBat and Between(bl_XAB, 0.59, 0.65) and Between(bl_ABC, 0.35, 0.92);
def bl_Bat = (!bl_Crab and!bl_aBat and Between(bl_XAB, 0.35, 0.58) and Between(bl_ABC, 0.35, 0.92)) or bl_xBat;
def bl_Bfly = Between(bl_XAB, 0.76, 0.85) and Between(bl_ABC, 0.35, 0.92);
def bl_dCrb = Between(bl_XAB, 0.86, 0.92) and Between(bl_ABC, 0.35, 0.41);
def br_Crab = Between(br_XAB, 0.35, 0.75) and Between(br_ABC, 0.35, 0.92) and Between(br_XAD, 1.16, 1.97);
def br_aBat = !br_Crab and Between(br_XAB, 0.35, 0.41) and Between(br_ABC, 0.35, 0.92) and Between(br_XAD, 0.97, 1.16);
def br_xBat = !br_Crab and!br_aBat and Between(br_XAB, 0.35, 0.65) and Between(br_ABC, 0.35, 0.92) and br_XAD >= 0.82;
def br_Gart = !br_Crab and!br_xBat and Between(br_XAB, 0.59, 0.65) and Between(br_ABC, 0.35, 0.92);
def br_Bat = (!br_Crab and!br_aBat and Between(br_XAB, 0.35, 0.58) and Between(br_ABC, 0.35, 0.92)) or br_xBat;
def br_Bfly = Between(br_XAB, 0.76, 0.85) and Between(br_ABC, 0.35, 0.92);
def br_dCrb = Between(br_XAB, 0.86, 0.92) and Between(br_ABC, 0.35, 0.41);
def bull = bl_Bat or bl_aBat or bl_Gart or bl_Bfly or bl_Crab or bl_dCrb;
def bear = br_Bat or br_aBat or br_Gart or br_Bfly or br_Crab or br_dCrb;
def blPRZmax;
def blPRZmin;
def blOmega;
if bn == 1 {
    blPRZmax = Double.NaN;
    blPRZmin = Double.NaN;
    blOmega = Double.NaN;
} else if crest and bl_aBat {
    blPRZmax = PRZ(wl2, wh2, wl1, wh1, 2, 3.618, 1.13, 1.13, 1.618, 1.618).max;
    blPRZmin = PRZ(wl2, wh2, wl1, wh1, 2, 3.618, 1.13, 1.13, 1.618, 1.618).min;
    blOmega = PRZ(wl2, wh2, wl1, wh1, 2, 3.618, 1.13, 1.13, 1.618, 1.618).omega;
} else if crest and bl_Bat {
    blPRZmax = PRZ(wl2, wh2, wl1, wh1, 1.618, 2.618, 0.886, 0.886, 1, 1.27).max;
    blPRZmin = PRZ(wl2, wh2, wl1, wh1, 1.618, 2.618, 0.886, 0.886, 1, 1.27).min;
    blOmega = PRZ(wl2, wh2, wl1, wh1, 1.618, 2.618, 0.886, 0.886, 1, 1.27).omega;
} else if crest and bl_Bfly {
    blPRZmax = PRZ(wl2, wh2, wl1, wh1, 1.618, 2.24, 1.27, 1.27, 1, 1.27).max;
    blPRZmin = PRZ(wl2, wh2, wl1, wh1, 1.618, 2.24, 1.27, 1.27, 1, 1.27).min;
    blOmega = PRZ(wl2, wh2, wl1, wh1, 1.618, 2.24, 1.27, 1.27, 1, 1.27).omega;
} else if crest and bl_Crab {
    blPRZmax = PRZ(wl2, wh2, wl1, wh1, 2.618, 3.618, 1.618, 1.618, 1.27, 1.68).max;
    blPRZmin = PRZ(wl2, wh2, wl1, wh1, 2.618, 3.618, 1.618, 1.618, 1.27, 1.68).min;
    blOmega = PRZ(wl2, wh2, wl1, wh1, 2.618, 3.618, 1.618, 1.618, 1.27, 1.68).omega;
} else if crest and bl_Gart {
    blPRZmax = PRZ(wl2, wh2, wl1, wh1, 1.13, 1.618, 0.786, 0.786, 1, 1).max;
    blPRZmin = PRZ(wl2, wh2, wl1, wh1, 1.13, 1.618, 0.786, 0.786, 1, 1).min;
    blOmega = PRZ(wl2, wh2, wl1, wh1, 1.13, 1.618, 0.786, 0.786, 1, 1).omega;
} else if crest and bl_dCrb {
    blPRZmax = PRZ(wl2, wh2, wl1, wh1, 2, 3.618, 1.618, 1.618, 1, 1.27).max;
    blPRZmin = PRZ(wl2, wh2, wl1, wh1, 2, 3.618, 1.618, 1.618, 1, 1.27).min;
    blOmega = PRZ(wl2, wh2, wl1, wh1, 2, 3.618, 1.618, 1.618, 1, 1.27).omega;
} else {
    blPRZmax = blPRZmax[1];
    blPRZmin = blPRZmin[1];
    blOmega = blOmega[1];
}
def brPRZmax;
def brPRZmin;
def brOmega;
if bn == 1 {
    brPRZmax = Double.NaN;
    brPRZmin = Double.NaN;
    brOmega = Double.NaN;
} else if trough and br_aBat {
    brPRZmax = PRZ(wh2, wl2, wh1, wl1, 2, 3.618, 1.13, 1.13, 1.618, 1.618).max;
    brPRZmin = PRZ(wh2, wl2, wh1, wl1, 2, 3.618, 1.13, 1.13, 1.618, 1.618).min;
    brOmega = PRZ(wh2, wl2, wh1, wl1, 2, 3.618, 1.13, 1.13, 1.618, 1.618).omega;
} else if trough and br_Bat {
    brPRZmax = PRZ(wh2, wl2, wh1, wl1, 1.618, 2.618, 0.886, 0.886, 1, 1.27).max;
    brPRZmin = PRZ(wh2, wl2, wh1, wl1, 1.618, 2.618, 0.886, 0.886, 1, 1.27).min;
    brOmega = PRZ(wh2, wl2, wh1, wl1, 1.618, 2.618, 0.886, 0.886, 1, 1.27).omega;
} else if trough and br_Bfly {
    brPRZmax = PRZ(wh2, wl2, wh1, wl1, 1.618, 2.24, 1.27, 1.27, 1, 1.27).max;
    brPRZmin = PRZ(wh2, wl2, wh1, wl1, 1.618, 2.24, 1.27, 1.27, 1, 1.27).min;
    brOmega = PRZ(wh2, wl2, wh1, wl1, 1.618, 2.24, 1.27, 1.27, 1, 1.27).omega;
} else if trough and br_Crab {
    brPRZmax = PRZ(wh2, wl2, wh1, wl1, 2.618, 3.618, 1.618, 1.618, 1.27, 1.68).max;
    brPRZmin = PRZ(wh2, wl2, wh1, wl1, 2.618, 3.618, 1.618, 1.618, 1.27, 1.68).min;
    brOmega = PRZ(wh2, wl2, wh1, wl1, 2.618, 3.618, 1.618, 1.618, 1.27, 1.68).omega;
} else if trough and br_Gart {
    brPRZmax = PRZ(wh2, wl2, wh1, wl1, 1.13, 1.618, 0.786, 0.786, 1, 1).max;
    brPRZmin = PRZ(wh2, wl2, wh1, wl1, 1.13, 1.618, 0.786, 0.786, 1, 1).min;
    brOmega = PRZ(wh2, wl2, wh1, wl1, 1.13, 1.618, 0.786, 0.786, 1, 1).omega;
} else if trough and br_dCrb {
    brPRZmax = PRZ(wh2, wl2, wh1, wl1, 2, 3.618, 1.618, 1.618, 1, 1.27).max;
    brPRZmin = PRZ(wh2, wl2, wh1, wl1, 2, 3.618, 1.618, 1.618, 1, 1.27).min;
    brOmega = PRZ(wh2, wl2, wh1, wl1, 2, 3.618, 1.618, 1.618, 1, 1.27).omega;
} else {
    brPRZmax = brPRZmax[1];
    brPRZmin = brPRZmin[1];
    brOmega = brOmega[1];
}
def bullRev = if IsNaN(blPRZmax) then 0 else if (crest and high < blPRZmin) or crest[1] then 0 else if low crosses above blPRZmax then 1 else bullRev[1];
def bearRev = if IsNaN(brPRZmin) then 0 else if (trough and low > brPRZmax) or trough[1] then 0 else if high crosses below brPRZmin then 1 else bearRev[1];
def blX_ = (trough and lookahead(crest, bull).two) and(if IsNaN(lookahead(crest, bullRev).three) then 1 else lookahead(crest, bullRev).three);
def brX_ = (crest and lookahead(trough, bear).two) and(if IsNaN(lookahead(trough, bearRev).three) then 1 else lookahead(trough, bearRev).three);
def blx = if IsNaN(blX_) then 0 else blX_;
def brx = if IsNaN(brX_) then 0 else brX_;
def blc = CompoundValue(1, if blx then 1 else if blc[1] == 7 then Double.NaN else if crest[1] or trough[1] then blc[1] + 1 else blc[1], Double.NaN);
def brc = CompoundValue(1, if brx then 1 else if brc[1] == 7 then Double.NaN else if crest[1] or trough[1] then brc[1] + 1 else brc[1], Double.NaN);
DefineGlobalColor("Bullish Outline", CreateColor(110, 175, 96));
DefineGlobalColor("Bullish Fill", CreateColor(162, 211, 152));
DefineGlobalColor("Bearish Outline", CreateColor(209, 119, 128));
DefineGlobalColor("Bearish Fill", CreateColor(247, 179, 185));
DefineGlobalColor("Bullish PRZ", CreateColor(77, 136, 128));
DefineGlobalColor("Bullish PRZ Fill", CreateColor(115, 161, 155));
DefineGlobalColor("Bearish PRZ", CreateColor(121, 86, 145));
DefineGlobalColor("Bearish PRZ Fill", CreateColor(153, 126, 172));
def mWave = if crest then(lookahead(trough, low) - high) / (lookahead(trough, bn) - bn) else if trough then(lookahead(crest, high) - low) / (lookahead(crest, bn) - bn) else mWave[1];
def mTop = if crest then(lookahead(crest, high) - high) / (lookahead(crest, bn) - bn) else mTop[1];
def mBot = if trough then(lookahead(trough, low) - low) / (lookahead(trough, bn) - bn) else mBot[1];
def midLine = if crest then high else if trough then low else midLine[1] + mWave;
plot bullWave = if IsNaN(blc) then Double.NaN else if Between(blc, 1, 5) then midLine else Double.NaN;
bullWave.SetDefaultColor(Color.UPTICK);
bullWave.AssignValueColor(GlobalColor("Bullish Outline"));
plot bearWave = if IsNaN(brc) then Double.NaN else if Between(brc, 1, 5) then midLine else Double.NaN;
bearWave.SetDefaultColor(Color.DOWNTICK);
bearWave.AssignValueColor(GlobalColor("Bearish Outline"));
def wTop = if crest then high else wTop[1] + mTop;
def wBot = if trough then low else wBot[1] + mBot;
plot waveTop = if IsNaN(brc) then Double.NaN else if Between(brc, 1, 5) then wTop else Double.NaN;
waveTop.SetDefaultColor(Color.DOWNTICK);
waveTop.AssignValueColor(GlobalColor("Bearish Outline"));
plot waveBot = if IsNaN(blc) then Double.NaN else if Between(blc, 1, 5) then wBot else Double.NaN;
waveBot.SetDefaultColor(Color.UPTICK);
waveBot.AssignValueColor(GlobalColor("Bullish Outline"));
AddCloud(bullWave, waveBot, GlobalColor("Bullish Fill"));
AddCloud(waveTop, bearWave, GlobalColor("Bearish Fill"));
plot bullPRZmax = if Between(blc, 5, 6) then blPRZmax else Double.NaN;
bullPRZmax.SetDefaultColor(Color.LIGHT_GREEN);
bullPRZmax.AssignValueColor(GlobalColor("Bullish PRZ"));
bullPRZmax.SetPaintingStrategy(12);
plot bullPRZmin = if Between(blc, 5, 6) then blPRZmin else Double.NaN;
bullPRZmin.SetDefaultColor(Color.LIGHT_GREEN);
bullPRZmin.AssignValueColor(GlobalColor("Bullish PRZ"));
bullPRZmin.SetPaintingStrategy(12);
plot bearPRZmax = if Between(brc, 5, 6) then brPRZmax else Double.NaN;
bearPRZmax.SetDefaultColor(Color.PINK);
bearPRZmax.AssignValueColor(GlobalColor("Bearish PRZ"));
bearPRZmax.SetPaintingStrategy(12);
plot bearPRZmin = if Between(brc, 5, 6) then brPRZmin else Double.NaN;
bearPRZmin.SetDefaultColor(Color.PINK);
bearPRZmin.AssignValueColor(GlobalColor("Bearish PRZ"));
bearPRZmin.SetPaintingStrategy(12);
AddCloud(bullPRZmax, bullPRZmin, GlobalColor("Bullish PRZ Fill"));
AddCloud(bearPRZmax, bearPRZmin, GlobalColor("Bearish PRZ Fill"));
input labelPatterns = yes;
input labelPoints = no;
AddChartBubble(labelPoints and blc == 2 and crest, high, "A", GlobalColor("Bullish Fill"));
AddChartBubble(labelPoints and blc == 3 and trough, low, "B", GlobalColor("Bullish Fill"), 0);
AddChartBubble(labelPoints and blc == 4 and crest, high, "C", GlobalColor("Bullish Fill"));
AddChartBubble(labelPoints and blc == 5 and trough, low, "D", GlobalColor("Bullish Fill"), 0);
AddChartBubble(labelPoints and brc == 2 and trough, low, "A", GlobalColor("Bearish Fill"), 0);
AddChartBubble(labelPoints and brc == 3 and crest, high, "B", GlobalColor("Bearish Fill"));
AddChartBubble(labelPoints and brc == 4 and trough, low, "C", GlobalColor("Bearish Fill"), 0);
AddChartBubble(labelPoints and brc == 5 and crest, high, "D", GlobalColor("Bearish Fill"));
AddChartBubble(labelPatterns and blc == 1, low, 
if lookahead(crest, bl_aBat).two then "alt Bat" else
if lookahead(crest, bl_Bat).two then "Bat" else
if lookahead(crest, bl_Bfly).two then "Butterfly" else
if lookahead(crest, bl_Crab).two then "Crab" else
if lookahead(crest, bl_dCrb).two then "Deep Crab" else
if lookahead(crest, bl_Gart).two then "Gartley" else ""
    , GlobalColor("Bullish Fill"), 0);
AddChartBubble(labelPatterns and brc == 1, high, 
if lookahead(trough, br_aBat).two then "alt Bat" else
if lookahead(trough, br_Bat).two then "Bat" else
if lookahead(trough, br_Bfly).two then "Butterfly" else
if lookahead(trough, br_Crab).two then "Crab" else
if lookahead(trough, br_dCrb).two then "Deep Crab" else
if lookahead(trough, br_Gart).two then "Gartley" else ""
    , GlobalColor("Bearish Fill"));
def blEnd_ = (trough and blc[1] == 5) or(bn == lastBar) or(blc == 5 and Between(blOmega, low, high));
def brEnd_ = (crest and brc[1] == 5) or(bn == lastBar) or(brc == 5 and Between(brOmega, low, high));
def blEnd = if IsNaN(blEnd_) then 0 else blEnd_;
def brEnd = if IsNaN(brEnd_) then 0 else brEnd_;
def lx1 = lookahead(blEnd, bn);
def lx2 = if crest and blc == 4 and bn == lastBar then bn + 1 else lookahead(blEnd, bn);
def lpm1 = if trough and blc == 3 then(lookahead(crest, blOmega) - low) / (lx1 - bn) else lpm1[1];
def lpm2 = if crest and blc == 4 then(blOmega - high) / (lx2 - bn) else lpm2[1];
def lp1l = if trough and blc == 3 then low else lp1l[1] + lpm1;
def lp2l = if crest and blc == 4 then high else lp2l[1] + lpm2;
def lp1 = if trough and blc == 3 then 1 else if blEnd[1] then 0 else lp1[1];
def lp2 = if crest and blc == 4 then 1 else if blEnd[1] then 0 else lp2[1];
plot bullProj1 = if lp1 then lp1l else Double.NaN;
bullProj1.SetDefaultColor(Color.LIGHT_GREEN);
bullProj1.AssignValueColor(GlobalColor("Bullish Outline"));
bullProj1.SetStyle(Curve.SHORT_DASH);
bullProj1.SetLineWeight(2);
plot bullProj2 = if lp2 then lp2l else Double.NaN;
bullProj2.SetDefaultColor(Color.LIGHT_GREEN);
bullProj2.AssignValueColor(GlobalColor("Bullish Outline"));
bullProj2.SetStyle(Curve.SHORT_DASH);
bullProj2.SetLineWeight(2);
def rx1 = lookahead(brEnd, bn);
def rx2 = if trough and brc == 4 and bn == lastBar then bn + 1 else lookahead(brEnd, bn);
def rpm1 = if crest and brc == 3 then(lookahead(trough, brOmega) - high) / (rx1 - bn) else rpm1[1];
def rpm2 = if trough and brc == 4 then(brOmega - low) / (rx2 - bn) else rpm2[1];
def rp1l = if crest  and brc == 3 then high else rp1l[1] + rpm1;
def rp2l = if trough and brc == 4 then low else rp2l[1] + rpm2;
def rp1 = if crest  and brc == 3 then 1 else if brEnd[1] then 0 else rp1[1];
def rp2 = if trough and brc == 4 then 1 else if brEnd[1] then 0 else rp2[1];
plot bearProj1 = if rp1 then rp1l else Double.NaN;
bearProj1.SetDefaultColor(Color.PINK);
bearProj1.AssignValueColor(GlobalColor("Bearish Outline"));
bearProj1.SetStyle(Curve.SHORT_DASH);
bearProj1.SetLineWeight(2);
plot bearProj2 = if rp2 then rp2l else Double.NaN;
bearProj2.SetDefaultColor(Color.PINK);
bearProj2.AssignValueColor(GlobalColor("Bearish Outline"));
bearProj2.SetStyle(Curve.SHORT_DASH);
bearProj2.SetLineWeight(2);
input showTargets = yes;
input Target1 = 0.386;
input Target2 = 0.618;
input Target3 = 1.000;
def uts_ = trough and low < bullPRZmax;
def uts = if IsNaN(uts_) then 0 else uts_;
def utl = if uts then(bn - lookback(trough, bn).two) * 1.68 else utl[1];
def utc = CompoundValue(1, if uts then 1 else utc[1] + 1, Double.NaN);
def urng = wh1 - wl1;
def ut1 = if uts then low + (urng * Target1) else ut1[1];
def ut2 = if uts then low + (urng * Target2) else ut2[1];
def ut3 = if uts then low + (urng * Target3) else ut3[1];
plot bullT1 = if showTargets and Between(utc, 2, utl) then ut1 else Double.NaN;
bullT1.SetDefaultColor(Color.LIGHT_GREEN);
bullT1.AssignValueColor(GlobalColor("Bullish PRZ"));
bullT1.SetLineWeight(3);
bullT1.SetPaintingStrategy(12);
plot bullT2 = if showTargets and Between(utc, 2, utl) then ut2 else Double.NaN;
bullT2.SetDefaultColor(Color.LIGHT_GREEN);
bullT2.AssignValueColor(GlobalColor("Bullish PRZ"));
bullT2.SetLineWeight(2);
bullT2.SetPaintingStrategy(12);
plot bullT3 = if showTargets and Between(utc, 2, utl) then ut3 else Double.NaN;
bullT3.SetDefaultColor(Color.LIGHT_GREEN);
bullT3.AssignValueColor(GlobalColor("Bullish PRZ"));
bullT3.SetPaintingStrategy(12);
def dts_ = crest and high > bearPRZmin;
def dts = if IsNaN(dts_) then 0 else dts_;
def dtl = if dts then(bn - lookback(crest, bn).two) * 1.618 else dtl[1];
def dtc = CompoundValue(1, if dts then 1 else dtc[1] + 1, Double.NaN);
def drng = wh1 - wl1;
def dt1 = if dts then high - (drng * Target1) else dt1[1];
def dt2 = if dts then high - (drng * Target2) else dt2[1];
def dt3 = if dts then high - (drng * Target3) else dt3[1];
plot bearT1 = if showTargets and Between(dtc, 2, dtl) then dt1 else Double.NaN;
bearT1.SetDefaultColor(Color.PINK);
bearT1.AssignValueColor(GlobalColor("Bearish PRZ"));
bearT1.SetLineWeight(3);
bearT1.SetPaintingStrategy(12);
plot bearT2 = if showTargets and Between(dtc, 2, dtl) then dt2 else Double.NaN;
bearT2.SetDefaultColor(Color.PINK);
bearT2.AssignValueColor(GlobalColor("Bearish PRZ"));
bearT2.SetLineWeight(2);
bearT2.SetPaintingStrategy(12);
plot bearT3 = if showTargets and Between(dtc, 2, dtl) then dt3 else Double.NaN;
bearT3.SetDefaultColor(Color.PINK);
bearT3.AssignValueColor(GlobalColor("Bearish PRZ"));
bearT3.SetPaintingStrategy(12);
input showTargetLabels = no;
AddChartBubble(showTargetLabels and uts, ut1, Round(Target1 * 100, 1) + "%", GlobalColor("Bullish PRZ Fill"));
AddChartBubble(showTargetLabels and uts, ut2, Round(Target2 * 100, 1) + "%", GlobalColor("Bullish PRZ Fill"));
AddChartBubble(showTargetLabels and uts, ut3, Round(Target3 * 100, 1) + "%", GlobalColor("Bullish PRZ Fill"));
AddChartBubble(showTargetLabels and dts, dt1, Round(Target1 * 100, 1) + "%", GlobalColor("Bearish PRZ Fill"), 0);
AddChartBubble(showTargetLabels and dts, dt2, Round(Target2 * 100, 1) + "%", GlobalColor("Bearish PRZ Fill"), 0);
AddChartBubble(showTargetLabels and dts, dt3, Round(Target3 * 100, 1) + "%", GlobalColor("Bearish PRZ Fill"), 0);
