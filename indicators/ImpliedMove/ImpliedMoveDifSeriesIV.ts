# - Mobius_  Implied Move For Different Series IV
# - Mobius
# - V01.03.2017

input show_label = yes;

input Series_IV = 1; #hint Series_IV: Series 1 is closest expirery.

input DefTime = { "Today", default "Yesterday", "Friday"};

input Label_Color_Choice = { default "pink", "cyan", "orange", "gray", "yellow", "red", "green", "dark_gray", "light_yellow", "white"};

input Show_Cloud = yes;

input Show_Fibs = yes;

assert(series_IV > 0, "'series' must be positive: " + series_IV);

def o = open;

def c = close;

def bar = barNumber();

def CurrentYear = getYear();

def CurrentMonth = getMonth();

def CurrentDOM = getDayOfMonth(getYyyyMmDd());

def Day1DOW1 = getDayOfWeek(CurrentYear * 10000 + CurrentMonth * 100 + 1);

def FirstFridayDOM1 = if Day1DOW1 < 6

    then 6 - Day1DOW1

    else if Day1DOW1 == 6

        then 7

        else 6;

def RollDOM = FirstFridayDOM1 + 14;

def ExpMonth1 = if RollDOM > CurrentDOM

    then CurrentMonth + series_IV - 1

    else CurrentMonth + series_IV;

def ExpMonth2 = if ExpMonth1 > 12

    then ExpMonth1 - 12

    else ExpMonth1;

def ExpYear = if ExpMonth1 > 12

    then CurrentYear + 1

    else CurrentYear;

def Day1DOW = getDayOfWeek(ExpYear * 10000 + ExpMonth2 * 100 + 1);

def FirstFridayDOM = if Day1DOW < 6

    then 6 - Day1DOW

    else if Day1DOW == 6

        then 7

        else 6;

def ExpDOM = FirstFridayDOM + 14;

def N3rdF = if IsNaN(c)

            then Double.NaN

            else daysTillDate(ExpYear * 10000 + ExpMonth2 * 100 + ExpDOM);

def CurrentDOW = GetDayOfWeek(GetYYYYMMDD());

def Fcbar = if CurrentDOW == 5 and SecondsTillTime(1600) == 0

           then bar

           else Fcbar[1];

def seriesIV = if isNaN(SeriesVolatility(series = Series_IV))

               then seriesIV[1]

               else SeriesVolatility(series = Series_IV);

def t;

def tBar;

def nDays;

switch (DefTime) {

    case Today:

        t = if SecondsFromTime(0930) == 0

        then o

        else t[1];

        tbar = if SecondsFromTime(0930) == 0

           then bar

           else double.nan;

    case Yesterday:

        t = if secondsTillTime(1600) == 0

        then c

        else t[1];

        tbar = if secondsFromTime(1600) == 0

          then bar

          else double.nan;

    case Friday:

        t = if BarNumber() == Fcbar

        then c

        else t[1];

        tbar = Fcbar;

}

if Series_IV == 1 and CurrentDOW == 1

{

    nDays = 3;

}

else if Series_IV == 1 and CurrentDOW == 2

{

    nDays = 2;

}

else if Series_IV == 1 and CurrentDOW == 3

{

    nDays = 1;

}

else if Series_IV == 1 and CurrentDOW == 4

{

    nDays = 2;

}

else if Series_IV == 1 and CurrentDOW == 5

{

    nDays = 1;

}

else if Series_IV >= 2

{

    nDays = N3rdF;

}

else {

    nDays = nDays[1];

}

def ImpMove = Round(((t * seriesIV * Sqrt(nDays)) / Sqrt(365)) / TickSize(), 0) * TickSize();

plot mean = if bar >= HighestAll(tBar)

            then HighestAll(if isNaN(close[-1])

                            then t

                            else double.nan)

            else double.nan;

mean.SetStyle(Curve.Long_Dash);

mean.SetLineWeight(2);

mean.SetDefaultColor(GetColor(Label_Color_Choice));

plot upper = if bar >= HighestAll(tBar)

             then HighestAll(if isNaN(c[-1])

                             then t + ImpMove

                             else double.nan)

              else Double.NaN;

upper.SetDefaultColor(GetColor(Label_Color_Choice));

upper.SetLineWeight(2);

upper.SetPaintingStrategy(PaintingStrategy.DASHES);

plot lower = if bar >= HighestAll(tBar)

             then HighestAll(if isNaN(c[-1])

                             then t - ImpMove

                             else double.nan)

             else Double.NaN;

