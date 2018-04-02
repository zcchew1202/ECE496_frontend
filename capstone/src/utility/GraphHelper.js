export function getBarGraphData(raw) {
    // var rawData = JSON.parse(raw);
    var barPlot = [0,0,0,0,0,0];
    raw.forEach(function (element) {
        var gain= element[1] - element[0];
        if (gain && gain < -0.1) {
            barPlot[0]+=1;
        } else if (-0.1 <= gain && gain < -0.05) {
            barPlot[1]+=1;
        } else if (-0.05 <= gain && gain < 0.0) {
            barPlot[2]+=1;
        } else if (0.0 <= gain && gain < 0.05) {
            barPlot[3]+=1;
        } else if (0.05 <= gain && gain < 0.1) {
            barPlot[4]+=1;
        } else if (gain && gain > 0.1) {
            barPlot[5]+=1;
        }
    })
    return barPlot;
}