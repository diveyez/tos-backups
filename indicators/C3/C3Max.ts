#C3_Max_v2 Created by Christopher84 12 / 14 / 2021
#Last modified 4 / 11 / 2022 removed C3_MF_Line_Extension
# Based off of the Confirmation Candles Study.Main difference is that CC Candles weigh factors of positive
# and negative price movement to create the Consensus_Level.The Consensus_Level is considered positive if
# above zero and negative if below zero.

declare upper;

input price = CLOSE;
input ShortLength1 = 5;
input ShortLength2 = 14;
input ShortLength3 = 5;
input LongLength1 = 12;
input LongLength2 = 55;
input LongLength3 = 7;
input coloredCandlesOn = yes;

# Momentum Oscillators

def MS = Average(Average(price, ShortLength1) - Average(price, ShortLength2), ShortLength3);
def MS2 = Average(Average(price, LongLength1) - Average(price, LongLength2), LongLength3);
# Wave A
def MSGreens = If(MS >= 0, MS, 0);
def MSReds = If(MS < 0, MS, 0);
# Wave C
def MS2Blues = If(MS2 >= 0, MS2, 0);
def MS2Yellows = If(MS2 < 0, MS2, 0);

def MayhemBullish = MSGreens > MSGreens[1] and  MS2Blues > MS2Blues[1];
def MayhemBearish = MSReds < MSReds[1] and  MS2Yellows < MS2Yellows[1];

def MS_Pos = MSGreens;
def MS_Neg = MSReds;
def MS2_Pos = MS2Blues;
def MS2_Neg = MS2Yellows;

# Squeeze Indicator
def length = 20;
def nK = 1.5;
def nBB = 2.0;

def BBHalfWidth = StDev(price, length);
def KCHalfWidth = nK * Average(TrueRange(high, close, low), length);
def isSqueezed = nBB * BBHalfWidth / KCHalfWidth < 1;

def BBS_Ind = If(isSqueezed, 0, Double.NaN);

# Bollinger Resolution
def BBSMA = Average(price, length);
def BBSMAL = BBSMA + (-nBB * BBHalfWidth);
def BBSMAU = BBSMA + (nBB * BBHalfWidth);
def PerB = RoundUp((price - BBSMAL) / (BBSMAU - BBSMAL) * 100, 0);
AddLabel(yes, Concat("%B: ", PerB), if PerB < 0 then Color.YELLOW else if PerB > 0 and PerB[1] < 0 then Color.GREEN else Color.WHITE);

# Parabolic SAR Signal
def accelerationFactor = 0.0275;
def accelerationLimit = 0.2;

def SAR = ParabolicSAR(accelerationFactor = accelerationFactor, accelerationLimit = accelerationLimit);
def bearishCross = Crosses(SAR, price, CrossingDirection.ABOVE);

plot signalDown = bearishCross; #If(bearishCross, 0, Double.NaN);
signalDown.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
signalDown.SetLineWeight(3);
signalDown.AssignValueColor(Color.DOWNTICK);

def bullishCross = Crosses(SAR, price, CrossingDirection.BELOW);

plot signalUp = bullishCross; #If(bullishCross, 0, Double.NaN);
signalUp.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
signalUp.SetLineWeight(3);
signalUp.AssignValueColor(Color.UPTICK);

def UP = bullishCross;
def DOWN = bearishCross;
def priceColor = if UP then 1
                 else if DOWN then - 1
else priceColor[1];

####################################################################################################################################################

#OB_OS_Levels_v5

def BarsUsedForRange = 2;
def BarsRequiredToRemainInRange = 2;
def TargetMultiple = 0.5;
def ColorPrice = yes;
def HideTargets = no;
def HideBalance = no;
def HideBoxLines = no;
def HideCloud = no;
def HideLabels = no;

#--------------
    #Squeeze Alert
#--------------

    #Squeeze Dots Created 04 / 28 / 2021 by Christopher84
input ATRPeriod = 5;
input ATRFactor = 2.0;
def HiLo = Min(high - low, 1.5 * Average(high - low, ATRPeriod));
def HRef = if low <= high[1]
    then high - close[1]
    else (high - close[1]) - 0.5 * (low - high[1]);
def LRef = if high >= low[1]
    then close[1] - low
    else (close[1] - low) - 0.5 * (low[1] - high);
