# Option Volume / Open Interest Indicator
# NPTrading: modified script provided by DeusMecanicus in Post #21
# NPTrading: AsPrice function used to support stock price in 4 digits
# NPTrading: optionSeriesPrefix is the option expiry date in format YYMMDD.This Expiry date can be determined automatically(for monthly and weekly options both ) but as of now it is manual modification.
# NPTrading: Strike price determined based on current close price but could be previous day close
# NPTrading: Script is work in progress, shared as requested for other to use and modify as per their need
# NPTrading: please read comments in the script

declare lower;
input optionSeriesPrefix = "230512"; #NPTrading : manually update option expiry date in format YYMMDD
input strikeSpacing = { ".5", default "1", "2.5", "5", "10", "25" }; #default 10 for large price stock


#NPTrading : Strike price determined based on current close price but could be previous day close
def PutStrike = Floor(close / 10) * 10;
def CallStrike = Floor(close / 10) * 10;


AddLabel(1, GetSymbol() + " Exp:" + optionSeriesPrefix + " CStrike:" + CallStrike + " PStrike:" + PutStrike, Color.WHITE);


input ShowAllLabels = no;
input Showput = no;
input Showput1 = no;
input Showput2 = no;
input Showput3 = no;
input Showput4 = no;
input Showput5 = no;
input Showput6 = no;
input Showput7 = no;
input Showput8 = no;
input Showput9 = no;
input Showput10 = no;
input Showput11 = no;
input Showput12 = no;
input Showput13 = no;
input Showput14 = no;
input Showput15 = no;
input Showput16 = no;
input Showput17 = no;
input Showput18 = no;
input Showput19 = no;
input Showput20 = no;

input  Showcall = no;
input  Showcall1 = no;
input  Showcall2 = no;
input  Showcall3 = no;
input  Showcall4 = no;
input  Showcall5 = no;
input  Showcall6 = no;
input  Showcall7 = no;
input  Showcall8 = no;
input  Showcall9 = no;
input  Showcall10 = no;
input  Showcall11 = no;
input  Showcall12 = no;
input  Showcall13 = no;
input  Showcall14 = no;
input  Showcall15 = no;
input  Showcall16 = no;
input  Showcall17 = no;
input  Showcall18 = no;
input  Showcall19 = no;
input  Showcall20 = no;




### Put Option Volume
def putOptionVolume = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 0))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 0));
def putOptionVolume1 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 1))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 1));
def putOptionVolume2 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 2))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 2));
def putOptionVolume3 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 3))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 3));
def putOptionVolume4 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 4))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 4));
def putOptionVolume5 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 5))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 5));
def putOptionVolume6 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 6))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 6));
def putOptionVolume7 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 7))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 7));
def putOptionVolume8 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 8))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 8));
def putOptionVolume9 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 9))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 9));
def putOptionVolume10 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 10))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 10));
def putOptionVolume11 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 11))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 11));
def putOptionVolume13 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 12))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 12));
def putOptionVolume12 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 13))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 13));
def putOptionVolume14 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 14))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 14));
def putOptionVolume15 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 15))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 15));
def putOptionVolume16 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 16))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 16));
def putOptionVolume17 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 17))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 17));
def putOptionVolume18 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 18))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 18));
def putOptionVolume19 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 19))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 19));
def putOptionVolume20 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 20))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 20));

