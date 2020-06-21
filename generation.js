// function start() {
//     var tool = $('#tools').find(":selected").text();
//     $.ajax({
//         url: `${tool}.js`,
//         dataType: "script",
//         success: function() {
//             kick_off_generation()
//         }
//     });
// }

function random_number(min, max, step) {
    var delta, range, rand;
    delta = max - min + step;
    range = delta / step;
    rand = Math.random();
    rand *= range;
    rand = Math.floor(rand);
    rand *= step;
    rand += min;
    return Number(rand.toFixed(2));
}


function generate() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var seed = Math.random();
    url.searchParams.set('seed',seed);
    window.history.pushState("", "", url.href);
    setup();
    updateTwitter();
};

function reset() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    url.searchParams.set('gn', gndefault);
    url.searchParams.set('nc', ncdefault);
    url.searchParams.set('nr', nrdefault);
    url.searchParams.set('d', ddefault);
    url.searchParams.set('pid', piddefault);
    url.searchParams.set('eid', eiddefault);
    url.searchParams.set('sw', swdefault);
    url.searchParams.set('vs', vsdefault);
    url.searchParams.set('ol', oldefault);
    url.searchParams.set('or', ordefault);
    url.searchParams.set('seed', seeddefault);
    document.getElementById(piddefault).checked = true;
    document.getElementById(['e'+eiddefault]).checked = true;
    document.getElementById("gridNoise").value = Number(gndefault);
    document.getElementById("showGN").innerHTML = gridNoise.value;
    document.getElementById("numColumns").value = Number(ncdefault);
    document.getElementById("showNC").innerHTML = numColumns.value;
    document.getElementById("numRows").value = Number(nrdefault);
    document.getElementById("showNR").innerHTML = numRows.value;
    document.getElementById("drop").value = Number(ddefault);
    document.getElementById("showD").innerHTML = drop.value;
    document.getElementById("strokeWidth").value = Number(swdefault);
    document.getElementById("showSW").innerHTML = strokeWidth.value;
    document.getElementById("verticalSize").value = Number(vsdefault);
    document.getElementById("showVS").innerHTML = verticalSize.value;
    document.getElementById("offsetLeft").value = Number(oldefault);
    document.getElementById("showOL").innerHTML = offsetLeft.value;
    document.getElementById("offsetRight").value = Number(ordefault);
    document.getElementById("showOR").innerHTML = offsetRight.value;
    window.history.pushState("", "", url.href);
    setup();
    updateTwitter();
};
