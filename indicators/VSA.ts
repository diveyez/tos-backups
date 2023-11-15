# VSA Modification
# original source: https://futures.io/thinkorswim-programming/3477-vsa-volume-spread-analysis-thinkorswim.html
# modified by: netarchitech
# 10.21.2019

# This is a conversion of the NinjaTrader VPA indicator.TOS does not support directional
# triangles and diamonds, so there are some differences.The triangles are left as is, just
# not pointing a specific direction.The diamonds have been replaced with circles.

# C_RP Original notes by cbritton are above.Changes made after 20100722 by Richard Paske
# are marked below by the C_RP comment tag.A few bugs were fixed.More significantly, the color
# scheme for symbols was changed radically in an attempt to map directional strength to hue based
# on the ROYGBIV color spectrum.In addition, a symbol's shape and its vertical position above or
# below a candle now imparts added meaning to it.In general, the strength of a symbol is assigned
# by its color and shape in that order.In certain circumstances a symbol's vertical offset from
# its candle's top or bottom strengthens the symbol's meaning.


#######################################################

# C_RP The next two comments are from the original comments by cbritton.
# The NT version used a LinRegSlopeSFX indicator for determining trends.Those have been
# replaced in this TOS version with a call to the built in LinearRegressionSlope indicator.


#######
# Arguments

input volumeEMALength = 30;
input narrowSpreadFactor = 0.7;
input wideSpreadFactor = 1.5;
input aboveAvgVolfactor = 1.5;
input ultraHighVolfactor = 2;
input highCloseFactor = 0.70;
input lowCloseFactor = 0.25;
input GdojiFactor = 0.2; # C_RP
input WickFactor = 0.1; # C_RP
input shortTermLength = 5; #C_RP
input midTermLength = 15; #C_RP
input longTermLength = 40; #C_RP
input hwb = 0.0; #C_RP
input colorBars = { false, default true }; #C_RP
input trendText = { false, default true };
input volumeDefinitions = { false, default true };
input alerts = { default false, true };


#######
#C_RP Global Colors
DefineGlobalColor("symbolWhite", Color.WHITE);


#######
# Calculations

rec spread = high - low;
def median = (high + low) / 2;
rec avgVolume = CompoundValue(volumeEMALength, ExpAverage(volume, volumeEMALength), Double.NaN);

# Calculate Volume moving average and it's standard deviation
rec sAvgVolume = CompoundValue(volumeEMALength, Average(volume, volumeEMALength), Double.NaN);
def sAvgVolumeSTD = StDev(sAvgVolume, volumeEMALength);

# check if the volume has been decreasing in the past two days.
def isTwoDaysLowVol = (volume < volume[1] && volume[0] < volume[2]);

# Calculate Range information
def avgSpread = WildersAverage(spread, volumeEMALength)[0];
rec isWideSpreadBar = (spread > (wideSpreadFactor * avgSpread));
rec isNarrowSpreadBar = (spread < (narrowSpreadFactor * avgSpread));

# Price information
rec isUpBar = close > close[1];
rec isDownBar = close < close[1];

# Check if the close is in the Highs / Lows / Middle of the bar.
# C_RP 20100809
# original code - def x1 = if (close == low) then avgSpread else (spread / (close - low));
def x1 = if (high == low) then 2.0 else if (close == low) then 2.65 else (spread / (close - low));
# C_RP try the line below with various divisors totalSum result in a minimum of 2.3 on a spread of 1 pip instead of using a fixed 2.3 as in the line above
# def x1 = if (high == low) then 2.0 else if (close == low) then(spread / 0.43) else (spread / (close - low));

def isUpCloseBar = (x1 < 2);
def isDownCloseBar = (x1 > 2);
def isMidCloseBar = (x1 < 2.2 && x1 > 1.8);
def isVeryHighCloseBar = (x1 < 1.35);
# C_RP 20100809 added isVeryLowCloseBar
def isVeryLowCloseBar = (x1 >= 2.65);

