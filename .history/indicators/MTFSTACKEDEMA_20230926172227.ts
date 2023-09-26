#MTF STACKED EMA'S LABELS
#BY: CASEY BRETT


DefineGlobalColor("StackedPositive", color.green);
DefineGlobalColor("StackedNegative", color.red);
DefineGlobalColor("Warning", color.yellow);
DefineGlobalColor("Neutral", color.gray);

# MONTH STACKED EMA'S LABEL

def EMA89Month;
def EMA55Month;
def EMA34Month;
def EMA21Month;
def EMA8Month;
def SPMonth;
def SNMonth;
def SPWMonth;
def SNWMonth;
def monthAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.MONTH {

    EMA89Month = expAverage(close(period = "MONTH"), 89);
    EMA55Month = expAverage(close(period = "MONTH"), 55);
    EMA34Month = expAverage(close(period = "MONTH"), 34);
    EMA21Month = expAverage(close(period = "MONTH"), 21);
    EMA8Month = expAverage(close(period = "MONTH"), 8);
    SPMonth = ema8Month > ema21Month and EMA21Month > EMA34Month and EMA34Month > EMA55Month and EMA55Month > EMA89Month;
    SNMonth = ema8Month < ema21Month and ema21Month < EMA34Month and EMA34Month < EMA55Month and EMA55Month < EMA89Month;
    SPWMonth = ema8Month < ema21Month and EMA34Month > EMA55Month and EMA55Month > EMA89Month;
    SNWMonth = ema8Month > ema21Month  and EMA34Month < EMA55Month and EMA55Month < EMA89Month;
    monthAggregationPeriod = 1;
}
else {
    EMA89Month = 0;
    EMA55Month = 0;
    EMA34Month = 0;
    EMA21Month = 0;
    EMA8Month = 0;
    SPMonth = 0;
    SNMonth = 0;
    SPWMonth = 0;
    SNWMonth = 0;
    monthAggregationPeriod = 0;
}

AddLabel(monthAggregationPeriod, "M: EMA's", if SPMonth then GlobalColor("StackedPositive") else if SNMonth then GlobalColor("StackedNegative") else if (SPWMonth or SNWMonth) then GlobalColor("Warning") else GlobalColor("Neutral"));

# WEEK STACKED EMA'S LABEL

def EMA89Week;
def EMA55Week;
def EMA34Week;
def EMA21Week;
def EMA8Week;
def SPWeek;
def SNWeek;
def SPWWeek;
def SNWWeek;
def WeekAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.Week {

    EMA89Week = expAverage(close(period = "Week"), 89);
    EMA55Week = expAverage(close(period = "Week"), 55);
    EMA34Week = expAverage(close(period = "Week"), 34);
    EMA21Week = expAverage(close(period = "Week"), 21);
    EMA8Week = expAverage(close(period = "Week"), 8);
    SPWeek = ema8Week > ema21Week and EMA21Week > EMA34Week and EMA34Week > EMA55Week and EMA55Week > EMA89Week;
    SNWeek = ema8Week < ema21Week and ema21Week < EMA34Week and EMA34Week < EMA55Week and EMA55Week < EMA89Week;
    SPWWeek = ema8Week < ema21Week and EMA34Week > EMA55Week and EMA55Week > EMA89Week;
    SNWWeek = ema8Week > ema21Week  and EMA34Week < EMA55Week and EMA55Week < EMA89Week;
    WeekAggregationPeriod = 1;
}
else {
    EMA89Week = 0;
    EMA55Week = 0;
    EMA34Week = 0;
    EMA21Week = 0;
    EMA8Week = 0;
    SPWeek = 0;
    SNWeek = 0;
    SPWWeek = 0;
    SNWWeek = 0;
    WeekAggregationPeriod = 0;
}

AddLabel(WeekAggregationPeriod, "W: EMA's", if SPWeek then GlobalColor("StackedPositive") else if SNWeek then GlobalColor("StackedNegative") else if (SPWWeek or SNWWeek) then GlobalColor("Warning") else GlobalColor("Neutral"));

# 4 - DAY STACKED EMA'S LABEL

