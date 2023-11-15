#TS_V9_Filtered - Modified 4 / 25 / 23 to include 2 higher ags to filter lower via previous signal
#TS Strategy_V9 Created by Christopher84 08 / 10 / 2021
#Modified 05 / 23 / 2022 to include Chart Bubbles and Labels.
    #Modified 05 / 25 / 2022 to include Targets and Stoplosses.
        #Modified 05 / 26 / 2022 to include Line Labels by Dcstocks
#Modified 05 / 27 / 2022 to include target 7.

input Hide_AG2_Sell = yes; #hint Yes = Do NOT show higher aggregation signals
input Hide_AG2_Buy = yes; #hint Yes = Do NOT show higher aggregation signals
input show_Last_lbl = yes; #hint Yes = Do NOT show higher aggregation signals

input ag_skip = no;
input ag_skip2 = no;
input ag_skip_lbl = no;

input AutoAgg = yes;
input AutoAgg2 = yes;

input tradeDaytimeOnly = no; #hint tradeDaytimeOnly: (IntraDay Only) Only perform trades during hours stated
input tradeDaytimeOnly2 = no; #hint tradeDaytimeOnly2: (IntraDay Only) Only perform trades during hours stated
input tradeDaytimeOnly3 = no; #hint tradeDaytimeOnly3: (IntraDay Only) Only perform trades during hours stated


input OpenTime = 0930;
input OpenTime2 = 0930;
input OpenTime3 = 0930;
input CloseTime = 1600;
input CloseTime2 = 1600;
input CloseTime3 = 1600;

def coloredCandlesOn = no;
def show_3x = yes;
input length = 23;

input ATRPeriod = 11;
input ATRPeriod2 = 11;
input ATRPeriod3 = 11;

input ATRFactor = 2.2;
input ATRFactor2 = 2.2;
input ATRFactor3 = 2.2;

input bars_back = 10;


#input OpenTime = { "0630", "0645", "0700", "0715", "0730", "0745", "0800", "0815", "0830", "0845", "0900", "0915", default"0930", "0945", "1000", "1015", "1030", "1045", "1100", "1115", "1130"};
#input OpenTime2 = { "0630", "0645", "0700", "0715", "0730", "0745", "0800", "0815", "0830", "0845", "0900", "0915", default"0930", "0945", "1000", "1015", "1030", "1045", "1100", "1115", "1130"};
#input OpenTime3 = { "0630", "0645", "0700", "0715", "0730", "0745", "0800", "0815", "0830", "0845", "0900", "0915", default"0930", "0945", "1000", "1015", "1030", "1045", "1100", "1115", "1130"};

#input CloseTime = { "1230", "1245", "1300", "1315", "1330", "1345", "1400", "1415", "1430", "1445", "1500", "1515", "1530", "1545", default "1600", "1615", "1630", "1645", "1700", "1715", "1730", "1745", "1800"};
#input CloseTime2 = { "1230", "1245", "1300", "1315", "1330", "1345", "1400", "1415", "1430", "1445", "1500", "1515", "1530", "1545", default "1600", "1615", "1630", "1645", "1700", "1715", "1730", "1745", "1800"};
#input CloseTime3 = { "1230", "1245", "1300", "1315", "1330", "1345", "1400", "1415", "1430", "1445", "1500", "1515", "1530", "1545", default "1600", "1615", "1630", "1645", "1700", "1715", "1730", "1745", "1800"};



input trailType = { default modified, unmodified };
input trailType2 = { default modified2, unmodified2 };
input trailType3 = { default modified3, unmodified3 };

input firstTrade = { default long, short };
input firstTrade2 = { default long2, short2 };
input firstTrade3 = { default long3, short3 };

input averageType = AverageType.SIMPLE;
def averageType2 = AverageType.SIMPLE;
def averageType3 = AverageType.SIMPLE;

input Market_Open_Lbl = no;
def Market_Open_Lbl2 = no;
def Market_Open_Lbl3 = no;

def Tick_Size_Lbl = no;
def Tick_Size_Lbl2 = no;
def Tick_Size_Lbl3 = no;

input Long_Short_Lbl = no;
def Long_Short_Lbl2 = no;
def Long_Short_Lbl3 = no;

input Closed_Orders_Lbl = yes;
def Closed_Orders_Lbl2 = no;
def Closed_Orders_Lbl3 = no;

input Profit_Lbl = no;
def Profit_Lbl2 = no;
def Profit_Lbl3 = no;

input PL_Lbl = no;
def PL_Lbl2 = no;
def PL_Lbl3 = no;

input Max_Lbl = no;
def Max_Lbl2 = no;
def Max_Lbl3 = no;

input Open_Trades_Lbl = no;
def Open_Trades_Lbl2 = no;
def Open_Trades_Lbl3 = no;

input Profit_Pct_Lbl = no;
def Profit_Pct_Lbl2 = no;
def Profit_Pct_Lbl3 = no;

input Avg_Per_Lbl = no;
def Avg_Per_Lbl2 = no;
def Avg_Per_Lbl3 = no;

input LabelsOn = yes;
def LabelsOn2 = no;
def LabelsOn3 = no;

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

def agperiod3 =
                if AutoAgg2 == yes and ag_skip2 == no and agperiod2 == AggregationPeriod.MIN then AggregationPeriod.two_MIN
           else if AutoAgg2 == yes and ag_skip2 == yes and agperiod2 == AggregationPeriod.MIN then AggregationPeriod.three_MIN
           else if AutoAgg2 == yes and ag_skip2 == no and agperiod2 == AggregationPeriod.two_MIN then AggregationPeriod.three_MIN
           else if AutoAgg2 == yes and ag_skip2 == yes and agperiod2 == AggregationPeriod.two_MIN then AggregationPeriod.five_MIN
           else if AutoAgg2 == yes and ag_skip2 == no and agperiod2 == AggregationPeriod.three_MIN then AggregationPeriod.five_MIN
           else if AutoAgg2 == yes and ag_skip2 == yes and agperiod2 == AggregationPeriod.three_MIN then AggregationPeriod.ten_MIN
           else if AutoAgg2 == yes and ag_skip2 == no and agperiod2 == AggregationPeriod.five_MIN then AggregationPeriod.ten_MIN
           else if AutoAgg2 == yes and ag_skip2 == yes and agperiod2 == AggregationPeriod.five_MIN then AggregationPeriod.fifteen_MIN
           else if AutoAgg2 == yes and ag_skip2 == no and agperiod2 == AggregationPeriod.ten_MIN then AggregationPeriod.fifteen_MIN
           else if AutoAgg2 == yes and ag_skip2 == yes and agperiod2 == AggregationPeriod.ten_MIN then AggregationPeriod.thirty_MIN
           else if AutoAgg2 == yes and ag_skip2 == no and agperiod2 == AggregationPeriod.fifteen_MIN then AggregationPeriod.thirty_MIN
           else if AutoAgg2 == yes and ag_skip2 == yes and agperiod2 == AggregationPeriod.fifteen_MIN then AggregationPeriod.HOUR
           else if AutoAgg2 == yes and ag_skip2 == no and agperiod2 == AggregationPeriod.thirty_MIN then AggregationPeriod.hour
           else if AutoAgg2 == yes and ag_skip2 == yes and agperiod2 == AggregationPeriod.thirty_MIN then AggregationPeriod.two_hours
           else if AutoAgg2 == yes and ag_skip2 == no and agperiod2 == AggregationPeriod.hour then AggregationPeriod.two_hours
           else if AutoAgg2 == yes and ag_skip2 == yes and agperiod2 == AggregationPeriod.HOUR then AggregationPeriod.four_hours
           else if AutoAgg2 == yes and ag_skip2 == no and agperiod2 == AggregationPeriod.two_hours then AggregationPeriod.four_hours
           else if AutoAgg2 == yes and ag_skip2 == yes and agperiod2 == AggregationPeriod.two_HOURS then AggregationPeriod.Day
           else if AutoAgg2 == yes and ag_skip2 == no and agperiod2 == AggregationPeriod.four_hours then AggregationPeriod.day
           else if AutoAgg2 == yes and ag_skip2 == yes and agperiod2 == AggregationPeriod.four_HOURS then AggregationPeriod.Week
           else if AutoAgg2 == yes and ag_skip2 == no and agperiod2 == AggregationPeriod.day then AggregationPeriod.week
           else if AutoAgg2 == yes and ag_skip2 == yes and agperiod2 == AggregationPeriod.day then AggregationPeriod.month
           else agperiod2[1];
 

#########################################################################################################################################################


#########################################################################################################################################################

def high2 = high(period = agperiod2);
def low2 = low(period = agperiod2);
def close2 = close(period = agperiod2);

#########################################################################################################################################################


#########################################################################################################################################################

input showSignals = yes; #hint showSignals: show buy and sell arrows
def showSignals2 = yes; #hint showSignals2: show buy and sell arrows
def showSignals3 = yes; #hint showSignals3: show buy and sell arrows

input LongTrades = yes; #hint LongTrades: perform long trades
def LongTrades2 = yes; #hint LongTrades2: perform long trades
def LongTrades3 = yes; #hint LongTrades3: perform long trades

input ShortTrades = yes; #hint ShortTrades: perform short trades
def ShortTrades2 = yes; #hint ShortTrades2: perform short trades
def ShortTrades3 = yes; #hint ShortTrades3: perform short trades

input showLabels = yes; #hint showLabels: show PL labels at top
def showLabels2 = no; #hint showLabels3: show PL labels at top
def showLabels3 = no; #hint showLabels3: show PL labels at top

input useStops = no; #hint useStops: use stop orders
def useStops2 = no; #hint useStops2: use stop orders
def useStops3 = no; #hint useStops3: use stop orders

