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

function getRelevantData(raw) {
    var newData = [];
    raw.forEach(function (element) {
        var gain= element[1] - element[0];
        var newEl = [gain.toFixed(3), Number(element[2]).toFixed(3)];
        newData.push(newEl);
    })
    return newData;
}

function getMedian(values) {

    values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}

function getStandardDeviation(values){
    var avg = getAverage(values);

    var squareDiffs = values.map(function(value){
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
    });

    var avgSquareDiff = getAverage(squareDiffs);

    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}

function getAverage(arr) {
    return arr.reduce(function(a,b){return a+b;})/arr.length;
}

function getVariance(arr) {
    var average = getAverage(arr);
    return arr.reduce(function(pre, cur) {
        pre += Math.pow((cur - average), 2);
        return pre;
    }, 0)
}

function getStat(arr, idx) {
    var column = arr.map(function(row) {
        return Number(row[idx]);
    });

    return {
        min: Math.min.apply(null, column),
        max: Math.max.apply(null, column),
        avrg: getAverage(column).toFixed(3),
        median: getMedian(column).toFixed(3),
        vari: getVariance(column).toFixed(3),
        dev: getStandardDeviation(column).toFixed(3),
        samples: column.length
    }
}

export function getStats(raw) {
    if (raw.length == 0)
        return [];
    var data = getRelevantData(raw);

    return JSON.stringify({'ssim': getStat(data, 0),
    'filesize': getStat(data, 1)});
}