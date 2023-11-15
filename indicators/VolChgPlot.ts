# Time Stamp based on last reported volume
# Mobius

def v = volume;
def epoch = getTime() / 1000;
def Y = 31556926;
def M = 2629743;
def D = 86400;
def Hr = 3600;
def Min = 60;
def Years = floor(Epoch / Y);
def Months = floor(Epoch / M);
def Days = floor(Epoch / D);
def Hours = floor(Epoch / Hr);
def Minutes = floor(Epoch / Min);
def YMD = (epoch % Y - (epoch / Y));
def year = Floor((epoch / Y)); # + 1970(beginning of Epoch)
def month = Floor(YMD / M) + 1; # Add 1 for zero period
def day = Floor(((YMD / M) - Floor(YMD / M)) * 30.42) + 1 + 1; # Adjust for DST + 1
def Day1DOW1 = getDayOfWeek((Year + 1970) * 10000 + Month * 100 + 1);
def FirstMonday = if Day1DOW1 > 1
                  then(1 + Day1DOW1)
else if Day1DOW1 == 1
                       then 1
                       else 1;
def FirstSunday = if FirstMonday == 1
                  then 5
                  else FirstMonday;
def SecondSunday = if FirstMonday == 1
                  then 10
                  else FirstMonday + 5;
def MarchDSTx = if month == 3 and day == SecondSunday
                then barNumber()
                else MarchDSTx[1];
def NovDSTx = if month == 11 and day == FirstSunday
              then barNumber()
              else NovDSTx[1];
def DST = if barNumber() >= highestAll(MarchDSTx)
          then 5 * Hr
          else if barNumber() >= highestAll(NovDSTx)
          then 4 * Hr
          else DST[1];
def HM = ((epoch / D - (floor(epoch / D))) * D) - DST;
def hour = floor(HM / Hr);
def mins = round(((HM / Hr) - (hour)) * 60, 0);
def OPRA = (Round((year + 1970), 0)) + month + day;
def DOM = getDayOfMonth(GetYYYYMMDD());
addLabel(v > 0, month + "/" + DOM + " " + hour + ":" + mins, color.white);