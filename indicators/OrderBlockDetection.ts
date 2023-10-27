#// This experimental Indicator helps identifying instituational Order Blocks.
#// Often these blocks signal the beginning of a strong move, but there is a significant probability that these price levels will be revisited at a later point in time again.
#// Therefore these are interesting levels to place limit orders (Buy Orders for Bullish OB / Sell Orders for Bearish OB).
#// A Bullish Order block is defined as the last down candle before a sequence of up candles. (Relevant price range "Open" to "Low" is marked) / Optionally full range "High" to "Low"
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

input ShowCloud = yes;
input periods = 5; # "Relevant Periods to identify OB")
input threshold = 0.0; # "Min. Percent move to identify OB"
input useWicks = no; # "Use whole range [High/Low] for OB marking?" )
input showBullChannel = yes; # "Show latest Bullish Channel?"
input showBearChannel = yes; # "Show latest Bearish Channel?"

def na = Double.NaN;
def bar = barNumber();
script nz {
input data = 1;
input repl = 0;
def ret_val = if IsNaN(data) then repl else data;
plot return = ret_val;
}

def ob_period = periods + 1;
def absmove = ((AbsValue(close[ob_period] - close[1])) / close[ob_period]) * 100;
def relmove = absmove >= threshold;

#// Bullish Order Block Identification
def bullishOB = close[ob_period] < open[ob_period];

#def period = periods;
def upcandles = fold i = 1 to periods + 1 with p do
    p + (if close > open then 1 else 0);

def OB_bull = bullishOB and(upcandles == periods) and relmove;
def OB_bull_high = if OB_bull then if usewicks then high[ob_period] else open[ob_period] else na;
def OB_bull_low = if OB_bull then low[ob_period] else na;
def OB_bull_avg = (OB_bull_high + OB_bull_low) / 2;

def ObBull = if OB_bull then getvalue(close, periods) else na;
def ObBullHigh = if OB_bull_high then getvalue(if usewicks then high else open, periods) else na;
def ObBullLow = if OB_bull_low then getvalue(low, periods) else na;
def ObBullAvg = (ObBullHigh + ObBullLow) / 2;


def ph_1 = if !isnan(ObBullHigh) then ObBullHigh else ph_1[1];

def hh = !isnan(ObBullHigh) and ObBullHigh > ph_1[1];

def ObBullHLine = CompoundValue(1,if isNaN(OB_bull_high) then ObBullHLine[1] else OB_bull_high, OB_bull_high);
def ObBullLLine = CompoundValue(1,if isNaN(OB_bull_low) then ObBullLLine[1] else OB_bull_low, OB_bull_low);
def ObBullALine = CompoundValue(1,if isNaN(OB_bull_avg) then ObBullALine[1] else OB_bull_avg, OB_bull_avg);

#// Bearish Order Block Identification
def bearishOB = close[ob_period] > open[ob_period];

def downcandles;
downcandles = fold j = 1 to periods + 1 with s do
    s + (if close[j] < open[j] then 1 else 0);

def OB_bear = bearishOB and(downcandles == periods) and relmove;
def OB_bear_high = if OB_bear then high[ob_period] else na;
def OB_bear_low = if OB_bear then if usewicks then low[ob_period] else open[ob_period] else na;
def OB_bear_avg = (OB_bear_low + OB_bear_high) / 2;

def ObBear = if OB_bear then getvalue(close, periods) else na;
def ObBearhigh = if OB_bear_high then getvalue(high, periods) else na;
def ObBearlow = if OB_bear_low then if usewicks then low[ob_period] else open[ob_period] else na;
def ObBearavg = (ObBearhigh + ObBearlow) / 2;

def ObBearHLine = CompoundValue(1,if isNaN(OB_bear_high) then ObBearHLine[1] else OB_bear_high, OB_bear_high);
def ObBearLLine = CompoundValue(1,if isNaN(OB_bear_low) then ObBearLLine[1] else OB_bear_low, OB_bear_low);
def ObBearALine = CompoundValue(1,if isNaN(OB_bear_avg) then ObBearALine[1] else OB_bear_avg, OB_bear_avg);
#// Plotting

