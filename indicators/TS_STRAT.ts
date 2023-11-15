#TS Strategy_V9 Created by Christopher84 08 / 10 / 2021
#Modified 05 / 23 / 2022 to include Chart Bubbles and Labels.
    #Modified 05 / 25 / 2022 to include Targets and Stoplosses.
        #Modified 05 / 26 / 2022 to include Line Labels by Dcstocks
#Modified 05 / 27 / 2022 to include target 7.

input trailType = { default modified, unmodified };
input ATRPeriod = 5;
input ATRFactor = 3.0;
input firstTrade = { default long, short };
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
def LongEnter = (price crosses above TrailingStop);
def LongExit = (price crosses below TrailingStop);

AddOrder(OrderType.BUY_AUTO, condition = LongEnter, price = open[-1], 1, tickcolor = GetColor(1), arrowcolor = Color.LIME);
AddOrder(OrderType.SELL_AUTO, condition = LongExit, price = open[-1], 1, tickcolor = GetColor(2), arrowcolor = Color.LIME);

#AssignPriceColor(if coloredCandlesOn and((price > TrailingStop)) then Color.GREEN else if coloredCandlesOn and((price < TrailingStop)) then Color.RED else Color.GRAY);
Alert(price crosses above TrailingStop, "long", Alert.BAR, Sound.Ding);
Alert(price crosses below TrailingStop, "short", Alert.BAR, Sound.Ding);

def upsignal = (price crosses above TrailingStop);
;
def downsignal = (price crosses below TrailingStop);

###------------------------------------------------------------------------------------------
# Profit and Loss Labels
#
# Fill in the 0 > 0 in the Create Signals section below to match your buy and sell signal conditions
#
# When using large amounts of hisorical data, P / L may take time to calculate
###------------------------------------------------------------------------------------------

    input showSignals = yes; #hint showSignals: show buy and sell arrows
input LongTrades = yes; #hint LongTrades: perform long trades
input ShortTrades = yes; #hint ShortTrades: perform short trades
input showLabels = yes; #hint showLabels: show PL labels at top
input showBubbles = yes; #hint showBubbles: show PL bubbles at close of trade
input useStops = no; #hint useStops: use stop orders
input useAlerts = no; #hint useAlerts: use alerts on signals
input tradeDaytimeOnly = no; #hint tradeDaytimeOnly: (IntraDay Only) Only perform trades during hours stated
input OpenTime = 0930; #hint OpenTime: Opening time of market
input CloseTime = 1600; #hint CloseTime: Closing time of market


def Begin = SecondsFromTime(OpenTime);
def End = SecondsTillTime(CloseTime);
# Only use market hours when using intraday timeframe
def isIntraDay = if GetAggregationPeriod() > 14400000 or GetAggregationPeriod() == 0 then 0 else 1;
def MarketOpen = if !tradeDaytimeOnly or!isIntraDay then 1 else if tradeDaytimeOnly and isIntraDay and Begin > 0 and End > 0 then 1 else 0;
###------------------------------------------------------------------------------------------

######################################################
##  Create Signals -
##  FILL IN THIS SECTION
##      replace 0 > 0 with your conditions for signals
######################################################

def PLBuySignal = if  MarketOpen and(upsignal) then 1 else 0; # insert condition to create long position in place of the 0 > 0
def PLSellSignal =  if MarketOpen and(downsignal) then 1 else 0; # insert condition to create short position in place of the 0 > 0

def PLBuyStop = if !useStops then 0 else if (0 > 0) then 1 else 0; # insert condition to stop in place of the 0 < 0
def PLSellStop = if !useStops then 0 else if (0 > 0) then 1 else 0; # insert condition to stop in place of the 0 > 0

def PLMktStop = if MarketOpen[-1] == 0 then 1 else 0; # If tradeDaytimeOnly is set, then stop at end of day


#######################################
##  Maintain the position of trades
#######################################

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


def isLong = if CurrentPosition == 1 then 1 else 0;
def isShort = if CurrentPosition == -1 then 1 else 0;
def isFlat = if CurrentPosition == 0 then 1 else 0;

