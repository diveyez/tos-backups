# This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
# RedKTrader v5
# RedK SmoothAndLazyMA - SALMA v2.0 converted to TOS by mbarcala
# Corrects price points within specific StdDev band before calculting a smoothed WMA
#Impulse modified to use RMO Short Term and Long Term in confluence
#ImpulseRMOLST by Tradebyday
#https://usethinkscript.com/threads/trend-magic-indicator-for-thinkorswim.282/

input length = 20;
input smooth = 5;
input mult = 0.3;
input sd_len = 1;
input matype = { default SMA, EMA, WMA, HMA };
input maConfig = { default WMAD, WMAHull };
input length_a = 2;
input rmoLength = 81;
input swingTrdLen = 30;
input showRMO = no;
def baseline = wma(close, sd_len);
def dev = mult * StDev(close, sd_len);
def upper = baseline + dev;
def lower = baseline - dev;
def cprice = if close > upper then upper else if close < lower then lower else close;

plot REMA;
switch (maConfig) {
    case WMAD:
        REMA = WMA(WMA(cprice, length), smooth);
    case WMAHull:
        REMA = WMA(HullMovingAvg(cprice, length), smooth);
}

REMA.AssignValueColor(if REMA > REMA[1] then Color.GREEN else Color.RED);
REMA.SetLineWeight(2);

plot type;
switch (matype) {
    case SMA:
        type = SimpleMovingAvg(close, length);
    case EMA:
        type = ExpAverage(close, length);
    case WMA:
        type = wma(close, length);
    case HMA:
        type = HullMovingAvg(close, length);
}
type.SetDefaultColor(Color.BLUE);
type.SetLineWeight(2);