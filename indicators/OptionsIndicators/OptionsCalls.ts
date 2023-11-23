declare lower; 

##The input bellow must be manually set to the saturday of expiration...i.e.rningTime.AFTER_MARKET the expiration date seen in the optionClass.CALL chain + 1 day


#VOLUME OPTION
input expirationDate = 20230421;

plot volCalls =
    volume(GetATMOption(GetUnderlyingSymbol(),
        expirationDate, Optionclass.CALL)); volCalls.setpaintingStrategy(paintingstrategy.HISTOGRAM);
volCalls.setdefaultColor(color.DARK_GREEN);
#volputs.hidebubble();
volCalls.hidetitle();

## Add Label(Optional)
Addlabel(yes, "VOLUME Calls ", createcolor(38, 115, 251));

# Label for total call volume
def totalCallVolume = if !IsNaN(volCalls) then TotalSum(volCalls) else Double.NaN;
AddLabel(yes, "Total Call Volume: " + AsText(totalCallVolume), color.YELLOW);

# Label for call volume
Addlabel(yes, "Volume Calls: " + AsText(volCalls), createcolor(38, 115, 251));