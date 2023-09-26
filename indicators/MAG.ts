declare upper;

input atrreversal = 2.0;

def priceh = MovingAverage(AverageType.EXPONENTIAL, high, 5);
def pricel = MovingAverage(AverageType.EXPONENTIAL, low, 5);

def EIL = ZigZagHighLow("price h" = priceh, "price l" = pricel, "percentage reversal" = .01, "absolute reversal" = .05, "atr length" = 5, "atr reversal" = atrreversal).lastL;
def EIH = ZigZagHighLow("price h" = priceh, "price l" = pricel, "percentage reversal" = .01, "absolute reversal" = .05, "atr length" = 5, "atr reversal" = atrreversal).lastH;

def tenkan_period = 9;
def kijun_period = 26;
def Kijun = (Highest(high, kijun_period) + Lowest(low, kijun_period)) / 2;
def avgPerc = ((Kijun - close) / Kijun) * 100;

plot signal = !isNaN(EIL) within 15 bars and low < Kijun and avgPerc < 15 and avgPerc > 0 and avgPerc[1] < avgPerc;
signal.setDefaultColor(color.white);

plot KijunCross = signal within 10 bars and Crosses(close, kijun, CrossingDirection.ABOVE);
kijuncross.setDefaultColor(color.white);

def overKijun = (kijunCross within 10 bars or overKijun[1] == 1) and low > kijun;
plot overKijun1 = overKijun;
overKijun1.setDefaultcolor(color.white);

plot signaldown = !isNAN(EIH);
signaldown.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN); AddLabel(!isNAN(EIH), "Short", color.white);

AddChartBubble(SignalDown, high, "Short", Color.Red, yes);

plot signalrevBot = !isNaN(EIL);
signalrevBot.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);

AddChartBubble(Signalrevbot, low, "Long", Color.green, no);

input usealerts = yes;
alert(usealerts and signaldown[1] == 1, "Short", alert.bar, sound.chimes);
alert(usealerts and signalrevbot[1] == 1, "Long", alert.bar, sound.chimes);