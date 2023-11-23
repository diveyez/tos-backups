#// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
#// © nsadeghi
# https://www.tradingview.com/v/Xeeko6TV/
#indicator("Support Resistance with Breaks and Retests",
# Converted and mod by Sam4Cok@Samer800 - 03 / 2023

input lookback = 20;              # 'Lookback Range''How many bars for a pivot event to occur.'
input BarsSinceBreakout = 2;      # 'Bars Since Breakout''How many bars since breakout in order to detect a retest.'
input RetestDetectionLimiter = 2; # 'Retest Detection Limiter'
input breakoutBubbles = yes;   # 'Breakouts'
input retestWedges = yes;   # 'Retests'
input repType = { default "On", "Candle Confirmation", "High & Low"};    # 'Repainting'

def na = Double.NaN;
def retest = retestWedges;
def Breakout = breakoutBubbles;
def retSince = BarsSinceBreakout;
def retValid = RetestDetectionLimiter;
def bb = lookback;
def rTon = repType == repType."On";
def rTcc = repType == repType."Candle Confirmation";
def rThv = repType == repType."High & Low";

def srcHi; def srcLo;

if rTon {
    srcHi = close;
    srcLo = close;
} else
    if rTcc {
        srcHi = close[1];
        srcLo = close[1];
    } else
        if rThv {
            srcHi = high;
            srcLo = low;
        } else {
            srcHi = srcHi[1];
            srcLo = srcLo[1];
        }
#----Colors
DefineGlobalColor("green", CreateColor(8, 153, 129));
DefineGlobalColor("red", Color.PINK); #CreateColor(255, 82, 82));
#// Pivot Instance

script fixnan {
    input source = close;
    def fix = if !IsNaN(source) then source else fix[1];
    plot result = fix;
}
#barssince(Condition) =>
script barssince {
input Condition = 0;
def barssince = if Condition then 1 else barssince[1] + 1;
plot return = barssince;
}
#valuewhen(cond, source, occurrence) =>
script valuewhen {
    input cond = 0;
    input source = 0;
    def offset = fold j = 0 to 200 with p while p < 2 do
        p + ( if p == 1 then j - 2 else if GetValue(cond, j) then 1 else 0 );
    plot price = GetValue(source, offset - 1);
}
script FindPivots {
    input dat = close; # default data or study being evaluated
    input HL = 0;    # default high or low pivot designation, -1 low, +1 high
    input lbL = 5;    # default Pivot Lookback Left
    input lbR = 1;    # default Pivot Lookback Right
    ##############
    def _nan;    # used for non - number returns
    def _BN;     # the current barnumber
    def _VStop;  # confirms that the lookforward period continues the pivot trend
    def _V;      # the Value at the actual pivot point
    ##############
    _BN = BarNumber();
    _nan = Double.NaN;
    _VStop = if !IsNaN(dat) and lbR > 0 and lbL > 0 then
                fold a = 1 to lbR + 1 with b = 1 while b do
        if HL > 0 then dat > GetValue(dat, -a) else dat < GetValue(dat, -a) else _nan;
    if (HL > 0) {
        _V = if _BN > lbL and dat == Highest(dat, lbL + 1) and _VStop
            then dat else _nan;
    } else {
        _V = if _BN > lbL and dat == Lowest(dat, lbL + 1) and _VStop
            then dat else _nan;
    }
    plot result = if !IsNaN(_V) and _VStop then _V else _nan;
}
def pl_1 = fixnan(FindPivots(low, -1, bb, bb));
def ph_1 = fixnan(FindPivots(high, 1, bb, bb));
def hh = if high == highest(high, bb) then high else hh[1];
def ll = if low == lowest(low, bb) then low else ll[1];
def ph = if ph_1 == 0 then hh else ph_1;
def pl = if pl_1 == 0 then ll else pl_1;

