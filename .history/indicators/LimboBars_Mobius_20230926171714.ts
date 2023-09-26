# Limbo_Bars
# Mobius
# V05.02.2016
# Added Labels for Epocs and near term fibonacci retracements
#hint: <b>Limbo Bars < /b>\n Limbo series: Closing for each year in chart aggregation (gray short dashed lines)\n Clustered Multiple year closings (Solid gray thick lines)\n Highest to lowest Fib Sequence for chart agg (thin light green lines)\n Highest to lowest Fib Sequence for adjustable Stochastic Pivots (long gray dashes)\n Sub-Fib Sequences for Current years 68.2 to 100 and 0 (small dashes)
declare Once_per_bar;
input numBars = 21; #hint numbars: bars for near term fib levels
input ClusterValue_1 = 1480.00; #hint ClusterValue_1: Multiple year closing proximity line
input ClusterValue_2 = 1425.00; #hint ClusterValue_2: Multiple year closing proximity line
input ClusterValue_3 = 1250.00; #hint ClusterValue_3: Multiple year closing proximity line
input ClusterValue_4 = 890.00; #hint ClusterValue_4: Multiple year closing proximity line
input showValues = no;
input showBarNumbers = no;
input TrendResistanceStart = 0;
input TrendResistanceEnd = 0;
input TrendSupportStart = 0;
input TrendSupportEnd = 0;
input BubbleOn = yes;
# Study Definitions
   def o = open;
   def h = high;
   def l = low;
   def c = close;
   def bar = BarNumber();
   def yearstart = GetYear() * 10000 + 101;
   def tradingDays = CountTradingDays(yearstart, GetYYYYMMDD());
   def Coeff_1 = .236;
   def Coeff_2 = .382;
   def Coeff_3 = .500;
   def Coeff_4 = .618;
   def Coeff_5 = .786;
#Epoc definitions: Years closing values for the last 20 years
script Epoc {
  input year = 1;
   def bar = barNumber();
   def yearone = CompoundValue(1, if GetYear() == GetLastYear() - year
                                  then bar[1] + 2
                                  else yearone[1], 1);
   def y1 = CompoundValue(1, if bar == yearone
                             then(close[1])
    else y1[1], Double.NaN);
  plot y1Line = if IsNaN(y1) then Double.NaN else y1;
}
# Start Epocs Plot Sequence
  plot y1L = Epoc(year = 1);
y1L.SetStyle(Curve.SHORT_DASH);
y1L.SetDefaultColor(CreateColor(50, 75, 10));
y1L.SetLineWeight(2);
AddChartBubble(if BubbleOn then y1L and isNaN(y1L[1]) else double.nan, y1L, AsPrice(getYear()) + " Open", CreateColor(50, 75, 10));
  plot y2Line = Epoc(year = 2);
y2Line.SetStyle(Curve.SHORT_DASH);
y2Line.SetDefaultColor(CreateColor(50, 75, 10));
y2Line.SetLineWeight(2);
AddChartBubble(if BubbleOn then y2Line and isNaN(y2Line[1]) else double.nan, y2Line, AsPrice(getYear()) + " Open", CreateColor(50, 75, 10));
  plot y3Line = Epoc(year = 3);
y3Line.SetStyle(Curve.SHORT_DASH);
y3Line.SetDefaultColor(CreateColor(50, 75, 10));
y3Line.SetLineWeight(1);
AddChartBubble(if BubbleOn then y3Line and isNaN(y3Line[1]) else double.nan, y3Line, AsPrice(getYear()) + " Open", CreateColor(50, 75, 10));
  plot y4Line = Epoc(year = 4);
y4Line.SetStyle(Curve.SHORT_DASH);
y4Line.SetDefaultColor(CreateColor(50, 75, 10));
y4Line.SetLineWeight(2);
AddChartBubble(if BubbleOn then y4Line and isNaN(y4Line[1]) else double.nan, y4Line, AsPrice(getYear()) + " Open", CreateColor(50, 75, 10));
  plot y5Line = Epoc(year = 5);
