#https://www.tradingview.com/v/GRMqFdJQ/
#// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
#// © wbburgin
#indicator("Supertrend ANY INDICATOR (RSI, MFI, CCI, etc.) + Range Filter", shorttitle = "ST ANY INDICATOR [wbburgin]"
# Converted by Sam4Cok@Samer800 - 04 / 2023
declare lower;
#// INPUTS _____
input Label = yes;          # "Show Labels"
input selectIndicator = { default "RSI", "MFI", "Accum/Dist", "Momentum", "OB Volume", "CCI", "Stochastic", "High/Low"};
input indicator_length = 9;    # "Indicator Length (if applicable)
input atr_length = 10;          # "Supertrend ATR Length"
input atr_mult = 3.0;           # "Supertrend ATR Mult"
input use_range = no;           # "Use Range Filter of Indicator"
input sampling_period = 50;     # "Range Filter Sampling Period (if applicable)"
input range_mult = 3;           # "Range Filter Multiple (if applicable)"
input ShowSignal = yes;         # "Show Signals"
input highlighting = yes;       # "Display Highlighting"
input oversold = 30;            # "Oversold Level (if applicable)"
input overbought = 70;          # "Overbought Level (if applicable)"
input ShowZigZag = no;

AddLabel(Label, selectIndicator, Color.YELLOW);
def na = Double.NaN;
def last = IsNaN(close);
# stoch(source, high, low, length) =>
script stoch {
    input src = close;
    input h = high;
    input l = low;
    input len = 0;
    def stoch = 100 * (src - Lowest(l, len)) / (Highest(h, len) - Lowest(l, len));
    plot return = stoch;
}
#supertrend_anysource(float source, float factor, simple int atr_length) =>
script supertrend_anysource {
    input source = close;
    input factor = 2;
    input atr_length = 10;
    def lowerBand;
    def upperBand;
    def highest = Highest(source, atr_length);
    def lowest = Lowest(source, atr_length);
#    def trueRange = TrueRange(highest, source, lowest);
    def trueRange = if IsNaN(highest[1]) then highest - lowest  else
    Max(Max(highest - lowest, AbsValue(highest - source[1])), AbsValue(lowest - source[1]));
    def rmaATR = WildersAverage(trueRange, atr_length);
    def atr = rmaATR;
    def up = source + factor * atr;
    def lo = source - factor * atr;
    def prevLowerBand = lowerBand[1];
    def prevUpperBand = upperBand[1];
    lowerBand = if lo > prevLowerBand or source[1] < prevLowerBand then lo else prevLowerBand;
    upperBand = if up < prevUpperBand or source[1] > prevUpperBand then up else prevUpperBand;
    def direction;# = na
    def superTrend;# = na
    def prevSuperTrend = superTrend[1];
    if IsNaN(atr[1]) {
        direction = 1;
    } else {
        if prevSuperTrend == prevUpperBand {
            direction = if source > upperBand then - 1 else 1;
        } else {
            direction = if source < lowerBand then 1 else -1;
        }
    }
    superTrend = if direction == -1 then lowerBand else upperBand;
    plot ST = superTrend;
    plot dir = direction;
}
#filt(source, sampling_period, range_mult) =>
script filt {
    input source = close;
    input sampling_period = 50;
    input range_mult = 3;
    def wper = (sampling_period * 2) - 1;
    def avrng = ExpAverage(AbsValue(source - source[1]), sampling_period);
    def smoothrng = ExpAverage(avrng, wper) * range_mult;
    def rngfilt = CompoundValue(1, if source > rngfilt[1] then
    if (source - smoothrng)<rngfilt[1] then rngfilt[1] else (source - smoothrng) else
    if (source + smoothrng) > rngfilt[1] then rngfilt[1] else (source + smoothrng), source);
    plot out = rngfilt;
}
def nRSI = RSI(Price = close, Length = indicator_length);
def stoch = stoch(close, high, low, indicator_length);
def upper = Sum(volume * If((close - close[1]) <= 0, 0, close), indicator_length);
def lower = Sum(volume * If((close - close[1]) >= 0, 0, close), indicator_length);
def mfi = 100.0 - (100.0 / (1.0 + upper / lower));

