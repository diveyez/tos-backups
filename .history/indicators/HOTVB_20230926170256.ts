#TOS Indicators
#Home of the Volatility Box
#Full tutorial here: tosindicators.com / indicators / mtf - dmi
#Contains code written by Hubert Senters and Pete Hahn https://futures.io/thinkorswim/34885-help-adx-dmi-2.html

#Update notes:
#11 / 21 / 19 - Colored candles fixed, ADXLength variable renamed to ADXLevels
#11 / 20 / 19 - Separated labels into separate conditions, to avoid label logic from confusing TOS.
#11 / 19 / 19 - Logic behind bullish, bearish and neutral zones updated, thanks to member feedback.More detail available in DMI Power Scans tutorial video.
#11 / 14 / 19 - Arrows are not added to the current version of the code, only colored candles


input coloredCandlesOn = yes;
input length = 14;
input ADXLevels = 20;
input averageType = AverageType.WILDERS;



def monthPlus;
def monthMinus;
def monthAdx;

def monthBullishSignal;
def monthBearishSignal;


def monthBullishZone;
def monthBearishZone;
def monthNeutralZone;

def monthHiDiff;
def monthLoDiff;
def monthPlusDM;
def monthMinusDM;
def monthDX;
if GetAggregationPeriod() <= AggregationPeriod.month{

    monthHiDiff = high(period = "Month") - high(period = "Month")[1];
    monthLoDiff = low(period = "Month")[1] - low(period = "Month");
    monthPlusDM = if monthHiDiff > monthLoDiff and monthHiDiff > 0 then monthHiDiff else 0;
    monthMinusDM =  if monthLoDiff > monthHiDiff and monthLoDiff > 0 then monthLoDiff else 0;
    monthPlus = 100 * MovingAverage(averageType, monthPlusDM, length);
    monthMinus = 100 * MovingAverage(averageType, monthMinusDM, length);
    monthBullishSignal = monthPlus crosses above monthMinus;
    monthBearishSignal = monthPlus crosses below monthMinus;

    monthDX = if (monthPlus + monthMinus > 0) then 100 * AbsValue(monthPlus - monthMinus) / (monthPlus + monthMinus) else 0;
    monthAdx = MovingAverage(averageType, monthDX, length);

    monthBullishZone = monthPlus > monthMinus and monthADX >= ADXLevels;
    monthBearishZone = monthPlus < monthMinus and monthADX >= ADXLevels;
    monthNeutralZone = !monthBullishZone and!monthBearishZone;

}
else {
    monthPlus = 0;
    monthMinus = 0;
    monthAdx = 0;
    monthPlusDM = 0;
    monthMinusDM = 0;
    monthBullishSignal = 0;
    monthBearishSignal = 0;
    monthDX = 0;

    monthBullishZone = 0;
    monthBearishZone = 0;
    monthNeutralZone = 0;

    monthHiDiff = 0;
    monthLoDiff = 0;

}


AddLabel(monthBullishZone, "DI:M", color.green); AddLabel(monthBearishZone, "DI:M", color.red); AddLabel(monthNeutralZone, "DI:M", color.yellow);




def weekPlus;
def weekMinus;
def weekAdx;

def weekBullishSignal;
def weekBearishSignal;


def weekBullishZone;
def weekBearishZone;
def weekNeutralZone;

def weekHiDiff;
def weekLoDiff;
def weekPlusDM;
def weekMinusDM;
def weekDX;
if GetAggregationPeriod() <= AggregationPeriod.week{

    weekHiDiff = high(period = "week") - high(period = "week")[1];
    weekLoDiff = low(period = "week")[1] - low(period = "week");
    weekPlusDM = if weekHiDiff > weekLoDiff and weekHiDiff > 0 then weekHiDiff else 0;
    weekMinusDM =  if weekLoDiff > weekHiDiff and weekLoDiff > 0 then weekLoDiff else 0;
    weekPlus = 100 * MovingAverage(averageType, weekPlusDM, length);
    weekMinus = 100 * MovingAverage(averageType, weekMinusDM, length);
    weekBullishSignal = weekPlus crosses above weekMinus;
    weekBearishSignal = weekPlus crosses below weekMinus;

    weekDX = if (weekPlus + weekMinus > 0) then 100 * AbsValue(weekPlus - weekMinus) / (weekPlus + weekMinus) else 0;
    weekAdx = MovingAverage(averageType, weekDX, length);

    weekBullishZone = weekPlus > weekMinus and weekADX >= ADXLevels;
    weekBearishZone = weekPlus < weekMinus and weekADX >= ADXLevels;
    weekNeutralZone = !weekBullishZone and!weekBearishZone;

}
else {
    weekPlus = 0;
    weekMinus = 0;
    weekAdx = 0;
    weekPlusDM = 0;
    weekMinusDM = 0;
    weekBullishSignal = 0;
    weekBearishSignal = 0;
    weekDX = 0;

    weekBullishZone = 0;
    weekBearishZone = 0;
    weekNeutralZone = 0;

    weekHiDiff = 0;
    weekLoDiff = 0;

}


AddLabel(weekBullishZone, "DI:W", color.green); AddLabel(weekBearishZone, "DI:W", color.red); AddLabel(weekNeutralZone, "DI:W", color.yellow);





def fourDaysPlus;
def fourDaysMinus;
def fourDaysAdx;

def fourDaysBullishSignal;
def fourDaysBearishSignal;


def fourDaysBullishZone;
def fourDaysBearishZone;
def fourDaysNeutralZone;

