# Label color changes according to value of ADX: 
#.Green if > 25 
#.YELLOW if 20 to 25 #.CYAN if <20 #

input length = 14;

plot currentADX = ADX(length);

currentADX.hide();

DefineGlobalColor("ADXHigh", CreateColor(50, 205, 50)); DefineGlobalColor("ADXLow", Color.CYAN); DefineGlobalColor("ADXMid", Color.YELLOW);

AddLabel(yes, (Concat("ADX = ", Round(currentADX, 1))),if currentADX > 25 then GlobalColor("ADXHigh") else if currentADX < 20 then GlobalColor("ADXLow") else GlobalColor("ADXMid"));