# If not already long and get a PLBuySignal
#Plot BuySig = if (!isLong[1] and PLBuySignal and showSignals and LongTrades) then 1 else 0;
plot BuySig = if (((isShort[1] and LongTrades) or(isFlat[1] and LongTrades)) and PLBuySignal and showSignals) then 1 else 0;
BuySig.AssignValueColor(Color.CYAN);
BuySig.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BuySig.SetLineWeight(5);

Alert(BuySig and useAlerts, "Buy Signal", Alert.BAR, Sound.Ding);
Alert(BuySig and useAlerts, "Buy Signal", Alert.BAR, Sound.Ding);

# If not already short and get a PLSellSignal
plot SellSig = if (((isLong[1] and ShortTrades) or(isFlat[1] and ShortTrades)) and PLSellSignal and showSignals) then 1 else 0;
SellSig.AssignValueColor(Color.CYAN);
SellSig.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
SellSig.SetLineWeight(5);

Alert(SellSig and useAlerts, "Sell Signal", Alert.BAR, Sound.Ding);
Alert(SellSig and useAlerts, "Sell Signal", Alert.BAR, Sound.Ding);

# If long and get a PLBuyStop
plot BuyStpSig = if (PLBuyStop and isLong[1] and showSignals and useStops) or(isLong[1] and PLMktStop) or(isLong[1] and PLSellSignal and!ShortTrades) then 1 else 0;
BuyStpSig.AssignValueColor(Color.LIGHT_GRAY);
BuyStpSig.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
BuyStpSig.SetLineWeight(3);

Alert(BuyStpSig and useAlerts, "Buy Stop Signal", Alert.BAR, Sound.Ding);
Alert(BuyStpSig and useAlerts, "Buy Stop Signal", Alert.BAR, Sound.Ding);


# If short and get a PLSellStop
plot SellStpSig = if (PLSellStop and isShort[1] and showSignals and useStops) or(isShort[1] and PLMktStop) or(isShort[1] and PLBuySignal and!LongTrades) then 1 else 0;
SellStpSig.AssignValueColor(Color.LIGHT_GRAY);
SellStpSig.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
SellStpSig.SetLineWeight(3);

Alert(SellStpSig and useAlerts, "Sell Stop Signal", Alert.BAR, Sound.Ding);
Alert(SellStpSig and useAlerts, "Sell Stop Signal", Alert.BAR, Sound.Ding);


#######################################
##  Orders
#######################################

def isOrder = if ((isFlat[1] and(BuySig and LongTrades) or(SellSig and ShortTrades)) or(isLong[1] and BuyStpSig or(SellSig and ShortTrades)) or(isShort[1] and SellStpSig or(BuySig and LongTrades))) then 1 else 0;
# If there is an order, then the price is the next days close
def orderPrice = if (isOrder and((BuySig and LongTrades) or(SellSig and ShortTrades))) then close else orderPrice[1];

def orderCount = CompoundValue(1, if IsNaN(isOrder) or BarNumber() == 1 then 0 else if (BuySig or SellSig) then orderCount[1] + 1 else orderCount[1], 0);


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


# Total Profit or Loss
def profitLossSum = CompoundValue(1, if IsNaN(isOrder)  or BarNumber() == 1 then 0 else if isOrder then profitLossSum[1] + profitLoss else profitLossSum[1], 0);

# How many trades won or lost
def profitWinners = CompoundValue(1, if IsNaN(profitWinners[1]) or BarNumber() == 1 then 0 else if isOrder and profitLoss > 0 then profitWinners[1] + 1 else profitWinners[1], 0);
def profitLosers = CompoundValue(1, if IsNaN(profitLosers[1])  or BarNumber() == 1 then 0 else if isOrder and profitLoss < 0 then profitLosers[1] + 1 else profitLosers[1], 0);
def profitPush = CompoundValue(1, if IsNaN(profitPush[1])  or BarNumber() == 1 then 0 else if isOrder and profitLoss == 0 then profitPush[1] + 1 else profitPush[1], 0);

# Current Open Trade Profit or Loss
def TradePL = if isLong then Round(((close - orderPrice) / TickSize()) * TickValue()) else if isShort then Round(((orderPrice - close) / TickSize()) * TickValue()) else 0;

