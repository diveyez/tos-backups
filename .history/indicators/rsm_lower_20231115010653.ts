

#RSM_Lower_v1.5
#
#CHANGELOG
#
# 2021.07.06 V1.5 @SuryaKiranC - Updated code to use existing variables; added Stochastic Slow Divergence(in addition
#                           to RSI Divergence - added Labeles to show which plot is enabled; can be turned off
#
# 2021.07.06 V1.4 @cos251 - Added RSI Divergence indicator from "RSI Dirvergence Indicator" from BenTen code
#                           Please note that the overbought and oversold used for divergence is 70 / 30 and can be adjusted in
#                           settings
#
# 2021.01.11 V1.3 @cos251 - Addjusted lower shading to shade trends when individual indicator crosses respective midline
#                           Shading will match if stochPlots is set to "Both"(RSI & Stochastci)
#
# 2020.11.30 V1.2 @cos251 - Added quick option to select plot(s)(RSI, Stochastic, Both or MACDOnly), set SlowD to enabled,
#                           user can uncheck SlowD plot if desired; adjusted coloring and shading to work with
#                           any plot selected; Combined plots for ease of use.
#
# 2020.10.30 V1.1 @cos251 - Added UpTrend and DownTrend variables that can be used for a SCAN(HAS BEEN REMOVED)
# 2020.10.27 V1.0 @cos251 - Added RSI, StochasticSlow and MACD to same indicator; this
#                           will plot only RSI and Stochastic but also
# - calculates MACD; Will shade the lower plot area of the following conditions are met
#                           Shade GREEN = RSI > 50 and SlowK > 50 and(macd)Value > (macd)Avg
#                           Shade RED = RSI < 50 and SlowK < 50 and(macd)Value < (macd)Avg
#
#REQUIREMENTS - RSI Set to 7, EXPONENTIAL
#               Stoch Slow 14 and 3 WILDERS
#               MACD 12, 26, 9 WEIGHTED
#
#
#CREDITS
# requesed by "@Joseph Patrick 18"
#
#LINK
# https://rockwell-files.s3.amazonaws.com/PXCompanionGuide2ndEd_cover.pdf
# Markus Heikoetter who is the author of the Power X Strategy
# https://usethinkscript.com/threads/mimicking-power-x-strategy-by-markus-heitkoetter.4283/
#
#USAGE
#



declare lower;

input paintBars = yes;
input selectPlots = { default "RSI", "Stochastic", "Both", "MACDOnly" };

################################################################
##########                 RSI                         #########
################################################################

input lengthRSI = 7;
input over_BoughtRSI = 80;
input over_SoldRSI = 20;
input price = close;
input averageTypeRSI = AverageType.EXPONENTIAL;
input showBreakoutSignalsRSI = no;
input showRSI_obos = no;


def NetChgAvg = MovingAverage(averageTypeRSI, price - price[1], lengthRSI);
def TotChgAvg = MovingAverage(averageTypeRSI, AbsValue(price - price[1]), lengthRSI);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
def calcRSI = 50 * (ChgRatio + 1);

plot RSI = if selectPlots == selectPlots.RSI or selectPlots == selectPlots.Both then calcRSI else Double.NaN;
plot OverSold_RSI = if (selectPlots == selectPlots.RSI or selectPlots == selectPlots.Both) and showRSI_obos then over_SoldRSI else Double.NaN;
plot OverBought_RSI = if (selectPlots == selectPlots.RSI or selectPlots == selectPlots.Both) and showRSI_obos then over_BoughtRSI else Double.NaN;
plot UpSignalRSI = if RSI crosses above OverSold_RSI then OverSold_RSI else Double.NaN;
plot DownSignalRSI = if RSI crosses below OverBought_RSI then OverBought_RSI else Double.NaN;
UpSignalRSI.SetHiding(!showBreakoutSignalsRSI);
DownSignalRSI.SetHiding(!showBreakoutSignalsRSI);
RSI.DefineColor("OverBought", GetColor(5));
RSI.DefineColor("Normal", Color.YELLOW);
RSI.DefineColor("OverSold", GetColor(1));
#RSI.AssignValueColor(if RSI > rsiover_Bought then RSI.Color("OverBought") else if RSI < rsiover_Sold then RSI.Color("OverSold") else RSI.Color("Normal"));
OverSold_RSI.SetDefaultColor(GetColor(8));
OverBought_RSI.SetDefaultColor(GetColor(8));
UpSignalRSI.SetDefaultColor(Color.UPTICK);
UpSignalRSI.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignalRSI.SetDefaultColor(Color.DOWNTICK);
DownSignalRSI.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);