input useAlerts = no; #hint useAlerts: use alerts on signals
def useAlerts2 = no; #hint useAlerts2: use alerts on signals
def useAlerts3 = no; #hint useAlerts3: use alerts on signals


def high3 = high(period = agperiod3);
def low3 = low(period = agperiod3);
def close3 = close(period = agperiod3);

#########################################################################################################################################################


#########################################################################################################################################################

def price_V9 = close;
def price_V92 = close2;
def price_V93 = close3;

#input coloredCandlesOn = no;
#input coloredCandlesOn2 = no;

#########################################################################################################################################################

def bn = barnumber();

#########################################################################################################################################################

Assert(ATRFactor > 0, "'atr factor' must be positive: " + ATRFactor);

def HiLo = Min(high - low, 1.5 * Average(high - low, ATRPeriod));
def HRef = if low <= high[1]
    then high - close[1]
    else (high - close[1]) - 0.5 * (low - high[1]);
def LRef = if high >= low[1]
    then close[1] - low
    else (close[1] - low) - 0.5 * (low[1] - high);

def trueRange;
switch (trailType) {
    case modified:
        trueRange = Max(HiLo, Max(HRef, LRef));
    case unmodified:
        trueRange = TrueRange(high, close, low);
}
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

#########################################################################################################################################################


#########################################################################################################################################################

Assert(ATRFactor2 > 0, "'atr factor' must be positive: " + ATRFactor2);

def HiLo2 = Min(high2 - low2, 1.5 * Average(high2 - low2, ATRPeriod2));
def HRef2 = if low2 <= high2[1]
    then high2 - close2[1]
    else (high2 - close2[1]) - 0.5 * (low2 - high2[1]);
def LRef2 = if high2 >= low2[1]
    then close2[1] - low2
    else (close2[1] - low2) - 0.5 * (low2[1] - high2);

def trueRange2;
switch (trailType2) {
    case modified2:
        trueRange2 = Max(HiLo2, Max(HRef2, LRef2));
    case unmodified2:
        trueRange2 = TrueRange(high2, close2, low2);
}
def loss2 = ATRFactor2 * MovingAverage(averageType2, trueRange2, ATRPeriod2);

def state2 = { default init2, long2, short2 };
def trail2;
switch (state2[1]) {
    case init2:
        if (!IsNaN(loss2)) {
            switch (firstTrade2) {
                case long2:
                    state2 = state2.long2;
                    trail2 = close2 - loss2;
                case short2:
                    state2 = state2.short2;
                    trail2 = close2 + loss2;
            }
        } else {
            state2 = state2.init2;
            trail2 = Double.NaN;
        }
    case long2:
        if (close2 > trail2[1]) {
            state2 = state2.long2;
            trail2 = Max(trail2[1], close2 - loss2);
        } else {
            state2 = state2.short2;
            trail2 = close2 + loss2;
        }
    case short2:
        if (close2 < trail2[1]) {
            state2 = state2.short2;
            trail2 = Min(trail2[1], close2 + loss2);
        } else {
            state2 = state2.long2;
            trail2 = close2 - loss2;
        }
}

#########################################################################################################################################################


#########################################################################################################################################################

Assert(ATRFactor3 > 0, "'atr factor' must be positive: " + ATRFactor3);

def HiLo3 = Min(high3 - low3, 1.5 * Average(high3 - low3, ATRPeriod3));
def HRef3 = if low3 <= high3[1]
    then high3 - close3[1]
    else (high3 - close3[1]) - 0.5 * (low3 - high3[1]);
def LRef3 = if high3 >= low3[1]
    then close3[1] - low3
    else (close3[1] - low3) - 0.5 * (low3[1] - high3);

def trueRange3;
switch (trailType3) {
    case modified3:
        trueRange3 = Max(HiLo3, Max(HRef3, LRef3));
    case unmodified3:
        trueRange3 = TrueRange(high3, close3, low3);
}
def loss3 = ATRFactor3 * MovingAverage(averageType3, trueRange3, ATRPeriod3);

def state3 = { default init3, long3, short3 };
def trail3;
switch (state3[1]) {
    case init3:
        if (!IsNaN(loss3)) {
            switch (firstTrade3) {
                case long3:
                    state3 = state3.long3;
                    trail3 = close3 - loss3;
                case short3:
                    state3 = state3.short3;
                    trail3 = close3 + loss3;
            }
        } else {
            state3 = state3.init3;
            trail3 = Double.NaN;
        }
    case long3:
        if (close3 > trail3[1]) {
            state3 = state3.long3;
            trail3 = Max(trail3[1], close3 - loss3);
        } else {
            state3 = state3.short3;
            trail3 = close3 + loss3;
        }
    case short3:
        if (close3 < trail3[1]) {
            state3 = state3.short3;
            trail3 = Min(trail3[1], close3 + loss3);
        } else {
            state3 = state3.long3;
            trail3 = close3 - loss3;
        }
}

#########################################################################################################################################################


#########################################################################################################################################################

def TrailingStop = trail;
def LongEnter = (price_v9 crosses above TrailingStop);
def LongExit = (price_v9 crosses below TrailingStop);

def TrailingStop2 = trail2;
def LongEnter2 = (price_v92 crosses above TrailingStop2);
def LongExit2 = (price_v92 crosses below TrailingStop2);

def TrailingStop3 = trail3;
def LongEnter3 = (price_v93 crosses above TrailingStop3);
def LongExit3 = (price_v93 crosses below TrailingStop3);

#########################################################################################################################################################


#########################################################################################################################################################

#AssignPriceColor(if coloredCandlesOn and((price > TrailingStop)) then Color.GREEN else if coloredCandlesOn and((price < TrailingStop)) then Color.RED else Color.GRAY);
Alert(price_v9 crosses above TrailingStop, "long", Alert.BAR, Sound.Ding);
Alert(price_v92 crosses above TrailingStop2, "long", Alert.BAR, Sound.Ding);
Alert(price_v93 crosses above TrailingStop3, "long", Alert.BAR, Sound.Ding);

Alert(price_v9 crosses below TrailingStop, "short", Alert.BAR, Sound.Ding);
Alert(price_v92 crosses below TrailingStop2, "short", Alert.BAR, Sound.Ding);
Alert(price_v93 crosses below TrailingStop3, "short", Alert.BAR, Sound.Ding);

#########################################################################################################################################################


#########################################################################################################################################################

def upsignal = (price_V9 crosses above TrailingStop);
def upsignal2 = (price_V92 crosses above TrailingStop2);
def upsignal3 = (price_V93 crosses above TrailingStop3);

def downsignal = (price_v9 crosses below TrailingStop);
def downsignal2 = (price_v92 crosses below TrailingStop2);
def downsignal3 = (price_v93 crosses below TrailingStop3);

#########################################################################################################################################################


#########################################################################################################################################################

def Begin = SecondsFromTime(OpenTime);
def End = SecondsTillTime(CloseTime);

def Begin2 = SecondsFromTime(OpenTime2);
def End2 = SecondsTillTime(CloseTime2);

def Begin3 = SecondsFromTime(OpenTime3);
def End3 = SecondsTillTime(CloseTime3);

#########################################################################################################################################################


#########################################################################################################################################################

# Only use market hours when using intraday timeframe
def isIntraDay = if GetAggregationPeriod() > 14400000 or GetAggregationPeriod() == 0 then 0 else 1;
def MarketOpen = if !tradeDaytimeOnly or!isIntraDay then 1 else if tradeDaytimeOnly and isIntraDay and Begin > 0 and End > 0 then 1 else 0;

def isIntraDay2 = if GetAggregationPeriod() > 14400000 or GetAggregationPeriod() == 0 then 0 else 1;
def MarketOpen2 = if !tradeDaytimeOnly2 or!isIntraDay2 then 1 else if tradeDaytimeOnly2 and isIntraDay2 and Begin2 > 0 and End2 > 0 then 1 else 0;

def isIntraDay3 = if GetAggregationPeriod() > 14400000 or GetAggregationPeriod() == 0 then 0 else 1;
def MarketOpen3 = if !tradeDaytimeOnly3 or!isIntraDay3 then 1 else if tradeDaytimeOnly3 and isIntraDay3 and Begin3 > 0 and End3 > 0 then 1 else 0;

######################################################
##  Create Signals -
##  FILL IN THIS SECTION
##      replace 0 > 0 with your conditions for signals
######################################################

def PLBuySignal_1 = if  MarketOpen and(upsignal) then 1 else 0; # insert condition to create long position in place of the 0 > 0
def PLBuySignal_1_bn = if PLBuySignal_1 then bn else PLBuySignal_1_bn[1];

def PLBuySignal2_2 = if MarketOpen2 and(Upsignal2) then 1 else 0; # insert condition to create long position in place of the 0 > 0
def PLBuySignal2_2_bn = if PLBuySignal2_2 then bn else PLBuySignal2_2_bn[1];

def PLBuySignal3_3 = if MarketOpen3 and(Upsignal3) then 1 else 0; # insert condition to create long position in place of the 0 > 0
def PLBuySignal3_3_bn = if PLBuySignal3_3 then bn else PLBuySignal3_3_bn[1];

###################################################################################

def PLSellSignal_1 =  if MarketOpen and(downsignal) then 1 else 0; # insert condition to create short position in place of the 0 > 0
def PLSellSignal_1_bn = if PLSellSignal_1 then bn else PLSellSignal_1_bn[1];

def PLSellSignal2_2 = if MarketOpen2 and(downsignal2) then 1 else 0; # insert condition to create short position in place of the 0 > 0
def PLSellSignal2_2_bn = if PLSellSignal2_2 then bn else PLSellSignal2_2_bn[1];

def PLSellSignal3_3 = if MarketOpen3 and(downsignal3) then 1 else 0; # insert condition to create short position in place of the 0 > 0
def PLSellSignal3_3_bn = if PLSellSignal3_3 then bn else PLSellSignal3_3_bn[1];

