#MUST LOAD AS A STRATEGIES
#Name: SUPERTREND_WITH_TREND_REVERSAL

#Must Load as a Strategies
#Modified Modius Supertrend With Reversal, Trend Direction AND mADX INDICATOR
#10.27.2021
#V1.0

input quantity = 1;
input lookback = 7;
input lookforward = 7;

#SuperTrend Yahoo Finance Replica - Modified from Modius SuperTrend
# Modified Modius ver.by RConner7
# Modified by Barbaros to replicate look from TradingView version
# v3.1
input AtrMult = .60; #hint AtrMult: Modify to FloatingPL Plot - Original set to 1.00
input nATR = 6;
input AvgType = AverageType.HULL;
input ShowBubbles = NO; # SUPERTREND BUBBLES
def ATR = ATR("length" = nATR, "average type" = AvgType);
def UP_Band_Basic = HL2 + (AtrMult * ATR);
def LW_Band_Basic = HL2 + (-AtrMult * ATR);
def UP_Band = if ((UP_Band_Basic < UP_Band[1]) or(close[1] > UP_Band[1])) then UP_Band_Basic else UP_Band[1];
def LW_Band = if ((LW_Band_Basic > LW_Band[1]) or(close[1] < LW_Band[1])) then LW_Band_Basic else LW_Band[1];

def ST = if ((ST[1] == UP_Band[1]) and(close < UP_Band)) then UP_Band
else if ((ST[1] == UP_Band[1]) and(close > UP_Band)) then LW_Band
else if ((ST[1] == LW_Band[1]) and(close > LW_Band)) then LW_Band
else if ((ST[1] == LW_Band) and(close < LW_Band)) then UP_Band
else LW_Band;

def Long = if close > ST then ST else Double.NaN;
#Long.AssignValueColor(Color.GREEN);
#Long.SetLineWeight(2);

def Short = if close < ST then ST else Double.NaN;
#Short.AssignValueColor(Color.RED);
#Short.SetLineWeight(3);
def LongTrigger = IsNaN(Long[1]) and!IsNaN(Long);
def ShortTrigger = IsNaN(Short[1]) and!IsNaN(Short);
plot LongDot = if LongTrigger then ST else Double.NaN;
LongDot.SetPaintingStrategy(PaintingStrategy.POINTS);
LongDot.AssignValueColor(Color.GREEN);
LongDot.SetLineWeight(4);

plot ShortDot = if ShortTrigger then ST else Double.NaN;
ShortDot.SetPaintingStrategy(PaintingStrategy.POINTS);
ShortDot.AssignValueColor(Color.RED);
ShortDot.SetLineWeight(4);

AddChartBubble(ShowBubbles and LongTrigger, ST, "B", Color.GREEN, no);
AddChartBubble(ShowBubbles and ShortTrigger, ST, "S", Color.RED, yes);

### Bar Color

input PaintBars = yes;

AssignPriceColor(if PaintBars and close < ST

then Color.RED

else if PaintBars and close > ST

then Color.GREEN

else Color.CURRENT);

#Alert(LongTrigger[AlertDisplace], "Long", Alert.BAR, Sound.Ding);
#Alert(ShortTrigger[AlertDisplace], "Short", Alert.BAR, Sound.Ding);

#NEW CODE
#def LongTrigger = IsNaN(Long[1]) and!IsNaN(Long);
#def ShortTrigger = IsNaN(Short[1]) and!IsNaN(Short);

def longBars = if LongTrigger then 0 else longBars[1] + 1;
def shortBars = if ShortTrigger then 0 else shortBars[1] + 1;

#_______________________________________________________________
#Trend Reversal Indicator
input AverageType = AverageType.EXPONENTIAL;
input ShowRBubbles = YES; #hint ShowRBubbles: Shows Reversal Bubble on Chart
def price = close;
def superfast_length = 9;
def fast_length = 14;
def slow_length = 21;
def displace = 0;

