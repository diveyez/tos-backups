# B3 Consolidation Box   v1

# -- Automates a box and shows the breakouts via price color with targets based on the box's range.

# -- In a system the gray balance line would be your stop, or you may exit on any trip back within the old box range.

# -- The color of the candles does not tell you when to be long or short, it simply tells you the last signal given.

# -- You must manage your trade targets via your own profit protection tactics.

# Intended only for the use of the person(s) to who(m) this script was originally distributed.

# User of the script assumes all risk;

# The coder and the distributers are not responsible for any loss of capital incurred upon usage of this script.

# amalia added commentary after chatting more with B3 about the study:

# The first 2 inputs will need to be set for the chart you are looking at.What you want to find is the consolidation box settings that give you actionable targeting.If the price is shooting way past the tgt6 point, you need to lower the second input.The first input should likely be either 1, 2 or 3 only.Script is based on a strategy I learned from Ben's webcasts on TOS. He was doing some futurescast thing on consolidation boxes, and I had to see if I could make it work too. My Hypothesis is it is a great little scalper... you have to be willing to take singles and doubles and forget homers. He was trading ES

declare upper;

input BarsUsedForRange = 2;

input BarsRequiredToRemainInRange = 7;

input TargetMultiple = 0.5;

input ColorPrice = yes;

input HideTargets = no;

input HideBalance = no;

input HideBoxLines = no;

input HideCloud = no;

input HideLabels = no;

# Identify Consolidation

def HH = highest(high[1], BarsUsedForRange);

def LL = lowest(low[1], BarsUsedForRange);

def maxH = highest(hh, BarsRequiredToRemainInRange);

def maxL = lowest(ll, BarsRequiredToRemainInRange);

def HHn = if maxH == maxH[1] or maxL == maxL then maxH else HHn[1];

def LLn = if maxH == maxH[1] or maxL == maxL then maxL else LLn[1];

def Bh = if high <= HHn and HHn == HHn[1] then HHn else double.nan;

def Bl = if low >= LLn and LLn == LLn[1] then LLn else double.nan;

def CountH = if isnan(Bh) or isnan(Bl) then 2 else CountH[1] + 1;

def CountL = if isnan(Bh) or isnan(Bl) then 2 else CountL[1] + 1;

def ExpH = if barnumber() == 1 then double.nan else

if CountH[-BarsRequiredToRemainInRange] >= BarsRequiredToRemainInRange then HHn[-BarsRequiredToRemainInRange] else

if High <= ExpH[1] then ExpH[1] else double.nan;

def ExpL = if barnumber() == 1 then double.nan else

if Countl[-BarsRequiredToRemainInRange] >= BarsRequiredToRemainInRange then LLn[-BarsRequiredToRemainInRange] else

if Low >= ExpL[1] then ExpL[1] else double.nan;

# Plot the High and Low of the Box; Paint Cloud

plot BoxHigh = if !isnan(expL) and!isnan(ExpH) then ExpH else double.nan;

plot BoxLow = if !isnan(expL) and!isnan(ExpH) then ExpL else double.nan;

boxhigh.setdefaultColor(color.dark_green);

BoxHigh.setpaintingStrategy(paintingStrategy.HORIZONTAL);

BoxLow.setpaintingStrategy(paintingStrategy.HORIZONTAL);

BoxLow.setdefaultColor(color.dark_red);

BoxHigh.SETHIDING(HideBoxLines);

BoxLow.SETHIDING(HideBoxLines);

addcloud(if !HideCloud then BoxHigh else double.nan, BoxLow, color.gray, color.gray);

# Things to the Right of a Finished Box

def eH = if barnumber() == 1 then double.nan else if !isnan(BoxHigh[1]) and isnan(BoxHigh) then BoxHigh[1] else eh[1];

def eL = if barnumber() == 1 then double.nan else if !isnan(BoxLow[1]) and isnan(BoxLow) then BoxLow[1] else el[1];

def diff = (eh - el) * TargetMultiple;

plot Balance = if isnan(boxhigh) and isnan(boxlow) then(eh + el) / 2 else double.nan;

plot Htgt_1 = if isnan(Boxhigh) and high >= eh then eh + diff else double.nan;

plot Htgt_2 = if isnan(Boxhigh) and high >= eh then eh + diff * 2 else double.nan;

plot Htgt_3 = if isnan(Boxhigh) and high >= eh then eh + diff * 3 else double.nan;

plot Htgt_4 = if isnan(Boxhigh) and high >= eh then eh + diff * 4 else double.nan;

plot Htgt_5 = if isnan(Boxhigh) and high >= eh then eh + diff * 5 else double.nan;

plot Htgt_6 = if isnan(Boxhigh) and high >= eh then eh + diff * 6 else double.nan;