def fourDaysHiDiff;
def fourDaysLoDiff;
def fourDaysPlusDM;
def fourDaysMinusDM;
def fourDaysDX;
if GetAggregationPeriod() <= AggregationPeriod.four_Days{

    fourDaysHiDiff = high(period = "4 Days") - high(period = "4 Days")[1];
    fourDaysLoDiff = low(period = "4 Days")[1] - low(period = "4 Days");
    fourDaysPlusDM = if fourDaysHiDiff > fourDaysLoDiff and fourDaysHiDiff > 0 then fourDaysHiDiff else 0;
    fourDaysMinusDM =  if fourDaysLoDiff > fourDaysHiDiff and fourDaysLoDiff > 0 then fourDaysLoDiff else 0;
    fourDaysPlus = 100 * MovingAverage(averageType, fourDaysPlusDM, length);
    fourDaysMinus = 100 * MovingAverage(averageType, fourDaysMinusDM, length);
    fourDaysBullishSignal = fourDaysPlus crosses above fourDaysMinus;
    fourDaysBearishSignal = fourDaysPlus crosses below fourDaysMinus;

    fourDaysDX = if (fourDaysPlus + fourDaysMinus > 0) then 100 * AbsValue(fourDaysPlus - fourDaysMinus) / (fourDaysPlus + fourDaysMinus) else 0;
    fourDaysAdx = MovingAverage(averageType, fourDaysDX, length);

    fourDaysBullishZone = fourDaysPlus > fourDaysMinus and fourDaysADX >= ADXLevels;
    fourDaysBearishZone = fourDaysPlus < fourDaysMinus and fourDaysADX >= ADXLevels;
    fourDaysNeutralZone = !fourDaysBullishZone and!fourDaysBearishZone;

}
else {
    fourDaysPlus = 0;
    fourDaysMinus = 0;
    fourDaysAdx = 0;
    fourDaysPlusDM = 0;
    fourDaysMinusDM = 0;
    fourDaysBullishSignal = 0;
    fourDaysBearishSignal = 0;
    fourDaysDX = 0;

    fourDaysBullishZone = 0;
    fourDaysBearishZone = 0;
    fourDaysNeutralZone = 0;

    fourDaysHiDiff = 0;
    fourDaysLoDiff = 0;

}


AddLabel(fourDaysBullishZone, "DI:4D", color.green); AddLabel(fourDaysBearishZone, "DI:4D", color.red); AddLabel(fourDaysNeutralZone, "DI:4D", color.yellow);




def threeDaysPlus;
def threeDaysMinus;
def threeDaysAdx;

def threeDaysBullishSignal;
def threeDaysBearishSignal;


def threeDaysBullishZone;
def threeDaysBearishZone;
def threeDaysNeutralZone;

def threeDaysHiDiff;
def threeDaysLoDiff;
def threeDaysPlusDM;
def threeDaysMinusDM;
def threeDaysDX;
if GetAggregationPeriod() <= AggregationPeriod.three_Days{

    threeDaysHiDiff = high(period = "3 Days") - high(period = "3 Days")[1];
    threeDaysLoDiff = low(period = "3 Days")[1] - low(period = "3 Days");
    threeDaysPlusDM = if threeDaysHiDiff > threeDaysLoDiff and threeDaysHiDiff > 0 then threeDaysHiDiff else 0;
    threeDaysMinusDM =  if threeDaysLoDiff > threeDaysHiDiff and threeDaysLoDiff > 0 then threeDaysLoDiff else 0;
    threeDaysPlus = 100 * MovingAverage(averageType, threeDaysPlusDM, length);
    threeDaysMinus = 100 * MovingAverage(averageType, threeDaysMinusDM, length);
    threeDaysBullishSignal = threeDaysPlus crosses above threeDaysMinus;
    threeDaysBearishSignal = threeDaysPlus crosses below threeDaysMinus;

    threeDaysDX = if (threeDaysPlus + threeDaysMinus > 0) then 100 * AbsValue(threeDaysPlus - threeDaysMinus) / (threeDaysPlus + threeDaysMinus) else 0;
    threeDaysAdx = MovingAverage(averageType, threeDaysDX, length);

    threeDaysBullishZone = threeDaysPlus > threeDaysMinus and threeDaysADX >= ADXLevels;
    threeDaysBearishZone = threeDaysPlus < threeDaysMinus and threeDaysADX >= ADXLevels;
    threeDaysNeutralZone = !threeDaysBullishZone and!threeDaysBearishZone;

}
else {
    threeDaysPlus = 0;
    threeDaysMinus = 0;
    threeDaysAdx = 0;
    threeDaysPlusDM = 0;
    threeDaysMinusDM = 0;
    threeDaysBullishSignal = 0;
    threeDaysBearishSignal = 0;
    threeDaysDX = 0;

    threeDaysBullishZone = 0;
    threeDaysBearishZone = 0;
    threeDaysNeutralZone = 0;

    threeDaysHiDiff = 0;
    threeDaysLoDiff = 0;

}


AddLabel(threeDaysBullishZone, "DI:3D", color.green); AddLabel(threeDaysBearishZone, "DI:3D", color.red); AddLabel(threeDaysNeutralZone, "DI:3D", color.yellow);




def twoDaysPlus;
def twoDaysMinus;
def twoDaysAdx;

def twoDaysBullishSignal;
def twoDaysBearishSignal;


def twoDaysBullishZone;
def twoDaysBearishZone;
def twoDaysNeutralZone;

