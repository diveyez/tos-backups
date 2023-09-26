#v1.1 - 5 / 10 / 18
# - Able to get Implied Volatity at any specified time.Default set to 9PM est  
# - Modified Settlement to take closing price of the last bar of the day.Previous version used "Closing Price" at 16: 15 which was usually nowhere near ending settlement
# - Added option to substitute symbol used in IV / Deviation calculation for instruments with #no option chains such as / NKD  
# - Added customizable deviation line(hidden as default)

# ===========================
    #Steps if you want your VA to match u / uberbotman's:
#1) Set your chart to 30M, and show extended hours
#2) Go to options, make sure ShowLabels is set to "Yes"(hit apply if needed)
#3) Copy VAH, POC and VAL from the labels in the top left corner of your chart into Manual input locations
#4) Set Value Area Area Mode to Manual

declare upper;
declare once_per_bar;
# ============================
#Inputs
# ============================

input SetMode = { default Auto, Manual }; #Hint SetMode: Select Auto to update Settlement automatically in input manually.\n\n NOTE: ToS doesn't support Settlement so LAST closing price is used. This is usually pretty close to within a single tick, but Manually entering Settlement from CME website or UBM's nightly post is more accurate
input Settlement = 2444.50; #Hint Settlement: Enter Settlement value when SetMode is set to Manual
input IVMode = { default Auto, Manual }; #Hint IVMode: Select Auto to update Implied Volatility at time chosen on IVSettleTime
input IVSettleTime = 2100; #Hint IVSettleTime: Enter time_value of desired Implied Volatility "settlement" \n\n NOTE: If time selected is not visible on chart(i.e. 2100 on a chart not showing extended trading hours), IV will not calculate
input Volatility = 11.2; #Hint Volatility: Enter Implied Volatility value when IVMode is set to Manual
input IVSymbolMode = { default Auto, Manual }; #Hint IVSymbolMode: Select Manual if you wish to use a different instrument's IV instead of what is on the chart
input Symbol = "EWJ"; #Hint Symbol: Enter symbol of Implied Volatility you wish to substitute with.For use with products with no option chains(i.e. / NKD)
input ValueAreaMode = { default Auto, Manual }; #Hint ValueAreaMode: Select Auto to update Value Areas automatically and is rounded to the nearest tick.Manual selection changes Value Area for today only \n\n NOTE: Value Area is typically calculated on a 30min chart, if the timeframe changes, then calculated value area may also change.To lock in the values from the 30min chart follow these steps: \n#1) Set your chart to 30M, and show extended hours \n#2) Go to options, make sure ShowLabels is set to "Yes"(hit apply if needed) \n#3) Copy VAH, POC and VAL from the labels showing in the top left corner of the chart into the Manual input locations \n#4) Set Value Area Area Mode to Manual and hit Apply
input ValueAreaHigh = 2445.00; #Hint ValueAreaHigh: Enter Value Area High when ValueAreaMode is set to Manual
input PointOfControl = 2442.00; #Hint PointOfControl: Enter Point of Control when ValueAreaMode is set to Manual
input ValueAreaLow = 2440.00; #Hint ValueAreaLow: Enter Value Area Low when ValueAreaMode is set to Manual
input ShowTodayOnly = { default "No", "Yes"}; #Hint ShowTodayOnly: Show / Hide chart plots for previous days
input ShowBubbles = { "No", default "Yes" }; #Hint ShowBubbles: Show / Hide chart bubbles
input ShowCloud = { "No", default "Yes" }; #Hint ShowCloud: Show / Hide Value Area cloud
input ShowLabels = { "No", default "Yes" }; #Hint ShowLabels: Show / Hide Labels with Value Area data and IV used for Std Deviation calculations in Auto setting
input ProfileType = { default Volume, Time }; #Hint ProfileType: Switch between Volume Profile and Time Profile
input valueAreaPercent = 70; #Hint valueAreaPercent: Set the size of the Value Area
input ShowVWAP = { "No", default "Yes" }; #Hint ShowVWAP: Show daily VWAP
input CustomDev = 3.5; #Hint CustomDev: Enter custom deviation line

# ============================
#Std Dev Calc / Plot
# ============================

def CloseTime2 = SecondsTillTime(0000) >= 0;
def OpenTime2 = SecondsFromTime(1700) >= 0;
def MarketOpen = OpenTime2 and CloseTime2;
def NewDay = IsNaN(close(period = “Day”)[-1]);
def Chart = MarketOpen and NewDay;
def bar = BarNumber();

