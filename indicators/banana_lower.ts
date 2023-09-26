declare lower;
input n = 9;

# Calculate today's percentage change in price
def priceChange = (close - close[1]) / close[1] * 100;

# Calculate daily returns
def dailyReturns = (close / close[1] - 1) * 100;

# Calculate daily standard deviation
def standardDeviation = stdev(dailyReturns, n);

# Calculate the difference between today's percentage change in price and the daily standard deviation
def difference = priceChange - standardDeviation;

# Plot the difference
plot diffPlot = difference;
diffPlot.SetDefaultColor(GetColor(1));
diffPlot.SetLineWeight(2);
diffPlot.SetPaintingStrategy(PaintingStrategy.LINE);

# Plot zero line for reference
plot zeroLine = 0;
zeroLine.SetDefaultColor(GetColor(8));
zeroLine.SetStyle(Curve.SHORT_DASH);