# SJ_Murray's Math Harmonics

# May not be true MM Harmonics.
#In the study by SJ all lines were cyan.Changed the line colors to what made sense to me so no real significance to line colors.Adjust them as you wish.#Horserider 12 / 20 / 2019

input showbubble = yes;
input showOnlyToday = yes;
input agg = aggregationPeriod.DAY;
def RangeHigh = high(period = agg)[0];
def RangeLow = low(period = agg)[0];
def RangeSize = AbsValue(RangeHigh - RangeLow);
def MMLevel8 = 8 / 8;
def MMLevel7 = 7 / 8;
def MMLevel6 = 6 / 8;
def MMLevel5 = 5 / 8;
def MMLevel4 = 4 / 8;
def MMLevel3 = 3 / 8;
def MMLevel2 = 2 / 8;
def MMLevel1 = 1 / 8;
def MMLevel0 = 0 / 8;



def MML7 = RangeLow + RangeSize * (MMLevel7);
def MML6 = RangeLow + RangeSize * (MMLevel6);
def MML5 = RangeLow + RangeSize * (MMLevel5);
def MML4 = RangeLow + RangeSize * (MMLevel4);
def MML3 = RangeLow + RangeSize * (MMLevel3);
def MML2 = RangeLow + RangeSize * (MMLevel2);
def MML1 = RangeLow + RangeSize * (MMLevel1);
def MML0 = RangeLow;

plot Level8;
plot Level7;
plot Level6;
plot Level5;
plot Level4;
plot Level3;
plot Level2;
plot Level1;
plot Level0;

if  showOnlyToday and!IsNaN(close(period = agg)[-1])
then {
    Level8 = Double.NaN;
    Level7 = Double.NaN;
    Level6 = Double.NaN;
    Level5 = Double.NaN;
    Level4 = Double.NaN;
    Level3 = Double.NaN;
    Level2 = Double.NaN;
    Level1 = Double.NaN;
    Level0 = Double.NaN;
} else {
    Level8 = RangeHigh;
    Level7 = MML7;
    Level6 = MML6;
    Level5 = MML5;
    Level4 = MML4;
    Level3 = MML3;
    Level2 = MML2;
    Level1 = MML1;
    Level0 = MML0;
}
def TimeCondition = IsNaN(Close[-1]) and!IsNaN(close[0]);

Level8.SetDefaultColor(color.RED);
Level8.SetStyle(curve.Short_Dash);
Level8.setLineWeight(4);
AddChartBubble(showbubble and TimeCondition, RangeHigh, "8/8", color.red, yes);

Level7.SetDefaultColor(color.YELLOW);
Level7.SetStyle(curve.Short_Dash);
AddChartBubble(showbubble and TimeCondition, MML7, "7/8ths Fast Reversal line: weak", color.yellow, yes);

Level6.SetDefaultColor(color.YELLOW);
Level6.SetStyle(curve.Short_Dash);
AddChartBubble(showbubble and TimeCondition, MML6, "6/8", color.pink, yes);

Level5.SetDefaultColor(color.CYAN);
Level5.SetStyle(curve.Short_Dash);
AddChartBubble(showbubble and TimeCondition, MML5, "5/8ths Upper Trading Range: ", color.green, yes);

Level4.SetDefaultColor(color.BLUE);
Level4.SetStyle(curve.Short_Dash);
Level4.setLineWeight(4);
AddChartBubble(showbubble and TimeCondition, MML4, "4/8", color.cyan, yes);

Level3.SetDefaultColor(color.CYAN);
Level3.SetStyle(curve.Short_Dash);
AddChartBubble(showbubble and TimeCondition, MML3, "3/8ths Lower Trading Range: ", color.green, yes);

Level2.SetDefaultColor(color.YELLOW);
Level2.SetStyle(curve.Short_Dash);
AddChartBubble(showbubble and TimeCondition, MML2, "2/8", color.pink, yes);

Level1.SetDefaultColor(color.YELLOW);
Level1.SetStyle(curve.Short_Dash);
AddChartBubble(showbubble and TimeCondition, MML1, "1/8ths Fast Reversal line: weak", color.yellow, yes);

Level0.SetDefaultColor(color.GREEN);
Level0.SetStyle(curve.Short_Dash);
Level0.setLineWeight(4);
AddChartBubble(showbubble and TimeCondition, MML0, "0/8", color.green, yes);