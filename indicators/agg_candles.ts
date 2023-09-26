# 
#
#
# ---------------------------------
# draw colored shading(green, red, white) to represent bigger time frame candles, including wicks
#  ex.draw 30minute candles, on a 5minute chart. 6 bars per period.
#  period number is in minutes, (any number > 1)
#(valid if user time is a multiple of chart time, ex. 15 / 1, 18 / 3, 30 / 5, 45 / 5,...)

# label to display the quantity of period bars per time period
# recommend turning off after hours
# if open is within 0.005 of close, then a white line is drawn for the body
#
# inputs,
#   number for time period, minutes
#   show candle shading
#   lines for open / high / low / close levels
#   enter RGB color numbers for up(130, 255, 130) and down(255, 130, 130) colors
#   last period,
#     bar count, vertical line, OC lines,
#     shading, HL bubbles, OC bubbles,
#
# go here to look up RGB color numbers  https://www.w3schools.com/colors/colors_picker.asp
# ---------------------------------

    def bn = BarNumber();
def na = Double.NaN;
#  last bar, on right adge of chart
#def lastbarbn = HighestAll(If(IsNaN(close), 0, bn));
#  last bar with price data
def lastbarbn = HighestAll(If(IsNaN(close), 0, bn));
def lastbar = if (bn == lastbarbn) then 1 else 0;

def chartagg = GetAggregationPeriod();
def chartmin = (chartagg / 1000) / 60;

input bigcandlemin = 30; #hint bigcandlemin: "Enter a number of minutes for the longer time period candles"
input show_shading = yes;
input show_OHLC_lines = no;


# body color
# up color - green
input up_body_RGB_color_0to255 = yes; #hint up_body_RGB_color_0to255: "a dummy variable, to explain the number range for RGB colors, 0 to 255"
#  default RGB colors, red - green - blue, light green(130, 255, 130)   light red(255, 130, 130)
#  alt colors, slightly darker, medium green(60, 255, 60)   medium red(255, 60, 60)
#  alt colors, green(0, 255, 0)   red(255, 0, 0)
input up_color_red_num = 130;
def ured = up_color_red_num;
input up_color_green_num = 255;
def ugrn = up_color_green_num;
input up_color_blue_num = 130;
def ublu = up_color_blue_num;
DefineGlobalColor("upshade1", CreateColor(ured, ugrn, ublu));
input down_body_RGB_color_0to255 = yes;
# down color - red
input down_color_red_num = 255;
def dred = down_color_red_num;
input down_color_green_num = 130;
def dgrn = down_color_green_num;
input down_color_blue_num = 130;
def dblu = down_color_blue_num;
DefineGlobalColor("downshade1", CreateColor(dred, dgrn, dblu));
#  use
# GlobalColor("upshade1")
# GlobalColor("downshade1")

# bigbar, refers to the group of bars that make up a bigger agg candle
# is chartmin a multiple of bigcandlemin ?
    def bigmulti = (bigcandlemin / chartmin) == floor(bigcandlemin / chartmin);
def bigbar2 = if (!bigmulti or bigcandlemin <= chartmin) then 1 else (bigcandlemin / chartmin);

# add offset - 1 to bar#.want 2nd 30min period start to be on bar31, not 30
def bnoff = -1;
# find first bar in a group of bigbar bars
def bigbarfirst = ((bn + bnoff) / bigbar2) == Floor((bn + bnoff) / bigbar2);
def bigbarfirstbn = if bigbarfirst then bn else bigbarfirstbn[1];
def bigbar = bigbar2;

addlabel(bigmulti, GetSymbol() + "  " + Getmonth() + "/" + getdayofmonth(GetYyyyMmDd()), color.yellow);
addlabel(bigmulti, bigcandlemin + " min period / " + bigbar + " bars, on a " + chartmin + " min chart", color.yellow);
addlabel(!bigmulti, "<<<<<<<<<<  bigcandlemin " + bigcandlemin + " is not a multiple of chart time " + chartmin + ". nothing drawn  >>>>>>>>>>", color.cyan);


# -----------------------------
# find the bars for the wicks
#   bigbar, qty of bars in a period
#   bigbarfirst, first bar in period
def bigbarqtyeven = (bigbar / 2) == Floor(bigbar / 2);
def bigbarhalf = floor(bigbar / 2);
def mid = bigbarfirst[bigbarhalf - 1];

# this defines the middle 2 or 3 bars for the wicks
def wick;
if bigbarqtyeven then {
    wick = bigbarfirst[bigbarhalf - 1] or bigbarfirst[bigbarhalf - 0];
} else {
    wick = bigbarfirst[bigbarhalf + 1] or bigbarfirst[bigbarhalf - 0] or bigbarfirst[bigbarhalf - 1];
};

# --------------------------------


# --------------------------------

# count bars in each period
def perbarcnt = if bigbarfirst then 1 else perbarcnt[1] + 1;
# count bar groups
def bigbarcnt = if bigbarfirst then bigbarcnt[1] + 1 else bigbarcnt[1];
# determine odd / even, to alternate between groups, so lines and clouds are not continious
def bigbareven = (bigbarcnt / 2) == Floor(bigbarcnt / 2);

