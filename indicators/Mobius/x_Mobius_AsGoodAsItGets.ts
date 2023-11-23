##AsGood_HighLowPointPivot_Arrows
def bn = BarNumber();
def na = double.nan;

input length = 7;
def lastBar = HighestAll(if IsNaN(close) then 0 else bn);
def offset = Min(length - 1, lastBar - bn);

input ignore_last_bar = yes;
def ignorelast = if (ignore_last_bar and bn == lastbar) then 0 else 1;

def HighPoint = ignorelast and high > highest(high[1], length - 1) and high == GetValue(highest(high, length), -offset);
def Lowpoint = ignorelast and low < Lowest(low[1], length - 1) and low == GetValue(Lowest(low, length), -offset);


input show_Arrows_on_Highpoints_Lowpoints = yes;
def vert = 0.001;

def prange = highPoint – lowPoint;
def plotHighest = highpoint + prange * .3;
def plotLowest = lowpoint - prange * 3.0;

plot BuyCriteria = if LowPoint then Low else double.NaN;
plot SellCriteria = if HighPoint then High else double.NaN;

BuyCriteria.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
BuyCriteria.SetDefaultColor(color.WHITE);
BuyCriteria.SetLineWeight(5);
SellCriteria.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
SellCriteria.SetDefaultColor(color.WHITE);
SellCriteria.SetLineWeight(5);