def SettleTime = 1800;
rec SetTimeValue = if (secondstilltime(SettleTime) == 0, close()[1], SetTimeValue[1]);
def SetAtTime = if (SetTimeValue == 0, double.nan, SetTimeValue);

def Set = if SetMode == SetMode."Manual" and NewDay then Settlement else SetAtTime;

rec IVTimeValue = if (secondstilltime(IVSettleTime) == 0, imp_volatility(symbol = if IVSymbolMode == IVSymbolMode."Auto" then GetSymbol() else Symbol)[1], IVTimeValue[1]);
def IVSet = if (IVTimeValue == 0, double.nan, IVTimeValue);
def Vol = if IVMode == IVMode."Manual" and NewDay then Volatility else IVSet;


def a = Vol;
def b = a / Sqrt(252);
def SD = b * Set;


plot Settle = Round(If(MarketOpen, Set, If(ShowTodayOnly, Double.NaN, Set)) / TickSize(), 0) * TickSize();
Settle.SetDefaultColor(Color.DARK_GREEN);
Settle.SetStyle(Curve.FIRM);
Settle.SetLineWeight(2);
AddChartBubble(bar == HighestAll(bar) and ShowBubbles, Settle, "Set", Color.DARK_GREEN, no);

plot StdDev025H = Round(If(Chart, Set + (SD * 0.25), If(ShowTodayOnly, Double.NaN, Set + (SD * 0.25))) / TickSize(), 0) * TickSize();
StdDev025H.SetDefaultColor(Color.GRAY);
StdDev025H.SetStyle(Curve.SHORT_DASH);
AddChartBubble(bar == HighestAll(bar) and ShowBubbles, StdDev025H, "0.25 Std Dev ", Color.GRAY, no);

plot StdDev05H = Round(If(Chart, Set + (SD * 0.5), If(ShowTodayOnly, Double.NaN, Set + (SD * 0.5))) / TickSize(), 0) * TickSize();
StdDev05H.SetDefaultColor(Color.CYAN);
StdDev05H.SetStyle(Curve.SHORT_DASH);
AddChartBubble(bar == HighestAll(bar) and ShowBubbles, StdDev05H, "0.5 Std Dev ", Color.CYAN, no);

plot StdDev1H = Round(If(Chart, Set + (SD * 1), If(ShowTodayOnly, Double.NaN, Set + (SD * 1))) / TickSize(), 0) * TickSize();
StdDev1H.SetDefaultColor(Color.VIOLET);
StdDev1H.SetStyle(Curve.LONG_DASH);
AddChartBubble(bar == HighestAll(bar) and ShowBubbles, StdDev1H, "1 Std Dev", Color.VIOLET, no);

plot StdDev1_5H = Round(If(Chart, Set + (SD * 1.5), If(ShowTodayOnly, Double.NaN, Set + (SD * 1.5))) / TickSize(), 0) * TickSize();
StdDev1_5H.SetDefaultColor(Color.PLUM);
StdDev1_5H.SetStyle(Curve.LONG_DASH);
#AddChartBubble(bar == HighestAll(bar) and ShowBubbles, StdDev1_5H, "1.5 Std Dev", Color.PLUM, no);

plot StdDev2H = Round(If(Chart, Set + (SD * 2), If(ShowTodayOnly, Double.NaN, Set + (SD * 2))) / TickSize(), 0) * TickSize();
StdDev2H.SetDefaultColor(Color.PLUM);
StdDev2H.SetStyle(Curve.FIRM);
StdDev2H.SetLineWeight(3);
AddChartBubble(bar == HighestAll(bar) and ShowBubbles, StdDev2H, "2 Std Dev", Color.PLUM, no);

plot StdDev3H = Round(If(Chart, Set + (SD * 3), If(ShowTodayOnly, Double.NaN, Set + (SD * 3))) / TickSize(), 0) * TickSize();
StdDev3H.SetDefaultColor(Color.DARK_RED);
StdDev3H.SetStyle(Curve.FIRM);
StdDev3H.SetLineWeight(3);
AddChartBubble(bar == HighestAll(bar) and ShowBubbles, StdDev3H, "3 Std Dev", Color.DARK_RED, no);

