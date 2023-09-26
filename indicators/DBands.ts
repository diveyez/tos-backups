# TD Ameritrade IP Company, Inc. (c) 2007 - 2022
# Edited by @diveyez

input Length = 600;

plot UpperBand = Average(data = High * (0.75 + 7 * (High - Low) / (High + Low)), length = Length);

plot MidPoint = Average(data = close, length = Length);

plot LowerBand = Average(data = Low * (0.75 - 7 * (High - Low) / (High + Low)), length = Length);