def mov_avg9 = ExpAverage(price[-displace], superfast_length);
def mov_avg14 = ExpAverage(price[-displace], fast_length);
def mov_avg21 = ExpAverage(price[-displace], slow_length);

#moving averages
def Superfast = mov_avg9;
def Fast = mov_avg14;
def Slow = mov_avg21;

def buy = mov_avg9 > mov_avg14 and mov_avg14 > mov_avg21 and low > mov_avg9;
def stopbuy = mov_avg9 <= mov_avg14;
def buynow = !buy[1] and buy;
def buysignal = CompoundValue(1, if buynow and!stopbuy then 1 else if buysignal[1] == 1 and stopbuy then 0 else buysignal[1], 0);

def Buy_Signal = buysignal[1] == 0 and buysignal == 1;

Alert(condition = buysignal[1] == 0 and buysignal == 1, text = "Buy Signal", sound = Sound.Bell, "alert type" = Alert.BAR);

def Momentum_Down = buysignal[1] == 1 and buysignal == 0;

Alert(condition = buysignal[1] == 1 and buysignal == 0, text = "Momentum_Down", sound = Sound.Bell, "alert type" = Alert.BAR);

def sell = mov_avg9 < mov_avg14 and mov_avg14 < mov_avg21 and high < mov_avg9;
def stopsell = mov_avg9 >= mov_avg14;
def sellnow = !sell[1] and sell;
def sellsignal = CompoundValue(1, if sellnow and!stopsell then 1 else if sellsignal[1] == 1 and stopsell then 0 else sellsignal[1], 0);

def Sell_Signal = sellsignal[1] == 0 and sellsignal;

Alert(condition = sellsignal[1] == 0 and sellsignal == 1, text = "Sell Signal", sound = Sound.Bell, "alert type" = Alert.BAR);

def Momentum_Up = sellsignal[1] == 1 and sellsignal == 0;

Alert(condition = sellsignal[1] == 1 and sellsignal == 0, text = "Momentum_Up", sound = Sound.Bell, "alert type" = Alert.BAR);


#Chaned from plot Colorbars to def Colorbars
def Colorbars = if buysignal == 1 then 1 else if sellsignal == 1 then 2 else if buysignal == 0 or sellsignal == 0 then 3 else 0;
#___________________________________________________________________________

input method = { default average, high_low };
def bubbleoffset = 0.0005;
def percentamount = .01;
def revAmount = .05;
def atrreversal = 2.0;
def atrlength = 5;
def pricehigh = high;
def pricelow = low;
def averagelength = 5;
#def averagetype = AverageType.EXPONENTIAL;
def mah = MovingAverage(AverageType, pricehigh, averagelength);
def mal = MovingAverage(AverageType, pricelow, averagelength);
def priceh = if method == method.high_low then pricehigh else mah;
def pricel = if method == method.high_low then pricelow else mal;
def EI = ZigZagHighLow("price h" = priceh, "price l" = pricel, "percentage reversal" = percentamount, "absolute reversal" = revAmount, "atr length" = atrlength, "atr reversal" = atrreversal);
def reversalAmount = if (close * percentamount / 100) > Max(revAmount < atrreversal * reference ATR(atrlength), revAmount) then(close * percentamount / 100) else if revAmount < atrreversal * reference ATR(atrlength) then atrreversal * reference ATR(atrlength) else revAmount;
rec EISave = if !IsNaN(EI) then EI else GetValue(EISave, 1);
def chg = (if EISave == priceh then priceh else pricel) - GetValue(EISave, 1);
def isUp = chg >= 0;
rec isConf = AbsValue(chg) >= reversalAmount or(IsNaN(GetValue(EI, 1)) and GetValue(isConf, 1));
def EId = if isUp then 1 else 0;
plot EnhancedLines = if EId <= 1 then EI else Double.NaN;
EnhancedLines.AssignValueColor(if EId == 1 then Color.GREEN else if EId == 0 then Color.RED else Color.DARK_ORANGE);
EnhancedLines.SetStyle(Curve.FIRM);
EnhancedLines.EnableApproximation();
#EnhancedLines.HideBubble();
#Price Change between Enhanceds
def xxhigh = if EISave == priceh then priceh else xxhigh[1];
def chghigh = priceh - xxhigh[1];
def xxlow = if EISave == pricel then pricel else xxlow[1];
def chglow = pricel - xxlow[1];

