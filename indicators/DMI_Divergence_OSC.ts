# DMI Oscillator Divergence Indicator for ThinkorSwim
# Based on the framework of Trend Exhaustion Indicator
# Assembled by BenTen at useThinkScript.com

# You are free to use this code for personal use, and make derivative works from it.You are NOT GRANTED permission to use this code(or derivative works) for commercial purposes which includes and is not limited to selling, reselling, or packaging with other commercial indicators.Headers and attribution in this code should remain as provided, and any derivative works should extend the existing headers.

input length = 10;
input averageType = AverageType.WILDERS;

def diPlus = DMI(length, averageType)."DI+";
def diMinus = DMI(length, averageType)."DI-";

def Osc = diPlus - diMinus;
def Hist = Osc;
def ZeroLine = 0;

# 3 Bars Bullish Divergence
def bullish3 = CLOSE < CLOSE[1] AND CLOSE[1] < CLOSE[2] AND CLOSE[2] < CLOSE[3] AND Hist > Hist[1] AND Hist[1] > Hist[2] AND Hist[2] > Hist[3];
plot bull3 = bullish3;
bull3.AssignValueColor(Color.MAGENTA);
bull3.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);

# 3 Bars Bearish Divergence
def bearish3 = CLOSE > CLOSE[1] AND CLOSE[1] > CLOSE[2] AND CLOSE[2] > CLOSE[3] AND Hist < Hist[1] AND Hist[1] < Hist[2] AND Hist[2] < Hist[3];
plot bear3 = bearish3;
bear3.AssignValueColor(Color.MAGENTA);
bear3.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);

# 4 Bars Bullish Divergence
def bullish4 = CLOSE < CLOSE[1] AND CLOSE[1] < CLOSE[2] AND CLOSE[2] < CLOSE[3] AND CLOSE[4] < CLOSE[4] AND Hist > Hist[1] AND Hist[1] > Hist[2] AND Hist[2] > Hist[3] AND Hist[3] > Hist[4];
plot bull4 = bullish4;
bull4.AssignValueColor(Color.CYAN);
bull4.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);

# 4 Bars Bearish Divergence
def bearish4 = CLOSE > CLOSE[1] AND CLOSE[1] > CLOSE[2] AND CLOSE[2] > CLOSE[3] AND CLOSE[3] > CLOSE[4] AND Hist < Hist[1] AND Hist[1] < Hist[2] AND Hist[2] < Hist[3] AND Hist[3] < Hist[4];
plot bear4 = bearish4;
bear4.AssignValueColor(Color.CYAN);
bear4.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);