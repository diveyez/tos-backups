#HOTZONE - RSI: RSI - IV_percentile indicator
#developed by Chewie76 9 - 30 - 2020
### Global Variables ###
declare lower;
input length = 14;
input over_Bought2 = 80;
input over_Bought = 70;
input over_Sold = 30;
input over_Sold2 = 20;
input price = close;
input averageType = AverageType.WILDERS;
input showBreakoutSignals = yes;
input alertsOn = yes;
input ChartBubblesOn = yes;

### RSI ###
def NetChgAvg = MovingAverage(averageType, price - price[1], length);
def TotChgAvg = MovingAverage(averageType, AbsValue(price - price[1]), length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;

plot RSI = 50 * (ChgRatio + 1);
plot MiddleLine = 50;
Middleline.SetDefaultColor(Color.YELLOW);
RSI.SetLineWeight(2);

plot OverSold = over_Sold;
plot OverBought = over_Bought;
plot UpSignal = if RSI crosses above OverSold then OverSold else Double.NaN;
plot DownSignal = if RSI crosses below OverBought then OverBought else Double.NaN;

AddCloud(Over_Bought2, OverBought, Color.dark_RED, Color.CURRENT);
AddCloud(OverSold, Over_Sold2, Color.dark_GREEN, Color.CURRENT);

UpSignal.SetHiding(!showBreakoutSignals);
DownSignal.SetHiding(!showBreakoutSignals);

RSI.DefineColor("OverBought", color.red);
RSI.DefineColor("Normal", GetColor(9));
RSI.DefineColor("OverSold", color.green);
RSI.AssignValueColor(if RSI > over_Bought then RSI.Color("OverBought") else if RSI < over_Sold then RSI.Color("OverSold") else RSI.Color("Normal"));
OverSold.SetDefaultColor(color.green);
OverBought.SetDefaultColor(color.red);
UpSignal.SetDefaultColor(Color.UPTICK);
UpSignal.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignal.SetDefaultColor(Color.DOWNTICK);
DownSignal.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);

AddCloud(RSI, OverBought, Color.RED, Color.CURRENT);
AddCloud(OverSold, RSI, Color.GREEN, Color.CURRENT);

### IVPercentile ###
def vol = imp_volatility();
input TimePeriod = 252;

def data = if !isNaN(vol) then vol else vol[-1];
def hi = highest(data, TimePeriod);
def lo = lowest(data, TimePeriod);
plot Percentile = (data - lo) / (hi - lo) * 100;
def lowend = Percentile < 25;
def highend = Percentile > 50;

input over_Bought1 = 98;
input over_Sold1 = 2;

Percentile.DefineColor("OverBought", Color.red);
Percentile.DefineColor("Normal", color.magenta);
Percentile.DefineColor("OverSold", Color.GREEN);
Percentile.AssignValueColor(if Percentile > over_Bought1 then Percentile.color("OverBought") else if Percentile < over_Sold1 then Percentile.color("OverSold") else Percentile.color("Normal"));

AddCloud(percentile, rsi, Color.RED, Color.CURRENT);

### Squeeze Relationship(RSI and IV) ###
def RSIIV = if percentile - RSI >= 40 and RSI < 32 then 1 else 0;
plot HOT = if RSIIV then 50 else Double.nan;
HOT.SetPaintingStrategy(PaintingStrategy.POINTS);
HOT.SetLineWeight(4);
HOT.SetDefaultColor(Color.RED);

def RSIIV1 = if (percentile - RSI >= 30 and RSI > 32 and RSI < 40, 1, Double.NaN);
plot CAUTION = if RSIIV1 then 50 else Double.nan;
CAUTION.SetPaintingStrategy(PaintingStrategy.POINTS);
CAUTION.SetLineWeight(4);
CAUTION.SetDefaultColor(Color.YELLOW);

#Label

def bullish = if RSI > MiddleLine then 1 else 0;
def bearish = if RSI < MiddleLine then 1 else 0;

AddLabel(ChartBubblesOn, if bullish then "BULLISH" else if bearish then "BEARISH" else if RSI > 100 then "hi" else "low", if bullish then color.green else if bearish then color.red else color.black);


def condition1 = percentile - RSI >= 40 and RSI < 32;
def condition2 = percentile - RSI >= 30 and RSI > 32 and RSI < 40;

# Alert
Alert(alertsOn and condition1, "HOT", Alert.BAR, Sound.Chimes);
Alert(alertsOn and condition2, "CAUTION", Alert.BAR, Sound.bell);