#Big_7 

#######################################
##  Create Labels
#######################################
input showtitle = no;
input showlabels = yes;
input AutoAgg = yes;
input AutoAgg2 = yes; 

input ag_skip = no;
input ag_skip2 = no;
input ag_skip_lbl = no;

def agperiod1 = GetAggregationPeriod();
def agperiod2 = 
                if AutoAgg == yes and ag_skip == no and agperiod1 == AggregationPeriod.MIN then AggregationPeriod.two_MIN
           else if AutoAgg == yes and ag_skip == yes and agperiod1 == AggregationPeriod.MIN then AggregationPeriod.three_MIN
           else if AutoAgg == yes and ag_skip == no and agperiod1 == AggregationPeriod.two_MIN then AggregationPeriod.three_MIN
           else if AutoAgg == yes and ag_skip == yes and agperiod1 == AggregationPeriod.two_MIN then AggregationPeriod.five_MIN
           else if AutoAgg == yes and ag_skip == no and agperiod1 == AggregationPeriod.three_MIN then AggregationPeriod.five_MIN 
           else if AutoAgg == yes and ag_skip == yes and agperiod1 == AggregationPeriod.three_MIN then AggregationPeriod.ten_MIN
           else if AutoAgg == yes and ag_skip == no and agperiod1 == AggregationPeriod.five_MIN then AggregationPeriod.ten_MIN
           else if AutoAgg == yes and ag_skip == yes and agperiod1 == AggregationPeriod.five_MIN then AggregationPeriod.fifteen_MIN
           else if AutoAgg == yes and ag_skip == no and agperiod1 == AggregationPeriod.ten_MIN then AggregationPeriod.fifteen_MIN
           else if AutoAgg == yes and ag_skip == yes and agperiod1 == AggregationPeriod.ten_MIN then AggregationPeriod.thirty_MIN
           else if AutoAgg == yes and ag_skip == no and agperiod1 == AggregationPeriod.fifteen_MIN then AggregationPeriod.thirty_MIN
           else if AutoAgg == yes and ag_skip == yes and agperiod1 == AggregationPeriod.fifteen_MIN then AggregationPeriod.HOUR
           else if AutoAgg == yes and ag_skip == no and agperiod1 == AggregationPeriod.thirty_MIN then AggregationPeriod.hour
           else if AutoAgg == yes and ag_skip == yes and agperiod1 == AggregationPeriod.thirty_MIN then AggregationPeriod.two_hours
           else if AutoAgg == yes and ag_skip == no and agperiod1 == AggregationPeriod.hour then AggregationPeriod.two_hours
           else if AutoAgg == yes and ag_skip == yes and agperiod1 == AggregationPeriod.HOUR then AggregationPeriod.four_hours
           else if AutoAgg == yes and ag_skip == no and agperiod1 == AggregationPeriod.two_hours then AggregationPeriod.four_hours
           else if AutoAgg == yes and ag_skip == yes and agperiod1 == AggregationPeriod.two_HOURS then AggregationPeriod.Day
           else if AutoAgg == yes and ag_skip == no and agperiod1 == AggregationPeriod.four_hours then AggregationPeriod.day
           else if AutoAgg == yes and ag_skip == yes and agperiod1 == AggregationPeriod.four_HOURS then AggregationPeriod.Week
           else if AutoAgg == yes and ag_skip == no and agperiod1 == AggregationPeriod.day then AggregationPeriod.week
           else if AutoAgg == yes and ag_skip == yes and agperiod1 == AggregationPeriod.day then AggregationPeriod.month
           else if AutoAgg == yes and ag_skip == no and agperiod1 == AggregationPeriod.week then AggregationPeriod.month
           else agperiod1[1];          
input timeframe = aggregationperiod.DAY;

input length = 10;
input length2 = 20;

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
#input price = close;
input length_BB = 10;
input length_BB2 = 20;
plot avg = ExpAverage(close(period = agperiod1), length_BB);
#plot avg = ExpAverage((price), length);
def height = avg - avg[length];
avg.SetStyle(Curve.SHORT_DASH);
avg.SetLineWeight(1);

