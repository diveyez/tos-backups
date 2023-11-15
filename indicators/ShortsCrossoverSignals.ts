#wizard input: crossingType
#wizard text: Inputs: fast length:
#wizard input: fastLength
#wizard text: slow length:
#wizard input: slowLength
#wizard text: macd length:
#wizard input: MACDLength
#wizard text: average type:
#wizard input: AverageType

input fastLength = 12;
input slowLength = 26;
input MACDLength = 9;
input averageType = AverageType.EXPONENTIAL;
input crossingType = { default "Positive to Negative", "Negative to Positive"};

def Diff = MACD(fastLength, slowLength, MACDLength, averageType).Diff;

plot signal = crosses(Diff, 0, crossingType == CrossingType."Negative to Positive");

signal.DefineColor("Negative to Positive", GetColor(2));
signal.DefineColor("Positive to Negative", GetColor(3));
signal.AssignValueColor(if crossingType == CrossingType."Negative to Positive" then signal.color("Negative to Positive") else signal.color("Positive to Negative"));

signal.SetPaintingStrategy(if crossingType == CrossingType."Negative to Positive"
    then PaintingStrategy.BOOLEAN_POINTS
    else PaintingStrategy.BOOLEAN_POINTS);