#########################################################################################################################################################

def Prev_Bar_Buy_1 = if (PLBuySignal_1 or PLBuySignal_1[1] or PLBuySignal_1[2] or PLBuySignal_1[3]) then 1 else 0;
def Prev_Bar_Buy_2 = if (PLBuySignal2_2 or PLBuySignal2_2[1] or PLBuySignal2_2[2] or PLBuySignal2_2[3]) then 1 else 0;
def Prev_Bar_Buy_3 = if (PLBuySignal3_3 or PLBuySignal3_3[1] or PLBuySignal3_3[2] or PLBuySignal3_3[3]) then 1 else 0;

def Prev_Bar_Sell_1 = if (PLSellSignal_1 or PLSellSignal_1[1] or PLSellSignal_1[2] or PLSellSignal_1[3]) then 1 else 0;
def Prev_Bar_Sell_2 = if (PLSellSignal2_2 or PLSellSignal2_2[1] or PLSellSignal2_2[2] or PLSellSignal2_2[3]) then 1 else 0;
def Prev_Bar_Sell_3 = if (PLSellSignal3_3 or PLSellSignal3_3[1] or PLSellSignal3_3[2] or PLSellSignal3_3[3]) then 1 else 0;

def Prev_Buy_2 = if upsignal and(PLSellSignal2_2_bn < PLBuySignal2_2_bn) then 1 else 0;
def Prev_Buy_3 = if upsignal and(PLSellSignal3_3_bn < PLBuySignal3_3_bn) then 1 else 0;
def Prev_Buy_4 = if upsignal and(PLSellSignal2_2_bn < PLBuySignal2_2_bn) then 1 else 0;
def Prev_Buy_5 = if upsignal and(PLSellSignal3_3_bn < PLBuySignal3_3_bn) then 1 else 0;

def Prev_Sell_2 = if downsignal and(PLSellSignal2_2_bn > PLBuySignal2_2_bn) then 1 else 0;
def Prev_Sell_3 = if downsignal and(PLSellSignal3_3_bn > PLBuySignal3_3_bn) then 1 else 0;
def Prev_Sell_4 = if downsignal2 and(PLSellSignal2_2_bn > PLBuySignal2_2_bn) then 1 else 0;
def Prev_Sell_5 = if downsignal and(PLSellSignal3_3_bn > PLBuySignal3_3_bn) then 1 else 0;

#########################################################################################################################################################

####################################################
#diff signal same agg bn
####################################################

def Sell_Minus_Buy1_1 = (PLSellSignal_1_bn - PLBuySignal_1_bn);
def Buy_Minus_Sell1_1 = (PLBuySignal_1_bn - PLSellSignal_1_bn);

def Sell2_Minus_Buy2_2 = (PLSellSignal2_2_bn - PLBuySignal2_2_bn);
def Buy2_Minus_Sell2_2 = (PLBuySignal2_2_bn - PLSellSignal2_2_bn);

def Sell3_Minus_Buy3_3 = (PLSellSignal3_3_bn - PLBuySignal3_3_bn);
def Buy3_Minus_Sell3_3 = (PLBuySignal3_3_bn - PLSellSignal3_3_bn);

####################################################
#opposite signal Same ag within x bars
####################################################

def Sell_dist_Buy_1 = Sell_Minus_Buy1_1 >= bars_back;
def Buy_dist_Sell_1 = Buy_Minus_Sell1_1 >= bars_back;

def Sell_dist_Buy_2 = Sell2_Minus_Buy2_2 >= bars_back;
def Buy_dist_Sell_2 = Buy2_Minus_Sell2_2 >= bars_back;

def Sell_dist_Buy_3 = Sell3_Minus_Buy3_3 >= bars_back;
def Buy_dist_Sell_3 = Buy3_Minus_Sell3_3 >= bars_back;

####################################################
#opposite signal higher ag bn
####################################################

def Sell_Minus_Buy2_1 = (PLSellSignal_1_bn - PLBuySignal2_2_bn);
def Buy_Minus_Sell2_1 = (PLBuySignal_1_bn - PLSellSignal2_2_bn);

def Sell_Minus_Buy3_1 = (PLSellSignal_1_bn - PLBuySignal3_3_bn);
def Buy_Minus_Sell3_1 = (PLBuySignal_1_bn - PLSellSignal3_3_bn);

def Sell2_Minus_Buy3_2 = (PLSellSignal2_2_bn - PLBuySignal3_3_bn);
def Buy2_Minus_Sell3_2 = (PLBuySignal2_2_bn - PLSellSignal3_3_bn);

####################################################
#opposite signal higher ag within x bars
####################################################

def Sell_dist_Buy2_1 = Sell_Minus_Buy2_1 >= bars_back;
def Buy_dist_Sell2_1 = Buy_Minus_Sell2_1 >= bars_back;

def Sell_dist_Buy3_3 = Sell_Minus_Buy3_1 >= bars_back;
def Buy_dist_Sell3_3 = Buy_Minus_Sell3_1 >= bars_back;

def Sell2_dist_Buy3_2 = Sell2_Minus_Buy3_2 >= bars_back;
def Buy2_dist_Sell3_2 = Buy2_Minus_Sell3_2 >= bars_back;

####################################################
#same signal higher agg
####################################################

def Sell_Minus_Sell2_1 = (PLSellSignal_1_bn - PLSellSignal2_2_bn);
def Buy_Minus_Buy2_1 = (PLBuySignal_1_bn - PLBuySignal2_2_bn);

def Sell_Minus_Sell3_1 = (PLSellSignal_1_bn - PLSellSignal3_3_bn);
def Buy_Minus_Buy3_1 = (PLBuySignal_1_bn - PLBuySignal3_3_bn);

def Sell2_Minus_Sell3_2 = (PLSellSignal2_2_bn - PLSellSignal3_3_bn);
def Buy2_Minus_Buy3_2 = (PLBuySignal2_2_bn - PLBuySignal3_3_bn);

####################################################
#Same signal higher ag within x bars
####################################################

def Sell_dist_Sell2_1 = Sell_Minus_Sell2_1 >= bars_back;
def Buy_dist_Buy2_1 = Buy_Minus_Buy2_1 >= bars_back;

def Sell_dist_Sell3_1 = Sell_Minus_Sell3_1 >= bars_back;
def Buy_dist_Buy3_1 = Buy_Minus_Buy3_1 >= bars_back;

def Sell2_dist_Sell3_2 = Sell2_Minus_Sell3_2 >= bars_back;
def Buy2_dist_Buy3_2 = Buy2_Minus_Buy3_2 >= bars_back;

####################################################
#Last signal higher ag
####################################################

def Last_Sell_2 = if downsignal and Sell_Minus_Sell2_1 < Sell_Minus_Buy2_1 then 1 else 0;
def Last_Buy_2 = if upsignal and  Sell_Minus_Sell2_1 > Sell_Minus_Buy2_1 then 1 else 0;

def Last_Sell_3 = if downsignal and  Sell_Minus_Sell3_1 < Sell_Minus_Buy3_1 then 1 else 0;
def Last_Buy_3 = if upsignal and  Sell_Minus_Sell3_1 > Sell_Minus_Buy3_1 then 1 else 0;

def Last2_Sell_3 = if downsignal and  Sell2_Minus_Sell3_2 < Sell2_Minus_Buy3_2 then 1 else 0;
def Last2_Buy_3 = if upsignal and  Sell2_Minus_Sell3_2 > Sell2_Minus_Buy3_2 then 1 else 0;

####################################################
#higher ag prev sell bn > than prev buy bn
####################################################

def SellSig_First_2 = if downsignal and(PLSellSignal2_2_bn > PLBuySignal2_2_bn) then 1 else 0;
def BuySig_First_2 = if upsignal and(PLBuySignal2_2_bn > PLSellSignal2_2_bn) then 1 else 0;

def SellSig_First_3 = if downsignal2 and(PLSellSignal3_3_bn > PLBuySignal3_3_bn) then 1 else 0;
def BuySig_First_3 = if upsignal2 and(PLBuySignal3_3_bn > PLSellSignal3_3_bn) then 1 else 0;

#########################################################################################################################################################



#def PLBuySignal = if  MarketOpen and(upsignal) and(Last_Buy_2 or Last_Buy_3 or Last2_Buy_3) then 1 else 0; # insert condition to create long position in place of the 0 > 0
#def PLSellSignal =  if MarketOpen and(downsignal) and(Last_Sell_2 or Last_Sell_3 or Last2_Sell_3) then 1 else 0; # insert condition to create short position in place of the 0 > 0

def PLBuySignal_51 = if  MarketOpen and(upsignal) and(BuySig_First_2) then 1 else 0; # insert condition to create long position in place of the 0 > 0
def PLSellSignal_51 =  if MarketOpen and(downsignal) and(SellSig_First_2) then 1 else 0; # insert condition to create short position in place of the 0 > 0

def PLSellSignal2 = if MarketOpen2 and(downsignal2) and(SellSig_First_3)  then 1 else 0; # insert condition to create short position in place of the 0 > 0
def PLBuySignal2 = if MarketOpen2 and(UPsignal2) and(BuySig_First_3) then 1 else 0; # insert condition to create short position in place of the 0 > 0

def PLSellSignal3 = if MarketOpen2 and(downsignal3)then 1 else 0; # insert condition to create short position in place of the 0 > 0
def PLBuySignal3 = if MarketOpen2 and(UPsignal3)then 1 else 0; # insert condition to create short position in place of the 0 > 0

def PLBuySignal = if (PLBuySignal_51 or PLBuySignal2 or PLBuySignal3) then 1 else 0; # insert condition to create long position in place of the 0 > 0
def PLSellSignal =  if (PLSellSignal_51 or PLSellSignal2 or PLSellSignal3) then 1 else 0; # insert condition to create short position in place of the 0 > 0



