# FVG Fair Value Gaps Bearish & Bullish Levels
# @TradeForOpp 5 / 6 / 2022
# Mod by Sam4COK @Samer800 08 / 2022
# V 1.1 - Color FVG bar, option to enable / disable line extention + Show Today only option

input ShowHLLines = yes;
input ExtendLines = yes;
input ColorFVGBar = yes;
input ShowCloud = yes;
input CurrentChartTime = no;
input ShowTodayOnly = yes;
input thresholdPctg = 0.01;
input aggregation = AggregationPeriod.FIFTEEN_MIN;

def na = Double.NaN;
script nz {
input data = 1;
input repl = 0;
def ret_val = if IsNaN(data) then repl else data;
plot return = ret_val;
}

def today = if ShowTodayOnly == 0 or getday() == getlastday() then 1 else 0;
#//IMBALANCE
#//Data
def L1; def H3; Def H1; Def L3;
if CurrentChartTime then {
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
def fvgUpPctg = if AbsValue((H3 - L1) / H3) > thresholdPctg / 100 then 1 else 0;
def FVGUp = if H3 < L1 then 1 else 0;
def plotFVGUH = if FVGUp and fvgUpPctg then H3 else na;
def plotFVGUL = if FVGUp and fvgUpPctg then L1 else na;
def plotFVGUH2 = plotFVGUH[-1];
def plotFVGUL2 = plotFVGUL[-1];
def midFVGUp = (plotFVGUH2 + plotFVGUL2) / 2;

def fvgDnPctg = if AbsValue((H1 - L3) / L3) > thresholdPctg / 100 then 1 else 0;
def FVGDown = if L3 > H1 then 1 else 0;
def plotFVGDL = if FVGDown and fvgDnPctg then L3 else na;
def plotFVGDH = if FVGDown and fvgDnPctg then H1 else na;
def plotFVGDL2 = plotFVGDL[-1];
def plotFVGDH2 = plotFVGDH[-1];
def midFVGDown = (plotFVGDL2 + plotFVGDH2) / 2;

#--------------------------------------------------------------
    def LastFVGUH = CompoundValue(1, if isNaN(plotFVGUH2) then LastFVGUH[1] else plotFVGUH2, H3);
def LastFVGUL = CompoundValue(1, if isNan(plotFVGUL2) then LastFVGUL[1] else plotFVGUL2, L1);
def LastMidUP = CompoundValue(1, if isNan(midFVGUp) then LastMidUP[1] else midFVGUp, midFVGUp);
#--------------------------------------------------------------
    plot HLine = if today then if ExtendLines then LastFVGUH else plotFVGUH2 else na;
plot LLine = if today then if ExtendLines then LastFVGUL else plotFVGUL2 else na;
plot MLine = if today then if ExtendLines then LastMidUP else midFVGUp else na;
HLine.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
HLine.SetDefaultColor(CreateColor(49, 121, 245));
HLine.SetHiding(!ShowHLLines);
LLine.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
LLine.SetDefaultColor(CreateColor(49, 121, 245));
LLine.SetHiding(!ShowHLLines);
MLine.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
MLine.SetDefaultColor(CreateColor(144, 191, 249));

AddCloud(if ShowCloud and LLine == LLine[1] or LLine == LLine[-1] then LLine else na, HLine, CreateColor(144, 191, 249));
AssignPriceColor( if ColorFVGBar and LLine <> LLine[1] then Color.BLUE else Color.CURRENT);

#--------------------------------------------------------------
    def LastFVGDL = CompoundValue(1, if isNaN(plotFVGDL2) then LastFVGDL[1] else plotFVGDL2, L3);
def LastFVGDH = CompoundValue(1, if isNan(plotFVGDH2) then LastFVGDH[1] else plotFVGDH2, H1);
def LastMidDN = CompoundValue(1, if isNan(midFVGDown) then LastMidDN[1] else midFVGDown, midFVGDown);
#--------------------------------------------------------------
    plot HLineL = if today then if ExtendLines then LastFVGDL else plotFVGDL2 else na;
plot LLineL = if today then if ExtendLines then LastFVGDH else plotFVGDH2 else na;
plot MLineL = if today then if ExtendLines then LastMidDN else midFVGDown else na;
HLineL.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
HLineL.SetDefaultColor(CreateColor(194, 24, 91));
HLineL.SetHiding(!ShowHLLines);
LLineL.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
LLineL.SetDefaultColor(CreateColor(194, 24, 91));
LLineL.SetHiding(!ShowHLLines);
MLineL.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
MLineL.SetDefaultColor(CreateColor(244, 143, 177));

AddCloud(if ShowCloud and(HLineL == HLineL[1] or HLineL == HLineL[-1]) then HLineL else na, LLineL, CreateColor(244, 143, 177));
AssignPriceColor( if ColorFVGBar and HLineL <> HLineL[1] then color.YELLOW else Color.CURRENT);

##### END #######