# Gamma Exposure at each strike is calculated by the formula option gamma * open interest * 100(calls, x - 100 for puts)

plot data = if IsPut() then gamma() * -100 * open_interest() else gamma() * 100 * open_interest();




assignbackgroundcolor(if absvalue(data) > 1000000 then color.white else if AbsValue(data) > 500000 then color.gray else if absvalue(data) > 200000 then color.green else if absvalue(data) > 100000 then color.yellow else if AbsValue(data) > 50000 then color.light_orange else if AbsValue(data) > 20000 then color.cyan else if AbsValue(data) > 9999 then createcolor(250, 150, 100) else if AbsValue(data) > 999 then color.light_gray else color.black);










data.assignvaluecolor(if absvalue(data) > 200000 then color.blue else if absvalue(data) > 100000 then color.light_red else if AbsValue(data) > 999 then color.black else color.current);


#plot data = if IsPut() then gamma() * -100 * open_interest() else gamma() * #100 * open_interest();
#assignbackgroundcolor(if AbsValue(data) > 2000 then #createcolor(250, 150, 100) else color.black);
#data.assignvaluecolor(if AbsValue(data) > 2000 then color.black else #color.current);