y5Line.SetStyle(Curve.SHORT_DASH);
y5Line.SetDefaultColor(CreateColor(50, 75, 10));
y5Line.SetLineWeight(2);
AddChartBubble(if BubbleOn then y5Line and isNaN(y5Line[1]) else double.nan, y5Line, AsPrice(getYear()) + " Open", CreateColor(50, 75, 10));
  plot y6Line = Epoc(year = 6);
y6Line.SetStyle(Curve.SHORT_DASH);
y6Line.SetDefaultColor(CreateColor(50, 75, 10));
y6Line.SetLineWeight(2);
AddChartBubble(if BubbleOn then y6Line and isNaN(y6Line[1]) else double.nan, y6Line, AsPrice(getYear()) + " Open", CreateColor(50, 75, 10));
  plot y7Line = Epoc(year = 7);
y7Line.SetStyle(Curve.SHORT_DASH);
y7Line.SetDefaultColor(CreateColor(50, 75, 10));
y7Line.SetLineWeight(2);
AddChartBubble(if BubbleOn then y7Line and isNaN(y7Line[1]) else double.nan, y7Line, AsPrice(getYear()) + " Open", CreateColor(50, 75, 10));
  plot y8Line = Epoc(year = 8);
y8Line.SetStyle(Curve.SHORT_DASH);
y8Line.SetDefaultColor(CreateColor(50, 75, 10));
y8Line.SetLineWeight(2);
AddChartBubble(if BubbleOn then y8Line and isNaN(y8Line[1]) else double.nan, y8Line, AsPrice(getYear()) + " Open", CreateColor(50, 75, 10));
  plot y9Line = Epoc(year = 9);
y9Line.SetStyle(Curve.SHORT_DASH);
y9Line.SetDefaultColor(CreateColor(50, 75, 10));
y9Line.SetLineWeight(2);
AddChartBubble(if BubbleOn then y9Line and isNaN(y9Line[1]) else double.nan, y9Line, AsPrice(getYear()) + " Open", CreateColor(50, 75, 10));
  plot y10Line = Epoc(year = 10);
y10Line.SetStyle(Curve.SHORT_DASH);
y10Line.SetDefaultColor(CreateColor(50, 75, 10));
y10Line.SetLineWeight(2);
AddChartBubble(if BubbleOn then y10Line and isNaN(y10Line[1]) else double.nan, y10Line, AsPrice(getYear()) + " Open", CreateColor(50, 75, 10));
  plot y11Line = Epoc(year = 11);
y11Line.SetStyle(Curve.SHORT_DASH);
y11Line.SetDefaultColor(CreateColor(50, 75, 10));
y11Line.SetLineWeight(2);
AddChartBubble(if BubbleOn then y11Line and isNaN(y11Line[1]) else double.nan, y11Line, AsPrice(getYear()) + " Open", CreateColor(50, 75, 10));
  plot y12Line = Epoc(year = 12);
y12Line.SetStyle(Curve.SHORT_DASH);
y12Line.SetDefaultColor(CreateColor(50, 75, 10));
y12Line.SetLineWeight(2);
AddChartBubble(if BubbleOn then y12Line and isNaN(y12Line[1]) else double.nan, y12Line, AsPrice(getYear()) + " Open", CreateColor(50, 75, 10));
  plot y13Line = Epoc(year = 13);
y13Line.SetStyle(Curve.SHORT_DASH);
y13Line.SetDefaultColor(CreateColor(50, 75, 10));
y13Line.SetLineWeight(2);
AddChartBubble(if BubbleOn then y13Line and isNaN(y13Line[1]) else double.nan, y13Line, AsPrice(getYear()) + " Open", CreateColor(50, 75, 10));
  plot y14Line = Epoc(year = 14);
y14Line.SetStyle(Curve.SHORT_DASH);
y14Line.SetDefaultColor(CreateColor(50, 75, 10));
y14Line.SetLineWeight(2);
AddChartBubble(if BubbleOn then y14Line and isNaN(y14Line[1]) else double.nan, y14Line, AsPrice(getYear()) + " Open", CreateColor(50, 75, 10));
  plot y15Line = Epoc(year = 15);
