const model = new mi.ArbitraryStyleTransferNetwork();
const canvas = document.getElementById('stylized');
const ctx = canvas.getContext('2d');
const contentImg = document.getElementById('content');
const styleImg = document.getElementById('style');
const loading = document.getElementById('loading');
const notLoading = document.getElementById('ready');
let pg, img;
let myColor, mySize, input;

// setupDemo();

function setup() {
	pixelDensity(1);
	pg = createGraphics(contentImg.width, contentImg.height);
	// input = createFileInput(handleFile);
	//Randomly choose size and color
	myColor = [Math.random(255), Math.random(255), Math.random(255)];
	mySize = Math.random(10,70);

	model.initialize().then(() => {
	stylize();
	});
}

async function clearCanvas() {
  // Don't block painting until we've reset the state.
  await mi.tf.nextFrame();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  await mi.tf.nextFrame();
}
  
async function stylize() {
  await clearCanvas();
  
  // Resize the canvas to be the same size as the source image.
  canvas.width = contentImg.width;
  canvas.height = contentImg.height;
  
  // This does all the work!
  model.stylize(contentImg, styleImg).then((imageData) => {
    stopLoading();
    console.log(imageData);
    ctx.putImageData(imageData, 0, 0);
    let imgData = ctx.getImageData(0, 0, contentImg.width, contentImg.height);
    
	img = createImg('myImage.png', '');
  });
}

function loadImage(event, imgElement) {
  const reader = new FileReader();
  reader.onload = (e) => {
    imgElement.src = e.target.result;
    startLoading();
    stylize();
  };
  reader.readAsDataURL(event.target.files[0]);
}

function loadContent(event) {
  loadImage(event, contentImg);
}

function loadStyle(event) {
  loadImage(event, styleImg);
}

function startLoading() {
  loading.hidden = false;
  notLoading.hidden = true;  
  canvas.style.opacity = 0;
}

function stopLoading() {
	loading.hidden = true;
	notLoading.hidden = false; 
	canvas.style.opacity = 1;
}

function draw() {
  if (img) { //if change background is clicked 
    image(img, 0, 0, contentImg.width, contentImg.height);

}


	//draw graphics element aka the drawing
	image(pg, 0, 0, contentImg.width, contentImg.height);

  


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

function handleFile() {
	
}