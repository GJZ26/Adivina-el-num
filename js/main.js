/* Declaración de variables */
let randomNumber = Math.floor(Math.random()*100)+1;
let contadorIntento=0;
let historial, attemptValue;

const botonEnviar = document.getElementById('attemptSubmit');
const cuadroIntento = document.getElementById('attemptField');
const intentos = document.getElementById('attempts');
const turno = document.getElementById('attemptNum');
const pista = document.getElementById('hint');
const msg = document.getElementById('msgAttempt');

function checkAttemp(){	
	attemptValue = parseInt(cuadroIntento.value);
	cuadroIntento.value='';

	if(attemptValue===randomNumber){
		pista.textContent='En el clavo!';
		msg.textContent="¡Felicidades! Has ganado"
	}else if(attemptValue<randomNumber){
		msg.textContent="Incorrecto"
		pista.textContent='número demasiado bajo';
	}else{
		msg.textContent="Incorrecto"
		pista.textContent='numero demasiado alto';
	}

	if(contadorIntento===0){
		if (isNaN(attemptValue)){
			historial=intentos.textContent='Intentos: ?';
		}else{
			historial=intentos.textContent='Intentos: '+attemptValue;
		}

	}else{
		if(isNaN(attemptValue)){
			intentos.textContent=historial += ', ?';
		}else{
			intentos.textContent=historial += ', '+attemptValue;
		}
	}
	

	contadorIntento++;
	turno.textContent=contadorIntento+'/10';
}

function start(){
	//console.log("%cInicializando...","color:green;");
	//console.log("%cMantén esto en secreto\n"+"%cNúmero seleccionado: "+"%c"+randomNumber,"color: pink;","color:sky;","color:white;");

	botonEnviar.addEventListener('click',checkAttemp);
}
start();