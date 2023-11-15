# Options Volume Vertical Plotting

declare upper;
declare once_per_bar;
input OptionSeries_YYMMDD = "230429";
input strikeSpacing = 2.5;
input roundup = no;
input openintline = 100;
input shift_line_right = 10;# negative numbers plot in candle area, positive in expansion 
input division = 1000; # divides the open interest by this number.Gives user option to reduce size of bar plots.
input space = .05; # the vertical space between the put open interest bar and call open interest bar.

    DefineGlobalColor("CallColor", Color.GREEN);
DefineGlobalColor("PutColor", Color.RED);
AddLabel(yes, OptionSeries_YYMMDD + "C", GlobalColor("CallColor"));
AddLabel(yes, OptionSeries_YYMMDD + "P", GlobalColor("PutColor")); a
def agg = AggregationPeriod.DAY;
def openlevel = close(period = agg);
def floor_or_ceiling = if roundup then Ceil(openlevel / 10) * 10 else Floor(openlevel / 10) * 10;
def PutStrike = floor_or_ceiling;
def CallStrike = floor_or_ceiling;







### Put Option Volume
def putOptionVolume = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 0), period = agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 0), period = agg);
def putOptionVolume1 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 1), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 1), agg);
def putOptionVolume2 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 2), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 2), agg);
def putOptionVolume3 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 3), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 3), agg);
def putOptionVolume4 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 4), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 4), agg);
def putOptionVolume5 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 5), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 5), agg);
def putOptionVolume6 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 6), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 6), agg);
def putOptionVolume7 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 7), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 7), agg);
def putOptionVolume8 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 8), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 8), agg);
def putOptionVolume9 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 9), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 9), agg);
def putOptionVolume10 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 10), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 10), agg);
def putOptionVolume11 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 11), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 11), agg);
def putOptionVolume13 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 12), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 12), agg);
def putOptionVolume12 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 13), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 13), agg);
def putOptionVolume14 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 14), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 14), agg);
def putOptionVolume15 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 15), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 15), agg);
def putOptionVolume16 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 16), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 16), agg);
def putOptionVolume17 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 17), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 17), agg);
def putOptionVolume18 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 18), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 18), agg);
def putOptionVolume19 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 19), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 19), agg);
def putOptionVolume20 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 20), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike - strikeSpacing * 20), agg);

def putOptionVolumea = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 0), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 0), agg);
def putOptionVolume1a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 1), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 1), agg);
def putOptionVolume2a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 2), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 2), agg);
def putOptionVolume3a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 3), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 3), agg);
def putOptionVolume4a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 4), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 4), agg);
def putOptionVolume5a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 5), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 5), agg);
def putOptionVolume6a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 6), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 6), agg);
def putOptionVolume7a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 7), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 7), agg);
def putOptionVolume8a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 8), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 8), agg);
def putOptionVolume9a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 9), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 9), agg);
def putOptionVolume10a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 10), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 10), agg);
def putOptionVolume11a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 11), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 11), agg);
def putOptionVolume13a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 12), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 12), agg);
def putOptionVolume12a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 13), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 13), agg);
def putOptionVolume14a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 14), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 14), agg);
def putOptionVolume15a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 15), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 15), agg);
def putOptionVolume16a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 16), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 16), agg);
def putOptionVolume17a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 17), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 17), agg);
def putOptionVolume18a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 18), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 18), agg);
def putOptionVolume19a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 19), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 19), agg);
def putOptionVolume20a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 20), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "P" + AsPrice(PutStrike + strikeSpacing * 20), agg);


# Calculate total Put volume and display as label
def totalPutsVol = Sum(putOptionVolume + putOptionVolume1 + putOptionVolume2 + putOptionVolume3 + putOptionVolume4 + putOptionVolume5 + putOptionVolume6 + putOptionVolume7 + putOptionVolume8 + putOptionVolume9 + putOptionVolume10 + putOptionVolume11 + putOptionVolume12 + putOptionVolume13 + putOptionVolume14 + putOptionVolume15 + putOptionVolume16 + putOptionVolume17 + putOptionVolume18 + putOptionVolume19 + putOptionVolume20 + putOptionVolumea + putOptionVolume1a + putOptionVolume2a + putOptionVolume3a + putOptionVolume4a + putOptionVolume5a + putOptionVolume6a + putOptionVolume7a + putOptionVolume8a + putOptionVolume9a + putOptionVolume10a + putOptionVolume11a + putOptionVolume12a + putOptionVolume13a + putOptionVolume14a + putOptionVolume15a + putOptionVolume16a + putOptionVolume17a + putOptionVolume18a + putOptionVolume19a + putOptionVolume20a);
AddLabel(yes, "Total Puts Volume: " + totalPutsVol, Color.RED);


###Call Option Volume
def callOptionVolume = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 0), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 0), agg);

def callOptionVolume1 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 1), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 1), agg);
def callOptionVolume2 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 2), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 2), agg);
def callOptionVolume3 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 3), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 3), agg);
def callOptionVolume4 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 4), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 4), agg);
def callOptionVolume5 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 5), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 5), agg);
def callOptionVolume6 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 6), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 6), agg);
def callOptionVolume7 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 7), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 7), agg);
def callOptionVolume8 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 8), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 8), agg);
def callOptionVolume9 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 9), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 9), agg);
def callOptionVolume10 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 10), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 10), agg);
def callOptionVolume11 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 11), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 11), agg);
def callOptionVolume12 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 12), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 12), agg);
def callOptionVolume13 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 13), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 13), agg);
def callOptionVolume14 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 14), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 14), agg);
def callOptionVolume15 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 15), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 15), agg);
def callOptionVolume16 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 16), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 16), agg);
def callOptionVolume17 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 17), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 17), agg);
def callOptionVolume18 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 18), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 18), agg);
def callOptionVolume19 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 19), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 19), agg);
def callOptionVolume20 = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 20), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike + strikeSpacing * 20), agg);