# Trend Definitions
rec fiveDaysSma = CompoundValue(5, Average(close, 5)[0], Double.NaN);
def LongTermTrendSlope = LinearRegressionSlope(price = fiveDaysSma, length = longTermLength)[0]; # 40
def MiddleTermTrendSlope = LinearRegressionSlope(price = fiveDaysSma, length = midTermLength)[0]; # 15
def ShortTermTrendSlope = LinearRegressionSlope(price = fiveDaysSma, length = shortTermLength)[0]; # 5


######################################################################
#  VSA Definitions
            
# utbar
rec isUpThrustBar = isWideSpreadBar && isDownCloseBar && ShortTermTrendSlope > 0 && MiddleTermTrendSlope > 0; #C_RP added positive middleTermTrendSlope requirement to filter out upThrusts in trends that are only short term.Consider adding longTermTrendSlope requirement as well.
# utcond1
def upThrustConditionOne = (isUpThrustBar[1] && isDownBar);
# utcond2
def upThrustConditionTwo = (isUpThrustBar[1] && isDownBar[0] && volume > volume[1]);
# utcond3
def upThrustConditionThree = (isUpThrustBar[0] && volume > 2 * sAvgVolume[0]);
# scond1
rec isConfirmedUpThrustBar = (upThrustConditionOne or upThrustConditionTwo or upThrustConditionThree);
# scond
rec isNewConfirmedUpThrustBar = (isConfirmedUpThrustBar[0] && !isConfirmedUpThrustBar[1]);

# Two Period UpThrust Bar
rec isTwoPerUpT = isUpBar[1] && isWideSpreadBar[1] && isDownBar[0] && isDownCloseBar[0] && !isUpThrustBar[0] && (AbsValue(open[1] - close[0]) < (GdojiFactor * spread[1]));

# Three Period UpThrust Bar
rec isThreePerUpT = isUpBar[2] && isWideSpreadBar[2] && isDownBar[0] && isDownCloseBar[0] && !isUpThrustBar[0] && (AbsValue(open[2] - close[0]) < (GdojiFactor * spread[2]));

#  C_RP 20100816 rec isGraveDojiBar = (spread > avgSpread) && (open == low) && (close == low); totally strict Gravestone Doji.Revised version below identifies a candle with above average spread, a real body smaller than 20 % of the spread, and a lower wick less than 10 % of the spread as a Gravestone Doji pictured as a white triangle above the candle.

rec isGraveDojiBar = (spread > avgSpread) && (AbsValue(open - close) < (GdojiFactor * spread)) && ((AbsValue(close - low) < (WickFactor * spread)) or(AbsValue(open - low) < (WickFactor * spread))); # less strict Gravestone Doji

rec isHammerBar = (spread > avgSpread) && (AbsValue(open - close) < (GdojiFactor * spread)) && ((AbsValue(close - high) < (WickFactor * spread)) or(AbsValue(open - high) < (WickFactor * spread))); # opposite of a less strict Gravestone Doji

#  trbar
def reversalLikelyBar = (volume[1] > sAvgVolume[0] && isUpBar[1] && isWideSpreadBar[1] && isDownBar[0] && isDownCloseBar && isWideSpreadBar[0] && LongTermTrendSlope > 0 && high == Highest(high, 10)[0]);
            
# hutbar
rec isPseudoUpThrustBar = (isUpBar[1] && (volume[1] > aboveAvgVolfactor * sAvgVolume[0]) && isDownBar[0] && isDownCloseBar && !isWideSpreadBar[0] && !isUpThrustBar[0]);
# hutcond
def pseudoUpThrustConfirmation = (isPseudoUpThrustBar[1] && isDownBar[0] && isDownCloseBar && !isUpThrustBar[0]);

# C_RP Failed UpThrustConfirmation or pseudoUpThrustConfirmation occurs when the close of bar following such confirmation is not lower than the close of the confirmation bar

