

#CSA - trend, a momentum and a cycle based indicator for ThinkorSwim V3.2
    #
#VERSION
    # 2020.02.01 V3.2 @diazlaz - Added SWCA - Schaff Wave CrossOver Average
    # 2020.01.29 V3.1 @diazlaz - Added ADXPaintBarsMode
    #                            Integrated Derivative RSI Oscillator
    # 2020.01.29 V3.0 @diazlaz - Modules Restructured 3.0 Framework
    #                            Improved ADX formula for Trend Detection
    #                            Integrated HeikinAshiCandles and HeikinAshiCandles MTF
    #                            set aggregationPeriod to MTF aggregation(default 5 mins)
    #                            Integrated PaintBars MACD Neutral Condition trigger
    #                            set enableNeutralMACDPainter to yes(default is no) and
    #                            neutral gray will be evaluated by MACD(Dark Red / Green)
    #                            Integrated Super Trend w / CCI and ATR
    #                            Integrated CCI + TTM squeeze + TTM trend Combo
    #                            Set treshold defaults to 7(7 out of 10), removed scanmode.
    #                            Integrated Slim Ribbon.
    #                            Integrated DMI and BOP, restructured INPUTS to each module.
    #                            threshold increased to 4 by default.
    #                            Integrated ADX Trending States and BAR Line
    #                            Integrated TTM Trends, modules selection
    #                            and added threshold for signals
    #                            Integrated FREMA
    #                            Labels, Additional Dashboard, Lower Study
    #
    #
#LINK
#https://usethinkscript.com/threads/a-trend-momentum-and-cycle-trading-system-v3-0-csa.1596/
    #
#INSTRUCTION
#Here is how I envision the paintbar working:
#When the supertrend indicator is long that would equal + 1, when its short - 1.
#When the TMO is green that would equal + 1. when its red its - 1.
#When the TOP Cycle Trader is above zero that would equal + 1, when its below zero - 1.
#When all 3 indicators are equal to + 1 making + 3 total the price bars would paint #green.
#When all 3 indicators are equal to - 1 making - 3 total the price bars would paint red.
#If the combination of all 3 indicators equals anything else, the price bars would #paint gray meaning all 3 indicators were not in agreement.
    #


declare upper;

#INPUTS
    input showLabels = yes;
    input PaintBars = yes;
    input ADXPaintBarsMode = no;
    input enableNeutralMACDPainter = no;
    input aggregationPeriod = AggregationPeriod.FIVE_MIN;
    input threshold = 7;

    input displace = 0;

#CORE
DefineGlobalColor("CycleLineColor", Color.RED);
DefineGlobalColor("CyclehistColor", Color.BLUE);
DefineGlobalColor("ZeroLineColor", Color.YELLOW);
DefineGlobalColor("Bullish", Color.GREEN);
DefineGlobalColor("Bearish", Color.RED);
DefineGlobalColor("Neutral", Color.MAGENTA); #Color.YELLOW
DefineGlobalColor("Off", Color.DARK_GRAY);
DefineGlobalColor("On", Color.GREEN);
DefineGlobalColor("Sync1", Color.YELLOW);
DefineGlobalColor("Sync2", Color.CYAN);
DefineGlobalColor("Up", Color.GREEN);
DefineGlobalColor("Down", Color.RED);
DefineGlobalColor("NUp", Color.DARK_GREEN);
DefineGlobalColor("NDown", Color.DARK_RED);
DefineGlobalColor("Neutral", Color.BLUE);
DefineGlobalColor("Neutral2", Color.PLUM);

    def h = high;
    def l = low;
    def o = open;
    def c = close;
    def hl = hl2;

    def h1 = high(period = aggregationPeriod);
    def l1 = low(period = aggregationPeriod);
    def o1 = open(period = aggregationPeriod);
    def c1 = close(period = aggregationPeriod);
    def hl2 = hl2(period = aggregationPeriod);

    def na = Double.NaN;

AddLabel(showLabels, "CSA v3.2", Color.CYAN);

    ####################################
    ##### START OF MODULES SECTION #####
    ####################################

#START OF HA1 - Heikin Ashi Candles Module V1.0
    #
#CHANGELOG
    # 2020.01.26 V1.0 @diazlaz Initial Module Release
    #
#CREDITS
    #
#USAGE
    #
    input enableHA1 = yes; #Heikin Ashi Candles
    def HA1_haopen;
    def HA1_hahigh;
    def HA1_halow;
    def HA1_haclose;
    def HA1_sState;
    def HA1_sBullish;
    def HA1_sBearish;
    def HA1_sNeutral;

