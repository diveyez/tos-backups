

##vZone_Labels
##This is Companian Indicator for vZone, which is based on the Following concept and, I suggest watch the video before you start to use this.
##
## https://www.screencast.com/users/MarketGauge/folders/DATE1010/media/f1702bb2-2090-463a-8ad2-59639c1166cd
## This is to Plot Support / Resistance based on High Volume Candle in three different time zones for the day.
##
## Removing the header Credit credits and description is not permitted, any modification needs to be shared.
## A big thanks to @COS251 for helping me with Coding this, Reviewing and Testing it.
##
# Version 1.0.2
#
# Created on 01 /08 / 21
# Created by: SuryaKiranC ## Included rVolume label and Changed length as input.

    #hint: <b>vZone_Labels Lower Study < /b> \n Setup inputs as per your preferences \n <li>Replacement for Standard TOS Volume Bars, Disable VolumeSubgraph.</li >
        #hint Length: <b>No of Bars for Average Calculation.< /b> <li>Adjust as per your preference.</li >
            #hint Barlength: <b>Near term No of Bars for Average Calculations.< /b> <li>Adjust as per your preference.</li >
                #hint ShowVolAvg: <b>Plot Vol Average across Volume Bars.< /b> <li>Set "No" if this is not needed for you.</li >
                    #hint ShowPreMktVol: <b>Enable / Disable PreMkt Volume.< /b> <li>Set "No" if this is not needed for you.</li >
                        #hint ShowZoneVol: <b>Enable / Disable Per Zone Volume.< /b> <li>Set "No" if this is not needed for you.</li >
                            #hint ShowPostMktVol: <b>Enable / Disable PostMkt Volume.< /b> <li>Set "No" if this is not needed for you.</li >

                                #hint ShowDayAvg: <b>Enable / Disable Average Volume of Days set in the Length above.< /b> <li>Set "No" if this is not needed for you.</li >
                                    #hint ShowTodayVolume: <b>Enable / Disable Today's Volume</b> <li>Set "No" if this is not needed for you.</li>
#hint ShowRvol: <b>Enable / Disable Relative Volume to Length Days < /b> <li>Set "No" if this is not needed for you.</li >
    #hint UnusualVolumePercent: <b>Define your own UnusualVolume, Typical Liquid Stock 110 % and above.< /b> <li>Set "No" if this is not needed for you.</li >
        #hint ShowBarAvg: <b>Enable / Disable Average Bar volume, On Daily This is same as ShowDayAvg.</ b > <li>Set "No" if this is not needed for you.< /li>
#hint ShowCurrentBar: <b>Enable / Disable Current Bar Volume.< /b> <li>Set "No" if this is not needed for you.</li >
    #hint ShowPercentOfBarAvg: <b>Enable / Disable % if Volume, Compared to Days / Bar of Length < /b> <li>Set "No" if this is not needed for you.</li >
        #hint ShowBarsSell: <b>Enable / Disable Sell Volume for length < /b> <li>Set "No" if this is not needed for you.</li >
            #hint Show6BarSell: <b>Enable / Disable Sell Volume for Last 6 Bar < /b> <li>Set "No" if this is not needed for you.</li >
                #hint ShowSellVolume: <b>Enable / Disable Current Volume Sell Compared to length Bars < /b> <li>Set "No" if this is not needed for you.</li >

                    #declare lower; # If you disable Volume subgraph and using as lower study uncomment this and comment the next one.
declare on_volume; #If you need to use only labels as a top study comment "Selling Volume" & "Buying Volume", along with this line with a "#" in -front of the line

DefineGlobalColor("Zone1", CreateColor(204, 255, 225));
DefineGlobalColor("Zone2", CreateColor(252, 220, 101));
DefineGlobalColor("Zone3", CreateColor(204, 204, 198));

input Length = 21;
input Barlength = 6;
input ShowVolAvg = Yes;

input  ShowPreMktVol = Yes;
input    ShowZoneVol = Yes;
input ShowPostMktVol = Yes;

def Zone1 = gettime() >= RegularTradingStart(GetYYYYMMDD()) and gettime() <= RegularTradingStart(GetYYYYMMDD()) + 90 * 60 * 1000;
def Zone2 = gettime() > RegularTradingStart(GetYYYYMMDD()) + 90 * 60 * 1000 and gettime() <= RegularTradingEnd(GetYYYYMMDD()) - 120 * 60 * 1000;
def Zone3 = gettime() > RegularTradingEnd(GetYYYYMMDD()) - 120 * 60 * 1000 and gettime() <= RegularTradingEnd(GetYYYYMMDD());

