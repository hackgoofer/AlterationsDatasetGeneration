    // PARAMETERS
    //recursion = 0.7; // Name: Recursion; Slider: 0 to 1
    //drop_tiny = 0; // Name: Drop tiny circles; Slider: 0 to 1
    //drop_large = 0; // Name: Drop large circles; Slider: 0 to 1
    //drop_rest = 0; // Name: Drop remaining circles; Slider: 0 to 1
    //overlap = 0.75; // Name: Overlap; Slider: 0.5 to 1.5
    //nu = 0.05; // Name: Perturbation; Slider: 0 to 0.1


function setup() {

    var recursion = document.getElementById("recSlider").value;
    var drop_tiny = document.getElementById("dtSlider").value;
    var drop_large = document.getElementById("dlSlider").value;
    var drop_rest = document.getElementById("drSlider").value;
    var overlap = document.getElementById("ovSlider").value;
    var nu = document.getElementById("nuSlider").value;
    var fcolor_ind = $("input[name='palette']:checked").val();
    var ecolor_ind = $("input[name='ecolor']:checked").val();
    var edge_width = document.getElementById("widthSlider").value;

    var url_string = window.location.href;
    var url = new URL(url_string);
    var seed = url.searchParams.get("seed");

    Math.seedrandom(seed);


    if (fcolor_ind == -1) {
        fcolor = 'none'
    } else {
        fcolors = [
            [204, 41, 41],
            [64, 85, 128],
            [41, 128, 185],
            [22, 160, 133],
            [192, 57, 43],
            [47, 53, 66],
            [124, 203, 181],
            [241, 188, 82],
            [108, 182, 200],
            [254, 116, 83],
            [47, 53, 66],
            [255, 255, 255]
        ];
        fcolor = fcolors[fcolor_ind];
    }
    //fcolor = [108,182,200]; //'none' //Name: Color// Options: None or any of these colors: [[204,41,41];[64,85,128];[41,128,185];[22,160,133];[192,57,43];[47,53,66];[124,203,181];[241,188,82];[108,182,200];[254,116,83];[47,53,66];[255, 255, 255]]

    if (ecolor_ind == 0) {
        ecolor = 'none';
    };
    if (ecolor_ind == 1) {
        ecolor = 'black';
    };
    if (ecolor_ind == 2) {
        ecolor = 'white';
    }

    //ecolor =  'none';//'none','black' ([47,53,66]),'white' ([255, 255, 255]) // Name: Edge; Options: None, Black, White
    //edge_width = 1; // Name: Edge thickness; Slider: 1 to 10

    canvassize = min(700,screen.width);
    // pixelDensity(8);
    //canvassize = 700;
    let cnv = createCanvas(canvassize, canvassize);
    fill('#ffffff');
    noStroke();
    rect(0, 0, canvassize, canvassize);
    cnv.id('mycanvas');
    cnv.parent('sketch-holder');

    black = [47, 53, 66];
    white = [255, 255, 255];

    K = 1;
    if (canvassize<600) {
        K = 2;
    }

    s = 256/K;
    c = [canvassize / 2, canvassize / 2];
    r = s;
    chance = 0; // 0 to 1
    let xs = [];
    let ys = [];
    let hs = [];
    let ws = [];
    fractal(c, r, chance, recursion, drop_tiny, drop_large, drop_rest, overlap, nu, fcolor, ecolor, xs, ys, hs, ws);

    // Draw strokes now that all filled circles have been drawn during the call to fractal. Could also draw filled circles now to make code cleaner.

    noFill();
    strokeWeight(edge_width);
    if (ecolor == 'white') {
        blendMode(LIGHTEST);
    };
    if (ecolor == 'black') {
        blendMode(DARKEST);
    };
    if (ecolor == 'none') {
        noStroke();
    };

    for (i=0; i<=xs.length; i++) {
        ellipse(xs[i],ys[i],hs[i],ws[i]);
    }

    function fractal(c, r, chance, recursion, drop_tiny, drop_large, drop_rest, overlap, nu, fcolor, ecolor) {
        k = overlap * 2;

        if (r > 32/K) {
            chance = -0.1;
        }
        if (r == 4/K) {
            chance = 1;
        }

        drop = drop_rest;
        if (r == 4/K) {
            drop = drop_tiny;
        }
        if (r == 32/K) {
            drop = drop_large;
        }

        call_recursion = 0;
        if (chance < recursion) {
            call_recursion = 1;
            draw_circle = 0;
        };
        if (Math.random() > drop) {
            draw_circle = 1;
        } else {
            draw_circle = 0;
        }

        if (call_recursion) {
            fractal([c[0] - r / 2 + (r * (Math.random() - 0.5) * nu) + 1, c[1] - r / 2 + (r * (Math.random() - 0.5) * nu) + 1], r / 2, Math.random(), recursion, drop_tiny, drop_large, drop_rest, overlap, nu, fcolor, ecolor, xs, ys, hs, ws);;

            fractal([c[0] - r / 2 + (r * (Math.random() - 0.5) * nu) + 1, c[1] + r / 2 + (r * (Math.random() - 0.5) * nu) + 1], r / 2, Math.random(), recursion, drop_tiny, drop_large, drop_rest, overlap, nu, fcolor, ecolor, xs, ys, hs, ws);

            fractal([c[0] + r / 2 + (r * (Math.random() - 0.5) * nu) + 1, c[1] - r / 2 + (r * (Math.random() - 0.5) * nu) + 1], r / 2, Math.random(), recursion, drop_tiny, drop_large, drop_rest, overlap, nu, fcolor, ecolor, xs, ys, hs, ws);

            fractal([c[0] + r / 2 + (r * (Math.random() - 0.5) * nu) + 1, c[1] + r / 2 + (r * (Math.random() - 0.5) * nu) + 1], r / 2, Math.random(), recursion, drop_tiny, drop_large, drop_rest, overlap, nu, fcolor, ecolor, xs, ys, hs, ws);

        } else {
            if (draw_circle) {

                if (fcolor == 'none') {
                    noFill();
                } else {
                    fill(fcolor);
                }
                if (ecolor == 'none') {
                    noStroke();
                } else {
                    stroke(ecolor);
                }
                ellipse(c[0], c[1], overlap * r * 2, overlap * r * 2);
                // Collect all the locations and sizes so can draw strokes later. Drawing them now will lead to them getting partially suppressed by the filled circles coming later.
                xs.push(c[0]);
                ys.push(c[1]);
                hs.push(overlap * r * 2);
                ws.push(overlap * r * 2);
            };
        }
    };
}
