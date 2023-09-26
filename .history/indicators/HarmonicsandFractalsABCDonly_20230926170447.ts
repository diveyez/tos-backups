# HarmonicsAndFractals ABCD Only
# name by JQ
#hint select either showpatterns or gilmores to declutter.

#---------------------------------------#
# ===== Irregular fractals function =====#
#---------------------------------------#
###### mcdon030 addded tolerance per Larry Pesavento and 19 more patterns
###### mcdon030 7 more patterns, elliot waves, head and shoulders and bg 90 % reversal
###### notes: DUST ETF daily confluence wave4 and hns

script isRegularFractal {
    input mode = 0;
    plot ret = if mode == 1 then high[4] < high[3] and high[3] < high[2] and high[2] > high[1] and high[1] > high[0] else if mode == -1 then low[4] > low[3] and low[3] > low[2] and low[2] < low[1] and low[1] < low[0] else 0;
}
#---------------------------------------#
# ===== BWilliams fractals function =====#
#---------------------------------------#
script isBWFractal {
    input mode = 0;
    plot ret = if mode == 1 then high[4] < high[2] and high[3] <= high[2] and high[2] >= high[1] and high[2] > high[0] else if mode == -1 then low[4] > low[2] and low[3] >= low[2] and low[2] <= low[1] and low[2] < low[0] else 0;
}