HA1_haopen = CompoundValue(1, (HA1_haopen[1] + HA1_haclose[1]) / 2, (o[1] + c[1]) / 2);
HA1_hahigh = Max(Max(h, HA1_haopen), HA1_haclose[1]);
HA1_halow = Min(Min(l, HA1_haopen), HA1_haclose[1]);
HA1_haclose = (o + h + l + c) / 4;
HA1_sState = if HA1_haclose > HA1_haopen then 100 else -100;
HA1_sBullish = if (enableHA1 and HA1_sState == 100, 1, 0);
HA1_sBearish = if (enableHA1 and HA1_sState == -100, 1, 0);
HA1_sNeutral = 0;

AddLabel(showlabels and enableHA1, "HA",
    if IsNan(HA1_sState) then COLOR.DARK_GRAY else
if HA1_sState[-displace] > 0 then COLOR.GREEN else
if HA1_sState[-displace] < 0 then COLOR.RED
    else COLOR.DARK_GRAY);
#END OF HA1 - Heikin Ashi Candles Module V1.0

#START OF HAMTF - Heikin Ashi Candles MTF Module V1.0
    #
#CHANGELOG
    # 2020.01.26 V1.0 @diazlaz Initial Module Release
    #
#CREDITS
    #
#USAGE
    #
    def HAMTF_haopen;
    def HAMTF_hahigh;
    def HAMTF_halow;
    def HAMTF_haclose;
    def HAMTF_sState;
    def HAMTF_sBullish;
    def HAMTF_sBearish;
    def HAMTF_sNeutral;

    input enableHAMTF = yes; #Heikin Ashi Candles MTF

HAMTF_haopen = CompoundValue(1, (HAMTF_haopen[1] + HAMTF_haclose[1]) / 2, (o1[1] + c1[1]) / 2);
HAMTF_hahigh = Max(Max(h1, HAMTF_haopen), HAMTF_haclose[1]);
HAMTF_halow = Min(Min(l1, HAMTF_haopen), HAMTF_haclose[1]);
HAMTF_haclose = (o1 + h1 + l1 + c1) / 4;
HAMTF_sState = if HAMTF_haclose > HAMTF_haopen then 100 else -100;
HAMTF_sBullish = if (enableHAMTF and HAMTF_sState == 100, 1, 0);
HAMTF_sBearish = if (enableHAMTF and HAMTF_sState == -100, 1, 0);
HAMTF_sNeutral = 0;
AddLabel(showlabels and enableHAMTF, "HA",
    if IsNan(HAMTF_sState) then COLOR.DARK_GRAY else
if HAMTF_sState[-displace] > 0 then COLOR.GREEN else
if HAMTF_sState[-displace] < 0 then COLOR.RED
    else COLOR.DARK_GRAY);
#END OF HAMTF - Heikin Ashi Candles MTF Module V1.0

#START OF TTM - TTM Trend Module V1.0
    #
#CHANGELOG
    # 2020.01.26 V1.0 @diazlaz Initial Module Release
    #
#CREDITS
    #
#USAGE
    #
    input enableTTM = yes; #TTM Trend
    def TTM_trendup;
    def TTM_trenddown;
    def TTM_sState;
    def TTM_sBullish;
    def TTM_sBearish;
    def TTM_sNeutral;

TTM_trendup = if TTM_Trend().TrendUp == 1 then 1 else 0;
TTM_trenddown = if TTM_Trend().TrendDown == 1 then 1 else 0;
TTM_sState = if TTM_trendup then 100 else if TTM_trenddown then - 100 else 0;
TTM_sBullish = if (enableTTM and TTM_sState == 100, 1, 0);
TTM_sBearish = if (enableTTM and TTM_sState == -100, 1, 0);
TTM_sNeutral = 0;
AddLabel(showlabels and enableTTM, "TTM", if IsNan(TTM_sState) then COLOR.DARK_GRAY else
if TTM_sState[-displace] > 0 then COLOR.GREEN else
if TTM_sState[-displace] < 0 then COLOR.RED
    else COLOR.DARK_GRAY);
#END OF TTM - TTM Trend Module V1.0


#START OF ST1 - SuperTrend(Mobius) Module V1.0
    #
#CHANGELOG
    # 2020.01.29 V1.0 @diazlaz Initial Module Release
    #
#CREDITS
    #
