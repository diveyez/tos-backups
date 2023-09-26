# ASAP(as simple as possible) Author Dwain Pattillo - 2023

# Q.Why do I share my strategies ? 
# A.It would be completely and totally silly of me(and you!) to keep them to myself.Who remembers what happen with GameStop ? The more people doing the exact same thing at the same time in the market, the more power they have in moving the market in their favor! If we had an army of traders using the same system, oh what power we would have! We (the retail trader) could take the power back from the market makers!

# 1. Adjust the length settings for the best FloatingPL and then let'r rip!

input BackTestTradeSize = 1;
input ShowBackTestPositions = yes;
input Length = 18;
input AlertOnSignal = yes;

#Add your indicator code here(if you want to use this as a template) :)   
def min_low = Lowest(low, Length + 1);
def max_high = Highest(high, Length + 1);
def rel_diff = close - (max_high + min_low) / 2;
def range = max_high - min_low;
def avgrel = ExpAverage(ExpAverage(rel_diff, Length), Length);
def avgdiff = ExpAverage(ExpAverage(range, Length), Length);
def SMI1 = if avgdiff != 0 then avgrel / (avgdiff / 2) * 10  else 0;
def SMI = reference EhlersSuperSmootherFilter(price = SMI1, "cutoff length" = Length);

#Define the signals
def BuyToOpenSignal = SMI >= SMI[1];
def SellToOpenSignal = SMI < SMI[1];

#Open the orders on the chart for back testing and optimizing the setting
AddOrder(OrderType.BUY_AUTO, BuyToOpenSignal and ShowBackTestPositions, open[-1], BackTestTradeSize, Color.CYAN, Color.CYAN, "");
AddOrder(OrderType.SELL_AUTO, SellToOpenSignal and ShowBackTestPositions, open[-1], BackTestTradeSize, Color.RED, Color.RED, "");

#Add the signal labels to the chart
AddLabel(yes, "     BUY      ", if BuyToOpenSignal[1] crosses above BuyToOpenSignal[2] then CreateColor(153, 255, 153) else Color.White);
AddLabel(yes, "     SELL     ", if SellToOpenSignal[1]  crosses above SellToOpenSignal[2] then CreateColor(255, 102, 102) else Color.White);


#Sound the bell. (If alerts are turn on)
Alert(BuyToOpenSignal[1] crosses above BuyToOpenSignal[2] and AlertOnSignal, "Buy Open Signal", Alert.Bar, Sound.Ding);
Alert(SellToOpenSignal[1]  crosses above SellToOpenSignal[2] and AlertOnSignal, "Sell Open Signal", Alert.Bar, Sound.Ding);

#“Make everything as simple as possible, but not simpler.” Albert Einstein.

