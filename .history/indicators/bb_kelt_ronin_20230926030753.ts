# 2 -in -1 BB / KC by Ronin

# BB Indicator

input length = 20;
input Num_Dev_Dn = -2.0;
input Num_Dev_up = 2.0;
input averageType = AverageType.Simple;

def displace = 0;
def sDev = stdev(data = close[-displace], length = length);

plot MidLine = MovingAverage(averageType, data = close[-displace], length = length);
plot LowerBand = MidLine + num_Dev_Dn * sDev;
plot UpperBand = MidLine + num_Dev_Up * sDev;

LowerBand.SetDefaultColor(GetColor(7));
MidLine.SetDefaultColor(GetColor(1));
UpperBand.SetDefaultColor(GetColor(7));

# KC Indicator

declare weak_volume_dependency;

input KCfactor1 = 1.618;
input KCfactor2 = 2.000;
input KClength = 20;
input KCaverageType = AverageType.SIMPLE;
input trueRangeAverageType = AverageType.SIMPLE;

def KCdisplace = 0;
def shift1 = KCfactor1 * MovingAverage(trueRangeAverageType, TrueRange(high, close, low), KClength);
def shift2 = KCfactor2 * MovingAverage(trueRangeAverageType, TrueRange(high, close, low), KClength);
def average = MovingAverage(KCaverageType, close, KClength);

#plot Avg = average[-displace];
#Avg.SetDefaultColor(GetColor(1));

plot Upper_Band1 = average[-KCdisplace] + shift1[-KCdisplace];
Upper_Band1.SetDefaultColor(GetColor(7));
upper_Band1.SetStyle(Curve.SHORT_DASH);
plot Lower_Band1 = average[-KCdisplace] - shift1[-KCdisplace];
Lower_Band1.SetDefaultColor(GetColor(7));
Lower_Band1.SetStyle(Curve.SHORT_DASH);

plot Upper_Band2 = average[-KCdisplace] + shift2[-KCdisplace];
Upper_Band2.SetDefaultColor(GetColor(7));
upper_Band2.SetStyle(Curve.SHORT_DASH);
plot Lower_Band2 = average[-KCdisplace] - shift2[-KCdisplace];
Lower_Band2.SetDefaultColor(GetColor(7));
Lower_Band2.SetStyle(Curve.SHORT_DASH);