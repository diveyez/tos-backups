declare lower;
def NA = Double.NaN;

input showTargetEvents = yes;
input showPosEvents = yes;
input showNegEvents = yes;
input UseAnchor = no;
input anchorDate = 20230315;
input setPercentageMove = 5;
input enableAlert = yes;
input AlertCriteria = { default Both, Positive, Negative };

input AlertType = Alert.BAR;
input AlertSound = Sound.Ding;

def YYYYMMDD = GetYYYYMMDD();
def conf = YYYYMMDD >= anchorDate;
def agg = GetAggregationPeriod();
def dayAggCheck = agg == AggregationPeriod.HOUR;
AddLabel(!dayAggCheck, "Set Aggregation to Daily", Color.YELLOW);

def prcnt = setPercentageMove / 100;
def c = close;
def change = (((c / c[1]) - 1) * 100);

#These test plots are enabled for use in custom scan condition wizard
plot targettest = AbsValue(change) >= setPercentageMove;
plot postest = change > setPercentageMove;
plot negtest = change < -setPercentageMove;
targettest.Hide();
postest.Hide();
negtest.Hide();

def Criteria;
switch (AlertCriteria) {
    case Both:
        Criteria = targettest;
    case Positive:
        Criteria = postest;
    case Negative:
        Criteria = negtest;
}

def poschange = c[1] + (c[1] * prcnt);
def negchange = c[1] - (c[1] * prcnt);
def targetcount = if UseAnchor and conf and targettest then targetcount[1] + 1  else if !UseAnchor and targettest then targetcount[1] + 1 else targetcount[1];
def poscount = if UseAnchor and conf and postest then poscount[1] + 1  else if !UseAnchor and postest then poscount[1] + 1 else poscount[1];
def negcount = if UseAnchor and conf and negtest then negcount[1] + 1  else if !UseAnchor and negtest then negcount[1] + 1 else negcount[1];
def prevtargetval = if targetcount == 1 then targetcount[1] else NA;
def prevposval = if poscount == 1 then poscount[1] else NA;
def prevnegval = if negcount == 1 then negcount[1] else NA;
def sincelasttarget = if UseAnchor and conf and targettest[1] and targettest then 1 else if UseAnchor and conf and targettest[1] and!targettest then 2 else if UseAnchor and conf and!targettest then sincelasttarget[1] + 1 else if !UseAnchor and targettest[1] and targettest then 1 else if !UseAnchor and targettest[1] and!targettest then 2 else if !UseAnchor and!targettest then sincelasttarget[1] + 1 else sincelasttarget[1];
def sincelastpos = if UseAnchor and conf and postest[1] and postest then 1 else if UseAnchor and conf and postest[1] and!postest then 2 else if UseAnchor and conf and!postest then sincelastpos[1] + 1 else if !UseAnchor and postest[1] and postest then 1 else if !UseAnchor and postest[1] and!postest then 2 else if !UseAnchor and!postest then sincelastpos[1] + 1 else sincelastpos[1];
def sincelastneg = if UseAnchor and conf and negtest[1] and negtest then 1 else if UseAnchor and conf and negtest[1] and!negtest then 2 else if UseAnchor and conf and!negtest then sincelastneg[1] + 1 else if !UseAnchor and negtest[1] and negtest then 1 else if !UseAnchor and negtest[1] and!negtest then 2 else if !UseAnchor and!negtest then sincelastneg[1] + 1 else sincelastneg[1];
def targetvalstore = if targettest then sincelasttarget else NA;
def posvalstore = if postest then sincelastpos else NA;
def negvalstore = if negtest then sincelastneg else NA;
def sumtarget = if UseAnchor and conf and targettest then sumtarget[1] + sincelasttarget else if !UseAnchor and targettest then sumtarget[1] + sincelasttarget else sumtarget[1];
def sumpos = if UseAnchor and conf and postest then sumpos[1] + sincelastpos else if !UseAnchor and postest then sumpos[1] + sincelastpos else sumpos[1];
def sumneg = if UseAnchor and conf and negtest then sumneg[1] + sincelastneg else if !UseAnchor and negtest then sumneg[1] + sincelastneg else sumneg[1];

