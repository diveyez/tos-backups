# 20 Simple Moving Average Channel DAY TRADE
# Idea from tradingsetupsreview.com
# Assembled by BenTen at useThinkScript.com

# You are free to use this code for personal use, and make derivative works from it.You are NOT GRANTED permission to use this code(or derivative works) for commercial purposes which includes and is not limited to selling, reselling, or packaging with other commercial indicators.Headers and attribution in this code should remain as provided, and any derivative works should extend the existing headers.

# Gap feature added by @korygill and modified by @WalkingBallista
# track data necessary to calculate if this is a gapUp or gapDown day
def time = GetDay();
def previousClose = if time != time[1] then close[1] else previousClose[1];
def dayOpen1 = if time != time[1] then open else dayOpen1[1];
def dayLow = if time != time[1] then low else dayLow[1];
def dayHigh = if time != time[1] then high else dayHigh[1];
def gapUp = if dayLow > previousClose then 1 else 0;
def gapDown = if dayHigh < previousClose then 1 else 0;

# Original code below from 3 color GRaB candles for ThinkorSwim
# Copyright 2014 Simpler Options
# Changed from 34 ema to 20 SMA and only include high and low

declare upper;
declare once_per_bar;

def ema1 = SimpleMovingAvg(high, 20);
def ema3 = SimpleMovingAvg(low, 20);

plot ema1H = if gapDown or gapUp then ema1 else double.Nan;
plot ema1L = if gapDown or gapUp then ema3 else double.Nan;
ema1H.SetDefaultColor(Color.GREEN);
ema1H.SetLineWeight(2);
ema1L.SetDefaultColor(Color.RED);
ema1L.SetLineWeight(2);

plot ema3H = if gapDown or gapUp then ema1 else double.Nan;
plot ema3L = if gapDown or gapUp then ema3 else double.Nan;
ema3H.SetDefaultColor(Color.GREEN);
ema3H.SetLineWeight(2);
ema3L.SetDefaultColor(Color.RED);
ema3L.SetLineWeight(2);