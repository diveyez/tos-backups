# MTF Price Flow Indicator
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/P5rMdqin-Price-Flow/

input price = close;
input DailyPeriod = aggregationPeriod.DAY;
input WeeklyPeriod = aggregationPeriod.WEEK;
input MonthlyPeriod = aggregationPeriod.MONTH;

def Dprice = close(period = DailyPeriod);
def Wprice = close(period = WeeklyPeriod);
def Mprice = close(period = MonthlyPeriod);

def dcomparison = price > Dprice[1];
def wcomparison = price > Wprice[1];
def mcomparison = price > Mprice[1];

AddLabel(yes, "Daily Trend", if dcomparison then Color.GREEN else Color.RED);
AddLabel(yes, "Weekly Trend", if wcomparison then Color.GREEN else Color.RED);
AddLabel(yes, "5m Trend", if mcomparison then Color.GREEN else Color.RED);s