#Bar Count between Enhanceds
rec EIcount = if EISave[1] != EISave then 1 else if EISave[1] == EISave then EIcount[1] + 1 else 0;
def EIcounthilo = if EIcounthilo[1] == 0 and(EISave == priceh or EISave == pricel) then 1 else if EISave == priceh or EISave == pricel then EIcounthilo[1] + 1 else EIcounthilo[1];
def EIhilo = if EISave == priceh or EISave == pricel then EIcounthilo else EIcounthilo + 1;
def EIcounthigh = if EISave == priceh then EIcount[1] else Double.NaN;
def EIcountlow = if EISave == pricel then EIcount[1] else Double.NaN;
#Arrows
def EIL = if !IsNaN(EI) and!isUp then pricel else GetValue(EIL, 1);
def EIH = if !IsNaN(EI) and isUp then priceh else GetValue(EIH, 1);
def dir = CompoundValue(1, if EIL != EIL[1] or pricel == EIL[1] and pricel == EISave then 1 else if EIH != EIH[1] or priceh == EIH[1] and priceh == EISave then - 1 else dir[1], 0);
def signal = CompoundValue(1, if dir > 0 and pricel > EIL then if signal[1] <= 0 then 1 else signal[1] else if dir < 0 and priceh < EIH then if signal[1] >= 0 then - 1 else signal[1] else signal[1], 0);
def showarrows = yes;
def U1 = showarrows and signal > 0 and signal[1] <= 0;
def D1 = showarrows and signal < 0 and signal[1] >= 0;
def barnumber = BarNumber()[10];

def longCond = (barnumber and U1) and signal > 0 and signal[1] <= 0;
def shortCond = (barnumber and D1) and signal < 0 and signal[1] >= 0;

AddChartBubble(ShowRBubbles and longCond, if isUp then low else high, if showarrows and signal > 0 and signal[1] <= 0 then "Rev:" + low else "", if Colorbars == 3 then Color.PLUM else Color.UPTICK, no);
AddChartBubble(ShowRBubbles and shortCond, if isUp then low else high, if showarrows and signal < 0 and signal[1] >= 0 then "Rev:" + high else "", if Colorbars == 3 then Color.PLUM else Color.DOWNTICK, yes);
#Buy Conditions New Code
def longBars1 = if longCond then 0 else longBars1[1] + 1;
def shortBars1 = if shortCond then 0 else shortBars1[1] + 1;


plot buyCondition = (longCond and longBars <= lookback)
or(LongTrigger and longBars1 <= lookforward);
;
plot sellCondition = (shortCond and shortBars <= lookback)
or(ShortTrigger and shortBars1 <= lookforward);
;
buyCondition.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
sellCondition.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
buyCondition.Hide();
sellCondition.Hide();
#_______________________________________________
#Short Term and Long Term Bearish or Bull trend Direction

input M_AVERAGE1_len = 5; #hint m_average1_len: 8 for Day Trade and 5 for Intraday suggested
input M_AVERAGE2_len = 8; #hint m_average2_len: 13 for Day Trade and 8 for Intraday suggested
input M_AVERAGE3_len = 13; #hint m_average3_len: 21 for Day Trade and 13 for Intraday suggested
input M_AVERAGE4_len = 50;
input M_AVERAGE5_len = 200;
input AverageType_LT_ST_Direction = AverageType.EXPONENTIAL; #hint AverageType: This is for Short and Long Term Direction Setting Above

