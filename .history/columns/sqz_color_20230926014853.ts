input price = CLOSE;
input length = 20;
input nK = 1.5;
input nBB = 2.0;
input alertLine = 1.0;
def squeezeHistogram = TTM_Squeeze(price, length, nK, nBB, alertLine).Histogram;
plot hist = if squeezeHistogram >= 0 then
if squeezeHistogram > squeezeHistogram[1] then 2 else 1
else if squeezeHistogram < squeezeHistogram[1] then - 2 else -1; assignBackgroundColor(if squeezeHistogram >= 0 then
if squeezeHistogram > squeezeHistogram[1] then color.CYAN else color.BLUE
else if squeezeHistogram < squeezeHistogram[1] then color.RED else color.YELLOW); hist.assignvaluecolor(if squeezeHistogram >= 0 then
if squeezeHistogram > squeezeHistogram[1] then color.CYAN else color.BLUE
else if squeezeHistogram < squeezeHistogram[1] then color.RED else color.YELLOW);