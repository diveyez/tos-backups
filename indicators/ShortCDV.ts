### I cannot take credit for this... I do not know how much the help borrowed from others
### This will remain an open source edit
### Written by Some unknown helpers, diveyez, VariableSPX, ChatGPT3 - 4  2023
### Some of this code might be borrowed from others

declare lower;
input linestyle = { default Candle, Line };
input HeikinAshi = no; #"Heikin Ashi Candles?")
input maType = { "SMMA", "SMA", default "HMA", "EMA", "WMA"};
input maLength = 20;   #"MA Length"
input BarColor = no;
input BackgroundColor = yes;
input ShowMovAvg = yes;
input ShowBand = yes;
def na = Double.NaN;
script nz {
    input data = 0;
    input replacement = 0;
    def ret_val = if IsNaN(data) then replacement else data;
    plot return = ret_val;
}
#ma(source, length, type) =>
script ma {
    input source = close;
    input length = 0;
    input type = "SMA";
    def ma;
    ma = if type == "SMA" then SimpleMovingAvg(source, length) else
    if type == "EMA" then ExpAverage(source, length) else
    if type == "WMA" then WMA(source, length) else
    if type == "HMA" then WMA(2 * WMA(source, length / 2) - WMA(source, length), Round(Sqrt(length)))
       else if IsNaN(ma[1]) then SimpleMovingAvg(source, length) else
    (ma[1] * (length - 1) + source) / length;
    plot result = ma;
}
#_rate(cond) =>
script _rate {
    input cond = 1;
    def criteria = if cond == 1 then open <= close else open > close;
    def tw = high - Max(open, close);
    def bw = Min(open, close) - low;
    def body = AbsValue(close - open);
    def ret = 0.5 * (tw + bw + (if criteria then 2 * body else 0)) / (tw + bw + body);
    def rate = if nz(ret) == 0 then 0.5 else ret;
    plot Result = rate;
}
def deltaup = volume * _rate(1);
def deltadown = volume * _rate(0);
def delta = if close >= open then deltaup else -deltadown;
def cumdelta = TotalSum(delta);

def o;
def h;
def l;
def c;
def ctl;

if linestyle == linestyle.Candle
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

##############
def _Close = (o + h + l + c) / 4;
def _Open = if IsNaN(_Open[1]) then(o + c) / 2 else (_Open[1] + _Close[1]) / 2;
def _High = Max(Max(h, _Open), _Close);
def _Low = Min(Min(l, _Open), _Close);

def haClose = if HeikinAshi then _Close else c;
def haOpen = if HeikinAshi then _Open  else o;
def haHigh = if HeikinAshi then _High  else h;
def haLow = if HeikinAshi then _Low   else l;

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
def offs = (1.6185 * StDev(if linestyle == linestyle.Candle then haClose else ctl, maLength));
def upBand = (if linestyle == linestyle.Candle then HaAvgLine else AvgLine) + offs;
def dnBand = (if linestyle == linestyle.Candle then HaAvgLine else AvgLine) - offs;

def BandColor = if (if linestyle == linestyle.Candle then haClose else ctl) > upBand then 1 else
if (if linestyle == linestyle.Candle then haClose else ctl)<dnBand then - 1 else 0;

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
AddCloud(if BackgroundColor then
if (if linestyle == linestyle.Candle then haClose else ctl) > Oband then Double.POSITIVE_INFINITY else if
    (if linestyle == linestyle.Candle then haClose else ctl)<Sband then Double.NEGATIVE_INFINITY else na else na,
if (if linestyle == linestyle.Candle then haClose else ctl) > Oband then Double.NEGATIVE_INFINITY else if
    (if linestyle == linestyle.Candle then haClose else ctl)<Sband then Double.POSITIVE_INFINITY else na, Color.DARK_GREEN, Color.DARK_RED);

### Bar Color
def Exup = if linestyle == linestyle.Candle then(Color > 0 and BandColor > 0)
else (LineClose >= LineOpen and BandColor > 0);
def up = if linestyle == linestyle.Candle then(Color > 0 and BandColor <= 0)
else (LineClose >= LineOpen and BandColor <= 0);
def Exdn = if linestyle == linestyle.Candle then(Color < 0 and BandColor < 0)
else (LineClose < LineOpen and BandColor < 0);
def dn = if linestyle == linestyle.Candle then(Color < 0 and BandColor >= 0)
else (LineClose < LineOpen and BandColor >= 0);

AssignPriceColor(if BarColor then
if Exup then Color.GREEN else
if up   then CreateColor(0, 80, 80) else
if dn   then CreateColor(117, 0, 14) else
if Exdn then Color.RED else Color.GRAY else Color.CURRENT);