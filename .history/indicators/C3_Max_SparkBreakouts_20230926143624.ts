#-- - C4_MAX_BREAKOUTS_V5-- - #                                                                                                
#-- - C3_MAX_SPARK-- - #                                                                                                
                                 
# Created by Christopher84 06 / 30 / 2022                                                                                                    
# Based off of the Confirmation Candles Study.Main difference is that CC Candles weigh factors of positive                                                                                                
# and negative price movement to create the Consensus_Level.The Consensus_Level is considered positive if                                                                                                
# above zero and negative if below zero.                                                                                                
                                 
# -- - HORSERIDER VOLUME-- - #                                                                                                
                                 
# Show total volume in gray.Buying volume in green.Sell Volume in red.                                                                                                
# Volume average is gray line.                                                                                                
# Specified percent over average volume is cyan triangles.                                                                                                
# Horserider 12 / 30 / 2019 derived from some already existing studies.                                                                                                
# hiVolume indicator                                                                                                
# source: http://tinboot.blogspot.com                                                                                                
# author: allen everhart                                                                                                
                                 
# -- - TRIPLE EXHAUSTION-- - #                                                                                                
                                 
# Requested by @Chence27 from criteria listed here https://usethinkscript.com/threads/triple-exhaustion-indicator.9001/                                                                                                
# Removing the header Credit credits and description is not permitted, any modification needs to be shared.                                                                                                
# V 1.0 : @cos251 - Initial release per request from www.usethinkscript.com forum thread:                                                                                                
#       : https://usethinkscript.com/threads/triple-exhaustion-indicator.9001/                                                                                                
# V 1.1 : @chence27 - modifcations to better approximate original study                                                                                                
# -- - BULL_BEAR V5-- - #

#Bull_Bear_Candles + Label Created by Christopher84
#Created 10 / 21 / 2022
# Show SELL and BUY Volume and percentage.
# Referencing credit to Horserider script at https://usethinkscript.com/threads/volume-buy-sell-indicator-with-hot-percent-for-thinkorswim.389/
# Nomak 02 / 21 / 2020

declare upper;

input timeframe = AggregationPeriod.Day;
input ColoredCandlesOn = yes;
input BulgeLengthV = 20;
input SqueezeLengthV = 20;
input BulgeLengthV2 = 20;
input SqueezeLengthV2 = 20;

def Vol = volume(period = timeframe);
def at_High = high(period = timeframe);
def at_Open = open(period = timeframe);
def at_Close = close(period = timeframe);
def at_Low = low(period = timeframe);
def Vol1 = volume(period = timeframe);
def at_High1 = high(period = timeframe);
def at_Open1 = open(period = timeframe);
def at_Close1 = close(period = timeframe);
def at_Low1 = low(period = timeframe);

# Buy_Volume forumla is volume * (close_price minus low_price) / (High_price minus low_price)
def Buy_Volume = RoundUp(Vol * (at_Close - at_Low) / (at_High - at_Low));
def Buy_percent = RoundUp((Buy_Volume / Vol) * 100);
#Buy_percent.SetPaintingStrategy(PaintingStrategy.LINE);
#Buy_percent.SetLineWeight(1);
#Buy_percent.SetDefaultColor(Color.GREEN);

#Sell_Volume forumla is  volume * (High_price minus Close_price) / (High_price minus Low_price)
def Sell_Volume = RoundDown(Vol1 * (at_High1 - at_Close1) / (at_High1 - at_Low1));
def Sell_percent = RoundUp((Sell_Volume / Vol1) * 100);
#Sell_percent.SetPaintingStrategy(PaintingStrategy.LINE);
#Sell_percent.SetLineWeight(1);
#Sell_percent.SetDefaultColor(Color.RED);


AddLabel(yes, "BuyVol " + Buy_Volume, Color.GREEN);
AddLabel(yes, "SellVol " + Sell_Volume, Color.RED);
AddLabel(yes, "Buy % " + Buy_percent, Color.GREEN);
AddLabel(yes, "Sell % " + Sell_percent, Color.RED);

#################################################################################

input price = close;
input length_V5 = 10;
input agperiod1 = { "1 min", "2 min", "3 min", default "5 min", "10 min", "15 min", "30 min", "1 hour", "2 hours", "4 hours", "Day", "Week", "Month"};
input agperiod2 = { "1 min", "2 min", "3 min", "5 min", default "10 min", "15 min", "30 min", "1 hour", "2 hours", "4 hours", "Day", "Week", "Month"};

plot avg = ExpAverage(close(period = agperiod1), length_V5);
def height = avg - avg[length_V5];
avg.SetStyle(Curve.SHORT_DASH);
avg.SetLineWeight(1);

def UP_V5 = avg[1] < avg;
def DOWN_V5 = avg[1] > avg;
Avg.AssignValueColor(if UP_V5 then Color.LIGHT_GREEN else if DOWN_V5 then Color.RED else Color.YELLOW);

plot avg2 = ExpAverage(close(period = agperiod2), length_V5);
def height2 = avg2 - avg2[length_V5];
avg2.SetStyle(Curve.SHORT_DASH);
avg2.SetLineWeight(1);

def UP2_V5 = avg2[1] < avg2;
def DOWN2_V5 = avg2[1] > avg2;
Avg2.AssignValueColor(if UP2_V5 then Color.LIGHT_GREEN else if DOWN2_V5 then Color.RED else Color.YELLOW);

#AddCloud(avg2, avg, Color.LIGHT_RED, Color.CURRENT);
#AddCloud(avg, avg2, Color.LIGHT_GREEN, Color.CURRENT);

def Condition1UP = avg > avg2;
def Condition1DN = avg < avg2;

def Condition2UP = Buy_percent > 50;
def Condition2DN = Buy_percent < 50;

def BullUP = Condition1UP + Condition2UP;
def BearDN = Condition1DN + Condition2DN;

def Bull_Bear = if Condition1UP == 1 and Condition2UP == 1 then 1 else if Condition1DN == 1 and Condition2DN == 1 then - 1 else 0;

def priceColor_V5 = if ((avg[1] < avg) and(avg2[1] < avg2)) then 1
                 else if ((avg[1] > avg) and(avg2[1] > avg2)) then - 1
                 else priceColor_V5[1];

AssignPriceColor(if ColoredCandlesOn and(priceColor_V5 == 1) then Color.GREEN else if ColoredCandlesOn and(priceColor_V5 == -1) then Color.RED else Color.Gray);                                
                                 
# -- - C3 MAX INPUTS-- - #

#input Price = CLOSE;
#input ShortLength1 = 5;
#input ShortLength2 = 14;
#input ShortLength3 = 5;
#input LongLength1 = 12;
#input LongLength2 = 55;
#input LongLength3 = 7;                                                                                                
input Color_Candles = yes;                                                                                                
                                 
# -- - Changed Inputs to "def" so they will not show in settings-- -

    def ShortLength1 = 5;                                                                                                
def ShortLength2 = 14;                                                                                                
def ShortLength3 = 5;                                                                                                
def LongLength1 = 12;                                                                                                    
def LongLength2 = 55;                                                                                                
def LongLength3 = 7;                                                                                                
                                 
# -- - HORSERIDER VOLUME INPUTS-- -

    input Show30DayAvg = no;                                                                                                
