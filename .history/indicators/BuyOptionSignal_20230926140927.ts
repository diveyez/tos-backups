def symbol = "CMG";
def expirationDate = 20230505;

# Define the strike price
def strikePrice = 1500;

# Get the current stock price
def stockPrice = close(symbol);

# Get the current option price
optionPrice = close(symbol = symbol, period = "DAY", optionType = OptionType.CALL, expirationdate = expirationDate, strike = strikePrice);

# Calculate the intrinsic value of the option
def intrinsicValue = Max(0, stockPrice - strikePrice);

# Compare the premium to the intrinsic value and trigger a buy signal if the premium is less than the intrinsic value
def premiumLessThanIntrinsicValue = optionPrice < intrinsicValue;

# Display a message if the premium is less than the intrinsic value
AddChartBubble(premiumLessThanIntrinsicValue, low, "Buy Call Option", Color.GREEN);