#USAGE
    #
    input enableSuperTrend = yes; #ST1 - SuperTrend(Mobius)
    input ST1_atrmult = 1.0; #SuperTrend
    input ST1_natr = 4; #SuperTrend
    input ST1_avgtype = AverageType.HULL; #SuperTrend

    def ST1_atr = MovingAverage(ST1_avgtype, TrueRange(h, c, l), ST1_natr);
    def ST1_up = hl + (ST1_atrmult * ST1_atr);
    def ST1_dn = hl + (-ST1_atrmult * ST1_atr);
    def ST1_st = if c < ST1_st[1] then ST1_up else ST1_dn;
    def ST1_ssupertrend = if c < ST1_st then - 100 else 100;
    def ST1_sbullish = enableSuperTrend and ST1_ssupertrend == 100;
    def ST1_sbearish = enableSuperTrend and ST1_ssupertrend == -100;
    def ST1_sneutral = 0;
AddLabel(showlabels and enableSuperTrend, "SuperTrend", if IsNan(ST1_ssupertrend) then COLOR.DARK_GRAY else
if ST1_ssupertrend[-displace] > 0 then COLOR.GREEN else
if ST1_ssupertrend[-displace] < 0 then COLOR.RED
    else COLOR.DARK_GRAY);
#END OF ST1 - SuperTrend(Mobius) Module V1.0


#START OF STHA - SuperTrend HA(Mobius) Module V1.0
    #
#CHANGELOG
    # 2020.01.29 V1.0 @diazlaz Initial Module Release
    #
#CREDITS
    #
#USAGE
    #
    input enableSuperTrendHA = yes; #ST1 - SuperTrend HA(Mobius)
    input STHA_atrmult = 1.0; #SuperTrend
    input STHA_natr = 4; #SuperTrend
    input STHA_avgtype = AverageType.HULL; #SuperTrend

    def STHA_atr = MovingAverage(STHA_avgtype, TrueRange(ha1_hahigh, ha1_HAclose, ha1_HAlow), STHA_natr);
    def STHA_up = HL + (STHA_atrmult * STHA_atr);
    def STHA_dn = HL + (-STHA_atrmult * STHA_atr);
    def STHA_st = if c < STHA_st[1] then STHA_up else STHA_dn;
    def STHA_ssupertrend = if c < STHA_st then - 100 else 100;
    def STHA_sbullish = enableSuperTrendHA and STHA_ssupertrend == 100;
    def STHA_sbearish = enableSuperTrendHA and STHA_ssupertrend == -100;
    def STHA_sneutral = 0;
AddLabel(showlabels and enableSuperTrend, "SuperTrendHA", if IsNan(STHA_ssupertrend) then COLOR.DARK_GRAY else
if STHA_ssupertrend[-displace] > 0 then COLOR.GREEN else
if STHA_ssupertrend[-displace] < 0 then COLOR.RED
    else COLOR.DARK_GRAY);
#END OF STHA - SuperTrend HA(Mobius) Module V1.0


#START OF FRE - Frema Module V1.0
    #
#CHANGELOG
    # 2020.01.29 V1.0 @diazlaz Initial Module Release
    #
#CREDITS
    #
#USAGE
    #
    input enableFrema = yes; #FREMA
    input FRE_aa = .1; #FREMA

    def FRE_cc;
    def FRE_zeroline = 0;
    def FRE_re1;
    def FRE_re2;
    def FRE_re3;
    def FRE_re4;
    def FRE_re5;
    def FRE_re6;
    def FRE_re7;
    def FRE_re8;
    def FRE_ema;
FRE_cc = if FRE_cc[1] == 0 then .9 else 1 – FRE_aa;
FRE_ema = FRE_aa * c + FRE_cc * FRE_ema[1];
FRE_re1 = FRE_cc * FRE_ema + FRE_ema[1];
FRE_re2 = Power(FRE_cc, 2) * FRE_re1 + FRE_re1[1];
FRE_re3 = Power(FRE_cc, 4) * FRE_re2 + FRE_re2[1];
FRE_re4 = Power(FRE_cc, 8) * FRE_re3 + FRE_re3[1];
FRE_re5 = Power(FRE_cc, 16) * FRE_re4 + FRE_re4[1];
FRE_re6 = Power(FRE_cc, 32) * FRE_re5 + FRE_re5[1];
FRE_re7 = Power(FRE_cc, 64) * FRE_re6 + FRE_re6[1];
FRE_re8 = Power(FRE_cc, 128) * FRE_re7 + FRE_re7[1];
    def FRE_ema_signal = FRE_ema – FRE_aa * FRE_re8;
    def FRE_sfrema = if (FRE_ema_signal > FRE_zeroline) then 100 else -100;
    def FRE_sbullish = enableFrema and FRE_sfrema == 100;
    def FRE_sbearish = enableFrema and FRE_sfrema == -100;
    def FRE_sneutral = 0;

