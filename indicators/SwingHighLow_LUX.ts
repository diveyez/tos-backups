#//This work is licensed under a Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
#https://www.tradingview.com/script/yxEJ4Dxw-Swing-Highs-Lows-Candle-Patterns-LUX/
#https://creativecommons.org/licenses/by-nc-sa/4.0/
#// © LuxAlgo
#//@version=4
#study("Swing Highs/Lows & Candle Patterns", overlay = true)
# Converted by Sam4Cok @Samer800 - 09 / 2022

declare upper;

input Length = 21;
input PatternName = yes;
input HighLowBubble = yes;

def na = Double.NaN;      # non - numeric values
#valuewhen(cond, source, occurrence) =>
script valuewhen {
    input cond = 0;
    input source = 0;
    input occurrence = 0;
    def n = occurrence + 1;
# start at 0 so it looks at current bar
    def offset2 = fold j = 0 to 200
    with p
    while p < n + 1
    do p + ( if p == n then j - n else if GetValue(cond, j) then 1 else 0 );
# def bnz = bn - offset2 + 1;
    plot price = GetValue(source, offset2 - 1);
}
script FindPivots {
    input dat = high; # default data or study being evaluated
    input HL = 0;    # default high or low pivot designation, -1 low, +1 high
    input PF = 1;    # default pivot forward period
    input PB = 5;    # default pivot backward period
    ##############
    def _nan;    # used for non - number returns
    def _BN;     # the current barnumber
    def _VStop;  # confirms that the lookforward period continues the pivot trend
    def _V;      # the Value at the actual pivot point
    def _VBar;   # the bar number at the pivot point
    def _PV;     # the previous pivot Value
    def _PVBar;  # the previous pivot bar number
    def _VDiff;  # the difference in values between last two pivot points
    def _VDist;  # the diffence in barnumbers between last two pivot points
    def _VSlope; # the Slope calculated using value and distance changes
    def _VPivot; # used for the pivot point connector line only
    ##############
    _BN = BarNumber();
    _nan = Double.NaN;
    _VStop =
        fold a = 1 to PF + 1
    with b = 1 while b
        do if HL > 0 then
            dat > GetValue(dat, -a) else
    dat < GetValue(dat, -a);
    if (HL > 0) {
        _V = if _BN > PB and dat == Highest(dat, PB) and _VStop
            then dat else _nan;
    } else {
        _V = if _BN > PB and dat == Lowest(dat, PB) and _VStop
            then dat else _nan;
    }
    ;
    _VBar = if !IsNaN(_V) then _BN else _VBar[1];
    _PV = if !IsNaN(_V) then GetValue(dat, _BN - _VBar[1]) else _PV[1];
    _PVBar = if   _VBar != _VBar[1]
            then _PVBar[1] else _VBar;
    _VDiff = AbsValue(_V) - AbsValue(_PV);
    _VDist = _BN - _PVBar;
    _VSlope = if _V > _PV  then 1 else
    if _V < _PV  then - 1 else 0;
    if (HL > 0) {
        _VPivot = _BN >= HighestAll(_PVBar);
    } else {
        _VPivot = _BN >= LowestAll(_PVBar);
    }
    ;   
    plot result = if !IsNaN(_V) and _VStop then _V else _nan; #return the final _dat value at the most recent pivot point(same as V)
}

def ph_1 = findpivots(close, 1, Length, Length);
def pl_1 = findpivots(open, -1, Length, Length);

def ph = !isnan(ph_1);
def pl = !isnan(pl_1);

def valH = valuewhen(ph, close[length], 0);
def valL = valuewhen(pl, close[length], 0);
def valpH = valuewhen(ph, close[length], 1);
def valpL = valuewhen(pl, close[length], 1);
#//--------------------------------------------------------------------
def d = AbsValue(close - open);
def hammer = pl and min(open, close) - low > d
                 and high - max(close, open) < d;
def ihammer = pl and high - max(close, open) > d and
min(close, open) - low < d;
def bulleng = close > open and close[1] < open[1]
            and close > open[1] and open < close[1];
def hanging = ph and min(close, open) - low > d
                  and high - max(open, close) < d;
def shooting = ph and high - max(open, close) > d
                  and min(close, open) - low < d;
def beareng = close < open and close[1] > open[1]
           and close < open[1] and open > close[1];
#//----------------------------------------------------------------------------

def Higher = if valH > valpH then 22 else if valH < valpH then 12 else na;
def Lower = if valL < valpL then 11 else if valL > valpL then 21 else na;

addchartbubble(HighLowBubble and Lower == 11, pl_1, "LL", CreateColor(33, 87, 243), NO);
addchartbubble(HighLowBubble and Lower == 21, pl_1, "HL", Color.BLUE, no);

addchartbubble(PatternName and hammer  and Lower, pl_1, "Hammer", CreateColor(33, 87, 243), no);
addchartbubble(PatternName and ihammer and Lower, pl_1, "InvHammer", CreateColor(33, 87, 243), no);
addchartbubble(PatternName and bulleng and Lower, pl_1, "BullEng", CreateColor(33, 87, 243), NO);
addchartbubble(PatternName and hanging and Lower, pl_1, "Hanging", CreateColor(33, 87, 243), NO);
addchartbubble(PatternName and shooting and Lower, pl_1, "ShootStar", CreateColor(33, 87, 243), NO);
addchartbubble(PatternName and beareng and Lower, pl_1, "BearEng", CreateColor(33, 87, 243), NO);

addchartbubble(PatternName and hammer  and Higher, ph_1, "Hammer", Color.RED, yes);
addchartbubble(PatternName and ihammer and Higher, ph_1, "InvHammer", Color.DARK_RED, yes);
addchartbubble(PatternName and bulleng and Higher, ph_1, "BullEng", Color.RED, yes);
addchartbubble(PatternName and hanging and Higher, ph_1, "Hanging", Color.RED, yes);
addchartbubble(PatternName and shooting and Higher, ph_1, "ShootStar", Color.RED, yes);
addchartbubble(PatternName and beareng and Higher, ph_1, "BearEng", Color.RED, yes);


addchartbubble(HighLowBubble and Higher == 22, ph_1, "HH", Color.RED, yes);
addchartbubble(HighLowBubble and Higher == 12, ph_1, "LH", Color.DARK_RED, yes);

#### END