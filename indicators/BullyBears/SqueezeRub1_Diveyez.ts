# This indicator measures the momentum of a security and compares it to the momentum of the market index and VIX.
# Credit to ChatGPT and Richard Neff

# Declare the momentum correlation indicator
declare lower;

# Define the inputs
input momentumLength = 14;
input correlationLength = 50;
input stochLength = 14;
input overBought = 80;
input overSold = 20;

# Calculate the momentum of the security
def securityMomentum = close - close[momentumLength];

# Calculate the momentum of the market index(SPY)
def marketMomentum = close("/ES") - close("/ES")[momentumLength];

# Calculate the momentum of VIX
def vixMomentum = close("VIX") - close("VIX")[momentumLength];

# Calculate the correlation between the two momentum values
def correlation = Correlation(securityMomentum, marketMomentum, correlationLength);

# Calculate the correlation between the momentum of the security and VIX
def vixCorrelation = Correlation(securityMomentum, vixMomentum, correlationLength);

# Define the moving average of the correlation
def ma = MovingAverage(AverageType.SIMPLE, correlation, 9);

# Calculate the stochastic oscillator
def c = close;
def l = low;
def h = high;
def kPeriods = stochLength;
def dPeriods = stochLength;
def slowingPeriods = 3;
def resistance = overbought;
def support = oversold;
def k = (c - Lowest(l, kPeriods)) / (Highest(h, kPeriods) - Lowest(l, kPeriods)) * 100;
def d = MovingAverage(AverageType.SIMPLE, k, dPeriods);
def slowD = MovingAverage(AverageType.SIMPLE, d, slowingPeriods);
# Plot the correlation and the moving average
plot CorrelationHist = correlation;
plot VIXCorrelationHist = vixCorrelation;
plot MAHist = ma;
plot StochK = k;
plot StochD = slowD;

StochK.SetDefaultColor(Color.CYAN);
StochD.SetDefaultColor(Color.BLUE);
StochK.SetLineWeight(2);
StochD.SetLineWeight(2);

StochK.DefineColor("overbought", Color.RED);
StochK.DefineColor("Normal", Color.YELLOW);
StochK.DefineColor("oversold", Color.GREEN);
StochK.AssignValueColor(if StochK > overbought then StochK.Color("Overbought") else if StochK < oversold then StochK.Color("Oversold") else StochK.Color("Normal"));

# Format the plots
CorrelationHist.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
CorrelationHist.AssignValueColor(if correlation >= 0 then Color.GREEN else Color.WHITE);

VIXCorrelationHist.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
VIXCorrelationHist.AssignValueColor(if vixCorrelation >= 0 then Color.GREEN else Color.WHITE);

MAHist.SetDefaultColor(Color.YELLOW);