rec isFailedUpThrustConfirmation = (isNewConfirmedUpThrustBar[1] or pseudoUpThrustConfirmation[1]) && close[0] >= close[1];

# tcbar
def weaknessBar = (isUpBar[1] && high[0] == Highest(high, 5)[0] && isDownBar[0] && (isDownCloseBar or isMidCloseBar) && volume[0] > sAvgVolume[0] && !isWideSpreadBar[0] && !isPseudoUpThrustBar[0]);

# stdn, stdn0, stdn1, stdn2
def strengthInDownTrend = (volume[0] > volume[1] && isDownBar[1] && isUpBar[0] && (isUpCloseBar or isMidCloseBar) && ShortTermTrendSlope < 0 && MiddleTermTrendSlope < 0);
def strengthInDownTrend0 = (volume[0] > volume[1] && isDownBar[1] && isUpBar[0] && (isUpCloseBar or isMidCloseBar) && ShortTermTrendSlope < 0 && MiddleTermTrendSlope < 0 && LongTermTrendSlope < 0);
def strengthInDownTrend1 = (volume[0] > (sAvgVolume[0] * aboveAvgVolfactor) && isDownBar[1] && isUpBar[0] && (isUpCloseBar or isMidCloseBar) && ShortTermTrendSlope < 0 && MiddleTermTrendSlope < 0 && LongTermTrendSlope < 0);
def strengthInDownTrend2 = (volume[1] < sAvgVolume[0] && isUpBar[0] && isVeryHighCloseBar && volume[0] > sAvgVolume[0] && ShortTermTrendSlope < 0);

rec bycond1 = (strengthInDownTrend or strengthInDownTrend1);

# bycond
def isStrengthConfirmationBar = (isUpBar[0] && bycond1[1]);

# bycond2 C_RP UpClose on higher volume with all slopes down adds extra strength
def isStrengthConfirmationBar2 = (isUpBar[0] && isUpCloseBar[0] && volume[0] > volume[1] && LongTermTrendSlope < 0 && bycond1[1]);

# Failed strength in downtrend signal force a follow - up bar that closes below mid - point of confirmaton bar C_RP

def isFailedStrengthSignal = (isStrengthConfirmationBar[1] or isStrengthConfirmationBar2[1] or strengthInDownTrend2[1]) && close[0] <= (close[1] - (spread[1] / 2));

# stvol
def stopVolBar = low[0] == Lowest(low, 5)[0] && (isUpCloseBar or isMidCloseBar) && volume[0] > aboveAvgVolfactor * sAvgVolume[0] && LongTermTrendSlope < 0;

# C_RP stvol at highs - the opposite of stvol
def stopVolBarHighs = high[0] == Highest(high, 5)[0] && (isDownCloseBar or isMidCloseBar) && volume[0] > aboveAvgVolfactor * sAvgVolume[0] && LongTermTrendSlope > 0;

# ndbar, nsbar
def noDemandBar = (isUpBar[0] && isNarrowSpreadBar[0] && isTwoDaysLowVol && isDownCloseBar);
# C_RP 20100809
# def noSupplyBar = (isDownBar[0] && isNarrowSpreadBar[0] && isTwoDaysLowVol && isDownCloseBar);
def noSupplyBar = (isDownBar[0] && isNarrowSpreadBar[0] && isTwoDaysLowVol && isUpCloseBar);

# lvtbar, lvtbar1, lvtbar2
rec supplyTestBar = (isTwoDaysLowVol && low[0] < low[1] && isUpCloseBar);
def supplyTestInUpTrendBar = (volume[0] < sAvgVolume[0] && low[0] < low[1] && isUpCloseBar && LongTermTrendSlope > 0 && MiddleTermTrendSlope > 0 && isWideSpreadBar[0]);
def successfulSupplyTestBar = (supplyTestBar[1] && isUpBar[0] && isUpCloseBar);

