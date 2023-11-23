declare lower;
input BarColor = no; #input(false, title = "Enable bar colors")
input lengthMA = 34;
input lengthSignal = 9;
input src = hlc3;

def na = Double.NaN;
script calc_smma {
    input src = vwap;
    input len = 34;
    def smma = if IsNaN(smma[1]) then SimpleMovingAvg(src, len) else (smma[1] * (len - 1) + src) / len;
    plot return = smma;
}
script calc_zlema {
    input src = ohlc4;
    input length = 34;
    def ema1 = ExpAverage(src, length);
    def ema2 = ExpAverage(ema1, length);
    def d = ema1 - ema2;
    def zelma = ema1 + d;
    plot return = zelma;
}
def hi = calc_smma(high, lengthMA);
def lo = calc_smma(low, lengthMA);
def mi = calc_zlema(src, lengthMA);

def md = if (mi > hi) then(mi - hi) else if (mi < lo) then(mi - lo) else 0;
def sb = SimpleMovingAvg(md, lengthSignal);
def sh = md - sb;
def mdc = if src > mi then if src > hi then 2 else 1 else if src < lo then - 2 else -1;
#-- - PLots
plot ImpulseSignal = sb;
ImpulseSignal.SetDefaultColor(Color.WHITE);
ImpulseSignal.SetLineWeight(2);

plot ImpulseHisto = sh;
ImpulseHisto.SetPaintingStrategy(PaintingStrategy.SQUARED_HISTOGRAM);
ImpulseHisto.SetDefaultColor(Color.BLUE);

plot ImpulseMACD = md;
ImpulseMACD.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
ImpulseMACD.AssignValueColor(if mdc == 2 then Color.GREEN else
if mdc == 1 then Color.DARK_GREEN else
if mdc == -2 then Color.RED else Color.DARK_RED);
plot "0" = if IsNaN(close) then na else 0;
"0".SetDefaultColor(Color.DARK_GRAY);
#-- - Bar Color
AssignPriceColor(if !BarColor then Color.CURRENT else
if mdc == 2 then Color.GREEN else
if mdc == 1 then Color.DARK_GREEN else
if mdc == -2 then Color.RED else Color.DARK_RED);


#-- - END Code