#Trade ideas from Verniman
#Original Logic from STB Usethinkscript 7 / 20
#Trade above below vwap
#Past posts(now deleted) indicated BSP, Demand Index, STO, Volume, SPX Cash Internals, and levels
#Most trades are breakout based above below VWAP
#RSI has given the best mirror for trades from 2020 - 22

###### TIME ######

input zoneStartAM = 930;
input zoneEndAM = 1200;
input zoneStartPM = 1330;
input zoneEndPM = 1600;
input zoneEndclose = 1609;
input type = { default NOTRADE, REVERSAL };
input price = close;
input length = 5;
input over_bought = 70;
input over_sold = 30;
input rsiAverageType = AverageType.SIMPLE;
input MALength = 2;

def rsi = reference RSI(price = price, length = length, averageType = rsiAverageType);
def RSIMA = Average(rsi, MALength);

#AddOrder(OrderType.BUY_AUTO, rsi crosses above over_sold, tickColor = GetColor(0), arrowColor = #GetColor(0), name = "RSI_LE");
#AddOrder(OrderType.SELL_AUTO, rsi crosses below over_bought, tickColor = GetColor(1), arrowColor = #GetColor(1), name = "RSI_SE");
def highBar;
def lowBar;
def highBar2;
def lowBar2;

switch (type) {
    case NOTRADE:
        highBar = if SecondsTillTime(zoneStartAM) <= 0 and SecondsTillTime(zoneEndAM) >= 0 then HighestAll(open) else Double.NaN;
        lowBar = if SecondsTillTime(zoneStartAM) <= 0 and SecondsTillTime(zoneEndAM) >= 0 then LowestAll(close) else Double.NaN;
    case REVERSAL:
        lowBar = if SecondsTillTime(zoneStartAM) <= 0 and SecondsTillTime(zoneEndAM) >= 0 then HighestAll(open) else Double.NaN;
        highBar = if SecondsTillTime(zoneStartAM) <= 0 and SecondsTillTime(zoneEndAM) >= 0 then LowestAll(close) else Double.NaN;
}

switch (type) {
    case NOTRADE:
        highBar2 = if SecondsTillTime(zoneStartPM) <= 0 and SecondsTillTime(zoneEndPM) >= 0 then HighestAll(open) else Double.NaN;
        lowBar2 = if SecondsTillTime(zoneStartPM) <= 0 and SecondsTillTime(zoneEndPM) >= 0 then LowestAll(close) else Double.NaN;
    case REVERSAL:
        lowBar2 = if SecondsTillTime(zoneStartPM) <= 0 and SecondsTillTime(zoneEndPM) >= 0 then HighestAll(open) else Double.NaN;
        highBar2 = if SecondsTillTime(zoneStartPM) <= 0 and SecondsTillTime(zoneEndPM) >= 0 then LowestAll(close) else Double.NaN;
}



###### TIME END #####

def adspdl = low("$adspd");
def adspdh = high("$adspd");
def adspdc = close("$adspd");
def volspd = close("$volspd");

def HMA = MovingAverage(AverageType.HULL, close, 21);

input numDevDn = -2.0;
input numDevUp = 2.0;
input timeFrame = { default DAY, WEEK, MONTH };

def cap = GetAggregationPeriod();
def errorInAggregation =
    timeFrame == timeFrame.DAY and cap >= AggregationPeriod.WEEK or
timeFrame == timeFrame.WEEK and cap >= AggregationPeriod.MONTH;
Assert(!errorInAggregation, "timeFrame should be not less than current chart aggregation period");

def yyyyMmDd = GetYYYYMMDD();
def periodIndx;
switch (timeFrame) {
    case DAY:
        periodIndx = yyyyMmDd;
    case WEEK:
        periodIndx = Floor((DaysFromDate(First(yyyyMmDd)) + GetDayOfWeek(First(yyyyMmDd))) / 7);
    case MONTH:
        periodIndx = RoundDown(yyyyMmDd / 100, 0);
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
def price1 = volumeVwapSum / volumeSum;
def deviation = Sqrt(Max(volumeVwap2Sum / volumeSum - Sqr(price1), 0));

def VWAP = price1;



#AssignPriceColor(if adspdl < adspdl[1] && close < vwap && close < hma && volume > volume[1] then #Color.RED else if adspdh > adspdh[1] && close > vwap && close > hma && volume > volume[1] then #Color.GREEN else Color.GRAY);


####LONGS####

AddOrder(OrderType.BUY_TO_OPEN, SecondsTillTime(zoneStartAM) <= 0 && SecondsTillTime(zoneEndAM) >= 0 and open > VWAP && VWAP > VWAP[1] && RSIMA crosses above over_bought, name = "Buy open AM @" + open[-1], 1, Color.ORANGE, Color.GREEN);

AddOrder(OrderType.BUY_TO_OPEN, secondsTillTime(zoneStartpM) <= 0 && secondsTillTime(zoneEndpM) >= 0 and open > vwap && vwap > vwap[1] && RSIMA crosses above over_bought, name = "Buy open AM @" + open[-1], 1, Color.ORANGE, Color.green);



##SHORTS###
#Changed close to open > vwap
AddOrder(OrderType.SELL_TO_OPEN, SecondsTillTime(zoneStartAM) <= 0 && SecondsTillTime(zoneEndAM) >= 0 and open < VWAP && VWAP < VWAP[1] && RSIMA  crosses below over_sold, name = "Sell open AM @" + open[-1], 1, Color.ORANGE, Color.RED);

AddOrder(OrderType.SELL_TO_OPEN, SecondsTillTime(zoneStartPM) <= 0 && SecondsTillTime(zoneEndPM) >= 0 and  open < VWAP && VWAP < VWAP[1] && RSIMA crosses below over_sold, name = "Sell open PM @" + open[-1], 1, Color.ORANGE, Color.RED);

####Close orders######

AddOrder(OrderType.SELL_TO_CLOSE, RSIMA  crosses below over_bought, name = "Sell close @" + open[-1], 1, Color.ORANGE, Color.RED);

AddOrder(OrderType.BUY_TO_CLOSE, RSIMA  crosses above over_sold, name = "Buy close @" + open[-1], 1, Color.ORANGE, Color.RED);

###Market close orders####

AddOrder(OrderType.BUY_TO_CLOSE, SecondsTillTime(zoneEndclose) <= 0, name = "Buy Market Close @" + open[-1], 1, Color.ORANGE, Color.RED);

AddOrder(OrderType.SELL_TO_CLOSE, SecondsTillTime(zoneEndclose) <= 0, name = "Sell Market Close @" + open[-1], 1, Color.ORANGE, Color.RED);