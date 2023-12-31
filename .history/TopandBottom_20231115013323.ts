
#
# kg_TopBottomStrat_ceyhun
#
# Author: Kory Gill, @korygill
#
# Shows buy and sell signals based on 2 different periods.
# This code was ported to thinkscript from the indicator on tradingview from @ceyhun
# https://www.tradingview.com/script/aAUge288/ and
# https://www.tradingview.com/script/yW9GYWKx/
#
# VERSION HISTORY - Sortable date and time(your local time is fine), and your initials.
# 20190923 - 2200 - KG - Created.
# ...
# ...
#

declare once_per_bar;

input LowPeriod = 14;
input HighPeriod = 14;
input OnUpper = yes;

def bn = BarNumber();
def nan = Double.NaN;
def locBottom;
def bottom;
def locTop;
def top;
def buysell = { default none, buy, sell };

if bn == 1
then
{
    locBottom = 0;
    bottom = 0;

    locTop = 0;
    top = 0;

    buysell = buysell.none;
}
else if low < Lowest(low[1], LowPeriod) and low <= Lowest(low[LowPeriod], LowPeriod)
then
{
    locBottom = bn;
    bottom = 0;

    locTop = locTop[1];
    top = top[1] + 1;

    buysell = buysell.sell;
}
else if high > Highest(high[1], HighPeriod) and high >= Highest(high[HighPeriod], HighPeriod)
then
{
    locBottom = locBottom[1];
    bottom = bottom[1] + 1;

    locTop = bn;
    top = 0;

    buysell = buysell.buy;
}
else
{
    locBottom = locBottom[1];
    bottom = bottom[1] + 1;

    locTop = locTop[1];
    top = top[1] + 1;

    buysell = buysell[1];
}

def buy = top < bottom and top[1] > bottom[1];
def sell = top > bottom and top[1] < bottom[1];

AddChartBubble(
    buy and OnUpper,
    if OnUpper then close else 0,
    "BUY",
    Color.GREEN,
    0
    );

AddChartBubble(
    sell and OnUpper,
    if OnUpper then close else 0,
    "SELL",
    Color.RED,
    if OnUpper then 1 else 0
    );

plot pb = if OnUpper then nan else bottom;
plot pt = if OnUpper then nan else top;
plot psell = if OnUpper then nan else sell;
plot pbuy = if OnUpper then nan else buy;

def direction = if buysell == buysell.none then 0 else if buysell == buysell.buy then Double.POSITIVE_INFINITY else Double.NEGATIVE_INFINITY;

AddCloud(direction, -direction, CreateColor(0, 128, 30), CreateColor(128, 0, 30));

#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# Strategy Code, comment out for Study
#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
#
#AddOrder(OrderType.BUY_AUTO, buy, name = "Buy");
#AddOrder(OrderType.SELL_AUTO, sell, name = "Sell");

# END - kg_TopBottom_ceyhun