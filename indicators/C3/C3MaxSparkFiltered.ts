
# Created by Christopher84 06 / 30 / 2022                                                                                                    
# Based off of the Confirmation Candles Study.Main difference is that CC Candles weigh factors of positive                                                                                                
# and negative price movement to create the Consensus_Level.The Consensus_Level is considered positive if                                                                                                
# above zero and negative if below zero.                                                                                                
# HODL added spark arrow filter 4 / 25 / 23

declare upper;

#input ShowBroadMkt = yes;
input showtitle = no;

AddLabel(showtitle, " C3: ", Color.light_gray);

#AssignPriceColor(if ColoredCandlesOn and(priceColor_V5 == 1) then Color.GREEN else if ColoredCandlesOn and(priceColor_V5 == -1) then Color.RED else Color.GRAY);                               
                                
# -- - C3 MAX-- -
    input lengthEL = 23;
#input coloredCandlesOn = no;
input show_elhers = no;
def priceEL = (high + low) / 2;

def coeff = lengthEL * priceEL * priceEL - 2 * priceEL * sum(priceEL, lengthEL)[1] + sum(priceEL * priceEL, lengthEL)[1];

plot Ehlers = sum(coeff * priceEL, lengthEL) / sum(coeff, lengthEL);
Ehlers.SetDefaultColor(Color.Light_gray);
Ehlers.Sethiding(Show_Elhers);


                 
input Price = CLOSE;                                                                                                
def ShortLength1 = 5;                                                                                                
def ShortLength2 = 14;                                                                                                
def ShortLength3 = 5;                                                                                                
def LongLength1 = 12;                                                                                                
def LongLength2 = 55;                                                                                                
def LongLength3 = 7;                                                                                                
input Color_Candles = yes;                                                                                                
                                                                                                                                              

# -- - TRIPLE EXHAUSTION-- -

    input averageType_3x = AverageType.SIMPLE;
input length_3x = 1000;

def over_bought_3x = 80;
def over_sold_3x = 20;
def KPeriod_3x = 10;
def DPeriod_3x = 10;
def priceH_3x = high;
def priceL_3x = low;
def priceC_3x = close;                                                                                                                                                            
                                                                                            
# -- - TRIPLE EXHAUSTION INDICATORS - StochasticSlow / MACD / MACD StDev / DMI + /-                                                                                         

def SlowK_3x = reference StochasticFull(over_bought_3x, over_sold_3x, KPeriod_3x, DPeriod_3x, priceH_3x, priceL_3x, priceC_3x, 3, averageType_3x).FullK;
def MACD_3x = reference MACD()."Value";
def priceMean_3x = Average(MACD_3x, length_3x);
def MACD_stdev_3x = (MACD_3x - priceMean_3x) / StDev(MACD_3x, length_3x);
def dPlus_3x = reference DMI()."DI+";
def dMinus_3x = reference DMI()."DI-";

def sellerRegular = SlowK_3x < 20 and MACD_stdev_3x < -1 and dPlus_3x < 15;
def sellerExtreme = SlowK_3x < 20 and MACD_stdev_3x < -2 and dPlus_3x < 15;

def buyerRegular = SlowK_3x > 80 and MACD_stdev_3x > 1 and dMinus_3x < 15;
def buyerExtreme = SlowK_3x > 80 and MACD_stdev_3x > 2 and dMinus_3x < 15;
                                                                                                                                                      
# -- - Arrows / Triggers                                                    
plot ExtremeBuy = if sellerExtreme[1] and!sellerExtreme then low else Double.NaN;
plot RegularBuy = if sellerRegular[1] and!sellerRegular then low else Double.NaN;

plot ExtremeSell = if buyerExtreme[1] and!buyerExtreme then high else Double.NaN;
plot RegularSell = if buyerRegular[1] and!buyerRegular then high else Double.NaN;

def RegularBuy3 = if sellerRegular[1] and!sellerRegular then 1 else 0;
def ExtremeBuy3 = if sellerExtreme[1] and!sellerExtreme then 1 else 0;

def RegularSell3 = if buyerRegular[1] and!buyerRegular then 1 else 0;
def ExtremeSell3 = if buyerExtreme[1] and!buyerExtreme then 1 else 0;


input point_size_3x = 5;
ExtremeBuy.SetLineWeight((point_size_3x));
RegularBuy.SetLineWeight((point_size_3x));
ExtremeSell.SetLineWeight((point_size_3x));
RegularSell.SetLineWeight((point_size_3x));

ExtremeBuy.SetDefaultColor((Color.Light_Green));
RegularBuy.SetDefaultColor((Color.GREEN));
ExtremeSell.SetDefaultColor((Color.Light_REd));
RegularSell.SetDefaultColor((Color.RED));


RegularBuy.SetPaintingStrategy(PaintingStrategy.POINTS);
ExtremeBuy.SetPaintingStrategy(PaintingStrategy.POINTS);
RegularSell.SetPaintingStrategy(PaintingStrategy.POINTS);
ExtremeSell.SetPaintingStrategy(PaintingStrategy.POINTS);

#addverticalline(x, "", color.cyan);
#addverticalline(RegularSell, "", color.red);
#addverticalline(extremeBuy, "", color.green);
#addverticalline(extremeSell, "", color.dark_red);
 
# -- - C3 MAX-- - #                                                                                                
                                
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
        
# Parabolic SAR Signal                                                                                                

input accelerationFactor = 0.0275;
input accelerationLimit = 0.2;

def SAR = ParabolicSAR(accelerationFactor = accelerationFactor, accelerationLimit = accelerationLimit);
def bearishCross = Crosses(SAR, price, CrossingDirection.ABOVE);
def signalDown = bearishCross; #If(bearishCross, 0, Double.NaN);                                                                                                
def bullishCross = Crosses(SAR, price, CrossingDirection.BELOW);
def signalUp = bullishCross; #If(bullishCross, 0, Double.NaN);                                                                                                
def UP = bullishCross;
def DOWN = bearishCross;
def priceColor = if UP then 1 else if DOWN then - 1 else priceColor[1];                                                                                                
                                
# OB_OS_Levels_v5 by Christopher84 12 / 10 / 2021                                                                                                

input BarsUsedForRange = 2;
input BarsRequiredToRemainInRange = 2;
input ColorPrice = YES;
input HideTargets = no;
input HideBalance = no;
input HideBoxLines = no;
input HideCloud = no;
input HideLabels = no;                                                                                                                                                                                                     
                                
# -- - Changed Inputs to "def" so they will not show in settings-- -


    input trailType23 = { default modified2, unmodified2 };

input ATRPeriod23 = 11;

input ATRFactor23 = 2.2;

