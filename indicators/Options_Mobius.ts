# Option Prices At Close with Open Interest Intraday Charts Only
# Mobius
# V01.03.2017

declare hide_on_daily;

input series = 1;
input show_All_labels = yes;

Assert(series > 0, "'series' must be positive: " + series);

def c = close;
def interest_rate = GetInterestRate();
def yield = GetYield() * 4;
def iv;
if GetAggregationPeriod() < AggregationPeriod.DAY {
    iv = imp_volatility(period = AggregationPeriod.DAY);
} else {
    iv = imp_volatility();
}

def CurrentYear = GetYear();
def CurrentMonth = GetMonth();
def CurrentDOM = GetDayOfMonth(GetYYYYMMDD());
def Day1DOW1 = GetDayOfWeek(CurrentYear * 10000 + CurrentMonth * 100 + 1);
def FirstFridayDOM1 = if Day1DOW1 < 6
                      then 6 - Day1DOW1
                      else if Day1DOW1 == 6
                           then 7
                           else 6;

def RollDOM = FirstFridayDOM1 + 14;
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
def ExpDOM = FirstFridayDOM + 14;
def N3rdF = DaysTillDate(ExpYear * 10000 + ExpMonth2 * 100 + ExpDOM);
def OptionDateString = ExpYear * 10000 + ExpMonth2 * 100 + ExpDOM + 1;
Addlabel(1, "Options Expy. Date: " + ExpMonth2 + "/" + ExpDOM + "/" + AsPrice(ExpYear), color.white);

# Strike Plots
plot Strike = HighestAll(if IsNaN(c[-1])
                         then Round(c, 0)
                         else Double.NaN);
Strike.SetDefaultColor(Color.CYAN);
plot OTM_1_Strike = HighestAll(if IsNaN(c[-1])
                               then Round(c, 0) - 1
                               else Double.NaN);
OTM_1_Strike.SetDefaultColor(Color.CYAN);
plot OTM_2_Strike = HighestAll(if IsNaN(c[-1])
                               then Round(c, 0) - 2
                               else Double.NaN);

OTM_2_Strike.SetDefaultColor(Color.CYAN);
plot ITM_1_Strike = HighestAll(if IsNaN(c[-1])
                               then Round(c, 0) + 1
                               else Double.NaN);

ITM_1_Strike.SetDefaultColor(Color.CYAN);
plot ITM_2_Strike = HighestAll(if IsNaN(c[-1])
                               then Round(c, 0) + 2
                               else Double.NaN);

ITM_2_Strike.SetDefaultColor(Color.CYAN);

# At The Money
def ATMTheoC = OptionPrice(Strike, 0, N3rdF, c, iv, 0, yield, interest_rate);
def ATM_CALL = if IsNaN(ATMTheoC)
               then ATM_CALL[1]
               else ATMTheoC;

def ATM_OI_C = open_interest(GetATMOption(GetUnderlyingSymbol(), OptionDateString, OptionClass.CALL), period = AggregationPeriod.DAY);

def ATMOIC = if IsNaN(ATM_OI_C)
             then ATMOIC[1]
             else ATM_OI_C;

def ATMTheoP = OptionPrice(Strike, 1, N3rdF, c, iv, 0, yield, interest_rate);
def ATM_PUT = if IsNaN(ATMTheoP)
              then ATM_PUT[1]
              else ATMTheoP;

def ATM_OI_P = open_interest(GetATMOption(GetUnderlyingSymbol(), OptionDateString, OptionClass.PUT), period = AggregationPeriod.DAY);

def ATMOIP = if IsNaN(ATM_OI_P)
             then ATMOIP[1]
             else ATM_OI_P;

def bubbleLocation = IsNaN(c[2]) and!IsNaN(c[3]);
AddChartBubble(bubbleLocation, Strike, "CALL = " +
    AsDollars(ATM_CALL) +

    "  OI = " +

    ATMOIC +

    "\nPUT    = " + AsDollars(ATM_PUT) +

    "  OI = " + ATMOIP,

    Color.CYAN,

               if c > Strike 

               then 0 

               else 1);

# $1.00 Out Of The Money

def OTM_1_TheoC = OptionPrice(OTM_1_Strike, 0, N3rdF, c, iv, 0, yield, interest_rate);

def OTM_1_CALL = if IsNaN(OTM_1_TheoC)
                 then OTM_1_CALL[1]
                 else OTM_1_TheoC;

def OTM_OI_C = open_interest("." + GetUnderlyingSymbol() + (Expyear - 2000) + (if Expmonth2 < 10 then 0 else double.nan) + (ExpMonth2) + (N3rdF) + "C" + OTM_1_Strike, period = AggregationPeriod.DAY);

def OTMOIC = if IsNaN(OTM_OI_C)
             then OTMOIC[1]
             else OTM_OI_C;

def OTM_1_TheoP = OptionPrice(OTM_1_Strike, 1, N3rdF, c, iv, 0, yield, interest_rate);

def OTM_1_PUT = if IsNaN(OTM_1_TheoP)
                then OTM_1_PUT[1]
                else OTM_1_TheoP;

def OTM_OI_P = open_interest("." + GetUnderlyingSymbol() + (Expyear - 2000) + (if Expmonth2 < 10 then 0 else double.nan) + (ExpMonth2) + (N3rdF) + "P" + OTM_1_Strike, period = AggregationPeriod.DAY);

def OTMOIP = if IsNaN(OTM_OI_P)
             then OTMOIP[1]
             else OTM_OI_P;

AddChartBubble(bubbleLocation, OTM_1_Strike, "CALL = " +

    AsDollars(OTM_1_CALL) +
    "   OI = " + OTMOIC +
    "\nPUT    = " + AsDollars(OTM_1_PUT) +
    "   OI = " + OTMOIP,
    Color.CYAN,
               if c > OTM_1_Strike 
               then 0 
               else 1);

