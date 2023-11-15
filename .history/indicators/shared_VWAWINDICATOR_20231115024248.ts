# VWMA Breakout Strategy
# TD Ameritrade IP Company, Inc. (c) 2017 - 2019
# Modified by BenTen at useThinkScript.com
# Added arrows to use with the Scanner

input vwmaLength = 50;
input maLength = 70;
input averageType = AverageType.SIMPLE;

plot VWMA = Sum(volume * close, vwmaLength) / Sum(volume, vwmaLength);
plot MA = MovingAverage(averageType, close, maLength);
VWMA.SetDefaultColor(GetColor(1));
MA.SetDefaultColor(GetColor(2));

def buy = VWMA crosses above MA;
def sell = VWMA crosses below MA;

plot bullish = buy;
bullish.SetPaintingStrategy(PaintingStrategy.BOOLEAN_Arrow_UP);
bullish.SetDefaultColor(Color.LIME);
bullish.SetLineWeight(1);

plot bearish = sell;
bearish.SetPaintingStrategy(PaintingStrategy.BOOLEAN_Arrow_DOWN);
bearish.SetDefaultColor(Color.LIME);
bearish.SetLineWeight(1);