input trailType = { default modified, unmodified };
def trueRange;
switch (trailType) {
    case modified:
        trueRange = Max(HiLo, Max(HRef, LRef));
    case unmodified:
        trueRange = TrueRange(high, close, low);
}
input averageType = AverageType.SIMPLE;
input firstTrade = { default long, short };
#input averageType = AverageType.WILDERS;####Use Simple instead of Wilders
def loss = ATRFactor * MovingAverage(averageType, trueRange, ATRPeriod);
def state = { default init, long, short };
def trail;
switch (state[1]) {
    case init:
        if (!IsNaN(loss)) {
            switch (firstTrade) {
                case long:
                    state = state.long;
                    trail = close - loss;
                case short:
                    state = state.short;
                    trail = close + loss;
            }
        } else {
            state = state.init;
            trail = Double.NaN;
        }
    case long:
        if (close > trail[1]) {
            state = state.long;
            trail = Max(trail[1], close - loss);
        } else {
            state = state.short;
            trail = close + loss;
        }
    case short:
        if (close < trail[1]) {
            state = state.short;
            trail = Min(trail[1], close + loss);
        } else {
            state = state.long;
            trail = close - loss;
        }
}

def TrailingStop = trail;
def H = Highest(TrailingStop, 12);
def L = Lowest(TrailingStop, 12);
def BulgeLengthPrice = 100;
def SqueezeLengthPrice = 100;
def BandwidthC3 = (H - L);
def IntermResistance2 = Highest(BandwidthC3, BulgeLengthPrice);
def IntermSupport2 = Lowest(BandwidthC3, SqueezeLengthPrice);
def sqzTrigger = BandwidthC3 <= IntermSupport2;
def sqzLevel = if !sqzTrigger[1] and sqzTrigger then hl2
               else if !sqzTrigger then Double.NaN
               else sqzLevel[1];

plot Squeeze_Alert = sqzLevel;
Squeeze_Alert.SetPaintingStrategy(PaintingStrategy.POINTS);
Squeeze_Alert.SetLineWeight(3);
Squeeze_Alert.SetDefaultColor(Color.YELLOW);

#-----------------------------
    #Yellow Candle_height(OB_OS)
#-----------------------------
    def displace = 0;
def factorK2 = 3.25;
def lengthK2 = 20;
def price1 = open;
def trueRangeAverageType = AverageType.SIMPLE;
def ATR_length = 15;
def SMA_lengthS = 6;
input ATRPeriod2 = 5;
input ATRFactor2 = 1.5;
#input averageType = AverageType.WILDERS;####Use Simple instead of Wilders
def HiLo2 = Min(high - low, 1.5 * Average(high - low, ATRPeriod));
def HRef2 = if low <= high[1]
    then high - close[1]
    else (high - close[1]) - 0.5 * (low - high[1]);
def LRef2 = if high >= low[1]
    then close[1] - low
    else (close[1] - low) - 0.5 * (low[1] - high);
def loss2 = ATRFactor2 * MovingAverage(averageType, trueRange, ATRPeriod2);

def multiplier_factor = 1.25;
def valS = Average(price, SMA_lengthS);
def average_true_range = Average(TrueRange(high, close, low), length = ATR_length);
def Upper_BandS = valS[-displace] + multiplier_factor * average_true_range[-displace];
def Middle_BandS = valS[-displace];
def Lower_BandS = valS[-displace] - multiplier_factor * average_true_range[-displace];

def shiftK2 = factorK2 * MovingAverage(trueRangeAverageType, TrueRange(high, close, low), lengthK2);
def averageK2 = MovingAverage(averageType, price, lengthK2);
def AvgK2 = averageK2[-displace];
def Upper_BandK2 = averageK2[-displace] + shiftK2[-displace];
def Lower_BandK2 = averageK2[-displace] - shiftK2[-displace];

def condition_BandRevDn = (Upper_BandS > Upper_BandK2);
def condition_BandRevUp = (Lower_BandS < Lower_BandK2);

def fastLength = 12;
def slowLength = 26;
def MACDLength = 9;
input MACD_AverageType = { SMA, default EMA };

def fastEMA = ExpAverage(price, fastLength);
def slowEMA = ExpAverage(price, slowLength);
def Value;
def Avg1;
switch (MACD_AverageType) {
    case SMA:
        Value = Average(price, fastLength) - Average(price, slowLength);
        Avg1 = Average(Value, MACDLength);
    case EMA:
        Value = fastEMA - slowEMA;
        Avg1 = ExpAverage(Value, MACDLength);
}
def Diff = Value - Avg1;
def MACDLevel = 0.0;
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
input Confirmation_Factor = 7;
#Use for testing conditions individually.Remove # from line below and change Confirmation_Factor to 1.
#def Agreement_Level = condition1;
def Agreement_LevelOB = 12;
def Agreement_LevelOS = 2;

