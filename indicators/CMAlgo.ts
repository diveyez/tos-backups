#// THIS COPYRIGHT MEANS THAT YOU ARE NOT ALLOWED TO TAKE THIS CODE AND SELL IT UNDER ANY CIRCUMSTANCES.
#// YOU ARE ALLOWED TO EDIT THE CODE AS MUCH AS YOU WANT FOR PERSONAL USE, BUT IF YOU DECIDE TO PUBLISH YOUR ALTERED VERSION YOU MUST GIVE ME CREDIT.
#// IF YOU DO PUBLISH AN EDITED VERSION, YOU MUST USE THE SAME COPYRIGHT AS WELL.
#// NO MATTER HOW MUCH YOU ALTER THE CODE, YOU STILL CANNOT SELL IT UNDER THE RULES OF THIS COPYRIGHT.
# https://www.tradingview.com/v/rGeVujek/
#// © HomelessLemon
#study("?? TV Community Algo ??", overlay = true)
# Converted by Sam4Cok @Samer800         - 03 / 2023 - Not Typical
input PivotsLookback = 20;    #(defval = 50, title = 'Lookback Range', minval = 5)
input voidLines = yes;         #(true, "Void Lines On / Off")
input colorBar = yes;          #(true, "Signal Bars On / Off")
input ShowSupportAndResistanceLines = no;     #(false, "Support & Resistance Lines On / Off")
input emaLines = no;           #(false, "EMA (8, 200) On / Off")
input ShowSignals = yes;       #(true, "Buy & Sell Signals On / Off")
input FibonacciLines = no;     #(false, "Fibonacci Retracement On / Off")
input threshold_multiplier = 3;#, "Fibonacci Deviation")

def na = Double.NaN;
def srLines = ShowSupportAndResistanceLines;
def bsSignals = ShowSignals;
def afibOn = FibonacciLines;
script nz {
    input data = close;
    input repl = 0;
    def ret_val = if !isNaN(data) then data else repl;
    plot return = ret_val;
}
#//Calculates Volatility for Dashboard
def nATR = atr(LENGTH = 14);
def stdAtr = 2 * stdev(nATR, 20);
def smaAtr = SimpleMovingAvg(nATR, 20);
def topAtrDev = smaAtr + stdAtr;
def bottomAtrDev = smaAtr - stdAtr;
def calcDev = (nATR - bottomAtrDev) / (topAtrDev - bottomAtrDev);
def percentVol = (40 * calcDev + 30);

#//Calculates Volume for Dashboard
def volumeDash = volume;

#//RSI for Dashboard
def rsiDash = rsi(PRICE = close, LENGTH = 14);

#//Calculates Sentiment for Dashboard
def ema9 = ExpAverage(close, 9);
def totalSentTxt = if ema9 > ema9[2] then 1 else
if ema9 < ema9[2] then - 1 else 0;

