# RSI_With_Divergence 

# Mobius 

# V01.01.2013 

# 4.15.2019

#hint: <b>RSI with Divergence < /b> 

# Note: Install this as a new study.Save this study using the name above (the first line of code RSI_With_Divergence). 

# To use this study as a scan; DO NOT TRY TO LOAD IT DIRECTLY IN THE SCANNER, IT WILL THROW AN ERROR MESSAGE.Go to the scan tab.Delete any existing scan criteria.Click Add Study Filter.Click the window under Criteria.In that drop down menu click Custom.Delete the existing study.Click Add Condition.Click the down arrow in the Select A Condition window.Click Study.Scroll down the List till you find RSI_With_Divergence and click it.Click on the Plot window and you can choose Dhigh or Dlow in addition to the default plot RSI.If you choose either of the divergence siganls choose is True from the center column.Click on the aggregation period at the top left and set the aggregation period you want scaned.Then click Save and when the popup window shows the warning that this is a custom scan chose OK.Now put the list of stocks you wish to scan in the Scan In box and chose any list you want that to intersect with.If you wish to make this a Dynamic WatchList, save this scan with a name such as RSI_With_Div_WL then in your Gadgets box click the little gear icon, locate the name of the scan you just saved and click it.As equities match the scan criteria they will populate the list.



declare lower; 

 

input n = 9; #hint nRSI: Periods or length for RSI 

input Over_Bought = 85; #hint Over_Bought: Over Bought line 

input Over_Sold = 15; #hint Over_Sold: Over Sold line 

 

def o = open; 

def h = high; 

def l = low; 

def c = close; 

def x = BarNumber(); 

def MidLine = 50; 

def NetChgAvg = ExpAverage(c - c[1], n); 

def TotChgAvg = ExpAverage(AbsValue(c - c[1]), n); 

def ChgRatio = if TotChgAvg != 0  

                  then NetChgAvg / TotChgAvg  

                  else 0; 

plot RSI = 50 * (ChgRatio + 1);

RSI.AssignValueColor(if RSI < Over_Sold 

                     then color.yellow 

                     else if RSI > Over_Bought 

                     then color.yellow 

                     else createColor(25, 75, 250)); 

plot OverSold = Over_Sold; 

plot OverBought = Over_Bought; 

def bar = BarNumber(); 

def Currh = if RSI > OverBought 

                then fold i = 1 to Floor(n / 2)

with p = 1 

                while p  

                do RSI > getValue(RSI, -i) 

                else 0;  

def CurrPivotH = if (bar > n and

RSI == highest(RSI, Floor(n / 2)) and  

                         Currh)  

                     then RSI  

                     else double.NaN; 

def Currl = if RSI < OverSold 

                then fold j = 1 to Floor(n / 2)

with q = 1 

                while q  

                do RSI < getValue(RSI, -j) 

                else 0; 

def CurrPivotL = if (bar > n and

RSI == lowest(RSI, Floor(n / 2)) and  

                         Currl)  

                     then RSI  

                     else double.NaN; 

def CurrPHBar = if !isNaN(CurrPivotH)  

                then bar  

                else CurrPHBar[1]; 

def CurrPLBar = if !isNaN(CurrPivotL)  

                then bar  

                else CurrPLBar[1]; 

def PHpoint = if !isNaN(CurrPivotH)  

              then CurrPivotH  

              else PHpoint[1]; 

def priorPHBar = if PHpoint != PHpoint[1]  

                 then CurrPHBar[1]  

                 else priorPHBar[1]; 

def PLpoint = if !isNaN(CurrPivotL)  

              then CurrPivotL  

              else PLpoint[1]; 

def priorPLBar = if PLpoint != PLpoint[1]  

                 then CurrPLBar[1]  

                 else priorPLBar[1]; 

def HighPivots = bar >= highestAll(priorPHBar); 

def LowPivots = bar >= highestAll(priorPLBar); 

def pivotHigh = if HighPivots  

                then CurrPivotH  

                else double.NaN; 

plot PlotHline = pivotHigh;

PlotHline.enableApproximation();

PlotHline.SetDefaultColor(GetColor(7));

PlotHline.SetStyle(Curve.Short_DASH); 

plot pivotLow = if LowPivots  

                then CurrPivotL  

                else double.NaN;

pivotLow.enableApproximation();

pivotLow.SetDefaultColor(GetColor(7));

pivotLow.SetStyle(Curve.Short_DASH); 

plot PivotDot = if !isNaN(pivotHigh)  

                then pivotHigh  

                else if !isNaN(pivotLow)  

                     then pivotLow 

                     else double.NaN;

pivotDot.SetDefaultColor(GetColor(7));

pivotDot.SetPaintingStrategy(PaintingStrategy.POINTS);

pivotDot.SetLineWeight(3); 

 

# End Code RSI with Divergence 

 #https://www.tradingview.com/v/XBP7E1JB/
#//@Dziwne
# Author | © Dziwne— — —
#// Glaz's QQE : https://fr.tradingview.com/script/tJ6vtBBe-QQE/
#// Mihkel00's QQE MOD : https://www.tradingview.com/script/TpUW4muw-QQE-MOD/
#// Dziwne's MFI : https://www.tradingview.com/script/fCtJdxar/
# / indicator(title = 'RSI, BB QQE Mod (highlight) v1.0 [Dziwne]', shorttitle = 'RSI, BB-QQE Mod [Dziwne]'
# Converted by Sam4Cok@Samer800 - 04 / 2023
#declare lower;
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

