# MACD_VXI & Impulse
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/WMxf5UKW-MACD-VXI/
# Modified by @diveyez
declare lower;

input source = OHlc4;
input fastLength = 12;
input slowLength = 20;
input signalLength = 9;
def fastMA = ExpAverage(source, fastLength);
def slowMA = ExpAverage(source, slowLength);
def macd = fastMA - slowMA;
def signal = SimpleMovingAvg(macd, signalLength);
def hist = macd - signal;

def impulse = if hist > 0 and hist > hist[1] then 1 else 0;

plot diff = hist;
plot signal1 = signal;
plot signal2 = macd;
plot ZeroLine = 0;
plot ImpulseUp = impulse * hist;
plot ImpulseDown = (1 - impulse) * hist;

diff.SetDefaultColor(GetColor(9));
diff.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
diff.SetLineWeight(3);

signal1.SetDefaultColor(GetColor(0));
signal2.SetDefaultColor(GetColor(1));

ImpulseUp.SetDefaultColor(Color.GREEN);
ImpulseUp.SetPaintingStrategy(PaintingStrategy.LINE);
ImpulseDown.SetDefaultColor(Color.RED);
ImpulseDown.SetPaintingStrategy(PaintingStrategy.LINE);