#-- - RED
DefineGlobalColor("Red1", CreateColor(255, 0, 0));#1
DefineGlobalColor("Red2", CreateColor(216, 0, 0));#2
DefineGlobalColor("Red3", CreateColor(177, 0, 0));#3
DefineGlobalColor("Red4", CreateColor(137, 0, 0));#4
DefineGlobalColor("Red5", CreateColor(98, 0, 0));#5
#-- - Orange
DefineGlobalColor("Orange1", CreateColor(255, 165, 0));#11
DefineGlobalColor("Orange2", CreateColor(216, 140, 0));#22
DefineGlobalColor("Orange3", CreateColor(177, 114, 0));#33
DefineGlobalColor("Orange4", CreateColor(137, 89, 0));#44
DefineGlobalColor("Orange5", CreateColor(98, 63, 0));#55
#----Yellow
DefineGlobalColor("Yellow1", CreateColor(255, 255, 0));#111
DefineGlobalColor("Yellow2", CreateColor(216, 216, 0));#222
DefineGlobalColor("Yellow3", CreateColor(177, 177, 0));#333
DefineGlobalColor("Yellow4", CreateColor(137, 137, 0));#444
DefineGlobalColor("Yellow5", CreateColor(98, 98, 0));#555
#----Green
DefineGlobalColor("Green1", CreateColor(0, 255, 0));#1111
DefineGlobalColor("Green2", CreateColor(0, 216, 0));#2222
DefineGlobalColor("Green3", CreateColor(0, 177, 0));#3333
DefineGlobalColor("Green4", CreateColor(0, 137, 0));#4444
DefineGlobalColor("Green5", CreateColor(0, 98, 0));#5555
#-- - BLUE
DefineGlobalColor("Blue1", CreateColor(29, 100, 217));#61
DefineGlobalColor("Blue2", CreateColor(24, 84, 182));#62
DefineGlobalColor("Blue3", CreateColor(20, 68, 148));#63
DefineGlobalColor("Blue4", CreateColor(15, 52, 113));#64
DefineGlobalColor("Blue5", CreateColor(11, 36, 79));#65
#-- - Indigo
DefineGlobalColor("Indigo1", CreateColor(142, 0, 248));#611
DefineGlobalColor("Indigo2", CreateColor(120, 0, 209));#622
DefineGlobalColor("Indigo3", CreateColor(97, 0, 170));#633
DefineGlobalColor("Indigo4", CreateColor(75, 0, 130));#644
DefineGlobalColor("Indigo5", CreateColor(52, 0, 91));#655
#-- - Purple
DefineGlobalColor("Purple1", CreateColor(246, 0, 246));#6111
DefineGlobalColor("Purple2", CreateColor(207, 0, 207));#6222
DefineGlobalColor("Purple3", CreateColor(168, 0, 168));#6333
DefineGlobalColor("Purple4", CreateColor(128, 0, 128));#6444
DefineGlobalColor("Purple5", CreateColor(89, 0, 89));#6555


def k;
def kk;
def c;
k = if kk[1] then kk[1] else 1;

#//This Code Loops Through 63 Shades of 7 Colors//

if k == 1 {
    c = 5;
} else if k == 2 {
    c = 4;
} else if k == 3 {
    c = 3;
} else if k == 4 {
    c = 2;
} else if k == 5 {
    c = 1;
} else if k == 6 {
    c = 2;
} else if k == 7 {
    c = 3;
} else if k == 8 {
    c = 4;
} else if k == 9 {
    c = 5;
} else if k == 10 {
    c = 55;
} else if k == 11 {
    c = 44;
} else if k == 12 {
    c = 33;
} else if k == 13 {
    c = 22;
} else if k == 14 {
    c = 11;
} else if k == 15 {
    c = 22;
} else if k == 16 {
    c = 33;
} else if k == 17 {
    c = 44;
} else if k == 18 {
    c = 55;
} else if k == 19 {
    c = 555;
} else if k == 20 {
    c = 444;
} else if k == 21 {
    c = 333;
} else if k == 22 {
    c = 222;
} else if k == 23 {
    c = 111;
} else if k == 24 {
    c = 222;
} else if k == 25 {
    c = 333;
} else if k == 26 {
    c = 444;
} else if k == 27 {
    c = 555;
} else if k == 28 {
    c = 5555;
} else if k == 29 {
    c = 4444;
} else if k == 30 {
    c = 3333;
} else if k == 31 {
    c = 2222;
} else if k == 32 {
    c = 1111;
} else if k == 33 {
    c = 2222;
} else if k == 34 {
    c = 3333;
} else if k == 35 {
    c = 4444;
} else if k == 36 {
    c = 5555;
} else if k == 37 {
    c = 65;
} else if k == 38 {
    c = 64;
} else if k == 39 {
    c = 63;
} else if k == 40 {
    c = 62;
} else if k == 41 {
    c = 61;
} else if k == 42 {
    c = 62;
} else if k == 43 {
    c = 63;
} else if k == 44 {
    c = 64;
} else if k == 45 {
    c = 65;
} else if k == 46 {
    c = 655;
} else if k == 47 {
    c = 644;
} else if k == 48 {
    c = 633;
} else if k == 49 {
    c = 622;
} else if k == 50 {
    c = 611;
} else if k == 51 {
    c = 622;
} else if k == 52 {
    c = 633;
} else if k == 53 {
    c = 644;
} else if k == 54 {
    c = 655;
} else if k == 55 {
    c = 6555;
} else if k == 56 {
    c = 6444;
} else if k == 57 {
    c = 6333;
} else if k == 58 {
    c = 6222;
} else if k == 59 {
    c = 6111;
} else if k == 60 {
    c = 6222;
} else if k == 61 {
    c = 6333;
} else if k == 62 {
    c = 6444;
} else if k == 63 {
    c = 6555;
} else {
    c = c[1];
}

