#AsGoodTrendColorCandles_MTFs
###This ASGoodTrendColorCandles_MTFs Indicator looks back 6 periods on each time frame divided by .5 painting the candle trend Green or Red.I use this as continued verification for my AsGoodAsItGets Long / Short Buy / Sell Indicator since it might repaint and I'm looking for further trend verification.
###Inspiration for this from the TTM_Trend Indicator which is a free indicator on TOS but doesn't provide code.
###Charles Ricks v.1 10 / 31 / 22 This indicator automatically address most time frames.

input AGP0 = AggregationPeriod.Min;
input AGP = AggregationPeriod.FIVE_MIN;
input AGP1 = AggregationPeriod.FIFTEEN_MIN;
input AGP2 = AggregationPeriod.THIRTY_MIN;
input AGP3 = AggregationPeriod.HOUR;
input AGP4H = AggregationPeriod.FOUR_HOURS;
input AGP4 = AggregationPeriod.DAY;
input AGP5 = AggregationPeriod.WEEK;
input AGP6 = AggregationPeriod.MONTH;
input TrendPeriods = 6;

def OP = open(period = AGP);
def HI = high(period = AGP);
def LOW = low(period = AGP);
def Close = close(period = AGP);
def HighestHigh = Highest(HI, TrendPeriods);
def LowestLow = Lowest(LOW, TrendPeriods);
def CandleTrend = if ((Close - LowestLow) / (HighestHigh - LowestLow)) > .5
then 1
else 0;

AssignPriceColor(if CandleTrend then Color.GREEN else Color.RED);
def OP0 = open(period = AGP0);
def HI0 = high(period = AGP0);
def LOW0 = low(period = AGP0);
def Close0 = close(period = AGP0);
def HighestHigh0 = Highest(HI, TrendPeriods);
def LowestLow0 = Lowest(LOW, TrendPeriods);
def trend0 = if ((Close - LowestLow) / (HighestHigh - LowestLow)) > .5
then 1
else 0;

AssignPriceColor(if CandleTrend then Color.GREEN else Color.RED);
def OP1 = open(period = AGP1);
def HI1 = high(period = AGP1);
def LOW1 = low(period = AGP1);
def Close1 = close(period = AGP1);
def HighestHigh1 = Highest(HI, TrendPeriods);
def LowestLow1 = Lowest(LOW, TrendPeriods);
def trend1 = if ((Close - LowestLow) / (HighestHigh - LowestLow)) > .5
then 1
else 0;

AssignPriceColor(if CandleTrend then Color.GREEN else Color.RED);
def OP2 = open(period = AGP2);
def HI2 = high(period = AGP2);
def LOW2 = low(period = AGP2);
def Close2 = close(period = AGP2);
def HighestHigh2 = Highest(HI, TrendPeriods);
def LowestLow2 = Lowest(LOW, TrendPeriods);
def trend2 = if ((Close - LowestLow) / (HighestHigh - LowestLow)) > .5
then 1
else 0;

AssignPriceColor(if CandleTrend then Color.GREEN else Color.RED);
def OP3 = open(period = AGP3);
def HI3 = high(period = AGP3);
def LOW3 = low(period = AGP3);
def Close3 = close(period = AGP3);
def HighestHigh3 = Highest(HI, TrendPeriods);
def LowestLow3 = Lowest(LOW, TrendPeriods);
def trend3 = if ((Close - LowestLow) / (HighestHigh - LowestLow)) > .5
then 1
else 0;

AssignPriceColor(if CandleTrend then Color.GREEN else Color.RED);
def OP4 = open(period = AGP4);
def HI4 = high(period = AGP4);
def LOW4 = low(period = AGP4);
def Close4 = close(period = AGP4);
def HighestHigh4 = Highest(HI, TrendPeriods);
def LowestLow4 = Lowest(LOW, TrendPeriods);
def trend4 = if ((Close - LowestLow) / (HighestHigh - LowestLow)) > .5
then 1
else 0;

AssignPriceColor(if CandleTrend then Color.GREEN else Color.RED);
def OP4H = open(period = AGP4H);
def HI4H = high(period = AGP4H);
def LOW4H = low(period = AGP4H);
def Close4H = close(period = AGP4H);
def HighestHigh4H = Highest(HI, TrendPeriods);
def LowestLow4H = Lowest(LOW, TrendPeriods);
def trend4H = if ((Close - LowestLow) / (HighestHigh - LowestLow)) > .5
then 1
else 0;

AssignPriceColor(if CandleTrend then Color.GREEN else Color.RED);
def OP5 = open(period = AGP5);
def HI5 = high(period = AGP5);
def LOW5 = low(period = AGP5);
def Close5 = close(period = AGP5);
def HighestHigh5 = Highest(HI, TrendPeriods);
def LowestLow5 = Lowest(LOW, TrendPeriods);
def trend5 = if ((Close - LowestLow) / (HighestHigh - LowestLow)) > .5
then 1
else 0;

AssignPriceColor(if CandleTrend then Color.GREEN else Color.RED);
def OP6 = open(period = AGP6);
def HI6 = high(period = AGP6);
def LOW6 = low(period = AGP6);
def Close6 = close(period = AGP6);
def HighestHigh6 = Highest(HI, TrendPeriods);
def LowestLow6 = Lowest(LOW, TrendPeriods);
def trend6 = if ((Close - LowestLow) / (HighestHigh - LowestLow)) > .5
then 1
else 0;

AssignPriceColor(if CandleTrend then Color.GREEN else Color.RED);