def M_AVERAGE1 = MovAvgExponential(length = M_AVERAGE1_len);
def M_AVERAGE2 = MovAvgExponential(length = M_AVERAGE2_len);
def M_AVERAGE3 = MovAvgExponential(length = M_AVERAGE3_len);
def M_AVERAGE4 = MovAvgExponential(length = M_AVERAGE4_len);
def M_AVERAGE5 = MovAvgExponential(length = M_AVERAGE5_len);

def bullishStacked = M_AVERAGE1 > M_AVERAGE2 and M_AVERAGE2 > M_AVERAGE3 and M_AVERAGE3 > M_AVERAGE4;
def bearishStacked = M_AVERAGE1 < M_AVERAGE2 and M_AVERAGE2 < M_AVERAGE3 and M_AVERAGE3 < M_AVERAGE4;

AddLabel(yes, if bullishStacked then "ST_Bullish" else if bearishStacked then "ST_Bearish" else "N/A", if bullishStacked then Color.GREEN else if bearishStacked then Color.RED else Color.YELLOW);

#Long Term Bearish or Bull trend Direction

def LT_bullishStacked = M_AVERAGE4 > M_AVERAGE5;
def LT_bearishStacked = M_AVERAGE4 < M_AVERAGE5;

AddLabel(yes, if LT_bullishStacked then "LT_Bullish" else if LT_bearishStacked then "LT_Bearish" else "N/A", if LT_bullishStacked then Color.GREEN else if LT_bearishStacked then Color.RED else Color.YELLOW);

#_______________________________________________

#mADX
#
# Free for use.Header credits must be included when any form of the code included in this package is used.
# User assumes all risk.Author not responsible for errors or use of tool.
# Copyright(c) 2021 B4 Signals
#
# Get support at: https://b4signals.com
# Join us at: https://discord.gg/kD3pKE2CQd
#
#
# v1.0 - chuck - initial integration
# v2.0 - barbaros - cleanup
# v2.1 - barbaros - added adx limit

input ADDON_ADX_show = yes; #hint ADDON_ADX_show: Turn mADX lines ON or OFF
input ADDON_ADX_dmilength = 10;
input ADDON_ADX_limit = 25; #hint ADDON_ADX_limit: 25 for daily and 35 for intraday suggested
input ADDON_ADX_dmiaverageType = AverageType.WILDERS;

def ADDON_ADX_ADX = (DMI(ADDON_ADX_dmilength, ADDON_ADX_dmiaverageType).ADX) - 18;
def ADDON_ADX_signal = ADDON_ADX_ADX > ADDON_ADX_limit and ADDON_ADX_ADX >= 1 and ADDON_ADX_ADX < ADDON_ADX_ADX[1] and ADDON_ADX_ADX[1] > ADDON_ADX_ADX[2];

AddVerticalLine(ADDON_ADX_show and ADDON_ADX_signal, "mADX", Color.WHITE);
Alert(ADDON_ADX_signal, "mADX", Alert.BAR, Sound.Ding);

#Buy Signals
AddOrder(OrderType.BUY_AUTO, buyCondition, open()[-1], quantity, Color.WHITE, Color.WHITE);
AddOrder(OrderType.SELL_AUTO, sellCondition, open()[-1], quantity, Color.WHITE, Color.WHITE);
#####ALERT

Alert(buyCondition, "SUPERTREND_REVERSAL_BUY", Alert.BAR, Sound.Chimes);
Alert(sellCondition, "SUPERTREND_REVERSAL_SELL", Alert.BAR, Sound.Chimes);

Alert(buyCondition, "SUPERTREND_REVERSAL_BUY", Alert.BAR, Sound.Chimes);
Alert(sellCondition, "SUPERTREND_REVERSAL_SELL", Alert.BAR, Sound.Bell);

Alert(signal, "Bollinger Alert", Alert.BAR, Sound.Chimes);
Alert(signal, "Strategy Finished", Alert.BAR, Sound.Chimes);
#END STRATEGY 