#study("NSDT HAMA Candles", overlay = true)
#//INPUTS
### NSDT ###
input TrendSource = close;
input HAMALength = 69;
input HAMAType = { WMA, SMA, default EMA, HMA };
input HAMABar = yes;
input HAMAMa = yes;
#//MA INFO
input OpenLength = 25; #"Length Open"
input OpenType = { default EMA, SMA, WMA }; #"Type Open"
input HighLength = 20; #"Length High"
input HighType = { default EMA, SMA, WMA }; #"Type High"
input LowLength = 20; #"Low"
input LowType = { default EMA, SMA, WMA }; #"Type Low"
input CloseLength = 20; #"Length Close"
input CloseType = { default EMA, SMA, WMA }; #"Close"
### SSL1Source ###
input ShowSSL = yes; #(true, "Highlight State ?")
input SSLWicks = no;#(false, "Take Wicks into Account ?")
input SSLType = { WMA, default SMA, EMA, HMA };
input SSL_MaLength = 100; #"MA "Channel ?
### TDFI ###
input TDFIFilter = no;
input TDFIPeriod = 11; # "Lookback"
input filterHigh = 0.03; # "Filter High"
input filterLow = -0.03; # "Filter Low"
### ADX ###
input ADXFilter = no;
input ADXLength = 11;
input ADXLimit = 20;
### Range Indicator
input RangeFilter = no;
input RILength = 11;
input RangeAbove = 20;
input smoothingLength = 5;
### Other 
input ColorBar = no;
input showArrow = yes;
##################
def na = Double.NaN;
########## Colors ########
DefineGlobalColor("Bull", CreateColor(38, 166, 154));
DefineGlobalColor("WeakBull", CreateColor(204, 204, 0));
DefineGlobalColor("Bear", CreateColor(239, 83, 80));
DefineGlobalColor("WeakBear", CreateColor(255, 128, 0));
DefineGlobalColor("Neutral", CreateColor(255, 255, 0));
DefineGlobalColor("BullBar", CreateColor(0, 255, 0));
DefineGlobalColor("WeakBullBar", CreateColor(0, 128, 0));
DefineGlobalColor("BearBar", CreateColor(255, 0, 0));
DefineGlobalColor("WeakBearBar", CreateColor(128, 0, 0));
DefineGlobalColor("NeutralBar", CreateColor(255, 255, 0));
#////////////////////////////////////////////////////////////////////////////////
#mat(source, length, type) =>
script mat {
input source = close;
input length = 69;
input type = "EMA";
def mat;
    mat =
if type == "SMA" then SimpleMovingAvg(source, length) else
    if type == "EMA" then ExpAverage(source, length) else
    if type == "WMA" then WMA(source, length) else
    if type == "HMA" then WMA(2 * WMA(source, length / 2) - WMA(source, length), Round(Sqrt(length)))
else Double.nan;
plot result = mat;
}

def ma = WMA(TrendSource, HAMALength);

#//GRADIENT AREA
def center = ExpAverage(ma, 3);
def xUp = ma Crosses Above center;
def xDn = ma Crosses Below center;
def chg = ma - ma[1];
def up = chg > 0;
def dn = chg < 0;
def srcBull = ma > center;
def srcBear = ma < center;

#### TREND####
def StrongUP = srcBull and up;
def WeakUp = srcBull and dn;
def StrongDN = srcBear and dn;
def WeakDN = srcBear and up;
def Neutral = xUp or xDn or!StrongUP and!StrongDN and!WeakUp and!WeakDN;

#def TypeClose = CloseType;
def SourceClose = (open + high + low + close) / 4;
def LengthClose = CloseLength;

def SourceOpen = CompoundValue(1, (SourceOpen[1] + SourceClose[1]) / 2, SourceClose);
def LengthOpen = OpenLength;

#def TypeHigh = HighType;
def SourceHigh = Max(max(high, SourceOpen), SourceClose);
def LengthHigh = HighLength;

#def TypeLow = LowType;
def SourceLow = Min(Min(low, SourceOpen), SourceClose);
def LengthLow = LowLength;

