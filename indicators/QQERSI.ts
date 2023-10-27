#https://www.tradingview.com/script/TqH22YpJ-On-Chart-QQE-of-RSI-on-Variety-MA-Loxx/
#// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
#// © loxx
#indicator("On-Chart QQE of RSI on Variety MA [Loxx]"
# Converted by Sam4Cok@Samer800 - 04 / 2023
#----Color
DefineGlobalColor("blue", CreateColor(49, 121, 245));
DefineGlobalColor("red", CreateColor(255, 82, 82));

input srcin = Close;#, "Source",
    input typeOut = AverageType.EXPONENTIAL;
input showSignals = yes;         # "Show Signals?"
input SignalType = { Default "Change on Levels", "Change on Slope", "Change on Zero", "Change on Original"};
input ShowCloud = yes;
input QQE_Line = yes;
input Upper_Level = no;
input Lower_Level = no;
input Middle_Level = no;
input QQE_Slow = no;
input QQE_Fast = no;
input RsiPeriod = 14;            # "RSI Period"
input MaPeriod = 32;             # "Average Period"
input RsiSmoothingFactor = 5;    # "RSI Smoothing Factor"
input QqeFastPeriod = 2.618;     # "Fast Period"
input QqeSlowPeriod = 4.236;     # "Slow Period"
input HighLowPeriod = 25;        # "Highest High/Lowest Low Period"
input OverboughtLevel = 70;      # "Overbought Level"
input OversoldLevel = 30;        # "Oversold Level"


def na = Double.NaN;


def haClose = ohlc4;
def haOpen = CompoundValue(1, (haOpen[1] + haClose[1]) / 2, (open + close) / 2);
def haHigh = Max(high, Max(haOpen, haClose));
def haLow = Min(low, Min(haOpen, haClose));
def hamedian = (haHigh + haLow) / 2;
def hatypical = (haHigh + haLow + haClose) / 3;
def haweighted = (haHigh + haLow + haClose + haClose) / 4;
def haaverage = (haOpen + haHigh + haLow + haClose) / 4;

def _alphaS = 2.0 / (1.0 + (if RsiSmoothingFactor > 1 then RsiSmoothingFactor else 1));
def _alphaR = 2.0 / (1.0 + RsiPeriod);
def wlevs;# = 0.
def wlevf;# = 0.
def tr;# = 0.
def tr1;# = 0.

def maHandle = MovingAverage(typeout, srcin, MaPeriod);
def rsi = RSI(Price = maHandle, Length = RsiPeriod);

def work = CompoundValue(1, work[1] + _alphaS * (rsi - work[1]), _alphaS * rsi);

def _diff_ = work[1] - work;
def _diff;
if _diff_ < 0 {
    _diff = -_diff_;
} else {
    _diff = _diff_;
}
def ema = CompoundValue(1, ema[1] + _alphaR * (_diff - ema[1]), _alphaR * _diff);
def emm = CompoundValue(1, emm[1] + _alphaR * (ema - emm[1]), _alphaR * ema);

def _iEmf = emm * QqeFastPeriod;
def _iEms = emm * QqeSlowPeriod;

def tr_ = wlevs[1];
def dv_ = tr_;
if work < tr_ {
    tr = if work[1] < dv_ and(work + _iEms) > dv_ then dv_ else (work + _iEms);
} else
    if work > tr_ {
        tr = if work[1] > dv_ and(work - _iEms) < dv_ then dv_ else (work - _iEms);
    } else {
        tr = tr_;
    }
wlevs = tr;

def tr_1 = wlevf[1];
def dv_1 = tr_1;
if work < tr_1 {
    tr1 = if work[1] < dv_1 and(work + _iEmf) > dv_1 then dv_1 else (work + _iEmf);
} else
    if work > tr_1 {
        tr1 = if work[1] > dv_1 and(work - _iEmf) < dv_1 then dv_1 else (work - _iEmf);
    } else {
        tr1 = tr_1;
    }
wlevf = tr1;

def prev_max = highest(high, HighLowPeriod - 1);
def prev_min = lowest(low, HighLowPeriod - 1);

def fmax = if (high > prev_max) then high else prev_max;
def fmin = if (low < prev_min) then low else prev_min;
def rng = (fmax - fmin) / 100.0;

def levu = fmin + OverboughtLevel * rng;
def levd = fmin + OversoldLevel * rng;
def levm = fmin + 50 * rng;

def val = fmin + work * rng;

def fillud = fmin + work * rng;
def filldu = fmin + work * rng;

def levf = fmin + wlevf * rng;
def levs = fmin + wlevs * rng;

def filluu = fmax;
def filldd = fmin;

def valc;
switch (SignalType) {
    case "Change on Levels":
        valc = if val > levu then 1 else if val < levd then 2 else 0;
    case "Change on Slope":
        valc = if val > val[1] then 1 else if val < val[1] then 2 else valc[1];
    case "Change on Zero":
        valc = if val > levm then 1 else if val < levm then 2 else 0;
    case "Change on Original":
        valc = if work > wlevf and work > wlevs then 1 else if work < wlevf and work < wlevs then 2 else valc[1];
}
def colorout = if valc == 1 then 1 else if valc == 2 then - 1 else 0;

AddCloud(if !ShowCloud then na else if colorout > 0 then filluu else na, filldd, Color.DARK_GREEN);
AddCloud(if !ShowCloud then na else if colorout < 0 then filluu else na, filldd, Color.DARK_RED);
AddCloud(if !ShowCloud then na else if colorout == 0 then filluu else na, filldd, Color.DARK_GRAY);


plot UpperLevel = if !Upper_Level then na else levu;
plot LowerLevel = if !Lower_Level then na else levd;
plot MiddleLevel = if !Middle_Level then na else levm;

plot QQE = if !QQE_Line then na else val;

plot QQESlow = if !QQE_Slow then na else levs;
plot QQEFast = if !QQE_Fast then na else levf;

UpperLevel.SetDefaultColor(Color.DARK_GREEN);
LowerLevel.SetDefaultColor(Color.DARK_RED);
MiddleLevel.SetDefaultColor(Color.DARK_GRAY);
MiddleLevel.SetStyle(Curve.SHORT_DASH);
QQE.SetLineWeight(3);
QQE.AssignValueColor(if colorout > 0 then GlobalColor("blue") else
if colorout < 0 then GlobalColor("red") else Color.GRAY);
#QQESlow.SetLineWeight(2);
QQESlow.SetDefaultColor(Color.YELLOW);
QQEFast.SetDefaultColor(Color.CYAN);

def goLong = valc == 1 and valc[1] != 1;
def goShort = valc == 2 and valc[1] != 2;

AddChartBubble(showSignals and goLong, low, "L", Color.GREEN, no);
AddChartBubble(showSignals and goShort, high, "S", Color.RED, yes);



#-- - END of CODE