#// This work is licensed under a Attribution-NonCommercial-ShareAlike 4.0 International
#// © LuxAlgo
#https://www.tradingview.com/script/xyCba4gl-Fibonacci-Progression-with-Breaks-LUX/
#indicator("Fibonacci Progression With Breaks [LuxAlgo]",
# Converted by Sam4Cok@Samer800 - 10 / 2022 "Not exact conversion"
input src = close;
input ShowBubble = yes;
input ShowSequence = no;
input method = { default ATR, Manual };#, inline = 'inline1')
input size = 1.0;#(1., '', inline = 'inline1')
input max = 3;#(3, 'Sequence Length')
#//----
def na = Double.NaN;
script nz {
    input data = close;
    input repl = 0;
    def ret_val = if isNaN(data) then repl else data;
    plot return = ret_val;
}

#var fib = array.from(1, 1)
def dist; def avg; def fib_n; def fib_n1;

#//----

if method == method.ATR {
    dist = fold i = 1 to max with p do
        ATR(length = 200) * size * GetValue(fib_n, if ((i - 1) == 0, 1, i));
} else {
    dist = fold j = 1 to max with q do
        size * (GetValue(fib_n, if ((j - 1) == 0, 1, j)));# + GetValue(fib_n, if ((j - 1) == 0, 1, j - 1)));
}

fib_n1 = if AbsValue(src - avg[1]) > dist then fib_n1[1] + 1 else fib_n[1];
fib_n = if fib_n[1] > max + 1 then 1 else fib_n1;
avg = nz(if fib_n1 > max + 1 then src else avg[1], src);


def buy = avg > avg[1];
def sell = avg < avg[1];
def os = if buy then 1 else if sell then 0 else os[1];

def tp = if avg != avg[1] then na else if os == 1 then avg + dist else avg - dist;
def sl = if avg != avg[1] then na else if os == 0 then avg + dist else avg - dist;

#//----
def css = if os == 1 then 1 else 0;
def "0" = ohlc4;
plot "1" = avg;
"1".SetHiding(yes);
AddCloud(if css then "0" else na, "1", Color.DARK_GREEN, Color.DARK_GREEN);
AddCloud(if !css then "0" else na, "1", Color.DARK_RED, Color.DARK_RED);
#//----
AddChartBubble(ShowBubble and buy, low, "B", Color.GREEN, no);
AddChartBubble(ShowBubble and sell, high, "S", Color.RED, yes);

AddChartBubble(ShowSequence and fib_n > fib_n[1] and os == 1 and src > avg, low, fib_n - 1, Color.DARK_GREEN, no);
AddChartBubble(ShowSequence and fib_n > fib_n[1] and os == 1 and src < avg, high, fib_n - 1, Color.DARK_RED, YES);
AddChartBubble(ShowSequence and fib_n > fib_n[1] and os == 0 and src < avg, low, fib_n - 1, Color.DARK_GREEN, no);
AddChartBubble(ShowSequence and fib_n > fib_n[1] and os == 0 and src > avg, high, fib_n - 1, Color.DARK_RED, YES);

plot Target = tp;   # 'Target'
Target.SetDefaultColor(Color.GREEN);

plot Stop = sl;     # 'Stop'
Stop.SetDefaultColor(Color.RED);


#----END CODE-- -