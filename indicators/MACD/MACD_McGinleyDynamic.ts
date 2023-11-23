

# Mobius
# V01.03.12.2011
# Note: Arrows plotted are intra - trend indicators.So they may be couter trend or with trend.

declare lower;

input fastLength = 12;
input slowLength = 26;
input MACDLength = 9;
input data = close;
input AvgType = AverageType.Exponential;
input showBreakoutSignals = yes;

script McGinley
{
input data = close;
input n = 12;
def M = CompoundValue(1, M[1] + (data - M[1]) /
    (n * Power((data / M[1]), 4)), data);
plot McG = M;
}
plot Value = McGinley(data, fastLength) - McGinley(data, slowLength);
plot Avg = MovingAverage(AvgType, Value, MACDLength);
plot Diff = Value - Avg;
plot ZeroLine = 0;
plot UpSignal = if Diff crosses above ZeroLine
then ZeroLine
else Double.NaN;
plot DownSignal = if Diff crosses below ZeroLine
then ZeroLine
else Double.NaN;

AddLabel(1, if Value < 0 and Value < Avg
then "Trend Down Accelerating"
else if Value < 0 and Value > Avg
then "Trend Down Slowing"
else if Value > 0 and Value > Avg
then "Trend Up Accelerating"
else if Value > 0 and Value < Avg
then "Trend Up Slowing"
else "?",
if Value < 0
then color.red
else color.green);
UpSignal.SetHiding(!showBreakoutSignals);
DownSignal.SetHiding(!showBreakoutSignals);
Value.SetDefaultColor(GetColor(1));
Avg.SetDefaultColor(GetColor(8));
Diff.SetDefaultColor(GetColor(5));
Diff.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Diff.SetLineWeight(3);
Diff.DefineColor("Positive and Up", Color.GREEN);
Diff.DefineColor("Positive and Down", Color.DARK_GREEN);
Diff.DefineColor("Negative and Down", Color.RED);
Diff.DefineColor("Negative and Up", Color.DARK_RED);
Diff.AssignValueColor(if Diff >= 0 then if Diff > Diff[1] then Diff.color("Positive and Up") else Diff.color("Positive and Down") else if Diff < Diff[1] then Diff.color("Negative and Down") else Diff.color("Negative and Up"));
ZeroLine.SetDefaultColor(GetColor(0));
UpSignal.SetDefaultColor(Color.UPTICK);
UpSignal.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignal.SetDefaultColor(Color.DOWNTICK);
DownSignal.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);

Value.AssignValueColor(if Value > 0 then Color.DARK_GREEN else Color.RED);

