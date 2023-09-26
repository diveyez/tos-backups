# 1 Feb 2019
# Created By JerryInvestor
# This strategy plots 300 EMA and show Buy and Sell Signals when price crosses 300EMA.It also shows label on_volume the top which shows if price is above or below 300EMA

def pc = close;
def lc = 300;
def dc = 0;
def showBreakoutSignalsclose = yes;


plot AEX = ExpAverage(pc[-dc], lc);
plot US = pc crosses above AEX;
plot DS = pc crosses below  AEX;
def UL = if pc > AEX  then 1 else -1;

US.SetHiding(!showBreakoutSignalsclose);
DS.SetHiding(!showBreakoutSignalsclose);
AEX.SetdefaultColor(GetColor(1));
US.SetDefaultColor(Color.UPTICK);
US.setLineWeight(5);
US.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
DS.SetDefaultColor(Color.DOWNTICK);
DS.setLineWeight(5);
DS.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
AddLabel(yes,if UL > 0 then "Above:300EMA" else "Below:300EMA", if UL > 0 then color.green else color.orange );