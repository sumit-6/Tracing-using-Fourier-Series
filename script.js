let N = 20;
let time = 0;
const dt = 0.0025;
const scale = 0.25;
const W = 2000, H = 1000;
const shiftX = 500, shiftY = 500;
const tracing = [];

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
let n = [];
let Amplitude = [];
let Theta = [];


function setup() {
    createCanvas(W, H);
    // set background color as dark blue
    background(255);
    // set text color to white
    fill(255);
    N_slider = createSlider(2, 100, 25, 1); 
      
    // Set the position of slider on the canvas 
    N_slider.position(shiftX - 240, shiftY - 450); 
    N = N_slider.value()
    N_slider.size(300)
    
    n = [];
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
    Amplitude = [];
    Theta = [];
   

    for(let i = 0; i < Cx.length; ++i) {
        Amplitude.push(Math.sqrt((Cx[i] * Cx[i]) + (Cy[i] * Cy[i])));
        Theta.push(arg(Cx[i], Cy[i]));
    }
    
}

function draw() {
    background(255);
    beginShape();
    textSize(40);
    fill(0);
    text(`N = ${N_slider.value()}`, shiftX - 240 + 40, shiftY - 450 + 50);
    textSize(20);
    text(`Number of circles = 2N + 1 = ${2*N + 1}`, shiftX - 240 + 40, shiftY - 450 + 75);
    endShape();
    N_slider.changed(() => {
        N = N_slider.value()
        
        n = [];
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
        Amplitude = [];
        Theta = [];
    

        for(let i = 0; i < Cx.length; ++i) {
            Amplitude.push(Math.sqrt((Cx[i] * Cx[i]) + (Cy[i] * Cy[i])));
            Theta.push(arg(Cx[i], Cy[i]));
        }
    });
    strokeWeight(0.4);
    stroke(0);
    line(shiftX - W, shiftY, shiftX + W, shiftY);
    line(shiftX, shiftY - H, shiftX, shiftY + H);
    strokeWeight(0.1);
    stroke(0);
    for(let x = -H/2; x <= H/2; x += (H)/10) {
        line(shiftX - W, shiftY + x, shiftX + W, shiftY + x);
    }
    for(let y = -W/2; y <= W; y += (W)/20) {
        line(shiftX + y, shiftY - H, shiftX + y, shiftY + H);
    }
    

    
    beginShape();
    fill(37, 99, 235);
    for(let i = 0; i <= 1; i += dt) {
        vertex(shiftX + f_x(i)/scale, shiftY - f_y(i)/scale);
    }
    endShape();
    
    strokeWeight(0.6);
    noFill();
    beginShape();
    stroke(0);

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
        if(i === 2*N + 1) {
            tracing.push([shiftX + Px / scale,shiftY -  Py / scale]);
        }
    }
    endShape();
    
    stroke(0);
    strokeWeight(3);
    noFill();
    beginShape();
    stroke(0);
    for(let i = 0; i < tracing.length; ++i) {
        vertex(tracing[i][0], tracing[i][1]);
    }
    endShape();
    strokeWeight(0);
    time += dt;
    if(time > 1) {
        time = 0;
        tracing.length = 0;
    }
}