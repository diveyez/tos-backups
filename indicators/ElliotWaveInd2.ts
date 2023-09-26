

# posted to TOS_thinkscript @yahoogroups.com - 11 / 28 / 2012
# this study was also found on thinkscripter.com circa 11 / 2013
# author: unknown(possibly David Elliot, Eric Purdy, or Mobius)
# PaintBars added by ZupDog
# Vertical Lines added by ZupDog


input Color_Candles = No;
input showverticals = no;
input showbackground = no;
input ColoredMobo = yes;
input ColoredFill = yes;
input BreakArrows = yes;
input ShowAlerts = yes;
input SoundType = { default "NoSound", "Bell", "Chimes", "Ding", "Ring"};
input price = close;
input displace = 0;
input length = 10;
input Num_Dev_Dn = -0.8;
input Num_Dev_Up = +0.8;
def lastBar = if (IsNaN(close), 1, 0);
def sDev = stdev(data = price[-displace], length = length);
def MidLine = Average(data = price[-displace], length = length);
def LowerBand = MidLine + num_Dev_Dn * sDev;
def UpperBand = MidLine + num_Dev_Up * sDev;
def MoboStatus =
if close > UpperBand then 2 # Mobo Up
else
if close < LowerBand then - 2 # Mobo Down
else 0; # between the bands
rec BreakStatus = compoundValue(1,
if BreakStatus[1] == MoboStatus or MoboStatus == 0 then BreakStatus[1]
else
if MoboStatus == 2 then 2
else -2, 0);

plot MidlineP = Midline;
MidLineP.SetDefaultColor(GetColor(1));
MidLineP.hide();

plot UpperBandP = UpperBand;
UpperBandP.AssignValueColor(
if !ColoredMobo then Color.White
else
if BreakStatus[0] == 2 then Color.Green
else Color.Red);
UpperBandP.SetLineWeight(1);

plot LowerBandP = LowerBand;
LowerBandP.AssignValueColor(
if !ColoredMobo then Color.White
else
if BreakStatus[0] == 2 then Color.Green
else Color.Red);
LowerBandP.SetLineWeight(1);

# Breakout / down arrows.

plot BreakOutArrow =
if BreakArrows then
if BreakStatus[0] == BreakStatus[1] then double.NAN
else if BreakStatus[0] == 2 then
close else double.NAN
else double.NAN;
BreakOutArrow.SetPaintingStrategy(PaintingStrategy.Arrow_Up);
BreakOutArrow.SetDefaultColor(Color.Red);
BreakOutArrow.SetLineWeight(3);
plot BreakDownArrow =
if BreakArrows then
if BreakStatus[0] == BreakStatus[1] then double.NAN
else if BreakStatus[0] == -2 then
close else double.NAN
else double.NAN;
BreakDownArrow.SetPaintingStrategy(PaintingStrategy.Arrow_Down);
BreakDownArrow.SetDefaultColor(Color.Green);
BreakDownArrow.SetLineWeight(3);
AssignBackgroundColor(if showbackground && breakstatus == -2 then CreateColor(51, 0, 0) else if showbackground && breakstatus == 2 then CreateColor(0, 51, 0) else color.current);
# colored clouds
plot GreenUpper = if ColoredFill and BreakSTatus[0] == 2 then
UpperBandP else double.NAN;
GreenUpper.SetDefaultColor(CreateColor(0, 100, 0));
plot GreenLower = if ColoredFill and BreakStatus[0] == 2 then
LowerBandP else double.NAN;
GreenLower.SetDefaultColor(CreateColor(0, 100, 0));
AddCloud(GreenUpper, GreenLower, CreateColor(0, 100, 0), color.red);
plot RedUpper = if ColoredFill and BreakSTatus[0] == -2 then
UpperBandP else double.NAN;
RedUpper.SetDefaultColor(CreateColor(200, 0, 0));
plot RedLower = if ColoredFill and BreakStatus[0] == -2 then
LowerBandP else double.NAN;
RedLower.SetDefaultColor(CreateColor(200, 0, 0));
AddCloud(RedUpper, RedLower, CreateColor(200, 0, 0), color.green);
alert(ShowAlerts and BreakStatus[1] == 2
and(BreakStatus[1] <> BreakStatus[2]), "MoBo BreakOUT", Alert.Bar,
    SoundType);
alert(ShowAlerts and BreakStatus[1] == -2
and(BreakStatus[1] <> BreakStatus[2]), "MoBo BreakDOWN", Alert.Bar,
    SoundType);

AddVerticalLine(showverticals and BreakOutArrow, " YGs_ElliottWave ", Color.GREEN);
AddVerticalLine(showverticals and BreakDownArrow, " YGs_ElliottWave ", Color.MAGENTA);

DefineGlobalColor("Positive", Color.BLUE);
DefineGlobalColor("Negative", Color.DARK_RED);

AssignPriceColor(if !Color_Candles
then Color.CURRENT
else if BreakStatus[0] == 2
then GlobalColor("Positive")
else GlobalColor("Negative"));

