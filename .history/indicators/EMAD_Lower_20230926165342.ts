#EMAD_Range Created by Christopher84 01 /05 / 2022
#EMAD_Range(V2) - Modified 4 / 25 / 23 by HODL - Colors & Bubbles
declare lower;

input Bubbles = no;

input length8 = 10;
input length9 = 35;
input length10 = 12;
input show_ema_cloud = yes;
def price1 = close;
def coloredCandlesOn = no;
def bars_back_z = 10;
def bars_back = 8;
def bars_back_2 = 20;
input length = 14;
input averageType = AverageType.WILDERS;
def agperiod1 = AggregationPeriod.DAY;

def bn = barnumber();
def showBreakoutSignals = no;
def displace = 0;
def AvgExp8 = ExpAverage(price1[-displace], length8);
def UPD = AvgExp8[1] < AvgExp8;
def AvgExp9 = ExpAverage(price1[-displace], length9);
def UPW = AvgExp9[1] < AvgExp9;
def Below = AvgExp8 < AvgExp9;
def Spark = UPD + UPW + Below;
def UPEMA = AvgExp8[1] < AvgExp8;
def DOWNEMA = AvgExp8[1] > AvgExp8;
def UPEMA2 = AvgExp9[1] < AvgExp9;
def DOWNEMA2 = AvgExp9[1] > AvgExp9;
def EMAD = (price1 - AvgExp8);
def UPEMAD = EMAD >= EMAD[1];
def DOWNEMAD = EMAD < EMAD[1];
def EMAD2 = (price1 - AvgExp9);
def UPEMAD2 = EMAD2 >= EMAD2[1];
def DOWNEMAD2 = EMAD2 < EMAD2[1];
def EMADAvg = (EMAD + EMAD2) / 2;
def UPEMADAvg = EMADAvg >= EMADAvg[1];
def DOWNEMADAvg = EMADAvg < EMADAvg[1];

plot EMADSmooth = ExpAverage(EMADAvg[-displace], length10);

def price = EMADSmooth;
def o = (EMADSmooth + EMADSmooth[1]) / 2;
def h = Max(EMADSmooth, EMADSmooth[1]);
def l = Min(EMADSmooth, EMADSmooth[1]);
def c = EMADSmooth;
def bottom = Min(c[1], l);
def tr = TrueRange(h, c, l);
def ptr = tr / (bottom + tr / 2);
def APTR = MovingAverage(averageType, ptr, length);
def UpperBand = c[1] + (APTR * o);
def LowerBand = c[1] - (APTR * o);

###############################################################################################################################
plot MidBand = (UpperBand + LowerBand) / 2;
MidBand.AssignValueColor(if (MidBand > EMADSmooth) then Color.RED
else if (MidBand < EMADSmooth) then Color.GREEN else Color.GRAY);
EMADSmooth.AssignValueColor(if (MidBand > EMADSmooth) then Color.RED
else if (MidBand < EMADSmooth) then Color.GREEN else Color.GRAY);
AddCloud(if show_ema_cloud and(MidBand > EMADSmooth) then MidBand else Double.NaN, EMADSmooth, Color.RED, Color.CURRENT);
AddCloud(if show_ema_cloud and(EMADSmooth >= MidBand) then EMADSmooth else Double.NaN, MidBand, Color.GREEN, Color.CURRENT);
plot ZeroLine = 0;
ZeroLine.AssignValueColor(if (EMADSmooth > ZeroLine) then Color.GREEN
else if (EMADSmooth < ZeroLine) then Color.RED else Color.YELLOW);
###############################################################################################################################

def BulgeLength = 100;
def SqueezeLength = 100;
def BulgeLength2 = 200;
def SqueezeLength2 = 200;
#Ema <> zeroline
def EMADSUp = EMADSmooth > ZeroLine;
def EMADSUP_bn = if EMADSUP then bn else EMADSUP_bn[1];
def EMADSDown = EMADSmooth < ZeroLine;
def EMADSDown_bn = if EMADSDown then bn else EMADSDown_bn[1];
#Ema direction
def EMADdown = (MidBand > EMADSmooth);
def EMADup = (EMADSmooth >= MidBand);

