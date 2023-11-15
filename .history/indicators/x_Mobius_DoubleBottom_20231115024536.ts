# Double Bottom

def ll = fold jl = 1 to nP + 1
with ql = 1
while ql
do l < GetValue(low, -jl);

def PivotL = if (bar > nP and
l == Lowest(l, nP) and
ll)
then l
else Double.NaN;

def PL1 = if !IsNaN(PivotL)
then l
else PL1[1];

def PL2 = if PL1 != PL1[1]
then PL1[1]
else PL2[1];

def Check1 = if Between(PL2, PL1 * Ns, PL1 * Ps)
then 1
else 0;


plot PivotLDot = PivotL;
PivotLDot.SetDefaultColor(Color.WHITE);
PivotLDot.SetPaintingStrategy(PaintingStrategy.POINTS);

# End Code