def EMA89FOUR_DAYS;
def EMA55FOUR_DAYS;
def EMA34FOUR_DAYS;
def EMA21FOUR_DAYS;
def EMA8FOUR_DAYS;
def SPFOUR_DAYS;
def SNFOUR_DAYS;
def SPWFOUR_DAYS;
def SNWFOUR_DAYS;
def FOUR_DAYSAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.FOUR_DAYS {

    EMA89FOUR_DAYS = expAverage(close(period = "4 DAYS"), 89);
    EMA55FOUR_DAYS = expAverage(close(period = "4 DAYS"), 55);
    EMA34FOUR_DAYS = expAverage(close(period = "4 DAYS"), 34);
    EMA21FOUR_DAYS = expAverage(close(period = "4 DAYS"), 21);
    EMA8FOUR_DAYS = expAverage(close(period = "4 DAYS"), 8);
    SPFOUR_DAYS = ema8FOUR_DAYS > ema21FOUR_DAYS and EMA21FOUR_DAYS > EMA34FOUR_DAYS and EMA34FOUR_DAYS > EMA55FOUR_DAYS and EMA55FOUR_DAYS > EMA89FOUR_DAYS;
    SNFOUR_DAYS = ema8FOUR_DAYS < ema21FOUR_DAYS and ema21FOUR_DAYS < EMA34FOUR_DAYS and EMA34FOUR_DAYS < EMA55FOUR_DAYS and EMA55FOUR_DAYS < EMA89FOUR_DAYS;
    SPWFOUR_DAYS = ema8FOUR_DAYS < ema21FOUR_DAYS and EMA34FOUR_DAYS > EMA55FOUR_DAYS and EMA55FOUR_DAYS > EMA89FOUR_DAYS;
    SNWFOUR_DAYS = ema8FOUR_DAYS > ema21FOUR_DAYS  and EMA34FOUR_DAYS < EMA55FOUR_DAYS and EMA55FOUR_DAYS < EMA89FOUR_DAYS;
    FOUR_DAYSAggregationPeriod = 1;
}
else {
    EMA89FOUR_DAYS = 0;
    EMA55FOUR_DAYS = 0;
    EMA34FOUR_DAYS = 0;
    EMA21FOUR_DAYS = 0;
    EMA8FOUR_DAYS = 0;
    SPFOUR_DAYS = 0;
    SNFOUR_DAYS = 0;
    SPWFOUR_DAYS = 0;
    SNWFOUR_DAYS = 0;
    FOUR_DAYSAggregationPeriod = 0;
}

AddLabel(FOUR_DAYSAggregationPeriod, "4D: EMA's", if SPFOUR_DAYS then GlobalColor("StackedPositive") else if SNFOUR_DAYS then GlobalColor("StackedNegative") else if (SPWFOUR_DAYS or SNWFOUR_DAYS) then GlobalColor("Warning") else GlobalColor("Neutral"));

# 3 - DAYS STACKED EMA'S LABEL

def EMA89THREE_DAYS;
def EMA55THREE_DAYS;
def EMA34THREE_DAYS;
def EMA21THREE_DAYS;
def EMA8THREE_DAYS;
def SPTHREE_DAYS;
def SNTHREE_DAYS;
def SPWTHREE_DAYS;
def SNWTHREE_DAYS;
def THREE_DAYSAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.THREE_DAYS {

    EMA89THREE_DAYS = expAverage(close(period = "3 DAYS"), 89);
    EMA55THREE_DAYS = expAverage(close(period = "3 DAYS"), 55);
    EMA34THREE_DAYS = expAverage(close(period = "3 DAYS"), 34);
    EMA21THREE_DAYS = expAverage(close(period = "3 DAYS"), 21);
    EMA8THREE_DAYS = expAverage(close(period = "3 DAYS"), 8);
    SPTHREE_DAYS = ema8THREE_DAYS > ema21THREE_DAYS and EMA21THREE_DAYS > EMA34THREE_DAYS and EMA34THREE_DAYS > EMA55THREE_DAYS and EMA55THREE_DAYS > EMA89THREE_DAYS;
    SNTHREE_DAYS = ema8THREE_DAYS < ema21THREE_DAYS and ema21THREE_DAYS < EMA34THREE_DAYS and EMA34THREE_DAYS < EMA55THREE_DAYS and EMA55THREE_DAYS < EMA89THREE_DAYS;
    SPWTHREE_DAYS = ema8THREE_DAYS < ema21THREE_DAYS and EMA34THREE_DAYS > EMA55THREE_DAYS and EMA55THREE_DAYS > EMA89THREE_DAYS;
    SNWTHREE_DAYS = ema8THREE_DAYS > ema21THREE_DAYS  and EMA34THREE_DAYS < EMA55THREE_DAYS and EMA55THREE_DAYS < EMA89THREE_DAYS;
    THREE_DAYSAggregationPeriod = 1;
}
else {
    EMA89THREE_DAYS = 0;
    EMA55THREE_DAYS = 0;
    EMA34THREE_DAYS = 0;
    EMA21THREE_DAYS = 0;
    EMA8THREE_DAYS = 0;
    SPTHREE_DAYS = 0;
    SNTHREE_DAYS = 0;
    SPWTHREE_DAYS = 0;
    SNWTHREE_DAYS = 0;
    THREE_DAYSAggregationPeriod = 0;
}

