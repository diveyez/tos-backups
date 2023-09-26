#// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
#// Multi-timeframe Strategy based on Logistic Regression algorithm
#// https://www.tradingview.com/v/49YIV1jW/
#// © capissimo
#study('Machine Learning: Logistic Regression (v.3)
# Converted and mod by Sam4Cok@Samer800 - 04 / 2023
#//-------------------- Inputs
input show_label = yes;            # 'Show Info?'
input ShowExitLongShort = no;
input priceType = { "Open", "High", "Low", default "Close", "HL2", "OC2", "OHL3", "HLC3", "OHLC4"};    # 'Price Type'
input useChartTimeframe = yes;
input Resolution = AggregationPeriod.FIFTEEN_MIN;    # 'Resolution'
input lookback = 3;                                # 'Lookback Window Size |2..n| (2)'
input NormalizationLookback = 2;                     # 'Normalization Lookback |2..240| (120)'
input LearningRate = 0.0009;                    # 'Learning Rate |0.0001..0.01|'
input TrainingIterations = 500;                     # 'Training Iterations |50..20000|'
input FilterSignalsBy = { Volatility, Volume, default Kernel, Regime, ADX, All, None };    # 'Filter Signals by'
input ShowLossAndPredictionCurves = no;          # 'Show Loss & Prediction Curves?'
input OptionalCalculation = yes;                    # 'Optional Calculation?'
input UsePriceDataForSignalGeneration = yes;       # 'Use Price Data for Signal Generation?'
input HoldingPeriod = 5;                            # 'Holding Period |1..n|'
input showKernelEstimate = yes;
input useKernelSmoothing = no;
input KernelLookback = 8;             # 'Lookback Window' Recommended range: 3 - 50'
input RelativeWeighting = 8.0;        # 'Relative Weighting', Recommended range: 0.25 - 25'
input RegressionLevel = 25;#,
    input lag = 2;                        # "Lag", Recommended range: 1 - 2"
#input lot_size = { default "0.01", "0.1", "0.2", "0.3", "0.5", "1", "2", "3", "5", "10", "20", "30", "50", "100", "1000"};

#//-------------------- System Variables
def na = Double.NaN;
def nlbk = NormalizationLookback;
def lrate = LearningRate;
def iterations = TrainingIterations;
def curves = ShowLossAndPredictionCurves;
def easteregg = OptionalCalculation;
def useprice = UsePriceDataForSignalGeneration;
def current = GetAggregationPeriod();
def tf = if useChartTimeframe then current else Resolution;
def time = GetTime();
def ishistory = !IsNaN(close[1]) and!IsNaN(close);
def open_ = open(Period = tf);
def high_ = high(Period = tf);
def low_ = low(Period = tf);
def close_ = close(Period = tf);
def volume_ = volume(Period = tf);
def ohlc = ohlc4(Period = tf);

#-- Color
DefineGlobalColor("blue", CreateColor(0, 128, 255));
DefineGlobalColor("Red", CreateColor(255, 0, 128));
DefineGlobalColor("dblue", CreateColor(0, 90, 179));
DefineGlobalColor("dred", CreateColor(179, 0, 90));
DefineGlobalColor("c_green", CreateColor(0, 153, 136));
DefineGlobalColor("c_red", CreateColor(204, 51, 17));

#//-------------------- Custom Functions
# / # @regime_filter
#export regime_filter(series float src = ohlc4, float threshold, bool useRegimeFilter) =>
    def threshold = -1;
    def value1;
    def value2;
    def klmf;
value1 = CompoundValue(1, 0.2 * (ohlc - ohlc[1]) + 0.8 * value1[1], 0.2 * (ohlc - ohlc[1]));
value2 = CompoundValue(1, 0.1 * (high_ - low_) + 0.8 * value2[1], 0.1 * (high_ - low_));
    def omega = AbsValue(value1 / value2);
    def alpha = (-power(omega, 2) + sqrt(power(omega, 4) + 16 * power(omega, 2))) / 8;
klmf = CompoundValue(1, alpha * ohlc + (1 - alpha) * klmf[1], alpha * ohlc);
    def absCurveSlope = AbsValue(klmf - klmf[1]);
    def exponentialAverageAbsCurveSlope = 1.0 * ExpAverage(absCurveSlope, 200);
    def normalized_slope_decline = (absCurveSlope - exponentialAverageAbsCurveSlope) / exponentialAverageAbsCurveSlope;
    def regime_filter = normalized_slope_decline >= threshold;
