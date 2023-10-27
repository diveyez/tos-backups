declare lower;

input expirationdate = 20230512;

def pricePuts = close(GetATMOption(GetUnderlyingSymbol(), expirationdate, OptionClass.PUT));
def volumePuts = volume(GetATMOption(GetUnderlyingSymbol(), expirationdate, OptionClass.PUT));
plot PutPremium = pricePuts * volumePuts * 100;
PutPremium.setPaintingStrategy(PaintingStrategy.HISTOGRAM);
PutPremium.setlineWeight(5);
PutPremium.setdefaultColor(createColor(38, 115, 251));
PutPremium.hideBubble();
PutPremium.hidetitle();

##Add Label(optional)
AddLabel(yes, " Puts | Premium", createcolor(38, 115, 251));

# Plot Results
AddLabel(yes, "ATM Put Premium: $" + AsDollars(PutPremium), if PutPremium > 0 then Color.RED else Color.RED);
AddLabel(yes, "Total Premium for ATM Puts: $" + AsDollars(PutPremium), if PutPremium > 0 then Color.RED else Color.RED);