if k + 1 > 63 or k == 0 {
    kk = 1;
} else {
    kk = k + 1;
}
#//Defines Variables Used in Void Lines
def basis = SimpleMovingAvg(close, 20);
def twoDev = 2 * stdev(close, 20);
def upper3 = basis + twoDev;
def lower3 = basis - twoDev;
def threeDev = 3 * stdev(close, 20);
def upper4 = basis + threeDev;
def lower4 = basis - threeDev;

#//Plots Void Lines
plot BasisLine = if voidLines then basis else na;#, "Basis", color.purple, editable = false)
BasisLine.AssignValueColor(if c == 1 then GlobalColor("Red1") else
if c == 2 then GlobalColor("Red2") else
if c == 3 then GlobalColor("Red3") else
if c == 4 then GlobalColor("Red4") else
if c == 5 then GlobalColor("Red5") else
if c == 11 then GlobalColor("Orange1") else
if c == 22 then GlobalColor("Orange2") else
if c == 33 then GlobalColor("Orange3") else
if c == 44 then GlobalColor("Orange4") else
if c == 55 then GlobalColor("Orange5") else
if c == 111 then GlobalColor("Yellow1") else
if c == 222 then GlobalColor("Yellow2") else
if c == 333 then GlobalColor("Yellow3") else
if c == 444 then GlobalColor("Yellow4") else
if c == 555 then GlobalColor("Yellow5") else
if c == 1111 then GlobalColor("Green1") else
if c == 2222 then GlobalColor("Green2") else
if c == 3333 then GlobalColor("Green3") else
if c == 4444 then GlobalColor("Green4") else
if c == 5555 then GlobalColor("Green5") else
if c == 61 then GlobalColor("Blue1") else
if c == 62 then GlobalColor("Blue2") else
if c == 63 then GlobalColor("Blue3") else
if c == 64 then GlobalColor("Blue4") else
if c == 65 then GlobalColor("Blue5") else
if c == 611 then GlobalColor("Indigo1") else
if c == 622 then GlobalColor("Indigo2") else
if c == 633 then GlobalColor("Indigo3") else
if c == 644 then GlobalColor("Indigo4") else
if c == 655 then GlobalColor("Indigo5") else
if c == 6111 then GlobalColor("Purple1") else
if c == 6222 then GlobalColor("Purple2") else
if c == 6333 then GlobalColor("Purple3") else
if c == 6444 then GlobalColor("Purple4") else
if c == 6555 then GlobalColor("Purple5") else Color.GRAY);
plot p5 = if voidLines then upper3 else na;#, "Upper 200%", c, editable = false)
p5.AssignValueColor(if c == 1 then GlobalColor("Red1") else
if c == 2 then GlobalColor("Red2") else
if c == 3 then GlobalColor("Red3") else
if c == 4 then GlobalColor("Red4") else
if c == 5 then GlobalColor("Red5") else
if c == 11 then GlobalColor("Orange1") else
if c == 22 then GlobalColor("Orange2") else
if c == 33 then GlobalColor("Orange3") else
if c == 44 then GlobalColor("Orange4") else
if c == 55 then GlobalColor("Orange5") else
if c == 111 then GlobalColor("Yellow1") else
if c == 222 then GlobalColor("Yellow2") else
if c == 333 then GlobalColor("Yellow3") else
if c == 444 then GlobalColor("Yellow4") else
if c == 555 then GlobalColor("Yellow5") else
if c == 1111 then GlobalColor("Green1") else
if c == 2222 then GlobalColor("Green2") else
if c == 3333 then GlobalColor("Green3") else
if c == 4444 then GlobalColor("Green4") else
if c == 5555 then GlobalColor("Green5") else
if c == 61 then GlobalColor("Blue1") else
if c == 62 then GlobalColor("Blue2") else
if c == 63 then GlobalColor("Blue3") else
if c == 64 then GlobalColor("Blue4") else
if c == 65 then GlobalColor("Blue5") else
if c == 611 then GlobalColor("Indigo1") else
if c == 622 then GlobalColor("Indigo2") else
if c == 633 then GlobalColor("Indigo3") else
if c == 644 then GlobalColor("Indigo4") else
if c == 655 then GlobalColor("Indigo5") else
if c == 6111 then GlobalColor("Purple1") else
if c == 6222 then GlobalColor("Purple2") else
if c == 6333 then GlobalColor("Purple3") else
if c == 6444 then GlobalColor("Purple4") else
if c == 6555 then GlobalColor("Purple5") else Color.GRAY);
plot p6 = if voidLines then lower3 else na;#, "Lower 200%", c, editable = false)
p6.AssignValueColor(if c == 1 then GlobalColor("Red1") else
if c == 2 then GlobalColor("Red2") else
if c == 3 then GlobalColor("Red3") else
if c == 4 then GlobalColor("Red4") else
if c == 5 then GlobalColor("Red5") else
if c == 11 then GlobalColor("Orange1") else
if c == 22 then GlobalColor("Orange2") else
if c == 33 then GlobalColor("Orange3") else
if c == 44 then GlobalColor("Orange4") else
if c == 55 then GlobalColor("Orange5") else
if c == 111 then GlobalColor("Yellow1") else
if c == 222 then GlobalColor("Yellow2") else
if c == 333 then GlobalColor("Yellow3") else
if c == 444 then GlobalColor("Yellow4") else
if c == 555 then GlobalColor("Yellow5") else
if c == 1111 then GlobalColor("Green1") else
if c == 2222 then GlobalColor("Green2") else
if c == 3333 then GlobalColor("Green3") else
if c == 4444 then GlobalColor("Green4") else
if c == 5555 then GlobalColor("Green5") else
if c == 61 then GlobalColor("Blue1") else
if c == 62 then GlobalColor("Blue2") else
if c == 63 then GlobalColor("Blue3") else
if c == 64 then GlobalColor("Blue4") else
if c == 65 then GlobalColor("Blue5") else
if c == 611 then GlobalColor("Indigo1") else
if c == 622 then GlobalColor("Indigo2") else
if c == 633 then GlobalColor("Indigo3") else
if c == 644 then GlobalColor("Indigo4") else
if c == 655 then GlobalColor("Indigo5") else
if c == 6111 then GlobalColor("Purple1") else
if c == 6222 then GlobalColor("Purple2") else
if c == 6333 then GlobalColor("Purple3") else
if c == 6444 then GlobalColor("Purple4") else
if c == 6555 then GlobalColor("Purple5") else Color.GRAY);
plot p7 = if voidLines then upper4 else na;#, "Upper 300%", c, editable = false)
p7.AssignValueColor(if c == 1 then GlobalColor("Red1") else
if c == 2 then GlobalColor("Red2") else
if c == 3 then GlobalColor("Red3") else
if c == 4 then GlobalColor("Red4") else
if c == 5 then GlobalColor("Red5") else
if c == 11 then GlobalColor("Orange1") else
if c == 22 then GlobalColor("Orange2") else
if c == 33 then GlobalColor("Orange3") else
if c == 44 then GlobalColor("Orange4") else
if c == 55 then GlobalColor("Orange5") else
if c == 111 then GlobalColor("Yellow1") else
if c == 222 then GlobalColor("Yellow2") else
if c == 333 then GlobalColor("Yellow3") else
if c == 444 then GlobalColor("Yellow4") else
if c == 555 then GlobalColor("Yellow5") else
if c == 1111 then GlobalColor("Green1") else
if c == 2222 then GlobalColor("Green2") else
if c == 3333 then GlobalColor("Green3") else
if c == 4444 then GlobalColor("Green4") else
if c == 5555 then GlobalColor("Green5") else
if c == 61 then GlobalColor("Blue1") else
if c == 62 then GlobalColor("Blue2") else
if c == 63 then GlobalColor("Blue3") else
if c == 64 then GlobalColor("Blue4") else
if c == 65 then GlobalColor("Blue5") else
if c == 611 then GlobalColor("Indigo1") else
if c == 622 then GlobalColor("Indigo2") else
if c == 633 then GlobalColor("Indigo3") else
if c == 644 then GlobalColor("Indigo4") else
if c == 655 then GlobalColor("Indigo5") else
if c == 6111 then GlobalColor("Purple1") else
if c == 6222 then GlobalColor("Purple2") else
if c == 6333 then GlobalColor("Purple3") else
if c == 6444 then GlobalColor("Purple4") else
if c == 6555 then GlobalColor("Purple5") else Color.GRAY);
plot p8 = if voidLines then lower4 else na;#, "Lower 300%", c, editable = false)
p8.AssignValueColor(if c == 1 then GlobalColor("Red1") else
if c == 2 then GlobalColor("Red2") else
if c == 3 then GlobalColor("Red3") else
if c == 4 then GlobalColor("Red4") else
if c == 5 then GlobalColor("Red5") else
if c == 11 then GlobalColor("Orange1") else
if c == 22 then GlobalColor("Orange2") else
if c == 33 then GlobalColor("Orange3") else
if c == 44 then GlobalColor("Orange4") else
if c == 55 then GlobalColor("Orange5") else
if c == 111 then GlobalColor("Yellow1") else
if c == 222 then GlobalColor("Yellow2") else
if c == 333 then GlobalColor("Yellow3") else
if c == 444 then GlobalColor("Yellow4") else
if c == 555 then GlobalColor("Yellow5") else
if c == 1111 then GlobalColor("Green1") else
if c == 2222 then GlobalColor("Green2") else
if c == 3333 then GlobalColor("Green3") else
if c == 4444 then GlobalColor("Green4") else
if c == 5555 then GlobalColor("Green5") else
if c == 61 then GlobalColor("Blue1") else
if c == 62 then GlobalColor("Blue2") else
if c == 63 then GlobalColor("Blue3") else
if c == 64 then GlobalColor("Blue4") else
if c == 65 then GlobalColor("Blue5") else
if c == 611 then GlobalColor("Indigo1") else
if c == 622 then GlobalColor("Indigo2") else
if c == 633 then GlobalColor("Indigo3") else
if c == 644 then GlobalColor("Indigo4") else
if c == 655 then GlobalColor("Indigo5") else
if c == 6111 then GlobalColor("Purple1") else
if c == 6222 then GlobalColor("Purple2") else
if c == 6333 then GlobalColor("Purple3") else
if c == 6444 then GlobalColor("Purple4") else
if c == 6555 then GlobalColor("Purple5") else Color.GRAY);
AddCloud(p7, p5, CreateColor(0, 137, 123));
AddCloud(p6, p8, CreateColor(156, 39, 176));

