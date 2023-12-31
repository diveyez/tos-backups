# Volatility Long Reversal Strategy
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/HauQ8TM9/
# Backtesting code at end of script

input av = 8;
input vp = 13;
input df = 3.55;
input lba = 0.9;
input src = hlc3;

def typical = if src >= src[1] then src - low[1] else src[1] - low;
def deviation = sum(typical, vp) / vp * df;
def devHigh = expAverage(deviation, av);
def devLow = lba * devHigh;
def medianAvg = expAverage(src, av);

def UpperBand = expAverage(medianAvg, av) + devHigh;
def LowerBand = expAverage(medianAvg, av) - devLow;
def MidLine = SimpleMovingAvg(medianAvg, av);
def up = expAverage(medianAvg, av) + devHigh;
def down = expAverage(medianAvg, av) - devLow;

def buy = close[2] < down[2] and close[1] > down[1] and close > close[1];
def sell = close[2] > up[2] and close[1] < up[1] and close < close[1];

plot upper = UpperBand;
plot lower = LowerBand;
plot mid = MidLine;

# Plot Signals
plot entry = buy;
entry.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
entry.SetDefaultColor(Color.MAGENTA);
entry.SetLineWeight(2);
plot exit = sell;
exit.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
exit.SetDefaultColor(Color.CYAN);
exit.SetLineWeight(2);

upper.SetDefaultColor(GetColor(0));
mid.SetDefaultColor(GetColor(1));
lower.SetDefaultColor(GetColor(5));

# Code below is for backtesting
# Remove the "#" from the code below and apply this script as a Strategy instead of Study

#AddOrder(OrderType.BUY_TO_OPEN, condition = buy, price = close, 100, tickcolor = Color.GREEN, arrowcolor = Color.GREEN, name = "BUY");
#AddOrder(OrderType.SELL_TO_CLOSE, condition = sell, price = close, 100, tickcolor = Color.RED, arrowcolor = Color.RED, name = "SELL");