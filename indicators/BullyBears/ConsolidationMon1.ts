# SMI Ergodic Oscillator(BenTen)
# Converted from https://www.tradingview.com/script/Xh5Q0une-SMI-Ergodic-Oscillator/
# Modified by Diveyez in 2023 for the consolidation monitor set in the Diveyez Deck
# Feature filled by CHATGPT

declare lower;

input fastPeriod = 9;
input slowPeriod = 50;
input SmthLen = 12;
input TopBand = 0.7;
input LowBand = -0.7;
input xPrice = vwap;

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