#//Defines Rules for Coloring Bars
def colorBars = if close > basis then 1 else if close < basis then - 1 else 0;

#//Defines EMA Variables
def ema8 = ExpAverage(close, 8);
def ema200 = ExpAverage(close, 200);

#//Colors Bars
AssignPriceColor(if !colorBar then Color.CURRENT else
if colorBars > 0 then CreateColor(0, 137, 123) else
if colorBars < 0 then CreateColor(156, 39, 176) else Color.GRAY);

#//Plots EMA Lines
plot ema8Line = if emaLines then ema8 else na;#, "EMA 8", color.white, 2)
plot ema200Line = if emaLines then ema200 else na;#, "EMA 200", color.green, 2)

#//WaveTrend for Signals
def n1 = 14; def n2 = 21; def ap = hlc3;
def esa = ExpAverage(ap, n1);
def d = ExpAverage(AbsValue(ap - esa), n1);
def ci = (ap - esa) / (0.015 * d);
def tci = ExpAverage(ci, n2);
def wt1 = tci;
def wt2 = SimpleMovingAvg(wt1, 14);

#// Defines Variables for Avoiding Duplicate Signals
def sell;# = false
def buy;# = false
def wtCrsossUp = if wt1 > wt2 then wtCrsossUp[1] + 1 else 0;
def wtCrsossDn = if wt1 < wt2 then wtCrsossDn[1] + 1 else 0;
#// Defines Trade Signals
def buySignal = !sell[1] and wtCrsossUp == 1;#(wt1 crosses above wt2);
def sellSignal = !buy[1]  and wtCrsossDn == 1;#(wt1 crosses below wt2);