input ShowTodayVolume = no;                                                                                                
input ShowPercentOf30DayAvg = yes;                                                                                                
input UnusualVolumePercent = 200;                                                                                                
input Show30BarAvg = no;                                                                                                
input ShowCurrentBar = yes;                                                                                                
input ShowPercentOf30BarAvg = yes;                                                                                                
input ShowSellVolumePercent = yes;                                                                                                
def length_3 = 20;                                                                                                
input type_HV = { default SMP, EXP };                                                                                                
input length1_3 = 20;                                                                                                
input hotPct = 100.0;                                                                                                
                                 
# -- - HORSERIDER DEF-- -

    def O_3 = open;                                                                                                
def H_3 = high;                                                                                                
def C_3 = close;                                                                                                
def L_3 = low;                                                                                                
def V_3 = volume;                                                                                                
def buying = V_3 * (C_3 - L_3) / (H_3 - L_3);                                                                                                
def selling = V_3 * (H_3 - C_3) / (H_3 - L_3);                                                                                                
def volLast30DayAvg = (volume(period = "DAY")[1] + volume(period = "DAY")[2] + volume(period = "DAY")[3] + volume(period = "DAY")[4] + volume(period = "DAY")[5] + volume(period = "DAY")[6] + volume(period = "DAY")[7] + volume(period = "DAY")[8] + volume(period = "DAY")[9] + volume(period = "DAY")[10] + volume(period = "DAY")[11] + volume(period = "DAY")[12] + volume(period = "DAY")[13] + volume(period = "DAY")[14] + volume(period = "DAY")[15] + volume(period = "DAY")[16] + volume(period = "DAY")[17] + volume(period = "DAY")[18] + volume(period = "DAY")[19] + volume(period = "DAY")[20] + volume(period = "DAY")[21] + volume(period = "DAY")[22] + volume(period = "DAY")[23] + volume(period = "DAY")[24] + volume(period = "DAY")[25] + volume(period = "DAY")[26] + volume(period = "DAY")[27] + volume(period = "DAY")[28] + volume(period = "DAY")[29] + volume(period = "DAY")[30]) / 30;                                                                                                
def today = volume(period = "DAY");                                                                                                
def percentOf30Day = Round((today / volLast30DayAvg) * 100, 0);                                                                                                
def avg30Bars = (volume[1] + volume[2] + volume[3] + volume[4] + volume[5] + volume[6] + volume[7] + volume[8] + volume[9] + volume[10] + volume[11] + volume[12] + volume[13] + volume[14] + volume[15] + volume[16] + volume[17] + volume[18] + volume[19] + volume[20] + volume[21] + volume[22] + volume[23] + volume[24] + volume[25] + volume[26] + volume[27] + volume[28] + volume[29] + volume[30]) / 30;                                                                                                
def curVolume = volume;                                                                                                
def percentOf30Bar = Round((curVolume / avg30Bars) * 100, 0);                                                                                                
def SellVolPercent = Round((selling / volume) * 100, 0);                                                                                                
def ma = if type_HV == type_HV.SMP then SimpleMovingAvg(volume, length_3) else MovAvgExponential(volume, length_3);                                                                                                
                                 
# -- - HORSERIDER STUDY-- - LABELS-- -

    AddLabel(Show30DayAvg, "30 Day Avg: " + Round(volLast30DayAvg, 0), Color.LIGHT_GRAY);
AddLabel(ShowTodayVolume, "Day: " + today, (if percentOf30Day >= UnusualVolumePercent then Color.GREEN else if percentOf30Day >= 100 then Color.ORANGE else Color.LIGHT_GRAY));
AddLabel(ShowPercentOf30DayAvg, percentOf30Day + "%", (if percentOf30Day >= UnusualVolumePercent then Color.GREEN else if percentOf30Day >= 100 then Color.ORANGE else Color.WHITE) );
AddLabel(Show30BarAvg, "30 Bar Avg: " + Round(avg30Bars, 0), Color.LIGHT_GRAY);
AddLabel(ShowCurrentBar, "1 Bar: " + curVolume, (if percentOf30Bar >= UnusualVolumePercent then Color.GREEN else if percentOf30Bar >= 100 then Color.ORANGE else Color.LIGHT_GRAY));
AddLabel(ShowPercentOf30BarAvg, percentOf30Bar + "%", (if percentOf30Bar >= UnusualVolumePercent then Color.GREEN else if percentOf30Bar >= 100 then Color.ORANGE else Color.WHITE) );
AddLabel(ShowSellVolumePercent, "1 Bar Sell %: " + SellVolPercent, (if SellVolPercent > 51 then Color.RED else if SellVolPercent < 49 then Color.GREEN else Color.ORANGE));                                                                                                
                                 
# -- - TRIPLE EXHAUSTION STUDY-- - INPUTS-- -

    #input over_bought_3x = 80;
#input over_sold_3x = 20;
#input KPeriod_3x = 10;
#input DPeriod_3x = 10;
#input priceH_3x = high;
#input priceL_3x = low;
#input priceC_3x = close;                                                                                                
input averageType_3x = AverageType.SIMPLE;                                                                                                
input length_3x = 1000;
#input paintBars_3x = no;
#input showLabels_3x = no;                                                                                                
                                 
# -- - Changed Inputs to "def" so they will not show in settings-- -

    def over_bought_3x = 80;                                                                                                
def over_sold_3x = 20;                                                                                                
def KPeriod_3x = 10;                                                                                                
def DPeriod_3x = 10;                                                                                                
def priceH_3x = high;                                                                                                
def priceL_3x = low;                                                                                                
def priceC_3x = close;                                                                                                
                                 
# -- - TRIPLE EXHAUSTION STUDY-- - DEF-- - INDICATORS - StochasticSlow / MACD / MACD StDev / DMI + /-                                                                                                
                                 
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
                                 
# -- - TRIPLE EXHAUSTION STUDY-- - ARROWS-- -                                                                                                                                                        
                                                                                                                                       
# -- - Arrows / Triggers
plot RegularBuy = if sellerRegular[1] and!sellerRegular then low else Double.NaN;
plot ExtremeBuy = if sellerExtreme[1] and!sellerExtreme then low else Double.NaN;
RegularBuy.SetPaintingStrategy(PaintingSTrategy.Points);
ExtremeBuy.SetPaintingSTrategy(paintingSTrategy.Points);
RegularBuy.SetDefaultColor(Color.yellow);
ExtremeBuy.SetDefaultColor(Color.GREEN);

plot RegularSell = if buyerRegular[1] and!buyerRegular then high else Double.NaN;
plot ExtremeSell = if buyerExtreme[1] and!buyerExtreme then high else Double.NaN;
RegularSell.SetPaintingStrategy(PaintingSTrategy.Points);
ExtremeSell.SetPaintingSTrategy(paintingSTrategy.Points);
RegularSell.SetDefaultColor(Color.yellow);
ExtremeSell.SetDefaultColor(Color.RED);

#Addverticalline((Regularsell), "", Color.red);
#Addverticalline((Regularbuy), "", Color.Green);                                                                                                
                                 
                                 
# -- - PLD STUDY-- - #                                                                                                
                                 
# -- - PLD STUDY INPUTS-- -
    #input price = close;                    
