input pd = 22;
input bbl = 20;
input mult = 2.0;
input lb = 50;
input ph = 0.85;
input pl = 1.01;
input hp = no;
input sd = no;

def wvf = ((Highest(close, pd) - low) / (Highest(close, pd))) * 100;

def sDev = mult * StDev(wvf, bbl);
def midLine = Average(wvf, bbl);
def lowerBand = midLine - sDev;
def upperBand = midLine + sDev;

def rangeHigh = (Highest(wvf, lb)) * ph;
def rangeLow = (Lowest(wvf, lb)) * pl;

def col = if wvf >= upperBand or wvf >= rangeHigh then Color.LIGHT_GREEN else Color.GRAY;

plot rangeHigh = if hp then rangeHigh else Double.NaN;
plot rangeLow = if hp then rangeLow else Double.NaN;
plot wvf;
plot upperBand = if sd then upperBand else Double.NaN;

AssignBackgroundColor(if wvf >= upperBand or wvf >= rangeHigh then Color.LIGHT_GREEN else if wvf <= lowerBand or wvf <= rangeLow then Color.RED else Color.GRAY);