input ema1low = 9;
input ema1high = 21;
input ema2low = 55;
input ema2high = 100;
input ema3low = 200;
input ema3high = 300;

def ema9 = ExpAverage(close, ema1low);
def ema21 = ExpAverage(close, ema1high);
AddCloud(ema9, ema21, Color.GREEN, Color.RED);

def ema55 = ExpAverage(close, ema2low);
def ema100 = ExpAverage(close, ema2high);
AddCloud(ema55, ema100, Color.CYAN, Color.LIGHT_GRAY);

def ema200 = ExpAverage(close, ema3low);
def ema300 = ExpAverage(close, ema3high);
AddCloud(ema200, ema300, Color.blue, Color.YELLOW);