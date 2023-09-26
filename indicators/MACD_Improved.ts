declare lower;
input fastLength = 12;
input slowLength = 26;
input MACDLength = 9;
input averageType = AverageType.EXPONENTIAL;
plot Value = MovingAverage(averageType, close, fastLength) – MovingAverage(averageType, close, slowLength);
plot Avg = MovingAverage(averageType, Value, MACDLength);
plot Diff = Value – Avg;
plot ZeroLine = 0;
Value.SetDefaultColor(GetColor(1));
Avg.SetDefaultColor(GetColor(8));
Diff.SetDefaultColor(GetColor(5));
Diff.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Diff.SetLineWeight(3);
Diff.DefineColor(“Positive and Up”, Color.GREEN);
Diff.DefineColor(“Positive and Down”, Color.DARK_GREEN);
Diff.DefineColor(“Negative and Down”, Color.RED);
Diff.DefineColor(“Negative and Up”, Color.DARK_RED);
Diff.AssignValueColor(if Diff >= 0 then if Diff > Diff[1] then Diff.color(“Positive and Up”) else Diff.color(“Positive and Down”) else if Diff < Diff[1] then Diff.color(“Negative and Down”) else Diff.color(“Negative and Up”));
ZeroLine.SetDefaultColor(GetColor(0));

# now for the signal
def ValueCrossBelowZeroline = Value[1] < Avg[1] and Value[1] < 0 and Value > Avg;
plot belowZeroCross = if ValueCrossBelowZeroline then Value else Double.NaN;
belowZeroCross.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
belowZeroCross.SetDefaultColor(Color.CYAN);
def ValueCrossAboveZeroline = Value[1] > Avg[1] and Value[1] > 0 and Value < Avg;
plot aboveZeroCross = if ValueCrossAboveZeroline then Value else Double.NaN;
aboveZeroCross.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
aboveZeroCross.SetDefaultColor(Color.MAGENTA);

#plot scan = ValueCrossBelowZeroline;
#plot scan = ValueCrossAboveZeroline;
# Alerts
Alert(aboveZeroCross, "ValueCrossAboveZeroline", Alert.Bar, Sound.Bell);
Alert(belowZeroCross, "ValueCrossBelowZeroline", Alert.Bar, Sound.Ding);