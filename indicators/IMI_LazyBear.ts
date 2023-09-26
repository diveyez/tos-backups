# filename: _Intraday_Momentum_Index_LB_
# source: https://www.tradingview.com/script/3CufgHsc-Indicator-Intrady-Momentum-Index/

# Original idea and execution:
# Code by LazyBear

# initial port by netarchitech
# 2019.11.06

declare lower;

input length = 14; #IMI Length
input lengthMA = 6; #IMI MA Length
input mult = 2.0; #Volatility Bands Stdev Mult
input lengthBB = 20; #Volatility Bands Length
input applySmoothing = yes; #Smooth IMI
input lowBand = 10; #Smoothing LowerBand

def PI = 3.14159265359;

input data = close;
input lower = low; #Research Lower = Low ?

    def a1 = Exp(-PI * Sqrt(2) / lower);
def coeff2 = 2 * a1 * Cos(Sqrt(2) * PI / lower);
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