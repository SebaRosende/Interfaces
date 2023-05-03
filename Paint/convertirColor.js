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