input showgilmore = Yes;
input showPatterns = Yes;
input showBarColors = No;
input filterBW = No;
input ShowHHLL = No;
input ShowTimeFractals1 = No;
input showArrows = No;
input tolerance = .06;
input timeframe1 = { MIN, TWO_MIN, THREE_MIN, FOUR_MIN, FIVE_MIN, TEN_MIN, FIFTEEN_MIN, TWENTY_MIN, THIRTY_MIN, HOUR, TWO_HOURS, FOUR_HOURS, default DAY, TWO_DAYS, THREE_DAYS, FOUR_DAYS, WEEK, MONTH, OPT_EXP };
input showchannel1 = No;
input showchannel2 = No;
input showchannel3 = No;
input showZigZag = Yes;
def bn = BarNumber();
def h2 = high[2];
def l2 = low[2];
def filteredtopf = if filterBW then isRegularFractal(1) else isBWFractal(1);
def filteredbotf = if filterBW then isRegularFractal(-1) else isBWFractal(-1);
plot TopFractals = filteredtopf[-2];
plot BottomFractals = filteredbotf[-2];
TopFractals.SetPaintingStrategy(PaintingStrategy.BOOLEAN_WEDGE_DOWN);
TopFractals.SetDefaultColor(Color.RED);
BottomFractals.SetPaintingStrategy(PaintingStrategy.BOOLEAN_WEDGE_UP);
BottomFractals.SetDefaultColor(Color.GREEN);
def b1_0 = if bn == 0 then - 1 else if filteredtopf == 0 then 0 else if b1_0[1] > -1 then b1_0[1] + 1 else -1;
def b1_1 = b1_0 + GetValue(b1_0, b1_0 + 1, 0) + 1;
def b1_2 = b1_1 + GetValue(b1_0, b1_1 + 1, 0) + 1;
def b2_0 = if bn == 0 then - 1 else if filteredbotf == 0 then 0 else if b2_0[1] > -1 then b2_0[1] + 1 else -1;
def b2_1 = b2_0 + GetValue(b2_0, b2_0 + 1, 0) + 1;
def b2_2 = b2_1 + GetValue(b2_0, b1_1 + 1, 0) + 1;
def higherhigh = if filteredtopf == 0 or b1_2 == b1_1 then 0 else GetValue(high[2], b1_1, 0) < GetValue(high[2], b1_0, 0) and GetValue(high[2], b1_2, 0) < GetValue(high[2], b1_0, 0);
def lowerhigh = if filteredtopf == 0 or b1_2 == b1_1 then 0 else GetValue(high[2], b1_1, 0) > GetValue(high[2], b1_0, 0) and GetValue(high[2], b1_2, 0) > GetValue(high[2], b1_0, 0);
def higherlow = if filteredbotf == 0 or b2_2 == b2_1 then 0 else GetValue(low[2], b2_1, 0) < GetValue(low[2], b2_0, 0) and GetValue(low[2], b2_2, 0) < GetValue(low[2], b2_0, 0);
def lowerlow = if filteredbotf == 0 or b2_2 == b2_1 then 0 else GetValue(low[2], b2_1, 0) > GetValue(low[2], b2_0, 0) and GetValue(low[2], b2_2, 0) > GetValue(low[2], b2_0, 0);
AddChartBubble(ShowHHLL and higherhigh, high[-2], "[HH]", Color.CYAN, yes);
AddChartBubble(ShowHHLL and lowerhigh, high[-2], "[LH]", Color.CYAN, yes);
AddChartBubble(ShowHHLL and higherlow, low[-2], "[HL]", Color.GREEN);
AddChartBubble(ShowHHLL and lowerlow, low[-2], "[LL]", Color.GREEN);
def hh = if bn == 0 then - 1 else if higherhigh == 1 then 0 else if hh[1] > -1 then hh[1] + 1 else -1;
def ll = if bn == 0 then - 1 else if lowerlow == 1 then 0 else if ll[1] > -1 then ll[1] + 1 else -1;
def higherhhigh = if higherhigh == 0 or hh == -1 then 0 else GetValue(high[2], hh, 0) >= high(period = timeframe1);
def lowerllow = if lowerlow == 0 or ll == -1 then 0 else GetValue(low[2], ll, 0) <= low(period = timeframe1);
AddChartBubble(ShowTimeFractals1 and higherhhigh, high[-2], "[TL]", Color.GREEN, yes);
AddChartBubble(ShowTimeFractals1 and lowerllow, low[-2], "[TL]", Color.GREEN);
plot TopChannel1 = if showchannel1 and filteredtopf then h2[-2] else Double.NaN;
plot BottomChannel1 = if showchannel1 and filteredbotf then l2[-2] else Double.NaN;
TopChannel1.SetDefaultColor(Color.GREEN);
BottomChannel1.SetDefaultColor(Color.RED);
TopChannel1.EnableApproximation();
BottomChannel1.EnableApproximation();
plot TopChannel2 = if showchannel2 and higherhigh then h2[-2] else Double.NaN;
plot BottomChannel2 = if showchannel2 and lowerlow then l2[-2] else Double.NaN;
TopChannel2.SetDefaultColor(Color.BLUE);
BottomChannel2.SetDefaultColor(Color.BLUE);
TopChannel2.EnableApproximation();
BottomChannel2.EnableApproximation();
plot TopChannel3 = if showchannel3 and higherhhigh then h2[-2] else Double.NaN;
plot BottomChannel3 = if showchannel3 and lowerllow then l2[-2] else Double.NaN;
TopChannel3.SetDefaultColor(Color.VIOLET);
BottomChannel3.SetDefaultColor(Color.VIOLET);
TopChannel3.EnableApproximation();
BottomChannel3.EnableApproximation();
AddCloud(TopChannel3, BottomChannel3, Color.GREEN, Color.RED);
def istop = if ShowTimeFractals1 then(if higherhhigh  then 1 else 0) else (if filteredtopf then 1 else 0);
def isbot = if ShowTimeFractals1 then(if lowerllow then 1 else 0) else (if filteredbotf then 1 else 0);
def topcount0 = if istop then bn else topcount0[1];
def botcount0 = if isbot then bn else botcount0[1];
def topcount = bn - topcount0;
def botcount = bn - botcount0;
def zigzag = if istop and topcount[1] > botcount[1] then h2 else if isbot and topcount[1] < botcount[1] then l2 else Double.NaN;
##def zigzag = if istop and topcount[1] > botcount[1] && istop > isbot[1] then h2 else if isbot and topcount[1] < botcount[1] && isbot < istop[1] then l2 else Double.NaN;

