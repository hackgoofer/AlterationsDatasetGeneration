var params;
var started = false;
function start(a_params) {
    params = a_params
    started = true;
    console.log("again")
    setup()
}

function download() {
    var download = document.getElementById("download");
    var image = document.getElementById("mycanvas").toDataURL("image/png");
    download.download = `carpet_ng${params.ng}_sw${params.sw}_pid${params.pid}_sce${params.sce}_seed${params.seed}_nl${params.nl}${params.name}.png`
    download.setAttribute("href", image);
    download.click()
};


// Parameters
// num_grid Name: Finer; slider from 2 to 60. Default: 16
// num_lines Name: Number of lines: slider from 2 to 7. Default: 3
// sw Name: Line width; slider from 2 to 7. Default 2
// pid Name: Palettes; options: 0 to 4. Default 0
// self_colored_edge Name: Self-colored edges; toggle 0 or 1. Default: 1

function setup() {
    if (!started) return

    //let t0 = performance.now();
    //for (var trial = 0; trial < 10; trial++) {

    var num_grid = params.ng
    var num_lines = params.nl
    var sw = params.sw
    var pid = params.pid
    var sce = params.sce
    var seed = params.seed
    Math.seedrandom(seed);


    if (sce == 0) {
        self_colored_edge = 0;
    } else {
        self_colored_edge = 1;
    }

    mp = 0.1;
    s = min(700,screen.width);

    //num_grid = 20;
    //num_lines = 3;
    //sw = 2;
    //pid = 0;
    //self_colored_edge = 1;

    let palettes = [];
    palettes[0] = [
        [30, 39, 46],
        [47, 53, 66],
        [87, 96, 111],
        [164, 176, 190],
        [206, 214, 224]
    ];
    palettes[1] = [
        [0, 0, 0],
        [255, 255, 255]
    ];
    palettes[2] = [
        [216, 78, 95],
        [2, 100, 228],
        [47, 77, 71],
        [248, 165, 74]
    ];
    palettes[3] = [
        [182, 82, 48],
        [11, 32, 59]
    ];
    palettes[4] = [
        [124, 203, 181],
        [241, 188, 82],
        [108, 182, 200],
        [186, 183, 175],
        [254, 116, 83]
    ];

    let background = [];
    background[0] = [246, 244, 240];
    background[1] = [246, 244, 240];
    background[2] = [246, 244, 240];
    background[3] = [244, 239, 220];
    background[4] = [246, 244, 240];

    let black = [];
    black[0] = background[0];
    //black[1] = [255, 255, 255];
    black[1] = [0, 0, 0];
    black[2] = background[2];
    black[3] = background[3];
    black[4] = [52, 50, 46];



    numColors = palettes[pid].length;

    lcid = round(Math.random() * (numColors - 1)); // largest component (background) color ID
    console.log(lcid)

    let cnv = createCanvas(s, s);
    cnv.id('mycanvas');
    cnv.parent('sketch-holder');
    th = Math.round((s*(1-2*mp)) / num_grid);
    console.log(th)


    pixelDensity(2); // Always use even number for pixel density. Odd numbers changes the pattern a bit. Probably because thresholds below (e.g., in "if (((pixels[i + 3] > 128))) {") don't work out the same way. Some for floating point density values.

    strokeWeight(1);

    st = Math.round((s - th*(num_grid))/2);

    xs = [];
    xe = [];
    ys = [];
    ye = [];

    x = st;
    y = st;

	// line(st-1, st-1, s-mp*s+1, st-1);
	// line(st-1, st-1, st-1, s-mp*s+1);
	// line(s-mp*s+1, s-mp*s+1, st-1, s-mp*s+1);
	// line(s-mp*s+1, s-mp*s+1, s-mp*s+1,st-1);

    for (var xi = 0; xi < num_grid; xi++) {
        y = st;

        for (var yi = 0; yi < num_grid; yi++) {

            let t = [];
            for (let i = 1; i <= num_lines; i++) {
                t[i - 1] = (i - 1) * (th / (num_lines - 1));
            }

            r = Math.random();
            //r = 0.6;
            if (r < 0.25) { // rotation 90
                for (let i = 0; i < num_lines; i++) {
                    line(x + t[i], y, x + t[i], y + th)
                    xs.push(x + t[i]);
                    ys.push(y);
                    xe.push(x + t[i]);
                    ye.push(y + th);
                }
            } else {
                if (r < 0.5) { // rotation 0
                    for (let i = 0; i < num_lines; i++) {
                        line(x, y + t[i], x + th, y + t[i])
                        xs.push(x);
                        ys.push(y + t[i]);
                        xe.push(x + th);
                        ye.push(y + t[i]);
                    }
                } else {
                    if (r < 0.75) { // rotation 45
                        for (let i = 0; i < num_lines - 1; i++) {
                            line(x, y + t[num_lines - 2 - i], x + t[i + 1], y + th)
                            xs.push(x);
                            ys.push(y + t[num_lines - 2 - i]);
                            xe.push(x + t[i + 1]);
                            ye.push(y + th);
                        }
                        for (let i = 1; i < num_lines - 1; i++) {
                            line(x + t[i], y, x + th, y + t[num_lines - i - 1])
                            xs.push(x + t[i]);
                            ys.push(y);
                            xe.push(x + th);
                            ye.push(y + t[num_lines - i - 1]);
                        }
                    } else { // rotation 135
                        for (let i = 0; i < num_lines - 1; i++) {
                            line(x, y + t[i + 1], x + t[i + 1], y)
                            xs.push(x);
                            ys.push(y + t[i + 1]);
                            xe.push(x + t[i + 1]);
                            ye.push(y);
                        }
                        for (let i = 1; i < num_lines - 1; i++) {
                            line(x + t[i], y + th, x + th, y + t[i])
                            xs.push(x + t[i]);
                            ys.push(y + th);
                            xe.push( x + th);
                            ye.push(y + t[i]);
                        }

                    }
                }
            }
            y = y+th;
        }
        x = x+th;
    }




    loadPixels();
    let d = pixelDensity();

    let fullImage = 4 * (width * d) * (height / 1 * d);
    let n = 0;
    let pic = [];
    let K = 10;
    for (let i = 0; i < fullImage; i += 4) {
        if (((pixels[i+3] > 128) && (pixels[i] < K) && (pixels[i+1] < K) && (pixels[i+2] < K) )) {
            pic[n] = 255;
        } else {
            pic[n] = 0;
        };
        n = n + 1;
    };

    //cclabels1d = BlobExtraction(pic, s * d, s * d);
    cclabels1d = BlobExtraction(pic, int(s * d), int(s * d));

    let csize = [];
    let M = 0;
    for (let i = 1; i < cclabels1d.length; i += 1) {
        if (cclabels1d[i] > M) {
            //M = max(M, cclabels1d[i]);
            M = cclabels1d[i];
        }
        if (isNaN(csize[cclabels1d[i]])) {
            csize[cclabels1d[i]] = 1;
        } else {
            csize[cclabels1d[i]]++; // = csize[cclabels1d[i]] + 1;
        };
    }


    let L = 0;
    for (let i = 1; i <= M; i += 1) {
        L = max(L, csize[i]);
    };

    let Lind = -1;
    for (let i = 1; i <= M; i += 1) {
        if (csize[i] == L) {
            Lind = i;
        };
    };

    colorsToUse = [];
    for (let c = 1; c <= M; c += 1) {
        cid = round(Math.random() * (numColors - 1));
        colorsToUse[c] = palettes[pid][cid];
        if (c == Lind) {
            largest_color = palettes[pid][lcid];
            colorsToUse[c] = largest_color;
        };
    }

    //let m = 0;
    for (let i = 0; i < fullImage; i += 4) {
        ind = cclabels1d[Math.floor(i / 4)];
        if ((ind > 0)) {
            //R = colorsToUse[ind][0];
            //G = colorsToUse[ind][1];
            //B = colorsToUse[ind][2];
            //let pink = color(R, G, B);

            pixels[i] = colorsToUse[ind][0]; //R;//red(pink);
            pixels[i + 1] = colorsToUse[ind][1]; //G;//green(pink);
            pixels[i + 2] = colorsToUse[ind][2]; //B;//blue(pink);
            pixels[i + 3] = 255; //alpha(pink);
        };
        //m = m + 1;
    }
    updatePixels();


    // fill(largest_color);
    // noStroke(); // changed
    // rect(0,0,st,s);
    // rect(0,0,s,st);
    // rect(0,s-s*mp,s,s-s*mp);
    // rect(s-s*mp,0,s-s*mp,s);
    // noFill();

    //ecid = round(Math.random() * (numColors - 1));
    if (self_colored_edge) {
        //edge_color = palettes[pid][ecid];
        edge_color = largest_color;
    } else {
        edge_color = black[pid];
    }
    stroke(edge_color);
    strokeWeight(sw);
    for (let i = 0; i < xs.length; i ++) {
        line(xs[i],ys[i],xe[i],ye[i]);
    }



    //blendMode(DARKEST);
    //fill('#ffffff');
    //noStroke();
    //rect(0, 0, s, s);







    //}

    //let t1 = performance.now();
    //console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");

    download()

}

