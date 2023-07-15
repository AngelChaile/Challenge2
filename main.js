// Obtener elementos del DOM
const displayValorAnterior = document.querySelector('.calculadora__valor-anterior');
const displayValorActual = document.querySelector('.calculadora__valor-actual');
const botonesNumeros = document.querySelectorAll('.calculadora__numero');
const botonesOperadores = document.querySelectorAll('.calculadora__operador');

const deleteChar = document.getElementById('borrar1');
const deleteAll = document.getElementById('borraTodo');

// Agregar eventos a los botones
deleteChar.addEventListener('click', () => display.borrar());
deleteAll.addEventListener('click', () => display.borrarTodo());

// Crear instancia de la clase Display
const display = new Display(displayValorAnterior, displayValorActual);

// Agregar eventos a los botones de números
botonesNumeros.forEach(boton => {
  boton.addEventListener('click', () => display.agregarNumero(boton.innerHTML));
});

// Agregar eventos a los botones de operadores
botonesOperadores.forEach(boton => {
  boton.addEventListener('click', () => display.computar(boton.value));
});