def twoDaysHiDiff;
def twoDaysLoDiff;
def twoDaysPlusDM;
def twoDaysMinusDM;
def twoDaysDX;
if GetAggregationPeriod() <= AggregationPeriod.two_Days{

    twoDaysHiDiff = high(period = "2 Days") - high(period = "2 Days")[1];
    twoDaysLoDiff = low(period = "2 Days")[1] - low(period = "2 Days");
    twoDaysPlusDM = if twoDaysHiDiff > twoDaysLoDiff and twoDaysHiDiff > 0 then twoDaysHiDiff else 0;
    twoDaysMinusDM =  if twoDaysLoDiff > twoDaysHiDiff and twoDaysLoDiff > 0 then twoDaysLoDiff else 0;
    twoDaysPlus = 100 * MovingAverage(averageType, twoDaysPlusDM, length);
    twoDaysMinus = 100 * MovingAverage(averageType, twoDaysMinusDM, length);
    twoDaysBullishSignal = twoDaysPlus crosses above twoDaysMinus;
    twoDaysBearishSignal = twoDaysPlus crosses below twoDaysMinus;

    twoDaysDX = if (twoDaysPlus + twoDaysMinus > 0) then 100 * AbsValue(twoDaysPlus - twoDaysMinus) / (twoDaysPlus + twoDaysMinus) else 0;
    twoDaysAdx = MovingAverage(averageType, twoDaysDX, length);

    twoDaysBullishZone = twoDaysPlus > twoDaysMinus and twoDaysADX >= ADXLevels;
    twoDaysBearishZone = twoDaysPlus < twoDaysMinus and twoDaysADX >= ADXLevels;
    twoDaysNeutralZone = !twoDaysBullishZone and!twoDaysBearishZone;

}
else {
    twoDaysPlus = 0;
    twoDaysMinus = 0;
    twoDaysAdx = 0;
    twoDaysPlusDM = 0;
    twoDaysMinusDM = 0;
    twoDaysBullishSignal = 0;
    twoDaysBearishSignal = 0;
    twoDaysDX = 0;

    twoDaysBullishZone = 0;
    twoDaysBearishZone = 0;
    twoDaysNeutralZone = 0;

    twoDaysHiDiff = 0;
    twoDaysLoDiff = 0;

}


AddLabel(twoDaysBullishZone, "DI:2D", color.green); AddLabel(twoDaysBearishZone, "DI:2D", color.red); AddLabel(twoDaysNeutralZone, "DI:2D", color.yellow);



def DayPlus;
def DayMinus;
def DayAdx;

def DayBullishSignal;
def DayBearishSignal;


def DayBullishZone;
def DayBearishZone;
def DayNeutralZone;

def DayHiDiff;
def DayLoDiff;
def DayPlusDM;
def DayMinusDM;
def DayDX;
if GetAggregationPeriod() <= AggregationPeriod.Day{

    DayHiDiff = high(period = "Day") - high(period = "Day")[1];
    DayLoDiff = low(period = "Day")[1] - low(period = "Day");
    DayPlusDM = if DayHiDiff > DayLoDiff and DayHiDiff > 0 then DayHiDiff else 0;
    DayMinusDM =  if DayLoDiff > DayHiDiff and DayLoDiff > 0 then DayLoDiff else 0;
    DayPlus = 100 * MovingAverage(averageType, DayPlusDM, length);
    DayMinus = 100 * MovingAverage(averageType, DayMinusDM, length);
    DayBullishSignal = DayPlus crosses above DayMinus;
    DayBearishSignal = DayPlus crosses below DayMinus;

    DayDX = if (DayPlus + DayMinus > 0) then 100 * AbsValue(DayPlus - DayMinus) / (DayPlus + DayMinus) else 0;
    DayAdx = MovingAverage(averageType, DayDX, length);

    DayBullishZone = DayPlus > DayMinus and DayADX >= ADXLevels;
    DayBearishZone = DayPlus < DayMinus and DayADX >= ADXLevels;
    DayNeutralZone = !DayBullishZone and!DayBearishZone;

}
else {
    DayPlus = 0;
    DayMinus = 0;
    DayAdx = 0;
    DayPlusDM = 0;
    DayMinusDM = 0;
    DayBullishSignal = 0;
    DayBearishSignal = 0;
    DayDX = 0;

    DayBullishZone = 0;
    DayBearishZone = 0;
    DayNeutralZone = 0;

    DayHiDiff = 0;
    DayLoDiff = 0;

}


AddLabel(DayBullishZone, "DI:D", color.green); AddLabel(DayBearishZone, "DI:D", color.red); AddLabel(DayNeutralZone, "DI:D", color.yellow);






def fourHoursPlus;
def fourHoursMinus;
def fourHoursAdx;

def fourHoursBullishSignal;
def fourHoursBearishSignal;


def fourHoursBullishZone;
def fourHoursBearishZone;
def fourHoursNeutralZone;

def fourHoursHiDiff;
def fourHoursLoDiff;
def fourHoursPlusDM;
def fourHoursMinusDM;
def fourHoursDX;
if GetAggregationPeriod() <= AggregationPeriod.four_Hours{

    fourHoursHiDiff = high(period = "4 Hours") - high(period = "4 Hours")[1];
    fourHoursLoDiff = low(period = "4 Hours")[1] - low(period = "4 Hours");
    fourHoursPlusDM = if fourHoursHiDiff > fourHoursLoDiff and fourHoursHiDiff > 0 then fourHoursHiDiff else 0;
    fourHoursMinusDM =  if fourHoursLoDiff > fourHoursHiDiff and fourHoursLoDiff > 0 then fourHoursLoDiff else 0;
    fourHoursPlus = 100 * MovingAverage(averageType, fourHoursPlusDM, length);
    fourHoursMinus = 100 * MovingAverage(averageType, fourHoursMinusDM, length);
    fourHoursBullishSignal = fourHoursPlus crosses above fourHoursMinus;
    fourHoursBearishSignal = fourHoursPlus crosses below fourHoursMinus;

    fourHoursDX = if (fourHoursPlus + fourHoursMinus > 0) then 100 * AbsValue(fourHoursPlus - fourHoursMinus) / (fourHoursPlus + fourHoursMinus) else 0;
    fourHoursAdx = MovingAverage(averageType, fourHoursDX, length);

    fourHoursBullishZone = fourHoursPlus > fourHoursMinus and fourHoursADX >= ADXLevels;
    fourHoursBearishZone = fourHoursPlus < fourHoursMinus and fourHoursADX >= ADXLevels;
    fourHoursNeutralZone = !fourHoursBullishZone and!fourHoursBearishZone;

}
else {
    fourHoursPlus = 0;
    fourHoursMinus = 0;
    fourHoursAdx = 0;
    fourHoursPlusDM = 0;
    fourHoursMinusDM = 0;
    fourHoursBullishSignal = 0;
    fourHoursBearishSignal = 0;
    fourHoursDX = 0;

    fourHoursBullishZone = 0;
    fourHoursBearishZone = 0;
    fourHoursNeutralZone = 0;

    fourHoursHiDiff = 0;
    fourHoursLoDiff = 0;

}