#// Box Height
def s_yLoc = if low[1] > low[-1]  then low[-1] else low[1];
def r_yLoc = if high[1] > high[-1] then high[1] else high[-1];
#// Functions
#drawBox(condition, y1, y2, color) =>
script drawBox {
    input condition = yes;
    input y1 = high;
    input y2 = low;
    def boxHi = if condition then y1 else boxHi[1];
    def boxLo = if condition then y2 else boxLo[1];
    plot ph = if !IsNaN(close[5]) and!IsNaN(close) then boxHi else Double.NaN;
    plot pl = if !IsNaN(close[5]) and!IsNaN(close) then boxLo else Double.NaN;
}
#repaint(c1, c2, c3) =>
script repaint {
    input type = "On";
    input c1 = no;
    input c2 = no;
    input c3 = no;
    def rTon = type == "On";
    def rTcc = type == "Candle Confirmation";
    def rThv = type == "High & Low";
    def repaint = if rTon then c1 else if rThv then c2 else if rTcc then c3 else repaint[1];
    plot out = repaint;
}
#retestCondition(breakout, condition) =>
Script retestCondition {
input breakout = no;
input condition = no;
input retSince = 2;
    def retestCondition = barssince(!breakout) > retSince and condition;
    plot out = retestCondition;
}
#// Draw and Update Boxes
def sBoxH = drawBox((pl != pl[1]), s_yLoc, pl).ph;
def sBoxL = drawBox((pl != pl[1]), s_yLoc, pl).pl;
def rBoxH = drawBox((ph != ph[1]), ph, r_yLoc).ph;
def rBoxL = drawBox((ph != ph[1]), ph, r_yLoc).pl;

def sTop = sBoxH;
def sBot = sBoxL;
def rTop = rBoxH;
def rBot = rBoxL;

#// Breakout Event
def sBreak;
def rBreak;
def sLabel;
def rLabel;

def c1 = if close < sBoxL then c1[1] + 1 else 0;
def c2 = if low < sBoxL then c2[1] + 1 else 0;
def c3 = if close[1] < sBoxL[1] then c3[1] + 1 else 0;
def d1 = if close > rBoxH then d1[1] + 1 else 0;
def d2 = if high > rBoxH then d2[1] + 1 else 0;
def d3 = if close[1] > rBoxH[1] then d3[1] + 1 else 0;

def cu = repaint(repType, c1 == 1, c2 == 1, c3 == 1);
def co = repaint(repType, d1 == 1, d2 == 1, d3 == 1);

def sBreak1; def rBreak1;def sBreak11; def rBreak11;
if (pl - pl[1]) {
    sBreak1 =  if !sBreak[1] then no else sBreak[1];
    rBreak1 = rBreak[1];
} else
    if (ph - ph[1]) {
        sBreak1 = sBreak[1];
        rBreak1 = if !rBreak[1] then no else sBreak[1];
    } else {
        sBreak1 = yes; #sBreak[1];
        rBreak1 = yes; #rBreak[1];
    }
if cu and!sBreak1 {
    sBreak = yes;
    rBreak = rBreak1;
} else
if co and!rBreak1 {
    sBreak = sBreak1;
    rBreak = yes;
} else {
    sBreak = sBreak1;
    rBreak = rBreak1;
}
if (pl - pl[1]) {
    sBreak11 = if !sBreak11[1] then 0 else sBreak;
    rBreak11 = rBreak11[1];
} else
    if (ph - ph[1]) {
        sBreak11 = sBreak11[1];
        rBreak11 = if !rBreak11[1] then 0 else sBreak;
    } else {
        sBreak11 = sBreak11[1];
        rBreak11 = rBreak11[1];
    }
if cu and!sBreak11 {
    sLabel = if breakout then sBoxL else na;
    rLabel = na;
} else
if co and!rBreak11 {
    sLabel = na;
    rLabel = if breakout then rBoxH else na;
} else {
    sLabel = na;
    rLabel = na;
}
def changePh = srcHi > highest(srcHi[1], bb);
def changePl = srcLo < lowest(srcLo[1], bb);


AddChartBubble(changePl and!isNaN(sLabel), sLabel, "break", Color.RED, yes);
AddChartBubble(changePh and!isNaN(rLabel), rLabel, "break", Color.GREEN, no);

#// Retest Event
def s1_ = retestCondition(sBreak, high >= sTop and close <= sBot, retSince);
def s2_ = retestCondition(sBreak, high >= sTop and close >= sBot and close <= sTop, retSince);
def s3_ = retestCondition(sBreak, high >= sBot and high <= sTop, retSince);
def s4_ = retestCondition(sBreak, high >= sBot and high <= sTop and close < sBot, retSince);
def r1_ = retestCondition(rBreak, low <= rBot and close >= rTop, retSince);
def r2_ = retestCondition(rBreak, low <= rBot and close <= rTop and close >= rBot, retSince);
def r3_ = retestCondition(rBreak, low <= rTop and low >= rBot, retSince);
def r4_ = retestCondition(rBreak, low <= rTop and low >= rBot and close > rTop, retSince);

def s1 = s1_;
def s2 = s2_;
def s3 = s3_;
def s4 = s4_;
def r1 = r1_;
def r2 = r2_;
def r3 = r3_;
def r4 = r4_;

