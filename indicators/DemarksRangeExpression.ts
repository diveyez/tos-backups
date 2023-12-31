# Tom Demark's Range Expansion Index
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/wggSnKUg/

declare lower;

input TDREIper = 8;
input Smaper = 5;

input b1 = 100;
input b2 = 60;
input b3 = 45;
input b4 = -45;
input b5 = -60;
input b6 = -100;

def HighMom = high - high[2];
def LowMom = low - low[2];
def TD1 = (high >= low[5] or high >= low[6]);
def TD2 = (high[2] >= close[7] or high[2] >= close[8]);
def TD3 = (low <= high[5] or low <= high[6]);
def TD4 = (low[2] <= close[7] or low[2] <= close[8]);
def TD5 = (TD1 or TD2) and(TD3 or TD4);
def TD6 = if (TD5, HighMom + LowMom, 0);
def TD7 = absValue(HighMom) + absValue(LowMom);
def TDREI = 100 * sum(TD6, TDREIper) / sum(TD7, TDREIper);

plot band1 = b1;
plot band2 = b2;
plot band3 = b3;
plot ZeroLine = 0;
plot band4 = b4;
plot band5 = b5;
plot band6 = b6;

def out = SimpleMovingAvg(TDREI, Smaper);
plot signal1 = out;
plot signal2 = TDREI;

addCloud(b1, b2, color.red, color.red);
addCloud(b5, b6, color.green, color.green);

def sell = TDREI < b3 and TDREI[1] > band3[1] and TDREI < out;
def buy = TDREI > b4 and TDREI[1] < band4[1] and TDREI > out;

# Remove "#" from the code below if you want potential entry signals

#assignPriceColor(if buy then Color.Green else if sell then Color.Red else Color.White);