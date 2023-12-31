# Trend Prophet
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/5VfPkTit-TrendProphet/

declare lower;

def ma10 = SimpleMovingAvg(close, 10);
def ma20 = SimpleMovingAvg(close, 20);
def ma50 = SimpleMovingAvg(close, 50);
def smoothedMA = (ma10 + ma20 + ma50) / 3;

def cl10 = close[10];
def signal = (cl10 - smoothedMA);
def signalBar = (signal - smoothedMA + close);
def E = signalBar[10];

def Z = (E * (-1));
def X = (Z + AbsValue(E));

plot histogram = signalBar;
histogram.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);

plot ZeroLine = 0;
ZeroLine.AssignValueColor(if X <= signalBar then Color.WHITE else if signalBar >= 0 then Color.GREEN else Color.RED);