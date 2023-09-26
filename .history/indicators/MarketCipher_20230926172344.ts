declare lower;
#DMI_CIPHER
input length = 14;
#input length2 = 20;
input paintBars = yes;
input averageType = AverageType.WILDERS;
plot z = 0;
plot up = 30;
plot dn = -30;

def diPlus = DMI(length, averageType)."DI+";
def diMinus = DMI(length, averageType)."DI-";

def Osc = diPlus - diMinus;
def o = SimpleMovingAvg(Osc, 3);
plot vwap = simpleMovingAvg(osc - o);

AddCloud(vwap, 0, Color.yellow, Color.yellow);
AddCloud(vwap, 0, Color.yellow, Color.yellow);
AddCloud(Osc, 0, Color.CYAN, Color.CYAN);
AddCloud(Osc, o, Color.WHITE, Color.WHITE);
#

#input fastLength = 4;
#input priceW = close;
#input slowLength = 8;
input averageTypeW = AverageType.SIMPLE;

def WHITE2 = MovingAverage(averageTypeW, close[-1], 2) - MovingAverage(averageTypeW, close[1], 4);#

#MFO
input lengthM = 40;

def division = (high - low[1]) + (high[1] - low);
def multiplier;
if high < low[1] {
    multiplier = -1;
} else if low > high[1] {
    multiplier = 1;
} else if division == 0 {
    multiplier = 0;
} else {
    multiplier = ((high - low[1]) - (high[1] - low)) / division;
}
#45 *
    def MFO = 70 * Sum(multiplier * volume, lengthM) / Sum(volume, lengthM) - 3;#50
#mfo.setDefaultColor(color.gray);


plot ZeroLine = -40;# - 40
ZeroLine.SetLineWeight(4);
ZeroLine.SetDefaultColor(GetColor(7));
ZeroLine.AssignValueColor(if MFO > 0 then Color.DARK_GREEN else Color.RED);

#addcloud(mfo, 50, color.yellow, color.yellow);
#addcloud(mfo, 50, color.green, color.red);

#AddCloud(MFO, 0, Color.GREEN, Color.RED);
#AddCloud(MFO, 0, Color.GREEN, Color.RED);
##

input price = close;
input lengthZ = 20;
input ZavgLength = 20;

#Initialize values
def oneSD = StDev(price, lengthZ);
def avgClose = SimpleMovingAvg(price, lengthZ);
def ofoneSD = oneSD * price[1];
def Zscorevalue = ((price - avgClose) / oneSD);
def avgZv = Average(Zscorevalue, 20);

#Compute and plot Z - Score
def Zscore = 2 * ((price - avgClose) / oneSD);
#Zscore.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
#Zscore.SetLineWeight(2);

#Zscore.AssignValueColor(if Zscore > 0 then Color.GREEN else Color.RED);
AddCloud(Zscore, 0, Color.yellow, Color.yellow);
#------------------------------------------

    input lengthR = 14;

input priceR = close;
input averageTypeR = AverageType.WILDERS;

def NetChgAvg = MovingAverage(averageTypeR, priceR - priceR[1], lengthR);
def TotChgAvg = MovingAverage(averageTypeR, AbsValue(priceR - priceR[1]), lengthR);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;

plot RSI = 50 * (ChgRatio + .5);
RSI.DefineColor("OverBought", GetColor(9));
RSI.DefineColor("Normal", GetColor(2));
RSI.DefineColor("OverSold", GetColor(1));
RSI.AssignValueColor(if RSI > 45 then RSI.Color("OverBought") else if RSI < 5 then RSI.Color("OverSold") else RSI.Color("Normal"));
#-------------------------------------------


    #schafftrendcycles
input fastLength = 23;#23
input slowLength = 50;
input KPeriod = 10;
input DPeriod = 3;#3
#input over_bought = 75;
#input over_sold = 25;
input averageTypeS = AverageType.EXPONENTIAL;

def macd = MovingAverage(averageTypeS, close, fastLength) - MovingAverage(averageTypeS, close, slowLength);
def fastK1 = FastKCustom(macd, KPeriod);
def fastD1 = MovingAverage(averageType, fastK1, DPeriod);
def fastK2 = FastKCustom(fastD1, KPeriod);
def STC = MovingAverage(averageType, fastK2, DPeriod) - 50;

#
input KPeriod2 = 14;
input DPeriod2 = 3;
input slowing_period2 = 1;
input RSI_price2 = VWAP;
input RSI_length2 = 20;
input RSI_average_type2 = AverageType.WILDERS;
input over_bought = 30;
input over_sold = -30;
#input averageType = AverageType.SIMPLE;


def RSI2 = RSI(price = RSI_price2, length = RSI_length2, averageType = RSI_average_type2);

def FullK2 = .1 * StochasticFull(over_bought, over_sold, KPeriod2, DPeriod2, RSI2, RSI2, RSI2, slowing_period2, averageType).FullK - 5;


AddCloud(fullk2, 0, Color.yellow, Color.yellow);
AddCloud(Zscore, 0, Color.yellow, Color.yellow);
AddCloud(Zscore, 0, Color.yellow, Color.yellow);
AddCloud(Zscore, 0, Color.yellow, Color.yellow);

AddCloud(MFO, 0, Color.GREEN, Color.RED);
##


plot UpSignal0 = if STC > STC[1]  then 30 else Double.NaN;
plot DownSignal0 = if STC < STC[1] then - 30 else Double.NaN;

UpSignal0.SetDefaultColor(Color.GREEN);
UpSignal0.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
UpSignal0.SetLineWeight(1);
DownSignal0.SetDefaultColor(Color.RED);
DownSignal0.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
DownSignal0.SetLineWeight(1);



plot UpSignal = if o > 20 and Osc crosses below o and WHITE2 < 0then o else Double.NaN;
plot DownSignal = if o < -20 and Osc crosses above o and WHITE2 > 0 then Osc else Double.NaN;

UpSignal.SetDefaultColor(Color.RED);
UpSignal.SetPaintingStrategy(PaintingStrategy.SQUARES);
UpSignal.SetLineWeight(2);
DownSignal.SetDefaultColor(Color.GREEN);
DownSignal.SetPaintingStrategy(PaintingStrategy.SQUARES);
DownSignal.SetLineWeight(2);

#crosses mfosc
plot UpSignal2 = if mfo > 0 and O crosses above mfo and WHITE2 > 0 then  mfo else Double.NaN;
plot DownSignal2 = if mfo < 0 and O crosses below mfo and WHITE2 < 0 then mfo else Double.NaN;

UpSignal2.SetDefaultColor(Color.green);
UpSignal2.SetPaintingStrategy(PaintingStrategy.POINTS);
UpSignal2.SetLineWeight(2);
DownSignal2.SetDefaultColor(Color.red);
DownSignal2.SetPaintingStrategy(PaintingStrategy.POINTS);
DownSignal2.SetLineWeight(2);