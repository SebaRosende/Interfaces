const canvas = document.getElementById('canvas');
const contexto = canvas.getContext('2d');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let mouseUp = true;
let mouseDown = false;
let lapiz = null;
let lapizClic = true;
let gomaClic;
let color;
let colorGoma = 'white';
let imagen = null;
let imagenBackup = null;

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
    link.download = "descargas.png";
    link.href = canvas.toDataURL();
    link.click();
}

//CARGAR ARCHIVO
let arhivo_input = document.getElementById('archivo');
arhivo_input.addEventListener("change", (e) => {
    imagen = new Image();
    imagen.src = URL.createObjectURL(e.target.files[0]);
    imagenBackup = imagen;
    imagen.onload = function () {
        contexto.drawImage(this, 0, 0, canvasWidth, canvasHeight);
    }
})

//HOJA EN BLANCO
document.getElementById('hojaVacia').addEventListener("click", (e) => {
    main();
})

//SELECCIONAR COLOR DEL LAPIZ
document.getElementById('color').addEventListener("input", (e) => {
    color = e.target.value;
})

//REESTABLECER IMAGEN ORIGINAL
document.getElementById('recuperar').addEventListener("click", (e) => {
    reestablecerImagen();
})

function reestablecerImagen(){
    contexto.drawImage(imagenBackup, 0, 0, canvasWidth, canvasHeight);
}


//PRINCIPAL
function main() {
    contexto.fillStyle = 'white';
    contexto.fillRect(0, 0, canvas.width, canvas.height);


}


