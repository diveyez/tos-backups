# Volume Buy Sell Pressure with Hot Percent for ThinkorSwim
# Show total volume in gray.Buying volume in green.Sell Volume in red.
# Volume average is gray line.
# Specified percent over average volume is cyan triangles.
# Horserider 12 / 30 / 2019 derived from some already existing studies.


declare lower;

#Inputs
input showmarket = yes;
input Show30DayAvg = no;
input ShowTodayVolume = no;
input ShowPercentOf30DayAvg = yes;
input UnusualVolumePercent = 200;
input Show30BarAvg = no;
input ShowCurrentBar = yes;
input ShowPercentOf30BarAvg = yes;
input ShowSellVolumePercent = yes;

def O = open;
def H = high;
def C = close;
def L = low;
def V = volume;
def buying = V * (C - L) / (H - L);
def selling = V * (H - C) / (H - L);

# Selling Volume

Plot SellVol = selling;
SellVol.setPaintingStrategy(PaintingStrategy.Histogram);
SellVol.SetDefaultColor(Color.Red);
SellVol.HideTitle();
SellVol.HideBubble();
SellVol.SetLineWeight(1);

# Total Volume

# Note that Selling + Buying Volume = Volume.
plot TV = volume;

TV.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
TV.SetDefaultColor(Color.GRAY);
#TV.HideTitle();
#TV.HideBubble();
TV.SetLineWeight(1);

Plot BuyVol = buying;
BuyVol.setPaintingStrategy(PaintingStrategy.Histogram);
BuyVol.SetDefaultColor(Color.Green);
BuyVol.HideTitle();
BuyVol.HideBubble();
BuyVol.SetLineWeight(5);

#Volume Data

def volLast30DayAvg = (volume(period = "DAY")[1] + volume(period = "DAY")[2] + volume(period = "DAY")[3] + volume(period = "DAY")[4] + volume(period = "DAY")[5] + volume(period = "DAY")[6] + volume(period = "DAY")[7] + volume(period = "DAY")[8] + volume(period = "DAY")[9] + volume(period = "DAY")[10] + volume(period = "DAY")[11] + volume(period = "DAY")[12] + volume(period = "DAY")[13] + volume(period = "DAY")[14] + volume(period = "DAY")[15] + volume(period = "DAY")[16] + volume(period = "DAY")[17] + volume(period = "DAY")[18] + volume(period = "DAY")[19] + volume(period = "DAY")[20] + volume(period = "DAY")[21] + volume(period = "DAY")[22] + volume(period = "DAY")[23] + volume(period = "DAY")[24] + volume(period = "DAY")[25] + volume(period = "DAY")[26] + volume(period = "DAY")[27] + volume(period = "DAY")[28] + volume(period = "DAY")[29] + volume(period = "DAY")[30]) / 30;
def today = volume(period = "DAY");
def percentOf30Day = Round((today / volLast30DayAvg) * 100, 0);
def avg30Bars = (volume[1] + volume[2] + volume[3] + volume[4] + volume[5] + volume[6] + volume[7] + volume[8] + volume[9] + volume[10] + volume[11] + volume[12] + volume[13] + volume[14] + volume[15] + volume[16] + volume[17] + volume[18] + volume[19] + volume[20] + volume[21] + volume[22] + volume[23] + volume[24] + volume[25] + volume[26] + volume[27] + volume[28] + volume[29] + volume[30]) / 30;
def curVolume = volume;
def percentOf30Bar = Round((curVolume / avg30Bars) * 100, 0);
def SellVolPercent = Round((Selling / Volume) * 100, 0);
def BuyVolPercent = Round((buying / Volume) * 100, 0);

# Labels
AddLabel(ShowTodayVolume, "Today: " + today, (if percentOf30Day >= UnusualVolumePercent then Color.GREEN else if percentOf30Day >= 100 then Color.ORANGE else Color.LIGHT_GRAY));

AddLabel(Show30DayAvg, "Avg 30 Days: " + Round(volLast30DayAvg, 0), Color.LIGHT_GRAY);

AddLabel(ShowPercentOf30DayAvg, percentOf30Day + "%", (if percentOf30Day >= UnusualVolumePercent then Color.GREEN else if percentOf30Day >= 100 then Color.ORANGE else Color.WHITE) );

AddLabel(Show30BarAvg, "Avg 30 Bars: " + Round(avg30Bars, 0), Color.LIGHT_GRAY);