#Top Line
plot Bulge = Highest(MidBand, BulgeLength);
#Bottom Line
plot Squeeze = Lowest(MidBand, SqueezeLength);

#Top line moving
def bulge_Step_DN = if Bulge < Bulge[1] then 1 else 0;
def bulge_Step_UP = if Bulge > Bulge[1] then 1 else 0;
#Bottom line moving
def Squeeze_Step_DN = if Squeeze < Squeeze[1] then 1 else 0;
def Squeeze_Step_UP = if Squeeze > Squeeze[1] then 1 else 0;

#Top line end of move down
def bulge_Step_DN_end = if bulge_Step_DN < bulge_Step_DN[1] then 1 else 0;
def bulge_Step_DN_end_bn = if bulge_Step_DN_end then bn else bulge_Step_DN_end[1];
#Top line begining of move down
def bulge_Step_DN_begin = if bulge_Step_DN > bulge_Step_DN[1] then 1 else 0;
def bulge_Step_DN_begin_bn = if bulge_Step_DN_begin then bn else bulge_Step_DN_begin[1];
#Top line end of move up
def bulge_Step_UP_end = if bulge_Step_UP < bulge_Step_UP[1] then 1 else 0;
def bulge_Step_UP_end_bn = if bulge_Step_UP_end then bn else bulge_Step_UP_end[1];
#Top line begining of move up
def bulge_Step_UP_begin = if bulge_Step_UP > bulge_Step_UP[1] then 1 else 0;
def bulge_Step_UP_begin_bn = if bulge_Step_UP_begin then bn else bulge_Step_UP_begin[1];
#Bottom line end of move down
def Squeeze_Step_DN_end = if Squeeze_Step_DN < Squeeze_Step_DN[1] then 1 else 0;
def Squeeze_Step_DN_end_bn = if Squeeze_Step_DN_end then bn else Squeeze_Step_DN_end[1];
#Bottom line begining of move down
def Squeeze_Step_DN_begin = if Squeeze_Step_DN > Squeeze_Step_DN[1] then 1 else 0;
def Squeeze_Step_DN_begin_bn = if Squeeze_Step_DN_begin then bn else Squeeze_Step_DN_begin[1];
#Bottom line end of move up
def Squeeze_Step_UP_end = if Squeeze_Step_UP < Squeeze_Step_UP[1] then 1 else 0;
def Squeeze_Step_UP_end_bn = if Squeeze_Step_UP_end then bn else Squeeze_Step_UP_end[1];
#Bottom line begining of move up
def Squeeze_Step_UP_begin = if Squeeze_Step_UP > Squeeze_Step_UP[1] then 1 else 0;
def Squeeze_Step_UP_begin_bn = if Squeeze_Step_UP_begin then bn else Squeeze_Step_UP_begin[1];
#If both top and bottom line are going the same direction color x
def BS_Down = Squeeze_Step_DN and bulge_Step_DN;
def BS_UP = Squeeze_Step_UP and bulge_Step_UP;

#Squeeze_Step_UP_end_bn or Squeeze_Step_UP_begin_bn
def Bull_Bias = (Squeeze > zeroline);
def Bear_Bias = (Bulge < zeroline);

###############################################################################################################################
Bulge.AssignValueColor(if (BS_Down) then Color.dark_red
else if (BS_UP) then color.Dark_green
else if (bulge_Step_UP) then Color.GREEN
else if (bulge_Step_DN) then Color.RED
else if (Bear_Bias) then color.yellow
else Color.light_Gray);
Squeeze.AssignValueColor(if (BS_Down) then Color.dark_red
else if (BS_UP) then color.Dark_green
else if (Squeeze_Step_UP) then Color.GREEN
else if (Squeeze_Step_DN) then Color.RED
else if (Bull_Bias) then color.yellow
else Color.light_Gray);
###############################################################################################################################

#Cross
def CrossUP = if (MidBand[1] > EMADSmooth[1]) and(MidBand < EMADSmooth) then 1 else 0;
def CrossDOWN = if (EMADSmooth[1] > MidBand[1]) and(EMADSmooth < MidBand) then 1 else 0;
#value at cross
Def ValueUP = if crossup then midband else 0;
Def ValueDown = if crossdown then midband else 0;