#def rsi = RSI(Price = source, Length = rsi_length);
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

#def oversold = rsi_ma < level_oversold;
#def overbought = rsi_ma > level_overbought;

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

AddCloud(if color_highlight_rsi_OBOS > 0 then pos else na, neg, Color.black);  # 'Overbought/Oversold, Highlight')
AddCloud(if color_highlight_rsi_OBOS < 0 then pos else na, neg, Color.black);    # 'Overbought/Oversold, Highlight')

#// Bar Color
AssignPriceColor(if !ColorBars then Color.CURRENT else
if color_line_bb > 0 then Color.GREEN else
if color_line_bb < 0 then Color.RED else Color.DARK_GRAY);

#-- - END of CODE

# RSI Bands and Double RSI SMA Cross Short Term Trades

#declare lower;
#RSI
input length = 9;
#input over_Bought = 80;
#input over_Sold = 20;
input price = close;
input averageType = AverageType.WILDERS;
input line = 50;

#def NetChgAvg = MovingAverage(averageType, price - price[1], length);
#def TotChgAvg = MovingAverage(averageType, AbsValue(price - price[1]), length);
#def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;

#plot RSI = 50 * (ChgRatio + 1);
#plot OverSold = over_Sold;
#plot OverBought = over_Bought;
plot lline = 50;


# ==== THE FIVE ====
RSI.DefineColor("Positive and Up", Color.white);
RSI.DefineColor("Positive and Down", Color.YELLOW);
RSI.DefineColor("Negative and Down", Color.white);
RSI.DefineColor("Negative and Up", Color.YELLOW);
RSI.AssignValueColor(if RSI >= 50 then if RSI > RSI[1] then RSI.Color("Positive and Up") else RSI.Color("Positive and Down") else if RSI < RSI[1] then RSI.Color("Negative and Down") else RSI.Color("Negative and Up"));

OverSold.SetDefaultColor(GetColor(8));
OverBought.SetDefaultColor(GetColor(8));

# RSI 2
input length2 = 3;
input over_Bought2 = 70;
input over_Sold2 = 30;
input price2 = close;
input averageType2 = AverageType.WILDERS;

def NetChgAvg2 = MovingAverage(averageType2, price2 - price2[1], length2);
def TotChgAvg2 = MovingAverage(averageType2, AbsValue(price2 - price2[1]), length2);
def ChgRatio2 = if TotChgAvg2 != 0 then NetChgAvg2 / TotChgAvg2 else 0;

plot RSI2 = 50 * (ChgRatio2 + 1);
plot OverSold2 = over_Sold;
plot OverBought2 = over_Bought;


RSI2.DefineColor("Positive and Up", Color.black);
RSI2.DefineColor("Positive and Down", Color.YELLOW);
RSI2.DefineColor("Negative and Down", Color.black);
RSI2.DefineColor("Negative and Up", Color.YELLOW);
RSI2.AssignValueColor(if RSI2 >= 50 then if RSI2 > RSI2[1] then RSI2.Color("Positive and Up") else RSI2.Color("Positive and Down") else if RSI2 < RSI2[1] then RSI2.Color("Negative and Down") else RSI2.Color("Negative and Up"));


AddCloud(RSI, RSI2, Color.GREEN, Color.RED);


#plot 5;

input AverageTypeBB = { SMA, EMA, default HMA };
input displaceBB = 0;
input lengthBB = 5;
input Num_Dev_Dn = -2.0;
input Num_Dev_up = 2.0;

plot upperBand;
plot lowerBand;
#plot midline;


switch (AverageTypeBB) {
    case SMA:
        upperBand = reference BollingerBands(RSI, displaceBB, lengthBB, Num_Dev_Dn, Num_Dev_up).UpperBand;
        lowerBand = reference BollingerBands(RSI, displaceBB, lengthBB, Num_Dev_Dn, Num_Dev_up).LowerBand;
        #midline = reference BollingerBands(RSI, displaceBB, lengthBB, Num_Dev_Dn, Num_Dev_up).Midline;
    case EMA:
        upperBand = reference BollingerBands(RSI, displaceBB, lengthBB, Num_Dev_Dn, Num_Dev_up, averageType = AverageType.EXPONENTIAL).UpperBand;
        lowerBand = reference BollingerBands(RSI, displaceBB, lengthBB, Num_Dev_Dn, Num_Dev_up, averageType = AverageType.EXPONENTIAL).LowerBand;
        #midline = reference BollingerBands(RSI, displaceBB, lengthBB, Num_Dev_Dn, Num_Dev_up, averageType = AverageType.EXPONENTIAL).Midline;
    case HMA:
        upperBand = reference BollingerBands(RSI, displaceBB, lengthBB, Num_Dev_Dn, Num_Dev_up, averageType = AverageType.EXPONENTIAL).UpperBand;
        lowerBand = reference BollingerBands(RSI, displaceBB, lengthBB, Num_Dev_Dn, Num_Dev_up, averageType = AverageType.EXPONENTIAL).LowerBand;
        #midline = reference BollingerBands(RSI, displaceBB, lengthBB, Num_Dev_Dn, Num_Dev_up, averageType = AverageType.EXPONENTIAL).Midline;
}

upperBand.SetDefaultColor(Color.CYAN);

lowerBand.SetDefaultColor(Color.CYAN);

#midline.SetDefaultColor(Color.WHITE);