AddLabel(fourHoursBullishZone, "DI:4H", color.green); AddLabel(fourHoursBearishZone, "DI:4H", color.red); AddLabel(fourHoursNeutralZone, "DI:4H", color.yellow);





def twoHoursPlus;
def twoHoursMinus;
def twoHoursAdx;

def twoHoursBullishSignal;
def twoHoursBearishSignal;


def twoHoursBullishZone;
def twoHoursBearishZone;
def twoHoursNeutralZone;

def twoHoursHiDiff;
def twoHoursLoDiff;
def twoHoursPlusDM;
def twoHoursMinusDM;
def twoHoursDX;
if GetAggregationPeriod() <= AggregationPeriod.two_Hours{

    twoHoursHiDiff = high(period = "2 Hours") - high(period = "2 Hours")[1];
    twoHoursLoDiff = low(period = "2 Hours")[1] - low(period = "2 Hours");
    twoHoursPlusDM = if twoHoursHiDiff > twoHoursLoDiff and twoHoursHiDiff > 0 then twoHoursHiDiff else 0;
    twoHoursMinusDM =  if twoHoursLoDiff > twoHoursHiDiff and twoHoursLoDiff > 0 then twoHoursLoDiff else 0;
    twoHoursPlus = 100 * MovingAverage(averageType, twoHoursPlusDM, length);
    twoHoursMinus = 100 * MovingAverage(averageType, twoHoursMinusDM, length);
    twoHoursBullishSignal = twoHoursPlus crosses above twoHoursMinus;
    twoHoursBearishSignal = twoHoursPlus crosses below twoHoursMinus;

    twoHoursDX = if (twoHoursPlus + twoHoursMinus > 0) then 100 * AbsValue(twoHoursPlus - twoHoursMinus) / (twoHoursPlus + twoHoursMinus) else 0;
    twoHoursAdx = MovingAverage(averageType, twoHoursDX, length);

    twoHoursBullishZone = twoHoursPlus > twoHoursMinus and twoHoursADX >= ADXLevels;
    twoHoursBearishZone = twoHoursPlus < twoHoursMinus and twoHoursADX >= ADXLevels;
    twoHoursNeutralZone = !twoHoursBullishZone and!twoHoursBearishZone;

}
else {
    twoHoursPlus = 0;
    twoHoursMinus = 0;
    twoHoursAdx = 0;
    twoHoursPlusDM = 0;
    twoHoursMinusDM = 0;
    twoHoursBullishSignal = 0;
    twoHoursBearishSignal = 0;
    twoHoursDX = 0;

    twoHoursBullishZone = 0;
    twoHoursBearishZone = 0;
    twoHoursNeutralZone = 0;

    twoHoursHiDiff = 0;
    twoHoursLoDiff = 0;

}


AddLabel(twoHoursBullishZone, "DI:2H", color.green); AddLabel(twoHoursBearishZone, "DI:2H", color.red); AddLabel(twoHoursNeutralZone, "DI:2H", color.yellow);



def HourPlus;
def HourMinus;
def HourAdx;

def HourBullishSignal;
def HourBearishSignal;


def HourBullishZone;
def HourBearishZone;
def HourNeutralZone;

def HourHiDiff;
def HourLoDiff;
def HourPlusDM;
def HourMinusDM;
def HourDX;
if GetAggregationPeriod() <= AggregationPeriod.Hour{

    HourHiDiff = high(period = "1 Hour") - high(period = "1 Hour")[1];
    HourLoDiff = low(period = "1 Hour")[1] - low(period = "1 Hour");
    HourPlusDM = if HourHiDiff > HourLoDiff and HourHiDiff > 0 then HourHiDiff else 0;
    HourMinusDM =  if HourLoDiff > HourHiDiff and HourLoDiff > 0 then HourLoDiff else 0;
    HourPlus = 100 * MovingAverage(averageType, HourPlusDM, length);
    HourMinus = 100 * MovingAverage(averageType, HourMinusDM, length);
    HourBullishSignal = HourPlus crosses above HourMinus;
    HourBearishSignal = HourPlus crosses below HourMinus;

    HourDX = if (HourPlus + HourMinus > 0) then 100 * AbsValue(HourPlus - HourMinus) / (HourPlus + HourMinus) else 0;
    HourAdx = MovingAverage(averageType, HourDX, length);

    HourBullishZone = HourPlus > HourMinus and HourADX >= ADXLevels;
    HourBearishZone = HourPlus < HourMinus and HourADX >= ADXLevels;
    HourNeutralZone = !HourBullishZone and!HourBearishZone;

}
else {
    HourPlus = 0;
    HourMinus = 0;
    HourAdx = 0;
    HourPlusDM = 0;
    HourMinusDM = 0;
    HourBullishSignal = 0;
    HourBearishSignal = 0;
    HourDX = 0;

    HourBullishZone = 0;
    HourBearishZone = 0;
    HourNeutralZone = 0;

    HourHiDiff = 0;
    HourLoDiff = 0;

}


