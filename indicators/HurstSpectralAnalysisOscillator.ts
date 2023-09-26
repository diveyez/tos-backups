#// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
#// © BarefootJoey
#indicator('Hurst Spectral Analysis Oscillator', overlay = false, format = format.price, precision = 3)
# Converted by Sam4Cok @Samer800    - 04 / 2023 - not typical conversion
declare lower;
#//-------------------------------Inputs-------------------------------//
input source = hl2;#, 'Source', group = "Bandpass Settings")
input bandWidth = 0.025;#, 'Bandwidth', minval = 0.0, maxval = 1.0, group = "Bandpass Settings")
input CompositeCandles = no;
input sig_in = { default "None", "5 Day", "10 Day", "20 Day", "40 Day", "80 Day", "20 Week", "40 Week", "18 Month"};
input periodBandpassh = 4.3;#, '5 Day      ', minval = 2, inline = "1", group = "Cycle Settings")
input periodBandpassf = 8.5;#, '10 Day    ', minval = 2, inline = "2", group = "Cycle Settings")
input periodBandpass2 = 17.0;#, '20 Day    ', minval = 2, inline = "3", group = "Cycle Settings")
input periodBandpass4 = 34.1;#, '40 Day    ', minval = 2, inline = "4", group = "Cycle Settings")
input periodBandpass8 = 68.2;#, '80 Day    ', minval = 2, inline = "5", group = "Cycle Settings")
input periodBandpass16 = 136.4;#, '20 Week ', minval = 2, inline = "6", group = "Cycle Settings")
input periodBandpass32 = 272.8;#, '40 Week ', minval = 2, inline = "7", group = "Cycle Settings")
input periodBandpass64 = 545.6;#, '18 Month', minval = 2, inline = "8", group = "Cycle Settings")
#// Composite Selection
input comph = yes;#(true, "Composite", inline = "1", group = "Cycle Settings")
input compf = yes;#(true, "Composite", inline = "2", group = "Cycle Settings")
input comp2 = yes;#(true, "Composite", inline = "3", group = "Cycle Settings")
input comp4 = yes;#(true, "Composite", inline = "4", group = "Cycle Settings")
input comp8 = yes;#(true, "Composite", inline = "5", group = "Cycle Settings")
input comp16 = yes;#(true, "Composite", inline = "6", group = "Cycle Settings")
input comp32 = yes;#(true, "Composite", inline = "7", group = "Cycle Settings")
input comp64 = yes;#(true, "Composite", inline = "8", group = "Cycle Settings")
input decimals = 2;#, 'Price Decimals', minval = 0, maxval = 10, group = "Analysis Settings")

def na = Double.NaN;
def last = isNaN(close);
def candle = CompositeCandles;
def day5 = sig_in == sig_in."5 Day";
def day10 = sig_in == sig_in."10 Day";
def day20 = sig_in == sig_in."20 Day";
def day40 = sig_in == sig_in."40 Day";
def day80 = sig_in == sig_in."80 Day";
def week20 = sig_in == sig_in."20 Week";
def week40 = sig_in == sig_in."40 Week";
def month18 = sig_in == sig_in."18 Month";

#// Color Selection
DefineGlobalColor("colh", Color.PLUM); #CreateColor(156, 39, 176));
DefineGlobalColor("colf", Color.VIOLET); #CreateColor(33, 150, 243));
DefineGlobalColor("col2", Color.CYAN); #CreateColor(0, 188, 212));
DefineGlobalColor("col4", CreateColor(76, 175, 80));
DefineGlobalColor("col8", CreateColor(255, 235, 59));
DefineGlobalColor("col16", CreateColor(255, 152, 0));
DefineGlobalColor("col32", CreateColor(255, 82, 82));
DefineGlobalColor("col64", CreateColor(133, 108, 68));
DefineGlobalColor("col128", CreateColor(54, 58, 69));
DefineGlobalColor("col256", CreateColor(120, 123, 134));
DefineGlobalColor("col512", CreateColor(255, 255, 255));
DefineGlobalColor("colcompu", Color.DARK_GREEN);
DefineGlobalColor("colcompd", Color.DARK_RED);

