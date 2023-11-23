#declares
declare lower;
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
input length = 14; #IMI Length
input lengthMA2 = 6; #IMI MA Length
input mult = 2.0; #Volatility Bands Stdev Mult
input lengthBB = 20; #Volatility Bands Length
input applySmoothing = yes; #Smooth IMI
input lowBand = 10; #Smoothing LowerBand
input over_bought = 70;
input FastLength2 = 9;
input SlowLength2 = 21;
input SignalLength = 32;
input HighestLength = 20; #Hint HighestLength: Highest MACD Reading Within N Bars
input LowestLength = 20; #Hint LowestLength: Lowest MACD Reading Within N Bars
input data = close;
#input lower1 = low; #Research Lower = Low ?
    input over_sold = 20;
def PI = 3.14159265359;



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


def vClose = close;
def vHigh = high;
def vLow = low;
def bn = BarNumber();
def nan = double.NaN;

def fastMA = MovingAverage(AverageType.SIMPLE, vClose, fastLength);
def slowMA = MovingAverage(AverageType.SIMPLE, vClose, slowLength);
def macd = fastMA - slowMA;
def signal = MovingAverage(AverageType.SIMPLE, macd, signalLength);
def higher = MovingAverage(AverageType.SIMPLE, Highest(macd, HighestLength), HighestLength);
def lower = MovingAverage(AverageType.SIMPLE, Lowest(macd, LowestLength), HighestLength);
def macdAbove = if macd > higher then macd else nan; #macdAbove[1];
def macdBelow = if macd < lower then macd else nan; #macdBelow[1];

#def a1 = Exp(-PI * Sqrt(2) / lower1);
#def coeff2 = 2 * a1 * Cos(Sqrt(2) * PI / lower1);
#def coeff3 = - Power(a1, 2);
#def coeff1 = 1 - coeff2 - coeff3;
#def filt = coeff1 * (data + (data[1])) / 2 + coeff2 * (filt[1]) + coeff3 * (filt[2]);

def gains = if close > open then(gains[1]) + (close - open) else 0;
def losses = if close < open then(losses[1]) + (open - close) else 0;
def upt = Sum(gains, length);
def dnt = Sum(losses, length);
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



plot zeroLine2 = 0;
plot pma = macdAbove;
plot pmb = macdBelow;
plot phi = higher;
plot plo = lower;
plot pmacd = macd;
plot psignal = signal;

zeroLine.SetDefaultColor(Color.White);
zeroLine.SetPaintingStrategy(PaintingStrategy.LINE);
pmacd.SetDefaultColor(Color.Black);
psignal.SetDefaultColor(Color.Orange);
phi.SetDefaultColor(Color.Cyan);
plo.SetDefaultColor(Color.Cyan);
phi.SetPaintingStrategy(PaintingStrategy.LINE);
plo.SetPaintingStrategy(PaintingStrategy.LINE);


plot imi_essf = if applySmoothing then EhlersSuperSmootherFilter(100 * (upt / (upt + dnt)), lowBand) else 100 * (upt / (upt + dnt));
imi_essf.SetDefaultColor(Color.GREEN);
imi_essf.SetLineWeight(2);

def basisx = ExpAverage(imi_essf, lengthBB);
def devx = (mult * StDev(imi_essf, lengthBB));
def ulx = (basisx + devx);
def llx = (basisx - devx);


plot ob = over_bought;
ob.SetDefaultColor(Color.DARK_RED);
ob.SetStyle(Curve.FIRM);
ob.HideTitle();


plot os = over_sold;
os.SetDefaultColor(Color.DARK_GREEN);
os.SetStyle(Curve.FIRM);
os.HideTitle();

plot imi_ob = if imi_essf >= ulx then imi_essf else Double.NaN;
imi_ob.SetDefaultColor(Color.YELLOW);
imi_ob.SetLineWeight(3);
imi_ob.SetStyle(Curve.POINTS);
imi_ob.HideTitle();

plot imi_midline = (ob + os) / 2;
imi_midline.SetDefaultColor(Color.ORANGE);
imi_midline.SetLineWeight(1);
imi_midline.SetStyle(Curve.SHORT_DASH);
imi_midline.HideTitle();

plot imi_os = if imi_essf <= llx then imi_essf else Double.NaN;
imi_os.SetDefaultColor(Color.YELLOW);
imi_os.SetLineWeight(3);
imi_os.SetStyle(Curve.POINTS);
imi_os.HideTitle();

plot imi_average = ExpAverage(imi_essf, lengthMA);
imi_average.SetDefaultColor(Color.RED);
imi_average.SetLineWeight(2);

AddCloud(pma, phi, Color.Green, Color.Black);
AddCloud(pmb, plo, Color.Black, Color.Red);

# END - Grimes_Modified_MACD_HILO_GMACDHILO


AddCloud(imi_essf, imi_average, Color.GREEN, Color.RED);

AddCloud(0, os, Color.DARK_GREEN, Color.DARK_GREEN);
AddCloud(ob, 100, Color.DARK_RED, Color.DARK_RED);