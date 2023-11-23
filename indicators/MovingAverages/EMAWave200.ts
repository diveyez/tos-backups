input HighAverageLength = 200;
input CloseAverageLength = 200;
input LowAverageLength = 200;
input AverageType = AverageType.Exponential;

def MA1 = MovingAverage(AverageType, high, HighAverageLength);

def MA2 = MovingAverage(AverageType, close, CloseAverageLength);

def MA3 = MovingAverage(AverageType, low, LowAverageLength);

plot HighAverage = MA1;
plot CloseAverage = MA2;
plot LowAverage = MA3;

HighAverage.setDefaultColor(Color.Green);
CloseAverage.setDefaultColor(Color.Blue);
LowAverage.setDefaultColor(Color.Red);