# Convert to actual dollars based on Tick Value for bubbles
def dollarProfitLoss = if orderPrice[1] == 0 or IsNaN(orderPrice[1]) then 0 else Round((profitLoss / TickSize()) * TickValue());

# Closed Orders dollar P / L
def dollarPLSum = Round((profitLossSum / TickSize()) * TickValue());


# Split profits or losses by long and short trades
def profitLong = CompoundValue(1, if IsNaN(profitLong[1])  or BarNumber() == 1 then 0 else if isOrder and isLong[1] then profitLong[1] + dollarProfitLoss else profitLong[1], 0);
def profitShort = CompoundValue(1, if IsNaN(profitShort[1])  or BarNumber() == 1 then 0 else if isOrder and isShort[1] then profitShort[1] + dollarProfitLoss else profitShort[1], 0);
def countLong = CompoundValue(1, if IsNaN(countLong[1])  or BarNumber() == 1 then 0 else if isOrder and isLong[1] then countLong[1] + 1 else countLong[1], 0);
def countShort = CompoundValue(1, if IsNaN(countShort[1])  or BarNumber() == 1 then 0 else if isOrder and isShort[1] then countShort[1] + 1 else countShort[1], 0);

# What was the biggest winning and losing trade
def biggestWin = CompoundValue(1, if IsNaN(biggestWin[1]) or BarNumber() == 1 then 0 else if isOrder and(dollarProfitLoss > 0) and(dollarProfitLoss > biggestWin[1]) then dollarProfitLoss else biggestWin[1], 0);
def biggestLoss = CompoundValue(1, if IsNaN(biggestLoss[1]) or BarNumber() == 1 then 0 else if isOrder and(dollarProfitLoss < 0) and(dollarProfitLoss < biggestLoss[1]) then dollarProfitLoss else biggestLoss[1], 0);

def ClosedTradeCount = if (isLong or isShort) then orderCount - 1 else orderCount;
def OpenTrades = if (isLong or isShort) then 1 else 0;


# What percent were winners
def PCTWin = if (OpenTrades and(TradePL < 0)) then Round((profitWinners / (ClosedTradeCount + 1)) * 100, 2)
else if (OpenTrades and(TradePL > 0)) then Round(((profitWinners + 1) / (ClosedTradeCount + 1)) * 100, 2) else Round(((profitWinners) / (ClosedTradeCount)) * 100, 2);

# Average trade
def avgTrade = if (OpenTrades and(TradePL < 0)) then Round(((dollarPLSum - TradePL) / (ClosedTradeCount + 1)), 2)
else if (OpenTrades and(TradePL > 0)) then Round(((dollarPLSum + TradePL) / (ClosedTradeCount + 1)), 2) else Round(((dollarPLSum) / (ClosedTradeCount)), 2);


#######################################
##  Create Labels
#######################################


AddLabel(showLabels and isIntraDay, if MarketOpen then "Market Open" else "Market Closed", Color.WHITE);
AddLabel(showLabels, GetSymbol() + " Tick Size: " + TickSize() + " Value: " + TickValue(), Color.WHITE);
AddLabel(showLabels and(LongTrades and ShortTrades), "Long+Short Trades", Color.WHITE);
AddLabel(showLabels and(LongTrades and!ShortTrades), "Long Trades Only", Color.WHITE);
AddLabel(showLabels and(!LongTrades and ShortTrades), "Short Trades Only", Color.WHITE);
AddLabel(showLabels, "Closed Orders: " + ClosedTradeCount + " P/L: " + AsDollars(dollarPLSum), if dollarPLSum > 0 then Color.GREEN else if dollarPLSum < 0 then Color.RED else Color.GRAY);
AddLabel(if !IsNaN(orderPrice) and showLabels then 1 else 0, "Closed+Open P/L: " + AsDollars(TradePL + dollarPLSum), if ((TradePL + dollarPLSum) > 0) then Color.GREEN else if ((TradePL + dollarPLSum) < 0) then Color.RED else Color.GRAY);