AddLabel(HourBullishZone, "DI:1H", color.green); AddLabel(HourBearishZone, "DI:1H", color.red); AddLabel(HourNeutralZone, "DI:1H", color.yellow);

 

def thirtyMinPlus;
def thirtyMinMinus;
def thirtyMinAdx;

def thirtyMinBullishSignal;
def thirtyMinBearishSignal;


def thirtyMinBullishZone;
def thirtyMinBearishZone;
def thirtyMinNeutralZone;

def thirtyMinHiDiff;
def thirtyMinLoDiff;
def thirtyMinPlusDM;
def thirtyMinMinusDM;
def thirtyMinDX;
if GetAggregationPeriod() <= AggregationPeriod.thirty_Min{

    thirtyMinHiDiff = high(period = "30 Min") - high(period = "30 Min")[1];
    thirtyMinLoDiff = low(period = "30 Min")[1] - low(period = "30 Min");
    thirtyMinPlusDM = if thirtyMinHiDiff > thirtyMinLoDiff and thirtyMinHiDiff > 0 then thirtyMinHiDiff else 0;
    thirtyMinMinusDM =  if thirtyMinLoDiff > thirtyMinHiDiff and thirtyMinLoDiff > 0 then thirtyMinLoDiff else 0;
    thirtyMinPlus = 100 * MovingAverage(averageType, thirtyMinPlusDM, length);
    thirtyMinMinus = 100 * MovingAverage(averageType, thirtyMinMinusDM, length);
    thirtyMinBullishSignal = thirtyMinPlus crosses above thirtyMinMinus;
    thirtyMinBearishSignal = thirtyMinPlus crosses below thirtyMinMinus;

    thirtyMinDX = if (thirtyMinPlus + thirtyMinMinus > 0) then 100 * AbsValue(thirtyMinPlus - thirtyMinMinus) / (thirtyMinPlus + thirtyMinMinus) else 0;
    thirtyMinAdx = MovingAverage(averageType, thirtyMinDX, length);

    thirtyMinBullishZone = thirtyMinPlus > thirtyMinMinus and thirtyMinADX >= ADXLevels;
    thirtyMinBearishZone = thirtyMinPlus < thirtyMinMinus and thirtyMinADX >= ADXLevels;
    thirtyMinNeutralZone = !thirtyMinBullishZone and!thirtyMinBearishZone;

}
else {
    thirtyMinPlus = 0;
    thirtyMinMinus = 0;
    thirtyMinAdx = 0;
    thirtyMinPlusDM = 0;
    thirtyMinMinusDM = 0;
    thirtyMinBullishSignal = 0;
    thirtyMinBearishSignal = 0;
    thirtyMinDX = 0;

    thirtyMinBullishZone = 0;
    thirtyMinBearishZone = 0;
    thirtyMinNeutralZone = 0;

    thirtyMinHiDiff = 0;
    thirtyMinLoDiff = 0;

}


AddLabel(thirtyMinBullishZone, "DI:30m", color.green); AddLabel(thirtyMinBearishZone, "DI:30m", color.red); AddLabel(thirtyMinNeutralZone, "DI:30m", color.yellow);




def fifteenMinPlus;
def fifteenMinMinus;
def fifteenMinAdx;

def fifteenMinBullishSignal;
def fifteenMinBearishSignal;


def fifteenMinBullishZone;
def fifteenMinBearishZone;
def fifteenMinNeutralZone;

def fifteenMinHiDiff;
def fifteenMinLoDiff;
def fifteenMinPlusDM;
def fifteenMinMinusDM;
def fifteenMinDX;
if GetAggregationPeriod() <= AggregationPeriod.fifteen_Min{

    fifteenMinHiDiff = high(period = "15 Min") - high(period = "15 Min")[1];
    fifteenMinLoDiff = low(period = "15 Min")[1] - low(period = "15 Min");
    fifteenMinPlusDM = if fifteenMinHiDiff > fifteenMinLoDiff and fifteenMinHiDiff > 0 then fifteenMinHiDiff else 0;
    fifteenMinMinusDM =  if fifteenMinLoDiff > fifteenMinHiDiff and fifteenMinLoDiff > 0 then fifteenMinLoDiff else 0;
    fifteenMinPlus = 100 * MovingAverage(averageType, fifteenMinPlusDM, length);
    fifteenMinMinus = 100 * MovingAverage(averageType, fifteenMinMinusDM, length);
    fifteenMinBullishSignal = fifteenMinPlus crosses above fifteenMinMinus;
    fifteenMinBearishSignal = fifteenMinPlus crosses below fifteenMinMinus;

    fifteenMinDX = if (fifteenMinPlus + fifteenMinMinus > 0) then 100 * AbsValue(fifteenMinPlus - fifteenMinMinus) / (fifteenMinPlus + fifteenMinMinus) else 0;
    fifteenMinAdx = MovingAverage(averageType, fifteenMinDX, length);

    fifteenMinBullishZone = fifteenMinPlus > fifteenMinMinus and fifteenMinADX >= ADXLevels;
    fifteenMinBearishZone = fifteenMinPlus < fifteenMinMinus and fifteenMinADX >= ADXLevels;
    fifteenMinNeutralZone = !fifteenMinBullishZone and!fifteenMinBearishZone;

}
else {
    fifteenMinPlus = 0;
    fifteenMinMinus = 0;
    fifteenMinAdx = 0;
    fifteenMinPlusDM = 0;
    fifteenMinMinusDM = 0;
    fifteenMinBullishSignal = 0;
    fifteenMinBearishSignal = 0;
    fifteenMinDX = 0;

    fifteenMinBullishZone = 0;
    fifteenMinBearishZone = 0;
    fifteenMinNeutralZone = 0;

    fifteenMinHiDiff = 0;
    fifteenMinLoDiff = 0;

}


