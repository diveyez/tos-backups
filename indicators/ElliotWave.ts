# Elliott Wave Indicator
# Written By R.Neff

input waveLength = 60;
input waveColor = Color.BLUE;

def bullish = low[waveLength] > low[waveLength * 2];
def bearish = high[waveLength] < high[waveLength * 2];

plot wave = if bullish then low[waveLength] else if bearish then high[waveLength] else Double.NaN;
wave.SetPaintingStrategy(PaintingStrategy.LINE);
wave.AssignValueColor(if bullish then waveColor else if bearish then Color.RED else Color.GRAY);