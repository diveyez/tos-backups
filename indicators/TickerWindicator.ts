declare lower;
input symbol = { default “/ ES”};
plot LineSymbol = close(symbol);
input symbol2 = { default “/ NQ”};
plot LineSymbol2 = close(symbol2);
input symbol3 = { default “/ RTY”};
plot LineSymbol3 = close(symbol3);
