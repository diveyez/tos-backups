# Define the inputs
input price = close;
input length = 20;
input mult = 2.0;
input lengthKC = 20;
input multKC = 1.5;

# Calculate the Bollinger Bands
def BB = BollingerBands(price, length, mult);

# Calculate the Keltner Channels
def KC = KeltnerChannels(price, lengthKC, multKC);

# Calculate the distance between the bands
def bbWidth = BB.upper - BB.lower;
def kcWidth = KC.upper - KC.lower;

# Calculate the momentum
def mom = Momentum(price, length);

# Determine if the bands are inside the channels
def BBinsideKC = BB.lower > KC.lower and BB.upper < KC.upper;

# Determine if the momentum is positive
def momPositive = mom > 0;

# Determine if the bands are tightening
def bbTight = bbWidth <= Lowest(bbWidth, length);
def kcTight = kcWidth <= Lowest(kcWidth, length);

# Determine if the squeeze has fired
def squeeze = bbTight and kcTight and BBinsideKC and momPositive;

# Determine if a trend reversal has occurred
def upperTrendReversal = Crosses(BB.upper, KC.upper, CrossingDirection.ABOVE);
def lowerTrendReversal = Crosses(BB.lower, KC.lower, CrossingDirection.BELOW);

# Plot the squeeze and trend reversal signals
plot SqueezeSignal = if squeeze then 1 else 0;
SqueezeSignal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
SqueezeSignal.SetLineWeight(3);
SqueezeSignal.SetDefaultColor(Color.CYAN);

plot utrendl = if upperTrendReversal then BB.upper else Double.NaN;
utrendl.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
utrendl.SetLineWeight(3);
utrendl.SetDefaultColor(Color.GREEN);

plot ltrendl = if lowerTrendReversal then BB.lower else Double.NaN;
ltrendl.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
ltrendl.SetLineWeight(3);
ltrendl.SetDefaultColor(Color.RED);