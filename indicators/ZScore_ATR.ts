# Z - Score Distance From ATR
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/GVq5J9Ix-ATR-Z-Score/

declare lower;

input source = close;
input atrlen = 10;
input lookback = 100;
input StdDevs = 2.0;

def atrAvg = atr(atrlen);

def atrStdDev = (atrAvg - atr(lookback)) / stdev(atrAvg, lookback);

plot a = atrStdDev;

plot h = StdDevs;
plot l = -2;