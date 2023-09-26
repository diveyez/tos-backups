#
# $SPX Fear & Greed Mean Reversion Study(FGMR)
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
    input lower = -2;
    input averageType = AverageType.SIMPLE;
    input displace = 0;
    input length = 20;

    def upperBand = BollingerBands(price, displace, length, lower, upper, averageType).UpperBand;
    def lowerBand = BollingerBands(price, displace, length, lower, upper, averageType).LowerBand;

    plot BBPercent = (price - lowerBand) / (upperBand - lowerBand) * 100;
}

declare lower;

input averageType = AverageType.Simple;
input price = close;
input displace = 0;
input length = 20;
input StdDev_DnBuy = -2.0;
input StdDev_UpBuy = 2.0;
input StdDev_DnSell = -1.0;
input StdDev_UpSell = 1.0;

plot PercentBBuy = GetBollingerBandPercent(price, StdDev_UpBuy, StdDev_DnBuy);
plot PercentBSell = GetBollingerBandPercent(price, StdDev_UpSell, StdDev_DnSell);

plot ZeroLine = 0;
plot HalfLine = 50;
plot UnitLine = 100;

def vixPrice = close("VIX");
def vixPercentBBuy = GetBollingerBandPercent(vixPrice, StdDev_UpBuy, StdDev_DnBuy);
def vixPercentBSell = GetBollingerBandPercent(vixPrice, StdDev_UpSell, StdDev_DnSell);



def opacity = 25;
def linewidth = 1;

PercentBBuy.SetDefaultColor(Color.GREEN);#(GetColor(3));
PercentBBuy.AssignValueColor(CreateColor(
    0,
    255, #255 - Max(0, Min(100 - opacity, PercentBBuy)) * 2.55,
    0));
PercentBBuy.SetPaintingStrategy(PaintingStrategy.LINE);
PercentBBuy.SetLineWeight(linewidth);

PercentBSell.SetDefaultColor(Color.RED);#(GetColor(7));
PercentBSell.AssignValueColor(CreateColor(
    255, #Max(opacity, Min(100, PercentBSell)) * 2.55,
    0,
    0));
PercentBSell.SetPaintingStrategy(PaintingStrategy.LINE);
PercentBSell.SetLineWeight(linewidth);

ZeroLine.SetDefaultColor(Color.GREEN);
HalfLine.SetDefaultColor(GetColor(8));
UnitLine.SetDefaultColor(Color.RED);

# LONG
AddVerticalLine(
    Crosses(PercentBBuy, ZeroLine, CrossingDirection.ABOVE),
    "+++ Go Long +++", Color.GREEN, curve.SHORT_DASH
);

AddVerticalLine(
    Crosses(PercentBSell, UnitLine, CrossingDirection.ABOVE),
    "+++ Cover Long +++", Color.RED, curve.SHORT_DASH
);

# SHORT
AddVerticalLine(
    Crosses(PercentBBuy, UnitLine, CrossingDirection.BELOW),
    "--- (Go Short) ---", Color.YELLOW, curve.SHORT_DASH
);

AddVerticalLine(
    Crosses(PercentBSell, ZeroLine, CrossingDirection.BELOW),
    "--- (Cover Short) ---", Color.MAGENTA, curve.SHORT_DASH
);


#AddVerticalLine(
#  GetDayofWeek(GetYYYYMMDD()) == 5,
#  "Friday", Color.LIGHT_GRAY, curve.MEDIUM_DASH
#);

AddLabel(yes, GetSymbol(), COLOR.CYAN);
AddLabel(yes, "Long=Green cross > 0, Cover=Red cross > 100", COLOR.GREEN);
AddLabel(yes, "Short=Red cross < 100, Cover=Green cross < 0", COLOR.RED);