AddLabel(showLabels, "Avg per Trade: " + AsDollars(avgTrade), if avgTrade > 0 then Color.GREEN else if avgTrade < 0 then Color.RED else Color.GRAY);
AddLabel(showLabels, "Winners: " + PCTWin + "%", if PCTWin > 50 then Color.GREEN else if PCTWin > 40 then Color.YELLOW else Color.GRAY);

AddLabel(showLabels, "MaxUp: " + AsDollars(biggestWin) + " MaxDown: " + AsDollars(biggestLoss), Color.WHITE);
AddLabel(showLabels, "Long Profit: " + AsDollars(profitLong), if profitLong > 0 then Color.GREEN else if profitLong < 0 then Color.RED else Color.GRAY);
AddLabel(showLabels, "Short Profit: " + AsDollars(profitShort), if profitShort > 0 then Color.GREEN else if profitShort < 0 then Color.RED else Color.GRAY);
AddLabel(if !IsNaN(CurrentPosition) and showLabels and OpenTrades then 1 else 0, "Open: " + (if isLong then "Bought" else "Sold") + " @ " + orderPrice, Color.WHITE);
AddLabel(if !IsNaN(orderPrice) and showLabels and OpenTrades then 1 else 0, "Open Trade P/L: " + AsDollars(TradePL), if (TradePL > 0) then Color.GREEN else if (TradePL < 0) then Color.RED else Color.GRAY);
AddLabel(showLabels, "Profit Percentile: " + aspercent(TradePL / BiggestWin), if (TradePL > 0) then Color.GREEN else if (TradePL < 0) then Color.RED else Color.GRAY);;
#######################################
##  Chart Bubbles for Profit / Loss
#######################################
AddChartBubble(showSignals and showBubbles and isOrder and isLong[1], low, "$" + dollarProfitLoss, if dollarProfitLoss == 0 then Color.LIGHT_GRAY else if dollarProfitLoss > 0 then Color.GREEN else Color.RED, 0);
AddChartBubble(showSignals and showBubbles and isOrder and isShort[1], high, "$" + dollarProfitLoss, if dollarProfitLoss == 0 then Color.LIGHT_GRAY else if dollarProfitLoss > 0 then Color.GREEN else Color.RED, 1);

#######################################
#Assign Price Color
#######################################
def Ceiling = biggestWin;
def Floor = biggestLoss;
def MidCAT = (((biggestWin + avgTrade) / 2) + avgTrade) / 2;
def MidFAT = (((biggestLoss + avgTrade) / 2) + avgTrade) / 2;
def AvgProfitWinners = (((profitWinners) / (ClosedTradeCount + 1)));
input mult = 50;

########################################
##Long Stop
########################################
def LongStop = if (BuySig) then low else Double.NaN;
def LongStopext = if (IsNaN(LongStop) and isLong) then LongStopext[1] else LongStop;
plot LongStopextline = LongStopext;
LongStopextline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
LongStopextline.SetDefaultColor(Color.ORANGE);
LongStopextline.SetLineWeight(2);

########################################
##Long Targets
########################################
plot LongEntry = if isLong then(orderPrice) else Double.NaN;
LongEntry.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
LongEntry.SetDefaultColor(Color.GREEN);
LongEntry.SetLineWeight(2);

plot AvgProfitLL = if isLong then(orderPrice + ((dollarPLSum) / (ClosedTradeCount) / mult)) else Double.NaN;
AvgProfitLL.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
AvgProfitLL.SetDefaultColor(Color.WHITE);
AvgProfitLL.SetLineWeight(1);

def LT1 = if isLong then(((biggestWin * .13) / mult) + orderPrice) else Double.NaN;
def LT1ext = if (IsNaN(LT1) and isLong) then LT1ext[1] else LT1;
plot LT1extline = LT1ext;
LT1extline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
LT1extline.SetDefaultColor(Color.GRAY);
LT1extline.SetLineWeight(1);

def LT2 = if isLong then(((biggestWin * .236) / mult) + orderPrice) else Double.NaN;
def LT2ext = if (IsNaN(LT2) and isLong) then LT2ext[1] else LT2;
plot LT2extline = LT2ext;
LT2extline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
LT2extline.SetDefaultColor(Color.GRAY);
LT2extline.SetLineWeight(1);

