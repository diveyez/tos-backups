## Important: using regular monthly expirations, the expirationDate must be entered manually.it is the listed expirationdate + 1 daysFromDate(saturday).


declare lower;

input expirationdate = 20230513;

def priceCalls = close(GetATMOption(GetUnderlyingSymbol(), expirationdate, OptionClass.CALL));
def volumeCalls = volume(GetATMOption(GetUnderlyingSymbol(), expirationdate, OptionClass.CALL));
plot callPremium = priceCalls * volumeCalls * 100;
callPremium.setPaintingStrategy(PaintingStrategy.HISTOGRAM);
callPremium.setlineWeight(5);
callPremium.setdefaultColor(createColor(38, 115, 251));
callPremium.hideBubble();
callPremium.hidetitle();

##Add Label(optional)
AddLabel(yes, "  Calls | Premium", createcolor(38, 115, 251));

# Plot Results
AddLabel(yes, "ATM Call Premium: $" + AsDollars(CallPremium), if CallPremium > 0 then Color.GREEN else Color.RED);
AddLabel(yes, "Total Premium for ATM Calls: $" + AsDollars(CallPremium), if CallPremium > 0 then Color.GREEN else Color.RED);