AddLabel(THREE_DAYSAggregationPeriod, "3D: EMA's", if SPTHREE_DAYS then GlobalColor("StackedPositive") else if SNTHREE_DAYS then GlobalColor("StackedNegative") else if (SPWTHREE_DAYS or SNWTHREE_DAYS) then GlobalColor("Warning") else GlobalColor("Neutral"));

# 2 - DAYS STACKED EMA'S LABEL

def EMA89TWO_DAYS;
def EMA55TWO_DAYS;
def EMA34TWO_DAYS;
def EMA21TWO_DAYS;
def EMA8TWO_DAYS;
def SPTWO_DAYS;
def SNTWO_DAYS;
def SPWTWO_DAYS;
def SNWTWO_DAYS;
def TWO_DAYSAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.TWO_DAYS {

    EMA89TWO_DAYS = expAverage(close(period = "2 DAYS"), 89);
    EMA55TWO_DAYS = expAverage(close(period = "2 DAYS"), 55);
    EMA34TWO_DAYS = expAverage(close(period = "2 DAYS"), 34);
    EMA21TWO_DAYS = expAverage(close(period = "2 DAYS"), 21);
    EMA8TWO_DAYS = expAverage(close(period = "2 DAYS"), 8);
    SPTWO_DAYS = ema8TWO_DAYS > ema21TWO_DAYS and EMA21TWO_DAYS > EMA34TWO_DAYS and EMA34TWO_DAYS > EMA55TWO_DAYS and EMA55TWO_DAYS > EMA89TWO_DAYS;
    SNTWO_DAYS = ema8TWO_DAYS < ema21TWO_DAYS and ema21TWO_DAYS < EMA34TWO_DAYS and EMA34TWO_DAYS < EMA55TWO_DAYS and EMA55TWO_DAYS < EMA89TWO_DAYS;
    SPWTWO_DAYS = ema8TWO_DAYS < ema21TWO_DAYS and EMA34TWO_DAYS > EMA55TWO_DAYS and EMA55TWO_DAYS > EMA89TWO_DAYS;
    SNWTWO_DAYS = ema8TWO_DAYS > ema21TWO_DAYS  and EMA34TWO_DAYS < EMA55TWO_DAYS and EMA55TWO_DAYS < EMA89TWO_DAYS;
    TWO_DAYSAggregationPeriod = 1;
}
else {
    EMA89TWO_DAYS = 0;
    EMA55TWO_DAYS = 0;
    EMA34TWO_DAYS = 0;
    EMA21TWO_DAYS = 0;
    EMA8TWO_DAYS = 0;
    SPTWO_DAYS = 0;
    SNTWO_DAYS = 0;
    SPWTWO_DAYS = 0;
    SNWTWO_DAYS = 0;
    TWO_DAYSAggregationPeriod = 0;
}

AddLabel(TWO_DAYSAggregationPeriod, "2D: EMA's", if SPTWO_DAYS then GlobalColor("StackedPositive") else if SNTWO_DAYS then GlobalColor("StackedNegative") else if (SPWTWO_DAYS or SNWTWO_DAYS) then GlobalColor("Warning") else GlobalColor("Neutral"));

# ONE DAY STACKED EMA'S LABEL

