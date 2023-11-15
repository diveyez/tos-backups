#// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
#// © capissimo
#https://www.tradingview.com/v/3lZg4gmr/
#indicator("Machine Learning: kNN (New Approach)",
# Converted and mod by Sam4Cok@Samer800 - 03 / 2023
#//-- Inputs
input BarColor = yes;
input ShowLabel = yes;
input ShowOutcomes = { "Line", "Predict", default "Both" };    # 'Show Outcomes'
input UseChartTimeframe = yes;
input Resolution = AggregationPeriod.FIVE_MIN;    # 'Resolution'
input filterType = { "Volatility", "Volume", "Regime", "True Range", "All", default "None" }; # 'Filter Signals by'
input PredictionCalc = { Default "Average", "Rational Quadratic", "gaussian"};
input VolumeThreshold = 49;
input regimeThreshold = -0.1;
input usePrice = yes;    # 'Use Price Data for Signal Generation?')
input Lag = 2;
input NoOfDataPoints = 10;     # 'No of Data Points'
input NoOfNearestNeighbors = 100;    # 'No of Nearest Neighbors'
input AdjustPrediction = yes;    # 'Adjust Prediction'
input NonRepainting = no;     # 'Non-Repainting'
input addOn = { "None", "Pivot Point", default "Z-Score" };    # 'Add-On'
input PivotPointLag = 5;                 # 'Pivot Point Lag'
input zScoreLag = 20;                # 'Z-Score Lag'

#-- -
    def na = Double.NaN;
def src = ohlc4;    # 'Projection Base'
def agg = GetAggregationPeriod();
def Rep = if NonRepainting then 1 else 0;
def last = IsNaN(close[-Rep]);# and isNaN(close[-2]);
def TF = if UseChartTimeframe then agg else Resolution;
def k = NoOfNearestNeighbors;
def Pvt = addOn == addOn."Pivot Point";
def zsc = addOn == addOn."Z-Score";
def curve = ShowOutcomes == ShowOutcomes."Line";
def Predict = ShowOutcomes == ShowOutcomes."Predict";
def Both = ShowOutcomes == ShowOutcomes."Both";
def Avg = PredictionCalc == PredictionCalc."Average";
def kernel = PredictionCalc == PredictionCalc."Rational Quadratic";
def h = if UseChartTimeframe then high[Rep] else high(Period = TF)[Rep];
def l = if UseChartTimeframe then low[Rep] else low(Period = TF)[Rep];
def c = if UseChartTimeframe then close[Rep] else close(Period = TF)[Rep];
def v = if UseChartTimeframe then volume[Rep] else volume(Period = TF)[Rep];

#-- - Color
DefineGlobalColor("green", CreateColor(0, 128, 255));
DefineGlobalColor("Red", CreateColor(255, 0, 128));
DefineGlobalColor("c_green", CreateColor(0, 153, 136));
DefineGlobalColor("c_red", CreateColor(204, 51, 17));
#rationalQuadratic(series float _src, simple int _lookback, simple float _relativeWeight, simple int startAtBar) =>
script rationalQuadratic {
    input _src = close;
    input _lookback = 8;
    input _relativeWeight = 8;
    input startAtBar = 25;
    def _currentWeight;# = 0.
    def _cumulativeWeight;# = 0.
    def size = if !IsNaN(_src) then size[1] + 1 else size[1];
    def _size = if size >= 2000 then 1900 else size;
    _currentWeight = fold i = 0 to _size + startAtBar with p do
        p + GetValue(_src, i) * (Power(1 + (Power(i, 2) / ((Power(_lookback, 2) * 2 * _relativeWeight))), -_relativeWeight));
    _cumulativeWeight = fold i1 = 0 to _size + startAtBar with p1 do
        p1 + (Power(1 + (Power(i1, 2) / ((Power(_lookback, 2) * 2 * _relativeWeight))), -_relativeWeight));
    def yhat = _currentWeight / _cumulativeWeight;
    plot out = yhat;
}
#gaussian(series float _src, simple int _lookback, simple int startAtBar) =>
script gaussian {
    input _src = close;
    input _lookback = 8;
    input startAtBar = 25;
    def _currentWeight;# = 0.
    def _cumulativeWeight;# = 0.
    def size = if !IsNaN(_src) then size[1] + 1 else size[1];
    def _size = if size >= 2000 then 1900 else size;
    _currentWeight = fold i = 0 to _size + startAtBar with q do
        q + GetValue(_src, i) * Exp(-Power(i, 2) / (2 * Power(_lookback, 2)));
    _cumulativeWeight = fold i1 = 0 to _size + startAtBar with q1 do
        q1 + Exp(-Power(i1, 2) / (2 * Power(_lookback, 2)));
    def yhat = _currentWeight / _cumulativeWeight;
    plot out = yhat;
}
#minimax(ds, p, min, max) =>  // normalize to price
script minimax {
    input ds = close;
    input p = 10;
    input min = low;
    input max = high;#  // normalize to price
    def hi = Highest(ds, p);
    def lo = Lowest(ds, p);
    def minimax = (max - min) * (ds - lo) / (hi - lo) + min;
    plot out = minimax;
}
#volumeBreak(thres) =>
def rsivol = RSI(Price = v, Length = 14);
def osc = HullMovingAvg(rsivol, 10);
def volumeBreak = osc > VolumeThreshold;
#volatilityBreak(volmin, volmax) =>
def tr = TrueRange(h, c, l);
def atrMin = WildersAverage(tr, 1);
def atrMax = WildersAverage(tr, 10);
def volatilityBreak = atrMin > atrMax;
# @regime_filter
def value1;# = 0.0
def value2;# = 0.0
def klmf;# = 0.0
value1 = 0.2 * (src - src[1]) + 0.8 * (value1[1]);
value2 = 0.1 * (high - low) + 0.8 * (value2[1]);
def omega = AbsValue(value1 / value2);
def alpha = (-power(omega, 2) + sqrt(power(omega, 4) + 16 * power(omega, 2))) / 8;
klmf = alpha * src + (1 - alpha) * (klmf[1]);
def absCurveSlope = AbsValue(klmf - klmf[1]);
def exponentialAverageAbsCurveSlope = 1.0 * ExpAverage(absCurveSlope, 200);
def normalized_slope_decline = (absCurveSlope - exponentialAverageAbsCurveSlope) / exponentialAverageAbsCurveSlope;
def regime = normalized_slope_decline >= regimeThreshold;
def trFilt = atr(Length = 1) > atr(Length = 10);
def all = volatilityBreak and volumeBreak and Regime and trFilt;

