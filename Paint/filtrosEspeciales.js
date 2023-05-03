
//DAR SATURACION
function saturar() {
    let imagenData = contexto.getImageData(0, 0, canvasWidth, canvasHeight);
    let colorRGB = { rojo: 0, verde: 0, azul: 0, };
    for (let pixel = 0; pixel < imagenData.data.length; pixel += 4) { //imagenData.data.length

        colorRGB.rojo = imagenData.data[pixel];
        colorRGB.verde = imagenData.data[pixel + 1];
        colorRGB.azul = imagenData.data[pixel + 2];
        let colorHSV = RGBtoHSV(colorRGB);
        colorHSV.s = Math.min(colorHSV.s * (80 / 100), 1);
        let nuevoRGB = HSVtoRGB(colorHSV);
        imagenData.data[pixel] = nuevoRGB.r;
        imagenData.data[pixel + 1] = nuevoRGB.g;
        imagenData.data[pixel + 2] = nuevoRGB.b;
    }
    contexto.putImageData(imagenData, 0, 0);
}

document.getElementById('saturar').addEventListener("click", (e) => {
    saturar();
})

//FILTRO BLUR

document.getElementById('blur').addEventListener("click", (e) => {
    efectoBlur();   
})

function  efectoBlur(){
    let matrix = [
        [0.111, 0.111, 0.111],
        [0.111, 0.111, 0.111],
        [0.111, 0.111, 0.111]
    ];

    let imagenData = contexto.getImageData(0, 0, canvasWidth, canvasHeight);
    let pixelData = imagenData.data;

    for (let i = 0; i < pixelData.length; i += 4) {
        let r = 0, g = 0, b = 0;
        let row = Math.floor(i / (4 * canvasWidth));
        let col = Math.floor((i / 4) % canvasWidth);
        for (let m = 0; m < matrix.length; m++) {
            for (let n = 0; n < matrix[m].length; n++) {
                let rowIndex = row + m - 1;
                let colIndex = col + n - 1;
                if (rowIndex >= 0 && rowIndex < canvasHeight && colIndex >= 0 && colIndex < canvasWidth) {
                    let index = (rowIndex * canvasWidth + colIndex) * 4;
                    r += pixelData[index] * matrix[m][n];
                    g += pixelData[index + 1] * matrix[m][n];
                    b += pixelData[index + 2] * matrix[m][n];

                }
            }
        }
        pixelData[i] = r;
        pixelData[i + 1] = g;
        pixelData[i + 2] = b;

    }
    contexto.putImageData(imagenData, 0, 0);
}



//filtro sobel
document.getElementById('sobel').addEventListener("click", (e) => {

    efectoSobel();
  
})

function efectoSobel(){
    let imagenData = contexto.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imagenData.data;

    let matrixX = [-1, 0, 1,
    -2, 0, 2,
    -1, 0, 1];

    let matrixY = [-1, -2, -1,
        0, 0, 0,
        1, 2, 1];


    let newData = new Uint8ClampedArray(data.length);
    for (let y = 1; y < canvasHeight - 1; y++) {
        for (let x = 1; x < canvasWidth - 1; x++) {
            let pixelIndex = (y * canvasWidth + x) * 4;
            let gx = 0, gy = 0;
            for (let j = -1; j <= 1; j++) {
                for (let i = -1; i <= 1; i++) {
                    let matrixIndex = (j + 1) * 3 + i + 1;
                    let neighborPixelIndex = ((y + j) * canvasWidth + (x + i)) * 4;
                    gx += data[neighborPixelIndex] * matrixX[matrixIndex];
                    gy += data[neighborPixelIndex] * matrixY[matrixIndex];
                }
            }
            let magnitude = Math.sqrt(gx * gx + gy * gy);
            newData[pixelIndex] = magnitude;
            newData[pixelIndex + 1] = magnitude;
            newData[pixelIndex + 2] = magnitude;
            newData[pixelIndex + 3] = 255;
        }
    }
    let newImageData = new ImageData(newData, canvasWidth, canvasHeight);
    contexto.putImageData(newImageData, 0, 0);
}
