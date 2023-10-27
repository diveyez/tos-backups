# Put Call Ratio
# Mobius

declare lower;
 
    def series = 1;
    def CurrentYear = GetYear();
    def CurrentMonth = GetMonth();
    def CurrentDOM = GetDayOfMonth(GetYYYYMMDD());
    def Day1DOW1 = GetDayOfWeek(CurrentYear * 10000 + CurrentMonth * 100 + 1);
    def FirstFridayDOM1 = if Day1DOW1 < 6
                          then 6 - Day1DOW1
                          else if Day1DOW1 == 6
                          then 7
                          else 6;
    def RollDOM = FirstFridayDOM1 + 14;
    def ExpMonth1 = if RollDOM > CurrentDOM
                    then CurrentMonth + series - 1
                    else CurrentMonth + series;
    def ExpMonth2 = if ExpMonth1 > 12
                    then ExpMonth1 - 12
                    else ExpMonth1;
    def ExpYear = if ExpMonth1 > 12
                  then CurrentYear + 1
                  else CurrentYear;
    def Day1DOW = GetDayOfWeek(ExpYear * 10000 + ExpMonth2 * 100 + 1);
    def FirstFridayDOM = if Day1DOW < 6
                         then 6 - Day1DOW
                         else if Day1DOW == 6
                         then 7
                         else 6;
    def ExpDOM = FirstFridayDOM + 14;
    def date = ExpYear * 10000 + ExpMonth2 * 100 + ExpDOM + 1;
    def PutVolume_SPY = if isNaN(volume(symbol = GetATMOption("SPY", date, OptionClass.PUT)))
                        then PutVolume_SPY[1]
                        else volume(symbol = GetATMOption("SPY", date, OptionClass.PUT));
    def PutVolume_QQQ = if isNaN(volume(symbol = GetATMOption("QQQ", date, OptionClass.PUT)))
                        then PutVolume_QQQ[1]
                        else volume(symbol = GetATMOption("QQQ", date, OptionClass.PUT));
    def PutVolume_DIA = if isNaN(volume(symbol = GetATMOption("DIA", date, OptionClass.PUT)))
                        then PutVolume_DIA[1]
                        else volume(symbol = GetATMOption("DIA", date, OptionClass.PUT));;
    def CallVolume_SPY = if isNaN(volume(symbol = GetATMOption("SPY", date, OptionClass.CALL)))
                         then CallVolume_SPY[1]
                         else volume(symbol = GetATMOption("SPY", date, OptionClass.CALL));
    def CallVolume_QQQ = if isNaN(volume(symbol = GetATMOption("QQQ", date, OptionClass.CALL)))
                         then CallVolume_QQQ[1]
                         else volume(symbol = GetATMOption("QQQ", date, OptionClass.CALL));
    def CallVolume_DIA = if isNaN(volume(symbol = GetATMOption("DIA", date, OptionClass.CALL)))
                         then CallVolume_DIA[1]
                         else volume(symbol = GetATMOption("DIA", date, OptionClass.CALL));
    def PutTotal = PutVolume_SPY + PutVolume_QQQ + PutVolume_DIA;
    def CallTotal = CallVolume_SPY + CallVolume_QQQ + CallVolume_DIA;
AddLabel(yes, (concat("Ex date: ",
    concat(ExpMonth2,
        concat("/",
            concat(ExpDOM,
                concat("/",
                    concat(AsPrice(ExpYear), ""))))))), color.white);
   def Strike_SPY = Round(close(symbol = "SPY") / .5, 0) * .5;
   def Strike_QQQ = Round(close(symbol = "QQQ") / .5, 0) * .5;
   def Strike_DIA = Round(close(symbol = "DIA") / .5, 0) * .5;
AddLabel(1, "Strikes SPY: $" + Strike_SPY + " QQQ: $" + Strike_QQQ + " DIA: $" + Strike_DIA, Color.White);
AddLabel(yes, Concat("ATM Put/Call Ratio ", Round(PutTotal / CallTotal, 2)) + " / 1", Color.White);
   def PV = if IsNaN(PutTotal) 
            then PV[1] 
            else PutTotal;
   def CV = if IsNaN(CallTotal) 
            then CV[1] 
            else CallTotal;
 
plot ChangeRatio = if isNaN(close) then Double.NaN else PV / CV;
ChangeRatio.AssignValueColor(if ChangeRatio > 1
                 then color.green
                 else color.red);
plot AvgCR = if isNaN(close) then Double.NaN else Average(ChangeRatio, 5);
AvgCR.SetDefaultColor(Color.Yellow);
plot Neutral = if isNaN(close) then Double.NaN else 1;
Neutral.SetDefaultColor(Color.Gray);