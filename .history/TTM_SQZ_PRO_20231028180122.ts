#WS Trades converted to mobile TOS
##Assembled by TheBewb using existing Mobius Squeeze Momentum coding and "squeeze" concept made popular by John Carter.
declare lower;
input price = close;
input length = 20;
input Num_Dev_Dn = -2.0;
input Num_Dev_up = 2.0;
input averageType = AverageType.SIMPLE;
input displace = 0;
def sDev = StDev(data = price[-displace], length = length);
def MidLineBB = MovingAverage(averageType, data = price[-displace], length = length);
def LowerBandBB = MidLineBB + Num_Dev_Dn * sDev;
def UpperBandBB = MidLineBB + Num_Dev_up * sDev;
input factorhigh = 1.0;
input factormid = 1.5;
input factorlow = 2.0;
input trueRangeAverageType = AverageType.SIMPLE;
def shifthigh = factorhigh * MovingAverage(trueRangeAverageType, TrueRange(high, close, low), length);
def shiftMid = factormid * MovingAverage(trueRangeAverageType, TrueRange(high, close, low), length);
def shiftlow = factorlow * MovingAverage(trueRangeAverageType, TrueRange(high, close, low), length);
def average = MovingAverage(averageType, price, length);

def Avg = average[-displace];

def UpperBandKCLow = average[-displace] + shiftlow[-displace];
def LowerBandKCLow = average[-displace] - shiftlow[-displace];

def UpperBandKCMid = average[-displace] + shiftMid[-displace];
def LowerBandKCMid = average[-displace] - shiftMid[-displace];

def UpperBandKCHigh = average[-displace] + shifthigh[-displace];
def LowerBandKCHigh = average[-displace] - shifthigh[-displace];

def K = (Highest(high, length) + Lowest(low, length)) /
    2 + ExpAverage(close, length);
def momo = Inertia(price - K / 2, length);

def pos = momo >= 0;
def neg = momo < 0;
def up = momo >= momo[1];
def dn = momo < momo[1];
def ATR1 = Average(TrueRange(high, close, low), length);

def SDev1 = StDev(price, length);

def presqueeze = LowerBandBB > LowerBandKCLow and UpperBandBB < UpperBandKCLow;
def originalSqueeze = LowerBandBB > LowerBandKCMid and UpperBandBB < UpperBandKCMid;
def ExtrSqueeze = LowerBandBB > LowerBandKCHigh and UpperBandBB < UpperBandKCHigh;
def Fired = sDev1 > ATR1;

def PosUp = pos and up;
def PosDn = pos and dn;
def NegDn = neg and dn;
def NegUp = neg and up;


def conditionF = Fired;
plot squeezelineF = if conditionF then 0 else double.NaN;
squeezelineF.SetPaintingStrategy(PaintingStrategy.POINTS);
squeezelineF.SetDefaultColor(Color.GREEN);

def conditionPS = presqueeze;
plot squeezelinePS = if conditionPS then 0 else double.NaN;
squeezelinePS.SetPaintingStrategy(PaintingStrategy.POINTS);
squeezelinePS.SetDefaultColor(Color.BLACK);

def conditionOS = originalSqueeze;
plot squeezelineOS = if conditionOS then 0 else double.NaN;
squeezelineOS.SetPaintingStrategy(PaintingStrategy.POINTS);
squeezelineOS.SetDefaultColor(Color.RED);

def conditionES = ExtrSqueeze;
plot squeezelineES = if conditionES then 0 else double.NaN;
squeezelineES.SetPaintingStrategy(PaintingStrategy.POINTS);
squeezelineES.SetDefaultColor(Color.ORANGE);

plot momentum = momo;
momentum.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
momentum.AssignValueColor( if PosUp then Color.cyAN else if PosDn then Color.blue else if NegDn then Color.red else if NegUp then Color.yellow else Color.YELLOW);