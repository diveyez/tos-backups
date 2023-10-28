#START OF RSI / Stochastic / MACD Confluence Strategy for ThinkOrSwim
#RSM_STANDARD_UPPER
#
#CHANGELOG
#
# 2021.05.11 V1.9 @cos251 - Added feature to plot only current ADR Targets and Stoploss
# - Feature credit goes to @SleepyZ(thx)
#
# 2021.05.04 V1.8 @cos251 - Fixed >= error to match original strategy as noted by community
# - Fixed UpTrend and DownTrend Arrows to display on weekly chart
# - Fixed StopLoss and UpTrend / DownTrend targets to display on weekly chart
#
# 2021.04.13 V1.7 @cos251 - Added additional price targets(7, 8, 9) as an input option(ShowExtraTargets789) -
# - can be turned on and off independent of targets 1 - 6 but dependent on trend
# - Added ADX triangle plot to stoploss in either direction.Indicates if ADX # - is greater than previous ADX[1] and denotes if ADR has crossed
# - above ADXR for trend confirmation / strength
# - ADX Uptrend - White = ADX > ADX[1], RED = ADX crossed above ADXR, CYAN = ADX > 35
# - ADX DownTrend - Purple = ADX > ADX[1], GREEN = ADX crossed above ADXR, YELLOW = ADX > 35
#
# 2021.01.15 V1.6 @SuryaKirnaC
# - Modifed ADR Zones shading colors
# - Adjusted Indicator and target labels for space
# - Made audible alerts user configurable via settings
#
# 2021.01.04 V1.5 @cos251 - Fixed long, short ADR Zone plots to match TradeType selection(Long, Short, BOTH)
# - will only plot as selected
#
# 2020.12.21 V1.4 @cos251 - Added input "plotADR"
# - plots dynamic ATR / ADR targets - default plots 3 targets - can be turned off by setting #                              "plotADR" to no
# - Added input "showExtraTargets"
# - - plots dynamic ATR / ADR targets - for targets 4, 5, and 6
# - Added input "showADRZones"
# - Dynamic shading of ATR / ADR targets - can be turned off in settings using "showADRZones"
# - Added dynamic calculation of both ATR and ADR.User can select between ATR and ADR in #                              settings
# - Added input "showADRLabels"
# - Added Dynamic Target labels for UpTrend or DownTrend; they will be green or red #                              depending on Up or Down trend
# - Added input "showTodayOnly"
# - Added option to display shaded ADR / ATR zones for today only "showTodayOnly"
# - if set to no - ADR / ATR plots will be plotted for all available data on chart
# - Added ability to plot ATR or ADR on DAY chart - MUST TURN OFF "showTodayOnly"
# - Added Labels that can be used for "debug" - MUST change "debug" setting to yes
# - Added Trend information labels that can be turned on / off
#                       
#
# 2020.11.30 V1.3 @cos251 - Stripped down TICK Version; No ADR since time based aggregation period do not work on TICK #                           Charts
#
# 2020.11.30 V1.2 @cos251 - Add ADR plots and shading per request; will tweak these settings to improve overall
#                           options
# 2020.11.12 V1.1 @cos251 - Changed from strategy to standard study.Added Green Arrow UP
#                           and Red Arrow down when trend starts.Added option to change to high
#                           timeframe but this WILL repaint; if used, should be used with other
#                           indicators to confirm an entry / exit.
#
# 2020.10.27 V1.0 @cos251 - Added RSI, StochasticSlow and MACD to same indicator
# - also calculates MACD;
# - Will shade the lower plot area of the following conditions are met
#                           Shade GREEN = RSI > 50 and SlowK > 50 and(macd)Value > (macd)Avg
#                           Shade RED = RSI < 50 and SlowK < 50 and(macd)Value < (macd)Avg
#
#
#REQUIREMENTS - RSI Set to 7, EXPONENTIAL
#               Stoch Slow 14 and 3 WILDERS
#               MACD 12, 26, 9 WEIGHTED


declare upper;
################################################################
##########                 Variables                   #########
################################################################