plot zz = if showZigZag then zigzag[-2] else Double.NaN;
zz.SetDefaultColor(Color.WHITE);
zz.EnableApproximation();
AssignPriceColor(if showBarColors and IsNaN(zigzag) == 0 then(if h2 == zigzag then Color.BLUE else if l2 == zigzag then Color.CYAN else Color.CURRENT) else Color.CURRENT);
def z_0 = if bn == 0 then - 1 else if IsNaN(zigzag) == 0 then 0 else if z_0[1] > -1 then z_0[1] + 1 else -1;
def z_1 = z_0 + GetValue(z_0, z_0 + 1, 0) + 1;
def z_2 = z_1 + GetValue(z_0, z_1 + 1, 0) + 1;
def z_3 = z_2 + GetValue(z_0, z_2 + 1, 0) + 1;
def z_4 = z_3 + GetValue(z_0, z_3 + 1, 0) + 1;
def z_5 = z_4 + GetValue(z_0, z_4 + 1, 0) + 1;
def z_6 = z_5 + GetValue(z_0, z_5 + 1, 0) + 1;
def z_7 = z_6 + GetValue(z_0, z_6 + 1, 0) + 1;
def z_8 = z_7 + GetValue(z_0, z_7 + 1, 0) + 1;
def z_9 = z_8 + GetValue(z_0, z_8 + 1, 0) + 1;

# ======= Preparing the XABCD Patterns =======#
def x1_ = GetValue(zigzag, z_5, 0); #mcdon
def x = GetValue(zigzag, z_4, 0);
def a = GetValue(zigzag, z_3, 0);
def b = GetValue(zigzag, z_2, 0);
def c = GetValue(zigzag, z_1, 0);
def d = GetValue(zigzag, z_0, 0);

# ====== Combination to create the patterns ======#
def xab = (AbsValue(b - a) / AbsValue(x - a));
def xad = (AbsValue(a - d) / AbsValue(x - a));
def abc = (AbsValue(b - c) / AbsValue(a - b));
def bcd = (AbsValue(c - d) / AbsValue(b - c));
def xabc = (AbsValue(b - c) / AbsValue(x - a));

################ mcdons additions
def x1xcd = (AbsValue(d - c) / AbsValue(x1_ - x));## wave5
def x1xab = (AbsValue(b - a) / AbsValue(x1_ - x));## wave3
def x1xxa = (AbsValue(x - a) / AbsValue(x1_ - x));## wave2
def xabbxd = (AbsValue(bcd) / AbsValue(xab));
def dcxab = (AbsValue(xab) / AbsValue(bcd));
def xababc = (AbsValue(xab) / AbsValue(abc));
### time measures
def currentBar = HighestAll(if   !IsNaN(c)
                            then bn
                            else double.nan);
def cp2 = if  a then currentBar - bn else cp2[1];
def cp3 = if  b then currentBar - bn else cp3[1];
def cp4 = if c  then currentBar - bn else cp4[1];
def cp5 = if d then currentBar - bn else cp5[1];
def tp3u =if b then currentBar - cp2  else tp3u[1];
def tp4u =  if c then currentBar - cp3 else tp4u[1];
def tp5u = if d then currentBar - cp4 else tp5u[1];
def tp25u =  if d then currentBar - cp2 else tp25u[1];

# ===== Checking to see if there is a pattern functions =====#

#---------------------------------------#
# ======== ABCD Pattern Function ========#
#---------------------------------------#
script isABCD {
    input _mode = 0;
    input abc = 0;
    input bcd = 0;
    input d = 0;
    input c = 0;
    def _abc = abc >= 0.382 and abc <= 0.886;
    def _bcd = bcd >= 1.13 and bcd <= 2.618;
    plot ret = _abc and _bcd and(if _mode == 1 then d < c else d > c);
}

#--------------------------------------------------#
# ===== ABCD Reciprocal Harmonic Pattern Function =====#
#--------------------------------------------------#
script isABCDR {
    input _mode = 0;
    input abc = 0;
    input bcd = 0;
    input d = 0;
    input c = 0;
    def _abc = abc >= 1.13 and abc <= 0.786;
    def _bcd = bcd >= .382 and bcd <= .886;
    plot ret = _abc and _bcd and(if _mode == 1 then d < c else d > c);
}

######
#bears
######
def u_abcd1 = showPatterns and isABCD(-1, abc, bcd, d, c) and isABCD(-1, abc, bcd, d, c)[1] == 0;
AddChartBubble(u_abcd1[-2], high, "Bear ABCD", Color.RED, yes);

######
#bulls
######
def u_abcd2 = showPatterns and isABCD(1, abc, bcd, d, c) and isABCD(1, abc, bcd, d, c)[1] == 0;
AddChartBubble(u_abcd2[-2], low, "Bull ABCD", Color.GREEN, no);

# ============ End Syracusepro Harmonics and Fractals ============#;