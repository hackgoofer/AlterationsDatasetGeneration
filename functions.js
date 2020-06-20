
$(document).on('input', '#strokeWidth', function() {
    document.getElementById("showSW").innerHTML = strokeWidth.value;
    var url_string = window.location.href;
    var url = new URL(url_string);
    url.searchParams.set('sw', strokeWidth.value);
    window.history.pushState("", "", url.href);
    setup();
});

$(document).on('input', '#verticalSize', function() {
    document.getElementById("showVS").innerHTML = verticalSize.value;
    var url_string = window.location.href;
    var url = new URL(url_string);
    url.searchParams.set('vs', verticalSize.value);
    window.history.pushState("", "", url.href);
    setup();
});

$(document).on('input', '#offsetLeft', function() {
    document.getElementById("showOL").innerHTML = offsetLeft.value;
    var url_string = window.location.href;
    var url = new URL(url_string);
    url.searchParams.set('ol', offsetLeft.value);
    window.history.pushState("", "", url.href);
    setup();
});

$(document).on('input', '#offsetRight', function() {
    document.getElementById("showOR").innerHTML = offsetRight.value;
    var url_string = window.location.href;
    var url = new URL(url_string);
    url.searchParams.set('or', offsetRight.value);
    window.history.pushState("", "", url.href);
    setup();
});

$(document).on('input', '#gridNoise', function() {
    document.getElementById("showGN").innerHTML = gridNoise.value;
    var url_string = window.location.href;
    var url = new URL(url_string);
    url.searchParams.set('gn', gridNoise.value);
    window.history.pushState("", "", url.href);
    setup();
});

$(document).on('input', '#numColumns', function() {
    document.getElementById("showNC").innerHTML = numColumns.value;
    var url_string = window.location.href;
    var url = new URL(url_string);
    url.searchParams.set('nc', numColumns.value);
    window.history.pushState("", "", url.href);
    setup();
});

$(document).on('input', '#numRows', function() {
    document.getElementById("showNR").innerHTML = numRows.value;
    var url_string = window.location.href;
    var url = new URL(url_string);
    url.searchParams.set('nr', numRows.value);
    window.history.pushState("", "", url.href);
    setup();
});

$(document).on('input', '#drop', function() {
    document.getElementById("showD").innerHTML = drop.value;
    var url_string = window.location.href;
    var url = new URL(url_string);
    url.searchParams.set('d', drop.value);
    window.history.pushState("", "", url.href);
    setup();
});

$(document).on('change', '#gridNoise', function() {
    updateTwitter();
});
$(document).on('change', '#numColumns', function() {
    updateTwitter();
});
$(document).on('change', '#numRows', function() {
    updateTwitter();
});
$(document).on('change', '#drop', function() {
    updateTwitter();
});

$(document).on('change', '#strokeWidth', function() {
    updateTwitter();
});
$(document).on('change', '#verticalSize', function() {
    updateTwitter();
});
$(document).on('change', '#offsetLeft', function() {
    updateTwitter();
});
$(document).on('change', '#offsetRight', function() {
    updateTwitter();
});
$(document).on('input', '#0', function() {
    doPerPaletteRadioButton();
});
$(document).on('input', '#1', function() {
    doPerPaletteRadioButton();
});
$(document).on('input', '#2', function() {
    doPerPaletteRadioButton();
});
$(document).on('input', '#3', function() {
    doPerPaletteRadioButton();
});
$(document).on('input', '#4', function() {
    doPerPaletteRadioButton();
});
$(document).on('input', '#5', function() {
    doPerPaletteRadioButton();
});
$(document).on('input', '#6', function() {
    doPerPaletteRadioButton();
});
$(document).on('input', '#7', function() {
    doPerPaletteRadioButton();
});
$(document).on('input', '#8', function() {
    doPerPaletteRadioButton();
});
$(document).on('input', '#9', function() {
    doPerPaletteRadioButton();
});
$(document).on('input', '#10', function() {
    doPerPaletteRadioButton();
});
$(document).on('input', '#11', function() {
    doPerPaletteRadioButton();
});
$(document).on('input', '#12', function() {
    doPerPaletteRadioButton();
});

$(document).on('input', '#e0', function() {
    doPerEdgeColorButton();
});
$(document).on('input', '#e1', function() {
    doPerEdgeColorButton();
});
$(document).on('input', '#e2', function() {
    doPerEdgeColorButton();
});
$(document).on('input', '#e3', function() {
    doPerEdgeColorButton();
});
$(document).on('input', '#e4', function() {
    doPerEdgeColorButton();
});
