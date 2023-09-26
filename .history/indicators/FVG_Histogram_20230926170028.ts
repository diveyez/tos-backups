#// https://www.tradingview.com/v/Upc9rrf3/
#// © DojiEmoji
#indicator("FVG Histogram [DojiEmoji]"
# Converted and mod by Sam4Cok@Samer800 - 04 / 2023
declare lower;
input useChartTimeframe = yes;
input customTimeframe = AggregationPeriod.FIFTEEN_MIN;
input use_Lookback = yes;
input Lookback_Largest_FVG = 20;           # "Lookback: Largest FVG"
# "If a new FVG is larger than all past FVGs over X bars, then indicate it with a label."
input ShowLabel = no;                        # "Show info label;"

def na = Double.NaN;
def last = isNaN(close);
def n_compare = Lookback_Largest_FVG;
def current = GetAggregationPeriod();
def tf = if useChartTimeframe then current else customTimeframe;
def low = low(Period = tf);
def high = high(Period = tf);
#// @function insert_gap(price[2], price[0])
#// @returns void
Script insert_gap {
input price_t_minustwo = close;
input price_t_zero = close;
    def bar = !isNaN(close);
    def pivot_upper = if bar then max(price_t_minustwo, price_t_zero) else Double.NaN;
    def pivot_lower = if bar then min(price_t_minustwo, price_t_zero) else Double.NaN;
    def hist_color = if price_t_minustwo < price_t_zero then 1 else
    if price_t_minustwo > price_t_zero then - 1 else 0;
    plot pvtUp = pivot_upper;
    plot pvtLo = pivot_lower;
    plot col = hist_color;
}

#// Tests for FVGs:
#// Requirement 1: Displacement test;    upward FVG must > 0, and downward FVG must < 0
#// Requirement 2: Threshold test;       distance of FVG must > threshold==0
#// FVG is valid iff both requirements (1 & 2) are met
def test1_displacement_up = low[0] - high[2];
def test2_displacement_dn = high[0] - low[2];
def is_fvg_up; def is_fvg_dn;def pivot_upper;def pivot_lower; def col;
if AbsValue(test1_displacement_up) > 0 and test1_displacement_up > 0 {
    pivot_upper = insert_gap(high[2], low[0]).pvtUp;
    pivot_lower = insert_gap(high[2], low[0]).pvtLo;
    is_fvg_up = yes;
    is_fvg_dn = no;
    col = insert_gap(high[2], low[0]).col;
} else
if AbsValue(test2_displacement_dn) > 0 and test2_displacement_dn < 0 {
    pivot_upper = insert_gap(low[2], high[0]).pvtUp;
    pivot_lower = insert_gap(low[2], high[0]).pvtLo;
    is_fvg_up = no;
    is_fvg_dn = yes;
    col = insert_gap(low[2], high[0]).col;
} else {
    pivot_upper = pivot_upper[1];
    pivot_lower = pivot_lower[1];
    is_fvg_up = is_fvg_up[1];
    is_fvg_dn = is_fvg_dn[1];
    col = col[1];
}
#// Plotting:
def diff = (pivot_upper - pivot_lower);
def vg_magnitude = if col == 0 then na else diff[1];

plot vg_Hist = if last then na else vg_magnitude;
vg_Hist.AssignValueColor(if col > 0 then CreateColor(41, 98, 255) else CreateColor(255, 82, 82));
vg_Hist.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
vg_Hist.SetLineWeight(4);

def vg_shock = highest(vg_magnitude, n_compare)[1] < vg_magnitude;

plot fvgUp = if use_Lookback and vg_shock and col > 0 then - 0.05 else na;
plot fvgLo = if use_Lookback and vg_shock and col < 0 then - 0.05 else na;
fvgUp.SetPaintingStrategy(PaintingStrategy.POINTS);
fvgLo.SetPaintingStrategy(PaintingStrategy.POINTS);
fvgUp.SetDefaultColor(Color.GREEN);
fvgLo.SetDefaultColor(Color.RED);
fvgUp.SetLineWeight(2);
fvgLo.SetLineWeight(2);

#-- - Label
AddLabel(ShowLabel and use_Lookback, "Lookback= " + n_compare + " bars", Color.WHITE);

#-- END of CODE