plot Ltgt_1 = if isnan(BoxLow) and Low <= eL then eL - diff else double.nan;

plot Ltgt_2 = if isnan(BoxLow) and Low <= eL then eL - diff * 2 else double.nan;

plot Ltgt_3 = if isnan(BoxLow) and Low <= eL then eL - diff * 3 else double.nan;

plot Ltgt_4 = if isnan(BoxLow) and Low <= eL then eL - diff * 4 else double.nan;

plot Ltgt_5 = if isnan(BoxLow) and Low <= eL then eL - diff * 5 else double.nan;

plot Ltgt_6 = if isnan(BoxLow) and Low <= eL then eL - diff * 6 else double.nan;

Balance.SETHIDING(HideBalance);

Balance.setdefaultColor(CREATECOLOR(255, 255, 255));

Balance.setpaintingStrategy(PAIntingStrategy.SQUARES);

Htgt_2.setlineWeight(2);

Htgt_4.setlineWeight(2);

Htgt_6.setlineWeight(2);

Htgt_1.setdefaultColor(CREATECOLOR(50, 100, 75));

Htgt_1.setpaintingStrategy(PAIntingStrategy.DASHES);

Htgt_2.setdefaultColor(CREATECOLOR(50, 100, 75));

Htgt_2.setpaintingStrategy(paintingStrategy.HORIZONTAL);

Htgt_3.setdefaultColor(CREATECOLOR(50, 100, 75));

Htgt_3.setpaintingStrategy(PAIntingStrategy.DASHES);

Htgt_4.setdefaultColor(CREATECOLOR(50, 100, 75));

Htgt_4.setpaintingStrategy(paintingStrategy.HORIZONTAL);

Htgt_5.setdefaultColor(CREATECOLOR(50, 100, 75));

Htgt_5.setpaintingStrategy(PAIntingStrategy.DASHES);

Htgt_6.setdefaultColor(CREATECOLOR(50, 100, 75));

Htgt_6.setpaintingStrategy(paintingStrategy.HORIZONTAL);

Ltgt_2.setlineWeight(2);

Ltgt_4.setlineWeight(2);

Ltgt_6.setlineWeight(2);

Ltgt_1.setdefaultColor(CREATECOLOR(100, 50, 75));

Ltgt_1.setpaintingStrategy(PAIntingStrategy.DASHES);

Ltgt_2.setdefaultColor(CREATECOLOR(100, 50, 75));

Ltgt_2.setpaintingStrategy(paintingStrategy.HORIZONTAL);

Ltgt_3.setdefaultColor(CREATECOLOR(100, 50, 75));

Ltgt_3.setpaintingStrategy(PAIntingStrategy.DASHES);

Ltgt_4.setdefaultColor(CREATECOLOR(100, 50, 75));

Ltgt_4.setpaintingStrategy(paintingStrategy.HORIZONTAL);

Ltgt_5.setdefaultColor(CREATECOLOR(100, 50, 75));

Ltgt_5.setpaintingStrategy(PAIntingStrategy.DASHES);

Ltgt_6.setdefaultColor(CREATECOLOR(100, 50, 75));

Ltgt_6.setpaintingStrategy(paintingStrategy.HORIZONTAL);

Htgt_1.SETHIDING(HIDETARGETS);

Htgt_2.SETHIDING(HIDETARGETS);

Htgt_3.SETHIDING(HIDETARGETS);

Htgt_4.SETHIDING(HIDETARGETS);

Htgt_5.SETHIDING(HIDETARGETS);

Htgt_6.SETHIDING(HIDETARGETS);

Ltgt_1.SETHIDING(HIDETARGETS);

Ltgt_2.SETHIDING(HIDETARGETS);

Ltgt_3.SETHIDING(HIDETARGETS);

Ltgt_4.SETHIDING(HIDETARGETS);

Ltgt_5.SETHIDING(HIDETARGETS);

Ltgt_6.SETHIDING(HIDETARGETS);

# Labels

addlabel(!HideLabels, "TgtLvls = " + diff + "pts each | Bal = " + balance, if high > eh  and low < el then color.yellow else if high > eh then color.green else if low < el then color.red else color.gray);

addlabel(!HideLabels && high > eh && low < el, "OUTSIDE BAR!!", color.yellow);

addlabel(!HideLabels && high > eh && low >= el, "Long", color.green);

addlabel(!HideLabels && high <= eh && low < el, "Short", color.red);

#Price Color

assignPriceColor(if !ColorPrice then color.current else if !isnan(BoxHigh) then color.gray else

if high > eh  and low < el then color.yellow else

if high > eh then color.green else if low < el then color.red else color.gray);