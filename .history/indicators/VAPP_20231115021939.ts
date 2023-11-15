#ShadowTrader(Copyright ShadowTrader), a division of ShadowTrader Technologies, LLC. 2017. All rights reserved.This ShadowTrader Script is for educational purposes only.ShadowTrader is not responsible for the use, functionality or the performance of this Script.This work is copyrighted by ShadowTrader and all rights of this work under the license are reserved.Use of the ShadowTrader licensed code is for private use only and any other use are prohibited.By exercising any of the rights herein, you are accepting the terms of this license.You have a non - exclusive right to use or alter the ShadowTrader code.Use of this ShadowTrader Script other than as provided for in this license is prohibited.Any redistribution is strictly prohibited and will be enforced.

# A big ShadowTrader thank you to Justin Lane Williams for initially creating this script for us.
#08 / 31 / 11: Total redesign, added automated Pivot values, proximity plotting, new features.
#09 / 12 / 11: Added “ShowLevel4” option due to recent volitility.Will plot S4 & R4.
#12 / 11 / 11: Added “AfterHours” option to turn off plot after hours.
#12 / 21 / 11: Bug fixes due to TOS upgrades.Removed “AfterHours”, not workin correctly.
#01 / 25 / 12: Enter daily inputs as 4 digits and script will interpret.
# - added rounding to make the pivots appear as they do on the show.
#01 / 26 / 12: Removed ability to truncate inputs due to it only being accurate 99 % of time.
#02 /02 / 12: Small update to make sure "Auto Pivots" menu option functioned properly.
#06 /07 / 12: Added(6)VPOC inputs, should be manually entered / deleted, displays when applicable.
#06 / 25 / 12: Removed some code and fixed a few bugs.
#07 /09 / 12: Fixed one small but important bug.
#07 / 13 / 12: Added value bubbles, removed proximity plot function.
#08 / 13 / 12: Removed a lot of superfluous code plus a few upgrades.
#08 / 15 / 12: Fixed a bug that was giving false numbers.
#08 / 30 / 12: Fixed a bug that wasn't plotting the NQ profile.
#09 /02 / 12: Reordered inputs and removed "LabelESonly" input.
#12 / 28 / 12: Made the plot hide on daily charts and updated code to current standards.
#01 /04 / 13: Fixed a rare bug that hides labels if using tick charts.
#01 / 28 / 13: Added ability to hide each individual level.

# Pivot values will be off the day following market holidays and possibly the day after rollover.
# On these days make "AutoPivots=No" and manually draw pivots.Change back to "AutoPivots=Yes" the day after.

    #Inputs