AddLabel(fifteenMinBullishZone, "DI:15m", color.green); AddLabel(fifteenMinBearishZone, "DI:15m", color.red); AddLabel(fifteenMinNeutralZone, "DI:15m", color.yellow);





def tenMinPlus;
def tenMinMinus;
def tenMinAdx;

def tenMinBullishSignal;
def tenMinBearishSignal;


def tenMinBullishZone;
def tenMinBearishZone;
def tenMinNeutralZone;

def tenMinHiDiff;
def tenMinLoDiff;
def tenMinPlusDM;
def tenMinMinusDM;
def tenMinDX;
if GetAggregationPeriod() <= AggregationPeriod.ten_Min{

    tenMinHiDiff = high(period = "10 Min") - high(period = "10 Min")[1];
    tenMinLoDiff = low(period = "10 Min")[1] - low(period = "10 Min");
    tenMinPlusDM = if tenMinHiDiff > tenMinLoDiff and tenMinHiDiff > 0 then tenMinHiDiff else 0;
    tenMinMinusDM =  if tenMinLoDiff > tenMinHiDiff and tenMinLoDiff > 0 then tenMinLoDiff else 0;
    tenMinPlus = 100 * MovingAverage(averageType, tenMinPlusDM, length);
    tenMinMinus = 100 * MovingAverage(averageType, tenMinMinusDM, length);
    tenMinBullishSignal = tenMinPlus crosses above tenMinMinus;
    tenMinBearishSignal = tenMinPlus crosses below tenMinMinus;

    tenMinDX = if (tenMinPlus + tenMinMinus > 0) then 100 * AbsValue(tenMinPlus - tenMinMinus) / (tenMinPlus + tenMinMinus) else 0;
    tenMinAdx = MovingAverage(averageType, tenMinDX, length);

    tenMinBullishZone = tenMinPlus > tenMinMinus and tenMinADX >= ADXLevels;
    tenMinBearishZone = tenMinPlus < tenMinMinus and tenMinADX >= ADXLevels;
    tenMinNeutralZone = !tenMinBullishZone and!tenMinBearishZone;

}
else {
    tenMinPlus = 0;
    tenMinMinus = 0;
    tenMinAdx = 0;
    tenMinPlusDM = 0;
    tenMinMinusDM = 0;
    tenMinBullishSignal = 0;
    tenMinBearishSignal = 0;
    tenMinDX = 0;

    tenMinBullishZone = 0;
    tenMinBearishZone = 0;
    tenMinNeutralZone = 0;

    tenMinHiDiff = 0;
    tenMinLoDiff = 0;

}


AddLabel(tenMinBullishZone, "DI:10m", color.green); AddLabel(tenMinBearishZone, "DI:10m", color.red); AddLabel(tenMinNeutralZone, "DI:10m", color.yellow);




def fiveMinPlus;
def fiveMinMinus;
def fiveMinAdx;

def fiveMinBullishSignal;
def fiveMinBearishSignal;


def fiveMinBullishZone;
def fiveMinBearishZone;
def fiveMinNeutralZone;

def fiveMinHiDiff;
def fiveMinLoDiff;
def fiveMinPlusDM;
def fiveMinMinusDM;
def fiveMinDX;
if GetAggregationPeriod() <= AggregationPeriod.five_Min{

    fiveMinHiDiff = high(period = "5 Min") - high(period = "5 Min")[1];
    fiveMinLoDiff = low(period = "5 Min")[1] - low(period = "5 Min");
    fiveMinPlusDM = if fiveMinHiDiff > fiveMinLoDiff and fiveMinHiDiff > 0 then fiveMinHiDiff else 0;
    fiveMinMinusDM =  if fiveMinLoDiff > fiveMinHiDiff and fiveMinLoDiff > 0 then fiveMinLoDiff else 0;
    fiveMinPlus = 100 * MovingAverage(averageType, fiveMinPlusDM, length);
    fiveMinMinus = 100 * MovingAverage(averageType, fiveMinMinusDM, length);
    fiveMinBullishSignal = fiveMinPlus crosses above fiveMinMinus;
    fiveMinBearishSignal = fiveMinPlus crosses below fiveMinMinus;

    fiveMinDX = if (fiveMinPlus + fiveMinMinus > 0) then 100 * AbsValue(fiveMinPlus - fiveMinMinus) / (fiveMinPlus + fiveMinMinus) else 0;
    fiveMinAdx = MovingAverage(averageType, fiveMinDX, length);

    fiveMinBullishZone = fiveMinPlus > fiveMinMinus and fiveMinADX >= ADXLevels;
    fiveMinBearishZone = fiveMinPlus < fiveMinMinus and fiveMinADX >= ADXLevels;
    fiveMinNeutralZone = !fiveMinBullishZone and!fiveMinBearishZone;

}
else {
    fiveMinPlus = 0;
    fiveMinMinus = 0;
    fiveMinAdx = 0;
    fiveMinPlusDM = 0;
    fiveMinMinusDM = 0;
    fiveMinBullishSignal = 0;
    fiveMinBearishSignal = 0;
    fiveMinDX = 0;

    fiveMinBullishZone = 0;
    fiveMinBearishZone = 0;
    fiveMinNeutralZone = 0;

    fiveMinHiDiff = 0;
    fiveMinLoDiff = 0;

}


