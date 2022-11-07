let robot = lib220.loadImageFromURL('https://people.cs.umass.edu/~joydeepb/robot.jpg');

//weight of one neighbor is 1/3, 
//so weight of having two neighbors would total to 2/3, 
//1/3 each neighbor
//lineBlur3p(img: Image, lineNo: number): void
function lineBlur3p(img, lineNo) {
  let sumRed = 0;
  let sumGreen = 0;
  let sumBlue = 0;

  let imgToExtractPixelsFrom = img.copy();

  for (let y = 0; y < img.height; ++y) {
    if(y === lineNo) {
      for (let x = 0; x < img.width; ++x) {
        if(((x-1) >= 0 && (x-1) < img.width) && ((x+1) >= 0 && (x+1) < img.width)) {
          let arrToLeft = imgToExtractPixelsFrom.getPixel(x-1, lineNo);
          let arrToRight = imgToExtractPixelsFrom.getPixel(x+1, lineNo);
          let arrOriginal = imgToExtractPixelsFrom.getPixel(x, lineNo);

          let leftWt = 1/3;
          let rightWt = 1/3;
          let originalWt = 1 - (leftWt+rightWt);

          let arrToLeftAfter = arrToLeft.map(rgbL=>rgbL*leftWt);
          let arrToRightAfter = arrToRight.map(rgbR=> rgbR*rightWt);
          let arrOriginalAfter = arrOriginal.map(rgb=> rgb*originalWt);

          sumRed = arrToLeftAfter[0] + arrToRightAfter[0] + arrOriginalAfter[0];
          sumGreen = arrToLeftAfter[1] + arrToRightAfter[1] + arrOriginalAfter[1];
          sumBlue = arrToLeftAfter[2] + arrToRightAfter[2] + arrOriginalAfter[2];  

          img.setPixel(x, lineNo, [sumRed, sumGreen, sumBlue]);
 
        }  

        if(((x-1) >= 0 && (x-1) < img.width) && ((x+1) < 0 || (x+1) > img.width)) {
          let arrToLeft = imgToExtractPixelsFrom.getPixel(x-1, lineNo);
          let arrOriginal = imgToExtractPixelsFrom.getPixel(x, lineNo);

          let leftWt = 1/3;
          let rightWt = 0;
          let originalWt = 1 - (leftWt+rightWt);

          let arrToLeftAfter = arrToLeft.map(rgbL=>rgbL*leftWt);
          let arrOriginalAfter = arrOriginal.map(rgb=> rgb*originalWt);

          sumRed = arrToLeftAfter[0] + arrOriginalAfter[0];
          sumGreen = arrToLeftAfter[1] + arrOriginalAfter[1];
          sumBlue = arrToLeftAfter[2] + arrOriginalAfter[2]; 

          img.setPixel(x, lineNo, [sumRed, sumGreen, sumBlue]);
                    
        }
        if(((x-1) < 0 || (x-1) > img.width) && ((x+1) >= 0 && (x+1) < img.width)){
          let arrToRight = imgToExtractPixelsFrom.getPixel(x+1, lineNo);
          let arrOriginal = imgToExtractPixelsFrom.getPixel(x, lineNo);

          let leftWt = 0;
          let rightWt = 1/3;
          let originalWt = 1 - (leftWt+rightWt);

          let arrToRightAfter = arrToRight.map(rgbR=> rgbR*rightWt);
          let arrOriginalAfter = arrOriginal.map(rgb=> rgb*originalWt);

          sumRed = arrToRightAfter[0] + arrOriginalAfter[0];
          sumGreen = arrToRightAfter[1] + arrOriginalAfter[1];
          sumBlue = arrToRightAfter[2] + arrOriginalAfter[2]; 

          img.setPixel(x, lineNo, [sumRed, sumGreen, sumBlue]);

        }
        if(((x-1) < 0 || (x-1) > img.width) && ((x+1) < 0 || (x+1) > img.width)) {
          let arrOriginal = imgToExtractPixelsFrom.getPixel(x, lineNo);

          let leftWt = 0;
          let rightWt = 0;
          let originalWt = 1 - (leftWt+rightWt);

          let arrOriginalAfter = arrOriginal.map(rgb=> rgb*originalWt);

          sumRed = arrOriginalAfter[0];
          sumGreen = arrOriginalAfter[1];
          sumBlue = arrOriginalAfter[2]; 

          img.setPixel(x, lineNo, [sumRed, sumGreen, sumBlue]);
        }
      }
    }
  }
} 
  


