# Mobius
# Mobius on My Trade
# TTM Scalper Replica or High_Low_Pivots
# V001.06.2012
# jpwel added alerts 06 / 26 / 2015

input n = 8;
input ShowLines = yes;
input SoundAlerts = yes;

def h = high;
def l = low;
def Firstbar = BarNumber();
def Highest = fold i = 1
             to n + 1
with p = 1
             while p
             do h > GetValue(h, -i);
def A = if (Firstbar > n
            and h == Highest(h, n)
            and Highest)
            then h
            else Double.NaN;
def Lowest = fold j = 1
            to n + 1
with q = 1
            while q
            do l < GetValue(l, -j);
def B = if (Firstbar > n
            and l == Lowest(l, n)
            and Lowest)
            then l
            else Double.NaN;
rec Al = if !IsNaN(A)
             then A
             else Al[1];
rec Bl = if !IsNaN(B)
             then B
             else Bl[1];

plot ph = Round(A, 2);
ph.SetPaintingStrategy(PaintingStrategy.VALUES_ABOVE);

plot hL = if Al > 0
                       then Al
                       else Double.NaN;
hL.SetHiding(!ShowLines);
hL.SetPaintingStrategy(PaintingStrategy.DASHES);
hL.SetDefaultColor(Color.GREEN);

plot pl = Round(B, 2);
pl.SetPaintingStrategy(PaintingStrategy.VALUES_BELOW);

plot ll = if Bl > 0
                      then Bl
                      else Double.NaN;
ll.SetHiding(!ShowLines);
ll.SetPaintingStrategy(PaintingStrategy.DASHES);
ll.SetDefaultColor(Color.RED);