def indicator;
switch (selectIndicator) {
    case "RSI":
        indicator = if !use_range then nRSI else
        filt(nRSI, sampling_period, range_mult);
    case "MFI":
        indicator = if !use_range then mfi else
        filt(mfi, sampling_period, range_mult);
    case "Accum/Dist":
        indicator = if !use_range then AccDist() else
        filt(AccDist(), sampling_period, range_mult);
    case "Momentum":
        indicator = if !use_range then(close - close[indicator_length]) else
            filt((close - close[indicator_length]), sampling_period, range_mult);
    case "OB Volume":
        indicator = if !use_range then OnBalanceVolume() else
        filt(OnBalanceVolume(), sampling_period, range_mult);
    case "CCI":
        indicator = if !use_range then CCI(Length = indicator_length) else
        filt(CCI(Length = indicator_length), sampling_period, range_mult);
    case "Stochastic":
        indicator = if !use_range then stoch else
        filt(stoch, sampling_period, range_mult);
    case "High/Low":
        indicator = if !use_range then hl2 else
        filt(hl2, sampling_period, range_mult);
}
def bound = selectIndicator == selectIndicator."RSI" or selectIndicator == selectIndicator."MFI";

def supertrend = supertrend_anysource(indicator, atr_mult, atr_length).ST;
def dir = supertrend_anysource(indicator, atr_mult, atr_length).dir;
def supertrend_up = if dir == -1 then supertrend else na;
def supertrend_dn = if dir == 1 then supertrend else na;
def supertrend_up_start = if dir == -1 and dir[1] == 1 then supertrend else na;
def supertrend_dn_start = if dir == 1 and dir[1] == -1 then supertrend else na;

#-- Plot
plot sup = supertrend_up;    # "Up Supertrend"
plot sdn = supertrend_dn;    # "Down Supertrend"
plot mid = indicator;
mid.SetLineWeight(2);
mid.SetDefaultColor(Color.WHITE);
sup.SetDefaultColor(Color.GREEN);
sdn.SetDefaultColor(Color.RED);

plot UpStart = supertrend_up_start;    # "Supertrend Up Start"
plot DnStart = supertrend_dn_start;    # "Supertrend Down Start"
UpStart.SetLineWeight(3);
DnStart.SetLineWeight(3);
UpStart.SetPaintingStrategy(PaintingStrategy.POINTS);
UpStart.SetDefaultColor(Color.GREEN);
DnStart.SetPaintingStrategy(PaintingStrategy.POINTS);
DnStart.SetDefaultColor(Color.RED);

AddCloud(if !highlighting then na else if dir < 0 then mid else na, sup, Color.DARK_GREEN);
AddCloud(if !highlighting then na else if dir > 0 then sdn else na, mid, Color.DARK_RED);

AddChartBubble(ShowSignal and supertrend_up_start, supertrend_up_start, "Buy", Color.GREEN, no);
AddChartBubble(ShowSignal and supertrend_dn_start, supertrend_dn_start, "Sell", Color.RED, yes);

plot hiPlot = if !bound or last then na else oversold;    # "Oversold Level"
plot loPlot = if !bound or last then na else overbought;  # "Overbought Level"
plot midPlot = (hiPlot + loPlot) / 2;                          # "mid Level"

hiPlot.SetPaintingStrategy(PaintingStrategy.DASHES);
loPlot.SetPaintingStrategy(PaintingStrategy.DASHES);
midPlot.SetStyle(Curve.SHORT_DASH);
hiPlot.SetDefaultColor(Color.DARK_GRAY);
loPlot.SetDefaultColor(Color.DARK_GRAY);
midPlot.SetDefaultColor(Color.DARK_GRAY);

def LongTrigger = dir != dir[1] and dir < 0;
def ShortTrigger = dir != dir[1] and dir > 0;

plot zigzag = if !ShowZigZag then na else
if LongTrigger then supertrend else if ShortTrigger then supertrend else
if IsNaN(close[-1]) then
if  dir > 0 then Highest(indicator, atr_length) else Lowest(indicator, atr_length) else na;
zigzag.AssignValueColor(if dir[1] < 0 then Color.DARK_GREEN else Color.DARK_RED);
zigzag.EnableApproximation();


#-- - END of CODE