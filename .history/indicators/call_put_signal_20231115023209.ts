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

def Momentum_Down = buysignal[1] == 1 and buysignal == 0;

def sell = mov_avg9 < mov_avg14 and mov_avg14 < mov_avg21 and high < mov_avg9;
def stopsell = mov_avg9 >= mov_avg14;
def sellnow = !sell[1] and sell;
def sellsignal = CompoundValue(1, if sellnow and!stopsell then 1 else if sellsignal[1] == 1 and stopsell then 0 else sellsignal[1], 0);

def Sell_Signal = sellsignal[1] == 0 and sellsignal;

def Momentum_Up = sellsignal[1] == 1 and sellsignal == 0;

plot Colorbars = if buysignal == 1 then 1 else if sellsignal == 1 then 2 else if buysignal == 0 or sellsignal == 0 then 3 else 0;
Colorbars.Hide();
Colorbars.DefineColor("Buy_Signal_Bars", Color.GREEN);
Colorbars.DefineColor("Sell_Signal_Bars", Color.RED);
Colorbars.DefineColor("Neutral", Color.PLUM);
#____

input method = { default high_low, average };
def bubbleoffset = .0005;
def percentamount = .01;
def revAmount = .05;
def atrreversal = 2.0;
def atrlength = 5;
def pricehigh = high;
def pricelow = low;
def averagelength = 5;
def averagetype = AverageType.EXPONENTIAL;
def mah = MovingAverage(averagetype, pricehigh, averagelength);
def mal = MovingAverage(averagetype, pricelow, averagelength);
def priceh = if method == method.high_low then pricehigh else mah;
def pricel = if method == method.high_low then pricelow else mal;
def EI = ZigZagHighLow("price h" = priceh, "price l" = pricel, "percentage reversal" = percentamount, "absolute reversal" = revAmount, "atr length" = atrlength, "atr reversal" = atrreversal);
def reversalAmount = if (close * percentamount / 100) > Max(revAmount < atrreversal * reference ATR(atrlength), revAmount) then(close * percentamount / 100) else if revAmount < atrreversal * reference ATR(atrlength) then atrreversal * reference ATR(atrlength) else revAmount;
rec EISave = if !IsNaN(EI) then EI else GetValue(EISave, 1);
def chg = (if EISave == priceh then priceh else pricel) - GetValue(EISave, 1);
def isUp = chg >= 0;
rec isConf = AbsValue(chg) >= reversalAmount or(IsNaN(GetValue(EI, 1)) and GetValue(isConf, 1));
def EId = if isUp then 1 else 0;

#Arrows 
def EIL = if !IsNaN(EI) and!isUp then pricel else GetValue(EIL, 1);
def EIH = if !IsNaN(EI) and isUp then priceh else GetValue(EIH, 1);
def dir = CompoundValue(1, if EIL != EIL[1] or pricel == EIL[1] and pricel == EISave then 1 else if EIH != EIH[1] or priceh == EIH[1] and priceh == EISave then - 1 else dir[1], 0);
def signal = CompoundValue(1, if dir > 0 and pricel > EIL then if signal[1] <= 0 then 1 else signal[1] else if dir < 0 and priceh < EIH then if signal[1] >= 0 then - 1 else signal[1] else signal[1], 0);
def showarrows = yes;
def U1 = showarrows and signal > 0 and signal[1] <= 0;
#U1.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
#U1.SetDefaultColor(Color.GREEN);
#U1.SetLineWeight(4); 
def D1 = showarrows and signal < 0 and signal[1] >= 0;
#D1.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
#D1.SetDefaultColor(Color.RED);
#D1.SetLineWeight(4); 
def barnumber = BarNumber()[10];

AddChartBubble((barnumber and U1), if isUp then low else high, if showarrows and signal > 0 and signal[1] <= 0 then "Call"  else "", if Colorbars == 3 then Color.GRAY else Color.UPTICK, no);
AddChartBubble((barnumber and D1), if isUp then low else high, if showarrows and signal < 0 and signal[1] >= 0 then "Put"  else "", if Colorbars == 3 then Color.GRAY else Color.DOWNTICK, yes);