def factorK = 2.0;
def lengthK = 20;
def shift = factorK * MovingAverage(trueRangeAverageType, TrueRange(high, close, low), lengthK);
def averageK = MovingAverage(averageType, price, lengthK);
def AvgK = averageK[-displace];
def Upper_BandK = averageK[-displace] + shift[-displace];
def Lower_BandK = averageK[-displace] - shift[-displace];

def conditionK1UP = price >= Upper_BandK;
def conditionK2UP = (Upper_BandK[1] < Upper_BandK) and(Lower_BandK[1] < Lower_BandK);
def conditionK3DN = (Upper_BandK[1] > Upper_BandK) and(Lower_BandK[1] > Lower_BandK);
def conditionK4DN = price < Lower_BandK;
def Agreement_Level = condition1 + condition2 + condition3 + condition4 + condition5 + condition6 + condition7 + condition8 + condition9 + condition10 + condition11 + condition12 + condition13 + condition14 + conditionK1UP + conditionK2UP;

def Agreement_LevelD = (condition1D + condition2D + condition3D + condition4D + condition5D + condition6D + condition7D + condition8D + condition9D + condition10D + condition11D + condition12D + condition13D + condition14D + conditionK3DN + conditionK4DN);

def Consensus_Level = Agreement_Level - Agreement_LevelD;

def UP2 = Consensus_Level >= 4;
def DOWN2 = Consensus_Level < -5;

def priceColor2 = if UP2 then 1
                 else if DOWN2 then - 1
else priceColor2[1];

def Consensus_Level_OB = 14;
def Consensus_Level_OS = -12;

#Super_OB / OS Signal
def OB_Level = conditionOB1 + conditionOB2 + conditionOB3 + conditionOB4 + conditionOB5 + conditionOB6 + conditionOB7;
def OS_Level = conditionOS1 + conditionOS2 + conditionOS3 + conditionOS4 + conditionOS5 + conditionOS6 + conditionOS7;

def Consensus_Line = OB_Level - OS_Level;
def Zero_Line = 0;
def Super_OB = 4;
def Super_OS = -4;

def DOWN_OB = (Agreement_Level > Agreement_LevelOB) and(Consensus_Line > Super_OB) and(Consensus_Level > Consensus_Level_OB);
def UP_OS = (Agreement_Level < Agreement_LevelOS) and(Consensus_Line < Super_OS) and(Consensus_Level < Consensus_Level_OS);

def OS_Buy = UP_OS;
def OB_Sell = DOWN_OB;
def neutral = Consensus_Line < Super_OB and Consensus_Line > Super_OS;



input use_line_limits = yes; #Yes, plots line from / to; No, plot line across entire chart
input linefrom = 100; #Hint linefrom: limits how far line plots in candle area
input lineto = 12; #Hint lineto: limits how far into expansion the line will plot

def YHOB = if coloredCandlesOn and((price1 > Upper_BandS) and(condition_BandRevDn)) then high else Double.NaN;
def YHOS = if coloredCandlesOn and((price1 < Lower_BandS) and(condition_BandRevUp)) then high else Double.NaN;

def YLOB = if coloredCandlesOn and((price1 > Upper_BandS) and(condition_BandRevDn)) then low else Double.NaN;
def YLOS = if coloredCandlesOn and((price1 < Lower_BandS) and(condition_BandRevUp)) then low else Double.NaN;

#extend midline of yellow candle
plot YCOB = if !IsNaN(YHOB) then hl2 else Double.NaN;
YCOB.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
YCOB.SetDefaultColor(Color.GREEN);
def YHextOB = if IsNaN(YCOB) then YHextOB[1] else YCOB;
plot YHextlineOB = YHextOB;
YHextlineOB.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
YHextlineOB.SetDefaultColor(Color.ORANGE);
YHextlineOB.SetLineWeight(2);

plot YCOS = if !IsNaN(YHOS) then hl2 else Double.NaN;
YCOS.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
YCOS.SetDefaultColor(Color.GREEN);
def YHextOS = if IsNaN(YCOS) then YHextOS[1] else YCOS;
plot YHextlineOS = YHextOS;
YHextlineOS.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
YHextlineOS.SetDefaultColor(Color.LIGHT_GREEN);
YHextlineOS.SetLineWeight(2);

