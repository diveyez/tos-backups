##FVG label to count like a sequence counter
#Counts consecutive positive or negative, when the
#direction changes the previous direction resets to zero

input timeframe = AggregationPeriod.MIN;
input debug = no;

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

AddLabel(1, "+FVG: " + consecutivePositiveGaps + " -FVG: " + consecutiveNegativeGaps, color.YELLOW);

AddChartBubble(debug && isPositiveGap, low3, "+FVG " + consecutivePositiveGaps, Color.GREEN, no);
AddChartBubble(debug && isNegativeGap, high3, "-FVG " + consecutiveNegativeGaps, Color.RED, no);