def callOptionVolumea = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 0), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 0), agg);
def callOptionVolume1a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 1), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 1), agg);
def callOptionVolume2a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 2), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 2), agg);
def callOptionVolume3a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 3), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 3), agg);
def callOptionVolume4a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 4), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 4), agg);
def callOptionVolume5a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 5), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 5), agg);
def callOptionVolume6a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 6), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 6), agg);
def callOptionVolume7a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 7), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 7), agg);
def callOptionVolume8a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 8), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 8), agg);
def callOptionVolume9a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 9), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 9), agg);
def callOptionVolume10a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 10), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 10), agg);
def callOptionVolume11a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 11), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 11), agg);
def callOptionVolume13a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 12), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 12), agg);
def callOptionVolume12a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 13), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 13), agg);
def callOptionVolume14a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 14), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 14), agg);
def callOptionVolume15a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 15), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 15), agg);
def callOptionVolume16a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 16), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 16), agg);
def callOptionVolume17a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 17), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 17), agg);
def callOptionVolume18a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 18), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 18), agg);
def callOptionVolume19a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 19), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 19), agg);
def callOptionVolume20a = if IsNaN(volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 20), agg)) then 0 else volume("." + GetSymbol() + OptionSeries_YYMMDD + "C" + AsPrice(CallStrike - strikeSpacing * 20), agg);



# Calculate total call volume and display as label
def totalCallVol = Sum(CallOptionVolume + CallOptionVolume1 + CallOptionVolume2 + CallOptionVolume3 + CallOptionVolume4 + CallOptionVolume5 + CallOptionVolume6 + CallOptionVolume7 + CallOptionVolume8 + CallOptionVolume9 + CallOptionVolume10 + CallOptionVolume11 + CallOptionVolume12 + CallOptionVolume13 + CallOptionVolume14 + CallOptionVolume15 + CallOptionVolume16 + CallOptionVolume17 + CallOptionVolume18 + CallOptionVolume19 + CallOptionVolume20 + CallOptionVolumea + CallOptionVolume1a + CallOptionVolume2a + CallOptionVolume3a + CallOptionVolume4a + CallOptionVolume5a + CallOptionVolume6a + CallOptionVolume7a + CallOptionVolume8a + CallOptionVolume9a + CallOptionVolume10a + CallOptionVolume11a + CallOptionVolume12a + CallOptionVolume13a + CallOptionVolume14a + CallOptionVolume15a + CallOptionVolume16a + CallOptionVolume17a + CallOptionVolume18a + CallOptionVolume19a + CallOptionVolume20a);
AddLabel(yes, "Total Call Volume: " + totalCallVol, Color.GREEN);



#####################################

def lastbar = if IsNaN(close[-1]) and!IsNaN(close)  
              then BarNumber()  
              else lastbar[1];

AddVerticalLine(BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right), "Live  volume", color.white, Curve.LONG_DASH);



def atmcallstrike = CallStrike;
plot atmcall = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume / division, 0)) then atmcallstrike else Double.NaN;

input display_bubbles = { default "Hide", "Display" };  #


AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume / division, 0)) then yes else no, atmcallstrike, callOptionvolume, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume / division, 0)) then yes else no, atmcallstrike - space, putOptionvolume, Color.red, no);

def otmcallstrike1 = CallStrike + strikeSpacing;
plot otmcall = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume1 / division, 0)) then otmcallstrike1 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume1 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume1 / division, 0)) then yes else no, otmcallstrike1, callOptionvolume1, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume1a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume1a / division, 0)) then yes else no, otmcallstrike1 - space, putOptionvolume1a, Color.red, no);

def otmcallstrike2 = CallStrike + strikeSpacing * 2;
plot otmcall1 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume2 / division, 0)) then otmcallstrike2 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume2 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume2 / division, 0)) then yes else no, otmcallstrike2, callOptionvolume2, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume2a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume2a / division, 0)) then yes else no, otmcallstrike2 - space, putOptionvolume2a, Color.red, no);

def otmcallstrike3 = CallStrike + strikeSpacing * 3;
plot otmcall2 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume3 / division, 0)) then otmcallstrike3 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume3 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume3 / division, 0)) then yes else no, otmcallstrike3, callOptionvolume3, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume3a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume3a / division, 0)) then yes else no, otmcallstrike3 - space, putOptionvolume3a, Color.red, no);

def otmcallstrike4 = CallStrike + strikeSpacing * 4;
plot otmcall3 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume4 / division, 0)) then otmcallstrike4 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume4 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume4 / division, 0)) then yes else no, otmcallstrike4, callOptionvolume4, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume4a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume4a / division, 0)) then yes else no, otmcallstrike4 - space, putOptionvolume4a, Color.red, no);

def otmcallstrike5 = CallStrike + strikeSpacing * 5;
plot otmcall4 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume5 / division, 0)) then otmcallstrike5 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume5 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume5 / division, 0)) then yes else no, otmcallstrike5, callOptionvolume5, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume5a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume5a / division, 0)) then yes else no, otmcallstrike5 - space, putOptionvolume5a, Color.red, no);

def otmcallstrike6 = CallStrike + strikeSpacing * 6;
plot otmcall5 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume6 / division, 0)) then otmcallstrike6 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume6 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume6 / division, 0)) then yes else no, otmcallstrike6, callOptionvolume6, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume6a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume6a / division, 0)) then yes else no, otmcallstrike6 - space, putOptionvolume6a, Color.red, no);

def otmcallstrike7 = CallStrike + strikeSpacing * 7;
plot otmcall6 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume7 / division, 0)) then otmcallstrike7 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume7 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume7 / division, 0)) then yes else no, otmcallstrike7, callOptionvolume7, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume7a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume7a / division, 0)) then yes else no, otmcallstrike7 - space, putOptionvolume7a, Color.red, no);

