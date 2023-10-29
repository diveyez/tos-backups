# Shimi's Scalp Pro Elite Platinum Extreme; Deluxe Edition.
# Based on Quant Trade Edge's Strategy in https://www.youtube.com/watch?v=lhW5czmfc14
# Original Strategy is for NQ 1 minute chart, long only above 10ema and short only below 10ema, risking 1 ATR for .5 ATR target.

# Start EMA
input price = close;
input length = 10;
input displace = 0;

def ema = expAverage(price[-displace], length);
def ema20 = expAverage(price, length = 20);
def ema50 = expAverage(price, length = 50);

def bull = close > open and low < low[1] and high < high[1] and close > ema and ema > ema20 and ema20 > ema50;
def bear = close < open and low > low[1] and high > high[1] and close < ema and ema < ema20 and ema20 < ema50;

def upsignal = bull;
def downsignal = bear;
#UpSignal.SetDefaultColor(Color.UPTICK);
#UpSignal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
#DownSignal.SetDefaultColor(Color.DOWNTICK);
#DownSignal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);

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

#----- ATR Trail----
    input trailType = { default modified, unmodified };
input ATRPeriod = 5;
input ATRFactor = 3.5;
input firstTrade = { default long, short };
input averageType = { default WILDERS, SIMPLE, EXPONENTIAL, HULL, WEIGHTED };

def ATRStop = ATRTrailingStop(trailType, ATRPeriod, ATRFactor, firstTrade, averageType);

#---------------------


    def Begin = secondsfromTime(OpenTime);
def End = secondsTillTime(closetime);
# Only use market hours when using intraday timeframe
def isIntraDay = if getaggregationperiod() > 14400000 or getaggregationperiod() == 0 then 0 else 1;
def MarketOpen = if !tradeDaytimeOnly or!isIntraDay then 1 else if tradeDaytimeOnly and isIntraDay and Begin > 0 and End > 0 then 1 else 0;
###------------------------------------------------------------------------------------------


######################################################
##  Create Signals -
##  FILL IN THIS SECTION
##      replace 0 > 0 with your conditions for signals
######################################################

def PLBuySignal = if  MarketOpen AND(upsignal) AND(ATRStop < close) then 1 else 0; # insert condition to create long position in place of the 0 > 0
def PLSellSignal =  if MarketOpen AND(downsignal) AND(ATRStop > close) then 1 else 0; # insert condition to create short position in place of the 0 > 0

def PLBuyStop = if !useStops then 0 else if (ATRStop > close) then 1 else 0; # insert condition to stop in place of the 0 < 0
def PLSellStop = if !useStops then 0 else if (ATRStop < close) then 1 else 0; # insert condition to stop in place of the 0 > 0

def PLMktStop = if MarketOpen[-1] == 0 then 1 else 0; # If tradeDaytimeOnly is set, then stop at end of day


#######################################
##  Maintain the position of trades
#######################################

def CurrentPosition;  # holds whether flat = 0 long = 1 short = -1

