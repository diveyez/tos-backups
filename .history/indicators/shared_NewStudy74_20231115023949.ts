def price = close;
def fastLength = 8;
def slowLength = 20;
def displace = 0;
def averageType = AverageType.Exponential;

def fastAvg = MovingAverage(averageType, price[-displace], fastLength);
def slowAvg = MovingAverage(averageType, price[-displace], slowLength);

def hiLevel = if fastAvg >= slowAvg then Double.POSITIVE_INFINITY else Double.NEGATIVE_INFINITY;

AddCloud(hiLevel, -hiLevel, Color.green, Color.red);




declare upper;

input indicator = { T1, T2, default T3, T4, T5, T6 };
input price2 = close;
input period = 28;
input volumeFactor = 0.60;
input displace2 = 0;
input sign = { default plus, minus };
input Label = No;
input paintbars = No;


script _gd {
  input _price = close;
  input _period = 28;
  input _v = 0.70;
  input _sign = { default plus, minus };
  def _ema = ExpAverage(_price, _period);
  plot _gd = (_ema * (1 + _v)) - (ExpAverage(_ema, _period) * _v);
}

def _t1 = _gd(price[-displace], period, volumeFactor, sign);
def _t2 = _gd(_t1, period, volumeFactor, sign);
def _t3 = _gd(_t2, period, volumeFactor, sign);
def _t4 = _gd(_t3, period, volumeFactor, sign);
def _t5 = _gd(_t4, period, volumeFactor, sign);
def _t6 = _gd(_t5, period, volumeFactor, sign);

plot T3;
switch (indicator) {
    case T1:
        T3 = _t1;
    case T2:
        T3 = _t2;
    case T3:
        T3 = _t3;
    case T4:
        T3 = _t4;
    case T5:
        T3 = _t5;
    case T6:
        T3 = _t6;
}

T3.AssignValueColor(if T3 > T3[1] then Color.White else Color.Red);
T3.HideBubble();

AddLabel(Label, if T3 > T3[1] then "  UP  " else "  DOWN  ", if T3 > T3[1] then Color.white else Color.Red);

assignPriceColor(if paintbars and T3 < T3[1] then color.red else if paintbars and T3 > T3[1] then color.blue else color.CURRENT);