def EMA89DAY;
def EMA55DAY;
def EMA34DAY;
def EMA21DAY;
def EMA8DAY;
def SPDAY;
def SNDAY;
def SPWDAY;
def SNWDAY;
def DAYAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.DAY {

    EMA89DAY = expAverage(close(period = "DAY"), 89);
    EMA55DAY = expAverage(close(period = "DAY"), 55);
    EMA34DAY = expAverage(close(period = "DAY"), 34);
    EMA21DAY = expAverage(close(period = "DAY"), 21);
    EMA8DAY = expAverage(close(period = "DAY"), 8);
    SPDAY = ema8DAY > ema21DAY and EMA21DAY > EMA34DAY and EMA34DAY > EMA55DAY and EMA55DAY > EMA89DAY;
    SNDAY = ema8DAY < ema21DAY and ema21DAY < EMA34DAY and EMA34DAY < EMA55DAY and EMA55DAY < EMA89DAY;
    SPWDAY = ema8DAY < ema21DAY and EMA34DAY > EMA55DAY and EMA55DAY > EMA89DAY;
    SNWDAY = ema8DAY > ema21DAY  and EMA34DAY < EMA55DAY and EMA55DAY < EMA89DAY;
    DAYAggregationPeriod = 1;
}
else {
    EMA89DAY = 0;
    EMA55DAY = 0;
    EMA34DAY = 0;
    EMA21DAY = 0;
    EMA8DAY = 0;
    SPDAY = 0;
    SNDAY = 0;
    SPWDAY = 0;
    SNWDAY = 0;
    DAYAggregationPeriod = 0;
}

AddLabel(DAYAggregationPeriod, "D: EMA's", if SPDAY then GlobalColor("StackedPositive") else if SNDAY then GlobalColor("StackedNegative") else if (SPWDAY or SNWDAY) then GlobalColor("Warning") else GlobalColor("Neutral"));

# 4 HOUR STACKED EMA'S LABEL

def EMA89FOUR_HOURS;
def EMA55FOUR_HOURS;
def EMA34FOUR_HOURS;
def EMA21FOUR_HOURS;
def EMA8FOUR_HOURS;
def SPFOUR_HOURS;
def SNFOUR_HOURS;
def SPWFOUR_HOURS;
def SNWFOUR_HOURS;
def FOUR_HOURSAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.FOUR_HOURS {

    EMA89FOUR_HOURS = expAverage(close(period = "4 HOURS"), 89);
    EMA55FOUR_HOURS = expAverage(close(period = "4 HOURS"), 55);
    EMA34FOUR_HOURS = expAverage(close(period = "4 HOURS"), 34);
    EMA21FOUR_HOURS = expAverage(close(period = "4 HOURS"), 21);
    EMA8FOUR_HOURS = expAverage(close(period = "4 HOURS"), 8);
    SPFOUR_HOURS = ema8FOUR_HOURS > ema21FOUR_HOURS and EMA21FOUR_HOURS > EMA34FOUR_HOURS and EMA34FOUR_HOURS > EMA55FOUR_HOURS and EMA55FOUR_HOURS > EMA89FOUR_HOURS;
    SNFOUR_HOURS = ema8FOUR_HOURS < ema21FOUR_HOURS and ema21FOUR_HOURS < EMA34FOUR_HOURS and EMA34FOUR_HOURS < EMA55FOUR_HOURS and EMA55FOUR_HOURS < EMA89FOUR_HOURS;
    SPWFOUR_HOURS = ema8FOUR_HOURS < ema21FOUR_HOURS and EMA34FOUR_HOURS > EMA55FOUR_HOURS and EMA55FOUR_HOURS > EMA89FOUR_HOURS;
    SNWFOUR_HOURS = ema8FOUR_HOURS > ema21FOUR_HOURS  and EMA34FOUR_HOURS < EMA55FOUR_HOURS and EMA55FOUR_HOURS < EMA89FOUR_HOURS;
    FOUR_HOURSAggregationPeriod = 1;
}
else {
    EMA89FOUR_HOURS = 0;
    EMA55FOUR_HOURS = 0;
    EMA34FOUR_HOURS = 0;
    EMA21FOUR_HOURS = 0;
    EMA8FOUR_HOURS = 0;
    SPFOUR_HOURS = 0;
    SNFOUR_HOURS = 0;
    SPWFOUR_HOURS = 0;
    SNWFOUR_HOURS = 0;
    FOUR_HOURSAggregationPeriod = 0;
}

