# Cup and Handle Pattern
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/lFyrdEQt/

def GiaLonNhat7to15 = highest((close[7]), 8);
def GiaLonNhat15 = highest((close[1]), 15);
def DK1 = GiaLonNhat7to15 >= GiaLonNhat15;
def DK2 = close > GiaLonNhat7to15;
def KhoiLuongLonNhat15 = highest((volume[1]), 15);
def DK3 = volume > KhoiLuongLonNhat15;
def GiaBeNhat15 = lowest((close[1]), 15);
def DK4 = (GiaBeNhat15 <= close * 0.95) and(GiaBeNhat15 >= close * 0.9);
def GiaBeNhatThang = lowest((close[15]), 30);
def DK5 = (GiaBeNhatThang <= close * 0.9) and(GiaBeNhatThang >= close * 0.8);
def DK6 = volume > 100000;
def Buy = DK1 and DK2 and DK3 and DK4 and DK5 and DK6;

assignPriceColor(if buy then Color.Green else Color.WHITE);