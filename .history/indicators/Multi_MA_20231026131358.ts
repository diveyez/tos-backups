# created by Sam4Cok @Samer800     - 04 / 2023, request from useThinkscript.com member

input ColorBars = yes;
input maType1 = { SMA, EMA, SMMA, VAWMA, WMA, VWMA, RMS, DEMA, TEMA, ZLSMA, ZLDEMA, ZLTEMA, default McGinley, HMA, ALMA, SWMA, Gaussian, TRAEM, KAMA, MAV, AMA, LSMA, MAMA };
input maType2 = { SMA, EMA, SMMA, VAWMA, WMA, VWMA, RMS, DEMA, TEMA, ZLSMA, ZLDEMA, ZLTEMA, default McGinley, HMA, ALMA, SWMA, Gaussian, TRAEM, KAMA, MAV, AMA, LSMA, MAMA };
input maType3 = { SMA, EMA, SMMA, VAWMA, WMA, VWMA, RMS, DEMA, TEMA, ZLSMA, ZLDEMA, ZLTEMA, default McGinley, HMA, ALMA, SWMA, Gaussian, TRAEM, KAMA, MAV, AMA, LSMA, MAMA };
input src1 = close;
input src2 = close;
input src3 = close;
input len1 = 20;
input len2 = 50;
input len3 = 100;
input multForTraem = 1;
input lsma_offset = 0;
input FastMamaLen = 0.5;#, title = "Fast Limit")
input slowMaMaLen = 0.05;#, title = "Slow Limit")
#// ] -------------- FUNCTIONS : Moving Avg ------------------ [
script nz {
    input data = close;
    input repl = 0;
    def ret_val = if !IsNaN(data) then data else repl;
    plot return = ret_val;
}

