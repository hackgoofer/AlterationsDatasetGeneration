    // PARAMETERS
    //recursion = 0.7; // Name: Recursion; Slider: 0 to 1
    //drop_tiny = 0; // Name: Drop tiny circles; Slider: 0 to 1
    //drop_large = 0; // Name: Drop large circles; Slider: 0 to 1
    //drop_rest = 0; // Name: Drop remaining circles; Slider: 0 to 1
    //overlap = 0.75; // Name: Overlap; Slider: 0.5 to 1.5
    //nu = 0.05; // Name: Perturbation; Slider: 0 to 0.1
var params;
var started = false;
function start(a_params) {
    params = a_params
    started = true;
    setup()
}

function download() {
    var download = document.getElementById("download");
    var image = document.getElementById("mycanvas").toDataURL("image/png");
    download.download = `rc${params.rc}_dt${params.droptiny}_dl${params.droplarge}_dr${params.droprest}_nu${params.nu}_fci${params.fci}_eci${params.eci}_ew${params.ew}_seed${params.seed}_ol${params.overlap}${params.name}.png`
    download.setAttribute("href", image);
    download.click()
};

function setup() {
    if (!started) return

    var recursion = params.rc
    var drop_tiny = params.droptiny
    var drop_large = params.droplarge
    var drop_rest = params.droprest
    var overlap = params.overlap
    var nu = params.nu
    var fcolor_ind = params.fci
    var ecolor_ind = params.eci
    var edge_width = params.ew

    var seed = params.seed

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
    let num_fractal_index = 0;
    fractal(num_fractal_index, c, r, chance, recursion, drop_tiny, drop_large, drop_rest, overlap, nu, fcolor, ecolor, xs, ys, hs, ws, params.f1, params.f2, params.f3, params.f4, params.f11, params.f22, params.f33, params.f44, params.f111, params.f222, params.f333, params.f444, params.fff);

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

    function fractal(num_fractal_index, c, r, chance, recursion, drop_tiny, drop_large, drop_rest, overlap, nu, fcolor, ecolor, xs, ys, hs, ws, f1, f2, f3, f4, f11, f22, f33, f44, f111, f222, f333, f444, fff) {
        // f1 = Math.random()
        // f2 = Math.random()
        // f3 = Math.random()
        // f4 = Math.random()
        // f11 = Math.random()
        // f22 = Math.random()
        // f33 = Math.random()
        // f44 = Math.random()
        // f111 = Math.random()
        // f222 = Math.random()
        // f333 = Math.random()
        // f444 = Math.random()
        // fff = Math.random()
        // console.log("fractal")
        // console.log(fff)
        // console.log(f1)
        // console.log(f2)
        // console.log(f3)
        // console.log(f4)
        // console.log(f11)
        // console.log(f22)
        // console.log(f33)
        // console.log(f44)
        // console.log(f111)
        // console.log(f222)
        // console.log(f333)
        // console.log(f444)
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
        if (fff[num_fractal_index] > drop) {
            draw_circle = 1;
        } else {
            draw_circle = 0;
        }

        if (call_recursion) {
            num_fractal_index += 1
            fractal(num_fractal_index, [c[0] - r / 2 + (r * (f1[num_fractal_index] - 0.5) * nu) + 1, c[1] - r / 2 + (r * (f11[num_fractal_index] - 0.5) * nu) + 1], r / 2, f111[num_fractal_index], recursion, drop_tiny, drop_large, drop_rest, overlap, nu, fcolor, ecolor, xs, ys, hs, ws, f1, f2, f3, f4, f11, f22, f33, f44, f111, f222, f333, f444, fff);;

            fractal(num_fractal_index, [c[0] - r / 2 + (r * (f2[num_fractal_index] - 0.5) * nu) + 1, c[1] + r / 2 + (r * (f22[num_fractal_index] - 0.5) * nu) + 1], r / 2, f222[num_fractal_index], recursion, drop_tiny, drop_large, drop_rest, overlap, nu, fcolor, ecolor, xs, ys, hs, ws, f1, f2, f3, f4, f11, f22, f33, f44, f111, f222, f333, f444, fff);

            fractal(num_fractal_index, [c[0] + r / 2 + (r * (f3[num_fractal_index] - 0.5) * nu) + 1, c[1] - r / 2 + (r * (f33[num_fractal_index] - 0.5) * nu) + 1], r / 2, f333[num_fractal_index], recursion, drop_tiny, drop_large, drop_rest, overlap, nu, fcolor, ecolor, xs, ys, hs, ws, f1, f2, f3, f4, f11, f22, f33, f44, f111, f222, f333, f444, fff);

            fractal(num_fractal_index, [c[0] + r / 2 + (r * (f4[num_fractal_index] - 0.5) * nu) + 1, c[1] + r / 2 + (r * (f44[num_fractal_index] - 0.5) * nu) + 1], r / 2, f444[num_fractal_index], recursion, drop_tiny, drop_large, drop_rest, overlap, nu, fcolor, ecolor, xs, ys, hs, ws, f1, f2, f3, f4, f11, f22, f33, f44, f111, f222, f333, f444, fff);

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
    download()
}
