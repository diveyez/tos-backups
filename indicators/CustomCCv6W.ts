#Confirmation Level WL developed 04 / 15 / 2021 by Christopher Wilson
#Select the level of agreement among the 15 indicators included.
    #Changed 05 / 20 / 21 Include CIP.

#MACD with Price
declare lower;
def price = close;
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

#RSI
input RSI_length = 14;
input RSI_AverageType = AverageType.WILDERS;

def NetChgAvg = MovingAverage(RSI_AverageType, price - price[1], RSI_length);
def TotChgAvg = MovingAverage(RSI_AverageType, AbsValue(price - price[1]), RSI_length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
def RSI = 50 * (ChgRatio + 1);

def condition2 = (RSI[3] < RSI) is true or(RSI >= 80) is true;

#MFI
input MFI_Length = 14;
def MFIover_Sold = 20;
def MFIover_Bought = 80;
def movingAvgLength = 1;
def MoneyFlowIndex = Average(moneyflow(high, close, low, volume, MFI_Length), movingAvgLength);
def MFIOverBought = MFIover_Bought;
def MFIOverSold = MFIover_Sold;

def condition3 = (MoneyFlowIndex[2] < MoneyFlowIndex) is true or(MoneyFlowIndex > 85) is true;

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

#Change in Price
def lengthCIP = 5;
def displace = 0;
def CIP = (price - price[1]);
def AvgCIP = ExpAverage(CIP[-displace], lengthCIP);
def CIP_UP = AvgCIP > AvgCIP[1];
def CIP_DOWN = AvgCIP < AvgCIP[1];

def condition5 = CIP_UP;

#EMA_1
input EMA_length = 12;
def AvgExp = ExpAverage(price[-displace], EMA_length);

def condition6 = (price >= AvgExp) and(AvgExp[2] <= AvgExp);

#EMA_2
input EMA_2length = 20;
def displace2 = 0;
def AvgExp2 = ExpAverage(price[-displace2], EMA_2length);

def condition7 = (price >= AvgExp2) and(AvgExp2[2] <= AvgExp2);

#DMI Oscillator
input DMI_length = 5;
input averageType = AverageType.WILDERS;

def diPlus = DMI(DMI_length, averageType)."DI+";
def diMinus = DMI(DMI_length, averageType)."DI-";

def Osc = diPlus - diMinus;
def Hist = Osc;
def ZeroLine = 0;

def condition8 = Osc >= ZeroLine;

#Trend_Periods
input TP_fastLength = 3;
input TP_slowLength = 4;

def Periods = sign(ExpAverage(close, TP_fastLength) - ExpAverage(close, TP_slowLength));

def condition9 = Periods > 0;

#Polarized Fractal Efficiency
input PFE_length = 5;
input smoothingLength = 2.5;

def PFE_diff = close - close[PFE_length - 1];
def val = 100 * Sqrt(Sqr(PFE_diff) + Sqr(PFE_length)) / sum(Sqrt(1 + Sqr(close - close[1])), PFE_length - 1);

def PFE = ExpAverage(if PFE_diff > 0 then val else -val, smoothingLength);
def UpperLevel = 50;
def LowerLevel = -50;

def condition10 = PFE > ZERoLine;

#Bollinger Bands PercentB
input BBPB_averageType = AverageType.Simple;
input BBPB_length = 20;
def Num_Dev_Dn = -2.0;
def Num_Dev_up = 2.0;

def upperBand = BollingerBands(price, displace, BBPB_length, Num_Dev_Dn, Num_Dev_up, BBPB_averageType).UpperBand;
def lowerBand = BollingerBands(price, displace, BBPB_length, Num_Dev_Dn, Num_Dev_up, BBPB_averageType).LowerBand;

def PercentB = (price - lowerBand) / (upperBand - lowerBand) * 100;
def HalfLine = 50;
def UnitLine = 100;

def condition11 = PercentB > 50;

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

#Projection Oscillator
def ProjectionOsc_length = 30; #Typically 10
def MaxBound = HighestWeighted(high, ProjectionOsc_length, LinearRegressionSlope(price = high, length = ProjectionOsc_length));
def MinBound = LowestWeighted(low, ProjectionOsc_length, LinearRegressionSlope(price = low, length = ProjectionOsc_length));
def ProjectionOsc_diff = MaxBound - MinBound;
def PROSC = if ProjectionOsc_diff != 0 then 100 * (close - MinBound) / ProjectionOsc_diff else 0;
def PROSC_OB = 80;
def PROSC_OS = 20;

def condition13 = (PROSC > 50);

#Trend Confirmation
#Confirmation_Factor range 1 - 13.
input Confirmation_Factor = 7;
#Use for testing conditions individually.
#def Agreement_Level = condition1;
plot Agreement_Level = condition1 + condition2 + condition3 + condition4 + condition5 + condition6 + condition7 + condition8 + condition9 + condition10 + condition11 + condition12 + condition13;

def Up = Agreement_Level >= Confirmation_Factor;
def Down = Agreement_Level < Confirmation_Factor;

AssignBackgroundColor(if Up then color.DARK_GREEN else if Down then color.LIGHT_RED else color.black);