#// This work is licensed under a Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
#// © Zeiierman
#https://www.tradingview.com/v/iOi1pXOX/
#indicator('MACD & RSI Overlay (Expo)', overlay = true)
# Converted by Sam4Cok @Samer800     - 03 / 2023
#// ~~ Input variables {
#//MACD & RSI
input showLabel = yes;        # "Show Trend Label"
input macd_rsi = { default "MACD", "RSI-14", "Both"};    # "MACD/RSI"
input SignalType = { Default indicator, Price, None };
input ShowIndicator = yes;
input macd_rsi_smooth = 1;      # "Smooth"
input signal_line_Length = 14;  # "Signal Length"
input rsiOverBought = 70;       # "RSI OB/OS"
input rsiOverSold = 30;         # "RSI OB/OS"
#//Scaling
input trendFactor = 30;       # "Trend Factor"
input scalingFactor = 2.5;      # "Scaling Factor"

#//Table
#//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~}
def na = Double.NaN;
def macdType = macd_rsi == macd_rsi."MACD";
def rsiType = macd_rsi == macd_rsi."RSI-14";
def bothType = macd_rsi == macd_rsi."Both";
def SigInd = SignalType == SignalType.indicator;
def SigNon = SignalType == SignalType.None;
#-- - Color
DefineGlobalColor("macd", CreateColor(0, 188, 212));
DefineGlobalColor("rsi", CreateColor(19, 69, 238));
DefineGlobalColor("signal", GetColor(8));
DefineGlobalColor("ob", CreateColor(0, 230, 118));
DefineGlobalColor("os", CreateColor(255, 82, 82));
#// ~~ Moving Averages {
def priceMa = Average(close, 2);
def trendMa = Average(close, trendFactor);

#//Calculate Scaled Adaptive Moving Average
def error = AbsValue(priceMa - trendMa);
def errorSum = Sum(error, 10);
def ama = if errorSum == 0 then close[1] else priceMa * (error / errorSum) + trendMa * (1 - error / errorSum);
def pma = scalingFactor * close + (1.0 - scalingFactor) * ama[1];

#//Averages
def macd = WMA(WildersAverage(pma, 5), macd_rsi_smooth);
def rsi = WMA(WildersAverage(pma, 1), macd_rsi_smooth);
def signal = Average(pma, signal_line_Length);

#//OB/OS color
def rsi_ = RSI(PRICE = close, LENGTH = 14);
def rsi_col = if rsi_ > rsiOverBought then 1 else if rsi_ < rsiOverSold then - 1 else 0;

#//Plots
plot macdLine = if ShowIndicator then if macdType or BothType then macd else na else na;  # 'MACD Line'
plot rsiLine = if ShowIndicator then if rsiType or BothType  then rsi else na else na;    # 'RSI Line'
plot SigLine = signal;          # 'Signal Line'
SigLine.SetLineWeight(2);
macdLine.SetDefaultColor(GlobalColor("macd"));
rsiLine.AssignValueColor(if rsi_col > 0 then GlobalColor("ob") else
if rsi_col < 0 then GlobalColor("os") else GlobalColor("rsi"));
SigLine.SetDefaultColor(GlobalColor("signal"));
#//~Label~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~}

AddLabel(showLabel and macdType or bothType, if macd > close then "MACD: Bullish" else "MACD: Bearish",
                               if macd > close then Color.GREEN else Color.RED);
AddLabel(showLabel and rsiType or bothType, if close < rsi then "RSI: Bullish" else "RSI: Bearish",
                              if close < rsi then Color.GREEN else Color.RED);

#// ~~ Alerts {
#indicatorcross(indicator) =>
Script indicatorcross {
input indicator = close;
input signal = close;
    def over_ = crosses(indicator, signal, CrossingDirection.ABOVE);
    def under_ = crosses(indicator, signal, CrossingDirection.BELOW);
    plot over = over_;
    plot under = under_;
}
#srccross(src, indicator) =>
Script srccross {
input src = close;
input indicator = close;
    def over_ = crosses(src, indicator, CrossingDirection.ABOVE);
    def under_ = crosses(src, indicator, CrossingDirection.BELOW);
    plot over = over_;
    plot under = under_;
}

