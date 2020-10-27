/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */


console.log("hi");






var  myColor, mySize,canvas;


let pg;

let input,img;

function setup(){
	//Create canvas
	canvas = createCanvas(400, 300);
	//Place cavas inside desired DOM element
	canvas.parent('jumbo-canvas');
  
  

	//graphics element on top of video feed
	pixelDensity(1);
	pg = createGraphics(width, height);

	//Randomly choose size and color
	myColor = [random(255), random(255), random(255)]
	mySize = random(10,70)
  
  
  input = createFileInput(handleFile);
  // input.position(0, 0);
  
  background(222, 222, 222);



}

function draw() {
  if (img) { //if change background is clicked 
    image(img, 0, 0, width, height);

}


	//draw graphics element aka the drawing
	image(pg, 0, 0, width, height);

  


  }

//function that deals with moouse drawing
function mouseDragged(){

	if (img){
		//draw on the pg element the ellipse
		pg.noStroke();
		pg.fill(myColor[0], myColor[1], myColor[2]);
		pg.ellipse(mouseX, mouseY, mySize, mySize);

  }


}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
}
  

  


//function to download the canvas once a user is done.
function downloadcanvas(){
	console.log("ok lets download");
	save(canvas, "art", 'png');

}