//lineBlur5p(img: Image, lineNo: number): void
function lineBlur5p(img, lineNo) {
  let sumRed = 0;
  let sumGreen = 0;
  let sumBlue = 0;

  let imgToExtractPixelsFrom = img.copy();

  for (let y = 0; y < img.height; ++y) {
    if(y === lineNo) {
      for (let x = 0; x < img.width; ++x) {

        //x-1 valid, x+1 valid, x-2 valid, x+2 valid
        if(((x-1) >= 0 && (x-1) < img.width) && ((x+1) >= 0 && (x+1) < img.width) && ((x-2) >= 0 && (x-2) < img.width) && ((x+2) >= 0 && (x+2) < img.width)) {
          let arrToLeft1 = imgToExtractPixelsFrom.getPixel(x-1, lineNo);
          let arrToRight1 = imgToExtractPixelsFrom.getPixel(x+1, lineNo);
          let arrToLeft2 = imgToExtractPixelsFrom.getPixel(x-2, lineNo);
          let arrToRight2 = imgToExtractPixelsFrom.getPixel(x+2, lineNo);

          let arrOriginal = imgToExtractPixelsFrom.getPixel(x, lineNo);

          let leftWt1 = 1/5;
          let rightWt1 = 1/5;
          let leftWt2 = 1/5;
          let rightWt2 = 1/5;
          let originalWt = 1 - (leftWt1+rightWt1+leftWt2+rightWt2);

          let arrToLeftAfter1 = arrToLeft1.map(rgbL1=>rgbL1*leftWt1);
          let arrToRightAfter1 = arrToRight1.map(rgbR1=> rgbR1*rightWt1);
          let arrToLeftAfter2 = arrToLeft2.map(rgbL2=>rgbL2*leftWt2);
          let arrToRightAfter2 = arrToRight2.map(rgbR2=> rgbR2*rightWt2);

          let arrOriginalAfter = arrOriginal.map(rgb=> rgb*originalWt);

          sumRed = arrToLeftAfter1[0] + arrToRightAfter1[0] + arrToLeftAfter2[0] + arrToRightAfter2[0] + arrOriginalAfter[0];
          sumGreen = arrToLeftAfter1[1] + arrToRightAfter1[1] + arrToLeftAfter2[1] + arrToRightAfter2[1] + arrOriginalAfter[1];
          sumBlue = arrToLeftAfter1[2] + arrToRightAfter1[2] + arrToLeftAfter2[2] + arrToRightAfter2[2] + arrOriginalAfter[2];  

          img.setPixel(x, lineNo, [sumRed, sumGreen, sumBlue]);
        }

        //x-1 valid, x+1 valid, x-2 valid, x+2 invalid
        if(((x-1) >= 0 && (x-1) < img.width) && ((x+1) >= 0 && (x+1) < img.width) && ((x-2) >= 0 && (x-2) < img.width) && ((x+2) < 0 || (x+2) > img.width)) {
          let arrToLeft1 = imgToExtractPixelsFrom.getPixel(x-1, lineNo);
          let arrToRight1 = imgToExtractPixelsFrom.getPixel(x+1, lineNo);
          let arrToLeft2 = imgToExtractPixelsFrom.getPixel(x-2, lineNo);

          let arrOriginal = imgToExtractPixelsFrom.getPixel(x, lineNo);

          let leftWt1 = 1/5;
          let rightWt1 = 1/5;
          let leftWt2 = 1/5;
          let rightWt2 = 0;
          let originalWt = 1 - (leftWt1+rightWt1+leftWt2+rightWt2);

          let arrToLeftAfter1 = arrToLeft1.map(rgbL1=>rgbL1*leftWt1);
          let arrToRightAfter1 = arrToRight1.map(rgbR1=> rgbR1*rightWt1);
          let arrToLeftAfter2 = arrToLeft2.map(rgbL2=>rgbL2*leftWt2);
         
          let arrOriginalAfter = arrOriginal.map(rgb=> rgb*originalWt);

          sumRed = arrToLeftAfter1[0] + arrToRightAfter1[0] + arrToLeftAfter2[0] + arrOriginalAfter[0];
          sumGreen = arrToLeftAfter1[1] + arrToRightAfter1[1] + arrToLeftAfter2[1] + arrOriginalAfter[1];
          sumBlue = arrToLeftAfter1[2] + arrToRightAfter1[2] + arrToLeftAfter2[2] + arrOriginalAfter[2];  

          img.setPixel(x, lineNo, [sumRed, sumGreen, sumBlue]);
 
        }  

        //x-1 valid, x+1 valid, x-2 invalid, x+2 valid
        if(((x-1) >= 0 && (x-1) < img.width) && ((x+1) >= 0 && (x+1) < img.width) && ((x-2) < 0 || (x-2) > img.width) && ((x+2) >= 0 && (x+2) < img.width)) {
          let arrToLeft1 = imgToExtractPixelsFrom.getPixel(x-1, lineNo);
          let arrToRight1 = imgToExtractPixelsFrom.getPixel(x+1, lineNo);
          let arrToRight2 = imgToExtractPixelsFrom.getPixel(x+2, lineNo);

          let arrOriginal = imgToExtractPixelsFrom.getPixel(x, lineNo);

          let leftWt1 = 1/5;
          let rightWt1 = 1/5;
          let leftWt2 = 0;
          let rightWt2 = 1/5;
          let originalWt = 1 - (leftWt1+rightWt1+leftWt2+rightWt2);

          let arrToLeftAfter1 = arrToLeft1.map(rgbL1=>rgbL1*leftWt1);
          let arrToRightAfter1 = arrToRight1.map(rgbR1=> rgbR1*rightWt1);
          let arrToRightAfter2 = arrToRight2.map(rgbR2=> rgbR2*rightWt2);

          let arrOriginalAfter = arrOriginal.map(rgb=> rgb*originalWt);

          sumRed = arrToLeftAfter1[0] + arrToRightAfter1[0] + arrToRightAfter2[0] + arrOriginalAfter[0];
          sumGreen = arrToLeftAfter1[1] + arrToRightAfter1[1] + arrToRightAfter2[1] + arrOriginalAfter[1];
          sumBlue = arrToLeftAfter1[2] + arrToRightAfter1[2] + arrToRightAfter2[2] + arrOriginalAfter[2];  

          img.setPixel(x, lineNo, [sumRed, sumGreen, sumBlue]);
        }
        
        //x-1 valid, x+1 valid, x-2 invalid, x+2 invalid
        if(((x-1) >= 0 && (x-1) < img.width) && ((x+1) >= 0 && (x+1) < img.width) && ((x-2) < 0 || (x-2) > img.width) && ((x+2) < 0 || (x+2) > img.width)) {
          let arrToLeft1 = imgToExtractPixelsFrom.getPixel(x-1, lineNo);
          let arrToRight1 = imgToExtractPixelsFrom.getPixel(x+1, lineNo);

          let arrOriginal = imgToExtractPixelsFrom.getPixel(x, lineNo);

          let leftWt1 = 1/5;
          let rightWt1 = 1/5;
          let leftWt2 = 0;
          let rightWt2 = 0;
          let originalWt = 1 - (leftWt1+rightWt1+leftWt2+rightWt2);

          let arrToLeftAfter1 = arrToLeft1.map(rgbL1=>rgbL1*leftWt1);
          let arrToRightAfter1 = arrToRight1.map(rgbR1=> rgbR1*rightWt1);

          let arrOriginalAfter = arrOriginal.map(rgb=> rgb*originalWt);

          sumRed = arrToLeftAfter1[0] + arrToRightAfter1[0] + arrOriginalAfter[0];
          sumGreen = arrToLeftAfter1[1] + arrToRightAfter1[1] + arrOriginalAfter[1];
          sumBlue = arrToLeftAfter1[2] + arrToRightAfter1[2] + arrOriginalAfter[2];  

          img.setPixel(x, lineNo, [sumRed, sumGreen, sumBlue]);
        }

        //x-1 valid, x+1 invalid, x-2 valid, x+2 valid
        if(((x-1) >= 0 && (x-1) < img.width) && ((x+1) < 0 || (x+1) > img.width) && ((x-2) >= 0 && (x-2) < img.width) && ((x+2) >= 0 && (x+2) < img.width)) {
          let arrToLeft1 = imgToExtractPixelsFrom.getPixel(x-1, lineNo);
          let arrToLeft2 = imgToExtractPixelsFrom.getPixel(x-2, lineNo);
          let arrToRight2 = imgToExtractPixelsFrom.getPixel(x+2, lineNo);

          let arrOriginal = imgToExtractPixelsFrom.getPixel(x, lineNo);

          let leftWt1 = 1/5;
          let rightWt1 = 0;
          let leftWt2 = 1/5;
          let rightWt2 = 1/5;
          let originalWt = 1 - (leftWt1+rightWt1+leftWt2+rightWt2);

          let arrToLeftAfter1 = arrToLeft1.map(rgbL1=>rgbL1*leftWt1);
          let arrToLeftAfter2 = arrToLeft2.map(rgbL2=>rgbL2*leftWt2);
          let arrToRightAfter2 = arrToRight2.map(rgbR2=> rgbR2*rightWt2);

          let arrOriginalAfter = arrOriginal.map(rgb=> rgb*originalWt);

          sumRed = arrToLeftAfter1[0] + arrToLeftAfter2[0] + arrToRightAfter2[0] + arrOriginalAfter[0];
          sumGreen = arrToLeftAfter1[1] + arrToLeftAfter2[1] + arrToRightAfter2[1] + arrOriginalAfter[1];
          sumBlue = arrToLeftAfter1[2] + arrToLeftAfter2[2] + arrToRightAfter2[2] + arrOriginalAfter[2];  

          img.setPixel(x, lineNo, [sumRed, sumGreen, sumBlue]);
 
        }

        //x-1 valid, x+1 invalid, x-2 valid, x+2 invalid
        if(((x-1) >= 0 && (x-1) < img.width) && ((x+1) < 0 || (x+1) > img.width) && ((x-2) >= 0 && (x-2) < img.width) && ((x+2) < 0 || (x+2) > img.width)) {
          let arrToLeft1 = imgToExtractPixelsFrom.getPixel(x-1, lineNo);
          let arrToLeft2 = imgToExtractPixelsFrom.getPixel(x-2, lineNo);

          let arrOriginal = imgToExtractPixelsFrom.getPixel(x, lineNo);

          let leftWt1 = 1/5;
          let rightWt1 = 0;
          let leftWt2 = 1/5;
          let rightWt2 = 0;
          let originalWt = 1 - (leftWt1+rightWt1+leftWt2+rightWt2);

          let arrToLeftAfter1 = arrToLeft1.map(rgbL1=>rgbL1*leftWt1);
          let arrToLeftAfter2 = arrToLeft2.map(rgbL2=>rgbL2*leftWt2);

          let arrOriginalAfter = arrOriginal.map(rgb=> rgb*originalWt);

          sumRed = arrToLeftAfter1[0] + arrToLeftAfter2[0] + arrOriginalAfter[0];
          sumGreen = arrToLeftAfter1[1] + arrToLeftAfter2[1] + arrOriginalAfter[1];
          sumBlue = arrToLeftAfter1[2] + arrToLeftAfter2[2] + arrOriginalAfter[2];  

          img.setPixel(x, lineNo, [sumRed, sumGreen, sumBlue]);
        }

        //x-1 valid, x+1 invalid, x-2 invalid, x+2 valid
        if(((x-1) >= 0 && (x-1) < img.width) && ((x+1) < 0 || (x+1) > img.width) && ((x-2) < 0 || (x-2) > img.width) && ((x+2) >= 0 && (x+2) < img.width)) {
          let arrToLeft1 = imgToExtractPixelsFrom.getPixel(x-1, lineNo);
          let arrToRight2 = imgToExtractPixelsFrom.getPixel(x+2, lineNo);

          let arrOriginal = imgToExtractPixelsFrom.getPixel(x, lineNo);

          let leftWt1 = 1/5;
          let rightWt1 = 0;
          let leftWt2 = 0;
          let rightWt2 = 1/5;
          let originalWt = 1 - (leftWt1+rightWt1+leftWt2+rightWt2);

          let arrToLeftAfter1 = arrToLeft1.map(rgbL1=>rgbL1*leftWt1);
          let arrToRightAfter2 = arrToRight2.map(rgbR2=> rgbR2*rightWt2);

          let arrOriginalAfter = arrOriginal.map(rgb=> rgb*originalWt);

          sumRed = arrToLeftAfter1[0] + arrToRightAfter2[0] + arrOriginalAfter[0];
          sumGreen = arrToLeftAfter1[1] + arrToRightAfter2[1] + arrOriginalAfter[1];
          sumBlue = arrToLeftAfter1[2] + arrToRightAfter2[2] + arrOriginalAfter[2];  

          img.setPixel(x, lineNo, [sumRed, sumGreen, sumBlue]);
        }
 
        //x-1 valid, x+1 invalid, x-2 invalid, x+2 invalid
        if(((x-1) >= 0 && (x-1) < img.width) && ((x+1) < 0 || (x+1) > img.width) && ((x-2) < 0 || (x-2) > img.width) && ((x+2) < 0 || (x+2) > img.width)) {
          let arrToLeft1 = imgToExtractPixelsFrom.getPixel(x-1, lineNo);

          let arrOriginal = imgToExtractPixelsFrom.getPixel(x, lineNo);

          let leftWt1 = 1/5;
          let rightWt1 = 0;
          let leftWt2 = 0;
          let rightWt2 = 0;
          let originalWt = 1 - (leftWt1+rightWt1+leftWt2+rightWt2);

          let arrToLeftAfter1 = arrToLeft1.map(rgbL1=>rgbL1*leftWt1);

          let arrOriginalAfter = arrOriginal.map(rgb=> rgb*originalWt);

          sumRed = arrToLeftAfter1[0] + arrOriginalAfter[0];
          sumGreen = arrToLeftAfter1[1] + arrOriginalAfter[1];
          sumBlue = arrToLeftAfter1[2] + arrOriginalAfter[2];  

          img.setPixel(x, lineNo, [sumRed, sumGreen, sumBlue]);
        }

        //x-1 invalid, x+1 valid, x-2 valid, x+2 valid
        if(((x-1) < 0 || (x-1) > img.width) && ((x+1) >= 0 && (x+1) < img.width) && ((x-2) >= 0 && (x-2) < img.width) && ((x+2) >= 0 && (x+2) < img.width)) {
          let arrToRight1 = imgToExtractPixelsFrom.getPixel(x+1, lineNo);
          let arrToLeft2 = imgToExtractPixelsFrom.getPixel(x-2, lineNo);
          let arrToRight2 = imgToExtractPixelsFrom.getPixel(x+2, lineNo);

          let arrOriginal = imgToExtractPixelsFrom.getPixel(x, lineNo);

          let leftWt1 = 0;
          let rightWt1 = 1/5;
          let leftWt2 = 1/5;
          let rightWt2 = 1/5;
          let originalWt = 1 - (leftWt1+rightWt1+leftWt2+rightWt2);

          let arrToRightAfter1 = arrToRight1.map(rgbR1=> rgbR1*rightWt1);
          let arrToLeftAfter2 = arrToLeft2.map(rgbL2=>rgbL2*leftWt2);
          let arrToRightAfter2 = arrToRight2.map(rgbR2=> rgbR2*rightWt2);

          let arrOriginalAfter = arrOriginal.map(rgb=> rgb*originalWt);

          sumRed = arrToRightAfter1[0] + arrToLeftAfter2[0] + arrToRightAfter2[0] + arrOriginalAfter[0];
          sumGreen = arrToRightAfter1[1] + arrToLeftAfter2[1] + arrToRightAfter2[1] + arrOriginalAfter[1];
          sumBlue = arrToRightAfter1[2] + arrToLeftAfter2[2] + arrToRightAfter2[2] + arrOriginalAfter[2];  

          img.setPixel(x, lineNo, [sumRed, sumGreen, sumBlue]);
        }

        //x-1 invalid, x+1 valid, x-2 valid, x+2 invalid
        if(((x-1) < 0 || (x-1) > img.width) && ((x+1) >= 0 && (x+1) < img.width) && ((x-2) >= 0 && (x-2) < img.width) && ((x+2) < 0 || (x+2) > img.width)) {
          let arrToRight1 = imgToExtractPixelsFrom.getPixel(x+1, lineNo);
          let arrToLeft2 = imgToExtractPixelsFrom.getPixel(x-2, lineNo);
    
          let arrOriginal = imgToExtractPixelsFrom.getPixel(x, lineNo);

          let leftWt1 = 0;
          let rightWt1 = 1/5;
          let leftWt2 = 1/5;
          let rightWt2 = 0;
          let originalWt = 1 - (leftWt1+rightWt1+leftWt2+rightWt2);

          let arrToRightAfter1 = arrToRight1.map(rgbR1=> rgbR1*rightWt1);
          let arrToLeftAfter2 = arrToLeft2.map(rgbL2=>rgbL2*leftWt2);

          let arrOriginalAfter = arrOriginal.map(rgb=> rgb*originalWt);

          sumRed = arrToRightAfter1[0] + arrToLeftAfter2[0] + arrOriginalAfter[0];
          sumGreen = arrToRightAfter1[1] + arrToLeftAfter2[1] + arrOriginalAfter[1];
          sumBlue = arrToRightAfter1[2] + arrToLeftAfter2[2] + arrOriginalAfter[2];  

          img.setPixel(x, lineNo, [sumRed, sumGreen, sumBlue]);
        }

        //x-1 invalid, x+1 valid, x-2 invalid, x+2 valid
        if(((x-1) < 0 || (x-1) > img.width) && ((x+1) >= 0 && (x+1) < img.width) && ((x-2) < 0 || (x-2) > img.width) && ((x+2) >= 0 && (x+2) < img.width)) {
          let arrToRight1 = imgToExtractPixelsFrom.getPixel(x+1, lineNo);
          let arrToRight2 = imgToExtractPixelsFrom.getPixel(x+2, lineNo);

          let arrOriginal = imgToExtractPixelsFrom.getPixel(x, lineNo);

          let leftWt1 = 0;
          let rightWt1 = 1/5;
          let leftWt2 = 0;
          let rightWt2 = 1/5;
          let originalWt = 1 - (leftWt1+rightWt1+leftWt2+rightWt2);

          let arrToRightAfter1 = arrToRight1.map(rgbR1=> rgbR1*rightWt1);
          let arrToRightAfter2 = arrToRight2.map(rgbR2=> rgbR2*rightWt2);

          let arrOriginalAfter = arrOriginal.map(rgb=> rgb*originalWt);

          sumRed = arrToRightAfter1[0] + arrToRightAfter2[0] + arrOriginalAfter[0];
          sumGreen = arrToRightAfter1[1] + arrToRightAfter2[1] + arrOriginalAfter[1];
          sumBlue = arrToRightAfter1[2] + arrToRightAfter2[2] + arrOriginalAfter[2];  

          img.setPixel(x, lineNo, [sumRed, sumGreen, sumBlue]);
        }

        //x-1 invalid, x+1 valid, x-2 invalid, x+2 invalid
        if(((x-1) < 0 || (x-1) > img.width) && ((x+1) >= 0 && (x+1) < img.width) && ((x-2) < 0 || (x-2) > img.width) && ((x+2) < 0 || (x+2) > img.width)) {
          let arrToRight1 = imgToExtractPixelsFrom.getPixel(x+1, lineNo);

          let arrOriginal = imgToExtractPixelsFrom.getPixel(x, lineNo);

          let leftWt1 = 0;
          let rightWt1 = 1/5;
          let leftWt2 = 0;
          let rightWt2 = 0;
          let originalWt = 1 - (leftWt1+rightWt1+leftWt2+rightWt2);

          let arrToRightAfter1 = arrToRight1.map(rgbR1=> rgbR1*rightWt1);

          let arrOriginalAfter = arrOriginal.map(rgb=> rgb*originalWt);

          sumRed = arrToRightAfter1[0] + arrOriginalAfter[0];
          sumGreen = arrToRightAfter1[1] + arrOriginalAfter[1];
          sumBlue = arrToRightAfter1[2] + arrOriginalAfter[2];  

          img.setPixel(x, lineNo, [sumRed, sumGreen, sumBlue]);
        }

        //x-1 invalid, x+1 invalid, x-2 valid, x+2 valid
        if(((x-1) < 0 || (x-1) > img.width) && ((x+1) < 0 || (x+1) > img.width) && ((x-2) >= 0 && (x-2) < img.width) && ((x+2) >= 0 && (x+2) < img.width)) {
          let arrToLeft2 = imgToExtractPixelsFrom.getPixel(x-2, lineNo);
          let arrToRight2 = imgToExtractPixelsFrom.getPixel(x+2, lineNo);

          let arrOriginal = imgToExtractPixelsFrom.getPixel(x, lineNo);

          let leftWt1 = 0;
          let rightWt1 = 0;
          let leftWt2 = 1/5;
          let rightWt2 = 1/5;
          let originalWt = 1 - (leftWt1+rightWt1+leftWt2+rightWt2);

          let arrToLeftAfter2 = arrToLeft2.map(rgbL2=>rgbL2*leftWt2);
          let arrToRightAfter2 = arrToRight2.map(rgbR2=> rgbR2*rightWt2);

          let arrOriginalAfter = arrOriginal.map(rgb=> rgb*originalWt);

          sumRed = arrToLeftAfter2[0] + arrToRightAfter2[0] + arrOriginalAfter[0];
          sumGreen = arrToLeftAfter2[1] + arrToRightAfter2[1] + arrOriginalAfter[1];
          sumBlue = arrToLeftAfter2[2] + arrToRightAfter2[2] + arrOriginalAfter[2];  

          img.setPixel(x, lineNo, [sumRed, sumGreen, sumBlue]);
        }

        //x-1 invalid, x+1 invalid, x-2 valid, x+2 invalid
        if(((x-1) < 0 || (x-1) > img.width) && ((x+1) < 0 || (x+1) > img.width) && ((x-2) >= 0 && (x-2) < img.width) && ((x+2) < 0 || (x+2) > img.width)) {
          let arrToLeft2 = imgToExtractPixelsFrom.getPixel(x-2, lineNo);

          let arrOriginal = imgToExtractPixelsFrom.getPixel(x, lineNo);

          let leftWt1 = 0;
          let rightWt1 = 0;
          let leftWt2 = 1/5;
          let rightWt2 = 0;
          let originalWt = 1 - (leftWt1+rightWt1+leftWt2+rightWt2);

          let arrToLeftAfter2 = arrToLeft2.map(rgbL2=>rgbL2*leftWt2);

          let arrOriginalAfter = arrOriginal.map(rgb=> rgb*originalWt);

          sumRed = arrToLeftAfter2[0] + arrOriginalAfter[0];
          sumGreen = arrToLeftAfter2[1] + arrOriginalAfter[1];
          sumBlue = arrToLeftAfter2[2] + arrOriginalAfter[2];  

          img.setPixel(x, lineNo, [sumRed, sumGreen, sumBlue]);
        }

        //x-1 invalid, x+1 invalid, x-2 invalid, x+2 valid
        if(((x-1) < 0 || (x-1) > img.width) && ((x+1) < 0 || (x+1) > img.width) && (x-2) < 0 || (x-2) > img.width && (x+2) >= 0 && (x+2) < img.width) {
          let arrToRight2 = imgToExtractPixelsFrom.getPixel(x+2, lineNo);

          let arrOriginal = imgToExtractPixelsFrom.getPixel(x, lineNo);

          let leftWt1 = 0;
          let rightWt1 = 0;
          let leftWt2 = 0;
          let rightWt2 = 1/5;
          let originalWt = 1 - (leftWt1+rightWt1+leftWt2+rightWt2);

          let arrToRightAfter2 = arrToRight2.map(rgbR2=> rgbR2*rightWt2);

          let arrOriginalAfter = arrOriginal.map(rgb=> rgb*originalWt);

          sumRed = arrToRightAfter2[0] + arrOriginalAfter[0];
          sumGreen = arrToRightAfter2[1] + arrOriginalAfter[1];
          sumBlue = arrToRightAfter2[2] + arrOriginalAfter[2];  

          img.setPixel(x, lineNo, [sumRed, sumGreen, sumBlue]);
        }

        //x-1 invalid, x+1 invalid, x-2 invalid, x+2 invalid
        if((x-1) < 0 || (x-1) > img.width && (x+1) < 0 || (x+1) > img.width && (x-2) < 0 || (x-2) > img.width && (x+2) < 0 || (x+2) > img.width) {
          let arrOriginal = imgToExtractPixelsFrom.getPixel(x, lineNo);

          let leftWt1 = 0;
          let rightWt1 = 0;
          let leftWt2 = 0;
          let rightWt2 = 0;
          let originalWt = 1 - (leftWt1+rightWt1+leftWt2+rightWt2);

          let arrOriginalAfter = arrOriginal.map(rgb=> rgb*originalWt);

          sumRed = arrOriginalAfter[0];
          sumGreen = arrOriginalAfter[1];
          sumBlue = arrOriginalAfter[2];  

          img.setPixel(x, lineNo, [sumRed, sumGreen, sumBlue]);
        }

      }
    }
  }
}

