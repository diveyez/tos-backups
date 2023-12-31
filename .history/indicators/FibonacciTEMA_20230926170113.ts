# Fibonacci Bollinger Bands TEMA
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/WVmYC1aM/

input length = 200;
input src = hlc3;
input mult = 3.0;
def dev = mult * stdev(src, length);
def ema1 = expAverage(src, length);
def ema2 = expAverage(ema1, length);
def ema3 = expAverage(ema2, length);
def out = 3 * (ema1 - ema2) + ema3;

def upper_1 = out + (0.236 * dev);
def upper_2 = out + (0.382 * dev);
def upper_3 = out + (0.5 * dev);
def upper_4 = out + (0.618 * dev);
def upper_5 = out + (0.764 * dev);
def upper_6 = out + (1 * dev);
def lower_1 = out - (0.236 * dev);
def lower_2 = out - (0.382 * dev);
def lower_3 = out - (0.5 * dev);
def lower_4 = out - (0.618 * dev);
def lower_5 = out - (0.764 * dev);
def lower_6 = out - (1 * dev);

plot line = out;
plot p1 = upper_1;
plot p2 = upper_2;
plot p3 = upper_3;
plot p4 = upper_4;
plot p5 = upper_5;
plot p6 = upper_6;
plot p7 = lower_1;
plot p8 = lower_2;
plot p9 = lower_3;
plot p10 = lower_4;
plot p11 = lower_5;
plot p12 = lower_6;


