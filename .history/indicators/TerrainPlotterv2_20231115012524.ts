#--------------------------------------------------------------------------------------------------
# Trade Terrain Plotter
# TraderZen
# V 2.0
# High and Low Squeeze levels.
#--------------------------------------------------------------------------------------------------

    input Calculation_Base = { "vwap", default "close" };

def H200 = highest(close, 200);
def H100 = highest(close, 100);
def H50 = highest(close, 50);
def H20 = highest(close, 20);
def L200 = Lowest(close, 200);
def L100 = Lowest(close, 100);
def L50 = Lowest(close, 50);
def L20 = Lowest(close, 20);
plot C = if calculation_Base == calculation_Base.vwap then VWAP else CLOSE;

Plot PH200 = H200;
Plot PH100 = H100;
Plot PH50 = H50;
Plot PH20 = H20;

PH200.AssignValueColor(If H200 > H200[1] then color.Dark_green else if H200 < H200[1] then color.Dark_red else color.dark_gray);
PH100.AssignValueColor(If H100 > H100[1] then color.green else if H100 < H100[1] then color.red else color.gray);
PH50.AssignValueColor(If H50 > H50[1] then color.light_green else if H50 < H50[1] then color.light_red else color.light_gray);
PH20.AssignValueColor(If H20 > H20[1] then color.lime else if H20 < H20[1] then color.pink else color.current);

Plot PL200 = L200;
Plot PL100 = L100;
Plot PL50 = L50;
Plot PL20 = L20;
# Plot MM = (H50 + L50) / 2;
Plot MM = (H20 + L20) / 2;

PL200.AssignValueColor(If L200 > L200[1] then color.Dark_green else if L200 < L200[1] then color.Dark_red else color.dark_gray);
PL100.AssignValueColor(If L100 > L100[1] then color.Green else if L100 < L100[1] then color.red else color.gray);
PL50.AssignValueColor(If L50 > L50[1] then color.light_green else if L50 < L50[1] then color.light_red else color.light_gray);
PL20.AssignValueColor(If L20 > L20[1] then color.lime else if L20 < L20[1] then color.pink else color.current);

MM.SetPaintingStrategy(PaintingStrategy.LINE);
MM.AssignValueColor(If C > MM then color.cyan else color.Magenta);

#Def cond = if H50 - C < C - L50 then yes else no;
Def cond = if H20 - C < C - L20 then yes else no;

C.AssignValueColor(if cond then color.upTICK else color.DownTICK);

AddCloud(C, PH20, color.gray, color.dark_gray, no);
AddCloud(C, PL20, color.gray, color.dark_gray, no);
AddCloud(PH50, PH20, color.light_red, color.light_green, no);
AddCloud(PL50, PL20, color.light_red, color.light_green, no);
AddCloud(PH100, PH50, color.red, color.green, no);
AddCloud(PL100, PL50, color.red, color.green, no);
AddCloud(PH200, PH100, color.dark_red, Color.dark_green, no);
AddCloud(PL200, PL100, color.dark_red, Color.dark_green, no);

PH50.SetStyle(curve.points);
PL50.SetStyle(curve.points);
c.hide();

#AddChartBubble(cond && cond != cond[1], low, "Up", color.UpTick);
#AddChartBubble(!(cond) && cond != cond[1], high, "Down", color.DownTick);

AddLabel(yes, "Impulse:" + if c / (h50 + l50) >= .5 then "Up" else "Down",
               if c / (h50 + l50) >= .5 then color.uptiCK else color.downTICK);

##### ------Pattern finder
Def HLevel1 = if  c / (h50 + l50) >= .5 then yes else no;
Def HLevel2 = if H50 >= H100 then yes else No;
Def HLevel3 = if H100 >= H200 then yes else no;

Def LLevel1 = if  c / (h50 + l50) <= .5 then yes else no;
Def LLevel2 = if L50 <= L100 then Yes else no;
Def LLevel3 = if L100 <= L200 then Yes else no;

Def UpTrendLevel = If HLevel1 && HLevel2 && HLevel3 then 4
               else if HLevel2 && HLevel3 then 3     
               else if Hlevel1 && HLevel2 then 2
               else if HLevel1 then 1
               else 0; 

Def DnTrendLevel = If LLevel1 && LLevel2 && LLevel3 then 4
               else if LLevel2 && LLevel3 then 3
               else if Llevel1 && LLevel2 then 2
               else if LLevel1 then 1
               else 0;

AddLabel(yes, "UpTrend Level: " + UpTrendLevel + " DnTrend Level: " + DnTrendLevel,  if upTrendLevel > DnTrendLevel then color.uptiCK else color.downTICK);

def HSqueeze =      if !isNan(HSqueeze[1]) and H20 > H20[1] then HSqueeze[1] + 1
             else if !isNan(HSqueeze[1]) and H20 < H20[1] then HSqueeze[1] - 1   
             else HSqueeze[1];
def LSqueeze =     if !isNan(LSqueeze[1]) and L20 < L20[1] then LSqueeze[1] - 1
             else if !isNan(LSqueeze[1]) and L20 > L20[1] then LSqueeze[1] + 1   
             else LSqueeze[1];
AddLabel(yes, "HSqueeze: " + HSqueeze + ", LSqueeze: " + LSqueeze,
     if HSqueeze > HSqueeze[1] && LSqueeze > LSqueeze[1] then color.uptick
else if HSqueeze < HSqueeze[1] && LSqueeze < LSqueeze[1] then color.downTICK
else color.yeLLOW); 
 
# Happy Trading.TZ 11 / 29 / 2022