#also gannhilow
#https://www.tradingview.com/script/xzIoaIJC-SSL-channel/
declare upper;
input period = 8;
input avgType = averageType.simple;
def avgHigh = movingAverage(avgType, high, period);
def avgLow = movingAverage(avgType, low, period);;

def H1v = if isnan(close[1]) then 0
else if close > avghigh then 1
else if close < avgLow then - 1
else H1v[1];

plot sslDown = if h1v < 0 then avgHigh else avgLow;
sslDown.setDefaultColor(color.red);
plot sslUp = if h1v < 0 then avgLow else avgHigh;
sslUP.setDefaultColor(color.green);
#addcloud(sslup, ssldown, color.dark_green, color.red);

plot UpSigna = if sslUp crosses above sslDown then sslDown else Double.NaN;
UpSigna.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
UpSigna.SetLineWeight(1);
UpSigna.SetDefaultColor(Color.GREEN);

plot DownSigna = if sslUp crosses below sslDown then sslDown else Double.NaN;
DownSigna.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
DownSigna.SetLineWeight(1);
DownSigna.SetDefaultColor(Color.RED);

Alert(sslUp crosses above sslDown, "Trending Up", Alert.Bar, Sound.Bell);
Alert(sslUp crosses below sslDown, "Trending Down", Alert.Bar, Sound.Ring);

input colorbars = no;
assignpricecolor(if colorbars and sslUP > sslDown then color.Green else if colorbars and sslDown > sslUP then color.Red else color.current);

AddLabel(yes, if UpSigna is true then " " else if DownSigna is true then " " else " ");

AssignBackgroundColor(if UpSigna is true then color.green else if DownSigna is true then color.red else color.gray);

# End