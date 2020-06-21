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
    download.download = `nt${params.numTrials}_pid${params.pid}_seed${params.seed}_cid${params.cid}_p0${params.p0}_p1${params.p1}_sw${params.strokeWidth}${params.name}.png`
    download.setAttribute("href", image);
    download.click()
};


function setup() {
    if (!started) return

    var sw = params.strokeWidth;
    var curveToggle = $("input[name='curvy']:checked").val();
    //var rth = 1 - document.getElementById("shapeSwitchSlider").value;
    var numTrials = Math.pow(2, params.numTrials);
    var pid = params.pid;
    var seed = params.seed;

    s = min(700,screen.width);
    //s = 700;
    mp = 0.2; // percentage on each side to use as margin
    if (curveToggle == 0) {
        curvy = 0;
    } else {
        curvy = 0.5;
    }

    //curvy = 2;
    rth = 0.5;
    //sw = 2;
    //pid = 4;
    //numTrials = 1000;

    let palettes = [];
    palettes[0] = [
        [30, 39, 46],
        [47, 53, 66],
        [87, 96, 111],
        [164, 176, 190],
        [206, 214, 224]
    ];
    palettes[1] = [
        [48, 53, 66]
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
    black[1] = background[1];
    black[2] = background[2];
    black[3] = background[3];
    black[4] = [52, 50, 46];


    numColors = palettes[pid].length;

    let cnv = createCanvas(s, s);
    fill('#ffffff');
    noStroke();
    rect(0, 0, s, s);
    cnv.id('mycanvas');
    cnv.parent('sketch-holder');

    strokeWeight(sw)
    stroke(black[pid]);

    beginShape();
    cid = round(params.cid * (numColors - 1));
    R = palettes[pid][cid][0]; //round(Math.random() * 255);
    G = palettes[pid][cid][1]; //round(Math.random() * 255);
    B = palettes[pid][cid][2]; //round(Math.random() * 255);
    fill(R, G, B);
    p = [round(params.p0 * s * (1 - 2 * mp)) + mp * s, round(params.p1 * s * (1 - 2 * mp)) + mp * s];
    vertex(p[0], p[1]);
    let cp = [];
    for (var trial = 0; trial < numTrials; trial++) {

        let pprev = p;

        p = [round(params.trials0[trial] * s * (1 - 2 * mp)) + mp * s, round(params.trials1[trial] * s * (1 - 2 * mp)) + mp * s];
        if (curvy == 0) {
            cp[0] = (p[0] + pprev[0]) / 2;
            cp[1] = (p[1] + pprev[1]) / 2;
        } else {
            let check = params.checks[trial];
            if (check < 0.25) {
                cp[0] = (p[0] + pprev[0]) / 2 + ((params.checks1[trial] * s / 10) + ((curvy + 1) * s / 10));
                cp[1] = (p[1] + pprev[1]) / 2 + ((params.checks2[trial] * s / 10) + ((curvy + 1) * s / 10));
            } else {
                if (check < 0.5) {
                    cp[0] = (p[0] + pprev[0]) / 2 + ((params.checks3[trial] * s / 10) + ((curvy + 1) * s / 10));
                    cp[1] = (p[1] + pprev[1]) / 2 - ((params.checks4[trial] * s / 10) + ((curvy + 1) * s / 10));
                } else {
                    if (check < 0.75) {
                        cp[0] = (p[0] + pprev[0]) / 2 - ((params.checks5[trial] * s / 10) + ((curvy + 1) * s / 10));
                        cp[1] = (p[1] + pprev[1]) / 2 + ((params.checks6[trial] * s / 10) + ((curvy + 1) * s / 10));
                    } else {
                        cp[0] = (p[0] + pprev[0]) / 2 - ((params.checks7[trial] * s / 10) + ((curvy + 1) * s / 10));
                        cp[1] = (p[1] + pprev[1]) / 2 - ((params.checks8[trial] * s / 10) + ((curvy + 1) * s / 10));
                    }
                }
            }
        }


        //cp = [round(Math.random() * s), round(Math.random() * s)];

        quadraticVertex(cp[0], cp[1], p[0], p[1]);

        if (params.trials2[trial] > rth) {
            endShape();
            beginShape();
            vertex(p[0], p[1]);
            cid = round(params.trials3[trial] * (numColors - 1));
            R = palettes[pid][cid][0]; //round(Math.random() * 255);
            G = palettes[pid][cid][1]; //round(Math.random() * 255);
            B = palettes[pid][cid][2]; //round(Math.random() * 255);
            fill(R, G, B);
        }
    }

    endShape();
    download()
}