def otmcallstrike8 = CallStrike + strikeSpacing * 8;
plot otmcall7 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume8 / division, 0)) then otmcallstrike8 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume8 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume8 / division, 0)) then yes else no, otmcallstrike8, callOptionvolume8, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume8a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume8a / division, 0)) then yes else no, otmcallstrike8 - space, putOptionvolume8a, Color.red, no);

def otmcallstrike9 = CallStrike + strikeSpacing * 9;
plot otmcall8 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume9 / division, 0)) then otmcallstrike9 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume9 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume9 / division, 0)) then yes else no, otmcallstrike9, callOptionvolume9, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume9a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume9a / division, 0)) then yes else no, otmcallstrike9 - space, putOptionvolume9a, Color.red, no);

def otmcallstrike10 = CallStrike + strikeSpacing * 10;
plot otmcall9 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume10 / division, 0)) then otmcallstrike10 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume10 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume10 / division, 0)) then yes else no, otmcallstrike10, callOptionvolume10, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume10a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume10a / division, 0)) then yes else no, otmcallstrike10 - space, putOptionvolume10a, Color.red, no);

def otmcallstrike11 = CallStrike + strikeSpacing * 11;
plot otmcall10 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume11 / division, 0)) then otmcallstrike11 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume11 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume11 / division, 0)) then yes else no, otmcallstrike11, callOptionvolume11, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume11a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume11a / division, 0)) then yes else no, otmcallstrike11 - space, putOptionvolume11a, Color.red, no);

def otmcallstrike12 = CallStrike + strikeSpacing * 12;
plot otmcall11 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume12 / division, 0)) then otmcallstrike12 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume12 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume12 / division, 0)) then yes else no, otmcallstrike12, callOptionvolume12, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume12a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume12a / division, 0)) then yes else no, otmcallstrike12 - space, putOptionvolume12a, Color.red, no);

def otmcallstrike13 = CallStrike + strikeSpacing * 13;
plot otmcall12 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume13 / division, 0)) then otmcallstrike13 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume13 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume13 / division, 0)) then yes else no, otmcallstrike13, callOptionvolume13, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume13a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume13a / division, 0)) then yes else no, otmcallstrike13 - space, putOptionvolume13a, Color.red, no);

def otmcallstrike14 = CallStrike + strikeSpacing * 14;
plot otmcall13 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume14 / division, 0)) then otmcallstrike14 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume14 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume14 / division, 0)) then yes else no, otmcallstrike14,
    callOptionvolume14, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume14a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume14a / division, 0)) then yes else no, otmcallstrike14 - space, putOptionvolume14a, Color.red, no);

def otmcallstrike15 = CallStrike + strikeSpacing * 15;
plot otmcall14 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume15 / division, 0)) then otmcallstrike15 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume15 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume15 / division, 0)) then yes else no, otmcallstrike15, callOptionvolume15, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume15a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume15a / division, 0)) then yes else no, otmcallstrike15 - space, putOptionvolume15a, Color.red, no);

def otmcallstrike16 = CallStrike + strikeSpacing * 16;
plot otmcall15 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume16 / division, 0)) then otmcallstrike16 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume16 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume16 / division, 0)) then yes else no, otmcallstrike16, callOptionvolume16, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume16a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume16a / division, 0)) then yes else no, otmcallstrike16 - space, putOptionvolume16a, Color.red, no);

def otmcallstrike17 = CallStrike + strikeSpacing * 17;
plot otmcall16 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume17 / division, 0)) then otmcallstrike17 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume17 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume17 / division, 0)) then yes else no, otmcallstrike17, callOptionvolume17, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume17a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume17a / division, 0)) then yes else no, otmcallstrike17 - space, putOptionvolume17a, Color.red, no);

def otmcallstrike18 = CallStrike + strikeSpacing * 18;
plot otmcall17 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume18 / division, 0)) then otmcallstrike18 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume18 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume18 / division, 0)) then yes else no, otmcallstrike18, callOptionvolume18, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume18a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume18a / division, 0)) then yes else no, otmcallstrike18 - space, putOptionvolume18a, Color.red, no);

def otmcallstrike19 = CallStrike + strikeSpacing * 19;
plot otmcall18 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume19 / division, 0)) then otmcallstrike19 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume19 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume19 / division, 0)) then yes else no, otmcallstrike19, callOptionvolume19, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume19a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume19a / division, 0)) then yes else no, otmcallstrike19 - space, putOptionvolume19a, Color.red, no);

def otmcallstrike20 = CallStrike + strikeSpacing * 20;
plot otmcall19 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume20 / division, 0)) then otmcallstrike20 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume20 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume20 / division, 0)) then yes else no, otmcallstrike20, callOptionvolume20, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume20a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume20a / division, 0)) then yes else no, otmcallstrike20 - space, putOptionvolume20a, Color.red, no);


def itmcallstrike1 = CallStrike - strikeSpacing;
plot itmcall = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolumea / division, 0)) then itmcallstrike1 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume1a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume1a / division, 0)) then yes else no, itmcallstrike1, callOptionvolume1a, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume1 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume1 / division, 0)) then yes else no, itmcallstrike1 - space, putOptionvolume1, Color.red, no);

def itmcallstrike2 = CallStrike - strikeSpacing * 2;
plot itmcall1 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume2a / division, 0)) then itmcallstrike2 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume2a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume2a / division, 0)) then yes else no, itmcallstrike2, callOptionvolume2a, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume2 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume2 / division, 0)) then yes else no, itmcallstrike2 - space, putOptionvolume2, Color.red, no);

def itmcallstrike3 = CallStrike - strikeSpacing * 3;
plot itmcall2 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume3a / division, 0)) then itmcallstrike3 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume3a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume3a / division, 0)) then yes else no, itmcallstrike3, callOptionvolume3a, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume3 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume3 / division, 0)) then yes else no, itmcallstrike3 - space, putOptionvolume3, Color.red, no);

