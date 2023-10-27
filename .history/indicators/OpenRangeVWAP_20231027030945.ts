

# Opening Range w / VWAP
# Created by @tony_futures
# Inspired by @mighigandolf 's tweets

declare hide_on_daily;
input displayType = { "At timed start", default  "From RTH Start" };
input startTime = 0930;
input End_Time = 0945;
input showTodayOnly = no;
input showLabels = yes;
input showVWAP = yes;
input showVWAPDevs = yes;
def RTH;

switch (displayType) {
    case "At Timed Start":
        RTH = secondsFromTime(startTime) >= 0;

    case "From RTH Start":
        RTH = GetTime() >= RegularTradingStart(GetYYYYMMDD());
}
input anchorTime = 0930;
input anchorEnd = 1600;
def postAnchorTime = if SecondsFromTime(anchorTime) >= 0 then 1 else 0;
def endAchorTime = if SecondsTillTime(anchorEnd) >= 0 then 1 else 0;
def endPlot = secondsFromTime(anchorEnd) >= 0;
def Today = GetLastDay() == GetDay();
def ORActive = (Today OR!showTodayOnly) and RTH and SecondsFromTime(End_Time) < 0;

def ORhigh = if RTH and!RTH[1] then high else if RTH and ORActive and high > ORhigh[1] then high else ORhigh[1];
def ORlow = if RTH and!RTH[1] then low else if RTH and ORActive and low < ORlow[1] then low else ORlow[1];
def OROpen = if RTH and!RTH[1] then open else OROpen[1];
def ORClose = if !ORActive and ORActive[1] then close[1] else ORClose[1];
def ORFullRange = AbsValue(ORHigh - ORLow);
def midPoint = ORLow + (ORFullRange / 2);

AddLabel(showLabels, "Open: " + OROpen + " | Close: " + ORClose + " | Range: " + ORFullRange + " |", Color.WHITE);

# setup Colors
DefineGlobalColor("quarterColor", CreateColor(169, 169, 169));
DefineGlobalColor("midColor", CreateColor(132, 76, 130));
DefineGlobalColor("rangeColor", CreateColor(28, 96, 109));
DefineGlobalColor("openColor", CreateColor(109, 84, 44));
DefineGlobalColor("downColor", CreateColor(109, 42, 28));
DefineGlobalColor("upColor", CreateColor(76, 133, 78));
DefineGlobalColor("vwapColor", CreateColor(174, 157, 50));
#

def OREnded = (Today OR!showTodayOnly) and RTH and SecondsFromTime(End_Time) >= 0;
plot ORL = if OREnded and!endPlot then ORlow else Double.NaN;
ORL.SetDefaultColor(GlobalColor("rangeColor"));
ORL.HideBubble();
plot ORH = if OREnded and!endPlot then ORhigh else Double.NaN;
ORH.SetDefaultColor(GlobalColor("rangeColor"));
ORH.HideBubble();
input showMidPoint = yes;

plot mid = if OREnded and!endPlot then midPoint else Double.NaN;
mid.setDefaultColor(GlobalColor("midColor"));
mid.HideBubble();
input showQuarters = no;
def oneQuarter = ORLow + (ORFullRange / 4);
def threeQuarter = ORHigh - (ORFullRange / 4);
plot oneQLine = if showQuarters and OREnded and!endPlot then oneQuarter else Double.NaN;
oneQLine.setDefaultColor(GlobalColor("quarterColor"));
oneQLine.HideBubble();
plot threeQLine = if showQuarters and OREnded and!endPlot then threeQuarter else Double.NaN;
threeQLine.setDefaultColor(GlobalColor("quarterColor"));
threeQLine.HideBubble();

input showMeasuredTargets = yes;
def upperTarget = (ORHigh + (ORFullRange / 2));
plot upper = if showMeasuredTargets and OREnded and!endPlot then upperTarget else Double.NaN;
upper.SetDefaultColor(GlobalColor("upColor"));
upper.HideBubble();
def lowerTarget = (ORLow - (ORFullRange / 2));
plot lower = if showMeasuredTargets and OREnded and!endPlot then lowerTarget else Double.NaN;
lower.SetDefaultColor(GlobalColor("downColor"));
lower.HideBubble();
input showMeasuredTargets2 = no;
def upperTarget2 = (ORHigh + (ORFullRange));
plot upper2 = if showMeasuredTargets2 and OREnded and!endPlot then upperTarget2 else Double.NaN;
upper2.SetDefaultColor(GlobalColor("upColor"));
upper2.HideBubble();
def lowerTarget2 = (ORLow - (ORFullRange));
plot lower2 = if showMeasuredTargets2 and OREnded and!endPlot then lowerTarget2 else Double.NaN;
lower2.SetDefaultColor(GlobalColor("downColor"));
lower2.HideBubble();

#plot anchored VWAP for the current day
def  volumeSum = CompoundValue(1, if postAnchorTime and endAchorTime then volumeSum[1] + volume else 0, volume);
def  volumeVwapSum = CompoundValue(1, if postAnchorTime and endAchorTime then volumeVwapSum[1] + volume * vwap else 0, volume * vwap);
def volumeVwap2Sum = CompoundValue(1, if postAnchorTime and endAchorTime then volumeVwap2Sum[1] + volume * Sqr(vwap) else 0, volume * Sqr(vwap));
def price = volumeVwapSum / volumeSum;
def deviation = Sqrt(Max(volumeVwap2Sum / volumeSum - Sqr(price), 0));

input stdDev = 1.0;
def numDevDn = -stdDev;
def numDevUp = stdDev;

plot anchorVWAP = if !showVWAP then Double.NAN else if showVWAP and showTodayOnly and!Today then Double.NaN else if RTH and showVWAP then price else Double.NaN;
anchorVWAP.SetStyle(Curve.FIRM);
anchorVWAP.SetDefaultColor(GlobalColor("vwapColor"));
plot anchorVWAPUpper = if !showVWAPDevs then Double.NaN else if showVWAPDevs and showTodayOnly and!Today then Double.NaN else if RTH and showVWAPDevs then(price + (numDevUp * deviation)) else Double.NaN;
anchorVWAPUpper.SetStyle(Curve.SHORT_DASH);
anchorVWAPUpper.SetDefaultColor(Color.GRAY);
anchorVWAPUpper.HideBubble();
plot anchorVWAPLower = if !showVWAPDevs then Double.NaN else if showVWAPDevs and showTodayOnly and!Today then Double.NaN else if RTH and showVWAPDevs then(price + (numDevDn * deviation)) else Double.NaN;
anchorVWAPLower.SetStyle(Curve.SHORT_DASH);
anchorVWAPLower.SetDefaultColor(Color.GRAY);
anchorVWAPLower.HideBubble();

input colorCandles = no;
AssignPriceColor(if !colorCandles then Color.CURRENT
else if colorCandles and OREnded and high < ORL and high < anchorVWAP then
GlobalColor("downColor")
else if colorCandles and OREnded and low > ORH and low > anchorVWAP then
GlobalColor("upColor")      
else Color.CURRENT );

input showOpen = yes;
AddVerticalLine(showOpen and Today and RTH and!RTH[1], concat("Open", ""), GlobalColor("openColor"), curve.POINTS);

input showBubbles = no;
def showBubbleNow = !IsNaN(close) and IsNaN(close[-1]);
AddChartBubble(showBubbles and showBubbleNow[1], ORHigh[1], "OR High", Color.GRAY, yes);
AddChartBubble(showBubbles and showBubbleNow[1], ORLow[1], "OR Low", Color.GRAY, no);

