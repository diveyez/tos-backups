

#(Consensus Confirmation Candles) C3 v5 FOREX & SPX Compatible
#
# Created 04 / 28 / 2021 by Christopher84
# Based off of the Confirmation Candles Study.Main difference is that CC Candles weigh factors of positive
# and negative price movement to create the Consensus_Level.The Consensus_Level is considered positive if
# above zero and negative if below zero.
#
# v2 - 05 / 11 / 2021 - dialed in studies to give stronger signals.Removed reversal buy and sell signals with
#                     OB / OS signals.Included OB / OS clouds to indicate favorable zones to buy or take profit.
#                     Clouds can also indicate nearterm reversals.Cleaned up code.
# v3 - 05 / 20 / 2021 - Removed Pivot Study and replaced with CIP.Reworked Labels to reflect mean reversion Look
#                     to Buy / Look to Sell conditions.Removed Mean Reversion Label.Added new label to show the
#                     Confirmation_Level and color coded it to show OB / OS conditions.
# BETA - 05 / 21 / 2021 - (barbaros) Consensus Level filter set to above 4 and below - 4
# v4 - 05 / 24 / 2021 - Consensus Level filter changed to above 6 and below - 6
# BETA - 05 / 29 / 2021 - (barbaros) Bug fixes
# v5 - 06 /01 / 2021 - Consolidated labels.Added new squeeze condition based on NearTSupport and NearTResistance.
# BETA - 06 /02 / 2021 - Modified study set to be compatable with FOREX and SPX.
# v6 - 06 /09 / 2021 - Modified to include Confirmation Arrows
#Keltner Channel
declare upper;
def displace = 0;
def factorK = 2.0;
def lengthK = 20;
def price = close;
input averageType = AverageType.SIMPLE;
def trueRangeAverageType = AverageType.SIMPLE;
def BulgeLengthK = 250;
def SqueezeLengthK = 250;
def BulgeLengthK2 = 150;
def SqueezeLengthK2 = 150;
def BulgeLengthPrice = 75;
def SqueezeLengthPrice = 75;
def BulgeLengthPrice2 = 20;
def SqueezeLengthPrice2 = 20;
def BulgeLengthPrice3 = 12;
def SqueezeLengthPrice3 = 12;

def shift = factorK * MovingAverage(trueRangeAverageType, TrueRange(high, close, low), lengthK);
def averageK = MovingAverage(averageType, price, lengthK);
def AvgK = averageK[-displace];
def Upper_BandK = averageK[-displace] + shift[-displace];
def Lower_BandK = averageK[-displace] - shift[-displace];

def conditionK1UP = price >= Upper_BandK;
def conditionK2UP = (Upper_BandK[1] < Upper_BandK) and(Lower_BandK[1] < Lower_BandK);
def conditionK3DN = (Upper_BandK[1] > Upper_BandK) and(Lower_BandK[1] > Lower_BandK);
def conditionK4DN = price < Lower_BandK;

def BandwidthK = (Upper_BandK - Lower_BandK) / AvgK * 100;
def BandwidthKS = (Bandwidthk[2] + Bandwidthk[1] + BandwidthK) / 3;
def BulgeK = Highest(BandwidthKS, BulgeLengthK);
def SqueezeK = Lowest(BandwidthKS, SqueezeLengthK);
def BulgeK2 = Highest(BandwidthKS, BulgeLengthK2);
def SqueezeK2 = Lowest(BandwidthKS, SqueezeLengthK2);
def condition_Keltner_Squeeze = BandwidthKS <= SqueezeK;

plot IntermResistance = Highest(price, BulgeLengthPrice);
IntermResistance.AssignValueColor(if (conditionK2UP) then Color.GREEN else if (conditionK3DN) then Color.RED else Color.GRAY);
plot IntermSupport = Lowest(price, SqueezeLengthPrice);
IntermSupport.AssignValueColor(if (conditionK2UP) then Color.GREEN else if (conditionK3DN) then Color.RED else Color.GRAY);

plot NearTResistance = Highest(price, BulgeLengthPrice2);
NearTResistance.AssignValueColor(if (conditionK2UP) then Color.GREEN else if (conditionK3DN) then Color.RED else Color.GRAY);
NearTResistance.SetStyle(Curve.SHORT_DASH);
plot NearTSupport = Lowest(price, SqueezeLengthPrice2);
NearTSupport.AssignValueColor(if (conditionK2UP) then Color.GREEN else if (conditionK3DN) then Color.RED else Color.GRAY);
NearTSupport.SetStyle(Curve.SHORT_DASH);