input firstTrade23 = { default long2, short2 };

input averageType23 = AverageType.SIMPLE;

def ATRPeriod = 5;
def ATRFactor = 2.0;


def HiLo = Min(high - low, 1.5 * Average(high - low, ATRPeriod));
def HRef = if low <= high[1] then high - close[1] else (high - close[1]) - 0.5 * (low - high[1]);
def LRef = if high >= low[1] then close[1] - low else (close[1] - low) - 0.5 * (low[1] - high);

def high23 = high;
def low23 = low;
def close23 = close;

def price_V92 = close23;


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


Assert(ATRFactor23 > 0, "'atr factor' must be positive: " + ATRFactor23);

def HiLo23 = Min(high23 - low23, 1.5 * Average(high23 - low23, ATRPeriod23));
def HRef23 = if low23 <= high23[1]
    then high23 - close23[1]
    else (high23 - close23[1]) - 0.5 * (low23 - high23[1]);
def LRef23 = if high23 >= low23[1]
    then close23[1] - low23
    else (close23[1] - low23) - 0.5 * (low23[1] - high23);

def trueRange23;
switch (trailType23) {
    case modified2:
        trueRange23 = Max(HiLo23, Max(HRef23, LRef23));
    case unmodified2:
        trueRange23 = TrueRange(high23, close23, low23);
}
def loss23 = ATRFactor23 * MovingAverage(averageType23, trueRange23, ATRPeriod23);

def state23 = { default init2, long2, short2 };
def trail23;
switch (state23[1]) {
    case init2:
        if (!IsNaN(loss23)) {
            switch (firstTrade23) {
                case long2:
                    state23 = state23.long2;
                    trail23 = close23 - loss23;
                case short2:
                    state23 = state23.short2;
                    trail23 = close23 + loss23;
            }
        } else {
            state23 = state23.init2;
            trail23 = Double.NaN;
        }
    case long2:
        if (close23 > trail23[1]) {
            state23 = state23.long2;
            trail23 = Max(trail23[1], close23 - loss23);
        } else {
            state23 = state23.short2;
            trail23 = close23 + loss23;
        }
    case short2:
        if (close23 < trail23[1]) {
            state23 = state23.short2;
            trail23 = Min(trail23[1], close23 + loss23);
        } else {
            state23 = state23.long2;
            trail23 = close23 - loss23;
        }
}



def TrailingStop23 = trail23;
def LongEnter2 = (price_v92 crosses above TrailingStop23);
def LongExit2 = (price_v92 crosses below TrailingStop23);




#Alert(price_v9 crosses above TrailingStop, "long", Alert.BAR, Sound.Ding);
Alert(price_v92 crosses above TrailingStop23, "long", Alert.BAR, Sound.Ding);

#Alert(price_v9 crosses below TrailingStop, "short", Alert.BAR, Sound.Ding);
Alert(price_v92 crosses below TrailingStop23, "short", Alert.BAR, Sound.Ding);

#def upsignal = (price_V9 crosses above TrailingStop);
def upsignal23 = (price_V92 crosses above TrailingStop23);

#def downsignal = (price_v9 crosses below TrailingStop);
def downsignal23 = (price_v92 crosses below TrailingStop23);



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

def TrailingStop233 = trail23;
def H_A1 = Highest(TrailingStop23, 12);
def L_A1 = Lowest(TrailingStop23, 12);
def BulgeLengthPrice_A1 = 100;
def SqueezeLengthPrice_A1 = 100;
def BandwidthC3_A1 = (H_A1 - L_A1);
def IntermResistance2_A1 = Highest(BandwidthC3_A1, BulgeLengthPrice_A1);
def IntermSupport2_A1 = Lowest(BandwidthC3_A1, SqueezeLengthPrice_A1);
def sqzTrigger_A1 = BandwidthC3_A1 <= IntermSupport2_A1;
def sqzLevel_A1 = if !sqzTrigger_A1[1] and sqzTrigger_A1 then hl2                                                                                                
                 else if !sqzTrigger_A1 then Double.NaN                                                                                                
                 else sqzLevel_A1[1];
#input show_Squeeze = no;
plot Squeeze_Alert = sqzLevel;
Squeeze_Alert.SetPaintingStrategy(PaintingStrategy.POINTS);
Squeeze_Alert.SetLineWeight(3);
Squeeze_Alert.SetDefaultColor(Color.YELLOW);

#plot Squeeze_Alert_A1 = sqzLevel_A1;
#Squeeze_Alert_A1.SetPaintingStrategy(PaintingStrategy.POINTS);
#Squeeze_Alert_A1.SetLineWeight(3);
#Squeeze_Alert_A1.SetDefaultColor(Color.magenta);

                                                                                 
                                
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
def ATRPeriod2 = 5;                                                                                                
def ATRFactor2 = 1.5;                                                                                                
                                
# -- - Changed Inputs to "def" so they will not show in settings-- -

    #def ATRPeriod2 = 5;
#def ATRFactor2 = 1.5;

def HiLo2 = Min(high - low, 1.5 * Average(high - low, ATRPeriod));

def HRef2 = if (low <= high[1]) then(high - close[1]) else
    (high - close[1]) - 0.5 * (low - high[1]);

def LRef2 = if (high >= low[1]) then(close[1] - low) else
    (close[1] - low) - 0.5 * (low[1] - high);

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

#Bollinger Bands Percent_B                                                                                                

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

#Spark 1
def lengthK = 20;
def shift = factorK * MovingAverage(trueRangeAverageType, TrueRange(high, close, low), lengthK);
def averageK = MovingAverage(averageType, price, lengthK);
def AvgK = averageK[-displace];
def Upper_BandK = averageK[-displace] + shift[-displace];
def Lower_BandK = averageK[-displace] - shift[-displace];
#Spark 2
def lengthK_S2 = 20;
def shift_S2 = factorK * MovingAverage(trueRangeAverageType, TrueRange(high, close, low), lengthK_S2);
def averageK_S2 = MovingAverage(averageType, price, lengthK_S2);
def AvgK_S2 = averageK_S2[-displace];
def Upper_BandK_S2 = averageK_S2[-displace] + shift_S2[-displace];
def Lower_BandK_S2 = averageK_S2[-displace] - shift_S2[-displace];
#Spark 3
def lengthK_S3 = 20;
def shift_S3 = factorK * MovingAverage(trueRangeAverageType, TrueRange(high, close, low), lengthK_S3);
def averageK_S3 = MovingAverage(averageType, price, lengthK_S3);
def AvgK_S3 = averageK_S3[-displace];
def Upper_BandK_S3 = averageK_S3[-displace] + shift_S3[-displace];
def Lower_BandK_S3 = averageK_S3[-displace] - shift_S3[-displace];
#Spark 4
def lengthK_S4 = 20;
def shift_S4 = factorK * MovingAverage(trueRangeAverageType, TrueRange(high, close, low), lengthK_S4);
def averageK_S4 = MovingAverage(averageType, price, lengthK_S4);
def AvgK_S4 = averageK_S4[-displace];
def Upper_BandK_S4 = averageK_S4[-displace] + shift_S4[-displace];
def Lower_BandK_S4 = averageK_S4[-displace] - shift_S4[-displace];