AddLabel(showlabels and enableFrema, "Frema", if IsNan(FRE_sfrema) then COLOR.DARK_GRAY else
if FRE_sfrema[-displace] > 0 then COLOR.GREEN else
if FRE_sfrema[-displace] < 0 then COLOR.RED
    else COLOR.DARK_GRAY);
#END OF FRE - Frema Module V1.0


#START OF TMO - TMO Module V1.0
    #
#CHANGELOG
    # 2020.01.29 V1.0 @diazlaz Initial Module Release
    #
#CREDITS
    #
#USAGE
    #
    input enableTMO = yes; #TMO
    input TMO_length = 14; #TMO
    input TMO_calclength = 5; #TMO
    input TMO_smoothlength = 3; #TMO

    def TMO_data = fold i = 0 to TMO_length
with s
            do s + (if c > getValue(o, i)
                    then 1
                    else if c < getValue(o, i)
                         then - 1
else 0);
    def TMO_ema5 = ExpAverage(TMO_data, TMO_calclength);
    def TMO_main = ExpAverage(TMO_ema5, TMO_smoothlength);
    def TMO_signal = ExpAverage(TMO_main, TMO_smoothlength);
    def TMO_smain = if TMO_main > TMO_signal then 100 else -100;
    def TMO_ssignal = if TMO_main > TMO_signal then 100 else - 100;
    def TMO_ob = if isNaN(c) then double.nan else round(TMO_length * .7);
    def TMO_os = if isNaN(c) then double.nan else -round(TMO_length * .7);
    def TMO_stmo = if TMO_main > TMO_signal then 100 else -100;
    def TMO_sbullish = enableTMO and TMO_stmo == 100;
    def TMO_sbearish = enableTMO and TMO_stmo == -100;
    def TMO_sneutral = 0;

AddLabel(showlabels and enableTMO, "TMO", if IsNan(TMO_stmo) then COLOR.DARK_GRAY else
if TMO_stmo[-displace] > 0 then COLOR.GREEN else
if TMO_stmo[-displace] < 0 then COLOR.RED
    else COLOR.DARK_GRAY);
#END OF TMO - TMO Module V1.0


#START OF SL1 - SLIM Module V1.0
    #
#CHANGELOG
    # 2020.01.29 V1.0 @diazlaz Initial Module Release
    #
#CREDITS
    #
#USAGE
    #
    input enableSLIM = yes;
    input SL1_ssuperfast = 8;
    input SL1_sfast = 13;
    input SL1_sslow = 21;

    def SL1_superfast = ExpAverage(c[-displace], SL1_ssuperfast);
    def SL1_fast = ExpAverage(c[-displace], SL1_sfast);
    def SL1_slow = ExpAverage(c[-displace], SL1_sslow);
    def SL1_buy = SL1_superfast > SL1_fast and SL1_fast > SL1_slow and l > SL1_superfast;
    def SL1_stopbuy = SL1_superfast <= SL1_fast;
    def SL1_buynow = !SL1_buy[1] and SL1_buy;
    def SL1_buysignal = CompoundValue(1, if SL1_buynow and!SL1_stopbuy then 1
    else if SL1_buysignal[1] == 1 and SL1_stopbuy then 0 else SL1_buysignal[1], 0);
    def SL1_buy_signal = SL1_buysignal[1] == 0 and SL1_buysignal == 1;
    def SL1_momentum_down = SL1_buysignal[1] == 1 and SL1_buysignal == 0;
    def SL1_sell = SL1_superfast < SL1_fast and SL1_fast < SL1_slow and h < SL1_superfast;
    def SL1_stopsell = SL1_superfast >= SL1_fast;
    def SL1_sellnow = !SL1_sell[1] and SL1_sell;
    def SL1_sellsignal = CompoundValue(1, if SL1_sellnow and!SL1_stopsell then 1
    else if SL1_sellsignal[1] == 1 and SL1_stopsell then 0 else SL1_sellsignal[1], 0);
    def SL1_sell_signal = SL1_sellsignal[1] == 0 and SL1_sellsignal;
    def SL1_momentum_up = SL1_sellsignal[1] == 1 and SL1_sellsignal == 0;
    def SL1_sstate = if SL1_buy_signal then 100 else if SL1_momentum_up then 10 else if SL1_sell_signal then - 100 else if SL1_momentum_down then - 10 else SL1_sstate[1];
    def SL1_sbullish = enableSLIM and SL1_sstate == 100;
    def SL1_sbearish = enableSLIM and SL1_sstate == -100;
    def SL1_sneutral = 0;
