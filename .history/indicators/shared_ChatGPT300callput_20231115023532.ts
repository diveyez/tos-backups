# Define Inputs
input length = 300;

# Get the chart's current time frame
def currentAggregation = GetAggregationPeriod();

# Calculate 300 EMA for the chart's current time frame
def ema = ExpAverage(close(period = currentAggregation), length);

# Define Signals for the chart's current time frame
def buy_signal = low > ema and low[1] <= ema[1];
def sell_signal = high < ema and high[1] >= ema[1];

# Plot Signals for the chart's current time frame
AddChartBubble(buy_signal, low, "Calls", Color.GREEN);
AddChartBubble(sell_signal, high, "Puts", Color.RED);
