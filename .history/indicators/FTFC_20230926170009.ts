##FTFC(Full - Time - Frame - Continuity) Labels##
# By: Casey Brett
#IMPORTANT: In order for all labels to show up on your chart you MUST do the following 2 things:
#1 - Use a Time Frame less than OR equal to the lowest label(15minute)
#2 - Have at least 30 days of time frame.Ex. 30 days: 1 min // 30 Days : 15 minutes // 45 Days : 30 minutes

input MonthLabel = yes;
input WeekLabel = yes;
input FourDayLabel = yes;
input DayLabel = yes;
input FourHourLabel = yes;
input HourLabel = yes;
input ThirtyMinLabel = yes;
input FifteenMinLabel = yes;

DefineGlobalColor("UP", color.green);
DefineGlobalColor("DOWN", color.red);

## Month Aggregation Period Variables

def MonthOpen;
def MonthClose;
def MonthUp;
def MonthDown;
def MonthAggregationPeriod;
if getAggregationPeriod() <= AggregationPeriod.Month {
    MonthOpen = open(period = "Month");
    MonthClose = close(period = "Month");
    MonthUp = if MonthClose > MonthOpen then 1 else 0;
    MonthDown = if MonthClose < MonthOpen then 1 else 0;
    MonthAggregationPeriod = 1;
}
else {
    MonthOpen = 0;
    MonthClose = 0;
    MonthUp = 0;
    MonthDown = 0;
    MonthAggregationPeriod = 0;
}
AddLabel(MonthLabel and MonthAggregationPeriod, " M ", if MonthUp then GlobalColor("UP") else if MonthDown then GlobalColor("DOWN") else Color.White);

## Week Aggregation Period Variables

def WeekOpen;
def WeekClose;
def WeekUp;
def WeekDown;
def WeekAggregationPeriod;
if getAggregationPeriod() <= AggregationPeriod.Week {
    WeekOpen = open(period = "Week");
    WeekClose = close(period = "Week");
    WeekUp = if WeekClose > WeekOpen then 1 else 0;
    WeekDown = if WeekClose < WeekOpen then 1 else 0;
    WeekAggregationPeriod = 1;
}
else {
    WeekOpen = 0;
    WeekClose = 0;
    WeekUp = 0;
    WeekDown = 0;
    WeekAggregationPeriod = 0;
}
AddLabel(WeekLabel and WeekAggregationPeriod, " W ", if WeekUp then GlobalColor("UP") else if WeekDown then GlobalColor("DOWN") else Color.White);

## Four_Days Aggregation Period Variables

def Four_DaysOpen;
def Four_DaysClose;
def Four_DaysUp;
def Four_DaysDown;
def Four_DaysAggregationPeriod;
if getAggregationPeriod() <= AggregationPeriod.Four_Days {
    Four_DaysOpen = open(period = "4 Days");
    Four_DaysClose = close(period = "4 Days");
    Four_DaysUp = if Four_DaysClose > Four_DaysOpen then 1 else 0;
    Four_DaysDown = if Four_DaysClose < Four_DaysOpen then 1 else 0;
    Four_DaysAggregationPeriod = 1;
}
else {
    Four_DaysOpen = 0;
    Four_DaysClose = 0;
    Four_DaysUp = 0;
    Four_DaysDown = 0;
    Four_DaysAggregationPeriod = 0;
}
AddLabel(FourDayLabel and Four_DaysAggregationPeriod, " 4D ", if Four_DaysUp then GlobalColor("UP") else if Four_DaysDown then GlobalColor("DOWN") else Color.White);

## Day Aggregation Period Variables

def DayOpen;
def DayClose;
def DayUp;
def DayDown;
def DayAggregationPeriod;
if getAggregationPeriod() <= AggregationPeriod.Day {
    DayOpen = open(period = "Day");
    DayClose = close(period = "Day");
    DayUp = if DayClose > DayOpen then 1 else 0;
    DayDown = if DayClose < DayOpen then 1 else 0;
    DayAggregationPeriod = 1;
}
else {
    DayOpen = 0;
    DayClose = 0;
    DayUp = 0;
    DayDown = 0;
    DayAggregationPeriod = 0;
}
AddLabel(DayLabel and DayAggregationPeriod, " D ", if DayUp then GlobalColor("UP") else if DayDown then GlobalColor("DOWN") else Color.White);

