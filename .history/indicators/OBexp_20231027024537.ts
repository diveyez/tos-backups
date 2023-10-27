

#// This experimental Indicator helps identifying instituational Order Blocks.
#// Often these blocks signal the beginning of a strong move, but there is a significant probability that these price levels will be revisited at a later point in time again.
#// Therefore these are interesting levels to place limit orders (Buy Orders for Bullish OB / Sell Orders for Bearish OB).
#// A Bullish Order block is defined as the last down candle before a sequence of up candles. (Relevant price range "Open" to "Low" is marked)  / Optionally full range "High" to "Low"
#// A Bearish Order Block is defined as the last up candle before a sequence of down candles. (Relevant price range "Open" to "High" is marked) / Optionally full range "High" to "Low"
#// In the settings the number of required sequential candles can be adjusted.
#// Furthermore a %-threshold can be entered. It defines which %-change the sequential move needs to achieve in order to identify a relevant Order Block.
#// Channels for the last Bullish/Bearish Block can be shown/hidden.
#// In addition to the upper/lower limits of each Order Block, also the equlibrium (average value) is marked as this is an interesting area for price interaction.
#// Alerts added: Alerts fire when an Order Block is detected. The delay is based on the "Relevant Periods" input. Means with the default setting "5" the alert will trigger after the
#// number of consecutive candles is reached.
#https://www.tradingview.com/script/R8g2YHdg-Order-Block-Finder-Experimental/
#study("Order Block Finder", overlay = true)

# Converted & mod by Sam4COK @Samer800 - 08 / 2022(Not typical conversion)
# multi - timeframe support and simplified lines added by tony_futures - 10 / 2022
input higherTimeFrame = AggregationPeriod.FIVE_MIN;
def htf = higherTimeFrame;
def xO = open(period = htf);
def xH = high(period = htf);
def xL = low(period = htf);
def xC = close(period = htf);
input periods = 5; # "Relevant Periods to identify OB")
input threshold = 0.0; # "Min. Percent move to identify OB"

def na = Double.NaN;

def ob_period = periods + 1;
def absmove = ((AbsValue(xC[ob_period] - xC[1])) / xC[ob_period]) * 100;
def relmove = absmove >= threshold;

#// Bullish Order Block Identification
def bullishOB = xC[ob_period] < xO[ob_period];

#def period = periods;
def upcandles = fold i = 1 to periods + 1 with p do
    p + (if xC[i] > xO[i] then 1 else 0);

def OB_bull = bullishOB and(upcandles == periods) and relmove;
def ObBull = if OB_bull then getvalue(xC, periods) else na;


#// Bearish Order Block Identification
def bearishOB = xC[ob_period] > xO[ob_period];

def downcandles;
downcandles = fold j = 1 to periods + 1 with s do
    s + (if xC[j] < xO[j] then 1 else 0);

def OB_bear = bearishOB and(downcandles == periods) and relmove;
def ObBear = if OB_bear then getvalue(xC, periods) else na;

DefineGlobalColor("BullCloud", Color.GRAY);
DefineGlobalColor("BearCloud", Color.GRAY);

def plotBull = ObBull[-ob_period];
AddCloud(if plotBull then xH else Na, xL, GlobalColor("BullCloud"), GlobalColor("BullCloud"));
#plot ObBull1 = if plotBull then xH else na;#"Bullish OB"
#ObBull1.SetPaintingStrategy(PaintingStrategy.VALUES_BELOW);
#ObBull1.SetDefaultColor(Color.WHITE);
#ObBull1.SetLineWeight(2);

#// Bearish OB Indicator
def plotBear = ObBear[-ob_period];
AddCloud(if plotBear then xH else Na, xL, GlobalColor("BearCloud"), GlobalColor("BearCloud"));
#plot ObBear1 =if plotBear then xL else na; # "Bearish OB"
#ObBear1.SetPaintingStrategy(PaintingStrategy.VALUES_ABOVE);
#ObBear1.SetDefaultColor(CreateColor(33, 150, 243));
#ObBear1.SetLineWeight(2);