def successfulSupplyTestBar2 = (successfulSupplyTestBar[1] && isUpBar[0] && x1 <= 2 && volume[0] > volume[1]); # C_RP x1 finds Mid and UpCloseBars
            
# dbar
def distributionBar = (volume[0] > ultraHighVolfactor * sAvgVolume[0] && isDownCloseBar && isUpBar[0] && ShortTermTrendSlope > 0 && MiddleTermTrendSlope > 0 && !isConfirmedUpThrustBar[0] && !isUpThrustBar[0]);

# eftup, eftupfl, eftdn
def effortToMoveUpBar = (high[0] > high[1] && low[0] > low[1] && close[0] > close[1] && close[0] >= ((high[0] - low[0]) * highCloseFactor + low[0]) && spread[0] > avgSpread && volume[0] > volume[1]);
def failedEffortUpMove = (effortToMoveUpBar[1] && (isUpThrustBar[0] or upThrustConditionOne or upThrustConditionTwo or upThrustConditionThree));

def effortToMoveDownBar = (((high[0] < high[1]) or(isWideSpreadBar && volume[0] > 1.5 * sAvgVolume[0]))  && low[0] < low[1] && close[0] < close[1] && close[0] <= ((high[0] - low[0]) * lowCloseFactor + low[0]) && spread[0] > avgSpread && volume[0] > volume[1]);


#C_RP old code - def effortToMoveDownBar = (high[0] < high[1] && low[0] < low[1] && close[0] < close[1] && Close[0] <= ((high[0] - low[0]) * lowCloseFactor + low[0]) && spread[0] > avgSpread && volume[0] > volume[1]);

def hwbReaction = (hwb != 0.0); #C_RP

######################################################################
# set the shapes on the graph

# upthurst and NOT confirmed - red square on top
plot upThrustBarPlot = if isUpThrustBar[0] and!isNewConfirmedUpThrustBar[0] then(high + 2 * TickSize()) else Double.NaN;
upThrustBarPlot.SetPaintingStrategy(PaintingStrategy.LINE_VS_SQUARES);
upThrustBarPlot.SetStyle(Curve.POINTS);
upThrustBarPlot.SetDefaultColor(Color.RED);
upThrustBarPlot.HideBubble();
upThrustBarPlot.HideTitle();

# new confirmed upthrust bar - red triangle(down) on top C_RP for upThrustConditionOne only
plot isNewConfirmedUpThrustBarPlot = if isNewConfirmedUpThrustBar && upThrustConditionOne then(high + 2 * TickSize()) else Double.NaN;
isNewConfirmedUpThrustBarPlot.SetPaintingStrategy(PaintingStrategy.LINE_VS_TRIANGLES);
isNewConfirmedUpThrustBarPlot.SetDefaultColor(Color.RED);
isNewConfirmedUpThrustBarPlot.HideBubble();
isNewConfirmedUpThrustBarPlot.HideTitle();

# new confirmed upthrust bar - red triangle(down) on top C_RP red arrow down at 4 * tickSize for conditions 2 and 3
plot isNewConfirmedUpThrustBarPlot23 = if isNewConfirmedUpThrustBar && (upThrustConditionTwo or upThrustConditionThree) then(high + 4 * TickSize()) else Double.NaN;
isNewConfirmedUpThrustBarPlot23.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
isNewConfirmedUpThrustBarPlot23.SetDefaultColor(Color.RED);
isNewConfirmedUpThrustBarPlot23.HideBubble();
isNewConfirmedUpThrustBarPlot23.HideTitle();

# strength in down trend - green square on bottom C_RP for next - to - weakest strengthInDownTrend
plot strengthInDownTrend1Plot = if strengthInDownTrend1 then(low - 4 * TickSize()) else Double.NaN;
strengthInDownTrend1Plot.SetPaintingStrategy(PaintingStrategy.LINE_VS_SQUARES);
strengthInDownTrend1Plot.SetDefaultColor(Color.GREEN);
strengthInDownTrend1Plot.HideBubble();
strengthInDownTrend1Plot.HideTitle();

