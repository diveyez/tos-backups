#// This work is licensed under a Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) https://creativecommons.org/licenses/by-nc-sa/4.0/
#// © LuxAlgo
#indicator("Trendlines With Breaks [LUX]", overlay = true)
# Converted and mod by Sam4Cok @Samer800 - 09 / 2022
# added alerts, Loockback Period, Smoothing and HH / LL bubbles - Sam4Cok@Samer800 - 11 / 2022

input alerts = yes;
input alertType = alert.BAR;
input sound = { default "NoSound", "Ding", "Bell", "Chimes", "Ring"};
input LookbackPeriod = 14;
input SlopeSaource = close; # Saource for slope calculation
input ShowTodayOnly = yes;
input ShowBrakouts = { "Don't Show Breakouts", default "Only Confirmed Breakouts", "Show All Breakouts"};
input ShowHighLowBubbles = no;
input horizontalLine = no;
input SaourceCalcMethod = { default "Wicks", "Candle Close"};
input SlopeCalcMethod = { default ATR, Stdev, Linreg }; #('Atr', 'Slope Calculation Method'
input SlopeLength = 14;
input SlopeStep = 1.0;
input AtrSmoothing = yes;

#----------------------------
    def c = close;
def o = open;
def h = high;
def l = low;
def n = BarNumber();
def na = Double.NaN;
def today = GetDay() == GetLastDay();
def wick = If(SaourceCalcMethod == SaourceCalcMethod."Wicks", 1, 0);
def ShowSignal = if ShowBrakouts == ShowBrakouts."Only Confirmed Breakouts" then 1 else
if ShowBrakouts == ShowBrakouts."Show All Breakouts" then 2 else 0;
#//----
def upper;
def lower;
def slope;
def slope_ph;
def slope_pl;

script FindPivots {
    input dat = close; # default data or study being evaluated
    input HL = 0;    # default high or low pivot designation, -1 low, +1 high
    input lbL = 5;    # default Pivot Lookback Left
    input lbR = 1;    # default Pivot Lookback Right
    ##############
    def _nan;    # used for non - number returns
    def _BN;     # the current barnumber
    def _VStop;  # confirms that the lookforward period continues the pivot trend
    def _V;      # the Value at the actual pivot point
    ##############
    _BN = BarNumber();
    _nan = Double.NaN;
    _VStop = if !IsNaN(dat) and lbR > 0 and lbL > 0 then
                fold a = 1 to lbR + 1 with b = 1 while b do
        if HL > 0 then dat > GetValue(dat, -a) else dat < GetValue(dat, -a) else _nan;
    if (HL > 0) {
        _V = if _BN > lbL and dat == Highest(dat, lbL + 1) and _VStop
            then dat else _nan;
    } else {
        _V = if _BN > lbL and dat == Lowest(dat, lbL + 1) and _VStop
            then dat else _nan;
    }
    plot result = if !IsNaN(_V) and _VStop then _V else _nan;
}
def nATR = If(AtrSmoothing, ExpAverage(ATR(Slopelength), 3), ATR(Slopelength));
def LinSlope = WMA(SlopeSaource * n, Slopelength) -
    WMA(SlopeSaource, Slopelength) *
    WMA(n, Slopelength);
switch (SlopeCalcMethod) {
    case ATR:
        slope = nATR / Slopelength * SlopeStep;
    case Stdev:
        slope = StDev(SlopeSaource, Slopelength) / Slopelength * SlopeStep;
    case Linreg:
        slope = AbsValue(LinSlope) / Sqr(StDev(n, Slopelength)) / 2 * SlopeStep;
}
#//----
def wickHi = if wick then h else Max(c, o);
def wickLo = if wick then l else Min(c, o);
def ph = findpivots(wickHi, 1, LookbackPeriod, LookbackPeriod);
def pl = findpivots(wickLo, -1, LookbackPeriod, LookbackPeriod);

slope_ph = if !IsNaN(ph) then slope else slope_ph[1];
slope_pl = if !IsNaN(pl) then slope else slope_pl[1];

upper = if (n < 0) then na else if !IsNaN(ph) then ph else upper[1] - slope_ph;
lower = if (n < 0) then na else if !IsNaN(pl) then pl else lower[1] + slope_pl;
#//----
def single_upper;
def single_lower;
single_upper = if (SlopeSaource[1] > upper) then 0 else
if !IsNaN(ph) then 1 else single_upper[1];
single_lower = if (SlopeSaource[1] < lower) then 0 else
if !IsNaN(pl) then 1 else single_lower[1];

def upper_breakout = single_upper[1] and SlopeSaource[1] > upper
and(if ShowSignal == 1 then SlopeSaource > SlopeSaource[1] else 1);
def lower_breakout = single_lower[1] and SlopeSaource[1] < lower
and(if ShowSignal == 1 then SlopeSaource < SlopeSaource[1] else 1);

def UpBreak = If(upper_breakout, l[1], na);
def LoBreak = If(lower_breakout, h[1], na);