y15Line.SetStyle(Curve.SHORT_DASH);
y15Line.SetDefaultColor(CreateColor(50, 75, 10));
y15Line.SetLineWeight(2);
AddChartBubble(if BubbleOn then y15Line and isNaN(y15Line[1]) else double.nan, y15Line, AsPrice(getYear()) + " Open", CreateColor(50, 75, 10));
  plot y16Line = Epoc(year = 16);
y16Line.SetStyle(Curve.SHORT_DASH);
y16Line.SetDefaultColor(CreateColor(50, 75, 10));
y16Line.SetLineWeight(2);
AddChartBubble(if BubbleOn then y16Line and isNaN(y16Line[1]) else double.nan, y16Line, AsPrice(getYear()) + " Open", CreateColor(50, 75, 10));
  plot y17Line = Epoc(year = 17);
y17Line.SetStyle(Curve.SHORT_DASH);
y17Line.SetDefaultColor(CreateColor(50, 75, 10));
y17Line.SetLineWeight(2);
AddChartBubble(if BubbleOn then y17Line and isNaN(y17Line[1]) else double.nan, y17Line, AsPrice(getYear()) + " Open", CreateColor(50, 75, 10));
  plot y18Line = Epoc(year = 18);
y18Line.SetStyle(Curve.SHORT_DASH);
y18Line.SetDefaultColor(CreateColor(50, 75, 10));
y18Line.SetLineWeight(2);
AddChartBubble(if BubbleOn then y18Line and isNaN(y18Line[1]) else double.nan, y18Line, AsPrice(getYear()) + " Open", CreateColor(50, 75, 10));
  plot y19Line = Epoc(year = 19);
y19Line.SetStyle(Curve.SHORT_DASH);
y19Line.SetDefaultColor(CreateColor(50, 75, 10));
y19Line.SetLineWeight(2);
AddChartBubble(if BubbleOn then y19Line and isNaN(y19Line[1]) else double.nan, y19Line, AsPrice(getYear()) + " Open", CreateColor(50, 75, 10));
  plot y20Line = Epoc(year = 20);
y20Line.SetStyle(Curve.SHORT_DASH);
y20Line.SetDefaultColor(CreateColor(50, 75, 10));
y20Line.SetLineWeight(2);
AddChartBubble(if BubbleOn then y20Line and isNaN(y20Line[1]) else double.nan, y20Line, AsPrice(getYear()) + " Open", CreateColor(50, 75, 10));
# End Year Lines
# Plot Year Closing Cluster Values
  Plot Cluster1 = ClusterValue_1;
Cluster1.SetStyle(Curve.Firm);
Cluster1.SetLineWeight(3);
Cluster1.SetDefaultColor(CreateColor(50, 50, 50));
  Plot Cluster2 = ClusterValue_2;
Cluster2.SetStyle(Curve.Firm);
Cluster2.SetLineWeight(3);
Cluster2.SetDefaultColor(CreateColor(50, 50, 50));
  Plot Cluster3 = ClusterValue_3;
Cluster3.SetStyle(Curve.Firm);
Cluster3.SetLineWeight(3);
Cluster3.SetDefaultColor(CreateColor(50, 50, 50));
  Plot Cluster4 = ClusterValue_4;