plot StdDev025L = Round(If(Chart, Set + (SD * -0.25), If(ShowTodayOnly, Double.NaN, Set + (SD * -0.25))) / TickSize(), 0) * TickSize();
StdDev025L.SetDefaultColor(Color.GRAY);
StdDev025L.SetStyle(Curve.SHORT_DASH);
AddChartBubble(bar == HighestAll(bar) and ShowBubbles, StdDev025L, "-0.25 Std Dev", Color.GRAY, no);

plot StdDev05L = Round(If(Chart, Set + (SD * -0.5), If(ShowTodayOnly, Double.NaN, Set + (SD * -0.5))) / TickSize(), 0) * TickSize();
StdDev05L.SetDefaultColor(Color.CYAN);
StdDev05L.SetStyle(Curve.SHORT_DASH);
AddChartBubble(bar == HighestAll(bar) and ShowBubbles, StdDev05L, "-0.5 Std Dev", Color.CYAN, no);

plot StdDev1L = Round(If(Chart, Set + (SD * -1), If(ShowTodayOnly, Double.NaN, Set + (SD * -1))) / TickSize(), 0) * TickSize();
StdDev1L.SetDefaultColor(Color.VIOLET);
StdDev1L.SetStyle(Curve.LONG_DASH);
AddChartBubble(bar == HighestAll(bar) and ShowBubbles, StdDev1L, "1 Std Dev", Color.VIOLET, no);

plot StdDev1_5L = Round(If(Chart, Set + (SD * -1.5), If(ShowTodayOnly, Double.NaN, Set + (SD * -1.5))) / TickSize(), 0) * TickSize();
StdDev1_5L.SetDefaultColor(Color.PLUM);
StdDev1_5L.SetStyle(Curve.LONG_DASH);
#AddChartBubble(bar == HighestAll(bar) and ShowBubbles, StdDev1_5L, "-1.5 Std Dev", Color.PLUM, no);

plot StdDev2L = Round(If(Chart, Set + (SD * -2), If(ShowTodayOnly, Double.NaN, Set + (SD * -2))) / TickSize(), 0) * TickSize();
StdDev2L.SetDefaultColor(Color.PLUM);
StdDev2L.SetStyle(Curve.FIRM);
StdDev2L.SetLineWeight(3);
AddChartBubble(bar == HighestAll(bar) and ShowBubbles, StdDev2L, "-2 Std Dev", Color.PLUM, no);

plot StdDev3L = Round(If(Chart, Set + (SD * -3), If(ShowTodayOnly, Double.NaN, Set + (SD * -3))) / TickSize(), 0) * TickSize();
StdDev3L.SetDefaultColor(Color.DARK_RED);
StdDev3L.SetStyle(Curve.FIRM);
StdDev3L.SetLineWeight(3);
AddChartBubble(bar == HighestAll(bar) and ShowBubbles, StdDev3L, "-3 Std Dev", Color.DARK_RED, no);

plot CustDev = Round(If(Chart, Set + (SD * CustomDev), If(ShowTodayOnly, Double.NaN, Set + (SD * CustomDev))) / TickSize(), 0) * TickSize();
CustDev.Hide();
CustDev.SetDefaultColor(Color.YELLOW);
CustDev.SetStyle(Curve.FIRM);
CustDev.SetLineWeight(2);


# =================================
# Volume Profile Definition Section
# =================================

    def profiles = 50;
def customRowHeight = 1.0;
def multiplier = 1;
def onExpansion = ShowTodayOnly;
def yyyymmdd = GetYYYYMMDD();
def seconds = SecondsFromTime(0);
def period = CountTradingDays(Min(First(yyyymmdd), yyyymmdd), yyyymmdd) - 1;
def month = GetYear() * 12 + GetMonth();
def day_number = DaysFromDate(First(yyyymmdd)) + GetDayOfWeek(First(yyyymmdd));
def dom = GetDayOfMonth(yyyymmdd);
def dow = GetDayOfWeek(yyyymmdd - dom + 1);
def expthismonth = (if dow > 5 then 27 else 20) - dow;
def exp_opt = month + (dom > expthismonth);
def height = PricePerRow.TICKSIZE;

rec count = CompoundValue(1, if period != period[1] then(count[1] + period - period[1]) % multiplier else count[1], 0);
def cond = count < count[1] + period - period[1];



# ============================
# Plot POC VAH VAL Section
# ============================

