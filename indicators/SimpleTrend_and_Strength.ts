# Simple Trend and Strength

declare lower;

input p = 20;
def trend = expAverage(close, p);
def strength = close - trend;

plot line = strength;
plot ZeroLine = 0;

line.AssignValueColor(Color.YELLOW);
ZeroLine.AssignValueColor(Color.MAGENTA);