def BN = BarNumber();
def RSI_H = if RSI > over_BoughtRSI then fold Ri = 1 to Floor(lengthRSI / 2) with Rp = 1 while Rp do RSI > GetValue(RSI, -Ri) else 0;
def RSI_PivotH = if (BN > lengthRSI and RSI == Highest(RSI, Floor(lengthRSI / 2)) and RSI_H) then RSI else Double.NaN;
def RSI_L = if RSI < over_SoldRSI then fold Rj = 1 to Floor(lengthRSI / 2) with Rq = 1 while Rq do RSI < GetValue(RSI, -Rj) else 0;
def RSI_PivotL = if (BN > lengthRSI and RSI == Lowest(RSI, Floor(lengthRSI / 2)) and RSI_L) then RSI else Double.NaN;
def RSI_PHBar = if !IsNaN(RSI_PivotH) then BN else RSI_PHBar[1];
def RSI_PLBar = if !IsNaN(RSI_PivotL) then BN else RSI_PLBar[1];
def RSI_PHPoint = if !IsNaN(RSI_PivotH) then RSI_PivotH else RSI_PHPoint[1];
def RSI_LastPHBar = if RSI_PHPoint != RSI_PHPoint[1] then RSI_PHBar[1] else RSI_LastPHBar[1];
def RSI_PLPoint = if !IsNaN(RSI_PivotL) then RSI_PivotL else RSI_PLPoint[1];
def RSI_LastPLBar = if RSI_PLPoint != RSI_PLPoint[1] then RSI_PLBar[1] else RSI_LastPLBar[1];

def RSI_HighPivots = BN >= HighestAll(RSI_LastPHBar);
def RSI_LowPivots = BN >= HighestAll(RSI_LastPLBar);
def RSI_pivotHigh = if RSI_HighPivots then RSI_PivotH else Double.NaN;

plot RSI_plotHline = if selectPlots == selectPlots.RSI then RSI_pivotHigh else Double.NaN;
RSI_plotHline.EnableApproximation();
RSI_plotHline.SetDefaultColor(Color.LIME);
RSI_plotHline.SetStyle(Curve.SHORT_DASH);

plot RSI_pivotLow = if selectPlots == selectPlots.RSI and RSI_LowPivots then RSI_PivotL else Double.NaN;
RSI_pivotLow.EnableApproximation();
RSI_pivotLow.SetDefaultColor(Color.LIME);
RSI_pivotLow.SetStyle(Curve.SHORT_DASH);

plot RSI_pivotDot = if !IsNaN(selectPlots == selectPlots.RSI and RSI_pivotHigh) then RSI_pivotHigh else if !IsNaN(RSI_pivotLow) then RSI_pivotLow else Double.NaN;
RSI_pivotDot.SetDefaultColor(Color.LIME);
RSI_pivotDot.SetPaintingStrategy(PaintingStrategy.POINTS);
RSI_pivotDot.SetLineWeight(3);


################################################################
##########                 Stochastic Slow             #########
################################################################
input over_boughtSt = 80;
input over_soldSt = 20;
input KPeriod = 14;
input DPeriod = 3;
input priceH = high;
input priceL = low;
input priceC = close;
input averageTypeStoch = AverageType.WILDERS;
input showBreakoutSignalsStoch = { default "No", "On SlowK", "On SlowD", "On SlowK & SlowD"};
input showStochastic_ob_os = no;

def calcSlowK = reference StochasticFull(over_boughtSt, over_soldSt, KPeriod, DPeriod, priceH, priceL, priceC, 3, averageTypeStoch).FullK;
def calcSlowD = reference StochasticFull(over_boughtSt, over_soldSt, KPeriod, DPeriod, priceH, priceL, priceC, 3, averageTypeStoch).FullD;
plot SlowK = if selectPlots == selectPlots.Stochastic or selectPlots == selectPlots.Both then calcSlowK else Double.NaN;
plot SlowD = if selectPlots == selectPlots.Stochastic or selectPlots == selectPlots.Both then calcSlowD else Double.NaN;
plot OverBoughtSt = if (selectPlots == selectPlots.Stochastic or selectPlots == selectPlots.Both) and showStochastic_ob_os then over_boughtSt else Double.NaN;
plot OverSoldSt = if (selectPlots == selectPlots.Stochastic or selectPlots == selectPlots.Both) and showStochastic_ob_os then over_soldSt else Double.NaN;