def UP = avg[1] < avg;
def DOWN = avg[1] > avg;
Avg.AssignValueColor(if UP then Color.LIGHT_GREEN else if DOWN then Color.RED else Color.YELLOW);

plot avg2 = ExpAverage(close(period = agperiod2), length_BB);
#plot avg2 = ExpAverage((price), length2);
def height2 = avg2 - avg2[length_BB2];
avg2.SetStyle(Curve.SHORT_DASH);
avg2.SetLineWeight(1);

def UP2 = avg2[1] < avg2;
def DOWN2 = avg2[1] > avg2;
Avg2.AssignValueColor(if UP2 then Color.LIGHT_GREEN else if DOWN2 then Color.RED else Color.YELLOW);

# -- - TRIPLE EXHAUSTION-- -
    input DI_Length = 14;
                                                                                                                                                       input averageType_3x = AverageType.SIMPLE;
input length_3x = 1000;
def over_bought_3x = 80;
def over_sold_3x = 20;
def KPeriod_3x = 10;
def DPeriod_3x = 10;
def priceH1 = high(period = agperiod2);
def priceL1 = low(period = agperiod2);
def priceC1 = close(period = agperiod2);
def priceO1 = close(period = agperiod2);
def priceH_3x = high;
def priceL_3x = low;
def priceC_3x = close;     
# -- - TRIPLE EXHAUSTION INDICATORS - StochasticSlow / MACD / MACD StDev / DMI + /-                                                                                                 
def bn = barnumber();
def SlowK_3x = reference StochasticFull(over_bought_3x, over_sold_3x, KPeriod_3x, DPeriod_3x, priceH_3x, priceL_3x, priceC_3x, 3, averageType_3x).FullK;
#def SlowK1 = reference StochasticFull(over_bought_3x, over_sold_3x, KPeriod_3x, DPeriod_3x, priceH1, priceL1, priceC1, 3, averageType).FullK;

def MACD_3x = reference MACD()."Value";
#def MACD1 = (ExpAverage(priceC1[1], 12)) - (ExpAverage(priceC1[1], 26));

def priceMean_3x = Average(MACD_3x, length_3x);
#def priceMean1 = SimpleMovingAvg(MACD1, length);

def MACD_stdev_3x = (MACD_3x - priceMean_3x) / StDev(MACD_3x, length_3x);
#def MACD_stdev1 = (MACD1 - priceMean1) / StDev(MACD1, length);

def dPlus_3x = reference DMI()."DI+";
def dMinus_3x = reference DMI()."DI-";

#def hiDiff1 = priceH1 - priceH1[1];
#def loDiff1 = priceL1[1] - priceL1;
#def plusDM1 = if hiDiff1 > loDiff1 and hiDiff1 > 0 then hiDiff1 else 0;
#def minusDM1 =  if loDiff1 > hiDiff1 and loDiff1 > 0 then loDiff1 else 0;

#def ATR1 = MovingAverage(averageType, TrueRange(priceH1, priceC1, priceL1), DI_Length);

#def dPlus1 = 100 * MovingAverage(AverageType.WILDERS, plusDM1, DI_Length) / ATR1;
#def dMinus1 = 100 * MovingAverage(AverageType.WILDERS, minusDM1, DI_Length) / ATR1;

def sellerRegular = SlowK_3x < 20 and MACD_stdev_3x < -1 and dPlus_3x < 15;
#def sellerRegular1 = SlowK1 < 20 and MACD_stdev1 < -1 and dPlus1 < 15;

def sellerExtreme = SlowK_3x < 20 and MACD_stdev_3x < -2 and dPlus_3x < 15;
#def sellerExtreme1 = SlowK1 < 20 and MACD_stdev1 < -2 and dPlus1 < 15;

def buyerRegular = SlowK_3x > 80 and MACD_stdev_3x > 1 and dMinus_3x < 15;
#def buyerRegular1 = SlowK1 > 80 and MACD_stdev1 > 1 and dMinus1 < 15;

def buyerExtreme = SlowK_3x > 80 and MACD_stdev_3x > 2 and dMinus_3x < 15;
#def buyerExtreme1 = SlowK1 > 80 and MACD_stdev1 > 2 and dMinus1 < 15;
                                                                                                                                                            
