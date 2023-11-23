# Archive Name: Historical Vs.Series IV_Mobius
# Archive Section: Volatility   
# Suggested Tos Name: Historical_vs_SeriesIV_Mobius
# Archive Date: 5.05.2018
# Archive Notes:

# Historical Vs.Series IV
# Mobius
# Chat Room Request 05.01.2018

#14: 21 Mobius: On the above study - Make sure the series is set to cover the options period   On equities that #have weekly options if your looking for the monthly you'd want to set it to 2.  Some now have more than #even weekly so be aware that you may be comparing apples to watermelons

declare lower;

input length = 20;
input basis = { default Annual, Monthly, Weekly, Daily };
input Series_IV = 1;
def ap = GetAggregationPeriod();

Assert(ap >= AggregationPeriod.MIN, "Study can only be calculated for time-aggregated charts: " + ap);

def barsPerDay = (RegularTradingEnd(GetYYYYMMDD()) - RegularTradingStart(GetYYYYMMDD())) / ap;
def barsPerYear =
if ap > AggregationPeriod.WEEK then 12
else if ap == AggregationPeriod.WEEK then 52
else if ap >= AggregationPeriod.DAY then 252 * AggregationPeriod.DAY / ap
else 252 * barsPerDay;

def basisCoeff;
switch (basis) {
    case Annual:
        basisCoeff = 1;
    case Monthly:
        basisCoeff = 12;
    case Weekly:
        basisCoeff = 52;
    case Daily:
        basisCoeff = 252;
}

def clLog = Log(close / close[1]);
plot HV = StDev(clLog, length) * Sqrt(barsPerYear / basisCoeff * length / (length - 1));
HV.SetDefaultColor(GetColor(0));
def IV = if isNaN(SeriesVolatility(series = Series_IV))
then IV[1]
else SeriesVolatility(series = Series_IV);
plot S_IV = IV;
AddLabel(1, "Historical IV = " + HV, hv.TakeValueColor());
AddLabel(1, "Series IV = " + IV, S_IV.TakeValueColor());

# End of Code  #  added by JQ for Archive