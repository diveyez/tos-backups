#Name: ElderImpulse
#Inspired By: Chris Ball(chris.m.ball@gmail.com) on 11 / 2 /08
#http://chartingwithchris.blogspot.com and
#http://readtheprospectus.wordpress.com/2009/09/12/paintbars-finally-come-to-think-or-swim/
#Description: This study from Dr.Alexander Elder helps to filter trades.

input length = 13;

def EMA = MovAvgExponential(length = length)."AvgExp";
def MACDHist = MACDHistogram()."Diff";

def impulseSignal = if (EMA < EMA[1] and MACDHist < MACDHist[1])
then 0
else if (EMA > EMA[1] and MACDHist > MACDHist[1])
then 1
else -1;

assignpriceColor(if impulseSignal == 1 then Color.Green else if impulseSignal == 0 then Color.Red else Color.Yellow);