# if the first bar in a period,
# offset to a future bar, then use highest and lowest to look back and find...
#  highest in bigbar period
def hi2 = if bigbarfirst then Highest(high[-(bigbar - 1)], bigbar) else hi2[1];
#  lowest in bigbar period
def lo2 = if bigbarfirst then lowest(low[-(bigbar - 1)], bigbar) else lo2[1];

# -------------------------


#  OHLC  levels per period
# =======================================================
def bighi = round(hi2, 3);
def biglo = round(lo2, 3);
def bigopen = if bigbarfirst then open else bigopen[1];
def bigclose = if bigbarfirst then close[-(bigbar - 1)] else bigclose[1];
# =======================================================


# big candle body stats
#   min open / close diff to define doji, white body, 0.005
def mindiff = 0.005;
def bodygrn = (bigclose >= (bigopen + mindiff));
def bodyred = (bigclose <= (bigopen - mindiff));
def bodywht = (!bodygrn and!bodyred);
def bodytop = max(bigopen, bigclose);
def bodybot = min(bigopen, bigclose);

# --------------------------
#  lines - high
plot hilvla = if bigbareven and show_OHLC_lines then bighi else na;
plot hilvlb = if !bigbareven and show_OHLC_lines then bighi else na;
hilvla.setdefaultcolor(color.gray);
hilvlb.setdefaultcolor(color.gray);
hilvla.hidebubble();
hilvlb.hidebubble();
#  lines - low
plot lolvla = if bigbareven and show_OHLC_lines then biglo else na;
plot lolvlb = if !bigbareven and show_OHLC_lines then biglo else na;
lolvla.setdefaultcolor(color.gray);
lolvlb.setdefaultcolor(color.gray);
lolvla.hidebubble();
lolvlb.hidebubble();
# ----------------------------
#  lines - body top, open / close
plot bodytopa = if bigbareven and show_OHLC_lines then bodytop else na;
plot bodytopb = if !bigbareven and show_OHLC_lines then bodytop else na;
bodytopa.setdefaultcolor(color.gray);
bodytopb.setdefaultcolor(color.gray);
bodytopa.hidebubble();
bodytopb.hidebubble();
#  lines - body bot, open / close
plot bodybota = if bigbareven and show_OHLC_lines then bodybot else na;
plot bodybotb = if !bigbareven and show_OHLC_lines then bodybot else na;
bodybota.setdefaultcolor(color.gray);
bodybotb.setdefaultcolor(color.gray);
bodybota.hidebubble();
bodybotb.hidebubble();

# ---------------------------------

# doji candle
# open / close same, white line for body
plot bodywhteven4 = if show_shading and bigbareven and bodywht then bigclose else na;
bodywhteven4.setdefaultcolor(color.white);
bodywhteven4.setlineweight(2);
bodywhteven4.hidebubble();

plot bodywhtodd4 = if show_shading and!bigbareven and bodywht then bigclose else na;
bodywhtodd4.setdefaultcolor(color.white);
bodywhtodd4.setlineweight(2);
bodywhtodd4.hidebubble();

# white wicks
def wickwhtevenhi = if (show_shading and bigbareven and bodywht and wick) then bighi else na;
def wickwhtevenlo = if (show_shading and bigbareven and bodywht and wick) then biglo else na;
addcloud(wickwhtevenhi, wickwhtevenlo, color.white, color.white);

def wickwhtoddhi = if (show_shading and!bigbareven and bodywht and wick) then bighi else na;
def wickwhtoddlo = if (show_shading and!bigbareven and bodywht and wick) then biglo else na;
addcloud(wickwhtoddhi, wickwhtoddlo, color.white, color.white);

# --------------------------
# body color - even period
def bodytopeven4 = if show_shading and bigbareven then bigclose else na;
def bodyboteven4 = if show_shading and bigbareven then bigopen else na;
addcloud(bodytopeven4, bodyboteven4, GlobalColor("upshade1"), GlobalColor("downshade1"));
# body color - odd period
def bodytopodd4 = if show_shading and!bigbareven then bigclose else na;
def bodybotodd4 = if show_shading and!bigbareven then bigopen else na;
addcloud(bodytopodd4, bodybotodd4, GlobalColor("upshade1"), GlobalColor("downshade1"));
# --------------------------


# --------------------------
# wick color - green - even
def grnevenbodytop = if (show_shading and bigbareven and bodygrn and wick) then bodytop else na;
def grnevenbodybot = if (show_shading and bigbareven and bodygrn and wick) then bodybot else na;
# upper wick
addcloud(bighi, grnevenbodytop, GlobalColor("upshade1"), GlobalColor("upshade1"));
# lower wick
addcloud(grnevenbodybot, biglo, GlobalColor("upshade1"), GlobalColor("upshade1"));

