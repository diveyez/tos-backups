

# Global Color setup
# Created by @tony_futures inspired by ICT concept
DefineGlobalColor("weekly", Color.DARK_ORANGE);
DefineGlobalColor("weekly2", CreateColor(136, 93, 100));
DefineGlobalColor("weekly3", COLOR.PLUM);

#Calculate the gaps and the midpoints
input aggregationPeriod = AggregationPeriod.WEEK;
def weeklyClose = close(period = aggregationPeriod);
def weeklyOpen = open(period = aggregationPeriod);
def weeklyChange = weeklyClose != weeklyClose[1];
def prevWeeklyClose = if weeklyChange then Round(weeklyClose[1], 2) else prevWeeklyClose[1];
def newWeekOpen = if weeklyChange then Round(weeklyOpen, 2) else newWeekOpen[1];
def gapUp = newWeekOpen > prevWeeklyClose;
def halfAmount = AbsValue(newWeekOpen - prevWeeklyClose) / 2;
def halfGap = if gapUp then(prevWeeklyClose + halfAmount) else (newWeekOpen + halfAmount);
def oneBackClose = if weeklyChange then prevWeeklyClose[1] else oneBackClose[1];
def oneBackOpen = if weeklyChange then newWeekOpen[1] else oneBackOpen[1];
def twoBackClose = if weeklyChange then oneBackClose[1] else twoBackClose[1];
def twoBackOpen = if weeklyChange then oneBackOpen[1] else twoBackOpen[1];
def halfAmount2 = AbsValue(oneBackOpen - oneBackClose) / 2;
def gapUp2 = oneBackOpen > oneBackClose;
def halfGap2 = if gapUp2 then(oneBackClose + halfAmount2) else (oneBackOpen + halfAmount2);
def halfAmount3 = AbsValue(twoBackOpen - twoBackClose) / 2;
def gapUp3 = twoBackOpen > twoBackClose;
def halfGap3 = if gapUp3 then(twoBackClose + halfAmount3) else (twoBackOpen + halfAmount3);

input plotLines = yes;
def Today = GetLastDay() == GetDay();
input showOnRight = yes;
def exp = if showOnRight then IsNaN(close[1]) else yes;

plot week1 = if exp and Today and plotLines then prevWeeklyClose else Double.NaN;
week1.setDefaultColor(GlobalColor("weekly"));
week1.setLineWeight(2);
week1.hideBubble();

plot week2 = if exp and Today and plotLines then newWeekOpen else Double.NaN;
week2.setDefaultColor(GlobalColor("weekly"));
week2.setLineWeight(2);
week2.hideBubble();

plot week3 = if exp and Today and plotLines then oneBackClose else Double.NaN;
week3.setDefaultColor(GlobalColor("weekly2"));
week3.setLineWeight(2);
week3.hideBubble();

plot week4 = if exp and Today and plotLines then oneBackOpen else Double.NaN;
week4.setDefaultColor(GlobalColor("weekly2"));
week4.setLineWeight(2);
week4.hideBubble();

plot week5 = if exp and Today and plotLines then twoBackClose else Double.NaN;
week5.setDefaultColor(GlobalColor("weekly3"));
week5.setLineWeight(2);
week5.hideBubble();

plot week6 = if exp and Today and plotLines then twoBackOpen else Double.NaN;
week6.setDefaultColor(GlobalColor("weekly3"));
week6.setLineWeight(2);
week6.hideBubble();

plot halfWay = if exp and Today and plotLines then halfGap else Double.NaN;
halfWay.setDefaultColor(Color.GRAY);
halfWay.hideBubble();

plot halfWay2 = if exp and Today and plotLines then halfGap2 else Double.NaN;
halfWay2.setDefaultColor(Color.GRAY);
halfWay2.hideBubble();

plot halfWay3 = if exp and Today and plotLines then halfGap3 else Double.NaN;
halfWay3.setDefaultColor(Color.GRAY);
halfWay3.hideBubble();

input showBubbles = no;
AddChartBubble(showBubbles and exp and!exp[1], if gapUp then week1 else week2, "Current", GlobalColor("weekly"), no);
AddChartBubble(showBubbles and exp and!exp[1], if gapUp2 then week3 else week4, "Previous", GlobalColor("weekly2"), no);
AddChartBubble(showBubbles and exp and!exp[1], if gapUp3 then week5 else week6, "Two Back", GlobalColor("weekly3"), no);
input showLabels = no;
AddLabel(showLabels, "Current", GlobalColor("weekly"));
AddLabel(showLabels, "Previous", GlobalColor("weekly2"));
AddLabel(showLabels, "Two Back", GlobalColor("weekly3"));
