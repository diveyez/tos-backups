    input symbol = "VIX";
    input Period = AggregationPeriod.MIN;
    input AvgType = AverageType.EXPONENTIAL;
    input Length = 20;
    input priceclose = FundamentalType.CLOSE; ## def vix = close("VIX"); <--not getting this to work

    def AVG = if IsNaN(MovingAverage(AvgType, Fundamental(priceclose, symbol, period = Period), Length))
              then AVG[1]
              else MovingAverage(AvgType, Fundamental(priceclose, symbol, period = Period), Length);

AddLabel(1, "VIX " + (Period / 60000) + "m " + length + "MA: " + AsText(AVG), Color.WHITE);

