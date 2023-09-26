#HOTZONE - RSI: RSI - IV_percentile indicator
#developed by Chewie76 9 - 30 - 2020
### Global Variables ###
input length = 10;
input over_Bought2 = 80;
input over_Bought = 70;
input over_Sold = 30;
input over_Sold2 = 20;
input price = close;
input averageType = AverageType.WILDERS;
input showBreakoutSignals = yes;

### RSI ###
def NetChgAvg = MovingAverage(averageType, price - price[1], length);
def TotChgAvg = MovingAverage(averageType, AbsValue(price - price[1]), length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;

DEF RSI = 50 * (ChgRatio + 1);
def MiddleLine = 50;

def OverSold = over_Sold;
def OverBought = over_Bought;
def UpSignal = if RSI crosses above OverSold then 1 else 0;
def DownSignal = if RSI crosses below OverBought then 2 else 0;

### IVPercentile ###
def vol = imp_volatility();
input TimePeriod = 252;

def data = if !isNaN(vol) then vol else vol[-1];
def hi = highest(data, TimePeriod);
def lo = lowest(data, TimePeriod);
def Percentile = (data - lo) / (hi - lo) * 100;
def lowend = Percentile < 25;
def highend = Percentile > 50;

input over_Bought1 = 98;
input over_Sold1 = 2;

### Squeeze Relationship(RSI and IV) ###
def RSIIV = if percentile - RSI >= 40 and RSI < 32 then 1 else 0;
def HOT = if RSIIV then 50 else Double.nan;

def RSIIV1 = if (percentile - RSI >= 30 and RSI > 32 and RSI < 40, 1, Double.NaN);
def CAUTION = if RSIIV1 then 50 else Double.nan;


AssignBackgroundColor(if DownSignal then color.RED else if Upsignal then color.GREEN else color.black);

AddLabel(yes, if Upsignal then "UP" else if Downsignal then "DOWN" else if RSIIV then “HOT” else if RSIIV1 then "CAUTION" else " ", if UPsignal then color.green else if Downsignal then color.red else if RSIIV then color.RED else if RSIIV1 then color.YELLOW else Color.black);


