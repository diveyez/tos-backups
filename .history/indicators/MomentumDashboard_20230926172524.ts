declare lower;
input agg = AggregationPeriod.DAY;
input usehigheraggperiod = { default "Current", "Higher"};
def curr = if !IsNaN(close) then 1 else 0;
def o;
def h;
def c;
def l;
switch (usehigheraggperiod) {
    case Current:

        o = open;

        h = high;

        l = low;

        c = close;
    case Higher:

        o = open(period = agg);

        h = high(period = agg);

        l = low(period = agg);

        c = close(period = agg);

}
def price = c;
########################################heikin ASHI
plot HASeperator = if !curr then Double.NaN else 1.375;
HASeperator.AssignValueColor(Color.WHITE);
HASeperator.SetLineWeight(2);
def haclose = (h + c + l + o) / 4;
def haopen = (haopen[1] + haclose[1]) / 2;

plot HA = if !curr then Double.NaN else 1.25;
HA.SetPaintingStrategy(PaintingStrategy.POINTS);
HA.AssignValueColor(if haclose > haopen then Color.GREEN else if haclose < haopen then Color.RED  else Color.BLUE);
HA.SetLineWeight(5);


##############################################RSI Laguerre
def ema1 = movavgExponential(h, 34);
def ema2 = movavgExponential(c, 34);
def ema3 = movavgExponential(l, 34);

plot Grab = if !curr then Double.NaN else if c < ema1 and c > ema3 then double.NaN else 1;
#Grab.AssignValueColor(if c > ema1 and o < c then Color.GREEN
#  else if c > ema1 and o >= c then Color.DARK_GREEN
#  else if c < ema3 and o <= c then Color.dark_RED
#  else if c < ema3 and o > c then Color.RED
#  else if o < c then Color.CYAN
#  else if o >= c then Color.BLUE
#  else Color.BLUE);

Grab.AssignValueColor(if c > ema1  then Color.GREEN
  else if c < ema3 then Color.RED
  else Color.BLUE);

Grab.SetPaintingStrategy(PaintingStrategy.POINTS);
Grab.SetLineWeight(5);
plot momSeperator = if !curr then Double.NaN else 1.125;
momSeperator.AssignValueColor(Color.WHITE);
momSeperator.SetLineWeight(2);
################################################Impulse
input impulseMA_length = 8;

def EMA = expAverage(c, impulseMA_length);
def MACD = expAverage(c, 12) - expAverage(c, 26);
def MACDHist = MACD - expAverage(MACD, 9);
def GreenPrice = EMA > EMA[1] and MACDHist > MACDHist[1];
def RedPrice = EMA < EMA[1] and MACDHist < MACDHist[1];

def Bullish = GreenPrice;
def Neutral = !GreenPrice and!RedPrice;
def Bearish = RedPrice;

plot impulse = if !curr then Double.NaN else if Neutral then Double.NaN else .75;
impulse.SetPaintingStrategy(PaintingStrategy.POINTS);
impulse.AssignValueColor(if GreenPrice then Color.GREEN else if RedPrice then Color.RED  else Color.BLUE);
impulse.SetLineWeight(5);

#############################################################3
############################################################

def displace = 0;
input length = 20;
input Num_Dev_Dn = -1;
input Num_Dev_up = 1;
input averageType = AverageType.EXPONENTIAL;

def sDev = StDev(data = price[-displace], length = length);
def MidLine = MovingAverage(averageType, data = price[-displace], length = length);
def LowerBand = MidLine + Num_Dev_Dn * sDev;
def UpperBand = MidLine + Num_Dev_up * sDev;
def width = (UpperBand - LowerBand) / MidLine * 100;
def volA = if (width > width[1]) and width[1] > width[2] and(c > upperband or c < lowerband) then 2 else if (width > width[1]) and(width[1] <= width[2]) and(c > upperband or c < lowerband) then 1 else if (c > upperband or c < lowerband) and(width < width[1]) and width[1] < width[2] then - 2 else 0;
plot vol = if !curr then Double.NaN else if c < upperband and c > lowerband then Double.NaN else .5;
vol.SetPaintingStrategy(PaintingStrategy.POINTS);
vol.AssignValueColor(if (width > width[1]) and width[1] > width[2] then Color.MAGENTA else if (width > width[1]) and(width[1] <= width[2]) then Color.ORANGE else if (width < width[1]) and width[1] < width[2] then Color.RED  else Color.BLUE);
vol.SetLineWeight(5);


plot vol2 = if !curr then Double.NaN else if c > upperband or c < lowerband then Double.NaN else .5;
vol2.SetPaintingStrategy(PaintingStrategy.DASHES);
vol2.AssignValueColor(if (width > width[1]) and width[1] > width[2] then Color.MAGENTA else if (width > width[1]) and(width[1] <= width[2]) then Color.ORANGE else if (width < width[1]) and width[1] < width[2] then Color.RED  else Color.BLUE);
vol2.SetLineWeight(5);


plot volSeperator = if !curr then Double.NaN else .625;
volSeperator.AssignValueColor(Color.WHITE);
volSeperator.SetLineWeight(2);
#########################################Labels######################33
def stDevLength = 10;
def averageLength = 14;
def averageTypeRVI = AverageType.EXPONENTIAL;

def stDevHi = stDev(h, stDevLength);
def stDevLo = stDev(l, stDevLength);

def avgStDevHiUp = MovingAverage(averageTypeRVI, if h > h[1] then stDevHi else 0, averageLength);
def avgStDevHiDown = MovingAverage(averageTypeRVI, if h < h[1] then stDevHi else 0, averageLength);

def avgStDevLoUp = MovingAverage(averageTypeRVI, if l > l[1] then stDevLo else 0, averageLength);
def avgStDevLoDown = MovingAverage(averageTypeRVI, if l < l[1] then stDevLo else 0, averageLength);

def rviHi = if avgStDevHiUp + avgStDevHiDown == 0 then 50 else 100 * avgStDevHiUp / (avgStDevHiUp + avgStDevHiDown);
def rviLo = if avgStDevLoUp + avgStDevLoDown == 0 then 50 else 100 * avgStDevLoUp / (avgStDevLoUp + avgStDevLoDown);

def RVI = (rviHi + rviLo) / 2;

plot volKC = if !curr then Double.NaN else .25;
volKC.SetPaintingStrategy(PaintingStrategy.points);
volKC.AssignValueColor(if RVI > RVI[1] and RVI > 50 then color.green else if RVI > 50 and RVI <= RVI[1] then color.dark_green else if RVI < 50 and RVI < RVI[1] then color.red else if RVI < 50 and RVI >= RVI[1] then color.dark_red else Color.BLUE);
volKC.SetLineWeight(5);