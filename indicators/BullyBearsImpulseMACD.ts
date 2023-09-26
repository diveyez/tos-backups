#declares
declare lower;
# TRYING A BUG FIX FOR THE JUMPY MACD
declare once_per_bar;

#inputs
#input empty = "";
#title bar blackout code goes above here
input BarColor = no; #input(false, title = "Enable bar colors")
input lengthMA = 34;
input lengthSignal = 9;
input src = hlc3;
input fastLength = 12;
input slowLength = 26;
input MACDLength = 9;
input averageType = AverageType.EXPONENTIAL;
input showBreakoutSignals = yes;

def Value = MovingAverage(AverageType.EXPONENTIAL, close, fastLength) -
    MovingAverage(AverageType.EXPONENTIAL, close, slowLength);
def Avg = MovingAverage(AverageType.EXPONENTIAL, Value, MACDLength);
def Impulse = Value - Avg;

def na = Double.NaN;
script calc_smma {
    input src = vwap;
    input len = 34;
    def smma = if IsNaN(smma[1]) then SimpleMovingAvg(src, len) else (smma[1] * (len - 1) + src) / len;
    plot return = smma;
}
script calc_zlema {
    input src = ohlc4;
    input length = 34;
    def ema1 = ExpAverage(src, length);
    def ema2 = ExpAverage(ema1, length);
    def d = ema1 - ema2;
    def zelma = ema1 + d;
    plot return = zelma;
}
def hi = calc_smma(high, lengthMA);
def lo = calc_smma(low, lengthMA);
def mi = calc_zlema(src, lengthMA);

def md = if (mi > hi) then(mi - hi) else if (mi < lo) then(mi - lo) else 0;
def sb = SimpleMovingAvg(md, lengthSignal);
def sh = md - sb;
def mdc = if src > mi then if src > hi then 2 else 1 else if src < lo then - 2 else -1;

plot ImpulsePlot = Impulse;
ImpulsePlot.AssignValueColor(if Impulse > 0 then Color.GREEN else if Impulse < 0 then Color.RED else Color.GRAY);
ImpulsePlot.SetPaintingStrategy(PaintingStrategy.LINE);
ImpulsePlot.SetLineWeight(3);
ImpulsePlot.HideBubble();
#AddChartBubble(ImpulsePlot, if Impulse > 0 then Impulse else if Impulse < 0 then Impulse else Double.NaN, 
#               if Impulse > 0 then "B" else if Impulse < 1 then "S" else "0", 
#               if Impulse > 0 then Color.GREEN else if Impulse < 0 then Color.RED else Color.GRAY);




plot Value1 = MovingAverage(averageType, close, fastLength) - MovingAverage(averageType, close, slowLength);
plot Avg1 = MovingAverage(averageType, Value1, MACDLength);

plot Diff = Value - Avg1;
plot ZeroLine = 0;

plot UpSignal = if Diff crosses above ZeroLine then ZeroLine else Double.NaN;
plot DownSignal = if Diff crosses below ZeroLine then ZeroLine else Double.NaN;

UpSignal.SetHiding(!showBreakoutSignals);
DownSignal.SetHiding(!showBreakoutSignals);

Value1.SetDefaultColor(GetColor(1));
Avg1.SetDefaultColor(GetColor(8));
Diff.SetDefaultColor(GetColor(5));
Diff.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Diff.SetLineWeight(3);
Diff.DefineColor("Positive and Up", Color.GREEN);
Diff.DefineColor("Positive and Down", Color.DARK_GREEN);
Diff.DefineColor("Negative and Down", Color.RED);
Diff.DefineColor("Negative and Up", Color.DARK_RED);
Diff.AssignValueColor(if Diff >= 0 then if Diff > Diff[1] then Diff.Color("Positive and Up") else Diff.Color("Positive and Down") else if Diff < Diff[1] then Diff.Color("Negative and Down") else Diff.Color("Negative and Up"));
ZeroLine.SetDefaultColor(GetColor(0));
UpSignal.SetDefaultColor(Color.UPTICK);
UpSignal.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignal.SetDefaultColor(Color.DOWNTICK);
DownSignal.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
plot ImpulseSignal = sb;
ImpulseSignal.SetDefaultColor(Color.WHITE);
ImpulseSignal.SetLineWeight(1);
plot ImpulseHisto = sh;
ImpulseHisto.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
ImpulseHisto.SetDefaultColor(Color.WHITE);
plot ImpulseMACD = md;
ImpulseMACD.SetPaintingStrategy(PaintingStrategy.LINE);
ImpulseMACD.AssignValueColor(if mdc == 2 then Color.GREEN else
if mdc == 1 then Color.DARK_GREEN else
if mdc == -2 then Color.RED else Color.DARK_RED);
plot "0" = if IsNaN(close) then na else 0;
"0".SetDefaultColor(Color.DARK_GRAY);
AssignPriceColor(if !BarColor then Color.CURRENT else
if mdc == 2 then Color.GREEN else
if mdc == 1 then Color.DARK_GREEN else
if mdc == -2 then Color.RED else Color.DARK_RED);

