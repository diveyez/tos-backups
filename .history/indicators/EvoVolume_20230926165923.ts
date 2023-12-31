# Evo Volume
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/LsXdEmth-evo-Volume/

declare lower;

input volinput = 15;
input volmulti = 2.5;
def volma = simpleMovingAvg(volume, volinput);

plot histogram = volume;
plot line = volma;

histogram.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
histogram.assignValueColor(if volume > volma * volmulti then color.RED else color.white);