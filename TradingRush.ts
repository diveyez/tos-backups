

#Begin Script

#Created by Trading Rush https://tradingrush.net/ and converted to ThinkScript by an unemployed nobody
# © Trading Rush
#@version=4

declare lower;
input line = 20;
def line_new = line / 10;

def UPa =
if close[1] > close[2] and close[2] > close[3] and close[3] > close[4] and close[4] > close[5] and close[5] > close[6] then yes else no; #Green

def UPb =
if close[1] > close[2] and close[2] > close[3] and close[3] > close[4] then yes else no; #Green Slow

def UPc =
if close[2] > close[3] and close[3] > close[4] and close[4] > close[5] and close[5] > close[6] then yes else no; #Green Slower

def UPd = if close[1] > close[2] and close[3] > close[4] and close[4] > close[5] and close[5] > close[6] then yes else no; #Green Slower

def UPe = if close[1] > close[2] and close[2] > close[3] and close[4] > close[5] and close[5] > close[6] then yes else no; #Green Slower

def UPf = if close[1] > close[2] and close[2] > close[3] and close[3] > close[4] and close[5] > close[6] then yes else no; #Green Slower

def UPg = if close[1] > close[2] and close[2] > close[3] and close[3] > close[4] and close[4] > close[5] then yes else no; #Green Slower


def DNa = if close[1] < close[2] and close[2] < close[3] and close[3] < close[4] and close[4] < close[5] and close[5] < close[6] then yes else no; #Green

def DNb =
if close[1] < close[2] and close[2] < close[3] and close[3] < close[4] then yes else no; #Green Slow

def DNc =
if close[2] < close[3] and close[3] < close[4] and close[4] < close[5] and close[5] < close[6] then yes else no; #Green Slower

def DNd =
if close[1] < close[2] and close[3] < close[4] and close[4] < close[5] and close[5] < close[6] then yes else no; #Green Slower

def DNe =
if close[1] < close[2] and close[2] < close[3] and close[4] < close[5] and close[5] < close[6] then yes else no; #Green Slower

def DNf =
if close[1] < close[2] and close[2] < close[3] and close[3] < close[4] and close[5] < close[6] then yes else no; #Green Slower

def DNg =
if close[1] < close[2] and close[2] < close[3] and close[3] < close[4] and close[4] < close[5] then yes else no; #Green Slower

def hist =
if UPa or DNa then
10
else
if UPb or DNb then
10
else
if UPc or UPd or Upe or UPf or UPg or DNc or DNd or DNe or DNf or DNg then
10
else
0;
#
def main = hist[1] + hist[2] + hist[3] + hist[4] + hist[5] + hist[6] + hist[7] + hist[8] + hist[9] + hist[10] / 10;
#
def mainColor = if (main < main[1]) then
yes
else
no;

plot Choppy = hist * line_new;
Choppy.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Choppy.SetLineWeight(2);
Choppy.AssignValueColor(if UPa or DNa then CreateColor(76, 175, 80) else if UPb or DNb then CreateColor(129, 199, 132) else if UPc or UPd or UPe or UPf or UPg or DNc or DNd or UPe or UPf or UPg then CreateColor(200, 230, 201) else color.white); #ColorGreen, ColorGreenSlow, ColorGreenSlower

plot TheLine = line;
TheLine.SetLineWeight(2);
TheLine.AssignValueColor(color.orange);

plot TheAverage = main;
TheAverage.SetLineWeight(2);
TheAverage.AssignValueColor(if mainColor then color.red else CreateColor(170, 76, 175));