#funcCalcMA1(type1, src1, len1) =>
script funcCalcMA1 {
input type1 = "EMA";
input src1 = close;
input len1 = 0;
def funcCalcMA1;
    funcCalcMA1 = if type1 == "SMA" then SimpleMovingAvg(src1, len1) else
    if type1 == "EMA" then ExpAverage(src1, len1) else WMA(src1, len1);
plot result = funcCalcMA1;
}
#funcCalcOpen(TypeOpen, SourceOpen, LengthOpen) =>
script funcCalcOpen {
input TypeOpen = "WMA";
input SourceOpen = close;
input LengthOpen = 0;
def funcCalcOpen;
    funcCalcOpen = if TypeOpen == "SMA" then SimpleMovingAvg(SourceOpen, LengthOpen) else
    if TypeOpen == "EMA" then ExpAverage(SourceOpen, LengthOpen) else WMA(SourceOpen, LengthOpen);
plot result = funcCalcOpen;
}
#funcCalcHigh(TypeHigh, SourceHigh, LengthHigh) =>
script funcCalcHigh {
input TypeHigh = "EMA";
input SourceHigh = close;
input LengthHigh = 0;
def funcCalcHigh;
    funcCalcHigh = if TypeHigh == "SMA" then SimpleMovingAvg(SourceHigh, LengthHigh) else
    if TypeHigh == "EMA" then ExpAverage(SourceHigh, LengthHigh) else WMA(SourceHigh, LengthHigh);
plot result = funcCalcHigh;
}
#funcCalcLow(TypeLow, SourceLow, LengthLow) =>
script funcCalcLow {
input TypeLow = "EMA";
input SourceLow = close;
input LengthLow = 0;
def funcCalcLow;
    funcCalcLow = if TypeLow == "SMA" then SimpleMovingAvg(SourceLow, LengthLow) else
    if TypeLow == "EMA" then ExpAverage(SourceLow, LengthLow) else WMA(SourceLow, LengthLow);
plot result = funcCalcLow;
}
#funcCalcClose(TypeClose, SourceClose, LengthClose) =>
script funcCalcClose {
input TypeClose = "EMa";
input SourceClose = close;
input LengthClose = 0;
def funcCalcClose;
    funcCalcClose = if TypeClose == "SMA" then SimpleMovingAvg(SourceClose, LengthClose) else
    if TypeClose == "EMA" then ExpAverage(SourceClose, LengthClose) else WMA(SourceClose, LengthClose);
plot result = funcCalcClose;
}

# Plot the new Chart
def CandleOpen = funcCalcOpen(OpenType, SourceOpen, LengthOpen);
def CandleHigh = funcCalcHigh(HighType, SourceHigh, LengthHigh);
def CandleLow = funcCalcLow(LowType, SourceLow, LengthLow);
def CandleClose = funcCalcClose(CloseType, SourceClose, LengthClose);
def MAValue = funcCalcMA1(HAMAType, TrendSource, HAMALength);

plot MAmain = if HAMAMa then MAValue else na;
MAmain.SetStyle(Curve.FIRM);
MAmain.AssignValueColor( if StrongUp then GlobalColor("Bull") else
if WeakUp then GlobalColor("WeakBull") else
if StrongDn then GlobalColor("Bear") else
if WeakDN then GlobalColor("WeakBear") else GlobalColor("Neutral"));
MAmain.SetLineWeight(1);

# Plot UP candle with isBull only
def UpO1;
def UpH1;
def UpL1;
def UpC1;

if StrongUP and HAMABar
then {
    UPO1 = if CandleOpen < CandleClose then CandleClose else CandleOpen;
    UpH1 = if CandleHigh > CandleClose then CandleClose else CandleHigh;
    UpL1 = if CandleLow < CandleOpen then CandleOpen else CandleLow;
    UpC1 = if CandleOpen < CandleClose then CandleOpen else CandleClose;
} else
{
    UpO1 = na;
    UpH1 = na;
    UpL1 = na;
    UpC1 = na;
}
# Plot UP candle with isBull and isExp
def UpO;
def UpH;
def UpL;
def UpC;
if WeakUp and HAMABar
then {
    UPO = if CandleOpen < CandleClose then CandleClose else CandleOpen;
    UpH = if CandleHigh > CandleClose then CandleClose else CandleHigh;
    UpL = if CandleLow < CandleOpen then CandleOpen else CandleLow;
    UpC = if CandleOpen < CandleClose then CandleOpen else CandleClose;
} else
{
    UpO = na;
    UpH = na;
    UpL = na;
    UpC = na;
}
# Plot DOWN candle
def DnO;
def DnH;
def DnL;
def DnC;
if WeakDN and HAMABar
then {
    DnO = if CandleOpen < CandleClose then CandleClose else CandleOpen;
    DnH = if CandleHigh > CandleOpen then CandleOpen else CandleHigh;
    DnL = if CandleLow < CandleClose then CandleClose else CandleLow;
    Dnc = if CandleOpen < CandleClose then CandleOpen else CandleClose;
} else
{
    DnO = na;
    DnH = na;
    DnL = na;
    DnC = na;
}
### Weak DNC ###
# Plot DOWN candle
def DnO1;
def DnH1;
def DnL1;
def DnC1;
if StrongDN and HAMABar
then {
    DnO1 = if CandleOpen < CandleClose then CandleClose else CandleOpen;
    DnH1 = if CandleHigh > CandleOpen then CandleOpen else CandleHigh;
    DnL1 = if CandleLow < CandleClose then CandleClose else CandleLow;
    DnC1 = if CandleOpen < CandleClose then CandleOpen else CandleClose;
} else
{
    DnO1 = na;
    DnH1 = na;
    DnL1 = na;
    DnC1 = na;
}
### Neutral
def NuO;
def NuH;
def NuL;
def NuC;
if Neutral and HAMABar
then {
    NuO = if CandleOpen < CandleClose then CandleClose else CandleOpen;
    NuH = if CandleHigh > CandleOpen then CandleOpen else CandleHigh;
    NuL = if CandleLow < CandleClose then CandleClose else CandleLow;;
    NuC = if CandleOpen < CandleClose then CandleOpen else CandleClose;
} else
{
    NuO = na;
    NuH = na;
    NuL = na;
    NuC = na;
}

