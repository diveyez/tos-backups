# Chaloke Trend System
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/WcA9PpF7/

input p1 = 9;
input p2 = 15;
input p3 = 24;
input p4 = 5;
input p5 = 5;

def Sm = 2 * P5 / 10;
def ATRX = Sm * atr(P4);
def S = expAverage(close, P1) - ATRX;
def M = expAverage(close, P2) - ATRX;
def Lg = expAverage(close, P3) - ATRX;

def Sht = if (close == highest(close, 3), S, expAverage(close[1], P1) - ATRX);
def Mid = if (close == highest(close, 3), M, expAverage(close[1], P2) - ATRX);
def Lng = if (close == highest(close, 3), Lg, expAverage(close[1], P3) - ATRX);

plot line1 = Sht;
plot line2 = Mid;
plot line3 = Lng;

line1.setDefaultColor(getColor(0));
line2.setDefaultColor(getColor(1));
line3.setDefaultColor(getColor(3));
