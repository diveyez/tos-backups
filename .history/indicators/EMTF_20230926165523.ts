# EMA MTF(EMTF)
# Estimated Moving Frontier
# Includes Scalping Alerts
declare upper;

input price = close;
input length = 10;
input length2 = 35;
input agperiod1 = { "1 min", default "2 min", "3 min", "5 min", "10 min", "15 min", "30 min", "1 hour", "2 hours", "4 hours", "Day", "Week", "Month"};
input agperiod2 = { "1 min", "2 min", default "3 min", "5 min", "10 min", "15 min", "30 min", "1 hour", "2 hours", "4 hours", "Day", "Week", "Month"};
input agperiod3 = { "1 min", "2 min", "3 min", "5 min", default "10 min", "15 min", "30 min", "1 hour", "2 hours", "4 hours", "Day", "Week", "Month"};
input agperiod4 = { "1 min", "2 min", "3 min", "5 min", "10 min", "15 min", default "30 min", "1 hour", "2 hours", "4 hours", "Day", "Week", "Month"};
input agperiod5 = { "1 min", "2 min", "3 min", "5 min", "10 min", "15 min", "30 min", "1 hour", "2 hours", default "4 hours", "Day", "Week", "Month"};
input agperiod6 = { "1 min", "2 min", "3 min", "5 min", "10 min", "15 min", "30 min", "1 hour", "2 hours", "4 hours", default "Day", "Week", "Month"};
def displace = 0;
input paintCandles = yes;
input show_ema_cloud = yes;

#Current Period
plot AvgExp = ExpAverage(price[-displace], length);
AvgExp.SetStyle(Curve.SHORT_DASH);
def UPC1 = AvgExp > AvgExp[1];
def DNC1 = AvgExp < AvgExp[1];

plot AvgExp2 = ExpAverage(price[-displace], length2);
AvgExp2.SetStyle(Curve.SHORT_DASH);
def UPC2 = AvgExp2 > AvgExp2[1];
def DNC2 = AvgExp2 < AvgExp2[1];

def Below = AvgExp < AvgExp2;
def Spark = UPC1 + UPC2 + Below;

def UPEMA = AvgExp[1] < AvgExp;
def DOWNEMA = AvgExp[1] > AvgExp;
AvgExp.AssignValueColor(if UPEMA then Color.LIGHT_GREEN else if DOWNEMA then Color.RED else Color.YELLOW);

def UPEMA2 = AvgExp2[1] < AvgExp2;
def DOWNEMA2 = AvgExp2[1] > AvgExp2;
AvgExp2.AssignValueColor(if UPEMA2 then Color.LIGHT_GREEN else if DOWNEMA2 then Color.RED else Color.YELLOW);

AddCloud(if show_ema_cloud and(AvgExp2 > AvgExp) then AvgExp2 else Double.NaN, AvgExp, Color.LIGHT_RED, Color.CURRENT);
AddCloud(if show_ema_cloud and(AvgExp > AvgExp2) then AvgExp else Double.NaN, AvgExp2, Color.LIGHT_GREEN, Color.CURRENT);

#Agperiod1
def avg = ExpAverage(close(period = agperiod1), length);
def height = avg - avg[length];

def avg2 = ExpAverage(close(period = agperiod1), length2);
def height2 = avg2 - avg2[length2];

def UP = avg > avg2;
def DOWN = avg < avg2;

def R1UP = avg > avg[1];
def R1DN = avg < avg[1];
def R2UP = avg2 > avg2[1];
def R2DN = avg2 < avg2[1];

#Agperiod2
def avg3 = ExpAverage(close(period = agperiod2), length);
def height3 = avg3 - avg3[length];

def avg4 = ExpAverage(close(period = agperiod2), length2);
def height4 = avg4 - avg4[length2];

def UP2 = avg3 > avg4;
def DOWN2 = avg3 < avg4;

def R3UP = avg3 > avg3[1];
def R3DN = avg3 < avg3[1];
def R4UP = avg4 > avg4[1];
def R4DN = avg4 < avg4[1];

#Agperiod3
def avg5 = ExpAverage(close(period = agperiod3), length);
def height5 = avg5 - avg5[length];

def avg6 = ExpAverage(close(period = agperiod3), length2);
def height6 = avg6 - avg6[length2];

def UP3 = avg5 > avg6;
def DOWN3 = avg5 < avg6;

def R5UP = avg5 > avg5[1];
def R5DN = avg5 < avg5[1];
def R6UP = avg6 > avg6[1];
def R6DN = avg6 < avg6[1];

#Agperiod4
def avg7 = ExpAverage(close(period = agperiod4), length);
def height7 = avg7 - avg7[length];

def avg8 = ExpAverage(close(period = agperiod4), length2);
def height8 = avg8 - avg8[length2];