# $2.00 Out Of The Money

def OTM_2_TheoC = OptionPrice(OTM_2_Strike, 0, N3rdF, c, iv, 0, yield, interest_rate);

def OTM_2_CALL = if IsNaN(OTM_2_TheoC)
                 then OTM_2_CALL[1]
                 else OTM_2_TheoC;

def OTM2_OI_C = open_interest("." + GetUnderlyingSymbol() + (Expyear - 2000) + (if Expmonth2 < 10 then 0 else double.nan) + (ExpMonth2) + (N3rdF) + "C" + OTM_2_Strike, period = AggregationPeriod.DAY);

def OTMOIC2 = if IsNaN(OTM2_OI_C)
             then OTMOIC2[1]
             else OTM2_OI_C;

def OTM_2_TheoP = OptionPrice(OTM_2_Strike, 1, N3rdF, c, iv, 0, yield, interest_rate);

def OTM_2_PUT = if IsNaN(OTM_2_TheoP)
                then OTM_2_PUT[1]
                else OTM_2_TheoP;

def OTM2_OI_P = open_interest("." + GetUnderlyingSymbol() + (Expyear - 2000) + (if Expmonth2 < 10 then 0 else double.nan) + (ExpMonth2) + (N3rdF) + "P" + OTM_2_Strike, period = AggregationPeriod.DAY);

def OTMOIP2 = if IsNaN(OTM2_OI_P)
             then OTMOIP2[1]
             else OTM2_OI_P;

AddChartBubble(bubbleLocation, OTM_2_Strike, "CALL = " +

    AsDollars(OTM_2_CALL) +

    "   OI = " + OTMOIC2 +

    "\nPUT    = " + AsDollars(OTM_2_PUT) +

    "   OI = " + OTMOIP2,

    Color.CYAN,

               if c > OTM_2_Strike 

               then 0 

               else 1);

# $1.00 In The Money
def ITM_1_TheoC = OptionPrice(ITM_1_Strike, 0, N3rdF, c, iv, 0, yield, interest_rate);

def ITM_1_CALL = if IsNaN(ITM_1_TheoC)
                 then ITM_1_CALL[1]
                 else ITM_1_TheoC;

def ITM_OI_C = open_interest("." + GetUnderlyingSymbol() + (Expyear - 2000) + (if Expmonth2 < 10 then 0 else double.nan) + (ExpMonth2) + (N3rdF) + "C" + ITM_1_Strike, period = AggregationPeriod.DAY);

def ITMOIC = if IsNaN(ITM_OI_C)
             then ITMOIC[1]
             else ITM_OI_C;

def ITM_1_TheoP = OptionPrice(ITM_1_Strike, 1, N3rdF, c, iv, 0, yield, interest_rate);

def ITM_1_PUT = if IsNaN(ITM_1_TheoP)
                then ITM_1_PUT[1]
                else ITM_1_TheoP;

def ITM_OI_P = open_interest("." + GetUnderlyingSymbol() + (Expyear - 2000) + (if Expmonth2 < 10 then 0 else double.nan) + (ExpMonth2) + (N3rdF) + "P" + ITM_1_Strike, period = AggregationPeriod.DAY);

def ITMOIP = if IsNaN(ITM_OI_P)
             then ITMOIP[1]
             else ITM_OI_P;

AddChartBubble(bubbleLocation, ITM_1_Strike, "CALL = " +

    AsDollars(ITM_1_CALL) +

    "  OI = " + ITMOIC +

    "\nPUT    = " + AsDollars(ITM_1_PUT) +

    "  OI = " + ITMOIP,

    Color.CYAN,

               if Strike > ITM_1_Strike 

               then 0 

               else 1);

# $2.00 In The Money
def ITM_2_TheoC = OptionPrice(ITM_2_Strike, 0, N3rdF, c, iv, 0, yield, interest_rate);

def ITM_2_CALL = if IsNaN(ITM_2_TheoC)
                 then ITM_2_CALL[1]
                 else ITM_2_TheoC;

def ITM2_OI_C = open_interest("." + GetUnderlyingSymbol() + (Expyear - 2000) + (if Expmonth2 < 10 then 0 else double.nan) + (ExpMonth2) + (N3rdF) + "C" + ITM_2_Strike, period = AggregationPeriod.DAY);

def ITMOIC2 = if IsNaN(ITM2_OI_C)
             then ITMOIC2[1]
             else ITM2_OI_C;

def ITM_2_TheoP = OptionPrice(ITM_2_Strike, 1, N3rdF, c, iv, 0, yield, interest_rate);

def ITM_2_PUT = if IsNaN(ITM_2_TheoP)
                then ITM_2_PUT[1]
                else ITM_2_TheoP;

def ITM2_OI_P = open_interest("." + GetUnderlyingSymbol() + (Expyear - 2000) + (if Expmonth2 < 10 then 0 else double.nan) + (ExpMonth2) + (N3rdF) + "P" + ITM_2_Strike, period = AggregationPeriod.DAY);

def ITMOIP2 = if IsNaN(ITM2_OI_P)
             then ITMOIP2[1]
             else ITM2_OI_P;

AddChartBubble(bubbleLocation, ITM_2_Strike, "CALL = " +

    AsDollars(ITM_2_CALL) +

    "  OI = " + ITMOIC2 +

    "\nPUT    = " + AsDollars(ITM_2_PUT) +

    "  OI = " + ITMOIP2,

    Color.CYAN,

               if Strike > ITM_2_Strike 

               then 0 

               else 1);
# End Code Option Prices and Open interest