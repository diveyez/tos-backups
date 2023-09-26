#AK Trend ID by AlgoKid https://www.tradingview.com/v/E9LpD2M9/

input input1 = 3;
input input2 = 8;
input price = close;

def fastmaa = MovAvgExponential(price, input1);
def fastmab = MovAvgExponential(price, input2);
def bspread = (fastmaa - fastmab) * 1.001;

plot zeroLine = 0;
zeroLine.SetDefaultColor(GetColor(7));

plot bsp = bspread;
bsp.AssignValueColor(if bspread > zeroLine then Color.LIGHT_GREEN else Color.LIGHT_RED);

assignpriceColor(if bspread > zeroline then color.light_green else color.red);