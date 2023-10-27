input length = 20;
def hammer = hammer();
def inverted_hammer = invertedHammer();
def ExpMa = ExpAverage(close, length);
plot cond = (hammer or inverted_hammer) and((high crosses above ExpMA) or(low crosses below ExpMA));
cond.SetPaintingStrategy(PaintingStrategy.Boolean_Arrow_UP);