###Call Option Volume
def callOptionVolume = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 0))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 0));
def callOptionVolume1 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 1))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 1));
def callOptionVolume2 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 2))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 2));
def callOptionVolume3 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 3))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 3));
def callOptionVolume4 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 4))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 4));
def callOptionVolume5 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 5))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 5));
def callOptionVolume6 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 6))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 6));
def callOptionVolume7 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 7))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 7));
def callOptionVolume8 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 8))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 8));
def callOptionVolume9 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 9))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 9));
def callOptionVolume10 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 10))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 10));
def callOptionVolume11 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 11))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 11));
def callOptionVolume12 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 12))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 12));
def callOptionVolume13 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 13))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 13));
def callOptionVolume14 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 14))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 14));
def callOptionVolume15 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 15))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 15));
def callOptionVolume16 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 16))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 16));
def callOptionVolume17 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 17))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 17));
def callOptionVolume18 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 18))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 18));
def callOptionVolume19 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 19))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 19));
def callOptionVolume20 = if IsNaN(volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 20))) then 0 else volume("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 20));


### Put Option ohlc4
def putOptionohlc4 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 0))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 0));
def putOptionohlc41 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 1))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 1));
def putOptionohlc42 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 2))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 2));
def putOptionohlc43 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 3))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 3));
def putOptionohlc44 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 4))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 4));
def putOptionohlc45 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 5))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 5));
def putOptionohlc46 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 6))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 6));
def putOptionohlc47 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 7))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 7));
def putOptionohlc48 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 8))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 8));
def putOptionohlc49 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 9))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 9));
def putOptionohlc410 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 10))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 10));
def putOptionohlc411 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 11))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 11));
def putOptionohlc412 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 12))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 12));
def putOptionohlc413 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 13))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 13));
def putOptionohlc414 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 14))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 14));
def putOptionohlc415 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 15))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 15));
def putOptionohlc416 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 16))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 16));
def putOptionohlc417 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 17))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 17));
def putOptionohlc418 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 18))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 18));
def putOptionohlc419 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 19))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 19));
def putOptionohlc420 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 20))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 20));


####Call Option ohlc4
def callOptionohlc4 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 0))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 0));
def callOptionohlc41 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 1))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 1));
def callOptionohlc42 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 2))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 2));
def callOptionohlc43 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 3))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 3));
def callOptionohlc44 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 4))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 4));
def callOptionohlc45 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 5))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 5));
def callOptionohlc46 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 6))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 6));
def callOptionohlc47 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 7))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 7));
def callOptionohlc48 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 8))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 8));
def callOptionohlc49 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 9))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 9));
def callOptionohlc410 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 10))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 10));
def callOptionohlc411 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 11))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 11));
def callOptionohlc412 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 12))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 12));
def callOptionohlc413 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 13))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 13));
def callOptionohlc414 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 14))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 14));
def callOptionohlc415 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 15))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 15));
def callOptionohlc416 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 16))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 16));
def callOptionohlc417 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 17))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 17));
def callOptionohlc418 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 18))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 18));
def callOptionohlc419 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 19))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 19));
def callOptionohlc420 = if IsNaN(ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 20))) then 0 else ohlc4("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 20));


### Put Option tick_count
def putOptiontick_count = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 0))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 0));
def putOptiontick_count1 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 1))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 1));
def putOptiontick_count2 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 2))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 2));
def putOptiontick_count3 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 3))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 3));
def putOptiontick_count4 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 4))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 4));
def putOptiontick_count5 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 5))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 5));
def putOptiontick_count6 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 6))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 6));
def putOptiontick_count7 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 7))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 7));
def putOptiontick_count8 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 8))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 8));
def putOptiontick_count9 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 9))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 9));
def putOptiontick_count10 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 10))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 10));
def putOptiontick_count11 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 11))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 11));
def putOptiontick_count13 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 12))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 12));
def putOptiontick_count12 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 13))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 13));
def putOptiontick_count14 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 14))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 14));
def putOptiontick_count15 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 15))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 15));
def putOptiontick_count16 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 16))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 16));
def putOptiontick_count17 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 17))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 17));
def putOptiontick_count18 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 18))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 18));
def putOptiontick_count19 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 19))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 19));
def putOptiontick_count20 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 20))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "P" + AsPrice(PutStrike - strikeSpacing * 20));

####Call Option tick_count
def callOptiontick_count = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 0))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 0));
def callOptiontick_count1 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 1))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 1));
def callOptiontick_count2 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 2))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 2));
def callOptiontick_count3 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 3))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 3));
def callOptiontick_count4 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 4))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 4));
def callOptiontick_count5 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 5))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 5));
def callOptiontick_count6 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 6))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 6));
def callOptiontick_count7 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 7))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 7));
def callOptiontick_count8 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 8))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 8));
def callOptiontick_count9 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 9))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 9));
def callOptiontick_count10 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 10))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 10));
def callOptiontick_count11 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 11))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 11));
def callOptiontick_count12 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 12))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 12));
def callOptiontick_count13 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 13))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 13));
def callOptiontick_count14 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 14))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 14));
def callOptiontick_count15 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 15))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 15));
def callOptiontick_count16 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 16))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 16));
def callOptiontick_count17 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 17))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 17));
def callOptiontick_count18 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 18))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 18));
def callOptiontick_count19 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 19))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 19));
def callOptiontick_count20 = if IsNaN(tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 20))) then 0 else tick_count("." + GetSymbol() + optionSeriesPrefix + "C" + AsPrice(CallStrike + strikeSpacing * 20));