def PLBuySignal_bn = if PLBuySignal then bn else PLBuySignal_bn[1];
def PLSellSignal_bn = if PLSellSignal then bn else PLSellSignal_bn[1];

#########################################################################################################################################################

def PLBuyStop = if !useStops then 0 else if (0 > 0) then 1 else 0; # insert condition to stop in place of the 0 < 0
def PLBuyStop2 = if !useStops2 then 0 else if (0 > 0) then 1 else 0; # insert condition to stop in place of the 0 < 0
def PLBuyStop3 = if !useStops3 then 0 else if (0 > 0) then 1 else 0; # insert condition to stop in place of the 0 < 0

def PLSellStop = if !useStops then 0 else if (0 > 0) then 1 else 0; # insert condition to stop in place of the 0 > 0
def PLSellStop2 = if !useStops2 then 0 else if (0 > 0) then 1 else 0; # insert condition to stop in place of the 0 > 0
def PLSellStop3 = if !useStops3 then 0 else if (0 > 0) then 1 else 0; # insert condition to stop in place of the 0 > 0

def PLMktStop = if MarketOpen[-1] == 0 then 1 else 0; # If tradeDaytimeOnly is set, then stop at end of day
def PLMktStop2 = if MarketOpen2[-1] == 0 then 1 else 0; # If tradeDaytimeOnly is set, then stop at end of day
def PLMktStop3 = if MarketOpen3[-1] == 0 then 1 else 0; # If tradeDaytimeOnly is set, then stop at end of day

#########################################################################################################################################################

#########################################################################################################################################################

#######################################
##  Maintain the position of trades
#######################################
# change CurrentPosition to CurrentPosition2, PLBuySignal tp PLBuySignal2, LongTrades to LongTrades2, ShortTrades to ShortTrades2, PLBuyStop to PLBuyStop2, useStops to useStops2, PLMktStop to PLMktStop2

#########################################################################################################################################################


#########################################################################################################################################################

def CurrentPosition;  # holds whether flat = 0 long = 1 short = -1

if (BarNumber() == 1) or IsNaN(CurrentPosition[1]) {
    CurrentPosition = 0;
} else {
    if CurrentPosition[1] == 0 {            # FLAT
        if (PLBuySignal and LongTrades) {
            CurrentPosition = 1;
        } else if (PLSellSignal and ShortTrades) {
            CurrentPosition = -1;
        } else {
            CurrentPosition = CurrentPosition[1];
        }
    } else if CurrentPosition[1] == 1 {      # LONG
        if (PLSellSignal and ShortTrades) {
            CurrentPosition = -1;
        } else if ((PLBuyStop and useStops) or PLMktStop or(PLSellSignal and ShortTrades == 0)) {
            CurrentPosition = 0;
        } else {
            CurrentPosition = CurrentPosition[1];
        }
    } else if CurrentPosition[1] == -1 {     # SHORT
        if (PLBuySignal and LongTrades) {
            CurrentPosition = 1;
        } else if ((PLSellStop and useStops) or PLMktStop or(PLBuySignal and LongTrades == 0)) {
            CurrentPosition = 0;
        } else {
            CurrentPosition = CurrentPosition[1];
        }
    } else {
        CurrentPosition = CurrentPosition[1];
    }
}

#########################################################################################################################################################


#########################################################################################################################################################

def CurrentPosition2;  # holds whether flat = 0 long = 1 short = -1

if (BarNumber() == 1) or IsNaN(CurrentPosition2[1]) {
    CurrentPosition2 = 0;
} else {
    if CurrentPosition2[1] == 0 {            # FLAT
        if (PLBuySignal2 and LongTrades2) {
            CurrentPosition2 = 1;
        } else if (PLSellSignal2 and ShortTrades2) {
            CurrentPosition2 = -1;
        } else {
            CurrentPosition2 = CurrentPosition2[1];
        }
    } else if CurrentPosition2[1] == 1 {      # LONG
        if (PLSellSignal2 and ShortTrades2) {
            CurrentPosition2 = -1;
        } else if ((PLBuyStop2 and useStops2) or PLMktStop2 or(PLSellSignal2 and ShortTrades2 == 0)) {
            CurrentPosition2 = 0;
        } else {
            CurrentPosition2 = CurrentPosition2[1];
        }
    } else if CurrentPosition2[1] == -1 {     # SHORT
        if (PLBuySignal2 and LongTrades2) {
            CurrentPosition2 = 1;
        } else if ((PLSellStop2 and useStops2) or PLMktStop2 or(PLBuySignal2 and LongTrades2 == 0)) {
            CurrentPosition2 = 0;
        } else {
            CurrentPosition2 = CurrentPosition2[1];
        }
    } else {
        CurrentPosition2 = CurrentPosition2[1];
    }
}

#########################################################################################################################################################


#########################################################################################################################################################

def CurrentPosition3;  # holds whether flat = 0 long = 1 short = -1

if (BarNumber() == 1) or IsNaN(CurrentPosition3[1]) {
    CurrentPosition3 = 0;
} else {
    if CurrentPosition3[1] == 0 {            # FLAT
        if (PLBuySignal3 and LongTrades3) {
            CurrentPosition3 = 1;
        } else if (PLSellSignal3 and ShortTrades3) {
            CurrentPosition3 = -1;
        } else {
            CurrentPosition3 = CurrentPosition3[1];
        }
    } else if CurrentPosition3[1] == 1 {      # LONG
        if (PLSellSignal3 and ShortTrades3) {
            CurrentPosition3 = -1;
        } else if ((PLBuyStop3 and useStops3) or PLMktStop3 or(PLSellSignal3 and ShortTrades3 == 0)) {
            CurrentPosition3 = 0;
        } else {
            CurrentPosition3 = CurrentPosition3[1];
        }
    } else if CurrentPosition3[1] == -1 {     # SHORT
        if (PLBuySignal3 and LongTrades3) {
            CurrentPosition3 = 1;
        } else if ((PLSellStop3 and useStops3) or PLMktStop3 or(PLBuySignal3 and LongTrades3 == 0)) {
            CurrentPosition3 = 0;
        } else {
            CurrentPosition3 = CurrentPosition3[1];
        }
    } else {
        CurrentPosition3 = CurrentPosition3[1];
    }
}

#########################################################################################################################################################


#########################################################################################################################################################

def isLong = if CurrentPosition == 1 then 1 else 0;
def isShort = if CurrentPosition == -1 then 1 else 0;
def isFlat = if CurrentPosition == 0 then 1 else 0;

def isLong2 = if CurrentPosition2 == 1 then 1 else 0;
def isShort2 = if CurrentPosition2 == -1 then 1 else 0;
def isFlat2 = if CurrentPosition2 == 0 then 1 else 0;

def isLong3 = if CurrentPosition3 == 1 then 1 else 0;
def isShort3 = if CurrentPosition3 == -1 then 1 else 0;
def isFlat3 = if CurrentPosition3 == 0 then 1 else 0;




def BuySig = if (((isShort[1] and LongTrades) or(isFlat[1] and LongTrades)) and PLBuySignal and showSignals)  then 1 else 0;
#BuySig.AssignValueColor(Color.cyan);
#BuySig.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
#BuySig.SetLineWeight(1);
def buysigbn = if BuySig then bn else buysigbn[1];

def BuySig2 = if (((isShort2[1] and LongTrades2) or(isFlat2[1] and LongTrades2)) and PLBuySignal2 and showSignals2) then 1 else 0;
#BuySig2.AssignValueColor(Color.white);
#BuySig2.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
#BuySig2.SetLineWeight(1);
def buysig2bn = if BuySig2 then bn else buysig2bn[1];

###################################################################################################################################
def BuySig3 = if (((isShort3[1] and LongTrades3) or(isFlat3[1] and LongTrades3)) and PLBuySignal3 and showSignals3) then 1 else 0;
#BuySig3.AssignValueColor(Color.ORANGE);
#BuySig3.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
#BuySig3.SetLineWeight(1);
def buysig3bn = if BuySig3 then bn else buysig3bn[1];
def buy_11 = if (BuySig) then 1 else 0;
def buy_21 = if (BuySig or BuySig2 or BuySig3) then 1 else 0;
def buy = if (Hide_AG2_Buy == yes) then Buy_11 else if (Hide_AG2_Buy == no) then buy_21 else buy[1];
#Buy.AssignValueColor(Color.Magenta);
#Buy.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
#Buy.SetLineWeight(1);
###################################################################################################################################

Alert(BuySig and useAlerts, "Buy Signal", Alert.BAR, Sound.Ding);
Alert(BuySig and useAlerts, "Buy Signal", Alert.BAR, Sound.Ding);

#Plot BuySig2 = if (!isLong[1] and PLBuySignal2 and showSignals2 and LongTrades2) then 1 else 0;

Alert(BuySig2 and useAlerts2, "Buy Signal", Alert.BAR, Sound.Ding);
Alert(BuySig2 and useAlerts2, "Buy Signal", Alert.BAR, Sound.Ding);

# If not already short and get a PLSellSignal
def SellSig = if (((isLong[1] and ShortTrades) or(isFlat[1] and ShortTrades)) and PLSellSignal and showSignals) then 1 else 0;
#SellSig.AssignValueColor(Color.cyan);
#SellSig.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
#SellSig.SetLineWeight(1);
def Sellsigbn = if SellSig then bn else SellSigbn[1];
#addverticalLine(Sellsig, "", Color.red);

###################################################################################################################################
def SellSig2 = if (((isLong2[1] and ShortTrades2) or(isFlat2[1] and ShortTrades2)) and PLSellSignal2 and showSignals2)then 1 else 0;
#SellSig2.AssignValueColor(Color.white);
#SellSig2.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
#SellSig2.SetLineWeight(1);
def Sellsig2bn = if SellSig2 then bn else SellSig2bn[1];

