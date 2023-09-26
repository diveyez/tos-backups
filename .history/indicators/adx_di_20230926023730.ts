# https://my.tradingview.com/script/RNcqYq6w-ADX-Di-Di-Gu5/
# This source code is subject to these terms:
#// You are free to:
#// Share, copy and redistribute this script
#// Adapt, transform and build on this script.
#// Under the following terms:
#// NonCommercial: You may not use the material for commercial purposes.
#// Attribution: You must give appropriate credit
#// https://www.safecreative.org/work/2302153511401-adx-di-di-gu5-
#// © gu5tavo71 (Gustavo Cardelle)
#indicator(title = 'ADX Di+ Di- [Gu5]', shorttitle = 'ADX', overlay = false,
#// Indicator to helps determine the strength of a trend
#// Average Directional movement indeX (ADX) Developed by J. Welles
#// This script reuses open source code from another authors:
#// @PineCoders, Built-in Library, and Community Scripts
#// Disclaimer: I am not a financial advisor.
#//             For purpose educate only. Use at your own risk.
# Converted by Sam4Cok@Samer800 - 03 / 2023
declare lower;
#// ——————————— <inputs> {
input adxSmoothing = 14;#        'ADX Smoothing'
input diLength = 14;#        'DI Length'
input Level_Range = 20;#        'Level Range'
input Level_Trend = 35;#        'Level Trend'
input alertOn = yes;#      "Alert On/Off"
input barColor = yes;#      "Bar Color On/Off"

def na = Double.NaN;
def last = isNaN(close);
def isconfirmed = !IsNaN(close);
#-- - Color-- -
    DefineGlobalColor("green", CreateColor(0, 100, 0));
DefineGlobalColor("lgreen", CreateColor(56, 142, 60));
DefineGlobalColor("red", CreateColor(139, 0, 0));
DefineGlobalColor("lred", CreateColor(183, 28, 28));
DefineGlobalColor("orange", CreateColor(255, 152, 0));

DefineGlobalColor("cgreen", CreateColor(0, 61, 0));
DefineGlobalColor("clgreen", CreateColor(39, 100, 42));
DefineGlobalColor("cred", CreateColor(61, 0, 0));
DefineGlobalColor("clred", CreateColor(149, 23, 23));
DefineGlobalColor("corange", CreateColor(118, 70, 0));

# function_declarations > {
    script nz {
    input data = close;
    def ret_val = if !isNaN(data) then data else 0;
    plot return = ret_val;
}
script fixnan {
    input source = close;
    def fix = if !IsNaN(source) then source else fix[1];
    plot result = fix;
}
#f_dirMov(_len) =>
script f_dirMov {
    input _len = 14;
    def _up = (high - high[1]);
    def _down = -(low - low[1]);
    def _plusDM = if IsNaN(_up) then Double.NaN else if _up > _down and _up > 0 then _up else 0;
    def _minusDM = if IsNaN(_down) then Double.NaN else if _down > _up and _down > 0 then _down else 0;
    def tr = TrueRange(high, close, low);
    def _trueRange = WildersAverage(tr, _len);
    def _plus = (100 * WildersAverage(_plusDM, _len) / _trueRange);
    def _minus = (100 * WildersAverage(_minusDM, _len) / _trueRange);
    def plus_ = if isNaN(_plus) then plus_[1] else _plus;
    def minus_ = if isNaN(_minus) then minus_[1] else _minus;
    plot plus = plus_;
    plot min = minus_;
}
#f_sig(_diLen, _sigLen) =>
script f_sig {
    input _diLen = 14;
    input _sigLen = 14;
    def _plus = f_dirMov(_diLen).plus;
    def _minus = f_dirMov(_diLen).min;
    def _sum = _plus + _minus;
    def _sig = 100 * WildersAverage(AbsValue(_plus - _minus) / (if _sum == 0 then 1 else _sum), _sigLen);
    plot out = _sig;
}
#— <calculations>{
#//<set initial values>
def condition;#    = 0.0

def sig = f_sig(diLength, adxSmoothing);
    def diPlus = f_dirMov(diLength).plus;
    def diMinus = f_dirMov(diLength).min;

    def hlRange     = sig <= Level_Range;
    def diUp        = diPlus >= diMinus;
    def diUpUp      = diPlus >= Level_Trend;
    def diDn        = diMinus > diPlus;
    def diDnDn      = diMinus > Level_Trend;
    def crossDi     = (diPlus > diMinus and diPlus[1]<= diMinus[1]) or(diPlus<diMinus and diPlus[1]>= diMinus[1]);
def sigUp = sig > sig[1];
def sigDir = if sig > sig[1] and diUp and!hlRange then 1 else
if sig > sig[1] and diDn and!hlRange then - 1 else 0;
#//Rules
def entryLong = !hlRange and diUp and sigUp and!diUp[1] or
!hlRange and diUp and sigUp and sig > Level_Range and hlRange[1];
def entryShort = !hlRange and diDn and sigUp and!diDn[1] or
!hlRange and diDn and sigUp and sig > Level_Range and hlRange[1];
def entryLongStr = !hlRange and diUp and sigUp and diUpUp;
def entryShortSt = !hlRange and diDn and sigUp and diDnDn;
def exitLong = crossDi and diUp[1] or hlRange and!hlRange[1];
def exitShort = crossDi and diDn[1] or hlRange and!hlRange[1];
condition = if condition[1] != 1   and entryLongStr then 1 else
if condition[1] != -1   and entryShortSt then - 1 else
if condition[1] != 0.5 and entryLong    then 0.5 else
if condition[1] != -0.5 and entryShort  then - 0.5 else
if condition[1] != 0   and exitLong    then 0  else
if condition[1] != 0   and exitShort   then 0  else nz(condition[1]);
def longE = isconfirmed and
condition[1] != 0.5 and condition == 0.5;
def shortE = isconfirmed and
condition[1] != -0.5 and condition == -0.5;
def longEStr = isconfirmed and
condition[1] != 1   and condition == 1;
def shortEStr = isconfirmed and
condition[1] != -1   and condition == -1;
def longX = isconfirmed and
    ((condition[1] == 0.5 and condition == 0) or
        (condition[1] == 1   and condition == 0));