#volumeBreak(thres) =>
    def rsivol = RSI(Price = volume_, Length = 14);
    def osc = HullMovingAvg(rsivol, 10);
    def volumeBreak = osc > 49;
#volatilityBreak(volmin, volmax)
    def volatilityBreak = ATR(LENGTH = 1) > ATR(LENGTH = 10);
# adx
    def adx_ = ADX(Length = 14) > 15;
#dot(v, w, p)
script dot {
    input v = 1;
    input w = 1;
    input p = 10;
    def dot = Sum(v * w, p);#  // dot product
    plot out = dot;
}
#sigmoid(z) =>
script sigmoid {
    input z = 1;
    def sigmoid = 1.0 / (1.0 + Exp(-z));
    plot out = sigmoid;
}
#logistic_regression(X, Y, p, lr, iterations) =>
script logistic_regression {
    input X = close;
    input Y = close;
    input p = 10;
    input lr = 0.0009;
    input iterations = 1000;
    def loss = fold i = 1 to iterations with q do
        -1.0 / p * (dot(dot(Y, Log(sigmoid(dot(X, 0.0, p))) + (1.0 - Y), p), Log(1.0 - sigmoid(dot(X, 0.0, p))), p));
    def w = fold i1 = 1 to iterations with q1 do
        q1 - lr * (1.0 / p * (dot(X, sigmoid(dot(X, 0.0, p)) - Y, p)));
    plot los = loss;
    plot pred = sigmoid(dot(X, w, p));
}
#minimax(ds, p, min, max) =>
script minimax {
    input ds = close;
    input p = 10;
    input min = 0;
    input max = 100;
    def hi = Highest(ds, p);
    def lo = Lowest(ds, p);
    def minimax = (max - min) * (ds - lo) / (hi - lo) + min;
    plot out = minimax;
}
#//-------------------- Logic
def signal;
def hp_counter;
def ds = if priceType == priceType."Open"  then open_ else
if priceType == priceType."High"  then high_ else
if priceType == priceType."Low"   then low_ else
if priceType == priceType."Close" then close_ else
if priceType == priceType."HL2"   then(high_ + low_) / 2 else
if priceType == priceType."OC2"   then(open_ + close_) / 2 else
if priceType == priceType."OHL3"  then(open_ + high_ + low_) / 3 else
if priceType == priceType."HLC3"  then(high_ + low_ + close_) / 3 else
if priceType == priceType."OHLC4" then(open_ + high_ + low_ + close_) / 4 else close_;
#def ds = close(Period = tf);
def base_ds = if ishistory then ds else ds[1];
def synth_ds = Log(AbsValue(Power(base_ds, 2) - 1) + .5);# //-- generate a synthetic dataset

def base = if easteregg then time else base_ds;         # //-- standard and optional calculation
def synth = if easteregg then base_ds else synth_ds;
def lowstBase = Lowest(base_ds, nlbk);
def highestBase = Highest(base_ds, nlbk);

def loss = logistic_regression(base, synth, lookback, lrate, iterations).los;
def prediction = logistic_regression(base, synth, lookback, lrate, iterations).pred;
def scaled_loss = minimax(loss, nlbk, lowstBase, highestBase);
def scaled_prediction = minimax(prediction, nlbk, lowstBase, highestBase);

#-- - KernelEstimate filter