# -- - Arrows / Triggers                                                            

def RegularBuy = if sellerRegular[1] and!sellerRegular then 1 else 0;
def RegularBuy_bn = if RegularBuy then bn else RegularBuy_bn[1];

def ExtremeBuy = if sellerExtreme[1] and!sellerExtreme then 1 else 0;
def ExtremeBuy_bn = if ExtremeBuy then bn else ExtremeBuy_bn[1];

def RegularSell = if buyerRegular[1] and!buyerRegular then 1 else 0;
def RegularSell_bn = if RegularSell then bn else RegularSell_bn[1];

def ExtremeSell = if buyerExtreme[1] and!buyerExtreme then 1 else 0;
def ExtremeSell_bn = if ExtremeSell then bn else ExtremeSell_bn[1];


#plot RegularBuy1 = if Show_3x and(sellerRegular1[1] and!sellerRegular1) then 1 else 0;
#plot ExtremeBuy1 = if Show_3x and(sellerExtreme1[1] and!sellerExtreme1) then 1 else 0;
#plot RegularSell1 = if Show_3x and(buyerRegular1[1] and!buyerRegular1) then 1 else 0;
#plot ExtremeSell1 = if Show_3x and(buyerExtreme1[1] and!buyerExtreme1) then 1 else 0;

#AddVerticalLine(RegularBuy1 or ExtremeBuy1, "", Color.dark_Green, curve.short_DASH);
#AddVerticalLine(RegularSell1 or ExtremeSell1, "", Color.Dark_Red, curve.short_DASH);
def Condition1UP = avg > avg2;
def Condition1DN = avg < avg2;

def Condition2UP = Buy_percent > 50;
def Condition2DN = Buy_percent < 50;

def BullUP = Condition1UP + Condition2UP;
def BearDN = Condition1DN + Condition2DN;

def Bull_Bear = if Condition1UP == 1 and Condition2UP == 1 then 1 else if Condition1DN == 1 and Condition2DN == 1 then - 1 else 0;

def Condition3UP = if buyerRegular then 1 else 0;
def Condition3DN =  if sellerRegular then 1 else 0;

def Condition4UP =  if buyerExtreme then 1 else 0;
def Condition4DN =  if sellerExtreme then 1 else 0;

def priceColor = if ((avg[1] < avg) and(avg2[1] < avg2)) then 1
                 else if ((avg[1] > avg) and(avg2[1] > avg2)) then - 1
                 else priceColor[1];


input show_Vol_Labels = no;



# https://usethinkscript.com/threads/the-big-four-chart-setup.14711/
# v1.0 - GiantBull and TradingNumbers
# v1.1 - TradingNumbers - hiding vertical lines by ddefault and added arrows
# v1.2 - TradingNumbers - added TMO
# v1.3 - TradingNumbers - hold trend input added
# v1.4 - TradingNumbers - simplified options, added filter with TMO, and set conditions per GianBull parameters
# v1.5 - TradingNumbers - removed TMO color filter percentChg GiantBull, added labels
# v1.6 - HODL - added Triple Exhaustion + Vix Alert 4 to candle painting


AddLabel(showtitle, " Big_6: ", Color.Light_gray);

# AK Trend

def aktrend_input1 = 3;
def aktrend_input2 = 8;
def aktrend_price = close;

def aktrend_fastmaa = MovAvgExponential(aktrend_price, aktrend_input1);
def aktrend_fastmab = MovAvgExponential(aktrend_price, aktrend_input2);
def aktrend_bspread = (aktrend_fastmaa - aktrend_fastmab) * 1.001;

def cond1_UP = if aktrend_bspread > 0 then 1 else 0;
def cond1_DN = if aktrend_bspread <= 0 then - 1 else 0;

# ZSCORE

def zscore_price = close;
def zscore_length = 20;
def zscore_ZavgLength = 20;

