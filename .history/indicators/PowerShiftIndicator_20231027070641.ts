declare lower;

input length = 14;
input ADXLevel = 20;
input averageType = AverageType.WILDERS;
input paintBars = yes;
input alerts = yes;

def hiDiff = high - high[1];
def loDiff = low[1] - low;

def plusDM = if hiDiff > loDiff and hiDiff > 0 then hiDiff else 0;
def minusDM =  if loDiff > hiDiff and loDiff > 0 then loDiff else 0;

def ATR = MovingAverage(averageType, TrueRange(high, close, low), length);
def diPlus = 100 * MovingAverage(averageType, plusDM, length) / ATR;
def diMinus = 100 * MovingAverage(averageType, minusDM, length) / ATR;
plot "DI+" = if diPlus > 20 then diPlus else Double.NaN;
plot "DI-" = if diMinus > 20 then diMinus else Double.NaN;

def DX = if (diPlus + diMinus > 0) then 100 * AbsValue(diPlus - diMinus) / (diPlus + diMinus) else 0;
plot ADXCalc = MovingAverage(averageType, DX, length);
#plot ADX = if ADXCalc > ADXLevel then ADXCalc else Double.NaN;
plot triggerline = ADXLevel;

Alert(alerts and ADXCalc crosses above ADXLevel, " ", Alert.BAR, Sound.Ring);
Alert(alerts and ADXCalc > ADXLevel and "DI+" crosses "DI-", " ", Alert.BAR, Sound.Ring);

"DI+".SetDefaultColor(GetColor(1));
"DI+".SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
"DI+".SetDefaultColor(Color.GREEN);
"DI-".SetDefaultColor(GetColor(8));
"DI-".SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
"DI-".SetDefaultColor(Color.RED);
ADXCalc.DefineColor("Trending", Color.YELLOW);
ADXCalc.DefineColor("NonTrending", Color.GRAY);
ADXCalc.AssignValueColor(if ADXCalc >= 20 then ADXCalc.Color("Trending") else ADXCalc.Color("NonTrending"));
ADXCalc.SetLineWeight(2);
triggerline.SetDefaultColor(Color.WHITE);

DefineGlobalColor("Positive", Color.UPTICK);
DefineGlobalColor("Negative", Color.DOWNTICK);
AssignPriceColor(if !paintBars
    then Color.CURRENT
    else if diPlus > diMinus
        then GlobalColor("Positive")
        else GlobalColor("Negative"));