AddLabel(showlabels and enableSLIM, "SLIM", if IsNan(SL1_sstate) then COLOR.DARK_GRAY else
if SL1_sstate[-displace] >= 100 then COLOR.GREEN else
if SL1_sstate[-displace] <= -100 then COLOR.RED
    else COLOR.YELLOW);
#END OF SL1 - SLIM Module V1.0


#START OF TOP - TOP Module V1.0
    #
#CHANGELOG
    # 2020.01.29 V1.0 @diazlaz Initial Module Release
    #
#CREDITS
    #
#USAGE
    #
    input enableTOP = yes; #TOP
    input TOP_fastcyclelength = 5; #TOP
    input TOP_slowcyclelength = 8; #TOP

    def TOP_fastvar = ExpAverage((H + L) / 2, TOP_fastcyclelength);
    def TOP_slowvar = Average((H + L) / 2, TOP_slowcyclelength);
    def TOP_diffvar = TOP_fastvar - TOP_slowvar;
    def TOP_pdiffvar = TOP_diffvar;
    def TOP_pdiffvar2 = TOP_diffvar;
    def TOP_stop = if TOP_diffvar > 0 then 100 else -100;
    def TOP_sbullish = enableTOP and TOP_stop == 100;
    def TOP_sbearish = enableTOP and TOP_stop == -100;
    def TOP_sneutral = 0;
AddLabel(showlabels and enableTOP, "TOP", if IsNan(TOP_stop) then COLOR.DARK_GRAY else
if TOP_stop[-displace] > 0 then COLOR.GREEN else
if TOP_stop[-displace] < 0 then COLOR.RED
    else COLOR.DARK_GRAY);
#END OF TOP - TOP Module V1.0


#START OF DMI - DMI Trend Module V1.0
    #
#CHANGELOG
    # 2020.01.29 V1.0 @diazlaz Initial Module Release
    #
#CREDITS
    #
#USAGE
    #
    input enableDMI = yes; #DMI Trend
    input DMI_dmilength = 13;

    def DMI_hidiff = h - h[1];
    def DMI_lodiff = l[1] - l;
    def DMI_plusdm = if DMI_hidiff > DMI_lodiff and DMI_hidiff > 0 then DMI_hidiff else 0;
    def DMI_minusdm =  if DMI_lodiff > DMI_hidiff and DMI_lodiff > 0 then DMI_lodiff else 0;
    def DMI_atrdmi = WildersAverage(TrueRange(h, c, l), DMI_dmilength);
    Def DMI_diplus = 100 * WildersAverage(DMI_plusdm, DMI_dmilength) / DMI_atrdmi;
    Def DMI_diminus = 100 * WildersAverage(DMI_minusdm, DMI_dmilength) / DMI_atrdmi;
    def DMI_sdmi = if DMI_diplus > DMI_diminus then 100 else if DMI_diminus > DMI_diplus then - 100 else 0;
    def DMI_sbullish = enableDMI and DMI_sdmi == 100;
    def DMI_sbearish = enableDMI and DMI_sdmi == -100;
    def DMI_sneutral = 0;
AddLabel(showlabels and enableDMI, "DMI", if IsNan(DMI_sdmi) then COLOR.DARK_GRAY else
if DMI_sdmi[-displace] > 0 then COLOR.GREEN else
if DMI_sdmi[-displace] < 0 then COLOR.RED
    else COLOR.DARK_GRAY);
#END OF DMI - DMI Trend Module V1.0


#START OF BOP - BOP Module V1.0
    #
#CHANGELOG
    # 2020.01.29 V1.0 @diazlaz Initial Module Release
    #
#CREDITS
    #
#USAGE
    #
    input enableBOP = yes; #BOP
    input BOP_averagetype = { Simple, Exponential, default Weighted, Wilders, Hull, Disabled };
    input BOP_boplength = 16;

    def BOP_rawbmp = if h != l then(c - o) / (h - l) else 1;
    def BMP;
switch (BOP_averagetype) {
    case Simple:
        BMP = Average(BOP_rawbmp, BOP_boplength);
    case Exponential:
        BMP = ExpAverage(BOP_rawbmp, BOP_boplength);
    case Weighted:
        BMP = wma(BOP_rawbmp, BOP_boplength);
    case Wilders:
        BMP = WildersAverage(BOP_rawbmp, BOP_boplength);
    case Hull:
        BMP = HullMovingAvg(BOP_rawbmp, BOP_boplength);
    case Disabled:
        BMP = BOP_rawbmp;
}
    def BOP_sbop = if BMP > 0 then 100 else -100;
    def BOP_sbullish = enableBOP and BOP_sbop == 100;
    def BOP_sbearish = enableBOP and BOP_sbop == -100;
    def BOP_sneutral = 0;
