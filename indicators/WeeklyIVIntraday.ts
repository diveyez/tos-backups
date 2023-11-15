# Weekly Options Implied Volatility Plotted intraday
# Mobius
# Chat Room Request
# 02.27.2016

declare Once_Per_Bar;

input series = 1;
input show_label = yes;
input Days_In_Contract = 0;
Assert(series > 0, "'series' must be positive: " + series);

def RTHopen = open(period = AggregationPeriod.Day);
def CurrentYear = GetYear();
def CurrentMonth = GetMonth();
def CurrentDOM = GetDayOfMonth(GetYYYYMMDD());
def Day1DOW1 = GetDayOfWeek(CurrentYear * 10000 + CurrentMonth * 100 + 1); # First DOM is this DOW
def FirstFridayDOM1 = if Day1DOW1 < 6
    then 6 - Day1DOW1
    else if Day1DOW1 == 6
         then 7
         else 6;

def SecondFridayDOM = FirstFridayDOM1 + 7;
def ThirdFridayDOM = FirstFridayDOM1 + 14;
def FourthFridayDOM = FirstFridayDOM1 + 21;
def RollDOM = FirstFridayDOM1 + 21; #14; changed to 21 to pick up all Fridays of the current month for weekly options
def ExpMonth1 = if RollDOM > CurrentDOM
    then CurrentMonth + series - 1
    else CurrentMonth + series;
def ExpMonth2 = if ExpMonth1 > 12
    then ExpMonth1 - 12
    else ExpMonth1;

def ExpYear = if ExpMonth1 > 12
    then CurrentYear + 1
    else CurrentYear;

def Day1DOW = GetDayOfWeek(ExpYear * 10000 + ExpMonth2 * 100 + 1);
def FirstFridayDOM = if Day1DOW < 6
    then 6 - Day1DOW
    else if Day1DOW == 6
         then 7
         else 6;

def ExpDOM = if currentDOM < FirstFridayDOM - 1
    then FirstFridayDOM1
    else if between(currentDOM, FirstFridayDOM, SecondFridayDOM - 1)
         then SecondFridayDOM
         else if between(currentDOM, SecondFridayDOM, ThirdFridayDOM - 1)
              then ThirdFridayDOM
              else if between(currentDOM, ThirdFridayDOM, FourthFridayDOM - 1)
                   then FourthFridayDOM
                   else FirstFridayDOM;

def NextFriday = DaysTillDate(ExpYear * 10000 + ExpMonth2 * 100 + ExpDOM);
def ExpirationDate = GetYYYYMMDD() + NextFriday;
def ExpData = (ExpirationDate / 1) + 1;
def yr = Round(GetYear() / 100, 0);
def yr2 = GetYear() - 2000;
def OptionDateString = ExpYear * 10000 + ExpMonth2 * 100 + ExpDOM + 1;
def ATMCprice = if isNaN(close(symbol = GetATMOption(GetUnderlyingSymbol(), OptionDateString, OptionClass.CALL)))

    then ATMCprice[1]

    else close(symbol = GetATMOption(GetUnderlyingSymbol(), OptionDateString, OptionClass.CALL));

def HPD = if Days_In_Contract == 0 #HPD = Holding Period Days

    then NextFriday

    else Days_In_Contract;

def t = HPD / 365;

def ClosedForm_IV_est = if isNaN(((ATMCprice[1] * Sqrt(2 * Double.Pi)) / (RTHopen * Sqrt(t))))
                        then ClosedForm_IV_est[1]
                        else ((ATMCprice * Sqrt(2 * Double.Pi)) / (RTHopen * Sqrt(t)));

def Intraday_IV = if ClosedForm_IV_est > 0 then ClosedForm_IV_est else double.nan;
def ImpMove = Round((close[1] * Intraday_IV / Sqrt(365)) / tickSize(), 0) * tickSize();
plot upper = RTHopen + ImpMove[1];
plot lower = RTHopen - ImpMove[1];

upper.SetStyle(Curve.Firm);
upper.SetDefaultColor(Color.Cyan);
lower.SetStyle(Curve.Firm);
lower.SetDefaultColor(Color.Cyan);

def ActualMove = close[1] - RTHopen;

AddLabel(show_label and IsOptionable(), "ATM Call option is " +
    GetATMOption(GetUnderlyingSymbol(), OptionDateString, OptionClass.CALL) +
    " Price = $" +
    ATMCprice +
    "  Intraday IV = " +
    AsPercent(ClosedForm_IV_est) +
    "  Implied Move = +- " +
    AsDollars(ImpMove) +
    "  Actual Move = " +
    AsDollars(ActualMove)
    , if close > RTHopen then color.green else color.red);

# End Code Weekly Options