def YC = coloredCandlesOn and priceColor2 == 1 and price1 > Upper_BandS and condition_BandRevDn;

#Additional Signals
input showCloud = yes;
#AddCloud(if showCloud and condition_BandRevUp then Lower_BandK2 else Double.NaN, Lower_BandS, Color.LIGHT_GREEN, Color.CURRENT);
#AddCloud(if showCloud and condition_BandRevDn then Upper_BandS else Double.NaN, Upper_BandK2, Color.LIGHT_RED, Color.CURRENT);

# Identify Consolidation

def HH = Highest(high[1], BarsUsedForRange);
def LL = Lowest(low[1], BarsUsedForRange);

def maxH = Highest(HH, BarsRequiredToRemainInRange);
def maxL = Lowest(LL, BarsRequiredToRemainInRange);

def HHn = if maxH == maxH[1] or maxL == maxL then maxH else HHn[1];
def LLn = if maxH == maxH[1] or maxL == maxL then maxL else LLn[1];

def Bh = if high <= HHn and HHn == HHn[1] then HHn else Double.NaN;
def Bl = if low >= LLn and LLn == LLn[1] then LLn else Double.NaN;

def CountH = if IsNaN(Bh) or IsNaN(Bl) then 2 else CountH[1] + 1;
def CountL = if IsNaN(Bh) or IsNaN(Bl) then 2 else CountL[1] + 1;

def ExpH = if BarNumber() == 1 then Double.NaN else
if CountH[-BarsRequiredToRemainInRange] >= BarsRequiredToRemainInRange then HHn[-BarsRequiredToRemainInRange] else
if high <= ExpH[1] then ExpH[1] else Double.NaN;

def ExpL = if BarNumber() == 1 then Double.NaN else
if CountL[-BarsRequiredToRemainInRange] >= BarsRequiredToRemainInRange then LLn[-BarsRequiredToRemainInRange] else
if low >= ExpL[1] then ExpL[1] else Double.NaN;

# Plot the High and Low of the Box; Paint Cloud
def BoxHigh = if ((DOWN_OB) or(Upper_BandS crosses above Upper_BandK2) or(condition_BandRevDn) and(high > high[1]) and((price > Upper_BandK2) or(price > Upper_BandS))) then Highest(ExpH) else Double.NaN;

def BoxLow = if (DOWN_OB) or((Upper_BandS crosses above Upper_BandK2)) then Lowest(low) else Double.NaN;

def BoxHigh2 = if ((UP_OS) or((Lower_BandS crosses below Lower_BandK2))) then Highest(ExpH) else Double.NaN;

#def BH2 = if !IsNaN(BoxHigh2) then high else Double.NaN;

#def BH2ext = if IsNaN(BH2) then BH2ext[1] else BH2;
#def BH2extline = BH2ext;

#plot H_BH2extline = Lowest(BH2extline, 1);
#H_BH2extline.SetDefaultColor(Color.GREEN);

def BoxLow2 = if ((UP_OS) or(Lower_BandS crosses below Lower_BandK2) or(condition_BandRevUp) and(low < low[1]) and((price < Lower_BandK2) or(price < Lower_BandS))) or((UP_OS[1]) and(low < low[1])) then Lowest(low) else Double.NaN;

# extend the current YCHigh line to the right edge of the chart
def BH1 = if !IsNaN(BoxHigh) then high else Double.NaN;

def BH1ext = if IsNaN(BH1) then BH1ext[1] else BH1;
def BH1extline = BH1ext;


def BL1 = if !IsNaN(BoxLow) then low else Double.NaN;
#BL1.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
#BL1.SetDefaultColor(Color.RED);
def BL1ext = if IsNaN(BL1) then BL1ext[1] else BL1;
plot BL1extline = BL1ext;
BL1extline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
BL1extline.SetDefaultColor(Color.RED);
BL1extline.SetLineWeight(1);

def BH2 = if !IsNaN(BoxHigh2) then high else Double.NaN;
#BH2.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
#BH2.SetDefaultColor(Color.GREEN);
def BH2ext = if IsNaN(BH2) then BH2ext[1] else BH2;
def BH2extline = BH2ext;
#BH2extline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
#BH2extline.SetDefaultColor(Color.GREEN);
#BH2extline.SetLineWeight(3);

