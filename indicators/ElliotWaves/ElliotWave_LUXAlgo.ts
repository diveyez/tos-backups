
input symbol = "SPY";
// Symbol to study

global int waveCount;
global int waveLabel;
global double waveHigh;
global double waveLow;


StudyInit(
    inputs: { symbol },
    vars: { waveCount, waveLabel, waveHigh, waveLow }
);

OnBarUpdate() {


    var barHigh = bar.High;
    var barLow = bar.Low;


    waveCount = CalculateElliotWaveCount(symbol);
    waveLabel = CalculateElliotWaveLabel(symbol, waveCount);
    waveHigh = CalculateElliotWaveHigh(symbol, waveCount);
    waveLow = CalculateElliotWaveLow(symbol, waveCount);

    PlotLine(
        time: barTime,
        price: waveHigh,
        color: colorRed,
        label: "Wave " + waveLabel + " High"
    );
    PlotLine(
        time: barTime,
        price: waveLow,
        color: colorBlue,
        label: "Wave " + waveLabel + " Low"
    );
}


function CalculateElliotWaveCount(symbol) {


    var barHigh = bar.High;
    var barLow = bar.Low;
    var waveCount = Math.floor((barHigh - barLow) / 0.05);

    return waveCount;
}


function CalculateElliotWaveLabel(symbol, waveCount) {


    var barHigh = bar.High;
    var barLow = bar.Low;


    var waveLabel = "";
    if (waveCount == 1) {
        waveLabel = "A";
    } else if (waveCount == 2) {
        waveLabel = "B";
    } else if (waveCount == 3) {
        waveLabel = "C";
    } else if (waveCount == 4) {
        waveLabel = "D";
    } else if (waveCount == 5) {
        waveLabel = "E";
    }


    return waveLabel;
}


function CalculateElliotWaveHigh(symbol, waveCount) {


    var barHigh = bar.High;
    var barLow = bar.Low;

    var waveHigh = barHigh + (waveCount * 0.05);

    return waveHigh;
}


function CalculateElliotWaveLow(symbol, waveCount) {


    var barHigh = bar.High;
    var barLow = bar.Low;

    var waveLow = barLow - (waveCount * 0.05);

    return waveLow;
}