# green triangle up at bottom of the bar C_RP Green arrow up 4 * tickSize for strong strength_In_DownTrend
plot isStrengthConfirmationBarPlot = if isStrengthConfirmationBar then(low - 4 * TickSize()) else Double.NaN;
isStrengthConfirmationBarPlot.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
isStrengthConfirmationBarPlot.SetDefaultColor(Color.GREEN);
isStrengthConfirmationBarPlot.HideBubble();
isStrengthConfirmationBarPlot.HideTitle();

# green triangle up at bottom of the bar C_RP Green arrow up 7 * tickSize for strongest strength_In_DownTrend with isUpCloseBar
plot isStrengthConfirmationBarPlot2 = if isStrengthConfirmationBar2 then(low - 7 * TickSize()) else Double.NaN;
isStrengthConfirmationBarPlot2.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
isStrengthConfirmationBarPlot2.SetDefaultColor(Color.GREEN);
isStrengthConfirmationBarPlot2.HideBubble();
isStrengthConfirmationBarPlot2.HideTitle();

# Failed UpthrustBarPlot Confirmation plots a green square 2 * tickSize above the failed bar C_RP
plot FailedUpThrustConfirmationPlot = if isFailedUpThrustConfirmation then(high + 2 * TickSize()) else Double.NaN;
FailedUpThrustConfirmationPlot.SetPaintingStrategy(PaintingStrategy.LINE_VS_SQUARES);
FailedUpThrustConfirmationPlot.SetDefaultColor(Color.GREEN);
FailedUpThrustConfirmationPlot.HideBubble();
FailedUpThrustConfirmationPlot.HideTitle();

# Failed strength in downtrend signal plots red square at candle's bottom. Under rare conditions a strengthinDownTrend2 green triangle can be overwritten by a successfulsupplyTest cyan triangle below the previous bar. If the bar following the cyan triangle is a FailedStrengthSignal a red square will be plotted on the following bar which is a desirable artifact of this coincidence. C_RP
plot failedstrengthsignalPlot = if isFailedStrengthSignal then(low - 2 * TickSize()) else Double.NaN;
failedstrengthsignalPlot.SetPaintingStrategy(PaintingStrategy.LINE_VS_SQUARES);
failedstrengthsignalPlot.SetDefaultColor(Color.RED);
failedstrengthsignalPlot.HideBubble();
failedstrengthsignalPlot.HideTitle();

# effort to move up - red circle in the median of the bar
plot effortToMoveUpBarPlot = if effortToMoveUpBar then(median) else Double.NaN;
effortToMoveUpBarPlot.SetPaintingStrategy(PaintingStrategy.LINE_VS_POINTS);
effortToMoveUpBarPlot.SetDefaultColor(CreateColor(255, 0, 0));
effortToMoveUpBarPlot.HideBubble();
effortToMoveUpBarPlot.HideTitle();

# effort to move down - green circle in the median of the bar
plot effortToMoveDownBarPlot = if effortToMoveDownBar && !(ShortTermTrendSlope < 0 && MiddleTermTrendSlope < 0 && LongTermTrendSlope < 0) then(median) else Double.NaN;
effortToMoveDownBarPlot.SetPaintingStrategy(PaintingStrategy.LINE_VS_POINTS);
effortToMoveDownBarPlot.SetDefaultColor(CreateColor(0, 255, 0));
effortToMoveDownBarPlot.HideBubble();
effortToMoveDownBarPlot.HideTitle();

