# //
# // @author LazyBear 
# // List of all my indicators: 
# // https://docs.google.com/document/d/15AGCufJZ8CIUvwFJ9W-IKns88gkWOKBCvByMEvm5MLo/edit?usp=sharing
# // 
# study("Anchored Momentum [LazyBear]", shorttitle = "AMOM_LB")

# thinkscript conversion by mashume 2022.10
declare lower;
# src = close
input src = close;

# l = input(10, title = "Momentum Period")
input MomentumPeriod = 10;
def l = MomentumPeriod;

# sl = input(8, title = "Signal Period")
input SignalPeriod = 8;
def sl = SignalPeriod;

# sm = input(false, title = "Smooth Momentum")
input SmoothMomentum = no;
def sm = SmoothMomentum;

# smp = input(7, title = "Smoothing Period")
input SmoothingPeriod = 7;
def smp = SmoothingPeriod;

# sh = input(false, title = "Show Histogram")
input ShowHistogram = yes;
def sh = ShowHistogram;

# eb = input(false, title = "Enable Barcolors")
input EnableBarcolors = yes;
def eb = EnableBarcolors;

# p = 2 * l + 1
def p = 2 * l + 1;

# amom = 100 * (((sm ? ema(src, smp) : src) / (sma(src, p)) - 1))
def t_amom = if sm == yes then ExpAverage(src, smp) else src;
def amom = 100 * ((t_amom / (Average(src, p)) - 1));

# amoms = sma(amom, sl)
def amoms = Average(amom, sl);

# hline(0, title = "ZeroLine")
plot ZeroLine = 0;

# hl = sh ? amoms < 0 and amom < 0 ? max(amoms, amom) : amoms > 0 and amom > 0 ? min(amoms, amom) : 0 : na
def hl = 
    if amoms < 0 and amom < 0 then Max(amoms, amom) 
    else
if amoms > 0 and amom > 0 then Min(amoms, amom) 
        else 0 
#     else double.nan
    ;
plot histogram = if sh == yes then hl else Double.NaN;

# hlc = (amom > amoms) ? (amom < 0 ? orange : green) : (amom < 0 ? red : orange)
histogram.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
histogram.AssignValueColor(if amom > amoms then if amom < 0 then Color.ORANGE else Color.GREEN else if amom < 0 then Color.RED else Color.ORANGE);

# plot(sh ? hl : na, style = histogram, color = hlc, linewidth = 2)
# plot(amom, color = red, linewidth = 2, title = "Momentum")
plot Momentum = amom;
Momentum.SetDefaultColor(Color.RED);
Momentum.SetLineWeight(2);

# plot(amoms, color = green, linewidth = 2, title = "Signal")
plot signal = amoms;
signal.SetDefaultColor(Color.GREEN);
signal.SetLineWeight(2);

# barcolor(eb ? hlc : na)
AssignPriceColor(if eb == yes then if amom > amoms then if amom < 0 then Color.ORANGE else Color.light_GREEN else if amom < 0 then Color.RED else Color.Light_Green else color.current);