plot Data = close and IsAscending("value" = vwap, "length" = 60) is true within 30 bars and Fundamental("fundamentalType" = FundamentalType.VOLUME) crosses low within 1200 bars and GetValue("data" = hlc3, "dynamic offset" = vwap, "max offset" = 1) is not equal to 30 within 60 bars;

input length = 20;
def hammer = hammer();
def inverted_hammer = invertedHammer();
def ExpMa = ExpAverage(close, length);
plot cond = (hammer or inverted_hammer) and((high crosses above ExpMA) or(low crosses below ExpMA));
cond.SetPaintingStrategy(PaintingStrategy.Boolean_Arrow_UP);