AddLabel(showlabels and enableBOP, "BOP", if IsNan(BOP_sbop) then COLOR.DARK_GRAY else
if BOP_sbop[-displace] > 0 then COLOR.GREEN else
if BOP_sbop[-displace] < 0 then COLOR.RED
    else COLOR.DARK_GRAY);
#END OF BOP - BOP Module V1.0


#START OF STCCI - Super Trend w / CCI Module V1.0
    #
#CHANGELOG
    # 2020.01.29 V1.0 @diazlaz Initial Module Release
    #
#CREDITS
    #
#USAGE
    #
    input enableSuperTrendCCI = yes; #Super Trend w / CCI
    input STCCI_lengthcci = 50;
    input STCCI_lengthatr = 21;
    input STCCI_atrfactor = 1.0;
    def STCCI_pricedata = hl;
    def STCCI_atrcci = Average(TrueRange(h, c, l), STCCI_lengthatr) * STCCI_atrfactor;
    def STCCI_price = c + l + h;
    def STCCI_lindev = lindev(STCCI_price, STCCI_lengthcci);
    def STCCI_cci = if STCCI_lindev == 0
           then 0
           else (STCCI_price - Average(STCCI_price, STCCI_lengthcci)) / STCCI_lindev / 0.015;
    def STCCI_mt1 = if STCCI_cci > 0
           then Max(STCCI_mt1[1], STCCI_pricedata - STCCI_atrcci)
           else Min(STCCI_mt1[1], STCCI_pricedata + STCCI_atrcci);
    def STCCI_ssupertrendcci = if c < STCCI_mt1 and c < ST1_st then - 100 else if C > STCCI_mt1 and c > ST1_st then 100 else 0;
    def STCCI_sbullish = enableSuperTrendCCI and STCCI_ssupertrendcci == 100;
    def STCCI_sbearish = enableSuperTrendCCI and STCCI_ssupertrendcci == -100;
    def STCCI_sneutral = 0;
AddLabel(showlabels and enableSuperTrendCCI, "SuperTrendCCI", if IsNan(STCCI_ssupertrendcci) then COLOR.DARK_GRAY else
if STCCI_ssupertrendcci[-displace] > 0 then COLOR.GREEN else
if STCCI_ssupertrendcci[-displace] < 0 then COLOR.RED
    else COLOR.DARK_GRAY);
#END OF STCCI - Super Trend w / CCI Module V1.0


#START OF CTT - CCI + TTM squeeze + TTM trend Module V1.0
    #
#CHANGELOG
    # 2020.01.29 V1.0 @diazlaz Initial Module Release
    #
#CREDITS
    #
#USAGE
    #
    input enableCCITTM = yes; #CCI + TTM squeeze + TTM trend
    def CTT_ccibuy = CCI(length = 14).CCI > 0 and CCI(length = 50).CCI > 0;
    def CTT_ccisell = CCI(length = 14).CCI < 0 and CCI(length = 50).CCI < 0;
    def CTT_strendup = TTM_Trend().TrendUp;
    def CTT_strenddn = TTM_Trend().TrendDown;
    def CTT_squeezeup = TTM_Squeeze().Histogram >= 0;
    def CTT_squeezedn = TTM_Squeeze().Histogram <= 0;
    def CTT_buy = CTT_ccibuy and CTT_strendup and CTT_squeezeup;
    def CTT_sell = CTT_ccisell and CTT_strenddn and CTT_squeezedn;
    def CTT_sccittm = if CTT_buy then 100 else if CTT_sell then - 100 else 0;
    def CTT_sbullish = enableCCITTM and CTT_sccittm == 100;
    def CTT_sbearish = enableCCITTM and CTT_sccittm == -100;
    def CTT_sneutral = 0;
AddLabel(showlabels and enableCCITTM, "CCI+TTM", if IsNan(CTT_sccittm) then COLOR.DARK_GRAY else
if CTT_sccittm[-displace] > 0 then COLOR.GREEN else
if CTT_sccittm[-displace] < 0 then COLOR.RED
    else COLOR.DARK_GRAY);
#END OF CTT - CCI + TTM squeeze + TTM trend Module V1.0


#START OF DRSI - Derivative RSI Oscillator Module V1.0
    #
#CHANGELOG
    # 2020.01.29 V1.0 @diazlaz Initial Module Release
    #
#CREDITS
    # Derivative RSI Oscillator
    # Can be used alone as a smoother RSI or as part of the Carting Wealth strategy when
    # combined with the MACD and MAs Charting Wealth study.
    # By Horserider 12 / 25 / 2019

#USAGE
    #