def conditionK1UP = price >= Upper_BandK;
def conditionK2UP = (Upper_BandK[1] < Upper_BandK) and(Lower_BandK[1] < Lower_BandK);
def conditionK3DN = (Upper_BandK[1] > Upper_BandK) and(Lower_BandK[1] > Lower_BandK);
def conditionK4DN = price < Lower_BandK;

def Agreement_Level = condition1 + condition2 + condition3 + condition4 + condition5 +
    condition6 + condition7 + condition8 + condition9 + condition10 +
    condition11 + condition12 + condition13 + condition14 + conditionK1UP +
    conditionK2UP;

def Agreement_LevelD = (condition1D + condition2D + condition3D + condition4D + condition5D +
    condition6D + condition7D + condition8D + condition9D + condition10D +
    condition11D + condition12D + condition13D + condition14D + conditionK3DN +
    conditionK4DN);

def Consensus_Level = Agreement_Level - Agreement_LevelD;

def UP2 = Consensus_Level >= 10;
def DOWN2 = Consensus_Level < -10;
def priceColor2 = if UP2 then 1                                                                                                
                 else if DOWN2 then - 1
else priceColor2[1];
def Consensus_Level_OB = 10;
def Consensus_Level_OS = -10;

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

def YHOB = if Color_Candles and((price1 > Upper_BandS) and(condition_BandRevDn)) then high else Double.NaN;
def YHOS = if Color_Candles and((price1 < Lower_BandS) and(condition_BandRevUp)) then high else Double.NaN;
def YLOB = if Color_Candles and((price1 > Upper_BandS) and(condition_BandRevDn)) then low else Double.NaN;
def YLOS = if Color_Candles and((price1 < Lower_BandS) and(condition_BandRevUp)) then low else Double.NaN;

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

def YC = Color_Candles and priceColor2 == 1 and price1 > Upper_BandS and condition_BandRevDn;

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

def BoxHigh = if ((DOWN_OB) or(Upper_BandS crosses above Upper_BandK2)
or(condition_BandRevDn) and(high > high[1]) and((price > Upper_BandK2)
                            or(price > Upper_BandS))) then Highest(ExpH) else Double.NaN;                

def BoxLow = if (DOWN_OB) or((Upper_BandS crosses above Upper_BandK2)) then Lowest(low) else Double.NaN;                                                                       
def BoxHigh2 = if ((UP_OS) or((Lower_BandS crosses below Lower_BandK2))) then Highest(ExpH) else Double.NaN;
def BH2 = if !IsNaN(BoxHigh2) then high else Double.NaN;
def BH2ext = if IsNaN(BH2) then BH2ext[1] else BH2;
def BH2extline = BH2ext;

plot H_BH2extline = Lowest(BH2extline, 1);
H_BH2extline.SetDefaultColor(Color.GREEN);

def BoxLow2 = if ((UP_OS) or(Lower_BandS crosses below Lower_BandK2)
or(condition_BandRevUp) and(low < low[1]) and((price < Lower_BandK2)
                          or(price < Lower_BandS))) or((UP_OS[1]) and(low < low[1])) then Lowest(low) else Double.NaN;
                                
# extend the current YCHigh line to the right edge of the chart                                                                                                

def BH1 = if !IsNaN(BoxHigh) then high else Double.NaN;
def BH1ext = if IsNaN(BH1) then BH1ext[1] else BH1;
def BH1extline = BH1ext;
def BL1 = if !IsNaN(BoxLow) then low else Double.NaN;
def BL1ext = if IsNaN(BL1) then BL1ext[1] else BL1;

plot BL1extline = BL1ext;
BL1extline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
BL1extline.SetDefaultColor(Color.RED);
BL1extline.SetLineWeight(1);

def BL2 = if !IsNaN(BoxLow2) then low else Double.NaN;
def BL2ext = if IsNaN(BL2) then BL2ext[1] else BL2;

plot BL2extline = BL2ext;
BL2extline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
BL2extline.SetDefaultColor(Color.GREEN);
BL2extline.SetLineWeight(1);

plot H_BH1extline = Highest(BH1extline, 1);
H_BH1extline.SetDefaultColor(Color.RED);

plot L_BL1extline = Highest(BL1extline, 1);
L_BL1extline.SetDefaultColor(Color.RED);

plot L_BL2extline = Lowest(BL2extline, 1);
L_BL2extline.SetDefaultColor(Color.GREEN);
AddCloud(if !HideCloud then BH1extline else Double.NaN, BL1extline, Color.RED, Color.GRAY);
AddCloud(if !HideCloud then BH2extline else Double.NaN, BL2extline, Color.GREEN, Color.GRAY);



script WMA_Smooth {
    input price_WMA = hl2;
    plot smooth = (4 * price_WMA
        + 3 * price_WMA[1]
        + 2 * price_WMA[2]
        + price_WMA[3]) / 10;
}

script Phase_Accumulation {

# This is Ehler's Phase Accumulation code. It has a full cycle delay.
# However, it computes the correction factor to a very high degree.

    input price_WMA = hl2;

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

        Smooth = WMA_Smooth(price_WMA);
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
            v + GetValue(DeltaPhase, i, 41));

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
    input price_WMA = hl2;
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

    def CorrectionFactor = Phase_Accumulation(price_WMA).CorrectionFactor;

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

        Smooth = WMA_Smooth(price_WMA);
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
        vmama = alpha * price_WMA + (1 - alpha) * vmama[1];
        vfama = 0.5 * alpha * vmama + (1 - 0.5 * alpha) * vfama[1];
    }

    plot MAMA = vmama;
    plot FAMA = vfama;
}

def price2 = hl2;
def FastLimit = 0.5;
def SlowLimit = 0.05;

def MAMA = Ehler_MAMA(price2, FastLimit, SlowLimit).MAMA;
def FAMA = Ehler_MAMA(price2, FastLimit, SlowLimit).FAMA;

def Crossing = Crosses((MAMA < FAMA), yes);

def Crossing1 = Crosses((MAMA > FAMA), yes);

