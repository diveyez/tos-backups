# Blast Off Indicator
# Should use on the Daily chart
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/V9Mi6eOO-CM-Blast-Off-V1-Alerts-Ready/

input trig = 20;
input paintbar = yes;

def val = AbsValue(close - open);
def range = high - low;
def blastOffVal = (val / range) * 100;
def trigger = trig;
def alert1 = blastOffVal < trig;
def col = blastOffVal < trig;

plot value = if col then 1 else 0;
addlabel(yes, "Blast Off ", if value == 1 then color.black else color.Dark_Gray);
AssignBackgroundColor(if col then Color.orange else Color.Dark_GRAY);