let sound
let button
let fft,waveform
let stars = []
function preload(){
  sound = loadSound("1617.mp3")
}
function setup(){
  createCanvas(windowWidth,windowHeight,WEBGL);
  colorMode(HSB)
  button = createButton('playMusic');
  button.position(width/2-30, height*0.8);
  button.mousePressed(playSound);

  fft = new p5.FFT()
  waveform = fft.waveform()
  console.log(waveform)

}

function draw(){
  background(0);
  orbitControl()
  waveform = fft.waveform()
  rotateX(PI/3)

  let r = width*0.3
  for(let a=0;a<2*PI;a+=PI/25){
    let index = int(map(a,0,2*PI,0,1024))
    let curH = abs(300*waveform[index]) 
    let x = r*cos(a)
    let y = r*sin(a)
    push()
    translate(x,y,curH/2)
    rotateX(PI/2)
    let c1 = color(150,200,200)
    let c2 = color(200,100,160)
    let rate = map(a,0,2*PI,0,0.9)
    let col = lerpColor(c1,c2,rate)
    stroke(col)
    cylinder(10,5+curH)
    pop()
    
    for(let k = 0;k< 10;k++){
      if(random(0.01,1)<waveform[index]){
        stars.push(new star(x,y,5+curH,col));
      }
    }
  }
  
  for (let i =0; i<stars.length;i++){
    stars[i].move();
    stars[i].show();
    if(stars[i].z>500){
      stars.splice(i,1);
    }
  }
}
  function star(x,y,z,col){
    this.x = x + random(-2,2);
    this.y = y + random(-2,2);
    this.z = z;
    this.col = col;
    this.life = 500;
    this.speedX = random(-0.3,0.3);
    this.speedY = random(-0.3,0.3);
    this.speedZ = 0.05 +(z-5)/15;
    
    this.move = function(){
      this.z += this.speedZ;
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= 1;
    };
    this.show = function(){
      push();
      let a = map(this.life,0,500,0,1);
      stroke(hue(this.col),saturation(this.col),brightness(this.col));
      
      
      strokeWeight(1);
      point(this.x,this.y,this.z);
      pop()
    };  
  } 
function playSound(){
  if(!sound.isPlaying()){
    sound.play()
  }
}