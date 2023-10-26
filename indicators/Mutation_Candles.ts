# Mutation Candles
# Assembled by BenTen at useThinkScript.com
# Converted from

input TiLe = 3;
input SoNen = 14;

def DotBien = volume > TiLe * simpleMovingAvg(volume, SoNen)[1];

assignPriceColor(if DotBien then Color.White else Color.Blue);