# -- - C3 MAX-- - LABELS-- -

    AddLabel(yes, Concat("MAMA", Concat("",
if MAMA > FAMA then "" else "")),
if MAMA > FAMA then Color.LIGHT_GREEN else Color.LIGHT_RED);


def MF_UP = FAMA < MAMA;
def MF_DN = FAMA > MAMA;
def priceColor10 = if MF_UP then 1
                 else if MF_DN then - 1
else priceColor10[1];

input extension_length_limited_to = 10;
def lastbar = if IsNaN(close[-1]) and!IsNaN(close) then BarNumber() else Double.NaN;


def length8E = 10;
def length9E = 35;
def length10E = 12;
input show_ema_cloud = no;
def price1E = close;
#input coloredCandlesOn = no;
#def showBreakoutSignals = no;
def displaceE = 0;

def AvgExp8E = ExpAverage(price1E[-displaceE], length8E);
def UPDE = AvgExp8E[1] < AvgExp8E;
#AvgExp8.SetStyle(Curve.SHORT_DASH);
#AvgExp8.SetLineWeight(1);

def AvgExp9E = ExpAverage(price1E[-displaceE], length9E);
def UPWE = AvgExp9E[1] < AvgExp9E;
#AvgExp9.SetStyle(Curve.SHORT_DASH);
#AvgExp9.SetLineWeight(1);

def BelowE = AvgExp8E < AvgExp9E;
def SparkE = UPDE + UPWE + BelowE;

def UPEMAE = AvgExp8E[1] < AvgExp8E;
def DOWNEMAE = AvgExp8E[1] > AvgExp8E;
#AvgExp8.AssignValueColor(if UPEMA then Color.LIGHT_GREEN else if DOWNEMA then Color.RED else Color.YELLOW);

def UPEMA2E = AvgExp9E[1] < AvgExp9E;
def DOWNEMA2E = AvgExp9E[1] > AvgExp9E;
#AvgExp9.AssignValueColor(if UPEMA2 then Color.LIGHT_GREEN else if DOWNEMA2 then Color.RED else Color.YELLOW);

def EMADE = (price1E - AvgExp8E);
def UPEMADE = EMADE >= EMADE[1];
def DOWNEMADE = EMADE < EMADE[1];
#EMAD.AssignValueColor(if UPEMAD then Color.LIGHT_GREEN else if DOWNEMAD then Color.RED else Color.GRAY);

def EMAD2E = (price1E - AvgExp9E);
def UPEMAD2E = EMAD2E >= EMAD2E[1];
def DOWNEMAD2E = EMAD2E < EMAD2E[1];
#EMAD2.AssignValueColor(if UPEMAD2 then Color.White else if DOWNEMAD2 then Color.BLUE else Color.GRAY);

def EMADAvgE = (EMADE + EMAD2E) / 2;
def UPEMADAvgE = EMADAvgE >= EMADAvgE[1];
def DOWNEMADAvgE = EMADAvgE < EMADAvgE[1];
#EMADAvg.AssignValueColor(if UPEMADAvg then Color.LIGHT_GREEN else if DOWNEMADAvg then Color.RED else Color.GRAY);

def EMADSmooth = ExpAverage(EMADAvgE[-displaceE], length10E);


#########################################
input lengthE = 14;
input averageTypeE = AverageType.WILDERS;
def priceE = EMADSmooth;
#def bottom = Min(close[1], low);
#input agperiod1 = AggregationPeriod.DAY;

def oE = (EMADSmooth + EMADSmooth[1]) / 2;

def hE = Max(EMADSmooth, EMADSmooth[1]);

def lE = Min(EMADSmooth, EMADSmooth[1]);

def cE = EMADSmooth;

#def open = open(period = agperiod1);
#def high = high(period = agperiod1);
#def low = low(period = agperiod1);
#def close = close(period = agperiod1);

def bottom = Min(cE[1], lE);
def tr = TrueRange(hE, cE, lE);

def ptr = tr / (bottom + tr / 2);


def APTR = MovingAverage(averageType, ptr, lengthE);
#APTR.SetDefaultColor(GetColor(8));
def UpperBandE = cE[1] + (APTR * oE);
#UpperBand.SetDefaultColor(Color.GRAY);

def LowerBandE = cE[1] - (APTR * oE);
#LowerBand.SetDefaultColor(Color.GRAY);

def MidBand = (UpperBandE + LowerBandE) / 2;
#MidBand.AssignValueColor(if (MidBand > EMADSmooth) then Color.RED else if (MidBand < EMADSmooth) then Color.GREEN else Color.GRAY);
#EMADSmooth.AssignValueColor(if (MidBand > EMADSmooth) then Color.RED else if (MidBand < EMADSmooth) then Color.GREEN else Color.GRAY);

AddCloud(if show_ema_cloud and(MidBand > EMADSmooth) then MidBand else Double.NaN, EMADSmooth, Color.RED, Color.CURRENT);
AddCloud(if show_ema_cloud and(EMADSmooth >= MidBand) then EMADSmooth else Double.NaN, MidBand, Color.GREEN, Color.CURRENT);

def BulgeLength = 100;
def SqueezeLength = 100;
def BulgeLength2 = 200;
def SqueezeLength2 = 200;

#plot ZeroLineE = 0;
#ZeroLineE.AssignValueColor(if (EMADSmooth > ZeroLineE) then Color.GREEN else if (EMADSmooth < ZeroLineE) then Color.RED else Color.YELLOW);

#def EMADSUp = EMADSmooth > ZeroLineE;
#def EMADSDown = EMADSmooth < ZeroLineE;

def EMADdown = (MidBand > EMADSmooth);
def EMADup = (EMADSmooth >= MidBand);

def crossUP = if (MidBand[1] > EMADSmooth[1]) and(MidBand < EMADSmooth) then 1 else 0;
def crossDOWN = if (EMADSmooth[1] > MidBand[1]) and(EMADSmooth < MidBand) then 1 else 0;

Def ValueUP = if crossup then midband else 0;
Def ValueDown = if crossdown then midband else 0;


#AssignPriceColor(if coloredCandlesOn and(MidBand > EMADSmooth) then Color.RED  else if coloredCandlesOn and(MidBand < EMADSmooth) then Color.GREEN else Color.GRAY);

#Vertical Line
#AddVerticalLine((GetDay() <> GetDay()[1]), "", Color.Dark_Gray, Curve.SHORT_DASH);

DEF Bulge = Highest(MidBand, BulgeLength);
#Bulge.SetDefaultColor(Color.WHITE);
DEF Squeeze = Lowest(MidBand, SqueezeLength);
#Squeeze.SetDefaultColor(Color.WHITE);
def CrossUPline = if (ValueUP - squeeze) == 0 then 1 else 0;
def CrossDownline = if (ValueDown - bulge) == 0 then 1 else 0;
#EMA_Candles / Spark
#Created by Christopher84 11 / 30 / 2021