if buySignal {
    sell = yes;
    buy = no;
} else
    if sellSignal {
        sell = no;
        buy = yes;
    } else {
        sell = no; #sell[1];
        buy = no; #buy[1];
    }
#// Plots Signals to Chart
AddChartBubble(bsSignals and buySignal, low, "Buy", Color.GREEN, no);
AddChartBubble(bsSignals and sellSignal, high, "Sell", Color.RED, yes);

#barssince(Condition) =>
script barssince {
    input Condition = 0;
    def barssince = if Condition then 1 else barssince[1] + 1;
    plot return = barssince;
}

#calc_dev(base_price, price) =>
Script calc_dev {
input base_price = close;
input price = close;
    def dev = 100 * (price - base_price) / price;
    plot out = dev;
}
#pivots(src, length, isHigh) =>
Script pivots {
input src = close;
input length = 10;
input isHigh = yes;
    def l2 = length * 2;
    def c2 = nz(GetValue(src, length));
    def ok;# = true
    def index; def pivot;
    def bar = CompoundValue(1, barNumber(), 0);
    ok = fold i = 0 to l2 with p = yes do
        if isHigh and src[i] > c2 then no else
    if !isHigh and src[i] < c2 then no else p;
    if ok {
        index = bar[length];
        pivot = c2;
    } else {
        index = Double.NaN;
        pivot = Double.NaN;
    }
    plot pvt = pivot[-length];
 #   plot ind = index[-length];
}
def ph = pivots(high, PivotsLookback, yes);
def pl = pivots(low, PivotsLookback, no);

