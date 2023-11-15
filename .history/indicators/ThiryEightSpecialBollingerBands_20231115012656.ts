#Intraday 3 - 8 BollingerBand with Squeeze
#Assembled by Chewie on 3 - 13 - 2023
# edited and improved upon by ChatGPT, EasyAI, GitHub Copilot, and @diveyez on github

input length1 = 3;
input length2 = 8;
input displace = 0;
input aggregationPeriod1 = AggregationPeriod.day;
input aggregationPeriod2 = AggregationPeriod.day;

def price1 = close(period = aggregationPeriod1);
def price2 = close(period = aggregationPeriod2);
 
plot AVG1 = ExpAverage(price1[-displace], length1);
plot AVG2 = ExpAverage(price2[-displace], length2);

AVG1.AssignValueColor(if AVG1 >= AVG2 then color.lime
else if AVG1 <= AVG2 then color.dark_orange else color.gray);

AVG2.AssignValueColor(if AVG2 >= AVG1 then color.red
else if AVG2 <= AVG1 then color.green else color.gray);

AVG1.SetLineWeight(2);
AVG2.SetLineWeight(2);


#Bands

input Num_Dev_Dn = -2.0;
input Num_Dev_up = 2.0;

def sDev = stdev(data = price1[-displace], length = length1);

plot LowerBand = AVG1 + num_Dev_Dn * sDev;
plot UpperBand = AVG1 + num_Dev_Up * sDev;

LowerBand.AssignValueColor(if AVG1 >= AVG2 then color.lime
else if AVG1 <= AVG2 then color.dark_orange else color.gray);
UpperBand.AssignValueColor(if AVG1 >= AVG2 then color.lime
else if AVG1 <= AVG2 then color.dark_orange else color.gray);

def sDev2 = stdev(data = price2[-displace], length = length2);
plot LowerBand2 = AVG2 + num_Dev_Dn * sDev2;
plot UpperBand2 = AVG2 + num_Dev_Up * sDev2;

LowerBand2.AssignValueColor(if AVG1 >= AVG2 then color.green
else if AVG1 <= AVG2 then color.red else color.gray);
UpperBand2.AssignValueColor(if AVG1 >= AVG2 then color.green
else if AVG1 <= AVG2 then color.red else color.gray);

plot OB = HIGH > UpperBand;
OB.SetDefaultColor(Color.light_red);
OB.SetLineWeight(1);
OB.SetPaintingStrategy(PaintingStrategy.Boolean_arrow_DOWN);

plot OS = LOW < LowerBand;
OS.SetDefaultColor(Color.light_green);
OS.SetLineWeight(1);
OS.SetPaintingStrategy(PaintingStrategy.Boolean_arrow_up);

AddCloud(lowerband, lowerband2, Color.dark_GREEN, Color.CURRENT);
AddCloud(upperband2, upperband, Color.RED, Color.CURRENT);

AddCloud(lowerband2, lowerband, Color.dark_GREEN, Color.CURRENT);
AddCloud(upperband, upperband2, Color.RED, Color.CURRENT);

# SQUEEZE

input Squeeze = yes;
def lengths = 5;
def averageTypes = AverageType.SIMPLE;
def sDev1 = StDev(data = price1[-displace], length = lengths);
def MidLine = if Squeeze then MovingAverage(averageTypes, data = price1[-displace], length = lengths) else Double.NaN;
def LowerBandS = if Squeeze then MidLine + Num_Dev_Dn * sDev1 else Double.NaN;
def UpperBandS = if Squeeze then MidLine + Num_Dev_up * sDev1 else Double.NaN;


#KELTNER CHANNELS

def factorH = 1.0;
def factorM = 1.5;
def high1 = high(period = aggregationPeriod1);
def low1 = close(period = aggregationPeriod1);

def trueRangeAverageType = AverageType.SIMPLE;
def shiftH = factorH * MovingAverage(trueRangeAverageType, TrueRange(high1, price1, low1), lengths);
def shiftM = factorM * MovingAverage(trueRangeAverageType, TrueRange(high1, price1, low1), lengths);

def average = MovingAverage(averageTypes, price1, lengths);

def Upper_BandH = if Squeeze then average[-displace] + shiftH[-displace] else Double.NaN;
def Lower_BandH = if Squeeze then average[-displace] - shiftH[-displace] else Double.NaN;
def Upper_BandM = if Squeeze then average[-displace] + shiftM[-displace] else Double.NaN;
def Lower_BandM = if Squeeze then average[-displace] - shiftM[-displace] else Double.NaN;

AddCloud(if Squeeze and Upper_BandH < UpperBandS and Upper_BandH < Upper_BandM then Double.NaN else Upper_BandH, UpperBandS, Color.YELLOW, Color.YELLOW);
AddCloud(if Squeeze and Lower_BandH > LowerBandS then Double.NaN else Lower_BandH, LowerBandS, Color.YELLOW, Color.YELLOW);
AddCloud(if Squeeze and  Upper_BandM < UpperBandS then Double.NaN else Upper_BandM, UpperBandS, Color.RED, Color.RED);
AddCloud(if Squeeze and  Lower_BandM > LowerBandS then Double.NaN else Lower_BandM, LowerBandS, Color.RED, Color.RED);

# End Code