plot ObBull1 = if ObBull[-ob_period] then low else na;#"Bullish OB"
ObBull1.SetPaintingStrategy(PaintingStrategy.VALUES_BELOW);
ObBull1.SetDefaultColor(Color.WHITE);
ObBull1.SetLineWeight(2);

plot bull1 = if ObBullHigh[-ob_period] then if usewicks then high else open else na;
bull1.SetPaintingStrategy(PaintingStrategy.DASHES);
bull1.SetDefaultColor(Color.WHITE);
bull1.SetLineWeight(2);

plot bull2 = if ObBullLow[-ob_period] then low else na;#"Bullish OB Low"
bull2.SetPaintingStrategy(PaintingStrategy.DASHES);
bull2.SetDefaultColor(Color.WHITE);
bull2.SetLineWeight(2);

plot ObBullAvg1 = (bull1 + bull2) / 2; #"Bullish OB Average"
ObBullAvg1.SetPaintingStrategy(PaintingStrategy.DASHES);
ObBullAvg1.SetDefaultColor(Color.WHITE);
ObBullAvg1.SetLineWeight(2);

#AssignPriceColor(if ObBull1 then color.blue else na);
#// Bearish OB Indicator
plot ObBear1 =if ObBear[-ob_period] then high else na; # "Bearish OB"
ObBear1.SetPaintingStrategy(PaintingStrategy.VALUES_ABOVE);
ObBear1.SetDefaultColor(CreateColor(33, 150, 243));
ObBear1.SetLineWeight(2);

plot bear1 = if ObBearlow[-ob_period] then if usewicks then low else open else na;
bear1.SetPaintingStrategy(PaintingStrategy.DASHES);
bear1.SetDefaultColor(CreateColor(33, 150, 243));
bear1.SetLineWeight(2);

plot bear2 = if ObBearLow[-ob_period] then high else na;; # "Bearish OB High"
bear2.SetPaintingStrategy(PaintingStrategy.DASHES);
bear2.SetDefaultColor(CreateColor(33, 150, 243));
bear2.SetLineWeight(2);

plot ObBearAvg1 = (bear1 + bear2) / 2;; #"Bearish OB Average"
ObBearAvg1.SetPaintingStrategy(PaintingStrategy.DASHES);
ObBearAvg1.SetDefaultColor(CreateColor(33, 150, 243));
ObBearAvg1.SetLineWeight(2);

######################################

plot BullHLine = ObBullHLine;
BullHLine.SetPaintingStrategy(PaintingStrategy.DASHES);
BullHLine.SetDefaultColor(Color.GRAY);
BullHLine.SetHiding(!showBullChannel);

plot BullLLine = ObBullLLine;
BullLLine.SetPaintingStrategy(PaintingStrategy.DASHES);
BullLLine.SetDefaultColor(Color.GRAY);
BullLLine.SetHiding(!showBullChannel);

plot BullALine = ObBullALine;
BullALine.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
BullALine.SetDefaultColor(Color.GRAY);
BullALine.SetHiding(!showBullChannel);

AddCloud(if ShowCloud and BullHLine == BullHLine[1] then BullHLine else na, BullALine, Color.Light_green);
AddCloud(if ShowCloud and BullLLine == BullLLine[1] then BullLLine else na, BullALine, Color.pink);
#---------------------------------------------------

    plot BearHLine = ObBearHLine;
BearHLine.SetPaintingStrategy(PaintingStrategy.DASHES);
BearHLine.SetDefaultColor(CreateColor(33, 150, 243));
BearHLine.SetHiding(!showBearChannel);

plot BearLLine = ObBearLLine;
BearLLine.SetPaintingStrategy(PaintingStrategy.DASHES);
BearLLine.SetDefaultColor(CreateColor(33, 150, 243));
BearLLine.SetHiding(!showBearChannel);

plot BearALine = ObBearALine;
BearALine.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
BearALine.SetDefaultColor(CreateColor(33, 150, 243));
BearALine.SetHiding(!showBearChannel);

AddCloud(if ShowCloud and BearLLine == BearLLine[1] then BearLLine else na, BearALine, Color.pink);
AddCloud(if ShowCloud and BearHLine == BearHLine[1] then BearHLine else na, BearALine, Color.Light_green);
##### END of CODE