//blurLines(img: Image, blurLine: (img: Image, lineNo: number) => void): Image
function blurLines(img, blurLine) {
  let imgBlurLines = img.copy();
    for (let i = 0; i < img.height; ++i) {
      blurLine(imgBlurLines, lineNo);
    }
  return imgBlurLines;
}


//imageMapCoord(img: Image, func: (img: Image, x: number, y: number) => Pixel): Image

function imageMapCoord(img, func) {
  let imageCopy = img.copy();
  for (let x = 0; x < img.width; ++x) {
    for (let y = 0; y < img.height; ++y) {
      let functionCall = func(img, x, y);
      imageCopy.setPixel(x, y, functionCall);
    } 
  }
  return imageCopy;
}


//pixelBlur(img: Image, x: number, y: number): Pixel
function pixelBlur(img, x, y) {
  let sumRed = 0;
  let sumGreen = 0;
  let sumBlue = 0; 
  let count = 0;

  for(let i = Math.abs(x-1); i <= Math.abs(x+1); ++i){
    if ( i >= 0 && i < img.width ){
      for (let j = Math.abs(y-1); j <= Math.abs(y+1); ++j){
        if ( j >= 0 && j < img.height ){
          let pixelToBlur = img.getPixel(i, j);
          sumRed = sumRed + pixelToBlur[0];
          sumGreen = sumGreen + pixelToBlur[1];
          sumBlue = sumBlue + pixelToBlur[2];
          
          ++count;
        }
      }
    }
  } 
 return [sumRed/count, sumGreen/count, sumBlue/count];
}

