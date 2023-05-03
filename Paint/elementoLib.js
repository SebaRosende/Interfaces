class ElementoLibreria{

    constructor (posx, posy, fill, contexto, estilo){

this.antx=posx;
this.anty=posy;
this.posx=posx;
this.posy=posy;
this.contexto = contexto;
this.estilo= estilo;
this.fill = fill;

}

moveTo(posx, posy){
    this.antx = this.posx;
    this.anty= this.posy;
    this.posx=posx;
    this.posy=posy;
}


draw(){
    this.contexto.beginPath();
    this.contexto.strokeStyle= this.fill;
    this.contexto.lineWidth=this.estilo;
    this.contexto.lineCap='round';
    this.contexto.moveTo(this.antx, this.anty);
    this.contexto.lineTo(this.posx, this.posy);
    this.contexto.stroke();
    this.contexto.closePath(); 
}


}


class Lapiz extends ElementoLibreria{

    constructor (posx, posy, fill, contexto, estilo){
        super(posx, posy, fill, contexto, estilo);
}

}


class Goma extends ElementoLibreria{

    constructor (posx, posy, fill, contexto, estilo){
        super(posx, posy, fill, contexto, estilo);

}

}
