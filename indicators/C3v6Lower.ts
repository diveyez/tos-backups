#CC Candles Lower V.2
#Created 04 / 28 / 2021 by Christopher84
#Modified to V.2 05 / 11 / 2021 - dialed in studies to give stronger signals.Included OB / OS Clouds and cleaned up code.
    #Changed 05 / 20 / 2021 to V.3 - Removed Pivot Study and replaced with CIP.

#Keltner Channel
declare lower;
def displace = 0;
def factorK = 2.0;
def lengthK = 20;
def price = close;
input averageType = AverageType.SIMPLE;
def trueRangeAverageType = AverageType.SIMPLE;
def BulgeLengthK = 150;
def SqueezeLengthK = 150;
def BulgeLengthK2 = 40;
def SqueezeLengthK2 = 40;
def BulgeLengthPrice = 75;
def SqueezeLengthPrice = 75;
def BulgeLengthPrice2 = 20;
def SqueezeLengthPrice2 = 20;
def BulgeLengthCC = 40;
def SqueezeLengthCC = 40;
def BulgeLengthCC2 = 8;
def SqueezeLengthCC2 = 8;

def shift = factorK * MovingAverage(trueRangeAverageType, TrueRange(high, close, low), lengthK);
def averageK = MovingAverage(averageType, price, lengthK);
def AvgK = averageK[-displace];
def Upper_BandK = averageK[-displace] + shift[-displace];
def Lower_BandK = averageK[-displace] - shift[-displace];

def conditionK1 = price >= Upper_BandK;
def conditionK2 = (Upper_BandK[1] < Upper_BandK) and(Lower_BandK[1] < Lower_BandK);
def conditionK3D = price < Lower_BandK;
def conditionK4D = (Upper_BandK[1] > Upper_BandK) and(Lower_BandK[1] > Lower_BandK);

def conditionK2L = (Upper_BandK[2] < Upper_BandK[1]) and(Lower_BandK[2] < Lower_BandK[1]);
def conditionK3L = (Upper_BandK[3] < Upper_BandK[2]) and(Lower_BandK[3] < Lower_BandK[2]);
def conditionK3 = (Upper_BandK[1] > Upper_BandK) and(Lower_BandK[1] > Lower_BandK);

def BandwidthK = (Upper_BandK - Lower_BandK) / AvgK * 100;
def condition_BWKUP = BandwidthK[1] < BandwidthK;
def condition_BWKDOWN = BandwidthK[1] > BandwidthK;
def BulgeK = Highest(BandwidthK, BulgeLengthK);
def SqueezeK = Lowest(BandwidthK, SqueezeLengthK);
def BulgeK2 = Highest(BandwidthK, BulgeLengthK2);
def SqueezeK2 = Lowest(BandwidthK, SqueezeLengthK2);

#MACD with Price
def fastLength = 12;
def slowLength = 26;
def MACDLength = 9;
input MACD_AverageType = { SMA, default EMA };
def MACDLevel = 0.0;

def fastEMA = ExpAverage(price, fastLength);
def slowEMA = ExpAverage(price, slowLength);
def Value;
def Avg;
switch (MACD_AverageType) {
    case SMA:
        Value = Average(price, fastLength) - Average(price, slowLength);
        Avg = Average(Value, MACDLength);
    case EMA:
        Value = fastEMA - slowEMA;
        Avg = ExpAverage(Value, MACDLength);
}
def Diff = Value - Avg;
def Level = MACDLevel;

def condition1 = Value[1] <= Value;
def condition1D = Value[1] > Value;

#RSI
def RSI_length = 14;
def RSI_AverageType = AverageType.WILDERS;
def RSI_OB = 70;
def RSI_OS = 30;

