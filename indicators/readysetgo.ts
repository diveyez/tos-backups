# Ready Set Go
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/XA6kskYR-UCS-Ready-Set-Go/

declare lower;

input length = 21;
def tr = Max(close[1], high) - Min(close[1], low);
def x = sum(tr, length);
def a = highest(high, length);
def b = lowest(low, length);

def RSG = 100 * log(x / (a - b)) / log(length);
plot line1 = RSG;

plot h = 61.8;
plot l = 25;
plot m = 38.2;

h.setDefaultColor(getColor(0));
l.setDefaultColor(getColor(4));
m.setDefaultColor(getColor(3));