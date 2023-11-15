#// This work is licensed under a Attribution-NonCommercial-ShareAlike 4.0
#https://www.tradingview.com/script/dVau7zqn-SuperTrend-Oscillator-LUX/
#// © LuxAlgo
#study("[LUX] SuperTrend Oscillator", "SuperOsc [LuxAlgo]")
# Converted by Sam4Cok @Samer800 - 10 / 2022 - Not Typical
declare lower;
input ColorBar = no;
input length = 10;
input mult = 2.0;
input smooth = 72;
#//Misc
input fixed = no;    # 'Fixed Transparency'
input show_line = yes;   # 'Show Lines'
input show_Signal = yes;   # 'Show Signals'
input show_Label = no;  # 'Show % False Signals'
input src = close;
#//----
def lower; def upper; def trend;
def na = Double.NaN;
script nz {
    input data = close;
    input repl = 0;
    def ret_val = if isNaN(data) then repl else data;
    plot return = ret_val;
}
#valuewhen(Cond, source, lbr, occurrence)
script valuewhen {
  input cond = 0;
  input src = close;
  input occurrence = 0;
  def n = occurrence + 1;
  def offset = fold j = 0 to 200 with p = 1 while p < n + 1
    do p + ( if p == n then j - n else if cond[j] == yes then 1 else 0 );
  plot price = GetValue(src, offset - 1);
}
# theme
DefineGlobalColor("Green1", Color.GREEN); # >= 90
DefineGlobalColor("Green2", CreateColor(5, 217, 4)); # >= 80
DefineGlobalColor("Green3", CreateColor(4, 181, 4)); # >= 70
DefineGlobalColor("Green4", CreateColor(3, 145, 3)); # >= 60
DefineGlobalColor("Green5", CreateColor(2, 117, 2)); # >= 50
DefineGlobalColor("Red1", Color.RED);   # >= 40
DefineGlobalColor("Red2", CreateColor(214, 6, 6));   # >= 30
DefineGlobalColor("Red3", CreateColor(184, 6, 6));   # >= 20
DefineGlobalColor("Red4", CreateColor(145, 3, 3));   # >= 10
DefineGlobalColor("Red5", CreateColor(117, 2, 2));   # >= 0
#---------------------------------------------------------
    def nATR = ATR(Length = length) * mult;
def up = hl2 + nATR;
def dn = hl2 - nATR;
upper = if src[1] < upper[1] then min(up, upper[1]) else up;
lower = if src[1] > lower[1] then max(dn, lower[1]) else dn;
trend = if src > upper[1] then 1 else if src < lower[1] then 0 else trend[1];
def Spt = trend * lower + (1 - trend) * upper;
#//----
def ama;
def osc = max(min((src - Spt) / (upper - lower), 1), -1);
def alpha = power(osc, 2) / length;
ama = nz(ama[1] + alpha * (osc - ama[1]), osc);
def hist = ExpAverage(osc - ama, smooth);
#//----
def MainFixed = if fixed then osc * 100 else na;#, 'Main Fixed'
def Histogram = hist * 100;    # 'Histogram'
plot Signal = ama * 100;       # 'Signal'
Signal.AssignValueColor( if ama > 0 then CreateColor(33, 87, 243) else CreateColor(103, 58, 183));

def var_css = if osc > 0 then
if osc * 99 > 80 then 5 else
if osc * 99 > 60 then 4 else
if osc * 99 > 40 then 3 else
if osc * 99 > 20 then 2 else 1 else
if osc <= 0 then
if osc * -99 > 80 then - 5 else
    if osc * -99 > 60 then - 4 else
        if osc * -99 > 40 then - 3 else
            if osc * -99 > 20 then - 2 else -1 else na;

plot MainTrans = if fixed then na else osc * 100;    # 'Main Transp'
MainTrans.SetPaintingStrategy(PaintingStrategy.SQUARED_HISTOGRAM);
MainTrans.AssignValueColor( if var_css == 5 then GlobalColor("Green1") else
if var_css == 4 then GlobalColor("Green2") else
if var_css == 3 then GlobalColor("Green3") else
if var_css == 2 then GlobalColor("Green4") else
if var_css == 1 then GlobalColor("Green5") else
if var_css == -5 then GlobalColor("Red1") else
if var_css == -4 then GlobalColor("Red2") else
if var_css == -3 then GlobalColor("Red3") else
if var_css == -2 then GlobalColor("Red4") else GlobalColor("Red5"));
#//----
def a = if isNaN(Close) then na else 80;
def b = if isNaN(Close) then na else -80;
AddCloud(a, b, CreateColor(9, 26, 72), CreateColor(9, 26, 72), yes);
AddCloud(MainFixed, 0, Color.CYAN, Color.MAGENTA);
AddCloud(Histogram, 0, Color.WHITE, Color.WHITE, yes);
#//----
def signDiff = sign(osc);
def sig = if (sign(osc) - sign(osc[1])) then osc * -100 else na;
plot Lines = if show_line then sig else na;
Lines.SetStyle(Curve.FIRM);
Lines.AssignValueColor(if osc[1] > 0 then Color.GREEN else Color.RED);
Lines.EnableApproximation();

#//----
def cross = (src > Spt and src[1] < Spt[1]) or(src < Spt and src[1] > Spt[1]);
def crossUp = (src > Spt and src[1] < Spt[1]);
def crossDn = (src < Spt and src[1] > Spt[1]);

#//----
def false_buy = valuewhen(crossDn, src, 0) < valuewhen(crossUp, src, 0);
def false_sell = valuewhen(crossUp, src, 0) > valuewhen(crossDn, src, 0);
def num = TotalSum(if cross and(false_buy or false_sell) then 1 else 0);
def den = TotalSum(if cross then 1 else 0);
def per = num / den * 100;
#//----
def crossover = if !show_Signal then na else
if crossUp then
if false_sell then - 1 else 1 else na;
def crossunder = if !show_Signal then na else
if crossDn then
if false_buy then - 1 else 1 else na;
plot OverPoint = if !isNaN(crossover) then - 100 else na;
OverPoint.SetPaintingStrategy(PaintingStrategy.SQUARES);
OverPoint.AssignValueColor( if crossover == -1 then Color.RED else Color.GREEN);
OverPoint.SetLineWeight(4);

plot BelowPoint = if !isNaN(crossunder) then 100 else na;
BelowPoint.SetPaintingStrategy(PaintingStrategy.SQUARES);
BelowPoint.AssignValueColor( if crossunder == -1 then Color.RED else Color.GREEN);
BelowPoint.SetLineWeight(4);
def n = barNumber();

addlabel(show_Label, "False Signal(" + round(per, 2) + "%)", Color.WHITE);

AssignPriceColor(if !ColorBar then Color.CURRENT else
if var_css == 5 then GlobalColor("Green1") else
if var_css == 4 then GlobalColor("Green2") else
if var_css == 3 then GlobalColor("Green3") else
if var_css == 2 then GlobalColor("Green4") else
if var_css == 1 then GlobalColor("Green5") else
if var_css == -5 then GlobalColor("Red1") else
if var_css == -4 then GlobalColor("Red2") else
if var_css == -3 then GlobalColor("Red3") else
if var_css == -2 then GlobalColor("Red4") else GlobalColor("Red5"));

### END