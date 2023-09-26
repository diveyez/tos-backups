####################################################################
### Inspired by the IronRod SMI Histogram####################################
# Written by a random guy named SeanVincent, Diveyez and CHATGPT3 in that order#####
# No rights or credit belong to me, this is open source work licensed by an unnamed author#
# Please sign here if you are the original author________________________________________#####
#####################################################################
#####################################################################
declare lower;

input Length1 = 12;
def Limit = 20;
def range = 60;

def overbought = Limit;
def oversold = -Limit;

# Stochastic Momentum Index(SMI) 
def min_low = Lowest(low, Length1 + 1);
def max_high = Highest(high, Length1 + 1);
def rel_diff = close - (max_high + min_low) / 2;
def diff = max_high - min_low;
def avgrel = ExpAverage(ExpAverage(rel_diff, Length1), Length1);
def avgdiff = ExpAverage(ExpAverage(diff, Length1), Length1);
def SMI1 = if avgdiff != 0 then avgrel / (avgdiff / 2) * 100 else 0;

plot SMI = reference EhlersSuperSmootherFilter(price = SMI1, "cutoff length" = Length1);
SMI.DefineColor("Up", CreateColor(0, 153, 51));
SMI.definecolor("Weak", Color.GREEN);
SMI.DefineColor("Down", Color.RED);
SMI.AssignValueColor(if SMI > SMI[1] then SMI.Color("Up") else if SMI < SMI[1] then SMI.Color("Down") else SMI.Color("Weak"));
SMI.SetLineWeight(1);
SMI.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
SMI.SetLineWeight(1);

plot rangeband = if IsNaN(close) then Double.NaN else 0;
rangeband.HideBubble();
rangeband.SetLineWeight(2);
rangeband.AssignValueColor(Color.Gray);
def rangelimits = Limit;

plot upper = Limit;
plot lower = -Limit;

# Labels
AddLabel(SMI < -Limit or SMI > Limit, "Market is in a Trend in a Direction", CreateColor(0, 150, 200));
AddLabel(SMI > -Limit and SMI < Limit, "Market is Consolidating and Retracing", Color.YELLOW);