def itmcallstrike4 = CallStrike - strikeSpacing * 4;
plot itmcall3 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume4a / division, 0)) then itmcallstrike4 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume4a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume4a / division, 0)) then yes else no, itmcallstrike4, callOptionvolume4a, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume4 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume4 / division, 0)) then yes else no, itmcallstrike4 - space, putOptionvolume4, Color.red, no);

def itmcallstrike5 = CallStrike - strikeSpacing * 5;
plot itmcall4 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume5a / division, 0)) then itmcallstrike5 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume5a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume5a / division, 0)) then yes else no, itmcallstrike5, callOptionvolume5a, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume5 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume5 / division, 0)) then yes else no, itmcallstrike5 - space, putOptionvolume5, Color.red, no);

def itmcallstrike6 = CallStrike - strikeSpacing * 6;
plot itmcall5 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume6a / division, 0)) then itmcallstrike6 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume6a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume6a / division, 0)) then yes else no, itmcallstrike6, callOptionvolume6a, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume6 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume6 / division, 0)) then yes else no, itmcallstrike6 - space, putOptionvolume6, Color.red, no);

def itmcallstrike7 = CallStrike - strikeSpacing * 7;
plot itmcall6 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume7a / division, 0)) then itmcallstrike7 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume7a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume7a / division, 0)) then yes else no, itmcallstrike7, callOptionvolume7a, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume7 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume7 / division, 0)) then yes else no, itmcallstrike7 - space, putOptionvolume7, Color.red, no);

def itmcallstrike8 = CallStrike - strikeSpacing * 8;
plot itmcall7 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume8a / division, 0)) then itmcallstrike8 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume8a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume8a / division, 0)) then yes else no, itmcallstrike8, callOptionvolume8a, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume8 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume8 / division, 0)) then yes else no, itmcallstrike8 - space, putOptionvolume8, Color.red, no);

def itmcallstrike9 = CallStrike - strikeSpacing * 9;
plot itmcall8 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume9a / division, 0)) then itmcallstrike9 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume9a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume9a / division, 0)) then yes else no, itmcallstrike9, callOptionvolume9a, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume9 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume9 / division, 0)) then yes else no, itmcallstrike9 - space, putOptionvolume9, Color.red, no);

def itmcallstrike10 = CallStrike - strikeSpacing * 10;
plot itmcall9 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume10a / division, 0)) then itmcallstrike10 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume10a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume10a / division, 0)) then yes else no, itmcallstrike10, callOptionvolume10a, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume10 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume10 / division, 0)) then yes else no, itmcallstrike10 - space, putOptionvolume10, Color.red, no);

def itmcallstrike11 = CallStrike - strikeSpacing * 11;
plot itmcall10 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume11a / division, 0)) then itmcallstrike11 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume11a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume11a / division, 0)) then yes else no, itmcallstrike11, callOptionvolume11a, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume11 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume11 / division, 0)) then yes else no, itmcallstrike11 - space, putOptionvolume11, Color.red, no);

def itmcallstrike12 = CallStrike - strikeSpacing * 12;
plot itmcall11 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume12a / division, 0)) then itmcallstrike12 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume12a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume12a / division, 0)) then yes else no, itmcallstrike12, callOptionvolume12a, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume12 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume12 / division, 0)) then yes else no, itmcallstrike12 - space, putOptionvolume12, Color.red, no);

def itmcallstrike13 = CallStrike - strikeSpacing * 13;
plot itmcall12 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume13a / division, 0)) then itmcallstrike13 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume13a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume13a / division, 0)) then yes else no, itmcallstrike13, callOptionvolume13a, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume13 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume13 / division, 0)) then yes else no, itmcallstrike13 - space, putOptionvolume13, Color.red, no);

def itmcallstrike14 = CallStrike - strikeSpacing * 14;
plot itmcall13 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume14a / division, 0)) then itmcallstrike14 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume14a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume14a / division, 0)) then yes else no, itmcallstrike14, callOptionvolume14a, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume14 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume14 / division, 0)) then yes else no, itmcallstrike14 - space, putOptionvolume14, Color.red, no);

def itmcallstrike15 = CallStrike - strikeSpacing * 15;
plot itmcall14 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume15a / division, 0)) then itmcallstrike15 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume15a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume15a / division, 0)) then yes else no, itmcallstrike15, callOptionvolume15a, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume15 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume15 / division, 0)) then yes else no, itmcallstrike15 - space, putOptionvolume15, Color.red, no);

def itmcallstrike16 = CallStrike - strikeSpacing * 16;
plot itmcall15 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume16a / division, 0)) then itmcallstrike16 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume16a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume16a / division, 0)) then yes else no, itmcallstrike16, callOptionvolume16a, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume16 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume16 / division, 0)) then yes else no, itmcallstrike16 - space, putOptionvolume16, Color.red, no);

def itmcallstrike17 = CallStrike - strikeSpacing * 17;
plot itmcall16 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume17a / division, 0)) then itmcallstrike17 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume17a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume17a / division, 0)) then yes else no, itmcallstrike17, callOptionvolume17a, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume17 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume17 / division, 0)) then yes else no, itmcallstrike17 - space, putOptionvolume17, Color.red, no);

def itmcallstrike18 = CallStrike - strikeSpacing * 18;
plot itmcall17 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume18a / division, 0)) then itmcallstrike18 else Double.NaN;

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume18a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume18a / division, 0)) then yes else no, itmcallstrike18, callOptionvolume18a, Color.green, yes);

AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume18 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume18 / division, 0)) then yes else no, itmcallstrike18 - space, putOptionvolume18, Color.red, no);

