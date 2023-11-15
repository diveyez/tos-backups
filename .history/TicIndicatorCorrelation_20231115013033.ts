declare lower;

#Symbol Input

input SYMB1 = “AAPL”;

input SYMB2 = “AMZN”;

input SYMB3 = "TSLA";

input SYMB4 = "MSFT";

input SYMB5 = "GOOGL";

def current_agg = GetAggregationPeriod();

def agg = current_agg;

def Price1 = close(symbol = SYMB1)[1];

def Price2 = close(symbol = SYMB1);

def Price3 = close(symbol = SYMB2)[1];

def Price4 = close(symbol = SYMB2);

def Price5 = close(symbol = SYMB3)[1];

def Price6 = close(symbol = SYMB3);

def Price7 = close(symbol = SYMB4)[1];

def Price8 = close(symbol = SYMB4);

def Price9 = close(symbol = SYMB5)[1];

def Price10 = close(symbol = SYMB5);

#plot PercentChg1 = ((Price2 – Price1) / Price1)*100;

#plot PercentChg2 = ((Price4 – Price3) / Price3)*100;

plot PercentChg3 = ((Price2 – Price1) + (Price4 – Price3) + (Price6 – Price5) + (Price8 – Price7) + (Price10 – Price9)) /(Price1+Price3+Price5+Price7+Price9)*100;

plot Hist = PercentChg3;

Hist.setPaintingStrategy(paintingStrategy.HISTOGRAM);

Hist.setLineWeight(5);

Hist.assignValueColor(if PercentChg3 >= 0 then color.green else color.red);

