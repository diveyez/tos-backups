declare lower;

input length = 20;
input aggregationPeriod = AggregationPeriod.DAY;
def price = close;
def gammaExposure = gamma(length, aggregationPeriod);
AddLabel(yes, "GEX: " + gammaExposure, if gammaExposure > 0 then Color.GREEN else if gammaExposure < 0 then Color.RED else Color.YELLOW);