def upK = SlowK crosses above OverSoldSt;
def upD = SlowD crosses above OverSoldSt;
def downK = SlowK crosses below OverBoughtSt;
def downD = SlowD crosses below OverBoughtSt;

plot UpSignalSt;
plot DownSignalSt;
switch (showBreakoutSignalsStoch) {
    case "No":
        UpSignalSt = Double.NaN;
        DownSignalSt = Double.NaN;
    case "On SlowK":
        UpSignalSt = if upK then OverSoldSt else Double.NaN;
        DownSignalSt = if downK then OverBoughtSt else Double.NaN;
    case "On SlowD":
        UpSignalSt = if upD then OverSoldSt else Double.NaN;
        DownSignalSt = if downD then OverBoughtSt else Double.NaN;
    case "On SlowK & SlowD":
        UpSignalSt = if upK or upD then OverSoldSt else Double.NaN;
        DownSignalSt = if downK or downD then OverBoughtSt else Double.NaN;
}
UpSignalSt.SetHiding(showBreakoutSignalsStoch == showBreakoutSignalsStoch."No");
DownSignalSt.SetHiding(showBreakoutSignalsStoch == showBreakoutSignalsStoch."No");
SlowK.SetDefaultColor(Color.WHITE);
SlowD.SetDefaultColor(Color.DARK_ORANGE);
OverBoughtSt.SetDefaultColor(GetColor(1));
OverSoldSt.SetDefaultColor(GetColor(1));
UpSignalSt.SetDefaultColor(Color.UPTICK);
UpSignalSt.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignalSt.SetDefaultColor(Color.DOWNTICK);
DownSignalSt.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);

def SlowK_H = if SlowK > over_boughtSt then fold Si = 1 to Floor(KPeriod / 2) with Sp = 1 while Sp do SlowK > GetValue(SlowK, -Si) else 0;
def SlowK_PivotH = if (BN > KPeriod and SlowK == Highest(SlowK, Floor(KPeriod / 2)) and SlowK_H) then SlowK else Double.NaN;
def SlowK_L = if SlowK < over_soldSt then fold Sj = 1 to Floor(KPeriod / 2) with Sq = 1 while Sq do SlowK < GetValue(SlowK, -Sj) else 0;
def SlowK_PivotL = if (BN > KPeriod and SlowK == Lowest(SlowK, Floor(KPeriod / 2)) and SlowK_L) then SlowK else Double.NaN;
def SlowK_PHBar = if !IsNaN(SlowK_PivotH) then BN else SlowK_PHBar[1];
def SlowK_PLBar = if !IsNaN(SlowK_PivotL) then BN else SlowK_PLBar[1];
def SlowK_PHPoint = if !IsNaN(SlowK_PivotH) then SlowK_PivotH else SlowK_PHPoint[1];
def SlowK_LastPHBar = if SlowK_PHPoint != SlowK_PHPoint[1] then SlowK_PHBar[1] else SlowK_LastPHBar[1];
def SlowK_PLPoint = if !IsNaN(SlowK_PivotL) then SlowK_PivotL else SlowK_PLPoint[1];
def SlowK_LastPLBar = if SlowK_PLPoint != SlowK_PLPoint[1] then SlowK_PLBar[1] else SlowK_LastPLBar[1];

def SlowK_HighPivots = BN >= HighestAll(SlowK_LastPHBar);
def SlowK_LowPivots = BN >= HighestAll(SlowK_LastPLBar);
def SlowK_PivotHigh = if SlowK_HighPivots then SlowK_PivotH else Double.NaN;

plot SlowK_plotHline = SlowK_PivotHigh;
SlowK_plotHline.EnableApproximation();
SlowK_plotHline.SetDefaultColor(Color.LIME);
SlowK_plotHline.SetStyle(Curve.SHORT_DASH);