#// Auto Fibonacci Code
def dev_threshold = atr(LEngth = 10) / close * 100 * threshold_multiplier;
#// Formulate Array Structure and Pivot Conditions

def levelsArr0 = 0;
def levelsArr1 = 0.236;
def levelsArr2 = 0.382;
def levelsArr3 = 0.5;
def levelsArr4 = 0.618;
def levelsArr5 = 0.786;
def levelsArr6 = 1.0;

#calcFib(bool bearish, float lo, float hi, float perc) =>
script calcFib {
    input bearish = yes;
    input lo = low;
    input hi = high;
    input perc = close;
    def calcFib;# = na
    if !isNaN(bearish) or!bearish {
        calcFib = lo - ((lo - hi) * perc);
    } else {
        calcFib = hi - ((hi - lo) * perc);
    }
    plot result = calcFib;
}
def plValue = if !isNaN(pl) then pl else plValue[1]; #valuewhen(!IsNaN(pl), low, 0);
def phValue = if !isNaN(ph) then ph else phValue[1]; #valuewhen(!IsNaN(ph), high, 0);

def plSince = barssince(!IsNaN(pl));
def phSince = barssince(!IsNaN(ph));
def plSin = plSince + PivotsLookback;
def phSin = phSince + PivotsLookback;

def getLow;
def getHigh;
getLow = fold i = 0 to plSince + 1 with p = nz(GetValue(plValue, plSince), low) do
    if p < GetValue(low, i) then p else GetValue(low, i);

