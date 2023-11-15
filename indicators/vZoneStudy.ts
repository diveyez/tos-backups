## vZoneSTUDY.ts
## This Indicator is based on the Following concept and, I suggest watch the video before you start to use this.
##
## https://www.screencast.com/users/MarketGauge/folders/DATE1010/media/f1702bb2-2090-463a-8ad2-59639c1166cd
## This is to Plot Support / Resistance based on High Volume Candle in three different time zones for the day.
##
## Removing the header Credit credits and description is not permitted, any modification needs to be shared.
## A big thanks to @COS251 for helping me with Coding this, Reviewing and Testing it.
##
## V 1.2 : No changes to the logic But just hints and header updates, also added a tiny URL for the video.
## V 1.1 : Just added the ability to disable the vZones, automatically, extending from previous in to current session.
##  Note: It is available as an option, should somebody prefer the extension.Set "Extend" to your needs accordingly.
## V 1.0 : Split Day in to three Zones and Find the highest Volume Candle for each zone and plot Support / Resistance.
##       :     Zone 1 : 09: 30 - 11:00
##       :     Zone 2 : 11:00 - 14:00
##       :     Zone 3 : 14:00 - 16:00
##       :     vZones are Plotted on 15m and lower charts.
##       :  Plots EMA Cloud to assist with identifying reversals, Keeping EMA Clouds for all Timeframes
#hint: <b>vZoneStudy for Upper Chart.< /b> \n <li> Suggestion, See the following Video</li > https://tinyurl.com/yzaxrf7e <li>Volume Based Support/Resistance for Intraday.</li>
    #hint showEMACloud: <b>Helps find Reversal < /b> <li>Select "No" if it is too loud on your charts.</li >
        #hint audibleAlerts: <b>TOS Sounds for Condition < /b> <li>Select "No" if it is too loud for you.</li >
            #hint Extend: <b>Extend vZone Clouds from past session < /b> <li>Select "No" if it is too loud for you.</li >
                declare once_per_bar;

def Future = if GetSymbolPart(1) == "/YM:XCBT"  or # Reserved for any further work, not used at the moment other than display the label.
    GetSymbolPart(1) == "/ES:XCME"  or
GetSymbolPart(1) == "/NQ:XCME"  or
GetSymbolPart(1) == "/RTY:XCME" or
GetSymbolPart(1) == "/EMD:XCME" or
GetSymbolPart(1) == "/NKD:XCME" or
GetSymbolPart(1) == “/DX:XICE"  or
GetSymbolPart(1) == "/6E:XCME"  or
GetSymbolPart(1) == "/6A:XCME"  or
GetSymbolPart(1) == "/ZB:XCBT"  or
GetSymbolPart(1) == "/ZN:XCBT"  or
GetSymbolPart(1) == "/CL:XNYM"  or
GetSymbolPart(1) == "/NG:XNYM"  or
GetSymbolPart(1) == "/GC:XCEC"  or
GetSymbolPart(1) == "/SI:XCEC"  or
GetSymbolPart(1) == "/HG:XCEC”  or
GetSymbolPart(1) == "/6B:XCME"  or
GetSymbolPart(1) == "/ZC:XCBT"  or
GetSymbolPart(1) == "/ZS:XCBT"  or
GetSymbolPart(1) == "/CC:XICE"  or
GetSymbolPart(1) == "/KC:XICE"  or
GetSymbolPart(1) == ”/CT:XICE"  or
GetSymbolPart(1) == "/ZW:XCBT"  or
GetSymbolPart(1) == "/SB:XICE"  or
GetSymbolPart(1) == "/LE:XCME"  or
GetSymbolPart(1) == "/HO:XNYM"  or
GetSymbolPart(1) == "/HE:XCME"  or
GetSymbolPart(1) == "/OJ:XICE"  then yes else no;

AddLabel(if Future then yes else no, "Future", Color.YELLOW);

input   showEMACloud = Yes;
input  audibleAlerts = Yes;
input Extend = { default "No", "Yes"};

def Today = GetYYYYMMDD();
def StartTime = 0930;
def   Update1 = 1100;
def   Update2 = 1400;
def   EndTime = 1600;

def Zone1 = SecondsFromTime(StartTime) >= 0 and SecondsTillTime(Update1) >= 0;
def Zone2 = SecondsFromTime(Update1) >= 0 and SecondsTillTime(Update2) >= 0;
def Zone3 = SecondsFromTime(Update2) >= 0 and SecondsTillTime(EndTime) >= 0;

DefineGlobalColor("Zone1", CreateColor(204, 255, 225));
DefineGlobalColor("Zone2", CreateColor(252, 220, 101));
DefineGlobalColor("Zone3", CreateColor(204, 204, 198));
DefineGlobalColor("EMA1+", CreateColor(201, 255, 234));
DefineGlobalColor("EMA1-", CreateColor(255, 105, 105));
DefineGlobalColor("EMA2+", CreateColor(125, 176, 130));
DefineGlobalColor("EMA2-", CreateColor(194, 152, 227));
DefineGlobalColor("EMA3+", CreateColor(161, 217, 247));
DefineGlobalColor("EMA3-", CreateColor(255, 255, 112));

def  ema1low = 5;
def ema1high = 13;
def  ema2low = 34;
def ema2high = 51;
def  ema3low = 72;
def ema3high = 89;