# effort to move down - green circle in the median of the bar
plot effortToMoveDownBarPlotYel = if effortToMoveDownBar && ShortTermTrendSlope < 0 && MiddleTermTrendSlope < 0 && LongTermTrendSlope < 0 then(median) else Double.NaN;
effortToMoveDownBarPlotYel.SetPaintingStrategy(PaintingStrategy.LINE_VS_POINTS);
effortToMoveDownBarPlotYel.SetDefaultColor(CreateColor(0, 255, 0));
effortToMoveDownBarPlotYel.HideBubble();
effortToMoveDownBarPlotYel.HideTitle();



######
# Candle definitions

AssignPriceColor( if colorBars and shortTermTrendSlope > 0 and MiddleTermTrendSlope > 0 and longtermtrendslope > 0 then CreateColor(0, 255, 0) # UUU Green
else if colorBars and shortTermTrendSlope > 0 and MiddleTermTrendSlope > 0 and longtermtrendslope < 0 then Createcolor(153, 255, 102) # UUD Lime Green
else if colorBars and shortTermTrendSlope > 0 and MiddleTermTrendSlope < 0 and longtermtrendslope < 0 then Createcolor(153, 255, 255) # UDD Light Cyan
else if colorBars and shortTermTrendSlope < 0 and MiddleTermTrendSlope < 0 and longtermtrendslope < 0 then Color.red # DDD Red
else if colorBars and shortTermTrendSlope < 0 and MiddleTermTrendSlope > 0 and longtermtrendslope > 0 then color.yellow # DUU Yellow
else if colorBars and shortTermTrendSlope < 0 and MiddleTermTrendSlope < 0 and longtermtrendslope > 0 then color.orange # DDU Orange
else if colorBars then createcolor(153, 153, 153) else Color.CURRENT); # all other combinations are Light Gray


#######
# Trend Text Definitions
# C_RP 20100722 edited by Richard Paske to shorten text
# C_RP some colors changed to match symbols with text backgrounds

#AddChartLabel(trendText, concat("Vol: ", if volume > sAvgVolume[0] + 2.0 * sAvgVolumeSTD then "VH"
#    else if Volume[0] > (sAvgVolume[0] + 1.0 * sAvgVolumeSTD) then "H"
#    else if (Volume[0] > sAvgVolume[0]) then ">Avg"
#    else if (Volume[0] < sAvgVolume[0] && Volume[0] > (sAvgVolume[0] - 1.0 * sAvgVolumeSTD)) then "<Avg"
#    else if (Volume[0] < (sAvgVolume[0] - 1.0 * sAvgVolumeSTD)) then "L"
#    else ""), Color.white);
#AddChartLabel(trendText, concat("Spr: ", if (spread > (avgSpread * 2.0)) then "W"
#    else if (spread > avgSpread) then ">Avg"
#    else "N"), Color.white);

# C_RP 20100809 added isVeryLowCloseBar and changed execution order so that both Verys and Mid execute first
#AddChartLabel(trendText, concat("Cls: ", if (isVeryHighCloseBar) then "VH"
#    else if (isVeryLowCloseBar) then "VL"
#    else if (isMidCloseBar) then "M"
#    else if (isUpCloseBar) then "H"
#    else if (isDownCloseBar) then "D"
#    else "NC"), Color.white);

AddLabel(trendText, Concat("Trd: ", Concat("St-", if (ShortTermTrendSlope > 0) then "U" else "D")), Color.WHITE);

AddLabel(trendText, Concat("Mt-", if (MiddleTermTrendSlope > 0) then "U" else "D"), Color.WHITE);

AddLabel(trendText, Concat("Lt-", if (LongTermTrendSlope > 0) then "U" else "D"), Color.WHITE);


######
# Volume Bar Definitions

