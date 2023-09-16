const url='https://restcountries.com/v3.1/all';
fetch(url)
.then(res => res.json())
.then(data => {
   //console.log(data[56].translations.spa.common)
//imprime(data,nP)
  //corroborarResp(nP)
  
  juego(data,nP)
 
});
const nP = [];
const contenedor = document.getElementById('paises');
const imagen=document.querySelector(".pais")
const pregElem = document.getElementById('pregunta');
const respElem = document.getElementById('respuestas');
const sig = document.getElementById('sig');
const promeH2=document.getElementById('prome')
const respOkey=document.getElementById('respOk')
const respNot=document.getElementById('respNot')

let puntaje=0;
let cont2=0;

function imprime(data,nP){
    //data.length 250
    let pregCorrecta=true;
    let paisOcap=Math.floor(Math.random() * 100) + 1;
let quenoserepita;

  if(paisOcap % 2 ===0){//PAIS
    for (let index = 0; index < 4; index++) {
        nP[index]=document.createElement('h1')
        nP[index].style.fontSize = "17px";
        let ale=Math.floor(Math.random() * data.length)
        if(pregCorrecta){
          pregElem.style.color="#f2f2f2"
          
            pregElem.innerHTML = `¿La siguiente bandera es del País ...?`;
            pregElem.style.fontSize = "17px";
            imagen.src=(data[ale].flags.png)
            quenoserepita=nP[index].textContent=data[ale].translations.spa.common
            pregCorrecta=false;
        }else{
        nP[index].textContent=data[ale].translations.spa.common
if(nP[index].textContent=== quenoserepita.textContent){

  let oe=Math.floor(Math.random() * data.length)
  nP[index].textContent=data[oe].translations.spa.common
}
        }
    }
}else{//CAPITALES
        for (let index = 0; index < 4; index++) {
            nP[index]=document.createElement('h1')
            nP[index].style.fontSize = "17px";
            let ale=Math.floor(Math.random() * data.length)
            if(pregCorrecta){
             
                let x=data[ale].translations.spa.common
                pregElem.style.color="#9cd879"
                
                pregElem.innerHTML = `¿La capital de <span style="color: #0cb306; text-shadow: 1px 1px 5px black;">${x}</span> es...?`;

                pregElem.style.fontSize = "17px";
                imagen.src=(data[ale].flags.png)
                nP[index].textContent=data[ale].capital
                if(nP[index].textContent===""){
                 
                  let pepa=Math.floor(Math.random() * data.length)
                  //imagen.src=(data[pepa].flags.png)
                  nP[index].textContent=data[pepa].capital
                  }
                pregCorrecta=false;
            }else{
            nP[index].textContent=data[ale].capital
            if(nP[index].textContent===""){
                
                let pepe=Math.floor(Math.random() * data.length)
                nP[index].textContent=data[pepe].capital
                }
            }

    }


    
    }


}

