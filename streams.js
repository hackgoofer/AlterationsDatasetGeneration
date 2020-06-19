var input;
var img;
var visitedUpload = 0;
var hiddenOnce = 0;
var smallNum = math.pow(10, -16);
var imageChanged = 1;
var streaks;
var K;
var textureSetsK = 1;

function setup() {

    s = min(500, screen.width);
    let cnv = createCanvas(s, s);
    cnv.id('mycanvas');
    cnv.parent('sketch-holder');
    pixelDensity(1);

}

function processImage() {

    var url_string = window.location.href;
    var url = new URL(url_string);
    var seed = url.searchParams.get("seed");

    Math.seedrandom(seed);

    var pid = $("input[name='palette']:checked").val();


    if (pid == 19) {
        if (visitedUpload == 0) {
            var firstCall = 1;
            instantiateInput(firstCall);
        }
        visitedUpload = 1;
    } else {
        if (imageChanged == 1) {
            img = loadImage("streaks_imgs/im" + pid + ".png");
        }
    }


    setTimeout(function() {
        if (img) {
            image(img, 0, 0, width, height);
        }
        loadPixels();

        var d = pixelDensity();


        if (pid > 0) {


            if (textureSetsK==1) {
            var Ktype = 6 - Number(document.getElementById("Kvalue").value);

            if (Ktype == 1) {
                K = (Math.random() * 2) + 1;
            }
            if (Ktype == 2) {
                K = (Math.random() * 6) + 4;
            }
            if (Ktype == 3) {
                K = (Math.random() * 10) + 11;
            }
            if (Ktype == 4) {
                K = (Math.random() * 8) + 22;
            }
            if (Ktype == 5) {
                K = math.pow(10, 6);
            }

            K = K * (s * d / 800) * 16;

            // textureSetsK = 0;

            }

            var R = new Array(s * d);
            var i;
            for (i = 0; i < s * d; i++) {
                R[i] = new Array(s * d);
            }

            var G = new Array(s * d);
            for (i = 0; i < s * d; i++) {
                G[i] = new Array(s * d);
            }

            var B = new Array(s * d);
            for (i = 0; i < s * d; i++) {
                B[i] = new Array(s * d);
            }

            var x;
            var y;
            for (x = 0; x < s * d; x++) {
                for (y = 0; y < s * d; y++) {
                    let off = (y * s * d + x) * 4;
                    var smallRandNum = Math.random() * smallNum;
                    // adding noise to pixel so that the median operation is faster. Otherwise with a lot of identical values (e.g., if image has a white background), the median operation is super slow.
                    R[x][y] = pixels[off]; + smallRandNum;
                    G[x][y] = pixels[off + 1]; + smallRandNum;
                    B[x][y] = pixels[off + 2]; + smallRandNum;
                }
            }


            var numBins = math.pow(2, Number(document.getElementById("NumBins").value));
            M = 0.9;

            var useR = new Array(numBins);
            var useG = new Array(numBins);
            var useB = new Array(numBins);

            var p = new Array(numBins + 1);

            var x;
            for (x = 0; x < s * d; x++) {

                p[0] = 0;
                var n;
                for (n = 1; n <= numBins; n++) {
                    pr = (Math.random() * 0.8) + 0.1; //(0.1, 0.9);
                    p[n] = p[n - 1] + pr;
                }

                for (n = 1; n < numBins; n++) {
                    p[n] = p[n] / p[(p.length) - 1];
                    p[n] = math.round(p[n] * s * d);
                    if ((n % 2) == 0) {
                        if ((p[n] % 2) == 1) {
                            p[n] = p[n] - 1;
                        }
                    } else {
                        if ((p[n] % 2) == 0) {
                            p[n] = p[n] - 1;
                        }
                    }

                }
                p[numBins] = s * d;

                for (n = 0; n < numBins; n++) {

                    useR[n] = quickselect_median(R[x].slice(p[n], p[n + 1]));
                    useG[n] = quickselect_median(G[x].slice(p[n], p[n + 1]));
                    useB[n] = quickselect_median(B[x].slice(p[n], p[n + 1]));

                }

                p = p.slice(1, p.length + 1);

                check = 0;
                use = 0;
                var y;
                for (y = 0; y < s * d; y++) {

                    if (y == p[check]) {
                        use = use + 1;
                        check = check + 1;
                    }

                    dx = math.abs(x - (s * d / 2)) / (s * d / 2);
                    dy = math.abs(y - (s * d / 2)) / (s * d / 2);
                    var a = 1;
                    if ((dx > M) | (dy > M)) {
                        if (dx > dy) {
                            var a = (1 - (dx - M) / (1 - M));
                        } else {
                            var a = (1 - (dy - M) / (1 - M));
                        }

                    }

                    var r = a * useR[use] + (1 - a) * 255;
                    var g = a * useG[use] + (1 - a) * 255;
                    var b = a * useB[use] + (1 - a) * 255;

                    let off = (y * s * d + x) * 4;
                    pixels[off] = r;
                    pixels[off + 1] = g;
                    pixels[off + 2] = b;
                    // streaks[off] = r;
                    // streaks[off + 1] = g;
                    // streaks[off + 2] = b;
                    // streaks[off + 3] = 255;

                }
            }

            streaks = Array.from(pixels);

            addSwirl(0);

        }
    }, 750);
}

