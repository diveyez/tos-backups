declare lower;

def O = open;
def H = high;
def C = close;
def L = low;
def V = volume;
def Buying = V * (C - L) / (H - L);
def Selling = V * (H - C) / (H - L);

# Selling Volume
Plot SV = selling;
SV.setPaintingStrategy(PaintingStrategy.Histogram);
SV.SetDefaultColor(Color.Red);
SV.HideTitle();
SV.HideBubble();
SV.SetLineWeight(5);

# Buying Volume
# Plot BV = Buying;
# Note that Selling + Buying Volume = Volume.
Plot BV = volume;
BV.setPaintingStrategy(PaintingStrategy.Histogram);
BV.SetDefaultColor(Color.Dark_Green);
BV.HideTitle();
BV.HideBubble();
BV.SetLineWeight(5);


declare zerobase;

input length = 50;

plot Vol = volume;
plot VolAvg = Average(volume, length);

Vol.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Vol.SetLineWeight(3);
Vol.DefineColor("Up", Color.UPTICK);
Vol.DefineColor("Down", Color.DOWNTICK);
Vol.AssignValueColor(if close > close[1] then Vol.color("Up") else if close < close[1] then Vol.color("Down") else GetColor(1));
VolAvg.SetDefaultColor(GetColor(8));