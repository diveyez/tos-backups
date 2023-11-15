declare lower;

# Define the inputs
input showNews = yes;

# Define the news event data
def newsEvent = if showNews then 1 else 0;
AddLabel(yes, if newsEvent == 1 then "NEWS" else "", if newsEvent == 1 then Color.YELLOW else Color.GRAY);

# Define the lower study data
def price = close;
def length = 50;
def avg = SimpleMovingAvg(price, length);
def lower = (price - avg) / avg * 100;

# Plot the lower oscillator and news events
plot low1 = Lower;
low1.AssignValueColor(if Lower > 0 then Color.GREEN else Color.RED);