def LT3 = if isLong then(((biggestWin * .382) / mult) + orderPrice) else Double.NaN;
def LT3ext = if (IsNaN(LT3) and isLong) then LT3ext[1] else LT3;
plot LT3extline = LT3ext;
LT3extline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
LT3extline.SetDefaultColor(Color.GRAY);
LT3extline.SetLineWeight(1);

def LT4 = if isLong then(((biggestWin * .5) / mult) + orderPrice) else Double.NaN;
def LT4ext = if (IsNaN(LT4) and isLong) then LT4ext[1] else LT4;
plot LT4extline = LT4ext;
LT4extline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
LT4extline.SetDefaultColor(Color.GRAY);
LT4extline.SetLineWeight(1);

def LT5 = if isLong then(((biggestWin * .618) / mult) + orderPrice) else Double.NaN;
def LT5ext = if (IsNaN(LT5) and isLong) then LT5ext[1] else LT5;
plot LT5extline = LT5ext;
LT5extline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
LT5extline.SetDefaultColor(Color.GRAY);
LT5extline.SetLineWeight(1);

def LT6 = if isLong then(((biggestWin * .7495) / mult) + orderPrice) else Double.NaN;
def LT6ext = if (IsNaN(LT6) and isLong) then LT6ext[1] else LT6;
plot LT6extline = LT6ext;
LT6extline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
LT6extline.SetDefaultColor(Color.GRAY);
LT6extline.SetLineWeight(1);

def LT7 = if isLong then(((biggestWin * .893) / mult) + orderPrice) else Double.NaN;
def LT7ext = if (IsNaN(LT7) and isLong) then LT7ext[1] else LT7;
plot LT7extline = LT7ext;
LT7extline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
LT7extline.SetDefaultColor(Color.GRAY);
LT7extline.SetLineWeight(1);
#########################################
##Short Stop
#########################################
def ShortStop = if SellSig then high else Double.NaN;
def ShortStopext = if (IsNaN(ShortStop) and isShort) then ShortStopext[1] else ShortStop;
plot ShortStopextline = ShortStopext;
ShortStopextline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
ShortStopextline.SetDefaultColor(Color.ORANGE);
ShortStopextline.SetLineWeight(2);

########################################
##Short Targets
########################################
plot ShortEntry = if isShort then(orderPrice) else Double.NaN;
;
ShortEntry.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
ShortEntry.SetDefaultColor(Color.RED);
ShortEntry.SetLineWeight(2);

plot AvgProfitLS = if isShort then(orderPrice - ((dollarPLSum) / (ClosedTradeCount) / mult)) else Double.NaN;
AvgProfitLS.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
AvgProfitLS.SetDefaultColor(Color.WHITE);
AvgProfitLS.SetLineWeight(1);

def ST1 = if isShort then(orderPrice - (biggestWin * .13) / mult) else Double.NaN;
def ST1ext = if (IsNaN(ST1) and isShort) then ST1ext[1] else ST1;
plot ST1extline = ST1ext;
ST1extline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
ST1extline.SetDefaultColor(Color.GRAY);
ST1extline.SetLineWeight(1);

def ST2 = if isShort then(orderPrice - (biggestWin * .236) / mult) else Double.NaN;
def ST2ext = if (IsNaN(ST2) and isShort) then ST2ext[1] else ST2;
plot ST2extline = ST2ext;
ST2extline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
ST2extline.SetDefaultColor(Color.GRAY);
ST2extline.SetLineWeight(1);

def ST3 = if isShort then(orderPrice - (biggestWin * .382) / mult) else Double.NaN;
def ST3ext = if (IsNaN(ST3) and isShort) then ST3ext[1] else ST3;
plot ST3extline = ST3ext;
ST3extline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
ST3extline.SetDefaultColor(Color.GRAY);
ST3extline.SetLineWeight(1);

