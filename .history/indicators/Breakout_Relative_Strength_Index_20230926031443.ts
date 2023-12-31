# Breakout Relative Strength Index
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/sI3VAlQb-Breakout-Relative-Strength-Index/

declare lower;

input hline = 80;
input mline = 50;
input lline = 20;
input length = 14;
def boPrice = ohlc4;
def boVolume = sum(volume, 2);

def boStrength = if high - low != 0 then(close - open) / (high - low) else 0;
def boPower = boPrice * boStrength * boVolume;

def posPower = if boPower > boPower[1] then boPower else 0;
def negPower = if boPower < boPower[1] then boPower else 0;

def p = sum(posPower, length);
def n = sum(absValue(negPower), length);

def boRatio = if n != 0 then p / n else 0;

def brsi = 100 - (100 / (1 + boRatio));

plot line = brsi;
plot low = lline;
plot mid = mline;
plot high = hline;

line.AssignValueColor(if brsi > 80 then color.red else if brsi < 20 then color.green else if brsi > 50 then color.green else if brsi < 50 then color.red else color.white);
low.SetDefaultColor(GetColor(0));
mid.SetDefaultColor(GetColor(1));
high.SetDefaultColor(GetColor(3));