input paintBars = yes;
input showRSMShade = no;
input tradetype = { "long", "short", default "both" };
input rangeType = { default "ADR", "ATR" };
input stopLossMultiplier = 1.0;
input plotADR = yes;
input showADRZones = yes;
input showCurrentTargetsOnly = yes;
input showTodayOnly = yes;
input showTrendLabels = no;
input showADRLabels = no;
input showExtraTargets = no;
input showExtraTargets789 = no;
input showADXTriangle = yes;
input lengthADX = 21;
input showIndicatorLabels = no;
input audibleAlerts = yes;
input debug = no; # change to "NO" after testing



################################################################
##########              ATR / ADR Calc                   #########
################################################################
input ATRlength = 14;
input ATRaverageType = AverageType.WILDERS;
def Range;
if rangeType == rangeType.ATR {
    Range = MovingAverage(ATRaverageType, TrueRange(high, close, low), ATRlength);
} else {
    Range = Average(high - low, 7);
}

################################################################
##########         Booleans Set for Plot Use           #########
################################################################
def afterStart;
def beforeEnd;
def today;
def openPrice;
if GetAggregationPeriod() <= AggregationPeriod.DAY {
    afterStart = GetTime() > RegularTradingStart(GetYYYYMMDD());
    beforeEnd = GetTime() < RegularTradingEnd(GetYYYYMMDD());
    today = if GetLastDay() == GetDay() then 1 else Double.NaN;
    openPrice = DailyOpen();
} else {
    afterstart = Double.NaN;
    beforeEnd = Double.NaN;
    today = Double.NaN;
    openPrice = Double.NaN;
}

plot DailyO = if openPrice then openPrice else Double.NaN;
AddLabel(if debug then yes else no, "Day = :" + today);
AddLabel(if debug then yes else no, "Day = :" + GetDay());


################################################################
##########           ADX Indicator Reference           #########
################################################################
def ADX = reference ADX();
def ADXR = (ADX + ADX[lengthADX - 1]) / 2;

################################################################
##########                 RSI                         #########
################################################################
input lengthRSI = 7;
input price = close;
input averageTypeRSI = AverageType.EXPONENTIAL;
def NetChgAvg = MovingAverage(averageTypeRSI, close - close[1], lengthRSI);
def TotChgAvg = MovingAverage(averageTypeRSI, AbsValue(close - close[1]), lengthRSI);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;
def RSI = 50 * (ChgRatio + 1);


################################################################
##########                 Stochastic Slow             #########
################################################################
input over_boughtSt = 80;
input over_soldSt = 20;
input KPeriod = 14;
input DPeriod = 3;
input averageTypeStoch = AverageType.WILDERS;
def SlowK = reference StochasticFull(over_boughtSt, over_soldSt, KPeriod, DPeriod, high, low, close, 3, averageTypeStoch).FullK;
def SlowD = reference StochasticFull(over_boughtSt, over_soldSt, KPeriod, DPeriod, high, low, close, 3, averageTypeStoch).FullD;



################################################################
##########                  MACD                       #########
################################################################
input fastLength = 12;
input slowLength = 26;
input MACDLength = 9;
input averageTypeMACD = AverageType.WEIGHTED;
def Value = MovingAverage(averageTypeMACD, close, fastLength) - MovingAverage(averageTypeMACD, close, slowLength);
def Avg = MovingAverage(averageTypeMACD, Value, MACDLength);
def Diff = Value - Avg;



################################################################
##########         Assign Price Color                  #########
################################################################
AssignPriceColor(if paintBars and RSI > 50 and SlowK > 50 and Value > Avg then Color.GREEN else if paintBars and RSI < 50 and SlowK < 50 and Value < Avg then Color.RED else if paintBars then Color.DARK_GRAY else Color.CURRENT);

#################################################################
#####   Up / Down Trend Check / SCAN Variables              #########
#################################################################
plot UpTrend = if RSI > 50 and SlowK > 50 and Value > Avg then 1 else 0;
plot DownTrend = if RSI < 50 and SlowK < 50 and Value < Avg then 1 else 0;
UpTrend.Hide();
DownTrend.Hide();
plot upArrow = if UpTrend == 1 and UpTrend[1] == 0 and(tradetype == tradetype.long or tradetype == tradetype.both) then low else Double.NaN;
upArrow.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
upArrow.SetDefaultColor(Color.GREEN);
upArrow.SetLineWeight(4);
plot downArrow = if DownTrend == 1 and DownTrend[1] == 0 and(tradetype == tradetype.short or tradetype == tradetype.both) then high else Double.NaN;
downArrow.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
downArrow.SetDefaultColor(Color.RED);
downArrow.SetLineWeight(4);

