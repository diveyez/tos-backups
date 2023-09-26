# RSI Bands and Double RSI SMA Cross Long Term Trades
#Created by Horserider 7 / 20 / 2019


declare lower;
#RSI
input length = 14;
input over_Bought = 80;
input over_Sold = 20;
input price = close;
input averageType = AverageType.WILDERS;
input line = 50;

def NetChgAvg = MovingAverage(averageType, price - price[1], length);
def TotChgAvg = MovingAverage(averageType, AbsValue(price - price[1]), length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;

plot RSI = 50 * (ChgRatio + 1);
plot OverSold = over_Sold;
plot OverBought = over_Bought;
plot lline = 50;


# ==== THE FIVE ====
RSI.DefineColor("Positive and Up", Color.GREEN);
RSI.DefineColor("Positive and Down", Color.DARK_GREEN);
RSI.DefineColor("Negative and Down", Color.RED);
RSI.DefineColor("Negative and Up", Color.DARK_RED);
RSI.AssignValueColor(if RSI >= 50 then if RSI > RSI[1] then RSI.Color("Positive and Up") else RSI.Color("Positive and Down") else if RSI < RSI[1] then RSI.Color("Negative and Down") else RSI.Color("Negative and Up"));

OverSold.SetDefaultColor(GetColor(8));
OverBought.SetDefaultColor(GetColor(8));

# RSI 2
input length2 = 21;
input over_Bought2 = 80;
input over_Sold2 = 20;
input price2 = close;
input averageType2 = AverageType.WILDERS;

def NetChgAvg2 = MovingAverage(averageType2, price2 - price2[1], length2);
def TotChgAvg2 = MovingAverage(averageType2, AbsValue(price2 - price2[1]), length2);
def ChgRatio2 = if TotChgAvg2 != 0 then NetChgAvg2 / TotChgAvg2 else 0;

plot RSI2 = 50 * (ChgRatio2 + 1);
plot OverSold2 = over_Sold;
plot OverBought2 = over_Bought;


RSI2.DefineColor("Positive and Up", Color.GREEN);
RSI2.DefineColor("Positive and Down", Color.DARK_GREEN);
RSI2.DefineColor("Negative and Down", Color.RED);
RSI2.DefineColor("Negative and Up", Color.DARK_RED);
RSI2.AssignValueColor(if RSI2 >= 50 then if RSI2 > RSI2[1] then RSI2.Color("Positive and Up") else RSI2.Color("Positive and Down") else if RSI2 < RSI2[1] then RSI2.Color("Negative and Down") else RSI2.Color("Negative and Up"));


AddCloud(RSI, RSI2, Color.GREEN, Color.RED);


#plot 5;

input AverageTypeBB = { default SMA, EMA, HMA };
input displaceBB = 0;
input lengthBB = 20;
input Num_Dev_Dn = -2.0;
input Num_Dev_up = 2.0;

plot upperBand;
plot lowerBand;
plot midline;


switch (AverageTypeBB) {
    case SMA:
        upperBand = reference BollingerBands(RSI, displaceBB, lengthBB, Num_Dev_Dn, Num_Dev_up).UpperBand;
        lowerBand = reference BollingerBands(RSI, displaceBB, lengthBB, Num_Dev_Dn, Num_Dev_up).LowerBand;
        midline = reference BollingerBands(RSI, displaceBB, lengthBB, Num_Dev_Dn, Num_Dev_up).Midline;
    case EMA:
        upperBand = reference BollingerBands(RSI, displaceBB, lengthBB, Num_Dev_Dn, Num_Dev_up, averageType = AverageType.EXPONENTIAL).UpperBand;
        lowerBand = reference BollingerBands(RSI, displaceBB, lengthBB, Num_Dev_Dn, Num_Dev_up, averageType = AverageType.EXPONENTIAL).LowerBand;
        midline = reference BollingerBands(RSI, displaceBB, lengthBB, Num_Dev_Dn, Num_Dev_up, averageType = AverageType.EXPONENTIAL).Midline;
    case HMA:
        upperBand = reference BollingerBands(RSI, displaceBB, lengthBB, Num_Dev_Dn, Num_Dev_up, averageType = AverageType.EXPONENTIAL).UpperBand;
        lowerBand = reference BollingerBands(RSI, displaceBB, lengthBB, Num_Dev_Dn, Num_Dev_up, averageType = AverageType.EXPONENTIAL).LowerBand;
        midline = reference BollingerBands(RSI, displaceBB, lengthBB, Num_Dev_Dn, Num_Dev_up, averageType = AverageType.EXPONENTIAL).Midline;
}

upperBand.SetDefaultColor(Color.GRAY);

midline.setDefaultColor(Color.WHITE);


lowerBand.SetDefaultColor(Color.GRAY);