input length_PLD = 5;                                                                                                
input displace_PLD = -11;                                                                                                
input showBreakoutSignals_PLD = no;                                                                                                
input ColoredCandlesOn_PLD = no;                                                                                                
input BulgeLengthPrice_PLD = 5;                                                                                                
input SqueezeLengthPrice_PLD = 5;                                                                                                
                                 
# -- - Changed Inputs to "def" so they will not show in settings-- -

    #def BulgeLengthPrice_PLD = 5;
#def SqueezeLengthPrice_PLD = 5;                                                                                                
                                 
# -- - PLD DEF-- - #                                                                                                

                     
plot PLD = ExpAverage(Price[-displace_PLD], length_PLD);                                                                                                
def UpperBand_PLD = Highest(PLD, BulgeLengthPrice_PLD);                                                                                                
def LowerBand_PLD = Lowest(PLD, SqueezeLengthPrice_PLD);                                                                                                
plot UpSignal_PLD = Price crosses above UpperBand_PLD;                                                                                                
plot DownSignal_PLD = Price crosses below LowerBand_PLD;
UpSignal_PLD.SetHiding(!showBreakoutSignals_PLD);
DownSignal_PLD.SetHiding(!showBreakoutSignals_PLD);
PLD.SetDefaultColor(GetColor(1));
UpSignal_PLD.SetDefaultColor(Color.UPTICK);
UpSignal_PLD.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
DownSignal_PLD.SetDefaultColor(Color.DOWNTICK);
DownSignal_PLD.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);                                                                                                
def LongEnter = (Price crosses above UpperBand_PLD);                                                                                                
def LongExit = (Price crosses below LowerBand_PLD);                                                                                                
                                 
# -- - CONFIRMATION NEAR TERM LEVELS STUDY-- -

    def displace2_2 = 0;                                                                                                
def factorK2_2 = 2.0;                                                                                                
def lengthK2_2 = 20;                                                                                                
input averageType2_2 = AverageType.SIMPLE;                                                                                                
def trueRangeAverageType2_2 = AverageType.SIMPLE;                                                                                                
def BulgeLengthPrice2 = 20;                                                                                                
def SqueezeLengthPrice2 = 20;                                                                                                
def shift2_2 = factorK2_2 * MovingAverage(trueRangeAverageType2_2, TrueRange(high, close, low), lengthK2_2);                                                                                                
def averageK2_2 = MovingAverage(averageType2_2, Price, lengthK2_2);                                                                                                
def Upper_BandK2_2 = averageK2_2[-displace2_2] + shift2_2[-displace2_2];                                                                                                
def Lower_BandK2_2 = averageK2_2[-displace2_2] - shift2_2[-displace2_2];                                                                                                
def conditionK2 = (Upper_BandK2_2[1] < Upper_BandK2_2) and(Lower_BandK2_2[1] < Lower_BandK2_2);                                                                                                
def conditionK3 = (Upper_BandK2_2[1] > Upper_BandK2_2) and(Lower_BandK2_2[1] > Lower_BandK2_2);                                                                                                
                                 
# -- - C3 MAX STUDY-- - #                                                                                                
                                 
# Momentum Oscillators                                                                                                
                                 
def MS = Average(Average(Price, ShortLength1) - Average(Price, ShortLength2), ShortLength3);                                                                                                
def MS2 = Average(Average(Price, LongLength1) - Average(Price, LongLength2), LongLength3);                                                                                                
                                 
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

#input length = 20;
#input nK = 1.5;
#input nBB = 2.0;                                                                                                
                                 
# -- - Changed Inputs to "def" so they will not show in settings-- -

    def length = 20;                                                                                                
def nK = 1.5;                                                                                                
def nBB = 2.0;                                                                                                
                                 
def BBHalfWidth = StDev(Price, length);                                                                                                
def KCHalfWidth = nK * Average(TrueRange(high, close, low), length);                                                                                                
def isSqueezed = nBB * BBHalfWidth / KCHalfWidth < 1;                                                                                                
def BBS_Ind = If(isSqueezed, 0, Double.NaN);                                                                                                
                                 
# Bollinger Resolution                                                                                                
                                 
def BBSMA = Average(Price, length);                                                                                                
def BBSMAL = BBSMA + (-nBB * BBHalfWidth);                                                                                                
def BBSMAU = BBSMA + (nBB * BBHalfWidth);                                                                                                
def PerB = RoundUp((Price - BBSMAL) / (BBSMAU - BBSMAL) * 100, 0);
AddLabel(yes, Concat("%B: ", PerB), if PerB < 0 then Color.YELLOW else if PerB > 0 and PerB[1] < 0 then Color.GREEN else Color.WHITE);                                                                                                
                                 
# Parabolic SAR Signal                                                                                                
                                 
input accelerationFactor = 0.0275;                                                                                                
input accelerationLimit = 0.2;                                                                                                
                                 
def SAR = ParabolicSAR(accelerationFactor = accelerationFactor, accelerationLimit = accelerationLimit);                                                                                                
def bearishCross = Crosses(SAR, Price, CrossingDirection.ABOVE);                                                                                                
def signalDown = bearishCross; #If(bearishCross, 0, Double.NaN);                                                                                                
def bullishCross = Crosses(SAR, Price, CrossingDirection.BELOW);                                                                                                
def signalUp = bullishCross; #If(bullishCross, 0, Double.NaN);                                                                                                
def UP = bullishCross;                                                                                                
def DOWN = bearishCross;                                                                                                
def priceColor = if UP then 1 else if DOWN then - 1 else priceColor[1];                                                                                                
                                 
# OB_OS_Levels_v5 by Christopher84 12 / 10 / 2021                                                                                                
                                 
input BarsUsedForRange = 2;                                                                                                
input BarsRequiredToRemainInRange = 2;                                                                                                
input TargetMultiple = 0.5;                                                                                                
input ColorPrice = yes;                                                                                                
input HideTargets = no;                                                                                                
input HideBalance = no;                                                                                                
input HideBoxLines = no;                                                                                                
input HideCloud = no;                                                                                                
input HideLabels = no;

#Squeeze Dots Created 04 / 28 / 2021 by Christopher84

#input ATRPeriod = 5;
#input ATRFactor = 2.0;                                                                                                
                                 
# -- - Changed Inputs to "def" so they will not show in settings-- -

    def ATRPeriod = 5;                                                                                                
def ATRFactor = 2.0;                                                                                                
                                 
def HiLo = Min(high - low, 1.5 * Average(high - low, ATRPeriod));                                                                                                
def HRef = if low <= high[1] then high - close[1] else (high - close[1]) - 0.5 * (low - high[1]);                                                                                                
def LRef = if high >= low[1] then close[1] - low else (close[1] - low) - 0.5 * (low[1] - high);                                                                                                
                                 
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
#input ATRPeriod2 = 5;
#input ATRFactor2 = 1.5;                                                                                                
                                 
# -- - Changed Inputs to "def" so they will not show in settings-- -

    def ATRPeriod2 = 5;                                                                                                
def ATRFactor2 = 1.5;                                                                                                
                                 
