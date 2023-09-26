#Counts consecutive positive or negative, when the #direction changes the previous direction resets to zero

input timeframe = AggregationPeriod.MIN;
input fairValue = 0.0;

# Calculate Fair Value Gap
def high1 = high(period = timeframe)[1];
def low3 = low(period = timeframe)[3];
def low1 = low(period = timeframe)[1];
def high3 = high(period = timeframe)[3];
def fairValueGap = if high1 < low3 then 1 else if low1 > high3 then - 1 else 0;

# Track Consecutive Positive and Negative Gaps
def consecutivePositiveGaps = if fairValueGap == 1 then Max(1, consecutivePositiveGaps[1] + 1) else 0;
def consecutiveNegativeGaps = if fairValueGap == -1 then Max(1, consecutiveNegativeGaps[1] + 1) else 0;

# Plot Rectangle and Label with Sequence Counter
def isPositiveGap = fairValueGap == 1;
def isNegativeGap = fairValueGap == -1;
def positiveGapLabel = "+FVG " + consecutivePositiveGaps;
def negativeGapLabel = "-FVG " + consecutiveNegativeGaps;
AddChartBubble(isPositiveGap, low3, positiveGapLabel, Color.GREEN, no);
AddChartBubble(isNegativeGap, high3, negativeGapLabel, Color.RED, no);
AddVerticalLine(isPositiveGap, low3, high1, Color.CYAN, Curve.SHORT_DASH);
AddVerticalLine(isNegativeGap, high3, low1, Color.MAGENTA, Curve.SHORT_DASH);
AddCloud(isPositiveGap, low3, high1, Color.CYAN);
AddCloud(isNegativeGap, high3, low1, Color.MAGENTA);