input showBreakoutSignals = no;

#Spark1(1min chart)
input length8 = 10;
input length9 = 35;

#Spark2(5min chart)
#input length8_S2 = 50;
#input length9_S2 = 175;

#Spark3(10min chart)
#input length8_S3 = 100;
#input length9_S3 = 350;

#input length8_S4 = 100;
#input length9_S4 = 2100;

#Spark4(1hr chart)
def agperiodSPK = getAggregationPeriod();

#Spark2
def length8_S2 = if agperiodSPK == AggregationPeriod.MIN then 20
            else if agperiodSPK == AggregationPeriod.two_MIN then 15
            else if agperiodSPK == AggregationPeriod.three_MIN then 17
            else if agperiodSPK == AggregationPeriod.five_MIN then 20
            else if agperiodSPK == AggregationPeriod.ten_MIN then 15
            else if agperiodSPK == AggregationPeriod.fifteen_MIN then 20
            else if agperiodSPK == AggregationPeriod.thirty_MIN then 20
            else if agperiodSPK == AggregationPeriod.hour then 20
            else if agperiodSPK == AggregationPeriod.two_hours then 20
            else if agperiodSPK == AggregationPeriod.four_hours then 20
            else if agperiodSPK == AggregationPeriod.day then 20
            else AggregationPeriod.thirty_MIN;
 
def length9_S2 = if agperiodSPK == AggregationPeriod.MIN then 70
            else if agperiodSPK == AggregationPeriod.two_MIN then 53
            else if agperiodSPK == AggregationPeriod.three_MIN then 58
            else if agperiodSPK == AggregationPeriod.five_MIN then 70
            else if agperiodSPK == AggregationPeriod.ten_MIN then 53
            else if agperiodSPK == AggregationPeriod.fifteen_MIN then 70
            else if agperiodSPK == AggregationPeriod.thirty_MIN then 70
            else if agperiodSPK == AggregationPeriod.hour then 70
            else if agperiodSPK == AggregationPeriod.two_hours then 70
            else if agperiodSPK == AggregationPeriod.four_hours then 70
            else if agperiodSPK == AggregationPeriod.day then 70
            else AggregationPeriod.thirty_MIN;

#Spark3(10min chart)
def length8_S3 = if agperiodSPK == AggregationPeriod.MIN then 30
            else if agperiodSPK == AggregationPeriod.two_MIN then 25
            else if agperiodSPK == AggregationPeriod.three_MIN then 33
            else if agperiodSPK == AggregationPeriod.five_MIN then 30
            else if agperiodSPK == AggregationPeriod.ten_MIN then 30
            else if agperiodSPK == AggregationPeriod.fifteen_MIN then 40
            else if agperiodSPK == AggregationPeriod.thirty_MIN then 40
            else if agperiodSPK == AggregationPeriod.hour then 40
            else if agperiodSPK == AggregationPeriod.two_hours then 40
            else if agperiodSPK == AggregationPeriod.four_hours then 40
            else if agperiodSPK == AggregationPeriod.day then 40
            else AggregationPeriod.thirty_MIN;


def length9_S3 = if agperiodSPK == AggregationPeriod.MIN then 105
            else if agperiodSPK == AggregationPeriod.two_MIN then 88
            else if agperiodSPK == AggregationPeriod.three_MIN then 117
            else if agperiodSPK == AggregationPeriod.five_MIN then 105
            else if agperiodSPK == AggregationPeriod.ten_MIN then 105
            else if agperiodSPK == AggregationPeriod.fifteen_MIN then 140
            else if agperiodSPK == AggregationPeriod.thirty_MIN then 140
            else if agperiodSPK == AggregationPeriod.hour then 140
            else if agperiodSPK == AggregationPeriod.two_hours then 140
            else if agperiodSPK == AggregationPeriod.four_hours then 140
            else if agperiodSPK == AggregationPeriod.day then 140
            else AggregationPeriod.thirty_MIN;

#Spark4(1hr chart)
def length8_S4 = if agperiodSPK == AggregationPeriod.MIN then 50
            else if agperiodSPK == AggregationPeriod.two_MIN then 50
            else if agperiodSPK == AggregationPeriod.three_MIN then 50
            else if agperiodSPK == AggregationPeriod.five_MIN then 60
            else if agperiodSPK == AggregationPeriod.ten_MIN then 60
            else if agperiodSPK == AggregationPeriod.fifteen_MIN then 80
            else if agperiodSPK == AggregationPeriod.thirty_MIN then 80
            else if agperiodSPK == AggregationPeriod.hour then 80
            else if agperiodSPK == AggregationPeriod.two_hours then 80
            else if agperiodSPK == AggregationPeriod.four_hours then 80
            else if agperiodSPK == AggregationPeriod.day then 80
            else AggregationPeriod.thirty_MIN;

def length9_S4 = if agperiodSPK == AggregationPeriod.MIN then 175
            else if agperiodSPK == AggregationPeriod.two_MIN then 175
            else if agperiodSPK == AggregationPeriod.three_MIN then 175
            else if agperiodSPK == AggregationPeriod.five_MIN then 210
            else if agperiodSPK == AggregationPeriod.ten_MIN then 210
            else if agperiodSPK == AggregationPeriod.fifteen_MIN then 280
            else if agperiodSPK == AggregationPeriod.thirty_MIN then 280
            else if agperiodSPK == AggregationPeriod.hour then 280
            else if agperiodSPK == AggregationPeriod.two_hours then 280
            else if agperiodSPK == AggregationPeriod.four_hours then 280
            else if agperiodSPK == AggregationPeriod.day then 280
            else AggregationPeriod.thirty_MIN;



#input show_ema_cloud = yes;
def opacity = 50;

#####################################################################################################################################################

#Spark1
plot AvgExp8 = ExpAverage(price[-displace], length8);
def UPD = AvgExp8[1] < AvgExp8;
AvgExp8.SetStyle(Curve.SHORT_DASH);
AvgExp8.SetDefaultColor(CreateColor(255, 128, 0)); #Orange

plot AvgExp9 = ExpAverage(price[-displace], length9);
def UPW = AvgExp9[1] < AvgExp9;
AvgExp9.SetStyle(Curve.SHORT_DASH);
AvgExp9.SetDefaultColor(CreateColor(237, 106, 0)); #Orange

#Spark2
plot AvgExp8_S2 = ExpAverage(price[-displace], length8_S2);
def UPD_S2 = AvgExp8_S2[1] < AvgExp8_S2;
AvgExp8_S2.SetStyle(Curve.SHORT_DASH);
AvgExp8_S2.SetDefaultColor(CreateColor(221, 88, 0)); #Orange