def startTime = 0930;
def   update1 = 1100;
def   update2 = 1400;
def   endTime = 1600;
def isNewDay = GetDay() == GetLastDay();
def yyyymmdd = GetYYYYMMDD();
def period = yyyymmdd;
def isPeriodRolled = CompoundValue(1, period != period[1], 1);
def sumVol = if isPeriodRolled then volume else CompoundValue(1, sumVol[1] + volume, volume);

######################### Current BAR ########################
def O = open;
def H = high;
def C = close;
def L = low;
def V = volume;
def Buying = V * (C - L) / (H - L);
def Selling = V * (H - C) / (H - L);

######################## 6BAR ################################
def HH6 = Average(high[1], Barlength);
def HC6 = Average(close[1], Barlength);
def HL6 = Average(low[1], Barlength);
def HV6 = Average(volume[1], Barlength);
def  Buy6 = HV6 * (HC6 - HL6) / (HH6 - HL6);
def Sell6 = HV6 * (HH6 - HC6) / (HH6 - HL6);

###################### 30BAR #################################
def HH30 = Average(high[1], Length);
def HC30 = Average(close[1], Length);
def HL30 = Average(low[1], Length);
def HV30 = Average(volume[1], Length);
def Buy30 = HV30 * (HC30 - HL30) / (HH30 - HL30);
def Sell30 = HV30 * (HH30 - HC30) / (HH30 - HL30);

###################### 6Bar Volume % #########################
def H6Vol = Round(Buy6, 0) + Round(Sell6, 0);
def H6buyPercent = (Round(Buy6, 0) / H6Vol) * 100;
def H6sellPercent = (Round(Sell6, 0) / H6Vol) * 100;

###################### 30Bar Volume %   ######################
def H30Vol = Round(Buy30, 0) + Round(Sell30, 0);
def H30buyPercent = (Round(Buy30, 0) / H30Vol) * 100;
def H30sellPercent = (Round(Sell30, 0) / H30Vol) * 100;

####################### Volume Stats #########################
def volDayAvg = Average(volume(Period = "DAY")[1], Length);
def DayVol = volume(period = "DAY");
def rVol = Round((DayVol / volDayAvg), 2);
def avgBars = Average(volume[1], Length);
def curVolume = volume;
def percentOfBars = Round((curVolume / avgBars) * 100, 0);
def SellVolPercent = Round((Selling / Volume) * 100, 0);

######################### Labels ##############################
input ShowDayAvg = yes;
input ShowTodayVolume = yes;
input ShowRvol = yes;
input UnusualVolumePercent = 110;
input ShowBarAvg = yes;
input ShowCurrentBar = yes;
input ShowPercentOfBarAvg = yes;

AddLabel(ShowDayAvg, Length + "D: " + Round(volDayAvg * .000001, 1) + " M ", Color.LIGHT_GRAY);
AddLabel(ShowTodayVolume, "D: " + Round(DayVol * .000001, 1) + " M ", (if rVol >= UnusualVolumePercent then Color.GREEN else if rVol >= 100 then Color.ORANGE else Color.LIGHT_GRAY));
AddLabel(ShowRvol, "rVol: " + rVol, (if rVol >= UnusualVolumePercent then Color.GREEN else if rVol >= 100 then Color.ORANGE else Color.WHITE));
AddLabel(ShowBarAvg, "30Bar: " + Round(avgBars * .001, 1) + " K ", Color.LIGHT_GRAY);
AddLabel(ShowCurrentBar, "CurBar: " + Round(curVolume * .001, 2) + " K ", (if percentOfBars >= UnusualVolumePercent then Color.GREEN else if percentOfBars >= 100 then Color.ORANGE else Color.LIGHT_GRAY));
AddLabel(ShowPercentOfBarAvg, percentOfBars + "%", (if percentOfBars >= UnusualVolumePercent then Color.GREEN else if percentOfBars >= 100 then Color.ORANGE else Color.WHITE) );

############################################ 30 Bar Stats ############################################
input ShowBarsSell = yes;
AddLabel(ShowBarsSell, length + "BarSell: " + Round(H30sellPercent, 0) + "% ", (if H30sellPercent > 55 then Color.RED else if H30sellPercent < 45 then Color.GREEN else Color.ORANGE));
############################################ 6 Bar Stats #############################################
input Show6BarSell = yes;
AddLabel(Show6BarSell, Barlength + "BarSell: " + Round(H6sellPercent, 0) + "% ", (if H6sellPercent > 55 then Color.RED else if H6sellPercent < 45 then Color.GREEN else Color.ORANGE));
############################################ Current Bar Stats ########################################
input ShowSellVolume = yes;
AddLabel(ShowSellVolume, "CurSell: " + Round(SellVolPercent, 0) + "% ", (if SellVolPercent > 51 then Color.RED else if SellVolPercent < 49 then Color.GREEN else Color.ORANGE));