Alert(BuySig3 and useAlerts3, "Buy Signal", Alert.BAR, Sound.Ding);
Alert(BuySig3 and useAlerts3, "Buy Signal", Alert.BAR, Sound.Ding);

def SellSig3 = if (((isLong3[1] and ShortTrades3) or(isFlat3[1] and ShortTrades3)) and PLSellSignal3 and showSignals3) then 1 else 0;
#SellSig3.AssignValueColor(Color.orange);
#SellSig3.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
#SellSig3.SetLineWeight(1);
def Sellsig3bn = if SellSig3 then bn else SellSig3bn[1];
def Sell_11 = if (SellSig or SellSig2 or SellSig3) then 1 else 0;
def Sell_21 = (SellSig);
def Sell = if (Hide_AG2_Sell == yes) then sell_21  else if (Hide_AG2_Sell == no) then(sell_11) else sell[1];
#def Sell = if (SellSig or SellSig2 or SellSig3) then 1 else 0;

#Sell.AssignValueColor(Color.Magenta);
#Sell.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
#Sell.SetLineWeight(1);

def Hide_Sell = if Sell and(Sell[1] or sell[2] or sell[3] or sell[4]) then 0 else 1;
def Hide_Buy = if Buy and(Buy[1] or Buy[2] or Buy[3] or Buy[4]) then 0 else 1;

##################################################################################################################################

plot Sell_1 = if (Sell) and(Hide_Sell == 1) then 1 else 0;
Sell_1.AssignValueColor(Color.cyan);
Sell_1.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
Sell_1.SetLineWeight(1);
def sellbn = if sell_1 then bn else sellbn[1];

plot Buy_1 = if (Buy) and(Hide_Buy == 1) then 1 else 0;
Buy_1.AssignValueColor(Color.cyan);
Buy_1.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
Buy_1.SetLineWeight(1);
def Buybn = if Buy_1 then bn else buybn[1];

##################################################################################################################################


#addchartbubble(BuySig and usealerts, low, "TS", Color.Light_Green, no);
#addchartbubble(SellSig and usealerts, High, "TS", Color.red, no);
Alert(SellSig and useAlerts, "Sell Signal", Alert.BAR, Sound.Ding);
Alert(SellSig and useAlerts, "Sell Signal", Alert.BAR, Sound.Ding);

#If not already short and get a PLSellSignal2


#addchartbubble(BuySig2 and usealerts2, low, "TS", Color.Light_Green, no);
#addchartbubble(SellSig2 and usealerts2, High, "TS", Color.red, no);
#Alert(SellSig2 and useAlerts2, "Sell Signal", Alert
Alert(SellSig2 and useAlerts2, "Sell Signal2", Alert.BAR, Sound.Ding);
Alert(SellSig2 and useAlerts2, "Sell Signal2", Alert.BAR, Sound.Ding);


#addchartbubble(BuySig3 and usealerts3, low, "TS", Color.Light_Green, no);
#addchartbubble(SellSig3 and usealerts3, High, "TS", Color.red, no);
#Alert(SellSig3 and useAlerts3, "Sell Signal", Alert
Alert(SellSig3 and useAlerts3, "Sell Signal3", Alert.BAR, Sound.Ding);
Alert(SellSig3 and useAlerts3, "Sell Signal3", Alert.BAR, Sound.Ding);

###################################################################################################################################

# If long and get a PLBuyStop
plot BuyStpSig = if (PLBuyStop and isLong[1] and showSignals and useStops) or(isLong[1] and PLMktStop) or(isLong[1] and PLSellSignal and!ShortTrades) then 1 else 0;
BuyStpSig.AssignValueColor(Color.LIGHT_GRAY);
BuyStpSig.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
BuyStpSig.SetLineWeight(1);

Alert(BuyStpSig and useAlerts, "Buy Stop Signal", Alert.BAR, Sound.Ding);
Alert(BuyStpSig and useAlerts, "Buy Stop Signal", Alert.BAR, Sound.Ding);

#If long and get a PLBuyStop
plot BuyStpSig2 = if (PLBuyStop2 and isLong2[1] and showSignals2 and useStops2) or(isLong2[1] and PLMktStop2) or(isLong2[1] and PLSellSignal2 and!ShortTrades2) then 1 else 0;
BuyStpSig2.AssignValueColor(Color.LIGHT_GRAY);
BuyStpSig2.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
BuyStpSig2.SetLineWeight(1);

Alert(BuyStpSig2 and useAlerts2, "Buy Stop Signal", Alert.BAR, Sound.Ding);
Alert(BuyStpSig2 and useAlerts2, "Buy Stop Signal", Alert.BAR, Sound.Ding);

plot BuyStpSig3 = if (PLBuyStop3 and isLong3[1] and showSignals3 and useStops3) or(isLong3[1] and PLMktStop3) or(isLong3[1] and PLSellSignal3 and!ShortTrades3) then 1 else 0;
BuyStpSig3.AssignValueColor(Color.LIGHT_GRAY);
BuyStpSig3.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
BuyStpSig3.SetLineWeight(1);

Alert(BuyStpSig3 and useAlerts3, "Buy Stop Signal", Alert.BAR, Sound.Ding);
Alert(BuyStpSig3 and useAlerts3, "Buy Stop Signal", Alert.BAR, Sound.Ding);

###################################################################################################################################


###################################################################################################################################

# If short and get a PLSellStop
plot SellStpSig = if (PLSellStop and isShort[1] and showSignals and useStops) or(isShort[1] and PLMktStop) or(isShort[1] and PLBuySignal and!LongTrades) then 1 else 0;
SellStpSig.AssignValueColor(Color.LIGHT_GRAY);
SellStpSig.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
SellStpSig.SetLineWeight(1);

Alert(SellStpSig and useAlerts, "Sell Stop Signal", Alert.BAR, Sound.Ding);
Alert(SellStpSig and useAlerts, "Sell Stop Signal", Alert.BAR, Sound.Ding);

#If short and get a PLSellStop
plot SellStpSig2 = if (PLSellStop2 and isShort2[1] and showSignals2 and useStops2) or(isShort2[1] and PLMktStop2) or(isShort2[1] and PLBuySignal2 and!LongTrades2) then 1 else 0;
SellStpSig2.AssignValueColor(Color.LIGHT_GRAY);
SellStpSig2.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
SellStpSig2.SetLineWeight(1);

Alert(SellStpSig2 and useAlerts2, "Sell Stop Signal", Alert.BAR, Sound.Ding);
Alert(SellStpSig2 and useAlerts2, "Sell Stop Signal", Alert.BAR, Sound.Ding);

plot SellStpSig3 = if (PLSellStop3 and isShort3[1] and showSignals3 and useStops3) or(isShort3[1] and PLMktStop3) or(isShort3[1] and PLBuySignal3 and!LongTrades3) then 1 else 0;
SellStpSig3.AssignValueColor(Color.LIGHT_GRAY);
SellStpSig3.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
SellStpSig3.SetLineWeight(1);

Alert(SellStpSig3 and useAlerts3, "Sell Stop Signal", Alert.BAR, Sound.Ding);
Alert(SellStpSig3 and useAlerts3, "Sell Stop Signal", Alert.BAR, Sound.Ding);

###################################################################################################################################

#######################################
##  Orders
#######################################

def isOrder = if ((isFlat[1] and(BuySig and LongTrades) or(SellSig and ShortTrades)) or(isLong[1] and BuyStpSig or(SellSig and ShortTrades)) or(isShort[1] and SellStpSig or(BuySig and LongTrades))) then 1 else 0;
# If there is an order, then the price is the next days close
def orderPrice = if (isOrder and((BuySig and LongTrades) or(SellSig and ShortTrades))) then close else orderPrice[1];

def orderCount = CompoundValue(1, if IsNaN(isOrder) or BarNumber() == 1 then 0 else if (BuySig or SellSig) then orderCount[1] + 1 else orderCount[1], 0);

def isOrder2 = if ((isFlat2[1] and(BuySig2 and LongTrades2) or(SellSig2 and ShortTrades2)) or(isLong2[1] and BuyStpSig2 or(SellSig2 and ShortTrades2)) or(isShort2[1] and SellStpSig2 or(BuySig2 and LongTrades2))) then 1 else 0;

#If there is an order, then the price is the next days close
def orderPrice2 = if (isOrder2 and((BuySig2 and LongTrades2) or(SellSig2 and ShortTrades2))) then close2 else orderPrice2[1];

def orderCount2 = CompoundValue(1, if IsNaN(isOrder2) or BarNumber() == 1 then 0 else if (BuySig2 or SellSig2) then orderCount2[1] + 1 else orderCount2[1], 0);

def isOrder3 = if ((isFlat3[1] and(BuySig3 and LongTrades3) or(SellSig3 and ShortTrades3)) or(isLong3[1] and BuyStpSig3 or(SellSig3 and ShortTrades3)) or(isShort3[1] and SellStpSig3 or(BuySig3 and LongTrades3))) then 1 else 0;

#If there is an order, then the price is the next days close
def orderPrice3 = if (isOrder3 and((BuySig3 and LongTrades3) or(SellSig3 and ShortTrades3))) then close3 else orderPrice3[1];

def orderCount3 = CompoundValue(1, if IsNaN(isOrder3) or BarNumber() == 1 then 0 else if (BuySig3 or SellSig3) then orderCount3[1] + 1 else orderCount3[1], 0);

#######################################
##  Price and Profit
#######################################

def profitLoss;

if (!isOrder or orderPrice[1] == 0) {
    profitLoss = 0;
} else if ((isOrder and isLong[1]) and(SellSig or BuyStpSig)) {
    profitLoss = close - orderPrice[1];
} else if ((isOrder and isShort[1]) and(BuySig or SellStpSig)) {
    profitLoss = orderPrice[1] - close;
} else {
    profitLoss = 0;
}

