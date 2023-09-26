# Begin of EMA Clouds

input price = close;
input EMA_1 = 20;
input EMA_2 = 20;
input showBreakoutSignals = no;

def EMA34 = ExpAverage(price, 34);
def EMA68 = ExpAverage(price, 68);
def SMA116 = Average(price, 116);
def Body = (open + close) / 2;

plot AvgExp_1 = ExpAverage(price, EMA_1);
plot AvgExp_2 = ExpAverage(AvgExp_1, EMA_2);

DefineGlobalColor("Bullish", Color.GREEN);
DefineGlobalColor("Bearish", Color.RED);
AddCloud(AvgExp_1, AvgExp_2, GlobalColor("Bullish"), GlobalColor("Bearish"));

def Up = EMA34 > EMA68 and EMA68 > SMA116;
def Down = EMA34 < EMA68 and EMA68 < SMA116;
plot UpSignal = Up and Up[1] == 0;
plot DownSignal = Down and Down[1] == 0;

UpSignal.SetHiding(!showBreakoutSignals);
DownSignal.SetHiding(!showBreakoutSignals);
UpSignal.SetDefaultColor(Color.UPTICK);
UpSignal.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignal.SetDefaultColor(Color.DOWNTICK);
DownSignal.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);


# Combining the EMA 200 Cloud and the 34EMA, 68EMA and 116 EMA Trend
def EMA_200_High = MovAvgExponential(high, 200)."AvgExp";
def EMA_200_Low = MovAvgExponential(low, 200)."AvgExp";
def Bull = EMA_200_High > EMA_200_High[1] and EMA_200_Low > EMA_200_Low[1];
def Bear = EMA_200_High < EMA_200_High[1] and EMA_200_Low < EMA_200_Low[1];

DefineGlobalColor("Bull", Color.GRAY);
DefineGlobalColor("Bear", Color.GRAY);
AddCloud(EMA_200_High, EMA_200_Low, GlobalColor("Bull"), GlobalColor("Bear"), yes);


# Trend Dots on 200 EMA
plot EMA200 = ExpAverage(price, 200);
EMA200.SetDefaultColor(GetColor(0));
DefineGlobalColor("Bull Trend Color", Color.RED);
DefineGlobalColor("Bear Trend Color", Color.GREEN);
DefineGlobalColor("Neutral Trend Color", Color.YELLOW);
EMA200.SetLineWeight(2);
EMA200.SetPaintingStrategy(PaintingStrategy.POINTS);
# VWAP.AssignValueColor(GlobalColor("Bear Trend Color"));

EMA200.AssignValueColor( if Up then Color.GREEN else if Down then Color.RED else Color.YELLOW);

# End