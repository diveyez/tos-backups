#CDV scan
input maType = { default "SMMA", "SMA", "HMA", "EMA", "WMA"};
input maLength = 50;   #"MA Length"

def na = Double.NaN;

###############
script nz {
    input data = 0;
    input replacement = 0;
    def ret_val = if IsNaN(data) then replacement else data;
    plot return = ret_val;
}
#ma(source, length, type) =>
script ma {
    input source = close;
    input length = 0;
    input type = "SMA";
    def ma;
    ma = if type == "SMA" then SimpleMovingAvg(source, length) else
    if type == "EMA" then ExpAverage(source, length) else
    if type == "WMA" then WMA(source, length) else
    if type == "HMA" then WMA(2 * WMA(source, length / 2) - WMA(source, length), Round(Sqrt(length)))
       else if isNaN(ma[1]) then SimpleMovingAvg(source, length) else
    (ma[1] * (length - 1) + source) / length;
    plot result = ma;
}
#_rate(cond) =>
script _rate {
    input cond = 1;
    def criteria = if cond == 1 then open <= close else open > close;
    def tw = high - Max(open, close);
    def bw = Min(open, close) - low;
    def body = AbsValue(close - open);
    def ret = 0.5 * (tw + bw + (if criteria then 2 * body else 0)) / (tw + bw + body);
    def rate = if nz(ret) == 0 then 0.5 else ret;
    plot Result = rate;
}
def deltaup = volume * _rate(1);
def deltadown = volume * _rate(0);
def delta = if close >= open then deltaup else -deltadown;
def cumdelta = TotalSum(delta);

def ctl = cumdelta;
def LineClose = ExpAverage((cumdelta[1] + Max(cumdelta, cumdelta[1]) + Min(cumdelta, cumdelta[1]) + cumdelta) / 4, 5);
def LineOpen = ExpAverage(if IsNaN(LineOpen[1]) then(cumdelta[1] + cumdelta) / 2 else (LineOpen[1] + LineClose[1]) / 2, 5);

## Plot MA Lines
def AvgLine = ma(ctl, maLength, maType);
def Line = ctl;

def upCross = ctl crosses above AvgLine and LineClose >= LineOpen;
def dnCross = ctl crosses below AvgLine and LineClose < LineOpen;

plot Uptrend = upCross;
#plot Dntrend = dnCross;