def shortX = isconfirmed and
    ((condition[1] == -0.5 and condition == 0) or
        (condition[1] == -1   and condition == 0));
#//<color>
def c_sig = if hlRange then 0 else
if sigUp   and diUp then 2 else
if !sigUp  and diUp then 1 else
if sigUp   and diDn then - 2 else
if !sigUp  and diDn then - 1 else na;
def c_Adx = if hlRange then 0 else
if !hlRange and diUp and diUpUp  then 2 else
if !hlRange and diUp and!diUpUp then 1 else
if !hlRange and diDn and diDnDn then - 2 else
if !hlRange and diDn and!diDnDn then - 1 else na;

#// ——————————— <plots> {
plot adx = if last or isNaN(c_sig) then na else sig;
adx.SetLineWeight(3);
adx.AssignValueColor(if c_sig == 0 then GlobalColor("orange") else
if c_sig == 2 then GlobalColor("green") else
if c_sig == 1 then GlobalColor("lgreen") else
if c_sig == -2 then GlobalColor("red") else GlobalColor("lred"));

plot p_diPlus = if last then na else diPlus;
p_diPlus.SetDefaultColor(GlobalColor("green"));

plot p_diMinus = if last then na else diMinus;
p_diMinus.SetDefaultColor(GlobalColor("red"));

AddCloud(if isNaN(c_Adx) then na else if c_Adx == 0 then p_diPlus else na, p_diMinus, GlobalColor("corange"), GlobalColor("corange"));
AddCloud(if isNaN(c_Adx) then na else if c_Adx == 2 then p_diPlus else na, p_diMinus, GlobalColor("cgreen"), GlobalColor("cgreen"));
AddCloud(if isNaN(c_Adx) then na else if c_Adx == 1 then p_diPlus else na, p_diMinus, GlobalColor("clgreen"), GlobalColor("clgreen"));
AddCloud(if isNaN(c_Adx) then na else if c_Adx == -2 then p_diPlus else na, p_diMinus, GlobalColor("cred"), GlobalColor("cred"));
AddCloud(if isNaN(c_Adx) then na else if c_Adx == -1 then p_diPlus else na, p_diMinus, GlobalColor("clred"), GlobalColor("clred"));

plot LevelRange = if last then na else Level_Range;
LevelRange.SetDefaultColor(Color.GRAY);
LevelRange.SetPaintingStrategy(PaintingStrategy.DASHES);

plot LevelTrend = if last then na else Level_Trend;
LevelTrend.SetDefaultColor(Color.GRAY);
LevelTrend.SetPaintingStrategy(PaintingStrategy.DASHES);

AssignPriceColor(if !barColor or isNaN(c_sig) then Color.CURRENT else
if c_sig == 0 then GlobalColor("orange") else
if c_sig == 2 then GlobalColor("green") else
if c_sig == 1 then GlobalColor("lgreen") else
if c_sig == -2 then GlobalColor("red") else GlobalColor("lred"));

#// ——————————— <alerts> {
plot Bullish = if alertOn and longE then Level_Trend + 10 else na;
Bullish.SetDefaultColor(GlobalColor("green"));
Bullish.SetPaintingStrategy(PaintingStrategy.TRIANGLES);
#  style = shape.triangleup,
#  size = size.tiny,
#  location = location.absolute)
plot Bearish = if alertOn and shortE then Level_Trend + 10 else na;
Bearish.SetDefaultColor(GlobalColor("red"));
Bearish.SetPaintingStrategy(PaintingStrategy.TRIANGLES);
#  style = shape.triangledown,
#  size = size.tiny,
#  location = location.absolute)
plot StrongBull = if alertOn and longEStr then Level_Trend + 10 else na;
StrongBull.SetDefaultColor(GlobalColor("green"));
StrongBull.SetPaintingStrategy(PaintingStrategy.TRIANGLES);
StrongBull.SetLineWeight(3);
#  style = shape.triangleup,
#  size = size.small,
#  location = location.absolute)
plot StrongBear = if alertOn and shortEStr then Level_Trend + 10 else na;
StrongBear.SetDefaultColor(GlobalColor("red"));
StrongBear.SetPaintingStrategy(PaintingStrategy.TRIANGLES);
StrongBear.SetLineWeight(3);
#  style = shape.triangledown,
#  size = size.small,
#  location = location.absolute)
plot EndTrend = if alertOn and(longX or shortX) then Level_Trend + 10 else na;
EndTrend.SetDefaultColor(GlobalColor("orange"));
EndTrend.SetPaintingStrategy(PaintingStrategy.SQUARES);
EndTrend.SetLineWeight(3);
#  style = shape.xcross,
#  size = size.small,
#  location = location.absolute)



#-- END of Code