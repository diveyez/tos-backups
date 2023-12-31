# CL Trend Visualization
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/J9sIKczO-CL-Trend-Visualization/

declare lower;

input length1 = 14;
input length2 = 50;
input length3 = 100;
input length4 = 200;
input length5 = 500;
input src = close;

def ma1 = SimpleMovingAvg(src, length1);
def cci1 = (src - ma1) / (0.015 * StDev(src, length1));
def ma2 = SimpleMovingAvg(src, length2);
def cci2 = (src - ma2) / (0.015 * StDev(src, length2));
def ma3 = SimpleMovingAvg(src, length3);
def cci3 = (src - ma3) / (0.015 * StDev(src, length3));
def ma4 = SimpleMovingAvg(src, length4);
def cci4 = (src - ma4) / (0.015 * StDev(src, length4));
def ma5 = SimpleMovingAvg(src, length5);
def cci5 = (src - ma5) / (0.015 * StDev(src, length5));

plot ZeroLine = 0;
plot line1 = cci1;
plot line2 = cci2;
plot line3 = cci3;
plot line4 = cci4;
plot line5 = cci5;