const canvas = document.getElementById('canvas');
const contexto = canvas.getContext('2d');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let mouseUp = true;
let mouseDown = false;
let lapiz = null;
let lapizEspesor;
let lapizClic = true;
let gomaClic;
let color;
let colorGoma = 'white';
let imagen = null;

//Comportamiento del mouse


canvas.addEventListener('mousedown', (e) => {
    lapiz = new Lapiz(e.layerX, e.layerY, color, contexto, '5');
    mouseDown = true;
    mouseUp = false;
})

canvas.addEventListener('mouseup', (e) => {
    mouseDown = false;
    mouseUp = true;
})

canvas.addEventListener('mousemove', (e) => {
    if ((mouseDown) && (lapizClic)) {
        lapiz.moveTo(e.layerX, e.layerY);
        lapiz.draw();
    } else if ((mouseDown) && (gomaClic)) {
        goma.moveTo(e.layerX, e.layerY);
        goma.draw();
    }

})


//Comportamiento de los botones
//LAPIZ
document.getElementById('lapiz').addEventListener("click", (e) => {
    lapizClic = true;
    gomaClic = false;

})

//GOMA
document.getElementById('goma').addEventListener("click", (e) => {
    goma = new Goma(e.layerX, e.layerY, colorGoma, contexto, '8')
    gomaClic = true;
    lapizClic = false;
})


//GUARDAR IMAGEN DE TRABAJO

document.getElementById('guardar').addEventListener("click", (e) => {
    guardarArchivo();
})

function guardarArchivo() {
    let link = document.createElement('a');
    link.download = "canvas.png";
    link.href = canvas.toDataURL();
    link.click();
}

//CARGAR ARCHIVO

let arhivo_input = document.getElementById('archivo');

arhivo_input.addEventListener("change", (e) => {
    imagen = new Image();
    imagen.src = URL.createObjectURL(e.target.files[0]);
    imagen.onload = function () {
        contexto.drawImage(this, 0, 0, canvasWidth, canvasHeight);
    }
})

//PASAR IMAGEN A NEGATIVO
function negativo() {

    let imagenData = contexto.getImageData(0, 0, canvasWidth, canvasHeight);

    for (let pixel = 0; pixel < imagenData.data.length; pixel += 4) {
        imagenData.data[pixel + 0] = 255 - imagenData.data[pixel + 0]; //rojo: 
        imagenData.data[pixel + 1] = 255 - imagenData.data[pixel + 1]; //verde
        imagenData.data[pixel + 2] = 255 - imagenData.data[pixel + 2]; //azul
    }

    contexto.putImageData(imagenData, 0, 0);
}

document.getElementById('negativo').addEventListener("click", (e) => {
    negativo();
})

//PASAR IMAGEN A BLANCO Y NEGRO
function cambiarByn() {
    let imagenData = contexto.getImageData(0, 0, canvasWidth, canvasHeight);
    for (let pixel = 0; pixel < imagenData.data.length; pixel += 4) {
        const r = imagenData.data[pixel];
        const g = imagenData.data[pixel + 1];
        const b = imagenData.data[pixel + 2];
        let byc = (r + g + b) / 3;
        imagenData.data[pixel] = byc;
        imagenData.data[pixel + 1] = byc;
        imagenData.data[pixel + 2] = byc;
    }

    contexto.putImageData(imagenData, 0, 0);
}
document.getElementById('byn').addEventListener("click", (e) => {
    cambiarByn();
})

//PASAR IMAGEN A SEPIA
function cambiarSepia() {
    let imagenData = contexto.getImageData(0, 0, canvasWidth, canvasHeight);
    for (let pixel = 0; pixel < imagenData.data.length; pixel += 4) {
        const r = imagenData.data[pixel];
        const g = imagenData.data[pixel + 1];
        const b = imagenData.data[pixel + 2];
        const newR = Math.min(0.393 * r + 0.769 * g + 0.189 * b, 255);
        const newG = Math.min(0.349 * r + 0.686 * g + 0.168 * b, 255);
        const newB = Math.min(0.272 * r + 0.534 * g + 0.131 * b, 255);
        imagenData.data[pixel] = newR;
        imagenData.data[pixel + 1] = newG;
        imagenData.data[pixel + 2] = newB;
    }

    contexto.putImageData(imagenData, 0, 0);
}

