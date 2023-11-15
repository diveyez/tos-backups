
# Define the inputs
input length = 20;

# Define the historical data
def price = close;
def volume = volume;
def prevVolume = volume[1];
def avgVolume = Average(volume, length);
def avgPrice = Average(price, length);

# Calculate the smart money index
def smi = (price - avgPrice) / avgPrice * 100 - (Log(volume) - Log(prevVolume)) / Log(avgVolume) * 100;
def smiSignal = SimpleMovingAvg(smi, length);

# Plot the smart money index and signal on the chart
plot smi2 = SMI;
plot Signal = smiSignal;
SMI2.AssignValueColor(if SMI > Signal then Color.GREEN else Color.RED);
Signal.SetDefaultColor(Color.YELLOW);