AddLabel(FOUR_HOURSAggregationPeriod, "4h: EMA's", if SPFOUR_HOURS then GlobalColor("StackedPositive") else if SNFOUR_HOURS then GlobalColor("StackedNegative") else if (SPWFOUR_HOURS or SNWFOUR_HOURS) then GlobalColor("Warning") else GlobalColor("Neutral"));

# 2 HOUR STACKED EMA'S LABEL

def EMA89TWO_HOURS;
def EMA55TWO_HOURS;
def EMA34TWO_HOURS;
def EMA21TWO_HOURS;
def EMA8TWO_HOURS;
def SPTWO_HOURS;
def SNTWO_HOURS;
def SPWTWO_HOURS;
def SNWTWO_HOURS;
def TWO_HOURSAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.TWO_HOURS {

    EMA89TWO_HOURS = expAverage(close(period = "2 HOURS"), 89);
    EMA55TWO_HOURS = expAverage(close(period = "2 HOURS"), 55);
    EMA34TWO_HOURS = expAverage(close(period = "2 HOURS"), 34);
    EMA21TWO_HOURS = expAverage(close(period = "2 HOURS"), 21);
    EMA8TWO_HOURS = expAverage(close(period = "2 HOURS"), 8);
    SPTWO_HOURS = ema8TWO_HOURS > ema21TWO_HOURS and EMA21TWO_HOURS > EMA34TWO_HOURS and EMA34TWO_HOURS > EMA55TWO_HOURS and EMA55TWO_HOURS > EMA89TWO_HOURS;
    SNTWO_HOURS = ema8TWO_HOURS < ema21TWO_HOURS and ema21TWO_HOURS < EMA34TWO_HOURS and EMA34TWO_HOURS < EMA55TWO_HOURS and EMA55TWO_HOURS < EMA89TWO_HOURS;
    SPWTWO_HOURS = ema8TWO_HOURS < ema21TWO_HOURS and EMA34TWO_HOURS > EMA55TWO_HOURS and EMA55TWO_HOURS > EMA89TWO_HOURS;
    SNWTWO_HOURS = ema8TWO_HOURS > ema21TWO_HOURS  and EMA34TWO_HOURS < EMA55TWO_HOURS and EMA55TWO_HOURS < EMA89TWO_HOURS;
    TWO_HOURSAggregationPeriod = 1;
}
else {
    EMA89TWO_HOURS = 0;
    EMA55TWO_HOURS = 0;
    EMA34TWO_HOURS = 0;
    EMA21TWO_HOURS = 0;
    EMA8TWO_HOURS = 0;
    SPTWO_HOURS = 0;
    SNTWO_HOURS = 0;
    SPWTWO_HOURS = 0;
    SNWTWO_HOURS = 0;
    TWO_HOURSAggregationPeriod = 0;
}

AddLabel(TWO_HOURSAggregationPeriod, "2h: EMA's", if SPTWO_HOURS then GlobalColor("StackedPositive") else if SNTWO_HOURS then GlobalColor("StackedNegative") else if (SPWTWO_HOURS or SNWTWO_HOURS) then GlobalColor("Warning") else GlobalColor("Neutral"));

# ONE HOUR STACKED EMA'S SCHEDULE