plot AvgExp9_S2 = ExpAverage(price[-displace], Length9_S2);
def UPW_S2 = AvgExp9_S2[1] < AvgExp9_S2;
AvgExp9_S2.SetStyle(Curve.SHORT_DASH);
AvgExp9_S2.SetDefaultColor(CreateColor(205, 73, 0)); #Orange

#Spark3
plot AvgExp8_S3 = ExpAverage(price[-displace], length8_S3);
def UPD_S3 = AvgExp8_S3[1] < AvgExp8_S3;
AvgExp8_S3.SetStyle(Curve.SHORT_DASH);
AvgExp8_S3.SetDefaultColor(CreateColor(191, 61, 0)); #Orange

plot AvgExp9_S3 = ExpAverage(price[-displace], Length9_S3);
def UPW_S3 = AvgExp9_S3[1] < AvgExp9_S3;
AvgExp9_S3.SetStyle(Curve.SHORT_DASH);
AvgExp9_S3.SetDefaultColor(CreateColor(177, 50, 0)); #Orange

#Spark4
plot AvgExp8_S4 = ExpAverage(price[-displace], length8_S4);
def UPD_S4 = AvgExp8_S4[1] < AvgExp8_S4;
AvgExp8_S4.SetStyle(Curve.SHORT_DASH);
AvgExp8_S4.SetDefaultColor(CreateColor(165, 42, 0)); #Orange

plot AvgExp9_S4 = ExpAverage(price[-displace], Length9_S4);
def UPW_S4 = AvgExp9_S4[1] < AvgExp9_S4;
AvgExp9_S4.SetStyle(Curve.SHORT_DASH);
AvgExp9_S4.SetDefaultColor(CreateColor(153, 33, 0)); #Orange


###################################################################################################################################################################
#SPARK#
###################################################################################################################################################

#Spark 1
def Below = AvgExp8 < AvgExp9;
def Spark = UPD + UPW + Below;

def UPEMA = AvgExp8[1] < AvgExp8;
def DOWNEMA = AvgExp8[1] > AvgExp8;

#Spark 2
def Below_Spark_2 = AvgExp8_S2 < AvgExp9_S2;
def Spark_2 = UPD_S2 + UPW_S2 + Below_Spark_2;

def UPEMA_S2 = AvgExp8_S2[1] < AvgExp8_S2;
def DOWNEMA_S2 = AvgExp8_S2[1] > AvgExp8_S2;

#Spark 3
def Below_Spark_3 = AvgExp8_S3 < AvgExp9_S3;
def Spark_3 = UPD_S3 + UPW_S3 + Below_Spark_3;

def UPEMA_S3 = AvgExp8_S3[1] < AvgExp8_S3;
def DOWNEMA_S3 = AvgExp8_S3[1] > AvgExp8_S3;

#Spark 4
def Below_Spark_4 = AvgExp8_S4 < AvgExp9_S4;
def Spark_4 = UPD_S4 + UPW_S4 + Below_Spark_4;

def UPEMA_S4 = AvgExp8_S4[1] < AvgExp8_S4;
def DOWNEMA_S4 = AvgExp8_S4[1] > AvgExp8_S4;

AvgExp8.AssignValueColor(if UPEMA then Color.LIGHT_GREEN else if DOWNEMA then Color.RED else Color.YELLOW);

#Spark 1
def UPEMA2 = AvgExp9[1] < AvgExp9;
def DOWNEMA2 = AvgExp9[1] > AvgExp9;

#Spark 2
def UPEMA2_S2 = AvgExp9_S2[1] < AvgExp9_S2;
def DOWNEMA2_S2 = AvgExp9_S2[1] > AvgExp9_S2;

#Spark 3
def UPEMA2_S3 = AvgExp9_S3[1] < AvgExp9_S3;
def DOWNEMA2_S3 = AvgExp9_S3[1] > AvgExp9_S3;

#Spark 4
def UPEMA2_S4 = AvgExp9_S4[1] < AvgExp9_S4;
def DOWNEMA2_S4 = AvgExp9_S4[1] > AvgExp9_S4;

AvgExp9.AssignValueColor(if UPEMA2 then Color.LIGHT_GREEN else if DOWNEMA2 then Color.RED else Color.YELLOW);

AddCloud(if show_ema_cloud and(AvgExp9 > AvgExp8) then AvgExp9 else Double.NaN, AvgExp8, Color.LIGHT_RED, Color.CURRENT);
AddCloud(if show_ema_cloud and(AvgExp8 > AvgExp9) then AvgExp8 else Double.NaN, AvgExp9, Color.LIGHT_GREEN, Color.CURRENT);

#Spark 1
def UP8 = UPEMA and UPEMA2;
def DOWN8 = DOWNEMA and DOWNEMA2;
def priceColor8 = if UP8 then 1
                 else if DOWN8 then - 1
else 0;
def UP11 = UPEMA;
def DOWN11 = DOWNEMA;
def priceColor11 = if UP11 then 1
                 else if DOWN11 then - 1
else 0;
def UP12 = UPEMA2;
def DOWN12 = DOWNEMA2;
def priceColor12 = if UP12 then 1
                 else if DOWN12 then - 1
else 0;


#Spark 2
def UP8_S2 = UPEMA_S2  and UPEMA2_S2;
def DOWN8_S2 = DOWNEMA_S2  and DOWNEMA2_S2;
def priceColor8_S2 = if UP8_S2  then 1
                 else if DOWN8_S2  then - 1
else 0;
def UP11_S2 = UPEMA_S2;
def DOWN11_S2 = DOWNEMA_S2;
def priceColor11_S2 = if UP11_S2 then 1
                 else if DOWN11_S2 then - 1
else 0;
def UP12_S2 = UPEMA2_S2;
def DOWN12_S2 = DOWNEMA2_S2;
def priceColor12_S2 = if UP12_S2 then 1
                 else if DOWN12_S2 then - 1
else 0;

#Spark 3
def UP8_S3 = UPEMA_S3  and UPEMA2_S3;
def DOWN8_S3 = DOWNEMA_S3  and DOWNEMA2_S3;
def priceColor8_S3 = if UP8_S3  then 1
                 else if DOWN8_S3  then - 1
else 0;
def UP11_S3 = UPEMA_S3;
def DOWN11_S3 = DOWNEMA_S3;
def priceColor11_S3 = if UP11_S3 then 1
                 else if DOWN11_S2 then - 1
else 0;
def UP12_S3 = UPEMA2_S3;
def DOWN12_S3 = DOWNEMA2_S3;
def priceColor12_S3 = if UP12_S3 then 1
                 else if DOWN12_S3 then - 1
