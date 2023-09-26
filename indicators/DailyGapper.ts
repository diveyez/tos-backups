declare hide_on_intraday;
input Detect_Gaps_By = { default "percent", "dollars"};
input Min_Gap_Size = 1.0;
input NumberOfGapsToTrack = { default "3", "2", "1"};

def show_gap_mid_line = yes;
def show_half_gap_move_up = yes;
def show_half_gap_move_down = yes;
def show_full_gap_move_up = yes;
def show_full_gap_move_down = yes;

# Decide how many simultaneous gaps to track
def show_gap2;
def show_gap3;
switch (numberOfGapsToTrack) {
    case "3":
        show_gap2 = yes;
        show_gap3 = yes;
    case "2":
        show_gap2 = yes;
        show_gap3 = no;
    case "1":
        show_gap2 = no;
        show_gap3 = no;
};

# Define Candle Body
def bodyTop = Max(high, low);
def bodyBottom = Min(high, low);

# Define Gap Lines
def GapTop = Max(bodyBottom, bodyBottom[1]);
def GapBottom = Min(bodyTop, bodyTop[1]);
def GapMiddle = if show_gap_mid_line then(GapTop + GapBottom) / 2 else Double.NaN;
def GapHalfUp = if show_half_gap_move_up then GapTop + (GapTop - GapBottom) / 2 else Double.NaN;
def GapHalfDown = if show_half_gap_move_down then GapBottom - (GapTop - GapBottom) / 2 else Double.NaN;
def GapFullUp = if show_full_gap_move_up then GapTop + (GapTop - GapBottom) else Double.NaN;
def GapFullDown = if show_full_gap_move_down then GapBottom - (GapTop - GapBottom) else Double.NaN;

# Define a gap and its direction
def MinGapSize;
switch (Detect_Gaps_By) {
    case "percent":
        MinGapSize = Min(close[1] * (Min_Gap_Size / 100), 5);
    case "dollars":
        MinGapSize = Min_Gap_Size;
};

def GapUp = bodyBottom - bodyTop[1] >= MinGapSize;
def GapDown = bodyTop - bodyBottom[1] <= -MinGapSize;
def isGap = GapUp or GapDown;

# Define recursive variables
# Set variables for the first gap
rec gt1 = if isGap then GapTop else gt1[1];
rec gb1 = if isGap then GapBottom else gb1[1];
rec gm1 = if isGap then GapMiddle else gm1[1];
rec ghu1 = if isGap then GapHalfUp else ghu1[1];
rec ghd1 = if isGap then GapHalfDown else ghd1[1];
rec gfu1 = if isGap then GapFullUp else gfu1[1];
rec gfd1 = if isGap then GapFullDown else gfd1[1];

# Plot Gap Lines
# plot the first gap
plot TopLine = if gt1 == 0 then double.nan else gt1;
plot BottomLine = if gb1 == 0 then double.nan else gb1;

TopLine.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
TopLine.setdefaultColor(color.Cyan);
TopLine.SetLineWeight(1);

BottomLine.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
BottomLine.setDefaultColor(color.Cyan);
BottomLine.SetLineWeight(1);

addcloud(TopLine, BottomLine, color.CYAN);