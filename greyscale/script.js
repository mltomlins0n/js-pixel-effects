const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d')
canvas.width = 800;
canvas.height = 450;

const image1 = new Image();
/* #region  base64 image src */
/* #endregion */

image1.addEventListener('load', function () {
    ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
    const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(scannedImage);
    const scannedData = scannedImage.data;
    /* Scanned data is an array of pixel values
       Each pixel element in the array is a multiple of 4
       0, 4, 8 etc. is a new pixel
    */
    for (let i = 0; i < scannedData.length; i += 4){
        // Average out the RGB values and assign them to each pixel to make it greyscale
        // e.g. rgb(50,50,50)
        const total = scannedData[i] + scannedData[i+1] + scannedData[i+2];
        const averageColorValue = total/3;
        scannedData[i] = averageColorValue;   // red
        scannedData[i+1] = averageColorValue; // green
        scannedData[i+2] = averageColorValue; // blue
    }
    scannedImage.data = scannedData; // assign new array to image
    ctx.putImageData(scannedImage, 0, 0); // Paint new image onto canvas
})