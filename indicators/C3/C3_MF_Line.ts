# C3_MF_Line_v2 Created by Christopher84 03 /06 / 2022   
# Based off of the Confirmation Candles Study.Main difference is that CC Candles weigh factors of positive
# and negative price movement to create the Consensus_Level.The Consensus_Level is considered positive if
# above zero and negative if below zero.

#Keltner Channel
declare upper;
def displace = 0;
def factorK = 2.0;
def lengthK = 20;
def price = close;
def price1 = open;
input averageType = AverageType.SIMPLE;
def trueRangeAverageType = AverageType.SIMPLE;
def BulgeLengthPrice = 100;
def SqueezeLengthPrice = 100;
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

def IntermResistance = Highest(price, BulgeLengthPrice);
#IntermResistance.AssignValueColor(if (conditionK2UP) then Color.GREEN else if (conditionK3DN) then Color.RED else Color.GRAY);
def IntermSupport = Lowest(price, SqueezeLengthPrice);
#IntermSupport.AssignValueColor(if (conditionK2UP) then Color.GREEN else if (conditionK3DN) then Color.RED else Color.GRAY);

def NearTResistance = Highest(price, BulgeLengthPrice2);
#NearTResistance.AssignValueColor(if (conditionK2UP) then Color.GREEN else if (conditionK3DN) then Color.RED else Color.GRAY);
#NearTResistance.SetStyle(Curve.SHORT_DASH);
def NearTSupport = Lowest(price, SqueezeLengthPrice2);
#NearTSupport.AssignValueColor(if (conditionK2UP) then Color.GREEN else if (conditionK3DN) then Color.RED else Color.GRAY);
#NearTSupport.SetStyle(Curve.SHORT_DASH);

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
input coloredCandlesOn = yes;
input Confirmation_Factor = 7;
#Use for testing conditions individually.Remove # from line below and change Confirmation_Factor to 1.
#def Agreement_Level = condition1;
def Agreement_LevelOB = 10;
def Agreement_LevelOS = -10;

def Agreement_Level = condition1 + condition2 + condition3 + condition4 + condition5 + condition6 + condition7 + condition8 + condition9 + condition10 + condition11 + condition12 + condition13 + condition14 + conditionK1UP + conditionK2UP;

def Agreement_LevelD = (condition1D + condition2D + condition3D + condition4D + condition5D + condition6D + condition7D + condition8D + condition9D + condition10D + condition11D + condition12D + condition13D + condition14D + conditionK3DN + conditionK4DN);

def Consensus_Level = Agreement_Level - Agreement_LevelD;

def UP = Consensus_Level >= 6;
def DOWN = Consensus_Level < -6;

def priceColor = if UP then 1
                 else if DOWN then - 1
else priceColor[1];

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

#Consensus_Level.AssignValueColor(
    #if Consensus_Level > Consensus_Level[1] and Consensus_Level >= 0 then Color.LIGHT_GREEN
#else if Consensus_Level < Consensus_Level[1] and Consensus_Level >= 0 then Color.LIGHT_GREEN
#else if Consensus_Level < Consensus_Level[1] and Consensus_Level < 0 then Color.RED else
#if Consensus_Level > Consensus_Level[1] and Consensus_Level < 0 then Color.RED
#else Color.GRAY);

def Zero_Line = 0;


#AddCloud(Consensus_Level, Agreement_LevelOB, Color.LIGHT_RED, Color.CURRENT);
#AddCloud(Consensus_Level, Agreement_LevelOS, Color.CURRENT, Color.LIGHT_GREEN);

#plot BulgeCC = Highest(Consensus_Level, BulgeLengthCC);
#BulgeCC.AssignValueColor(if (conditionK2) then Color.GREEN else if (conditionK3) then Color.RED else Color.GRAY);

#plot SqueezeCC = Lowest(Consensus_Level, SqueezeLengthCC);
#SqueezeCC.AssignValueColor(if (conditionK2) then Color.GREEN else if (conditionK3) then Color.RED else Color.GRAY);

#plot BulgeCC2 = Highest(Consensus_Level, BulgeLengthCC2);
#BulgeCC2.AssignValueColor(if (conditionK2) then Color.GREEN else if (conditionK3) then Color.RED else Color.GRAY);
#BulgeCC2.SetStyle(Curve.SHORT_DASH);

#plot SqueezeCC2 = Lowest(Consensus_Level, SqueezeLengthCC2);
#SqueezeCC2.AssignValueColor(if (conditionK2) then Color.GREEN else if (conditionK3) then Color.RED else Color.GRAY);
#SqueezeCC2.SetStyle(Curve.SHORT_DASH);
##########################################################################################################################

script WMA_Smooth {
    input price = hl2;
    plot smooth = (4 * price
        + 3 * price[1]
        + 2 * price[2]
        + price[3]) / 10;
}

script Phase_Accumulation {
# This is Ehler's Phase Accumulation code. It has a full cycle delay.
# However, it computes the correction factor to a very high degree.
#
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

##################################
plot C3_MF_Line = (MAMA + FAMA) / 2;
C3_MF_Line.SetPaintingStrategy(PaintingStrategy.Line);
C3_MF_Line.SetLineWeight(3);
C3_MF_Line.AssignValueColor(if coloredCandlesOn and((priceColor == 1) and(price1 > Upper_BandS) and(condition_BandRevDn)) then Color.YELLOW else if coloredCandlesOn and((priceColor == -1) and(price1 < Lower_BandS) and(condition_BandRevUp)) then Color.YELLOW else if coloredCandlesOn and priceColor == -1 then Color.RED  else if coloredCandlesOn and(priceColor == 1) then Color.GREEN else Color.CURRENT);

#Vertical Line
#AddVerticalLine((GetDay() <> GetDay()[1]), "", Color.Dark_Gray, Curve.SHORT_DASH);