def filter = if filterType == filterType."Volatility" then volatilityBreak else
if filterType == filterType."Volume" then volumeBreak else
if filterType == filterType."Regime" then Regime else
if filterType == filterType."True Range" then trFilt else
if filterType == filterType."All" then all else yes;
#-- - Logic
def nearest_neighbors;

def d = fold i = 0 to NoOfDataPoints - 1 with p do
    AbsValue(c[i] - GetValue(c, i + 1));

def size = fold i1 = 0 to NoOfDataPoints - 1  with p1 do
    if !IsNaN(d[i1]) then p1 + 1 else p1;

def new_neighbor = fold i2 = 0 to NoOfDataPoints - 1 with p2 do
    if d[i2] < Min(d[i2], If(size[i2] > k, k, 0)) then GetValue(c, i2 + 1) else c[i2];

nearest_neighbors = fold i3 = 0 to NoOfDataPoints - 1 with p3 do
    GetValue(new_neighbor, -i3);

def predAvg = Average(nearest_neighbors, NoOfDataPoints);
def predRQ = rationalQuadratic(nearest_neighbors, NoOfDataPoints, NoOfDataPoints, NoOfNearestNeighbors);
def loss = gaussian(nearest_neighbors, NoOfDataPoints, NoOfNearestNeighbors);

def prediction = if Avg then predAvg else if kernel then predRQ else loss;
def synth_ds = Log(AbsValue(Power(C, 2) - 1) + .5);
def synth = synth_ds;

def scaled_loss = minimax(prediction, NoOfDataPoints - Lag, Lowest(synth, NoOfDataPoints), Highest(synth, NoOfDataPoints));
def scaled_pred = minimax(prediction, NoOfDataPoints, Lowest(synth, NoOfDataPoints), Highest(synth, NoOfDataPoints));

#-- signals
def signal =  if usePrice then
if synth < scaled_loss and filter then - 1 else
if synth > scaled_loss and filter then 1 else signal[1] else
if (scaled_loss crosses below scaled_pred) and filter then - 1 else
if (scaled_loss crosses above scaled_pred) and filter then 1 else signal[1];
def changed = (signal - signal[1]);
def hp_counter = if changed then 0 else hp_counter[1] + 1;

def startLongTrade = changed and signal > 0;
def startShortTrade = changed and signal < 0;

#-- Pred
def dir = if prediction < c[!AdjustPrediction] then 1 else
if prediction > c[!AdjustPrediction] then - 1 else 0;
def ordinary_color = dir;
def ph = if h == Highest(h, PivotPointLag) then h else 0;
def pl = if l == Lowest(l, PivotPointLag)  then l else 0;
def pivot_color = if ph and dir == 1 then 1 else
if pl and dir == -1 then - 1 else 0;
#zscore_color(data, LAGZ, dir) =>
def zs = (C - Average(C, zScoreLag)) / StDev(C, zScoreLag);
def zsCon = zs / (zScoreLag / 5);
def zscore_color = if zsCon > 0 and dir == 1 then 1 else
if zsCon < 0 and dir == -1 then - 1 else 0;
#//-- Logic

#def nn = nearest_neighbors;
def pred = prediction;
def clr = if zsc then zscore_color else
if Pvt then pivot_color else ordinary_color;

#//-- Visuals

plot kNNCurve = if IsNaN(close) then na else if (curve or Both) then pred else na;#, 'kNN Curve'
kNNCurve.SetLineWeight(2);
kNNCurve.AssignValueColor(if clr > 0 then GlobalColor("green") else
if clr < 0 then GlobalColor("red") else Color.DARK_GRAY);

plot Predc = if last and last[Rep + 1] and(Predict or Both) then src[2] else na;
Predc.AssignValueColor(if clr[2] > 0 then GlobalColor("green") else
if clr[2] < 0 then GlobalColor("red") else Color.DARK_GRAY);
Predc.SetPaintingStrategy(PaintingStrategy.POINTS);
Predc.SetLineWeight(3);

#-- - Labels
AddLabel(ShowLabel, if clr > 0 then "Prediction: UP" else
if clr < 0 then "Prediction: Down" else "Prediction: Nutral",
                   if clr > 0 then Color.GREEN else
if clr < 0 then GlobalColor("red") else Color.DARK_GRAY);
#-- Bar Colors
AssignPriceColor(if !BarColor then Color.CURRENT else
if clr > 0 then GlobalColor("c_green") else
if clr < 0 then GlobalColor("c_red") else Color.DARK_GRAY);
#-- Bubbles

AddChartBubble(startLongTrade, l, "L", GlobalColor("c_green"), no);
AddChartBubble(startShortTrade, h, "S", GlobalColor("c_red"), yes);

#-- - END CODE