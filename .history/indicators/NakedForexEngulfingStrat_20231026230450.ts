# Naked Forex's Engulfing Strategy
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/cC1gFKBJ-Naked-Forex-Trading-Strategy/

input roomToTheLeftPeriod = 7;
input largestCandlePeriod = 7;

def higherHigh = high > high[1];
def bearishEngulfing = close[1] > open[1] and open > close and open >= close[1] and open[1] >= close and open - close > close[1] - open[1];
def roomToTheLeftRising = IsAscending(high, roomToTheLeftPeriod);
def largestCandle = max(high - low, largestCandlePeriod);

def lowerLow = low < low[1];
def bullishEngulfing = open[1] > close[1] and close > open and close >= open[1] and close[1] >= open and close - open and open[1] - close[1];
def roomToTheLeftFalling = IsDescending(low, roomToTheLeftPeriod);

assignPriceColor(if higherHigh and bearishEngulfing and roomToTheLeftRising and largestCandle then color.Yellow else if lowerLow and bullishEngulfing and roomToTheLeftFalling and largestCandle then color.white else color.black);