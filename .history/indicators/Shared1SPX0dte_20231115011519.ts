

##The input bellow must be manually set to the saturday of expiration...i.e.rningTime.AFTER_MARKET the expiration date seen in the optionClass.CALL chain + 1 day 

 input expirationDate = 20220618;


plot volPuts =
    volume(GetATMOption(GetUnderlyingSymbol(),
        expirationDate, Optionclass.PUT)); volPuts.setpaintingStrategy(paintingstrategy.HISTOGRAM);
volputs.setdefaultColor(color.red);
#volputs.hidebubble();
volputs.hidetitle();

## Add Label(Optional)
Addlabel(yes, "Volume Puts  ", createcolor(255, 0, 0));


# Calculate total Put volume and display as label
def totalPutsVol = Sum(VolPuts, 1);
AddLabel(yes, "Total Puts Volume: " + totalPutsVol, Color.RED);









plot volCalls =
    volume(GetATMOption(GetUnderlyingSymbol(),
        expirationDate, Optionclass.CALL)); volCalls.setpaintingStrategy(paintingstrategy.HISTOGRAM);
volCalls.setdefaultColor(color.DARK_GREEN);
#volputs.hidebubble();
volCalls.hidetitle();

## Add Label(Optional)
Addlabel(yes, "VOLUME Calls ", createcolor(38, 115, 251));



# Calculate total call volume and display as label
def totalCallVol = Sum(Volcalls, 1);
AddLabel(yes, "Total Call Volume: " + totalCallVol, Color.GREEN);