#retestEvent(c1, c2, c3, c4, y1, y2, col, style, pType) =>
Script retestEvent {
input c1 = 1;
input c2 = 1;
input c3 = 1;
input c4 = 1;
input y1 = high;
input y2 = low;
input pType = 1;
input input_retValid = 2;
input ph = high;
input pl = low;
input repType = "On";
     def retOccurred; def retEvent;
     def retActive = c1 or c2 or c3 or c4;
     def retEvent1 = retActive and!retActive[1];
     def retEventVal = if retEvent1 then y2 else retEventVal[1];
    if (if pType == 1 then y2 < retEventVal else y2 > retEventVal) {
        retEvent = retActive;
    } else {
        retEvent = retEvent1;
    }
#    def retValue = valuewhen(retEvent, y1);
    def retValue = if retEvent then y1 else retValue[1];
    def retSince = barssince(retEvent);
    def hc1 = close >= retValue;
    def hc2 = high >= retValue;
    def hc3 = close[1] >= retValue[1];
    def lc1 = close <= retValue;
    def lc2 = high <= retValue;
    def lc3 = close[1] <= retValue[1];
    def rTon = repType == "On";
    def rTcc = repType == "Candle Confirmation";
    def rThv = repType == "High & Low";
    def reph = if rTon then hc1 else if rThv then hc2 else if rTcc then hc3 else reph[1];
    def repl = if rTon then lc1 else if rThv then lc2 else if rTcc then lc3 else repl[1];
    def Potential = if retEvent then y2 else 0;
    def retConditions = if pType == 1 then reph else repl;
    def retValid = retSince > 0 and retSince <= input_retValid and retConditions and!retOccurred[1];
    retOccurred = if retEvent then no else
    if retValid then yes else
    if pType == 1  and(ph != ph[1]) and retOccurred[1] then no else
    if pType == -1 and(pl != pl[1]) and retOccurred[1] then no else retOccurred[1];
    def retest = if retValid then y2 else 0;
    def labelCount;
    if retEvent {
        labelCount = 0;
    } else {
        labelCount = labelCount[1] + 1;
    }
    plot retVal = retest;
    plot retPot = Potential;
    plot count = labelCount;
}
def retH_ = retestEvent(r1, r2, r3, r4, high, low, 1, retValid, ph, pl, repType).retVal;
def PotH_ = retestEvent(r1, r2, r3, r4, high, low, 1, retValid, ph, pl, repType).retPot;
def cntH_ = retestEvent(r1, r2, r3, r4, high, low, 1, retValid, ph, pl, repType).count;
def retL_ = retestEvent(s1, s2, s3, s4, low, high, -1, retValid, ph, pl, repType).retVal;
def PotL_ = retestEvent(s1, s2, s3, s4, low, high, -1, retValid, ph, pl, repType).retPot;
def cntL_ = retestEvent(s1, s2, s3, s4, low, high, -1, retValid, ph, pl, repType).count;
#--
def retH = retH_;
def PotH = PotH_;
def cntH = cntH_;
def retL = retL_;
def PotL = PotL_;
def cntL = cntL_;

def retLCol = if retL then retL else retLCol[1];
def retHCol = if retH then retH else retHCol[1];
def breakUp = srcHi > retHCol; #srcHi > rBot;
def breakDn = srcLo < retLCol; #srcLo < sTop;

plot PotBreak = if retest then if PotH and cntH < 2 then PotH else na else na;
PotBreak.SetPaintingStrategy(PaintingStrategy.BOOLEAN_WEDGE_DOWN);
PotBreak.SetDefaultColor(color.CYAN);

plot PotBreakDn = if retest then if PotL and cntL < 2 then PotL else na else na;
PotBreakDn.SetPaintingStrategy(PaintingStrategy.BOOLEAN_WEDGE_UP);
PotBreakDn.SetDefaultColor(color.MAGENTA);

plot sTop_ = if sBoxH == 0 then na else sBoxH;
plot sBot_ = if sBoxL == 0 then na else sBoxL;
plot rTop_ = if rBoxH == 0 then na else rBoxH;
plot rBot_ = if rBoxL == 0 then na else rBoxL;

sTop_.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
sBot_.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
rTop_.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
rBot_.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

sTOP_.AssignValueColor(if breakDn then Color.RED else GlobalColor("red"));
sBot_.AssignValueColor(if breakDn then Color.RED else GlobalColor("red"));
rTop_.AssignValueColor(if breakUp then Color.GREEN else GlobalColor("green"));
rBot_.AssignValueColor(if breakUp then Color.GREEN else GlobalColor("green"));


AddCloud(if breakDn then sTop else na, sBot, Color.DARK_RED);
AddCloud(if breakUp then rTop else na, rBot, Color.DARK_GREEN);

#-- - END Code