## four_hours Aggregation Period Variables

def four_hoursOpen;
def four_hoursClose;
def four_hoursUp;
def four_hoursDown;
def four_hoursAggregationPeriod;
if getAggregationPeriod() <= AggregationPeriod.four_hours {
    four_hoursOpen = open(period = "4 hours");
    four_hoursClose = close(period = "4 hours");
    four_hoursUp = if four_hoursClose > four_hoursOpen then 1 else 0;
    four_hoursDown = if four_hoursClose < four_hoursOpen then 1 else 0;
    four_hoursAggregationPeriod = 1;
}
else {
    four_hoursOpen = 0;
    four_hoursClose = 0;
    four_hoursUp = 0;
    four_hoursDown = 0;
    four_hoursAggregationPeriod = 0;
}
AddLabel(FourHourLabel and four_hoursAggregationPeriod, " 4H ", if four_hoursUp then GlobalColor("UP") else if four_hoursDown then GlobalColor("DOWN") else Color.White);

## Hour Aggregation Period Variables

def HourOpen;
def HourClose;
def HourUp;
def HourDown;
def HourAggregationPeriod;
if getAggregationPeriod() <= AggregationPeriod.Hour {
    HourOpen = open(period = "1 Hour");
    HourClose = close(period = "1 Hour");
    HourUp = if HourClose > HourOpen then 1 else 0;
    HourDown = if HourClose < HourOpen then 1 else 0;
    HourAggregationPeriod = 1;
}
else {
    HourOpen = 0;
    HourClose = 0;
    HourUp = 0;
    HourDown = 0;
    HourAggregationPeriod = 0;
}
AddLabel(HourLabel and HourAggregationPeriod, " H ", if HourUp then GlobalColor("UP") else if HourDown then GlobalColor("DOWN") else Color.White);

## Thirty_Min Aggregation Period Variables

def Thirty_MinOpen;
def Thirty_MinClose;
def Thirty_MinUp;
def Thirty_MinDown;
def Thirty_MinAggregationPeriod;
if getAggregationPeriod() <= AggregationPeriod.Thirty_Min {
    Thirty_MinOpen = open(period = "30 Min");
    Thirty_MinClose = close(period = "30 Min");
    Thirty_MinUp = if Thirty_MinClose > Thirty_MinOpen then 1 else 0;
    Thirty_MinDown = if Thirty_MinClose < Thirty_MinOpen then 1 else 0;
    Thirty_MinAggregationPeriod = 1;
}
else {
    Thirty_MinOpen = 0;
    Thirty_MinClose = 0;
    Thirty_MinUp = 0;
    Thirty_MinDown = 0;
    Thirty_MinAggregationPeriod = 0;
}
AddLabel(ThirtyMinLabel and Thirty_MinAggregationPeriod, " 30M ", if Thirty_MinUp then GlobalColor("UP") else if Thirty_MinDown then GlobalColor("DOWN") else Color.White);

## Fifteen_Min Aggregation Period Variables

def Fifteen_MinOpen;
def Fifteen_MinClose;
def Fifteen_MinUp;
def Fifteen_MinDown;
def Fifteen_MinAggregationPeriod;
if getAggregationPeriod() <= AggregationPeriod.Fifteen_Min {
    Fifteen_MinOpen = open(period = "15 Min");
    Fifteen_MinClose = close(period = "15 Min");
    Fifteen_MinUp = if Fifteen_MinClose > Fifteen_MinOpen then 1 else 0;
    Fifteen_MinDown = if Fifteen_MinClose < Fifteen_MinOpen then 1 else 0;
    Fifteen_MinAggregationPeriod = 1;
}
else {
    Fifteen_MinOpen = 0;
    Fifteen_MinClose = 0;
    Fifteen_MinUp = 0;
    Fifteen_MinDown = 0;
    Fifteen_MinAggregationPeriod = 0;
}
AddLabel(FifteenMinLabel and Fifteen_MinAggregationPeriod, " 15M ", if Fifteen_MinUp then GlobalColor("UP") else if Fifteen_MinDown then GlobalColor("DOWN") else Color.White);