def EMA89HOUR;
def EMA55HOUR;
def EMA34HOUR;
def EMA21HOUR;
def EMA8HOUR;
def SPHOUR;
def SNHOUR;
def SPWHOUR;
def SNWHOUR;
def HOURAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.HOUR {

    EMA89HOUR = expAverage(close(period = "1 HOUR"), 89);
    EMA55HOUR = expAverage(close(period = "1 HOUR"), 55);
    EMA34HOUR = expAverage(close(period = "1 HOUR"), 34);
    EMA21HOUR = expAverage(close(period = "1 HOUR"), 21);
    EMA8HOUR = expAverage(close(period = "1 HOUR"), 8);
    SPHOUR = ema8HOUR > ema21HOUR and EMA21HOUR > EMA34HOUR and EMA34HOUR > EMA55HOUR and EMA55HOUR > EMA89HOUR;
    SNHOUR = ema8HOUR < ema21HOUR and ema21HOUR < EMA34HOUR and EMA34HOUR < EMA55HOUR and EMA55HOUR < EMA89HOUR;
    SPWHOUR = ema8HOUR < ema21HOUR and EMA34HOUR > EMA55HOUR and EMA55HOUR > EMA89HOUR;
    SNWHOUR = ema8HOUR > ema21HOUR  and EMA34HOUR < EMA55HOUR and EMA55HOUR < EMA89HOUR;
    HOURAggregationPeriod = 1;
}
else {
    EMA89HOUR = 0;
    EMA55HOUR = 0;
    EMA34HOUR = 0;
    EMA21HOUR = 0;
    EMA8HOUR = 0;
    SPHOUR = 0;
    SNHOUR = 0;
    SPWHOUR = 0;
    SNWHOUR = 0;
    HOURAggregationPeriod = 0;
}

AddLabel(HOURAggregationPeriod, "1h: EMA's", if SPHOUR then GlobalColor("StackedPositive") else if SNHOUR then GlobalColor("StackedNegative") else if (SPWHOUR or SNWHOUR) then GlobalColor("Warning") else GlobalColor("Neutral"));

# 30 - MIN STACKED EMA'S LABEL

def EMA89THIRTY_MIN;
def EMA55THIRTY_MIN;
def EMA34THIRTY_MIN;
def EMA21THIRTY_MIN;
def EMA8THIRTY_MIN;
def SPTHIRTY_MIN;
def SNTHIRTY_MIN;
def SPWTHIRTY_MIN;
def SNWTHIRTY_MIN;
def THIRTY_MINAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.THIRTY_MIN {

    EMA89THIRTY_MIN = expAverage(close(period = "30 MIN"), 89);
    EMA55THIRTY_MIN = expAverage(close(period = "30 MIN"), 55);
    EMA34THIRTY_MIN = expAverage(close(period = "30 MIN"), 34);
    EMA21THIRTY_MIN = expAverage(close(period = "30 MIN"), 21);
    EMA8THIRTY_MIN = expAverage(close(period = "30 MIN"), 8);
    SPTHIRTY_MIN = ema8THIRTY_MIN > ema21THIRTY_MIN and EMA21THIRTY_MIN > EMA34THIRTY_MIN and EMA34THIRTY_MIN > EMA55THIRTY_MIN and EMA55THIRTY_MIN > EMA89THIRTY_MIN;
    SNTHIRTY_MIN = ema8THIRTY_MIN < ema21THIRTY_MIN and ema21THIRTY_MIN < EMA34THIRTY_MIN and EMA34THIRTY_MIN < EMA55THIRTY_MIN and EMA55THIRTY_MIN < EMA89THIRTY_MIN;
    SPWTHIRTY_MIN = ema8THIRTY_MIN < ema21THIRTY_MIN and EMA34THIRTY_MIN > EMA55THIRTY_MIN and EMA55THIRTY_MIN > EMA89THIRTY_MIN;
    SNWTHIRTY_MIN = ema8THIRTY_MIN > ema21THIRTY_MIN  and EMA34THIRTY_MIN < EMA55THIRTY_MIN and EMA55THIRTY_MIN < EMA89THIRTY_MIN;
    THIRTY_MINAggregationPeriod = 1;
}
else {
    EMA89THIRTY_MIN = 0;
    EMA55THIRTY_MIN = 0;
    EMA34THIRTY_MIN = 0;
    EMA21THIRTY_MIN = 0;
    EMA8THIRTY_MIN = 0;
    SPTHIRTY_MIN = 0;
    SNTHIRTY_MIN = 0;
    SPWTHIRTY_MIN = 0;
    SNWTHIRTY_MIN = 0;
    THIRTY_MINAggregationPeriod = 0;
}

AddLabel(THIRTY_MINAggregationPeriod, "30m: EMA's", if SPTHIRTY_MIN then GlobalColor("StackedPositive") else if SNTHIRTY_MIN then GlobalColor("StackedNegative") else if (SPWTHIRTY_MIN or SNWTHIRTY_MIN) then GlobalColor("Warning") else GlobalColor("Neutral"));