# Start SMA
input price = close;
input length = 20;
input displace = 0;

def SMA = Average(price[-displace], length);
def SMAbull = price > SMA;
def SMAbear = price < SMA;

# Start ADX
input ADXlength = 14;
input ADXaverageType = AverageType.WILDERS;
def ADX = DMI(ADXlength, ADXaverageType).ADX;

def ADXpower = ADX > 30;

def bullish = SMAbull and ADXpower;
def bearish = SMAbear and ADXpower;

AssignPriceColor(if bullish then Color.GREEN else if bearish then Color.RED else Color.WHITE);