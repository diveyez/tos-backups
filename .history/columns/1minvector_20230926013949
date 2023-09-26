#---------------------------------------------------------------------------------------------
# create vector
#---------------------------------------------------------------------------------------------

##AddLabel (YES,"Dots=Ask Price, WhiteLine=Regressive Support/Resistance, YellowDot=no trade at ask price",color.WHITE);

#ddLabel(YES,"L/S",color.WHITE);

input length = 20;

def UpperBand = Highest(close, length);
#def LowerBand = Lowest(close, length);
def LowerBand = Lowest(low, length);


def LB = Highest(LowerBand, length);

# show the Ask price in the graph, .....
# goal is to put a yellow dot at ask
#def lastBar = !IsNaN(close(priceType="ASK")) && IsNaN(close[-1]);
def lastBar = !IsNaN(close(priceType="ASK")) && IsNaN(close(priceType="ASK")[-1]);

def lastAsk = close(priceType = "ASK");
plot currentAsk = if lastBar then close(priceType = "ASK") else Double.NaN;
#plot plotAsk = lastAsk;
#plotAsk.SetDefaultColor(Color.YELLOW);
#plotAsk.SetStyle(Curve.FIRM);
#plot plotcurrentAsk = lastAsk; #= currentAsk;
#plotcurrentAsk.SetDefaultColor(Color.YELLOW);
#plotcurrentAsk.SetStyle(Curve.POINTS);




def SRLine = fold i = 0 to 1950 with SR=1950
while SR > 0 do
  if GetValue(LowerBand, i, 0) < GetValue(LowerBand, i + 1, 0) then
      GetValue(LowerBand, i, 0) else GetValue(i - 1, 0);

Plot Result=LB;
Result.AssignValueColor(Color.LIGHT_GRAY);
Result.SetStyle(Curve.FIRM);
Result.SetLineWeight(2);

AssignPriceColor(If CLOSE>=LB then color.GREEN else color.RED);

# this puts the data into the watch list 
AddLabel(YES,CLOSE,If CLOSE>=LB then color.GREEN else color.RED);


#Alert(close[0]>=LB[0] and close[1]<LB[1],"price exceeded vector LONG",Alert.TICK,Sound.CHIMES);


AddChartBubble(Result,If !IsNaN(CLOSE) and IsNaN(CLOSE[-1]) then Result else double.NaN,
If CLOSE<Result then "Resistance "+ AsDollars(Result) 
else "Support "+ AsDollars(Result),color.LIGHT_GRAY,
If CLOSE<Result then YES else NO); # was [100]

plot plotcurrentAsk = lastAsk; #= currentAsk;
#plotcurrentAsk.SetDefaultColor(If close(PriceType="ASK")>=LB then color.GREEN else color.RED);
plotcurrentAsk.SetDefaultColor(Color.YELLOW);
plotcurrentAsk.AssignValueColor(If CLOSE>=LB then color.GREEN else color.RED);
plotcurrentAsk.SetStyle(Curve.POINTS);
#AssignPriceColor(If close(PriceType="ASK")>=LB then color.GREEN else color.RED);



#---------------------------------------------------------------------------------------------
# DrawLine( Price ) intra-day
#---------------------------------------------------------------------------------------------
script DrawLine {
    input Price = 0;

def DLine = if GetDay() == GetLastDay()
            then
                if SecondsFromTime(0930) == 0
                then Price 
                else if SecondsFromTime(1600) == 0
                then Price  # OPEN()
                else Double.NaN
            else Double.NaN;
Plot DrawLine = DLine;
};

#---------------------------------------------------------------------------------------------
# DrawLineWTime( Price ) intra-day
#---------------------------------------------------------------------------------------------
script DrawLineWTime {
    input Price = 0;
    input BeginTime = 0001;
    input EndTime = 2359;

def DLine = if SecondsFromTime(BeginTime) > 0
                then Price 
                else if SecondsFromTime(EndTime) < 0
                then Price  # OPEN()
                else Double.NaN;
Plot DrawLine = DLine;
};


#----------------------------------------------------------------------
# previous day's close
#----------------------------------------------------------------------
#def PreviousClose = CLOSE(period = AggregationPeriod.DAY)[1];
#Plot PreviousCloseLine = PreviousClose;
#PreviousCloseLine.AssignValueColor(Color.BLUE);
#PreviousCloseLine.SetStyle(Curve.FIRM);
#PreviousCloseLine.SetLineWeight(2);


#Plot PreviousCloseLine = DrawLineWTime(PreviousClose,0900,1615);
#PreviousCloseLine.EnableApproximation();
#PreviousCloseLine.AssignValueColor(Color.WHITE);
#PreviousCloseLine.SetStyle(Curve.FIRM);
#PreviousCloseLine.SetLineWeight(2);