def profitLoss2;

if (!isOrder2 or orderPrice2[1] == 0) {
    profitLoss2 = 0;
} else if ((isOrder2 and isLong2[1]) and(SellSig2 or BuyStpSig2)) {
    profitLoss2 = close2 - orderPrice2[1];
} else if ((isOrder2 and isShort2[1]) and(BuySig2 or SellStpSig2)) {
    profitLoss2 = orderPrice2[1] - close2;
} else {
    profitLoss2 = 0;
}

def profitLoss3;

if (!isOrder3 or orderPrice3[1] == 0) {
    profitLoss3 = 0;
} else if ((isOrder3 and isLong3[1]) and(SellSig3 or BuyStpSig3)) {
    profitLoss3 = close3 - orderPrice3[1];
} else if ((isOrder3 and isShort3[1]) and(BuySig3 or SellStpSig3)) {
    profitLoss3 = orderPrice3[1] - close3;
} else {
    profitLoss3 = 0;
}

# Total Profit or Loss
def profitLossSum = CompoundValue(1, if IsNaN(isOrder)  or BarNumber() == 1 then 0 else if isOrder then profitLossSum[1] + profitLoss else profitLossSum[1], 0);

#Total Profit or Loss
def profitLossSum2 = CompoundValue(1, if IsNaN(isOrder2) or BarNumber() == 1 then 0 else if isOrder2 then profitLossSum2[1] + profitLoss2 else profitLossSum2[1], 0);

#Total Profit or Loss
def profitLossSum3 = CompoundValue(1, if IsNaN(isOrder3) or BarNumber() == 1 then 0 else if isOrder3 then profitLossSum3[1] + profitLoss3 else profitLossSum3[1], 0);

# How many trades won or lost
def profitWinners = CompoundValue(1, if IsNaN(profitWinners[1]) or BarNumber() == 1 then 0 else if isOrder and profitLoss > 0 then profitWinners[1] + 1 else profitWinners[1], 0);
def profitLosers = CompoundValue(1, if IsNaN(profitLosers[1])  or BarNumber() == 1 then 0 else if isOrder and profitLoss < 0 then profitLosers[1] + 1 else profitLosers[1], 0);
def profitPush = CompoundValue(1, if IsNaN(profitPush[1])  or BarNumber() == 1 then 0 else if isOrder and profitLoss == 0 then profitPush[1] + 1 else profitPush[1], 0);

#How many trades won or lost
def profitWinners2 = CompoundValue(1, if IsNaN(profitWinners2[1]) or BarNumber() == 1 then 0 else if isOrder2 and profitLoss2 > 0 then profitWinners2[1] + 1 else profitWinners2[1], 0);
def profitLosers2 = CompoundValue(1, if IsNaN(profitLosers2[1]) or BarNumber() == 1 then 0 else if isOrder2 and profitLoss2 < 0 then profitLosers2[1] + 1 else profitLosers2[1], 0);
def profitPush2 = CompoundValue(1, if IsNaN(profitPush2[1]) or BarNumber() == 1 then 0 else if isOrder2 and profitLoss2 == 0 then profitPush2[1] + 1 else profitPush2[1], 0);

#How many trades won or lost
def profitWinners3 = CompoundValue(1, if IsNaN(profitWinners3[1]) or BarNumber() == 1 then 0 else if isOrder3 and profitLoss3 > 0 then profitWinners3[1] + 1 else profitWinners3[1], 0);
def profitLosers3 = CompoundValue(1, if IsNaN(profitLosers3[1]) or BarNumber() == 1 then 0 else if isOrder3 and profitLoss3 < 0 then profitLosers3[1] + 1 else profitLosers3[1], 0);
def profitPush3 = CompoundValue(1, if IsNaN(profitPush3[1]) or BarNumber() == 1 then 0 else if isOrder3 and profitLoss3 == 0 then profitPush3[1] + 1 else profitPush3[1], 0);

# Current Open Trade Profit or Loss
def TradePL = if isLong then Round(((close - orderPrice) / TickSize()) * TickValue()) else if isShort then Round(((orderPrice - close) / TickSize()) * TickValue()) else 0;

#Current Open Trade Profit or Loss
def TradePL2 = if isLong2 then Round(((close2 - orderPrice2) / TickSize()) * TickValue()) else if isShort2 then Round(((orderPrice2 - close2) / TickSize()) * TickValue()) else 0;

#Current Open Trade Profit or Loss
def TradePL3 = if isLong3 then Round(((close3 - orderPrice3) / TickSize()) * TickValue()) else if isShort3 then Round(((orderPrice3 - close3) / TickSize()) * TickValue()) else 0;

# Convert to actual dollars based on Tick Value for bubbles
def dollarProfitLoss = if orderPrice[1] == 0 or IsNaN(orderPrice[1]) then 0 else Round((profitLoss / TickSize()) * TickValue());

#Convert to actual dollars based on Tick Value for bubbles
def dollarProfitLoss2 = if orderPrice2[1] == 0 or IsNaN(orderPrice2[1]) then 0 else Round((profitLoss2 / TickSize()) * TickValue());

#Convert to actual dollars based on Tick Value for bubbles
def dollarProfitLoss3 = if orderPrice3[1] == 0 or IsNaN(orderPrice3[1]) then 0 else Round((profitLoss3 / TickSize()) * TickValue());

# Closed Orders dollar P / L
def dollarPLSum = Round((profitLossSum / TickSize()) * TickValue());

#Closed Orders dollar P / L
def dollarPLSum2 = Round((profitLossSum2 / TickSize()) * TickValue());

#Closed Orders dollar P / L
def dollarPLSum3 = Round((profitLossSum3 / TickSize()) * TickValue());

# Split profits or losses by long and short trades
def profitLong = CompoundValue(1, if IsNaN(profitLong[1])  or BarNumber() == 1 then 0 else if isOrder and isLong[1] then profitLong[1] + dollarProfitLoss else profitLong[1], 0);
def profitLong2 = CompoundValue(1, if IsNaN(profitLong2[1]) or BarNumber() == 1 then 0 else if isOrder2 and isLong2[1] then profitLong2[1] + dollarProfitLoss2 else profitLong2[1], 0);
def profitLong3 = CompoundValue(1, if IsNaN(profitLong3[1]) or BarNumber() == 1 then 0 else if isOrder3 and isLong3[1] then profitLong3[1] + dollarProfitLoss3 else profitLong3[1], 0);

def profitShort = CompoundValue(1, if IsNaN(profitShort[1])  or BarNumber() == 1 then 0 else if isOrder and isShort[1] then profitShort[1] + dollarProfitLoss else profitShort[1], 0);
def profitShort2 = CompoundValue(1, if IsNaN(profitShort2[1]) or BarNumber() == 1 then 0 else if isOrder2 and isShort2[1] then profitShort2[1] + dollarProfitLoss2 else profitShort2[1], 0);
def profitShort3 = CompoundValue(1, if IsNaN(profitShort3[1]) or BarNumber() == 1 then 0 else if isOrder3 and isShort3[1] then profitShort3[1] + dollarProfitLoss3 else profitShort3[1], 0);

def countLong = CompoundValue(1, if IsNaN(countLong[1])  or BarNumber() == 1 then 0 else if isOrder and isLong[1] then countLong[1] + 1 else countLong[1], 0);
def countLong2 = CompoundValue(1, if IsNaN(countLong2[1]) or BarNumber() == 1 then 0 else if isOrder2 and isLong2[1] then countLong2[1] + 1 else countLong2[1], 0);
def countLong3 = CompoundValue(1, if IsNaN(countLong3[1]) or BarNumber() == 1 then 0 else if isOrder3 and isLong3[1] then countLong3[1] + 1 else countLong3[1], 0);

def countShort = CompoundValue(1, if IsNaN(countShort[1])  or BarNumber() == 1 then 0 else if isOrder and isShort[1] then countShort[1] + 1 else countShort[1], 0);
def countShort2 = CompoundValue(1, if IsNaN(countShort2[1]) or BarNumber() == 1 then 0 else if isOrder2 and isShort2[1] then countShort2[1] + 1 else countShort2[1], 0);
def countShort3 = CompoundValue(1, if IsNaN(countShort3[1]) or BarNumber() == 1 then 0 else if isOrder3 and isShort3[1] then countShort3[1] + 1 else countShort3[1], 0); #What was the biggest winning and losing trade

# What was the biggest winning and losing trade
def biggestWin = CompoundValue(1, if IsNaN(biggestWin[1]) or BarNumber() == 1 then 0 else if isOrder and(dollarProfitLoss > 0) and(dollarProfitLoss > biggestWin[1]) then dollarProfitLoss else biggestWin[1], 0);
def biggestLoss = CompoundValue(1, if IsNaN(biggestLoss[1]) or BarNumber() == 1 then 0 else if isOrder and(dollarProfitLoss < 0) and(dollarProfitLoss < biggestLoss[1]) then dollarProfitLoss else biggestLoss[1], 0);

def biggestWin2 = CompoundValue(1, if IsNaN(biggestWin2[1]) or BarNumber() == 1 then 0 else if isOrder2 and(dollarProfitLoss2 > 0) and(dollarProfitLoss2 > biggestWin2[1]) then dollarProfitLoss2 else biggestWin2[1], 0);
def biggestLoss2 = CompoundValue(1, if IsNaN(biggestLoss2[1]) or BarNumber() == 1 then 0 else if isOrder2 and(dollarProfitLoss2 < 0) and(dollarProfitLoss2 < biggestLoss2[1]) then dollarProfitLoss2 else biggestLoss2[1], 0);

