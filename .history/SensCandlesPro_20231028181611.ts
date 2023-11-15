# San's Candles Pro
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/QVnaMNyh-San-s-Candles-Pro/

def sans_bullish = (close[1] < open[1] and open < close and low > low[1] and close > high[1] and open >= close[1] and open < high[1] );
def sans_bearish = (close[1] > open[1] and close < open and high < high[1] and close < low[1] and open < close[1] and open > low[1] );

assignPriceColor(if sans_bullish then color.green else if sans_bearish then color.red else color.white);