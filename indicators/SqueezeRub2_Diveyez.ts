# BB Squeeze
# The original concepts, not the "TTM_Sqz"
# Cause this little bad indicator actually show you compression popping
# Written by diveyez the internet and CHATGPT

declare lower; # shows up on bottom
input Length = 20; # Length for Avg True Range & Std.Dev Calcs
input Price = ohlc4; # type of price to use
input minPriceMove = 1; # for scaling
input priceIncrement = 0.01;
input nK = 1.5; # Keltner Channel ATRs from Average
input nBB = 3; # Bollinger Band Std.Devs.from Average
input AlertLine = 1; # BBS_Index level at which to issue alerts
input SqueezeOnColor = 2;
input SqueezeOffColor = 6; # scaling factor:
def LHMult = If(priceIncrement <> 0, (minPriceMove / priceIncrement), 0); # Average True Range
def ATR = Average(TrueRange(high, close, low), Length);# Standard Deviation
def SDev = StDev(Price, Length); # -- Calculate Bollinger Band Squeeze Indicator--# for alert
def Denom = (nK * ATR);
def BBS_Ind = If(Denom <> 0, ((nBB * SDev) / Denom), 0); # -- Plot the Index & Alert Line-------------------------
    plot BBS_Index = 0;
BBS_Index.AssignValueColor(if BBS_Ind < AlertLine then Color.WHITE else Color.RED);
BBS_Index.SetStyle(4);
BBS_Index.SetLineWeight(2);
# --------------------------------------------------------
# --Plot delta of price from Donchian mid line----------
# Inertia = LinearRegValue
def LinearRegValue = Inertia(price - ((Highest(high, Length) + Lowest(low, Length)) / 2 + ExpAverage(close, Length)) / 2, Length); #Plot the Green Values
def LRVGreens = if (LinearRegValue >= 0, LinearRegValue, 0);
plot BBSqueeze_Pos = LRVGreens * LHMult;
BBSqueeze_Pos.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
BBSqueeze_Pos.assignValueColor(if LRVGreens > LRVGreens[1] then Color.Green else Color.Dark_Green);
BBSqueeze_Pos.SetLineWeight(2);
#Plot the Red Values
def LRVReds = if (LinearRegValue < 0, LinearRegValue, 0);
plot BBSqueeze_Neg = LRVReds * LHMult;
BBSqueeze_Neg.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
BBSqueeze_Neg.assignValueColor(if LRVReds < LRVReds[1] then Color.Red else Color.Dark_Red);
BBSqueeze_Neg.SetLineWeight(2); #Show Alert Dots
