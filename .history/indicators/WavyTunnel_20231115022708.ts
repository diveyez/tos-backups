# Wavy Tunnel by Jody Samuels
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/5sylfc46-Wavy-Tunnel-by-Jody-Samuels/

def wavy_h = expAverage(high, 34);
def wavy_c = expAverage(close, 34);
def wavy_l = expAverage(low, 34);
def wavy_filter = expAverage(close, 12);

def tunnel1 = expAverage(close, 144);
def tunnel2 = expAverage(close, 169);

plot ema_h = wavy_h;
plot ema_c = wavy_c;
plot ema_l = wavy_l;
plot ema_filter = wavy_h;
plot tunnel_1 = tunnel1;
plot tunnel_2 = tunnel2;

# Need customizations down here