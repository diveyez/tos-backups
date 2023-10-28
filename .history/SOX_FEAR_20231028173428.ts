
# $SOX Fear & Greed Mean Reversion Study(SOX_FGMR)
#
# This script adapted from posts from @kerberos007
# https://twitter.com/kerberos007
# 
# Want the latest version of this script ?
# https://github.com/korygill/technical-analysis
#
# Use on thinkorswim and thinkscript
# author @korygill
#

script GetBollingerBandPercent
{
    input price = close;
    input upper = 2;
    input lower = 2;
    input averageType = AverageType.SIMPLE;
    input displace = 0;
    input length = 20;

    def upperBand = BollingerBands(price, displace, length, lower, upper, averageType).UpperBand;
    def lowerBand = BollingerBands(price, displace, length, lower, upper, averageType).LowerBand;

    plot BBPercent = (price - lowerBand) / (upperBand - lowerBand) * 100;
}

input StdDev_DnBuy = -2.5;
input StdDev_UpBuy = 2.5;
input StdDev_DnSell = -1;
input StdDev_UpSell = 1;
input BuyCross = 5;
input SellCross = 95;
input LongShortBoth = { Long, Short, default Both };
input length = 20;
def price = close;
def averageType = AverageType.SIMPLE;
def displace = 0;

def PercentBBuy = GetBollingerBandPercent(price, StdDev_UpBuy, StdDev_DnBuy, length = length);

def PercentBSell = GetBollingerBandPercent(price, StdDev_UpSell, StdDev_DnSell, length = length);

def ZeroLine = 0;
def HalfLine = 50;
def UnitLine = 100;

def lsb;
switch (LongShortBoth) {
    case Long:
        lsb = 0;
    case Short:
        lsb = 1;
    default:
        lsb = 2;
}

# LONG
AddOrder(OrderType.BUY_TO_OPEN, Crosses(PercentBBuy, BuyCross, CrossingDirection.ABOVE) and lsb != 1, tickcolor = Color.WHITE, arrowcolor = Color.GREEN, name = "XOS");

AddOrder(OrderType.SELL_TO_CLOSE, Crosses(PercentBSell, SellCross, CrossingDirection.ABOVE) and lsb != 1, tickcolor = Color.WHITE, arrowcolor = Color.RED, name = "XOS");

# SHORT
AddOrder(OrderType.SELL_TO_OPEN, Crosses(PercentBBuy, UnitLine, CrossingDirection.BELOW) and lsb != 0, tickcolor = Color.WHITE, arrowcolor = Color.YELLOW, name = "XOS");

AddOrder(OrderType.BUY_TO_CLOSE, Crosses(PercentBSell, ZeroLine, CrossingDirection.BELOW) and lsb != 0, tickcolor = Color.WHITE, arrowcolor = Color.MAGENTA, name = "XOS");

AddLabel(yes, "[SOX:FGMR](1d)", Color.GRAY);
AddLabel(yes, "Go Long", Color.GREEN);
AddLabel(yes, "Cover Long", Color.RED);
AddLabel(yes, "Go Short", Color.YELLOW);
AddLabel(yes, "Cover Short", Color.MAGENTA);