#//--------Functions & Calculations-------------------------------//
script nz {
    input data = close;
    def ret_val = if IsNaN(data) then 0 else data;
    plot return = ret_val;
}
#barssince(Condition) =>
script barssince {
    input Condition = 0;
    def barssince = if Condition then 1 else barssince[1] + 1;
    plot return = barssince;
}
#// @TMPascoe found & offered this bandpass by @HPotter found here https://www.tradingview.com/script/A1jhw5fG-Bandpass-Filter/
#//      @BarefootJoey turned the code into a function and made it accept float Period
#bpf(Series, float Period, Delta) =>
script bpf {
    input Series = hl2;
    input Period = 10;
    input Delta = 0.025;
    def Pi = Double.Pi;
    def tmpbpf;
    def beta = Cos(Pi * (360 / Period) / 180);
    def gamma = 1 / Cos(Pi * (720 * Delta / Period) / 180);
    def alpha = gamma - Sqrt(gamma * gamma - 1);
    tmpbpf = CompoundValue(1, 0.5 * (1 - alpha) * (Series - Series[2]) + beta * (1 + alpha) * nz(tmpbpf[1]) - alpha * nz(tmpbpf[2]),
        0.5 * (1 - alpha) * (Series - Series[2]));
    plot out = tmpbpf;
}
#// Individual Bandpass Filters
def BPFh = bpf(source, periodBandpassh, bandWidth);
def BPFf = bpf(source, periodBandpassf, bandWidth);
def BPF2 = bpf(source, periodBandpass2, bandWidth);
def BPF4 = bpf(source, periodBandpass4, bandWidth);
def BPF8 = bpf(source, periodBandpass8, bandWidth);
def BPF16 = bpf(source, periodBandpass16, bandWidth);
def BPF32 = bpf(source, periodBandpass32, bandWidth);
def BPF64 = bpf(source, periodBandpass64, bandWidth);

#// Composite
def compBPF = If(comph, BPFh, 0) + If(compf, BPFf, 0) + If(comp2, BPF2, 0) + If(comp4, BPF4, 0) + If(comp8, BPF8, 0) + If(comp16, BPF16, 0) + If(comp32, BPF32, 0) + If(comp64, BPF64, 0);# + If(comp128, BPF128, 0) + If(comp256, BPF256, 0) + If(comp512, BPF512, 0);
def col = (compBPF - compBPF[1]) > 0;

#// Cycle Analysis
#// Truncate Decimals
#truncate(number, pricedecimals) =>
script truncate {
    input number = 0;
    input pricedecimals = 2;
    def factor = Power(10, pricedecimals);
    def truncate = Floor(number * factor) / factor;
    plot out = truncate;
}
#// Switch output/plot for analytics
def sig_out = if day5 then BPFh else if day10 then BPFf else if day20 then BPF2 else if day40 then BPF4 else
if day80 then BPF8 else if week20 then BPF16 else if week40 then BPF32 else if month18 then BPF64 else na;

def period_out = if day5 then periodBandpassh else if day10 then periodBandpassf else if day20 then periodBandpass2 else
if day40 then periodBandpass4 else if day80 then periodBandpass8 else if week20 then periodBandpass16 else
if week40 then periodBandpass32 else if month18 then periodBandpass64 else 1;
#// Highs/Lows
def hi = sig_out[2] < sig_out[1] and sig_out[1] > sig_out;
def lo = sig_out[2] > sig_out[1] and sig_out[1] < sig_out;

#// Define Crosses
def midcross = (sig_out > 0 and sig_out[1] <= 0) or(sig_out < 0 and sig_out[1] >= 0); #Crosses(sig_out, 0, CrossingDirection.ANY);
def midcrossbars = barssince(midcross);

