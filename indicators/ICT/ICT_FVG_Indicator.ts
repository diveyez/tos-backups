# FVG  Fair Value Gaps Bearish & Bullish Levels
# @TradeForOpp  5 / 6 / 2022
#Mod by Sam4COK @Samer800 08 / 2022

input ShowLines = yes;
input ShowCloud = yes;
input ChartTime = no;
input threshold = 0.01;
input aggregation = AggregationPeriod.FIFTEEN_MIN;

def na = Double.NaN;
script nz {
    input data = 1;
    input repl = 0;
    def ret_val = if IsNaN(data) then repl else data;
    plot return = ret_val;
}
#//IMBALANCE
#//Data
def L1; def H3; Def H1; Def L3;
if ChartTime then {
    L1 = low;
    H3 = high[2];
    H1 = high;
    L3 = low[2];
} else {

    L1 = low(period = aggregation);
    H3 = high(period = aggregation)[2];
    H1 = high(period = aggregation);
    L3 = low(period = aggregation)[2];
}

def fvgBullPctg = if AbsValue((H3 - L1) / H3) > threshold / 100 then 1 else 0;
def FVGUp = if H3 < L1 then 1 else 0;
def plotFVGU = if FVGUp and fvgBullPctg then H3 else na;
def plotFVGUL = if FVGUp and fvgBullPctg then L1 else na;
def plotFVGU2 = plotFVGU[-1];
def plotFVGUL2 = plotFVGUL[-1];
def midFVGUp = (plotFVGU2 + plotFVGUL2) / 2;

def fvgBearPctg = if AbsValue((H1 - L3) / L3) > threshold / 100 then 1 else 0;
def FVGDown = if L3 > H1 then 1 else 0;
def plotFVGD = if FVGDown and fvgBearPctg then L3 else na;
def plotFVGH = if FVGDown and fvgBearPctg then H1 else na;
def plotFVGD2 = plotFVGD[-1];
def plotFVGH2 = plotFVGH[-1];
def midFVGDown = (plotFVGD2 + plotFVGH2) / 2;

#--------------------------------------------------------------
    def LastTF = CompoundValue(1, if isNaN(plotFVGU2) then LastTF[1] else plotFVGU2, plotFVGU2);
def LastBF = CompoundValue(1, if isNan(plotFVGUL2) then LastBF[1] else plotFVGUL2, plotFVGUL2);
def LastMidUP = CompoundValue(1, if isNan(midFVGUp) then LastMidUP[1] else midFVGUp, midFVGUp);
#--------------------------------------------------------------

    plot HLine = LastTF;
plot LLine = LastBF;
plot MLine = LastMidUP;
HLine.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
HLine.SetDefaultColor(CreateColor(49, 121, 245));
HLine.SetHiding(!ShowLines);
LLine.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
LLine.SetDefaultColor(CreateColor(49, 121, 245));
LLine.SetHiding(!ShowLines);
MLine.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
MLine.SetDefaultColor(CreateColor(144, 191, 249));

AddCloud(if ShowCloud and(LLine == LLine[1] or LLine == LLine[-1]) then LLine else na, HLine, CreateColor(144, 191, 249));

#--------------------------------------------------------------
    def LastTFL = CompoundValue(1, if isNaN(plotFVGD2) then LastTFL[1] else plotFVGD2, plotFVGD2);
def LastBFL = CompoundValue(1, if isNan(plotFVGH2) then LastBFL[1] else plotFVGH2, plotFVGH2);
def LastMidDN = CompoundValue(1, if isNan(midFVGDown) then LastMidDN[1] else midFVGDown, midFVGDown);
#--------------------------------------------------------------

    plot HLineL = LastTFL;
plot LLineL = LastBFL;
plot MLineL = LastMidDN;
HLineL.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
HLineL.SetDefaultColor(CreateColor(194, 24, 91));
HLineL.SetHiding(!ShowLines);
LLineL.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
LLineL.SetDefaultColor(CreateColor(194, 24, 91));
LLineL.SetHiding(!ShowLines);
MLineL.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
MLineL.SetDefaultColor(CreateColor(244, 143, 177));

AddCloud(if ShowCloud and(HLineL == HLineL[1] or HLineL == HLineL[-1]) then HLineL else na, LLineL, CreateColor(244, 143, 177));
##########################