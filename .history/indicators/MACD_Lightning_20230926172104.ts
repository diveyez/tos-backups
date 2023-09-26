# MACD Divergence

# Lightning Alertz 

 

input n = 2; 

input fastLength = 12; 

input slowLength = 26; 

input MACDLength = 9; 

input averageType = AverageType.EXPONENTIAL; 

 

def h = high; 

def l = low; 

def bar = barNumber(); 

def Diff = MACD(fastLength, slowLength, MACDLength, averageType).Diff; 

def CurrMACDh = if Diff > 0 

                then fold i = 1 to n + 1

with p = 1 

                while p  

                do Diff > getValue(Diff, -i) 

                else 0;  

def CurrMACDPivotH = if (bar > n and

Diff == highest(Diff, n) and  

                         CurrMACDh)  

                     then h  

                     else double.NaN; 

def CurrMACDl = if Diff < 0 

                then fold j = 1 to n + 1

with q = 1 

                while q  

                do Diff < getValue(Diff, -j) 

                else 0; 

def CurrMACDPivotL = if (bar > n and

Diff == lowest(Diff, n) and  

                         CurrMACDl)  

                     then l  

                     else double.NaN; 

def CurrPHBar = if !isNaN(CurrMACDPivotH)  

                then bar  

                else CurrPHBar[1]; 

def CurrPLBar = if !isNaN(CurrMACDPivotL)  

                then bar  

                else CurrPLBar[1]; 

def PHpoint = if !isNaN(CurrMACDPivotH)  

              then CurrMACDPivotH  

              else PHpoint[1]; 

def priorPHBar = if PHpoint != PHpoint[1]  

                 then CurrPHBar[1]  

                 else priorPHBar[1]; 

def PLpoint = if !isNaN(CurrMACDPivotL)  

              then CurrMACDPivotL  

              else PLpoint[1]; 

def priorPLBar = if PLpoint != PLpoint[1]  

                 then CurrPLBar[1]  

                 else priorPLBar[1]; 

def HighPivots = bar >= highestAll(priorPHBar); 

def LowPivots = bar >= highestAll(priorPLBar); 

def pivotHigh = if HighPivots  

                then CurrMACDPivotH  

                else double.NaN; 

plot PlotHline = pivotHigh;

PlotHline.enableApproximation();

PlotHline.SetDefaultColor(GetColor(0));

PlotHline.SetStyle(Curve.Short_DASH); 

plot pivotLow = if LowPivots  

                then CurrMACDPivotL  

                else double.NaN;

pivotLow.enableApproximation();

pivotLow.SetDefaultColor(GetColor(6));

pivotLow.SetStyle(Curve.Short_DASH); 

plot PivotDot = if !isNaN(pivotHigh)  

                then pivotHigh  

                else if !isNaN(pivotLow)  

                     then pivotLow 

                     else double.NaN;

pivotDot.SetDefaultColor(GetColor(7));

pivotDot.SetStyle(Curve.SHORT_DASH);

pivotDot.SetLineWeight(3); 

## arrows

def signal2 = pivothigh;
plot Signal2_ = if signal2 == signal2 then signal2 else Double.NaN;
Signal2_.SetDefaultColor(Color.RED);
Signal2_.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
Signal2_.SetLineWeight(3);

def signal1 = pivotLow;
plot Signal1_ = if signal1  then(signal1) else Double.NaN;
Signal1_.SetDefaultColor(Color.GREEN);
Signal1_.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
Signal1_.SetLineWeight(3);




# End Code Pivots with Projections 