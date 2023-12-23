const N = 20;
let time = 0;
const dt = 0.0025;
const scale = 0.05;
const W = 1450, H = 720;
const shiftX = 380, shiftY = 355;

function integral(func, lowerLimit, upperLimit, dx) {
    let ans = 0;
    for(let x = lowerLimit; x <= upperLimit; x += dx) {
        ans += func(x) * dx;
    }
    return ans;
}

function arg(x, y) {
    if(x > 0) return Math.atan(y/ x);
    else if(x < 0 && y >= 0) return Math.PI + Math.atan(y/ x);
    else if(x < 0 && y < 0) return Math.atan(y/x) - Math.PI;
    else if(x === 0 && y > 0) return  Math.PI / 2;
    else if(x === 0 && y < 0) return -Math.PI / 2;
    return 1;
}

function index(x) {
    if(x === 1) return N + 1;
    else if((x % 2) === 0) return N + 1 - (x/2);
    return N +1+ (x-1)/2;

}


const n = [];

for(let i = -N; i <= N; ++i){
    n.push(i);
}

const Cx = n.map((n_iter) => {
    const func1 = function (t) {
        return Math.cos(2*Math.PI*n_iter*t)*f_x(t) + Math.sin(2*Math.PI*n_iter*t)*f_y(t);
    }
    const val = integral(func1, 0, 1, 0.0005);
    //console.log(n_iter, " => C_x = ", val);
    return val;
});
const Cy = n.map((n_iter) => {
    const func1 = function (t) {
        return Math.cos(2*Math.PI*n_iter*t)*f_y(t) - Math.sin(2*Math.PI*n_iter*t)*f_x(t);
    }
    const val = integral(func1, 0, 1, 0.0005);
    //console.log(n_iter, " => C_y = ", val);
    return val;
});
//console.log(Cx, Cy);

const Amplitude = [];
const Theta = [];

for(let i = 0; i < Cx.length; ++i) {
    Amplitude.push(Math.sqrt((Cx[i] * Cx[i]) + (Cy[i] * Cy[i])));
    Theta.push(arg(Cx[i], Cy[i]));
}
console.log(Amplitude, Theta);

function setup() {
    createCanvas(W, H);
    
}

function draw() {
    background(255);
    strokeWeight(0.4);
    line(shiftX - W, shiftY, shiftX + W, shiftY);
    line(shiftX, shiftY - H, shiftX, shiftY + H);
    strokeWeight(0.1);
    for(let x = -H/2; x <= H/2; x += (H)/10) {
        line(shiftX - W, shiftY + x, shiftX + W, shiftY + x);
    }
    for(let y = -W/2; y <= W; y += (W)/20) {
        line(shiftX + y, shiftY - H, shiftX + y, shiftY + H);
    }

    stroke(0);
    strokeWeight(2);
    noFill();
    beginShape();
    for(let i = 0; i <= 1; i += dt) {
        vertex(shiftX + f_x(i)/scale, shiftY - f_y(i)/scale);
    }
    endShape();
    strokeWeight(0.35);
    beginShape();

    let oldPx = 0, oldPy = 0;
    vertex(shiftX + oldPx / scale, shiftY - oldPy / scale);
    for(let i = 1; i <= 2*N + 1; ++i) {
        let Px = 0, Py = 0;
        for(let j = 1; j <= i; ++j) {
            Px += Amplitude[index(j)-1]*Math.cos(2*Math.PI*n[index(j)-1]*time + Theta[index(j)-1]);
            Py += Amplitude[index(j)-1]*Math.sin(2*Math.PI*n[index(j)-1]*time + Theta[index(j)-1]);
        }
        vertex(shiftX + Px / scale,shiftY -  Py / scale);
        if(i >= 1) {
            circle(shiftX + oldPx / scale,shiftY - oldPy / scale, Math.sqrt((Math.pow((Px - oldPx), 2) + Math.pow((Py - oldPy), 2))) / (0.5*scale));
        }
        oldPx = Px, oldPy = Py;
    }
    endShape();
    time += dt;
    if(time > 1) time = 0;
}