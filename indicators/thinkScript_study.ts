# TEA 2.0 - TOS version - 2015-06-04
# From Andrew Falde's work - LessThanRandom.com 
# Converted from TradeStation to TOS by John Chernicky

#Hint: TEA 2.0 by Andrew Falde at LessThanRandom.com

declare lower;
input Period = 21; # Bars for Price Analysis
#Hint Period: Period in number of bars.
def Price = close; # Use closing price for calculaltion
#input Author = "Andrew Falde - LessThanRandom.com";

# Expansion Calculation
def ATR = reference ATR(Period, averageType = AverageType.SIMPLE);
def StdDev = StDev(data = Price, length = Period);
def squeeze = (ATR * .75) - StdDev;
def Expansion = If(squeeze < 0, 1, 0);

# Linear Regression 
def lowest = Lowest(low[1], Period);
def highest = Highest(high[1], Period);
def EMA = ExpAverage(Price, Period);
def Resolve = Price - ((highest + lowest) / 2 + EMA) / 2;
def Trendline = LinearRegCurve(0, Period, Resolve);

# Trend Caclulation
# 1 - Accumulation
# 2 - Mark Up
# 3 - Distribution
# 4 - Mark Down
# 0 - No Trend
def Trend = if Trendline <= 0 and Trendline > Trendline[1] then 1 else (
            if Trendline > 0 and Trendline > Trendline[1] then 2 else (
            if Trendline > 0 and Trendline < Trendline[1] then 3 else (
            if Trendline <= 0 and Trendline < Trendline[1] then 4 else (
    Double.NaN))));

plot TEA =
    (if Trend == 1 then - 1
else (if Trend == 2 then 1 
else (if Trend == 3 then 1
else (if Trend == 4 then - 1 else Double.NaN
))));

plot Consolidated = (if Expansion == 0 then 0 else Double.NaN);

TEA.AssignValueColor
    (if Trend == 1 then Color.DARK_RED 
else (if Trend == 2 then Color.GREEN 
else (if Trend == 3 then Color.DARK_GREEN
else (if Trend == 4 then Color.RED else Color.DARK_GRAY
))));

TEA.SetPaintingStrategy(PaintingStrategy.POINTS);
TEA.SetLineWeight(4);
#TEA.HideTitle();
TEA.HideBubble();

Consolidated.AssignValueColor(Color.BLUE);
Consolidated.SetPaintingStrategy(PaintingStrategy.POINTS);
Consolidated.SetLineWeight(4);
#Consolidated.HideTitle();
Consolidated.HideBubble();

#AddLabel(yes, "LessThanRandom.com", Color.GRAY);