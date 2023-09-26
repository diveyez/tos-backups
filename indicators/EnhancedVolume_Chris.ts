

#Chris' Enhanced Volume V.2 /w Uptick/Downtick

declare on_volume;

###############
#DPL CRITERIA #
###############
input Audible_Alert = yes;
def Deviation_Length = 60;
def Deviate = 2;
def volumestdev = RelativeVolumeStDev(length = Deviation_Length);
def abovedev = volumestdev >= Deviate;
def belowdev = volumestdev <= Deviate;

############
# DPL BARS #
############
def increase = volume > volume[1];
def devincrease = increase and abovedev;
def decrease = volume < volume[1];
def devdecrease = decrease and abovedev;

##############################
# UPTICK / DOWNTICK CRITERIA #
##############################
def O = open;
def H = high;
def C = close;
def L = low;
def V = volume;
def Buying = V * (C - L) / (H - L);
def Selling = V * (H - C) / (H - L);

##################
# Selling Volume #
##################
plot SV = Selling;
SV.DefineColor("Decrease", Color.RED);
SV.DefineColor("DevDecrease", Color.pink);
SV.AssignValueColor(if devdecrease then SV.Color("DevDecrease") else SV.Color("Decrease"));
SV.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
SV.HideTitle();
SV.HideBubble();
SV.SetLineWeight(5);

#################
# Buying Volume #
#################
DefineGlobalColor("LabelGreen", CreateColor(0, 165, 0));
plot BV = Buying;
BV.DefineColor("Increase", GlobalColor("LabelGreen"));
BV.DefineColor("DevIncrease", Color.light_GREEN);
BV.AssignValueColor(if devincrease then BV.Color("DevIncrease") else BV.Color("Increase"));
BV.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
BV.HideTitle();
BV.HideBubble();
BV.SetLineWeight(5);

#################
# Adding Volume Labels #
#################

input Show_Labels = yes;
AddLabel(Show_Labels, "Buy Vol = " + Round(Buying, 0),
if Buying > Selling then GlobalColor("LabelGreen") else color.red);

AddLabel(Show_Labels, "Buy %: " + Round((Buying / (Buying + Selling)) * 100, 2), If(Buying / (Buying + Selling)) * 100 > 60 then GlobalColor("LabelGreen") else color.red);

AddLabel(Show_Labels, "Sell Vol = " + Round(Selling, 0),
if Selling > Buying then GlobalColor("LabelGreen") else color.red);

AddLabel(Show_Labels, "Sell %: " + Round((Selling / (Selling + Buying)) * 100, 2), If(Selling / (Selling + Buying)) * 100 > 60 then GlobalColor("LabelGreen") else color.RED);

