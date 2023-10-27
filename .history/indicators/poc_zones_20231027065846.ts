

# Modified @rlohmeyer
# TD Ameritrade IP Company, Inc. (c) 2010 - 2020
input ProfileTime = { default BAR, DAY };
input multiplier = 5;
input profiles = 78;
input showPOC = yes;
input valueAreaPercent = 70;
input opacity = 20;

def na = Double.NaN;
def period;
def yyyymmdd = GetYYYYMMDD();
switch (ProfileTime) {
    case BAR:
        period = BarNumber() - 1;
    case DAY:
        period = CountTradingDays(Min(First(yyyymmdd), yyyymmdd), yyyymmdd) - 1;
}


def count = CompoundValue(1, if period != period[1] then(count[1] + period - period[1]) % multiplier else count[1], 0);
def cond = count < count[1] + period - period[1];
def height = PricePerRow.TICKSIZE;


profile vol = VolumeProfile("startNewProfile" = cond, "onExpansion" = no, "numberOfProfiles" = profiles, "pricePerRow" = height, "value area percent" = valueAreaPercent);
def con = CompoundValue(1, no, no);
def pc = if IsNaN(vol.GetPointOfControl()) and con then pc[1] else vol.GetPointOfControl();
def hVA = if IsNaN(vol.GetHighestValueArea()) and con then hVA[1] else vol.GetHighestValueArea();
def lVA = if IsNaN(vol.GetLowestValueArea()) and con then lVA[1] else vol.GetLowestValueArea();

def plotsDomain = IsNaN(close) == no;
plot POC = if plotsDomain then pc else Double.NaN;
plot VAHigh = if plotsDomain then hVA else Double.NaN;
plot VALow = if plotsDomain then lVA else Double.NaN;
DefineGlobalColor("PC", Color.CYAN);
POC.SetDefaultColor(GlobalColor("PC"));
POC.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
VAHigh.SetDefaultColor(GlobalColor("PC"));
VAHigh.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
VALow.SetDefaultColor(GlobalColor("PC"));
VALow.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
declare hide_on_daily;
AddCloud(VAHigh, VALow, Color.CYAN, Color.CYAN, no);