def Labelup = if ShowSignal > 0 then if ShowTodayOnly then
if !today then na else UpBreak[-1] else UpBreak[-1] else na;
def Labeldn = if ShowSignal > 0 then if ShowTodayOnly then
if !today then na else LoBreak[-1] else LoBreak[-1] else na;

#//----

def UpPH = if IsNaN(c) then na else if IsNaN(ph[-1]) then upper else na;
def LoLH = if IsNaN(c) then na else if IsNaN(pl[-1]) then lower else na;

plot upperPH = if ShowTodayOnly then if UpPH == 0 or!today then na else UpPH else
if UpPH == 0 then na else UpPH;
upperPH.SetStyle(Curve.FIRM);
upperPH.SetDefaultColor(CreateColor(38, 166, 154));

plot upperDash =  if IsNaN(UpPH) then upper else na;
;
upperDash.SetStyle(Curve.MEDIUM_DASH);
upperDash.SetDefaultColor(CreateColor(38, 166, 154));

plot LowerLH = if ShowTodayOnly then if LoLH == 0 or!today then na else LoLH else
if LoLH == 0 then na else LoLH;
LowerLH.SetStyle(Curve.FIRM);
LowerLH.SetDefaultColor(CreateColor(239, 83, 80));

plot LowerDash =  if IsNaN(LoLH) then lower else na;
LowerDash.SetStyle(Curve.MEDIUM_DASH);
LowerDash.SetDefaultColor(CreateColor(239, 83, 80));

#----------Horizontal Line---------------------------------
    def LastPH = CompoundValue(1, if IsNaN(ph) then LastPH[1] else ph, ph);
def LastPL = CompoundValue(1, if IsNaN(pl) then LastPL[1] else pl, pl);
#----
    def UpPHline = if IsNaN(c) then na else if IsNaN(ph[-1]) then LastPH else na;
def LoLHline = if IsNaN(c) then na else if IsNaN(pl[-1]) then LastPL else na;

plot upperPHline = if ShowTodayOnly then if today then UpPHline else na else UpPHline;
upperPHline.SetHiding(!horizontalLine);
upperPHline.SetStyle(Curve.POINTS);
upperPHline.SetDefaultColor(CreateColor(38, 166, 154));

plot upperDashline = if IsNaN(UpPHline) then LastPH else na;
upperDashline.SetHiding(!horizontalLine);
upperDashline.SetStyle(Curve.MEDIUM_DASH);
upperDashline.SetDefaultColor(CreateColor(38, 166, 154));

plot LowerLHline = if UpPHline then if today then LoLHline else na else LoLHline;
LowerLHline.SetHiding(!horizontalLine);
LowerLHline.SetStyle(Curve.POINTS);
LowerLHline.SetDefaultColor(CreateColor(239, 83, 80));

plot LowerDashline = if IsNaN(LoLHline) then LastPL else na;
LowerDashline.SetHiding(!horizontalLine);
LowerDashline.SetStyle(Curve.MEDIUM_DASH);
LowerDashline.SetDefaultColor(CreateColor(239, 83, 80));

#--------Breakout Bubbles
AddChartBubble(ShowSignal == 1 and Labelup, Labelup, "Break", Color.CYAN, no);
AddChartBubble(ShowSignal == 1 and Labeldn, Labeldn, "Break", Color.MAGENTA, yes);

AddChartBubble(ShowSignal == 2 and Labelup, Labelup, "Break", CreateColor(38, 166, 154), no);
AddChartBubble(ShowSignal == 2 and Labeldn, Labeldn, "Break", CreateColor(239, 83, 80), yes);
#--------HHLL Bubbles

def ph_1 = if !isnan(ph) then ph else ph_1[1];
def pl_1 = if !isnan(pl) then pl else pl_1[1];

def hh = if !isnan(ph) and ph > ph_1[1] then ph else na;
def ll = if !isnan(pl) and pl < pl_1[1] then pl else na;
def hl = pl > pl_1[1];
def lh = ph < ph_1[1];
def llBubbles = if ShowHighLowBubbles then if ShowTodayOnly then today and ll else ll else na;
def hhBubbles = if ShowHighLowBubbles then if ShowTodayOnly then today and hh else hh else na;
def hlBubbles = if ShowHighLowBubbles then if ShowTodayOnly then today and hl else hl else na;
def lhBubbles = if ShowHighLowBubbles then if ShowTodayOnly then today and lh else lh else na;

AddChartBubble(llBubbles, ll, "LL", Color.RED, no);
AddChartBubble(hhBubbles, hh, "HH", Color.GREEN, yes);

AddChartBubble(hlBubbles, pl_1, "HL", Color.DARK_RED, no);
AddChartBubble(lhBubbles, ph_1, "LH", Color.DARK_GREEN, yes);

#----Alerts
Alert(alerts and Labelup, "Break Up!", alertType, sound);
Alert(alerts and Labeldn, "Break Down!", alertType, sound);

#### END--------