##################### Selling Volume #####################
plot SVol = Selling;
SVol.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
SVol.SetDefaultColor(Color.DARK_ORANGE);
SVol.HideTitle();
SVol.HideBubble();
SVol.SetLineWeight(3);

##################### Buying Volume ######################
plot BVol = Buying;
BVol.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
BVol.SetDefaultColor(Color.LIGHT_GREEN);
BVol.HideTitle();
BVol.HideBubble();
BVol.SetLineWeight(3);

##################### Plots and Style ###################
plot Vol = volume;
plot VolAvg = Average(volume[1], Length);
VolAvg.SetHiding(!ShowVolAvg);
Vol.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Vol.SetLineWeight(3);
Vol.DefineColor("Up", Color.UPTICK);
Vol.DefineColor("Down", Color.DOWNTICK);
Vol.AssignValueColor(if close > close[1] then Vol.color("Up") else if close < close[1] then Vol.color("Down") else GetColor(1));
VolAvg.SetDefaultColor(GetColor(8));

def PreMkt = RegularTradingStart(GetYYYYMMDD()) > GetTime();
def PreVol = if PreMkt and!PreMkt[1] then volume else if PreMkt then PreVol[1] + volume else PreVol[1];
AddLabel(if GetAggregationPeriod() > AggregationPeriod.THIRTY_MIN or!ShowPreMktVol then 0 else 1, "PreMktVol = " + Round(PreVol * .000001, 3) + "M ", Color.YELLOW);

def RTH1Zone = SecondsFromTime(startTime) >= 0 and SecondsTillTime(update1) > 0;
def RTH1ZoneVol = if RTH1Zone and!RTH1Zone[1] then volume else if RTH1Zone[1] then RTH1ZoneVol[1] + volume else RTH1ZoneVol[1];
AddLabel(if GetAggregationPeriod() > AggregationPeriod.THIRTY_MIN or!ShowZoneVol then 0 else 1, "Zone1Vol = " + Round(RTH1ZoneVol * .000001, 3) + "M ", GlobalColor("Zone1"));

def RTH2Zone = SecondsFromTime(update1) >= 0 and SecondsTillTime(update2) > 0;
def RTH2ZoneVol = if RTH2Zone and!RTH2Zone[1] then volume else if RTH2Zone[1] then RTH2ZoneVol[1] + volume else RTH2ZoneVol[1];
AddLabel(if GetAggregationPeriod() > AggregationPeriod.THIRTY_MIN or!ShowZoneVol then 0 else 1, "Zone2Vol = " + Round(RTH2ZoneVol * .000001, 3) + "M ", GlobalColor("Zone2"));

def RTH3Zone = SecondsFromTime(update2) >= 0 and SecondsTillTime(endTime) > 0;
def RTH3ZoneVol = if RTH3Zone and!RTH3Zone[1] then volume else if RTH3Zone[1] then RTH3ZoneVol[1] + volume else RTH3ZoneVol[1];
AddLabel(if GetAggregationPeriod() > AggregationPeriod.THIRTY_MIN or!ShowZoneVol then 0 else 1, "Zone3Vol = " + Round(RTH3ZoneVol * .000001, 3) + "M ", GlobalColor("Zone3"));

AddVerticalLine(if isNewDay and RTH1Zone == 0 and RTH1Zone[1] == 1 then yes else no, "             Zone 1  Mark", color = GlobalColor("Zone1"));
AddVerticalLine(if isNewDay and RTH2Zone == 0 and RTH2Zone[1] == 1 then yes else no, "             Zone 2  Mark", color = GlobalColor("Zone2"));
AddVerticalLine(if isNewDay and RTH3Zone == 0 and RTH3Zone[1] == 1 then yes else no, "             Zone 3  Mark", color = GlobalColor("Zone3"));

def PostMkt = RegularTradingEnd(GetYYYYMMDD()) < GetTime();
def PostVol = if PostMkt and!PostMkt[1] then volume else if PostMkt then PostVol[1] + volume else PostVol[1];
AddLabel(if GetAggregationPeriod() > AggregationPeriod.THIRTY_MIN or!ShowPostMktVol then 0 else 1, "PostMktVol = " + Round(PostVol * .000001, 3) + "M ", Color.YELLOW);
#End Volume RTH First 60 Mins

