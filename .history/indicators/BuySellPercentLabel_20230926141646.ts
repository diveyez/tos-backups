#hint: Buy_Sell_Percent_Label - Created by @uptwobucks.This Volume Label measures the percentage of buys and sells live.Wait for the buys to outnumber the sells(Turns Green) then make your decision.

declare upper;

input Show_Labels = yes;

def O = open;
def H = high;
def C = close;
def L = low;
def V = volume;
def Buying = V * (C - L) / (H - L);
def Selling = V * (H - C) / (H - L);
def OL = open[1];
def HL = high[1];
def CL = close[1];
def LL = low[1];
def VL = volume[1];
def LBuying = VL * (CL - LL) / (HL - LL);
def LSelling = VL * (HL - CL) / (HL - LL);
def totVol = Round(Buying, 0) + Round(Selling, 0);
def buyPercent = (Round(Buying, 0) / totVol) * 100;
def sellPercent = (Round(Selling, 0) / totVol) * 100;

AddLabel(Show_Labels, "Total Vol: " + volume(period = AggregationPeriod.DAY), Color.WHITE);

#Volume of Current Bar
AddLabel(yes, "CurrentBar Vol: " + volume, Color.LIGHT_GREEN);

#Volume of the Last Bar
AddLabel(yes, "LastBar Vol: " + volume[1], Color.LIGHT_ORANGE);

AddLabel(Show_Labels, "  Buy %: " + Round(Buying, 0) + " -- " + Round(buyPercent, 0) + "%", if Buying > Selling then Color.LIGHT_GREEN else Color.WHITE);

AddLabel(Show_Labels, "  Sell %: " + Round(Selling, 0) + " -- " + Round(sellPercent, 0) + "%", if Selling > Buying then Color.LIGHT_RED else Color.WHITE);