#// @author LazyBear
#study("MACD Leader [LazyBear]", shorttitle = "MACDL_LB")
# Converted by Sam4Cok @Samer800 - 01 / 2023
declare lower;
input src = close;
input shortLength = 12;#, title = "Fast Length")
input longLength = 26;#, title = "Slow Length")
input sigLength = 9;#, title = "Signal Length")
input MaType = AverageType.EXPONENTIAL;
input showMACD = no;
input showMACDSignal = no;

def na = Double.NaN;
def sema = MovingAverage(MaType, src, shortLength);
def lema = MovingAverage(MaType, src, longLength);
def i1 = sema + MovingAverage(MaType, src - sema, shortLength);
def i2 = lema + MovingAverage(MaType, src - lema, longLength);
def macdl = i1 - i2;
def macd = sema - lema;

plot hline = if isNaN(close) then na else 0;
hline.SetDefaultColor(Color.GRAY);
plot MACDLeader = macdl;#, title = "MACDLeader", color = maroon, linewidth = 2)
MACDLeader.SetDefaultColor(Color.WHITE);
MACDLeader.SetLineWeight(2);

plot MACDLine = if showMACD then macd else na;#, title = "MACD", color = green)
MACDLine.SetDefaultColor(Color.YELLOW);
plot Signal = if showMACDSignal then Average(macd, sigLength) else na;#, title = "Signal", color = red)