# All -in -One FVG indicator inspired from "ICT Fair Value Gap [LM]" and "Fair Value Gap [LUX]"
# Created by Sam4Cok @Samer800 - 09 / 2022
#// atr settings
input ShowTodayOnly = yes;
input ShowMidLine = yes;
input ColorFVGBar = no;
input thresholdType = { default ATR, Auto, Manual };
input atrLength = 28;         # 'ATR MA length'
input atrMultiplier = 1.5;    # 'ATR multiplier'
input ManualThreshold = 0.05;   # 'Percentage for Manual entry'
input UseChartTime = yes;
input aggregation = AggregationPeriod.FIFTEEN_MIN;
#//Data
def na = Double.NaN;
def today = if ShowTodayOnly == 0 or GetDay() == GetLastDay() then 1 else 0;
#--------------
    DefineGlobalColor("up", CreateColor(49, 121, 245));
DefineGlobalColor("dn", CreateColor(194, 24, 91));
DefineGlobalColor("mid", CreateColor(244, 143, 177));
DefineGlobalColor("bgUP", CreateColor(3.9, 32.5, 81.2));
DefineGlobalColor("bgDN", CreateColor(49.4, 6.3, 23.1));

def L;
def L1;
def L2;
def H;
def H1;
def H2;
def C;
def C1;
def C2;
def C3;
def O;
def O1;
if UseChartTime
then {
    L = low;
    L1 = low[1];
    L2 = low[2];
    H = high;
    H1 = high[1];
    H2 = high[2];
    C = close;
    C1 = close[1];
    C2 = close[2];
    C3 = close[3];
    O = open;
    O1 = open[1];
} else {
    L = low(period = aggregation);
    L1 = low(period = aggregation)[1];
    L2 = low(period = aggregation)[2];
    H = high(period = aggregation);
    H1 = high(period = aggregation)[1];
    H2 = high(period = aggregation)[2];
    C = close(period = aggregation);
    C1 = close(period = aggregation)[1];
    C2 = close(period = aggregation)[2];
    C3 = close(period = aggregation)[3];
    O = open(period = aggregation);
    O1 = open(period = aggregation)[1];
}
#f_isUpCandle(_index) =>
script f_isUpCandle {
    input _index = 0;
    def f_isUpCandle = open[_index] <= close[_index];
    plot return = f_isUpCandle;
}

def isUpCandle = C1 > O1;
def isDnCandle = L2 > H;
def n = BarNumber();
def atrValue = ATR(Length = atrLength);
def priceDiff = H1 - L1;

def delta_per = (C1 - O1) / O1 * 100;
def threshold = TotalSum(AbsValue(delta_per)) / n * 2;

def bullCondition = if thresholdType == thresholdType.ATR then
    (C3 >= L2 and C1 >= C2 and L > H2) else
    if thresholdType == thresholdType.Auto then
        (L > H2 and C1 > H2) else L > H2;

def bearCondition = if thresholdType == thresholdType.ATR then
    (C3 <= H2 and C1 <= C2 and H < L2) else
    if thresholdType == thresholdType.Auto then
        (H < L2  and C1 < L2) else H < L2;

def midCandlVolatCond = if thresholdType == thresholdType.ATR then
priceDiff > atrValue * atrMultiplier else
if thresholdType == thresholdType.Auto then
    (if bullCondition then delta_per > threshold else - delta_per > threshold) else
(if bullCondition then AbsValue((H2 - L) / H2) > ManualThreshold / 100 else
AbsValue((H - L2) / L2) > ManualThreshold / 100);

def isGapClosed = if f_isUpCandle(1) then H2 >= L else L2 <= H;

def isFVGup = if isNaN(isFVGup[1]) then 0 else
              bullCondition and!isGapClosed and midCandlVolatCond and
    (if thresholdType == thresholdType.ATR then!isFVGup[1] else 1);

def isFVGdn = if isNaN(isFVGdn[1]) then 0 else
             bearCondition and!isGapClosed and midCandlVolatCond and
    (if thresholdType == thresholdType.ATR then!isFVGdn[1] else 1);
def topup;
def bottomup;
def isUpCandleup;
def midup;
def topdn;
def bottomdn;
def isUpCandledn;
def middn;

if isFVGup {
    isUpCandleup = f_isUpCandle(1);
    topup = if isUpCandle then L else L2;
    bottomup = if isUpCandle then H2 else H;
    midup = (topup + bottomup) / 2;
} else {
    isUpCandleup = isUpCandleup[1];
    topup = topup[1];
    bottomup = bottomup[1];
    midup = midup[1];
}
if isFVGdn
{
    isUpCandledn = f_isUpCandle(1);
    topdn = if isUpCandle then L else L2;
    bottomdn = if isUpCandle then H2 else H;
    middn = (topdn + bottomdn) / 2;
} else {
    isUpCandledn = isUpCandledn[1];
    topdn = topdn[1];
    bottomdn = bottomdn[1];
    middn = middn[1];
}
def hasClosed = (O <= bottomdn and H > bottomdn and H >= topdn or O >= topup and L < topup and L <= bottomup);

def BgColorup = isUpCandleup;
def BgColordn = topdn;
#--------------------------------------------------------------
    def TopLineup = if today then topup else na;
plot MidLineup = if IsNaN(close) then na else if today then midup else na;
def BotLineup = if today then bottomup else na;


MidLineup.AssignValueColor( if BgColorup then Color.LIME else GlobalColor("bgdn"));
MidLineup.SetPaintingStrategy(PaintingStrategy.DASHES);
MidLineup.SetHiding(!ShowMidLine);

#----------------------------------------------------------------
    def TopLinedn = if today then topdn else na;
plot MidLinedn = if IsNaN(close) then na else if today then middn else na;
def BotLinedn = if today then bottomdn else na;

MidLinedn.AssignValueColor( if !BgColorup then GlobalColor("bgUP") else Color.PINK);
MidLinedn.SetPaintingStrategy(PaintingStrategy.DASHES);
MidLinedn.SetHiding(!ShowMidLine);

#------Cloud
AddCloud(TopLineup[-1], BotLineup[-1], CreateColor(4, 181, 4), CreateColor(184, 6, 6));
AddCloud(BotLinedn[-1], TopLinedn[-1], CreateColor(4, 181, 4), CreateColor(184, 6, 6));
#------Bar Color
AssignPriceColor( if ColorFVGBar and topup <> topup[-1] then Color.BLUE else Color.CURRENT);
AssignPriceColor( if ColorFVGBar and topdn <> topdn[-1] then color.PINK else Color.CURRENT);


##### END #######