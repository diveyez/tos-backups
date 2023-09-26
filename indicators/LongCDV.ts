# Cumulative Delta Volume

declare lower;
input linestyle = { HeikinAshi, default Candle, Line };
input timeFrame = { DAY, WEEK, MONTH, default ALL };
input maType = { SMMA, VWAP, SMA, default HMA, EMA, WMA };
input maLength = 50;   #"MA Length"(Set to 50 for maximum effect)
# False Positives, Do not use BAR COLOR
input BarColor = no;
# Tested Okay, Good for use
input BackgroundColor = yes;
# Does not indicate anything without RSI overlay
input ShowMovAvg = yes;
# Bollinger Bands
input ShowBand = yes; #(Bollinger Bands in Lower Instead)

def na = Double.NaN;
def cl = close; def op = open; def vo = volume;
def yyyyMmDd = GetYYYYMMDD();
def periodIndx;
switch (timeFrame) {
    case DAY:
        periodIndx = yyyyMmDd;
    case WEEK:
        periodIndx = Floor((DaysFromDate(First(yyyyMmDd)) + GetDayOfWeek(First(yyyyMmDd))) / 7);
    case MONTH:
        periodIndx = RoundDown(yyyyMmDd / 100, 0);
    case ALL:
        periodIndx = na;
}
def isPeriodRolled = CompoundValue(1, periodIndx != periodIndx[1], yes);
# The following lines edited by VSPX
# Script Added by Stranger named "VariableSPX" on useThinkScript
script nz {
    input data = volume;
    input replacement = 0;
    def ret_val = if IsNaN(data) then replacement else data;
    plot return = ret_val;
}
# volVWAP
script VVWAP {
    input src = close;
    def timeFrame = AggregationPeriod.DAY;
    def v = volume;
    def cap = GetAggregationPeriod();
    def errorInAggregation = cap >= AggregationPeriod.WEEK;
    Assert(!errorInAggregation, "timeFrame should be not less than current chart aggregation period");
    def yyyyMmDd = GetYYYYMMDD();
    def periodIndx = yyyyMmDd;
    def isPeriodRolled = CompoundValue(1, periodIndx != periodIndx[1], yes);
    def volumeSum;
    def volumeVwapSum;
    if (isPeriodRolled) {
        volumeSum = v;
        volumeVwapSum = v * src;
    } else {
        volumeSum = CompoundValue(1, volumeSum[1] + v, v);
        volumeVwapSum = CompoundValue(1, volumeVwapSum[1] + v * src, v * src);
    }
    def price = volumeVwapSum / volumeSum;
    plot return = price;
}
#ma(source, length, type) =>
# For testing the output, before script ma code
script ma {
    input source = close;
    input length = 10;
    input type = "SMA";

    def ma;
    ma = if type == "VWAP" then VVWAP(source) else
    if type == "SMA" then SimpleMovingAvg(source, length) else
    if type == "EMA" then ExpAverage(source, length) else
    if type == "WMA" then WMA(source, length) else
    if type == "HMA" then WMA(2 * WMA(source, length / 2) - WMA(source, length), Round(Sqrt(length)))
       else if IsNaN(ma[1]) then SimpleMovingAvg(source, length) else
    (ma[1] * (length - 1) + source) / length;
    plot result = ma;
}
#_rate(cond) =>
# script for rate ocl and body code for the plot
script _rate {
    input cond = 1;
    def o = open; def c = close; def l = low;
    def criteria = if cond == 1 then o <= c else o > c;
    def tw = high - Max(o, c);
    def bw = Min(o, c) - l;
    def body = AbsValue(c - o);
    def ret = 0.5 * (tw + bw + (if criteria then 2 * body else 0)) / (tw + bw + body);
    def rate = if nz(ret) == 0 then 0.5 else ret;
    plot Result = rate;
}
def deltaup = vo * _rate(1);
def deltadown = vo * _rate(0);
def delta = if cl >= op then deltaup else -deltadown;
def cumdelta1;
if isNaN(isPeriodRolled) {
    cumdelta1 = TotalSum(delta);
} else {
    if (isPeriodRolled) {
        cumdelta1 = delta;
    } else {
        cumdelta1 = CompoundValue(1, cumdelta1[1] + delta, delta);
    }
}

def cumdelta = cumdelta1;

def o;
def h;
def l;
def c;
def ctl;

if linestyle != linestyle.Line
then {
    o = cumdelta[1];
    h = Max(cumdelta, cumdelta[1]);
    l = Min(cumdelta, cumdelta[1]);
    c = cumdelta;
    ctl = na;
} else {
    o = na;
    h = na;
    l = na;
    c = na;
    ctl = cumdelta;
}
def LineClose = ExpAverage((cumdelta[1] + Max(cumdelta, cumdelta[1]) + Min(cumdelta, cumdelta[1]) + cumdelta) / 4, 5);
def LineOpen = ExpAverage(if IsNaN(LineOpen[1]) then(cumdelta[1] + cumdelta) / 2 else (LineOpen[1] + LineClose[1]) / 2, 5);