def zscore_oneSD = StDev(zscore_price, zscore_length);
def zscore_avgClose = SimpleMovingAvg(zscore_price, zscore_length);
def zscore_ofoneSD = zscore_oneSD * zscore_price[1];
def zscore_Zscorevalue = ((zscore_price - zscore_avgClose) / zscore_oneSD);
def zscore_avgZv = Average(zscore_Zscorevalue, 20);
def zscore_Zscore = ((zscore_price - zscore_avgClose) / zscore_oneSD);
def zscore_avgZscore = Average(zscore_Zscorevalue, zscore_ZavgLength);

def cond2_UP = if zscore_Zscore > 0 then 1 else 0;
def cond2_DN = if zscore_Zscore <= 0 then - 1 else 0;

# Ehlers

def ehlers_length = 34;

def ehlers_price = (high + low) / 2;
def ehlers_coeff = ehlers_length * ehlers_price * ehlers_price - 2 * ehlers_price * Sum(ehlers_price, ehlers_length)[1] + Sum(ehlers_price * ehlers_price, ehlers_length)[1];
def ehlers_Ehlers = Sum(ehlers_coeff * ehlers_price, ehlers_length) / Sum(ehlers_coeff, ehlers_length);

def cond3_UP = if close > ehlers_Ehlers then 1 else 0;
def cond3_DN = if close <= ehlers_Ehlers then - 1 else 0;

# Anchored Momentum

def amom_src = close;
def amom_MomentumPeriod = 10;
def amom_SignalPeriod = 8;
def amom_SmoothMomentum = no;
def amom_SmoothingPeriod = 7;

def amom_p = 2 * amom_MomentumPeriod + 1;
def amom_t_amom = if amom_SmoothMomentum == yes then ExpAverage(amom_src, amom_SmoothingPeriod) else amom_src;
def amom_amom = 100 * ((amom_t_amom / (Average(amom_src, amom_p)) - 1));
def amom_amoms = Average(amom_amom, amom_SignalPeriod);


def cond4_UP = if amom_amom > 0 then 1 else 0;
def cond4_DN = if amom_amom <= 0 then - 1 else 0;

# TMO

def tmo_length = 30; #def 14
def tmo_calcLength = 6; #def 5
def tmo_smoothLength = 6; #def 3

def tmo_data = fold i = 0 to tmo_length with s do s + (if close > GetValue(open, i) then 1 else if close < GetValue(open, i) then - 1 else 0);
def tmo_EMA5 = ExpAverage(tmo_data, tmo_calcLength);
def tmo_Main = ExpAverage(tmo_EMA5, tmo_smoothLength);
def tmo_Signal = ExpAverage(tmo_Main, tmo_smoothLength);
def tmo_color = if tmo_Main > tmo_Signal then 1 else -1;

def cond5_UP = if tmo_Main <= 0 then 1 else 0;
def cond5_DN = if tmo_Main >= 0 then - 1 else 0;

# Strategy

input Strategy_Confirmation_Factor = 4;
input Strategy_FilterWithTMO = no;
input Strategy_ColoredCandlesOn = yes;
input Strategy_VerticalLinesOn = no;
input Strategy_HoldTrend = no;

def cond_UP = cond1_UP + cond2_UP + cond3_UP + cond4_UP;
def cond_DN = cond1_DN + cond2_DN + cond3_DN + cond4_DN;

def direction = if cond_UP >= Strategy_Confirmation_Factor and(!Strategy_FilterWithTMO or cond5_UP) then 1
                else if cond_DN <= -Strategy_Confirmation_Factor and(!Strategy_FilterWithTMO or cond5_DN) then - 1
                else if !Strategy_HoldTrend and direction[1] == 1 and cond_UP < Strategy_Confirmation_Factor and cond_DN > -Strategy_Confirmation_Factor then 0
                else if !Strategy_HoldTrend and direction[1] == -1 and cond_DN > -Strategy_Confirmation_Factor and cond_UP < Strategy_Confirmation_Factor then 0
                else direction[1];

plot signal_up = direction == 1 and direction[1] < 1;
signal_up.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
signal_up.SetDefaultColor(Color.WHITE);
signal_up.Hide();
signal_up.HideBubble();
signal_up.HideTitle();

plot signal_dn = direction == -1 and direction[1] > -1;
signal_dn.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
signal_dn.SetDefaultColor(Color.WHITE);
signal_dn.Hide();
signal_dn.HideBubble();
signal_dn.HideTitle();