####Show Individual Put Volume Labels
AddLabel(Showput    or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 0) + ":  " + putOptionVolume);
AddLabel(Showput1   or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 1) + ":  " + putOptionVolume1);
AddLabel(Showput2   or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 2) + ":  " + putOptionVolume2);
AddLabel(Showput3   or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 3) + ":  " + putOptionVolume3);
AddLabel(Showput4   or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 4) + ":  " + putOptionVolume4);
AddLabel(Showput5   or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 5) + ":  " + putOptionVolume5);
AddLabel(Showput6   or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 6) + ":  " + putOptionVolume6);
AddLabel(Showput7   or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 7) + ":  " + putOptionVolume7);
AddLabel(Showput8   or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 8) + ":  " + putOptionVolume8);
AddLabel(Showput9   or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 9) + ":  " + putOptionVolume9);
AddLabel(Showput10  or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 10) + ":  " + putOptionVolume10);
AddLabel(Showput11  or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 11) + ":  " + putOptionVolume11);
AddLabel(Showput12  or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 12) + ":  " + putOptionVolume12);
AddLabel(Showput13  or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 13) + ":  " + putOptionVolume13);
AddLabel(Showput14  or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 14) + ":  " + putOptionVolume14);
AddLabel(Showput15  or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 15) + ":  " + putOptionVolume15);
AddLabel(Showput16  or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 16) + ":  " + putOptionVolume16);
AddLabel(Showput17  or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 17) + ":  " + putOptionVolume17);
AddLabel(Showput18  or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 18) + ":  " + putOptionVolume18);
AddLabel(Showput19  or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 19) + ":  " + putOptionVolume19);
AddLabel(Showput20  or ShowAllLabels, "P" + AsPrice(PutStrike - strikeSpacing * 20) + ":  " + putOptionVolume20);


#Show Individual Call Volume Labels
AddLabel(Showcall   or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 0) + ":  " + callOptionVolume, Color.CYAN);
AddLabel(Showcall1  or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 1) + ":  " + callOptionVolume1, Color.CYAN);
AddLabel(Showcall2  or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 2) + ":  " + callOptionVolume2, Color.CYAN);
AddLabel(Showcall3  or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 3) + ":  " + callOptionVolume3, Color.CYAN);
AddLabel(Showcall4  or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 4) + ":  " + callOptionVolume4, Color.CYAN);
AddLabel(Showcall5  or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 5) + ":  " + callOptionVolume5, Color.CYAN);
AddLabel(Showcall6  or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 6) + ":  " + callOptionVolume6, Color.CYAN);
AddLabel(Showcall7  or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 7) + ":  " + callOptionVolume7, Color.CYAN);
AddLabel(Showcall8  or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 8) + ":  " + callOptionVolume8, Color.CYAN);
AddLabel(Showcall9  or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 9) + ":  " + callOptionVolume9, Color.CYAN);
AddLabel(Showcall10 or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 10) + ":  " + callOptionVolume10, Color.CYAN);
AddLabel(Showcall11 or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 11) + ":  " + callOptionVolume11, Color.CYAN);
AddLabel(Showcall12 or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 12) + ":  " + callOptionVolume12, Color.CYAN);
AddLabel(Showcall13 or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 13) + ":  " + callOptionVolume13, Color.CYAN);
AddLabel(Showcall14 or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 14) + ":  " + callOptionVolume14, Color.CYAN);
AddLabel(Showcall15 or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 15) + ":  " + callOptionVolume15, Color.CYAN);
AddLabel(Showcall16 or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 16) + ":  " + callOptionVolume16, Color.CYAN);
AddLabel(Showcall17 or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 17) + ":  " + callOptionVolume17, Color.CYAN);
AddLabel(Showcall18 or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 18) + ":  " + callOptionVolume18, Color.CYAN);
AddLabel(Showcall19 or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 19) + ":  " + callOptionVolume19, Color.CYAN);
AddLabel(Showcall20 or ShowAllLabels, "C" + AsPrice(CallStrike + strikeSpacing * 20) + ":  " + callOptionVolume20, Color.CYAN);


