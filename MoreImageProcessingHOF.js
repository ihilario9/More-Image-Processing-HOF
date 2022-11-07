let robot = lib220.loadImageFromURL('https://people.cs.umass.edu/~joydeepb/robot.jpg');


//imageMapCoord(img: Image, func: (img: Image, x: number, y: number) => Pixel): Image

function imageMapCoord(img, func) {
  let imageCopy = img.copy();
  for (let x = 0; x < imageCopy.width; ++x) {
    for (let y = 0; y < imageCopy.height; ++y) {
      let functionCall = func(imageCopy, x, y);
      imageCopy.setPixel(x, y, functionCall);
    } 
  }
  return imageCopy;
}

imageMapCoord(robot, function(img, x, y) {
  return [img.getPixel(x, y)[0], 0, 0];
}).show();

//imageMapIf(img: Image, cond: (img: Image, x: number, y: number) => boolean,
//func: (p: Pixel) => Pixel): Image

function imageMapIf(img, cond, func) {

    let imgIfCopy = img.copy(); 
    function mapIfHelper (imgIfCopy, x, y) {
      let pixel = imgIfCopy.getPixel(x, y);
      if (cond(img, x, y)) {
        return func(pixel);
      }
      else{
        return pixel;
      }
    }
    return imageMapCoord(imgIfCopy, mapIfHelper); 
}

//mapWindow(img: Image, xmin: number, ymin: number, xmax: number, ymax: number,
//func: (p: Pixel) => Pixel): Image

function mapWindow(img, xmin, ymin, xmax, ymax, func) {
  
  let imgWindowCopy = img.copy();

  function mapWindowHelper(imgWindowCopy, x, y) {
    return (xmin <= x && xmax >= x && ymin <= y && ymax >= y);
  }

  return imageMapIf(imgWindowCopy, mapWindowHelper, func);

}
  

  




//makeBorder(img: Image, thickness: number, func: (p: Pixel) => Pixel): Image
function makeBorder(img, thickness, func) {
  let imgBorderCopy = img.copy();
  function makeBorderHelper(imgBorderCopy, x, y) {
    let pixel = imgBorderCopy.getPixel(x, y);
    if (x < thickness || y < thickness) {
      return true;
    }
    if (Math.abs(x - (imgBorderCopy.width - 1)) < thickness || Math.abs(y - (imgBorderCopy.height - 1)) < thickness) {
      return true;
    }
      return false;
  }
  return imageMapIf(imgBorderCopy, makeBorderHelper, func);
}

//dimCenter(img: Image, thickness: number): Image
function dimCenter(img, thickness) {
  //makeBorder and dimCenter are opposite
  let imgDimCopy = img.copy();


  function dimCenterHelper(imgDimCopy, x, y) {
    let dimArray = imgDimCopy.getPixel(x, y);

    let m0 = (dimArray[0]);
    let m1 = (dimArray[1]);
    let m2 = (dimArray[2]);

    if ((x < thickness || y < thickness) === true) {
      return imgDimCopy.getPixel(x, y);
    }
    if ((Math.abs(x - (imgDimCopy.width - 1)) < thickness || Math.abs(y - (imgDimCopy.height - 1)) < thickness) === true) {
      return imgDimCopy.getPixel(x, y);
    }
      return imgDimCopy.setPixel(x, y, [(m0*0.8), (m1*0.8), (m2*0.8)]);

  }
  return imgDimCopy;
  //return imageMapIf(imgDimCopy, dimCenterHelper, func);
}
//dimCenter(robot, 10).show();


imageMapCoord(robot, function(img, x, y) {
return [img.getPixel(x, y)[0], 0, 0];
}).show();


//redBorder(img: Image, thickness: number): Image
function redBorder(img, thickness) {
  let imgRedCopy = img.copy();
  function redBorderHelper(imgRedCopy) {
    //thickness = [0, 0, 0];

     // return [imgRedCopy.getPixel(x, y)[0], 0, 0];

  }
  return imgRedCopy;
  //return makeBorder(imgRedCopy, thickness, redBorderHelper);
}

redBorder(robot, 10).show(); 

imageMapCoord(robot, function(img, x, y) {
return [img.getPixel(x, y)[0], 0, 0];
}).show();

//grayBorder(img: Image, thickness: number): Image
function grayBorder(img, thickness) {
  let imgGrayCopy = img.copy();
  function grayBorderHelper(m) {
    //let grayArray = imgGrayCopy.getPixel(x, y);
    //thickness = [m, m, m];
   // let m = ((grayArray[0] + grayArray[1] + grayArray[2])/3);
    //let distBtwTwoPixels = (Math.abs(x - (imgGrayCopy.width - 1)) + Math.abs(y - (imgGrayCopy.height - 1)));
    //if (distBtwTwoPixels < thickness === true) {
    //  return imgGrayCopy.getPixel(x, y);
    //}
    //else { //multiply by 0.8 to reduce by 20%
      //return thickness;
   // }

  }
  return imgGrayCopy;
  //return makeBorder(imgGrayCopy, thickness, grayBorderHelper);
}

//grayBorder(robot, 20).show(); 




test('imageMapCoord function definition is correct', function() {
function identity(image, x, y) { return image.getPixel(x, y); }
let inputImage = lib220.createImage(10, 10, [0, 0, 0]);
let outputImage = imageMapCoord(inputImage, identity);
let p = outputImage.getPixel(0, 0); // output should be an image, getPixel works
assert(p.every(c => c === 0)); // every pixel channel is 0
assert(inputImage !== outputImage); // output should be a different image object
});


function pixelEq (p1, p2) {
const epsilon = 0.002; // increase for repeated storing & rounding
return [0,1,2].every(i => Math.abs(p1[i] - p2[i]) <= epsilon);
};


test('identity function with imageMapCoord', function() {
let identityFunction = function(image, x, y ) {
return image.getPixel(x, y);
};
let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
inputImage.setPixel(0, 0, [0.5, 0.5, 0.5]);
inputImage.setPixel(5, 5, [0.1, 0.2, 0.3]);
inputImage.setPixel(2, 8, [0.9, 0.7, 0.8]);
let outputImage = imageMapCoord(inputImage, identityFunction);
assert(pixelEq(outputImage.getPixel(0, 0), [0.5, 0.5, 0.5]));
assert(pixelEq(outputImage.getPixel(5, 5), [0.1, 0.2, 0.3]));
assert(pixelEq(outputImage.getPixel(2, 8), [0.9, 0.7, 0.8]));
assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.2, 0.2]));
});

