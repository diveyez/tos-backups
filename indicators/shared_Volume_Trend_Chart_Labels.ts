def O = open;
def H = high;
def C = close;
def L = low;
def V = volume;

def SV = V * (H - C) / (H - L);
def BV = V * (C - L) / (H - L);

AddLabel(yes, "Buyer Vol Strong ", if high > high[1] and low > low[1] and BV * 1.05 > SV then Color.GREEN else color.GRAY);

AddLabel(yes, "Seller Vol Strong", if high < high[1] and low < low[1] and SV * 1.05 > BV then Color.MAGENTA else color.GRAY);


AddLabel(yes, "Price Strong ", if high > high[1] and high[1] > high[2] and low > low[1] and low[1] > low[2] then Color.GREEN else color.GRAY);

AddLabel(yes, "Price Weak", if high < high[1] and high[1] < high[2] and low < low[1] and low[1] < low[2] then Color.MAGENTA else color.GRAY);


declare upper;