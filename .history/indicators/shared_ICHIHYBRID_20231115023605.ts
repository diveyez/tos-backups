# Ichimoku Hybrid, RSI_Laguerre CSA
# Mobius
# V01.11.11.2014
 
# Hybrid Ichimoku
# UI inputs
input tenkan_period = 8;
input kijun_period = 21;
 
# Calculations
def D = CompoundValue(1, D[1] + (close - D[1]) / tenkan_period * (Power((close / D[1]), 4)), close);
plot Tenkan = (Highest(D, tenkan_period) +
    Lowest(D, tenkan_period)) / 2;
plot Kijun = (Highest(D, kijun_period) +
    Lowest(D, kijun_period)) / 2;
plot "Span A" = (Tenkan + Kijun) / 2;
plot "Span B" = (Highest(D[kijun_period], 2 * kijun_period) + Lowest(D[kijun_period], 2 * kijun_period)) / 2;
plot Chikou = D;
Tenkan.SetDefaultColor(GetColor(1));
Kijun.SetDefaultColor(GetColor(2));
"Span A".SetDefaultColor(GetColor(3));
"Span B".SetDefaultColor(GetColor(4));
Chikou.SetDefaultColor(GetColor(5));

 
# RSI in Laguerre Time auto - adjusted with fractal dimensions algorithm
#Inputs: 
input n = 8; #hint n: Periods for fractal dimensions calculations
input AscaleLow = .02; #hint AscaleLow: Typical range from .1 to .4
input AscaleHigh = .2; #hint AscaleHigh: Typical range from .4 to .8
 
# Variables:
def o;
def h;
def l;
def c;
def CU1;
def CU2;
def CU;
def CD1;
def CD2;
def CD;
def B;
def Ascaled;
def TR;
def data;
def L0;
def L1;
def L2;
def L3;
def RSI;
def OS;
def OB;
def a;
def aBar;
def zig;
def z;
def zBar;
def zag;
def trendPrice;
 
# Internal Script
script Scale {
    input c = close;
    input Min = .01;
    input Max = 1;
    def hh = HighestAll(c);
    def ll = LowestAll(c);
    plot Range = (((Max - Min) * (c - ll)) / (hh - ll)) + Min;
}
# Calculations
o = (open + close[1]) / 2;
h = Max(high, close[1]);
l = Min(low, close[1]);
c = (o + h + l + close) / 4;
TR = Max(h, c[1]) - Min(l, c[1]);
B = (Log(Sum(TR, n) / (Highest(h, n) - Lowest(l, n)))
    / Log(10)) / (Log(n) / Log(10));
Ascaled = Round(Scale(c = B, min = AscaleLow, max = AscaleHigh), 2);
data = if IsNaN(Ascaled) then data[1] else Ascaled;
L0 = (1 – data) * c + data * L0[1];
L1 = -data * L0 + L0[1] + data * L1[1];
L2 = -data * L1 + L1[1] + data * L2[1];
L3 = -data * L2 + L2[1] + data * L3[1];
if L0 >= L1
then {
    CU1 = L0 - L1;
    CD1 = 0;
} else {
    CD1 = L1 - L0;
    CU1 = 0;
}
if L1 >= L2
then {
    CU2 = CU1 + L1 - L2;
    CD2 = CD1;
} else {
    CD2 = CD1 + L2 - L1;
    CU2 = CU1;
}
if L2 >= L3
then {
    CU = CU2 + L2 - L3;
    CD = CD2;
} else {
    CU = CU2;
    CD = CD2 + L3 - L2;
}
RSI = if CU + CD <> 0 
      then if  CU / (CU + CD) < .09
           then 0 
           else if CU / (CU + CD) > .9
                then 1
           else CU / (CU + CD)
      else 0;
OS = if IsNaN(close) then Double.NaN else .1;
OB = if IsNaN(close) then Double.NaN else .9;
 
# RSI_Laguerre scaled to upper chart values and pinned to highs / lows
a = if RSI crosses below OB then 1 else Double.NaN;
aBar = if !IsNaN(a) then BarNumber() else aBar[1];
zig = if BarNumber() == aBar then high else zig[1];
z = if RSI crosses above OS then 1 else Double.NaN;
zBar = if !IsNaN(z) then BarNumber() else zBar[1];
zag = if BarNumber() == zBar then low else zag[1];
def state = { default init, undefined, uptrend, downtrend };
switch (state[1]) {
    case init:
        trendPrice = l;
        state = state.undefined;
    case undefined:
        if (RSI <= OS) {
            state = state.downtrend;
            trendPrice = zig;
        } else if (RSI >= OB) {
            state = state.uptrend;
            trendPrice = zag;
        } else {
            state = state.undefined;
            trendPrice = trendPrice[1];
        }
    case uptrend:
        if (RSI >= OB) {
            state = state.downtrend;
            trendPrice = zag;
        } else {
            state = state.uptrend;
            trendPrice = Max(zag, trendPrice[1]);
        }
    case downtrend:
        if (RSI <= OS) {
            state = state.uptrend;
            trendPrice = zig;
        } else {
            state = state.downtrend;
            trendPrice = Min(zig, trendPrice[1]);
        }
}
plot ZZ = if trendPrice <> trendPrice[1] then trendPrice else Double.NaN;
ZZ.EnableApproximation();
ZZ.SetStyle(Curve.FIRM);
ZZ.SetLineWeight(2);
ZZ.SetDefaultColor(Color.WHITE);
 
# Price Compression(Squeeze)
def Avg;
def ATR;
def SD;
def Squeeze;
def SqLoc;
plot Points;

Avg = Average(close, 20);
ATR = Average(TrueRange(high, close, low), 20);
SD = StDev(close, 20);
Squeeze = if Avg + (2 * SD) < Avg + (1.5 * ATR)
          then 1
          else Double.NaN;
SqLoc = if !IsNaN(Squeeze) and IsNaN(Squeeze[1])
        then low - TickSize()
        else SqLoc[1];
Points = if !IsNaN(Squeeze) then SqLoc else Double.NaN;
Points.SetPaintingStrategy(PaintingStrategy.POINTS);
Points.SetLineWeight(2);
Points.SetDefaultColor(Color.YELLOW);
AddLabel(!IsNaN(Squeeze), "Squeeze", Color.WHITE);
 
# Trade Management
plot entry1 = if open > ZZ and
close >= Max(Chikou, "Span B") and
IsNaN(Squeeze)
             then low
             else Double.NaN;
entry1.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
entry1.SetDefaultColor(Color.CYAN);
entry1.SetLineWeight(3);
AddChartBubble(entry1, entry1 - ATR, "Long", Color.CYAN, no);
plot entry2 = if close > SqLoc and
Chikou > Kijun and
close > ZZ
              then low
              else Double.NaN;
entry2.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
entry2.SetDefaultColor(CreateColor(100, 100, 250));
entry2.SetLineWeight(3);
AddChartBubble(entry2, entry2 - ATR, "Long", CreateColor(100, 100, 250), no);
plot exit1 = if !IsNaN(Squeeze) and
                close crosses below SqLoc
             then high
             else if IsNaN(Squeeze) and
"Span B" > Chikou and
close < ZZ and
open < Chikou               
             then high
             else Double.NaN;
exit1.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
exit1.SetDefaultColor(Color.PINK);
exit1.SetLineWeight(3);
AddChartBubble(exit1, exit1 + ATR, "Short", Color.PINK, yes);
 
# End Code Ichimoku RSI Laguerre Hybrid