def BL2 = if !IsNaN(BoxLow2) then low else Double.NaN;
#BL2.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
#BL2.SetDefaultColor(Color.RED);
def BL2ext = if IsNaN(BL2) then BL2ext[1] else BL2;
plot BL2extline = BL2ext;
BL2extline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
BL2extline.SetDefaultColor(Color.GREEN);
BL2extline.SetLineWeight(1);

plot H_BH1extline = Highest(BH1extline, 1);
H_BH1extline.SetDefaultColor(Color.RED);
plot L_BL1extline = Highest(BL1extline, 1);
L_BL1extline.SetDefaultColor(Color.RED);

plot H_BH2extline = Lowest(BH2extline, 1);
H_BH2extline.SetDefaultColor(Color.Green);
plot L_BL2extline = Lowest(BL2extline, 1);
L_BL2extline.SetDefaultColor(Color.GREEN);

#plot L_BL1extline = Highest(BL1extline, 1);
#     L_BL1extline.SetDefaultColor(Color.Red);

AddCloud(if showCloud and!HideCloud then BH1extline else Double.NaN, BL1extline, Color.RED, Color.GRAY);
AddCloud(if showCloud and!HideCloud then BH2extline else Double.NaN, BL2extline, Color.GREEN, Color.GRAY);

script WMA_Smooth {
    input price = hl2;
    plot smooth = (4 * price
        + 3 * price[1]
        + 2 * price[2]
        + price[3]) / 10;
}

script Phase_Accumulation {

    input price = hl2;

    rec Smooth;
    rec Detrender;
    rec Period;
    rec Q1;
    rec I1;
    rec I1p;
    rec Q1p;
    rec Phase1;
    rec Phase;
    rec DeltaPhase;
    rec DeltaPhase1;
    rec InstPeriod1;
    rec InstPeriod;
    def CorrectionFactor;

    if BarNumber() <= 5
    then {
        Period = 0;
        Smooth = 0;
        Detrender = 0;
        CorrectionFactor = 0;
        Q1 = 0;
        I1 = 0;
        Q1p = 0;
        I1p = 0;
        Phase = 0;
        Phase1 = 0;
        DeltaPhase1 = 0;
        DeltaPhase = 0;
        InstPeriod = 0;
        InstPeriod1 = 0;
    } else {
        CorrectionFactor = 0.075 * Period[1] + 0.54;

# Smooth and detrend my smoothed signal:
        Smooth = WMA_Smooth(price);
        Detrender = (0.0962 * Smooth
            + 0.5769 * Smooth[2]
            - 0.5769 * Smooth[4]
            - 0.0962 * Smooth[6]) * CorrectionFactor;

# Compute Quadrature and Phase of Detrended signal:
        Q1p = (0.0962 * Detrender
            + 0.5769 * Detrender[2]
            - 0.5769 * Detrender[4]
            - 0.0962 * Detrender[6]) * CorrectionFactor;
        I1p = Detrender[3];

# Smooth out Quadrature and Phase:
        I1 = 0.15 * I1p + 0.85 * I1p[1];
        Q1 = 0.15 * Q1p + 0.85 * Q1p[1];

# Determine Phase
        if I1 != 0
        then {
# Normally, ATAN gives results from - pi / 2 to pi / 2.
# We need to map this to circular coordinates 0 to 2pi

            if Q1 >= 0 and I1 > 0
            then { # Quarant 1
                Phase1 = ATan(AbsValue(Q1 / I1));
            } else if Q1 >= 0 and I1 < 0
            then { # Quadrant 2
                Phase1 = Double.Pi - ATan(AbsValue(Q1 / I1));
            } else if Q1 < 0 and I1 < 0
            then { # Quadrant 3
                Phase1 = Double.Pi + ATan(AbsValue(Q1 / I1));
            } else { # Quadrant 4
                Phase1 = 2 * Double.Pi - ATan(AbsValue(Q1 / I1));
            }
        } else if Q1 > 0
        then { # I1 == 0, Q1 is positive
            Phase1 = Double.Pi / 2;
        } else if Q1 < 0
        then { # I1 == 0, Q1 is negative
            Phase1 = 3 * Double.Pi / 2;
        } else { # I1 and Q1 == 0
            Phase1 = 0;
        }

# Convert phase to degrees
        Phase = Phase1 * 180 / Double.Pi;

        if Phase[1] < 90 and Phase > 270
        then {
# This occurs when there is a big jump from 360 - 0
            DeltaPhase1 = 360 + Phase[1] - Phase;
        } else {
            DeltaPhase1 = Phase[1] - Phase;
        }

# Limit our delta phases between 7 and 60
        if DeltaPhase1 < 7
        then {
            DeltaPhase = 7;
        } else if DeltaPhase1 > 60
        then {
            DeltaPhase = 60;
        } else {
            DeltaPhase = DeltaPhase1;
        }

# Determine Instantaneous period:
        InstPeriod1 =
            -1 * (fold i = 0 to 40 with v = 0 do
                if v < 0 then
v
else if v > 360 then
            - i
        else
            v + GetValue(DeltaPhase, i, 41)
);

        if InstPeriod1 <= 0
        then {
            InstPeriod = InstPeriod[1];
        } else {
            InstPeriod = InstPeriod1;
        }

        Period = 0.25 * InstPeriod + 0.75 * Period[1];
    }
    plot DC = Period;
}

