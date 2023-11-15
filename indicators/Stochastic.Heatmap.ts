#// https://www.tradingview.com/v/7PRbCBjk/
#// © Violent
#study("Stochastic Heat Map", shorttitle = "SHM", overlay = false)
# Converted by Sam4Cok @Samer800    - 05 / 2023
declare lower;

input PaintBars = yes;         # "Paint Bars"
input MovAvgType = AverageType.WEIGHTED;
input Theme = { "Theme 1", "Theme 2", default "Theme 3" };    # "Theme"
input Increment = 10;          # "Increment"
input smooth = 2;           # "Smooth Fast"
input smoothSlow = 21;          # "Smooth Slow"
input plotNumber = 28;          # "Plot Number"
input Waves = no;          # "Waves"

def na = Double.NaN;
def last = isNaN(close);
def inc = Increment;
def IncType = Waves;
def Theme1 = Theme == Theme."Theme 1";
def Theme2 = Theme == Theme."Theme 2";

DefineGlobalColor("cp1", CreateColor(1, 255, 0));
DefineGlobalColor("cp2", CreateColor(5, 217, 4));
DefineGlobalColor("cp3", CreateColor(4, 181, 4));
DefineGlobalColor("cp4", CreateColor(3, 145, 3));
DefineGlobalColor("cp5", CreateColor(2, 117, 2));

DefineGlobalColor("cn1", CreateColor(255, 5, 5));
DefineGlobalColor("cn2", CreateColor(214, 6, 6));
DefineGlobalColor("cn3", CreateColor(184, 6, 6));
DefineGlobalColor("cn4", CreateColor(145, 3, 3));
DefineGlobalColor("cn5", CreateColor(117, 2, 2));

DefineGlobalColor("cp6", CreateColor(0, 221, 255));
DefineGlobalColor("cp7", CreateColor(4, 188, 217));
DefineGlobalColor("cp8", CreateColor(4, 156, 179));
DefineGlobalColor("cp9", CreateColor(4, 127, 145));
DefineGlobalColor("cp10", CreateColor(4, 103, 117));

DefineGlobalColor("cn6", CreateColor(216, 0, 255));
DefineGlobalColor("cn7", CreateColor(187, 4, 219));
DefineGlobalColor("cn8", CreateColor(155, 5, 181));
DefineGlobalColor("cn9", CreateColor(123, 3, 143));
DefineGlobalColor("cn10", CreateColor(100, 2, 117));

DefineGlobalColor("cp11", CreateColor(207, 0, 0));
DefineGlobalColor("cp12", CreateColor(242, 88, 17));
DefineGlobalColor("cp13", CreateColor(242, 152, 17));
DefineGlobalColor("cp14", CreateColor(238, 242, 17));
DefineGlobalColor("cp15", CreateColor(58, 242, 17));

DefineGlobalColor("cn11", CreateColor(2, 38, 158));
DefineGlobalColor("cn12", CreateColor(15, 68, 245));
DefineGlobalColor("cn13", CreateColor(17, 118, 242));
DefineGlobalColor("cn14", CreateColor(0, 147, 201));
DefineGlobalColor("cn15", CreateColor(17, 231, 242));

DefineGlobalColor("fc1", Color.WHITE);
DefineGlobalColor("sc1", Color.ORANGE);
DefineGlobalColor("fc2", Color.WHITE);
DefineGlobalColor("sc2", CreateColor(33, 150, 243));
DefineGlobalColor("fc3", Color.WHITE);
DefineGlobalColor("sc3", CreateColor(255, 137, 0));

def fastColour = if Theme1 then 1 else if Theme2 then 2 else 3;
def slowColour = if Theme1 then 1 else if Theme2 then 2 else 3;

#getColour(a) =>
script getColour {
    input a = 0;
    input Theme1 = no;
    input Theme2 = no;

    def pColour1 = if Theme1 then 1 else if Theme2 then 11  else 111;
    def pColour2 = if Theme1 then 2 else if Theme2 then 22  else 222;
    def pColour3 = if Theme1 then 3 else if Theme2 then 33  else 333;
    def pColour4 = if Theme1 then 4 else if Theme2 then 44  else 444;
    def pColour5 = if Theme1 then 5 else if Theme2 then 55 else 555;

    def nColour1 = if Theme1 then 6 else if Theme2 then 66  else 666;
    def nColour2 = if Theme1 then 7 else if Theme2 then 77  else 777;
    def nColour3 = if Theme1 then 8 else if Theme2 then 88  else 888;
    def nColour4 = if Theme1 then 9 else if Theme2 then 99  else 999;
    def nColour5 = if Theme1 then 10 else if Theme2 then 110 else 1110;

    def getColour = 
    if (a >= 90) then
    pColour1
    else
    if (a >= 80) then
    pColour2
        else
    if (a >= 70) then
    pColour3
            else
    if (a >= 60) then
    pColour4
                else
    if (a >= 50) then
    pColour5
                    else
    if (a >= 40) then
    nColour5
                        else
    if (a >= 30) then
    nColour4
                            else
    if (a >= 20) then
    nColour3
                                else
    if (a >= 10) then
    nColour2
                                    else
    if (a >= 0) then
                                            nColour1 else getColour[1];
    plot out = getColour;
}
#getStoch(i, incr) =>
script getStoch {
input IncType = 0;
input incr = 1;
input inc = 10;
input smooth = 2;
input MovAvgType = AverageType.WEIGHTED;
    def c = (IncType * inc) + 1;
    def s = smooth + incr;
    def src = close;
    def h = high;
    def l = low;
    def len = c;
    def hh = Highest(h, len);
    def ll = Lowest(l, len);
    def stoch = 100 * (src - ll) / (hh - ll);
    def getStoch = MovingAverage(MovAvgType, stoch, s);
    plot out = getStoch;
}

def stoch1 = if plotNumber > 0  then getStoch(If(IncType, 1, 1), If(IncType, 1, 0), inc, smooth, MovAvgType) else 0;
def stoch2 = if plotNumber > 1  then getStoch(If(IncType, 2, 2), If(IncType, 2, 0), inc, smooth, MovAvgType) else 0;
def stoch3 = if plotNumber > 2  then getStoch(If(IncType, 3, 3), If(IncType, 3, 0), inc, smooth, MovAvgType) else 0;
def stoch4 = if plotNumber > 3  then getStoch(If(IncType, 4, 4), If(IncType, 4, 0), inc, smooth, MovAvgType) else 0;
def stoch5 = if plotNumber > 4  then getStoch(If(IncType, 5, 5), If(IncType, 5, 0), inc, smooth, MovAvgType) else 0;
def stoch6 = if plotNumber > 5  then getStoch(If(IncType, 6, 6), If(IncType, 6, 0), inc, smooth, MovAvgType) else 0;
def stoch7 = if plotNumber > 6  then getStoch(If(IncType, 7, 7), If(IncType, 7, 0), inc, smooth, MovAvgType) else 0;
def stoch8 = if plotNumber > 7  then getStoch(If(IncType, 8, 8), If(IncType, 8, 0), inc, smooth, MovAvgType) else 0;
def stoch9 = if plotNumber > 8  then getStoch(If(IncType, 9, 9), If(IncType, 9, 0), inc, smooth, MovAvgType) else 0;
def stoch10 = if plotNumber > 9  then getStoch(If(IncType, 10, 10), If(IncType, 10, 0), inc, smooth, MovAvgType) else 0;
def stoch11 = if plotNumber > 10 then getStoch(If(IncType, 15, 11), If(IncType, 11, 0), inc, smooth, MovAvgType) else 0;
def stoch12 = if plotNumber > 11 then getStoch(If(IncType, 20, 12), If(IncType, 12, 0), inc, smooth, MovAvgType) else 0;
def stoch13 = if plotNumber > 12 then getStoch(If(IncType, 25, 13), If(IncType, 13, 0), inc, smooth, MovAvgType) else 0;
def stoch14 = if plotNumber > 13 then getStoch(If(IncType, 30, 14), If(IncType, 14, 0), inc, smooth, MovAvgType) else 0;
def stoch15 = if plotNumber > 14 then getStoch(If(IncType, 35, 15), If(IncType, 15, 0), inc, smooth, MovAvgType) else 0;
def stoch16 = if plotNumber > 15 then getStoch(If(IncType, 40, 16), If(IncType, 16, 0), inc, smooth, MovAvgType) else 0;
def stoch17 = if plotNumber > 16 then getStoch(If(IncType, 45, 17), If(IncType, 17, 0), inc, smooth, MovAvgType) else 0;
def stoch18 = if plotNumber > 17 then getStoch(If(IncType, 50, 18), If(IncType, 18, 0), inc, smooth, MovAvgType) else 0;
def stoch19 = if plotNumber > 18 then getStoch(If(IncType, 55, 19), If(IncType, 19, 0), inc, smooth, MovAvgType) else 0;
def stoch20 = if plotNumber > 19 then getStoch(If(IncType, 60, 20), If(IncType, 20, 0), inc, smooth, MovAvgType) else 0;
def stoch21 = if plotNumber > 20 then getStoch(If(IncType, 70, 21), If(IncType, 21, 0), inc, smooth, MovAvgType) else 0;
def stoch22 = if plotNumber > 21 then getStoch(If(IncType, 80, 22), If(IncType, 22, 0), inc, smooth, MovAvgType) else 0;
def stoch23 = if plotNumber > 22 then getStoch(If(IncType, 90, 23), If(IncType, 23, 0), inc, smooth, MovAvgType) else 0;
def stoch24 = if plotNumber > 23 then getStoch(If(IncType, 100, 24), If(IncType, 24, 0), inc, smooth, MovAvgType) else 0;
def stoch25 = if plotNumber > 24 then getStoch(If(IncType, 110, 25), If(IncType, 25, 0), inc, smooth, MovAvgType) else 0;
def stoch26 = if plotNumber > 25 then getStoch(If(IncType, 120, 26), If(IncType, 26, 0), inc, smooth, MovAvgType) else 0;
def stoch27 = if plotNumber > 26 then getStoch(If(IncType, 140, 27), If(IncType, 27, 0), inc, smooth, MovAvgType) else 0;
def stoch28 = if plotNumber > 27 then getStoch(If(IncType, 160, 28), If(IncType, 28, 0), inc, smooth, MovAvgType) else 0;