def itmcallstrike19 = CallStrike - strikeSpacing * 19;
plot itmcall18 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume19a / division, 0)) then itmcallstrike19 else Double.NaN;
AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume19a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume19a / division, 0)) then yes else no, itmcallstrike19, callOptionvolume19a, Color.green, yes);
AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume19 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume19 / division, 0)) then yes else no, itmcallstrike19 - space, putOptionvolume19, Color.red, no);
def itmcallstrike20 = CallStrike - strikeSpacing * 20;
plot itmcall19 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume20a / division, 0)) then itmcallstrike20 else Double.NaN;
AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(callOptionvolume20a / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(callOptionvolume20a / division, 0)) then yes else no, itmcallstrike20, callOptionvolume20a, Color.green, yes);
AddChartBubble(if display_bubbles and BarNumber() >= HighestAll(lastbar + shift_line_right + Round(putOptionvolume20 / division, 0)) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume20 / division, 0)) then yes else no, itmcallstrike20 - space, putOptionvolume20, Color.red, no);

#PUTS
def atmputstrike = PutStrike - space;
plot atmput = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume / division, 0)) then atmputstrike else Double.NaN;

def itmputstrike1 = PutStrike + strikeSpacing - space;
plot itmput = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume1a / division, 0)) then itmputstrike1 else Double.NaN;

def itmPutStrike2 = PutStrike + strikeSpacing * 2 - space;
plot itmput1 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume2a / division, 0)) then itmPutStrike2 else Double.NaN;
def itmPutStrike3 = PutStrike + strikeSpacing * 3 - space;
plot itmput2 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume3a / division, 0)) then itmPutStrike3 else Double.NaN;
def itmPutStrike4 = PutStrike + strikeSpacing * 4 - space;
plot itmput3 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume4a / division, 0)) then itmPutStrike4 else Double.NaN;
def itmPutStrike5 = PutStrike + strikeSpacing * 5 - space;
plot itmput4 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume5a / division, 0)) then itmPutStrike5 else Double.NaN;
def itmPutStrike6 = PutStrike + strikeSpacing * 6 - space;
plot itmput5 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume6a / division, 0)) then itmPutStrike6 else Double.NaN;
def itmPutStrike7 = PutStrike + strikeSpacing * 7 - space;
plot itmput6 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume7a / division, 0)) then itmPutStrike7 else Double.NaN;
def itmPutStrike8 = PutStrike + strikeSpacing * 8 - space;
plot itmput7 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume8a / division, 0)) then itmPutStrike8 else Double.NaN;
def itmPutStrike9 = PutStrike + strikeSpacing * 9 - space;
plot itmput8 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume9a / division, 0)) then itmPutStrike9 else Double.NaN;
def itmPutStrike10 = PutStrike + strikeSpacing * 10 - space;
plot itmput9 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume10a / division, 0)) then itmPutStrike10 else Double.NaN;
def itmPutStrike11 = PutStrike + strikeSpacing * 11 - space;
plot itmput10 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume11a / division, 0)) then itmPutStrike11 else Double.NaN;
def itmPutStrike12 = PutStrike + strikeSpacing * 12 - space;
plot itmput11 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume12a / division, 0)) then itmPutStrike12 else Double.NaN;
def itmPutStrike13 = PutStrike + strikeSpacing * 13 - space;
plot itmput12 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume13a / division, 0)) then itmPutStrike13 else Double.NaN;
def itmPutStrike14 = PutStrike + strikeSpacing * 14 - space;
plot itmput13 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume14a / division, 0)) then itmPutStrike14 else Double.NaN;
def itmPutStrike15 = PutStrike + strikeSpacing * 15 - space;
plot itmput14 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume15a / division, 0)) then itmPutStrike15 else Double.NaN;
def itmPutStrike16 = PutStrike + strikeSpacing * 16 - space;
plot itmput15 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume16a / division, 0)) then itmPutStrike16 else Double.NaN;
def itmPutStrike17 = PutStrike + strikeSpacing * 17 - space;
plot itmput16 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume17a / division, 0)) then itmPutStrike17 else Double.NaN;
def itmPutStrike18 = PutStrike + strikeSpacing * 18 - space;
plot itmput17 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume18a / division, 0)) then itmPutStrike18 else Double.NaN;
def itmPutStrike19 = PutStrike + strikeSpacing * 19 - space;
plot itmput18 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume19a / division, 0)) then itmPutStrike19 else Double.NaN;
def itmPutStrike20 = PutStrike + strikeSpacing * 20 - space;
plot itmput19 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume20a / division, 0)) then itmPutStrike20 else Double.NaN;


