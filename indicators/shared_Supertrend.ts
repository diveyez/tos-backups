declare upper;

input TrendCCI_Period = 50;
input atr_Period = 5;
def state = { default init, long, short };
def atr = reference ATR(atr_Period, averageType = AverageType.SIMPLE);
def cciTrendNow = CCI(TrendCCI_Period).CCI;

def cciTrendPrevious = cciTrendNow[1];
def st = 0;
plot s;

def TrendUp1;
def TrendDown1;

switch (state[1]) {
    case init:
        state = state.long;
        TrendUp1 = low - atr;
        TrendDown1 = high + atr;
        s = Double.NaN;
    case short:
        if (cciTrendNow <= st) {
            state = state.short;
            TrendUp1 = Double.NaN;
            if cciTrendPrevious > st {
                TrendDown1 = if IsNaN(TrendUp1[1]) then low[1] - atr[1] else TrendUp1[1];
            } else if ((high + atr) > TrendDown1[1] and!(cciTrendPrevious > st)) {
                TrendDown1 = TrendDown1[1];
            } else {
                TrendDown1 = high + atr;
            }
            s = TrendDown1;
        } else {
            state = state.long;
            TrendUp1 = if IsNaN(TrendUp1[1]) then TrendDown1[1] else TrendUp1[1];
            TrendDown1 = Double.NaN;
            s = TrendDown1;
        }
    case long:
        if (cciTrendNow >= st) {
            state = state.long;
            TrendDown1 = Double.NaN;
            if cciTrendPrevious < st {
                TrendUp1 = if IsNaN(TrendDown1[1]) then low - atr else TrendDown1[1];
            } else if ((low - atr) < TrendUp1[1]  and!IsNaN(TrendUp1[1])) {
                TrendUp1 = TrendUp1[1];
            } else {
                TrendUp1 = low - atr;
            }
            s = TrendUp1;
        } else {
            state = state.short;
            TrendUp1 = Double.NaN;
            TrendDown1 = if IsNaN(TrendDown1[1]) then TrendUp1[1] else TrendDown1[1];
            s = TrendUp1;
        }
}

plot s1;

if (cciTrendNow >= 0) {
    if cciTrendPrevious < 0 {
        s1 = if IsNaN(TrendDown1[1]) then low - atr else TrendDown1[1];
    } else {
        s1 = TrendUp1;
    }
} else {
    if cciTrendPrevious > 0 {
        s1 = if IsNaN(TrendUp1[1]) then low[1] - atr[1] else TrendUp1[1];
    } else {
        s1 = TrendDown1;
    }
}


s.DefineColor("up", Color.GREEN);
s.DefineColor("dn", Color.RED);
s.AssignValueColor( if cciTrendNow >= 0 then s.Color("up") else s.Color("dn") );
s.SetLineWeight(2);

s1.DefineColor("up", Color.GREEN);
s1.DefineColor("dn", Color.RED);
s1.AssignValueColor( if cciTrendNow >= 0 then s.Color("up") else s.Color("dn") );
s1.SetLineWeight(2);


plot uparrow =if (cciTrendNow >= 0   and  cciTrendNow[1] < 0, s1, double.nan);
uparrow.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
uparrow.SetDefaultColor(Color.green);

plot dnarrow =if (cciTrendNow < 0   and  cciTrendNow[1] >= 0, s1, double.nan);
dnarrow.SetPaintingStrategy(PaintingStrategy.ARROW_down);
dnarrow.SetDefaultColor(Color.red);