#rationalQuadratic(series float _src, simple int _lookback, simple float _relativeWeight, simple int startAtBar) =>
script rationalQuadratic {
    input _src = close;
    input iterations = 1000;
    input _lookback = 8;
    input _relativeWeight = 8;
    input startAtBar = 25;
    def _currentWeight;
    def _cumulativeWeight;
    _currentWeight = fold i = 0 to iterations with p do
        p + _src[i] * (Power(1 + (Power(i, 2) / ((Power(_lookback, 2) * 2 * _relativeWeight))), -_relativeWeight));
    _cumulativeWeight = fold i1 = 0 to iterations with p1 do
        p1 + (Power(1 + (Power(i1, 2) / ((Power(_lookback, 2) * 2 * _relativeWeight))), -_relativeWeight));
    def yhat = _currentWeight / _cumulativeWeight;
    plot out = yhat;
}
#gaussian(series float _src, simple int _lookback, simple int startAtBar) =>
script gaussian {
    input _src = close;
    input iterations = 1000;
    input _lookback = 8;
    input startAtBar = 25;
    def _currentWeight;# = 0.
    def _cumulativeWeight;# = 0.
    _currentWeight = fold i = 0 to iterations with q do
        q + _src[i] * Exp(-Power(i, 2) / (2 * Power(_lookback, 2)));
    _cumulativeWeight = fold i1 = 0 to iterations with q1 do
        q1 + Exp(-Power(i1, 2) / (2 * Power(_lookback, 2)));
    def yhat = _currentWeight / _cumulativeWeight;
    plot out = yhat;
}
def yhat1 = rationalQuadratic(base_ds, iterations, KernelLookback, RelativeWeighting, RegressionLevel);
def yhat2 = gaussian(base_ds, iterations, KernelLookback - lag, RegressionLevel);

#// Kernel Rates of Change
def wasBearishRate = yhat1[2] > yhat1[1];
def wasBullishRate = yhat1[2] < yhat1[1];
def isBearishRate = yhat1[1] > yhat1;
def isBullishRate = yhat1[1] < yhat1;
def isBearishChange = isBearishRate and wasBullishRate;
def isBullishChange = isBullishRate and wasBearishRate;
#// Kernel Crossovers
def isBullishSmooth = yhat2 >= yhat1;
def isBearishSmooth = yhat2 <= yhat1;
#// Kernel Colors
def colorByCross = if isBullishSmooth then 1 else -1;
def colorByRate = if isBullishRate then 1 else -1;
def plotColor = if showKernelEstimate then(if useKernelSmoothing then colorByCross else colorByRate) else 0;

plot kernelEstimate = if plotColor == 0 then na else yhat1;        # "Kernel Regression Estimate"
kernelEstimate.SetLineWeight(2);
kernelEstimate.AssignValueColor(if plotColor > 0 then GlobalColor("c_green") else GlobalColor("c_red"));
#// Alert Variables
#// Bullish and Bearish Filters based on Kernel
def isBullish = If useKernelSmoothing then isBullishSmooth else isBullishRate;
def isBearish = If useKernelSmoothing then isBearishSmooth else isBearishRate;
#-- - END kernel
def volt = volatilityBreak;
def vol = volumeBreak;
def regime = regime_filter;
def adxValue = adx_;
def allUp = volt and vol and regime and adxValue and isBullish;
def allDn = volt and vol and regime and adxValue and isBearish;
def filterUp = if FilterSignalsby == FilterSignalsby.Volatility then volt else
if FilterSignalsby == FilterSignalsby.Volume     then vol else
if FilterSignalsby == FilterSignalsby.Regime     then Regime else
if FilterSignalsby == FilterSignalsby.Kernel     then isBullish else
if FilterSignalsby == FilterSignalsby.ADX        then adxValue else
if FilterSignalsby == FilterSignalsby.All        then allUp else yes;

def filterDn = if FilterSignalsby == FilterSignalsby.Volatility then volt else
if FilterSignalsby == FilterSignalsby.Volume     then vol else
if FilterSignalsby == FilterSignalsby.Regime     then Regime else
if FilterSignalsby == FilterSignalsby.Kernel     then isBearish else
if FilterSignalsby == FilterSignalsby.ADX        then adxValue else
if FilterSignalsby == FilterSignalsby.All        then allDn else yes;
signal = if useprice then
if base_ds < scaled_loss and filterDn then - 1 else
if base_ds > scaled_loss and filterUp then 1 else signal[1] else
if (scaled_loss crosses below scaled_prediction) and filterDn then - 1 else
if (scaled_loss crosses above scaled_prediction) and filterUp then 1 else signal[1];

def changed = signal - signal[1];
hp_counter = if changed then 0 else hp_counter[1] + 1;

def startLongTrade = changed and signal == 1 and isBullish;
def startShortTrade = changed and signal == -1 and isBearish;
def endLongTrade = (signal == 1  and hp_counter == HoldingPeriod and!changed) or(changed and signal == -1);
def endShortTrade = (signal == -1 and hp_counter == HoldingPeriod and!changed) or(changed and signal == 1);

