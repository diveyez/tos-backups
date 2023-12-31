# Wolf Waves
# Mobius
# V01.05.22.2018

# User Inputs

input n = 10;

# Internal Script Reference

script LinePlot {

    input BarID = 0;

    input Value = 0;

    input BarOrigin = 0;

    def ThisBar = HighestAll(BarOrigin);

    def ValueLine = if BarOrigin == ThisBar

                then Value

                else Double.NaN;

    plot P = if ThisBar - BarID <= BarOrigin

             then HighestAll(ValueLine)

             else Double.NaN;

}

# Variables

def o = open;

def h = high;

def l = low;

def c = close;

def x = BarNumber();

def xN = x == HighestAll(x);

# R1

def hh = fold i = 1 to n + 1

with p = 1

         while p

         do h > GetValue(h, -i);

def PivotH = if (x > n and

h == Highest(h, n) and

                 hh)

             then h

             else Double.NaN;

def PHValue = if !IsNaN(PivotH)

              then PivotH

              else PHValue[1];

def PHBarOrigin = if !IsNaN(PivotH)

                  then x

                  else PHBarOrigin[1];

def PHBarID = x - PHBarOrigin;

# R2

def R2PHValue = if PHBarOrigin != PHBarOrigin[1]

                then PHValue[1]

                else R2PHValue[1];

def R2PHBarOrigin = if PHBarOrigin != PHBarOrigin[1]

                    then PHBarOrigin[1]

                    else R2PHBarOrigin[1];

def R2PHBarID = x - R2PHBarOrigin;

# R3

def R3PHValue = if R2PHBarOrigin != R2PHBarOrigin[1]

                then R2PHValue[1]

                else R3PHValue[1];

def R3PHBarOrigin = if R2PHBarOrigin != R2PHBarOrigin[1]

                    then R2PHBarOrigin[1]

                    else R3PHBarOrigin[1];

def R3PHBarID = x - R3PHBarOrigin;

# S1

def ll = fold j = 1 to n + 1

with q = 1

         while q

         do l < GetValue(l, -j);

def PivotL = if (x > n and

l == Lowest(l, n) and

                 ll)

             then l

             else Double.NaN;

def PLValue = if !IsNaN(PivotL)

              then PivotL

              else PLValue[1];

def PLBarOrigin = if !IsNaN(PivotL)

                  then x

                  else PLBarOrigin[1];

def PLBarID = x - PLBarOrigin;

# S2

def S2PLValue = if PLBarOrigin != PLBarOrigin[1]

                then PLValue[1]

                else S2PLValue[1];

def S2PLBarOrigin = if PLBarOrigin != PLBarOrigin[1]

                    then PLBarOrigin[1]

                    else S2PLBarOrigin[1];

def S2PLBarID = x - S2PLBarOrigin;

# S3

def S3PLValue = if S2PLBarOrigin != S2PLBarOrigin[1]

                then S2PLValue[1]

                else S3PLValue[1];

def S3PLBarOrigin = if S2PLBarOrigin != S2PLBarOrigin[1]

                    then S2PLBarOrigin[1]

                    else S3PLBarOrigin[1];

def S3PLBarID = x - S3PLBarOrigin;

# S4

def S4PLValue = if S3PLBarOrigin != S3PLBarOrigin[1]

                then S3PLValue[1]

                else S4PLValue[1];

def S4PLBarOrigin = if S3PLBarOrigin != S3PLBarOrigin[1]

                    then S3PLBarOrigin[1]

                    else S4PLBarOrigin[1];

def S4PLBarID = x - S4PLBarOrigin;

# S5

def S5PLValue = if S4PLBarOrigin != S4PLBarOrigin[1]

                then S4PLValue[1]

                else S5PLValue[1];

def S5PLBarOrigin = if S4PLBarOrigin != S4PLBarOrigin[1]

                    then S4PLBarOrigin[1]

                    else S5PLBarOrigin[1];

def S5PLBarID = x - S5PLBarOrigin;

# Plots

plot R1 = LinePlot(BarID = PHBarID,

    Value = PHValue,

    BarOrigin = PHBarOrigin);

R1.SetDefaultColor(Color.GREEN);

AddChartBubble(x == HighestAll(PHBarOrigin), PHValue, "R1", Color.GREEN, 1);

plot R2 = LinePlot(BarID = R2PHBarID,

    Value = R2PHValue,

    BarOrigin = R2PHBarOrigin);

R2.SetDefaultColor(Color.GREEN);

AddChartBubble(x == HighestAll(R2PHBarOrigin), PHValue, "R2", Color.GREEN, 1);

plot R3 = LinePlot(BarID = R3PHBarID,

    Value = R3PHValue,

    BarOrigin = R3PHBarOrigin);

R3.SetDefaultColor(Color.GREEN);

AddChartBubble(x == HighestAll(R3PHBarOrigin), PHValue, "R3", Color.GREEN, 1);

plot S1 = LinePlot(BarID = PLBarID,

    Value = PLValue,

    BarOrigin = PLBarOrigin);

S1.SetDefaultColor(Color.RED);

AddChartBubble(x == HighestAll(PLBarOrigin), PLValue, "S1", Color.RED, 0);

plot S2 = LinePlot(BarID = S2PLBarID,

    Value = S2PLValue,

    BarOrigin = S2PLBarOrigin);

S2.SetDefaultColor(Color.RED);

AddChartBubble(x == HighestAll(S2PLBarOrigin), PLValue, "S2", Color.RED, 0);

plot S3 = LinePlot(BarID = S3PLBarID,

    Value = S3PLValue,

    BarOrigin = S3PLBarOrigin);

S3.SetDefaultColor(Color.RED);

AddChartBubble(x == HighestAll(S3PLBarOrigin), PLValue, "S3", Color.RED, 0);

# Trend Line

plot SupportLine2 = if x == HighestAll(S2PLBarOrigin)

                    then S2

                    else if x == HighestAll(PLBarOrigin)

                         then S1  #Parentlow

                         else Double.NaN;

SupportLine2.EnableApproximation();

SupportLine2.SetDefaultColor(Color.GRAY);

SupportLine2.SetLineWeight(1);

SupportLine2.SetStyle(Curve.LONG_DASH);

def slope2 = (S2 - S1) /

    (HighestAll(S2PLBarOrigin) - PLBarOrigin);

plot ExtLine2 = if x >= S2PLBarOrigin

                then(x - HighestAll(S2PLBarOrigin)) * slope2 + S2

else Double.NaN;

ExtLine2.EnableApproximation();

ExtLine2.SetDefaultColor(Color.GRAY);

ExtLine2.SetLineWeight(1);

ExtLine2.SetStyle(Curve.LONG_DASH);

plot SupportLine3 = if x == HighestAll(R3PHBarOrigin)

                    then R3

                    else if x == PHBarOrigin

                         then R1

                         else Double.NaN;

SupportLine3.EnableApproximation();

SupportLine3.SetDefaultColor(Color.GRAY);

SupportLine3.SetLineWeight(1);

SupportLine3.SetStyle(Curve.LONG_DASH);

def slope3 = (R1 - R3) /

    (HighestAll(PHBarOrigin) - R3PHBarOrigin);

plot ExtLine3 = if x >= R3PHBarOrigin

                then(x - HighestAll(R3PHBarOrigin)) * slope3 + R3

else Double.NaN;

ExtLine3.EnableApproximation();

ExtLine3.SetDefaultColor(Color.GRAY);

ExtLine3.SetLineWeight(1);

ExtLine3.SetStyle(Curve.LONG_DASH);