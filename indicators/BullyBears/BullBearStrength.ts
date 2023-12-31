# Bull and Bear Strength
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/ZFfiy0mr/

declare lower;

def Mdb = simpleMovingAvg(close, 20);
def bull = high - expAverage(close, 13);
def bear = low - expAverage(close, 13);
def upLine = close - Mdb;
def downLine = -(bull + bear);

plot up = upLine;
plot down = downLine;

up.SetDefaultColor(GetColor(6));
down.SetDefaultColor(GetColor(5));

plot ZeroLine = 0;
ZeroLine.SetDefaultColor(GetColor(3));