#HOTZONE LINE UPPER: RSI - IV_percentile indicator
#developed by Chewie76 with help from FateOwnzYou 10 - 1 - 2020

### Global Variables ###
declare UPPER;
input length = 14;
input price = close;
input averageType = AverageType.WILDERS;
input showBreakoutArrows = yes;
input showHZline = yes;
input showHZ = yes;

def NetChgAvg = MovingAverage(averageType, price - price[1], length);
def TotChgAvg = MovingAverage(averageType, AbsValue(price - price[1]), length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;

def RSI = (50 * (ChgRatio + 1)) * -1;
def RSI1 = 50 * (ChgRatio + 1);

def TakeProfit = 60;
def BUY = -60;

def vol = imp_volatility();
input TimePeriod = 252;

def data = if !IsNaN(vol) then vol else vol[-1];
def hi = Highest(data, TimePeriod);
def lo = Lowest(data, TimePeriod);
def Percentile = ((data - lo) / (hi - lo) * 100) * -1;
def Percentile2 = (data - lo) / (hi - lo) * 100;
def lowend = Percentile < 25;
def highend = Percentile > 50;
def HotZone = Percentile - RSI;

### HotZone dots ###
def RSIIV1 = if (percentile2 - RSI1 >= 30 and RSI1 > 32 and RSI1 < 40, 1, Double.NaN);
plot CAUTION = if showHZ and RSIIV1 then close else Double.nan;
CAUTION.SetPaintingStrategy(PaintingStrategy.POINTS);
CAUTION.SetLineWeight(4);
CAUTION.SetDefaultColor(Color.YELLOW);

def RSIIV = if percentile2 - RSI1 >= 40 and RSI1 < 32 then 1 else 0;
plot HOT = if showHZ and RSIIV then close else Double.nan;
HOT.SetPaintingStrategy(PaintingStrategy.POINTS);
HOT.SetLineWeight(4);
HOT.SetDefaultColor(Color.RED);

### HOTZone Line dots ###
def CAUTION1 = If(HotZone < -45 and HotZone > -60, 1, Double.NaN);
plot CAUTIONLINE = if showHZline and CAUTION1 then close else Double.NaN;
CAUTIONLINE.SetPaintingStrategy(PaintingStrategy.POINTS);
CAUTIONLINE.SetLineWeight(4);
CAUTIONLINE.SetDefaultColor(Color.YELLOW);

def HOT1 = if HotZone <= -60 then 1 else 0;
plot HOTLINE = if showHZline and HOT1 then close else Double.NaN;
HOTLINE.SetPaintingStrategy(PaintingStrategy.POINTS);
HOTLINE.SetLineWeight(4);
HOTLINE.SetDefaultColor(Color.RED);

#HZ Line Arrows#
plot UpSignal = if showBreakoutArrows and HotZone crosses above BUY then BUY else Double.NaN;
plot DownSignal = if showBreakoutArrows and HotZone crosses below TakeProfit then TakeProfit else Double.NaN;
DownSignal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
UpSignal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
UpSignal.SetDefaultColor(Color.GREEN);
DownSignal.SetDefaultColor(Color.RED);
UpSignal.SetLineWeight(4);
DownSignal.SetLineWeight(4);
