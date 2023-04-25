
const $card = document.querySelector('.card');

//getBoundingClientRect ->Método devuelve un DOMRect objeto que proporciona información sobre el tamaño de un elemento 
//y su posición relativa a la ventana del navegador.

$card.addEventListener('mousemove', (e)=>{
    let limite = $card.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - limite.x;
    const topY = mouseY - limite.y;
  
     const center = {
        x: leftX - ($card.clientWidth / 2),
        y: topY - ($card.clientHeight / 2)
      }
//distancia desde el punto (0, 0) hasta el punto x e y de $card
      const distance = Math.sqrt(center.x**2 + center.y**2);
     
      $card.style.transform = `
      scale3d(1.1, 1.1, 1.1)
      rotate3d(
        ${center.y / 100},
        ${-center.x / 100},
        0,
        ${Math.log(distance)* 4}deg
      )
    `

});


$card.addEventListener('mouseout', ()=>{   
    $card.style.transform='';
  });