# wick color - green - odd
def grnoddbodytop = if (show_shading and!bigbareven and bodygrn and wick) then bodytop else na;
def grnoddbodybot = if (show_shading and!bigbareven and bodygrn and wick) then bodybot else na;
# upper wick
addcloud(bighi, grnoddbodytop, GlobalColor("upshade1"), GlobalColor("upshade1"));
# lower wick
addcloud(grnoddbodybot, biglo, GlobalColor("upshade1"), GlobalColor("upshade1"));

# -------------------------
# wick color - red - even
def redevenbodytop = if (show_shading and bigbareven and bodyred and wick) then bodytop else na;
def redevenbodybot = if (show_shading and bigbareven and bodyred and wick) then bodybot else na;
# upper wick
addcloud(bighi, redevenbodytop, GlobalColor("downshade1"), GlobalColor("downshade1"));
# lower wick
addcloud(redevenbodybot, biglo, GlobalColor("downshade1"), GlobalColor("downshade1"));

# wick color - red - odd
def redoddbodytop = if (show_shading and!bigbareven and bodyred and wick) then bodytop else na;
def redoddbodybot = if (show_shading and!bigbareven and bodyred and wick) then bodybot else na;
# upper wick
addcloud(bighi, redoddbodytop, GlobalColor("downshade1"), GlobalColor("downshade1"));
# lower wick
addcloud(redoddbodybot, biglo, GlobalColor("downshade1"), GlobalColor("downshade1"));


# ----------------------------------
#  last period stuff

input period_bar_count_on_last_candle = yes;
def sbc = period_bar_count_on_last_candle;

# plot period bar count above last bar
plot q1 = if (sbc and lastbar and(perbarcnt <> bigbar)) then perbarcnt else na;
q1.SetPaintingStrategy(PaintingStrategy.VALUES_ABOVE);
q1.SetDefaultColor(Color.white);
q1.hidebubble();

# plot period total bar count below last bar
plot q2 = if (sbc and lastbar and(perbarcnt <> bigbar)) then bigbar else na;
q2.SetPaintingStrategy(PaintingStrategy.VALUES_below);
q2.SetDefaultColor(Color.white);
q2.hidebubble();

input vert_line_on_last_period = yes;
def sl = vert_line_on_last_period;

def currlastbar = bigbarfirst[bigbar - 1];

def showlastvert = if (!isnan(bigopen) and isnan(bigclose)) then currlastbar else na;
# add offest so line is after the bar instead of in front of it
addverticalline(sl and showlastvert[1], "LAST BAR", color.LIGHT_gray, Curve.MEDIUM_DASH);

# -------------

    def showlastvertbn = if showlastvert then bn else 0;
def currlastbarbn = highestall(showlastvertbn);
# define time for the last period
def lastper = if (isnan(bigclose) and bn >= bigbarfirstbn and bn <= currlastbarbn) then 1 else 0;
# plot line at open for current period

input open_close_lines_on_last_period = yes;
def lastperopen = if lastper then bigopen else na;
plot gg = if open_close_lines_on_last_period  then lastperopen else na;
gg.setdefaultcolor(color.gray);

# find close of last period
def lastperclose = if lastper then(HighestAll( if (!isnan(close[0]) and isnan(close[-1]), close, 0))) else na;
plot ccls = if open_close_lines_on_last_period then lastperclose else na;
ccls.setdefaultcolor(color.gray);

input shading_on_last_period = yes;
def currtop = if shading_on_last_period then lastperclose else na;
addcloud(currtop, lastperopen, GlobalColor("upshade1"), GlobalColor("downshade1"));

# ----------------------------------
# ----------------------------------
# test data------------------------

# show barnumbers
#AddChartBubble(1, hi2, bn, Color.MAGENTA, yes);

# test - count of periods
#addchartbubble(1, low, bigbarcnt, color.cyan, no);

# plot a bubble under last bar, with period bar count / total bars
#addchartbubble(1, low * 0.995, q1 + "\n" + q2, color.yellow, no);

input show_high_low_price_bubbles = no;
AddChartBubble(show_high_low_price_bubbles and mid and bigmulti, bighi, bighi, Color.gray, yes);
AddChartBubble(show_high_low_price_bubbles and mid and bigmulti, biglo, biglo, Color.gray, no);

input show_open_close_price_bubbles = no;
AddChartBubble(show_open_close_price_bubbles and bigbarfirst and bigmulti, bodytop, bodytop, Color.gray, yes);
AddChartBubble(show_open_close_price_bubbles and bigbarfirst and bigmulti, bodybot, bodybot, Color.gray, no);

input show_OHLC_bubbles = no;
AddChartBubble(show_OHLC_bubbles and bigbarfirst and bigmulti, lo2, "O " + bigopen + "\nH " + bighi + "\nL " + biglo + "\nC " + bigclose, Color.MAGENTA, no);

#input show_label_stats = yes;
# this shows n / a errors for current bars
#Addlabel(show_label_stats and bigmulti, "O " + bigopen + " H " + bighi + " L " + biglo + " C" + bigclose, Color.yellow);

#addchartbubble(1, low * 0.995, bigbarfirstbn + "\n" + currlastbarbn + "\n" + currlastbar + "\n" + lastper + "\n" + lastbarbn + "\n" + lastbar, color.cyan, no);
#