def ST4 = if isShort then(orderPrice - (biggestWin * .5) / mult) else Double.NaN;
def ST4ext = if (IsNaN(ST4) and isShort) then ST4ext[1] else ST4;
plot ST4extline = ST4ext;
ST4extline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
ST4extline.SetDefaultColor(Color.GRAY);
ST4extline.SetLineWeight(1);

def ST5 = if isShort then(orderPrice - (biggestWin * .618) / mult) else Double.NaN;
def ST5ext = if (IsNaN(ST5) and isShort) then ST5ext[1] else ST5;
plot ST5extline = ST5ext;
ST5extline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
ST5extline.SetDefaultColor(Color.GRAY);
ST5extline.SetLineWeight(1);

def ST6 = if isShort then(orderPrice - (biggestWin * .7495) / mult) else Double.NaN;
def ST6ext = if (IsNaN(ST6) and isShort) then ST6ext[1] else ST6;
plot ST6extline = ST6ext;
ST6extline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
ST6extline.SetDefaultColor(Color.GRAY);
ST6extline.SetLineWeight(1);

def ST7 = if isShort then(orderPrice - (biggestWin * .893) / mult) else Double.NaN;
def ST7ext = if (IsNaN(ST7) and isShort) then ST7ext[1] else ST7;
plot ST7extline = ST7ext;
ST7extline.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
ST7extline.SetDefaultColor(Color.GRAY);
ST7extline.SetLineWeight(1);
###################################
##Candle Color
###################################
AssignPriceColor(if coloredCandlesOn and(TradePL > (biggestWin * .75)) then Color.YELLOW else if ((price > TrailingStop)) then Color.GREEN else if coloredCandlesOn and((price < TrailingStop)) then Color.RED else Color.GRAY);

###################################
##Line Bubbles
###################################
AddChartBubble(LabelsOn and BuySig, AvgProfitLL, "Average Profit: $" + avgTrade, Color.LiGHT_GREEN);
AddChartBubble(LabelsOn and BuySig, LT1, "T1: $" + (biggestwin * .13), Color.LIGHT_GREEN);
AddChartBubble(LabelsOn and BuySig, LT2, "T2: $" + (biggestwin * .236), Color.LIGHT_GREEN);
AddChartBubble(LabelsOn and BuySig, LT3, "T3: $" + (biggestwin * .382), Color.LIGHT_GREEN);
AddChartBubble(LabelsOn and BuySig, LT4, "T4: $" + (biggestwin * .5), Color.LIGHT_GREEN);
AddChartBubble(LabelsOn and BuySig, LT5, "T5: $" + (biggestwin * .618), Color.LIGHT_GREEN);
AddChartBubble(LabelsOn and BuySig, LT6, "T6: $" + (biggestwin * .7495), Color.LIGHT_GREEN);
AddChartBubble(LabelsOn and BuySig, LT7, "T7: $" + (biggestwin * .893), Color.LIGHT_GREEN);
AddChartBubble(LabelsOn and BuySig, LongStop, "StopLoss: $ -" + (Orderprice - LongStop) * MULT, Color.ORANGE);

AddChartBubble(LabelsOn and SellSig, AvgprofitLS, "Average Profit: $" + AVGTrade, Color.Red);
AddChartBubble(LabelsOn and SellSig, ST1, "T1: $" + (biggestwin * .13), Color.Red);
AddChartBubble(LabelsOn and SellSig, ST2, "T2: $" + (biggestwin * .236), Color.Red);
AddChartBubble(LabelsOn and SellSig, ST3, "T3: $" + (biggestwin * .382), Color.Red);
AddChartBubble(LabelsOn and SellSig, ST4, "T4: $" + (biggestwin * .5), Color.Red);
AddChartBubble(LabelsOn and SellSig, ST5, "T5: $" + (biggestwin * .618), Color.Red);
AddChartBubble(LabelsOn and SellSig, ST6, "T6: $" + (biggestwin * .7495), Color.Red);
AddChartBubble(LabelsOn and SellSig, ST7, "T7: $" + (biggestwin * .893), Color.Red);
AddChartBubble(LabelsOn and SellSig, ShortStop, "StopLoss: $ -" + (ShortStop - Orderprice) * MULT, Color.ORANGE);