function addSwirl(sampleK) {

    if (sampleK == 1) {

        var Ktype = 6 - Number(document.getElementById("Kvalue").value);

            if (Ktype == 1) {
                K = (Math.random() * 2) + 1;
            }
            if (Ktype == 2) {
                K = (Math.random() * 6) + 4;
            }
            if (Ktype == 3) {
                K = (Math.random() * 10) + 11;
            }
            if (Ktype == 4) {
                K = (Math.random() * 8) + 22;
            }
            if (Ktype == 5) {
                K = math.pow(10, 6);
            }

            K = K * (s * d / 800) * 16;
    }

    d = pixelDensity();

    var i;
    var l = pixels.length;
    for (i = 0; i < l; i++) {
        pixels[i] = streaks[i];
    }

    var R = new Array(s * d);
    for (i = 0; i < s * d; i++) {
        R[i] = new Array(s * d);
    }

    var G = new Array(s * d);
    for (i = 0; i < s * d; i++) {
        G[i] = new Array(s * d);
    }

    var B = new Array(s * d);
    for (i = 0; i < s * d; i++) {
        B[i] = new Array(s * d);
    }

    var M = 0.15;
    for (x = 0; x < s * d; x++) {
        for (y = 0; y < s * d; y++) {
            let off = (y * s * d + x) * 4;

            var X = math.round(x * (1 - 2 * M) + (M * s * d));
            var Y = math.round(y * (1 - 2 * M) + (M * s * d));

            R[X][Y] = pixels[off];
            G[X][Y] = pixels[off + 1];
            B[X][Y] = pixels[off + 2];

            if (x <= (M * s * d)) {
                R[x][y] = 255;
                G[x][y] = 255;
                B[x][y] = 255;
            };

            if (y <= (M * s * d)) {
                R[x][y] = 255;
                G[x][y] = 255;
                B[x][y] = 255;
            };

            if (x >= ((1 - M) * s * d)) {
                R[x][y] = 255;
                G[x][y] = 255;
                B[x][y] = 255;
            };

            if (y >= ((1 - M) * s * d)) {
                R[x][y] = 255;
                G[x][y] = 255;
                B[x][y] = 255;
            };

        }
    }

    var midx = s * d / 2;
    var midy = s * d / 2;


    var x2 = new Array(s * d);
    for (i = 0; i < s * d; i++) {
        x2[i] = new Array(s * d);
    }

    var y2 = new Array(s * d);
    for (i = 0; i < s * d; i++) {
        y2[i] = new Array(s * d);
    }


    var i;
    for (i = 0; i < s * d; i++) {
        var x = i - midx;
        var j;
        for (j = 0; j < s * d; j++) {
            var y = j - midy;
            polarC = cartesian2Polar(x, y);
            theta1 = polarC.phi;
            rho1 = polarC.rho;
            if (i > midx) {
                var mx = (i - midx) / (s * d - midx);
            } else {
                var mx = (-i + midx) / (s * d - midx);
            }

            if (j > midy) {
                var my = (j - midy) / (s * d - midy);
            } else {
                var my = (-j + midy) / (s * d - midy);
            }

            if (mx > my) {
                m = mx;
            } else {
                m = my;
            }

            var phi = theta1 + (rho1 / (K * (m + smallNum)));

            // polar to cartesian
            var l = rho1 * math.cos(phi);
            var m = rho1 * math.sin(phi);

            x2[i][j] = math.round(l + midx);
            y2[i][j] = math.round(m + midy);

            if (x2[i][j] < 0) {
                x2[i][j] = 0
            };
            if (y2[i][j] < 0) {
                y2[i][j] = 0
            };
            if (x2[i][j] > s * d - 1) {
                x2[i][j] = s * d - 1
            };
            if (y2[i][j] > s * d - 1) {
                y2[i][j] = s * d - 1
            };


        }
    }


    for (x = 0; x < s * d; x++) {
        for (y = 0; y < s * d; y++) {

            X = x2[x][y];
            Y = y2[x][y];


            var r = R[X][Y];
            var g = G[X][Y];
            var b = B[X][Y];

            let off = (y * s * d + x) * 4;
            pixels[off] = r;
            pixels[off + 1] = g;
            pixels[off + 2] = b;
            // pixels[off + 3] = a;

        }
    }
    updatePixels();
    updateTwitter();
}