AddLabel(volumeDefinitions, if isUpThrustBar[0] then "Weakness on UpThrust" #C_RP Red Square
    else if upThrustConditionOne then "Weakness confirmed on Downbar after UpThrust" #C_RP Red Triangle
    else if upThrustConditionTwo && !upThrustConditionOne then "Weakness confirmed on High-volume Downbar after UpThrust" #C_RP Red DownArrow
    else if upThrustConditionThree then "Weakness confirmed on High-volume UpThrust" #C_RP Red DownArrow
    else if isTwoPerUpT then "Weakness on 2-period UpThrust" #C_RP Magenta Triangle
    else if isThreePerUpT then "Weakness on 3-period UpThrust" #C_RP Magenta Triangle
    else if isGraveDojiBar then "Reversal possible on Gravestone Doji" #C_RP White Triangle
    else if isHammerBar then "Reversal possible on Hammer Doji" #C_RP White Triangle
    else if strengthInDownTrend then "Strength returning in Downtrend" #C_RP Cyan Square
    else if strengthInDownTrend0  then "Strength returning in long Downtrend" #C_RP Cyan Square
    else if strengthInDownTrend1 then "Strength returning on High Volume in Downtrend" #C_RP Green Square
    else if strengthInDownTrend2  then "Strength on High-volume UpBar closing on High" #C_RP Green Triangle
    else if supplyTestBar[0] then "Test for Supply" #C_RP White Square
    else if successfulSupplyTestBar[0] then "Strength confirmed on UpBar closing Near High after Test" #C_RP Cyan Triangle
    else if isStrengthConfirmationBar then "Strength confirmed on UpBar" #C_RP Green UpArrow
    else if isStrengthConfirmationBar2 then "Strength confirmed on UpBar closing Near High" #C_RP Two Green UpArrows
    else if isFailedStrengthSignal then "Bearish on Failed Strength Confirmation in downtrend" #C_RP Red Square
    else if distributionBar then "Distribution on High-volume UpBar closing Down in Uptrend" #C_RP Magenta Square
    else if isPseudoUpThrustBar[0] then "Weakness on Pseudo-UpThrust." #C_RP Orange Square
    else if pseudoUpThrustConfirmation then "Weakness confirmed on DownBar closing Down after PseudoUpThrust" #C_RP Orange Triangle
    else if isFailedUpThrustConfirmation then "Less Bearish on Failed UpThrust Confirmation" #C_RP Green Square
    else if supplyTestInUpTrendBar then "Test for Supply in Uptrend" #C_RP Gray Square
    else if weaknessBar then "Weakness on High-volume DownBar after High-volume UpMove" #C_RP Yellow Triangle
    else if noDemandBar then "Weakness on No Demand" #C_RP Orange Circle
    else if noSupplyBar then "Strength on No Supply" #C_RP Cyan Circle
    else if effortToMoveUpBar[0] then "Bullish on Effort-to-Rise" #C_RP Green Circle on middle of Bar
    else if effortToMoveDownBar then "Bearish on Effort-to-Fall" #C_RP Magenta or Yellow Circle on middle of Bar
    else if failedEffortUpMove then "Bearish on Failed Effort-to-Rise" #C_RP no symbol for this indication
    else if stopVolBar then "Stopping Volume at Lows indicates Downtrend end likely" #C_RP Green Circle
    else if stopVolBarHighs then "Stopping Volume at Highs indicates Uptrend end likely" #C_RP Yellow Circle
    else "",
  if isUpThrustBar[0] then Color.RED
    else if upThrustConditionOne then Color.RED
    else if upThrustConditionTwo && !upThrustConditionOne then Color.RED
    else if upThrustConditionThree then Color.RED
    else if isTwoPerUpT then Color.MAGENTA
    else if isThreePerUpT then Color.MAGENTA
    else if isGraveDojiBar or isHammerBar then CreateColor(255, 255, 255)
    else if strengthInDownTrend1 then Color.GREEN
    else if strengthInDownTrend0 && !strengthInDownTrend then Color.CYAN
    else if strengthInDownTrend && !strengthInDownTrend1 then Color.CYAN
    else if isFailedStrengthSignal then Color.RED
    else if supplyTestBar[0] then GlobalColor("symbolWhite")
    else if successfulSupplyTestBar[0] then CreateColor(102, 255, 0)
    else if isStrengthConfirmationBar then Color.GREEN
    else if distributionBar then Color.MAGENTA
    else if isPseudoUpThrustBar[0] then(CreateColor(255, 102, 102))
else if pseudoUpThrustConfirmation then(CreateColor(255, 102, 102))
else if isFailedUpThrustConfirmation then(Color.GREEN)
else if supplyTestInUpTrendBar then CreateColor(153, 153, 153)
    else if strengthInDownTrend2 then Color.GREEN
    else if weaknessBar then Color.YELLOW
    else if noDemandBar then CreateColor(255, 102, 102)
    else if noSupplyBar then Color.CYAN
    else if effortToMoveUpBar[0] then CreateColor(0, 255, 0)
    else if effortToMoveDownBar then Color.MAGENTA
    else if failedEffortUpMove then Color.BLUE
    else if stopVolBar then Color.GREEN
    else if stopVolBarHighs then Color.YELLOW
    else Color.BLACK);

