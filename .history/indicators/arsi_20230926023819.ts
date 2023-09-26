

# ARSI
#hint: Adaptive Relative Strength Index Indicator for Thinkscript
# Created by rad14733 for usethinkscript.com
# Based on Tradingview ARSI @https://www.tradingview.com/script/tSpy2kw2-Adaptive-RSI/
# Plots a colored line on the upper chart based on trend direction.
# v1.0 : 2021-03 - 28 : Initial Release
#https://usethinkscript.com/threads/arsi-adaptive-relative-strength-index-for-thinkorswim.6116/

input length = 14;
input price = close;
input averageType = AverageType.WILDERS;
input showLabel = no;
input showReversals = no;

def rsi = 2 * AbsValue(rsi(length, price, averageType) / 100 - 0.5);

def arsiData = rsi * price + (1 - rsi) * (if isNaN(arsiData[1]) then 0 else arsiData[1]);

plot arsi = arsiData;
arsi.DefineColor("UpTrend", Color.GREEN);
arsi.DefineColor("DownTrend", Color.RED);
arsi.SetLineWeight(3);
arsi.SetPaintingStrategy(PaintingStrategy.LINE);
arsi.SetStyle(Curve.FIRM);
arsi.AssignValueColor(if arsi > arsi[1] then arsi.Color("UpTrend") else arsi.Color("DownTrend"));


input agg1 = AggregationPeriod.TWO_DAYS;
def price1 = close(period = agg1);
input averageType1 = AverageType.WILDERS;
def rsi1 = 2 * AbsValue(rsi(length, price1, averageType) / 100 - 0.5);
def arsiData1 = rsi1 * price1 + (1 - rsi1) * (if isNaN(arsiData1[1]) then 0 else arsiData1[1]);
plot arsi1 = arsiData1;
arsi1.DefineColor("UpTrend", Color.GREEN);
arsi1.DefineColor("DownTrend", Color.RED);
arsi1.SetLineWeight(1);
arsi1.SetPaintingStrategy(PaintingStrategy.LINE);
arsi1.SetStyle(Curve.FIRM);
arsi1.AssignValueColor(if arsi1 > arsi1[1] then arsi1.Color("UpTrend") else arsi1.Color("DownTrend"));

input agg2 = AggregationPeriod.THREE_DAYS;
def price2 = close(period = agg2);
input averageType2 = AverageType.WILDERS;
def rsi2 = 2 * AbsValue(rsi(length, price2, averageType) / 100 - 0.5);
def arsiData2 = rsi2 * price2 + (1 - rsi2) * (if isNaN(arsiData2[1]) then 0 else arsiData2[1]);
plot arsi2 = arsiData2;
arsi2.DefineColor("UpTrend", Color.GREEN);
arsi2.DefineColor("DownTrend", Color.RED);
arsi2.SetLineWeight(1);
arsi2.SetPaintingStrategy(PaintingStrategy.LINE);
arsi2.SetStyle(Curve.FIRM);
arsi2.AssignValueColor(if arsi2 > arsi2[1] then arsi2.Color("UpTrend") else arsi2.Color("DownTrend"));


input agg3 = AggregationPeriod.FOUR_DAYS;
input length3 = 14;
def price3 = close(period = agg3);
input averageType3 = AverageType.WILDERS;
def rsi3 = 2 * AbsValue(rsi(length3, price3, averageType) / 100 - 0.5);
def arsiData3 = rsi3 * price3 + (1 - rsi3) * (if isNaN(arsiData3[1]) then 0 else arsiData3[1]);
plot arsi3 = arsiData3;
arsi3.DefineColor("UpTrend", Color.GREEN);
arsi3.DefineColor("DownTrend", Color.RED);
arsi3.SetLineWeight(1);
arsi3.SetPaintingStrategy(PaintingStrategy.LINE);
arsi3.SetStyle(Curve.FIRM);
arsi3.AssignValueColor(if arsi3 > arsi3[1] then arsi3.Color("UpTrend") else arsi3.Color("DownTrend"));


input agg4 = AggregationPeriod.week;
def price4 = close(period = agg4);
input averageType4 = AverageType.WILDERS;
def rsi4 = 2 * AbsValue(rsi(length, price4, averageType) / 100 - 0.5);
def arsiData4 = rsi3 * price4 + (1 - rsi4) * (if isNaN(arsiData4[1]) then 0 else arsiData4[1]);
plot arsi4 = arsiData4;
arsi4.DefineColor("UpTrend", Color.GREEN);
arsi4.DefineColor("DownTrend", Color.RED);
arsi4.SetLineWeight(1);
arsi4.SetPaintingStrategy(PaintingStrategy.LINE);
arsi4.SetStyle(Curve.FIRM);
arsi4.AssignValueColor(if arsi4 > arsi4[1] then arsi4.Color("UpTrend") else arsi4.Color("DownTrend"));

