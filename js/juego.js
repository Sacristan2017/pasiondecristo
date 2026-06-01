// Variables del juego
let numeroSecreto = '';
let intentos = 0;
const maxIntentos = 10;
const digitBoxes = document.querySelectorAll('.digit-box');
const mensaje = document.getElementById('mensaje');
const listaIntentos = document.getElementById('listaIntentos');
const btnEnviar = document.getElementById('btnEnviar');
const btnBorrar = document.getElementById('btnBorrar');
const btnReiniciar = document.getElementById('btnReiniciar');

// Estado actual del intento
const entrada = ['', '', '', ''];
let posicionActual = 0;

// Generar número secreto
function generarSecreto() {
  const digitos = ['0','1','2','3','4','5','6','7','8','9'];
  let secreto = '';
  for (let i = 0; i < 4; i++) {
    const index = Math.floor(Math.random() * digitos.length);
    secreto += digitos.splice(index, 1)[0];
  }
  return secreto;
}

// Actualizar pantalla
function actualizarPantalla() {
  entrada.forEach((val, i) => {
    digitBoxes[i].textContent = val;
    digitBoxes[i].className = 'digit-box';
    if (val) digitBoxes[i].classList.add('filled');
  });
}

// Añadir dígito
function agregarDigito(num) {
  if (posicionActual < 4 && !entrada.includes(num)) {
    entrada[posicionActual] = num;
    posicionActual++;
    actualizarPantalla();
  }
}

// Borrar último
function borrarDigito() {
  if (posicionActual > 0) {
    posicionActual--;
    entrada[posicionActual] = '';
    actualizarPantalla();
  }
}

// Evaluar Muertos y Heridos
function evaluar(intento, secreto) {
  let muertos = 0;
  let heridos = 0;
  for (let i = 0; i < 4; i++) {
    if (intento[i] === secreto[i]) muertos++;
    else if (secreto.includes(intento[i])) heridos++;
  }
  return { muertos, heridos };
}

// Mostrar resultado
function mostrarResultado(intento, muertos, heridos) {
  const li = document.createElement('li');
  li.textContent = `${intento} → ${muertos}M ${heridos}H`;
  listaIntentos.appendChild(li);
}

// Fin del juego
function finDelJuego(gano) {
  btnEnviar.disabled = true;
  if (gano) {
    mensaje.textContent = '🎉 ¡Lo lograste!';
    mensaje.className = 'mensaje success';
  } else {
    mensaje.textContent = `💀 ¡Fallaste! Era: ${numeroSecreto}`;
    mensaje.className = 'mensaje';
  }
}

// Reiniciar juego
function reiniciar() {
  numeroSecreto = generarSecreto();
  intentos = 0;
  entrada.fill('');
  posicionActual = 0;
  mensaje.textContent = '';
  listaIntentos.innerHTML = '';
  actualizarPantalla();
  btnEnviar.disabled = false;
  console.log("Número secreto (prueba):", numeroSecreto); // Solo para desarrollo
}

// Eventos del teclado
document.querySelectorAll('.tecla[data-num]').forEach(btn => {
  btn.addEventListener('click', () => {
    const num = btn.getAttribute('data-num');
    agregarDigito(num);
  });
});

btnBorrar.addEventListener('click', borrarDigito);

btnEnviar.addEventListener('click', () => {
  if (entrada.every(d => d !== '')) {
    const intentoStr = entrada.join('');
    intentos++;
    const { muertos, heridos } = evaluar(intentoStr, numeroSecreto);
    mostrarResultado(intentoStr, muertos, heridos);

    if (muertos === 4) {
      finDelJuego(true);
    } else if (intentos >= maxIntentos) {
      finDelJuego(false);
    }

    // Limpiar para nuevo intento
    entrada.fill('');
    posicionActual = 0;
    actualizarPantalla();
  } else {
    mensaje.textContent = 'Completa los 4 dígitos.';
    mensaje.className = 'mensaje error';
    setTimeout(() => { mensaje.textContent = ''; }, 1500);
  }
});

btnReiniciar.addEventListener('click', reiniciar);

// Iniciar juego
reiniciar();