script Ehler_MAMA {
    input price = hl2;
    input FastLimit = 0.5;
    input SlowLimit = 0.05;


    rec Period;
    rec Period_raw;
    rec Period_cap;
    rec Period_lim;

    rec Smooth;
    rec Detrender;
    rec I1;
    rec Q1;
    rec jI;
    rec jQ;
    rec I2;
    rec Q2;
    rec I2_raw;
    rec Q2_raw;

    rec Phase;
    rec DeltaPhase;
    rec DeltaPhase_raw;
    rec alpha;
    rec alpha_raw;

    rec Re;
    rec Im;
    rec Re_raw;
    rec Im_raw;

    rec SmoothPeriod;
    rec vmama;
    rec vfama;

    def CorrectionFactor = Phase_Accumulation(price).CorrectionFactor;

    if BarNumber() <= 5
    then {
        Smooth = 0;
        Detrender = 0;

        Period = 0;
        Period_raw = 0;
        Period_cap = 0;
        Period_lim = 0;
        I1 = 0;
        Q1 = 0;
        I2 = 0;
        Q2 = 0;
        jI = 0;
        jQ = 0;
        I2_raw = 0;
        Q2_raw = 0;
        Re = 0;
        Im = 0;
        Re_raw = 0;
        Im_raw = 0;
        SmoothPeriod = 0;
        Phase = 0;
        DeltaPhase = 0;
        DeltaPhase_raw = 0;
        alpha = 0;
        alpha_raw = 0;
        vmama = 0;
        vfama = 0;
    } else {
# Smooth and detrend my smoothed signal:
        Smooth = WMA_Smooth(price);
        Detrender = (0.0962 * Smooth
            + 0.5769 * Smooth[2]
            - 0.5769 * Smooth[4]
            - 0.0962 * Smooth[6]) * CorrectionFactor;

        Q1 = (0.0962 * Detrender
            + 0.5769 * Detrender[2]
            - 0.5769 * Detrender[4]
            - 0.0962 * Detrender[6]) * CorrectionFactor;
        I1 = Detrender[3];

        jI = (0.0962 * I1
            + 0.5769 * I1[2]
            - 0.5769 * I1[4]
            - 0.0962 * I1[6]) * CorrectionFactor;

        jQ = (0.0962 * Q1
            + 0.5769 * Q1[2]
            - 0.5769 * Q1[4]
            - 0.0962 * Q1[6]) * CorrectionFactor;

# This is the complex conjugate
        I2_raw = I1 - jQ;
        Q2_raw = Q1 + jI;

        I2 = 0.2 * I2_raw + 0.8 * I2_raw[1];
        Q2 = 0.2 * Q2_raw + 0.8 * Q2_raw[1];

        Re_raw = I2 * I2[1] + Q2 * Q2[1];
        Im_raw = I2 * Q2[1] - Q2 * I2[1];

        Re = 0.2 * Re_raw + 0.8 * Re_raw[1];
        Im = 0.2 * Im_raw + 0.8 * Im_raw[1];

# Compute the phase
        if Re != 0 and Im != 0
        then {
            Period_raw = 2 * Double.Pi / ATan(Im / Re);
        } else {
            Period_raw = 0;
        }

        if Period_raw > 1.5 * Period_raw[1]
        then {
            Period_cap = 1.5 * Period_raw[1];
        } else if Period_raw < 0.67 * Period_raw[1] {
            Period_cap = 0.67 * Period_raw[1];
        } else {
            Period_cap = Period_raw;
        }

        if Period_cap < 6
        then {
            Period_lim = 6;
        } else if Period_cap > 50
        then {
            Period_lim = 50;
        } else {
            Period_lim = Period_cap;
        }

        Period = 0.2 * Period_lim + 0.8 * Period_lim[1];
        SmoothPeriod = 0.33 * Period + 0.67 * SmoothPeriod[1];

        if I1 != 0
        then {
            Phase = ATan(Q1 / I1);
        } else if Q1 > 0
        then { # Quadrant 1:
            Phase = Double.Pi / 2;
        } else if Q1 < 0
        then { # Quadrant 4:
            Phase = -Double.Pi / 2;
        } else { # Both numerator and denominator are 0.
            Phase = 0;
        }

        DeltaPhase_raw = Phase[1] - Phase;
        if DeltaPhase_raw < 1
        then {
            DeltaPhase = 1;
        } else {
            DeltaPhase = DeltaPhase_raw;
        }

        alpha_raw = FastLimit / DeltaPhase;
        if alpha_raw < SlowLimit
        then {
            alpha = SlowLimit;
        } else {
            alpha = alpha_raw;
        }
        vmama = alpha * price + (1 - alpha) * vmama[1];
        vfama = 0.5 * alpha * vmama + (1 - 0.5 * alpha) * vfama[1];
    }

    plot MAMA = vmama;
    plot FAMA = vfama;
}


