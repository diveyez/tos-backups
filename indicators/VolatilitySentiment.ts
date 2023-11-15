declare lower;
# created by @tony_futures to identify trend and divergence between the futures and a volatility product
input TICKER = "-/VX";
def NaN = Double.NaN;
input Aggr = AggregationPeriod.FIVE_MIN;
input higherAgg = yes;
def Agg = if higherAgg then Aggr else getAggregationPeriod();
def tickerHigh = high(symbol = TICKER, period = Agg);
def tickerLow = low(symbol = TICKER, period = Agg);
def tickerClose = close(symbol = TICKER, period = Agg);
def tickerOpen = open(symbol = TICKER, period = Agg);
def isUp = tickerClose > tickerOpen;
def isDown = tickerClose < tickerOpen;
def isDoji = tickerClose == tickerOpen;
DefineGlobalColor("greenCandle", CreateColor(103, 135, 151));
DefineGlobalColor("redCandle", CreateColor(136, 93, 100));
DefineGlobalColor("dojiCandle", Color.WHITE);

input fastLength = 9;
input slowLength = 21;
input bearish = "";
input bullish = "";

def EMA1 = MovAvgExponential(tickerClose, (fastLength), 0, no);
def EMA2 = MovAvgExponential(tickerClose, (slowLength), 0, no);
AddCloud(EMA1, EMA2, GlobalColor("greenCandle"), GlobalColor("redCandle"));

def BullEMA = EMA1 > EMA2;
def xC = close(period = Agg);
def EMACurrent1 = MovAvgExponential(xC, (fastLength), 0, no);
def EMACurrent2 = MovAvgExponential(xC, (slowLength), 0, no);

def BullCurrentEMA = EMACurrent1 > EMACurrent2;

def divergentBullEMA = BullEMA and!BullCurrentEMA;
def divergentBearEMA = !BullEMA and BullCurrentEMA;

input showDivergenceLabel = yes;
input currentTicker = "ES";
AddLabel(showDivergenceLabel and divergentBullEMA, "Possible Bullish Divergence", GlobalColor("greenCandle"));
AddLabel(showDivergenceLabel and divergentBearEMA, "Possible Bearish Divergence", GlobalColor("redCandle"));

AddLabel(!BullEMA, "Vol" + bearish, GlobalColor("redCandle"));
AddLabel(BullEMA, "Vol" + bullish, GlobalColor("greenCandle"));
AddLabel(!BullCurrentEMA, currentTicker + bearish, GlobalColor("redCandle"));
AddLabel(BullCurrentEMA, currentTicker + bullish, GlobalColor("greenCandle"));

AddChart(if (isUp) then tickerLow else NaN, if (isUp) then tickerHigh else Double.NaN, NaN, NaN, ChartType.BAR, GlobalColor("greenCandle"));
AddChart(if (isDown) then tickerLow else NaN, if (isDown) then tickerHigh else Double.NaN, NaN, NaN, ChartType.BAR, GlobalColor("redCandle"));
AddChart(if (isDoji) then tickerLow else NaN, if (isDoji) then tickerHigh else Double.NaN, if (isDoji) then tickerOpen else NaN, if (isDoji) then tickerClose else NaN, ChartType.BAR, GlobalColor("dojiCandle"));