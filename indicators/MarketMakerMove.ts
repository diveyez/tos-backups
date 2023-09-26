#Follow ken on Twitter @KRose_TDA
#Market Maker Move script is used on Ken Rose - Options Strategies Webcast presented Thursday nights @3PM ET - Scripting Studies on Thinkorswim Tuesday nights at 5: 30PM ET 
#     https://events.thinkorswim.com/#/webcast
#declare lower;
#sets color for Label
input Label_Color_Choice = { "magenta", "green", "pink", "cyan", default "orange", "red", "blue", "gray", "violet"};
#sets color for Label
#determines if we show label
input show_label = yes;
#determines if we show label
#Defines earings time
def isBefore = HasEarnings(EarningTime.BEFORE_MARKET);
def isAfter = HasEarnings(EarningTime.AFTER_MARKET);
def isDuringOrUnspecified = HasEarnings() and!isBefore and!isAfter;
#Defines earings time

def StockPrice = close;
def Market_Maker_Move = GetMarketMakerMove();
def MMMpercent = Market_Maker_Move / StockPrice;
AddLabel(Market_Maker_Move >= 0 and show_label, "Market Maker Move =  " + AsDollars(Market_Maker_Move) + "  ...  " + AsPercent(MMMpercent), GetColor(label_color_choice));
#determines if we expand MMM line to edge of chart
input LineOnExpansion = yes;
#determines if we expand MMM line to edge of chart
def PrevClose = close(period = AggregationPeriod.DAY)[1];

############Below only finds the last bar on chart
def bar = if IsNaN(close)
             then if LineOnExpansion
                     then bar[1]
                     else Double.NaN
             else BarNumber();

def Highest_Bar = HighestAll(bar);
############above only finds the last bar on chart
#ssigns close + MMM if at last bar on chart
def barCount = if bar == Highest_Bar
                 then(close + Market_Maker_Move)
else double.NaN;
####Delete Pound Signs After Test
plot upper = if Highest_Bar == bar
         then HighestAll(barCount)
           else Double.NaN;

upper.sethiding(upper == double.NaN);
upper.SetDefaultColor(getcolor(Label_Color_Choice));
upper.SetPaintingStrategy(paintingStrategy.DASHES);
upper.SetLineWeight(3);
upper.sethiding(isnan(getMarketMakerMove()));

def barCount2 = if bar == Highest_Bar
                 then(close - Market_Maker_Move)
else Double.NaN;
####Delete Pound Signs After Test
plot lower = if Highest_Bar <= bar
           then HighestAll(barCount2)
           else Double.NaN;
lower.sethiding(lower == double.NaN);
lower.SetDefaultColor(getcolor(Label_Color_Choice));
lower.SetPaintingStrategy(PaintingStrategy.dashes);
lower.SetLineWeight(3);
lower.sethiding(isnan(getMarketMakerMove()));