def bnumUp;
def bnumDown;
def closeUpTrendStart;
def closeDownTrendStart;
def UpTrendBarCount;
def DownTrendBarCount;
if UpTrend and(!UpTrend[1] or DownTrend[1]) {
    bnumUp = BarNumber();
    bnumDown = 0;
    closeUpTrendStart = close;
    closeDownTrendStart = 0;
    UpTrendBarCount = 1;
    DownTrendBarCount = 0;
} else if UpTrend {
    bnumUp = bnumUp[1];
    bnumDown = 0;
    closeUpTrendStart = closeUpTrendStart[1];
    closeDownTrendStart = 0;
    UpTrendBarCount = UpTrendBarCount[1] + 1;
    DownTrendBarCount = 0;
} else if DownTrend and(!DownTrend[1] or UpTrend[1]) {
    bnumUp = 0;
    bnumDown = BarNumber();
    closeDownTrendStart = close;
    closeUpTrendStart = 0;
    UpTrendBarCount = 0;
    DownTrendBarCount = 1;
} else if DownTrend {
    bnumDown = bnumDown[1];
    closeDownTrendStart = closeDownTrendStart[1];
    DownTrendBarCount = DownTrendBarCount[1] + 1;
    bnumUp = 0;
    closeUpTrendStart = 0;
    UpTrendBarCount = 0;
} else {
    bnumUp = 0;
    bnumDown = 0;
    closeUpTrendStart = 0;
    closeDownTrendStart = 0;
    UpTrendBarCount = 0;
    DownTrendBarCount = 0;
}
def c;
if BarNumber() == bnumUp or BarNumber() == bnumDown {
    c = Range;
} else if UpTrend or DownTrend {
    c = c[1];
} else {
    c = 0;
}
AddLabel(if debug then yes else no, "Current Bar:" + BarNumber());
AddLabel(if debug then yes else no, "C:" + c);
AddLabel( if debug then yes else no, "PlotADR: " + plotADR);
AddLabel( if debug then yes else no, "TodayOnly: " + showTodayOnly);


