#Code:

plot data = if IsPut() then gamma() * -100 * open_interest() else gamma() * 100 * open_interest();
assignbackgroundcolor(if AbsValue(data) > 2000 then color.orange else color.black);
data.assignvaluecolor(if AbsValue(data) > 2000 then color.black else color.current);