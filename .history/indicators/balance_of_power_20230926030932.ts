# Balance of Power Trend
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/XldP1lmA/

declare lower;

input EMA = 34;
input TEMA = 128;
input high_l = 0.1;
input low_l = -0.1;

def THL = if (high != low, high - low, 0.01);
def BullOpen = (high - open) / THL;
def BearOpen = (open - low) / THL;
def BullClose = (close - low) / THL;
def BearClose = (high - close) / THL;
def BullOC = if (close > open, (close - open) / THL, 0);
def BearOC = if (open > close, (open - close) / THL, 0);
def BullReward = (BullOpen + BullClose + BullOC) / 3;
def BearReward = (BearOpen + BearClose + BearOC) / 3;
def BOP = BullReward - BearReward;

def SmoothBOP = expAverage(BOP, EMA);
def xPrice = SmoothBOP;
def xEMA1 = expAverage(SmoothBOP, TEMA);
def xEMA2 = expAverage(xEMA1, TEMA);
def xEMA3 = expAverage(xEMA2, TEMA);
def nRes = 3 * xEMA1 - 3 * xEMA2 + xEMA3;
def SmootherBOP = nRes;

plot h = high_l;
plot l = low_l;
plot ZeroLine = 0;

plot s1 = SmoothBOP;
plot s2 = SmootherBOP;
plot s3 = SmootherBOP[2];
s1.SetDefaultColor(Color.DARK_GRAY);
#s2.SetDefaultColor(Color.BLUE);
s3.SetDefaultColor(Color.YELLOW);
#s2.SetStyle(Curve.SHORT_DASH);
s3.SetStyle(Curve.FIRM);
#s2.SetLineWeight(3);
s3.SetLineWeight(3);
addCloud(s2, s3, Color.GREEN, Color.RED);

s2.SetDefaultColor(GetColor(5));
s2.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
s2.SetLineWeight(5);
s2.DefineColor("Positive and Up", Color.GREEN);
s2.DefineColor("Positive and Down", Color.DARK_GREEN);
s2.DefineColor("Negative and Down", Color.RED);
s2.DefineColor("Negative and Up", Color.DARK_RED);
s2.AssignValueColor(if s2 >= s3 then if s2 > s2[1] then s2.color("Positive and Up") else s2.color("Positive and Down") else if s2 < s2[1] then s2.color("Negative and Down") else s2.color("Negative and Up"));

ZeroLine.SetDefaultColor(GetColor(3));
h.SetDefaultColor(GetColor(3));
l.SetDefaultColor(GetColor(3));

#Vertical Lines
def short = s2 < s3 and s2[1] > s3[1];
def long = s2 > s3 and s2[1] < s3[1];

AddVerticalLine(short, close, Color.RED, Curve.SHORT_DASH);
AddVerticalLine(long, close, Color.GREEN, Curve.SHORT_DASH);

################################################################################################
input PandL_Label = Yes;

def orderDir = CompoundValue(1, if  s2 < s3 then 1 else if s2 > s3 then - 1 else orderDir[1], 0);
def isOrder = orderDir crosses 0;

def orderCount = CompoundValue(1, if IsNaN(isOrder) then 0 else if isOrder then orderCount[1] + 1 else orderCount[1], 0);

def noBar = IsNaN(open[-1]);

def orderPrice = if isOrder then if noBar then close else open[-1] else orderPrice[1];
def profitLoss = if !isOrder or orderCount == 1 
then 0
else if orderDir < 0 then orderPrice[1] - orderPrice 
else if orderDir > 0 then orderPrice - orderPrice[1] else 0;
#else if orderDir > 0 then orderPrice[1] - orderPrice
#else if orderDir < 0 then orderPrice - orderPrice[1] else 0;
#def profitLoss = if !isOrder or orderCount == 1 then 0 else orderPrice - orderPrice[1];
def profitLossSum = CompoundValue(1, if IsNaN(isOrder) then 0 else if isOrder then profitLossSum[1] + profitLoss else profitLossSum[1], 0);

def orderWinners = CompoundValue(1, if IsNaN(isOrder) then orderWinners[1] else if orderCount > 1 and profitLoss > 0 then orderWinners[1] + 1 else orderWinners[1], 0);

AddLabel(PandL_Label, orderCount + " orders (" + AsPercent(orderWinners / orderCount) + ") | P/L " + AsDollars((profitLossSum / TickSize()) * TickValue()), if profitLossSum > 0 then Color.GREEN else if profitLossSum < 0 then Color.RED else Color.GRAY);