if (BarNumber() == 1) OR isNaN(CurrentPosition[1]) {
    CurrentPosition = 0;
}else {
    if CurrentPosition[1] == 0 {            # FLAT
        if (PLBuySignal AND LongTrades) {
            CurrentPosition = 1;
        } else if (PLSellSignal AND ShortTrades) {
            CurrentPosition = -1;
        } else {
            CurrentPosition = CurrentPosition[1];
        }
    } else if CurrentPosition[1] == 1 {      # LONG
        if (PLSellSignal AND ShortTrades) {
            CurrentPosition = -1;
        } else if ((PLBuyStop and useStops) or PLMktStop or(PLSellSignal AND ShortTrades == 0)) {
            CurrentPosition = 0;
        } else {
            CurrentPosition = CurrentPosition[1];
        }
    } else if CurrentPosition[1] == -1 {     # SHORT
        if (PLBuySignal AND LongTrades) {
            CurrentPosition = 1;
        } else if ((PLSellStop and useStops) or PLMktStop or(PlBuySignal and LongTrades == 0)) {
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
Plot BuySig = if (((isShort[1] and LongTrades) or(isFlat[1] and LongTrades)) and PLBuySignal and showSignals) then 1 else 0;
BuySig.AssignValueColor(color.cyan);
BuySig.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BuySig.SetLineWeight(5);

Alert(BuySig and useAlerts, "Buy Signal", Alert.bar, sound.Ding);
Alert(BuySig and useAlerts, "Buy Signal", Alert.bar, sound.Ding);

# If not already short and get a PLSellSignal
Plot SellSig = if (((isLong[1] and ShortTrades) or(isFlat[1] and ShortTrades)) and PLSellSignal and showSignals) then 1 else 0;
SellSig.AssignValueColor(color.cyan);
SellSig.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
SellSig.SetLineWeight(5);

Alert(SellSig and useAlerts, "Sell Signal", Alert.bar, sound.Ding);
Alert(SellSig and useAlerts, "Sell Signal", Alert.bar, sound.Ding);

# If long and get a PLBuyStop
Plot BuyStpSig = if (PLBuyStop and isLong[1] and showSignals and useStops) or(isLong[1] and PLMktStop) or(isLong[1] and PLSellSignal and!ShortTrades) then 1 else 0;
BuyStpSig.AssignValueColor(color.light_gray);
BuyStpSig.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
BuyStpSig.SetLineWeight(3);

Alert(BuyStpSig and useAlerts, "Buy Stop Signal", Alert.bar, sound.Ding);
Alert(BuyStpSig and useAlerts, "Buy Stop Signal", Alert.bar, sound.Ding);


# If short and get a PLSellStop
Plot SellStpSig = if (PLSellStop and isShort[1] and showSignals and useStops) or(isShort[1] and PLMktStop) or(isShort[1] and PLBuySignal and!LongTrades) then 1 else 0;
SellStpSig.AssignValueColor(color.light_gray);
SellStpSig.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
SellStpSig.SetLineWeight(3);

Alert(SellStpSig and useAlerts, "Sell Stop Signal", Alert.bar, sound.Ding);
Alert(SellStpSig and useAlerts, "Sell Stop Signal", Alert.bar, sound.Ding);


#######################################
##  Orders
#######################################

def isOrder = if ((isFlat[1] and(BuySig and LongTrades) or(SellSig and ShortTrades)) or(isLong[1] and BuyStpSig or(SellSig and ShortTrades)) or(isShort[1] and SellStpSig or(BuySig and LongTrades))) then 1 else 0;
# If there is an order, then the price is the next days close
def orderPrice = if (isOrder and((BuySig and LongTrades) or(SellSig and ShortTrades))) then close else orderPrice[1];

def orderCount = compoundValue(1,if isNan(isOrder) or barnumber() == 1 then 0 else if (BuySig or SellSig) then orderCount[1] + 1 else orderCount[1], 0);


#######################################
##  Price and Profit
#######################################

def profitLoss;


if (!isOrder or orderPRice[1] == 0) {
    profitLoss = 0;
} else if ((isOrder and isLong[1]) and(SellSig or BuyStpSig)) {
    profitLoss = close - orderPrice[1];
} else if ((isOrder and isShort[1]) and(BuySig or SellStpSig)) {
    profitLoss = orderPrice[1] - close;
} else {
    profitLoss = 0;
}


# Total Profit or Loss
def profitLossSum = compoundValue(1, if isNaN(isOrder)  or barnumber() == 1 then 0 else if isOrder then profitLossSum[1] + profitLoss else profitLossSum[1], 0);

# How many trades won or lost
def profitWinners = compoundValue(1, if isNaN(profitWinners[1]) or barnumber() == 1 then 0 else if isOrder and profitLoss > 0 then profitWinners[1] + 1 else profitWinners[1], 0);
def profitLosers = compoundValue(1, if isNaN(profitLosers[1])  or barnumber() == 1 then 0 else if isOrder and profitLoss < 0 then profitLosers[1] + 1 else profitLosers[1], 0);
def profitPush = compoundValue(1, if isNaN(profitPush[1])  or barnumber() == 1 then 0 else if isOrder and profitLoss == 0 then profitPush[1] + 1 else profitPush[1], 0);

# Current Open Trade Profit or Loss
def TradePL = If isLong then Round(((close - orderprice) / TickSize()) * TickValue()) else if isShort then Round(((orderPrice - close) / TickSize()) * TickValue()) else 0;

# Convert to actual dollars based on Tick Value for bubbles
def dollarProfitLoss = if orderPRice[1] == 0 or isNaN(orderPrice[1]) then 0 else round((profitLoss / Ticksize()) * Tickvalue());

# Closed Orders dollar P / L
def dollarPLSum = round((profitLossSum / Ticksize()) * Tickvalue());


# Split profits or losses by long and short trades
def profitLong = compoundValue(1, if isNan(profitLong[1])  or barnumber() == 1 then 0 else if isOrder and isLong[1] then profitLong[1] + dollarProfitLoss else profitLong[1], 0);
def profitShort = compoundValue(1, if isNan(profitShort[1])  or barnumber() == 1 then 0 else if isOrder and isShort[1] then profitShort[1] + dollarProfitLoss else profitShort[1], 0);
def countLong = compoundValue(1, if isNaN(countLong[1])  or barnumber() == 1 then 0 else if isOrder and isLong[1] then countLong[1] + 1 else countLong[1], 0);
def countShort = compoundValue(1, if isNaN(countShort[1])  or barnumber() == 1 then 0 else if isOrder and isShort[1] then countShort[1] + 1 else countShort[1], 0);

# What was the biggest winning and losing trade
def biggestWin = compoundValue(1, if isNaN(biggestWin[1]) or barnumber() == 1 then 0 else if isOrder and(dollarProfitLoss > 0) and(dollarProfitLoss > biggestWin[1]) then dollarProfitLoss else biggestWin[1], 0);
def biggestLoss = compoundValue(1, if isNaN(biggestLoss[1]) or barnumber() == 1 then 0 else if isOrder and(dollarProfitLoss < 0) and(dollarProfitLoss < biggestLoss[1]) then dollarProfitLoss else biggestLoss[1], 0);

def ClosedTradeCount = if (isLong or isShort) then orderCount - 1 else orderCount;
def OpenTrades = if (isLong or isShort) then 1 else 0;


# What percent were winners
def PCTWin = if (OpenTrades and(TradePL < 0)) then round((profitWinners / (ClosedTradeCount + 1)) * 100, 2)
else if (OpenTrades and(TradePL > 0)) then round(((profitWinners + 1) / (ClosedTradeCount + 1)) * 100, 2) else round(((profitWinners) / (ClosedTradeCount)) * 100, 2);

# Average trade
def avgTrade = if (OpenTrades and(TradePL < 0)) then round(((dollarPLSum - TradePL) / (ClosedTradeCount + 1)), 2)
else if (OpenTrades and(TradePL > 0)) then round(((dollarPLSum + TradePL) / (ClosedTradeCount + 1)), 2) else round(((dollarPLSum) / (ClosedTradeCount)), 2);


#######################################
##  Create Labels
#######################################


AddLabel(showLabels and isIntraDay, if MarketOpen then "Market Open" else "Market Closed", color.white);
AddLabel(showLabels, GetSymbol() + " Tick Size: " + TickSize() + " Value: " + TickValue(), color.white);
AddLabel(showLabels and(LongTrades and ShortTrades), "Long+Short Trades", color.white);
AddLabel(showLabels and(LongTrades and!ShortTrades), "Long Trades Only", color.white);
AddLabel(showLabels and(!LongTrades and ShortTrades), "Short Trades Only", color.white);
AddLabel(showLabels and(tradeDaytimeOnly), "Daytime Only", color.white);
AddLabel(showLabels, "Closed Orders: " + ClosedTradeCount + " P/L: " + AsDollars(dollarPLSum), if dollarPLSum > 0 then Color.GREEN else if dollarPLSum < 0 then Color.RED else Color.GRAY);
AddLabel(if !IsNan(orderPrice) and showLabels then 1 else 0, "Closed+Open P/L: " + AsDollars(TradePL + dollarPLSum), if ((TradePL + dollarPLSum) > 0) then color.green else if ((TradePL + dollarPLSum) < 0) then color.red else color.gray);

AddLabel(showLabels, "Avg per Trade: " + AsDollars(avgTrade), if avgTrade > 0 then Color.Green else if avgTrade < 0 then Color.RED else Color.GRAY);
AddLabel(showLabels, "Winners: " + PCTWin + "%",if PCTWin > 50 then color.green else if PCTWin > 40 then color.yellow else color.gray);

AddLabel(showLabels, "MaxUp: " + AsDollars(biggestWin) + " MaxDown: " + AsDollars(biggestLoss), color.white);
AddLabel(showLabels, "Long Profit: " + AsDollars(profitLong), if profitLong > 0 then color.green else if profitLong < 0 then color.red else color.gray);
AddLabel(showLabels, "Short Profit: " + AsDollars(profitShort), if profitShort > 0 then color.green else if profitShort < 0 then color.red else color.gray);
AddLabel(if !IsNan(CurrentPosition) and showLabels and OpenTrades then 1 else 0, "Open: " + (If isLong then "Bought" else "Sold") + " @ " + orderPrice, color.white);
AddLabel(if !IsNan(orderPrice) and showLabels and OpenTrades then 1 else 0, "Open Trade P/L: " + AsDollars(TradePL), if (TradePL > 0) then color.green else if (TradePl < 0) then color.red else color.gray);



#######################################
##  Chart Bubbles for Profit / Loss
#######################################


AddChartBubble(showSignals and showBubbles and isOrder and isLong[1], low, "$" + dollarProfitLoss, if dollarProfitLoss == 0 then Color.LIGHT_GRAY else if dollarProfitLoss > 0 then Color.GREEN else color.Red, 0);
AddChartBubble(showSignals and showBubbles and isOrder and isShort[1], high, "$" + dollarProfitLoss, if dollarProfitLoss == 0 then Color.LIGHT_GRAY else if dollarProfitLoss > 0 then Color.GREEN else color.Red, 1);
