class NuevaClaseImagen extends Image{

constructor(){
    super();
}

//DAR MÁS BRILLO A LA IMAGEN
cambiarBrillo(){
    let imagenData = contexto.getImageData(0, 0, canvasWidth, canvasHeight);
    for (let pixel = 0; pixel < imagenData.data.length; pixel += 4) {
        imagenData.data[pixel + 0] = imagenData.data[pixel + 0] * 2;
        imagenData.data[pixel + 1] = imagenData.data[pixel + 1] * 2;
        imagenData.data[pixel + 2] = imagenData.data[pixel + 2] * 2;
    }
   
    contexto.putImageData(imagenData, 0, 0);
}


//PASAR IMAGEN A NEGATIVO
negativo() {

    let imagenData = contexto.getImageData(0, 0, canvasWidth, canvasHeight);

    for (let pixel = 0; pixel < imagenData.data.length; pixel += 4) {
        imagenData.data[pixel + 0] = 255 - imagenData.data[pixel + 0]; //rojo: 
        imagenData.data[pixel + 1] = 255 - imagenData.data[pixel + 1]; //verde
        imagenData.data[pixel + 2] = 255 - imagenData.data[pixel + 2]; //azul
    }

    contexto.putImageData(imagenData, 0, 0);
}

//PASAR IMAGEN A BLANCO Y NEGRO
cambiarByn() {
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



//PASAR IMAGEN A SEPIA
cambiarSepia() {
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





}