function instantiateInput(firstCall) {
    if (firstCall == 1) {
        input = createFileInput(handleFile);
        input.id('inputUpload');
        var spanEl = document.getElementById("upload");
        var bodyRect = document.body.getBoundingClientRect(),
            elemRect = spanEl.getBoundingClientRect(),
            xShift = elemRect.left - bodyRect.left;
        yShift = elemRect.top - bodyRect.top;
        input.position(xShift + 70, yShift + 5);
        firstCall = 0;
        visitedUpload = 1;
    }
}

function handleFile(file) {
    //print(file);
    if (file.type === 'image') {
        img = createImg(file.data);
        img.hide();
        setTimeout(function() {
            image(img, 0, 0, width, height);
            processImage();
        }, 50);
    }
}


function cartesian2Polar(x, y) {
    rho = math.sqrt(x * x + y * y)
    phi = math.atan2(y, x) //This takes y first
    polarCoor = {
        rho: rho,
        phi: phi
    }
    return polarCoor
}

function quickselect_median(arr) {
    const L = arr.length,
        halfL = L / 2;
    if (L % 2 == 1)
        return quickselect(arr, halfL);
    else
        return 0.5 * (quickselect(arr, halfL - 1) + quickselect(arr, halfL));
}

function quickselect(arr, k) {
    // Select the kth element in arr
    // arr: List of numerics
    // k: Index
    // return: The kth element (in numerical order) of arr
    if (arr.length == 1)
        return arr[0];
    else {
        const pivot = arr[0];
        const lows = arr.filter((e) => (e < pivot));
        const highs = arr.filter((e) => (e > pivot));
        const pivots = arr.filter((e) => (e == pivot));
        if (k < lows.length) // the pivot is too high
            return quickselect(lows, k);
        else if (k < lows.length + pivots.length) // We got lucky and guessed the median
            return pivot;
        else // the pivot is too low
            return quickselect(highs, k - lows.length - pivots.length);
    }
}
