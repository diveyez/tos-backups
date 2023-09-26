#Defining variables

def Delta = Delta();

def Ivol = imp_volatility(GetUnderlyingSymbol());

def OptionMarkPrice = close;

def UnderlyingPrice = close(getUnderlyingSymbol());

def UnderlyingVolume = volume(getUnderlyingSymbol());

#V.A.L.R - Volitility Adjusted Leverage Ratio

def Leverage = (Delta * UnderlyingPrice);

def LeverageRatio = Leverage / OptionMarkPrice;

def VALR = LeverageRatio * Ivol;

#Volume to open interest ratio(if statement pervents divide by zero errors)

def OpenInterest = if open_interest(period = AggregationPeriod.DAY) == 0 then 1 else open_interest(period = AggregationPeriod.DAY);

def volOI = volume / OpenInterest;

#Option dollar volume traded

def DvolumeOpt = volume * ohlc4 * 100;

#Underlying dollar volume traded

def DvolumeUnd = UnderlyingPrice * UnderlyingVolume;

def DvolumeRatio = DvolumeOpt / DvolumeUnd;

#Multiply by 1000 so output better displays in the columns

def WhaleScore = round(VALR * volOI * DvolumeRatio * 1000, 0);

plot WhalePlot = WhaleScore;
addlabel(yes, whalescore, if (WHALESCORE >= 2100) then Color.black
else if WHALESCORE >= 1000 and WHALESCORE < 2100 then Color.white
else if WHALESCORE < 1000 and  WHALESCORE >= 100 then Color.white
else if WHALESCORE < 100 and  WHALESCORE >= 0 then Color.white
else if WHALESCORE < 0 and  WHALESCORE >= -100 then Color.white
else if WHALESCORE < -100 and  WHALESCORE >= -1000 then Color.white
else if WHALESCORE < -2100 then Color.black
else Color.dark_GRAY);

AssignBackgroundColor(
if (WHALESCORE >= 2100) then Color.cyan
else if WHALESCORE >= 1000 and WHALESCORE < 2100 then Color.dark_green
else if WHALESCORE < 1000 and  WHALESCORE >= 100 then Color.gray
else if WHALESCORE < 100 and  WHALESCORE >= 0 then Color.gray
else if WHALESCORE < 0 and  WHALESCORE >= -100 then Color.gray
else if WHALESCORE < -100 and  WHALESCORE >= -1000 then Color.dark_green
else if WHALESCORE < -2100 then Color.cyan
else Color.dark_GRAY);