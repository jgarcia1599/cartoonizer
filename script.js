const model = new mi.ArbitraryStyleTransferNetwork();
const canvas = document.getElementById('stylized');
const ctx = canvas.getContext('2d');
const contentImg = document.getElementById('content');
const styleImg = document.getElementById('style');
const loading = document.getElementById('loading');
const notLoading = document.getElementById('ready');

setupDemo();

function setupDemo() {
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
    ctx.putImageData(imageData, 0, 0);
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




//Drawing

var mousePressed = false;
var lastX, lastY;


$('#stylized').mousedown(function (e) {
  mousePressed = true;
  Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
});

$('#stylized').mousemove(function (e) {
  if (mousePressed) {
      Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
  }
});

$('#stylized').mouseup(function (e) {
  mousePressed = false;
});
$('#stylized').mouseleave(function (e) {
  mousePressed = false;
});


function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}

download_img = function(el) {
  var image = canvas.toDataURL("image/jpg");
  el.href = image;
};

//New Canvas setup resources: 

//https://jsfiddle.net/user2314737/28wqq1gu/
//https://www.codicode.com/art/how_to_draw_on_a_html5_canvas_with_a_mouse.aspx
	
