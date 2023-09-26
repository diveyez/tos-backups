# Cumulative Volume Delta with Normalized Code
# tomsk
# 1.7.2020

# Cumulative Volume Delta
#
# The length of the accumulation is user controlled.The cumulative bar
# is the sum of the deltas for the past 10 bars.Change that length to
# 252(a year in days) then plot something like AAPL.Very interesting.
#
# LongShort
# 5.7.2019

declare lower;

script normalizePlot {
    input data = close;
    input newRngMin = -1;
    input newRngMax = 1;
    def hhData = HighestAll(data);
    def llData = LowestAll(data);
    plot nr = (((newRngMax - newRngMin) * (data - llData)) / (hhData - llData)) + newRngMin;
}

input length = 10;

def O = open;
def H = high;
def C = close;
def L = low;
def V = volume;
def Buying = V * (C - L) / (H - L);
def Selling = V * (H - C) / (H - L);
def Delt = buying - selling;

plot CumulativeVolumeDelta = normalizePlot(sum(Delt, length), -40, 40);
CumulativeVolumeDelta.AssignValueColor(if CumulativeVolumeDelta > 0 then Color.GREEN else Color.RED);
CumulativeVolumeDelta.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);

plot zero = 0;
Zero.SetDefaultColor(GetColor(5));
# End Cumulative Volume Delta with Normalized Code