def  ema5 = if showEMACloud then ExpAverage(close, ema1low) else Double.NaN;
def ema13 = if showEMACloud then ExpAverage(close, ema1high) else Double.NaN;
def ema34 = if showEMACloud then ExpAverage(close, ema2low) else Double.NaN;
def ema51 = if showEMACloud then ExpAverage(close, ema2high) else Double.NaN;
def ema72 = if showEMACloud then ExpAverage(close, ema3low) else Double.NaN;
def ema89 = if showEMACloud then ExpAverage(close, ema3high) else Double.NaN;

AddCloud(ema5, ema13, GlobalColor("EMA1+"), GlobalColor("EMA1-"));
AddCloud(ema34, ema51, GlobalColor("EMA2+"), GlobalColor("EMA2-"));
AddCloud(ema72, ema89, GlobalColor("EMA3+"), GlobalColor("EMA3-"));

def CrossAbove = if showEMACloud and ema5 > ema89 and ema5[1] <= ema89[1] then 1 else 0;
def CrossBelow = if showEMACloud and ema5 < ema13 and ema5[1] >= ema13[1] then 1 else 0;

Alert(showEMACloud and audibleAlerts and CrossAbove, "Buy", Alert.BAR, Sound.Ding);
Alert(showEMACloud and audibleAlerts and CrossBelow, "Sell", Alert.BAR, Sound.Ring);

################################################################
##########         Booleans Set for Plot Use           #########
################################################################
def afterStart;
def beforeEnd;
def openPrice;
if GetAggregationPeriod() <= AggregationPeriod.THIRTY_MIN {
    afterStart = GetTime() > RegularTradingStart(GetYYYYMMDD());
    beforeEnd = GetTime() < RegularTradingEnd(GetYYYYMMDD());
    openPrice = DailyOpen();
} else {
    afterStart = Double.NaN;
    beforeEnd = Double.NaN;
    openPrice = Double.NaN;
}

script Zone {
    def H;
    def L;
    def V;

    input CountIn = 0930;
    input CountOut = 1100;
    def TF = SecondsFromTime(CountIn) >= 0 and SecondsTillTime(CountOut) >= 0;

    if TF and!TF[1] {
        H = high;
        L = low;
        V = volume;
    } else if TF and volume > V[1] {
        H = high;
        L = low;
        V = volume;
    } else {
        H = H[1];
        L = L[1];
        V = V[1];
    }
  plot VZH = H;
  plot VZL = L;
    VZH.Hide();
    VZL.Hide();
}

def Z1H;
def Z1L;
def Z2H;
def Z2L;
def Z3H;
def Z3L;

switch (Extend) {

Case "Yes":
Z1H = Zone(CountIn = StartTime, CountOut = Update1).VZH;
Z2H = Zone(CountIn = Update1, CountOut = Update2).VZH;
Z3H = Zone(CountIn = Update2, CountOut = EndTime).VZH;

Z1L = Zone(CountIn = StartTime, CountOut = Update1).VZL;
Z2L = Zone(CountIn = Update1, CountOut = Update2).VZL;
Z3L = Zone(CountIn = Update2, CountOut = EndTime).VZL;

Case "No":
Z1H = if today != today[1] then Double.NaN else Zone(CountIn = StartTime, CountOut = Update1).VZH;
Z2H = if today and!Zone2 then Double.NaN else Zone(CountIn = Update1, CountOut = Update2).VZH;
Z3H = if today and!Zone3 then Double.NaN else Zone(CountIn = Update2, CountOut = EndTime).VZH;

Z1L = if today != today[1] then Double.NaN else Zone(CountIn = StartTime, CountOut = Update1).VZL;
Z2L = if today and!Zone2 then Double.NaN else Zone(CountIn = Update1, CountOut = Update2).VZL;
Z3L = if today and!Zone3 then Double.NaN else Zone(CountIn = Update2, CountOut = EndTime).VZL;
}

def BelowVZ = if Zone1 and close < Z1L or Zone2 and close < Z2L or Zone3 and close < Z3L then 1 else 0;
def AboveVZ = if Zone1 and close > Z1H or Zone2 and close > Z2H or Zone3 and close > Z3H then 1 else 0;

AddLabel(if (GetAggregationPeriod() > AggregationPeriod.FIFTEEN_MIN) then yes else no, "vBox Zones on 5/10/15M Charts Only  ", Color.RED);

AddCloud(if afterStart and beforeEnd then Z1H else Double.NaN, if afterStart and beforeEnd then Z1L else Double.NaN, GlobalColor("Zone1"), GlobalColor("Zone1"));
AddCloud(if    Update1 and beforeEnd then Z2H else Double.NaN, if    Update1 and beforeEnd then Z2L else Double.NaN, GlobalColor("Zone2"), GlobalColor("Zone2"));
AddCloud(if    Update2 and beforeEnd then Z3H else Double.NaN, if    Update2 and beforeEnd then Z3L else Double.NaN, GlobalColor("Zone3"), GlobalColor("Zone3"));

Alert(audibleAlerts and AboveVZ, "Above High VolumeBar Caution Long", Alert.BAR, Sound.Ding);
Alert(audibleAlerts and BelowVZ, "Below High VolumeBar Look for Reversal", Alert.BAR, Sound.Ring);