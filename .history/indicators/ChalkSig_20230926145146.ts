# Chaikin Oscillator with signal lines
# Mobius
# V01.20138

declare lower;

input longLength = 10;
input shortLength = 3;

def h = high;
def l = low;
def c = close;
def v = volume;
def CLV = if h != l then((c - l) - (h - c)) / (h - l) else 1;
def AccDist = totalSum(v * CLV);
plot COSC = ExpAverage(AccDist, shortLength) - ExpAverage(AccDist, longLength);
plot ZeroLine = 0;
plot avgLongCOSC = Average(COSC, longLength);
plot avgShortCOSC = Average(COSC, shortLength);
COSC.SetDefaultColor(GetColor(1));
ZeroLine.SetDefaultColor(GetColor(5));
plot ArrowUP = if (COSC < 0 and avgShortCOSC crosses above avgLongCOSC, avgShortCOSC, double.nan);
ArrowUp.SetPaintingStrategy(PaintingStrategy.Arrow_UP);
ArrowUP.SetLineWeight(3);
ArrowUP.SetDefaultColor(Color.Green);
plot ArrowDN = if (COSC > 0 and avgShortCOSC crosses below avgLongCOSC, avgShortCOSC, double.nan);
ArrowDN.SetPaintingStrategy(PaintingStrategy.Arrow_DOWN);
ArrowDN.SetLineWeight(3);
ArrowDN.SetDefaultColor(Color.RED);
AddCloud(avgLongCOSC, avgShortCOSC, color.red, color.green);
# End Code