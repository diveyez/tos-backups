# RSI_With_Divergence 

# Mobius 

# V01.01.2013 

# 4.15.2019

#hint: <b>RSI with Divergence < /b> 

# Note: Install this as a new study.Save this study using the name above (the first line of code RSI_With_Divergence). 

# To use this study as a scan; DO NOT TRY TO LOAD IT DIRECTLY IN THE SCANNER, IT WILL THROW AN ERROR MESSAGE.Go to the scan tab.Delete any existing scan criteria.Click Add Study Filter.Click the window under Criteria.In that drop down menu click Custom.Delete the existing study.Click Add Condition.Click the down arrow in the Select A Condition window.Click Study.Scroll down the List till you find RSI_With_Divergence and click it.Click on the Plot window and you can choose Dhigh or Dlow in addition to the default plot RSI.If you choose either of the divergence siganls choose is True from the center column.Click on the aggregation period at the top left and set the aggregation period you want scaned.Then click Save and when the popup window shows the warning that this is a custom scan chose OK.Now put the list of stocks you wish to scan in the Scan In box and chose any list you want that to intersect with.If you wish to make this a Dynamic WatchList, save this scan with a name such as RSI_With_Div_WL then in your Gadgets box click the little gear icon, locate the name of the scan you just saved and click it.As equities match the scan criteria they will populate the list.



declare lower; 

 

input n = 14; #hint nRSI: Periods or length for RSI 

input Over_Bought = 70; #hint Over_Bought: Over Bought line 

input Over_Sold = 30; #hint Over_Sold: Over Sold line 

 

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

