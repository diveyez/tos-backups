# Volatility Regime
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/sbQW2Gky-Volatility-Regime/

declare lower;

input window = 40;
def atrp = atr(21) / close * 100;
def atrpma = simpleMovingAvg(atrp, window);
def atrpsd = stdev(atrp, window);


def volatile = atrp > atrpma + 1 * atrpsd;
def normal = atrp <= atrpma + 1 * atrpsd and atrp >= atrpma - 1 * atrpsd;
def quiet = atrp < atrpma - 1 * atrpsd;

plot histogram = 1;

histogram.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
histogram.assignValueColor(if volatile then color.RED else if normal then color.green else color.gray);