def NetChgAvg = MovingAverage(RSI_AverageType, price - price[1], RSI_length);
def TotChgAvg = MovingAverage(RSI_AverageType, AbsValue(price - price[1]), RSI_length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
def RSI = 50 * (ChgRatio + 1);

def condition2 = (RSI[3] < RSI) is true or(RSI >= 80) is true;
def condition2D = (RSI[3] > RSI) is true or(RSI < 20) is true;
def conditionOB1 = RSI > RSI_OB;
def conditionOS1 = RSI < RSI_OS;


#MFI
def MFI_Length = 14;
def MFIover_Sold = 20;
def MFIover_Bought = 80;
def movingAvgLength = 1;
def MoneyFlowIndex = Average(MoneyFlow(high, close, low, volume, MFI_Length), movingAvgLength);
def MFIOverBought = MFIover_Bought;
def MFIOverSold = MFIover_Sold;

def condition3 = (MoneyFlowIndex[2] < MoneyFlowIndex) is true or(MoneyFlowIndex > 85) is true;
def condition3D = (MoneyFlowIndex[2] > MoneyFlowIndex) is true or(MoneyFlowIndex < 20) is true;
def conditionOB2 = MoneyFlowIndex > MFIover_Bought;
def conditionOS2 = MoneyFlowIndex < MFIover_Sold;

#Forecast
def na = Double.NaN;
def MidLine = 50;
def Momentum = MarketForecast().Momentum;
def NearT = MarketForecast().NearTerm;
def Intermed = MarketForecast().Intermediate;
def FOB = 80;
def FOS = 20;
def upperLine = 110;

def condition4 = (Intermed[1] <= Intermed) or(NearT >= MidLine);
def condition4D = (Intermed[1] > Intermed) or(NearT < MidLine);
def conditionOB3 = Intermed > FOB;
def conditionOS3 = Intermed < FOS;
def conditionOB4 = NearT > FOB;
def conditionOS4 = NearT < FOS;

#Change in Price
def lengthCIP = 5;
def CIP = (price - price[1]);
def AvgCIP = ExpAverage(CIP[-displace], lengthCIP);

def CIP_UP = AvgCIP > AvgCIP[1];
def CIP_DOWN = AvgCIP < AvgCIP[1];

def condition5 = CIP_UP;
def condition5D = CIP_DOWN;

#EMA_1
def EMA_length = 12;
def AvgExp = ExpAverage(price[-displace], EMA_length);

def condition6 = (price >= AvgExp) and(AvgExp[2] <= AvgExp);
def condition6D = (price < AvgExp) and(AvgExp[2] > AvgExp);

#EMA_2
def EMA_2length = 20;
def displace2 = 0;
def AvgExp2 = ExpAverage(price[-displace2], EMA_2length);

def condition7 = (price >= AvgExp2) and(AvgExp[2] <= AvgExp);
def condition7D = (price < AvgExp2) and(AvgExp[2] > AvgExp);

#DMI Oscillator
def DMI_length = 5; #Typically set to 10
input DMI_averageType = AverageType.WILDERS;
def diPlus = DMI(DMI_length, DMI_averageType)."DI+";
def diMinus = DMI(DMI_length, DMI_averageType)."DI-";
def Osc = diPlus - diMinus;
def Hist = Osc;
def ZeroLine = 0;

def condition8 = Osc >= ZeroLine;
def condition8D = Osc < ZeroLine;

#Trend_Periods
def TP_fastLength = 3; #Typically 7
def TP_slowLength = 4; #Typically 15
def Periods = Sign(ExpAverage(close, TP_fastLength) - ExpAverage(close, TP_slowLength));

def condition9 = Periods > 0;
def condition9D = Periods < 0;

#Polarized Fractal Efficiency
def PFE_length = 5; #Typically 10
def smoothingLength = 2.5; #Typically 5
def PFE_diff = close - close[PFE_length - 1];
def val = 100 * Sqrt(Sqr(PFE_diff) + Sqr(PFE_length)) / Sum(Sqrt(1 + Sqr(close - close[1])), PFE_length - 1);
def PFE = ExpAverage(if PFE_diff > 0 then val else -val, smoothingLength);
def UpperLevel = 50;
def LowerLevel = -50;

def condition10 = PFE > 0;
def condition10D = PFE < 0;
def conditionOB5 = PFE > UpperLevel;
def conditionOS5 = PFE < LowerLevel;

#Bollinger Bands PercentB
input BBPB_averageType = AverageType.SIMPLE;
def BBPB_length = 20; #Typically 20
def Num_Dev_Dn = -2.0;
def Num_Dev_up = 2.0;
def BBPB_OB = 100;
def BBPB_OS = 0;
def upperBand = BollingerBands(price, displace, BBPB_length, Num_Dev_Dn, Num_Dev_up, BBPB_averageType).UpperBand;
def lowerBand = BollingerBands(price, displace, BBPB_length, Num_Dev_Dn, Num_Dev_up, BBPB_averageType).LowerBand;
def PercentB = (price - lowerBand) / (upperBand - lowerBand) * 100;
def HalfLine = 50;
def UnitLine = 100;

def condition11 = PercentB > HalfLine;
def condition11D = PercentB < HalfLine;
def conditionOB6 = PercentB > BBPB_OB;
def conditionOS6 = PercentB < BBPB_OS;


#STARC Bands
def ATR_length = 15;
def SMA_lengthS = 6;
def multiplier_factor = 1.25;
def valS = Average(price, SMA_lengthS);
def average_true_range = Average(TrueRange(high, close, low), length = ATR_length);
def Upper_BandS = valS[-displace] + multiplier_factor * average_true_range[-displace];
def Middle_BandS = valS[-displace];
def Lower_BandS = valS[-displace] - multiplier_factor * average_true_range[-displace];

def condition12 = (Upper_BandS[1] <= Upper_BandS) and(Lower_BandS[1] <= Lower_BandS);
def condition12D = (Upper_BandS[1] > Upper_BandS) and(Lower_BandS[1] > Lower_BandS);

#Klinger Histogram
def Klinger_Length = 13;
def KVOsc = KlingerOscillator(Klinger_Length).KVOsc;
def KVOH = KVOsc - Average(KVOsc, Klinger_Length);
def condition13 = (KVOH > 0);
def condition13D = (KVOH < 0);

#Projection Oscillator
def ProjectionOsc_length = 30; #Typically 10
def MaxBound = HighestWeighted(high, ProjectionOsc_length, LinearRegressionSlope(price = high, length = ProjectionOsc_length));
def MinBound = LowestWeighted(low, ProjectionOsc_length, LinearRegressionSlope(price = low, length = ProjectionOsc_length));
def ProjectionOsc_diff = MaxBound - MinBound;
def PROSC = if ProjectionOsc_diff != 0 then 100 * (close - MinBound) / ProjectionOsc_diff else 0;
def PROSC_OB = 80;
def PROSC_OS = 20;

def condition14 = PROSC > 50;
def condition14D = PROSC < 50;
def conditionOB7 = PROSC > PROSC_OB;
def conditionOS7 = PROSC < PROSC_OS;

#Trend Confirmation Calculator
#Confirmation_Factor range 1 - 15.
input coloredCandlesOn = no;
def Confirmation_Factor = 0;
#Use for testing conditions individually.Remove # from line below and change Confirmation_Factor to 1.
#def Agreement_Level = condition1;
def Agreement_LevelOB = 10;
def Agreement_LevelOS = -10;

def Agreement_Level = condition1 + condition2 + condition3 + condition4 + condition5 + condition6 + condition7 + condition8 + condition9 + condition10 + condition11 + condition12 + condition13 + condition14 + conditionK1 + conditionK2;

def Agreement_LevelD = (condition1D + condition2D + condition3D + condition4D + condition5D + condition6D + condition7D + condition8D + condition9D + condition10D + condition11D + condition12D + condition13D + condition14D + conditionK3D + conditionK4D);

plot Consensus_Level = Agreement_Level - Agreement_LevelD;

def conditionChannel1 = Upper_BandK > price;
def conditionChannel2 = Lower_BandK < price;

def UP = Consensus_Level >= 0;
def DOWN = Consensus_Level < 0;

Consensus_Level.AssignValueColor(
if Consensus_Level > Consensus_Level[1] and Consensus_Level >= 0 then Color.LIGHT_GREEN
else if Consensus_Level < Consensus_Level[1] and Consensus_Level >= 0 then Color.LIGHT_GREEN
else if Consensus_Level < Consensus_Level[1] and Consensus_Level < 0 then Color.RED else
if Consensus_Level > Consensus_Level[1] and Consensus_Level < 0 then Color.RED
else Color.GRAY);

def Zero_Line = 0;

AddCloud(Consensus_Level, Agreement_LevelOB, Color.LIGHT_RED, Color.CURRENT);
AddCloud(Consensus_Level, Agreement_LevelOS, Color.CURRENT, Color.LIGHT_GREEN);

plot BulgeCC = Highest(Consensus_Level, BulgeLengthCC);
BulgeCC.AssignValueColor(if (conditionK2) then Color.GREEN else if (conditionK3) then Color.RED else Color.GRAY);

plot SqueezeCC = Lowest(Consensus_Level, SqueezeLengthCC);
SqueezeCC.AssignValueColor(if (conditionK2) then Color.GREEN else if (conditionK3) then Color.RED else Color.GRAY);

plot BulgeCC2 = Highest(Consensus_Level, BulgeLengthCC2);
BulgeCC2.AssignValueColor(if (conditionK2) then Color.GREEN else if (conditionK3) then Color.RED else Color.GRAY);
BulgeCC2.SetStyle(Curve.SHORT_DASH);

plot SqueezeCC2 = Lowest(Consensus_Level, SqueezeLengthCC2);
SqueezeCC2.AssignValueColor(if (conditionK2) then Color.GREEN else if (conditionK3) then Color.RED else Color.GRAY);
SqueezeCC2.SetStyle(Curve.SHORT_DASH);