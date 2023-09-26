# Elder Impulse Indicator for ThinkorSwim
# @Ace_Trader 1 / 10 / 2019
input length = 13;

def EMA = MovAvgExponential(length = length)."AvgExp";
def MACDHist = MACDHistogram()."Diff";

def impulseSignal = if (EMA < EMA[1] and MACDHist < MACDHist[1])
then 0
else if (EMA > EMA[1] and MACDHist > MACDHist[1])
then 1
else -1;

assignpriceColor(if impulseSignal == 1 then Color.Green else if impulseSignal == 0 then Color.Red else Color.Yellow);