Cluster4.SetStyle(Curve.Firm);
Cluster4.SetLineWeight(3);
Cluster4.SetDefaultColor(CreateColor(50, 50, 50));
# First Wave Fibonacci Retracement
script Fibs {
    input C0 = 0.000;
    def o = open;
    def h = high;
    def l = low;
# Get highest and lowest on chart
    def a = HighestAll(h);
    def b = LowestAll(l);
# Get the bar numbers at the highest and lowest points
    def barnumber = BarNumber();
    def c = if h == a 
          then barnumber 
          else Double.NaN;
    def d = if l == b 
          then barnumber 
          else Double.NaN;
    def highnumber = CompoundValue(1, if IsNaN(c) 
                                    then highnumber[1] 
                                    else c, c);
    def highnumberall = HighestAll(highnumber);
    def lownumber = CompoundValue(1, if IsNaN(d) 
                                   then lownumber[1] 
                                   else d, d);
    def lownumberall = LowestAll(lownumber);
# Determine Slope Delta
    def upward = highnumberall > lownumberall;
    def downward = highnumberall < lownumberall;
# Define X
    def x = AbsValue(lownumberall - highnumberall);
# Get Slope for either direction
    def slope = (a - b) / x;
    def slopelow = (b - a) / x;
# Get Day
    def day = GetDay();
    def month = GetMonth();
    def year = GetYear();
    def lastDay = GetLastDay();
    def lastmonth = GetLastMonth();
    def lastyear = GetLastYear();
    def isToday = If(day == lastDay and 
                   month == lastmonth and 
                   year == lastyear, 1, 0);
    def istodaybarnumber = HighestAll(if isToday 
                                    then barnumber 
                                    else Double.NaN);
# Calculations for line between extremes
    def line = b + (slope * (barnumber - lownumber));
    def linelow = a + (slopelow * (barnumber - highnumber));
    def currentlinelow = if barnumber <= lownumberall 
                       then linelow 
                       else Double.NaN;
    def currentline = if barnumber <= highnumberall 
                  then line 
                  else Double.NaN;
    def FibFan =  if downward 
                then currentlinelow 
                else if upward 
                then currentline 
                else Double.NaN;
# Rise of line between Extremes
   def range = a - b;
  plot Fib1 = fold i = 1 to 100
    with p = FibFan
              while (downward and
    barnumber >= highnumberall and
    barnumber <= istodaybarnumber)
    or
        (upward and 
                    barnumber >= lownumberall and 
                    barnumber <= istodaybarnumber)
    do if downward
                 then HighestAll((b + (range * C0)))
                 else if upward
                 then HighestAll(a - (range * C0))
                 else Double.NaN;
}
# Start Plot Sequence
input C0 = 0.000;
input C1 = .236;
input C2 = .382;
input C3 = .500;
input C4 = .618;
input C5 = .786;
input C6 = 1.000;

   def TotalBars = HighestAll(bar);
   def HHbar = if high == highestAll(high) 
               then bar 
               else HHbar[1];
   def LLbar = if low == lowestAll(low) 
               then bar 
               else LLbar[1];
   def firstBar = if HHbar > LLbar 
                  then LLbar 
                  else if HHbar < LLbar
                  then HHbar
                  else Double.NaN;
   def BubbleLocation =  if bar - (firstBar + HHbar) == LLBar 
                         then LLbar
                         else if bar - (firstBar + LLbar) == HHBar 
                         then HHbar
                         else double.nan;
  plot fib1 = Round(fibs(C0 = C0), 3);
fib1.SetDefaultColor(Color.Red);
AddChartBubble((if BubbleOn then BubbleLocation else double.nan), fib1
    , (c0 * 100) + "%  $" + fib1, color.gray, yes);
  plot fib2 = Round(fibs(C0 = C1), 3);
fib2.SetDefaultColor(Color.Red);
AddChartBubble((if BubbleOn then BubbleLocation else double.nan), fib2
    , (c1 * 100) + "%  $" + fib2, color.gray, yes);
  plot fib3 = Round(fibs(C0 = C2), 3);
fib3.SetDefaultColor(Color.Red);
AddChartBubble((if BubbleOn then BubbleLocation else double.nan), fib3
    , concat((c2 * 100), "%"), color.gray, yes);
  plot fib4 = Round(fibs(C0 = C3), 3);
fib4.SetDefaultColor(Color.Red);
AddChartBubble((if BubbleOn then BubbleLocation else double.nan), fib4
    , (c3 * 100) + "%  $" + fib4, color.gray, yes);
  plot fib5 = Round(fibs(C0 = C4), 3);
fib5.SetDefaultColor(Color.Red);
AddChartBubble((if BubbleOn then BubbleLocation else double.nan), fib5
    , (c4 * 100) + "%  $" + fib5, color.gray, yes);
  plot fib6 = Round(fibs(C0 = C5), 3);
fib6.SetDefaultColor(Color.Red);
AddChartBubble((if BubbleOn then BubbleLocation else double.nan), fib6
    , (c5 * 100) + "%  $" + fib6, color.gray, yes);
  plot fib7 = Round(fibs(C0 = C6), 3);
fib7.SetDefaultColor(Color.Red);
AddChartBubble((if BubbleOn then BubbleLocation else double.nan), fib7
    , (c6 * 100) + "%  $" + fib7, color.gray, yes);