profile tpo = if ProfileType == ProfileType.Volume then VolumeProfile("startNewProfile" = cond, "onExpansion" = onExpansion, "numberOfProfiles" = profiles, "pricePerRow" = height, "value area percent" = valueAreaPercent)
    else TimeProfile("startNewProfile" = cond, "onExpansion" = onExpansion, "numberOfProfiles" = profiles, "pricePerRow" = height, "value area percent" = valueAreaPercent);


rec PC = if cond == 1 then tpo.GetPointOfControl()[1] else PC[1];
plot POC = Round(If(ValueAreaMode == ValueAreaMode."Auto", PC, if NewDay then PointOfControl else PC) / TickSize(), 0) * TickSize();
POC.SetDefaultColor(Color.DARK_RED);
POC.SetStyle(Curve.FIRM);
POC.SetLineWeight(2);

rec hVA = if cond == 1 then tpo.GetHighestValueArea()[1] else hVA[1];
plot VAH = Round(If(ValueAreaMode == ValueAreaMode."Auto", hVA, if NewDay then ValueAreaHigh else hVA) / TickSize(), 0) * TickSize();
VAH.SetDefaultColor(Color.RED);
VAH.SetStyle(Curve.FIRM);

rec lVA = if cond == 1 then tpo.GetLowestValueArea()[1] else lVA[1];
plot VAL = Round(If(ValueAreaMode == ValueAreaMode."Auto", lVA, if NewDay then ValueAreaLow else lVA) / TickSize(), 0) * TickSize();
    ;
VAL.SetDefaultColor(Color.GREEN);
VAL.SetStyle(Curve.FIRM);


# ============================
# VWAP Plot
# ============================
def VWAP1 = Round(vwap(period = AggregationPeriod.DAY) / TickSize(), 0) * TickSize();
plot VWAP = if ShowVWAP > 0 then VWAP1 else Double.NaN;
VWAP.SetPaintingStrategy(PaintingStrategy.DASHES);
VWAP.SetDefaultColor(Color.DARK_GRAY);


# ============================
#Value Area Cloud & Labels
# ============================

def VArea = Between(close, VAL, VAH);
def VAreaAbove = close > VAH;
def VAreaBelow = close < VAL;

def Cloudhigh = if ShowCloud then VAH else Double.NaN;
def Cloudlow = if ShowCloud then VAL else Double.NaN;
AddCloud(CloudHigh, CloudLow, GlobalColor("cloud"), GlobalColor("cloud"));
DefineGlobalColor("cloud", Color.DARK_GRAY);

AddLabel(ShowLabels, Concat("VAH:", Round(VAH)), if close > VAH then Color.GREEN else Color.RED);
AddLabel(ShowLabels, Concat("POC:", Round(POC)), if close > POC then Color.GREEN else Color.RED);
AddLabel(ShowLabels, Concat("VAL:", Round(VAL)), if close > VAL then Color.GREEN else Color.RED);
AddLabel(ShowLabels, Concat("VWAP: ", Round(VWAP1)), Color.LIGHT_ORANGE);
AddLabel(ShowLabels, "IV: " + AsPercent(IVSet), if IsAscending(imp_volatility(period = AggregationPeriod.DAY, priceType = PriceType.LAST)[1]) then Color.RED else if IsDescending(imp_volatility(period = AggregationPeriod.DAY, priceType = PriceType.LAST)[1]) then Color.GREEN else Color.WHITE);
AddLabel(ShowLabels, if VArea then "Inside Value Area" else if VAreaAbove then  "Above Value Area" else "Below Value Area", if VArea then Color.ORANGE else if VAreaAbove then Color.GREEN else Color.RED);


# ============================
# Alerts:
# ============================
input alerttext = "Entry/Exit Point";
# BLOCK CODE BELOW
input UseAlerts = { false, default true };
input AlertType = { default "BAR", "ONCE", "TICK"};
def at = AlertType;
input AlertSound = { default "Bell", "Chimes", "Ding", "NoSound", "Ring"};
def Signal = (close crosses POC) or(close crosses VAH) or(close crosses VAL) or(close crosses StdDev05H) or(close crosses StdDev1H) or(close crosses StdDev2H) or(close crosses StdDev05L) or(close crosses StdDev1L) or(close crosses StdDev2L);
Alert(UseAlerts and Signal, alerttext, if at == 1 then Alert.ONCE else if at == 2 then Alert.TICK else Alert.BAR, AlertSound);