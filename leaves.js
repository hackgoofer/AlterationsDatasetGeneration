function setup() {
    var or = 0.7*Number(document.getElementById("offsetRight").value);
    var ol = 0.7*Number(document.getElementById("offsetLeft").value);

    var drop = Number(document.getElementById("drop").value);

    // or = 110;
    // ol = -70;
    // or and ol can be negative. So set range appropriately. Say -300 to 300

    //var XD = 0; // XD should always be 0!
    //var YD = Number(document.getElementById("verticalSize").value);
    // YD should always be positive. So set range appropriately. Say 0 to 300.

    var sw = Number(document.getElementById("strokeWidth").value);
    //sw = 0.5;

    //var numTrials = Math.pow(2, document.getElementById("numEntities").value);

    var grid_height = Number(document.getElementById("numRows").value);
    var grid_width = Number(document.getElementById("numColumns").value);

    var leaf_height = 0.7*Number(document.getElementById("verticalSize").value);
    var grid_noise = Number(document.getElementById("gridNoise").value);

    var mp = 0.2; // percentage on each side to use as margin
    var curvy = 0.5;
    var A = 255;


    var pid = $("input[name='palette']:checked").val();
    var eid = $("input[name='edgeColor']:checked").val();

    var url_string = window.location.href;
    var url = new URL(url_string);
    var seed = url.searchParams.get("seed");

    Math.seedrandom(seed);

    sy = min(700, screen.width);
    sx = sy; //sy*0.8;
    pixelDensity(2);

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
    palettes[5] = [
        [156, 78, 115],
        [14, 46, 124],
        [205, 123, 87],
        [89, 172, 146],
        [218, 51, 42]
    ];
    palettes[6] = [
        [241, 157, 64],
        [212, 54, 57],
        [34, 88, 151],
        [97, 194, 182],
        [253, 255, 252]
    ];

    // Because the format of these next palettes is different, there is a hard coded "if (pid>6)" at a couple of places below. Check that if add more palettes.
    palettes[7] = ['#da0424', '#04da9b', '#f9eaa1', '#080c9a', '#040404'];
    palettes[8] = ['#e52547', '#08413f', '#5083bc', '#f2e8d2', '#41aba7'];
    palettes[9] = ['#fc8c54', '#fa6324', '#050505', '#eee9e9', '#ea30ac'];
    palettes[10] = ['#fb0574', '#f7e40d', '#330cd4', '#fbfbfb', '#9e90dc'];
    palettes[11] = ['#f08906', '#05ac9c', '#055ca3', '#f7f5c2', '#ab1344'];
    palettes[12] = ['#048bd3', '#05649c', '#100e14', '#f7f19f', '#70cb3b'];


    let ecolors = [];
    ecolors[0] = [255, 255, 255];
    ecolors[1] = [246, 244, 240];
    ecolors[2] = [244, 239, 220];
    ecolors[3] = [30, 27, 39];
    ecolors[4] = [0, 0, 0];

    // let background = [];
    // background[0] = [246, 244, 240];
    // background[1] = [246, 244, 240];
    // background[2] = [246, 244, 240];
    // background[3] = [244, 239, 220];
    // background[4] = [246, 244, 240];
    // background[5] = [0, 0, 0];
    // background[6] = [30, 27, 39];
    // background[7] = [255, 255, 255];
    // background[8] = background[7];
    // background[9] = background[7];
    // background[10] = background[7];
    // background[11] = background[7];
    // background[12] = background[7];

    // let black = [];
    // black[0] = background[0];
    // black[1] = background[1];
    // black[2] = background[2];
    // black[3] = background[3];
    // black[4] = [52, 50, 46];
    // black[5] = background[5];
    // black[6] = background[6];
    // black[7] = background[7];
    // black[8] = background[8];
    // black[9] = background[9];
    // black[10] = background[10];
    // black[11] = background[11];
    // black[12] = background[12];

    numColors = palettes[pid].length;

    let cnv = createCanvas(sx, sy);
    fill('#ffffff');
    noStroke();
    rect(0, 0, sx, sy);
    cnv.id('mycanvas');

    cnv.parent('sketch-holder');


    strokeWeight(sw)
    stroke(ecolors[eid]);

    beginShape();
    cid = round(Math.random() * (numColors - 1));
    if (pid < 7) {
        R = palettes[pid][cid][0]; //round(Math.random() * 255);
        G = palettes[pid][cid][1]; //round(Math.random() * 255);
        B = palettes[pid][cid][2]; //round(Math.random() * 255);
        fill(R, G, B, A);
    } else {
        fill(color(palettes[pid][cid]));
    }

    var xinc = sx*(1-2*mp)/grid_width;
    var yinc = sy*(1-2*mp)/grid_height;
    //var xstart = mp*sx;
    //var ystart = mp*sy;
    var xstart = (mp*sx)+xinc/2;
    var ystart = (mp*sy)+yinc/2;

    //xclean = xstart + xinc/2;
    //yclean = ystart + yinc*(1-leaf_height)/2;

    xclean = xstart;
    yclean = ystart;

    mnx = (mp*sx)+xinc/2;
    mxx = sx - mnx;

    mny = (mp*sy)+yinc/2;
    mxy = sy - mny;

    for (var xtrial = 0; xtrial < grid_width; xtrial++) {

        for (var ytrial = 0; ytrial < grid_height; ytrial++) {

            //A = Math.round((numTrials - trial)/numTrials*255);
            //pprev = [round((Math.random() * ((sx * (1 - 3 * mp))))) + (mp * sx * 1.5), round((Math.random() * ((sy * (1 - 2 * mp)) - YD))) + (mp * sy)];


            //pprev = [(1-grid_noise)*x + grid_noise*((Math.random())*sx*(1-2*mp)+(sx*mp)) , (1-grid_noise)*y + grid_noise*((Math.random())*sy*(1-2*mp)+(sy*mp))];
            // mux = Math.random()*(sx*(1-2*mp) - xinc) + (sx*mp) + xinc/2;
            // x = (1-grid_noise)*xclean + grid_noise*(mux);
            // muy = Math.random()*(sy*(1-2*mp)-(yinc*leaf_height)) + (sy*mp);
            // y = (1-grid_noise)*yclean + grid_noise*(muy);
            // pprev = [x,y];


            mux = Math.random()*(mxx-mnx)+mnx;
            x = (1-grid_noise)*xclean + grid_noise*(mux);
            muy = Math.random()*(mxy-mny)+mny;
            y = (1-grid_noise)*yclean + grid_noise*(muy);
            pprev = [x,y - sy*leaf_height/2];

            // FIX THIS NOISE BEHAVIOUR. IT IS NOT WHAT I WANT.
            //pprev = [x + noise_control*grid_noise*((Math.random()-0.5)*sx*(1-2*mp)) , y + noise_control*grid_noise*((Math.random()-0.5)*sy*(1-2*mp))];
            //pprev = [x , y];

            vertex(pprev[0], pprev[1]);
            p = [pprev[0], pprev[1] + sy*leaf_height];

            let cp1 = [];
            let cp2 = [];

            check = Math.random();
            if (check < 0.5) {
                cp1[0] = (p[0] + pprev[0]) / 2 + ol*sx;
                cp1[1] = (p[1] + pprev[1]) / 2;
                cp2[0] = (p[0] + pprev[0]) / 2 - or*sx;
                cp2[1] = (p[1] + pprev[1]) / 2;
            } else {
                cp1[0] = (p[0] + pprev[0]) / 2 - ol*sx;
                cp1[1] = (p[1] + pprev[1]) / 2;
                cp2[0] = (p[0] + pprev[0]) / 2 + or*sx;
                cp2[1] = (p[1] + pprev[1]) / 2;
            }

            //cp = [round(Math.random() * s), round(Math.random() * s)];

            if (Math.random() > drop) {
                quadraticVertex(cp1[0], cp1[1], p[0], p[1]);
                quadraticVertex(cp2[0], cp2[1], pprev[0], pprev[1]);
            }
            endShape();

            //strokeWeight(sw);
            //stroke('red');
            //console.log(pprev);
            //point(pprev[0],pprev[1]);
            //stroke('blue');
            //console.log(p);
            //point(p[0],p[1]);
            //stroke('green');
            //point(cp1[0],cp1[1]);
            //stroke('black');
            //point(cp2[0],cp2[1]);


            beginShape();
            cid = round(Math.random() * (numColors - 1));
            if (pid < 7) {
                R = palettes[pid][cid][0]; //round(Math.random() * 255);
                G = palettes[pid][cid][1]; //round(Math.random() * 255);
                B = palettes[pid][cid][2]; //round(Math.random() * 255);
                fill(R, G, B, A);
            } else {
                fill(color(palettes[pid][cid]));
            }

            yclean = yclean + yinc;
            // muy = Math.random()*(sy*(1-2*mp)-(yinc*leaf_height)) + (sy*mp);
            // y = (1-grid_noise)*yclean + grid_noise*(muy);
            muy = Math.random()*(mxy-mny)+mny;
            y = (1-grid_noise)*yclean + grid_noise*(muy);
            pprev = [x,y - sy*leaf_height/2];
        }
        xclean = xclean + xinc;
        yclean = ystart;//*(1-leaf_height)/2;

        mux = Math.random()*(mxx-mnx)+mnx;
        x = (1-grid_noise)*xclean + grid_noise*(mux);
        muy = Math.random()*(mxy-mny)+mny;
        y = (1-grid_noise)*yclean + grid_noise*(muy);
        pprev = [x,y - sy*leaf_height/2];
    }
}
