# Diamond Volume
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/Jb0hbiRm/

input Value = 30;
def avdt = close * volume;
def spike = avdt > highest(avdt, 5)[1] and high > high[1] and close > simpleMovingAvg(close, 5) and close > open and avdt > simpleMovingAvg(avdt, 30);
def supply = avdt > avdt[1] and close < open and high > expAverage(close, 8) and expAverage(close, 8) > expAverage(close, 21);

def green = close > close[1];
def red = close < close[1];

assignPriceColor(if spike and green then color.green else if spike and red then color.dark_green else if supply and red then color.red else if supply and green then color.dark_red else color.white);


