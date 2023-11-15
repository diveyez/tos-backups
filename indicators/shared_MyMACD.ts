declare lower;

input fastLengthMACD = 12;
input slowLengthMACD = 26;
input MACDLength = 9;
input averageTypeMACD = AverageType.WEIGHTED;
input showBreakoutSignals = no;

plot Value = MovingAverage(averageTypeMACD, close, fastLengthMACD) - MovingAverage(averageTypeMACD, close, slowLengthMACD);
plot Avg = MovingAverage(averageTypeMACD, Value, MACDLength);
plot Diff = Value - Avg;
plot ZeroLine = 0;
plot oversold = -0.05;
plot overbought = 0.05;
plot UpSignalMACD = if Diff crosses above ZeroLine then ZeroLine else Double.NaN;
plot DownSignalMACD = if Diff crosses below ZeroLine then ZeroLine else Double.NaN;

UpSignalMACD.SetHiding(!showBreakoutSignals);
DownSignalMACD.SetHiding(!showBreakoutSignals);

Value.SetDefaultColor(Color.GREEN);
Avg.SetDefaultColor(Color.RED);
Diff.SetDefaultColor(GetColor(5));
Diff.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Diff.SetLineWeight(4);
Diff.DefineColor("Positive and Up", Color.GREEN);
Diff.DefineColor("Positive and Down", Color.DARK_GREEN);
Diff.DefineColor("Negative and Down", Color.RED);
Diff.DefineColor("Negative and Up", Color.DARK_RED);
Diff.AssignValueColor(if Diff >= 0 then if Diff > Diff[1] then Diff.color("Positive and Up") else Diff.color("Positive and Down") else if Diff < Diff[1] then Diff.color("Negative and Down") else Diff.color("Negative and Up"));
ZeroLine.SetDefaultColor(GetColor(0));
UpSignalMACD.SetDefaultColor(Color.UPTICK);
UpSignalMACD.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignalMACD.SetDefaultColor(Color.DOWNTICK);
DownSignalMACD.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);