Def ValueUPz = if crossup then emadsmooth else 0;
Def ValueDownz = if crossdown then emadsmooth else 0;

#determine if cross touching line
def CrossUPline = if (ValueUP - squeeze) == 0 then 1 else 0;
def CrossDownline = if (ValueDown - bulge) == 0 then 1 else 0;
def CrossUPzline = if (ValueUPz) == 0 then 1 else 0;
def CrossDownzline = if (ValueDownz) == 0 then 1 else 0;

#band value at cross
def CrossUPline1 = (ValueUP - squeeze);
def CrossUPline2 = (ValueUP - squeeze);
def CrossDownline2 = (ValueDown - bulge);
def CrossDownline3 = (bulge - ValueDown);

#Value at cross
def Cross_Value_DN = if CrossDownline then CrossDownline2 else Cross_Value_DN[1];
def Cross_Value_DN_2 = if Crossdown then CrossDownline2 else Cross_Value_DN_2[1];
#bar number at cross
def CrossUPline_bn = if CrossUPline then bn else CrossUPline_bn[1];
def CrossDownline_bn = if CrossDownline then bn else CrossDownline_bn[1];
#Condition to hide band value if the crossover is at line
def hide_Lable_bn = if CrossUPline == 0 then 1 else 0;
def hide_Lable_bn2 = if CrossDownline == 0 then 1 else 0;
#Crossover not at line
def Cross_HL_bn =  if CrossUP then bn else Cross_HL_bn[1];
def Cross_LH_bn =  if CrossDown then bn else Cross_LH_bn[1];
#Ema direction
def Cross_Down_Cond1 = EMADdown > EMADdown[1];
def Cross_UP_Cond1 = EMADup > EMADup[1];
#which cross at line is most recent
def condition3lineUP = CrossUPline_bn > CrossDownline_bn;
def condition3lineDown = CrossDownline_bn > CrossUPline_bn;
#Bar number for condition to hide short term crossovers
def condition3lineUP2 = Cross_HL_bn - CrossUPline_bn;
def condition3lineDown22 = Cross_LH_bn - CrossDownline_bn;
#Condition to hide short term crossovers
def conditionUPxbars2 = if condition3lineUP2 >= bars_back then 1 else 0;
def conditionDownxbars22 = if condition3lineDown22 >= bars_back_2 then 1 else 0;

def StepDownEndSq = if squeeze_Step_dn_end[1] and!squeeze_Step_dn_end then 1 else 0;
def stepDownbn = if StepDownEndSq then bn else stepdownbn[1];

def StepupEndSq = if squeeze_Step_UP_end[1] and!squeeze_Step_UP_end then 1 else 0;
def stepUPbn = if StepUPEndSq then bn else stepUPbn[1];

def StepDownEndBg = if bulge_Step_dn_end[1] and!bulge_Step_dn_end then 1 else 0;
def stepDownbnBG = if StepDownEndBg then bn else stepDownbnBG[1];

def StepupEndBG = if bulge_Step_up_end[1] and!bulge_Step_up_end then 1 else 0;
def stepUPbnBG = if StepupEndBG then bn else stepUPbnBG[1];


def setuplastsq = if (stepUPbn > stepDownbn) then 1 else 0;
def setdownlastsq = if (stepDownbn > stepupbn) then 1 else 0;

def setuplastBG = if (stepUPbnBG > stepDownbnBG) then 1 else 0;
def setdownlastBG = if (stepDownbnBG > stepUPbnBG) then 1 else 0;

def up_1 = if crossup and!CrossUPline and condition3lineUP and(setuplastBG or setuplastsq) then 1 else 0;
def up_1bn = if up_1 then bn else up_1bn[1];

def dn_1 = if Crossdown and!CrossDownline and condition3lineDown and(setdownlastBG or setdownlastsq) then 1 else 0;
def dn_1bn = if dn_1 then bn else dn_1bn[1];

def hideup = if  up_1 and(up_1[1] or up_1[2] or up_1[3] or up_1[4]) then 0 else 1;
def hidedn = if  dn_1 and(dn_1[1] or dn_1[2] or dn_1[3] or dn_1[4]) then 0 else 1;