def otmputstrike1 = PutStrike - strikeSpacing - space;
plot otmput = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume1 / division, 0)) then otmputstrike1 else Double.NaN;
def otmputStrike2 = PutStrike - strikeSpacing * 2 - space;
plot otmput1 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume2 / division, 0)) then otmputStrike2 else Double.NaN;
def otmputStrike3 = PutStrike - strikeSpacing * 3 - space;
plot otmput2 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume3 / division, 0)) then otmputStrike3 else Double.NaN;
def otmputStrike4 = PutStrike - strikeSpacing * 4 - space;
plot otmput3 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume4 / division, 0)) then otmputStrike4 else Double.NaN;
def otmputStrike5 = PutStrike - strikeSpacing * 5 - space;
plot otmput4 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume5 / division, 0)) then otmputStrike5 else Double.NaN;
def otmputStrike6 = PutStrike - strikeSpacing * 6 - space;
plot otmput5 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume6 / division, 0)) then otmputStrike6 else Double.NaN;
def otmputStrike7 = PutStrike - strikeSpacing * 7 - space;
plot otmput6 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume7 / division, 0)) then otmputStrike7 else Double.NaN;
def otmputStrike8 = PutStrike - strikeSpacing * 8 - space;
plot otmput7 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume8 / division, 0)) then otmputStrike8 else Double.NaN;
def otmputStrike9 = PutStrike - strikeSpacing * 9 - space;
plot otmput8 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume9 / division, 0)) then otmputStrike9 else Double.NaN;
def otmputStrike10 = PutStrike - strikeSpacing * 10 - space;
plot otmput9 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume10 / division, 0)) then otmputStrike10 else Double.NaN;
def otmputStrike11 = PutStrike - strikeSpacing * 11 - space;
plot otmput10 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume11 / division, 0)) then otmputStrike11 else Double.NaN;
def otmputStrike12 = PutStrike - strikeSpacing * 12 - space;
plot otmput11 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume12 / division, 0)) then otmputStrike12 else Double.NaN;
def otmputStrike13 = PutStrike - strikeSpacing * 13 - space;
plot otmput12 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume13 / division, 0)) then otmputStrike13 else Double.NaN;
def otmputStrike14 = PutStrike - strikeSpacing * 14 - space;
plot otmput13 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume14 / division, 0)) then otmputStrike14 else Double.NaN;
def otmputStrike15 = PutStrike - strikeSpacing * 15 - space;
plot otmput14 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume15 / division, 0)) then otmputStrike15 else Double.NaN;
def otmputStrike16 = PutStrike - strikeSpacing * 16 - space;
plot otmput15 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume16 / division, 0)) then otmputStrike16 else Double.NaN;
def otmputStrike17 = PutStrike - strikeSpacing * 17 - space;
plot otmput16 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume17 / division, 0)) then otmputStrike17 else Double.NaN;
def otmputStrike18 = PutStrike - strikeSpacing * 18 - space;
plot otmput17 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume18 / division, 0)) then otmputStrike18 else Double.NaN;
def otmputStrike19 = PutStrike - strikeSpacing * 19 - space;
plot otmput18 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume19 / division, 0)) then otmputStrike19 else Double.NaN;
def otmputStrike20 = PutStrike - strikeSpacing * 20 - space;
plot otmput19 = if BarNumber() >= HighestAll(lastbar + shift_line_right) and  BarNumber() <= HighestAll(lastbar + shift_line_right + Round(putOptionvolume20 / division, 0)) then otmputStrike20 else Double.NaN;





atmcall.SetPaintingStrategy(PaintingStrategy.LINE);
atmcall.SetLineWeight(5);
atmcall.SetDefaultColor(GlobalColor("CallColor"));
otmcall.SetPaintingStrategy(PaintingStrategy.LINE);
otmcall.SetLineWeight(5);
otmcall.SetDefaultColor(GlobalColor("CallColor"));
otmcall1.SetPaintingStrategy(PaintingStrategy.LINE);
otmcall1.SetLineWeight(5);
otmcall1.SetDefaultColor(GlobalColor("CallColor"));
otmcall2.SetPaintingStrategy(PaintingStrategy.LINE);
otmcall2.SetLineWeight(5);
otmcall2.SetDefaultColor(GlobalColor("CallColor"));
otmcall3.SetPaintingStrategy(PaintingStrategy.LINE);
otmcall3.SetLineWeight(5);
otmcall3.SetDefaultColor(GlobalColor("CallColor"));
otmcall4.SetPaintingStrategy(PaintingStrategy.LINE);
otmcall4.SetLineWeight(5);
otmcall4.SetDefaultColor(GlobalColor("CallColor"));
otmcall5.SetPaintingStrategy(PaintingStrategy.LINE);
otmcall5.SetLineWeight(5);
otmcall5.SetDefaultColor(GlobalColor("CallColor"));
otmcall6.SetPaintingStrategy(PaintingStrategy.LINE);
otmcall6.SetLineWeight(5);
otmcall6.SetDefaultColor(GlobalColor("CallColor"));
otmcall7.SetPaintingStrategy(PaintingStrategy.LINE);
otmcall7.SetLineWeight(5);
otmcall7.SetDefaultColor(GlobalColor("CallColor"));
otmcall8.SetPaintingStrategy(PaintingStrategy.LINE);
otmcall8.SetLineWeight(5);
otmcall8.SetDefaultColor(GlobalColor("CallColor"));
otmcall9.SetPaintingStrategy(PaintingStrategy.LINE);
otmcall9.SetLineWeight(5);
otmcall9.SetDefaultColor(GlobalColor("CallColor"));
otmcall10.SetPaintingStrategy(PaintingStrategy.LINE);
otmcall10.SetLineWeight(5);
otmcall10.SetDefaultColor(GlobalColor("CallColor"));
otmcall11.SetPaintingStrategy(PaintingStrategy.LINE);
otmcall11.SetLineWeight(5);
otmcall11.SetDefaultColor(GlobalColor("CallColor"));
otmcall12.SetPaintingStrategy(PaintingStrategy.LINE);
otmcall12.SetLineWeight(5);
otmcall12.SetDefaultColor(GlobalColor("CallColor"));
otmcall13.SetPaintingStrategy(PaintingStrategy.LINE);
otmcall13.SetLineWeight(5);
otmcall13.SetDefaultColor(GlobalColor("CallColor"));
otmcall14.SetPaintingStrategy(PaintingStrategy.LINE);
otmcall14.SetLineWeight(5);
otmcall14.SetDefaultColor(GlobalColor("CallColor"));
otmcall15.SetPaintingStrategy(PaintingStrategy.LINE);
otmcall15.SetLineWeight(5);
otmcall15.SetDefaultColor(GlobalColor("CallColor"));
otmcall16.SetPaintingStrategy(PaintingStrategy.LINE);
otmcall16.SetLineWeight(5);
otmcall16.SetDefaultColor(GlobalColor("CallColor"));
otmcall17.SetPaintingStrategy(PaintingStrategy.LINE);
otmcall17.SetLineWeight(5);
otmcall17.SetDefaultColor(GlobalColor("CallColor"));
otmcall18.SetPaintingStrategy(PaintingStrategy.LINE);
otmcall18.SetLineWeight(5);
otmcall18.SetDefaultColor(GlobalColor("CallColor"));
otmcall19.SetPaintingStrategy(PaintingStrategy.LINE);
otmcall19.SetLineWeight(5);
otmcall19.SetDefaultColor(GlobalColor("CallColor"));

