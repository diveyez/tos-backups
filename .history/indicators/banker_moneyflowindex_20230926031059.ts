#// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
#// © blackcat1402
#study("[blackcat] L3 Banker Fund Flow Trend Oscillator", overlay = false)
# Converted and mod by Sam4Cok @Samer800 - 02 / 2023
declare lower;
#//functions
input BarColor = yes;
input SmoothingLength = 13;
def na = Double.NaN;
def last = isNaN(close[1]);
#xrf(values, length) =>
script xrf {
input values = close;
input length = 34;
def r_val;# = float(na)
    r_val = if length >= 1 then
fold i = 0 to length + 1 with p = values do
        if IsNaN(p) or!IsNaN(values) then values else p else Double.NaN;
plot out = r_val;
}
#xsa(src, len, wei) =>
script xsa {
input src = close;
input len = 5;
input wei = 1;
def sumf;# = 0.0
def ma;# = 0.0
def out;# = 0.0
    sumf = CompoundValue(1, sumf[1] - src[len] + src, src);
    ma = if IsNaN(src[len]) then Double.NaN else sumf / len;
    out = if IsNaN(out[1]) then ma else (src * wei + out[1] * (len - wei)) / len;
plot return = out;
}
def wmCal = (close - Lowest(low, 27)) / (Highest(high, 27) - Lowest(low, 27)) * 100;

#//set up a simple model of banker fund flow trend
def fundtrend = (3 * xsa(wmCal, 5, 1) - 2 * xsa(xsa(wmCal, 5, 1), 3, 1) - 50) * 1.032 + 50;
#//define typical price for banker fund
def typ = (2 * close + high + low + open) / 5;
#//lowest low with mid term fib # 34
#def lol = Lowest(typ, 34); #new code
def lol = Lowest(low, 34); #orig code
#//highest high with mid term fib # 34
#def hoh = Highest(typ, 34); #new code
def hoh = Highest(high, 34); #orig code
#//define banker fund flow bull bear line
def bullbear = (typ - lol) / (hoh - lol) * 100;
def bullbearline = ExpAverage(bullbear, SmoothingLength);
#//define banker entry signal
def bankerentry = Crosses(fundtrend, bullbearline, CrossingDirection.ABOVE) and bullbearline < 25;
def bankerExit = Crosses(fundtrend, bullbearline, CrossingDirection.BELOW) and bullbearline > 75;

#//banker increase position with green candle
def UpCandle = fundtrend > bullbearline;
def WeakUp = fundtrend < (xrf(fundtrend * 0.95, 1));
def DnCandle = fundtrend < bullbearline;
def WeakDn = fundtrend < bullbearline and fundtrend > (xrf(fundtrend * 0.95, 1));

# Plot the new Chart
#//banker fund entry with yellow candle
AddChart(high = if bankerExit then 100 else na, low = 0, open = 100, close = 0,
    type = ChartType.CANDLE, growcolor = Color.magenta);

AddChart(high = if bankerentry then 100 else na, low = 0, open = 100, close = 0,
    type = ChartType.CANDLE, growcolor = color.blue); #original CreateColor(26, 70, 85));

AddChart(high = if UpCandle then bullbearline else na, low = fundtrend, open = fundtrend, close = bullbearline,
    type = ChartType.CANDLE, growcolor = CreateColor(7, 205, 15));

AddChart(high = if WeakUp then bullbearline else na, low = fundtrend, open = fundtrend, close = bullbearline,
    type = ChartType.CANDLE, growcolor = CreateColor(188, 245, 188));

AddChart(high = if DnCandle then bullbearline else na, low = fundtrend, open = bullbearline, close = fundtrend,
    type = ChartType.CANDLE, growcolor = Color.RED);

AddChart(high = if WeakDn then bullbearline else na, low = fundtrend, open = bullbearline, close = fundtrend,
    type = ChartType.CANDLE, growcolor = Color.PINK);

# / overbought and oversold threshold lines
def h1 = if last then na else 80;
def h2 = if last then na else 20;
def h3 = 10;
def h4 = 90;
plot h5 = if last then na else 50;
h5.SetDefaultColor(Color.dark_GRAY);

#AddCloud(h2, h3, CreateColor(157, 157, 0)); #color = color.yellow, transp = 70) #original
AddCloud(h2, h3, Color.Light_gray); #color = color.yellow, transp = 70) #mark new
    #AddCloud(h4, h1, CreateColor(157, 0, 157));# = color.fuchsia, transp = 70) #original
AddCloud(h4, h1, Color.Light_gray);# = color.fuchsia, transp = 70) #new mark

AssignPriceColor(if !BarColor then Color.CURRENT else
if bankerentry then Color.blue else
if bankerExit then Color.MAGENTA else
if WeakDn then Color.DARK_RED else
if DnCandle then Color.RED else
if WeakUp then Color.DARK_GREEN else
if UpCandle then Color.GREEN else Color.CURRENT);



#----END CODE