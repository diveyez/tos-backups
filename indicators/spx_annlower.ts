#// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
#// © Noldo
#study("ANN Next Coming Candlestick Forecast SPX 1D", overlay = true)
# Converted by Sam4Cok @Samer800    - 03 / 2023

declare lower;

def na = Double.NaN;
def o = open;
def h = high;
def l = low;
def c = close;

def _indicator1 = ((o - o[1]) / (o[1]));
def _indicator2 = ((h - h[1]) / (h[1]));
def _indicator3 = ((l - l[1]) / (l[1]));
def _indicator4 = ((c - c[1]) / (c[1]));
#def _indicator5 = (source - source[1]) / source[1];

#// Inputs on Tangent Function :
#tangentdiff(_src) =>
script tangentdiff {
    input _src = close;
    def tangentdiff = (_src - _src[1]) / _src[1];
    plot out = tangentdiff;
}
#// Deep Learning Activation Function (Tanh) :
script Tanh {
    input v = 0;
    def Tanh = (1 - Exp(-2 * v)) / (1 + Exp(-2 * v));
    plot out = Tanh;
}
#// DEEP LEARNING
#// INPUTS :
def input_o = (_indicator1);
def input_h = (_indicator2);
def input_l = (_indicator3);
def input_c = (_indicator4);
#// LAYERS :
#// Input Layers

def n_0 = Tanh(input_o + 0);
def n_1 = Tanh(input_h + 0);
def n_2 = Tanh(input_l + 0);
def n_3 = Tanh(input_c + 0);

def fun_open;
def o_4 = Tanh(0.030535 * n_0 + 5.113012 * n_1 + -26.085717 * n_2 + -5.320280 * n_3 + 7.354752);
def o_5 = Tanh(4.167948 * n_0 + 7.225875 * n_1 + -0.871215 * n_2 + -8.894535 * n_3 + -7.064751);
def o_6 = Tanh(-0.806293 * n_0 + -0.304470 * n_1 + -3.909741 * n_2 + -5.009985 * n_3 + 5.127558);
def o_7 = Tanh(-29.736063 * n_0 + 28.668433 * n_1 + 0.138417 * n_2 + -57.588543 * n_3 + 2.824914);
def o_8 = Tanh(-0.429393 * n_0 + 0.482744 * n_1 + -0.789797 * n_2 + -2.987460 * n_3 + -4.310747);
def o_9 = Tanh(1.758357 * n_0 + -0.618090 * n_1 + 2.449362 * n_2 + -1.583126 * n_3 + 1.165846);
fun_open = Tanh(-0.653030 * o_4 + -4.646999 * o_5 + -1.678999 * o_6 + -17.077652 * o_7 + 0.875426 * o_8 + -6.672465 * o_9 + 6.940722);

def fun_high;
def h_4 = Tanh(10.186543 * n_0 + -30.964897 * n_1 + 21.672385 * n_2 + -40.895894 * n_3 + 7.957443);
def h_5 = Tanh(-15.252332 * n_0 + 14.845403 * n_1 + 10.621491 * n_2 + -23.817824 * n_3 + 2.947530);
def h_6 = Tanh(-15.179010 * n_0 + -30.011878 * n_1 + 35.650459 * n_2 + -61.480486 * n_3 + 3.898503);
def h_7 = Tanh(35.656454 * n_0 + -11.134354 * n_1 + -28.071578 * n_2 + 2.923959 * n_3 + -1.805703);
def h_8 = Tanh(3.462374 * n_0 + -13.644019 * n_1 + -30.226394 * n_2 + -1.083953 * n_3 + 23.032872);
def h_9 = Tanh(-47.265829 * n_0 + 19.021801 * n_1 + 10.565216 * n_2 + -27.520789 * n_3 + 6.947500);
fun_high = Tanh(-0.696537 * h_4 + -1.349433 * h_5 + 27.262956 * h_6 + -1.042353 * h_7 + -0.540196 * h_8 + -10.735585 * h_9 + 1.303216);