getHigh = fold j = 0 to phSince + 1 with q = nz(GetValue(phValue, phSince), high) do
    if q > GetValue(high, j) then q else GetValue(high, j);

def isBearish;# = na
if  !IsNaN(ph) and afibOn {
    isBearish = yes;
} else
if !IsNaN(pl) and afibOn{
    isBearish = no;
} else
if  getLow[1] < plValue and afibOn {
    isBearish = yes;
} else
if  getHigh[1] > phValue and afibOn {
    isBearish = no;
} else {
    isBearish = if afibOn then isBearish[1] else na;
}
def fib0 = calcFib(isBearish, getLow, getHigh, levelsArr0);
def fib1 = calcFib(isBearish, getLow, getHigh, levelsArr1);
def fib2 = calcFib(isBearish, getLow, getHigh, levelsArr2);
def fib3 = calcFib(isBearish, getLow, getHigh, levelsArr3);
def fib4 = calcFib(isBearish, getLow, getHigh, levelsArr4);
def fib5 = calcFib(isBearish, getLow, getHigh, levelsArr5);
def fib6 = calcFib(isBearish, getLow, getHigh, levelsArr6);
def devPl = AbsValue(calc_dev(fib6, plValue));
def devPh = AbsValue(calc_dev(fib6, phValue));

plot fibState = if fib0 != fib0[1] then na else
if (if isBearish and devPl > dev_threshold then!isNaN(GetValue(fib0, -plSin)) else
if devPh > dev_threshold then!isNaN(GetValue(fib0, -phSin)) else na) then na else fib0;
fibState.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
fibState.AssignValueColor(if isBearish then Color.DARK_RED else Color.DARK_GREEN);

plot fibState1 = if fib1 != fib1[1] then na else
if (if isBearish and devPl > dev_threshold then!isNaN(GetValue(fib1, -plSin)) else
if devPh > dev_threshold then!isNaN(GetValue(fib1, -phSin)) else na) then na else fib1;
fibState1.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
fibState1.AssignValueColor(if isBearish then Color.DARK_RED else Color.DARK_GREEN);

plot fibState2 = if fib2 != fib2[1] then na else
if (if isBearish and devPl > dev_threshold then!isNaN(GetValue(fib2, -plSin)) else
if devPh > dev_threshold then!isNaN(GetValue(fib2, -phSin)) else na) then na else fib2;
fibState2.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
fibState2.AssignValueColor(if isBearish then Color.DARK_RED else Color.DARK_GREEN);

plot fibState3 = if fib3 != fib3[1] then na else
if (if isBearish and devPl > dev_threshold then!isNaN(GetValue(fib3, -plSin)) else
if devPh > dev_threshold then!isNaN(GetValue(fib3, -phSin)) else na) then na else fib3;
fibState3.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
fibState3.AssignValueColor(if isBearish then Color.DARK_RED else Color.DARK_GREEN);

plot fibState4 = if fib4 != fib4[1] then na else
if (if isBearish and devPl > dev_threshold then!isNaN(GetValue(fib4, -plSin)) else
if devPh > dev_threshold then!isNaN(GetValue(fib4, -phSin)) else na) then na else fib4;
fibState4.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
fibState4.AssignValueColor(if isBearish then Color.DARK_RED else Color.DARK_GREEN);

plot fibState5 = if fib5 != fib5[1] then na else
if (if isBearish and devPl > dev_threshold then!isNaN(GetValue(fib5, -plSin)) else
if devPh > dev_threshold then!isNaN(GetValue(fib5, -phSin)) else na) then na else fib5;
fibState5.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
fibState5.AssignValueColor(if isBearish then Color.DARK_RED else Color.DARK_GREEN);

