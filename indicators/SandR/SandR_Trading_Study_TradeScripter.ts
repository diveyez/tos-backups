#Green arrows pointing down are price highs.
#Red arrows pointing up are price lows
#Price highs and lows are determined by a few different methods.
#One method is to assume a price high or low if the length of the bar is greater than the average
#bar length, plus one standard deviation.In other words, if there is an unusually big price
#move on one bar, a price high or low is assumed.
#A price high and a price low may not be a trend peak or bottom.
#Many of the price high and low signals are one bar early.Take that into account.
#As soon as you get an signal, you must decide whether it's trend peak/bottom or not
#If you think it's not the end of a trend place an exit order to take profit just over the current high
#or under the current low.If you don't get a fill almost immediately on the next bar, you must
#adjust your exit to a smaller profit within seconds, or use a market order to take profit.
#If the price high or low is a trend peak or bottom, the price probably won't go higher for a peak
#or lower for the bottom.So you must decide on a strategy for taking profits.
#Whether you take profit immediately on a signal, or wait for the next bar, either way you will loose out on some
#profit.You must decide when it's better to take profit, at the signal, or just after the signal.

#There is often a price high when the price first hits a prior high after being under the high
#for a while.That potential price high is shown by a magenta arrow down over the high of the bar.
#A potential price low, bowncing off support of a prior low, is a blue arrow.

#Stop losses are shown by squares.The stop losses turn out to also be points of price highs
#and lows.A long stop loss is show by a red square.The long stop loss is often a price low however.
#You must use your discretion on how to trade it.
#A price high signal, and a stop loss signal often occur on the same bar.That may be a double
#confirmation that the price is at a high.You must use your discretion.

#Prior highs and low are also shown  The prior highs and lows are the "Stepped" horizontal lines.
#So you can keep track of recent prior highs and lows.

#I have not back - tested this study.I have no idea if it is any good or not.

input length = 10;

def o = open;
def c = close;
def h = high;
def l = low;

def hh = h > h[1];
def ll = l < l[1];

def ClsUp = c > o;
def ClsDwn = c < o;

def BarLngth = h - l;
def AvgBarLngth = Average(BarLngth, 20);
def Threshhold = AvgBarLngth + StDev(BarLngth, 20);

def ClsHigher = c > c[1];
def ClsLower = c < c[1];

def HiestHi = Highest(close[3], length);
def LwestLw = Lowest(close[3], length);

rec LastHi = if HiestHi > HiestHi[1] then HiestHi[1] else LastHi[1];
rec LastLw = if LwestLw < LwestLw[1] then LwestLw[1] else LastLw[1];

def ClsOvrHi = close > HiestHi;
def ClsUndrLw = close < LwestLw;

def ClsUndrLastHi = close < LastHi;
def ClsOvrLastLw = close > LastLw;

def Hi1 = !ClsOvrHi[2] and ClsOvrHi[1] and ClsOvrHi and ClsHigher;
def Hi2 = BarLngth > Threshhold and ClsUp;

def Lw1 = !ClsUndrLw[2] and ClsUndrLw[1] and ClsUndrLw and ClsLower;
def Lw2 = BarLngth > Threshhold and ClsDwn;

def HiSig = Hi1 or Hi2;
def LwSig = Lw1 or Lw2;

def LwOvrSupport = l > LwestLw;
def HiUndrSupport = h < HiestHi;

plot PriceHigh = if HiSig then high else Double.NaN;
PriceHigh.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
PriceHigh.SetDefaultColor(Color.UPTICK);

plot PriceLow = if LwSig then low else Double.NaN;
PriceLow.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
PriceLow.SetDefaultColor(Color.RED);

def BreaksSpprt = LwOvrSupport[3] and LwOvrSupport[2] and LwOvrSupport[1] and l <= LwestLw;
def BreaksRzist = HiUndrSupport[3] and HiUndrSupport[2] and HiUndrSupport[1] and h > HiestHi;

plot FirstSupportBreak = if BreaksSpprt then l else Double.NaN;
FirstSupportBreak.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
FirstSupportBreak.SetDefaultColor(Color.BLUE);

plot FirstResistanceBreak = if BreaksRzist then h else Double.NaN;
FirstResistanceBreak.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
FirstResistanceBreak.SetDefaultColor(Color.MAGENTA);

plot HighestHigh = HiestHi;
HighestHigh.SetLineWeight(2);
HighestHigh.SetDefaultColor(Color.LIGHT_RED);

plot LowestLow = LwestLw;
LowestLow.SetLineWeight(2);
LowestLow.SetDefaultColor(Color.LIGHT_GREEN);

plot LastHigh = LastHi;
LastHigh.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot LastLow = LastLw;
LastLow.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);

plot LongStopLossHit = if !ClsUndrLastHi[1] and ClsUndrLastHi then l else Double.NaN;
LongStopLossHit.SetPaintingStrategy(PaintingStrategy.LINE_VS_SQUARES);
LongStopLossHit.SetDefaultColor(Color.GREEN);

plot ShortStopLossHit = if !ClsOvrLastLw[1] and ClsOvrLastLw then h else Double.NaN;
;
ShortStopLossHit.SetPaintingStrategy(PaintingStrategy.LINE_VS_SQUARES);
ShortStopLossHit.SetDefaultColor(Color.RED);