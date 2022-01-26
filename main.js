let difficulty = "e";
let qr = 0;
let qg = 0;
let qb = 0;
let rep = 3;
let colclass = "col-" + 4;
let completed = [0, 0, 0];

function generateOutput() {
    let a = document.createElement("h1");
    let b = document.createElement("button");
    b.classList.add("btn");
    b.classList.add("ansbtn");
    a.classList.add("congrats");
    b.textContent = "Try Again"
    b.onclick = function() {
        initiate();
    }
    a.textContent = "Hurray! You guessed it right";
    document.getElementById("result").appendChild(a);
    document.getElementById("result").appendChild(b);
}

function generateBlock(r, g, b, i) {
    let out = document.createElement("div");
    out.classList.add(colclass);
    let cb = document.createElement("div");
    cb.classList.add("color-block");
    cb.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
    //cb.textContent = "hello";
    out.appendChild(cb);
    out.onclick = function() {
        if(completed[i] === 1) {
            return;
        }
        let pg = document.createElement("p");
        pg.classList.add("opt-ans");
        pg.textContent = "RGB(" + r + ", " + g + ", " + b + ")";
        completed[i] = 1;
        let flag = false;
        if(r == qr && g == qg && b == qb) {
            pg.classList.add("success");
            flag = true;
        }
        else {
            pg.classList.add("failed");
        }
        out.appendChild(pg);
        if(flag) {
            generateOutput();
        }
    }
    return out;
}

function getRandomColors() {
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
    document.getElementById("result").innerHTML = "";
    completed = [];
    for(let i = 0; i < rep; i++) {
        completed.push(0);
    }
    let anspos = parseInt(Math.random() * 10) % rep;
    for(let i = 0; i < rep; i++) {
        if(i === anspos) {
            let bl = generateBlock(qr, qg, qb, i);
            document.getElementById("colorsRow").appendChild(bl);
        }
        else {
            let rc = getRandomColors();
            let bl = generateBlock(rc.r, rc.g, rc.b, i);
            document.getElementById("colorsRow").appendChild(bl);
        }
    }
}
let ebt = document.getElementById("ebutton");
let hbt = document.getElementById("hbutton");
ebt.onclick = function() {
    difficulty = "e";
    colclass = "col-" + 4;
    rep = 3;
    console.log("clicked on easy button");
    if(!ebt.classList.contains("active")) {
        ebt.classList.add("active");
        console.log("adding active status to easy");
    }
    if(hbt.classList.contains("active")) {
        hbt.classList.toggle("active");
        console.log("removing active status to hard");
    }
    initiate();
};
hbt.onclick = function() {
    difficulty = "h";
    colclass = "col-" + 2;
    rep = 6;
    console.log("clicked on hard");
    if(!hbt.classList.contains("active")) {
        hbt.classList.add("active");
        console.log("adding active to hard");
    }
    console.log("class list of easy is" + ebt.classList);
    if(ebt.classList.contains("active")) {
        ebt.classList.toggle("active");
        console.log("removing active status to easy");
    }
    initiate();
};
initiate();