#################################################################
############        ADR / ATR Targets Shading              #########
#################################################################
def up = if UpTrend   then bnumUp   else Double.NaN;
def dn = if DownTrend then bnumDown else Double.NaN;
# - UpTrend Targets and StopLoss
plot UpTrendStopLoss = if showCurrentTargetsOnly == yes and(bnumUp < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if (tradetype == tradetype.both or tradetype == tradetype.long) and UpTrend and plotADR and!showTodayOnly then closeUpTrendStart - (c * stopLossMultiplier) else if (tradetype == tradetype.both or tradetype == tradetype.long) and UpTrend and plotADR and showTodayOnly  and today and afterStart and beforeEnd then closeUpTrendStart - c else Double.NaN;
plot oneADRPlus = if showCurrentTargetsOnly == yes and(bnumUp < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if (tradetype == tradetype.both or tradetype == tradetype.long) and UpTrend and plotADR and!showTodayOnly then closeUpTrendStart + (c * 1) else if (tradetype == tradetype.both or tradetype == tradetype.long) and UpTrend and plotADR and showTodayOnly  and today and afterStart and beforeEnd then closeUpTrendStart + c else Double.NaN;
plot twoADRPlus = if showCurrentTargetsOnly == yes and(bnumUp < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if (tradetype == tradetype.both or tradetype == tradetype.long) and UpTrend and plotADR and!showTodayOnly then closeUpTrendStart + (c * 2) else if (tradetype == tradetype.both or tradetype == tradetype.long) and UpTrend and plotADR and showTodayOnly  and today and afterStart and beforeEnd then closeUpTrendStart + (c * 2) else Double.NaN;
plot threeADRPlus = if showCurrentTargetsOnly == yes and(bnumUp < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if (tradetype == tradetype.both or tradetype == tradetype.long) and UpTrend and plotADR and!showTodayOnly then closeUpTrendStart + (c * 3) else if (tradetype == tradetype.both or tradetype == tradetype.long) and UpTrend and plotADR and showTodayOnly  and today and afterStart and beforeEnd then closeUpTrendStart + (c * 3) else Double.NaN;
plot fourADRPlus = if showCurrentTargetsOnly == yes and(bnumUp < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if (tradetype == tradetype.both or tradetype == tradetype.long) and UpTrend and plotADR and!showTodayOnly and showExtraTargets then closeUpTrendStart + (c * 4) else if (tradetype == tradetype.both or tradetype == tradetype.long) and UpTrend and plotADR and showTodayOnly  and today and afterStart and beforeEnd and showExtraTargets then closeUpTrendStart + (c * 4) else Double.NaN;
plot fiveADRPlus = if showCurrentTargetsOnly == yes and(bnumUp < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if (tradetype == tradetype.both or tradetype == tradetype.long) and UpTrend and plotADR and!showTodayOnly and showExtraTargets then closeUpTrendStart + (c * 5) else if (tradetype == tradetype.both or tradetype == tradetype.long) and UpTrend and plotADR and showTodayOnly  and today and afterStart and beforeEnd and showExtraTargets then closeUpTrendStart + (c * 5) else Double.NaN;
plot sixADRPlus = if showCurrentTargetsOnly == yes and(bnumUp < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if (tradetype == tradetype.both or tradetype == tradetype.long) and UpTrend and plotADR and!showTodayOnly and showExtraTargets then closeUpTrendStart + (c * 6) else if (tradetype == tradetype.both or tradetype == tradetype.long) and UpTrend and plotADR and showTodayOnly  and today and afterStart and beforeEnd and showExtraTargets then closeUpTrendStart + (c * 6) else Double.NaN;
plot sevenADRPlus = if showCurrentTargetsOnly == yes and(bnumUp < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if (tradetype == tradetype.both or tradetype == tradetype.long) and UpTrend and plotADR and!showTodayOnly and showExtraTargets and showExtraTargets789 then closeUpTrendStart + (c * 7) else if (tradetype == tradetype.both or tradetype == tradetype.long) and UpTrend and plotADR and showTodayOnly  and today and afterStart and beforeEnd and showExtraTargets and showExtraTargets789 then closeUpTrendStart + (c * 7) else Double.NaN;
plot eightADRPlus = if showCurrentTargetsOnly == yes and(bnumUp < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if (tradetype == tradetype.both or tradetype == tradetype.long) and UpTrend and plotADR and!showTodayOnly and showExtraTargets and showExtraTargets789 then closeUpTrendStart + (c * 8) else if (tradetype == tradetype.both or tradetype == tradetype.long) and UpTrend and plotADR and showTodayOnly  and today and afterStart and beforeEnd and showExtraTargets and showExtraTargets789 then closeUpTrendStart + (c * 8) else Double.NaN;
plot nineADRPlus = if showCurrentTargetsOnly == yes and(bnumUp < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if (tradetype == tradetype.both or tradetype == tradetype.long) and UpTrend and plotADR and!showTodayOnly and showExtraTargets and showExtraTargets789 then closeUpTrendStart + (c * 9) else if (tradetype == tradetype.both or tradetype == tradetype.long) and UpTrend and plotADR and showTodayOnly  and today and afterStart and beforeEnd and showExtraTargets and showExtraTargets789 then closeUpTrendStart + (c * 9) else Double.NaN;

# - DownTrend Targets and StopLoss
plot DownTrendStopLoss = if showCurrentTargetsOnly == yes and(bnumDown < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if (tradetype == tradetype.both or tradetype == tradetype.short) and DownTrend and plotADR and!showTodayOnly then closeDownTrendStart + (c * stopLossMultiplier) else if (tradetype == tradetype.both or tradetype == tradetype.short) and DownTrend and plotADR and showTodayOnly  and today and afterStart and beforeEnd then closeDownTrendStart + c else Double.NaN;
plot oneADRMinus = if showCurrentTargetsOnly == yes and(bnumDown < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if (tradetype == tradetype.both or tradetype == tradetype.short) and DownTrend and plotADR and!showTodayOnly then closeDownTrendStart - c else if (tradetype == tradetype.both or tradetype == tradetype.short) and DownTrend and plotADR and showTodayOnly  and today and afterStart and beforeEnd then closeDownTrendStart - c else Double.NaN;
plot twoADRMinus = if showCurrentTargetsOnly == yes and(bnumDown < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if (tradetype == tradetype.both or tradetype == tradetype.short) and DownTrend and plotADR and!showTodayOnly then closeDownTrendStart - (c * 2) else if (tradetype == tradetype.both or tradetype == tradetype.short) and DownTrend and plotADR and showTodayOnly  and today and afterStart and beforeEnd then closeDownTrendStart - (c * 2) else Double.NaN;
plot threeADRMinus = if showCurrentTargetsOnly == yes and(bnumDown < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if (tradetype == tradetype.both or tradetype == tradetype.short) and DownTrend and plotADR and!showTodayOnly then closeDownTrendStart - (c * 3) else if (tradetype == tradetype.both or tradetype == tradetype.short) and DownTrend and plotADR and showTodayOnly  and today and afterStart and beforeEnd then closeDownTrendStart - (c * 3) else Double.NaN;
plot fourADRMinus = if showCurrentTargetsOnly == yes and(bnumDown < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if (tradetype == tradetype.both or tradetype == tradetype.short) and DownTrend and plotADR and!showTodayOnly and showExtraTargets then closeDownTrendStart - (c * 4) else if (tradetype == tradetype.both or tradetype == tradetype.short) and DownTrend and plotADR and showTodayOnly  and today and afterStart and beforeEnd  and showExtraTargets then closeDownTrendStart - (c * 4) else Double.NaN;
plot fiveADRMinus = if showCurrentTargetsOnly == yes and(bnumDown < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if (tradetype == tradetype.both or tradetype == tradetype.short) and DownTrend and plotADR and!showTodayOnly and showExtraTargets then closeDownTrendStart - (c * 5) else if (tradetype == tradetype.both or tradetype == tradetype.short) and DownTrend and plotADR and showTodayOnly  and today and afterStart and beforeEnd  and showExtraTargets then closeDownTrendStart - (c * 5) else Double.NaN;
plot sixADRMinus = if showCurrentTargetsOnly == yes and(bnumDown < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if (tradetype == tradetype.both or tradetype == tradetype.short) and DownTrend and plotADR and!showTodayOnly and showExtraTargets then closeDownTrendStart - (c * 6) else if (tradetype == tradetype.both or tradetype == tradetype.short) and DownTrend and plotADR and showTodayOnly  and today and afterStart and beforeEnd  and showExtraTargets then closeDownTrendStart - (c * 6) else Double.NaN;
plot sevenADRMinus = if showCurrentTargetsOnly == yes and(bnumDown < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if (tradetype == tradetype.both or tradetype == tradetype.short) and DownTrend and plotADR and!showTodayOnly and showExtraTargets and showExtraTargets789 then closeDownTrendStart - (c * 7) else if (tradetype == tradetype.both or tradetype == tradetype.short) and DownTrend and plotADR and showTodayOnly  and today and afterStart and beforeEnd  and showExtraTargets and showExtraTargets789 then closeDownTrendStart - (c * 7) else Double.NaN;
plot eightADRMinus = if showCurrentTargetsOnly == yes and(bnumDown < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if (tradetype == tradetype.both or tradetype == tradetype.short) and DownTrend and plotADR and!showTodayOnly and showExtraTargets and showExtraTargets789 then closeDownTrendStart - (c * 8) else if (tradetype == tradetype.both or tradetype == tradetype.short) and DownTrend and plotADR and showTodayOnly  and today and afterStart and beforeEnd  and showExtraTargets and showExtraTargets789 then closeDownTrendStart - (c * 8) else Double.NaN;
plot nineADRMinus = if showCurrentTargetsOnly == yes and(bnumDown < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if (tradetype == tradetype.both or tradetype == tradetype.short) and DownTrend and plotADR and!showTodayOnly and showExtraTargets and showExtraTargets789 then closeDownTrendStart - (c * 9) else if (tradetype == tradetype.both or tradetype == tradetype.short) and DownTrend and plotADR and showTodayOnly  and today and afterStart and beforeEnd  and showExtraTargets and showExtraTargets789 then closeDownTrendStart - (c * 9) else Double.NaN;

UpTrendStopLoss.SetDefaultColor(Color.LIGHT_RED);
oneADRPlus.SetDefaultColor(Color.LIGHT_GREEN);
twoADRPlus.SetDefaultColor(Color.LIGHT_GREEN);
threeADRPlus.SetDefaultColor(Color.LIGHT_GREEN);
fourADRPlus.SetDefaultColor(Color.LIGHT_GREEN);
fiveADRPlus.SetDefaultColor(Color.LIGHT_GREEN);
sixADRPlus.SetDefaultColor(Color.LIGHT_GREEN);
sevenADRPlus.SetDefaultColor(Color.LIGHT_GREEN);
eightADRPlus.SetDefaultColor(Color.LIGHT_GREEN);
nineADRPlus.SetDefaultColor(Color.LIGHT_GREEN);

DownTrendStopLoss.SetDefaultColor(Color.LIGHT_GREEN);
oneADRMinus.SetDefaultColor(Color.LIGHT_RED);
twoADRMinus.SetDefaultColor(Color.LIGHT_RED);
threeADRMinus.SetDefaultColor(Color.LIGHT_RED);
fourADRMinus.SetDefaultColor(Color.LIGHT_RED);
fiveADRMinus.SetDefaultColor(Color.LIGHT_RED);
sixADRMinus.SetDefaultColor(Color.LIGHT_RED);
sevenADRMinus.SetDefaultColor(Color.LIGHT_RED);
eightADRMinus.SetDefaultColor(Color.LIGHT_RED);
nineADRMinus.SetDefaultColor(Color.LIGHT_RED);


########### ADX Triangle Plot ###################################
plot ADXTriangleUp = if showCurrentTargetsOnly == yes and(bnumUp < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if showADXTriangle and UpTrend and ADX > ADX[1] and!showTodayOnly then closeUpTrendStart - (c * stopLossMultiplier) else if showADXTriangle and UpTrend and ADX > ADX[1] and showTodayOnly and today then closeUpTrendStart - (c * stopLossMultiplier)  else Double.NaN;
ADXTriangleUp.SetPaintingStrategy(PaintingStrategy.TRIANGLES);
ADXTriangleUp.SetDefaultColor(Color.WHITE);
ADXTriangleUp.AssignValueColor(if ADX > ADXR and ADX[1] < ADXR[1] then Color.RED else if ADX > 35 then Color.CYAN else Color.CURRENT);
ADXTriangleUp.SetLineWeight(1);
plot ADXBubbleDown = if showCurrentTargetsOnly == yes and(bnumUp < Max(HighestAll(dn), HighestAll(up)))
                         then Double.NaN
                         else if showADXTriangle and DownTrend and ADX > ADX[1] and!showTodayOnly then closeDownTrendStart + (c * stopLossMultiplier) else if showADXTriangle and DownTrend and ADX > ADX[1] and showTodayOnly and today then closeDownTrendStart + (c * stopLossMultiplier) else Double.NaN;
ADXBubbleDown.SetPaintingStrategy(PaintingStrategy.TRIANGLES);
ADXBubbleDown.SetDefaultColor(Color.MAGENTA);
ADXBubbleDown.AssignValueColor(if ADX > ADXR and ADX[1] < ADXR[1] then Color.GREEN else if ADX > 35 then Color.YELLOW else Color.CURRENT);
ADXBubbleDown.SetLineWeight(1);


#################################################################
############          ADR / ATR Zone Shading              #########
#################################################################
def u = if UpTrend then closeUpTrendStart else Double.NaN;
def d = if DownTrend then closeDownTrendStart else Double.NaN;
def bnumUpCheck = if bnumUp != 0 then 1 else Double.NaN;
def bnumDownCheck = if bnumDown != 0 then 1 else Double.NaN;

AddCloud(if showADRZones and UpTrend and bnumUpCheck and showExtraTargets and showExtraTargets789 then nineADRPlus else if showADRZones and UpTrend and bnumUpCheck and showExtraTargets then sixADRPlus else if showADRZones and UpTrend and bnumUpCheck then threeADRPlus else Double.NaN, if showADRZones and UpTrend and bnumUpCheck then u else Double.NaN, CreateColor(213, 252, 213));
AddCloud(if showADRZones and UpTrend then u else Double.NaN, if showADRZones and UpTrend then UpTrendStopLoss else Double.NaN, CreateColor(255, 174, 174));

# - Shade Downtrend ADR / ATR zones
AddCloud( if showADRZones and DownTrend and bnumDownCheck then d else Double.NaN,if showADRZones and DownTrend and bnumDownCheck and showExtraTargets and showExtraTargets789 then nineADRminus else if showADRZones and DownTrend and bnumDownCheck and showExtraTargets then sixADRMinus else if showADRZones and DownTrend and bnumDownCheck then threeADRMinus else Double.NaN, CreateColor(213, 252, 213));

AddCloud(if showADRZones and DownTrend then DownTrendStopLoss else Double.NaN, if showADRZones and DownTrend then d else Double.NaN, CreateColor(255, 174, 174));


#################################################################
####    RSM shade areas based on criteria; adjust as needed  ####
#################################################################
AddCloud(if showRSMShade and RSI > 50 and SlowK >= 50 and Value > Avg then Double.POSITIVE_INFINITY else Double.NaN, if RSI > 50 and SlowK > 50 and Value > Avg then Double.NEGATIVE_INFINITY else Double.NaN, Color.LIGHT_GREEN);
AddCloud(if showRSMShade and RSI < 50 and SlowK < 50 and Value < Avg then Double.POSITIVE_INFINITY else Double.NaN, if RSI < 50 and SlowK < 50 and Value < Avg then Double.NEGATIVE_INFINITY else Double.NaN, Color.LIGHT_RED);


#################################################################
############   Labels disable / blockout as needed        #########
#################################################################
# - Trend Labels
AddLabel(showTrendLabels and(bnumDown != 0 or bnumUp != 0), "Trend BAR#: " + (if bnumUp > 0 then bnumUp else + bnumDown), if bnumUp > 0 then Color.GREEN else Color.RED);
AddLabel(showTrendLabels and(bnumDown != 0 or bnumUp != 0), "Trend @ $:" + (if bnumUp > 0 then closeUpTrendStart else + closeDownTrendStart), if bnumUp > 0 then Color.GREEN else Color.RED);
AddLabel(showTrendLabels, "Tot Bars:" + (if bnumUp > 0 then UpTrendBarCount else DownTrendBarCount), if bnumUp > 0 then Color.GREEN else Color.RED);
AddLabel(showTrendLabels, "RSM:" + (if UpTrend == 1 then "L" else if DownTrend == 1 then "S" else "I"), if UpTrend == 1 then Color.GREEN else if DownTrend == 1 then Color.RED else Color.GRAY);

# - ADR / ATR Labels Targets
AddLabel(openPrice and showADRLabels, "Open:" + dailyO, Color.ORANGE);

AddLabel(showADRLabels and(UpTrend or DownTrend), "Target #1: " + (if UpTrend then Round(oneADRPlus, 2) else if DownTrend then Round(oneADRMinus, 2) else Double.NaN) + " ", if UpTrend then Color.GREEN else if DownTrend then Color.RED else Color.GRAY);
AddLabel(showADRLabels and(UpTrend or DownTrend), "Target #2: " + (if UpTrend then Round(twoADRPlus, 2) else if DownTrend then Round(twoADRMinus, 2) else Double.NaN) + " ", if UpTrend then Color.GREEN else if DownTrend then Color.RED else Color.GRAY);
AddLabel(showADRLabels and(UpTrend or DownTrend), "Target #3: " + (if UpTrend then Round(threeADRPlus, 2) else if DownTrend then Round(threeADRMinus, 2) else Double.NaN) + " ", if UpTrend then Color.GREEN else if DownTrend then Color.RED else Color.GRAY);

# - Indicator Label
AddLabel(if showIndicatorLabels then yes else no, "RSI:" + Round(RSI, 2) + " | sK:" + Round(SlowK, 2) + " | Macd:" + Round(Value, 4) + "  ", Color.ORANGE);




#### ALERTS Sound
Alert(audibleAlerts and upArrow, "RSM UpTrend Started", Alert.BAR, Sound.Ding);
Alert(audibleAlerts and downArrow, "RSM DownTrend Started", Alert.BAR, Sound.Ding);