def NearTResistance1 = Highest(price, BulgeLengthPrice3);
def NearTSupport1 = Lowest(price, SqueezeLengthPrice3);

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
#def MFI_Length = 14;
#def MFIover_Sold = 20;
#def MFIover_Bought = 80;
#def movingAvgLength = 1;
#def MoneyFlowIndex = Average(MoneyFlow(high, close, low, volume, MFI_Length), movingAvgLength);
#def MFIOverBought = MFIover_Bought;
#def MFIOverSold = MFIover_Sold;

#def condition3 = (MoneyFlowIndex[2] < MoneyFlowIndex) is true or(MoneyFlowIndex > 85) is true;
#def condition3D = (MoneyFlowIndex[2] > MoneyFlowIndex) is true or(MoneyFlowIndex < 20) is true;
#def conditionOB2 = MoneyFlowIndex > MFIover_Bought;
#def conditionOS2 = MoneyFlowIndex < MFIover_Sold;

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
def EMA_length = 8;
def AvgExp = ExpAverage(price[-displace], EMA_length);

def condition6 = (price >= AvgExp) and(AvgExp[2] <= AvgExp);
def condition6D = (price < AvgExp) and(AvgExp[2] > AvgExp);

#EMA_2
def EMA_2length = 20;
def displace2 = 0;
def AvgExp2 = ExpAverage(price[-displace2], EMA_2length);

def condition7 = (price >= AvgExp2) and(AvgExp2[2] <= AvgExp);
def condition7D = (price < AvgExp2) and(AvgExp2[2] > AvgExp);

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
#def Klinger_Length = 13;
#def KVOsc = KlingerOscillator(Klinger_Length).KVOsc;
#def KVOH = KVOsc - Average(KVOsc, Klinger_Length);
#def condition13 = (KVOH > 0);
#def condition13D = (KVOH < 0);

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
input coloredCandlesOn = yes;
input Confirmation_Factor = 7;
#Use for testing conditions individually.Remove # from line below and change Confirmation_Factor to 1.
#def Agreement_Level = condition1;
def Agreement_LevelOB = 10;
def Agreement_LevelOS = -10;

def Agreement_Level = condition1 + condition2 + condition4 + condition5 + condition6 + condition7 + condition8 + condition9 + condition10 + condition11 + condition12 + condition14 + conditionK1UP + conditionK2UP;

def Agreement_LevelD = condition1D + condition2D + condition4D + condition5D + condition6D + condition7D + condition8D + condition9D + condition10D + condition11D + condition12D + condition14D + conditionK3DN + conditionK4DN;

def Consensus_Level = Agreement_Level - Agreement_LevelD;

def UP = Consensus_Level >= 4;
def DOWN = Consensus_Level < -4;

def priceColor = if UP then 1
                 else if DOWN then - 1
else priceColor[1];

AssignPriceColor(if coloredCandlesOn and priceColor == 1 then Color.LIGHT_GREEN else if coloredCandlesOn and priceColor == -1 then Color.RED else Color.CURRENT);

#Additional Signals
#Keltner #2
input showCloud = yes;
def factorK2 = 3.25;
def lengthK2 = 20;

def shiftK2 = factorK2 * MovingAverage(trueRangeAverageType, TrueRange(high, close, low), lengthK2);
def averageK2 = MovingAverage(averageType, price, lengthK2);
def AvgK2 = averageK2[-displace];
def Upper_BandK2 = averageK2[-displace] + shiftK2[-displace];
def Lower_BandK2 = averageK2[-displace] - shiftK2[-displace];
def condition_BandRevDn = (Upper_BandS > Upper_BandK2);
def condition_BandRevUp = (Lower_BandS < Lower_BandK2);

AddCloud(if showCloud and condition_BandRevUp then Lower_BandK2 else Double.NaN, Lower_BandS, Color.LIGHT_GREEN, Color.CURRENT);
AddCloud(if showCloud and condition_BandRevDn then Upper_BandS else Double.NaN, Upper_BandK2, Color.LIGHT_RED, Color.CURRENT);

#Super_OB / OS Signal
def OB_Level = conditionOB1 + conditionOB3 + conditionOB4 + conditionOB5 + conditionOB6 + conditionOB7;
def OS_Level = conditionOS1 + conditionOS3 + conditionOS4 + conditionOS5 + conditionOS6 + conditionOS7;

