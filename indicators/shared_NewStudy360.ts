input longEntries = yes;
input shortEntries = no;
input entryMA = { default EMA8, EMA21, EMA34, SMA50, SMA200 };
input entryType = { default pullbackOnly, Confirmation };
input targetMultiplier = 2;
input stopMultiplier = 1;
input quantity = 100;

def EMA8 = ExpAverage(close, 8);
def EMA21 = ExpAverage(close, 21);
def EMA34 = ExpAverage(close, 34);
def SMA50 = SimpleMovingAvg(close, 50);
def SMA200 = SimpleMovingAvg(close, 200);

def entryPullbackMA;
switch (entryMA) {
    case EMA8:
        entryPullbackMA = EMA8;
    case EMA21:
        entryPullbackMA = EMA21;
    case EMA34:
        entryPullbackMA = EMA34;
    case SMA50:
        entryPullbackMA = SMA50;
    case SMA200:
        entryPullbackMA = SMA200;
}

def bullishStackedMAs = EMA8 > EMA21 and EMA21 > EMA34 and EMA34 > SMA50 and SMA50 > SMA200;

def bearishStackedMAs = EMA8 < EMA21 and EMA21 < EMA34 and EMA34 < SMA50 and SMA50 < SMA200;


def bullEntrySignal;
def bullEntryPrice;
def bearEntrySignal;
def bearEntryPrice;

switch (entryType) {
    case pullbackOnly:
        bullEntrySignal = bullishStackedMAs and low <= entryPullbackMA;
        bullEntryPrice = entryPullbackMA;
        bearEntrySignal = bearishStackedMAs and high >= entryPullbackMA;
        bearEntryPrice = entryPullbackMA;
    case Confirmation:
        bullEntrySignal = bullishStackedMAs and Lowest(low, 2) <= entryPullbackMA and close > high[1];
        bullEntryPrice = close;
        bearEntrySignal = bearishStackedMAs and Highest(high, 2) >= entryPullbackMA and close < low[1];
        bearEntryPrice = close;
}

def ATRvalue = if (bullEntrySignal and!bullEntrySignal[1]) or(bearEntrySignal and!bearEntrySignal[1]) then ATR(14) else ATRvalue[1];


#Long - Side Trades
AddOrder(OrderType.BUY_TO_OPEN, longEntries and bullEntrySignal, bullEntryPrice, quantity, name = "buy");
AddOrder(OrderType.SELL_TO_CLOSE, high >= entryPrice() + targetMultiplier * ATRValue, entryPrice() + targetMultiplier * ATRValue, quantity, name = "buy");
AddOrder(OrderType.SELL_TO_CLOSE, low <= entryPrice() - stopMultiplier * ATRValue, entryPrice() - stopMultiplier * ATRValue, quantity, name = "buy");

#Short - Side Trades
AddOrder(OrderType.SELL_TO_OPEN, shortEntries and bearEntrySignal, bearEntryPrice, quantity, name = "sell");
AddOrder(OrderType.BUY_TO_CLOSE, low <= entryPrice() - targetMultiplier * ATRValue, entryPrice() - targetMultiplier * ATRValue, quantity, name = "sell");
AddOrder(OrderType.BUY_TO_CLOSE, high >= entryPrice() + stopMultiplier * ATRValue, entryPrice() + stopMultiplier * ATRValue, quantity, name = "sell");

#End Code
