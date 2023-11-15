# Risk_Rate
#(TNX / 10) / (1 / PE)) is more than 1.5 std deviations below the(10 day sma of TNX / 10)
# Chart Study.Aggregation period must be Daily
# For scanning purposes the study should be named Risk_Rate.
# Scan Code: Risk_Rate().data < Risk_Rate().lower
# Mobius

declare lower;

def earnings = CompoundValue(1, if isNaN(EarningsPerShareTTM()) then 0 else EarningsPerShareTTM(), 0);
plot TNX_SMA = Average(close("TNX"), 10);
TNX_SMA.SetDefaultColor(Color.Cyan);
def SD = stDev(close("TNX"), 10);
plot lower = TNX_SMA - (SD * 1.5);
lower.SetDefaultColor(Color.Red);
plot data = (close("TNX") / 10) / (1 / (close / earnings));
data.SetDefaultColor(Color.Gray);
addLabel(1, "earnings TTM = " + AsDollars(earnings) +
    "  PE = " + AsDollars(close / earnings), color.white);
addlabel(1, "TNX_SMA", color.cyan);
addLabel(1, "lower St Dev", color.red);
addLabel(1, "data", color.gray);
# End Code