def biggestWin3 = CompoundValue(1, if IsNaN(biggestWin3[1]) or BarNumber() == 1 then 0 else if isOrder3 and(dollarProfitLoss3 > 0) and(dollarProfitLoss3 > biggestWin3[1]) then dollarProfitLoss3 else biggestWin3[1], 0);
def biggestLoss3 = CompoundValue(1, if IsNaN(biggestLoss3[1]) or BarNumber() == 1 then 0 else if isOrder3 and(dollarProfitLoss3 < 0) and(dollarProfitLoss3 < biggestLoss3[1]) then dollarProfitLoss3 else biggestLoss3[1], 0);

def ClosedTradeCount = if (isLong or isShort) then orderCount - 1 else orderCount;
def ClosedTradeCount2 = if (isLong2 or isShort2) then orderCount2 - 1 else orderCount2;
def ClosedTradeCount3 = if (isLong3 or isShort3) then orderCount3 - 1 else orderCount3;

def OpenTrades = if (isLong or isShort) then 1 else 0;
def OpenTrades2 = if (isLong2 or isShort2) then 1 else 0;
def OpenTrades3 = if (isLong3 or isShort3) then 1 else 0;

# What percent were winners
def PCTWin = if (OpenTrades and(TradePL < 0)) then Round((profitWinners / (ClosedTradeCount + 1)) * 100, 2)
else if (OpenTrades and(TradePL > 0)) then Round(((profitWinners + 1) / (ClosedTradeCount + 1)) * 100, 2)
else Round(((profitWinners) / (ClosedTradeCount)) * 100, 2);

#What percent were winners
def PCTWin2 = if (OpenTrades2 and(TradePL2 < 0)) then Round((profitWinners2 / (ClosedTradeCount2 + 1)) * 100, 2)
else if (OpenTrades2 and(TradePL2 > 0)) then Round(((profitWinners2 + 1) / (ClosedTradeCount2 + 1)) * 100, 2)
else Round(((profitWinners2) / (ClosedTradeCount2)) * 100, 2);

#What percent were winners
def PCTWin3 = if (OpenTrades3 and(TradePL3 < 0)) then Round((profitWinners3 / (ClosedTradeCount3 + 1)) * 100, 2)
else if (OpenTrades3 and(TradePL3 > 0)) then Round(((profitWinners3 + 1) / (ClosedTradeCount3 + 1)) * 100, 2)
else Round(((profitWinners3) / (ClosedTradeCount3)) * 100, 2);

# Average trade
def avgTrade = if (OpenTrades and(TradePL < 0)) then Round(((dollarPLSum - TradePL) / (ClosedTradeCount + 1)), 2)
else if (OpenTrades and(TradePL > 0)) then Round(((dollarPLSum + TradePL) / (ClosedTradeCount + 1)), 2)
else Round(((dollarPLSum) / (ClosedTradeCount)), 2);

#Average trade
def avgTrade2 = if (OpenTrades2 and(TradePL < 0)) then Round(((dollarPLSum2 - TradePL2) / (ClosedTradeCount2 + 1)), 2)
else if (OpenTrades2 and(TradePL2 > 0)) then Round(((dollarPLSum2 + TradePL2) / (ClosedTradeCount2 + 1)), 2)
else Round(((dollarPLSum2) / (ClosedTradeCount2)), 2);

#Average trade
def avgTrade3 = if (OpenTrades3 and(TradePL < 0)) then Round(((dollarPLSum3 - TradePL3) / (ClosedTradeCount3 + 1)), 2)
else if (OpenTrades3 and(TradePL3 > 0)) then Round(((dollarPLSum3 + TradePL3) / (ClosedTradeCount3 + 1)), 2)
else Round(((dollarPLSum3) / (ClosedTradeCount3)), 2);

input showtitle = no;
input trade_day = no;
input trade_day_2 = no;
input trade_day_3 = no;



AddLabel(showtitle, " TS_V9: ", Color.light_gray);
AddLabel(Market_Open_Lbl and isIntraDay, if MarketOpen then "Market Open" else "Market Closed", Color.WHITE);
AddLabel(Tick_Size_Lbl, GetSymbol() + " Tick Size: " + TickSize() + " Value: " + TickValue(), Color.WHITE);
AddLabel(Long_Short_Lbl and(LongTrades and ShortTrades), "Long+Short Trades", Color.WHITE);
AddLabel(Long_Short_Lbl and(LongTrades and!ShortTrades), "Long Trades Only", Color.WHITE);
AddLabel(Long_Short_Lbl and(!LongTrades and ShortTrades), "Short Trades Only", Color.WHITE);
AddLabel(Closed_Orders_Lbl, "Closed Orders: " + ClosedTradeCount,
if dollarPLSum > 0 then Color.GREEN else
if dollarPLSum < 0 then Color.RED else Color.GRAY);
AddLabel(if !IsNaN(orderPrice) and PL_Lbl then 1 else 0, "Closed+Open P/L: " + AsDollars(TradePL + dollarPLSum),
if ((TradePL + dollarPLSum) > 0) then Color.GREEN else
if ((TradePL + dollarPLSum) < 0) then Color.RED else Color.GRAY);
AddLabel(Avg_Per_Lbl, "Avg per Trade: " + AsDollars(avgTrade),
if avgTrade > 0 then Color.GREEN else
if avgTrade < 0 then Color.RED else Color.GRAY);

AddLabel(Max_Lbl, "MaxUp: " + AsDollars(biggestWin) + " MaxDown: " + AsDollars(biggestLoss), Color.WHITE);
AddLabel(Profit_Lbl, "Long Profit: " + AsDollars(profitLong),
if profitLong > 0 then Color.GREEN else
if profitLong < 0 then Color.RED else Color.GRAY);
AddLabel(Profit_Lbl, "Short Profit: " + AsDollars(profitShort),
if profitShort > 0 then Color.GREEN else
if profitShort < 0 then Color.RED else Color.GRAY);
AddLabel(if !IsNaN(CurrentPosition) and Open_Trades_Lbl and OpenTrades then 1 else 0, "Open: " +
    (if isLong then "Bought" else "Sold") + " @ " + orderPrice, Color.WHITE);
AddLabel(if !IsNaN(orderPrice) and Open_Trades_Lbl and OpenTrades then 1 else 0, "Open Trade P/L: " + AsDollars(TradePL),
if (TradePL > 0) then Color.GREEN else
if (TradePL < 0) then Color.RED else Color.GRAY);
AddLabel(Profit_Pct_Lbl, "Profit Percentile: " + aspercent(TradePL / BiggestWin),
if (TradePL > 0) then Color.GREEN else
if (TradePL < 0) then Color.RED else Color.GRAY);
#########################################################################################################################
AddLabel(showLabels, (if tradeDaytimeOnly then  " Trade Daytime | " else "") + "WINS: " + PCTWin + "%",
if PCTWin > 50 then Color.GREEN else
if PCTWin > 40 then Color.YELLOW else Color.GRAY);
################################################

#############################################################################
AddLabel(Market_Open_Lbl2 and isIntraDay2, if MarketOpen2 then "Market Open" else "Market Closed", Color.WHITE);
AddLabel(Tick_Size_Lbl2, GetSymbol() + " Tick Size: " + TickSize() + " Value: " + TickValue(), Color.WHITE);
AddLabel(Long_Short_Lbl2 and(LongTrades2 and ShortTrades2), "Long+Short Trades", Color.WHITE);
AddLabel(Long_Short_Lbl2 and(LongTrades2 and!ShortTrades2), "Long Trades Only", Color.WHITE);
AddLabel(Long_Short_Lbl2 and(!LongTrades2 and ShortTrades2), "Short Trades Only", Color.WHITE);
AddLabel(Closed_Orders_Lbl2, "CO: " + ClosedTradeCount2,
if dollarPLSum2 > 0 then Color.GREEN else
if dollarPLSum2 < 0 then Color.RED else Color.GRAY);
AddLabel(if !IsNaN(orderPrice2) and PL_Lbl2 then 1 else 0, "Closed+Open P/L: " + AsDollars(TradePL2 + dollarPLSum2),
if ((TradePL2 + dollarPLSum2) > 0) then Color.GREEN else
if ((TradePL2 + dollarPLSum2) < 0) then Color.RED else Color.GRAY);
AddLabel(Avg_Per_Lbl2, "Avg per Trade: " + AsDollars(avgTrade2),
if avgTrade2 > 0 then Color.GREEN else
if avgTrade2 < 0 then Color.RED else Color.GRAY);

AddLabel(Max_Lbl2, "MaxUp: " + AsDollars(biggestWin2) + " MaxDown: " + AsDollars(biggestLoss2), Color.WHITE);
AddLabel(Profit_Lbl2, "Long Profit: " + AsDollars(profitLong2),
if profitLong2 > 0 then Color.GREEN else
if profitLong2 < 0 then Color.RED else Color.GRAY);
AddLabel(Profit_Lbl2, "Short Profit: " + AsDollars(profitShort2),
if profitShort2 > 0 then Color.GREEN else
if profitShort2 < 0 then Color.RED else Color.GRAY);
AddLabel(if !IsNaN(CurrentPosition2) and Open_Trades_Lbl2 and OpenTrades2 then 1 else 0, "Open: " +
    (if isLong2 then "Bought" else "Sold") + " @ " + orderPrice2, Color.WHITE);
AddLabel(if !IsNaN(orderPrice2) and Open_Trades_Lbl2 and OpenTrades2 then 1 else 0, "Open Trade P/L: " + AsDollars(TradePL2),
if (TradePL2 > 0) then Color.GREEN else
if (TradePL2 < 0) then Color.RED else Color.GRAY);
AddLabel(Profit_Pct_Lbl2, "Profit Percentile: " + aspercent(TradePL2 / BiggestWin2),
if (TradePL2 > 0) then Color.GREEN else
if (TradePL2 < 0) then Color.RED else Color.GRAY);