def UP4 = avg7 > avg8;
def DOWN4 = avg7 < avg8;

def R7UP = avg7 > avg7[1];
def R7DN = avg7 < avg7[1];
def R8UP = avg8 > avg8[1];
def R8DN = avg8 < avg8[1];

#Agperiod5
def avg9 = ExpAverage(close(period = agperiod5), length);
def height9 = avg9 - avg9[length];

def avg10 = ExpAverage(close(period = agperiod5), length2);
def height10 = avg10 - avg10[length2];

def UP5 = avg9 > avg10;
def DOWN5 = avg9 < avg10;

def R9UP = avg9 > avg9[1];
def R9DN = avg9 < avg9[1];
def R10UP = avg10 > avg10[1];
def R10DN = avg10 < avg10[1];

#Agperiod6
def avg11 = ExpAverage(close(period = agperiod6), length);
def height11 = avg11 - avg11[length];

def avg12 = ExpAverage(close(period = agperiod6), length2);
def height12 = avg12 - avg12[length2];

def UP6 = avg11 > avg12;
def DOWN6 = avg11 < avg12;

def R11UP = avg11 > avg11[1];
def R11DN = avg11 < avg11[1];
def R12UP = avg12 > avg12[1];
def R12DN = avg12 < avg12[1];

def Long_Only = UP + UP2 + UP3 + UP4 + UP5 + UP6;
def Short_Only = DOWN + DOWN2 + DOWN3 + DOWN4 + DOWN5 + DOWN6;
def Consensus_Bias = Long_Only - Short_Only;

def RUP = UPC1 + UPC2 + R1UP + R2UP + R3UP + R4UP + R5UP + R6UP + R7UP + R8UP + R9UP + R10UP + R11UP + R12UP;
def RDN = DNC1 + DNC2 + R1DN + R2DN + R3DN + R4DN + R5DN + R6DN + R7DN + R8DN + R9DN + R10DN + R11DN + R12DN;
def ConsensusR = RUP - RDN;

script WMA_Smooth {
    input price = hl2;
    plot smooth = (4 * price
        + 3 * price[1]
        + 2 * price[2]
        + price[3]) / 10;
}

script Phase_Accumulation {
# This is Ehler's Phase Accumulation code. It has a full cycle delay.
# However, it computes the correction factor to a very high degree.
#
    input price = hl2;

    rec Smooth;
    rec Detrender;
    rec Period;
    rec Q1;
    rec I1;
    rec I1p;
    rec Q1p;
    rec Phase1;
    rec Phase;
    rec DeltaPhase;
    rec DeltaPhase1;
    rec InstPeriod1;
    rec InstPeriod;
    def CorrectionFactor;

    if BarNumber() <= 5
    then {
        Period = 0;
        Smooth = 0;
        Detrender = 0;
        CorrectionFactor = 0;
        Q1 = 0;
        I1 = 0;
        Q1p = 0;
        I1p = 0;
        Phase = 0;
        Phase1 = 0;
        DeltaPhase1 = 0;
        DeltaPhase = 0;
        InstPeriod = 0;
        InstPeriod1 = 0;
    } else {
        CorrectionFactor = 0.075 * Period[1] + 0.54;

# Smooth and detrend my smoothed signal:
        Smooth = WMA_Smooth(price);
        Detrender = (0.0962 * Smooth
            + 0.5769 * Smooth[2]
            - 0.5769 * Smooth[4]
            - 0.0962 * Smooth[6]) * CorrectionFactor;

# Compute Quadrature and Phase of Detrended signal:
        Q1p = (0.0962 * Detrender
            + 0.5769 * Detrender[2]
            - 0.5769 * Detrender[4]
            - 0.0962 * Detrender[6]) * CorrectionFactor;
        I1p = Detrender[3];

# Smooth out Quadrature and Phase:
        I1 = 0.15 * I1p + 0.85 * I1p[1];
        Q1 = 0.15 * Q1p + 0.85 * Q1p[1];

# Determine Phase
        if I1 != 0
        then {
# Normally, ATAN gives results from - pi / 2 to pi / 2.
# We need to map this to circular coordinates 0 to 2pi

            if Q1 >= 0 and I1 > 0
            then { # Quarant 1
                Phase1 = ATan(AbsValue(Q1 / I1));
            } else if Q1 >= 0 and I1 < 0
            then { # Quadrant 2
                Phase1 = Double.Pi - ATan(AbsValue(Q1 / I1));
            } else if Q1 < 0 and I1 < 0
            then { # Quadrant 3
                Phase1 = Double.Pi + ATan(AbsValue(Q1 / I1));
            } else { # Quadrant 4
                Phase1 = 2 * Double.Pi - ATan(AbsValue(Q1 / I1));
            }
        } else if Q1 > 0
        then { # I1 == 0, Q1 is positive
            Phase1 = Double.Pi / 2;
        } else if Q1 < 0
        then { # I1 == 0, Q1 is negative
            Phase1 = 3 * Double.Pi / 2;
        } else { # I1 and Q1 == 0
            Phase1 = 0;
        }

# Convert phase to degrees
        Phase = Phase1 * 180 / Double.Pi;

        if Phase[1] < 90 and Phase > 270
        then {
# This occurs when there is a big jump from 360 - 0
            DeltaPhase1 = 360 + Phase[1] - Phase;
        } else {
            DeltaPhase1 = Phase[1] - Phase;
        }

# Limit our delta phases between 7 and 60
        if DeltaPhase1 < 7
        then {
            DeltaPhase = 7;
        } else if DeltaPhase1 > 60
        then {
            DeltaPhase = 60;
        } else {
            DeltaPhase = DeltaPhase1;
        }

# Determine Instantaneous period:
        InstPeriod1 =
            -1 * (fold i = 0 to 40 with v = 0 do
                if v < 0 then
v
else if v > 360 then
            - i
        else
            v + GetValue(DeltaPhase, i, 41)
);

        if InstPeriod1 <= 0
        then {
            InstPeriod = InstPeriod[1];
        } else {
            InstPeriod = InstPeriod1;
        }

        Period = 0.25 * InstPeriod + 0.75 * Period[1];
    }
    plot DC = Period;
}

