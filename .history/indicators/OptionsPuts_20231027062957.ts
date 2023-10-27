declare lower; 

##The input bellow must be manually set to the saturday of expiration...i.e.rningTime.AFTER_MARKET the expiration date seen in the optionClass.CALL chain + 1 day 

input expirationDate = 230428;

plot volPuts =
    volume(GetATMOption(GetUnderlyingSymbol(),
        expirationDate, Optionclass.PUT)); volPuts.setpaintingStrategy(paintingstrategy.HISTOGRAM);
volputs.setdefaultColor(color.red);
#volputs.hidebubble();
volputs.hidetitle();

## Add Label(Optional)
Addlabel(yes, "VOLUME Puts  ", createcolor(255, 0, 0));

# Label for total call volume
def totalPutsVolume = if !IsNaN(volputs) then TotalSum(volputs) else Double.NaN;
AddLabel(yes, "Total Call Volume: " + AsText(totalputsVolume), color.YELLOW);

# Label for call volume
Addlabel(yes, "Volume Puts: " + AsText(volputs), createcolor(255, 0, 0));