document.getElementById('sepia').addEventListener("click", (e) => {
    cambiarSepia();
})

//DAR BRILLO A IMAGEN
function darBrillo() {
    let imagenData = contexto.getImageData(0, 0, canvasWidth, canvasHeight);
    for (let pixel = 0; pixel < imagenData.data.length; pixel += 4) {
        imagenData.data[pixel + 0] = imagenData.data[pixel + 0] * 2;
        imagenData.data[pixel + 1] = imagenData.data[pixel + 1] * 2;
        imagenData.data[pixel + 2] = imagenData.data[pixel + 2] * 2;
    }

    contexto.putImageData(imagenData, 0, 0);
}

document.getElementById('brillo').addEventListener("click", (e) => {
    darBrillo();
})

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
})

//filtro sobel
document.getElementById('sobel').addEventListener("click", (e) => {

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
})


/* for (let i = 0; i < data.length; i += 4) {
    let rX = 0, gX = 0, bX = 0, rY = 0, gY = 0, bY = 0;
    for (let j = 0; j < matrixSobelX.length; j++) {
      let x = i + ((j % 3) - 1) * 4;
      let y = i + (Math.floor(j / 3) - 1) * canvasWidth * 4;
      if (x >= 0 && x < data.length && y >= 0 && y < data.length) {
        rX += data[x] * matrixSobelX[j];
        gX += data[x + 1] * matrixSobelX[j];
        bX += data[x + 2] * matrixSobelX[j];
        rY += data[x] * matrixSobelY[j];
        gY += data[x + 1] * matrixSobelY[j];
        bY += data[x + 2] * matrixSobelY[j];
      }
    }
 
    let r = Math.sqrt(rX * rX + rY * rY);
    let g = Math.sqrt(gX * gX + gY * gY);
    let b = Math.sqrt(bX * bX + bY * bY);
 
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
}
    contexto.putImageData(imagenData, 0, 0);

})
let newData = new Uint8ClampedArray(data.length);

*/

//HOJA EN BLANCO
document.getElementById('hojaVacia').addEventListener("click", (e) => {
    main();
})

//SELECCIONAR COLOR DEL LAPIZ
document.getElementById('color').addEventListener("input", (e) => {
    color = e.target.value;
})

//Entrada principal del proyecto
function main() {
    contexto.fillStyle = 'white';
    contexto.fillRect(0, 0, canvas.width, canvas.height);


}


//PASAR DE RGB A HSV
function RGBtoHSV(colorRGB) {
    let r = colorRGB.rojo / 255;
    let g = colorRGB.verde / 255;
    let b = colorRGB.azul / 255;
    let min = Math.min(r, g, b)
    let max = Math.max(r, g, b)

    let h, s, v;
    h, s, v = max;
    let d = max - min;

    //s = max == 0 ? 0 : d / max;
    if (max == 0) {
        s = 0;
    } else {
        s = d / max;
    }

    if (max == min) {
        h = 0;
    } else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    let colorHSV = { h: h, s: s, v: v, };
    return colorHSV;

}


function HSVtoRGB(colorHSV) {

    // Convertir el valor de H en grados a un valor en el rango [0, 1]
    let h = colorHSV.h / 360;
    // Calcular los valores de R, G y B a partir de los valores de H, S y V 
    let s = colorHSV.s;
    let v = colorHSV.v;
    let r, g, b;
    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0: r = v;
            g = t;
            b = p; break;
        case 1: r = q;
            g = v;
            b = p; break;
        case 2: r = p;
            g = v;
            b = t; break;
        case 3: r = p;
            g = q;
            b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }
    let colorRGB = { r: 0, g: 0, b: 0, };
    colorRGB.r = Math.round(r * 255);
    colorRGB.g = Math.round(g * 255);
    colorRGB.b = Math.round(b * 255);
    return colorRGB;
}