//}

//imageBlur(img: Image): Image
function imageBlur(img) {
  let imgBlurred = img.copy();
  return imageMapCoord(imgBlurred, pixelBlur);
}



//removeRed(img: loaded image): blue and green image
function removeRed(pixel){

    let r = pixel[0];
    let g = pixel[1];
    let b = pixel[2]; 

    //this line sets red pixels at x,y coordinate to 0 to remove them- while leaving blue and green the same
    return [0, g, b]; 
}

//flipColors(imageInput: loaded image): flipped image
function flipColors(pixel){
    let r = pixel[0];
    let g = pixel[1];
    let b = pixel[2];


    //Takes the mean(average) of green(element 1) and blue(element 2) for red(element 0)
    let m0 = (g + b)/2;
    //Takes the mean(average) of red(element 0) and blue(element 2) for green(element 1)
    let m1 = (r + b)/2;
    //Takes the mean(average) of red(element 0) and green(element 1) for blue(element 2)
    let m2 = (r + g)/2;

    //Sets red to m0
    return [m0, m1, m2];
}

// mapToGB(img : Image) : Image
function mapToGB(img) {
  return imageMap(img, mapToGBPixel);
}

function mapToGBPixel(fcArray) {
  return [0, fcArray[0], fcArray[0]];
}

