declare lower;
input timeFrame = { default Quarter, Day, Week, Month, Year, Minute, Hour, Chart, "Opt Exp", Bar };
input BandType = { default Standard, "1/4 Day Range", "3x Avg Bar Range", ThinkScripter, None };
#input ShowCloud = yes;
input HideSdLines = no;


def cap = GetAggregationPeriod();
def errorInAggregation =
    timeFrame == timeFrame.Day and cap >= AggregationPeriod.WEEK or
timeFrame == timeFrame.Week and cap >= AggregationPeriod.MONTH;
Assert(!errorInAggregation, "timeFrame should be not less than current chart aggregation period");

def yyyyMmDd = GetYYYYMMDD();
def seconds = SecondsFromTime(0);
def month = GetYear() * 12 + GetMonth();
def year = GetYear();
def day_number = DaysFromDate(First(yyyyMmDd)) + GetDayOfWeek(First(yyyyMmDd));
def dom = GetDayOfMonth(yyyyMmDd);
def dow = GetDayOfWeek(yyyyMmDd - dom + 1);
def expthismonth = (if dow > 5 then 27 else 20) - dow;
def exp_opt = month + (dom > expthismonth);
def periodIndx;
def qtr = (GetMonth() - 1) % 3;
switch (timeFrame) {
    case Chart:
        periodIndx = 0;
    case Minute:
        periodIndx = Floor(seconds / 60 + day_number * 24 * 60);
    case Hour:
        periodIndx = Floor(seconds / 3600 + day_number * 24);
    case Day:
        periodIndx = CountTradingDays(Min(First(yyyyMmDd), yyyyMmDd), yyyyMmDd) - 1;
    case Week:
        periodIndx = Floor(day_number / 7);
    case Month:
        periodIndx = Floor(month - First(month));
    case Year:
        periodIndx = Floor(year - First(year));
    case Quarter:

        periodIndx = qtr == 0 and qtr[1] != 0;
    case "Opt Exp":
        periodIndx = exp_opt - First(exp_opt);
    case Bar:
        periodIndx = BarNumber() - 1;
}
def isPeriodRolled = CompoundValue(1, periodIndx != periodIndx[1], yes);

def volumeSum;
def volumeVwapSum;
def volumeVwap2Sum;

if (isPeriodRolled) {
    volumeSum = volume;
    volumeVwapSum = volume * vwap;
    volumeVwap2Sum = volume * Sqr(vwap);
} else {
    volumeSum = CompoundValue(1, volumeSum[1] + volume, volume);
    volumeVwapSum = CompoundValue(1, volumeVwapSum[1] + volume * vwap, volume * vwap);
    volumeVwap2Sum = CompoundValue(1, volumeVwap2Sum[1] + volume * Sqr(vwap), volume * Sqr(vwap));
}
def price = volumeVwapSum / volumeSum;

def deviation;
switch (BandType) {
    case Standard:
        deviation = Sqrt(Max(volumeVwap2Sum / volumeSum - Sqr(price), 0));
    case "1/4 Day Range":
        deviation = Sqrt(AbsValue(high(Period = timeFrame) - low(Period = timeFrame)) * .25);
    case "3x Avg Bar Range":
        deviation = Sqrt(Average(TrueRange(high, close, low), 20) * 3);
    case ThinkScripter:
        deviation = Sqrt(TotalSum(Sqr(((open + high + low + close) / 4) - price) * volume) / TotalSum(volume));
    case None:
        deviation = Double.NaN;
}

plot VWAP = price;

VWAP.SetStyle(Curve.POINTS);
VWAP.SetLineWeight(2);
VWAP.SetDefaultColor(Color.MAGENTA);


input numDevUp1 = 2;

plot Upperband = VWAP + numDevUp1 * deviation;
plot Lowerband = VWAP - numDevUp1 * deviation;

Upperband.SetDefaultColor(Color.UPTICK);
Lowerband.SetDefaultColor(Color.UPTICK);


Upperband.SetStyle(Curve.LONG_DASH);
Lowerband.SetStyle(Curve.LONG_DASH);

VWAP.HideBubble();
Upperband.HideBubble();
Lowerband.HideBubble();


Upperband.SetHiding(HideSdLines);
Lowerband.SetHiding(HideSdLines);


input length = 14;
input oversold = 30;
input overbought = 70;
input barprice = close;
input averageType = AverageType.WILDERS;


input LabelSell = yes;
input LabelBuy = yes;


def NetChgAvg = MovingAverage(averageType, barprice - barprice[1], length);
def TotChgAvg = MovingAverage(averageType, AbsValue(barprice - barprice[1]), length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;

def RSI = 50 * (ChgRatio + 1);


def BuySignal = barprice <= lowerband and RSI <= oversold;
def SellSignal = barprice >= upperband and RSI >= overbought;


#AddChartBubble(BuySignal and!BuySignal[1] and LabelBuy, low, "BUY", Color.LIGHT_GREEN, no);

#AddChartBubble(SellSignal and!SellSignal[1] and LabelSell, high, "SELL", Color.LIGHT_RED, yes);

plot BuyArrow = BuySignal and!BuySignal[1] and LabelBuy;
plot SellArrow = SellSignal and!SellSignal[1] and LabelSell;

BuyArrow.SetDefaultColor(color.cyan);
BuyArrow.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BuyArrow.SetLineWeight(2);

SellArrow.SetDefaultColor(color.magenta);
SellArrow.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
SellArrow.SetLineWeight(2);