AddLabel(fiveMinBullishZone, "DI:5m", color.green); AddLabel(fiveMinBearishZone, "DI:5m", color.red); AddLabel(fiveMinNeutralZone, "DI:5m", color.yellow);




def fourMinPlus;
def fourMinMinus;
def fourMinAdx;

def fourMinBullishSignal;
def fourMinBearishSignal;


def fourMinBullishZone;
def fourMinBearishZone;
def fourMinNeutralZone;

def fourMinHiDiff;
def fourMinLoDiff;
def fourMinPlusDM;
def fourMinMinusDM;
def fourMinDX;
if GetAggregationPeriod() <= AggregationPeriod.four_Min{

    fourMinHiDiff = high(period = "4 Min") - high(period = "4 Min")[1];
    fourMinLoDiff = low(period = "4 Min")[1] - low(period = "4 Min");
    fourMinPlusDM = if fourMinHiDiff > fourMinLoDiff and fourMinHiDiff > 0 then fourMinHiDiff else 0;
    fourMinMinusDM =  if fourMinLoDiff > fourMinHiDiff and fourMinLoDiff > 0 then fourMinLoDiff else 0;
    fourMinPlus = 100 * MovingAverage(averageType, fourMinPlusDM, length);
    fourMinMinus = 100 * MovingAverage(averageType, fourMinMinusDM, length);
    fourMinBullishSignal = fourMinPlus crosses above fourMinMinus;
    fourMinBearishSignal = fourMinPlus crosses below fourMinMinus;

    fourMinDX = if (fourMinPlus + fourMinMinus > 0) then 100 * AbsValue(fourMinPlus - fourMinMinus) / (fourMinPlus + fourMinMinus) else 0;
    fourMinAdx = MovingAverage(averageType, fourMinDX, length);

    fourMinBullishZone = fourMinPlus > fourMinMinus and fourMinADX >= ADXLevels;
    fourMinBearishZone = fourMinPlus < fourMinMinus and fourMinADX >= ADXLevels;
    fourMinNeutralZone = !fourMinBullishZone and!fourMinBearishZone;

}
else {
    fourMinPlus = 0;
    fourMinMinus = 0;
    fourMinAdx = 0;
    fourMinPlusDM = 0;
    fourMinMinusDM = 0;
    fourMinBullishSignal = 0;
    fourMinBearishSignal = 0;
    fourMinDX = 0;

    fourMinBullishZone = 0;
    fourMinBearishZone = 0;
    fourMinNeutralZone = 0;

    fourMinHiDiff = 0;
    fourMinLoDiff = 0;

}


AddLabel(fourMinBullishZone, "DI:4m", color.green); AddLabel(fourMinBearishZone, "DI:4m", color.red); AddLabel(fourMinNeutralZone, "DI:4m", color.yellow);




def threeMinPlus;
def threeMinMinus;
def threeMinAdx;

def threeMinBullishSignal;
def threeMinBearishSignal;


def threeMinBullishZone;
def threeMinBearishZone;
def threeMinNeutralZone;

def threeMinHiDiff;
def threeMinLoDiff;
def threeMinPlusDM;
def threeMinMinusDM;
def threeMinDX;
if GetAggregationPeriod() <= AggregationPeriod.three_Min{

    threeMinHiDiff = high(period = "3 Min") - high(period = "3 Min")[1];
    threeMinLoDiff = low(period = "3 Min")[1] - low(period = "3 Min");
    threeMinPlusDM = if threeMinHiDiff > threeMinLoDiff and threeMinHiDiff > 0 then threeMinHiDiff else 0;
    threeMinMinusDM =  if threeMinLoDiff > threeMinHiDiff and threeMinLoDiff > 0 then threeMinLoDiff else 0;
    threeMinPlus = 100 * MovingAverage(averageType, threeMinPlusDM, length);
    threeMinMinus = 100 * MovingAverage(averageType, threeMinMinusDM, length);
    threeMinBullishSignal = threeMinPlus crosses above threeMinMinus;
    threeMinBearishSignal = threeMinPlus crosses below threeMinMinus;

    threeMinDX = if (threeMinPlus + threeMinMinus > 0) then 100 * AbsValue(threeMinPlus - threeMinMinus) / (threeMinPlus + threeMinMinus) else 0;
    threeMinAdx = MovingAverage(averageType, threeMinDX, length);

    threeMinBullishZone = threeMinPlus > threeMinMinus and threeMinADX >= ADXLevels;
    threeMinBearishZone = threeMinPlus < threeMinMinus and threeMinADX >= ADXLevels;
    threeMinNeutralZone = !threeMinBullishZone and!threeMinBearishZone;

}
else {
    threeMinPlus = 0;
    threeMinMinus = 0;
    threeMinAdx = 0;
    threeMinPlusDM = 0;
    threeMinMinusDM = 0;
    threeMinBullishSignal = 0;
    threeMinBearishSignal = 0;
    threeMinDX = 0;

    threeMinBullishZone = 0;
    threeMinBearishZone = 0;
    threeMinNeutralZone = 0;

    threeMinHiDiff = 0;
    threeMinLoDiff = 0;

}


AddLabel(threeMinBullishZone, "DI:3m", color.green); AddLabel(threeMinBearishZone, "DI:3m", color.red); AddLabel(threeMinNeutralZone, "DI:3m", color.yellow);




def twoMinPlus;
def twoMinMinus;
def twoMinAdx;

def twoMinBullishSignal;
def twoMinBearishSignal;


def twoMinBullishZone;
def twoMinBearishZone;
def twoMinNeutralZone;

