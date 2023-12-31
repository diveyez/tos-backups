# MarxBabu's Buy Zone Indicator
# Rough conversion by BenTen at useThinkScript.com
# Original https://www.tradingview.com/script/cnVBioxa-ZONE-Supply-Demand-Strategy1/

def isHigherHigh = high > high[1] and high[1] > high[2] and close > close[1] and close[1] > close[2] and close > open and close[1] > open[1] and close[2] > open[2] and low > open[1] and low[1] > open[2] and(open + low) < (open + close);

AssignPriceColor(if isHigherHigh then Color.WHITE else Color.CURRENT);
AssignBackgroundColor(if isHigherHigh then Color.BLACK    else Color.CURRENT);