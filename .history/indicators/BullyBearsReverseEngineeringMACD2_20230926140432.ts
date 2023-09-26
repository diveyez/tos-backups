# 3in1 - MACDSMI
## Written by @diveyez
## https://github.com/diveyez
## Licensed under MIT License on https://github.com
## This is a free windicator for the people who appreciate my work for workspaces in ThinkOrSwim
## Big Thanks to KamakaziTrading, R2R Analytics / Trading, and TitanTrades
## Without the members in these communities this journey would never have reached this level
################################
################################
# Functions as a trend indicator, momentum indicator, and a squeeze indicator all in one.
# This is simply a Custom RSI Indicator with Impulse MACD and Bollinger Bands Keltner SMI Histogram
# Will regularly update this indicator with changes to improve the performance and functionality
####################################################################################################
####################################################################################################
# Place this in your lower
declare lower;

# Define inputs
input length = 14;
input price = OHLC4;
input over_Bought = 85;
input over_Sold = 15;
input averageType = AverageType.WILDERS;
input showBreakoutSignals = yes;

# Calculate RSI
def NetChgAvg = MovingAverage(AverageType.EXPONENTIAL, price - price[1], length);
def TotChgAvg = MovingAverage(AverageType.EXPONENTIAL, AbsValue(price - price[1]), length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
plot RSI = 50 * (ChgRatio + 1);

# Calculate Impulse MACD
def fastLength = 12;
def slowLength = 26;
def MACDLength = 9;
def MACD = MovingAverage(AverageType.EXPONENTIAL, price, fastLength) - MovingAverage(AverageType.EXPONENTIAL, price, slowLength);
def Signal = MovingAverage(AverageType.EXPONENTIAL, MACD, MACDLength);
def Hist = MACD - Signal;
def ImpulseMACD = if Hist > 0 then 1 else if Hist < 0 then - 1 else 0;

# Calculate Bollinger Bands Keltner SMI Histogram
def ATRLength = 10;
def ATR = MovingAverage(AverageType.WILDERS, TrueRange(high, close, low), ATRLength);
def upperBand = KeltnerChannels("average type" = AverageType.SIMPLE, "length" = 20).UpperBand;
def lowerBand = KeltnerChannels("average type" = AverageType.SIMPLE, "length" = 20).LowerBand;
def midline = (upperBand + lowerBand) / 2;
def SMI = if close > midline then 1 else if close < midline then - 1 else 0;
def BollingerBandsKeltnerSMI = SMI * ((close - lowerBand) / (upperBand - lowerBand));

# Plot custom RSI Indicator
plot Indicator = RSI;
plot Impulse = ImpulseMACD * 50;
plot BBKS = BollingerBandsKeltnerSMI * 50;
Indicator.AssignValueColor(if RSI > RSI[1] then Color.GREEN else Color.RED);
Impulse.AssignValueColor(if Impulse > Impulse[1] then Color.GREEN else Color.RED);
BBKS.AssignValueColor(if BBKS > BBKS[1] then Color.GREEN else Color.RED);


plot OverSold = over_Sold;
plot OverBought = over_Bought;
plot UpSignal = if RSI crosses above OverSold then OverSold else Double.NaN;
plot DownSignal = if RSI crosses below OverBought then OverBought else Double.NaN;

UpSignal.SetHiding(!showBreakoutSignals);
DownSignal.SetHiding(!showBreakoutSignals);

RSI.DefineColor("OverBought", GetColor(5));
RSI.DefineColor("Normal", GetColor(7));
RSI.DefineColor("OverSold", GetColor(1));
RSI.AssignValueColor(if RSI > over_Bought then RSI.color("OverBought") else if RSI < over_Sold then RSI.color("OverSold") else RSI.color("Normal"));
OverSold.SetDefaultColor(GetColor(8));
OverBought.SetDefaultColor(GetColor(8));
UpSignal.SetDefaultColor(Color.UPTICK);
UpSignal.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignal.SetDefaultColor(Color.DOWNTICK);
DownSignal.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);