plot Callvol = ((callOptionVolume * callOptionohlc4 * 100) + (callOptionVolume1 * callOptionohlc41 * 100) + (callOptionVolume2 * callOptionohlc42 * 100) + (callOptionVolume3 * callOptionohlc43 * 100) + (callOptionVolume4 * callOptionohlc44 * 100) + (callOptionVolume5 * callOptionohlc45 * 100) + (callOptionVolume6 * callOptionohlc46 * 100) + (callOptionVolume7 * callOptionohlc47 * 100) + (callOptionVolume8 * callOptionohlc48 * 100) + (callOptionVolume9 * callOptionohlc49 * 100) + (callOptionVolume10 * callOptionohlc410 * 100) + (callOptionVolume11 * callOptionohlc411 * 100) + (callOptionVolume12 * callOptionohlc412 * 100) + (callOptionVolume13 * callOptionohlc413 * 100) + (callOptionVolume14 * callOptionohlc414 * 100) + (callOptionVolume15 * callOptionohlc415 * 100) + (callOptionVolume16 * callOptionohlc416 * 100) + (callOptionVolume17 * callOptionohlc417 * 100) + (callOptionVolume18 * callOptionohlc418 * 100) + (callOptionVolume19 * callOptionohlc419 * 100) + (callOptionVolume20 * callOptionohlc420 * 100)) / 1000;
plot Putvol = ((putOptionVolume * putOptionohlc4 * 100) + (putOptionVolume1 * putOptionohlc41 * 100) + (putOptionVolume2 * putOptionohlc42 * 100) + (putOptionVolume3 * putOptionohlc43 * 100) + (putOptionVolume4 * putOptionohlc44 * 100) + (putOptionVolume5 * putOptionohlc45 * 100) + (putOptionVolume6 * putOptionohlc46 * 100) + (putOptionVolume7 * putOptionohlc47 * 100) + (putOptionVolume8 * putOptionohlc48 * 100) + (putOptionVolume9 * putOptionohlc49 * 100) + (putOptionVolume10 * putOptionohlc410 * 100) + (putOptionVolume11 * putOptionohlc411 * 100) + (putOptionVolume12 * putOptionohlc412 * 100) + (putOptionVolume13 * putOptionohlc413 * 100) + (putOptionVolume14 * putOptionohlc414 * 100) + (putOptionVolume15 * putOptionohlc415 * 100) + (putOptionVolume16 * putOptionohlc416 * 100) + (putOptionVolume17 * putOptionohlc417 * 100) + (putOptionVolume18 * putOptionohlc418 * 100) + (putOptionVolume19 * putOptionohlc419 * 100) + (putOptionVolume20 * putOptionohlc420 * 100)) / 1000;

#NPTrading : Rounding to whole number
AddLabel(yes, "Callvol :" + AsPrice(Round(Callvol * 1000, 0)), Color.CYAN);
AddLabel(yes, "PutVol: " + AsPrice(Round(Putvol * 1000, 0)), Color.LIGHT_RED);


plot Calltick = callOptiontick_count + callOptiontick_count1 + callOptiontick_count2 + callOptiontick_count3 + callOptiontick_count4 + callOptiontick_count5 + callOptiontick_count6 + callOptiontick_count7 + callOptiontick_count8 + callOptiontick_count9 + callOptiontick_count10 + callOptiontick_count11 + callOptiontick_count12 + callOptiontick_count13 + callOptiontick_count14 + callOptiontick_count15 + callOptiontick_count16 + callOptiontick_count17 + callOptiontick_count18 + callOptiontick_count19 + callOptiontick_count20;
plot Puttick = putOptiontick_count + putOptiontick_count1 + putOptiontick_count2 + putOptiontick_count3 + putOptiontick_count4 + putOptiontick_count5 + putOptiontick_count6 + putOptiontick_count7 + putOptiontick_count8 + putOptiontick_count9 + putOptiontick_count10 + putOptiontick_count11 + putOptiontick_count12 + putOptiontick_count13 + putOptiontick_count14 + putOptiontick_count15 + putOptiontick_count16 + putOptiontick_count17 + putOptiontick_count18 + putOptiontick_count19 + putOptiontick_count20;

