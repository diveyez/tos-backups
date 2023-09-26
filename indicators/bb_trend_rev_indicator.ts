# Trend Reversal Indicator
# Displays a bubble with the text "TR" when a trend reversal is detected

# Define the inputs
input trendLength = 50;
input threshold = 0.95;

# Calculate the TTM_Squeeze study
def squeeze = TTM_Squeeze();

# Calculate the ROC of the closing price
def roc = (close - close[trendLength]) / close[trendLength];

# Calculate the slope of the ROC
def slope = reference LinearRegTrendline(roc, trendLength, 0);

# Calculate the R - squared of the ROC slope
def rsq = reference LinearRegressionSlope(roc, slope, trendLength) * Correlation(roc, slope, trendLength);     

# Determine if a trend reversal has occurred
def trendReversal = if rsq >= threshold and slope < 0 then 1 else 0;

# Determine the trend direction
def trendDirection = if close > reference Average(close, trendLength) then 1 else -1;

# Plot a bubble with the text "TR" when a trend reversal occurs
AddChartBubble(trendReversal, high + TickSize(), if trendDirection > 0 then "Bullish TR" else "Bearish TR", if trendDirection > 0 then Color.GREEN else Color.RED, no);

# Send alerts when a trend reversal occurs
Alert(trendReversal, "Trend Reversal", if trendDirection > 0 then Alert.BAR_GREEN else Alert.BAR_RED, Sound.Ding);