# This is the famous TitanTrades 20cross500 bull 50cross500 bear
# Moving Average Indicator Set
# Written by R.Nefff @diveyez and based on concepts and strategies
# taught and mentored to me and many others by Trent Titan.
# https://github.com/diveyez/mavg-crossovers
#
# MAVG One(Bearish)
input price = close;
input length1 = 20;
input length2 = 500;
# MAVG Two(Bullish)
input length3 = 50;
input length4 = 500;
# MAVG Types(Both)
input averageType1 = AverageType.Exponential;
input averageType2 = AverageType.Exponential;
input averageType3 = AverageType.Exponential;
input averageType4 = AverageType.Exponential;
# CrossingType's 1 & 2
input crossingType1 = { default below, above };
input crossingType2 = { default above, below };
# Define Moving Averages
def avg1 = MovingAverage(averageType1, price, length1);
def avg2 = MovingAverage(averageType2, price, length2);
def avg3 = MovingAverage(averageType3, price, length1);
def avg4 = MovingAverage(averageType4, price, length2);
# Plotting on Chart(Bearish)
plot signal1 = crosses(avg1, avg2, crossingType1 == CrossingType1.below);
signal1.DefineColor("Above", GetColor(1));
signal1.DefineColor("Below", GetColor(1));
signal1.AssignValueColor(if crossingType1 == CrossingType1.below then signal1.color("Above") else signal1.color("Below"));
signal1.SetPaintingStrategy(if crossingType1 == CrossingType1.below
    then PaintingStrategy.BOOLEAN_ARROW_UP
    else PaintingStrategy.BOOLEAN_ARROW_DOWN);
#Plotting on Chart(Bullish)
plot signal2 = crosses(avg1, avg2, crossingType2 == CrossingType2.below);
signal2.DefineColor("Above", GetColor(1));
signal2.DefineColor("Below", GetColor(1));
signal2.AssignValueColor(if crossingType2 == CrossingType2.below then signal2.color("Above") else signal2.color("Below"));
signal2.SetPaintingStrategy(if crossingType2 == CrossingType2.below
    then PaintingStrategy.BOOLEAN_ARROW_UP
    else PaintingStrategy.BOOLEAN_ARROW_DOWN);