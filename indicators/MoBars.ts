#// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
#// © RedKTrader
#indicator('[dev]RedK Momentum Bars', shorttitle = 'RedK MoBars v3.0', explicit_plot_zorder = true, timeframe = '', timeframe_gaps = false)
#// A trading system composed of 2 short Lazy Lines (preferably one open and one close - 2-3 bars apart) and a WMA long filter
#// loosely inspired by Edler Impulse
#// v2.0 cleaned up code and added MA options to be able to mix and match, and experiment with various setups
#// default values (my personal preference) remain the same as in v1.0
#// for example, some traders will consider "bear territory" only below SMA50, others will use EMA30 .. and so on.
#// ---------------------------------------------------------------------------------------------------------------
#// MoBars v3.0:
#// updated defaults to match the most common 3x MA cross-over set-up of SMA (10, 20, 50)
#// updated visuals to push the 0 line to the background of the plot (using the explcit_plot_zorder param)
#// and added alerts for crossing up, down and swing around the 0 line (the Bullish/Bearish Filter MA)
#//==============================================================================
# Converted and mod by Sam4Cok @Samer800 - 12 / 2022
declare lower;
#f_LazyLine(_data, _length) =>
script f_LazyLine {
    input _data = close;
    input _length = 10;
    def w1;
    def w2;
    def w3;
    def L1;
    def L2;
    def L3;
    def w = _length / 3;
    if _length > 2 {
        w2 = Round(w, 0);
        w1 = Round((_length - w2) / 2, 0);
        w3 = Floor((_length - w2) / 2);
        L1 = WMA(_data, w1);
        L2 = WMA(L1, w2);
        L3 = WMA(L2, w3);
    } else {
        w2 = 0;
        w1 = 0;
        w3 = 0;
        L1 = 0;
        L2 = 0;
        L3 = _data;
    }
    plot return = L3;
}
#//====================================
#f_getMA(source, length, type) =>
script f_getMA {
    input source = close;
    input length = 10;
    input type = "SMA";
    def ma = if type == "SMA" then SimpleMovingAvg(source, length) else
    if type == "EMA" then ExpAverage(source, length) else
    if type == "WMA" then WMA(source, length) else
    if type == "HMA" then HullMovingAvg(source, length) else
    f_LazyLine(source, length);
    plot return = ma;
}
input Fast_Length = 10;        # 'Fast Length'
input Fast_Type = { "RSS_WMA", "WMA", "EMA", default "SMA", "HMA"};
input Slow_Length = 20;        # 'Slow Length'
input Slow_Type = { "RSS_WMA", "WMA", "EMA", default "SMA", "HMA"};
input Slow_Delay = 3;
input Filter_Length = 50;     # 'Filter MA Length'
input Filter_Type = { "RSS_WMA", "WMA", "EMA", default "SMA", "HMA"};

def na = Double.NaN;
def Src = (high + low + close + close) / 4;
#// -----Calculation
def Fast = f_getMA(Src, Fast_Length, Fast_Type);
def Slow = f_getMA(Src, Slow_Length, Slow_Type);
def Filter = f_getMA(Src, Filter_Length, Filter_Type);
def Fast_M = Fast - Filter;
def Slow_M = Slow - Filter;
def Rel_M = WMA(Slow_M, Slow_Delay);

#// prep the Momentum bars
def o = Rel_M;
def c = Fast_M;
def h = Max(o, c);
def l = Min(o, c);

def rising = c > c[1];
def barup = c > o and rising;
def bardn = c < o and!rising;
def bardj = !barup and!bardn;
# / ----Colors & Plots

plot zline = if IsNaN(close) then na else 0;
zline.SetDefaultColor(Color.GRAY);

AddChart(high = if barup then h else na, low = l, open = c, close = o,
    type = ChartType.CANDLE, growcolor = Color.GREEN);
AddChart(high = if bardn then h else na, low = l, open = o, close = c,
    type = ChartType.CANDLE, growcolor = Color.RED);
AddChart(high = if bardj then h else na, low = l, open = if rising then o else c,
    close = if rising then c else o, type = ChartType.CANDLE, growcolor = Color.WHITE);

#----Div-----------
    input LookBackRight = 5;           # "Pivot Lookback Right"
input LookBackLeft = 5;           # "Pivot Lookback Left"
input MaxLookback = 60;   # "Max of Lookback Range"
input MinLookback = 5;    # "Min of Lookback Range"
input DivBull = yes;      # "Plot Bullish"
input DivBear = yes;      # "Plot Bearish"
input DivHiddenBull = no; # "Plot Hidden Bullish"
input DivHiddenBear = no; # "Plot Hidden Bearish"

def momSrc = (h + l + c + o) / 4;
def divSrc = momSrc;

def hi = high;
def lo = low;

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
    _VStop = if !isNaN(dat) and lbr > 0 and lbl > 0 then
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
#valuewhen(Cond, source, lbr, occurrence)
script valuewhen {
  input cond = 0;
  input src = close;
  input MinLookback = 5;
  input MaxLookback = 60;
  input occurrence = 0;
  def n = occurrence + 1;
  def offset = fold j = MinLookback to MaxLookback + 1 with p = 1 while p < n + 1
    do p + ( if p == n then j - n else if cond[j] == yes then 1 else 0 );
  plot price = GetValue(src, offset - 1);
}
#_inRange(cond) =>
script _inRange {
    input cond = yes;
    input rangeUpper = 60;
    input rangeLower = 5;
        def bars = if cond then 0 else bars[1] + 1;
        def inrange = (rangeLower <= bars) and(bars <= rangeUpper);
plot retrun = inRange;
}
def pl = findpivots(divSrc, -1, LookBackLeft, LookBackRight);
def ph = findpivots(divSrc, 1, LookBackLeft, LookBackRight);

def plFound = if !isNaN(pl) then 1 else 0;
def phFound = if !isNaN(ph) then 1 else 0;

def vlFound = valuewhen(plFound, divSrc, MinLookback, MaxLookback, 1);
def vhFound = valuewhen(phFound, divSrc, MinLookback, MaxLookback, 1);

def plPrice = valuewhen(plFound, lo, MinLookback, MaxLookback, 1);
def phPrice = valuewhen(phFound, hi, MinLookback, MaxLookback, 1);

#// Regular Bullish
def oscHL = divSrc > vlFound and  _inRange(plFound[1], MaxLookback, MinLookback);
def priceLL = lo < plPrice;
def bullCond = DivBull and plFound and oscHL and priceLL;
#// Hidden Bullish
def oscLL = divSrc < vlFound and  _inRange(plFound[1], MaxLookback, MinLookback);
def priceHL = lo > plPrice;
def hiddenBullCond = DivHiddenBull and plFound and oscLL and priceHL;

#// Regular Bearish
def oscLH = divSrc < vhFound and  _inRange(phFound[1], MaxLookback, MinLookback);
def priceHH = hi > phPrice;
def bearCond = DivBear and phFound and oscLH and priceHH;
#// Hidden Bearish
def oscHH = divSrc > vhFound and  _inRange(phFound[1], MaxLookback, MinLookback);
def priceLH = hi < phPrice;
def hiddenBearCond = DivHiddenBear and phFound and oscHH and priceLH;

#------Bubbles
addchartbubble(bullCond, divSrc, "R", color.GREEN, no);
addchartbubble(bearCond, divSrc, "R", CreateColor(156, 39, 176), yes);
addchartbubble(hiddenBullCond, divSrc, "H", color.DARK_green, no);
addchartbubble(hiddenBearCond, divSrc, "H", color.DARK_red, yes);


#-- ENd Code