#Derivative RSI Oscillator
    input enableDRSI = yes; #Derivative RSI Oscillator
    input DRSI_length = 14;
    input DRSI_length1 = 5;
    input DRSI_length2 = 3;
    input DRSI_length3 = 9;
    input DRSI_price = close;
    input DRSI_averagetype = averagetype.EXPONENTIAL;
    input DRSI_averagetype2 = averagetype.SIMPLE;

    def DRSI_netchgavg = WildersAverage(DRSI_price - DRSI_price[1], DRSI_length);
    def DRSI_totchgavg = WildersAverage(AbsValue(DRSI_price - DRSI_price[1]), DRSI_length);
    def DRSI_chgratio = if DRSI_totchgavg != 0 then DRSI_netchgavg / DRSI_totchgavg else 0;

    def DRSI_rsi = (50 * (DRSI_chgratio + 1) - 50);

    def DRSI_x = MovingAverage(DRSI_averagetype, DRSI_rsi, DRSI_length1);
    def DRSI_x2 = MovingAverage(DRSI_averagetype, DRSI_x, DRSI_length2);
    def DRSI_xs = MovingAverage(DRSI_averagetype2, DRSI_x2, DRSI_length3);
    def DRSI_rsi__linediff = DRSI_x2 - DRSI_xs;
    def DRSI_rsi_line = DRSI_rsi__linediff;
    def DRSI_sstate = if DRSI_rsi_line >= 0 then if DRSI_rsi_line > DRSI_rsi_line[1] then 100 else 10 else if DRSI_rsi_line < DRSI_rsi_line[1] then - 100 else -10;
    def DRSI_sbullish = enableDRSI and DRSI_sstate > 0;
    def DRSI_sbearish = enableDRSI and DRSI_sstate < 0;
    def DRSI_sneutral = 0;
AddLabel(showlabels and enableDRSI, "DRSI", if IsNan(DRSI_sstate) then COLOR.DARK_GRAY else
if DRSI_sstate[-displace] > 0 then COLOR.GREEN else
if DRSI_sstate[-displace] < 0 then COLOR.RED
    else COLOR.DARK_GRAY);
#END OF DRSI - Derivative RSI Oscillator Module V1.0


#START OF SWCA - Schaff Wave CrossOver Average Module V1.0
    #
#CHANGELOG
    # 2020.02.01 V1.0 @diazlaz Initial Module Release
    #
#CREDITS
    #
#USAGE
    #
    input enableSWCA = yes;

    input SWCA_fastlengthtrend = 48;
    input SWCA_slowlengthtrend = 104;
    input SWCA_kperiodtrend = 36;
    input SWCA_dperiodtrend = 8;
    input SWCA_averagetypetrend = AverageType.EXPONENTIAL;
    input SWCA_fastlengthwave = 12;
    input SWCA_slowlengthwave = 26;
    input SWCA_kperiodwave = 9;
    input SWCA_dperiodwave = 2;
    input SWCA_averagetypewave = AverageType.EXPONENTIAL;

    def SWCA_macdtrend = MovingAverage(SWCA_averagetypetrend, c, SWCA_fastlengthtrend) - MovingAverage(SWCA_averagetypetrend, c, SWCA_slowlengthtrend);
    def SWCA_macdwave = MovingAverage(SWCA_averagetypewave, c, SWCA_fastlengthwave) - MovingAverage(SWCA_averagetypewave, c, SWCA_slowlengthwave);
    def SWCA_fastk1trend = FastKCustom(SWCA_macdtrend, SWCA_kperiodtrend);
    def SWCA_fastk1wave = FastKCustom(SWCA_macdwave, SWCA_kperiodwave);
    def SWCA_fastd1trend = MovingAverage(SWCA_averagetypetrend, SWCA_fastk1trend, SWCA_dperiodtrend);
    def SWCA_fastd1wave = MovingAverage(SWCA_averagetypewave, SWCA_fastk1wave, SWCA_dperiodwave);
    def SWCA_fastk2trend = FastKCustom(SWCA_fastd1trend, SWCA_kperiodtrend);
    def SWCA_fastk2wave = FastKCustom(SWCA_fastd1wave, SWCA_kperiodwave);
    def SWCA_stctrend = MovingAverage(SWCA_averagetypetrend, SWCA_fastk2trend, SWCA_dperiodtrend);
    def SWCA_stcwave = MovingAverage(SWCA_averagetypewave, SWCA_fastk2wave, SWCA_dperiodwave);

    def SWCA_sstate = if SWCA_stctrend > SWCA_stcwave then 100 else -100;
    def SWCA_sbullish = enableSWCA and SWCA_sstate == 100;
    def SWCA_sbearish = enableSWCA and SWCA_sstate == -100;
    def SWCA_sneutral = 0;
