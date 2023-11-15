## This is the famous TitanTrades 20cross500 bull 50cross500 bear
## Moving Average Indicator Set
## Written by R.Nefff @diveyez and based on concepts and strategies
## taught and mentored to me and many others by Trent Titan.
## https://github.com/diveyez/20cross500-mavg-indicators
## http://tos.mx/R4pL7VI
## Quick Install Link
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





    
    # Plotting The Moving Averages
    # 20ma
input price6 = close;
input length6 = 20;
input displace6 = -50; 
plot AvgExp1 = ExpAverage(price6[-displace6], length6);
plot UpSignal1 = price6 crosses above AvgExp1;
plot DownSignal1 = price6 crosses below AvgExp1;
input showBreakoutSignals1 = no;
UpSignal1.SetHiding(!showBreakoutSignals1);
DownSignal1.SetHiding(!showBreakoutSignals1);

AvgExp1.SetDefaultColor(GetColor(2));
UpSignal1.SetDefaultColor(Color.UPTICK);
UpSignal1.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
DownSignal1.SetDefaultColor(Color.DOWNTICK);
DownSignal1.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);

# 50ma
input price7 = close;
input length7 = 50;
input displace7 = -50;
input showBreakoutSignals2 = no;

plot AvgExp2 = ExpAverage(price7[-displace7], length7);
plot UpSignal2 = price7 crosses above AvgExp2;
plot DownSignal2 = price7 crosses below AvgExp2;

UpSignal2.SetHiding(!showBreakoutSignals2);
DownSignal2.SetHiding(!showBreakoutSignals2);

AvgExp2.SetDefaultColor(GetColor(1));
UpSignal2.SetDefaultColor(Color.UPTICK);
UpSignal2.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
DownSignal2.SetDefaultColor(Color.DOWNTICK);
DownSignal2.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);


# 500ma
input price8 = close;
input length8 = 500;
input displace8 = -50;
input showBreakoutSignals3 = no;

plot AvgExp3 = ExpAverage(price8[-displace8], length8);
plot UpSignal3 = price8 crosses above AvgExp3;
plot DownSignal3 = price8 crosses below AvgExp3;

UpSignal3.SetHiding(!showBreakoutSignals3);
DownSignal3.SetHiding(!showBreakoutSignals3);

AvgExp3.SetDefaultColor(GetColor(4));
UpSignal3.SetDefaultColor(Color.UPTICK);
UpSignal3.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
DownSignal3.SetDefaultColor(Color.DOWNTICK);
DownSignal3.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);