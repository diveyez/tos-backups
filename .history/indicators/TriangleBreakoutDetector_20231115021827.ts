# Triangle Breakout Detector
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/Lz8yCKWd/

def Max60 = highest(close[1], 60);
def Min60 = lowest(close[1], 60);
def DK0 = Max60 < 1.15 * Min60;
def Max40 = highest(close[1], 40);
def Min40 = lowest(close[1], 40);
def DK1 = Max40 < 1.1 * Min40;
def Max20 = highest(close[1], 20);
def Min20 = lowest(close[1], 20);
def DK2 = Max20 < 1.07 * Min20;
def Max5 = highest(close[1], 5);
def Min5 = lowest(close[1], 5);
def DK3 = Max5 < 1.03 * Min5;
def Tyletang = (close - close[1]) / close[1];
def DK4 = Tyletang >= 0.02;
def Gianhonhat = (close + close[1] + close[2] + close[3] + close[4] + close[5]) / 6;
def DK5 = Gianhonhat >= 3;
def Buy = DK1 and DK2 and DK3 and DK4;

assignPriceColor(if Buy then Color.GREEN else Color.WHITE);