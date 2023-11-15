#
# Fear & Greed Mean Reversion Study(FGMR_ADVANCED_Study)
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

declare lower;

input sym = "VIX";
def price = close(sym);
input averageType = AverageType.SIMPLE;
input displace = 0;
input length = 20;
input signalType = { default BOTH, LONG, SHORT };
input BO = { PB25, default PB20, PB15, PB12, PB10 };
input SC = { PB25, default PB20, PB15, PB12, PB10 };
input SO = { PB25, default PB20, PB15, PB12, PB10 };
input BC = { PB25, default PB20, PB15, PB12, PB10 };
input BaseLine = 0;
input HalfLine = 50;
input UnitLine = 100;

plot PB25 = GetBollingerBandPercent(price, 2.5, -2.5);
plot PB20 = GetBollingerBandPercent(price, 2.0, -2.0);
plot PB15 = GetBollingerBandPercent(price, 1.5, -1.5);
plot PB12 = GetBollingerBandPercent(price, 1.2, -1.2);
plot PB10 = GetBollingerBandPercent(price, 1.0, -1.0);
PB25.SetPaintingStrategy(PaintingStrategy.LINE_VS_SQUARES);
PB20.SetPaintingStrategy(PaintingStrategy.LINE_VS_SQUARES);
PB15.SetPaintingStrategy(PaintingStrategy.LINE_VS_SQUARES);
PB12.SetPaintingStrategy(PaintingStrategy.LINE_VS_SQUARES);
PB10.SetPaintingStrategy(PaintingStrategy.LINE_VS_SQUARES);
PB25.HideBubble();
PB20.HideBubble();
PB15.HideBubble();
PB12.HideBubble();
PB10.HideBubble();

plot pZeroLine = BaseLine;
plot pHalfLine = HalfLine;
plot pUnitLine = UnitLine;
pZeroLine.SetDefaultColor(Color.GREEN);
pHalfLine.SetDefaultColor(GetColor(8));
pUnitLine.SetDefaultColor(Color.RED);

def BO_PB = if BO == BO.PB10 then PB10
            else if BO == BO.PB12 then PB12
            else if BO == BO.PB15 then PB15
            else if BO == BO.PB25 then PB25
            else PB20;
def SC_PB = if SC == SC.PB10 then PB10
            else if SC == SC.PB12 then PB12
            else if SC == SC.PB15 then PB15
            else if SC == SC.PB25 then PB25
            else PB20;
def SO_PB = if SO == SO.PB10 then PB10
            else if SO == SO.PB12 then PB12
            else if SO == SO.PB15 then PB15
            else if SO == SO.PB25 then PB25
            else PB20;
def BC_PB = if BC == BC.PB10 then PB10
            else if BC == BC.PB12 then PB12
            else if BC == BC.PB15 then PB15
            else if BC == BC.PB25 then PB25
            else PB20;
# LONG-----------------
    AddVerticalLine(
        Crosses(BO_PB, BaseLine, CrossingDirection.ABOVE) and signalType != signalType.SHORT,
        "+++ OS - Buy To Open +++", Color.GREEN, curve.SHORT_DASH
    );

AddVerticalLine(
    Crosses(SC_PB, UnitLine, CrossingDirection.ABOVE) and signalType != signalType.SHORT,
    "+++ OB - Sell To Close +++", Color.RED, curve.SHORT_DASH
);

# SHORT-----------------
    AddVerticalLine(
        Crosses(SO_PB, UnitLine, CrossingDirection.BELOW) and signalType != signalType.LONG,
        "--- (OB - Sell to Open) ---", Color.YELLOW, curve.SHORT_DASH
    );

AddVerticalLine(
    Crosses(BC_PB, BaseLine, CrossingDirection.BELOW) and signalType != signalType.LONG,
    "--- (OS - Buy To Close) ---", Color.MAGENTA, curve.SHORT_DASH
);

AddLabel(yes, sym, COLOR.CYAN);
AddLabel(yes, signalType, COLOR.YELLOW);
PB25.SetdefaultColor(GetColor(4));
PB20.SetdefaultColor(GetColor(0));
PB15.SetdefaultColor(GetColor(1));
PB12.SetdefaultColor(GetColor(2));
PB10.SetdefaultColor(GetColor(3));
AddLabel(yes, "%BB25: " + PB25, GetColor(4));
AddLabel(yes, "%BB20: " + PB20, GetColor(0));
AddLabel(yes, "%BB15: " + PB15, GetColor(1));
AddLabel(yes, "%BB12: " + PB12, GetColor(2));
AddLabel(yes, "%BB10: " + PB10, GetColor(3));