#//-------------------- Rendering
def lowFrac = low * 0.03 / 100;
def highFrac = high * 0.03 / 100;
plot CurveLoss = if curves then scaled_loss else na;
plot CurvePred = if curves then scaled_prediction else na;

plot BuySig = if startLongTrade  then low - lowFrac else na;#, "Buy"
plot SelSig = if startShortTrade then high + highFrac else na;#, "Sell"
plot endLong = if ShowExitLongShort and endLongTrade then high else na;#, 'StopBuy'
plot endShort = if ShowExitLongShort and endShortTrade then low else na;#, 'StopSell'

BuySig.SetPaintingStrategy(PaintingStrategy.SQUARES);
SelSig.SetPaintingStrategy(PaintingStrategy.SQUARES);
BuySig.SetLineWeight(2);
SelSig.SetLineWeight(2);
BuySig.SetDefaultColor(GlobalColor("blue"));
SelSig.SetDefaultColor(Color.MAGENTA); #GlobalColor("red"));
endLong.SetPaintingStrategy(PaintingStrategy.BOOLEAN_WEDGE_UP);
endShort.SetPaintingStrategy(PaintingStrategy.BOOLEAN_WEDGE_DOWN);
endLong.SetDefaultColor(GlobalColor("dblue"));
endShort.SetDefaultColor(GlobalColor("dred"));
CurveLoss.SetDefaultColor(GlobalColor("blue"));
CurvePred.SetDefaultColor(Color.YELLOW);

#//-------------------- Backtesting (TODO)

#def size = if lot_size == lot_size."0.01" then 0.01 else
#           if lot_size == lot_size."0.1" then 0.1 else
#           if lot_size == lot_size."0.2" then 0.2 else
#           if lot_size == lot_size."0.3" then 0.3 else
#           if lot_size == lot_size."0.5" then 0.5 else
#           if lot_size == lot_size."1" then 1 else
#           if lot_size == lot_size."2" then 2 else
#           if lot_size == lot_size."3" then 3 else
#           if lot_size == lot_size."5" then 5 else
#           if lot_size == lot_size."10" then 10 else
#           if lot_size == lot_size."20" then 20 else
#           if lot_size == lot_size."30" then 30 else
#           if lot_size == lot_size."50" then 50 else
#           if lot_size == lot_size."100" then 100 else
#           if lot_size == lot_size."1000" then 1000 else size[1];

def ohl3 = (open + high + low) / 3;

def start_long_trade;
#def long_trades;
def start_short_trade;
#def short_trades;
def wins;
def trade_count;

if startLongTrade {
    start_long_trade = ohl3;
} else {
    start_long_trade = start_long_trade[1];
}
if startShortTrade {
    start_short_trade = ohl3;
} else {
    start_short_trade = start_short_trade[1];
}
if endLongTrade {
    trade_count = trade_count[1] + 1;
    wins = if (ohl3 - start_long_trade) > 0 then wins[1] + 1 else wins[1];
#    long_trades = long_trades[1] + (ohl3 - start_long_trade) * size;
#    short_trades = short_trades[1];
} else
    if endShortTrade {
        trade_count = trade_count[1] + 1;
        wins = if (start_short_trade - ohl3) > 0 then wins[1] + 1 else wins[1];
#    short_trades = short_trades[1] + (start_short_trade - ohl3) * size;
#    long_trades = long_trades[1];
    } else {
        trade_count = trade_count[1];
        wins = wins[1];
#    long_trades = long_trades[1];
#    short_trades = short_trades[1];
    }
#def cumreturn = long_trades + short_trades;
def totaltrades = trade_count;
def totalwins = wins;
def totallosses = if totaltrades - totalwins == 0 then 1 else totaltrades - totalwins;
#def cr = Round(cumreturn, 2);
def winLoss = Round(totalwins / totallosses, 2);
def winRate = Round(totalwins / totaltrades * 100, 1);
# / --------------------Information

#AddLabel(show_label, "CR= " + cr, if cr > 0 then Color.LIGHT_GREEN else Color.PINK);
AddLabel(show_label, "Trades: " + totaltrades, Color.WHITE);
AddLabel(show_label, "Win/Loss: " + winLoss, if winLoss > 1 then Color.LIGHT_GREEN else Color.PINK);
AddLabel(show_label, "Winrate: " + winRate + "%", if winRate > 50 then Color.LIGHT_GREEN else Color.PINK);

#----END of CODE