declare lower;

#Inputs

input ShowSellVolumePercent = yes;

def O = open;
def H = high;
def C = close;
def L = low;
def V = volume;
def buying = V * (C - L) / (H - L);
def selling = V * (H - C) / (H - L);

#Volume Data


def today = volume(period = "DAY");

def curVolume = volume;

def SellVolPercent = Round((Selling / Volume) * 100, 0);

# Labels

AddLabel(ShowSellVolumePercent, "Cur Bar Sell %: " + SellVolPercent, (if SellVolPercent > 51 then Color.RED else if SellVolPercent < 49 then Color.GREEN else Color.ORANGE));