script Ehler_MAMA {
    input price = hl2;
    input FastLimit = 0.5;
    input SlowLimit = 0.05;


    rec Period;
    rec Period_raw;
    rec Period_cap;
    rec Period_lim;

    rec Smooth;
    rec Detrender;
    rec I1;
    rec Q1;
    rec jI;
    rec jQ;
    rec I2;
    rec Q2;
    rec I2_raw;
    rec Q2_raw;

    rec Phase;
    rec DeltaPhase;
    rec DeltaPhase_raw;
    rec alpha;
    rec alpha_raw;

    rec Re;
    rec Im;
    rec Re_raw;
    rec Im_raw;

    rec SmoothPeriod;
    rec vmama;
    rec vfama;

    def CorrectionFactor = Phase_Accumulation(price).CorrectionFactor;

    if BarNumber() <= 5
    then {
        Smooth = 0;
        Detrender = 0;

        Period = 0;
        Period_raw = 0;
        Period_cap = 0;
        Period_lim = 0;
        I1 = 0;
        Q1 = 0;
        I2 = 0;
        Q2 = 0;
        jI = 0;
        jQ = 0;
        I2_raw = 0;
        Q2_raw = 0;
        Re = 0;
        Im = 0;
        Re_raw = 0;
        Im_raw = 0;
        SmoothPeriod = 0;
        Phase = 0;
        DeltaPhase = 0;
        DeltaPhase_raw = 0;
        alpha = 0;
        alpha_raw = 0;
        vmama = 0;
        vfama = 0;
    } else {
# Smooth and detrend my smoothed signal:
        Smooth = WMA_Smooth(price);
        Detrender = (0.0962 * Smooth
            + 0.5769 * Smooth[2]
            - 0.5769 * Smooth[4]
            - 0.0962 * Smooth[6]) * CorrectionFactor;

        Q1 = (0.0962 * Detrender
            + 0.5769 * Detrender[2]
            - 0.5769 * Detrender[4]
            - 0.0962 * Detrender[6]) * CorrectionFactor;
        I1 = Detrender[3];

        jI = (0.0962 * I1
            + 0.5769 * I1[2]
            - 0.5769 * I1[4]
            - 0.0962 * I1[6]) * CorrectionFactor;

        jQ = (0.0962 * Q1
            + 0.5769 * Q1[2]
            - 0.5769 * Q1[4]
            - 0.0962 * Q1[6]) * CorrectionFactor;

# This is the complex conjugate
        I2_raw = I1 - jQ;
        Q2_raw = Q1 + jI;

        I2 = 0.2 * I2_raw + 0.8 * I2_raw[1];
        Q2 = 0.2 * Q2_raw + 0.8 * Q2_raw[1];

        Re_raw = I2 * I2[1] + Q2 * Q2[1];
        Im_raw = I2 * Q2[1] - Q2 * I2[1];

        Re = 0.2 * Re_raw + 0.8 * Re_raw[1];
        Im = 0.2 * Im_raw + 0.8 * Im_raw[1];

# Compute the phase
        if Re != 0 and Im != 0
        then {
            Period_raw = 2 * Double.Pi / ATan(Im / Re);
        } else {
            Period_raw = 0;
        }

        if Period_raw > 1.5 * Period_raw[1]
        then {
            Period_cap = 1.5 * Period_raw[1];
        } else if Period_raw < 0.67 * Period_raw[1] {
            Period_cap = 0.67 * Period_raw[1];
        } else {
            Period_cap = Period_raw;
        }

        if Period_cap < 6
        then {
            Period_lim = 6;
        } else if Period_cap > 50
        then {
            Period_lim = 50;
        } else {
            Period_lim = Period_cap;
        }

        Period = 0.2 * Period_lim + 0.8 * Period_lim[1];
        SmoothPeriod = 0.33 * Period + 0.67 * SmoothPeriod[1];

        if I1 != 0
        then {
            Phase = ATan(Q1 / I1);
        } else if Q1 > 0
        then { # Quadrant 1:
            Phase = Double.Pi / 2;
        } else if Q1 < 0
        then { # Quadrant 4:
            Phase = -Double.Pi / 2;
        } else { # Both numerator and denominator are 0.
            Phase = 0;
        }

        DeltaPhase_raw = Phase[1] - Phase;
        if DeltaPhase_raw < 1
        then {
            DeltaPhase = 1;
        } else {
            DeltaPhase = DeltaPhase_raw;
        }

        alpha_raw = FastLimit / DeltaPhase;
        if alpha_raw < SlowLimit
        then {
            alpha = SlowLimit;
        } else {
            alpha = alpha_raw;
        }
        vmama = alpha * price + (1 - alpha) * vmama[1];
        vfama = 0.5 * alpha * vmama + (1 - 0.5 * alpha) * vfama[1];
    }

    plot MAMA = vmama;
    plot FAMA = vfama;
}


