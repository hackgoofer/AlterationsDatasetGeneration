function setup() {

    var sw = document.getElementById("strokeWidthSlider").value;
    var curveToggle = $("input[name='curvy']:checked").val();
    //var rth = 1 - document.getElementById("shapeSwitchSlider").value;
    var numTrials = Math.pow(2, document.getElementById("numEntitiesSlider").value);
    var pid = $("input[name='palette']:checked").val();

    var url_string = window.location.href;
    var url = new URL(url_string);
    var seed = url.searchParams.get("seed");

    Math.seedrandom(seed);

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
    cid = round(Math.random() * (numColors - 1));
    R = palettes[pid][cid][0]; //round(Math.random() * 255);
    G = palettes[pid][cid][1]; //round(Math.random() * 255);
    B = palettes[pid][cid][2]; //round(Math.random() * 255);
    fill(R, G, B);
    p = [round(Math.random() * s * (1 - 2 * mp)) + mp * s, round(Math.random() * s * (1 - 2 * mp)) + mp * s];
    vertex(p[0], p[1]);
    let cp = [];
    for (var trial = 0; trial < numTrials; trial++) {

        let pprev = p;

        p = [round(Math.random() * s * (1 - 2 * mp)) + mp * s, round(Math.random() * s * (1 - 2 * mp)) + mp * s];
        if (curvy == 0) {
            cp[0] = (p[0] + pprev[0]) / 2;
            cp[1] = (p[1] + pprev[1]) / 2;
        } else {
            let check = Math.random();
            if (check < 0.25) {
                cp[0] = (p[0] + pprev[0]) / 2 + ((Math.random() * s / 10) + ((curvy + 1) * s / 10));
                cp[1] = (p[1] + pprev[1]) / 2 + ((Math.random() * s / 10) + ((curvy + 1) * s / 10));
            } else {
                if (check < 0.5) {
                    cp[0] = (p[0] + pprev[0]) / 2 + ((Math.random() * s / 10) + ((curvy + 1) * s / 10));
                    cp[1] = (p[1] + pprev[1]) / 2 - ((Math.random() * s / 10) + ((curvy + 1) * s / 10));
                } else {
                    if (check < 0.75) {
                        cp[0] = (p[0] + pprev[0]) / 2 - ((Math.random() * s / 10) + ((curvy + 1) * s / 10));
                        cp[1] = (p[1] + pprev[1]) / 2 + ((Math.random() * s / 10) + ((curvy + 1) * s / 10));
                    } else {
                        cp[0] = (p[0] + pprev[0]) / 2 - ((Math.random() * s / 10) + ((curvy + 1) * s / 10));
                        cp[1] = (p[1] + pprev[1]) / 2 - ((Math.random() * s / 10) + ((curvy + 1) * s / 10));
                    }
                }
            }
        }


        //cp = [round(Math.random() * s), round(Math.random() * s)];

        quadraticVertex(cp[0], cp[1], p[0], p[1]);

        if (Math.random() > rth) {
            endShape();
            beginShape();
            vertex(p[0], p[1]);
            cid = round(Math.random() * (numColors - 1));
            R = palettes[pid][cid][0]; //round(Math.random() * 255);
            G = palettes[pid][cid][1]; //round(Math.random() * 255);
            B = palettes[pid][cid][2]; //round(Math.random() * 255);
            fill(R, G, B);
        }
    }

    endShape();
}
