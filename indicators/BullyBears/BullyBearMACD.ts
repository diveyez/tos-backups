declare lower;
input fastLength = 12;
input slowLength = 26;
input MACDLength = 9;

def Value = MovingAverage(AverageType.EXPONENTIAL, close, fastLength) -
    MovingAverage(AverageType.EXPONENTIAL, close, slowLength);
def Avg = MovingAverage(AverageType.EXPONENTIAL, Value, MACDLength);
def Impulse = Value - Avg;

plot ImpulsePlot = Impulse;
ImpulsePlot.AssignValueColor(if Impulse > 0 then Color.GREEN else if Impulse < 0 then Color.RED else Color.GRAY);
ImpulsePlot.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
ImpulsePlot.SetLineWeight(3);
ImpulsePlot.HideBubble();
AddChartBubble(ImpulsePlot, if Impulse > 0 then Impulse else if Impulse < 0 then Impulse else Double.NaN, 
               if Impulse > 0 then "B" else if Impulse < 1 then "S" else "", 
               if Impulse > 0 then Color.GREEN else if Impulse < 0 then Color.RED else Color.GRAY);



input averageType = AverageType.EXPONENTIAL;
input showBreakoutSignals = yes;

plot Value1 = MovingAverage(averageType, close, fastLength) - MovingAverage(averageType, close, slowLength);
plot Avg1 = MovingAverage(averageType, Value1, MACDLength);

plot Diff = Value - Avg1;
plot ZeroLine = 0;

plot UpSignal = if Diff crosses above ZeroLine then ZeroLine else Double.NaN;
plot DownSignal = if Diff crosses below ZeroLine then ZeroLine else Double.NaN;

UpSignal.SetHiding(!showBreakoutSignals);
DownSignal.SetHiding(!showBreakoutSignals);

Value1.SetDefaultColor(GetColor(1));
Avg1.SetDefaultColor(GetColor(8));
Diff.SetDefaultColor(GetColor(5));
Diff.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Diff.SetLineWeight(3);
Diff.DefineColor("Positive and Up", Color.GREEN);
Diff.DefineColor("Positive and Down", Color.DARK_GREEN);
Diff.DefineColor("Negative and Down", Color.RED);
Diff.DefineColor("Negative and Up", Color.DARK_RED);
Diff.AssignValueColor(if Diff >= 0 then if Diff > Diff[1] then Diff.Color("Positive and Up") else Diff.Color("Positive and Down") else if Diff < Diff[1] then Diff.Color("Negative and Down") else Diff.Color("Negative and Up"));
ZeroLine.SetDefaultColor(GetColor(0));
UpSignal.SetDefaultColor(Color.UPTICK);
UpSignal.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignal.SetDefaultColor(Color.DOWNTICK);
DownSignal.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);






