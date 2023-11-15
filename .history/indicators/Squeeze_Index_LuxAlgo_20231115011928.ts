#// This work is licensed under a Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) https://creativecommons.org/licenses/by-nc-sa/4.0/
#// © LuxAlgo
#indicator("Squeeze Index [LUX]", "SI [LUX]")
# Converted by Sam4Cok @Samer800    - 04 / 2023
declare lower;

input conv = 50;# 'Convergence Factor')
input length = 20;
input threshold = 80;
input src = close;

################
def na = Double.NaN;
def bar = AbsValue(CompoundValue(1, BarNumber(), 1));

script correlationTS {
    input data1 = close;
    input data2 = close;
    input length = 12;
    plot CorrelationTS = Covariance(data1, data2, length) / (StDev(data1, length) * StDev(data2, length));
}

#//-----------------------------------------------------------------------------}
#//Squeeze index
#//-----------------------------------------------------------------------------{
def max;
def min;

max = Max(src, if (max[1] == 0, src, max[1]) - (if (max[1] == 0, src, max[1]) - src) / conv);
min = Min(src, if (min[1] == 0, src[1], min[1]) + (src - if (min[1] == 0, src[1], min[1])) / conv);

def diff = Log(max - min);

def psi = -50 * correlationTS(diff, bar, length) + 50;

#//-----------------------------------------------------------------------------}
#//Plots
#//-----------------------------------------------------------------------------{
plot psiLine = psi; #if bar <= length then na else psi;
psiLine.SetLineWeight(2);
psiLine.AssignValueColor(CreateColor(255, 255 - psi * 2.55, 0));
plot psiUpper = if psi < threshold or bar <= length then na else psi;
psiUpper.SetDefaultColor(Color.LIGHT_RED);
psiUpper.SetStyle(Curve.POINTS);
psiUpper.SetLineWeight(2);

plot line80 = if isNaN(close) then na else threshold;
line80.SetDefaultColor(Color.GRAY);
line80.SetStyle(Curve.MEDIUM_DASH);

AddCloud(psiUpper, line80, Color.DARK_RED); #psi < 80 ? na : color.new(#ff1100, 80))

# End Of Code