def Consensus_Line = OB_Level - OS_Level;
def Zero_Line = 0;
def Super_OB = 4;
def Super_OS = -4;

def DOWN_OB = (Agreement_Level > Agreement_LevelOB) and(Consensus_Line > Super_OB);
def UP_OS = (Agreement_Level < Agreement_LevelOS) and(Consensus_Line < Super_OS);

def OS_Buy = UP_OS;
def OB_Sell = DOWN_OB;
def neutral = Consensus_Line < Super_OB and Consensus_Line > Super_OS;

#AddVerticalLine(OS_Buy and!OS_Buy[1], close, Color.GREEN, Curve.SHORT_DASH);
#AddVerticalLine(Neutral and!neutral[1], close, Color.Gray, Curve.SHORT_DASH);
#AddVerticalLine(OB_Sell and OB_Sell and!OB_Sell[1], close, Color.RED, Curve.SHORT_DASH);

def Buy_Opportnity = if OS_Buy then Double.POSITIVE_INFINITY else Double.NEGATIVE_INFINITY;
#AddCloud(Buy_Opportnity, Neutral, Color.LIGHT_GREEN, Color.LIGHT_RED);
def Sell_Opportnity = if OB_Sell then Double.POSITIVE_INFINITY else Double.NEGATIVE_INFINITY;
#AddCloud(Sell_Opportnity, Neutral, Color.LIGHT_RED, Color.LIGHT_RED);

plot OB_Signal = Upper_BandS crosses above IntermResistance;
OB_Signal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
OB_Signal.SetLineWeight(3);
OB_Signal.SetDefaultColor(Color.RED);

plot OS_Signal = (condition_BandRevUp) and(Lower_BandS crosses below IntermSupport);
OS_Signal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_POINTS);
OS_Signal.SetLineWeight(3);
OS_Signal.SetDefaultColor(Color.GREEN);

#Squeeze Alert
def length = 20;
def BulgeLength = 150;
def SqueezeLength = 150;
def upperBandBB = BollingerBands(price, displace, length, Num_Dev_Dn, Num_Dev_up, averageType).UpperBand;
def lowerBandBB = BollingerBands(price, displace, length, Num_Dev_Dn, Num_Dev_up, averageType).LowerBand;
def midLineBB = BollingerBands(price, displace, length, Num_Dev_Dn, Num_Dev_up, averageType).MidLine;
def Bandwidth = (upperBandBB - lowerBandBB) / midLineBB * 100;
def Bulge = Highest(Bandwidth, BulgeLength);
def Squeeze = Lowest(Bandwidth, SqueezeLength);

def BandwidthC3 = (NearTResistance1 - NearTSupport1);

def IntermResistance2 = Highest(BandwidthC3, BulgeLengthPrice);
def IntermSupport2 = Lowest(BandwidthC3, SqueezeLengthPrice);
#def NearTResistance2 = Highest(BandwidthC3, BulgeLengthPrice2);
#def NearTSupport2 = Lowest(BandwidthC3, SqueezeLengthPrice2);

def sqzTrigger = BandwidthC3 <= IntermSupport2;
def sqzLevel = if !sqzTrigger[1] and sqzTrigger then hl2
               else if !sqzTrigger then Double.NaN
               else sqzLevel[1];

plot Squeeze_Alert = sqzLevel;
Squeeze_Alert.SetPaintingStrategy(PaintingStrategy.POINTS);
Squeeze_Alert.SetLineWeight(3);
Squeeze_Alert.SetDefaultColor(Color.YELLOW);

#Trend Signals
plot UPConfirmSignal = Agreement_Level crosses above Confirmation_Factor;
UPConfirmSignal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
UPConfirmSignal.SetLineWeight(1);
UPConfirmSignal.SetDefaultColor(Color.GREEN);

plot DOWNConfirmSignal = Agreement_Level crosses below Confirmation_Factor;
DOWNConfirmSignal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
DOWNConfirmSignal.SetLineWeight(1);
DOWNConfirmSignal.SetDefaultColor(Color.RED);
#Bollinger_Bands2
def lengthBB = 10;
def Num_Dev_DnBB = -0.8;
def Num_Dev_upBB = 0.8;

def price1 = open;
def sDev = StDev(data = price[-displace], length = lengthBB);
def MidLineBB2 = MovingAverage(averageType, data = price[-displace], length = lengthBB);
def LowerBandBB2 = MidLineBB2 + Num_Dev_DnBB * sDev;
def UpperBandBB2 = MidLineBB2 + Num_Dev_upBB * sDev;