// Original source code: https://github.com/bramp/Connected-component-labelling

"use strict";

function AssertException(message) {
    this.message = message;
}
AssertException.prototype.toString = function() {
    return 'AssertException: ' + this.message;
};

function assert(exp, message) {
    if (!exp) {
        throw new AssertException(message);
    }
}

console.log2D = function(data, w, h) {
    var offset = 0;
    var line = '';

    for (var x = 0; x < w; x++) {
        var xx = (x < 10 ? ' ' : '') + x;
        line += xx + ",";
    }
    console.log("   " + line);

    for (var y = 0; y < h; y++) {
        line = '';
        for (var x = 0; x < w; x++) {
            var d = data[offset].toFixed();
            if (d.length < 2)
                d = ' ' + d;

            line += d + ",";
            offset++;
        }

        var yy = (y < 10 ? ' ' : '') + y;
        console.log(yy + " " + line);
    }
};

/**
 * Sets sections of a array to the value
 * @param value to set
 * @param offset start offset
 * @param length
 */
Array.prototype.memset = function(offset, length, value) {
    for (var i = 0; i < length; i++) {
        this[offset++] = value;
    }
};

Array.max = function(array) {
    //return Math.max.apply( Math, array );
    var max = Number.MIN_VALUE;
    for (var i = array.length; i >= 0; i--)
        if (array[i] > max)
            max = array[i];
    return max;
};

