####Please Keep Code Intact if you share#######
##volume is 2 times greater than the OI COLUMN
##NOTE: IT ONLY WORKS AS A OPTION CHAIN COLUMN
def x2 = (volume > open_interest * 2);
def x = (volume / open_interest) * 100;
AddLabel(yes, + Round(x, 0) + "%", color.black);
assignBackgroundColor(if x2 then color.orange  else color.black);
#######################################
#######By XeoNoX via usethinkscript.com#######
#######################################

