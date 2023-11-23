#
# Grimes Modified MACD + Highest / Lowest Momentum Indicator
# Grimes_Modified_MACD_HILO_GMACDHILO
#
# Author: Kory Gill, @korygill
#
# Version History:
# 20191007 - KG - Created.
#
# Assembled by Kory Gill for BenTen at useThinkScript.com
# Original idea: https://www.tradingview.com/script/eVnQUwKW-Grimes-Modified-MACD-Supply-Demand/
#

declare lower;
declare once_per_bar;

input FastLength = 9;
input SlowLength = 21;
input SignalLength = 32;
input HighestLength = 20; #Hint HighestLength: Highest MACD Reading Within N Bars
input LowestLength = 20; #Hint LowestLength: Lowest MACD Reading Within N Bars

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

plot zeroLine = 0;
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

AddCloud(pma, phi, Color.Green, Color.Black);
AddCloud(pmb, plo, Color.Black, Color.Red);

# END - Grimes_Modified_MACD_HILO_GMACDHILO

input length = 14; #IMI Length
input lengthMA = 6; #IMI MA Length
input mult = 2.0; #Volatility Bands Stdev Mult
input lengthBB = 20; #Volatility Bands Length
input applySmoothing = yes; #Smooth IMI
input lowBand = 10; #Smoothing LowerBand

def PI = 3.14159265359;

input data = close;
input lower1 = low; #Research Lower = Low ?

    def a1 = Exp(-PI * Sqrt(2) / lower1);
def coeff2 = 2 * a1 * Cos(Sqrt(2) * PI / lower1);
def coeff3 = - Power(a1, 2);
def coeff1 = 1 - coeff2 - coeff3;
def filt = coeff1 * (data + (data[1])) / 2 + coeff2 * (filt[1]) + coeff3 * (filt[2]);

def gains = if close > open then(gains[1]) + (close - open) else 0;
def losses = if close < open then(losses[1]) + (open - close) else 0;
def upt = Sum(gains, length);
def dnt = Sum(losses, length);

plot imi_essf = if applySmoothing then EhlersSuperSmootherFilter(100 * (upt / (upt + dnt)), lowBand) else 100 * (upt / (upt + dnt));
imi_essf.SetDefaultColor(Color.GREEN);
imi_essf.SetLineWeight(2);

def basisx = ExpAverage(imi_essf, lengthBB);
def devx = (mult * StDev(imi_essf, lengthBB));
def ulx = (basisx + devx);
def llx = (basisx - devx);

input over_bought = 70;
plot ob = over_bought;
ob.SetDefaultColor(Color.DARK_RED);
ob.SetStyle(Curve.FIRM);
ob.HideTitle();

input over_sold = 20;
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

AddCloud(imi_essf, imi_average, Color.GREEN, Color.RED);

AddCloud(0, os, Color.DARK_GREEN, Color.DARK_GREEN);
AddCloud(ob, 100, Color.DARK_RED, Color.DARK_RED);