AddLabel(yes, "CallTick :" + Calltick, Color.PLUM);
AddLabel(yes, "PutTick: " + Puttick, Color.YELLOW);


Putvol.SetPaintingStrategy(PaintingStrategy.LINE);
Callvol.SetPaintingStrategy(PaintingStrategy.LINE);
Putvol.SetDefaultColor(Color.LIGHT_RED);
Callvol.SetDefaultColor(Color.CYAN);

#Diff Cloud ?
    AddCloud(Callvol, Putvol, Color.CYAN, Color.LIGHT_RED);

plot ZeroLine = 0;
ZeroLine.SetDefaultColor(Color.GRAY);

# individual Cloud ?
    AddCloud(Callvol, ZeroLine, Color.CYAN, Color.LIGHT_RED);
AddCloud(Putvol, ZeroLine, Color.LIGHT_RED, Color.CYAN);

#NPTrading : Using PaintingStrategy.LINE_VS_SQUARES for visiblitity
Puttick.SetPaintingStrategy(PaintingStrategy.LINE_VS_SQUARES);
    Calltick.SetPaintingStrategy(PaintingStrategy.LINE_VS_SQUARES);
Puttick.SetDefaultColor(Color.YELLOW);
Calltick.SetDefaultColor(Color.PLUM);

#NPTrading :  ??
    #AddCloud(Calltick, Puttick, Color.plum, Color.light_RED);

#NPTrading :  ??
    #AddCloud(Calltick, ZeroLine, Color.CYAN, Color.RED);
#AddCloud(Puttick, ZeroLine, Color.RED, Color.CYAN);

###################################
#StudyName: Dilbert_BlockTrade_V1
#Description:  Identify bars with high volume relative to the tick_count.Such bars could indicate a block trade, or a possible change in trend.
    #Author: Dilbert
#Requested By:
# Ver     Date     Auth      Change
# V1      090717   Dilbert   1st code cut
# TOS.mx Link:
# Trading Notes:  Identify bars with high volume relative to the tick_count.Such bars could indicate a block trade, or a possible change in trend.

#PUT RATIO
input AvgType = AverageType.EXPONENTIAL;
input MaLength = 20;
def V = Putvol;
def TC = Puttick;
def TradeSize = V / TC;

input displace = 0;
input SdLength = 20;
input Num_Dev_up = 2.0;
input averageType = AverageType.SIMPLE;

def sDev = StDev(data = TradeSize[-displace], length = SdLength);

def MA = MovingAverage(AvgType, TradeSize, MaLength);
plot Dot = if TradeSize > Ma + (sDev * Num_Dev_up) then Putvol else Double.NaN;
Dot.SetPaintingStrategy(PaintingStrategy.Points);
Dot.SetLineWeight(5);
Dot.AssignValueColor(color.red);

#CALL RATIO
input AvgType1 = AverageType.EXPONENTIAL;
input MaLength1 = 20;
def V1 = Callvol;
def TC1 = Calltick;
def TradeSize1 = V1 / TC1;

input displace1 = 0;
input SdLength1 = 20;
input Num_Dev_up1 = 2.0;
input averageType1 = AverageType.SIMPLE;

def sDev1 = StDev(data = TradeSize1[-displace1], length = SdLength1);

def MA1 = MovingAverage(AvgType1, TradeSize1, MaLength1);
plot Dot1 = if TradeSize1 > Ma1 + (sDev1 * Num_Dev_up1) then Callvol else Double.NaN;
Dot1.AssignValueColor(color.cyan);
Dot1.SetPaintingStrategy(PaintingStrategy.Points);
Dot1.SetLineWeight(5);