input price2 = hl2;
input FastLimit = 0.5;
input SlowLimit = 0.05;

def MAMA = Ehler_MAMA(price2, FastLimit, SlowLimit).MAMA;
def FAMA = Ehler_MAMA(price2, FastLimit, SlowLimit).FAMA;

def Crossing = Crosses((MAMA < FAMA), yes);
#Crossing.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);

def Crossing1 = Crosses((MAMA > FAMA), yes);
#Crossing1.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);

AddLabel(yes, Concat("MAMA: ", Concat("",
if MAMA > FAMA then "Bull" else "Bear")),

if MAMA > FAMA then Color.GREEN else Color.RED);

##################################
plot C3_MF_Line = (MAMA + FAMA) / 2;
C3_MF_Line.SetPaintingStrategy(PaintingStrategy.LINE);
C3_MF_Line.SetLineWeight(3);

def direction = if ConsensusR > Consensus_Bias then 1 else if ConsensusR < Consensus_Bias then - 1 else 0;
C3_MF_Line.AssignValueColor(if paintCandles and((direction == 1) and(price > C3_MF_Line)) then Color.GREEN else if paintCandles and((direction == -1) and(price < C3_MF_Line)) then Color.RED else Color.WHITE);


plot buy = AvgExp crosses above AvgExp2; #direction crosses above 0;
buy.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
buy.SetDefaultColor(Color.WHITE);

plot sell = AvgExp crosses below AvgExp2; #direction crosses below 0;
sell.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
sell.SetDefaultColor(Color.WHITE);

AssignPriceColor(if paintCandles then if direction == 1 then Color.GREEN else if direction == -1 then Color.RED else Color.GRAY else Color.CURRENT);

AddLabel(yes, if (Spark == 3) then "SPARK UP = " + Round(Spark, 1) else if (Spark == 0) then  "SPARK DOWN = " + Round(Spark, 1) else "SPARK = " + Round(Spark, 1), if (Spark == 3) then Color.YELLOW else if ((Spark == 2) and(AvgExp > AvgExp2)) then Color.GREEN else if (Spark == 0) then Color.RED else Color.GRAY);

AddLabel(yes, if ((UP6 == 1) and(Consensus_Bias > 0)) then " SCALP_LONG " else if ((DOWN6) and(Consensus_Bias < 0)) then " SCALP_SHORT " else " CHOP ", if ((Consensus_Bias > 0) and(UP6 == 1)) then Color.GREEN else if ((Consensus_Bias < 0) and(DOWN6 == 1)) then Color.RED else Color.GRAY);

AddLabel(yes, if (ConsensusR > 0) then " LONG BIAS = %" + Round((ConsensusR / 14) * 100, 1) + " " else if (ConsensusR < 0) then  " SHORT BIAS = %" + Round(((ConsensusR * -1) / 14) * 100, 1) + " " else " CHOP =" + Round((ConsensusR / 14) * 100, 1) + " ", if (ConsensusR > 0) then Color.GREEN else if (ConsensusR < 0) then Color.RED else Color.GRAY);

Alert(direction crosses above 0, "long", Alert.BAR, Sound.DING);
Alert(direction crosses below 0, "short", Alert.BAR, Sound.DING);