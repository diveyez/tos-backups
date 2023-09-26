# Auto Support and Resistance Levels with Volume Filter and Entry / Exit Signals
# Plots support and resistance levels based on the most recent period's high, low, and close
# Volume filter allows user to only display levels when volume is above a certain threshold
# Entry signal triggers when price crosses above the resistance level
# Exit signal triggers when price crosses below the support level

input length = 1;
input timeFrame = AggregationPeriod.DAY;
input volFilter = 0;

def h = high(period = timeFrame);
def l = low(period = timeFrame);
def c = close(period = timeFrame);
def v = volume(period = timeFrame);

def range = h - l;
def pivot = c;
def r1 = pivot + range * 0.1;
def r2 = pivot + range * 0.2;
def r3 = pivot + range * 0.3;
def s1 = pivot - range * 0.1;
def s2 = pivot - range * 0.2;
def s3 = pivot - range * 0.3;

plot R1 = R1;
R1.SetDefaultColor(Color.CYAN);
plot R2 = R2;
R2.SetDefaultColor(Color.CYAN);
plot R3 = R3;
R3.SetDefaultColor(Color.CYAN);
plot S1 = S1;
S1.SetDefaultColor(Color.MAGENTA);
plot S2 = S2;
S2.SetDefaultColor(Color.MAGENTA);
plot S3 = S3;
S3.SetDefaultColor(Color.MAGENTA);

def displayLevels = v > volFilter;

R1.SetHiding(displayLevels);
R2.SetHiding(displayLevels);
R3.SetHiding(displayLevels);
S1.SetHiding(displayLevels);
S2.SetHiding(displayLevels);
S3.SetHiding(displayLevels);

AddCloud(S1, R1, Color.MAGENTA, Color.CYAN);
AddCloud(S2, R2, Color.MAGENTA, Color.CYAN);
AddCloud(S3, R3, Color.MAGENTA, Color.CYAN);

def aboveR1 = c crosses above R1;
def belowS1 = c crosses below S1;

plot enter = if aboveR1 then R1 else Double.NaN;
enter.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
enter.SetLineWeight(3);
enter.SetDefaultColor(Color.GREEN);

plot exit = if belowS1 then S1 else Double.NaN;
exit.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
exit.SetLineWeight(3);
exit.SetDefaultColor(Color.RED);