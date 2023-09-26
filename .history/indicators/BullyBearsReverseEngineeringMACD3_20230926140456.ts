declare lower;

#INPUTS
input Smoother = 3;
input SupResPeriod = 60;
input SupResPercentage = 100;
input PricePeriod = 600;
input ob = 300;
input os = -300;
input showColorBars = no; #COLOR BARS
input showDynamics = no; #Dynamic zones
input showOBOS = no; #Show OB / OS

#LOGIC
def nn = Smoother;
def ys1 = (high + low + close * 2) / 4;
def rk3 = ExpAverage(ys1, nn);
def rk4 = StDev(ys1, nn);
def rk5 = (ys1 - rk3) * 200 / rk4;
def rk6 = ExpAverage(rk5, nn);
def up = ExpAverage(rk6, nn);
def down = ExpAverage(up, nn);
def Oo = If(up < down, up, down);
def Hh = Oo;
def Ll = If(up < down, down, up);
def Cc = Ll;


def Lookback = SupResPeriod;
def PerCent = SupResPercentage;
def Pds = PricePeriod;

def C3 = CCI(length = Pds);

def Osc = C3;
def Value1 = Osc;
def Value2 = Highest(Value1, Lookback);
def Value3 = Lowest(Value1, Lookback);
def Value4 = Value2 - Value3;
def Value5 = Value4 * (PerCent / 100);
def ResistanceLine = Value3 + Value5;
def SupportLine = Value2 - Value5;

#CUSTOM CANDLES
def cUpO;
def cUpH;
def cUpL;
def cUpC;
if up > down
then {
    cUpO = Oo;
    cUpH = Hh;
    cUpL = Ll;
    cUpC = Cc;
} else {
    cUpO = Double.NaN;
    cUpH = Double.NaN;
    cUpL = Double.NaN;
    cUpC = Double.NaN;
}

def cDnO;
def cDnH;
def cDnL;
def cDnC;
if up < down
then {
    cDnO = Oo;
    cDnH = Hh;
    cDnL = Ll;
    cDnC = Cc;
} else {
    cDnO = Double.NaN;
    cDnH = Double.NaN;
    cDnL = Double.NaN;
    cDnC = Double.NaN;
}

AddChart(high = cUpH, low = cUpL, open = cUpC, close = cUpO, type = ChartType.CANDLE, Color.GREEN);
AddChart(high = cDnH, low = cDnL, open = cDnO, close = cDnC, type = ChartType.CANDLE, Color.RED);
AddChart(high = cUpH, low = cUpL, open = cUpO, close = cUpC, type = ChartType.CANDLE, growcolor = Color.GREEN);
AddChart(high = cDnH, low = cDnL, open = cDnC, close = cDnO, type = ChartType.CANDLE, growcolor = Color.RED);

#COLORBARS
AssignPriceColor(if showColorBars then
if Oo > Cc then Color.RED else if up > down then Color.GREEN
 else Color.RED
else
Color.CURRENT
);

#PLOTS
plot pResistanceLine = ResistanceLine;
pResistanceLine.SetHiding(!showDynamics);

plot pSupportLine = SupportLine;
pSupportLine.SetHiding(!showDynamics);

def UpShape = if up > ob and up > down then Highest(up, 1) + 20 else if up > ob and up < down then Highest(down, 1) + 20 else Double.NaN;

def DownShape = if down < os and up > down then Lowest(down, 1) - 20 else if
 down < os and up < down then Lowest(up, 1) - 20 else Double.NaN;

def sState = if !IsNaN(UpShape) then 100 else if !IsNaN(DownShape) then - 100 else sState[1];

plot pUP = UpShape;
pUP.SetPaintingStrategy(PaintingStrategy.TRIANGLES);
pUP.SetDefaultColor(Color.CYAN);
pUP.SetLineWeight(1);

plot pDown = DownShape;
pDown.SetPaintingStrategy(PaintingStrategy.TRIANGLES);
pDown.SetDefaultColor(Color.CYAN);
pDown.SetLineWeight(1);
;

plot pOB = ob;
pOB.SetHiding(!showOBOS);

plot pOS = os;
pOS.SetHiding(!showOBOS);

plot ZeroLine = 0;

AddLabel(yes, "UpTrend ", if pUP then Color.green else if pDown then Color.CYAN else Color.GRAY);