# Second Wave Fib Series
   def UserSetResistance = TrendResistanceStart > 0 and
TrendResistanceEnd > 0;
   def UserSetSupport = TrendSupportStart > 0 and
TrendSupportEnd > 0;
def PH;
def PL;
   def isHigherThanNextBars = fold i = 1 to numBars + 1
with p = 1
                              while p 
                              do h > GetValue(h, -i);
       PH = if UserSetResistance and
    (bar == TrendResistanceStart or 
               bar == TrendResistanceEnd) 
            then h 
            else if !UserSetResistance and
    (bar > numBars and 
                     h == Highest(h, numBars) and 
                     isHigherThanNextBars) 
            then h 
            else Double.NaN;
   def isLowerThanNextBars = fold j = 1 to numBars + 1
with q = 1
                             while q 
                             do l < GetValue(low, -j);
       PL = if UserSetSupport and
    (bar == TrendSupportStart or 
               bar == TrendSupportEnd) 
            then l 
            else if !UserSetSupport and
    (bar > numBars and 
                     l == Lowest(l, numBars) and 
                     isLowerThanNextBars) 
            then l 
            else Double.NaN;
   def PHBar = if UserSetResistance 
               then TrendResistanceEnd 
               else if !IsNaN(PH) 
               then bar 
               else PHBar[1];
   def PLBar = if UserSetSupport 
               then TrendSupportEnd 
               else if !IsNaN(PL) 
               then bar 
               else PLBar[1];
   def PHL = if !IsNaN(PH) 
             then PH 
             else PHL[1];
   def priorPHBar = if UserSetResistance 
                    then TrendResistanceStart 
                    else if PHL != PHL[1] 
                    then PHBar[1] 
                    else priorPHBar[1];
   def PLL = if !IsNaN(PL) 
             then PL 
             else PLL[1];
   def priorPLBar = if UserSetSupport 
                    then TrendSupportStart 
                    else if PLL != PLL[1] 
                    then PLBar[1] 
                    else priorPLBar[1];
   def isFinalTwoHighPivots = bar >= HighestAll(priorPHBar);
   def isFinalTwoLowPivots = bar >= HighestAll(priorPLBar);
   def ResistanceFinishOffset = if isFinalTwoHighPivots 
                                then bar - PHBar 
                                else 0;
   def ResistanceStartOffset = if isFinalTwoHighPivots 
                               then bar - priorPHBar 
                               else 0;
   def ResistanceSlope = (GetValue(PH, ResistanceFinishOffset) -
    GetValue(PH, ResistanceStartOffset)) /
    (PHBar - priorPHBar);
   def SupportFinishOffset = if isFinalTwoLowPivots 
                             then bar - PLBar 
                             else 0;
   def SupportStartOffset = if isFinalTwoLowPivots 
                            then bar - priorPLBar 
                            else 0;
   def SupportSlope = (GetValue(PL, SupportFinishOffset) -
    GetValue(PL, SupportStartOffset)) /
    (PLBar - priorPLBar);
   def ResistanceExtend = if bar == HighestAll(PHBar) 
                          then 1 
                          else ResistanceExtend[1];
   def SupportExtend = if bar == HighestAll(PLBar) 
                       then 1 
                       else SupportExtend[1];
  plot pivotHigh = if isFinalTwoHighPivots 
                   then PH 
                   else Double.NaN;
   def pivotHighLine = if PHL > 0 and
isFinalTwoHighPivots 
                       then PHL 
                       else double.NaN;
  plot ResistanceLine = pivotHigh;
  plot ResistanceExtension = if ResistanceExtend 
                             then(bar - PHBar) * ResistanceSlope + PHL
else Double.NaN;
  plot pivotLow = if isFinalTwoLowPivots 
                  then PL 
                  else Double.NaN;
   def pivotLowLine = if PLL > 0 and
isFinalTwoLowPivots 
                      then PLL 
                      else double.NaN;
  plot SupportLine = pivotLow;
  plot SupportExtension = if SupportExtend 
                          then(bar - PLBar) * SupportSlope + PLL
else Double.NaN;
  plot BN = bar;
  plot A_H = if isNaN(PivotHighline) 
             then PivotHighLine[1] 
             else HighestAll(PivotHighLine);