#// Bars Since Last Amp Hi & Lo
def xhi = barssince(hi);
def xlo = barssince(lo);
#// Wavelength  
def wavelength = Round(AbsValue(xhi - xlo) * 2, 0);
#// Last Amp Hi & Lo
def bpfphi = Highest(sig_out, Round(period_out, 0));
def bpfamphi = if bpfphi then sig_out else bpfamphi[1];
def bpfplo = Lowest(sig_out, Round(period_out, 0));
def bpfamplo = if bpfplo then sig_out else bpfamplo[1];
def tot_amp = bpfphi - bpfplo;
#// Estimates/Forecasts
def next_peak = -AbsValue(xhi - wavelength);
def next_trough = -AbsValue(xlo - wavelength);
def next_node = AbsValue(xhi - xlo) - midcrossbars;
#// Highlight background of next peak/node/trough
#// ---- Plots, Displays, Outputs -------------------------------//
plot Day_5 = if Day5 or candle then na else BPFh;    # '5 Day'
plot Day5_ = if Day5 and!candle then BPFh else na;    # '5 Day'
plot Day_10 = if Day10 or candle then na else BPFf;  # '10 Day'
plot Day10_ = if Day10 and!candle then BPFf else na;  # '10 Day'
plot Day_20 = if Day20 or candle then na else BPF2;  # '20 Day'
plot Day20_ = if Day20 and!candle then BPF2 else na;  # '20 Day'
plot Day_40 = if Day40 or candle then na else BPF4;  # '40 Day'
plot Day40_ = if Day40 and!candle then BPF4 else na;  # '40 Day'
plot Day_80 = if Day80 or candle then na else BPF8;  # '80 Day'
plot Day80_ = if Day80 and!candle then BPF8 else na;  # '80 Day'
plot Week_20 = if Week20 or candle then na else BPF16;     # '20 Week'
plot Week20_ = if Week20 and!candle then BPF16 else na;     # '20 Week'
plot Week_40 = if Week40 or candle then na else BPF32;     # '40 Week'
plot Week40_ = if Week40 and!candle then BPF32 else na;     # '40 Week'
plot Month_18 = if Month18 or candle then na else BPF64;   # '18 Month'
plot Month18_ = if Month18 and!candle then BPF64 else na;   # '18 Month'

plot Midline = if last then na else 0;#, "Midline", color.new(color.gray, 30), style = plot.style_histogram)
Midline.SetDefaultColor(Color.DARK_GRAY);
Midline.SetStyle(Curve.SHORT_DASH);
Day_5.SetDefaultColor(GlobalColor("colh"));
Day_10.SetDefaultColor(GlobalColor("colf"));
Day_20.SetDefaultColor(GlobalColor("col2"));
Day_40.SetDefaultColor(GlobalColor("col4"));
Day_80.SetDefaultColor(GlobalColor("col8"));
Week_20.SetDefaultColor(GlobalColor("col16"));
Week_40.SetDefaultColor(GlobalColor("col32"));
Month_18.SetDefaultColor(GlobalColor("col64"));
Day5_.SetDefaultColor(GlobalColor("colh"));
Day10_.SetDefaultColor(GlobalColor("colf"));
Day20_.SetDefaultColor(GlobalColor("col2"));
Day40_.SetDefaultColor(GlobalColor("col4"));
Day80_.SetDefaultColor(GlobalColor("col8"));
Week20_.SetDefaultColor(GlobalColor("col16"));
Week40_.SetDefaultColor(GlobalColor("col32"));
Month18_.SetDefaultColor(GlobalColor("col64"));
Day5_.SetLineWeight(3);
Day10_.SetLineWeight(3);
Day20_.SetLineWeight(3);
Day40_.SetLineWeight(3);
Day80_.SetLineWeight(3);
Week20_.SetLineWeight(3);
Week40_.SetLineWeight(3);
Month18_.SetLineWeight(3);

# Plot the new Chart

AddChart(high = if col and candle then lowest(compBPF, 1) else na, low = min(compBPF, compBPF[1]), open = compBPF, close = compBPF[1],
    type = ChartType.CANDLE, growcolor = CreateColor(38, 166, 154));
AddChart(high = if col or!candle then na else lowest(compBPF, 1), low = min(compBPF, compBPF[1]), open = compBPF[1], close = compBPF,
    type = ChartType.CANDLE, growcolor = CreateColor(239, 83, 80));

def pos = Double.POSITIVE_INFINITY;
def neg = Double.NEGATIVE_INFINITY;
def hii = !Candle and hi;
def loo = !Candle and lo;
def midc = !Candle and midcross;

AddChart(high = if hii then pos else na, low = neg, open = pos, close = neg,
    type = ChartType.CANDLE, growcolor = CreateColor(39, 0, 0));
AddChart(high = if midc then pos else na, low = neg, open = pos, close = neg,
    type = ChartType.CANDLE, growcolor = CreateColor(30, 30, 30));
AddChart(high = if loo then pos else na, low = neg, open = pos, close = neg,
    type = ChartType.CANDLE, growcolor = CreateColor(0, 39, 0));

plot ActualPeak = if !Candle and hi then 0.4 else na;#, "Actual Peak"
plot ActualTrough = if !Candle and lo then - 0.4 else na;#, "Actual Trough"
ActualPeak.SetPaintingStrategy(PaintingStrategy.SQUARES);
ActualTrough.SetPaintingStrategy(PaintingStrategy.SQUARES);
ActualPeak.SetDefaultColor(Color.RED);
ActualTrough.SetDefaultColor(Color.GREEN);


#-- - END of CODE