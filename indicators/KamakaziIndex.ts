#AAPL   4, 500,000     13.8 %
    #KO     4,000,000     12.3 %
        #MCD    4,000,000     12.3 %
            #NKE   20,000,000     61.4 %
                #KRX       66,000     0.2 % --IPO and not enough weight.Left out for now

declare lower;

plot x = close("AAPL") * .138 +
    close("KO") * .123 +
    close("MCD") * .123 +
    close("NKE") * .614;

x.assignvalueColor(if x >= x[1] then color.greeN else color.red);
