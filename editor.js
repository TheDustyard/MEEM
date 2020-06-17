function loadImage(imgid, fileinput) {
    var img = document.getElementById(imgid);
    var file = fileinput.files[0];
    var reader  = new FileReader();
    
    reader.addEventListener("load", function () {
        img.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}


function save() {
    html2canvas(document.getElementById("meme"), {
        logging: true,
        onrendered: function (canvas) {
            var link = document.createElement("a");
            link.href = canvas.toDataURL('image/jpg');
            link.download = 'meme.png';
            link.click();
        }
    });
}

function deepfry() {
    var image = document.createElement('img');
    image.src = document.getElementById('testimage').style.backgroundImage.slice(4, -1).replace(/"/g, "");
    var imgCanvas = document.createElement("canvas");
    var imgContext = imgCanvas.getContext("2d");
    
    imgCanvas.width = image.width;
    imgCanvas.height = image.height;
    
    imgContext.drawImage(image, 0, 0, image.width, image.height);
    
    //imgCanvas.id = "afadsfadsfasdfadfadsfadsf";
    
    //document.getElementById('content').appendChild(imgCanvas);
    
    //console.log(imgInfom);
    Caman(imgCanvas, function () {
        this.brightness(30);
        this.contrast(30);
        this.saturation(100);
        this.exposure(30);
        this.sharpen(100);
        this.hue(100);
        this.vibrance(30);
        this.render(function () {
            var imgInfom = imgCanvas.toDataURL("image/png");
            document.getElementById('testimage').style.backgroundImage = `url(${imgInfom})`;
        });
    });
}

function addListeners(){
    document.getElementById('lenseflare').addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);
}

function mouseUp() {
    window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e) {
  window.addEventListener('mousemove', divMove, true);
}

function getOffset() {
    return $("#meme").offset();
}
function divMove(e) {
    $("#lenseflare").css({
        left: e.pageX - getOffset().left,
        top: e.pageY - getOffset().top
    });
    
    console.log($("#lenseflare").css("left") + ":" + $("#lenseflare").css("top"));
}

/**
*  SETTABLE IMAGE API
*/
var settableimages = {};

settableimages.init = function () {
    var images = document.getElementsByClassName('settableimage');
    for(var i = 0; i < images.length; i++) {
        let item = images.item(i);
        
        item.setAttribute('data-setimagelinkid', i);
        
        let input = document.createElement('input');
        let button = document.createElement('button');
        
        input.setAttribute('type', "file");
        input.setAttribute('data-inputlinkid', i);
        input.setAttribute('onchange', `settableimages.setIMG(${i}, this)`);
        button.setAttribute('onclick', `$('[data-inputlinkid=${i}]').click()`);
        button.innerHTML = "Load image";
        
        item.appendChild(input);
        item.appendChild(button);
    }
};

settableimages.setIMG = function (linkid, input) {
    var element = $(`[data-setimagelinkid=${linkid}]`);
    var elem = element[0];
    if(!input.files) return;
    var file = input.files[0];
    var reader  = new FileReader();

    element.children().css("visibility", "hidden");
    
    reader.addEventListener("load", function () {
        elem.style.backgroundImage = `url(${reader.result})`;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
};

settableimages.clearIMG = function (menu) {
    var linkedid = $(menu).parent()[0].getAttribute('data-linkedsetimagelinkid');
    var imagething = $(`[data-setimagelinkid=${linkedid}]`);
    
    imagething.css('background-image', '');
    imagething.children('*:not(input)').css("visibility", "visible");
};

settableimages.setIMGSize = function (menu, size) {
    var linkedid = $(menu).parent()[0].getAttribute('data-linkedsetimagelinkid');
    var imagething = $(`[data-setimagelinkid=${linkedid}]`);
    
    imagething.css('background-size', size);
};

settableimages.initContext = function (menu) {
    var linkedid = $(menu)[0].getAttribute('data-linkedsetimagelinkid');
    var imagething = $(`[data-setimagelinkid=${linkedid}]`);
    
    var backsize = imagething.css('background-size');
    
    $(menu).children('.selected').removeClass('selected');
    $(menu).find(`#imagesize-${backsize}`).addClass('selected');
    
}