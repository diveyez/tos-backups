# Intraday Hiding, Making Kill Zone Hitlists
declare hide_on_intraday;


input day_of_week = { default Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday };
input OpenTime = 0930;
input DurationHours = 1;
input CloseTime = 1600;
input startDate = 20100101;
input endDate = 20100101;




def isRollover = GetYYYYMMDD() != GetYYYYMMDD()[1];
def beforeStart = GetTime() < RegularTradingStart(GetYYYYMMDD());

def vol = if isRollover and beforeStart then volume else if beforeStart then vol[1] + volume else Double.NaN;

def durationSec = DurationHours * 60 * 60;
def secondsPassed = SecondsFromTime(OpenTime);
#def durationSec = DurationHours * 60 * 60;
def secondsRemained = SecondsTillTime(CloseTime);



def rth = (RegularTradingEnd(GetYYYYMMDD()) - RegularTradingStart(GetYYYYMMDD())) / AggregationPeriod.HOUR;
AddLabel(yes, "Regular Trading  (hrs): " + rth);
def cond = GetYYYYMMDD() < endDate;

plot Price = if secondsPassed >= 0 and secondsPassed <= durationSec then close else if secondsRemained >= 0 and secondsRemained <= durationSec then close else Double.NaN;


plot PreMarketVolume = vol;


AddChartBubble(GetDayOfWeek(GetYYYYMMDD()) == day_of_week + 1, high, "Here it is");


# Euronext Markets
#def EuronextOpen = 0900;
#def EuronextClose = 1705;
#
#AddLabel(EuronextOpen, "Euronext Open", Color.GREEN);
#AddLabel(EuronextClose, "Euronext Close", Color.RED);




# US Markets
def USOpen = time >= RegularTradingStart(GetYYYYMMDD(), tz);
def USClose = time >= RegularTradingEnd(GetYYYYMMDD(), tz);

# European Markets
def LSEOpen = time >= RegularTradingStart(GetYYYYMMDD(), "Europe/London");
def LSEClose = time >= RegularTradingEnd(GetYYYYMMDD(), "Europe/London");

def FWBOpen = time >= RegularTradingStart(GetYYYYMMDD(), "Europe/Paris");
def FWBClose = time >= RegularTradingEnd(GetYYYYMMDD(), "Europe/Paris");

def SIXOpen = time >= RegularTradingStart(GetYYYYMMDD(), "Europe/Zurich");
def SIXClose = time >= RegularTradingEnd(GetYYYYMMDD(), "Europe/Zurich");

def BorsaItalianaOpen = time >= RegularTradingStart(GetYYYYMMDD(), "Europe/Rome");
def BorsaItalianaClose = time >= RegularTradingEnd(GetYYYYMMDD(), "Europe/Rome");

def OMXNOpen = time >= RegularTradingStart(GetYYYYMMDD(), "Europe/Copenhagen");
def OMXNClose = time >= RegularTradingEnd(GetYYYYMMDD(), "Europe/Copenhagen");

# Asian Markets
def HKGOpen = time >= RegularTradingStart(GetYYYYMMDD(), "Asia/Hong_Kong");
def HKGClose = time >= RegularTradingEnd(GetYYYYMMDD(), "Asia/Hong_Kong");

def TYOOpen = time >= RegularTradingStart(GetYYYYMMDD(), "Asia/Tokyo");
def TYOClose = time >= RegularTradingEnd(GetYYYYMMDD(), "Asia/Tokyo");

def SHGOpen = time >= RegularTradingStart(GetYYYYMMDD(), "Asia/Shanghai");
def SHGClose = time >= RegularTradingEnd(GetYYYYMMDD(), "Asia/Shanghai");

def SIXCloseOffset = 0.0085; # Offset for drawing the SIX close line

# Add labels for market opens and closes
AddLabel(USOpen, "US Open", Color.GREEN);
AddLabel(USClose, "US Close", Color.RED);

AddLabel(LSEOpen, "LSE Open", Color.GREEN);
AddLabel(LSEClose, "LSE Close", Color.RED);

AddLabel(FWBOpen, "FWB Open", Color.GREEN);
AddLabel(FWBClose, "FWB Close", Color.RED);

AddLabel(SIXOpen, "SIX Open", Color.GREEN);
AddLabel(SIXClose, "SIX Close", Color.RED);

AddLabel(BorsaItalianaOpen, "Borsa Italiana Open", Color.GREEN);
AddLabel(BorsaItalianaClose, "Borsa Italiana Close", Color.RED);

AddLabel(OMXNOpen, "OMXN Open", Color.GREEN);
AddLabel(OMXNClose, "OMXN Close", Color.RED);

AddLabel(HKGOpen, "HKG Open", Color.GREEN);
AddLabel(HKGClose, "HKG Close", Color.RED);

AddLabel(TYOOpen, "TYO Open", Color.GREEN);
AddLabel(TYOClose, "TYO Close", Color.RED);

AddLabel(SHGOpen, "SHG Open", Color.GREEN);
AddLabel(SHGClose, "SHG Close", Color.RED);

# Draw rectangles for market opens and closes
AddChartBubble(USOpen, low, "US Market Open", Color.GREEN);
AddChartBubble(USClose, high, "US Market Close", Color.RED);
AddVerticalLine(USOpen, "US Market Open", Color.GREEN);
AddVerticalLine(USClose, "US Market Close", Color.RED);
AddRectangle(USOpen, USClose, Color.LIGHT_GRAY, Color.LIGHT_GRAY);

AddChartBubble(LSEOpen, low, "LSE Open", Color.GREEN);
AddChartBubble(LSEClose, high, "LSE Close", Color.RED);
AddVerticalLine(LSEOpen, "LSE Open", Color.GREEN);
AddVerticalLine(LSEClose, "LSE Close", Color.RED);
AddRectangle(LSEOpen, LSEClose, Color.LIGHT_GRAY, Color.LIGHT_GRAY);

AddChartBubble(FWBOpen, low, "FWB Open", Color.GREEN);
AddChartBubble(FWBClose, high, "FWB Close", Color.RED);
AddVerticalLine(FWBOpen, "FWB Open", Color.GREEN);
AddVerticalLine(FWBClose, "FWB Close", Color.RED);
AddRectangle(FWBOpen, FWBClose, Color.LIGHT_GRAY, Color.LIGHT_GRAY);