def colour1 = getColour(stoch1, Theme1, Theme2);
def colour2 = getColour(stoch2, Theme1, Theme2);
def colour3 = getColour(stoch3, Theme1, Theme2);
def colour4 = getColour(stoch4, Theme1, Theme2);
def colour5 = getColour(stoch5, Theme1, Theme2);
def colour6 = getColour(stoch6, Theme1, Theme2);
def colour7 = getColour(stoch7, Theme1, Theme2);
def colour8 = getColour(stoch8, Theme1, Theme2);
def colour9 = getColour(stoch9, Theme1, Theme2);
def colour10 = getColour(stoch10, Theme1, Theme2);
def colour11 = getColour(stoch11, Theme1, Theme2);
def colour12 = getColour(stoch12, Theme1, Theme2);
def colour13 = getColour(stoch13, Theme1, Theme2);
def colour14 = getColour(stoch14, Theme1, Theme2);
def colour15 = getColour(stoch15, Theme1, Theme2);
def colour16 = getColour(stoch16, Theme1, Theme2);
def colour17 = getColour(stoch17, Theme1, Theme2);
def colour18 = getColour(stoch18, Theme1, Theme2);
def colour19 = getColour(stoch19, Theme1, Theme2);
def colour20 = getColour(stoch20, Theme1, Theme2);
def colour21 = getColour(stoch21, Theme1, Theme2);
def colour22 = getColour(stoch22, Theme1, Theme2);
def colour23 = getColour(stoch23, Theme1, Theme2);
def colour24 = getColour(stoch24, Theme1, Theme2);
def colour25 = getColour(stoch25, Theme1, Theme2);
def colour26 = getColour(stoch26, Theme1, Theme2);
def colour27 = getColour(stoch27, Theme1, Theme2);
def colour28 = getColour(stoch28, Theme1, Theme2);

def getAverage = (stoch1 + stoch2 + stoch3 + stoch4 + stoch5 + stoch6 + stoch7 + stoch8 + stoch9 + stoch10 + stoch11 + stoch12 + stoch13 + stoch14 + stoch15 + stoch16 + stoch17 + stoch18 + stoch19 + stoch20 + stoch21 + stoch22 + stoch23 + stoch24 + stoch25 + stoch26 + stoch27 + stoch28) / plotNumber;
def fast = ((getAverage / 100) * plotNumber);
def slow = MovingAverage(MovAvgType, fast, smoothSlow);
def barColour = getColour(getAverage, Theme1, Theme2);

plot slowLine = slow;
plot fastLine = fast;
slowLine.AssignValueColor(if slowColour == 1 then GlobalColor("sc1") else
if slowColour == 2 then GlobalColor("sc2") else GlobalColor("sc3"));
fastLine.AssignValueColor(if fastColour == 1 then GlobalColor("fc1") else
if fastColour == 2 then GlobalColor("fc2") else GlobalColor("fc3"));
slowLine.SetLineWeight(2);


plot plot1 =  if last then na else if (plotNumber > 0, 0, na);
plot plot2 =  if last then na else if (plotNumber > 1, 1, na);
plot plot3 =  if last then na else if (plotNumber > 2, 2, na);
plot plot4 =  if last then na else if (plotNumber > 3, 3, na);
plot plot5 =  if last then na else if (plotNumber > 4, 4, na);
plot plot6 =  if last then na else if (plotNumber > 5, 5, na);
plot plot7 =  if last then na else if (plotNumber > 6, 6, na);
plot plot8 =  if last then na else if (plotNumber > 7, 7, na);
plot plot9 =  if last then na else if (plotNumber > 8, 8, na);
plot plot10 = if last then na else if (plotNumber > 9, 9, na);
plot plot11 = if last then na else if (plotNumber > 10, 10, na);
plot plot12 = if last then na else if (plotNumber > 11, 11, na);
plot plot13 = if last then na else if (plotNumber > 12, 12, na);
plot plot14 = if last then na else if (plotNumber > 13, 13, na);
plot plot15 = if last then na else if (plotNumber > 14, 14, na);
plot plot16 = if last then na else if (plotNumber > 15, 15, na);
plot plot17 = if last then na else if (plotNumber > 16, 16, na);
plot plot18 = if last then na else if (plotNumber > 17, 17, na);
plot plot19 = if last then na else if (plotNumber > 18, 18, na);
plot plot20 = if last then na else if (plotNumber > 19, 19, na);
plot plot21 = if last then na else if (plotNumber > 20, 20, na);
plot plot22 = if last then na else if (plotNumber > 21, 21, na);
plot plot23 = if last then na else if (plotNumber > 22, 22, na);
plot plot24 = if last then na else if (plotNumber > 23, 23, na);
plot plot25 = if last then na else if (plotNumber > 24, 24, na);
plot plot26 = if last then na else if (plotNumber > 25, 25, na);
plot plot27 = if last then na else if (plotNumber > 26, 26, na);
plot plot28 = if last then na else if (plotNumber > 27, 27, na);
plot plot29 = if last then na else plotNumber;

plot1.AssignValueColor(if colour1 == 1   then GlobalColor("cp1") else
if colour1 == 11  then GlobalColor("cp6") else
if colour1 == 111 then GlobalColor("cp11") else
if colour1 == 2   then GlobalColor("cp2") else
if colour1 == 22  then GlobalColor("cp7") else
if colour1 == 222 then GlobalColor("cp12") else
if colour1 == 3   then GlobalColor("cp3") else
if colour1 == 33  then GlobalColor("cp8") else
if colour1 == 333 then GlobalColor("cp13") else
if colour1 == 4   then GlobalColor("cp4") else
if colour1 == 44  then GlobalColor("cp9") else
if colour1 == 444 then GlobalColor("cp14") else
if colour1 == 5   then GlobalColor("cp5") else
if colour1 == 55  then GlobalColor("cp10") else
if colour1 == 555 then GlobalColor("cp15") else
if colour1 == 6   then GlobalColor("cn1") else
if colour1 == 66  then GlobalColor("cn6") else
if colour1 == 666 then GlobalColor("cn11") else
if colour1 == 7   then GlobalColor("cn2") else
if colour1 == 77  then GlobalColor("cn7") else
if colour1 == 777 then GlobalColor("cn12") else
if colour1 == 8   then GlobalColor("cn3") else
if colour1 == 88  then GlobalColor("cn8") else
if colour1 == 888 then GlobalColor("cn13") else
if colour1 == 9   then GlobalColor("cn4") else
if colour1 == 99  then GlobalColor("cn9") else
if colour1 == 999 then GlobalColor("cn14") else
if colour1 == 10  then GlobalColor("cn5") else
if colour1 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));

