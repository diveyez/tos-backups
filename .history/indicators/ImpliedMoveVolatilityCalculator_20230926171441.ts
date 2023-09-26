# Archive Name: Implied Volatility Position Calculator_JQ
# Archive Tab: Volatility
# Tos Name: IV_PositionCalc_JohnnyQuotron
#
#       IV_PositionCalcV2_JohnnyQuotron
#       Last modified 2018-03 - 25...adds chartBubbles and chart label defaults
#       Code clones incorporates snippets from TDAmeritrade
#
#    2018-04 - 10  Adds mobius code for vertical earnings datelines

#hint: This study is a work in progress.It is an attempt to remind investors to adjust their position sizes when the volatility of the market changes and / or for the volatility of the security the investor is considering taking a position in.

#The study creates four labels describing suggested positions depending on the desires of the investor.

#The author has chosen a Benchmark Position size of 100 shares of SPY.This Benchmark is adjustable by the investor without altering the code.You may choose to display all four preconfigured labels or only a portion of them.The Author prefers that a chart of the Historical Volatility of the Benchmark Index and the Prospect Security be placed immediately above the subchart containing the labels.But you should do whatever works best for you and your style.

#    This study pairs with a HV position calculator

declare lower;

input displayIVLabels = no; #Hint displayIVLabels: Display colored labels containing symbol_IV and IV for Benchmark and Symbol
input displayBenchmarkPosition = yes; #Hint displayBenchmarkPosition: Display label denoting Benchmark Symbol and share size
input Show_Unadjusted_Positions = yes; #hint Show_Unadjusted_Positions: Show label with position and share counts for Full, Half and Quarter positions of Prospect Security unadjusted for the Historical Volatility of either the Benchmark or the Prospect Security.

input Show_Adjusted_for_Bmk_IV = no; #Hint Show_Adjusted_for_Bmk_HV: Default no.Show label with position and share counts for Full, Half and Quarter positions for the Prospect Security adjusted for the Historical Volatility of the Benchmark.

input Show_Adjusted_for_Security_IV = yes; #Hint Show_Adjusted_for_Security_HV: Default yes.Show label with position and share counts for Full, Half and Quarter positions for the Prospect Security adjusted for the Historical Volatility of the Prospect Security.

input Show_Adjusted_for_Diff_in_IV = no; #Hint Show_Adjusted_for_Diff_in_HV: Default no.Show label with position and share counts for Full, Half and Quarter positions for the Prospect Security adjusted for the difference in Historical Volatility between the Benchmark or the Prospect Security.



#
#       BEGIN BENCHMARK INDEX CODE
#

input Benchmark_Index = "SPY";
input Benchmark_shares = 100;
input displayEarningsLines = yes;


#
#
#
#    Implied Volatility Code
#
#


plot Symbol_IV = 1 + imp_volatility();
Symbol_IV.SetDefaultColor(Color.pink);
plot Benchmark_IV = 1 + imp_volatility(Benchmark_Index);
Benchmark_IV.SetDefaultColor(Color.WHITE);
def Relative_IV = Symbol_IV / Benchmark_IV;



#
#       Positions - Preparatory Math for Positions
#


def Benchmark_Close = close(Benchmark_Index);
def Prospect_Close = close;
def full_position_amount = Benchmark_Close * Benchmark_shares;
def full_position_shares = full_position_amount / Prospect_Close;
def half_position_shares = full_position_shares * 0.5;
def quarter_position_shares = full_position_shares * 0.25;

def Bmk_IV_adj_full_position_amount = full_position_amount / Benchmark_IV;
def Bmk_IV_adj_full_position_shares = Bmk_IV_adj_full_position_amount / Prospect_Close;
def Bmk_IV_adj_half_position_shares = Bmk_IV_adj_full_position_shares * 0.5;
def Bmk_IV_adj_quarter_position_shares = Bmk_IV_adj_full_position_shares * 0.25;

def Symbol_IV_adj_full_position_amount = full_position_amount / Symbol_IV;
def Symbol_IV_adj_full_position_shares = Symbol_IV_adj_full_position_amount / Prospect_Close;
def Symbol_IV_adj_half_position_shares = Symbol_IV_adj_full_position_shares * 0.5;
def Symbol_IV_adj_quarter_position_shares = Symbol_IV_adj_full_position_shares * 0.25;

