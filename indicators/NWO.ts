#// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
#// ©FractalTrade15, original Nadaraya_Watson Kernel code and library by ©jdehorty
#// @FractalTrade15
#indicator(title = "Nadaraya-Watson Oscillator", shorttitle = "NWO", overlay = false, timeframe = '')
# converted by Sam4Cok @Samer800    - 04 / 2023
declare lower;
#getBounds(_atr, _nearFactor, _farFactor, _yhat) =>
script getBounds {
    input _atr = 0;
    input _nearFactor = 0;
    input _farFactor = 0;
    input _yhat = close;
    def _upper_far = _yhat + _farFactor * _atr;
    def _upper_near = _yhat + _nearFactor * _atr;
    def _lower_near = _yhat - _nearFactor * _atr;
    def _lower_far = _yhat - _farFactor * _atr;
    plot up_near = _upper_near;
    plot up_far = _upper_far;
    plot lo_near = _lower_near;
    plot lo_far = _lower_far;
}
#kernel_atr(length, _high, _low, _close) =>
script kernel_atr {
    input length = 10;
    input _high = high;
    input _low = low;
    input _close = close;
    def trueRange = TrueRange(_high, _close, _low);
    def kernel_atr = WildersAverage(trueRange, length);
    plot out = kernel_atr;
}
#rationalQuadratic(series float _src, simple int _lookback, simple float _relativeWeight, simple int startAtBar) =>
script rationalQuadratic {
    input _src = close;
    input _lookback = 8;
    input _relativeWeight = 8;
    input startAtBar = 25;
    def _currentWeight;# = 0.
    def _cumulativeWeight;# = 0.
    def size = AbsValue(CompoundValue(1, BarNumber(), 0));
    def _size = if size > 2000 then 2000 else size;
    _currentWeight = fold i = 0 to _size + startAtBar with p do
        p + GetValue(_src, i) * (Power(1 + (Power(i, 2) / ((Power(_lookback, 2) * 2 * _relativeWeight))), -_relativeWeight));
    _cumulativeWeight = fold i1 = 0 to _size + startAtBar with p1 do
        p1 + (Power(1 + (Power(i1, 2) / ((Power(_lookback, 2) * 2 * _relativeWeight))), -_relativeWeight));
    def yhat = _currentWeight / _cumulativeWeight;
    plot out = yhat;
}
#f_c_gradientAdvDecPro(_source, _center, _steps, _c_bearWeak, _c_bearStrong, _c_bullWeak, _c_bullStrong) =>
script f_c_gradientAdvDecPro {
    input _source = close;
    input _center = close;
    input _steps = 5;
    def _qtyAdvDec;
    def _return;
    def _maxSteps = Max(1, _steps);
    def _xUp = (_source > _center and _source[1] <= _center[1]);
    def _xDn = (_source < _center and _source[1] >= _center[1]);
    def _chg = _source - _source[1];
    def _up = _chg > 0;
    def _dn = _chg < 0;
    def _srcBull = _source > _center;
    def _srcBear = _source < _center;
    _qtyAdvDec = if _srcBull then if _xUp then 1 else
    if _up then Min(_maxSteps, _qtyAdvDec[1] + 1) else
    if _dn then Max(1, _qtyAdvDec[1] - 1) else _qtyAdvDec[1] else
    if _srcBear then if _xDn then 1 else
    if _dn then Min(_maxSteps, _qtyAdvDec[1] + 1) else
    if _up then Max(1, _qtyAdvDec[1] - 1) else _qtyAdvDec[1] else _qtyAdvDec[1];
    _return = if _srcBull then _qtyAdvDec else if _srcBear then - _qtyAdvDec else _return[1]; #No100(_qtyAdvDec, 1000, _steps, 1);
    plot out = _return;
}
#// Kernel Settings
input ColorBars = yes;
input LookbackWindow = 8;   # 'Lookback Window'.Recommended range: 3 - 50'
input alpha = 8.0;          # 'Relative Weighting'.Recommended range: 0.25 - 25'
input RegressionLength = 25;# "Start Regression at Bar".Recommended range: 5 - 25'
input atr_length = 21;      # 'ATR Length'
input nearFactor = 2.25;    # 'Near ATR Factor'.Recommended range: 0.5 - 2.0'
input farFactor = 3.0;      # 'Far ATR Factor'.Recommended range: 6.0 - 8.0'
input mid_width = 0.5;      # "Middle Band Width"
input hull_on = yes;        # "Hull NW MA"
input hull_length = 55;     # "Hull Smoothing Length"

    def na = Double.NaN;
    def last = IsNaN(close);
    def pos = Double.POSITIVE_INFINITY;
    def neg = Double.NEGATIVE_INFINITY;
    def x_0 = RegressionLength;
    def h = LookbackWindow;
