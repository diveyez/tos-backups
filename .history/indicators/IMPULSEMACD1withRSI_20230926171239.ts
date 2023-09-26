# MACD_VXI & Impulse + RSI
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/WMxf5UKW-MACD-VXI/
# Modified by @diveyez and ChatGPT
declare lower;
#RSI
input length = 14;
input price = OHLC4;
input over_Bought = 85;
input over_Sold = 15;
input averageType = AverageType.WILDERS;
input showBreakoutSignals = yes;
# MACD
input source = close;
input fastLength = 13;
input slowLength = 21;
input signalLength = 8;
def fastMA = ExpAverage(source, fastLength);
def slowMA = ExpAverage(source, slowLength);
def macd = fastMA - slowMA;
def signal = SimpleMovingAvg(macd, signalLength);
def hist = macd - signal;
# Calculate RSI
def NetChgAvg = MovingAverage(AverageType.EXPONENTIAL, price - price[1], length);
def TotChgAvg = MovingAverage(AverageType.EXPONENTIAL, AbsValue(price - price[1]), length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
# Calculate Impulse MACD
#def fastLength = 12;
#def slowLength = 26;
def MACDLength = 9;
#def MACD = MovingAverage(AverageType.EXPONENTIAL, price, fastLength) - MovingAverage(AverageType.EXPONENTIAL, price, slowLength);
#def Signal = MovingAverage(AverageType.EXPONENTIAL, MACD, MACDLength);
#def Hist = MACD - Signal;
def ImpulseMACD = if Hist > 0 then 1 else if Hist < 0 then - 1 else 0;

# Calculate Bollinger Bands Keltner SMI Histogram
def ATRLength = 10;
def ATR = MovingAverage(AverageType.WILDERS, TrueRange(high, close, low), ATRLength);
def upperBand = KeltnerChannels("average type" = AverageType.SIMPLE, "length" = 20).UpperBand;
def lowerBand = KeltnerChannels("average type" = AverageType.SIMPLE, "length" = 20).LowerBand;
def midline = (upperBand + lowerBand) / 2;
def SMI = if close > midline then 1 else if close < midline then - 1 else 0;
def BollingerBandsKeltnerSMI = SMI * ((close - lowerBand) / (upperBand - lowerBand));
plot RSI = 50 * (ChgRatio + 1);
plot diff = Hist;
plot signal1 = Signal;
plot signal2 = MACD;
plot ZeroLine = 0;

plot UpSignal = if diff crosses above ZeroLine then ZeroLine else Double.NaN;
plot DownSignal = if diff crosses below ZeroLine then ZeroLine else Double.NaN;

diff.SetDefaultColor(GetColor(9));
diff.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
diff.SetLineWeight(3);

signal1.SetDefaultColor(GetColor(0));
signal2.SetDefaultColor(GetColor(1));

UpSignal.SetDefaultColor(Color.UPTICK);
UpSignal.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignal.SetDefaultColor(Color.DOWNTICK);
DownSignal.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);

# Plot custom RSI Indicator
plot Indicator = RSI;
plot Impulse = ImpulseMACD * 50;
plot BBKS = BollingerBandsKeltnerSMI * 50;
Indicator.AssignValueColor(if RSI > RSI[1] then Color.GREEN else Color.RED);
Impulse.AssignValueColor(if Impulse > Impulse[1] then Color.GREEN else Color.RED);
BBKS.AssignValueColor(if BBKS > BBKS[1] then Color.GREEN else Color.RED);


plot OverSold = over_Sold;
plot OverBought = over_Bought;
plot UpSignal2 = if RSI crosses above OverSold then OverSold else Double.NaN;
plot DownSignal2 = if RSI crosses below OverBought then OverBought else Double.NaN;

UpSignal2.SetHiding(!showBreakoutSignals);
DownSignal2.SetHiding(!showBreakoutSignals);

RSI.DefineColor("OverBought", GetColor(5));
RSI.DefineColor("Normal", GetColor(7));
RSI.DefineColor("OverSold", GetColor(1));
RSI.AssignValueColor(if RSI > over_Bought then RSI.Color("OverBought") else if RSI < over_Sold then RSI.Color("OverSold") else RSI.Color("Normal"));
OverSold.SetDefaultColor(GetColor(8));
OverBought.SetDefaultColor(GetColor(8));
UpSignal2.SetDefaultColor(Color.UPTICK);
UpSignal2.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignal2.SetDefaultColor(Color.DOWNTICK);
DownSignal2.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);