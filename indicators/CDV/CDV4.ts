

# Cumulative Volume Delta
#
# The length of the accumulation is user controlled.The cumulative bar
# is the sum of the deltas for the past 10 bars.Change that length to
# 252(a year in days) then plot something like AAPL.Very interesting.
#
# LongShort
# 5.7.2019

declare lower;

input length = 10;

def O = open;
def H = high;
def C = close;
def L = low;
def V = volume;
def Buying = V * (C - L) / (H - L);
def Selling = V * (H - C) / (H - L);
def Delt = buying - selling;

plot Delta = Delt;
Delta.AssignValueColor(if Delta > 0 then Color.GREEN else Color.RED);
Delta.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Delta.hide();

plot zero = 0;
zero.setDefaultColor(Color.BLUE);

plot CumulativeVolumeDelta = sum(Delta, length);
CumulativeVolumeDelta.AssignValueColor(if CumulativeVolumeDelta > 0 then Color.GREEN else Color.RED);
CumulativeVolumeDelta.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);

# End Code