lower.SetDefaultColor(GetColor(Label_Color_Choice));

lower.SetLineWeight(2);

lower.SetPaintingStrategy(PaintingStrategy.DASHES);

Addcloud(if Show_Cloud

         then lower

         else double.nan, upper, color.dark_gray, color.dark_gray);

plot upper236 = if bar >= HighestAll(tBar) and Show_Fibs

     then HighestAll(if isNaN(close[-1])

     then Round((((upper - mean) * .236) + mean) / TickSize(), 0) * TickSize()

     else double.nan)

     else double.nan;

upper236.SetStyle(Curve.Short_Dash);

upper236.SetDefaultColor(Color.dark_gray);

plot upper382 = if bar >= HighestAll(tBar) and Show_Fibs

     then HighestAll(if isNaN(close[-1])

     then Round((((upper - mean) * .382) + mean) / TickSize(), 0) * TickSize()

     else double.nan)

     else double.nan;

upper382.SetStyle(Curve.Short_Dash);

upper382.SetDefaultColor(Color.dark_gray);

plot upper50 = if bar >= HighestAll(tBar) and Show_Fibs

     then HighestAll(if isNaN(close[-1])

     then Round((((upper - mean) * .5) + mean) / TickSize(), 0) * TickSize()

     else double.nan)

     else double.nan;

upper50.SetStyle(Curve.Short_Dash);

upper50.SetDefaultColor(Color.dark_gray);

plot upper618 = if bar >= HighestAll(tBar) and Show_Fibs

     then HighestAll(if isNaN(close[-1])

     then Round((((upper - mean) * .618) + mean) / TickSize(), 0) * TickSize()

     else double.nan)

     else double.nan;

upper618.SetStyle(Curve.Short_Dash);

upper618.SetDefaultColor(Color.dark_gray);

plot upper786 = if bar >= HighestAll(tBar) and Show_Fibs

     then HighestAll(if isNaN(close[-1])

     then Round((((upper - mean) * .786) + mean) / TickSize(), 0) * TickSize()

     else double.nan)

     else double.nan;

upper786.SetStyle(Curve.Short_Dash);

upper786.SetDefaultColor(Color.dark_gray);

plot lower236 = if bar >= HighestAll(tBar) and Show_Fibs

     then HighestAll(if isNaN(close[-1])

     then Round((mean - (mean - lower) * .236) / TickSize(), 0) * TickSize()

     else double.nan)

     else double.nan;

lower236.SetStyle(Curve.Short_Dash);

lower236.SetDefaultColor(Color.dark_gray);

plot lower382 = if bar >= HighestAll(tBar) and Show_Fibs

     then HighestAll(if isNaN(close[-1])

     then Round((mean - (mean - lower) * .382) / TickSize(), 0) * TickSize()

     else double.nan)

     else double.nan;

lower382.SetStyle(Curve.Short_Dash);

lower382.SetDefaultColor(Color.dark_gray);

plot lower50 = if bar >= HighestAll(tBar) and Show_Fibs

     then HighestAll(if isNaN(close[-1])

     then Round((mean - (mean - lower) * .5) / TickSize(), 0) * TickSize()

     else double.nan)

     else double.nan;

lower50.SetStyle(Curve.Short_Dash);

lower50.SetDefaultColor(Color.dark_gray);

plot lower618 = if bar >= HighestAll(tBar) and Show_Fibs

     then HighestAll(if isNaN(close[-1])

     then Round((mean - (mean - lower) * .618) / TickSize(), 0) * TickSize()

     else double.nan)

     else double.nan;

lower618.SetStyle(Curve.Short_Dash);

lower618.SetDefaultColor(Color.dark_gray);

plot lower786 = if bar >= HighestAll(tBar) and Show_Fibs

     then HighestAll(if isNaN(close[-1])

     then Round((mean - (mean - lower) * .786) / TickSize(), 0) * TickSize()

     else double.nan)

     else double.nan;

lower786.SetStyle(Curve.Short_Dash);

lower786.SetDefaultColor(Color.dark_gray);

AddLabel(show_label, "Series " + Series_IV + " IV = " + AsPercent(seriesIV) +

    "  " + nDays + " Day(s) Remaining. " +

    "  Implied Move = " + AsDollars(ImpMove) +

    "  Starting Value = " + AsDollars(t), GetColor(Label_Color_Choice));

# End Code Implied Moves From Series IV