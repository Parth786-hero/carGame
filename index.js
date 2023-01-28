"use strict";
const print = console.log;
const popUp = document.querySelector(".pop-up");
const road = document.querySelector(".road");
const roadDim = road.getBoundingClientRect();
const number = document.querySelector("#number");
const arrowKeys = {ArrowUp : false , ArrowDown : false , ArrowLeft : false , ArrowRight : false };
document.addEventListener("keyup" , (e)=>{
    arrowKeys[e.key] = false;
})
document.addEventListener("keydown" , (e)=>{
    arrowKeys[e.key] = true;
})
const player = {speed : 5};

popUp.addEventListener("click" , (e)=>{
    player.score = 0;
    player.play = true;
    e.currentTarget.classList.add("hide");
    road.innerHTML = "";
    playGame();
})
function randomColor(){
    let red = Math.floor(Math.random()*257);
    let green = Math.floor(Math.random()*257);
    let blue = Math.floor(Math.random()*257);
    return `rgb(${red},${green},${blue})`;
}
function playGame(){
    const car = document.createElement("div");
    
    car.classList.add("car");
    road.append(car);
    for(let i = 0;i<5;i++){
        const line = document.createElement("div");
        line.y = i*162;
        line.classList.add("line");
        line.style.top = line.y+"px";
        road.append(line);
    }
    for(let i = 0;i<3;i++){
        const enemyCar = document.createElement("div");
        enemyCar.classList.add("enemy");
        enemyCar.y = (2*i+1)*-200;
        enemyCar.x = Math.floor(Math.random()*460);
        enemyCar.style.left = enemyCar.x+"px";
        enemyCar.style.top = enemyCar.y+"px";
        enemyCar.style.backgroundColor = randomColor();
        road.append(enemyCar);
    }
    car.x = car.offsetLeft;
    car.y = car.offsetTop;
    window.requestAnimationFrame(startPlay);
}
function startPlay(){
    const car = document.querySelector(".car");
    number.textContent = player.score++;
    moveLines();
    moveEnemy(car);
    if(arrowKeys.ArrowUp && car.y > roadDim.top + 95){
        car.y-=player.speed;
        car.style.top = car.y+"px";
    }
    if(arrowKeys.ArrowDown && car.y < roadDim.height - 95){
        car.y+=player.speed;
        car.style.top = car.y+"px";
    }
    if(arrowKeys.ArrowRight && car.x < roadDim.width - 52){
        car.x+=player.speed;
        car.style.left = car.x+"px";
    }
    if(arrowKeys.ArrowLeft && car.x > 0){
        car.x-=player.speed;
        car.style.left = car.x+"px";
    }

    if(player.play){
        window.requestAnimationFrame(startPlay);
    }
}
function isCollide(a,b){
    const aDim = a.getBoundingClientRect();
    const bDim = b.getBoundingClientRect();
    return !((aDim.top > bDim.bottom) || (aDim.right  < bDim.left) || (aDim.left > bDim.right) || (aDim.bottom < bDim.top));

}
// ################ move Lines ################
function moveLines(){

    const bagLines = document.querySelectorAll(".line");
    Array.from(bagLines).forEach(ele=>{
        if(ele.y > 750){
            ele.y-=825;
        }
        ele.y+=player.speed;
        ele.style.top = ele.y+"px";
    })
    
}
function endGame(){
    player.play = false;
    popUp.classList.remove("hide");
    
}
function moveEnemy(car){
    const enemyBag = document.querySelectorAll(".enemy");
    Array.from(enemyBag).forEach(ele=>{
        if(isCollide(car , ele)){
            // print("hit boom");
            endGame();
        }
        if(ele.y > 760){
            ele.style.left = Math.floor(Math.random()*460)+"px";
            ele.style.backgroundColor = randomColor();
            ele.y = -450;
        }
        ele.y +=player.speed;
        ele.style.top = ele.y + "px";
    })
}
// ################# move line function is done here ###############