else 0;

#Spark 4
def UP8_S4 = UPEMA_S4  and UPEMA2_S4;
def DOWN8_S4 = DOWNEMA_S4  and DOWNEMA2_S4;
def priceColor8_S4 = if UP8_S4  then 1
                 else if DOWN8_S4  then - 1
else 0;
def UP11_S4 = UPEMA_S4;
def DOWN11_S4 = DOWNEMA_S4;
def priceColor11_S4 = if UP11_S4 then 1
                 else if DOWN11_S2 then - 1
else 0;
def UP12_S4 = UPEMA2_S4;
def DOWN12_S4 = DOWNEMA2_S4;
def priceColor12_S4 = if UP12_S4 then 1
                 else if DOWN12_S4 then - 1
else 0;


###################################################################


def UpCalc = (priceColor == 1) + (priceColor2 == 1) + (priceColor8 == 1) + (priceColor10 == 1);
def StrongUpCalc = (priceColor == 1) + (priceColor2 == 1) + (priceColor10 == 1);

#Spark 1
def CandleColor = if (priceColor2 == 1) and(priceColor12 == 1) and(Spark >= 2) then 1 else
if (priceColor2 == -1) and(Spark < 1) then - 1 else 0;

#Spark 2
def CandleColor_S2 = if (priceColor12_S2 == 1) and(Spark_2 >= 2) then 1 else
if (Spark_2 < 1) then - 1 else 0;

#Spark 3
def CandleColor_S3 = if (priceColor12_S3 == 1) and(Spark_3 >= 2) then 1 else
if (Spark_3 < 1) then - 1 else 0;

#Spark 4
def CandleColor_S4 = if (priceColor12_S4 == 1) and(Spark_4 >= 2) then 1 else
if (Spark_4 < 1) then - 1 else 0;


#Spark 1
def SparkUP = (Spark == 3) and(CandleColor == 1);
#SparkUP.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
#SparkUP.AssignValueColor(Color.LIGHT_GREEN);

def SparkDN = (Spark == 0) and(CandleColor == -1);
#SparkDN.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
#SparkDN.AssignValueColor(Col
##########################################################################################################
##########################################################################################################
##########################################################################################################


##########################################################################################################
##########################################################################################################
##########################################################################################################


##########################################################################################################
##########################################################################################################
##########################################################################################################


#Spark 1
#plot SparkUP1 = (Spark == 3) and(CandleColor == 1);
#SparkUP1.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
#SparkUP1.AssignValueColor(Color.LIGHT_GREEN);

#plot SparkDN1 = (Spark == 0) and(CandleColor == -1);
#SparkDN1.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
#SparkDN1.AssignValueColor(Color.RED);

#Spark 1
def SparkUP1 = (Spark == 3) and(CandleColor == 1);
#SparkUP1.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
#SparkUP1.AssignValueColor(Color.LIGHT_GREEN);

def SparkDN1 = (Spark == 0) and(CandleColor == -1);
#SparkDN1.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
#SparkDN1.AssignValueColor(Color.RED);

#Spark 1
def SparkUP2 = (Spark_2 == 3) and(CandleColor_S2 == 1);
#SparkUP2.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
#SparkUP2.AssignValueColor(Color.GREEN);

def SparkDN2 = (Spark_2 == 0) and(CandleColor_S2 == -1);
#SparkDN2.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
#SparkDN2.AssignValueColor(Color.Light_RED);

#Spark
def SparkUP3 = (Spark_3 == 3) and(CandleColor_S3 == 1);
#SparkUP3.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
#SparkUP3.AssignValueColor(Color.white);

def SparkDN3 = (Spark_3 == 0) and(CandleColor_S3 == -1);
#SparkDN3.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
#SparkDN3.AssignValueColor(Color.white);

#Spark
def SparkUP4 = (Spark_4 == 3) and(CandleColor_S4 == 1);
#SparkUP4.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
#SparkUP4.AssignValueColor(Color.blue);

def SparkDN4 = (Spark_4 == 0) and(CandleColor_S4 == -1);
#SparkDN4.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
#SparkDN4.AssignValueColor(Color.blue);

def hide_SparkUP = if SparkUP1 and(SparkUP1[1] or SparkUP1[2] or SparkUP1[3] or SparkUP1[4] or SparkUP1[5]) then 0 else 1;
def hide_SparkDN = if SparkDN1 and(SparkDN1[1] or SparkDN1[2] or SparkDN1[3] or SparkDN1[4] or SparkDN1[5]) then 0 else 1;

def hide_SparkUP2 = if SparkUP2 and(SparkUP2[1] or SparkUP2[2] or SparkUP2[3] or SparkUP2[4] or SparkUP2[5]) then 0 else 1;
def hide_SparkDN2 = if SparkDN2 and(SparkDN2[1] or SparkDN2[2] or SparkDN2[3] or SparkDN2[4] or SparkDN2[5]) then 0 else 1;

def hide_SparkUP3 = if SparkUP3 and(SparkUP3[1] or SparkUP3[2] or SparkUP3[3] or SparkUP3[4] or SparkUP3[5]) then 0 else 1;
def hide_SparkDN3 = if SparkDN3 and(SparkDN3[1] or SparkDN3[2] or SparkDN3[3] or SparkDN3[4] or SparkDN3[5]) then 0 else 1;

def hide_SparkUP4 = if SparkUP4 and(SparkUP4[1] or SparkUP4[2] or SparkUP4[3] or SparkUP4[4] or SparkUP4[5]) then 0 else 1;
def hide_SparkDN4 = if SparkDN4 and(SparkDN4[1] or SparkDN4[2] or SparkDN4[3] or SparkDN4[4] or SparkDN4[5]) then 0 else 1;

#Spark 1
plot SparkUP_1 = if (SparkUP1 and hide_SparkUP) then 1 else 0;
SparkUP_1.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
SparkUP_1.AssignValueColor(Color.green);

plot SparkDN_1 = if (SparkDN1 and hide_SparkDN) then 1 else 0;
SparkDN_1.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
SparkDN_1.AssignValueColor(Color.Light_red);

#plot SparkUP2_2 = if (SparkUP2 and hide_SparkUP2) then 1 else 0;;
#SparkUP2_2.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
#SparkUP2_2.AssignValueColor(Color.PLUM);

#plot SparkDN2_2 =  if (SparkDN2 and hide_SparkDN2) then 1 else 0;;
#SparkDN2_2.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
#SparkDN2_2.AssignValueColor(Color.PLUM);