itmcall.SetPaintingStrategy(PaintingStrategy.LINE);
itmcall.SetLineWeight(5);
itmcall.SetDefaultColor(GlobalColor("CallColor"));
itmcall1.SetPaintingStrategy(PaintingStrategy.LINE);
itmcall1.SetLineWeight(5);
itmcall1.SetDefaultColor(GlobalColor("CallColor"));
itmcall2.SetPaintingStrategy(PaintingStrategy.LINE);
itmcall2.SetLineWeight(5);
itmcall2.SetDefaultColor(GlobalColor("CallColor"));
itmcall3.SetPaintingStrategy(PaintingStrategy.LINE);
itmcall3.SetLineWeight(5);
itmcall3.SetDefaultColor(GlobalColor("CallColor"));
itmcall4.SetPaintingStrategy(PaintingStrategy.LINE);
itmcall4.SetLineWeight(5);
itmcall4.SetDefaultColor(GlobalColor("CallColor"));
itmcall5.SetPaintingStrategy(PaintingStrategy.LINE);
itmcall5.SetLineWeight(5);
itmcall5.SetDefaultColor(GlobalColor("CallColor"));
itmcall6.SetPaintingStrategy(PaintingStrategy.LINE);
itmcall6.SetLineWeight(5);
itmcall6.SetDefaultColor(GlobalColor("CallColor"));
itmcall7.SetPaintingStrategy(PaintingStrategy.LINE);
itmcall7.SetLineWeight(5);
itmcall7.SetDefaultColor(GlobalColor("CallColor"));
itmcall8.SetPaintingStrategy(PaintingStrategy.LINE);
itmcall8.SetLineWeight(5);
itmcall8.SetDefaultColor(GlobalColor("CallColor"));
itmcall9.SetPaintingStrategy(PaintingStrategy.LINE);
itmcall9.SetLineWeight(5);
itmcall9.SetDefaultColor(GlobalColor("CallColor"));
itmcall10.SetPaintingStrategy(PaintingStrategy.LINE);
itmcall10.SetLineWeight(5);
itmcall10.SetDefaultColor(GlobalColor("CallColor"));
itmcall11.SetPaintingStrategy(PaintingStrategy.LINE);
itmcall11.SetLineWeight(5);
itmcall11.SetDefaultColor(GlobalColor("CallColor"));
itmcall12.SetPaintingStrategy(PaintingStrategy.LINE);
itmcall12.SetLineWeight(5);
itmcall12.SetDefaultColor(GlobalColor("CallColor"));
itmcall13.SetPaintingStrategy(PaintingStrategy.LINE);
itmcall13.SetLineWeight(5);
itmcall13.SetDefaultColor(GlobalColor("CallColor"));
itmcall14.SetPaintingStrategy(PaintingStrategy.LINE);
itmcall14.SetLineWeight(5);
itmcall14.SetDefaultColor(GlobalColor("CallColor"));
itmcall15.SetPaintingStrategy(PaintingStrategy.LINE);
itmcall15.SetLineWeight(5);
itmcall15.SetDefaultColor(GlobalColor("CallColor"));
itmcall16.SetPaintingStrategy(PaintingStrategy.LINE);
itmcall16.SetLineWeight(5);
itmcall16.SetDefaultColor(GlobalColor("CallColor"));
itmcall17.SetPaintingStrategy(PaintingStrategy.LINE);
itmcall17.SetLineWeight(5);
itmcall17.SetDefaultColor(GlobalColor("CallColor"));
itmcall18.SetPaintingStrategy(PaintingStrategy.LINE);
itmcall18.SetLineWeight(5);
itmcall18.SetDefaultColor(GlobalColor("CallColor"));
itmcall19.SetPaintingStrategy(PaintingStrategy.LINE);
itmcall19.SetLineWeight(5);
itmcall19.SetDefaultColor(GlobalColor("CallColor"));