plot Line = ctl;
Line.AssignValueColor( if LineClose >= LineOpen then CreateColor(8, 153, 129) else
if LineClose < LineOpen  then CreateColor(239, 83, 80) else Color.GRAY);
Line.SetLineWeight(2);
# Borrowed from DynaTrades on TradingView and Converted with CHATGPT4
# I cannot confirm the author of this section @diveyez is the editor
##############
def _Close = (o + h + l + c) / 4;
def _Open = if IsNaN(_Open[1]) then(o + c) / 2 else (_Open[1] + _Close[1]) / 2;
def _High = Max(Max(h, _Open), _Close);
def _Low = Min(Min(l, _Open), _Close);

def haClose = if linestyle == linestyle.HeikinAshi then _Close else c;
def haOpen = if linestyle == linestyle.HeikinAshi then _Open  else o;
def haHigh = if linestyle == linestyle.HeikinAshi then _High  else h;
def haLow = if linestyle == linestyle.HeikinAshi then _Low   else l;

def Color = if haClose >= haOpen then 1 else -1;

# Plot UP candle

def UpO;
def UpH;
def UpL;
def UpC;

if Color > 0
then {
    UpO = haOpen;
    UpH = haHigh;
    UpL = haLow;
    UpC = haClose;
} else
{
    UpO = na;
    UpH = na;
    UpL = na;
    UpC = na;
}
# Plot DOWN candle
def DnO;
def DnH;
def DnL;
def DnC;
if Color < 0
then {
    DnO = haOpen;
    DnH = haHigh;
    DnL = haLow;
    DnC = haClose;
} else
{
    DnO = na;
    DnH = na;
    DnL = na;
    DnC = na;
}

# Plot the new Chart
AddChart(high = UpH, low = UpL, open = UpC, close = UpO,
    type = ChartType.CANDLE, growcolor = CreateColor(8, 153, 129));

AddChart(high = DnH, low = DnL, open = DnO, close = DnC,
    type = ChartType.CANDLE, growcolor = CreateColor(239, 83, 80));

## Plot MA Lines
plot AvgLine = ma(ctl, maLength, maType);
AvgLine.SetPaintingStrategy(PaintingStrategy.LINE);
AvgLine.SetHiding(!ShowMovAvg);

plot HaAvgLine = ma(haClose, maLength, maType);
HaAvgLine.SetPaintingStrategy(PaintingStrategy.LINE);
HaAvgLine.SetHiding(!ShowMovAvg);

### Band
def offs = (1.6185 * StDev(if linestyle != linestyle.Line then haClose else ctl, maLength));
def upBand = (if linestyle != linestyle.Line then HaAvgLine else AvgLine) + offs;
def dnBand = (if linestyle != linestyle.Line then HaAvgLine else AvgLine) - offs;

def BandColor = if (if (linestyle != linestyle.Line, haClose, ctl)) > upBand then 1 else
if (if (linestyle != linestyle.Line, haClose, ctl))<dnBand then - 1 else 0;

plot Oband = upBand;
Oband.AssignValueColor(if BandColor > 0 then Color.GREEN else
if BandColor < 0 then Color.RED else CreateColor(100, 181, 246));
Oband.SetHiding(!ShowBand);

plot Sband = dnBand;
Sband.AssignValueColor(if BandColor > 0 then Color.GREEN else
if BandColor < 0 then Color.RED else CreateColor(100, 181, 246));
Sband.SetHiding(!ShowBand);

AvgLine.AssignValueColor(if BandColor > 0 then Color.GREEN else
if BandColor < 0 then Color.RED else Color.WHITE);
HaAvgLine.AssignValueColor(if BandColor > 0 then Color.GREEN else
if BandColor < 0 then Color.RED else Color.WHITE);

### Background
### Modified to create more dynamic display of coloring
### Reverted on_volume 4 / 5 due to false positives
AddCloud(if BackgroundColor then
if (if (linestyle != linestyle.Line, haClose, ctl)) > Oband then Double.POSITIVE_INFINITY else if
    (if linestyle != linestyle.Line then haClose else ctl)<Sband then Double.NEGATIVE_INFINITY else na else na,
if (if linestyle != linestyle.Line then haClose else ctl) > Oband then Double.NEGATIVE_INFINITY else if
    (if linestyle != linestyle.Line then haClose else ctl)<Sband then Double.POSITIVE_INFINITY else na, Color.DARK_GREEN, Color.DARK_RED);

### Bar Color
### False positives, do not use bar color except for showing reversal zones / ranges on the candles
def Exup = if linestyle != linestyle.Line then(Color > 0 and BandColor > 0)
else (LineClose >= LineOpen and BandColor > 0);
def up = if linestyle != linestyle.Line then(Color > 0 and BandColor <= 0)
else (LineClose >= LineOpen and BandColor <= 0);
def Exdn = if linestyle != linestyle.Line then(Color < 0 and BandColor < 0)
else (LineClose < LineOpen and BandColor < 0);
def dn = if linestyle != linestyle.Line then(Color < 0 and BandColor >= 0)
else (LineClose < LineOpen and BandColor >= 0);

AssignPriceColor(if BarColor then
if Exup then Color.GREEN else
if up   then Color.WHITE else
if dn   then Color.YELLOW else
if Exdn then Color.RED else Color.GRAY else Color.CURRENT);

### Written by Some unknown helpers, diveyez, VariableSPX, ChatGPT3 - 4  2023
### Some of this code might be borrowed from others