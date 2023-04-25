"use strict"

let segundos = 0;
let segundero = document.getElementById('s');
let minutero = document.getElementById('m');
let hora = document.getElementById('h');

setInterval(function(){
  segundos = (segundos+1)%60;
  segundero.style.transform = `rotateZ(${360*segundos/60.0}deg)`; /*Ejemplo: a los 15 segundos la posicion es de 90°*/ 
},1000  ); /*La función se ejecuta cada 1000 milisegundos, o sea 1 segundos*/

setInterval(function(){
  segundos = (segundos+1)%60;
  minutero.style.transform = `rotateZ(${360*segundos/60.0}deg)`;
  
},60000  );/*La función se ejecuta cada 60000 milisegundos, o sea 1 minuto*/

setInterval(function(){
  segundos = (segundos+1)%60;
  hora.style.transform = `rotateZ(${360*segundos/60.0}deg)`;
  
},3600000  );/*La función se ejecuta cada 3600000 milisegundos, o sea 1 hora*/



