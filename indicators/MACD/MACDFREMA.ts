

# MACD with a more Normal Distribution
# Mobius
# V01.09.2015
#Hint: Plots a Gaussian distribution.If Normal Distribution is met, then at minimum, 68.2 % of the close values should be inside a One Standard Deviation Envelope and 95.4 % of the close values should be inside a 2 Standard Deviation Envelope.

# V11.01.2019 - netarchitech added standard TOS Breakout Signals per HighBredCloud request
# V11.01.2019 - netarchitech added Ehlers and Mobius Forward / Reverse EMA per HighBredCloud request

declare lower;

input fastLength = 12;
input slowLength = 26;
input MACDLength = 9;
input showBreakoutSignals = no;

# Four Pole Filter
script g {
    input length = 4;
    input betaDev = 2;
    input price = OHLC4;
    def c;
    def w;
    def beta;
    def alpha;
    def G;
    c = price;
    w = (2 * Double.Pi / length);
    beta = (1 - Cos(w)) / (Power(1.414, 2.0 / betaDev) - 1);
    alpha = (-beta + Sqrt(beta * beta + 2 * beta));
    G = Power(alpha, 4) * c +
        4 * (1 – alpha) * G[1] – 6 * Power(1 - alpha, 2) * G[2] +
            4 * Power(1 - alpha, 3) * G[3] - Power(1 - alpha, 4) * G[4];
    plot Line = G;
}
# Modified MACD
plot Value = g(length = fastLength) - g(length = slowLength);
plot Avg = g(price = Value, length = MACDLength);
plot Diff = Value - Avg;
plot ZeroLine = 0;

Value.SetDefaultColor(GetColor(1));
Value.SetLineWeight(2);
Avg.SetDefaultColor(GetColor(8));
Avg.SetLineWeight(2);
Diff.SetDefaultColor(GetColor(5));
Diff.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Diff.SetLineWeight(3);
Diff.DefineColor("Positive and Up", Color.GREEN);
Diff.DefineColor("Positive and Down", Color.DARK_GREEN);
Diff.DefineColor("Negative and Down", Color.RED);
Diff.DefineColor("Negative and Up", Color.DARK_RED);
Diff.AssignValueColor(if Diff >= 0 then if Diff > Diff[1] then Diff.Color("Positive and Up") else Diff.Color("Positive and Down") else if Diff < Diff[1] then Diff.Color("Negative and Down") else Diff.Color("Negative and Up"));
ZeroLine.SetDefaultColor(GetColor(0));

plot UpSignal1 = if Diff crosses above ZeroLine then ZeroLine else Double.NaN;
plot DownSignal1 = if Diff crosses below ZeroLine then ZeroLine else Double.NaN;

UpSignal1.SetHiding(!showBreakoutSignals);
DownSignal1.SetHiding(!showBreakoutSignals);

UpSignal1.SetDefaultColor(Color.UPTICK);
UpSignal1.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignal1.SetDefaultColor(Color.DOWNTICK);
DownSignal1.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);


# Forward / Reverse EMA
#(c) 2017 John F.Ehlers
# Ported to TOS 07.16.2017
# Mobius

# Inputs:
input AA = .1;

# Vars:
def CC;
def RE1;
def RE2;
def RE3;
def RE4;
def RE5;
def RE6;
def RE7;
def RE8;
def EMA;
plot Signal;
plot plot0;

CC = if CC[1] == 0 then .9 else 1 – AA;
EMA = AA * close + CC * EMA[1];
RE1 = CC * EMA + EMA[1];
RE2 = Power(CC, 2) * RE1 + RE1[1];
RE3 = Power(CC, 4) * RE2 + RE2[1];
RE4 = Power(CC, 8) * RE3 + RE3[1];
RE5 = Power(CC, 16) * RE4 + RE4[1];
RE6 = Power(CC, 32) * RE5 + RE5[1];
RE7 = Power(CC, 64) * RE6 + RE6[1];
RE8 = Power(CC, 128) * RE7 + RE7[1];

Signal = EMA – AA * RE8;
Signal.AssignValueColor(if Signal > Signal[1]
                        then Color.GREEN
                        else Color.RED);
Signal.SetLineWeight(3);
plot0 = if IsNaN(close) then Double.NaN else 0;
plot0.SetDefaultColor(Color.GRAY);

AddCloud(0, Signal, Color.RED, Color.GREEN);


#
# TD Ameritrade IP Company, Inc. (c) 2007 - 2019
# Tweaked by[USER = 212]@korygill[/USER]
# https://usethinkscript.com/d/185-moving-average-crossover-rsi-indicator-for-thinkorswim


    input length = 14;
    input over_Bought = 70;
    input over_Sold = 30;
    input price = close;
    input averageType = AverageType.WILDERS;
    #input showBreakoutSignals = no;
    input rsiMALength = 5; #hint rsiMALength: RSI Moving Average Length
input rsiAverageType = AverageType.SIMPLE;

    def NetChgAvg = MovingAverage(averageType, price - price[1], length);
    def TotChgAvg = MovingAverage(averageType, AbsValue(price - price[1]), length);
    def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;

plot RSI = 50 * (ChgRatio + 1);
plot OverSold = over_Sold;
plot OverBought = over_Bought;
plot UpSignal = if RSI crosses above OverSold then OverSold else Double.NaN;
plot DownSignal = if RSI crosses below OverBought then OverBought else Double.NaN;

# plot the RSI Moving Average
def rsiMA = MovingAverage(rsiAverageType, RSI, rsiMALength);
plot prsiMA = rsiMA;

UpSignal.SetHiding(!showBreakoutSignals);
DownSignal.SetHiding(!showBreakoutSignals);

RSI.DefineColor("OverBought", GetColor(5));
RSI.DefineColor("Normal", GetColor(7));
RSI.DefineColor("OverSold", GetColor(1));
RSI.AssignValueColor(if RSI > over_Bought then RSI.Color("OverBought") else if RSI < over_Sold then RSI.Color("OverSold") else RSI.Color("Normal"));
OverSold.SetDefaultColor(GetColor(8));
OverBought.SetDefaultColor(GetColor(8));
UpSignal.SetDefaultColor(Color.UPTICK);
UpSignal.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignal.SetDefaultColor(Color.DOWNTICK);
DownSignal.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);