Array.min = function(array) {
    //return Math.min.apply( Math, array );
};

/**
 * Connected-component labeling (aka blob extraction)
 * Using Algorithm developed in "A linear-time component labeling algorithm using contour tracing technique"
 * @param data
 * @param width
 * @param height
 * @returns {BlobExtraction}
 */
function BlobExtraction(data, w, h) {
    var max = w * h;

    //These are constants
    var BACKGROUND = 255;
    var FOREGROUND = 0;
    var UNSET = 0;
    var MARKED = -1;

    /*
     * 5 6 7
     * 4 P 0
     * 3 2 1
     */
    var pos = [1, w + 1, w, w - 1, -1, -w - 1, -w, -w + 1]; // Clockwise

    var label = new Array(); // Same size as data
    var c = 1; // Component index

    // We change the border to be white. We could add a pixel around
    // but we are lazy and want to do this in place.
    // Set the outer rows/cols to min
    data.memset(0, w, BACKGROUND); // Top
    data.memset(w * (h - 1), w, BACKGROUND); // Bottom

    for (var y = 1; y < h - 1; y++) {
        var offset = y * w;
        data[offset] = BACKGROUND; // Left
        data[offset + w - 1] = BACKGROUND; // Right
    }

    // Set labels to zeros
    label.memset(0, max, UNSET);

    var tracer = function(S, p) {

        for (var d = 0; d < 8; d++) {
            var q = (p + d) % 8;

            var T = S + pos[q];

            // Make sure we are inside image
            if (T < 0 || T >= max)
                continue;

            if (data[T] != BACKGROUND)
                return {
                    T: T,
                    q: q
                };

            assert(label[T] <= UNSET);
            label[T] = MARKED;
        }

        // No move
        return {
            T: S,
            q: -1
        };
    };

    /**
     *
     * @param S Offset of starting point
     * @param C label count
     * @param external Boolean Is this internal or external tracing
     */
    var contourTracing = function(S, C, external) {
        var p = external ? 7 : 3;

        // Find out our default next pos (from S)
        var tmp = tracer(S, p);
        var T2 = tmp.T;
        var q = tmp.q;

        label[S] = C;

        // Single pixel check
        if (T2 == S)
            return;

        var counter = 0;

        var Tnext = T2;
        var T = T2;

        while (T != S || Tnext != T2) {
            assert(counter++ < max, "Looped too many times!");

            label[Tnext] = C;

            T = Tnext;
            p = (q + 5) % 8;

            tmp = tracer(T, p);
            Tnext = tmp.T;
            q = tmp.q;
        }
    };

    var extract = function() {

        var y = 1; // We start at 1 to avoid looking above the image
        do {
            var x = 0;
            do {
                var offset = y * w + x;

                // We skip white pixels or previous labeled pixels
                if (data[offset] == BACKGROUND)
                    continue;

                var traced = false;

                // Step 1 - P not labelled, and above pixel is white
                if (data[offset - w] == BACKGROUND && label[offset] == UNSET) {
                    //console.log(x + "," + y + " step 1");

                    // P must be external contour
                    contourTracing(offset, c, true);
                    c++;

                    traced = true;
                }

                // Step 2 - Below pixel is white, and unmarked
                if (data[offset + w] == BACKGROUND && label[offset + w] == UNSET) {
                    //console.log(x + "," + y + " step 2");

                    // Use previous pixel label, unless this is already labelled
                    var n = label[offset - 1];
                    if (label[offset] != UNSET)
                        n = label[offset];

                    assert(n > UNSET, "Step 2: N must be set, (" + x + "," + y + ") " + n + " " + data[offset - 1]);

                    // P must be a internal contour
                    contourTracing(offset, n, false);

                    traced = true;
                }

                // Step 3 - Not dealt with in previous two steps
                if (label[offset] == UNSET) {
                    //console.log(x + "," + y + " step 3");
                    //console.log2D(label, w, h);
                    var n = label[offset - 1];

                    assert(!traced, "Step 3: We have traced, but not set the label");
                    assert(n > UNSET, "Step 3: N must be set, (" + x + "," + y + ") " + n);

                    // Assign P the value of N
                    label[offset] = n;
                }

            } while (x++ < w);
        } while (y++ < (h - 1)); // We end one before the end to to avoid looking below the image

        //console.log("labels=" + c);
        return label;
    };

    return extract();
}

