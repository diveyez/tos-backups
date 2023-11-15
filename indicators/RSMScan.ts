#START OF RSI / Stochastic / MACD Confluence combo for ThinkOrSwim
#
# RSM_SCAN
#
#CHANGELOG
# 2020.12.05 - V1.0 @cos251 - RSM SCANS study - to be used to scan for following conditions:
# - Stocks currently in UpTrend
# - Stocks currently in DownTrend
# - Stocks where UpTrendJustSarted - first bar of UpTrend for scanend TF
# - Stocks where DownTrendJustStarted - first bar of DownTrend for scanned TF
# - Stocks where UpTredJustEnded - first NO Trend bar after UpTrend
# - Stocks where DownTrendJustEnded - first NO Trend bar after DownTrend
# - Recommend using default studies for SCANS of RSI, Stochastics or MACD for efficiency
#  
#REQUIREMENTS - RSI Set to 7, EXPONENTIAL
#               Stoch Slow 14 and 3 WILDERS
#               MACD 12, 26, 9 WEIGHTED
#
#
#CREDITS
# requesed by "@Joseph Patrick 18"
#
#LINK
# https://rockwell-files.s3.amazonaws.com/PXCompanionGuide2ndEd_cover.pdf
# Markus Heikoetter who is the author of the Power X Strategy
# https://usethinkscript.com/threads/mimicking-power-x-strategy-by-markus-heitkoetter.4283/
#
#USAGE
#
declare lower;

plot fiftyLine = 50;
################################################################
##########                 RSI                         #########
################################################################

input lengthRSI = 7;
input over_BoughtRSI = 80;
input over_SoldRSI = 20;
input price = close;
input averageTypeRSI = AverageType.EXPONENTIAL;
def NetChgAvg = MovingAverage(averageTypeRSI, price - price[1], lengthRSI);
def TotChgAvg = MovingAverage(averageTypeRSI, AbsValue(price - price[1]), lengthRSI);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
def RSI = 50 * (ChgRatio + 1);


################################################################
##########                 Stochastic Slow             #########
################################################################
input over_boughtSt = 80;
input over_soldSt = 20;
input KPeriod = 14;
input DPeriod = 3;
input priceH = high;
input priceL = low;
input priceC = close;
input averageTypeStoch = AverageType.WILDERS;
def SlowK = reference StochasticFull(over_boughtSt, over_soldSt, KPeriod, DPeriod, priceH, priceL, priceC, 3, averageTypeStoch).FullK;
def SlowD = reference StochasticFull(over_boughtSt, over_soldSt, KPeriod, DPeriod, priceH, priceL, priceC, 3, averageTypeStoch).FullD;


#################################################################
############           MACD Calculation                 #########
#################################################################
input fastLength = 12;
input slowLength = 26;
input MACDLength = 9;
input averageTypeMACD = AverageType.WEIGHTED;
def Value = MovingAverage(averageTypeMACD, close, fastLength) - MovingAverage(averageTypeMACD, close, slowLength);
def Avg = MovingAverage(averageTypeMACD, Value, MACDLength);
def Diff = Value - Avg;


#################################################################
############          SCAN Variables                    #########
#################################################################

# If you want to scan for stocks that are not in either trend you can add two filters and scan for false for both conditions

# The UpTrend and DownTrend plots can be used to scan for stocks that are currently in that trend
plot UpTrend = if RSI > 50 and SlowK > 50 and Value > Avg then 1 else Double.NaN;
plot DownTrend = if RSI < 50 and SlowK < 50 and Value < Avg then 1 else Double.NaN;
UpTrend.Hide();
DownTrend.Hide();

# The UpTrendJustStarted and DownTrendJustStarted plots can be used to find stocks that have just started
# a trend in either direction
def UpTrendJustStartedBool = if RSI > 50 and SlowK > 50 and Value > Avg then 1 else 0;
def DownTrendJustStartedBool = if RSI < 50 and SlowK < 50 and Value < Avg then 1 else 0;
plot UpTrendJustStarted = if UpTrendJustStartedBool == 1 and UpTrendJustStartedBool[1] == 0 then 1 else Double.NaN;
plot DownTrendJustStarted = if DownTrendJustStartedBool == 1 and DownTrendJustStartedBool[1] == 0 then 1 else Double.NaN;
UpTrendJustStarted.Hide();
DownTrendJustStarted.Hide();
plot UpTrendJustEnded = if UpTrendJustStartedBool[1] == 1 and UpTrendJustStartedBool == 0 then 1 else Double.NaN;
plot DownTrendJustEnded = if DownTrendJustStartedBool[1] == 1 and DownTrendJustStartedBool == 0 then 1 else Double.NaN;
UpTrendJustEnded.Hide();
DownTrendJustEnded.Hide();