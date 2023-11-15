input price = close;
input length = 200;
input displace = 0;
input showBreakoutSignals = no;

plot SMA = Average(price[-displace], length);
plot UpSignal = price crosses above SMA;
plot DownSignal = price crosses below SMA;

UpSignal.SetHiding(!showBreakoutSignals);
DownSignal.SetHiding(!showBreakoutSignals);

SMA.SetDefaultColor(GetColor(1));
UpSignal.SetDefaultColor(Color.UPTICK);
UpSignal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
DownSignal.SetDefaultColor(Color.DOWNTICK);
DownSignal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);