/**
 * Returns an array of each blob's bounds
 * TODO do this with the BlobExtraction stage
 * @param label
 * @param width
 * @param height
 */
function BlobBounds(label, width, height) {
    var blob = [];

    var offset = 0;
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var l = label[offset++];

            if (l <= 0)
                continue;

            if (l in blob) {
                var b = blob[l];

                if (b.x2 < x)
                    b.x2 = x;

                if (b.x1 > x)
                    b.x1 = x;

                // As we are going from top down, the bottom y should increase
                b.y2 = y;

                //              blob[l] = b;
            } else {
                blob[l] = {
                    l: l,
                    x1: x,
                    y1: y,
                    x2: x,
                    y2: y
                };
            }
        }
    }

    blob[0] = {
        l: 0,
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        area: 0
    };

    for (var i = 1; i < blob.length; i++) {
        var b = blob[i];
        b.area = (b.x2 - b.x1 + 1) * (b.y2 - b.y1 + 1);
    }

    return blob;
}

/**
 * Draws a picture with each blob coloured
 * @param dest RGBA
 * @param width
 * @param height
 * @param label
 */
function BlobColouring(dest, width, height, labels) {
    var max = rect.width * rect.height;
    var colors = [];

    var maxcolors = Array.max(labels);
    var maxcolors2 = maxcolors / 2;

    // Create a simple color scale (I could do this in two loops but I'm lazy)
    for (var i = 0; i <= maxcolors; i++) {
        var r = i <= maxcolors2 ? 1 - (i / maxcolors2) : 0;
        var g = i <= maxcolors2 ? i / maxcolors2 : 1 - ((i - maxcolors2) / maxcolors2);
        var b = i <= maxcolors2 ? 0 : ((i - maxcolors2) / maxcolors2);

        colors[i] = [r * 255, g * 255, b * 255];
    }

    var offset = max - 1;
    var destOffset = offset * 4;
    do {
        var l = labels[offset];

        var color = l > 0 ? colors[l] : [0, 0, 0];
        dest[destOffset] = color[0];
        dest[destOffset + 1] = color[1];
        dest[destOffset + 2] = color[2];
        dest[destOffset + 3] = 0xff; // Alpha

        destOffset -= 4;

    } while (offset--);

}