atmput.SetPaintingStrategy(PaintingStrategy.LINE);
atmput.SetLineWeight(5);
atmput.SetDefaultColor(GlobalColor("PutColor"));
itmput.SetPaintingStrategy(PaintingStrategy.LINE);
itmput.SetLineWeight(5);
itmput.SetDefaultColor(GlobalColor("PutColor"));
itmput1.SetPaintingStrategy(PaintingStrategy.LINE);
itmput1.SetLineWeight(5);
itmput1.SetDefaultColor(GlobalColor("PutColor"));
itmput2.SetPaintingStrategy(PaintingStrategy.LINE);
itmput2.SetLineWeight(5);
itmput2.SetDefaultColor(GlobalColor("PutColor"));
itmput3.SetPaintingStrategy(PaintingStrategy.LINE);
itmput3.SetLineWeight(5);
itmput3.SetDefaultColor(GlobalColor("PutColor"));
itmput4.SetPaintingStrategy(PaintingStrategy.LINE);
itmput4.SetLineWeight(5);
itmput4.SetDefaultColor(GlobalColor("PutColor"));
itmput5.SetPaintingStrategy(PaintingStrategy.LINE);
itmput5.SetLineWeight(5);
itmput5.SetDefaultColor(GlobalColor("PutColor"));
itmput6.SetPaintingStrategy(PaintingStrategy.LINE);
itmput6.SetLineWeight(5);
itmput6.SetDefaultColor(GlobalColor("PutColor"));
itmput7.SetPaintingStrategy(PaintingStrategy.LINE);
itmput7.SetLineWeight(5);
itmput7.SetDefaultColor(GlobalColor("PutColor"));
itmput8.SetPaintingStrategy(PaintingStrategy.LINE);
itmput8.SetLineWeight(5);
itmput8.SetDefaultColor(GlobalColor("PutColor"));
itmput9.SetPaintingStrategy(PaintingStrategy.LINE);
itmput9.SetLineWeight(5);
itmput9.SetDefaultColor(GlobalColor("PutColor"));
itmput10.SetPaintingStrategy(PaintingStrategy.LINE);
itmput10.SetLineWeight(5);
itmput10.SetDefaultColor(GlobalColor("PutColor"));
itmput11.SetPaintingStrategy(PaintingStrategy.LINE);
itmput11.SetLineWeight(5);
itmput11.SetDefaultColor(GlobalColor("PutColor"));
itmput12.SetPaintingStrategy(PaintingStrategy.LINE);
itmput12.SetLineWeight(5);
itmput12.SetDefaultColor(GlobalColor("PutColor"));
itmput13.SetPaintingStrategy(PaintingStrategy.LINE);
itmput13.SetLineWeight(5);
itmput13.SetDefaultColor(GlobalColor("PutColor"));
itmput14.SetPaintingStrategy(PaintingStrategy.LINE);
itmput14.SetLineWeight(5);
itmput14.SetDefaultColor(GlobalColor("PutColor"));
itmput15.SetPaintingStrategy(PaintingStrategy.LINE);
itmput15.SetLineWeight(5);
itmput15.SetDefaultColor(GlobalColor("PutColor"));
itmput16.SetPaintingStrategy(PaintingStrategy.LINE);
itmput16.SetLineWeight(5);
itmput16.SetDefaultColor(GlobalColor("PutColor"));
itmput17.SetPaintingStrategy(PaintingStrategy.LINE);
itmput17.SetLineWeight(5);
itmput17.SetDefaultColor(GlobalColor("PutColor"));
itmput18.SetPaintingStrategy(PaintingStrategy.LINE);
itmput18.SetLineWeight(5);
itmput18.SetDefaultColor(GlobalColor("PutColor"));
itmput19.SetPaintingStrategy(PaintingStrategy.LINE);
itmput19.SetLineWeight(5);
itmput19.SetDefaultColor(GlobalColor("PutColor"));





otmput.SetPaintingStrategy(PaintingStrategy.LINE);
otmput.SetLineWeight(5);
otmput.SetDefaultColor(GlobalColor("PutColor"));
otmput1.SetPaintingStrategy(PaintingStrategy.LINE);
otmput1.SetLineWeight(5);
otmput1.SetDefaultColor(GlobalColor("PutColor"));
otmput2.SetPaintingStrategy(PaintingStrategy.LINE);
otmput2.SetLineWeight(5);
otmput2.SetDefaultColor(GlobalColor("PutColor"));
otmput3.SetPaintingStrategy(PaintingStrategy.LINE);
otmput3.SetLineWeight(5);
otmput3.SetDefaultColor(GlobalColor("PutColor"));
otmput4.SetPaintingStrategy(PaintingStrategy.LINE);
otmput4.SetLineWeight(5);
otmput4.SetDefaultColor(GlobalColor("PutColor"));
otmput5.SetPaintingStrategy(PaintingStrategy.LINE);
otmput5.SetLineWeight(5);
otmput5.SetDefaultColor(GlobalColor("PutColor"));
otmput6.SetPaintingStrategy(PaintingStrategy.LINE);
otmput6.SetLineWeight(5);
otmput6.SetDefaultColor(GlobalColor("PutColor"));
otmput7.SetPaintingStrategy(PaintingStrategy.LINE);
otmput7.SetLineWeight(5);
otmput7.SetDefaultColor(GlobalColor("PutColor"));
otmput8.SetPaintingStrategy(PaintingStrategy.LINE);
otmput8.SetLineWeight(5);
otmput8.SetDefaultColor(GlobalColor("PutColor"));
otmput9.SetPaintingStrategy(PaintingStrategy.LINE);
otmput9.SetLineWeight(5);
otmput9.SetDefaultColor(GlobalColor("PutColor"));
otmput10.SetPaintingStrategy(PaintingStrategy.LINE);
otmput10.SetLineWeight(5);
otmput10.SetDefaultColor(GlobalColor("PutColor"));
otmput11.SetPaintingStrategy(PaintingStrategy.LINE);
otmput11.SetLineWeight(5);
otmput11.SetDefaultColor(GlobalColor("PutColor"));
otmput12.SetPaintingStrategy(PaintingStrategy.LINE);
otmput12.SetLineWeight(5);
otmput12.SetDefaultColor(GlobalColor("PutColor"));
otmput13.SetPaintingStrategy(PaintingStrategy.LINE);
otmput13.SetLineWeight(5);
otmput13.SetDefaultColor(GlobalColor("PutColor"));
otmput14.SetPaintingStrategy(PaintingStrategy.LINE);
otmput14.SetLineWeight(5);
otmput14.SetDefaultColor(GlobalColor("PutColor"));
otmput15.SetPaintingStrategy(PaintingStrategy.LINE);
otmput15.SetLineWeight(5);
otmput15.SetDefaultColor(GlobalColor("PutColor"));
otmput16.SetPaintingStrategy(PaintingStrategy.LINE);
otmput16.SetLineWeight(5);
otmput16.SetDefaultColor(GlobalColor("PutColor"));
otmput17.SetPaintingStrategy(PaintingStrategy.LINE);
otmput17.SetLineWeight(5);
otmput17.SetDefaultColor(GlobalColor("PutColor"));
otmput18.SetPaintingStrategy(PaintingStrategy.LINE);
otmput18.SetLineWeight(5);
otmput18.SetDefaultColor(GlobalColor("PutColor"));
otmput19.SetPaintingStrategy(PaintingStrategy.LINE);
otmput19.SetLineWeight(5);
otmput19.SetDefaultColor(GlobalColor("PutColor"));
