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
    download.download = `nc${params.nc}_seed${params.seed}_pid${params.pid}${params.name}.png`
    download.setAttribute("href", image);
    download.click()
};

// Parameters:
// Color palette (palette ID)
// Which colors from the palette (if not all)
// Not incorporated in the UI so far:
// Number of total circles (total_num_circles below)
// Size of circles (s1, s2, s3, s4)
// Distribution of circle sizes (p1, p2, p3 below)
// Global scale of all circles (scale below) -- size proportions stay the same.
function setup() {
//function setup(seed) {
    if (!started) return

    var inputNumColors = params.nc
    var inputPaletteID = params.pid

    // var url_string = window.location.href;
    // var url = new URL(url_string);
    //var pid = url.searchParams.get("pid");
    //var n = url.searchParams.get("n");
    var seed = params.seed

    //document.getElementsByClassName("twitter-share-button")[0].outerHTML = "<iframe id=\"twitter-widget-0\" scrolling=\"no\" allowtransparency=\"true\" class=\"twitter-share-button twitter-share-button-rendered twitter-tweet-button\" style=\"position: static; visibility: visible; width: 61px; height: 20px;\" title=\"Twitter Tweet Button\" src=\"https://platform.twitter.com/widgets/tweet_button.d6364fae9340b0be5f13818370141fd0.en.html#dnt=false&amp;id=twitter-widget-0&amp;lang=en&amp;original_referer="+encodeURI(window.location.href)+"&amp;size=m&amp;text=Check%20this%20out&amp;time=1569167647479&amp;type=share&amp;url="+encodeURI(window.location.href)+"\" frameborder=\"0\"></iframe>";

    //console.log(seed);
    Math.seedrandom(seed);

    /*
    if (isNaN(n)) {
        var inputNumColors = document.getElementById("numColorsSlider").value;
        var inputPaletteID = $("input[name='palette']:checked").val();
        //console.log('not good');
    } else {
        var inputNumColors = n;
        var inputPaletteID = pid;
    }
    */

    s = min(700,screen.width);
    mp = 0.15; // % on each size to use as margin
    let cnv = createCanvas(s, s);
    fill('#ffffff');
    noStroke();
    rect(0, 0, s, s);
    cnv.id('mycanvas');
    cnv.parent('sketch-holder');
    generate(inputNumColors, inputPaletteID)

    function generate(numColors, paletteID) {
        // Color palettes
        if (paletteID == 1) {
            // From https://flatuicolors.com/palette/defo
            var colors = ['#c0392b', '#16a085', '#2c3e50', '#f39c12', '#2980b9'];
        } else if (paletteID == 2) {
            // Greys
            var colors = ['#1E272E', '#2F3542', '#57606F', '#A4B0BE', '#CED6E0'];
        } else if (paletteID == 3) {
            // From https://dribbble.com/shots/6204976-Nesting-Snakes
            var colors = ['#D84E5F', '#0264E4', '#2F4D47', '#F8A54A', '#B39183'];
        } else if (paletteID == 4) {
            // From https://dribbble.com/shots/5362637-Turns
            var colors = ['#7CCBB5', '#F1BC52', '#6CB6C8', '#BAB7AF', '#FE7453'];
        } else if (paletteID == 5) {
            // From Abhishek (Slack)
            var colors = ['#2980b9', '#7f8c8d', '#16a085', '#27ae60', '#c0392b'];
        }

        colors = shuffle(colors);
        colors.splice(numColors);

        // Scale size of design to control after how many designs it crashes on the phone.
        var dimscale = (s * (1 - (2 * mp))) / 1600;


        // How many circles will we place of each size?
        total_num_circles = 708 * 1;
        // Proportion of circles of each size
        p1 = 0.0169;
        p2 = 0.0339;
        p3 = 0.1356;
        p4 = 1 - p1 - p2 - p3;
        num = [p1 * total_num_circles, p2 * total_num_circles, p3 * total_num_circles, p4 * total_num_circles];
        // var num = [12, 24, 96, 576];

        // What are these sizes (i.e., radii)?
        var scale = 1;
        s1 = 180;
        s2 = 90;
        s3 = 45;
        s4 = 15;
        size = [s1 * scale * dimscale, s2 * scale * dimscale, s3 * scale * dimscale, s4 * scale * dimscale];
        //var size = [180 * scale * dimscale, 90 * scale * dimscale, 45 * scale * dimscale, 15 * scale * dimscale];

        var maxTries = 2000;

        // Check if two circles overlap.
        // Circle 1: located at (x1,y1) with radius r1.
        // Equivalent for circle 2.
        function checkCircleOverlap(x1, y1, r1, x2, y2, r2) {
            if ((Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) > (Math.pow(r1 + r2, 2))) {
                return false;
            } else {
                return true;
            }
        }

        // Shuffle an array
        function shuffle(array) {
            var currentIndex = array.length,
                temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }

        // Randomly sample location of circle (x,y) and pick a random color for the circle.
        // Picking these all ahead of time because it is not good to have randomness in the renderer.
        // The renderer gets re-run often, somewhat arbitrarily (e.g., when saving),
        // and that can mess with the picture.
        // Need to pick (x,y,color) for each circle of each size
        // (so 2 nested for loops, but will store as 1D array so easier to check for overlap with
        // all existing circles)
        var x = [];
        var y = [];
        var color = [];
        var r = [];
        var n = 0;

        for (iSize = 0; iSize < size.length; iSize++) {
            for (i = 0; i < num[iSize]; i++) {

                var tryAgain = true;
                var numTriesSoFar = 0;

                // Will try placing a circle till it is placed, or have tried too many times
                do { // Consider a location for a circle of the current radius
                    var candidate_x = Math.round((Math.random() * s * (1 - 2 * mp)) + mp * s);
                    var candidate_y = Math.round((Math.random() * s * (1 - 2 * mp)) + mp * s);
                    var candidate_r = size[iSize];

                    // Check if it overlaps with any of the existing circles.
                    // As soon as one existing circle overlaps, can break out of the checking loop.
                    var overlap = false;
                    for (m = 0; m < x.length; m++) {
                        overlap = checkCircleOverlap(x[m], y[m], r[m], candidate_x, candidate_y, candidate_r);
                        if (overlap) {
                            break;
                        }
                    }

                    // If no overlap found, add candidate locations to the array
                    // (i.e., will place circle here)
                    if (!overlap) {
                        x[n] = candidate_x;
                        y[n] = candidate_y;
                        // storing size too even though not random, just so code is easier to read
                        r[n] = candidate_r;
                        color[n] = colors[Math.floor(Math.random() * colors.length)];
                        n++;
                        tryAgain = false;
                    } else {
                        tryAgain = true;
                        numTriesSoFar++;
                    }
                } while (tryAgain && (numTriesSoFar < maxTries));

                /*
                // If moved on to next circle without placing this one
                // because number of tries reached the max, say so
                if (numTriesSoFar >= maxTries) {
                  console.log('Giving up');
                }
                */
            };
        };

        // Now draw stuff. Place circles at the locations and of colors as specified above.
        // Recall: The size is not random, that is pre-specified.
        noStroke();
        for (n = 0; n < x.length; n++) {
            fill(color[n]);
            ellipse(x[n], y[n], 2 * r[n], 2 * r[n]);

        };

        // Draw 4 rectangles around so the piece is clipped
        fill(255);
        stroke(255);
        rect(0,0,Math.round(s*mp),s);
        rect(0,0,s,Math.round(s*mp));
        rect(0,Math.round(s-s*mp),s,Math.round(s-s*mp));
        rect(Math.round(s-s*mp),0,Math.round(s-s*mp),s);
    };
    download()
}
