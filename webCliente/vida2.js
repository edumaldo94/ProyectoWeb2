const url='https://restcountries.com/v3.1/all';
fetch(url)
.then(res => res.json())
.then(data => {
   //console.log(data[56].translations.spa.common)

   juego(data)
 
});



const contenedor = document.getElementById('paises');
const imagen=document.querySelector(".pais")
const pregElem = document.getElementById('pregunta');
const respElem = document.getElementById('respuestas');
const sig = document.getElementById('sig');
const nP = [];




const juego = (data) => {
  
  imprimir(data, nP);
  corroborarResp(nP);
  let preguntaActual = 0;
  function mostrarSiguientePregunta() {
    preguntaActual++;
    if (preguntaActual < 10) {
      //
      limpiarContenedor(contenedor);
  
      imprimir(data, nP);
      corroborarResp(nP);
      
    } else {
      contenedor.innerHTML = '<p>Fin del juego.</p>';
      sig.disabled = true;

    }
    
  }

  
  sig.addEventListener('click', mostrarSiguientePregunta);


};

function limpiarContenedor(elemento) {
  elemento.innerHTML = '';
  
}

function imprimir(data,nP){
  
    const indiceAleatorio = obtenerIndiceAleatorio(data);

    let verdadera=true;
    let error=false;
 let paisOcap=Math.floor(Math.random() * 100) + 1;


  if(paisOcap % 2 ===0){
    
      for(let i =0;i<4;i++){
        
          const aleFor = obtenerIndiceAleatorio(data);
          nP[i] =document.createElement('li');
         if(verdadera){
            let x=data[indiceAleatorio].translations.spa.common
            pregElem.innerHTML = `¿La siguiente bandera es del País ...?`;
          nP[i].textContent=data[indiceAleatorio].translations.spa.common
          
          verdadera=false;
         }else{
          nP[i].textContent=data[aleFor].translations.spa.common
         }
     contenedor.appendChild(nP[i]); 
      }
      
    }else{
      for(let i =0;i<4;i++){
        
          const aleFor = obtenerIndiceAleatorio(data);
          nP[i] =document.createElement('h4');
         if(verdadera){
            let x=data[indiceAleatorio].translations.spa.common
            pregElem.innerHTML = `¿La siguiente capital de ${x} es...?`;
          nP[i].textContent=data[indiceAleatorio].capital
          console.log("rescorrecta "+nP[i].textContent)
          verdadera=false;
        
          if(nP[i].textContent===""){
            
              error=true;
              imagen.src=(data[aleFor].flags.png)
              nP[i].textContent=data[aleFor].capital

              
                      }
         }else{
         
          nP[i].textContent=data[aleFor].capital
         
          if(nP[i].textContent===""){
          const aleFor = obtenerIndiceAleatorio(data);
          nP[i].textContent=data[aleFor].capital
          }
         }
  
     contenedor.appendChild(nP[i]); 
      }
  
    }
  
    
    if(!error){
      imagen.src=(data[indiceAleatorio].flags.png)
    }
  
}


function corroborarResp(nP){
  
let respuCorrecta=nP[0].textContent //guardamos la respuesta correcta
nP.sort(() => Math.random() - 0.5);//mezcla los datos del arreglos nP

    let respuestaCorrecta=false;
 
    nP.forEach((elemento) => {
     const radio = document.createElement('input');
     const label = document.createElement('label');
     
     radio.type = 'radio';
     radio.name = 'opciones'; // El mismo nombre agrupa los radio buttons
     
    // label2.textContent=respuCorrecta.textContent
     label.textContent = elemento.textContent;
     
     radio.addEventListener('click', () => {
      
         const radios = contenedor.querySelectorAll('input[type="radio"]');
         radios.disabled=label.textContent 

         radios.forEach(radio => {
             radio.disabled=label.textContent  // Deshabilitar todos los radio buttons
           });
         if(!respuestaCorrecta){
            
             respuestaCorrecta=true;
         if (label.textContent === respuCorrecta) {
           console.log('Respuesta correcta');
          
           label.style.color = 'green'; 
         } else {
           
           console.log('Respuesta Incorrecta');
           label.style.color = 'red';
           for(let i=0;i<4;i++){
             if(nP[i].textContent===respuCorrecta){
             nP[i].style.color='green'
             
             break
             }
           }
          
       
         }
       
     }
    
       });
     elemento.textContent = ''; // Limpiamos el contenido del elemento li
     elemento.appendChild(radio);
     elemento.appendChild(label);
     contenedor.appendChild(elemento);
   });
 }
const obtenerIndiceAleatorio =(arreglo)=>  Math.floor(Math.random() * arreglo.length);







  