########
# Alerts

Alert(if alerts and(isUpThrustBar[0]
     or upThrustConditionOne
     or(upThrustConditionTwo && !upThrustConditionOne)
     or upThrustConditionThree
     or strengthInDownTrend1
     or(strengthInDownTrend0 && !strengthInDownTrend)
     or(strengthInDownTrend && !strengthInDownTrend1)
     or supplyTestBar[0]
     or successfulSupplyTestBar[0]
     or isStrengthConfirmationBar
     or distributionBar
     or isPseudoUpThrustBar[0]
     or pseudoUpThrustConfirmation
     or supplyTestInUpTrendBar
     or strengthInDownTrend2
     or weaknessBar
     or noDemandBar
     or noSupplyBar
     or effortToMoveUpBar[0]
     or effortToMoveDownBar
     or failedEffortUpMove
     or stopVolBar) then 1 else 0, if isUpThrustBar[0] then "An Upthrust Bar. A sign of weakness."
    else if upThrustConditionOne then "A downbar after an Upthrust. Confirm weakness."
    else if upThrustConditionTwo && !upThrustConditionOne then "A High Volume downbar after an Upthrust. Confirm weakness."
    else if upThrustConditionThree then "This upthrust at very High Volume, Confirms weakness."
    else if strengthInDownTrend1 then "Strength seen returning after a down trend. High volume adds to strength. "
    else if strengthInDownTrend0 && !strengthInDownTrend then "Strength seen returning after a down trend."
    else if strengthInDownTrend && !strengthInDownTrend1 then "Strength seen returning after a long down trend."
    else if supplyTestBar[0] then "Test for supply."
    else if successfulSupplyTestBar[0] then "An Upbar closing near High after a Test confirms strength."
    else if isStrengthConfirmationBar then "An Upbar closing near High. Confirms return of Strength."
    else if distributionBar then "A High Volume Up Bar closing down in a uptrend shows Distribution."
    else if isPseudoUpThrustBar[0] then "Psuedo UpThrust.  A Sign of Weakness."
    else if pseudoUpThrustConfirmation then "A Down Bar closing down after a Pseudo Upthrust confirms weakness."
    else if supplyTestInUpTrendBar then "Test for supply in a uptrend. Sign of Strength."
    else if strengthInDownTrend2 then "High volume upbar closing on the high indicates strength."
    else if weaknessBar then "High volume Downbar after an upmove on high volume indicates weakness."
    else if noDemandBar then "No Demand. A sign of Weakness."
    else if noSupplyBar then "No Supply. A sign of Strength."
    else if effortToMoveUpBar[0] then "Effort to Rise. Bullish sign."
    else if effortToMoveDownBar then "Effort to Fall. Bearish sign."
    else if failedEffortUpMove then "Effort to Move up has failed. Bearish sign."
    else if stopVolBar then "Stopping volume. Normally indicates end of bearishness is nearing."
    else "", Alert.BAR, Sound.Ding);