def twoMinHiDiff;
def twoMinLoDiff;
def twoMinPlusDM;
def twoMinMinusDM;
def twoMinDX;
if GetAggregationPeriod() <= AggregationPeriod.two_Min{

    twoMinHiDiff = high(period = "2 Min") - high(period = "2 Min")[1];
    twoMinLoDiff = low(period = "2 Min")[1] - low(period = "2 Min");
    twoMinPlusDM = if twoMinHiDiff > twoMinLoDiff and twoMinHiDiff > 0 then twoMinHiDiff else 0;
    twoMinMinusDM =  if twoMinLoDiff > twoMinHiDiff and twoMinLoDiff > 0 then twoMinLoDiff else 0;
    twoMinPlus = 100 * MovingAverage(averageType, twoMinPlusDM, length);
    twoMinMinus = 100 * MovingAverage(averageType, twoMinMinusDM, length);
    twoMinBullishSignal = twoMinPlus crosses above twoMinMinus;
    twoMinBearishSignal = twoMinPlus crosses below twoMinMinus;

    twoMinDX = if (twoMinPlus + twoMinMinus > 0) then 100 * AbsValue(twoMinPlus - twoMinMinus) / (twoMinPlus + twoMinMinus) else 0;
    twoMinAdx = MovingAverage(averageType, twoMinDX, length);

    twoMinBullishZone = twoMinPlus > twoMinMinus and twoMinADX >= ADXLevels;
    twoMinBearishZone = twoMinPlus < twoMinMinus and twoMinADX >= ADXLevels;
    twoMinNeutralZone = !twoMinBullishZone and!twoMinBearishZone;

}
else {
    twoMinPlus = 0;
    twoMinMinus = 0;
    twoMinAdx = 0;
    twoMinPlusDM = 0;
    twoMinMinusDM = 0;
    twoMinBullishSignal = 0;
    twoMinBearishSignal = 0;
    twoMinDX = 0;

    twoMinBullishZone = 0;
    twoMinBearishZone = 0;
    twoMinNeutralZone = 0;

    twoMinHiDiff = 0;
    twoMinLoDiff = 0;

}


AddLabel(twoMinBullishZone, "DI:2m", color.green); AddLabel(twoMinBearishZone, "DI:2m", color.red); AddLabel(twoMinNeutralZone, "DI:2m", color.yellow);





def MinPlus;
def MinMinus;
def MinAdx;

def MinBullishSignal;
def MinBearishSignal;


def MinBullishZone;
def MinBearishZone;
def MinNeutralZone;

def MinHiDiff;
def MinLoDiff;
def MinPlusDM;
def MinMinusDM;
def MinDX;
if GetAggregationPeriod() <= AggregationPeriod.Min{

    MinHiDiff = high(period = "1 Min") - high(period = "1 Min")[1];
    MinLoDiff = low(period = "1 Min")[1] - low(period = "1 Min");
    MinPlusDM = if MinHiDiff > MinLoDiff and MinHiDiff > 0 then MinHiDiff else 0;
    MinMinusDM =  if MinLoDiff > MinHiDiff and MinLoDiff > 0 then MinLoDiff else 0;
    MinPlus = 100 * MovingAverage(averageType, MinPlusDM, length);
    MinMinus = 100 * MovingAverage(averageType, MinMinusDM, length);
    MinBullishSignal = MinPlus crosses above MinMinus;
    MinBearishSignal = MinPlus crosses below MinMinus;

    MinDX = if (MinPlus + MinMinus > 0) then 100 * AbsValue(MinPlus - MinMinus) / (MinPlus + MinMinus) else 0;
    MinAdx = MovingAverage(averageType, MinDX, length);

    MinBullishZone = MinPlus > MinMinus and MinADX >= ADXLevels;
    MinBearishZone = MinPlus < MinMinus and MinADX >= ADXLevels;
    MinNeutralZone = !MinBullishZone and!MinBearishZone;

}
else {
    MinPlus = 0;
    MinMinus = 0;
    MinAdx = 0;
    MinPlusDM = 0;
    MinMinusDM = 0;
    MinBullishSignal = 0;
    MinBearishSignal = 0;
    MinDX = 0;

    MinBullishZone = 0;
    MinBearishZone = 0;
    MinNeutralZone = 0;

    MinHiDiff = 0;
    MinLoDiff = 0;

}


AddLabel(MinBullishZone, "DI:1m", color.green); AddLabel(MinBearishZone, "DI:1m", color.red); AddLabel(MinNeutralZone, "DI:1m", color.yellow);




def HiDiff = high - high[1];
def LoDiff = low[1] - low;
def PlusDM = if HiDiff > LoDiff and HiDiff > 0 then HiDiff else 0;
def MinusDM =  if LoDiff > HiDiff and LoDiff > 0 then LoDiff else 0;

def Plus = 100 * MovingAverage(averageType, PlusDM, length);
def Minus = 100 * MovingAverage(averageType, MinusDM, length);
def BullishSignal = Plus crosses above Minus;
def BearishSignal = Plus crosses below Minus;
def DX = if (Plus + Minus > 0) then 100 * AbsValue(Plus - Minus) / (Plus + Minus) else 0;
def Adx = MovingAverage(averageType, DX, length);

def BullishZone = Plus > Minus and ADX >= ADXLevels;
def BearishZone = Plus < Minus and ADX >= ADXLevels;
def NeutralZone = !BullishZone and!BearishZone;

AssignPriceColor(if coloredCandlesOn and NeutralZone then Color.YELLOW else if coloredCandlesOn and BullishZone then Color.GREEN else if coloredCandlesOn and BearishZone then Color.RED else Color.CURRENT);
