

# Deviation Scaled VWAP with Fractual Energy Coloring.

# Adapted from ToS DSMA

# Mobius FE added with two choices of coloring in the code,

# < > .5

# and > .618 between and below .382

#

# Horserider 12 / 1 / 2019


input length = 55;


def zeros = vwap - vwap[2];

def filter = reference EhlersSuperSmootherFilter(price = zeros, "cutoff length" = 0.5 * length);

def rms = Sqrt(Average(Sqr(filter), length));

def scaledFilter = filter / rms;

def alpha = 5 * AbsValue(scaledFilter) / length;

def deviationScaledVWAP = CompoundValue(1, alpha * vwap + (1 - alpha) * deviationScaledVWAP[1], vwap);



#Inputs:

input nFE = 8; #hint nFE: length for Fractal Energy calculation.

input AlertOn = no;

input Glength = 13;

input betaDev = 8;

input data = close;


def w = (2 * Double.Pi / Glength);

def beta = (1 - Cos(w)) / (Power(1.414, 2.0 / betaDev) - 1);

def alphafe = (-beta + Sqrt(beta * beta + 2 * beta));

def Go = Power(alphafe, 4) * open +

    4 * (1 – alphafe) * Go[1] – 6 * Power(1 - alphafe, 2) * Go[2] +

        4 * Power(1 - alphafe, 3) * Go[3] - Power(1 - alphafe, 4) * Go[4];

def Gh = Power(alphafe, 4) * high +

    4 * (1 – alphafe) * Gh[1] – 6 * Power(1 - alphafe, 2) * Gh[2] +

        4 * Power(1 - alphafe, 3) * Gh[3] - Power(1 - alphafe, 4) * Gh[4];

def Gl = Power(alphafe, 4) * low +

    4 * (1 – alphafe) * Gl[1] – 6 * Power(1 - alphafe, 2) * Gl[2] +

        4 * Power(1 - alphafe, 3) * Gl[3] - Power(1 - alphafe, 4) * Gl[4];

def Gc = Power(alphafe, 4) * data +

    4 * (1 – alphafe) * Gc[1] – 6 * Power(1 - alphafe, 2) * Gc[2] +

        4 * Power(1 - alphafe, 3) * Gc[3] - Power(1 - alphafe, 4) * Gc[4];

# Variables:

def o;

def h;

def l;

def c;

def CU1;

def CU2;

def CU;

def CD1;

def CD2;

def CD;

def L0;

def L1;

def L2;

def L3;




# Calculations

o = (Go + Gc[1]) / 2;

h = Max(Gh, Gc[1]);

l = Min(Gl, Gc[1]);

c = (o + h + l + Gc) / 4;

def gamma = Log(Sum((Max(Gh, Gc[1]) - Min(Gl, Gc[1])), nFE) /

    (Highest(Gh, nFE) - Lowest(Gl, nFE)))

    / Log(nFE);


L0 = (1 – gamma) * Gc + gamma * L0[1];

L1 = -gamma * L0 + L0[1] + gamma * L1[1];

L2 = -gamma * L1 + L1[1] + gamma * L2[1];

L3 = -gamma * L2 + L2[1] + gamma * L3[1];

if L0 >= L1

then {

    CU1 = L0 - L1;

    CD1 = 0;

} else {

    CD1 = L1 - L0;

    CU1 = 0;

}

if L1 >= L2

then {

    CU2 = CU1 + L1 - L2;

    CD2 = CD1;

} else {

    CD2 = CD1 + L2 - L1;

    CU2 = CU1;

}

if L2 >= L3

then {

    CU = CU2 + L2 - L3;

    CD = CD2;

} else {

    CU = CU2;

    CD = CD2 + L3 - L2;

}


plot DSVWAP = deviationScaledVWAP;

#DSVWAP.SetDefaultColor(GetColor(1));


#DSVWAP.DefineColor("Up", GetColor(1));

#DSVWAP.DefineColor("Down", GetColor(0));

#DSVWAP.AssignValueColor(if gamma < .5 then DSVWAP.Color("Down") else DSVWAP.Color("Up"));



DSVWAP.AssignValueColor(if gamma > .618  then Color.CYAN else

if gamma < .382   then Color.MAGENTA else Color.WHite);