#value at cross for logic
def CrossUP_Value = if (Cross_UP_Cond1
and conditionUPxbars2
and hide_Lable_bn
and condition3lineUP
and Crossup) then midband else CrossUP_Value[1];

def Cross_UP_1 = if CrossUP_Value == midband then 1 else 0;
def Cross_UP_1_bn = if Cross_UP_1 then bn else Cross_UP_1_bn[1];


def Cross_UP_1_Step = if (Cross_UP_1_bn - Squeeze_Step_UP_end_bn) <= Bars_back then 1 else 0;

def CrossDown_Value = if (Cross_Down_Cond1 and conditionDownxbars22
and condition3lineDown and hide_Lable_bn2 and CrossDown) then midband else CrossDown_Value[1];

def Cross_Down_1 = if CrossDown_Value == midband then 1 else 0;
def Cross_Down_1_bn = if Cross_Down_1 then bn else Cross_Down_1_bn[1];

def Cross_Down_1_Step = if (Cross_Down_1_bn - Squeeze_Step_DN_end_bn) <= Bars_back then 1 else 0;

###############################################################################################################################
def Top_UP_1 = if (bulge_Step_UP_begin) then 1 else 0;
#AddVerticalLine(Top_UP_1, "", Color.GREEN, Curve.SHORT_DASH);
def Top_UP_2 = if (bulge_Step_UP_end) then 1 else 0;
#AddVerticalLine(Top_UP_2, "", Color.red, Curve.SHORT_DASH);
def Top_DN_1 = if (bulge_Step_DN_begin) then 1 else 0;
#AddVerticalLine(Top_DN_1, "", Color.cyan, Curve.SHORT_DASH);
def Top_DN_2 = if (bulge_Step_DN_end) then 1 else 0;
#AddVerticalLine(Top_DN_2, "", Color.magenta, Curve.SHORT_DASH);
def Bottom_DN_1 = if (Squeeze_Step_UP_begin) then 1 else 0;
#AddVerticalLine(Bottom_DN_1, "", Color.orange, Curve.SHORT_DASH);
def Bottom_DN_2 = if (Squeeze_Step_UP_end) then 1 else 0;
#AddVerticalLine(Bottom_DN_2, "", Color.yellow, Curve.SHORT_DASH);
def Bottom_UP_1 = if (Squeeze_Step_DN_begin) then 1 else 0;
#AddVerticalLine(Bottom_UP_1, "", Color.white, Curve.SHORT_DASH);
def Bottom_UP_2 = if (Squeeze_Step_DN_end) then 1 else 0;
#AddVerticalLine(Bottom_UP_2, "", Color.gray, Curve.SHORT_DASH);
###############################################################################################################################
#cross at zero
def Prev_Step_Bottom_UP = if (Squeeze_Step_UP_end_bn < Squeeze_Step_DN_end_bn) then 1 else 0;
def Prev_Step_Bottom_UP_B = if (Squeeze_Step_UP_begin_bn > Squeeze_Step_DN_begin_bn) then 1 else 0;

def Prev_Step_Top_UP = if (Bulge_Step_UP_end_bn > Bulge_Step_DN_end_bn) then 1 else 0;
def Prev_Step_Top_UP_B = if (Bulge_Step_UP_begin_bn > Bulge_Step_DN_begin_bn) then 1 else 0;

#wrong... not the gap bet them just location within range
def percent_ema = (((midband - squeeze) / (bulge - squeeze)) * 100);
def percent_ema2 = (((emadsmooth - squeeze) / (bulge - squeeze)) * 100);

def crossupline_filter = if crossupline and(crossupline[1] or crossupline[2]  or crossupline[3]   or crossupline[4])then 0 else 1;
def crossdownline_filter = if Crossdownline and(Crossdownline[1] or Crossdownline[2]  or Crossdownline[3]   or Crossdownline[4])then 0 else 1;


addchartbubble(bubbles and Crossupline and crossupline_filter, midband, " Wait for HL ", color.light_Green);
addchartbubble(bubbles and Crossdownline and crossdownline_filter, midband, " Wait for LH ", Color.light_red);