plot SlowK_pivotLow = if SlowK_LowPivots then SlowK_PivotL else Double.NaN;
SlowK_pivotLow.EnableApproximation();
SlowK_pivotLow.SetDefaultColor(Color.LIME);
SlowK_pivotLow.SetStyle(Curve.SHORT_DASH);

plot SlowK_pivotDot = if !IsNaN(SlowK_PivotHigh) then SlowK_PivotHigh else if !IsNaN(SlowK_pivotLow) then SlowK_pivotLow else Double.NaN;
SlowK_pivotDot.SetDefaultColor(Color.LIME);
SlowK_pivotDot.SetPaintingStrategy(PaintingStrategy.POINTS);
SlowK_pivotDot.SetLineWeight(3);


################################################################
##########                 MACD                        #########
################################################################
input fastLength = 12;
input slowLength = 26;
input MACDLength = 9;
input averageTypeMACD = AverageType.WEIGHTED;
input showBreakoutSignalsMACD = no;
def calcValue = MovingAverage(averageTypeMACD, close, fastLength) - MovingAverage(averageTypeMACD, close, slowLength);
def calcAvg = MovingAverage(averageTypeMACD, calcValue, MACDLength);
def calcDiff = calcValue - calcAvg;
plot ZeroLine = if selectPlots == selectPlots.MACDOnly then 0 else Double.NaN;
plot Value = if selectPlots == selectPlots.MACDOnly then calcValue else Double.NaN;
plot Avg = if selectPlots == selectPlots.MACDOnly then calcAvg else Double.NaN;
plot Diff = if selectPlots == selectPlots.MACDOnly then calcDiff else Double.NaN;
plot UpSignalMACD = if calcDiff crosses above 0 then 0 else Double.NaN;
plot DownSignalMACD = if calcDiff crosses below 0 then 0 else Double.NaN;

UpSignalMACD.SetHiding(!showBreakoutSignalsMACD);
DownSignalMACD.SetHiding(!showBreakoutSignalsMACD);

Value.SetDefaultColor(Color.GREEN);
Avg.SetDefaultColor(Color.RED);
Diff.SetDefaultColor(GetColor(5));
Diff.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Diff.SetLineWeight(4);
Diff.DefineColor("Positive and Up", Color.CYAN);
Diff.DefineColor("Positive and Down", Color.BLUE);
Diff.DefineColor("Negative and Down", Color.RED);
Diff.DefineColor("Negative and Up", Color.YELLOW);
Diff.AssignValueColor(if Diff >= 0 then if Diff > Diff[1] then Diff.Color("Positive and Up") else Diff.Color("Positive and Down") else if Diff < Diff[1] then Diff.Color("Negative and Down") else Diff.Color("Negative and Up"));
ZeroLine.SetDefaultColor(GetColor(0));
UpSignalMACD.SetDefaultColor(Color.UPTICK);
UpSignalMACD.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignalMACD.SetDefaultColor(Color.DOWNTICK);
DownSignalMACD.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);


# Check Each Signal for over 50 and MACD for Value > Avg
def rsiGreen = if calcRSI > 50 then 1 else Double.NaN;
def rsiRed = if calcRSI < 50 then 1 else Double.NaN;
def stochGreen = if calcSlowK >= 50 then 1 else Double.NaN;
def stochRed = if calcSlowK < 50 then 1 else Double.NaN;
def macdGreen = if calcValue > calcAvg then 1 else Double.NaN;
def macdRed = if calcValue < calcAvg then 1 else Double.NaN;
def green = if rsiGreen and stochGreen and macdGreen then 1 else Double.NaN;
def red = if rsiRed and stochRed and macdRed then 1 else Double.NaN;


#RSI Color Assignment per requeset
RSI.AssignValueColor(if calcRSI > 50 and calcSlowK > 50 and calcValue > calcAvg then Color.GREEN else if calcRSI < 50 and calcSlowK < 50 and calcValue < calcAvg then Color.RED else Color.DARK_GRAY);

#AssignPriceColor
AssignPriceColor(if paintBars and calcRSI > 50 and calcSlowK > 50 and calcValue > calcAvg then Color.GREEN else if paintBars and calcRSI < 50 and calcSlowK < 50 and calcValue < calcAvg then Color.RED else if paintBars then Color.DARK_GRAY else Color.CURRENT);