function corroborarResp(nP){
  
    let resCorrecta=nP[0].textContent //guardamos la respuesta correcta
    let respuestaCorrecta=false;
    //nP.sort(() => Math.random() - 0.5);
    nP.sort(() => Math.random() - 0.5)
    nP.forEach((elemento) => {
      
        const radio = document.createElement('input');
        const label = document.createElement('label');
        
        radio.type = 'radio';
        radio.name = 'opciones'; // El mismo nombre agrupa los radio buttons y me deja seleccionar solo un checkbox
        label.textContent = elemento.textContent;

        radio.addEventListener('click', () => {
         
            
            const radios = contenedor.querySelectorAll('input[type="radio"]');
            radios.disabled=label.textContent 
   
            radios.forEach(radio => {
                radio.disabled=label.textContent  // Deshabilitar todos los radio buttons
              });

            if(!respuestaCorrecta){
              sig.style.backgroundColor="#326ead"
                sig.disabled = false;
                respuestaCorrecta=true;

            if (label.textContent === resCorrecta){
puntaje=puntaje+1;
             
             
              label.style.color = 'green'; 
            } else {

             cont2= cont2+1;
             
              label.style.color = 'red';

              for(let i=0;i<4;i++){
                if(nP[i].textContent===resCorrecta){
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

function juego(data){
  
  jugarDeNuevoButton.disabled=true;
  enviarBtn.disabled = true;
  enviarBtn.style.backgroundColor='#ac0303'
    sig.disabled = true;
    sig.style.backgroundColor="#ac0303"
let preguntaActual = 0;

  function mostrarSiguientePregunta() {
   
    preguntaActual++;
   
    if (preguntaActual < 10) {
      //
      sig.disabled = true;
      sig.style.backgroundColor="#ac0303"
      limpiarContenedor(contenedor);
      imprime(data, nP);
    corroborarResp(nP)
      
    } else {
      jugarDeNuevoButton.disabled=false;
      enviarBtn.style.backgroundColor='green'
      enviarBtn.disabled = false;
        tiempoFinal=true;
        let promedioTime =valorTime/10;
        clearInterval(intervaloTiempo);
imagen.style.display="none"
pregElem.style.display="none"
tiempoElement.style.display="none"

contenedor.innerHTML = '<h1 style="font-size: 24px; text-align: center; color: white; text-shadow: 1px 1px 5px black;">Fin del juego.</h1>';
promeH2.innerHTML= `Tiempo promedio que tardo en responder c/p es <span style="font-size: 14px; color: white; text-shadow: 1px 1px 5px black;">%${promedioTime.toFixed(2)}</span>`;
promeH2.style.fontSize="16px";
promeH2.style.color = "white";
promeH2.style.textShadow = "1px 1px 5px black";
capturarTime.textContent = tiempoElement.textContent;
capturarTime.style.fontSize = "16px";
capturarTime.style.color = "white";
capturarTime.style.textShadow = "1px 1px 5px black";
contenedor.appendChild(capturarTime);
respOkey.innerHTML = `<span style="font-size: 16px; color: white; text-shadow: 1px 1px 5px black; ">Respuestas Correctas: </span>${puntaje}`;
respNot.innerHTML = `<span style="font-size: 16px; color: white; text-shadow: 1px 1px 5px black ">Respuestas Incorrectas: </span>${cont2}`;

     

      sig.disabled = true;

    }
    
  }
  sig.addEventListener('click', mostrarSiguientePregunta);
  imprime(data, nP);
  corroborarResp(nP)
}
  
 
  function limpiarContenedor(elemento) {
    elemento.innerHTML = '';
    
  }

  
let tiempoFinal=false;
let tiempoInicio = new Date().getTime(); // Tiempo de inicio en milisegundos
const tiempoElement = document.getElementById('tiempo');
const capturarTime=document.createElement('h1')
let intervaloTiempo = setInterval(mostrarTiempoTranscurrido, 1000);
let valorTime;

function mostrarTiempoTranscurrido () {


  const tiempoActual = new Date().getTime();
  
  const tiempoTranscurrido = tiempoActual - tiempoInicio;

  const minutos = Math.floor(tiempoTranscurrido / 60000);
  const segundos = Math.floor((tiempoTranscurrido % 60000) / 1000);
if (tiempoFinal) {
  clearInterval(intervaloTiempo);
}else{
  tiempoElement.textContent=`Tiempo transcurrido: ${minutos} minutos ${segundos} segundos`;
  

  valorTime=Math.floor((tiempoTranscurrido/1000))
}

 
}

// formulario para almacenar los datos del usuario

    const formularioDiv = document.getElementById("formulario");
    const contFF = document.getElementById("contFormu");
    const contenidoDiv = document.getElementById("contenidoSeccion");
   const registrarButton = document.getElementById("registrar");
   
    const nomb=document.getElementById("nombre")
    let usu;
    let asd=false
    
   
    registrarButton.addEventListener("click", async (event) => {
      event.preventDefault()
     
      validar().then(resq =>{
      if(resq){
      formularioDiv.style.display = "none";
      contFF.style.display = "none";

      contenidoDiv.style.display = "block";
      
      tiempoInicio = new Date().getTime();
      intervaloTiempo=0;
      }
    })
  });

 async function validar(){
 
 if (nomb.value.trim() ==='') {
  mensajeError.style.display = "block";
  mensajeError.style.backgroundColor = "white";
  mensajeError.innerHTML='Ingrese datos por favor!'
 
  return false;
}else if(nomb.value.includes(' ')){
mensajeError.style.display = "block";
mensajeError.style.backgroundColor = "white";
mensajeError.innerHTML='Ingrese datos sin espacio por favor!'
return false;
}
 
const response = await fetch(`http://localhost:3001/api/index/baseDatos/${nomb.value}`);
const data = await response.json();
if (data.usuarioExistente) {
  console.log("entrando")
  mensajeError.style.display = "block";
  mensajeError.style.backgroundColor = "white";
mensajeError.innerHTML='El usuario ya existe'
return false;
} else {

  mensajeError.style.display = "none";
  return true

}
 }     



   //DATOS PARA ENVIAR A LA BASE DE DATOS
   // USUARIO
   // PUNTUACIÓN
   // TIMPO FINAL
   const enviarBtn=document.getElementById("env")
   const mensajeError = document.getElementById("mensaje-error");
let ppp=false;
enviarBtn.addEventListener("click",  (event)=> {
  event.preventDefault()
  clearInterval(intervaloTiempo);
  let minutos = Math.floor(valorTime / 60); // Calcula los minutos
let segundos = valorTime % 60;
  let formComplet={usuario: nomb.value,
    puntaje:puntaje,
    Tiempo:`${minutos}':${segundos}"`}
    
    let formJson=JSON.stringify(formComplet);

   // Verificar si el usuario ya está registrado

 ppp=true;
   enviarBtn.disabled = true;
   enviarBtn.style.backgroundColor='#ac0303'
  //console.log(formJson)
  
  fetch('http://localhost:3001/api/index/formComplet',{
    method: 'Post',
headers: {
  'Content-Type': 'application/json'
},
body:formJson
})
alert("El Envio Fue Un Exito")
posi()
 
})
const jsonContentDiv = document.getElementById('jsonContent');

 function posi(){
  jsonContentDiv.innerHTML=''
 fetch('http://localhost:3001/api/index/formComplet')
  .then(response => response.json())
  .then(data => {

   let podio=1;
      data.forEach(elemento => {
        const jsonItemDiv = document.createElement('p');
        jsonItemDiv.classList.add('json-item');

      jsonItemDiv.innerHTML =(`Posicion: ${podio++}<br>Usuario: ${elemento.usuario}<br>Puntaje: ${elemento.puntaje},<br>Tiempo: ${elemento.Tiempo}`);
      jsonItemDiv.style.backgroundColor='rgb(89, 130, 173)'
      jsonContentDiv.appendChild(jsonItemDiv);
      });
      
  })
  .catch(error => console.error('Error:', error));
}

const jugarDeNuevoButton = document.getElementById("jugarOtraVez");

jugarDeNuevoButton.addEventListener("click",  (e) => {
  e.preventDefault();
  window.location.href = "index.html";
 
});

const posBtn = document.getElementById("posicionBtn");
posBtn.addEventListener('click',(e) =>{
e.preventDefault();

contenidoDiv.style.display = "none";
jsonContentDiv.style.display="block"
volBtn.style.display="block"
let podio=1;
if(!ppp){

  jsonContentDiv.innerHTML=''
fetch('http://localhost:3001/api/index/baseDatos')
  .then(response => response.json())
  .then(data => {
      data.forEach(elemento => {
        const jsonItemDiv = document.createElement('p');
        jsonItemDiv.classList.add('json-item');

      jsonItemDiv.innerHTML =(`Posicion: ${podio++}<br>Usuario: ${elemento.usuario}<br>Puntaje: ${elemento.puntaje},<br>Tiempo: ${elemento.Tiempo}`);
      jsonItemDiv.style.backgroundColor='rgb(89, 130, 173)'
      jsonContentDiv.appendChild(jsonItemDiv);
      })

      });

    }
})


const volBtn = document.getElementById("volverBtn");
volBtn.addEventListener("click",(e) =>{
e.preventDefault();
contenidoDiv.style.display = "block";
jsonContentDiv.style.display="none"
volBtn.style.display="none"

})
