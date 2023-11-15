#START OF RSI / Stochastic / MACD Confluence Strategy for ThinkOrSwim
# RSM_MTF_Labels
#
#CHANGELOG
# 2020.12.30 V2.1 @SuryaKiranC - Fork from @cos251 Version, to reduce the number of lines in code and optimize for performance.
#
# 2020.12.11 V1.1 @cos251 - Added 2D, 3D, 4D, 1WK, 1MNTH Agg Period Labels
#
# 2020.12.02 V1.0 @cos251 - Added RSM signal calculation for following timeframes:
# - 1m, 2m, 5m, 15m, 30m, 1h, 2h, 4h, D
# - Label will be added to top of chart for every allowed TF
# - Label will read "TF:L(Long):S(Short):I(Idle)"
# - Label Color will be green, red or gray accordingly
#
#
#REQUIREMENTS - RSI Set to 7, EXPONENTIAL
#               Stoch Slow 14 and 3 WILDERS
#               MACD 12, 26, 9 WEIGHTED
#
#ORIGINAL REQUEST - @Joseph Patrick 18
# - Link: https://usethinkscript.com/threads/mimicking-power-x-strategy-by-markus-heitkoetter.4283/
#
#

input period = AggregationPeriod.DAY;

DefineGlobalColor("UpTrend", Color.GREEN);
DefineGlobalColor("DownTrend", Color.RED);
DefineGlobalColor("NoTrend", Color.GRAY);

script RSM_ {

    input aP = AggregationPeriod.DAY;
    # RSI
    def lengthRSI = 7;
    def averageTypeRSI = AverageType.EXPONENTIAL;
    # Stochastic
    def over_boughtSt = 80;
    def over_soldSt = 20;
    def KPeriod = 14;
    def DPeriod = 3;
    input averageTypeStoch = AverageType.WILDERS;
    # MACD
    def fastLength = 12;
    def slowLength = 26;
    def MACDLength = 9;
    def averageTypeMACD = AverageType.WEIGHTED;

    ###############################################################
    ##########                 RSI                         #########
    ################################################################

    def NetChgAvg = MovingAverage(averageTypeRSI, close(period = aP) - close(period = aP)[1], lengthRSI);
    def TotChgAvg = MovingAverage(averageTypeRSI, AbsValue(close(period = aP) - close(period = aP)[1]), lengthRSI);
    def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
    def RSI_ = 50 * (ChgRatio + 1);

    ################################################################
    ##########                 Stochastic Slow             #########
    ################################################################

    def SlowK_ = reference StochasticFull(over_boughtSt, over_soldSt, KPeriod, DPeriod, high(period = aP), low(period = aP), close(period = aP), 3, if (averageTypeStoch == 1) then AverageType.SIMPLE else AverageType.EXPONENTIAL).FullK;
    def SlowD_ = reference StochasticFull(over_boughtSt, over_soldSt, KPeriod, DPeriod, high(period = aP), low(period = aP), close(period = aP), 3, if (averageTypeStoch == 1) then AverageType.SIMPLE else AverageType.EXPONENTIAL).FullD;

    ################################################################
    ##########                 MACD                      ###########
    ################################################################

    def Value_ = MovingAverage(averageTypeMACD, close(period = aP), fastLength) - MovingAverage(averageTypeMACD, close(period = aP), slowLength);
    def Avg_ = MovingAverage(averageTypeMACD, Value_, MACDLength);
    def Diff_ = Value_ - Avg_;

    #################################################################
    ##########          Trend & Labels                   #########
    #################################################################
    def UpTrend_ = if RSI_ >= 50 and SlowK_ >= 50 and Value_ > Avg_ then 1 else 0;
    def DownTrend_ = if RSI_ < 50 and SlowK_ < 50 and Value_ < Avg_ then 1 else 0;
    plot Trend_ = if UpTrend_ then 1 else if DownTrend_ then 0 else -1;

}

def currentPeriod = GetAggregationPeriod();
def RSM;

if period >= currentPeriod {
    RSM = RSM_(aP = period);

} else {
    RSM = Double.NaN;

}

AddLabel(!IsNaN(RSM), if period == AggregationPeriod.MONTH then "M"
else if period == AggregationPeriod.WEEK then "W"
else if period == AggregationPeriod.FOUR_DAYS then "4D"
else if period == AggregationPeriod.THREE_DAYS then "3D"
else if period == AggregationPeriod.TWO_DAYS then "2D"
else if period == AggregationPeriod.DAY then "D"
else if period == AggregationPeriod.FOUR_HOURS then "4H"
else if period == AggregationPeriod.TWO_HOURS then "2H"
else if period == AggregationPeriod.HOUR then "60m"
else if period == AggregationPeriod.THIRTY_MIN then "30m"
else if period == AggregationPeriod.TWENTY_MIN then "20m"
else if period == AggregationPeriod.FIFTEEN_MIN then "15m"
else if period == AggregationPeriod.TEN_MIN then "10m"
else if period == AggregationPeriod.FIVE_MIN then "5m"
else if period == AggregationPeriod.FOUR_MIN then "4m"
else if period == AggregationPeriod.THREE_MIN then "3m"
else if period == AggregationPeriod.TWO_MIN then "2m"
else if period == AggregationPeriod.MIN then "1m"
else "", if RSM == 1 then GlobalColor("UpTrend") else if RSM == 0 then GlobalColor("DownTrend") else GlobalColor("NoTrend"));