AddLabel(ShowPercentOf30BarAvg, PercentOf30Bar + "%", (if PercentOf30Bar >= UnusualVolumePercent then Color.GREEN else if PercentOf30Bar >= 100 then Color.ORANGE else Color.WHITE) );

AddLabel(ShowCurrentBar, "Current Bar: " + curVolume, (if percentOf30Bar >= UnusualVolumePercent then Color.GREEN else if PercentOf30Bar >= 100 then Color.ORANGE else Color.LIGHT_GRAY));

AddLabel(ShowSellVolumePercent, "Selling Pressure: " + SellVolPercent + "%", (if SellVolPercent > 51 then Color.RED else if SellVolPercent < 49 then Color.GREEN else Color.ORANGE));

AddLabel(ShowSellVolumePercent, "Buying Pressure: " + BuyVolPercent + "%", (if BuyVolPercent > 51 then Color.Green else if SellVolPercent < 49 then Color.red else Color.ORANGE));

input length = 21;
input length2 = 21;

plot VolAvg = Average(volume, length);
#plot VolAvg1 = Average(volume, length2);

VolAvg.Setdefaultcolor(Color.Gray);


#def crossover = if (VolAvg2 crosses below VolAvg4) then 1 else 0;
#def crossunder = if (VolAvg2 crosses above VolAvg4) and(volume < volavg) then 1 else 0;
#AddVerticalLine(if crossover == 1 then 1 else 0, "", color.cyan);
#AddVerticalLine(if crossunder == 1 then 1 else 0);


# hiVolume indicator
# source: http://tinboot.blogspot.com
# author: allen everhart


input type = { default SMP, EXP };
input length_HV = 20;
input HotPct = 100.0;

def MA =
if type == type.SMP then
SimpleMovingAvg(volume, length_HV)
else
MovAvgExponential(volume, length_HV);

plot HV =
if 100 * ((volume / ma) - 1) >= hotPct then
ma
else
Double.NaN;

hv.SetDefaultColor(Color.CYAN);
hv.SetLineWeight(1);
hv.SetPaintingStrategy(PaintingStrategy.TRIANGLES);

# Market Breath Ratios
# Paris(based on an earlier idea from ESP)
# 11.02.2015
# One Note Download

def UVOL = close(“$UVOL”);
def DVOL = close(“$DVOL”);

def UVOLD = close(“$UVOLI”);
def DVOLD = close(“$DVOLI”);

def UVOLS = close(“$UVOLSP”);
def DVOLS = close(“$DVOLSP”);

def UVOLN = close(“$UVOL / Q”);
def DVOLN = close(“$DVOL / Q”);

def UVOLR = close(“$UVOLRL”);
def DVOLR = close(“$DVOLRL”);

#addLabel(showmarket, "Broad Mkt Ratios -->", Color.Light_Gray);

def SPYRatio = if (UVOLS >= DVOLS) then(UVOLS / DVOLS) else -(DVOLS / UVOLS);
AddLabel(showmarket, "S&P500: " + Concat(Round(SPYRatio, 2), ” : 1”), if SPYRatio >= 0 then Color.UPTICK else Color.DOWNTICK);

def DJIRatio =  if (UVOLD >= DVOLD) then(UVOLD / DVOLD) else -(DVOLD / UVOLD);
AddLabel(showmarket, "DJI: " + Concat(Round(DJIRatio, 2), ” : 1”), if DJIRatio >= 0 then Color.UPTICK else Color.DOWNTICK);

def NDXRatio =  if (UVOLN >= DVOLN) then(UVOLN / DVOLN) else -(DVOLN / UVOLN);
AddLabel(showmarket, "QQQ: " + Concat(Round(NDXRatio, 2), ” : 1”), if NDXRatio >= 0 then Color.UPTICK else Color.DOWNTICK);

def RUTRatio =  if (UVOLR >= DVOLR) then(UVOLR / DVOLR) else -(DVOLR / UVOLR);
AddLabel(showmarket, "R2000: " + Concat(Round(RUTRatio, 2), ” : 1”), if RUTRatio >= 0 then Color.UPTICK else Color.DOWNTICK);

def NYSERatio =  if (UVOL >= DVOL) then(UVOL / DVOL) else -(DVOL / UVOL);
AddLabel(showmarket, "NYSE: " + Concat(Round(NYSERatio, 2), ” : 1”), if NYSERatio >= 0 then Color.UPTICK else Color.DOWNTICK);