A_H.SetDefaultColor(Color.Yellow);
  plot X_L = if isNaN(PivotLowLine) 
             then PivotLowLine[1] 
             else LowestAll(PivotLowLine);
X_L.SetDefaultColor(Color.Yellow);
   def A = A_H;
   def B = X_L;
   def X = (((c - X_L) / (A_H - X_L))) + c;
  plot SeventyEight = (((a - b) * Coeff_5) + B);
  plot SixtyOne = (((a - B) * Coeff_4) + B);
  plot Fifty = (a + B) * Coeff_3;
  plot ThirtyEight = ((a - B) * Coeff_2) + B;
  plot TwentyThree = ((a - B) * Coeff_1) + B;
pivotHigh.SetDefaultColor(Color.Yellow);
pivotHigh.SetPaintingStrategy(PaintingStrategy.VALUES_ABOVE);
pivotHigh.SetHiding(!showValues);
pivotLow.SetDefaultColor(Color.Yellow);
pivotLow.SetPaintingStrategy(PaintingStrategy.VALUES_BELOW);
pivotLow.SetHiding(!showValues);
ResistanceLine.EnableApproximation();
ResistanceLine.SetDefaultColor(GetColor(5));
ResistanceExtension.SetDefaultColor(GetColor(5));
SupportLine.EnableApproximation();
SupportLine.SetDefaultColor(GetColor(5));
SupportExtension.SetDefaultColor(GetColor(5));
BN.SetDefaultColor(GetColor(0));
BN.SetHiding(!showBarNumbers);
BN.SetPaintingStrategy(PaintingStrategy.VALUES_BELOW);
SeventyEight.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
SeventyEight.SetDefaultColor(Color.Yellow);
SixtyOne.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
SixtyOne.SetDefaultColor(Color.Yellow);
Fifty.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
Fifty.SetDefaultColor(Color.Yellow);
ThirtyEight.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
ThirtyEight.SetDefaultColor(Color.Yellow);
TwentyThree.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
TwentyThree.SetDefaultColor(Color.Yellow);
AddChartBubble(if BubbleOn then isNaN(close[10]) and!isNaN(close[11]) else double.nan,
    A_H,
    "Fib " + 1,
    color.yellow,
    yes);
AddChartBubble(if BubbleOn then isNaN(close[10]) and!isNaN(close[11]) else double.nan,
    SeventyEight,
    "Fib " + Coeff_5,
    color.yellow,
    yes);
AddChartBubble(if BubbleOn then isNaN(close[10]) and!isNaN(close[11]) else double.nan,
    SixtyOne,
    "Fib " + Coeff_4,
    color.yellow,
    yes);
AddChartBubble(if BubbleOn then isNaN(close[10]) and!isNaN(close[11]) else double.nan,
    Fifty,
    "Fib " + Coeff_3,
    color.yellow,
    yes);
AddChartBubble(if BubbleOn then isNaN(close[10]) and!isNaN(close[11]) else double.nan,
    ThirtyEight,
    "Fib " + Coeff_2,
    color.yellow,
    yes);
AddChartBubble(if BubbleOn then isNaN(close[10]) and!isNaN(close[11]) else double.nan,
    TwentyThree,
    "Fib " + Coeff_1,
    color.yellow,
    yes);
AddChartBubble(if BubbleOn then isNaN(close[10]) and!isNaN(close[11]) else double.nan,
    X_L,
    "Fib " + 0,
    color.yellow,
    yes);
# Fibonacci Time Series
   def bar1 = firstbar;
   def bars = CompoundValue(1, if isNaN(bars[1])
              then firstbar + 2 
              else if bar >= firstbar + 2
              then bars[1] + 1 
              else 0, firstbar + 2);
   def coeff = Sqrt(5);
   def n = Floor(log(bars * coeff + 0.5) / log((1 + Sqrt(5)) / 2));
   def inSeries = n != n[1] and bars >= firstbar;
   def Series = if inSeries 
                then bars 
                else Double.NaN;
AddVerticalLine(Series, "FTS: ( " + Series + ")", Color.Blue, Curve.Short_Dash);
# End Code Limbo Bars V05