// mapToFlipColors(img : Image) : Image
function mapFlipColors(img) {
  return imageMap(img, mapFlipColorsPixel);
}

function mapFlipColorsPixel(fcArray) {
  //Takes the mean(average) of green(element 1) and blue(element 2) for red(element 0)
  let m0 = (fcArray[1] + fcArray[2])/2;
  //Takes the mean(average) of red(element 0) and blue(element 2) for green(element 1)
  let m1 = (fcArray[0] + fcArray[2])/2;
  //Takes the mean(average) of red(element 0) and green(element 1) for blue(element 2)
  let m2 = (fcArray[0] + fcArray[1])/2;

  return [fcArray[m0], fcArray[m1], fcArray[m2]];
}

//mapLine(img: Image,lineNo: number, func: (p: Pixel) => Pixel) : void
function mapLine(img, lineNo, func) {
  for (let x = 0; x < img.width; ++x) {

    imageInput.setPixel(x, lineNo, func(img.getPixel(x, lineNo)));
  }
}


// imageMap(img: Image, func: (p: Pixel) => Pixel) : Image
function imageMap(img, func) {
  let imageCopyMap = img.copy();
 
  for (let y = 0; y < imageCopyMap.height; ++y) {
    mapLine(imageCopyMap, y, func); 
  } 
  return imageCopyMap;
}




//composeFunctions(fa: ((p: Pixel) => Pixel)[] ): ((x: Pixel) => Pixel)
function composeFunctions(fa) {
  let result = i => fa.reduce((x, element) => element(x) , i );
  return result;


  // optrta stands for one pixel to rule them all
   /* function optrtaPixel(p) {
    return fa.reduce(function(p, func){
      return func(p)
    }, p);
  }
  return optrtaPixel;
  */
 // let result = i => fa.reduce((x, element) => element(x) , i );
 // return result;
}

//combineThree(img: Image): Image
function combineThree(img) {
  let imgCopy = img.copy();
  return imageMap(imgCopy, function (imgCopy, x, y) {
    return composeFunctions([removeRed, flipColors, flipColors])(imgCopy.getPixel(x, y));
  });
}