def HiLo2 = Min(high - low, 1.5 * Average(high - low, ATRPeriod));                                                                                                
def HRef2 = if low <= high[1]                                                                                                
    then high - close[1]                                                                                                
    else (high - close[1]) - 0.5 * (low - high[1]);                                                                                                
def LRef2 = if high >= low[1]                                                                                                
    then close[1] - low                                                                                                
    else (close[1] - low) - 0.5 * (low[1] - high);                                                                                                
def loss2 = ATRFactor2 * MovingAverage(averageType, trueRange, ATRPeriod2);                                                                                                
def multiplier_factor = 1.25;                                                                                                
def valS = Average(Price, SMA_lengthS);                                                                                                
def average_true_range = Average(TrueRange(high, close, low), length = ATR_length);                                                                                                
def Upper_BandS = valS[-displace] + multiplier_factor * average_true_range[-displace];                                                                                                
def Middle_BandS = valS[-displace];                                                                                                
def Lower_BandS = valS[-displace] - multiplier_factor * average_true_range[-displace];                                                                                                
                                 
def shiftK2 = factorK2 * MovingAverage(trueRangeAverageType, TrueRange(high, close, low), lengthK2);                                                                                                
def averageK2 = MovingAverage(averageType, Price, lengthK2);                                                                                                
def AvgK2 = averageK2[-displace];                                                                                                
def Upper_BandK2 = averageK2[-displace] + shiftK2[-displace];                                                                                                
def Lower_BandK2 = averageK2[-displace] - shiftK2[-displace];                                                                                                
def condition_BandRevDn = (Upper_BandS > Upper_BandK2);                                                                                                
def condition_BandRevUp = (Lower_BandS < Lower_BandK2);                                                                                                
def fastLength = 12;                                                                                                
def slowLength = 26;                                                                                                
def MACDLength = 9;                                                                                                
input MACD_AverageType = { SMA, default EMA };                                                                                                
def fastEMA = ExpAverage(Price, fastLength);                                                                                                
def slowEMA = ExpAverage(Price, slowLength);                                                                                                
def Value;                                                                                                
def Avg1;
switch (MACD_AverageType) {
    case SMA:
        Value = Average(Price, fastLength) - Average(Price, slowLength);
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
                                 
def NetChgAvg = MovingAverage(RSI_AverageType, Price - Price[1], RSI_length);                                                                                                
def TotChgAvg = MovingAverage(RSI_AverageType, AbsValue(Price - Price[1]), RSI_length);                                                                                                
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
def CIP = (Price - Price[1]);                                                                                                
def AvgCIP = ExpAverage(CIP[-displace], lengthCIP);                                                                                                
def CIP_UP = AvgCIP > AvgCIP[1];                                                                                                
def CIP_DOWN = AvgCIP < AvgCIP[1];                                                                                                
def condition5 = CIP_UP;                                                                                                
def condition5D = CIP_DOWN;

#EMA_1                                                                                                
                                 
def EMA_length = 8;                                                                                                
def AvgExp = ExpAverage(Price[-displace], EMA_length);                                                                                                
def condition6 = (Price >= AvgExp) and(AvgExp[2] <= AvgExp);                                                                                                
def condition6D = (Price < AvgExp) and(AvgExp[2] > AvgExp);

#EMA_2                                                                                                
                                 
def EMA_2length = 20;                                                                                                
def displace2 = 0;                                                                                                
def AvgExp2 = ExpAverage(Price[-displace2], EMA_2length);                                                                                                
def condition7 = (Price >= AvgExp2) and(AvgExp2[2] <= AvgExp);                                                                                                
def condition7D = (Price < AvgExp2) and(AvgExp2[2] > AvgExp);

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
def upperBand = BollingerBands(Price, displace, BBPB_length, Num_Dev_Dn, Num_Dev_up, BBPB_averageType).UpperBand;                                                                                                
def lowerBand = BollingerBands(Price, displace, BBPB_length, Num_Dev_Dn, Num_Dev_up, BBPB_averageType).LowerBand;                                                                                                
def PercentB = (Price - lowerBand) / (upperBand - lowerBand) * 100;                                                                                                
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
def averageK = MovingAverage(averageType, Price, lengthK);                                                                                                
def AvgK = averageK[-displace];                                                                                                
def Upper_BandK = averageK[-displace] + shift[-displace];                                                                                                
def Lower_BandK = averageK[-displace] - shift[-displace];                                                                                                
def conditionK1UP = Price >= Upper_BandK;                                                                                                
def conditionK2UP = (Upper_BandK[1] < Upper_BandK) and(Lower_BandK[1] < Lower_BandK);                                                                                                
def conditionK3DN = (Upper_BandK[1] > Upper_BandK) and(Lower_BandK[1] > Lower_BandK);                                                                                                
def conditionK4DN = Price < Lower_BandK;                                                                                                
def Agreement_Level = condition1 + condition2 + condition3 + condition4 + condition5 + condition6 + condition7 + condition8 + condition9 + condition10 + condition11 + condition12 + condition13 + condition14 + conditionK1UP + conditionK2UP;                                                                                                
def Agreement_LevelD = (condition1D + condition2D + condition3D + condition4D + condition5D + condition6D + condition7D + condition8D + condition9D + condition10D + condition11D + condition12D + condition13D + condition14D + conditionK3DN + conditionK4DN);                                                                                                
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
                                 
def BoxHigh = if ((DOWN_OB) or(Upper_BandS crosses above Upper_BandK2) or(condition_BandRevDn) and(high > high[1]) and((Price > Upper_BandK2) or(Price > Upper_BandS))) then Highest(ExpH) else Double.NaN; #if(DOWN_OB > 3) then Highest(ExpH) else if (Condition_BandRevDn and(price > AvgExp) and(High > High[1])) then Highest(ExpH) else Double.NaN;                                                                                                
def BoxLow = if (DOWN_OB) or((Upper_BandS crosses above Upper_BandK2)) then Lowest(low) else Double.NaN; #if(DOWN_OB crosses above 3) then Lowest(low) else if ((Upper_BandS crosses above Upper_BandK2)) then Lowest(ExpH) else Double.NaN; #if((DOWN_OB) or(Condition_BandRevDn and(price < price[1]))) then Highest(ExpL) else Double.NaN;                                                                                                
def BoxHigh2 = if ((UP_OS) or((Lower_BandS crosses below Lower_BandK2))) then Highest(ExpH) else Double.NaN; #if(UP_OS) then Highest(ExpH) else if ((Lower_BandS crosses below Lower_BandK2)) then Highest(ExpH) else Double.NaN;                                                                                                
def BH2 = if !IsNaN(BoxHigh2) then high else Double.NaN;                                                                                                
def BH2ext = if IsNaN(BH2) then BH2ext[1] else BH2;                                                                                                
def BH2extline = BH2ext;                                                                                                
plot H_BH2extline = Lowest(BH2extline, 1);
H_BH2extline.SetDefaultColor(Color.GREEN);                                                                                                
def BoxLow2 = if ((UP_OS) or(Lower_BandS crosses below Lower_BandK2) or(condition_BandRevUp) and(low < low[1]) and((Price < Lower_BandK2) or(Price < Lower_BandS))) or((UP_OS[1]) and(low < low[1])) then Lowest(low) else Double.NaN; #if(UP_OS) then Lowest(low) else if (Condition_BandRevUp and(price < AvgExp) and(Low < Low[1])) then Lowest(low) else Double.NaN;                                                                                                
                                 
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
                                 
###################### -- - BREAKOUT CODE-- - ######################                                                                                
                                 
# Price crosses level and the opposite crossing happend within x number of bars                                                                                                
                                 
def bn = BarNumber();                                                                                                
def na_1 = Double.NaN;                                                                                                
                                 
input bars_back_OS = 5;                                
input bars_back_OB = 5;                                
                                 
input bars_back_H_BH1 = 5;                                
input bars_back_H_BH2 = 5;                                
                                 
input bars_back_L_BL1 = 5;                                                                                                
input bars_back_L_BL2 = 5;                                
                                 
# def support = ... some price level                                
                                                                                                 
def Y_Line_OS = YHextlineOS;                                                                                                
def LG_Line_OB = YHextlineOB;                                                                                                
                                 
def High_BH1_Red = H_BH1EXTLINE;                                                                                                
def Low_BL1_Red = L_BL1EXTLINE;                                                                                                
                                 
def High_BH2_Grn = H_BH2EXTLINE;                                                                                                
def Low_BL2_Grn = L_BL2EXTLINE;                                                                                                
                                 
############# INPUT FOR TESTING ONLY ##############                                                                                                
                                 
input support_level = 50;                                                                                                
                                 
########### CONVERT CONSTANT TO VAR ############                                                                                                                                                        
                                 
input show_ref_line = no;                                                                                                
                                 
# plot y = if show_ref_line then support else na_1;                                                                                                                                                
                                 
########### CHOOSE WICK, BODY, or CLOSE ###########                                                                                                
                                 
input OB_Candle = { default "wick", "body" , "close"};                                                                                                
def High_OB;                                                                                                
def Low_OB;
switch (OB_Candle) {
    case "wick":
        High_OB = high;
        Low_OB = low;
    case "body":
        High_OB = Max(open, close);
        Low_OB = Min(open, close);
    case "close":
        High_OB = close;
        Low_OB = close;
}                                                                                                
                                 
input OS_Candle = { default "wick", "body" , "close"};                                                                                                
def High_OS;                                                                                                
def Low_OS;
switch (OS_Candle) {
    case "wick":
        High_OS = high;
        Low_OS = low;
    case "body":
        High_OS = Max(open, close);
        Low_OS = Min(open, close);
    case "close":
        High_OS = close;
        Low_OS = close;
}                                                                                                
                                 
input H_BH1_Candle = { default "wick", "body" , "close"};                                                                                                
def High_H_BH1;                                                                                                
def Low_H_BH1;
switch (H_BH1_Candle) {
    case "wick":
        High_H_BH1 = high;
        Low_H_BH1 = low;
    case "body":
        High_H_BH1 = Max(open, close);
        Low_H_BH1 = Min(open, close);
    case "close":
        High_H_BH1 = close;
        Low_H_BH1 = close;
}                                                                                                
                                 
input H_BH2_Candle = { default "wick", "body" , "close"};                                                                                                
def High_H_BH2;                                                                                                
def Low_H_BH2;
switch (H_BH2_Candle) {
    case "wick":
        High_H_BH2 = high;
        Low_H_BH2 = low;
    case "body":
        High_H_BH2 = Max(open, close);
        Low_H_BH2 = Min(open, close);
    case "close":
        High_H_BH2 = close;
        Low_H_BH2 = close;
}                                                                                                
                                 
input L_BL1_Candle = { default "wick", "body" , "close"};                                                                                                
def High_L_BL1;                                                                                                
def Low_L_BL1;
switch (L_BL1_Candle) {
    case "wick":
        High_L_BL1 = high;
        Low_L_BL1 = low;
    case "body":
        High_L_BL1 = Max(open, close);
        Low_L_BL1 = Min(open, close);
    case "close":
        High_L_BL1 = close;
        Low_L_BL1 = close;
}                                                                                                
                                 
input L_BL2_Candle = { default "wick", "body" , "close"};                                                                                                
def High_L_BL2;                                                                                                
def Low_L_BL2;
switch (L_BL2_Candle) {
    case "wick":
        High_L_BL2 = high;
        Low_L_BL2 = low;
    case "body":
        High_L_BL2 = Max(open, close);
        Low_L_BL2 = Min(open, close);
    case "close":
        High_L_BL2 = close;
        Low_L_BL2 = close;
}                                                                                                
                                 
########### LABELS ############

#AddLabel(1, "Crossing Levels OS " + OS_Candle, Color.YELLOW);

#AddLabel(1, "Bars Back OS" + bars_back_OS, Color.YELLOW);

#AddLabel(1, "Crossing Levels OB " + OB_Candle, Color.YELLOW);

#AddLabel(1, "Bars Back OB " + bars_back_OB, Color.YELLOW);

#AddLabel(1, "Crossing Levels H_BH1 " + H_BH1_Candle, Color.YELLOW);

#AddLabel(1, "Bars Back H_BH1 " + bars_back_H_BH1, Color.YELLOW);

#AddLabel(1, "Crossing Levels H_BH2 " + H_BH2_Candle, Color.YELLOW);

#AddLabel(1, "Bars Back H_BH2 " + bars_back_H_BH2, Color.YELLOW);

#AddLabel(1, "Crossing Levels L_BL1 " + L_BL1_Candle, Color.YELLOW);

#AddLabel(1, "Bars Back L_BL1 " + bars_back_L_BL1, Color.YELLOW);

#AddLabel(1, "Crossing Levels L_BL2 " + L_BL2_Candle, Color.YELLOW);

#AddLabel(1, "Bars Back L_BL2 " + bars_back_L_BL2, Color.YELLOW);                                        
                                 
                                 
########## CROSSING UP / DOWN ###########                                                                                        
                                 
def OS_Down_Bn = if bn == 1 then 0 else if High_OS[1] > Y_Line_OS[1] and Low_OS < Y_Line_OS then bn else OS_Down_Bn[1];                                                                                                
def OS_Up_Bn = if bn == 1 then 0 else if Low_OS[1] < Y_Line_OS[1] and High_OS > Y_Line_OS then bn else OS_Up_Bn[1];                                                                                                
                                 
def OB_Down_Bn = if bn == 1 then 0 else if High_OB[1] > LG_Line_OB[1] and Low_OB < LG_Line_OB then bn else OB_Down_Bn[1];                                                                                                
def OB_Up_Bn = if bn == 1 then 0 else if Low_OB[1] < LG_Line_OB[1] and High_OB > LG_Line_OB then bn else OB_Up_Bn[1];                                                                                                
                                 
def H_BH1_Down_Bn = if bn == 1 then 0 else if High_H_BH1[1] > High_BH1_Red[1] and Low_H_BH1 < High_BH1_Red then bn else H_BH1_Down_Bn[1];                                                                                                
def H_BH1_Up_Bn = if bn == 1 then 0 else if Low_H_BH1[1] < High_BH1_Red[1] and High_H_BH1 > High_BH1_Red then bn else H_BH1_Down_Bn[1];                                                                                                
                                 
def H_BH2_Down_Bn = if bn == 1 then 0 else if High_H_BH2[1] > High_BH2_Grn[1] and Low_H_BH2 < High_BH2_Grn then bn else H_BH2_Down_Bn[1];                                                                                
def H_BH2_Up_Bn = if bn == 1 then 0 else if Low_H_BH2[1] < High_BH2_Grn[1] and High_H_BH2 > High_BH2_Grn then bn else H_BH2_Up_Bn[1];                                                                                                
                                 
def L_BL1_Down_Bn = if bn == 1 then 0 else if High_L_BL1[1] > Low_BL1_Red[1] and Low_L_BL1 < Low_BL1_Red then bn else L_BL1_Down_Bn[1];                                                                                                
def L_BL1_Up_Bn = if bn == 1 then 0 else if Low_L_BL1[1] < Low_BL1_Red[1] and High_L_BL1 > Low_BL1_Red then bn else L_BL1_Up_Bn[1];                                                                                                
                                 
def L_BL2_Down_Bn = if bn == 1 then 0 else if High_L_BL2[1] > Low_BL2_Grn[1] and Low_L_BL2 < Low_BL2_Grn then bn else L_BL2_Down_Bn[1];                                                                                                
def L_BL2_Up_Bn = if bn == 1 then 0 else if Low_L_BL2[1] < Low_BL2_Grn[1] and High_L_BL2 > Low_BL2_Grn then bn else L_BL2_Up_Bn[1];                                                                                                
                                 
########### GETTIN CROSSED - UP ###########                                                                                                
                                 
# dip then rise, within len bars                                                                                                        #TEST#
                                 
def OS_Up_0 = if                                                                                                
bn > bars_back_OS                                                                                              
and
        ((OS_Up_Bn - OS_Down_Bn) <= bars_back_OS and(OS_Up_Bn - OS_Down_Bn) > 0)
and
OS_Up_Bn == bn
and
Sum(OS_Up_0[1], (bars_back_OS - 1)) == 0                                                                                                
then 1 else 0;                                                                                                
                                 
def OS_Down_0 = if                                                                                                
bn > bars_back_OS                                                                                                
and
        ((OS_Down_Bn - OS_Up_Bn) <= bars_back_OS and(OS_Down_Bn - OS_Up_Bn) > 0)
and
OS_Down_Bn == bn
and
Sum(OS_Down_0[1], (bars_back_OS - 1)) == 0                                                                                                
then 1 else 0;                                                                                                
                                 
def OB_Up_0 = if                                                                                                
bn > bars_back_OS                                                                                                
and
        ((OB_Up_Bn - OB_Down_Bn) <= bars_back_OB and(OB_Up_Bn - OB_Down_Bn) > 0)
and
OB_Up_Bn == bn
and
Sum(OB_Up_0[1], (bars_back_OB - 1)) == 0                                                                                                
then 1 else 0;                                                                                                
                                 
def OB_Down_0 = if                                                                                                
bn > bars_back_OB                                                                                                
and
        ((OB_Down_Bn - OB_Up_Bn) <= bars_back_OB and(OB_Down_Bn - OB_Up_Bn) > 0)
and
OB_Down_Bn == bn
and
Sum(OB_Down_0[1], (bars_back_OB - 1)) == 0                                                                                                
then 1 else 0;                                                                                                
                                 
def H_BH1_Up_0 = if                                                                                                
bn > bars_back_H_BH1                                                                                                
and
        ((H_BH1_Up_Bn - H_BH1_Down_Bn) <= bars_back_H_BH1 and(H_BH1_Up_Bn - H_BH1_Down_Bn) > 0)
and
H_BH1_Up_Bn == bn
and
Sum(H_BH1_Up_0[1], (bars_back_H_BH1 - 1)) == 0                                                                                              
then 1 else 0;                                                                                                
                                 
def H_BH1_Down_0 = if                                                                                                
bn > bars_back_H_BH1                                                                                                
and
        ((H_BH1_Down_Bn - H_BH1_Up_Bn) <= bars_back_H_BH1 and(H_BH1_Down_Bn - H_BH1_Up_Bn) > 0)
and
H_BH1_Down_Bn == bn
and
Sum(H_BH1_Down_0[1], (bars_back_H_BH1 - 1)) == 0                                                                                                
then 1 else 0;                                                                                                
                                 
def L_BL1_Up_0 = if                                                                                                
bn > bars_back_L_BL1                                                                                              
and
        ((L_BL1_Up_Bn - L_BL1_Down_Bn) <= bars_back_L_BL1 and(L_BL1_Up_Bn - L_BL1_Down_Bn) > 0)
and
L_BL1_Up_Bn == bn
and
Sum(L_BL1_Up_0[1], (bars_back_L_BL1 - 1)) == 0                                                                                                
then 1 else 0;                                                                                                
                                 
def L_BL1_Down_0 = if                                                                                                
bn > bars_back_L_BL1                                                                                                
and
        ((L_BL1_Down_Bn - L_BL1_Up_Bn) <= bars_back_L_BL1 and(L_BL1_Down_Bn - L_BL1_Up_Bn) > 0)
and
L_BL1_Down_Bn == bn
and
Sum(L_BL1_Down_0[1], (bars_back_L_BL1 - 1)) == 0                                                                                                
then 1 else 0;                                                                                                
                                 
def H_BH2_Up_0 = if                                                                                                
bn > bars_back_H_BH2                                                                                                
and
        ((H_BH2_Up_Bn - H_BH2_Down_Bn) <= bars_back_H_BH2 and(H_BH2_Up_Bn - H_BH2_Down_Bn) > 0)
and
H_BH2_Up_Bn == bn
and
Sum(H_BH2_Up_0[1], (bars_back_H_BH2 - 1)) == 0                                                                                                
then 1 else 0;                                                                                                
                                 
def H_BH2_Down_0 = if                                                                                                
bn > bars_back_H_BH2                                                                                                
and
        ((H_BH2_Down_Bn - H_BH2_Up_Bn) <= bars_back_H_BH2 and(H_BH2_Down_Bn - H_BH2_Up_Bn) > 0)
and
H_BH2_Down_Bn == bn
and
Sum(H_BH2_Down_0[1], (bars_back_H_BH2 - 1)) == 0                                                                                                
then 1 else 0;                                                                                                
                                 
def L_BL2_Up_0 = if                                                                                                
bn > bars_back_L_BL2                                                                                                
and
        ((L_BL2_Up_Bn - L_BL2_Down_Bn) <= bars_back_L_BL2 and(L_BL2_Up_Bn - L_BL2_Down_Bn) > 0)
and
L_BL2_Up_Bn == bn
and
Sum(L_BL2_Up_0[1], (bars_back_L_BL2 - 1)) == 0                                                                                                
then 1 else 0;                                                                                            
                                 
def L_BL2_Down_0 = if                                                                                                
bn > bars_back_L_BL2                                                                                                
and
        ((L_BL2_Down_Bn - L_BL2_Up_Bn) <= bars_back_L_BL2 and(L_BL2_Down_Bn - L_BL2_Up_Bn) > 0)
and
L_BL2_Down_Bn == bn
and
Sum(L_BL2_Down_0[1], (bars_back_L_BL2 - 1)) == 0                                                                                                
then 1 else 0;

############## -- - CROSSOVER TEST(s)-- - ###############

def OS_Up_2 = if                                                                                                
bn > bars_back_OS                                                                                              
and
        ((OS_Up_Bn - OS_Down_Bn) <= bars_back_OS and(OS_Up_Bn - OS_Down_Bn) > 0)
and
OS_Up_Bn == bn
and
Sum(OS_Up_0[1], (bars_back_OS - 1)) == 0
and((OS_Up_Bn - OS_Down_Bn) <= bars_back_OS and(OS_Up_Bn - OS_Down_Bn) > 0)
and
OS_Up_Bn == bn
and
Sum(OS_Up_0[1], (bars_back_OS - 1)) == 0                                                                                                
then 1 else 0;            



                                                 
                                 
########### ARROWS ###########                                                                                                
                                 
input arrow_size = 1;

plot OS_Up_22 = OS_Up_2;
OS_Up_22.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
OS_Up_22.SetDefaultColor(Color.White);
OS_Up_22.SetLineWeight(arrow_size);

plot OS_Up = OS_Up_0;
OS_Up.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
OS_Up.SetDefaultColor(Color.White);
OS_Up.SetLineWeight(arrow_size);                                                                                                
                                 
plot OS_Down = OS_Down_0;
OS_Down.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
OS_Down.SetDefaultColor(Color.White);
OS_Down.SetLineWeight(arrow_size);                                                                                                
                                 
plot OB_Up = OB_Up_0;
OB_Up.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
OB_Up.SetDefaultColor(Color.White);
OB_Up.SetLineWeight(arrow_size);                                                                                                
                                 
plot OB_Down = OB_Down_0;
OB_Down.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
OB_Down.SetDefaultColor(Color.White);
OB_Down.SetLineWeight(arrow_size);                                                                                                
                                 
plot H_BH1_Up = H_BH1_Up_0;
H_BH1_Up.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
H_BH1_Up.SetDefaultColor(Color.White);
H_BH1_Up.SetLineWeight(arrow_size);                                                                                                
                                 
plot H_BH1_Down = H_BH1_Down_0;
H_BH1_Down.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
H_BH1_Down.SetDefaultColor(Color.White);
H_BH1_Down.SetLineWeight(arrow_size);                                                                                                
                                 
plot L_BL1_Up = L_BL1_Up_0;
L_BL1_Up.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
L_BL1_Up.SetDefaultColor(Color.White);
L_BL1_Up.SetLineWeight(arrow_size);                                                                                                
                                 
plot L_BL1_Down = L_BL1_Down_0;
L_BL1_Down.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
L_BL1_Down.SetDefaultColor(Color.White);
L_BL1_Down.SetLineWeight(arrow_size);                                                                                                
                                 
plot H_BH2_Up = H_BH2_Up_0;
H_BH2_Up.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
H_BH2_Up.SetDefaultColor(Color.White);
H_BH2_Up.SetLineWeight(arrow_size);                                                                                                
                                 
plot H_BH2_Down = H_BH1_Down_0;
H_BH2_Down.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
H_BH2_Down.SetDefaultColor(Color.BLUE);
H_BH2_Down.SetLineWeight(arrow_size);                                                                                                
                                 
plot L_BL2_Up = L_BL2_Up_0;
L_BL2_Up.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
L_BL2_Up.SetDefaultColor(Color.LIGHT_GREEN);
L_BL2_Up.SetLineWeight(arrow_size);                                                                                                
                                 
plot L_BL2_Down = L_BL2_Down_0;
L_BL2_Down.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
L_BL2_Down.SetDefaultColor(Color.WHITE);
L_BL2_Down.SetLineWeight(arrow_size);                                                                                                
                                 
                                 
########### TEST VARIABLES ###########                                                                                                
                                 
input test_crossing_bubbles = no;

AddChartBubble(test_crossing_bubbles and OS_Down_Bn == bn, high, bn, Color.RED, no);
AddChartBubble(test_crossing_bubbles and OS_Up_Bn == bn, low, bn, Color.GREEN, yes);

AddChartBubble(test_crossing_bubbles and OB_Down_Bn == bn, high, bn, Color.RED, no);
AddChartBubble(test_crossing_bubbles and OB_Up_Bn == bn, low, bn, Color.GREEN, yes);

AddChartBubble(test_crossing_bubbles and H_BH1_Down_Bn == bn, high, bn, Color.RED, no);
AddChartBubble(test_crossing_bubbles and H_BH1_Up_Bn == bn, low, bn, Color.GREEN, yes);

AddChartBubble(test_crossing_bubbles and H_BH2_Down_Bn == bn, high, bn, Color.RED, no);
AddChartBubble(test_crossing_bubbles and H_BH2_Up_Bn == bn, low, bn, Color.GREEN, yes);

AddChartBubble(test_crossing_bubbles and L_BL1_Down_Bn == bn, high, bn, Color.RED, no);
AddChartBubble(test_crossing_bubbles and L_BL1_Up_Bn == bn, low, bn, Color.GREEN, yes);

AddChartBubble(test_crossing_bubbles and L_BL2_Down_Bn == bn, high, bn, Color.RED, no);
AddChartBubble(test_crossing_bubbles and L_BL2_Up_Bn == bn, low, bn, Color.GREEN, yes);                                        
                                 
##################################################################################                                
                                 
                                 
                                 
                                 
                                 
                                 
##################################################################################

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

input price2 = hl2;
input FastLimit = 0.5;
input SlowLimit = 0.05;

def MAMA = Ehler_MAMA(price2, FastLimit, SlowLimit).MAMA;
def FAMA = Ehler_MAMA(price2, FastLimit, SlowLimit).FAMA;

def Crossing = Crosses((MAMA < FAMA), yes);
#Crossing.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);

def Crossing1 = Crosses((MAMA > FAMA), yes);
#Crossing1.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);

# -- - C3 MAX-- - LABELS-- -

    AddLabel(yes, Concat("MAMA: ", Concat("",
if MAMA > FAMA then "Bull" else "Bear")),
if MAMA > FAMA then Color.GREEN else Color.RED);

# -- - C3 MAX-- - C3 MF LINE-- -

    #plot C3_MF_Line = (MAMA + FAMA) / 2;
#C3_MF_Line.SetPaintingStrategy(PaintingStrategy.LINE);
#C3_MF_Line.SetLineWeight(3);
#C3_MF_Line.AssignValueColor(if Color_Candles and((priceColor2 == 1) and(price1 > Upper_BandS) and(condition_BandRevDn)) then Color.YELLOW else if Color_Candles and((priceColor2 == -1) and(price1 < Lower_BandS) and(condition_BandRevUp)) then Color.YELLOW else if Color_Candles and priceColor2 == -1 then Color.RED  else if Color_Candles and(priceColor2 == 1) then Color.GREEN else Color.CURRENT);

#def C3_MF_UP = C3_MF_Line > C3_MF_Line[1];
#def C3_MF_DN = C3_MF_Line < C3_MF_Line[1];
#def priceColor9 = if C3_MF_UP then 1
#                 else if C3_MF_DN then - 1
#                 else priceColor9[1];

def MF_UP = FAMA < MAMA;
def MF_DN = FAMA > MAMA;
def priceColor10 = if MF_UP then 1
                 else if MF_DN then - 1
else priceColor10[1];

input extension_length_limited_to = 10;
def lastbar = if IsNaN(close[-1]) and!IsNaN(close) then BarNumber() else Double.NaN;
#def inertline = InertiaAll(C3_MF_Line, 2);
#def EXT_C3_MF = if !IsNaN(close()) then inertline else EXT_C3_MF[1] + ((EXT_C3_MF[1] - EXT_C3_MF[2]) / (2 - 1));
#plot extension = if BarNumber() <= HighestAll(lastbar) + extension_length_limited_to then EXT_C3_MF else Double.NaN;
#extension.SetDefaultColor(Color.WHITE);
####################################################################################################################################################

#EMA_Candles
#Created by Christopher84 11 / 30 / 2021

input showBreakoutSignals = no;
input length8 = 10;
input length9 = 35;
input show_ema_cloud = yes;

plot AvgExp8 = ExpAverage(price[-displace], length8);

def UPD = AvgExp8[1] < AvgExp8;
AvgExp8.SetStyle(Curve.SHORT_DASH);

plot AvgExp9 = ExpAverage(price[-displace], length9);

def UPW = AvgExp9[1] < AvgExp9;
AvgExp9.SetStyle(Curve.short_dash);
def Below = AvgExp8 < AvgExp9;
def Spark = UPD + UPW + Below;
def UPEMA = AvgExp8[1] < AvgExp8;
def DOWNEMA = AvgExp8[1] > AvgExp8;
AvgExp8.AssignValueColor(if UPEMA then Color.LIGHT_GREEN else if DOWNEMA then Color.RED else Color.YELLOW);
def UPEMA2 = AvgExp9[1] < AvgExp9;
def DOWNEMA2 = AvgExp9[1] > AvgExp9;
AvgExp9.AssignValueColor(if UPEMA2 then Color.LIGHT_GREEN else if DOWNEMA2 then Color.RED else Color.YELLOW);

AddCloud(if show_ema_cloud and(AvgExp9 > AvgExp8) then AvgExp9 else Double.NaN, AvgExp8, Color.light_RED, Color.CURRENT);
AddCloud(if show_ema_cloud and(AvgExp8 > AvgExp9) then AvgExp8 else Double.NaN, AvgExp9, Color.light_GREEN, Color.CURRENT);

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

def UpCalc = (priceColor == 1) + (priceColor2 == 1) + (priceColor8 == 1) + (priceColor10 == 1);
def StrongUpCalc = (priceColor == 1) + (priceColor2 == 1) + (priceColor10 == 1) + (priceColor12 == 1);# + (priceColor12 == 1);
def CandleColor = if (priceColor2 == 1) and(Spark >= 2) then 1
                 else if (priceColor2 == -1) and(Spark < 2) then - 1
#else if ((PriceColor8[2] == 1) and(PriceColor8 == 1)) then 1
#else if ((PriceColor8[2] == -1) and(PriceColor8 == -1)) then - 1
#else if (priceColor2 == 1) then 1
#else if (priceColor2 == -1) then - 1
else 0;
#AssignPriceColor(if Color_Candles and(CandleColor == 1) then Color.GREEN else if Color_Candles and(CandleColor == -1) then Color.RED else Color.GRAY);
plot SparkUP = (Spark == 3) and(CandleColor == 1);
SparkUP.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
SparkUP.AssignValueColor(Color.LIGHT_GREEN);
plot SparkDN = (Spark == 0) and(CandleColor == -1);
SparkDN.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
SparkDN.AssignValueColor(Color.RED);

#-- - CONFIRMATION LEVELS-- - PLOT-- -

    plot NearTResistance = Highest(price, BulgeLengthPrice2);
NearTResistance.AssignValueColor(if (conditionK2) then Color.GREEN else if (conditionK3) then Color.RED else Color.GRAY);
NearTResistance.SetStyle(Curve.SHORT_DASH);
plot NearTSupport = Lowest(price, SqueezeLengthPrice2);
NearTSupport.AssignValueColor(if (conditionK2) then Color.GREEN else if (conditionK3) then Color.RED else Color.GRAY);
NearTSupport.SetStyle(Curve.SHORT_DASH);

#-- - CONFIRMATION LEVELS-- - DEF-- -

    def Buy = UP_OS;
def Sell = DOWN_OB;
def conditionLTB = (conditionK2UP and(Consensus_Level < 0));
def conditionLTS = (conditionK3DN and(Consensus_Level > 0));
def conditionBO = ((Upper_BandS[1] < Upper_BandS) and(Lower_BandS[1] < Lower_BandS)) and((Upper_BandK[1] < Upper_BandK) and(Lower_BandK[1] < Lower_BandK));
def conditionBD = ((Upper_BandS[1] > Upper_BandS) and(Lower_BandS[1] > Lower_BandS) and(Upper_BandK[1] > Upper_BandK) and(Lower_BandK[1] > Lower_BandK));
def MomentumUP = Consensus_Level[1] < Consensus_Level;
def MomentumDOWN = Consensus_Level[1] > Consensus_Level;
def Squeeze_Signal = !IsNaN(Squeeze_Alert);
def conditionOB = (Consensus_Level >= 12) and(Consensus_Line >= 4);
def conditionOS = (Consensus_Level <= -12) and(Consensus_Line <= -3);

AddLabel(yes, if conditionLTB then "BULLISH LTB" else if conditionLTS then "BEARISH LTS" else if conditionK2UP then "TREND_BULLISH" else if conditionK3DN then "TREND_BEARISH" else "TREND_CONSOLIDATION", if conditionLTB then Color.GREEN else if conditionLTS then Color.RED else if conditionK2UP then Color.WHITE else if conditionK3DN then Color.DARK_GRAY else Color.GRAY);
AddLabel(yes, if conditionBD then "BREAKDOWN" else if conditionBO then "BREAKOUT" else "NO_BREAK", if conditionBD then Color.RED else if conditionBO then Color.GREEN else Color.GRAY);
AddLabel(yes, if (Spark == 3) then "SPARK UP = " + Round(Spark, 1) else if (Spark == 0) then  "SPARK DOWN = " + Round(Spark, 1) else "SPARK = " + Round(Spark, 1), if (Spark == 3) then Color.YELLOW else if (Spark == 2) then Color.GREEN else if (Spark == 0) then Color.RED else Color.GRAY);
AddLabel(yes, "SQUEEZE ALERT", if Squeeze_Signal then Color.YELLOW else Color.GRAY);
AddLabel(yes, if MomentumUP then "Consensus_Increasing = " + Round(Consensus_Level, 1) else if MomentumUP or MomentumDOWN and conditionOB then "Consensus_OVERBOUGHT = " + Round(Consensus_Level, 1) else if MomentumDOWN then  "Consensus_Decreasing = " + Round(Consensus_Level, 1) else if MomentumUP or MomentumDOWN and conditionOS then "Consensus_OVERSOLD = " + Round(Consensus_Level, 1) else "Consensus = " + Round(Consensus_Level, 1), if conditionOB then Color.RED else if conditionOS then Color.GREEN else Color.GRAY);

# -- - VERTICLE LINE DAILY-- -

    AddVerticalLine((GetDay() <> GetDay()[1]), "", Color.DARK_GRAY, Curve.SHORT_DASH);

#-- - END-- -