#################################################################
############  Shade areas based on criteria; adjust as needed  ##
#################################################################
AddCloud(if rsiGreen and stochGreen and selectPlots == selectPlots.Both then Double.POSITIVE_INFINITY else Double.NaN, if rsiGreen and stochGreen and selectPlots == selectPlots.Both then Double.NEGATIVE_INFINITY else Double.NaN, Color.LIGHT_GREEN);


AddCloud(if rsiRed and stochRed and selectPlots == selectPlots.Both then Double.POSITIVE_INFINITY else Double.NaN, if rsiRed and stochRed and selectPlots == selectPlots.Both then Double.NEGATIVE_INFINITY else Double.NaN, Color.LIGHT_RED);

AddCloud(if rsiGreen and selectPlots == selectPlots.RSI then Double.POSITIVE_INFINITY else Double.NaN, if rsiGreen and selectPlots == selectPlots.RSI then Double.NEGATIVE_INFINITY else Double.NaN, Color.LIGHT_GREEN);
AddCloud(if rsiRed and selectPlots == selectPlots.RSI then Double.POSITIVE_INFINITY else Double.NaN, if rsiRed and selectPlots == selectPlots.RSI then Double.NEGATIVE_INFINITY else Double.NaN, Color.LIGHT_RED);

AddCloud(if stochGreen and selectPlots == selectPlots.Stochastic then Double.POSITIVE_INFINITY else Double.NaN, if stochGreen and selectPlots == selectPlots.Stochastic then Double.NEGATIVE_INFINITY else Double.NaN, Color.LIGHT_GREEN);
AddCloud(if stochRed and selectPlots == selectPlots.Stochastic then Double.POSITIVE_INFINITY else Double.NaN, if stochRed and selectPlots == selectPlots.Stochastic then Double.NEGATIVE_INFINITY else Double.NaN, Color.LIGHT_RED);

AddCloud(if macdGreen and selectPlots == selectPlots.MACDOnly then Double.POSITIVE_INFINITY else Double.NaN, if macdGreen and selectPlots == selectPlots.MACDOnly then Double.NEGATIVE_INFINITY else Double.NaN, Color.LIGHT_GREEN);
AddCloud(if macdRed and selectPlots == selectPlots.MACDOnly then Double.POSITIVE_INFINITY else Double.NaN, if macdRed and selectPlots == selectPlots.MACDOnly then Double.NEGATIVE_INFINITY else Double.NaN, Color.LIGHT_RED);


plot fifty = if selectPlots == selectPlots.RSI or selectPlots == selectPlots.Stochastic or selectPlots == selectPlots.Both then 50 else Double.NaN;
fifty.SetDefaultColor(Color.RED);



input showLabels = yes;
AddLabel(if showLabels then yes else no, if selectPlots == selectPlots.RSI then "RSM: RSI PLOT" else if selectPlots == selectPlots.Stochastic then "RSM: Stochastic Plot" else if selectPlots == selectPlots.Both then "RSM: RSI & Stochastic Plot" else "RSM: MACD PLOT", Color.ORANGE);




#START OF RSI / Stochastic / MACD Confluence Strategy for ThinkOrSwim
# RSM_MTF_Labels
#
#CHANGELOG
# 2020.12.30 V2.1 @SuryaKiranC - Fork from @cos251 Version, to reduce the number of lines in code and optimize for performance.
#
# 2020.12.11 V1.1 @cos251 - Added 2D, 3D, 4D, 1WK, 1MNTH Agg Period Labels
#
# 2020.12.02 V1.0 @cos251 - Added RSM signal calculation for following timeframes:
# - 1m, 2m, 5m, 15m, 30m, 1h, 2h, 4h, D
# - Label will be added to top of chart for every allowed TF
# - Label will read "TF:L(Long):S(Short):I(Idle)"
# - Label Color will be green, red or gray accordingly
#
#
#REQUIREMENTS - RSI Set to 7, EXPONENTIAL
#               Stoch Slow 14 and 3 WILDERS
#               MACD 12, 26, 9 WEIGHTED
#
#ORIGINAL REQUEST - @Joseph Patrick 18
# - Link: https://usethinkscript.com/threads/mimicking-power-x-strategy-by-markus-heitkoetter.4283/
#
#