plot fibState6 = if fib6 != fib6[1] then na else
if (if isBearish and devPl > dev_threshold then!isNaN(GetValue(fib6, -plSin)) else
if devPh > dev_threshold then!isNaN(GetValue(fib6, -phSin)) else na) then na else
if isBearish then getLow else getHigh;
fibState6.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
fibState6.AssignValueColor(if isBearish then Color.DARK_RED else Color.DARK_GREEN);

#//Support / Resistance Lines
def h1000 = CompoundValue(1,if high == highest(high[1], 1000) then high[1] else h1000[1], high[1]);
def h750 = CompoundValue(1, if high == highest(high[1], 750) then high[1] else h750[1], high[1]);
def h500 = CompoundValue(1,if high == highest(high[1], 500) then high[1] else h500[1], high[1]);
def h250 = CompoundValue(1, if high == highest(high[1], 250) then high[1] else h250[1], high[1]);
def h100 = CompoundValue(1, if high == highest(high[1], 100) then high[1] else h100[1], high[1]);
def h50 = CompoundValue(1, if high == highest(high[1], 50) then high[1] else h50[1], high[1]);
def h10 = CompoundValue(1, if high == highest(high[1], 10) then high[1] else h10[1], high);

plot R1 = if srLines then h1000 else na;
plot R2 = if srLines then h750 else na;
plot R3 = if srLines then h500 else na;
plot R4 = if srLines then h250 else na;
plot R5 = if srLines then h100 else na;
plot R6 = if srLines then h50 else na;
plot R7 = if srLines then h10 else na;

R1.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
R2.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
R3.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
R4.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
R5.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
R6.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
R7.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
R1.AssignValueColor( if close > h1000 then color.GREEN else Color.RED);
R2.AssignValueColor( if close > h750 then color.GREEN else Color.RED);
R3.AssignValueColor( if close > h500 then color.GREEN else Color.RED);
R4.AssignValueColor( if close > h250 then color.GREEN else Color.RED);
R5.AssignValueColor( if close > h100 then color.GREEN else Color.RED);
R6.AssignValueColor( if close > h50 then color.GREEN else Color.RED);
R7.AssignValueColor( if close > h10 then color.GREEN else Color.RED);

def l1000 = CompoundValue(1,if low == lowest(low[1], 1000) then low else l1000[1], low);
def l750 = CompoundValue(1, if low == lowest(low[1], 750) then low else l750[1], low);
def l500 = CompoundValue(1,if low == lowest(low[1], 500) then low else l500[1], low);
def l250 = CompoundValue(1, if low == lowest(low[1], 250) then low else l250[1], low);
def l100 = CompoundValue(1, if low == lowest(low[1], 100) then low else l100[1], low);
def l50 = CompoundValue(1, if low == lowest(low[1], 50) then low else l50[1], low);
def l10 = CompoundValue(1, if low == lowest(low[1], 10) then low else l10[1], low);

plot S1 = if srLines then L1000 else na;
plot S2 = if srLines then L750 else na;
plot S3 = if srLines then L500 else na;
plot S4 = if srLines then L250 else na;
plot S5 = if srLines then L100 else na;
plot S6 = if srLines then L50 else na;
plot S7 = if srLines then L10 else na;

S1.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
S2.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
S3.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
S4.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
S5.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
S6.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
S7.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
S1.AssignValueColor( if close > L1000 then color.GREEN else Color.RED);
S2.AssignValueColor( if close > L750 then color.GREEN else Color.RED);
S3.AssignValueColor( if close > L500 then color.GREEN else Color.RED);
S4.AssignValueColor( if close > L250 then color.GREEN else Color.RED);
S5.AssignValueColor( if close > L100 then color.GREEN else Color.RED);
S6.AssignValueColor( if close > L50 then color.GREEN else Color.RED);
S7.AssignValueColor( if close > L10 then color.GREEN else Color.RED);


#-- - END CODE