declare lower;
input fastLength = 5;
input slowLength = 10;
input MACDLength = 5;

def Value = MovingAverage(AverageType.EXPONENTIAL, close, fastLength) -
    MovingAverage(AverageType.EXPONENTIAL, close, slowLength);
def Avg = MovingAverage(AverageType.EXPONENTIAL, Value, MACDLength);
def Impulse = Value - Avg;

plot ImpulsePlot = Impulse;
ImpulsePlot.AssignValueColor(if Impulse > 0 then Color.GREEN else if Impulse < 0 then Color.RED else Color.GRAY);
ImpulsePlot.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
ImpulsePlot.SetLineWeight(3);
ImpulsePlot.HideBubble();

def Bullish = if Impulse crosses above 0 then low - Average(TrueRange(high, close, low), 14) * 0.5 else Double.NaN;
def Bearish = if Impulse crosses below 0 then high + Average(TrueRange(high, close, low), 14) * 0.5 else Double.NaN;

AddChartBubble(!IsNaN(Bullish), low, "Bullish", Color.GREEN);
AddChartBubble(!IsNaN(Bearish), high, "Bearish", Color.RED);
