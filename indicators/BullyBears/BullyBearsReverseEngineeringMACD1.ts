# BULLYBEARS MACD CODE

#declare lower;

input fastLengthMACD = 60;
input slowLengthMACD = 120;
input MACDLength = 500;
input averageTypeMACD = AverageType.WEIGHTED;
input showBreakoutSignals = yes;

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
Diff.SetPaintingStrategy(PaintingStrategy.LINE);
Diff.SetLineWeight(4);
Diff.DefineColor("Positive and Up", Color.GREEN);
Diff.DefineColor("Positive and Down", Color.DARK_GREEN);
Diff.DefineColor("Negative and Down", Color.RED);
Diff.DefineColor("Negative and Up", Color.DARK_RED);
Diff.AssignValueColor(if Diff >= 0 then if Diff > Diff[1] then Diff.Color("Positive and Up") else Diff.Color("Positive and Down") else if Diff < Diff[1] then Diff.Color("Negative and Down") else Diff.Color("Negative and Up"));
ZeroLine.SetDefaultColor(GetColor(0));
UpSignalMACD.SetDefaultColor(Color.UPTICK);
UpSignalMACD.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignalMACD.SetDefaultColor(Color.DOWNTICK);
DownSignalMACD.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);

### IMPROVED MACD AS LAYER

declare lower;
input fastLength = 12;
input slowLength = 26;
#input MACDLength = 9;
input averageType = AverageType.EXPONENTIAL;
plot Value1 = MovingAverage(averageType, close, fastLength) – MovingAverage(averageType, close, slowLength);
plot Avg1 = MovingAverage(averageType, Value1, MACDLength);
plot Diff1 = Value1 – Avg1;
plot ZeroLine1 = 0;
Value.SetDefaultColor(GetColor(1));
Avg.SetDefaultColor(GetColor(5));
Diff.SetDefaultColor(GetColor(9));
Diff.SetPaintingStrategy(PaintingStrategy.LINE);
Diff.SetLineWeight(3);
Diff.DefineColor(“Positive and Up”, Color.GREEN);
Diff.DefineColor(“Positive and Down”, Color.DARK_GREEN);
Diff.DefineColor(“Negative and Down”, Color.RED);
Diff.DefineColor(“Negative and Up”, Color.DARK_RED);
Diff.AssignValueColor(if Diff >= 0 then if Diff > Diff[1] then Diff.Color(“Positive and Up”) else Diff.Color(“Positive and Down”) else if Diff < Diff[1] then Diff.Color(“Negative and Down”) else Diff.Color(“Negative and Up”));
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
Alert(aboveZeroCross, "ValueCrossAboveZeroline", Alert.BAR, Sound.Bell);
Alert(belowZeroCross, "ValueCrossBelowZeroline", Alert.BAR, Sound.Ding);


### MACD 200 CROSSINGS AS LAYER

#declare lower;
input fastLength3 = 12;
input slowLength3 = 26;
input MACDLength3 = 9;
input averageType3 = AverageType.EXPONENTIAL;
input HighVolume = yes;
input VolumeAveragingLength = 20;
input VolumePercentThreshold = 60;
plot Value3 = MovingAverage(averageType, close, fastLength) – MovingAverage(averageType, close, slowLength);
plot Avg2 = MovingAverage(averageType, Value, MACDLength);
plot Diff2 = Value3 – Avg2;
#plot ZeroLine = 0;
Value.SetDefaultColor(GetColor(1));
Avg.SetDefaultColor(GetColor(7));
Diff2.SetDefaultColor(GetColor(5));
Diff2.SetPaintingStrategy(PaintingStrategy.LINE);
Diff2.SetLineWeight(3);
Diff2.DefineColor(“Positive and Up”, Color.GREEN);
Diff2.DefineColor(“Positive and Down”, Color.DARK_GREEN);
Diff2.DefineColor(“Negative and Down”, Color.RED);
Diff2.DefineColor(“Negative and Up”, Color.DARK_RED);
Diff2.AssignValueColor(if Diff2 >= 0 then if Diff2 > Diff2[1] then Diff2.Color(“Positive and Up”) else Diff2.Color(“Positive and Down”) else if Diff2 < Diff2[1] then Diff2.Color(“Negative and Down”) else Diff2.Color(“Negative and Up”));

##High Volume
def aVol = Average(volume, VolumeAveragingLength);
def pVol = 100 * ((volume - aVol[1]) / aVol[1]);
def pDot = pVol >= VolumePercentThreshold;
def HV = pDot and HighVolume;
plot HiVolArrow = if HV then 0 else Double.NaN;

HiVolArrow.SetPaintingStrategy(PaintingStrategy.POINTS);
HiVolArrow.SetLineWeight(3);
HiVolArrow.SetDefaultColor(Color.WHITE);
HiVolArrow.HideTitle();
HiVolArrow.HideBubble();

ZeroLine.SetDefaultColor(GetColor(0));


# now for the signal
def ValueCrossBelowZeroline1 = Value[1] < Avg[1] and Value[1] < 0 and Value > Avg;
plot belowZeroCross1 = if ValueCrossBelowZeroline1 then Value else Double.NaN;
belowZeroCross1.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
belowZeroCross1.SetDefaultColor(Color.CYAN);
def ValueCrossAboveZeroline1 = Value[1] > Avg[1] and Value[1] > 0 and Value < Avg;
plot aboveZeroCross1 = if ValueCrossAboveZeroline1 then Value else Double.NaN;
aboveZeroCross1.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
aboveZeroCross1.SetDefaultColor(Color.MAGENTA);

#plot scan = ValueCrossBelowZeroline;
#plot scan = ValueCrossAboveZeroline;
# Alerts
Alert(aboveZeroCross1, "ValueCrossAboveZeroline", Alert.BAR, Sound.Bell);
Alert(belowZeroCross1, "ValueCrossBelowZeroline", Alert.BAR, Sound.Ding);