#ama(source, length, fast, slow) =>
script ama {
input source = close;
input length = 14;
input fast = 2;
input slow = 30;
    def fastAlpha = 2 / (fast + 1);
    def slowAlpha = 2 / (slow + 1);
    def hh = highest(high, length + 1);
    def ll = lowest(low, length + 1);
    def mltp = if (hh - ll) != 0 then AbsValue(2 * source - ll - hh) / (hh - ll) else 0;
    def ssc = mltp * (fastAlpha - slowAlpha) + slowAlpha;
    def ama;
    ama = CompoundValue(1, ama[1] + power(ssc, 2) * (source - ama[1]), source);
    plot return = ama;
}
#rms(source, length)=>
script rms {
    input source = close;
    input length = 14;
    def rms = Sqrt(Sum(Power(source, 2), length) / length);
    plot return = rms;
}
#mav(source, length) =>
script mav {
input source = close;
input length = 14;
      def mav = ((SimpleMovingAvg(source, length)[1] * (length - 1)) + source) / length;
    plot return = mav;
}
#kama(xPrice, Length)=>
script kama {
    input xPrice = close;
    input Length = 14;
    def xvnoise = AbsValue(xPrice - xPrice[1]);
    def nfastend = 0.666;
    def nslowend = 0.0645;
    def nsignal = AbsValue(xPrice - xPrice[Length]);
    def nnoise = Sum(xvnoise, Length);
    def nefratio = if nnoise != 0 then nsignal / nnoise else 0;
    def nsmooth = Power(nefratio * (nfastend - nslowend) + nslowend, 2);
    def nAMA;
    nAMA = CompoundValue(1, nAMA[1] + nsmooth * (xPrice - nAMA[1]), xPrice);
    plot returen = nAMA;
}
#Gaussianma(values, length) =>
script Gaussian {
    input values = close;
    input length = 20;
    def stddev = length / 4;
    def indices = length - 1;
    def weights = Exp(-0.5 * (Power((indices - length), 2) / Power(stddev, 2)));
    def sum = Sum(values * weights, length);
    def gMA = sum / Sum(weights, length);
    plot return = gMA;
}
#pine_swma(source) =>
script swma {
input source = close;
    def swma = source[3] * 1 / 6 + source[2] * 2 / 6 + source[1] * 2 / 6 + source[0] * 1 / 6;
    plot retun = swma;
}
#export zlSma(float src, simple int len) =>
script zlSma {
    input src = close;
    input len = 14;
    def lsma = Inertia(src, len);
    def lsma2 = Inertia(lsma, len);
    def eq = lsma - lsma2;
    def zlsma = lsma + eq;
    plot return = zlsma;
}
#export zlDema(float src, simple int len) =>
script zlDema {
    input src = close;
    input len = 14;
    def zdema1 = ExpAverage(src, len);
    def zdema2 = ExpAverage(zdema1, len);
    def dema1 = 2 * zdema1 - zdema2;
    def zdema12 = ExpAverage(dema1, len);
    def zdema22 = ExpAverage(zdema12, len);
    def zldema = 2 * zdema12 - zdema22;
    plot return = zldema;
}
#export zlTema(float src, simple int len) =>
script zlTema {
    input src = close;
    input len = 14;
    def ema1 = ExpAverage(src, len);
    def ema2 = ExpAverage(ema1, len);
    def ema3 = ExpAverage(ema2, len);
    def tema1 = 3 * (ema1 - ema2) + ema3;
    def ema1a = ExpAverage(tema1, len);
    def ema2a = ExpAverage(ema1a, len);
    def ema3a = ExpAverage(ema2a, len);
    def zltema = 3 * (ema1a - ema2a) + ema3a;
    plot return = zltema;
}
#pine_alma(series, windowsize, offset, sigma) =>
script ALMA {
  input series = close;
  input windowsize = 9;
  input Offset = 0.85;
  input Sigma = 6;
    def m = Offset * (windowsize - 1);
    def s = windowsize / Sigma;
    def norm = fold z = 0 to windowsize with CW do
        CW + Exp(-(Sqr(z - m)) / (2 * Sqr(s)));
    def sum = fold y = 0 to windowsize with WS do
        WS + Exp(-(Sqr(y - m)) / (2 * Sqr(s))) * GetValue(series, windowsize - 1 - y);
    plot ALMA = sum / norm;
}
#export mcginley(float src, simple int len)=>
script mcginley {
    input src = close;
    input len = 14;
    def mg;
    def t = ExpAverage(src, len);
    mg = CompoundValue(1,if IsNaN(mg[1]) then t else mg[1] + (src - mg[1]) / (len * Power(src / mg[1], 4)), t);
    plot return = mg;
}
# vawma(len, src = hlc3, len = na, startingWeight = 1) =>
Script vawma {
  input src = hlc3;
  input len = 5;
  input startingWeight = 1;
     def last = len - 1;
    def vol = fold i1 = 0 to last with p1 do
        p1 + volume[i1] * (last - i1 + startingWeight);
    def sum = fold i2 = 0 to last with p2 do
        p2 + (src[i2] * volume[i2] * (last - i2 + startingWeight));
    def vawma = if vol == 0 then Double.NaN else sum / vol;
    plot out = vawma;
}
#vwma(source, length)
script VWMA {
    input src = close;
    input len = 15;
    def v = volume;
    def VWMA = SimpleMovingAvg(src * nz(v, 1), len) / SimpleMovingAvg(nz(v, 1), len);
    plot result = VWMA;
}
#trAdjEma(lengthy) =>
script trAdjEma {
    input src = close;
    input length = 60;
    input mult = 1;
    def tr = TrueRange(high, close, low);
    def alpha = 2.0 / (length + 1);
    def trL = Lowest(tr, length);
    def trH = Highest(tr, length);
    def trAdj = if (trH - trL) != 0 then(tr - trL) / (trH - trL) else 0;
    def trEMA = ExpAverage(src, length);
    def trAdjEma;
    trAdjEma = CompoundValue(1, trAdjEma[1] + (alpha * (1 + (trAdj * mult)) * (src - trAdjEma[1])), trEMA);
    plot trAdEma = trAdjEma;
}
#mamaPeriod(float src, int dynLow, int dynHigh) =>
script mama {
    input src = hl2;
    input dynLow = 0.5;
    input dynHigh = 0.05;
    def period;# = 0.0
    def I2;
    def Q2;
    def C1 = 0.0962;
    def C2 = 0.5769;
    def C3 = 0.075 * nz(period[1]) + 0.54;
    def PI = 2 * ASin(1);
    def smooth = (4 * src + 3 * (src[1]) + 2 * (src[2]) + (src[3])) / 10;
    def detrend = C3 * (C1 * smooth + C2 * nz(smooth[2]) - C2 * nz(smooth[4]) - C1 * nz(smooth[6]));
#    // Compute InPhase and Quadrature components
    def Q1 = C3 * (C1 * detrend + C2 * nz(detrend[2]) - C2 * nz(detrend[4]) - C1 * nz(detrend[6]));
    def I1 = nz(detrend[3], detrend);
#    // Advance Phase of I1 and Q1 by 90 degrees
    def jI = C3 * (C1 * I1 + C2 * (I1[2]) - C2 * (I1[4]) - C1 * nz(I1[6]));
    def jQ = C3 * (C1 * Q1 + C2 * (Q1[2]) - C2 * (Q1[4]) - C1 * nz(Q1[6]));
#   // Phasor addition for 3 bar averaging
    def I22 = I1 - jQ;
    def Q22 = Q1 + jI;
#   // Smooth I and Q components before applying discriminator
    I2 = if IsNaN(I2[1]) then I22 else 0.2 * I2[1] + 0.8 * nz(I2[1], I2[1]);
    Q2 = if IsNaN(Q2[1]) then Q22 else 0.2 * Q2[1] + 0.8 * nz(Q2[1], Q2[1]);
#   // Extract Homodyne Discriminator
    def Re1 = I2 * nz(I2[1], I2) + Q2 * nz(Q2[1], Q2);
    def Im1 = I2 * nz(Q2[1], Q2) - Q2 * nz(I2[1], I2);
    def Re = if IsNaN(Re[1]) then Re1 else 0.2 * Re[1] + 0.8 * nz(Re[2], Re[1]);
    def Im = if IsNaN(Im[1]) then Im1 else 0.2 * Im[1] + 0.8 * nz(Im[2], Im[1]);
#-- -
    if Re != 0 and Im != 0 {
        period = 2 * PI / ATan(Im / Re);
    } else {
        if period[1] <= 1.5 * nz(period[2], period[1]) {
            period = period[1];
        } else {
            if period[1] >= (2 / 3) * nz(period[2], period[1]) {
                period = period[1];
            } else
                if  Max(period[1], dynLow) < dynHigh {
                    period = Max(period[1], dynLow);
                } else {
                    period = 0.2 * period[1] + 0.8 * nz(period[2], period[1]);
                    ;
                }
        }
    }
    def SmoothPeriod = 0.33 * Period + 0.67 * nz(SmoothPeriod[1]);
    def Phase = 180 / (4 * atan(1)) * atan(q1 / i1);
    def DeltaPhase1 = nz(Phase[1]) - Phase;
    def DeltaPhase = if (DeltaPhase1 < 1, 1, DeltaPhase1);
    def alpha1 = dynLow / DeltaPhase;
    def alpha = if (alpha1 < dynHigh, dynHigh, if (alpha1 > dynLow, dynLow, alpha1));
    def MAMA = alpha * src + (1 - alpha) * nz(MAMA[1]);
    plot return = MAMA;
}
#export multiMa(float source, simple int length, string type) =>
script multiMa {
    input source = close;
    input length = 14;
    input type = "SMA";
    input multForTraem = 1;
    input lsma_offset = 0;
    input FastMamaLen = 0.5;
    input slowMaMaLen = 0.05;
    def w = wma(source, length);
    def multiMa =
        if type == "SMA"    then SimpleMovingAvg(source, length) else
    if type == "EMA"    then ExpAverage(source, length) else
    if type == "SMMA"   then CompoundValue(1, if isNaN(w[1]) then average(source, length) else
    (w[1] * (length - 1) + source) / length, average(source, length)) else
    if type == "WMA"    then WMA(source, length) else
    if type == "KAMA"   then KAMA(source, length) else
    if type == "MAV"   then MAV(source, length) else
    if type == "AMA"   then AMA(source, length) else
    if type == "VWMA"   then vwma(source, length) else
    if type == "DEMA"   then DEMA(source, length) else
    if type == "VAWMA"   then VAWMA(source, length) else
    if type == "TEMA"   then TEMA(source, length) else
    if type == "LSMA"   then Inertia(source[-lsma_offset], length) else
    if type == "MAMA"   then mama(source, FastMamaLen, slowMaMaLen) else
    if type == "RMS"   then RMS(source, length) else
    if type == "ZLSMA"  then zlSma(source, length) else
    if type == "ZLDEMA" then zlDema(source, length) else
    if type == "ZLTEMA" then zlTema(source, length) else
    if type == "McGinley" then mcginley(source, length) else
    if type == "ALMA" then ALMA(source, length) else
    if type == "SWMA" then SWMA(source) else
    if type == "Gaussian"   then Gaussian(source, length) else
    if type == "TRAEM"   then trAdjEma(source, length, multForTraem) else
    if type == "HMA"    then  HullMovingAvg(source, length) else Double.NaN;
    plot return = multiMa;
}

plot ma1 = multiMa(src1, len1, maType1, multForTraem, lsma_offset);
plot ma2 = multiMa(src2, len2, maType2, multForTraem, lsma_offset);
plot ma3 = multiMa(src3, len3, maType3, multForTraem, lsma_offset);

ma1.SetDefaultColor(Color.WHITE);
ma2.SetDefaultColor(Color.GREEN);
ma3.SetDefaultColor(Color.RED);

def up = ma1 > ma2 and ma2 > ma3;
def nu = ma1 < ma2 and ma2 > ma3;
def dn = ma1 < ma2 and ma2 < ma3;

def SigUp = up and!up[1];
def SigDn = dn and!dn[1];

Plot ArrowUp = if SigUp then low else Double.NaN;
Plot ArrowDn = if SigDn then high else Double.NaN;

ArrowUp.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
ArrowDn.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
ArrowUp.SetDefaultColor(Color.CYAN);
ArrowDn.SetDefaultColor(Color.MAGENTA);

AssignPriceColor(if !ColorBars then Color.CURRENT else
if up then Color.GREEN else
if dn then Color.RED else Color.GRAY);


#-- - END OF Code