input VAH = 2170.75; #Hint VAH: Must be manually entered daily, tinyurl.com / 3lbmu4o
input POC = 2166.75; #Hint POC: Must be manually entered daily, tinyurl.com / 3lbmu4o
input VAL = 2161.75; #Hint VAL: Must be manually entered daily, tinyurl.com / 3lbmu4o
input Pivot = 2164.75; #Hint Pivot: Must be manually entered daily, tinyurl.com / 3lbmu4o
input AutoPivots = yes; #Hint AutoPivots: Turns off pivot lines, value area stays on.
input Labels = { default "Proximity", "Off", "All", "ValueAreaOnly"}; #Hint Labels: Labels at top of chart.
input ShowPivotPoint = no; #Hint ShowPivotPoint: Hides Pivot Point plot.
input ShowLevel4 = no; #Hint ShowLevel4: Will display S4 and R4 for days with large moves.
input PivotBubbles = yes; #Hint PivotBubbles: Shows bubbles on pivot plot lines.
input ValueBubbles = yes; #Hint ValueBubbles: Shows bubbles on value plot lines.
input PlotStartTime = 0530; #Hint PlotStartTime: Move to earlier time to shift bubbles to the left.
input ShowCloud = yes; #Hint ShowCloud: Shows the value area as a cloud.
input CloudOpenOnly = yes; #Hint CloudOpenOnly: Will only cloud open candles.
input HideAfterHoursLabel = no; #Hint HideAfterHoursLabel: Hides "NoShadowPlotAfterHours" label.
input VpocBubbles = yes; #Hint VpocBubbles: Shows bubbles on VPOC plot lines.
input Vpoc1 = 0.00; #Hint Vpoc1: Manually enter / delete VPOC here, will display when applicable.
input Vpoc2 = 0.00; #Hint Vpoc2: Manually enter / delete VPOC here, will display when applicable.
input Vpoc3 = 0.00; #Hint Vpoc3: Manually enter / delete VPOC here, will display when applicable.
input Vpoc4 = 0.00; #Hint Vpoc4: Manually enter / delete VPOC here, will display when applicable.
input Vpoc5 = 0.00; #Hint Vpoc5: Manually enter / delete VPOC here, will display when applicable.
input Vpoc6 = 0.00; #Hint Vpoc6: Manually enter / delete VPOC here, will display when applicable.
input ShowS1 = yes; #Hint ShowS1: Hide / Show S1.
input ShowS2 = yes; #Hint ShowS2: Hide / Show S2.
input ShowS3 = yes; #Hint ShowS3: Hide / Show S3.
input ShowR1 = yes; #Hint ShowR1: Hide / Show R1.
input ShowR2 = yes; #Hint ShowR2: Hide / Show R2.
input ShowR3 = yes; #Hint ShowR3: Hide / Show R3.
input ShowORB = No; #Hint ShowORB: Displays 2 small, dashed lines at the top / bottom of opening range.
input OrbTime = 30; #Hint OrbTime: Defines the time range in minutes for the ORB.

def Na = Double.NaN;
declare hide_on_daily;

#Value Area Functions
def PPoint = If(Pivot > 0, Pivot, Na);
def VArea = Between(close, VAL, VAH);
def VAreaabove = close > VAH;
def VAreabelow = close < VAL;

#Previous Day Functions
def Day = GetDayOfWeek(GetYYYYMMDD());
def CloseTime = SecondsTillTime(1545) >= 0;
def OpenTime = SecondsFromTime(0930) >= 0;
def RegHrs = CloseTime and OpenTime;
def PLow = CompoundValue(1, If(Day == Day[1] and RegHrs and low < PLow[1], low, If(SecondsFromTime(0930) <= 0 and RegHrs, low, PLow[1])), low);
def PHigh = CompoundValue(1, If(Day == Day[1] and RegHrs and high > PHigh[1], high, If(SecondsFromTime(0930) <= 0 and RegHrs, high, PHigh[1])), high);
def PrevLow = If(Day != Day[1], PLow[1], PrevLow[1]);
def PrevHigh = If(Day != Day[1], PHigh[1], PrevHigh[1]);

#Time Functions
def CloseTime2 = SecondsTillTime(1600) >= 0;
def OpenTime2 = SecondsFromTime(PlotStartTime) >= 0;
def MarketOpen = OpenTime2 and CloseTime2;
def NewDay = IsNaN(close(period = “Day”)[-1]);
def Chart = MarketOpen and NewDay;

#Pivot Functions
def Res1 = (2 * PPoint) - PrevLow;
def Supp1 = (2 * PPoint) - PrevHigh;
def Res2 = PPoint + (Res1 - Supp1);
def Supp2 = PPoint - (Res1 - Supp1);
def Res3 = PrevHigh + 2 * (PPoint - PrevLow);
def Supp3 = PrevLow - 2 * (PrevHigh - PPoint);
def Res4 = PrevHigh + 3 * (PPoint - PrevLow);
def Supp4 = PrevLow - 3 * (PrevHigh - PPoint);