input price2 = hl2;
input FastLimit = 0.5;
input SlowLimit = 0.05;

def MAMA = Ehler_MAMA(price2, FastLimit, SlowLimit).MAMA;
def FAMA = Ehler_MAMA(price2, FastLimit, SlowLimit).FAMA;

def Crossing = Crosses((MAMA < FAMA), yes);
#Crossing.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);

def Crossing1 = Crosses((MAMA > FAMA), yes);
#Crossing1.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);

AddLabel(yes, Concat("MAMA: ", Concat("",
if MAMA > FAMA then "Bull" else "Bear")),

if MAMA > FAMA then Color.GREEN else Color.RED);

##################################
plot C3_MF_Line = (MAMA + FAMA) / 2;
C3_MF_Line.SetPaintingStrategy(PaintingStrategy.LINE);
C3_MF_Line.SetLineWeight(3);
C3_MF_Line.AssignValueColor(if ((priceColor2 == 1) and(price1 > Upper_BandS) and(condition_BandRevDn)) then Color.YELLOW else if ((priceColor2 == -1) and(price1 < Lower_BandS) and(condition_BandRevUp)) then Color.YELLOW else if priceColor2 == -1 then Color.RED  else if (priceColor2 == 1) then Color.GREEN else Color.CURRENT);

def C3_MF_UP = C3_MF_Line > C3_MF_Line[1];
def C3_MF_DN = C3_MF_Line < C3_MF_Line[1];
def priceColor9 = if C3_MF_UP then 1
                 else if C3_MF_DN then - 1
else priceColor9[1];

def MF_UP = FAMA < MAMA;
def MF_DN = FAMA > MAMA;
def priceColor10 = if MF_UP then 1
                 else if MF_DN then - 1
else priceColor10[1];

input extension_length_limited_to = 10;
def lastbar = if isnan(close[-1]) and!isnan(close) then barnumber() else double.nan;
#def inertline = inertiaall(C3_MF_Line, 2);
#def EXT_C3_MF = if !IsNaN(close()) then inertline else EXT_C3_MF[1] + ((EXT_C3_MF[1] - EXT_C3_MF[2]) / (2 - 1));
#plot extension = if barnumber() <= highestall(lastbar) + extension_length_limited_to then EXT_C3_MF else double.nan;
#extension.SetDefaultColor(Color.white);
####################################################################################################################################################

#EMA's
input length8 = 10;
input length9 = 35;
input show_ema_cloud = yes;

plot AvgExp8 = ExpAverage(price[-displace], length8);
def UPD = AvgExp8[1] < AvgExp8;
AvgExp8.SetStyle(Curve.SHORT_DASH);
#AvgExp8.SetLineWeight(1);

plot AvgExp9 = ExpAverage(price[-displace], length9);
def UPW = AvgExp9[1] < AvgExp9;
AvgExp9.SetStyle(Curve.SHORT_DASH);
#AvgExp9.SetLineWeight(1);

def Below = AvgExp8 < AvgExp9;
def Spark = UPD + UPW + Below;

def UPEMA = AvgExp8[1] < AvgExp8;
def DOWNEMA = AvgExp8[1] > AvgExp8;
AvgExp8.AssignValueColor(if UPEMA then Color.LIGHT_GREEN else if DOWNEMA then Color.RED else Color.YELLOW);

