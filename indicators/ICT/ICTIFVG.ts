#// This work is licensed under a Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) https://creativecommons.org/licenses/by-nc-sa/4.0/
#// © LuxAlgo version=5
#indicator("ICT Implied Fair Value Gap (IFVG) [LuxAlgo]", overlay = true
## Ported by Chemmy at usethinkscript.com

## Settings

input thr = 0.30;
input ext = 20;
input extend_gap = no;
input add_cloud = yes;

#//Style
input showBull = yes;
input showBear = yes;

## Detection Rules

#n = bar_index
def bn = BarNumber();
def range = high - low;
def b = AbsValue(close - open);
def na = double.nan;
def showbar = bn - ext;

##//Bullish IFVG
def bull_top = (Min(close, open) + low) / 2;
def bull_btm = (Max(close[2], open[2]) + high[2]) / 2;

def bull_ifvg = (b[1] > Max(b, b[2]))
and(low < high[2])
and((Min(close, open) - low) / range > thr)
and((high[2] - Max(close[2], open[2])) / range > thr)
and(bull_top > bull_btm);

def bullbar = if bull_ifvg then bn else bullbar[1];

## //Bearish IFVG
def bear_top = (Min(close[2], open[2]) + low[2]) / 2;
def bear_btm = (Max(close, open) + high) / 2;

def bear_ifvg = (b[1] > Max(b, b[2]))
and(high > low[2])
and((high - Max(close, open)) / range > thr)
and((Min(close[2], open[2]) - low[2]) / range > thr)
and(bear_top > bear_btm);

def bearbar = if bear_ifvg then bn else bearbar[1];

##//Display IFVG's
## Bull Gaps
def bull_ifvg_avg = if  showBull  then(bull_top + bull_btm) / 2 else na;

def bull_mid = if extend_gap then(if bull_ifvg then bull_ifvg_avg[2] else bull_mid[1]) else if bullbar >= showbar then(if bull_ifvg then bull_ifvg_avg[2] else bull_mid[1]) else na;
def bull_high = if extend_gap then(if bull_ifvg then bull_top[2] else bull_high[1]) else if bullbar >= showbar then(if bull_ifvg then bull_top[2] else bull_high[1]) else na;
def bull_low = if extend_gap then(if bull_ifvg then bull_btm[2] else bull_low[1]) else if bullbar >= showbar then(if bull_ifvg then bull_btm[2] else bull_low[1]) else na;

plot blm = bull_mid;
plot blh = bull_high;
plot bll = bull_low;

blm.setdefaultcolor(color.cyan);
blm.setpaintingstrategy(paintingstrategy.horizontal);
blh.setdefaultcolor(color.light_green);
blh.setpaintingstrategy(paintingstrategy.horizontal);
bll.setdefaultcolor(color.light_green);
bll.setpaintingstrategy(paintingstrategy.horizontal);

addcloud(if add_cloud then bll else na, blh, color.light_green, color.light_green);


## Bear Gaps
def bear_ifvg_avg = if showBear then(bear_top + bear_btm) / 2 else na;

def bear_mid = if extend_gap then(if bear_ifvg then bear_ifvg_avg[2] else bear_mid[1]) else if bearbar >= showbar then(if bear_ifvg then bear_ifvg_avg[2] else bear_mid[1]) else na;
def bear_high = if extend_gap then(if bear_ifvg then bear_top[2] else bear_high[1]) else if bearbar >= showbar then(if bear_ifvg then bear_top[2] else bear_high[1]) else na;
def bear_low = if extend_gap then(if bear_ifvg then bear_btm[2] else bear_low[1]) else if bearbar >= showbar then(if bear_ifvg then bear_btm[2] else bear_low[1]) else na;

plot brm = bear_mid;
plot brh = bear_high;
plot brl = bear_low;

brm.setdefaultcolor(color.orange);
brm.setpaintingstrategy(paintingstrategy.horizontal);
brh.setdefaultcolor(color.light_red);
brh.setpaintingstrategy(paintingstrategy.horizontal);
brl.setdefaultcolor(color.light_red);
brl.setpaintingstrategy(paintingstrategy.horizontal);

addcloud(if add_cloud then brl else na, brh, color.light_red, color.light_red);


## END CODE