def ag2_Label_min =if (agperiod2 == aggregationPeriod.MIN) then 1 else 0;
def ag2_Label_two_min =if (agperiod2 == aggregationPeriod.TWO_MIN) then 1 else 0;
def ag2_Label_three_min =if (agperiod2 == aggregationPeriod.THREE_MIN) then 1 else 0;
def ag2_Label_Five_min =if (agperiod2 == aggregationPeriod.FIVE_MIN) then 1 else 0;
def ag2_Label_Ten_min =if (agperiod2 == aggregationPeriod.TEN_MIN) then 1 else 0;
def ag2_Label_fifteen_min =if (agperiod2 == aggregationPeriod.FIFTEEN_MIN) then 1 else 0;
def ag2_Label_thirty_min =if (agperiod2 == aggregationPeriod.THIRTY_MIN) then 1 else 0;
def ag2_Label_Hour =if (agperiod2 == aggregationPeriod.HOUR) then 1 else 0;
def ag2_Label_two_Hour =if (agperiod2 == aggregationPeriod.TWO_HOURS) then 1 else 0;
def ag2_Label_Four_Hour =if (agperiod2 == aggregationPeriod.FOUR_HOURS) then 1 else 0;
def ag2_Label_Day =if (agperiod2 == aggregationPeriod.Day) then 1 else 0;
def ag2_Label_week =if (agperiod2 == aggregationPeriod.week) then 1 else 0;
def ag2_Label_month =if (agperiod2 == aggregationPeriod.month) then 1 else 0;

AddLabel(showLabels2,if ag2_Label_min         and trade_day_2 then "1 min | DT | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_min         then "1 min | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_two_min     and trade_day_2 then "2 min | DT | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_two_min     then "2 min | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_three_min   and trade_day_2 then "3 min | DT | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_three_min   then "3 min | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_five_min    and trade_day_2 then "5 min | DT | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_five_min    then "5 min | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_ten_min     and trade_day_2 then "10 min | DT | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_ten_min     then "10 min | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_fifteen_min and trade_day_2 then "15 min | DT | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_fifteen_min then "15 min | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_thirty_min  and trade_day_2 then "30 min | DT | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_thirty_min  then "30 min | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_Hour        and trade_day_2 then "1 hour | DT | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_Hour        then "1 hour | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_two_Hour    and trade_day_2 then "2 hour | DT | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_two_Hour    then "2 hour | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_four_Hour   and trade_day_2 then "4 hour | DT | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_four_Hour   then "4 hour | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_day         and trade_day_2 then "Day | DT | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_day         then "Day | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_week        and trade_day_2 then "Week | DT | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_week        then "Week | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_month       and trade_day_2 then "Month | DT | WINS AG2: " + PCTWin2 + "%" else
if ag2_Label_month       then "Month | WINS AG2: " + PCTWin2 + "%" else "",
                     if PCTWin2 > 50 then Color.GREEN else if PCTWin2 > 40 then Color.YELLOW else Color.GRAY);

AddLabel(ag_Skip_lbl,if AutoAgg == no then "Manual AG2" else
if AutoAgg == yes and ag_skip == yes then "Auto AG2 | AG Skip" else
if AutoAgg == yes and ag_skip == no then "Auto AG2" else "", Color.Gray);

AddLabel(Market_Open_Lbl3 and isIntraDay3, if MarketOpen3 then "Market Open" else "Market Closed", Color.WHITE);
AddLabel(Tick_Size_Lbl3, GetSymbol() + " Tick Size: " + TickSize() + " Value: " + TickValue(), Color.WHITE);
AddLabel(Long_Short_Lbl3 and(LongTrades3 and ShortTrades3), "Long+Short Trades", Color.WHITE);
AddLabel(Long_Short_Lbl3 and(LongTrades3 and!ShortTrades3), "Long Trades Only", Color.WHITE);
AddLabel(Long_Short_Lbl3 and(!LongTrades3 and ShortTrades3), "Short Trades Only", Color.WHITE);
AddLabel(Closed_Orders_Lbl3, "CO: " + ClosedTradeCount3,
if dollarPLSum3 > 0 then Color.GREEN else
if dollarPLSum3 < 0 then Color.RED else Color.GRAY);
AddLabel(if !IsNaN(orderPrice3) and PL_Lbl3 then 1 else 0, "Closed+Open P/L: " + AsDollars(TradePL3 + dollarPLSum3),
if ((TradePL3 + dollarPLSum3) > 0) then Color.GREEN else
if ((TradePL3 + dollarPLSum3) < 0) then Color.RED else Color.GRAY);
AddLabel(Avg_Per_Lbl3, "Avg per Trade: " + AsDollars(avgTrade3),
if avgTrade3 > 0 then Color.GREEN else
if avgTrade3 < 0 then Color.RED else Color.GRAY);

AddLabel(Max_Lbl3, "MaxUp: " + AsDollars(biggestWin3) + " MaxDown: " + AsDollars(biggestLoss3), Color.WHITE);
AddLabel(Profit_Lbl3, "Long Profit: " + AsDollars(profitLong3),
if profitLong3 > 0 then Color.GREEN else
if profitLong3 < 0 then Color.RED else Color.GRAY);
AddLabel(Profit_Lbl3, "Short Profit: " + AsDollars(profitShort3),
if profitShort3 > 0 then Color.GREEN else
if profitShort3 < 0 then Color.RED else Color.GRAY);
AddLabel(if !IsNaN(CurrentPosition3) and Open_Trades_Lbl3 and OpenTrades3 then 1 else 0, "Open: " +
    (if isLong3 then "Bought" else "Sold") + " @ " + orderPrice3, Color.WHITE);
AddLabel(if !IsNaN(orderPrice3) and Open_Trades_Lbl3 and OpenTrades3 then 1 else 0, "Open Trade P/L: " + AsDollars(TradePL3),
if (TradePL3 > 0) then Color.GREEN else
if (TradePL3 < 0) then Color.RED else Color.GRAY);
AddLabel(Profit_Pct_Lbl3, "Profit Percentile: " + aspercent(TradePL3 / BiggestWin3),
if (TradePL3 > 0) then Color.GREEN else
if (TradePL3 < 0) then Color.RED else Color.GRAY);;

def ag3_Label_min =if (agperiod3 == aggregationPeriod.MIN) then 1 else 0;
def ag3_Label_two_min =if (agperiod3 == aggregationPeriod.TWO_MIN) then 1 else 0;
def ag3_Label_three_min =if (agperiod3 == aggregationPeriod.THREE_MIN) then 1 else 0;
def ag3_Label_Five_min =if (agperiod3 == aggregationPeriod.FIVE_MIN) then 1 else 0;
def ag3_Label_Ten_min =if (agperiod3 == aggregationPeriod.TEN_MIN) then 1 else 0;
def ag3_Label_fifteen_min =if (agperiod3 == aggregationPeriod.FIFTEEN_MIN) then 1 else 0;
def ag3_Label_thirty_min =if (agperiod3 == aggregationPeriod.THIRTY_MIN) then 1 else 0;
def ag3_Label_Hour =if (agperiod3 == aggregationPeriod.HOUR) then 1 else 0;
def ag3_Label_two_Hour =if (agperiod3 == aggregationPeriod.TWO_HOURS) then 1 else 0;
def ag3_Label_Four_Hour =if (agperiod3 == aggregationPeriod.FOUR_HOURS) then 1 else 0;
def ag3_Label_Day =if (agperiod3 == aggregationPeriod.Day) then 1 else 0;
def ag3_Label_week =if (agperiod3 == aggregationPeriod.week) then 1 else 0;
def ag3_Label_month =if (agperiod3 == aggregationPeriod.month) then 1 else 0;

AddLabel(showLabels3,if ag3_Label_min         and trade_day_3 then "1 min | DT | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_min         then "1 min | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_two_min     and trade_day_3 then "2 min | DT | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_two_min     then "2 min | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_three_min   and trade_day_3 then "3 min | DT | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_three_min   then "3 min | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_five_min    and trade_day_3 then "5 min | DT | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_five_min    then "5 min | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_ten_min     and trade_day_3 then "10 min | DT | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_ten_min     then "10 min | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_fifteen_min and trade_day_3 then "15 min | DT | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_fifteen_min then "15 min | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_thirty_min  and trade_day_3 then "30 min | DT | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_thirty_min  then "30 min | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_Hour        and trade_day_3 then "1 hour | DT | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_Hour        then "1 hour | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_two_Hour    and trade_day_3 then "2 hour | DT | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_two_Hour    then "2 hour | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_four_Hour   and trade_day_3 then "4 hour | DT | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_four_Hour   then "4 hour | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_day         and trade_day_3 then "Day | DT | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_day         then "Day | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_week        and trade_day_3 then "Week | DT | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_week        then "Week | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_month       and trade_day_3 then "Month | DT | WINS AG3: " + PCTWin3 + "%" else
if ag3_Label_month       then "Month | DT | WINS AG3: " + PCTWin3 + "%" else "",
                     if PCTWin3 > 50 then Color.GREEN else if PCTWin3 > 40 then Color.YELLOW else Color.GRAY);





AddLabel(ag_Skip_lbl,if AutoAgg2 == no then "Manual AG3" else
if AutoAgg2 == yes and ag_skip2 == yes then "Auto AG3 | AG Skip" else
if AutoAgg2 == yes and ag_skip2 == no then "Auto AG3" else "", Color.Gray);

addlabel(show_Last_lbl, if (buybn > sellbn) then "Last Signal: " + "BUY" else if (sellbn > buybn) then "Last Signal: " + "SELL" else "",if (buybn > sellbn) then color.cyan else if (sellbn > buybn) then Color.magenta else color.gray);