input period = AggregationPeriod.DAY;

DefineGlobalColor("UpTrend", Color.GREEN);
DefineGlobalColor("DownTrend", Color.RED);
DefineGlobalColor("NoTrend", Color.GRAY);

script RSM_ {

    input aP = AggregationPeriod.DAY;
    # RSI
    def lengthRSI = 7;
    def averageTypeRSI = AverageType.EXPONENTIAL;
    # Stochastic
    def over_boughtSt = 80;
    def over_soldSt = 20;
    def KPeriod = 14;
    def DPeriod = 3;
    input averageTypeStoch = AverageType.WILDERS;
    # MACD
    def fastLength = 12;
    def slowLength = 26;
    def MACDLength = 9;
    def averageTypeMACD = AverageType.WEIGHTED;

    ###############################################################
    ##########                 RSI                         #########
    ################################################################

    def NetChgAvg = MovingAverage(averageTypeRSI, close(period = aP) - close(period = aP)[1], lengthRSI);
    def TotChgAvg = MovingAverage(averageTypeRSI, AbsValue(close(period = aP) - close(period = aP)[1]), lengthRSI);
    def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
    def RSI_ = 50 * (ChgRatio + 1);

    ################################################################
    ##########                 Stochastic Slow             #########
    ################################################################

    def SlowK_ = reference StochasticFull(over_boughtSt, over_soldSt, KPeriod, DPeriod, high(period = aP), low(period = aP), close(period = aP), 3, if (averageTypeStoch == 1) then AverageType.SIMPLE else AverageType.EXPONENTIAL).FullK;
    def SlowD_ = reference StochasticFull(over_boughtSt, over_soldSt, KPeriod, DPeriod, high(period = aP), low(period = aP), close(period = aP), 3, if (averageTypeStoch == 1) then AverageType.SIMPLE else AverageType.EXPONENTIAL).FullD;

    ################################################################
    ##########                 MACD                      ###########
    ################################################################

    def Value_ = MovingAverage(averageTypeMACD, close(period = aP), fastLength) - MovingAverage(averageTypeMACD, close(period = aP), slowLength);
    def Avg_ = MovingAverage(averageTypeMACD, Value_, MACDLength);
    def Diff_ = Value_ - Avg_;

    #################################################################
    ##########          Trend & Labels                   #########
    #################################################################
    def UpTrend_ = if RSI_ >= 50 and SlowK_ >= 50 and Value_ > Avg_ then 1 else 0;
    def DownTrend_ = if RSI_ < 50 and SlowK_ < 50 and Value_ < Avg_ then 1 else 0;
    plot Trend_ = if UpTrend_ then 1 else if DownTrend_ then 0 else -1;

}

def currentPeriod = GetAggregationPeriod();
def RSM;

if period >= currentPeriod {
    RSM = RSM_(aP = period);

} else {
    RSM = Double.NaN;

}

AddLabel(!IsNaN(RSM), if period == AggregationPeriod.MONTH then "M"
else if period == AggregationPeriod.WEEK then "W"
else if period == AggregationPeriod.FOUR_DAYS then "4D"
else if period == AggregationPeriod.THREE_DAYS then "3D"
else if period == AggregationPeriod.TWO_DAYS then "2D"
else if period == AggregationPeriod.DAY then "D"
else if period == AggregationPeriod.FOUR_HOURS then "4H"
else if period == AggregationPeriod.TWO_HOURS then "2H"
else if period == AggregationPeriod.HOUR then "60m"
else if period == AggregationPeriod.THIRTY_MIN then "30m"
else if period == AggregationPeriod.TWENTY_MIN then "20m"
else if period == AggregationPeriod.FIFTEEN_MIN then "15m"
else if period == AggregationPeriod.TEN_MIN then "10m"
else if period == AggregationPeriod.FIVE_MIN then "5m"
else if period == AggregationPeriod.FOUR_MIN then "4m"
else if period == AggregationPeriod.THREE_MIN then "3m"
else if period == AggregationPeriod.TWO_MIN then "2m"
else if period == AggregationPeriod.MIN then "1m"
else "", if RSM == 1 then GlobalColor("UpTrend") else if RSM == 0 then GlobalColor("DownTrend") else GlobalColor("No Trend"));