//`

fetch('https://restcountries.com/v3.1/all')
.then(res => res.json())
.then(data => {
   //console.log(data[56].capital[0])
   juego(data)
});


const contenedor = document.getElementById('paises');
const imagen=document.querySelector(".pais")
const pregElem = document.getElementById('pregunta');
const respElem = document.getElementById('respuestas');
const nP = [];



const juego =(data)=>{
    const indiceAleatorio = obtenerIndiceAleatorio(data);
  let respuCorrecta;
  //let cat=respuCorrecta.textContent=data[indiceAleatorio].name.common
  let verdadera=true;
  let error=false;

    for(let i =0;i<4;i++){
      
        const aleFor = obtenerIndiceAleatorio(data);
        nP[i] =document.createElement('li');
       if(verdadera){
        nP[i].textContent=data[indiceAleatorio].translations.spa.common
        respuCorrecta=data[indiceAleatorio].translations.spa.common
        verdadera=false;
       }else{
        nP[i].textContent=data[aleFor].translations.spa.common
       }
   contenedor.appendChild(nP[i]); 
    }
    
/*
    for(let i =0;i<4;i++){
      
        const aleFor = obtenerIndiceAleatorio(data);
        nP[i] =document.createElement('li');
       if(verdadera){
        nP[i].textContent=data[indiceAleatorio].capital
        respuCorrecta.textContent=data[indiceAleatorio].capital
       
        verdadera=false;
      
        if(nP[i].textContent===""){
          
            error=true;
            imagen.src=(data[aleFor].flags.png)
            nP[i].textContent=data[aleFor].capital
            respuCorrecta.textContent=data[aleFor].capital
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

*/

  
  if(!error){
    imagen.src=(data[indiceAleatorio].flags.png)
  }

   mezclarArreglo(nP) //mezclamos las opciones

   let respuestaCorrecta=false;

   nP.forEach((elemento) => {
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'opciones'; // El mismo nombre agrupa los radio buttons
    
    const label = document.createElement('label');
    const label2 = document.createElement('label');
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
            if(nP[i].textContent===respuCorrecta.textContent){
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

function mezclarArreglo(arreglo) {
    for (let i = arreglo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arreglo[i], arreglo[j]] = [arreglo[j], arreglo[i]]; // Intercambiar elementos
    }
  }
  