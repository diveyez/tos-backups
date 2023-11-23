# IV and Implied Move Approximation Label
# Mobius

def IV = if IsNaN(Imp_Volatility(period = AggregationPeriod.DAY))
         then IV[1]
         else Imp_Volatility(period = AggregationPeriod.DAY);
def ImpliedMove = (open * IV) / Sqrt(365);
AddLabel(1, "IV = " + AsPercent(IV) + "  Implied Move = " + AsDollars(ImpliedMove), color.white);