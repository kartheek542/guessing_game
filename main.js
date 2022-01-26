let difficulty = "e";
let qr = 0;
let qg = 0;
let qb = 0;
let rep = 3;
let colclass = "col-" + 4;
let completed = [0, 0, 0];

function generateBlock(r, g, b, i) {
    let out = document.createElement("div");
    out.classList.add(colclass);
    let cb = document.createElement("div");
    cb.classList.add("color-block");
    cb.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
    cb.textContent = "hello";
    out.appendChild(cb);
    out.onclick = function() {
        if(completed[i] === 1) {
            return;
        }
        let pg = document.createElement("p");
        pg.classList.add("opt-ans");
        pg.textContent = "RGB(" + r + ", " + g + ", " + b + ")";
        completed[i] = 1;
        out.appendChild(pg);
    }
    return out;
}

function getRandomColors() {
    console.log(qr, qg, qb);
    let red = qr;
    while(red === qr) {
        red = parseInt(Math.random() * 1000) % 256;
    }
    let green = qg;
    while(green === qg) {
        green = parseInt(Math.random() * 1000) % 256;
    }
    let blue = qb;
    while(blue === qb) {
        blue = parseInt(Math.random() * 1000) % 256;
    }
    return {
        r: red,
        g: green,
        b: blue
    };
}


function setQuestion() {
    qr = parseInt(Math.random() * 1000) % 256;
    qg = parseInt(Math.random() * 1000) % 256;
    qb = parseInt(Math.random() * 1000) % 256;
    document.getElementById("qred").textContent = qr;
    document.getElementById("qgreen").textContent = qg;
    document.getElementById("qblue").textContent = qb;
}

function initiate() {
    setQuestion();
    document.getElementById("colorsRow").innerHTML = "";
    completed = [];
    for(let i = 0; i < rep; i++) {
        completed.push(0);
    }
    let anspos = parseInt(Math.random() * 10) % rep;
    console.log(anspos);
    for(let i = 0; i < rep; i++) {
        if(i === anspos) {
            let bl = generateBlock(qr, qg, qb);
            console.log(bl);
            document.getElementById("colorsRow").appendChild(bl);
        }
        else {
            let rc = getRandomColors();
            let bl = generateBlock(rc.r, rc.g, rc.b, i);
            console.log(bl);
            document.getElementById("colorsRow").appendChild(bl);
        }
    }
    console.log(document.getElementById("colorsRow"));
}

document.getElementById("ebutton").onclick = function() {
    difficulty = "e";
    colclass = "col-" + 4;
    rep = 3;
    initiate();
};
document.getElementById("hbutton").onclick = function() {
    difficulty = "h";
    colclass = "col-" + 2;
    rep = 6;
    initiate();
};
initiate();