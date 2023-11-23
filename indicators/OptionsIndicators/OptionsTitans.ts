AssignBackgroundColor(Color.BLACK);
declare lower;
plot MFI = MoneyFlowIndex();
plot OverBought = 80;
plot OverSold = 20;
MFI.DefineColor("OverBought", Color.ORANGE);
MFI.DefineColor("OverSold", Color.BLUE);
OverBought.SetDefaultColor(Color.GRAY);
OverSold.SetDefaultColor(Color.GRAY);
AssignPriceColor(if MFI >= OverBought then MFI.Color("OverBought") else if MFI <= OverSold then MFI.Color("OverSold") else Color.CURRENT);
plot Data = open;
Data.SetPaintingStrategy(PaintingStrategy.LINE_VS_SQUARES);
plot avg = ExpAverage(close, 15);
avg.SetStyle(Curve.SHORT_DASH);
plot SMA5 = Average(close, 5);
plot SMA10 = Average(close, 10);
plot SMA15 = Average(close, 15);
SMA10.Hide();
SMA15.SetHiding(GetAggregationPeriod() < AggregationPeriod.DAY);
plot UpperBand = close * 1.1;
plot LowerBand = close * 0.9;
plot Middle = close;
Middle.DefineColor("Highest", Color.RED);
Middle.DefineColor("Lowest", CreateColor(250, 150, 25));
LowerBand.SetDefaultColor(GetColor(5));
UpperBand.AssignValueColor(LowerBand.TakeValueColor());
Middle.AssignNormGradientColor(14, Middle.Color("Highest"), Middle.Color("Lowest"));
plot isAbove = Average(close, 5) crosses above Average(close, 20);
plot isBelow = Average(close, 5) crosses below Average(close, 20);
isAbove.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
isBelow.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
#declare lower;
#plot AprilIATMPutPrice = close(GetATMOption(GetUnderlyingSymbol(), input endDate = 20240316;
#def cond = GetYYYYMMDD() < endDate;, OptionClass.PUT));
#HINT: this is a custom watchlist column that can be selected as a column on a watchlist of option symbols and / or as a column on the option chain


#plot OI_NetChg = open_interest() - open_interest()[1];
#OI_NetChg.SetDefaultColor(Color.BLACK);
#AssignBackgroundColor(if OI_NetChg > 0 then Color.GREEN
#                                                                          else if OI_NetChg < 0
#                                                                                  then Color.RED
 #                                                                                else Color.GRAY);


#Or a more space efficient version:


#def openInterest = open_interest() - open_interest()[1];
#AddLabel(yes, Round(openInterest, 0), Color.BLACK);
#AssignBackgroundColor(if openInterest > 0 then Color.GREEN
#                                                                         else if openInterest < 0                             
#                                                                                 then Color.RED
#                                                                                  else Color.GRAY);


#here is another way to use one of your custom columns to create an option chain column:


#HINT: this is a custom watchlist column that can be selected as a column on a watchlist of option symbols and / or as a column on the option chain.It is blank if volume is lower than open_interest allowing it to act as an alert by only appearing when volume is higher than open_interest


#def alert = volume > open_interest;
#AddLabel(yes, if alert then "volume vs OI" else ".", Color.BLACK);
#AssignBackgroundColor(if alert == 1 then Color.RED else Color.LIGHT_GRAY);