def fun_low;
def l_4 = Tanh(4.363108 * n_0 + -18.301472 * n_1 + -15.376884 * n_2 + 21.208559 * n_3 + -0.458119);
def l_5 = Tanh(-2.651826 * n_0 + 5.205410 * n_1 + -5.920993 * n_2 + -4.847458 * n_3 + 8.315580);
def l_6 = Tanh(13.885322 * n_0 + -5.517922 * n_1 + -15.241118 * n_2 + -8.673229 * n_3 + -4.954015);
def l_7 = Tanh(10.490466 * n_0 + -25.201536 * n_1 + 10.262121 * n_2 + -1.116144 * n_3 + -5.254103);
def l_8 = Tanh(-14.687736 * n_0 + 9.030202 * n_1 + -17.332462 * n_2 + 8.068070 * n_3 + 0.755134);
def l_9 = Tanh(0.895168 * n_0 + -1.737740 * n_1 + 4.899143 * n_2 + -7.718495 * n_3 + 5.493688);
fun_low = Tanh(4.132907 * l_4 + -17.501595 * l_5 + 4.617443 * l_6 + -28.476857 * l_7 + -5.888234 * l_8 + -24.434500 * l_9 + 41.318760);

def fun_close;
def c_4 = Tanh(22.427157 * n_0 + -26.691701 * n_1 + 4.937141 * n_2 + 9.034960 * n_3 + -10.692978);
def c_5 = Tanh(-38.288087 * n_0 + 10.050028 * n_1 + -44.706345 * n_2 + -17.816354 * n_3 + 30.566226);
def c_6 = Tanh(-33.995444 * n_0 + 14.501766 * n_1 + -43.286508 * n_2 + -13.387415 * n_3 + 24.708075);
def c_7 = Tanh(-14.392948 * n_0 + 28.483095 * n_1 + -22.979338 * n_2 + -7.658263 * n_3 + -5.650564);
def c_8 = Tanh(28.837901 * n_0 + -26.354494 * n_1 + 0.520683 * n_2 + 25.004913 * n_3 + -17.883236);
def c_9 = Tanh(-4.811354 * n_0 + -4.036420 * n_1 + -8.332775 * n_2 + -1.157164 * n_3 + 0.466793);
fun_close = Tanh(-22.053311 * c_4 + 3.652552 * c_5 + -4.390465 * c_6 + 2.103060 * c_7 + 20.027285 * c_8 + 11.510129 * c_9 + -0.415015);

#// Current Open Values
def _chg_open = tangentdiff(o) * 100;
def _seed_open = (fun_open - _chg_open) / 100;
def f_open = o * (1 - _seed_open);
#// Current High Values
def _chg_high = tangentdiff(h) * 100;
def _seed_high = (fun_high - _chg_high) / 100;
def f_high = h * (1 - _seed_high);
#// Current Low Values
def _chg_low = tangentdiff(l) * 100;
def _seed_low = (fun_low - _chg_low) / 100;
def f_low = l * (1 - _seed_low);
#// Current Close Values
def _chg_c = tangentdiff(c) * 100;
def _seed_c = (fun_close - _chg_c) / 100;
def f_close = c * (1 - _seed_c);

def up = f_close > f_close[1];

# Plot the new Chart
AddChart(high = if up then f_high else na, low = f_low, open = f_open, close = f_close,
    type = ChartType.CANDLE, growcolor = CreateColor(0, 137, 123));

AddChart(high = if up then na else f_high, low = f_low, open = f_open, close = f_close,
    type = ChartType.CANDLE, growcolor = CreateColor(136, 14, 79));


plot upperBand = f_open + ATR(LENGTH = 1);
plot lowerBand = f_low - ATR(LENGTH = 1);

upperBand.AssignValueColor(if up then CreateColor(0, 137, 123) else CreateColor(136, 14, 79));
lowerBand.AssignValueColor(if up then CreateColor(0, 137, 123) else CreateColor(136, 14, 79));
upperBand.SetPaintingStrategy(PaintingStrategy.POINTS);
lowerBand.SetPaintingStrategy(PaintingStrategy.POINTS);

#-- END of CODE