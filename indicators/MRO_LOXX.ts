#// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
#// © loxx
#indicator("Momentum Ratio Oscillator [Loxx]"
# converted and mod by Sam4Cok@Samer800 - 04 / 2023
declare lower;
input srcin = Close;                # "Source",
    input Period = 50;                  # "Period"
input sigtype = { default "Middle", "Levels", "Signal"};    # "Signal Type"
input upper_Level = 0.8;            # "Upper Level"
input lower_Level = 0.2;            # "Lower Level"
input colorBars = yes;              # "Color bars?"
input showSigs = yes;               # "Show Signals?"

def na = Double.NaN;
def last = isNaN(Close);
def Middle = sigtype == sigtype."Middle";
def Signal = sigtype == sigtype."Signal";
def haClose = ohlc4;
def haOpen = CompoundValue(1, (haOpen[1] + haClose[1]) / 2, (open + close) / 2);
def haHigh = Max(high, Max(haOpen, haClose));
def haLow = Min(low, Min(haOpen, haClose));
def hamedian = (hahigh + halow) / 2;
def hatypical = (hahigh + halow + haclose) / 3;
def haweighted = (hahigh + halow + haclose + haclose) / 4;
def haaverage = (haopen + hahigh + halow + haclose) / 4;


def alpha = 2.0 / (1.0 * Period);
def ema = CompoundValue(1, ema[1] + alpha * (srcin - ema[1]), srcin[1] + alpha * (srcin - srcin[1]));
def ratioa = ema / ema[1];

def emaa = CompoundValue(1, emaa[1] + alpha * ((if (ratioa < 1.0, ratioa, 0)) - emaa[1]), alpha * if (ratioa < 1.0, ratioa, 0));
def emab = CompoundValue(1, emab[1] + alpha * ((if (ratioa > 1.0, ratioa, 0)) - emab[1]), alpha * if (ratioa > 1.0, ratioa, 0));

def ratiob = ratioa / (ratioa + emab);

def val = 2.0 * ratioa / (ratioa + ratiob * emaa) - 1.0;
def sig = val[1];

def mid = 0.5;
def colorout = if Middle then if val > mid then 1 else -1 else
if Signal then if val > sig then 1 else -1 else
if val > upper_Level then 1 else if val < lower_Level then - 1 else 0;

plot ValLine = val;
plot MidLine = if last then na else mid;
def UpperLevel = if last then na else upper_Level;#, "Upper Level"
def LowerLevel = if last then na else lower_Level;#, "Lower Level"

ValLine.SetLineWeight(2);
ValLine.AssignValueColor(if colorout > 0 then Color.GREEN else
if colorout < 0 then Color.RED else Color.GRAY);
MidLine.SetDefaultColor(Color.GRAY);
MidLine.SetPaintingStrategy(PaintingStrategy.DASHES);


AssignPriceColor(if !colorbars then Color.CURRENT else
if colorout > 0 then Color.GREEN else
if colorout < 0 then Color.RED else Color.GRAY);

#-- - Signals
def goLong =  if Middle then(val Crosses above mid) else
    if Signal then(val Crosses above sig) else (val Crosses above upper_Level);
def goShort = if Middle then(val Crosses below mid) else
    if Signal then(val Crosses below sig) else (val Crosses below upper_Level);

plot SigUp = if showSigs and goLong then lower_Level else 0;     # "Long"
plot SigDn = if showSigs and goShort then upper_Level else 1;    # "Short"

SigUp.SetDefaultColor(Color.DARK_GREEN);
SigDn.SetDefaultColor(Color.DARK_RED);

AddCloud(SigDn, upper_Level, Color.DARK_RED, Color.DARK_RED, yes);
AddCloud(lower_Level, SigUp, Color.DARK_GREEN, Color.DARK_GREEN, yes);
