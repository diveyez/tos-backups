# No Shadow Candles
# Assembled by BenTen atan useThinkScript.com
# Converted from https://www.tradingview.com/script/NeEtd9a0-No-Shadow-Candles-Alerts/

def up = close > close[1] and low >= open and high <= close;
def down = close < close[1] and low >= close and high <= open;

def up2 = (close > close[1] and low >= open and high <= close) and(close[1] > close[2] and low[1] >= open[1] and high[1] <= close[1]);
def down2 = (close < close[1] and low >= close and high <= open) and(close[1] < close[2] and low[1] >= close[1] and high[1] <= open[1]);

AssignPriceColor(if up then Color.GREEN else if down then Color.RED else if up2 then Color.GREEN else if down2 then Color.CYAN else Color.BLACK);