plot2.AssignValueColor(if colour2 == 1   then GlobalColor("cp1") else
if colour2 == 11  then GlobalColor("cp6") else
if colour2 == 111 then GlobalColor("cp11") else
if colour2 == 2   then GlobalColor("cp2") else
if colour2 == 22  then GlobalColor("cp7") else
if colour2 == 222 then GlobalColor("cp12") else
if colour2 == 3   then GlobalColor("cp3") else
if colour2 == 33  then GlobalColor("cp8") else
if colour2 == 333 then GlobalColor("cp13") else
if colour2 == 4   then GlobalColor("cp4") else
if colour2 == 44  then GlobalColor("cp9") else
if colour2 == 444 then GlobalColor("cp14") else
if colour2 == 5   then GlobalColor("cp5") else
if colour2 == 55  then GlobalColor("cp10") else
if colour2 == 555 then GlobalColor("cp15") else
if colour2 == 6   then GlobalColor("cn1") else
if colour2 == 66  then GlobalColor("cn6") else
if colour2 == 666 then GlobalColor("cn11") else
if colour2 == 7   then GlobalColor("cn2") else
if colour2 == 77  then GlobalColor("cn7") else
if colour2 == 777 then GlobalColor("cn12") else
if colour2 == 8   then GlobalColor("cn3") else
if colour2 == 88  then GlobalColor("cn8") else
if colour2 == 888 then GlobalColor("cn13") else
if colour2 == 9   then GlobalColor("cn4") else
if colour2 == 99  then GlobalColor("cn9") else
if colour2 == 999 then GlobalColor("cn14") else
if colour2 == 10  then GlobalColor("cn5") else
if colour2 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot3.AssignValueColor(if colour3 == 1   then GlobalColor("cp1") else
if colour3 == 11  then GlobalColor("cp6") else
if colour3 == 111 then GlobalColor("cp11") else
if colour3 == 2   then GlobalColor("cp2") else
if colour3 == 22  then GlobalColor("cp7") else
if colour3 == 222 then GlobalColor("cp12") else
if colour3 == 3   then GlobalColor("cp3") else
if colour3 == 33  then GlobalColor("cp8") else
if colour3 == 333 then GlobalColor("cp13") else
if colour3 == 4   then GlobalColor("cp4") else
if colour3 == 44  then GlobalColor("cp9") else
if colour3 == 444 then GlobalColor("cp14") else
if colour3 == 5   then GlobalColor("cp5") else
if colour3 == 55  then GlobalColor("cp10") else
if colour3 == 555 then GlobalColor("cp15") else
if colour3 == 6   then GlobalColor("cn1") else
if colour3 == 66  then GlobalColor("cn6") else
if colour3 == 666 then GlobalColor("cn11") else
if colour3 == 7   then GlobalColor("cn2") else
if colour3 == 77  then GlobalColor("cn7") else
if colour3 == 777 then GlobalColor("cn12") else
if colour3 == 8   then GlobalColor("cn3") else
if colour3 == 88  then GlobalColor("cn8") else
if colour3 == 888 then GlobalColor("cn13") else
if colour3 == 9   then GlobalColor("cn4") else
if colour3 == 99  then GlobalColor("cn9") else
if colour3 == 999 then GlobalColor("cn14") else
if colour3 == 10  then GlobalColor("cn5") else
if colour3 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot4.AssignValueColor(if colour4 == 1   then GlobalColor("cp1") else
if colour4 == 11  then GlobalColor("cp6") else
if colour4 == 111 then GlobalColor("cp11") else
if colour4 == 2   then GlobalColor("cp2") else
if colour4 == 22  then GlobalColor("cp7") else
if colour4 == 222 then GlobalColor("cp12") else
if colour4 == 3   then GlobalColor("cp3") else
if colour4 == 33  then GlobalColor("cp8") else
if colour4 == 333 then GlobalColor("cp13") else
if colour4 == 4   then GlobalColor("cp4") else
if colour4 == 44  then GlobalColor("cp9") else
if colour4 == 444 then GlobalColor("cp14") else
if colour4 == 5   then GlobalColor("cp5") else
if colour4 == 55  then GlobalColor("cp10") else
if colour4 == 555 then GlobalColor("cp15") else
if colour4 == 6   then GlobalColor("cn1") else
if colour4 == 66  then GlobalColor("cn6") else
if colour4 == 666 then GlobalColor("cn11") else
if colour4 == 7   then GlobalColor("cn2") else
if colour4 == 77  then GlobalColor("cn7") else
if colour4 == 777 then GlobalColor("cn12") else
if colour4 == 8   then GlobalColor("cn3") else
if colour4 == 88  then GlobalColor("cn8") else
if colour4 == 888 then GlobalColor("cn13") else
if colour4 == 9   then GlobalColor("cn4") else
if colour4 == 99  then GlobalColor("cn9") else
if colour4 == 999 then GlobalColor("cn14") else
if colour4 == 10  then GlobalColor("cn5") else
if colour4 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot5.AssignValueColor(if colour5 == 1   then GlobalColor("cp1") else
if colour5 == 11  then GlobalColor("cp6") else
if colour5 == 111 then GlobalColor("cp11") else
if colour5 == 2   then GlobalColor("cp2") else
if colour5 == 22  then GlobalColor("cp7") else
if colour5 == 222 then GlobalColor("cp12") else
if colour5 == 3   then GlobalColor("cp3") else
if colour5 == 33  then GlobalColor("cp8") else
if colour5 == 333 then GlobalColor("cp13") else
if colour5 == 4   then GlobalColor("cp4") else
if colour5 == 44  then GlobalColor("cp9") else
if colour5 == 444 then GlobalColor("cp14") else
if colour5 == 5   then GlobalColor("cp5") else
if colour5 == 55  then GlobalColor("cp10") else
if colour5 == 555 then GlobalColor("cp15") else
if colour5 == 6   then GlobalColor("cn1") else
if colour5 == 66  then GlobalColor("cn6") else
if colour5 == 666 then GlobalColor("cn11") else
if colour5 == 7   then GlobalColor("cn2") else
if colour5 == 77  then GlobalColor("cn7") else
if colour5 == 777 then GlobalColor("cn12") else
if colour5 == 8   then GlobalColor("cn3") else
if colour5 == 88  then GlobalColor("cn8") else
if colour5 == 888 then GlobalColor("cn13") else
if colour5 == 9   then GlobalColor("cn4") else
if colour5 == 99  then GlobalColor("cn9") else
if colour5 == 999 then GlobalColor("cn14") else
if colour5 == 10  then GlobalColor("cn5") else
if colour5 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot6.AssignValueColor(if colour6 == 1   then GlobalColor("cp1") else
if colour6 == 11  then GlobalColor("cp6") else
if colour6 == 111 then GlobalColor("cp11") else
if colour6 == 2   then GlobalColor("cp2") else
if colour6 == 22  then GlobalColor("cp7") else
if colour6 == 222 then GlobalColor("cp12") else
if colour6 == 3   then GlobalColor("cp3") else
if colour6 == 33  then GlobalColor("cp8") else
if colour6 == 333 then GlobalColor("cp13") else
if colour6 == 4   then GlobalColor("cp4") else
if colour6 == 44  then GlobalColor("cp9") else
if colour6 == 444 then GlobalColor("cp14") else
if colour6 == 5   then GlobalColor("cp5") else
if colour6 == 55  then GlobalColor("cp10") else
if colour6 == 555 then GlobalColor("cp15") else
if colour6 == 6   then GlobalColor("cn1") else
if colour6 == 66  then GlobalColor("cn6") else
if colour6 == 666 then GlobalColor("cn11") else
if colour6 == 7   then GlobalColor("cn2") else
if colour6 == 77  then GlobalColor("cn7") else
if colour6 == 777 then GlobalColor("cn12") else
if colour6 == 8   then GlobalColor("cn3") else
if colour6 == 88  then GlobalColor("cn8") else
if colour6 == 888 then GlobalColor("cn13") else
if colour6 == 9   then GlobalColor("cn4") else
if colour6 == 99  then GlobalColor("cn9") else
if colour6 == 999 then GlobalColor("cn14") else
if colour6 == 10  then GlobalColor("cn5") else
if colour6 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot7.AssignValueColor(if colour7 == 1   then GlobalColor("cp1") else
if colour7 == 11  then GlobalColor("cp6") else
if colour7 == 111 then GlobalColor("cp11") else
if colour7 == 2   then GlobalColor("cp2") else
if colour7 == 22  then GlobalColor("cp7") else
if colour7 == 222 then GlobalColor("cp12") else
if colour7 == 3   then GlobalColor("cp3") else
if colour7 == 33  then GlobalColor("cp8") else
if colour7 == 333 then GlobalColor("cp13") else
if colour7 == 4   then GlobalColor("cp4") else
if colour7 == 44  then GlobalColor("cp9") else
if colour7 == 444 then GlobalColor("cp14") else
if colour7 == 5   then GlobalColor("cp5") else
if colour7 == 55  then GlobalColor("cp10") else
if colour7 == 555 then GlobalColor("cp15") else
if colour7 == 6   then GlobalColor("cn1") else
if colour7 == 66  then GlobalColor("cn6") else
if colour7 == 666 then GlobalColor("cn11") else
if colour7 == 7   then GlobalColor("cn2") else
if colour7 == 77  then GlobalColor("cn7") else
if colour7 == 777 then GlobalColor("cn12") else
if colour7 == 8   then GlobalColor("cn3") else
if colour7 == 88  then GlobalColor("cn8") else
if colour7 == 888 then GlobalColor("cn13") else
if colour7 == 9   then GlobalColor("cn4") else
if colour7 == 99  then GlobalColor("cn9") else
if colour7 == 999 then GlobalColor("cn14") else
if colour7 == 10  then GlobalColor("cn5") else
if colour7 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot8.AssignValueColor(if colour8 == 1   then GlobalColor("cp1") else
if colour8 == 11  then GlobalColor("cp6") else
if colour8 == 111 then GlobalColor("cp11") else
if colour8 == 2   then GlobalColor("cp2") else
if colour8 == 22  then GlobalColor("cp7") else
if colour8 == 222 then GlobalColor("cp12") else
if colour8 == 3   then GlobalColor("cp3") else
if colour8 == 33  then GlobalColor("cp8") else
if colour8 == 333 then GlobalColor("cp13") else
if colour8 == 4   then GlobalColor("cp4") else
if colour8 == 44  then GlobalColor("cp9") else
if colour8 == 444 then GlobalColor("cp14") else
if colour8 == 5   then GlobalColor("cp5") else
if colour8 == 55  then GlobalColor("cp10") else
if colour8 == 555 then GlobalColor("cp15") else
if colour8 == 6   then GlobalColor("cn1") else
if colour8 == 66  then GlobalColor("cn6") else
if colour8 == 666 then GlobalColor("cn11") else
if colour8 == 7   then GlobalColor("cn2") else
if colour8 == 77  then GlobalColor("cn7") else
if colour8 == 777 then GlobalColor("cn12") else
if colour8 == 8   then GlobalColor("cn3") else
if colour8 == 88  then GlobalColor("cn8") else
if colour8 == 888 then GlobalColor("cn13") else
if colour8 == 9   then GlobalColor("cn4") else
if colour8 == 99  then GlobalColor("cn9") else
if colour8 == 999 then GlobalColor("cn14") else
if colour8 == 10  then GlobalColor("cn5") else
if colour8 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot9.AssignValueColor(if colour9 == 1   then GlobalColor("cp1") else
if colour9 == 11  then GlobalColor("cp6") else
if colour9 == 111 then GlobalColor("cp11") else
if colour9 == 2   then GlobalColor("cp2") else
if colour9 == 22  then GlobalColor("cp7") else
if colour9 == 222 then GlobalColor("cp12") else
if colour9 == 3   then GlobalColor("cp3") else
if colour9 == 33  then GlobalColor("cp8") else
if colour9 == 333 then GlobalColor("cp13") else
if colour9 == 4   then GlobalColor("cp4") else
if colour9 == 44  then GlobalColor("cp9") else
if colour9 == 444 then GlobalColor("cp14") else
if colour9 == 5   then GlobalColor("cp5") else
if colour9 == 55  then GlobalColor("cp10") else
if colour9 == 555 then GlobalColor("cp15") else
if colour9 == 6   then GlobalColor("cn1") else
if colour9 == 66  then GlobalColor("cn6") else
if colour9 == 666 then GlobalColor("cn11") else
if colour9 == 7   then GlobalColor("cn2") else
if colour9 == 77  then GlobalColor("cn7") else
if colour9 == 777 then GlobalColor("cn12") else
if colour9 == 8   then GlobalColor("cn3") else
if colour9 == 88  then GlobalColor("cn8") else
if colour9 == 888 then GlobalColor("cn13") else
if colour9 == 9   then GlobalColor("cn4") else
if colour9 == 99  then GlobalColor("cn9") else
if colour9 == 999 then GlobalColor("cn14") else
if colour9 == 10  then GlobalColor("cn5") else
if colour9 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot10.AssignValueColor(if colour10 == 1   then GlobalColor("cp1") else
if colour10 == 11  then GlobalColor("cp6") else
if colour10 == 111 then GlobalColor("cp11") else
if colour10 == 2   then GlobalColor("cp2") else
if colour10 == 22  then GlobalColor("cp7") else
if colour10 == 222 then GlobalColor("cp12") else
if colour10 == 3   then GlobalColor("cp3") else
if colour10 == 33  then GlobalColor("cp8") else
if colour10 == 333 then GlobalColor("cp13") else
if colour10 == 4   then GlobalColor("cp4") else
if colour10 == 44  then GlobalColor("cp9") else
if colour10 == 444 then GlobalColor("cp14") else
if colour10 == 5   then GlobalColor("cp5") else
if colour10 == 55  then GlobalColor("cp10") else
if colour10 == 555 then GlobalColor("cp15") else
if colour10 == 6   then GlobalColor("cn1") else
if colour10 == 66  then GlobalColor("cn6") else
if colour10 == 666 then GlobalColor("cn11") else
if colour10 == 7   then GlobalColor("cn2") else
if colour10 == 77  then GlobalColor("cn7") else
if colour10 == 777 then GlobalColor("cn12") else
if colour10 == 8   then GlobalColor("cn3") else
if colour10 == 88  then GlobalColor("cn8") else
if colour10 == 888 then GlobalColor("cn13") else
if colour10 == 9   then GlobalColor("cn4") else
if colour10 == 99  then GlobalColor("cn9") else
if colour10 == 999 then GlobalColor("cn14") else
if colour10 == 10  then GlobalColor("cn5") else
if colour10 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot11.AssignValueColor(if colour11 == 1   then GlobalColor("cp1") else
if colour11 == 11  then GlobalColor("cp6") else
if colour11 == 111 then GlobalColor("cp11") else
if colour11 == 2   then GlobalColor("cp2") else
if colour11 == 22  then GlobalColor("cp7") else
if colour11 == 222 then GlobalColor("cp12") else
if colour11 == 3   then GlobalColor("cp3") else
if colour11 == 33  then GlobalColor("cp8") else
if colour11 == 333 then GlobalColor("cp13") else
if colour11 == 4   then GlobalColor("cp4") else
if colour11 == 44  then GlobalColor("cp9") else
if colour11 == 444 then GlobalColor("cp14") else
if colour11 == 5   then GlobalColor("cp5") else
if colour11 == 55  then GlobalColor("cp10") else
if colour11 == 555 then GlobalColor("cp15") else
if colour11 == 6   then GlobalColor("cn1") else
if colour11 == 66  then GlobalColor("cn6") else
if colour11 == 666 then GlobalColor("cn11") else
if colour11 == 7   then GlobalColor("cn2") else
if colour11 == 77  then GlobalColor("cn7") else
if colour11 == 777 then GlobalColor("cn12") else
if colour11 == 8   then GlobalColor("cn3") else
if colour11 == 88  then GlobalColor("cn8") else
if colour11 == 888 then GlobalColor("cn13") else
if colour11 == 9   then GlobalColor("cn4") else
if colour11 == 99  then GlobalColor("cn9") else
if colour11 == 999 then GlobalColor("cn14") else
if colour11 == 10  then GlobalColor("cn5") else
if colour11 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot12.AssignValueColor(if colour12 == 1   then GlobalColor("cp1") else
if colour12 == 11  then GlobalColor("cp6") else
if colour12 == 111 then GlobalColor("cp11") else
if colour12 == 2   then GlobalColor("cp2") else
if colour12 == 22  then GlobalColor("cp7") else
if colour12 == 222 then GlobalColor("cp12") else
if colour12 == 3   then GlobalColor("cp3") else
if colour12 == 33  then GlobalColor("cp8") else
if colour12 == 333 then GlobalColor("cp13") else
if colour12 == 4   then GlobalColor("cp4") else
if colour12 == 44  then GlobalColor("cp9") else
if colour12 == 444 then GlobalColor("cp14") else
if colour12 == 5   then GlobalColor("cp5") else
if colour12 == 55  then GlobalColor("cp10") else
if colour12 == 555 then GlobalColor("cp15") else
if colour12 == 6   then GlobalColor("cn1") else
if colour12 == 66  then GlobalColor("cn6") else
if colour12 == 666 then GlobalColor("cn11") else
if colour12 == 7   then GlobalColor("cn2") else
if colour12 == 77  then GlobalColor("cn7") else
if colour12 == 777 then GlobalColor("cn12") else
if colour12 == 8   then GlobalColor("cn3") else
if colour12 == 88  then GlobalColor("cn8") else
if colour12 == 888 then GlobalColor("cn13") else
if colour12 == 9   then GlobalColor("cn4") else
if colour12 == 99  then GlobalColor("cn9") else
if colour12 == 999 then GlobalColor("cn14") else
if colour12 == 10  then GlobalColor("cn5") else
if colour12 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot13.AssignValueColor(if colour13 == 1   then GlobalColor("cp1") else
if colour13 == 11  then GlobalColor("cp6") else
if colour13 == 111 then GlobalColor("cp11") else
if colour13 == 2   then GlobalColor("cp2") else
if colour13 == 22  then GlobalColor("cp7") else
if colour13 == 222 then GlobalColor("cp12") else
if colour13 == 3   then GlobalColor("cp3") else
if colour13 == 33  then GlobalColor("cp8") else
if colour13 == 333 then GlobalColor("cp13") else
if colour13 == 4   then GlobalColor("cp4") else
if colour13 == 44  then GlobalColor("cp9") else
if colour13 == 444 then GlobalColor("cp14") else
if colour13 == 5   then GlobalColor("cp5") else
if colour13 == 55  then GlobalColor("cp10") else
if colour13 == 555 then GlobalColor("cp15") else
if colour13 == 6   then GlobalColor("cn1") else
if colour13 == 66  then GlobalColor("cn6") else
if colour13 == 666 then GlobalColor("cn11") else
if colour13 == 7   then GlobalColor("cn2") else
if colour13 == 77  then GlobalColor("cn7") else
if colour13 == 777 then GlobalColor("cn12") else
if colour13 == 8   then GlobalColor("cn3") else
if colour13 == 88  then GlobalColor("cn8") else
if colour13 == 888 then GlobalColor("cn13") else
if colour13 == 9   then GlobalColor("cn4") else
if colour13 == 99  then GlobalColor("cn9") else
if colour13 == 999 then GlobalColor("cn14") else
if colour13 == 10  then GlobalColor("cn5") else
if colour13 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot14.AssignValueColor(if colour14 == 1   then GlobalColor("cp1") else
if colour14 == 11  then GlobalColor("cp6") else
if colour14 == 111 then GlobalColor("cp11") else
if colour14 == 2   then GlobalColor("cp2") else
if colour14 == 22  then GlobalColor("cp7") else
if colour14 == 222 then GlobalColor("cp12") else
if colour14 == 3   then GlobalColor("cp3") else
if colour14 == 33  then GlobalColor("cp8") else
if colour14 == 333 then GlobalColor("cp13") else
if colour14 == 4   then GlobalColor("cp4") else
if colour14 == 44  then GlobalColor("cp9") else
if colour14 == 444 then GlobalColor("cp14") else
if colour14 == 5   then GlobalColor("cp5") else
if colour14 == 55  then GlobalColor("cp10") else
if colour14 == 555 then GlobalColor("cp15") else
if colour14 == 6   then GlobalColor("cn1") else
if colour14 == 66  then GlobalColor("cn6") else
if colour14 == 666 then GlobalColor("cn11") else
if colour14 == 7   then GlobalColor("cn2") else
if colour14 == 77  then GlobalColor("cn7") else
if colour14 == 777 then GlobalColor("cn12") else
if colour14 == 8   then GlobalColor("cn3") else
if colour14 == 88  then GlobalColor("cn8") else
if colour14 == 888 then GlobalColor("cn13") else
if colour14 == 9   then GlobalColor("cn4") else
if colour14 == 99  then GlobalColor("cn9") else
if colour14 == 999 then GlobalColor("cn14") else
if colour14 == 10  then GlobalColor("cn5") else
if colour14 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot15.AssignValueColor(if colour15 == 1   then GlobalColor("cp1") else
if colour15 == 11  then GlobalColor("cp6") else
if colour15 == 111 then GlobalColor("cp11") else
if colour15 == 2   then GlobalColor("cp2") else
if colour15 == 22  then GlobalColor("cp7") else
if colour15 == 222 then GlobalColor("cp12") else
if colour15 == 3   then GlobalColor("cp3") else
if colour15 == 33  then GlobalColor("cp8") else
if colour15 == 333 then GlobalColor("cp13") else
if colour15 == 4   then GlobalColor("cp4") else
if colour15 == 44  then GlobalColor("cp9") else
if colour15 == 444 then GlobalColor("cp14") else
if colour15 == 5   then GlobalColor("cp5") else
if colour15 == 55  then GlobalColor("cp10") else
if colour15 == 555 then GlobalColor("cp15") else
if colour15 == 6   then GlobalColor("cn1") else
if colour15 == 66  then GlobalColor("cn6") else
if colour15 == 666 then GlobalColor("cn11") else
if colour15 == 7   then GlobalColor("cn2") else
if colour15 == 77  then GlobalColor("cn7") else
if colour15 == 777 then GlobalColor("cn12") else
if colour15 == 8   then GlobalColor("cn3") else
if colour15 == 88  then GlobalColor("cn8") else
if colour15 == 888 then GlobalColor("cn13") else
if colour15 == 9   then GlobalColor("cn4") else
if colour15 == 99  then GlobalColor("cn9") else
if colour15 == 999 then GlobalColor("cn14") else
if colour15 == 10  then GlobalColor("cn5") else
if colour15 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot16.AssignValueColor(if colour16 == 1   then GlobalColor("cp1") else
if colour16 == 11  then GlobalColor("cp6") else
if colour16 == 111 then GlobalColor("cp11") else
if colour16 == 2   then GlobalColor("cp2") else
if colour16 == 22  then GlobalColor("cp7") else
if colour16 == 222 then GlobalColor("cp12") else
if colour16 == 3   then GlobalColor("cp3") else
if colour16 == 33  then GlobalColor("cp8") else
if colour16 == 333 then GlobalColor("cp13") else
if colour16 == 4   then GlobalColor("cp4") else
if colour16 == 44  then GlobalColor("cp9") else
if colour16 == 444 then GlobalColor("cp14") else
if colour16 == 5   then GlobalColor("cp5") else
if colour16 == 55  then GlobalColor("cp10") else
if colour16 == 555 then GlobalColor("cp15") else
if colour16 == 6   then GlobalColor("cn1") else
if colour16 == 66  then GlobalColor("cn6") else
if colour16 == 666 then GlobalColor("cn11") else
if colour16 == 7   then GlobalColor("cn2") else
if colour16 == 77  then GlobalColor("cn7") else
if colour16 == 777 then GlobalColor("cn12") else
if colour16 == 8   then GlobalColor("cn3") else
if colour16 == 88  then GlobalColor("cn8") else
if colour16 == 888 then GlobalColor("cn13") else
if colour16 == 9   then GlobalColor("cn4") else
if colour16 == 99  then GlobalColor("cn9") else
if colour16 == 999 then GlobalColor("cn14") else
if colour16 == 10  then GlobalColor("cn5") else
if colour16 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot17.AssignValueColor(if colour17 == 1   then GlobalColor("cp1") else
if colour17 == 11  then GlobalColor("cp6") else
if colour17 == 111 then GlobalColor("cp11") else
if colour17 == 2   then GlobalColor("cp2") else
if colour17 == 22  then GlobalColor("cp7") else
if colour17 == 222 then GlobalColor("cp12") else
if colour17 == 3   then GlobalColor("cp3") else
if colour17 == 33  then GlobalColor("cp8") else
if colour17 == 333 then GlobalColor("cp13") else
if colour17 == 4   then GlobalColor("cp4") else
if colour17 == 44  then GlobalColor("cp9") else
if colour17 == 444 then GlobalColor("cp14") else
if colour17 == 5   then GlobalColor("cp5") else
if colour17 == 55  then GlobalColor("cp10") else
if colour17 == 555 then GlobalColor("cp15") else
if colour17 == 6   then GlobalColor("cn1") else
if colour17 == 66  then GlobalColor("cn6") else
if colour17 == 666 then GlobalColor("cn11") else
if colour17 == 7   then GlobalColor("cn2") else
if colour17 == 77  then GlobalColor("cn7") else
if colour17 == 777 then GlobalColor("cn12") else
if colour17 == 8   then GlobalColor("cn3") else
if colour17 == 88  then GlobalColor("cn8") else
if colour17 == 888 then GlobalColor("cn13") else
if colour17 == 9   then GlobalColor("cn4") else
if colour17 == 99  then GlobalColor("cn9") else
if colour17 == 999 then GlobalColor("cn14") else
if colour17 == 10  then GlobalColor("cn5") else
if colour17 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot18.AssignValueColor(if colour18 == 1   then GlobalColor("cp1") else
if colour18 == 11  then GlobalColor("cp6") else
if colour18 == 111 then GlobalColor("cp11") else
if colour18 == 2   then GlobalColor("cp2") else
if colour18 == 22  then GlobalColor("cp7") else
if colour18 == 222 then GlobalColor("cp12") else
if colour18 == 3   then GlobalColor("cp3") else
if colour18 == 33  then GlobalColor("cp8") else
if colour18 == 333 then GlobalColor("cp13") else
if colour18 == 4   then GlobalColor("cp4") else
if colour18 == 44  then GlobalColor("cp9") else
if colour18 == 444 then GlobalColor("cp14") else
if colour18 == 5   then GlobalColor("cp5") else
if colour18 == 55  then GlobalColor("cp10") else
if colour18 == 555 then GlobalColor("cp15") else
if colour18 == 6   then GlobalColor("cn1") else
if colour18 == 66  then GlobalColor("cn6") else
if colour18 == 666 then GlobalColor("cn11") else
if colour18 == 7   then GlobalColor("cn2") else
if colour18 == 77  then GlobalColor("cn7") else
if colour18 == 777 then GlobalColor("cn12") else
if colour18 == 8   then GlobalColor("cn3") else
if colour18 == 88  then GlobalColor("cn8") else
if colour18 == 888 then GlobalColor("cn13") else
if colour18 == 9   then GlobalColor("cn4") else
if colour18 == 99  then GlobalColor("cn9") else
if colour18 == 999 then GlobalColor("cn14") else
if colour18 == 10  then GlobalColor("cn5") else
if colour18 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot19.AssignValueColor(if colour19 == 1   then GlobalColor("cp1") else
if colour19 == 11  then GlobalColor("cp6") else
if colour19 == 111 then GlobalColor("cp11") else
if colour19 == 2   then GlobalColor("cp2") else
if colour19 == 22  then GlobalColor("cp7") else
if colour19 == 222 then GlobalColor("cp12") else
if colour19 == 3   then GlobalColor("cp3") else
if colour19 == 33  then GlobalColor("cp8") else
if colour19 == 333 then GlobalColor("cp13") else
if colour19 == 4   then GlobalColor("cp4") else
if colour19 == 44  then GlobalColor("cp9") else
if colour19 == 444 then GlobalColor("cp14") else
if colour19 == 5   then GlobalColor("cp5") else
if colour19 == 55  then GlobalColor("cp10") else
if colour19 == 555 then GlobalColor("cp15") else
if colour19 == 6   then GlobalColor("cn1") else
if colour19 == 66  then GlobalColor("cn6") else
if colour19 == 666 then GlobalColor("cn11") else
if colour19 == 7   then GlobalColor("cn2") else
if colour19 == 77  then GlobalColor("cn7") else
if colour19 == 777 then GlobalColor("cn12") else
if colour19 == 8   then GlobalColor("cn3") else
if colour19 == 88  then GlobalColor("cn8") else
if colour19 == 888 then GlobalColor("cn13") else
if colour19 == 9   then GlobalColor("cn4") else
if colour19 == 99  then GlobalColor("cn9") else
if colour19 == 999 then GlobalColor("cn14") else
if colour19 == 10  then GlobalColor("cn5") else
if colour19 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot20.AssignValueColor(if colour20 == 1   then GlobalColor("cp1") else
if colour20 == 11  then GlobalColor("cp6") else
if colour20 == 111 then GlobalColor("cp11") else
if colour20 == 2   then GlobalColor("cp2") else
if colour20 == 22  then GlobalColor("cp7") else
if colour20 == 222 then GlobalColor("cp12") else
if colour20 == 3   then GlobalColor("cp3") else
if colour20 == 33  then GlobalColor("cp8") else
if colour20 == 333 then GlobalColor("cp13") else
if colour20 == 4   then GlobalColor("cp4") else
if colour20 == 44  then GlobalColor("cp9") else
if colour20 == 444 then GlobalColor("cp14") else
if colour20 == 5   then GlobalColor("cp5") else
if colour20 == 55  then GlobalColor("cp10") else
if colour20 == 555 then GlobalColor("cp15") else
if colour20 == 6   then GlobalColor("cn1") else
if colour20 == 66  then GlobalColor("cn6") else
if colour20 == 666 then GlobalColor("cn11") else
if colour20 == 7   then GlobalColor("cn2") else
if colour20 == 77  then GlobalColor("cn7") else
if colour20 == 777 then GlobalColor("cn12") else
if colour20 == 8   then GlobalColor("cn3") else
if colour20 == 88  then GlobalColor("cn8") else
if colour20 == 888 then GlobalColor("cn13") else
if colour20 == 9   then GlobalColor("cn4") else
if colour20 == 99  then GlobalColor("cn9") else
if colour20 == 999 then GlobalColor("cn14") else
if colour20 == 10  then GlobalColor("cn5") else
if colour20 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot21.AssignValueColor(if colour21 == 1   then GlobalColor("cp1") else
if colour21 == 11  then GlobalColor("cp6") else
if colour21 == 111 then GlobalColor("cp11") else
if colour21 == 2   then GlobalColor("cp2") else
if colour21 == 22  then GlobalColor("cp7") else
if colour21 == 222 then GlobalColor("cp12") else
if colour21 == 3   then GlobalColor("cp3") else
if colour21 == 33  then GlobalColor("cp8") else
if colour21 == 333 then GlobalColor("cp13") else
if colour21 == 4   then GlobalColor("cp4") else
if colour21 == 44  then GlobalColor("cp9") else
if colour21 == 444 then GlobalColor("cp14") else
if colour21 == 5   then GlobalColor("cp5") else
if colour21 == 55  then GlobalColor("cp10") else
if colour21 == 555 then GlobalColor("cp15") else
if colour21 == 6   then GlobalColor("cn1") else
if colour21 == 66  then GlobalColor("cn6") else
if colour21 == 666 then GlobalColor("cn11") else
if colour21 == 7   then GlobalColor("cn2") else
if colour21 == 77  then GlobalColor("cn7") else
if colour21 == 777 then GlobalColor("cn12") else
if colour21 == 8   then GlobalColor("cn3") else
if colour21 == 88  then GlobalColor("cn8") else
if colour21 == 888 then GlobalColor("cn13") else
if colour21 == 9   then GlobalColor("cn4") else
if colour21 == 99  then GlobalColor("cn9") else
if colour21 == 999 then GlobalColor("cn14") else
if colour21 == 10  then GlobalColor("cn5") else
if colour21 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot22.AssignValueColor(if colour22 == 1   then GlobalColor("cp1") else
if colour22 == 11  then GlobalColor("cp6") else
if colour22 == 111 then GlobalColor("cp11") else
if colour22 == 2   then GlobalColor("cp2") else
if colour22 == 22  then GlobalColor("cp7") else
if colour22 == 222 then GlobalColor("cp12") else
if colour22 == 3   then GlobalColor("cp3") else
if colour22 == 33  then GlobalColor("cp8") else
if colour22 == 333 then GlobalColor("cp13") else
if colour22 == 4   then GlobalColor("cp4") else
if colour22 == 44  then GlobalColor("cp9") else
if colour22 == 444 then GlobalColor("cp14") else
if colour22 == 5   then GlobalColor("cp5") else
if colour22 == 55  then GlobalColor("cp10") else
if colour22 == 555 then GlobalColor("cp15") else
if colour22 == 6   then GlobalColor("cn1") else
if colour22 == 66  then GlobalColor("cn6") else
if colour22 == 666 then GlobalColor("cn11") else
if colour22 == 7   then GlobalColor("cn2") else
if colour22 == 77  then GlobalColor("cn7") else
if colour22 == 777 then GlobalColor("cn12") else
if colour22 == 8   then GlobalColor("cn3") else
if colour22 == 88  then GlobalColor("cn8") else
if colour22 == 888 then GlobalColor("cn13") else
if colour22 == 9   then GlobalColor("cn4") else
if colour22 == 99  then GlobalColor("cn9") else
if colour22 == 999 then GlobalColor("cn14") else
if colour22 == 10  then GlobalColor("cn5") else
if colour22 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot23.AssignValueColor(if colour23 == 1   then GlobalColor("cp1") else
if colour23 == 11  then GlobalColor("cp6") else
if colour23 == 111 then GlobalColor("cp11") else
if colour23 == 2   then GlobalColor("cp2") else
if colour23 == 22  then GlobalColor("cp7") else
if colour23 == 222 then GlobalColor("cp12") else
if colour23 == 3   then GlobalColor("cp3") else
if colour23 == 33  then GlobalColor("cp8") else
if colour23 == 333 then GlobalColor("cp13") else
if colour23 == 4   then GlobalColor("cp4") else
if colour23 == 44  then GlobalColor("cp9") else
if colour23 == 444 then GlobalColor("cp14") else
if colour23 == 5   then GlobalColor("cp5") else
if colour23 == 55  then GlobalColor("cp10") else
if colour23 == 555 then GlobalColor("cp15") else
if colour23 == 6   then GlobalColor("cn1") else
if colour23 == 66  then GlobalColor("cn6") else
if colour23 == 666 then GlobalColor("cn11") else
if colour23 == 7   then GlobalColor("cn2") else
if colour23 == 77  then GlobalColor("cn7") else
if colour23 == 777 then GlobalColor("cn12") else
if colour23 == 8   then GlobalColor("cn3") else
if colour23 == 88  then GlobalColor("cn8") else
if colour23 == 888 then GlobalColor("cn13") else
if colour23 == 9   then GlobalColor("cn4") else
if colour23 == 99  then GlobalColor("cn9") else
if colour23 == 999 then GlobalColor("cn14") else
if colour23 == 10  then GlobalColor("cn5") else
if colour23 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot24.AssignValueColor(if colour24 == 1   then GlobalColor("cp1") else
if colour24 == 11  then GlobalColor("cp6") else
if colour24 == 111 then GlobalColor("cp11") else
if colour24 == 2   then GlobalColor("cp2") else
if colour24 == 22  then GlobalColor("cp7") else
if colour24 == 222 then GlobalColor("cp12") else
if colour24 == 3   then GlobalColor("cp3") else
if colour24 == 33  then GlobalColor("cp8") else
if colour24 == 333 then GlobalColor("cp13") else
if colour24 == 4   then GlobalColor("cp4") else
if colour24 == 44  then GlobalColor("cp9") else
if colour24 == 444 then GlobalColor("cp14") else
if colour24 == 5   then GlobalColor("cp5") else
if colour24 == 55  then GlobalColor("cp10") else
if colour24 == 555 then GlobalColor("cp15") else
if colour24 == 6   then GlobalColor("cn1") else
if colour24 == 66  then GlobalColor("cn6") else
if colour24 == 666 then GlobalColor("cn11") else
if colour24 == 7   then GlobalColor("cn2") else
if colour24 == 77  then GlobalColor("cn7") else
if colour24 == 777 then GlobalColor("cn12") else
if colour24 == 8   then GlobalColor("cn3") else
if colour24 == 88  then GlobalColor("cn8") else
if colour24 == 888 then GlobalColor("cn13") else
if colour24 == 9   then GlobalColor("cn4") else
if colour24 == 99  then GlobalColor("cn9") else
if colour24 == 999 then GlobalColor("cn14") else
if colour24 == 10  then GlobalColor("cn5") else
if colour24 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot25.AssignValueColor(if colour25 == 1   then GlobalColor("cp1") else
if colour25 == 11  then GlobalColor("cp6") else
if colour25 == 111 then GlobalColor("cp11") else
if colour25 == 2   then GlobalColor("cp2") else
if colour25 == 22  then GlobalColor("cp7") else
if colour25 == 222 then GlobalColor("cp12") else
if colour25 == 3   then GlobalColor("cp3") else
if colour25 == 33  then GlobalColor("cp8") else
if colour25 == 333 then GlobalColor("cp13") else
if colour25 == 4   then GlobalColor("cp4") else
if colour25 == 44  then GlobalColor("cp9") else
if colour25 == 444 then GlobalColor("cp14") else
if colour25 == 5   then GlobalColor("cp5") else
if colour25 == 55  then GlobalColor("cp10") else
if colour25 == 555 then GlobalColor("cp15") else
if colour25 == 6   then GlobalColor("cn1") else
if colour25 == 66  then GlobalColor("cn6") else
if colour25 == 666 then GlobalColor("cn11") else
if colour25 == 7   then GlobalColor("cn2") else
if colour25 == 77  then GlobalColor("cn7") else
if colour25 == 777 then GlobalColor("cn12") else
if colour25 == 8   then GlobalColor("cn3") else
if colour25 == 88  then GlobalColor("cn8") else
if colour25 == 888 then GlobalColor("cn13") else
if colour25 == 9   then GlobalColor("cn4") else
if colour25 == 99  then GlobalColor("cn9") else
if colour25 == 999 then GlobalColor("cn14") else
if colour25 == 10  then GlobalColor("cn5") else
if colour25 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot26.AssignValueColor(if colour26 == 1   then GlobalColor("cp1") else
if colour26 == 11  then GlobalColor("cp6") else
if colour26 == 111 then GlobalColor("cp11") else
if colour26 == 2   then GlobalColor("cp2") else
if colour26 == 22  then GlobalColor("cp7") else
if colour26 == 222 then GlobalColor("cp12") else
if colour26 == 3   then GlobalColor("cp3") else
if colour26 == 33  then GlobalColor("cp8") else
if colour26 == 333 then GlobalColor("cp13") else
if colour26 == 4   then GlobalColor("cp4") else
if colour26 == 44  then GlobalColor("cp9") else
if colour26 == 444 then GlobalColor("cp14") else
if colour26 == 5   then GlobalColor("cp5") else
if colour26 == 55  then GlobalColor("cp10") else
if colour26 == 555 then GlobalColor("cp15") else
if colour26 == 6   then GlobalColor("cn1") else
if colour26 == 66  then GlobalColor("cn6") else
if colour26 == 666 then GlobalColor("cn11") else
if colour26 == 7   then GlobalColor("cn2") else
if colour26 == 77  then GlobalColor("cn7") else
if colour26 == 777 then GlobalColor("cn12") else
if colour26 == 8   then GlobalColor("cn3") else
if colour26 == 88  then GlobalColor("cn8") else
if colour26 == 888 then GlobalColor("cn13") else
if colour26 == 9   then GlobalColor("cn4") else
if colour26 == 99  then GlobalColor("cn9") else
if colour26 == 999 then GlobalColor("cn14") else
if colour26 == 10  then GlobalColor("cn5") else
if colour26 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot27.AssignValueColor(if colour27 == 1   then GlobalColor("cp1") else
if colour27 == 11  then GlobalColor("cp6") else
if colour27 == 111 then GlobalColor("cp11") else
if colour27 == 2   then GlobalColor("cp2") else
if colour27 == 22  then GlobalColor("cp7") else
if colour27 == 222 then GlobalColor("cp12") else
if colour27 == 3   then GlobalColor("cp3") else
if colour27 == 33  then GlobalColor("cp8") else
if colour27 == 333 then GlobalColor("cp13") else
if colour27 == 4   then GlobalColor("cp4") else
if colour27 == 44  then GlobalColor("cp9") else
if colour27 == 444 then GlobalColor("cp14") else
if colour27 == 5   then GlobalColor("cp5") else
if colour27 == 55  then GlobalColor("cp10") else
if colour27 == 555 then GlobalColor("cp15") else
if colour27 == 6   then GlobalColor("cn1") else
if colour27 == 66  then GlobalColor("cn6") else
if colour27 == 666 then GlobalColor("cn11") else
if colour27 == 7   then GlobalColor("cn2") else
if colour27 == 77  then GlobalColor("cn7") else
if colour27 == 777 then GlobalColor("cn12") else
if colour27 == 8   then GlobalColor("cn3") else
if colour27 == 88  then GlobalColor("cn8") else
if colour27 == 888 then GlobalColor("cn13") else
if colour27 == 9   then GlobalColor("cn4") else
if colour27 == 99  then GlobalColor("cn9") else
if colour27 == 999 then GlobalColor("cn14") else
if colour27 == 10  then GlobalColor("cn5") else
if colour27 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot28.AssignValueColor(if colour28 == 1   then GlobalColor("cp1") else
if colour28 == 11  then GlobalColor("cp6") else
if colour28 == 111 then GlobalColor("cp11") else
if colour28 == 2   then GlobalColor("cp2") else
if colour28 == 22  then GlobalColor("cp7") else
if colour28 == 222 then GlobalColor("cp12") else
if colour28 == 3   then GlobalColor("cp3") else
if colour28 == 33  then GlobalColor("cp8") else
if colour28 == 333 then GlobalColor("cp13") else
if colour28 == 4   then GlobalColor("cp4") else
if colour28 == 44  then GlobalColor("cp9") else
if colour28 == 444 then GlobalColor("cp14") else
if colour28 == 5   then GlobalColor("cp5") else
if colour28 == 55  then GlobalColor("cp10") else
if colour28 == 555 then GlobalColor("cp15") else
if colour28 == 6   then GlobalColor("cn1") else
if colour28 == 66  then GlobalColor("cn6") else
if colour28 == 666 then GlobalColor("cn11") else
if colour28 == 7   then GlobalColor("cn2") else
if colour28 == 77  then GlobalColor("cn7") else
if colour28 == 777 then GlobalColor("cn12") else
if colour28 == 8   then GlobalColor("cn3") else
if colour28 == 88  then GlobalColor("cn8") else
if colour28 == 888 then GlobalColor("cn13") else
if colour28 == 9   then GlobalColor("cn4") else
if colour28 == 99  then GlobalColor("cn9") else
if colour28 == 999 then GlobalColor("cn14") else
if colour28 == 10  then GlobalColor("cn5") else
if colour28 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
plot29.AssignValueColor(if colour28 == 1   then GlobalColor("cp1") else
if colour28 == 11  then GlobalColor("cp6") else
if colour28 == 111 then GlobalColor("cp11") else
if colour28 == 2   then GlobalColor("cp2") else
if colour28 == 22  then GlobalColor("cp7") else
if colour28 == 222 then GlobalColor("cp12") else
if colour28 == 3   then GlobalColor("cp3") else
if colour28 == 33  then GlobalColor("cp8") else
if colour28 == 333 then GlobalColor("cp13") else
if colour28 == 4   then GlobalColor("cp4") else
if colour28 == 44  then GlobalColor("cp9") else
if colour28 == 444 then GlobalColor("cp14") else
if colour28 == 5   then GlobalColor("cp5") else
if colour28 == 55  then GlobalColor("cp10") else
if colour28 == 555 then GlobalColor("cp15") else
if colour28 == 6   then GlobalColor("cn1") else
if colour28 == 66  then GlobalColor("cn6") else
if colour28 == 666 then GlobalColor("cn11") else
if colour28 == 7   then GlobalColor("cn2") else
if colour28 == 77  then GlobalColor("cn7") else
if colour28 == 777 then GlobalColor("cn12") else
if colour28 == 8   then GlobalColor("cn3") else
if colour28 == 88  then GlobalColor("cn8") else
if colour28 == 888 then GlobalColor("cn13") else
if colour28 == 9   then GlobalColor("cn4") else
if colour28 == 99  then GlobalColor("cn9") else
if colour28 == 999 then GlobalColor("cn14") else
if colour28 == 10  then GlobalColor("cn5") else
if colour28 == 110 then GlobalColor("cn10") else GlobalColor("cn15"));
#-- - Bar Colors

AssignPriceColor(if !PaintBars then Color.CURRENT else
if barColour == 1   then GlobalColor("cp1") else
if barColour == 11  then GlobalColor("cp6") else
if barColour == 111 then GlobalColor("cp11") else
if barColour == 2   then GlobalColor("cp2") else
if barColour == 22  then GlobalColor("cp7") else
if barColour == 222 then GlobalColor("cp12") else
if barColour == 3   then GlobalColor("cp3") else
if barColour == 33  then GlobalColor("cp8") else
if barColour == 333 then GlobalColor("cp13") else
if barColour == 4   then GlobalColor("cp4") else
if barColour == 44  then GlobalColor("cp9") else
if barColour == 444 then GlobalColor("cp14") else
if barColour == 5   then GlobalColor("cp5") else
if barColour == 55  then GlobalColor("cp10") else
if barColour == 555 then GlobalColor("cp15") else
if barColour == 6   then GlobalColor("cn1") else
if barColour == 66  then GlobalColor("cn6") else
if barColour == 666 then GlobalColor("cn11") else
if barColour == 7   then GlobalColor("cn2") else
if barColour == 77  then GlobalColor("cn7") else
if barColour == 777 then GlobalColor("cn12") else
if barColour == 8   then GlobalColor("cn3") else
if barColour == 88  then GlobalColor("cn8") else
if barColour == 888 then GlobalColor("cn13") else
if barColour == 9   then GlobalColor("cn4") else
if barColour == 99  then GlobalColor("cn9") else
if barColour == 999 then GlobalColor("cn14") else
if barColour == 10  then GlobalColor("cn5") else
if barColour == 110 then GlobalColor("cn10") else GlobalColor("cn15"));



#-- - END of CODE