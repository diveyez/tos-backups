# Source ?
# VixAlert4 WL Column - HODL
# Williams Vix Fix Formula
input pd = 22;
input bbl = 20;
input mult = 2.0;
input lb = 50;
input ph = 0.85;
input pl = 1.01;

# Downtrend Criteria

input ltLB = 40;
input mtLB = 14;
input str = 3;

def wvf = ((highest(close, pd) - low) / (highest(close, pd))) * 100;
def sDev = mult * stdev(wvf, bbl);
def midLine = SimpleMovingAvg(wvf, bbl);
def lowerBand = midLine - sDev;
def upperBand = midLine + sDev;
def rangeHigh = (highest(wvf, lb)) * ph;

#  Filtered Bar Criteria

def upRange = low > low[1] and close > high[1];
def upRange_Aggr = close > close[1] and close > open[1];

#  Filtered Criteria

def filtered = ((wvf[1] >= upperBand[1] or wvf[1] >= rangeHigh[1]) and(wvf < upperBand and wvf < rangeHigh));
def filtered_Aggr = (wvf[1] >= upperBand[1] or wvf[1] >= rangeHigh[1]);

# Alerts Criteria

def alert1 = wvf >= upperBand or wvf >= rangeHigh;
def alert2 = (wvf[1] >= upperBand[1] or wvf[1] >= rangeHigh[1]) and(wvf < upperBand and wvf < rangeHigh);
def alert3 = upRange and close > close[str] and(close < close[ltLB] or close < close[mtLB]) and filtered;
def alert4 = upRange_Aggr and close > close[str] and(close < close[ltLB] or close < close[mtLB]) and filtered_Aggr;

AssignbackgroundColor(if alert4 within 2 bars then color.orange else color.Dark_Gray);

AddLabel(yes, if (Alert4) within 2 bars  then "Alert 4 Day" + " "
else " ", color.black);