#Spark 1
#plot SparkUP3_3 = if (SparkUP3 and hide_SparkUP3) then 1 else 0;;
#SparkUP3_3.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
#SparkUP3_3.AssignValueColor(Color.white);

#plot SparkDN3_3 =  if (SparkDN3 and hide_SparkDN3) then 1 else 0;;
#SparkDN3_3.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
#SparkDN3_3.AssignValueColor(Color.white);

#Spark 1
#plot SparkUP4_4 = if (SparkUP4 and hide_SparkUP4) then 1 else 0;;
#SparkUP4_4.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
#SparkUP4_4.AssignValueColor(Color.orange);

#plot SparkDN4_4 =  if (SparkDN4 and hide_SparkDN4) then 1 else 0;;
#SparkDN4_4.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
#SparkDN4_4.AssignValueColor(Color.orange);                                    
                         

 
def Buy = UP_OS;
def Sell = DOWN_OB;
def conditionLTB = (conditionK2UP and(Consensus_Level < 0));
def conditionLTS = (conditionK3DN and(Consensus_Level > 0));

def conditionBO = ((Upper_BandS[1] < Upper_BandS))
and((Lower_BandS[1] < Lower_BandS))
and((Upper_BandK[1] < Upper_BandK))
and((Lower_BandK[1] < Lower_BandK));

def conditionBD = ((Upper_BandS[1] > Upper_BandS))
and((Lower_BandS[1] > Lower_BandS))
and((Upper_BandK[1] > Upper_BandK))
and((Lower_BandK[1] > Lower_BandK));

def MomentumUP = Consensus_Level[1] < Consensus_Level;
def MomentumDOWN = Consensus_Level[1] > Consensus_Level;
def Squeeze_Signal = !IsNaN(Squeeze_Alert);
def conditionOB = (Consensus_Level >= 12) and(Consensus_Line >= 4);
def conditionOS = (Consensus_Level <= -12) and(Consensus_Line <= -3);


# -- - C3 LABELS-- -

    AddLabel(yes, if conditionLTB then "BULL: Look to Buy"
         else if conditionLTS then "BEAR: Look to Sell"
         else if conditionK2UP then "TREND: BULL"
         else if conditionK3DN then "TREND: BEAR" else "TREND: CONSOLIDATION",
              if conditionLTB then Color.GREEN
         else if conditionLTS then Color.RED
         else if conditionK2UP then Color.LIGHT_GREEN
         else if conditionK3DN then Color.LIGHT_RED else Color.GRAY);

AddLabel(yes, if conditionBD then "BREAKDOWN"
         else if conditionBO then "BREAKOUT" else "NO BREAK",
              if conditionBD then Color.RED
         else if conditionBO then Color.GREEN else Color.GRAY);
input Spark_1_label = no;
def Spark_2_label = yes;
def Spark_3_label = yes;
def Spark_4_label = yes;

#Spark 1
AddLabel(Spark_1_label, if (Spark == 3) then "SPARK: " + Round(Spark, 1)
         else if (Spark == 0) then  "SPARK: " + Round(Spark, 1) else "SPARK: " + Round(Spark, 1),
              if (Spark == 3) then Color.YELLOW
         else if (Spark == 2) then Color.GREEN
         else if (Spark == 0) then Color.RED else Color.GRAY);

#Spark 2
#AddLabel(Spark_2_label, if (Spark_2 == 3) then "2nd SPARK: " + Round(Spark_2, 1)
#         else if (Spark_2 == 0) then  "2nd SPARK: " + Round(Spark_2, 1) else "2nd SPARK: " + Round(Spark_2, 1),
#              if (Spark_2 == 3) then Color.YELLOW
#         else if (Spark_2 == 2) then Color.GREEN
#         else if (Spark_2 == 0) then Color.RED else Color.GRAY);

#Spark 3
#AddLabel(Spark_3_label, if (Spark_3 == 3) then "3rd SPARK: " + Round(Spark_3, 1)
#         else if (Spark_3 == 0) then  "3rd SPARK: " + Round(Spark_3, 1) else "3rd SPARK: " + Round(Spark_3, 1),
#              if (Spark_3 == 3) then Color.YELLOW
#         else if (Spark_3 == 2) then Color.GREEN
#         else if (Spark_3 == 0) then Color.RED else Color.GRAY);

#Spark 4
#AddLabel(Spark_4_label, if (Spark_4 == 3) then "4th SPARK: " + Round(Spark_4, 1)
#         else if (Spark_4 == 0) then  "4th SPARK: " + Round(Spark_4, 1) else "4th SPARK: " + Round(Spark_4, 1),
#              if (Spark_4 == 3) then Color.YELLOW
#         else if (Spark_4 == 2) then Color.GREEN
#         else if (Spark_4 == 0) then Color.RED else Color.GRAY);
def Squeeze_Bias_UP = if Squeeze_signal and(EMADUP == 1 and(EMADsmooth > zeroline)) then 1 else 0;
def Squeeze_Bias_DN = if Squeeze_signal and(EMADUP == 0 and(EMADsmooth < zeroline)) then 1 else 0;


#AddLabel(yes, if Squeeze_Signal then "SQZ!" else if Squeeze_Bias_UP then "SQZ!" + " | Bias: UP " else if Squeeze_Bias_DN then "SQZ!" + " | Bias: DOWN " else "SQZ!", if Squeeze_Signal then Color.YELLOW else Color.GRAY);
#AddLabel(yes, "SQZ!" + " | Bias: UP ", if Squeeze_Bias_UP then Color.YELLOW else Color.GRAY);
#AddLabel(yes, "SQZ!" + " | Bias: DOWN ", if Squeeze_Bias_DN then Color.YELLOW else Color.GRAY);

#AddLabel(yes, if MomentumUP then "CSNS UP: " + Round(Consensus_Level, 1)
#         else if MomentumUP or MomentumDOWN and conditionOB then "CSNS OB: " + Round(Consensus_Level, 1)
#         else if MomentumDOWN then  "CSNS DOWN:" + Round(Consensus_Level, 1)
#         else if MomentumUP or MomentumDOWN and conditionOS then "CSNS OS: " + Round(Consensus_Level, 1) else "CSNS = " + Round(Consensus_Level, 1),
#              if conditionOB then Color.RED else
#              if conditionOS then Color.GREEN else Color.GRAY);

#AddLabel(yes, Concat("BAND%: ", PerB), if PerB < 0 then Color.YELLOW else if PerB > 0 and PerB[1] < 0 then Color.GREEN else Color.WHITE);                                                                                                


#-- - END-- -
    input hideverticalline = no;
AddVerticalLine(hideverticalline and(GetDay() <> GetDay()[1]), "", Color.Light_gray, Curve.SHORT_DASH);

#-- - END-- -