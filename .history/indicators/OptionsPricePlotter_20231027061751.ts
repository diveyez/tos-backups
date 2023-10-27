# Options Contract Premium MA Indicator
# Written  by Richard Neff and edited by ChatGPT
# All Rights Reserved
# The showMA and showVolumeAvg inputs allow you to turn these features on and off.The optionPriceWithMA variable combines the theo variable with the moving average and volume average, and the optionPriceMA plot shows the result.

# Define inputs
input symbol = "SPY";
input expiration = 0;
input strikePrice = 0;
input priceType = PriceType.LAST;
input showVolumeAvg = yes;
input volumeAvgLength = 20;
input showMA = yes;
input maLength = 50;

# Define moving averages
def optionPrice = if priceType == PriceType.BID then close(symbol = symbol, priceType = PriceType.BID) else if priceType == PriceType.ASK then close(symbol = symbol, priceType = PriceType.ASK) else close(symbol = symbol, priceType = PriceType.LAST);
def ma = if showMA then MovingAverage(AverageType.SIMPLE, optionPrice, maLength) else double.nan;

# Define volume average
def volumeAvg = if showVolumeAvg then Average(volume, volumeAvgLength) else double.nan;

# Define option price with moving averages and volume averages
def optionPriceWithMA = optionPrice + ma + volumeAvg;

# Plot option price with moving averages and volume averages
plot optionPriceMA = optionPriceWithMA;
optionPriceMA.SetDefaultColor(GetColor(0));