def Relative_IV_adj_full_position_amount = full_position_amount / Relative_IV;
def Relative_IV_adj_full_position_shares = Relative_IV_adj_full_position_amount / Prospect_Close;
def Relative_IV_adj_half_position_shares = Relative_IV_adj_full_position_shares * 0.5;
def Relative_IV_adj_quarter_position_shares = Relative_IV_adj_full_position_shares * 0.25;


#
#  Label and ChartBubble Code
#

addlabel(displayIVLabels, getsymbol() + " IV " + astext(Symbol_IV), color.pink);
addlabel(displayIVLabels, Benchmark_Index + " IV " + astext(Benchmark_IV), color.white);


AddLabel(displayBenchmarkPosition, " Benchmark Position: " + Benchmark_shares + " shares of " + Benchmark_Index + " = " + AsDollars(Round(full_position_amount, 0)) + " ", Color.white);

AddLabel(Show_Unadjusted_Positions, " Unadjusted " + GetSymbol() + " Positions | Full: " + RoundUp(full_position_shares, 0) + " shares | Half: " + RoundUp(half_position_shares, 0) + " shares | Qtr: " + RoundUp(quarter_position_shares, 0) + " shares ", Color.white);

AddLabel(Show_Adjusted_for_Bmk_IV, " Adjusted for " + Benchmark_Index + " Implied Volatility of " + AsText(Benchmark_IV) + " | Adjusted " + GetSymbol() + " Positions " + AsDollars(Round(Bmk_IV_adj_full_position_amount, 0)) + " | Full: " +
    RoundUp(Bmk_IV_adj_full_position_shares, 0) + " shares | Half: " + RoundUp(Bmk_IV_adj_half_position_shares, 0) + " shares | Qtr: " + RoundUp(Bmk_iV_adj_quarter_position_shares, 0) + " shares ", Color.pink);

AddLabel(Show_Adjusted_for_Security_IV, " Adjusted for " + GetSymbol() + " Implied Volatility of " + AsText(Symbol_IV) +
    " | Adjusted " + GetSymbol() + " Positions " + AsDollars(Round(Symbol_IV_adj_full_position_amount, 0)) + " | Full: " + RoundUp(Symbol_IV_adj_full_position_shares, 0) + " shares | Half: " + RoundUp(Symbol_IV_adj_half_position_shares, 0) + " shares | Qtr: " + RoundUp(Symbol_IV_adj_quarter_position_shares, 0) + " shares ", Color.pink);

AddLabel(Show_Adjusted_for_Diff_in_IV, " Adjusted for the Ratio (" + GetSymbol() + " IV. / " + Benchmark_Index + " IV.) " + AsText(Relative_IV) + " | Adjusted " + GetSymbol() + " Positions " + AsDollars(Round(Relative_IV_adj_full_position_amount, 0)) + " | Full: " + RoundUp(Relative_IV_adj_full_position_shares, 0) + " shares | Half: " + RoundUp(Relative_IV_adj_half_position_shares, 0) + " shares | Qtr: " + RoundUp(Relative_IV_adj_quarter_position_shares, 0) + " shares ", Color.pink);


Input Offset = 0;
def LastBar = !IsNaN(open) and IsNaN(open[-1]);
Def BubbleLocation = LastBar[Offset];
def barNum = barNumber();
addchartbubble(BubbleLocation, benchmark_IV, Benchmark_Index + " IV " + astext(benchmark_IV), color.white, no);
addchartbubble(BubbleLocation, symbol_IV, getsymbol() + " IV " + astext(symbol_IV), color.pink, yes);

#
#      End V1 Code

# Historic VS Implied Volatility At Earnings
# Mobius
# V01.2015


def isBefore = HasEarnings(EarningTime.BEFORE_MARKET);
def isAfter = HasEarnings(EarningTime.AFTER_MARKET);
def isUnspecified = HasEarnings() and!isBefore and!isAfter;
AddVerticalLine(isBefore and displayEarningsLines,
    "              Earn Before",
    Color.yellow,
    Curve.LONG_DASH);
AddVerticalLine(isAfter and displayEarningsLines,
    "              Earn After",
    Color.yellow,
    Curve.LONG_DASH);
AddVerticalLine(isUnspecified and displayEarningsLines,
    "              Earnings",
    Color.yellow,
    Curve.LONG_DASH);




#