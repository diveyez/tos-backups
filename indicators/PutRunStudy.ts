#  PUTRUN STUDY
# Designed during market conditions when ukraine was invaded by russia.
# This pattern study displays an indicator on specific patterns letting you know that there is potential for large put volume and short selling

def IsUp = close > open;
def IsDown = close < open;
def IsDoji = IsDoji();
def avgRange = 0.025 * Average(high - low, 20);
plot PatternPlot =
    IsDescending(close, 3)[16] and
IsDown[15] and
IsDown[14] and
    ((Sum(IsUp, 2)[12] >= 0)) and
        ((Sum(IsUp, 2)[10] >= 0)) and
IsDescending(close, 3)[7] and
    ((Sum(IsUp, 5)[2] >= 0)) and
IsDescending(close, 2)[0] and
Highest(high[12], 2) > Highest(high[10], 2) and
Highest(high[10], 2) > Highest(high[2], 5) and
Lowest(low[12], 2) > Lowest(low[10], 2) and
high[14] > Highest(high[12], 2) and
low[15] != low[14] and
high[15] != high[14] and
Lowest(low[10], 2) > Lowest(low[2], 5) and
low[14] > Lowest(low[12], 2);

PatternPlot.SetPaintingStrategy(PaintingStrategy.BOOLEAN_WEDGE_DOWN);
PatternPlot.SetDefaultColor(CreateColor(255, 0, 102));