def UPEMA2 = AvgExp9[1] < AvgExp9;
def DOWNEMA2 = AvgExp9[1] > AvgExp9;
AvgExp9.AssignValueColor(if UPEMA2 then Color.LIGHT_GREEN else if DOWNEMA2 then Color.RED else Color.YELLOW);

AddCloud(if show_ema_cloud and(AvgExp9 > AvgExp8) then AvgExp9 else Double.NaN, AvgExp8, Color.LIGHT_RED, Color.CURRENT);
AddCloud(if show_ema_cloud and(AvgExp8 > AvgExp9) then AvgExp8 else Double.NaN, AvgExp9, Color.LIGHT_GREEN, Color.CURRENT);

def UP8 = UPEMA and UPEMA2;
def DOWN8 = DOWNEMA and DOWNEMA2;
def priceColor8 = if UP8 then 1
                 else if DOWN8 then - 1
else 0;

def UpCalc = (priceColor == 1) + (priceColor2 == 1) + (priceColor8 == 1) + (priceColor10 == 1);

def CandleColor = if (UpCalc >= 3) then 1
                 else if (UpCalc == 0) then - 1
else if (priceColor2 == 1) then 1
                 else if (priceColor2 == -1) then - 1
else CandleColor[1];
AssignPriceColor(if coloredCandlesOn and(CandleColor == 1) then Color.GREEN else if coloredCandlesOn and(CandleColor == -1) then Color.RED else Color.GRAY);

#Labels
def Buy = UP_OS;
def Sell = DOWN_OB;
def conditionLTB = (ConditionK2UP and(Consensus_Level < 0));
def conditionLTS = (ConditionK3DN and(Consensus_Level > 0));
def conditionBO = ((Upper_BandS[1] < Upper_BandS) and(Lower_BandS[1] < Lower_BandS)) and((Upper_BandK[1] < Upper_BandK) and(Lower_BandK[1] < Lower_BandK));
def conditionBD = ((Upper_BandS[1] > Upper_BandS) and(Lower_BandS[1] > Lower_BandS) and(Upper_BandK[1] > Upper_BandK) and(Lower_BandK[1] > Lower_BandK));
def MomentumUP = Consensus_Level[1] < Consensus_Level;
def MomentumDOWN = Consensus_Level[1] > Consensus_Level;

def Squeeze_Signal = !IsNaN(Squeeze_Alert);
def conditionOB = (Consensus_Level >= 12) and(Consensus_Line >= 4);
def conditionOS = (Consensus_Level <= -12) and(Consensus_Line <= -3);

AddLabel(yes, if conditionLTB then "BULLISH_LOOK_To_BUY" else if conditionLTS then "BEARISH_LOOK_TO_SELL" else if conditionK2UP then "TREND_BULLISH" else if conditionK3DN then "TREND_BEARISH" else "TREND_CONSOLIDATION", if conditionLTB then Color.GREEN else if conditionLTS then Color.RED else if conditionK2UP then Color.WHITE else if conditionK3DN then Color.DARK_GRAY else Color.GRAY);

AddLabel(yes, if conditionBD then "BREAKDOWN" else if conditionBO then "BREAKOUT" else "NO_BREAK", if conditionBD then Color.RED else if conditionBO then Color.GREEN else Color.GRAY);

AddLabel(yes, if (Spark == 3) then "SPARK UP = " + Round(Spark, 1) else if (Spark == 0) then  "SPARK DOWN = " + Round(Spark, 1) else "SPARK = " + Round(Spark, 1), if (Spark == 3) then Color.YELLOW else if (Spark == 2) then Color.GREEN else if (Spark == 0) then Color.RED else Color.GRAY);

AddLabel(yes, "SQUEEZE ALERT", if Squeeze_Signal then Color.YELLOW else Color.GRAY);

AddLabel(yes, if MomentumUP then "Consensus_Increasing = " + Round(Consensus_Level, 1) else if MomentumUP or MomentumDOWN and conditionOB then "Consensus_OVERBOUGHT = " + Round(Consensus_Level, 1) else if MomentumDOWN then  "Consensus_Decreasing = " + Round(Consensus_Level, 1) else if MomentumUP or MomentumDOWN and conditionOS then "Consensus_OVERSOLD = " + Round(Consensus_Level, 1) else "Consensus = " + Round(Consensus_Level, 1), if conditionOB then Color.RED else if conditionOS then Color.GREEN else Color.GRAY);