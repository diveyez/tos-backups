#TS_V9 Watchlist Column - HODL - 4/25/23 
#TS Strategy_V9 Created by Christopher84 08/10/2021
#Modified 05/23/2022 to include Chart Bubbles and Labels.
#Modified 05/25/2022 to include Targets and Stoplosses.
#Modified 05/26/2022 to include Line Labels by Dcstocks
#Modified 05/27/2022 to include target 7.

input trailType = {default modified, unmodified};
input ATRPeriod = 11;
input ATRFactor = 2.2;
input firstTrade = {default long, short};
input averageType = AverageType.SIMPLE;
input price = close;
input coloredCandlesOn = yes;
input LabelsOn = yes;

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

def state = {default init, long, short};
def trail;
switch (state[1]) {
case init:
    if (!IsNaN(loss)) {
        switch (firstTrade) {
        case long:
            state = state.long;
            trail =  close - loss;
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
        trail =  close - loss;
    }
}
#def isnan = double.nan;
def bn = barnumber();
def TrailingStop = trail;
def LongEnter = (price crosses above TrailingStop) within 3 bars;
def LongEnterbn = if longenter then bn else longenterbn[1];

def LongExit = (price crosses below TrailingStop)within 3 bars;
def LongExitbn = if LongExit then bn else LongExitbn[1];

def Hold_signal = if LongEnterbn > LongExitbn then 1 else 0;
#plot value = if LongEnter then 1 else if LongExit then 0 else double.nan;


AssignbackgroundColor( if longenter then color.Dark_Green 
else if !longenter and (Hold_signal == 1) then Color.green 
else if longexit then Color.Dark_Red 
else if !longexit and (Hold_signal == 0) then Color.Red 
else color.dark_Gray);
AddLabel(yes, if (longenter) then "TS_1H"
else if !longenter and (Hold_signal == 1) then "Last: BUY"
else if (longexit) then "TS_1H"
else if !longexit and (Hold_signal == 0) then "Last: SELL"
else "  ", if longenter then color.white
else if !longenter and (Hold_signal == 1) then Color.black
else if longexit then Color.white
else if !longexit and (Hold_signal == 0) then Color.black
else color.dark_Gray);


#AddLabel(yes, if (price crosses above TrailingStop) then "Long"
#else if (price crosses below TrailingStop) then "Short"
##else "NO BREAK", if conditionBD then Color.RED 
##else if conditionBO then Color.GREEN 
#else "  ");


#AssignvalueColor(if coloredCandlesOn and ((price > TrailingStop)) then Color.GREEN else if coloredCandlesOn and ((price < TrailingStop)) then Color.RED else Color.GRAY);


#def upsignal = (price crosses above TrailingStop);

#def downsignal = (price crosses below TrailingStop);



###------------------------------------------------------------------------------------------
# Profit and Loss Labels
#
# Fill in the 0>0 in the Create Signals section below to match your buy and sell signal conditions
#
# When using large amounts of hisorical data, P/L may take time to calculate