#Rounding Functions
def RI = RoundDown(Res1, 0) - ((Round(((RoundDown(Res1, 0) - Res1) / 0.25), 0)) * 0.25);
def SI = RoundDown(Supp1, 0) - ((Round(((RoundDown(Supp1, 0) - Supp1) / 0.25), 0)) * 0.25);
def RII = RoundDown(Res2, 0) - ((Round(((RoundDown(Res2, 0) - Res2) / 0.25), 0)) * 0.25);
def SII = RoundDown(Supp2, 0) - ((Round(((RoundDown(Supp2, 0) - Supp2) / 0.25), 0)) * 0.25);
def RIII = RoundDown(Res3, 0) - ((Round(((RoundDown(Res3, 0) - Res3) / 0.25), 0)) * 0.25);
def SIII = RoundDown(Supp3, 0) - ((Round(((RoundDown(Supp3, 0) - Supp3) / 0.25), 0)) * 0.25);
def RIV = RoundDown(Res4, 0) - ((Round(((RoundDown(Res4, 0) - Res4) / 0.25), 0)) * 0.25);
def SIV = RoundDown(Supp4, 0) - ((Round(((RoundDown(Supp4, 0) - Supp4) / 0.25), 0)) * 0.25);
def PivP = RoundDown(PPoint, 0) - ((Round(((RoundDown(PPoint, 0) - PPoint) / 0.25), 0)) * 0.25);

#Plots
plot VH = If(Chart and VAH > 0, VAH, Na);
plot PC = If(Chart and POC > 0, POC, Na);
plot VL = If(Chart and VAL > 0, VAL, Na);
plot R4 = If(Chart and AutoPivots and ShowLevel4 and RIV > 0, RIV, Na);
plot R3 = If(Chart and AutoPivots and ShowR3 and RIII > 0, RIII, Na);
plot R2 = If(Chart and AutoPivots and ShowR2 and RII > 0, RII, Na);
plot R1 = If(Chart and AutoPivots and ShowR1 and RI > 0, RI, Na);
plot PP = If(Chart and AutoPivots and ShowPivotPoint and PPoint > 0, PivP, Na);
plot S1 = If(Chart and AutoPivots and ShowS1 and SI > 0, SI, Na);
plot S2 = If(Chart and AutoPivots and ShowS2 and SII > 0, SII, Na);
plot S3 = If(Chart and AutoPivots and ShowS3 and SIII > 0, SIII, Na);
plot S4 = If(Chart and AutoPivots and ShowLevel4 and SIV > 0, SIV, Na);
plot V1 = If(Chart and Between(Vpoc1, SIV - 10, RIV + 10), Vpoc1, Na);
plot V2 = If(Chart and Between(Vpoc2, SIV - 10, RIV + 10), Vpoc2, Na);
plot V3 = If(Chart and Between(Vpoc3, SIV - 10, RIV + 10), Vpoc3, Na);
plot V4 = If(Chart and Between(Vpoc4, SIV - 10, RIV + 10), Vpoc4, Na);
plot V5 = If(Chart and Between(Vpoc5, SIV - 10, RIV + 10), Vpoc5, Na);
plot V6 = If(Chart and Between(Vpoc6, SIV - 10, RIV + 10), Vpoc6, Na);

#Value Area Cloud
def CloudClose = SecondsTillTime(1615) > 0;
def Cloud = OpenTime and CloudClose;
def ChartCloud = Cloud and Chart;
def CloudTest = If(CloudOpenOnly, ChartCloud, Chart);
plot cloudhigh = If(CloudTest and ShowCloud, VAH, Na);
plot cloudlow = If(CloudTest and ShowCloud, VAL, Na);
AddCloud(cloudhigh, cloudlow, Color.GRAY, Color.GRAY);
def AfterHours = OpenTime2 and CloudClose;