#These avgs are set as plots for use in custom scan condition wizard
plot targetavg = sumtarget / targetcount;
plot posavg = sumpos / poscount;
plot negavg = sumneg / negcount;
targetavg.Hide();
targetavg.HideTitle();
posavg.Hide();
posavg.HideTitle();
negavg.Hide();
negavg.HideTitle();

#PLOTS
plot posline = setPercentageMove;
plot negline = -setPercentageMove;
plot targetChange = if showTargetEvents and targettest then 0 else NA;
plot pos = if showPosEvents and change > 0 then change else NA;
plot neg = if showNegEvents and change < 0 then change else NA;

#CHART BUBBLES
AddChartBubble(showTargetEvents and targettest, targetChange, sincelasttarget, Color.YELLOW, yes);
AddChartBubble(showPosEvents and postest, posline, sincelastpos, Color.GREEN, yes);
AddChartBubble(showNegEvents and negtest, negline, sincelastneg, Color.RED, no);

#LABELS
AddLabel(1, "Target +/- " + setPercentageMove + "%", Color.WHITE);
AddLabel(1, " ", Color.BLACK);
AddLabel(1, "Change " + Round(change, 2) + "%", if postest then Color.GREEN else if negtest then Color.RED else Color.GRAY);
AddLabel(1, "Prev " + Round(change[1], 2) + "%", if postest then Color.GREEN else if negtest then Color.RED else Color.GRAY);
AddLabel(1, " ", Color.BLACK);
AddLabel(showTargetEvents, "TotalTargetEvents | " + targetcount, Color.YELLOW);
AddLabel(showPosEvents, "TotalPosEvents | " + poscount, Color.GREEN);
AddLabel(showNegEvents, "TotalNegEvents | " + negcount, Color.RED);
AddLabel(1, " ", Color.BLACK);
AddLabel(showTargetEvents, "Days Since Last : " + sincelasttarget + " | Avg : " + Round(targetavg, 0) + " | High : " + HighestAll(targetvalstore) + " | Low : " + LowestAll(targetvalstore), Color.YELLOW);
AddLabel(showPosEvents, "Days Since Last : " + sincelastpos + " | Avg : " + Round(posavg, 0) + " | High : " + HighestAll(posvalstore) + " | Low : " + LowestAll(posvalstore), Color.GREEN);
AddLabel(showNegEvents, "Days Since Last : " + sincelastneg + " | Avg : " + Round(negavg, 0) + " | High : " + HighestAll(negvalstore) + " | Low : " + LowestAll(negvalstore), Color.RED);

#ALERT
Alert(enableAlert and Criteria, "% Change Criteria Met", AlertType, AlertSound);

#FORMAT
targettest.SetDefaultColor(Color.YELLOW);
postest.SetDefaultColor(Color.GREEN);
negtest.SetDefaultColor(Color.RED);
pos.AssignValueColor(if !postest and change > 0 then Color.DARK_GREEN else if postest then Color.GREEN else Color.GRAY);
neg.AssignValueColor(if !negtest and change < 0 then Color.DARK_RED else if negtest then Color.RED else Color.GRAY);
pos.SetPaintingStrategy(PaintingStrategy.SQUARED_HISTOGRAM);
neg.SetPaintingStrategy(PaintingStrategy.SQUARED_HISTOGRAM);
pos.SetHiding(!showPosEvents);
neg.SetHiding(!showNegEvents);
posline.SetDefaultColor(Color.DARK_GRAY);
negline.SetDefaultColor(Color.DARK_GRAY);
targetChange.SetHiding(!showTargetEvents);
targetChange.SetDefaultColor(Color.YELLOW);
targetChange.SetPaintingStrategy(PaintingStrategy.POINTS);