def pd = 22;
def bbl = 20;
def mult = 2.0;
def lb = 50;
def ph = 0.85;
def pl = 1.01;

# Downtrend Criterias

def ltLB = 40;
def mtLB = 14;
def str = 3;
# -- - Inputs

def AtrMult_Blst = 1.0;
def nATR_Blst = 4;
def AvgType_Blst = AverageType.HULL;
def trig_Blst = 20;

def pd_Blst = 22;
def bbl_Blst = 20;
def mult_Blst = 2.0;
def lb_Blst = 50;
def ph_Blst = 0.85;
def pl_Blst = 1.01;

# Downtrend Criterias

def ltLB_Blst = 40;
def mtLB_Blst = 14;

def wvf = ((highest(close, pd) - low) / (highest(close, pd))) * 100;
def sDev = mult * stdev(wvf, bbl);
def midLine = SimpleMovingAvg(wvf, bbl);
def lowerBand = midLine - sDev;
def upperBand = midLine + sDev;
def rangeHigh = (highest(wvf, lb)) * ph;

#  Filtered Bar Criteria

def upRange = low > low[1] and close > high[1];
def upRange_Aggr = close > close[1] and close > open[1];
def filtered = ((wvf[1] >= upperBand[1] or wvf[1] >= rangeHigh[1]) and(wvf < upperBand and wvf < rangeHigh));
def filtered_Aggr = (wvf[1] >= upperBand[1] or wvf[1] >= rangeHigh[1]);

# Alerts Criteria 1
def alert4 = upRange_Aggr and close > close[str] and(close < close[ltLB] or close < close[mtLB]) and filtered_Aggr;


def BulgeLengthV = 20;
def SqueezeLengthV = 20;
def BulgeLengthV2 = 20;
def SqueezeLengthV2 = 20;


AssignPriceColor(if Strategy_ColoredCandlesOn then if alert4 then Color.cyan 
else if buyerRegular then Color.green
else if buyerExtreme then Color.green 
else if direction == 1 then Color.LIGHT_GREEN 
else if sellerRegular then Color.dark_red
else if sellerExtreme then Color.Dark_red
else if direction == -1 then Color.RED 
else Color.GRAY 
else Color.CURRENT);



AddVerticalLine(Strategy_VerticalLinesOn and signal_up, "Buy", Color.LIGHT_GREEN);
AddVerticalLine(Strategy_VerticalLinesOn and signal_dn, "Sell", Color.RED);

Alert(signal_up[1], "Buy", Alert.BAR, Sound.DING);
Alert(signal_dn[1], "Sell", Alert.BAR, Sound.DING);

AddLabel(showtitle, " BB_V5: ", Color.light_gray);
AddLabel(showlabels, if  Condition1UP == 1 and Condition2UP == 1 and(Condition3UP == 1 or Condition4UP == 1) then "**CALLS ONLY!**" 
else if Condition1UP == 1 and Condition2UP == 1 then "Very Bullish"   
else if direction == 1 then "Bullish"                
else if Condition1DN == 1 and Condition2DN == 1 and(Condition3DN == 1 or Condition4DN == 1) then "**PUTS ONLY!**" 
else if Condition1DN == 1 and Condition2DN == 1 then "Very Bearish" 
else if direction == -1 then "Bearish"              
else if ((avg[1] > avg) and(avg > avg2) and(Buy_percent > 50)) then "Bullish Retracement" 
                else if ((avg[1] < avg) and(avg < avg2) and(Buy_percent < 50)) then "Bearish Retracement" + " | "  
                else "CHOP", 
                     if Condition1UP == 1 and Condition2UP == 1 and(Condition3UP == 1 or Condition4UP == 1) then Color.cyan
                else if Condition1DN == 1 and Condition2DN == 1 and(Condition3DN == 1 or Condition4DN == 1) then Color.Magenta
                else if Condition1UP == 1 and Condition2UP == 1 then Color.GREEN 
else if direction == 1 then Color.green                          
else if Condition1DN == 1 and Condition2DN == 1 then Color.RED 
else if direction == -1 then Color.red           
                else Color.orange);