AddLabel(showlabels and enableSWCA, "SWCA", if IsNan(SWCA_sstate) then COLOR.DARK_GRAY else
if SWCA_sstate[-displace] > 0 then COLOR.GREEN else
if SWCA_sstate[-displace] < 0 then COLOR.RED
    else COLOR.DARK_GRAY);
#END OF SWCA - Schaff Wave CrossOver Average Module V1.0



    ###################################
    #####  END OF MODULES SECTION #####
    ###################################

#ADX TRENDING
    input ADXlength = 8; #ADX
    input ADXTrending = 25; #ADX
    input showADXBar = yes;
    input DI_length = 8;

    def DX = if (diplus(di_length) + diminus(di_length) > 0) then 100 * AbsValue(diplus(di_length) - diminus(di_length)) / (diplus(di_length) + diminus(di_length)) else 0;
    def ADX = WildersAverage(DX, adxlength);

    plot ADXCross = LowestAll(low);
ADXCross.SetPaintingStrategy(PaintingStrategy.LINE);
ADXCross.AssignValueColor(
        if ADX > ADXTrending then Color.LIME
        else Color.DARK_GRAY);
ADXCross.SetLineWeight(5);
ADXCross.SetHiding(!showADXBar);

#MACD Neutal Eval
    input fastLength_1 = 12;
    input slowLength_1 = 26;
    input MACDLength_1 = 9;
    input AverageType_1 = { SMA, default EMA };
    def macd_Val_1 = MACD(fastLength_1, slowLength_1, MACDLength_1, AverageType_1).Value;
    def macd_Avg1 = MACD(fastLength_1, slowLength_1, MACDLength_1, AverageType_1).Avg;
    def MACD_trig = if MACD().value > MACD().avg then 1 else 0;

AddLabel(showlabels,
    if ADX > ADXTrending then "Trending" else
"Non Trending",
    if IsNan(c) then COLOR.DARK_GRAY else
if ADX > ADXTrending then COLOR.GREEN else
COLOR.DARK_GRAY);

AddLabel(showlabels,
    "MACD",
    if IsNan(c) then COLOR.DARK_GRAY else
if macd_Val_1 > macd_Avg1 then COLOR.DARK_GREEN else
COLOR.DARK_RED);


#STATE
    def sResults = HA1_sState + HAMTF_sState + TTM_sState + ST1_ssupertrend + STHA_ssupertrend + FRE_sfrema + TMO_stmo + SL1_sstate + TOP_stop + DMI_sdmi + BOP_sbop
    + STCCI_ssupertrendcci + CTT_sccittm + DRSI_sstate + SWCA_sstate;

    def sBullish = HA1_sBullish + HAMTF_sBullish + TTM_sBullish + ST1_sbullish + STHA_sbullish + FRE_sbullish + TMO_sbullish + SL1_sbullish + TOP_sbullish + DMI_sbullish + BOP_sbullish + STCCI_sbullish + CTT_sbullish + DRSI_sbullish + SWCA_sbullish;

    def sBearish = HA1_sBearish + HAMTF_sBearish + TTM_sBearish + ST1_sbearish + STHA_sbearish + FRE_sbearish + TMO_sbearish + SL1_sbearish + TOP_sbearish + DMI_sbearish + BOP_sbearish + STCCI_sbearish + CTT_sbearish + DRSI_sbearish + SWCA_sbearish;

    def bullish = if (sBullish >= threshold, 1, 0);
    def bearish = if (sBearish >= threshold, 1, 0);
    def sState = if bullish then 100 else if bearish then - 100 else 0;
    def sState2 = if sState != 0 then sState else sState2[1];

#COLORBARS
AssignPriceColor(
    if PaintBars then
if ADXPaintBarsMode then if ADX > ADXTrending then COLOR.ORANGE else COLOR.DARK_GRAY
        else
if bullish then COLOR.GREEN else if bearish then COLOR.RED
         else
if enableNeutralMACDPainter then
if macd_Val_1 > macd_Avg1 then COLOR.DARK_GREEN else COLOR.DARK_RED
         else
COLOR.GRAY
    else COLOR.CURRENT);

AddLabel(showlabels,
    if bullish[-displace] then "LONG" else
if bearish[-displace] then "SHORT"
    else "HOLD",
    if IsNan(c) then COLOR.DARK_GRAY else
if bullish[-displace] then COLOR.GREEN else
if bearish[-displace] then COLOR.RED
    else COLOR.GRAY);