#-- Colors
DefineGlobalColor("bullc", CreateColor(76, 175, 80));
DefineGlobalColor("bearc", CreateColor(255, 82, 82));
#//Calculations
    def yhat_close = rationalQuadratic(close, h, alpha, x_0);
    def yhat_high = rationalQuadratic(high, h, alpha, x_0);
    def yhat_low = rationalQuadratic(low, h, alpha, x_0);
    def yhat = yhat_close;
    def ktr = kernel_atr(atr_length, yhat_high, yhat_low, yhat_close);
    def upper_near = getBounds(ktr, nearFactor, farFactor, yhat_close).up_near;
    def upper_far = getBounds(ktr, nearFactor, farFactor, yhat_close).up_far;
    def lower_near = getBounds(ktr, nearFactor, farFactor, yhat_close).lo_near;
    def lower_far = getBounds(ktr, nearFactor, farFactor, yhat_close).lo_far;
    def avg_factor = Average(nearFactor, farFactor);
    def z_nad = (close - yhat_close) / ktr;# // Calculates the oscillator from the Kernel
    def hullma = HullMovingAvg(z_nad, hull_length);
    def grad2 = f_c_gradientAdvDecPro(yhat_close, ExpAverage(yhat_close, 2), 5);

#// Plots
    plot p_zn = z_nad;                                    # 'Nadaraya-Watson Estimator'
    plot p_hull = if hull_on then hullma else na;
    def  p_upper_far = if last then na else farFactor;    # 'Upper Boundary: Far'
    def  p_upper_near = if last then na else nearFactor;  # 'Upper Boundary: Near'
    plot p_yhath = if last then na else mid_width;        # 'Nadaraya-Watson Estimation'
    plot p_yhat = if last then na else 0;                 # 'Nadaraya-Watson Estimation'
    plot p_yhatl = if last then na else -mid_width;       # 'Nadaraya-Watson Estimation'
    def  p_lower_near = if last then na else -nearFactor; # 'Lower Boundary: Near'
    def  p_lower_far =  if last then na else -farFactor;  # 'Lower Boundary: Far'

p_zn.SetLineWeight(2);
p_zn.AssignValueColor(if z_nad > p_yhath then Color.GREEN else
if z_nad < p_yhatl then Color.RED else Color.GRAY);
p_hull.AssignValueColor(if hullma > hullma[2] then GlobalColor("bullc") else GlobalColor("bearc"));
p_yhat.AssignValueColor(if grad2 > 0 then Color.DARK_GREEN else
if grad2 < 0 then Color.DARK_RED else Color.GRAY);
p_yhath.SetDefaultColor(Color.DARK_GREEN);
p_yhatl.SetDefaultColor(Color.DARK_RED);
p_yhath.SetPaintingStrategy(PaintingStrategy.DASHES);
p_yhatl.SetPaintingStrategy(PaintingStrategy.DASHES);

AddCloud(if z_nad > p_yhath then z_nad else na, p_yhath, Color.DARK_GREEN);
AddCloud(if z_nad < p_yhatl then p_yhatl else na, z_nad, Color.DARK_RED);
AddCloud(p_upper_far, p_upper_near, Color.DARK_RED);
AddCloud(p_lower_near, p_lower_far, Color.DARK_GREEN);

AddCloud(if z_nad < -farFactor then pos else na, neg, Color.DARK_GREEN);# ? color.new(bearc, 90) : z_nad < -farFactor ? color.new(bullc, 90) : na)
AddChart(high = if z_nad < -farFactor then pos else na, low = neg, open = pos, close = neg,
    type = ChartType.CANDLE, growcolor = CreateColor(0, 36, 0));
AddChart(high = if z_nad > farFactor then pos else na, low = neg, open = pos, close = neg,
    type = ChartType.CANDLE, growcolor = CreateColor(36, 0, 0));

AssignPriceColor(if !ColorBars then Color.CURRENT else
if z_nad > p_yhath then Color.GREEN else
if z_nad < p_yhatl then Color.RED else Color.GRAY);

#-- - END of CODE