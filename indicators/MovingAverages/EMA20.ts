input price = close;
input length = 20;
input displace = -50;
input showBreakoutSignals = no;

plot AvgExp = ExpAverage(price[-displace], length);
plot UpSignal = price crosses above AvgExp;
plot DownSignal = price crosses below AvgExp;

UpSignal.SetHiding(!showBreakoutSignals);
DownSignal.SetHiding(!showBreakoutSignals);

AvgExp.SetDefaultColor(GetColor(2));
UpSignal.SetDefaultColor(Color.UPTICK);
UpSignal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
DownSignal.SetDefaultColor(Color.DOWNTICK);
DownSignal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);