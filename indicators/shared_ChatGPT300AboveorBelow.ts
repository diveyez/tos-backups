input price = close;
input emaLength = 300;

plot ema = ExpAverage(price, emaLength);

ema.AssignValueColor(if ema > ema[1] then color.green else if ema < ema[1] then color.red else color.gray);

plot signalUp = price > ema and price[1] <= ema[1];
signalUp.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
signalUp.SetDefaultColor(color.green);

plot signalDown = price < ema and price[1] >= ema[1];
signalDown.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
signalDown.SetDefaultColor(color.red);
