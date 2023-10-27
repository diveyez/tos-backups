# VPA Candles & Bars with Anomaly Detector by Wiinii
# Version 1.2
# Original Volume - colored candles code by BenTen
#https://usethinkscript.com/threads/vpa-candles-bars-with-anomaly-detector-for-thinkorswim.13831/

#hint: Indicates candles with high volume(bright green / red), candles with low volume(dark green / red) average volume(standard green / red), and detects candle anomalies with high volume - short candles(Cyan / Magenta) and low volume - tall candles(very light green / red).\n Tall_Candle_X = Candle % Taller than average.\n Short_Candle_X = Candle % Shorter than average.\n X_VolAvg = % higher or lower volume than average.\n Volume_Candles_Average = Number of candles it's averaging anomalous candle size and volume to.

declare on_volume;

input Irregular = { default "Bodies", "Both", "Candles"};
input CandlesAndVolAvg = 5;
input VolAvgType = AverageType.EXPONENTIAL;
input Use_RSI = yes;
def RSIType = RSI(averageType = "EXPONENTIAL");
input RSIHi = 65;
input RSILo = 35;

input ShortCandleVolMulti = 1.0;

input PaintLoVolTallCandles = yes;
input TallCandleVolMulti = 0.8;


def AvgCandle = SimpleMovingAvg(price = (high[1] - low[1]), length = CandlesAndVolAvg);
def AvgCandleBody = Average(BodyHeight(), CandlesAndVolAvg);

def CurrentCandle = high - low;

plot Vol = volume;
Vol.SetHiding(1 == 1);
plot VolAvg = MovingAverage(VolAvgType, volume, CandlesAndVolAvg);
VolAvg.SetPaintingStrategy(PaintingStrategy.LINE);
VolAvg.SetDefaultColor(Color.CYAN);

def VolHi = volume > VolAvg * 1.2;
def VolMed = volume >= VolAvg * 0.8 and volume <= VolAvg * 1.2;
def VolLo = volume < VolAvg * 0.8;

def UVolHi = VolHi and close > open;
def UVolMed = VolMed and close > open;
def UVolLow = VolLo and close > open;

def DVolHi = VolHi and close < open;
def DVolMed = VolMed and close < open;
def DVolLow = VolLo and close < open;

def S_Candle = CurrentCandle <= AvgCandle;
def S_Body = BodyHeight() <= AvgCandleBody;
def ShortVolAnomolyCandleUp = if (if Irregular == irregular.Candles then S_Candle else if Irregular == irregular.Bodies then S_Body else S_Candle or S_Body) and(volume > VolAvg * ShortCandleVolMulti) and(if Use_RSI then(RSIType >= RSIHi or RSIType <= RSILo) else RSI()) and close > open then 1 else Double.NaN;
def ShortVolAnomolyCandleDn = if (if Irregular == irregular.Candles then S_Candle else if Irregular == irregular.Bodies then S_Body else S_Candle or S_Body) and(volume > VolAvg * ShortCandleVolMulti) and(if Use_RSI then(RSIType >= RSIHi or RSIType <= RSILo) else RSI()) and close < open then 1 else Double.NaN;

def T_Candle = CurrentCandle >= AvgCandle;
def T_Body = BodyHeight() >= AvgCandleBody;
def TallVolAnomolyCandleUp = if PaintLoVolTallCandles and(if Irregular == irregular.Candles then T_Candle else if Irregular == irregular.Bodies then T_Body else T_Candle or T_Body) and(volume < VolAvg * TallCandleVolMulti) and close > open then 1 else Double.NaN;
def TallVolAnomolyCandleDn = if PaintLoVolTallCandles and(if Irregular == irregular.Candles then T_Candle else if Irregular == irregular.Bodies then T_Body else T_Candle or T_Body) and(volume < VolAvg * TallCandleVolMulti) and close < open then 1 else Double.NaN;

Vol.DefineColor("UVolHi", CreateColor(0, 255, 0));
Vol.DefineColor("UVolMed", CreateColor(0, 175, 0));
Vol.DefineColor("UVolLow", CreateColor(0, 40, 0));
Vol.DefineColor("DVolHi", CreateColor(255, 0, 0));
Vol.DefineColor("DVolMed", CreateColor(175, 0, 0));
Vol.DefineColor("DVolLow", CreateColor(60, 0, 0));
Vol.DefineColor("NoVol", Color.GRAY);
Vol.DefineColor("HiVol_ShortCandleUp", Color.CYAN);
Vol.DefineColor("HiVol_ShortCandleDn", Color.MAGENTA);
Vol.DefineColor("LoVol_TallCandleUp", CreateColor(153, 255, 153));
Vol.DefineColor("LoVol_TallCandleDn", CreateColor(255, 225, 255));

AssignPriceColor(
    if UVolHi then Vol.Color("UVolHi")
    else if DVolHi then Vol.Color("DVolHi")
    else if UVolMed then Vol.Color("UVolMed")
    else if DVolMed then Vol.Color("DVolMed")
    else if UVolLow then Vol.Color("UVolLow")
    else if DVolLow then Vol.Color("DVolLow")
    else Color.CURRENT);

AssignPriceColor(if ShortVolAnomolyCandleUp then Vol.Color("HiVol_ShortCandleUp") else Color.CURRENT);
AssignPriceColor(if ShortVolAnomolyCandleDn then Vol.Color("HiVol_ShortCandleDn") else Color.CURRENT);
AssignPriceColor(if TallVolAnomolyCandleUp then Vol.Color("LoVol_TallCandleUp") else Color.CURRENT);
AssignPriceColor(if TallVolAnomolyCandleDn then Vol.Color("LoVol_TallCandleDn") else Color.CURRENT);