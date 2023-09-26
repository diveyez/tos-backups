#HOTZONE LINE: RSI - IV_percentile indicator
#developed by Chewie76 with help from FateOwnzYou 9 - 30 - 2020

### Global Variables ###
declare lower;
input length = 14;
input price = close;
input averageType = AverageType.WILDERS;
input showBreakoutSignals = yes;
input alertsOn = yes;

def NetChgAvg = MovingAverage(averageType, price - price[1], length);
def TotChgAvg = MovingAverage(averageType, AbsValue(price - price[1]), length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;

def RSI = (50 * (ChgRatio + 1)) * -1;
plot MiddleLine = 0;
plot TakeProfit = 60;
plot BUY = -60;
TakeProfit.SetLineWeight(1);
TakeProfit.SetDefaultColor(Color.RED);
BUY.SetLineWeight(1);
BUY.SetDefaultColor(Color.GREEN);

def vol = imp_volatility();
input TimePeriod = 252;

def data = if !isNaN(vol) then vol else vol[-1];
def hi = highest(data, TimePeriod);
def lo = lowest(data, TimePeriod);
def Percentile = ((data - lo) / (hi - lo) * 100) * -1;
def lowend = Percentile < 25;
def highend = Percentile > 50;

plot HotZone = percentile - rsi;
HotZone.SetLineWeight(1);
HotZone.SetDefaultColor(Color.MAGENTA);

AddCloud(middleline, HotZone, Color.red, Color.CURRENT);
AddCloud(takeprofit, HotZone, Color.CURRENT, Color.GREEN);


### Caution Relationship(RSI and IV) ###
plot CAUTION = if (HotZone < -45 and HotZone > -60, 1, double.nan);
#plot CAUTION = if RSIIV1 then 0 else Double.nan;
CAUTION.SetPaintingStrategy(PaintingStrategy.POINTS);
CAUTION.SetLineWeight(4);
CAUTION.SetDefaultColor(Color.YELLOW);

### HOT Relationship(RSI and IV) ###
def RSIIV2 = if HotZone <= -60 then 1 else 0;
plot HOT = if RSIIV2 then 0 else Double.nan;
HOT.SetPaintingStrategy(PaintingStrategy.POINTS);
HOT.SetLineWeight(4);
HOT.SetDefaultColor(Color.RED);

#Arrows#
plot UpSignal = if HotZone crosses above BUY then BUY else Double.NaN;
plot DownSignal = if HotZone crosses below TakeProfit then TakeProfit else Double.NaN;

UpSignal.SetHiding(!showBreakoutSignals);
DownSignal.SetHiding(!showBreakoutSignals);

UpSignal.SetDefaultColor(Color.GREEN);
DownSignal.SetDefaultColor(Color.RED);
UpSignal.SetDefaultColor(Color.UPTICK);
UpSignal.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignal.SetDefaultColor(Color.DOWNTICK);
DownSignal.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);

def condition1 = HotZone <= -60;
def condition2 = HotZone < -45 and HotZone > -60;

# Alert
Alert(alertsOn and condition1, "HOT", Alert.BAR, Sound.Chimes);
Alert(alertsOn and condition2, "CAUTION", Alert.BAR, Sound.bell);