def over_macd = indicatorcross(macd, signal).over;
def under_macd = indicatorcross(macd, signal).under;
def over_rsi = indicatorcross(rsi, signal).over;
def under_rsi = indicatorcross(rsi, signal).under;

def over_macd_price = srccross(close, macd).over;
def under_macd_price = srccross(close, macd).under;

def over_rsi_price = srccross(close, rsi).over;
def under_rsi_price = srccross(close, rsi).under;

#def over_rsi_macd = srccross(rsi, macd).over;
#def under_rsi_macd = srccross(rsi, macd).under;

plot macdIndUp = if !SigNon and macdType and SigInd and over_macd then macd else na;#, "B", Color.GREEN, no);
plot macdIndDn = if !SigNon and macdType and SigInd and under_macd then macd else na;#, "S", Color.RED, yes);
macdIndUp.SetLineWeight(3);
macdIndDn.SetLineWeight(3);
macdIndUp.SetPaintingStrategy(PaintingStrategy.POINTS);
macdIndUp.SetDefaultColor(Color.CYAN);
macdIndDn.SetPaintingStrategy(PaintingStrategy.POINTS);
macdIndDn.SetDefaultColor(Color.MAGENTA);

plot macdPrUp = if !SigNon and macdType and!SigInd and over_macd_price then low else na;#, "B", Color.GREEN, no);
plot macdPrDn = if !SigNon and macdType and!SigInd and under_macd_price then high else na;#, "S", Color.RED, yes);
macdPrUp.SetPaintingStrategy(PaintingStrategy.BOOLEAN_WEDGE_DOWN);
macdPrUp.SetDefaultColor(GlobalColor("ob"));
macdPrDn.SetPaintingStrategy(PaintingStrategy.BOOLEAN_WEDGE_UP);
macdPrDn.SetDefaultColor(GlobalColor("os"));

plot rsiIndUp = if !SigNon and rsiType and SigInd and over_rsi then rsi else na;#, "B", Color.GREEN, no);
plot rsiIndDn = if !SigNon and rsiType and SigInd and under_rsi then rsi else na;#, "S", Color.RED, yes);
rsiIndUp.SetLineWeight(3);
rsiIndDn.SetLineWeight(3);
rsiIndUp.SetPaintingStrategy(PaintingStrategy.POINTS);
rsiIndUp.SetDefaultColor(Color.CYAN);
rsiIndDn.SetPaintingStrategy(PaintingStrategy.POINTS);
rsiIndDn.SetDefaultColor(Color.MAGENTA);

plot rsiPrUp = if !SigNon and rsiType and!SigInd and over_rsi_price then low else na;#, "B", Color.GREEN, no);
plot rsiPrDn = if !SigNon and rsiType and!SigInd and under_rsi_price then high else na;#, "S", Color.RED, yes);
rsiPrUp.SetPaintingStrategy(PaintingStrategy.BOOLEAN_WEDGE_DOWN);
rsiPrUp.SetDefaultColor(GlobalColor("ob"));
rsiPrDn.SetPaintingStrategy(PaintingStrategy.BOOLEAN_WEDGE_UP);
rsiPrDn.SetDefaultColor(GlobalColor("os"));

#plot bothIndUp = if !SigNon and bothType and over_rsi_macd then low else na;#, "B", Color.GREEN, no);
#plot bothIndDn = if !SigNon and bothType and under_rsi_macd then high else na;#, "S", Color.RED, yes);
#bothIndUp.SetPaintingStrategy(PaintingStrategy.BOOLEAN_WEDGE_DOWN);
#bothIndUp.SetDefaultColor(GlobalColor("ob"));
#bothIndDn.SetPaintingStrategy(PaintingStrategy.BOOLEAN_WEDGE_UP);
#bothIndDn.SetDefaultColor(GlobalColor("os"));

#-- - END CODE