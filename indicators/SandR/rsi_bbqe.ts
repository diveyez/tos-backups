#https://www.tradingview.com/v/XBP7E1JB/
#//@Dziwne
# Author | © Dziwne— — —
#// Glaz's QQE : https://fr.tradingview.com/script/tJ6vtBBe-QQE/
#// Mihkel00's QQE MOD : https://www.tradingview.com/script/TpUW4muw-QQE-MOD/
#// Dziwne's MFI : https://www.tradingview.com/script/fCtJdxar/
# / indicator(title = 'RSI, BB QQE Mod (highlight) v1.0 [Dziwne]', shorttitle = 'RSI, BB-QQE Mod [Dziwne]'
# Converted by Sam4Cok@Samer800 - 04 / 2023
declare lower;
input ColorBars = no;
input source = close;         # 'Source'
input rsi_length = 13;        # 'RSI Length'
input rsi_smoothing = 5;      # 'RSI Smoothing'
input slow_factor = 3;        # 'Slow Factor'
input level_oversold = 20;    # 'Oversold Level'
input level_overbought = 80;  # 'Overbought Level'
input bb_length = 50;         # 'BB Length'
input bb_mult = 1.414;        # 'BB Multiplier'


def na = Double.NaN;
def last = isNaN(close);
def pos = Double.POSITIVE_INFINITY;
def neg = Double.NEGATIVE_INFINITY;
script nz {
    input data = close;
    input repl = 0;
    def ret_val = if isNaN(data) then repl else data;
    plot return = ret_val;
}
#// 2.1. Calculations, RSI Smoothed

def rsi = RSI(Price = source, Length = rsi_length);
def rsi_ma = ExpAverage(rsi, rsi_smoothing);

#// 2.2. Calculations, QQE base for BB

def atr_rsi = AbsValue(rsi_ma[1] - rsi_ma);
def atr_rsi_ma = ExpAverage(atr_rsi, rsi_length);

def dar = ExpAverage(atr_rsi_ma, rsi_length) * slow_factor;

def newlongband = rsi_ma - dar;
def longband;
def longband1 = if (nz(longband[1]) == 0, newlongband, longband[1]);
longband = if rsi_ma[1] > longband1 and rsi_ma > longband1 then Max(longband1, newlongband) else newlongband;

def newshortband = rsi_ma + dar;
def shortband;
def shortband1 = if (nz(shortband[1]) == 0, newshortband, shortband[1]);
shortband = if rsi_ma[1] < shortband1 and rsi_ma < shortband1 then Min(shortband1, newshortband) else newshortband;

def cross_up = (rsi_ma > longband[1] and rsi_ma[1] <= longband1[1]) or(rsi_ma < longband[1] and rsi_ma[1] >= longband1[1]);
def cross_down = (rsi_ma > shortband[1] and rsi_ma <= shortband1[1]) or(rsi_ma < shortband[1] and rsi_ma >= shortband1[1]);

def trend;
trend = if cross_down then longband else if cross_up then shortband else if (nz(trend[1]) == 0, longband, trend[1]);

#// 2.3. Calculations, BB

def basis = Average(trend, bb_length);
def dev = bb_mult * stdev(trend, bb_length);

def upper_bb = basis + dev;
def lower_bb = basis - dev;

# // 3.1. Colors, Parameters

def over_bb = rsi_ma > upper_bb;
def under_bb = rsi_ma < lower_bb;

def up = rsi_ma > 50 and over_bb;
def down = rsi_ma < 50 and under_bb;

def oversold = rsi_ma < level_oversold;
def overbought = rsi_ma > level_overbought;

#// 3.2. Colors, Definition

def color_line_bb = if over_bb then 1 else if under_bb then - 1 else 0;
def color_highlight_rsi_bb = if up then 1 else if down then - 1 else 0;
def color_highlight_rsi_OBOS = if up and overbought then 1 else if down and oversold then - 1 else 0;

#// 4.1. Display, Plotting

def upper_bb_line = upper_bb;
def lower_bb_line = lower_bb;

plot rsi_ma_line = rsi_ma;
rsi_ma_line.AssignValueColor(if color_line_bb > 0 then Color.GREEN else
if color_line_bb < 0 then Color.RED else Color.DARK_GRAY);

plot LowLine = if last then na else 0;
plot HighLine = if last then na else 100;
LowLine.SetDefaultColor(Color.GRAY);
HighLine.SetDefaultColor(Color.GRAY);

plot os = if last then na else level_oversold;
plot ob = if last then na else level_overbought;
os.SetDefaultColor(Color.DARK_RED);
ob.SetDefaultColor(Color.DARK_GREEN);
os.SEtPaintingStrategy(PaintingStrategy.DASHES);
ob.SEtPaintingStrategy(PaintingStrategy.DASHES);

#// 4.2. Display, Filling
AddCloud(upper_bb_line, lower_bb_line, Color.DARK_GRAY);

#// 4.3. Display, Highlighting

AddCloud(if color_highlight_rsi_bb > 0 then pos else na, neg, Color.DARK_GREEN);    # 'Up/Down, Highlight'
AddCloud(if color_highlight_rsi_bb < 0 then pos else na, neg, Color.DARK_RED);      # 'Up/Down, Highlight'

AddCloud(if color_highlight_rsi_OBOS > 0 then pos else na, neg, Color.DARK_GREEN);  # 'Overbought/Oversold, Highlight')
AddCloud(if color_highlight_rsi_OBOS < 0 then pos else na, neg, Color.DARK_RED);    # 'Overbought/Oversold, Highlight')

#// Bar Color
AssignPriceColor(if !ColorBars then Color.CURRENT else
if color_line_bb > 0 then Color.GREEN else
if color_line_bb < 0 then Color.RED else Color.DARK_GRAY);

#-- - END of CODE