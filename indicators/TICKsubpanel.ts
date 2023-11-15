# Ticksubpanel Windicator for ToS
# Written by @diveyez github.com / diveyez & ChaptGPT
# Edited by SPXVariable & S15m
#------------------------------------------- begin code
#
#------------------------------------------- keep snippets here
declare lower;

plot data = High("$tick");
Plot Data2 = Low("$tick");
plot ZeroLine = 0;
plot up = 800;
plot down = -1000;
Plot Noise = 600;
Plot Noise2 = -600;
zeroline.setDefaultColor(color.white);
Noise.setDefaultColor(color.orange);
noise2.setDefaultColor(color.red);
up.setDefaultColor(color.uptick);
down.setDefaultColor(color.uptick);
data.AssignValueColor(if data >= 800 then Color.upTICK else Color.DARK_GREEN);
data.setLineWeight(2);
Data.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
data2.assignValueColor(if data2 <= -1000 then Color.downtick else Color.red);
data2.setLineWeight(2);
Data2.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
ZeroLine.SetDefaultColor(GetColor(0));
#
#------------------------------------------- end code