#Chart Labels
def Futures = Between(close, close("/es") - 15, close("/es") + 15) or Between(close, close("/nq") - 15, close("/nq") + 15);
def Label = Chart and Futures;
def ZeroTest = VAH > 0 and VAL > 0;
def PNotZero = PPoint > 0;
def ChartLabels;
switch (Labels) {
    case "Proximity":
        ChartLabels = 1;
    case "Off":
        ChartLabels = 0;
    case "All":
        ChartLabels = 2;
    case "ValueAreaOnly":
        ChartLabels = 3;
}
AddLabel(ChartLabels == 1 and Label and AutoPivots and VArea and ZeroTest, “InsideValue”, Color.WHITE);
AddLabel(ChartLabels == 1 and Label and AutoPivots and VAreaabove and ZeroTest, “AboveValue”, Color.GREEN);
AddLabel(ChartLabels == 1 and Label and AutoPivots and VAreabelow and ZeroTest, “BelowValue”, Color.RED);
AddLabel(ChartLabels == 1 and Label and!AutoPivots and VArea and ZeroTest, “InsideValueArea”, Color.WHITE);
AddLabel(ChartLabels == 1 and Label and!AutoPivots and VAreaabove and ZeroTest, “AboveValueArea”, Color.GREEN);
AddLabel(ChartLabels == 1 and Label and!AutoPivots and VAreabelow and ZeroTest, “BelowValueArea”, Color.RED);
AddLabel(ChartLabels == 1 and Label and AutoPivots and Between(close, VL, (RI + ((RII - RI) / 2))), "VH=" + AsText(VH), Color.RED);
AddLabel(ChartLabels == 1 and Label and AutoPivots and Between(close, VL, VH), "POC=" + AsText(PC), Color.YELLOW);
AddLabel(ChartLabels == 1 and Label and AutoPivots and Between(close, (SI - ((SI - SII) / 2)), VH), "VL=" + AsText(VL), Color.GREEN);
AddLabel(ChartLabels == 1 and Label and AutoPivots and(close > VH or(Between(RI, VL, VH) and close > VL)), "R1=" + AsText(RI), Color.RED);
AddLabel(ChartLabels == 1 and Label and AutoPivots and close > VH, "R2=" + AsText(RII), Color.RED);
AddLabel(ChartLabels == 1 and Label and AutoPivots and close > (RI + ((RII - RI) / 2)), "R3=" + AsText(RIII), Color.RED);
AddLabel(ChartLabels == 1 and Label and AutoPivots and ShowLevel4 and close > (RII + ((RIII - RII) / 2)), "R4=" + AsText(RIV), Color.RED);
AddLabel(ChartLabels == 1 and Label and AutoPivots and ShowPivotPoint and close > SI and close < RI, "PP=" + AsText(PP), Color.WHITE);
AddLabel(ChartLabels == 1 and Label and AutoPivots and(close < VL or(Between(SI, VL, VH) and close < VH)), "S1=" + AsText(SI), Color.GREEN);
AddLabel(ChartLabels == 1 and Label and AutoPivots and close < VL, "S2=" + AsText(SII), Color.GREEN);
AddLabel(ChartLabels == 1 and Label and AutoPivots and close < (SI - ((SI - SII) / 2)), "S3=" + AsText(SIII), Color.GREEN);
AddLabel(ChartLabels == 1 and Label and AutoPivots and ShowLevel4 and close < (SII - ((SII - SIII) / 2)), "S4=" + AsText(SIV), Color.GREEN);
AddLabel(ChartLabels == 1 and Label and AutoPivots and Between(close, (V1 - 5), (V1 + 5)), "VPOC=" + AsText(V1), Color.MAGENTA);
AddLabel(ChartLabels == 1 and Label and AutoPivots and Between(close, (V2 - 5), (V2 + 5)), "VPOC=" + AsText(V2), Color.MAGENTA);
AddLabel(ChartLabels == 1 and Label and AutoPivots and Between(close, (V3 - 5), (V3 + 5)), "VPOC=" + AsText(V3), Color.MAGENTA);
AddLabel(ChartLabels == 1 and Label and AutoPivots and Between(close, (V4 - 5), (V4 + 5)), "VPOC=" + AsText(V4), Color.MAGENTA);
AddLabel(ChartLabels == 1 and Label and AutoPivots and Between(close, (V5 - 5), (V5 + 5)), "VPOC=" + AsText(V5), Color.MAGENTA);
AddLabel(ChartLabels == 1 and Label and AutoPivots and Between(close, (V6 - 5), (V6 + 5)), "VPOC=" + AsText(V6), Color.MAGENTA);
AddLabel(ChartLabels == 2 and Label and ZeroTest, "VH=" + AsText(VH), Color.RED);
AddLabel(ChartLabels == 2 and Label and ZeroTest, "POC=" + AsText(PC), Color.YELLOW);
AddLabel(ChartLabels == 2 and Label and ZeroTest, "VL=" + AsText(VL), Color.GREEN);
AddLabel(ChartLabels == 2 and Label and AutoPivots and PNotZero, "R1=" + AsText(RI), Color.RED);
AddLabel(ChartLabels == 2 and Label and AutoPivots and PNotZero, "R2=" + AsText(RII), Color.RED);
AddLabel(ChartLabels == 2 and Label and AutoPivots and PNotZero, "R3=" + AsText(RIII), Color.RED);
AddLabel(ChartLabels == 2 and Label and AutoPivots and PNotZero and ShowLevel4, "R4=" + AsText(RIV), Color.RED);
AddLabel(ChartLabels == 2 and Label and AutoPivots and PNotZero and ShowPivotPoint, "PP=" + AsText(PP), Color.WHITE);
AddLabel(ChartLabels == 2 and Label and AutoPivots and PNotZero, "S1=" + AsText(SI), Color.GREEN);
AddLabel(ChartLabels == 2 and Label and AutoPivots and PNotZero, "S2=" + AsText(SII), Color.GREEN);
AddLabel(ChartLabels == 2 and Label and AutoPivots and PNotZero, "S3=" + AsText(SIII), Color.GREEN);
AddLabel(ChartLabels == 2 and Label and AutoPivots and PNotZero and ShowLevel4, "S4=" + AsText(SIV), Color.GREEN);
AddLabel(ChartLabels == 2 and Label and AutoPivots and PNotZero, "VPOC=" + AsText(V1), Color.MAGENTA);
AddLabel(ChartLabels == 2 and Label and AutoPivots and PNotZero, "VPOC=" + AsText(V2), Color.MAGENTA);
AddLabel(ChartLabels == 2 and Label and AutoPivots and PNotZero, "VPOC=" + AsText(V3), Color.MAGENTA);
AddLabel(ChartLabels == 2 and Label and AutoPivots and PNotZero, "VPOC=" + AsText(V4), Color.MAGENTA);
AddLabel(ChartLabels == 2 and Label and AutoPivots and PNotZero, "VPOC=" + AsText(V5), Color.MAGENTA);
AddLabel(ChartLabels == 2 and Label and AutoPivots and PNotZero, "VPOC=" + AsText(V6), Color.MAGENTA);
AddLabel(ChartLabels == 3 and Label and VArea and ZeroTest, “InsideValueArea”, Color.WHITE);
AddLabel(ChartLabels == 3 and Label and VAreaabove and ZeroTest, “AboveValueArea”, Color.GREEN);
AddLabel(ChartLabels == 3 and Label and VAreabelow and ZeroTest, "BelowValueArea”, Color.RED);
AddLabel(!AfterHours and!Chart and!HideAfterHoursLabel, "NoShadowPlotAfterHours", Color.ORANGE);

#Chart Bubbles
AddChartBubble(IsNaN(VH[1]) and ValueBubbles, VH, VH, Color.RED, no);
AddChartBubble(IsNaN(PC[1]) and ValueBubbles, PC, PC, Color.YELLOW, no);
AddChartBubble(IsNaN(VL[1]) and ValueBubbles, VL, VL, Color.GREEN, no);
AddChartBubble(IsNaN(S1[1]) and PivotBubbles, S1, “S1”, Color.WHITE, no);
AddChartBubble(IsNaN(S2[1]) and PivotBubbles, S2, “S2”, Color.WHITE, no);
AddChartBubble(IsNaN(S3[1]) and PivotBubbles, S3, “S3”, Color.WHITE, no);
AddChartBubble(IsNaN(S4[1]) and PivotBubbles and ShowLevel4, S4, “S4”, Color.WHITE, no);
AddChartBubble(IsNaN(PP[1]) and ShowPivotPoint and PivotBubbles, PP, “PP”, Color.WHITE, no);
AddChartBubble(IsNaN(R1[1]) and PivotBubbles, R1, “R1”, Color.WHITE, no);
AddChartBubble(IsNaN(R2[1]) and PivotBubbles, R2, “R2”, Color.WHITE, no);
AddChartBubble(IsNaN(R3[1]) and PivotBubbles, R3, “R3”, Color.WHITE, no);
AddChartBubble(IsNaN(R4[1]) and PivotBubbles and ShowLevel4, R4, “R4”, Color.WHITE, no);
AddChartBubble(IsNaN(V1[1]) and VpocBubbles, V1, “VPOC”, Color.MAGENTA, no);
AddChartBubble(IsNaN(V2[1]) and VpocBubbles, V2, “VPOC”, Color.MAGENTA, no);
AddChartBubble(IsNaN(V3[1]) and VpocBubbles, V3, “VPOC”, Color.MAGENTA, no);
AddChartBubble(IsNaN(V4[1]) and VpocBubbles, V4, “VPOC”, Color.MAGENTA, no);
AddChartBubble(IsNaN(V5[1]) and VpocBubbles, V5, “VPOC”, Color.MAGENTA, no);
AddChartBubble(IsNaN(V6[1]) and VpocBubbles, V6, “VPOC”, Color.MAGENTA, no);

#Opening Range Breakout Functions
def ORBopen = SecondsTillTime(945) <= 0;
def IsMarketOpen = ORBopen and CloseTime2;
def FirstBar = If(GetDay()[1] != GetDay(), GetDay() - 1, 0);
def OpenRange = SecondsFromTime(945);
def PastOpeningRange = OpenRange >= (OrbTime - 15) * 60;
def DisplayedHigh = If(high > DisplayedHigh[1] and IsMarketOpen and ShowORB, high, If(IsMarketOpen and!FirstBar, DisplayedHigh[1], high));
def DisplayedLow = If(low < DisplayedLow[1] and IsMarketOpen and ShowORB, low, If(IsMarketOpen and!FirstBar, DisplayedLow[1], low));
def ORBHi = If(PastOpeningRange, ORBHi[1], DisplayedHigh);
def ORBLo = If(PastOpeningRange, ORBLo[1], DisplayedLow);
plot ORBHigh = If(Chart and PastOpeningRange and IsMarketOpen and ShowORB, ORBHi, Na);
plot ORBLow = If(Chart and PastOpeningRange and IsMarketOpen and ShowORB, ORBLo, Na);

#Plot Criteria
ORBHigh.SetDefaultColor(Color.MAGENTA);
ORBHigh.SetStyle(Curve.SHORT_DASH);
ORBHigh.HideBubble();
ORBLow.SetDefaultColor(Color.MAGENTA);
ORBLow.SetStyle(Curve.SHORT_DASH);
ORBLow.HideBubble();
VH.SetDefaultColor(Color.RED);
PC.SetDefaultColor(Color.YELLOW);
PC.SetStyle(Curve.LONG_DASH);
VL.SetDefaultColor(Color.GREEN);
R4.SetDefaultColor(Color.WHITE);
R3.SetDefaultColor(Color.WHITE);
R2.SetDefaultColor(Color.WHITE);
R1.SetDefaultColor(Color.WHITE);
PP.SetDefaultColor(Color.WHITE);
S4.SetDefaultColor(Color.WHITE);
S3.SetDefaultColor(Color.WHITE);
S2.SetDefaultColor(Color.WHITE);
S1.SetDefaultColor(Color.WHITE);
V1.SetDefaultColor(Color.MAGENTA);
V1.SetStyle(Curve.LONG_DASH);
V2.SetDefaultColor(Color.MAGENTA);
V2.SetStyle(Curve.LONG_DASH);
V3.SetDefaultColor(Color.MAGENTA);
V3.SetStyle(Curve.LONG_DASH);
V4.SetDefaultColor(Color.MAGENTA);
V4.SetStyle(Curve.LONG_DASH);
V5.SetDefaultColor(Color.MAGENTA);
V5.SetStyle(Curve.LONG_DASH);
V6.SetDefaultColor(Color.MAGENTA);
V6.SetStyle(Curve.LONG_DASH);
cloudhigh.SetDefaultColor(Color.RED);
cloudlow.SetDefaultColor(Color.GREEN);