# Plot the new Chart

AddChart(high = UpH1, low = UpL1, open = UpO1, close = UpC1,
    type = ChartType.CANDLE, growcolor = GlobalColor("Bull"));
AddChart(high = UpH, low = UpL, open = UpO, close = UpC,
    type = ChartType.CANDLE, growcolor = GlobalColor("WeakBull"));

AddChart(high = DnH1, low = DnL1, open = DnO1, close = DnC1,
    type = ChartType.CANDLE, growcolor = GlobalColor("Bear"));
AddChart(high = DnH, low = DnL, open = DnO, close = DnC,
    type = ChartType.CANDLE, growcolor = GlobalColor("WeakBear"));

AddChart(high = NuH, low = NuL, open = NuO, close = NuC,
    type = ChartType.CANDLE, growcolor = GlobalColor("Neutral"));
########
#indicator("SSL Channel", shorttitle = "SSL Channel", overlay = true, timeframe = "", timeframe_gaps = false)

def ma1 = mat(high, SSL_MaLength, SSLType);
def ma2 = mat(low, SSL_MaLength, SSLType);

def Hlv1 = if (if SSLWicks then high else close) > ma1 then 1 else
if (if SSLWicks then low else close)<ma2 then - 1 else Hlv1[1];
def Hlv = Hlv1;

def sslUp = if Hlv < 0 then ma2 else ma1;
def sslDown = if Hlv < 0 then ma1 else ma2;

def SSLBull = Hlv1 > 0 and Hlv1[1] < 0; 
def SSLBear = Hlv1 < 0 and Hlv1[1] > 0;

plot highLine = if ShowSSL then sslUp else na; #, title = "UP", linewidth = 2, color = Color1)
plot lowLine = if ShowSSL then sslDown else na; #, title = "DOWN", linewidth = 2, color = Color1)

highLine.AssignValueColor(if Hlv > 0 then Color.GREEN else color.RED);
lowLine.AssignValueColor(if Hlv > 0 then Color.GREEN else color.RED);

addcloud(highLine, lowLine, color.dark_green, Color.dark_RED, no);

##### TDFI 
def mma = ExpAverage(close * 1000, TDFIPeriod);
def smma = ExpAverage(mma, TDFIPeriod);

def impetmma = mma - mma[1];
def impetsmma = smma - smma[1];
def divma = AbsValue(mma - smma);
def averimpet = (impetmma + impetsmma) / 2;
def tdf = Power(divma, 1) * Power(averimpet, 3);
def tdfi = tdf / highest(AbsValue(tdf), TDFIPeriod * 3);

def Signal = if tdfi > filterHigh then 1 else
if tdfi < filterLow then - 1 else na;

###### ADX Filter
def ADX = DMI(ADXLength, AverageType.WILDERS).ADX;
###### Range Indicator
def data = TrueRange(high, close, low) / if close > close[1] then(close - close[1]) else 1;
def hData = Highest(data, RILength);
def lData = Lowest(data, RILength);
def range = 100 * (data - lData) / if hData > lData then(hData - lData) else 1;
def RI = ExpAverage(range, smoothingLength);

### Signal###
#def HAMAHigh = if CandleHigh > CandleClose then CandleClose else CandleHigh;
#def HAMALow = if CandleLow < CandleClose then CandleClose else CandleLow;
def HAMAHigh = close > CandleHigh;
def HAMALow = close < CandleLow; 

def SigUp = if TDFIFilter then(SSLBull and close > MAValue and HAMAHigh and Signal > 0)
else (SSLBull and close > MAValue and HAMAHigh);
def SigUp1 = if ADXFilter then SigUp and ADX >= ADXLimit else SigUp; 
def SignalUp = if RangeFilter then SigUp1 and RI >= RangeAbove else SigUp1; 

def SigDN = if TDFIFilter then(SSLBear and close < MAValue and HAMALow and Signal < 0)
else (SSLBear and close < MAValue and HAMALow);
def SigDn1 = if ADXFilter then SigDn and ADX >= ADXLimit else SigDn; 
def SignalDn = if RangeFilter then SigDn1 and RI >= RangeAbove else SigDn1; 

Plot Arrow_Up = if showArrow and SignalUp then low else na;
plot Arrow_Dn = if showArrow and SignalDn then high else na;

ARROW_UP.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
ARROW_UP.SetDefaultColor(Color.WHITE);
ARROW_UP.SetLineWeight(3);

ARROW_Dn.SetPaintingStrategy(PaintingStrategy.ARROW_DoWN);
ARROW_Dn.SetDefaultColor(Color.WHITE);
ARROW_Dn.SetLineWeight(3);

##### Price Color
AssignPriceColor(if ColorBar then
if Neutral then GlobalColor("NeutralBar") else
if StrongUp then GlobalColor("BullBar") else
if StrongDn then GlobalColor("BearBar") else
if WeakUp then GlobalColor("WeakBullBar") else GlobalColor("WeakBearBar") else color.current);

### ENd ####