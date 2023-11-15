def price = close;
def superfast_length = 9;
def fast_length = 14;
def slow_length = 21;
def displace = 0;

def mov_avg9 = ExpAverage(price[-displace], superfast_length);
def mov_avg14 = ExpAverage(price[-displace], fast_length);
def mov_avg21 = ExpAverage(price[-displace], slow_length);

#moving averages
def Superfast = mov_avg9;
def Fast = mov_avg14;
def Slow = mov_avg21;

def buy = mov_avg9 > mov_avg14 and mov_avg14 > mov_avg21 and low > mov_avg9;
def stopbuy = mov_avg9 <= mov_avg14;
def buynow = !buy[1] and buy;
def buysignal = CompoundValue(1, if buynow and!stopbuy then 1 else if buysignal[1] == 1 and stopbuy then 0 else buysignal[1], 0);

def Buy_Signal = buysignal[1] == 0 and buysignal == 1;

#Alert(condition = buysignal[1] == 0 and buysignal == 1, text = "Buy Signal", sound = Sound.Bell, "alert type" = Alert.BAR);

plot Colorbars = buysignal == 1;