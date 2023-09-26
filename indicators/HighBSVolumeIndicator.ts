# Author: Diveyez 
# High Buy / Sell Volume Indicator with Alerts
# https://github.com/diveyez
# Define the inputs
input volumeThreshold = 100000;
input bubbleSize = 1.0;

# Calculate the buy and sell volume
def buyVol = if close > open and volume > volumeThreshold then volume else 0;
def sellVol = if close < open and volume > volumeThreshold then volume else 0;

# Plot the boxes and bubbles for high buy and high sell volume
plot BuyVolBox = if buyVol > Highest(sellVol, 10) then low else Double.NaN;
plot BuyVolBubble = if buyVol > Highest(sellVol, 10) then low - (ATR(14) * bubbleSize) else Double.NaN;
plot SellVolBox = if sellVol > Highest(buyVol, 10) then high else Double.NaN;
plot SellVolBubble = if sellVol > Highest(buyVol, 10) then high + (ATR(14) * bubbleSize) else Double.NaN;

# Declare if candle is high sell or high buy volume
def highBuyVol = if buyVol > Highest(sellVol, 10) then 1 else 0;
def highSellVol = if sellVol > Highest(buyVol, 10) then 1 else 0;

# Alert if candle is high buy or high sell volume
Alert(highBuyVol, "High (100k) Buy Volume", Alert.BAR);
Alert(highSellVol, "High (100k) Sell Volume", Alert.BAR);

# Format the boxes and bubbles
# This is not customizable in the options
# Buy Code
BuyVolBox.SetPaintingStrategy(PaintingStrategy.POINTS);
BuyVolBox.SetLineWeight(2);
BuyVolBox.AssignValueColor(if highBuyVol then Color.GREEN else Color.LIGHT_GRAY);
BuyVolBubble.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
BuyVolBubble.SetLineWeight(2);
BuyVolBubble.AssignValueColor(if highBuyVol then Color.GREEN else Color.LIGHT_GRAY);

# Sell Code
SellVolBox.SetPaintingStrategy(PaintingStrategy.POINTS);
SellVolBox.SetLineWeight(2);
SellVolBox.AssignValueColor(if highSellVol then Color.RED else Color.LIGHT_GRAY);
SellVolBubble.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
SellVolBubble.SetLineWeight(2);
SellVolBubble.AssignValueColor(if highSellVol then Color.RED else Color.LIGHT_GRAY);

