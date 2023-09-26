#Volume Buy Sell Pressure with Hot Percent for ThinkorSwim
# Show total volume in gray.Buying volume in green.Sell Volume in red.
# Volume average is gray line.
# Specified percent over average volume is cyan triangles.
# Horserider 12 / 30 / 2019 derived from some already existing studies.


declare lower;

#Inputs

input Show30DayAvg = yes;
input ShowTodayVolume = yes;
input ShowPercentOf30DayAvg = yes;
input UnusualVolumePercent = 200;
input Show30BarAvg = yes;
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

# Labels



#AddLabel(Show30BarAvg, "30 Bar: " + Round(avg30Bars, 0), Color.white);

#AddLabel(ShowCurrentBar, "Cur Bar: " + curVolume, (if percentOf30Bar >= UnusualVolumePercent then Color.GREEN else if PercentOf30Bar >= 100 then Color.ORANGE else Color.LIGHT_GRAY));

#AddLabel(ShowPercentOf30BarAvg, PercentOf30Bar + "%", (if PercentOf30Bar >= UnusualVolumePercent then Color.GREEN else if PercentOf30Bar >= 100 then Color.Light_Green else Color.WHITE) );

assignBackgroundColor(if PercentOf30Bar >= UnusualVolumePercent then color.GREEN else if  PercentOf30Bar >= 100 then color.RED else color.white);
AddLabel(ShowPercentOf30BarAvg, PercentOf30Bar + "%", Color.Black);
#AddLabel(buying >= selling, "" + BuyVolPercent, color.black);
#AddLabel(ShowSellVolumePercent, "Cur Bar Sell %: " + SellVolPercent, (if SellVolPercent > 51 then Color.RED else if SellVolPercent < 49 then Color.GREEN else Color.ORANGE));

#input length = 21;
#input length2 = 21;

#plot VolAvg = Average(volume, length);
#plot VolAvg1 = Average(volume, length2);

#VolAvg.SetDefaultColor(GetColor(1));
#VolAvg1.SetDefaultColor(GetColor(3));


#def crossover = if (VolAvg2 crosses below VolAvg4) then 1 else 0;
#def crossunder = if (VolAvg2 crosses above VolAvg4) and(volume < volavg) then 1 else 0;
#AddVerticalLine(if crossover == 1 then 1 else 0, "", color.cyan);
#AddVerticalLine(if crossunder == 1 then 1 else 0);


# hiVolume indicator
# source: http://tinboot.blogspot.com
# author: allen everhart


#input type = { default SMP, EXP };
#input length_HV = 20;
#input HotPct = 100.0;


#def MA =
    #if type == type.SMP then
#SimpleMovingAvg(volume, length_HV)
#else
#MovAvgExponential(volume, length_HV);

#plot HV =
##ma
#else
#Double.NaN;

#hv.SetDefaultColor(Color.CYAN);
#hv.SetLineWeight(1);
#hv.SetPaintingStrategy(PaintingStrategy.TRIANGLES);