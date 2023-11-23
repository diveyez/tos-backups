##ICT Killzones Study
## This study plots the market open and market closes for the different world markets
## and the expected price during the average price for the symbol at the close for each world market.

## Input Parameters
input symbol = "SPY"; ## Symbol to study

## Global Variables
global double expectedPrice;
global int marketIndex;

## Study Initialization
StudyInit(
    inputs: { symbol },
    vars: { expectedPrice, marketIndex }
);

## Study OnBarUpdate
OnBarUpdate(
    time: barTime,
    open: barOpen,
    high: barHigh,
    low: barLow,
    close: barClose
) {
## Get the current market index
    marketIndex = GetMarketIndex(symbol);
Code snippet

## Calculate the expected price
    expectedPrice = CalculateExpectedPrice(symbol, marketIndex);

## Plot the market open and market close
    PlotBar(
        time: barTime,
        open: barOpen,
        high: barHigh,
        low: barLow,
        close: barClose,
        color: colorDefault
    );

## Plot the expected price
    PlotLine(
        time: barTime,
        price: expectedPrice,
        color: colorRed
    );

}

// CalculateExpectedPrice
//
// Calculates the expected price for the symbol at the close for the current market index.
//
// Parameters:
// symbol - The symbol to calculate the expected price for.
// marketIndex - The current market index.
//
// Returns:
// The expected price for the symbol at the close for the current market index.

function CalculateExpectedPrice(symbol, marketIndex) {
// Get the market open and market close for the current market index.
double marketOpen = GetMarketOpen(symbol, marketIndex);
double marketClose = GetMarketClose(symbol, marketIndex);
Code snippet

## Calculate the expected price.
double expectedPrice = (marketOpen + marketClose) / 2;

    return expectedPrice;


}