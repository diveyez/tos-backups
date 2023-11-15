# Tops \ Bottoms
# Mobius modified
# Modified C.Ricks 12 / 22 / 22

input Percent_A_to_C = .1;
input nP = 13;


def AC = Percent_A_to_C / 100;
def h = high;
def l = low;
def bar = BarNumber();
def Ps = 1 + AC;
def Ns = 1 - AC;

def hh = fold j = 1 to nP + 1
with q = 1
while q
do h > GetValue(h, -j);

def PivotH = if (bar > nP and
h == Highest(h, nP) and
hh)
then h
else Double.NaN;

def PH1 = if !isNaN(PivotH)
then h
else PH1[1];

def PH2 = if PH1 != PH1[1]
then PH1[1]
else PH2[1];

def CheckH1 = if between(PH2, PH1 * Ns, PH1 * Ps)
then 1
else 0;

plot PivotHDot = PivotH;
PivotHDot.SetDefaultColor(Color.WHITE);
PivotHDot.SetPaintingStrategy(PaintingStrategy.POINTS);