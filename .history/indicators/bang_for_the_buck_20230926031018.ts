# Bang For The Buck
# Long Signal Only
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/t9T0Y6Gh/

def BFTB = ((10000 / close) * (simpleMovingAvg(atr(1), 200)) / 100);

# 52 Week High & Low
def High52 = highest(BFTB, 250);
def Low52 = lowest(BFTB, 250);

def red = absValue(BFTB - High52[1]) > BFTB;
def white = BFTB < High52;

assignPriceColor(if absValue(BFTB - High52[1]) > BFTB then Color.Red else if BFTB < High52 then Color.WHITE else Color.Blue);


