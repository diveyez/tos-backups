# SMI Ergodic Oscillator(BenTen)
# Converted from https://www.tradingview.com/script/Xh5Q0une-SMI-Ergodic-Oscillator/
# Modified by Diveyez in 2023 for the consolidation monitor set in the Diveyez Deck
# Feature filled by CHATGPT

declare lower;

input fastPeriod = 4;
input slowPeriod = 8;
input SmthLen = 3;
input TopBand = 0.5;
input LowBand = -0.5;
input xPrice = close;

plot top_l = TopBand;
plot low_l = LowBand;

def xPrice1 = xPrice - xPrice[1];
def xPrice2 = AbsValue(xPrice - xPrice[1]);
def xSMA_R = ExpAverage(ExpAverage(xPrice1, fastPeriod), slowPeriod);
def xSMA_aR = ExpAverage(ExpAverage(xPrice2, fastPeriod), slowPeriod);
def xSMI = xSMA_R / xSMA_aR;
def xEMA_SMI = ExpAverage(xSMI, SmthLen);

plot green_line = xSMI;
plot red_line = xEMA_SMI;

green_line.AssignValueColor(Color.GREEN);
red_line.AssignValueColor(Color.RED);

low_l.AssignValueColor(Color.WHITE);
top_l.AssignValueColor(Color.WHITE);


input Length1 = 20;
def Limit = 20;
def range = 70;

def overbought = Limit;
def oversold = -Limit;

# Stochastic Momentum Index(SMI) 
def min_low = Lowest(low, Length1 + 1);
def max_high = Highest(high, Length1 + 1);
def rel_diff = close - (max_high + min_low) / 2;
def diff = max_high - min_low;
def avgrel = ExpAverage(ExpAverage(rel_diff, Length1), Length1);
def avgdiff = ExpAverage(ExpAverage(diff, Length1), Length1);
def SMI1 = if avgdiff != 0 then avgrel / (avgdiff / 2) * 100 else 0;

plot SMI = reference EhlersSuperSmootherFilter(price = SMI1, "cutoff length" = Length1);
SMI.DefineColor("Up", CreateColor(0, 153, 51));
SMI.definecolor("Weak", Color.BLACK);
SMI.DefineColor("Down", Color.RED);
SMI.AssignValueColor(if SMI > SMI[1] then SMI.Color("Up") else if SMI < SMI[1] then SMI.Color("Down") else SMI.Color("Weak"));
SMI.SetLineWeight(1);
SMI.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
SMI.SetLineWeight(1);

plot rangeband = if IsNaN(close) then Double.NaN else 0;
rangeband.HideBubble();
rangeband.SetLineWeight(2);
rangeband.AssignValueColor(Color.Gray);
def rangelimits = Limit;

plot upper = Limit;
plot lower = -Limit;

# Labels
AddLabel(SMI < -Limit or SMI > Limit, "Market is in a Trend", CreateColor(0, 150, 200));
AddLabel(SMI > -Limit and SMI < Limit, "Market is Consolidating", Color.ORANGE);
