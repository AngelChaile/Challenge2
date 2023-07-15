class Display {
    constructor(displayValorAnterior, displayValorActual) {
      this.displayValorActual = displayValorActual; // Referencia al elemento del DOM para mostrar el valor actual
      this.displayValorAnterior = displayValorAnterior;// Referencia al elemento del DOM para mostrar el valor anterior
      this.calculador = new Calculadora(); // Instancia de la clase Calculadora para realizar los cálculos
      this.tipoOperacion = undefined; // Tipo de operación actual
      this.valorActual = ''; // Valor actual en la calculadora
      this.valorAnterior = ''; // Valor anterior en la calculadora
      this.signos = {
        sumar: '+',
        dividir: '/',
        multiplicar: 'x',
        restar: '-',
        porcentaje: '%',
        raiz: '√',
        potencia: '^'
      };
    }
  
    borrar() {
      // Eliminar el último dígito del valor actual
      this.valorActual = this.valorActual.toString().slice(0, -1);
      this.imprimirValores(); // Actualizamos los valores en el display
    }
  
    borrarTodo() {
      // Borrar todos los valores y restablecer las operaciones
      this.valorActual = '';
      this.valorAnterior = '';
      this.tipoOperacion = undefined;
      this.imprimirValores();
    }
  
    computar(tipo) {
      if (tipo === 'raiz') {
        // Cuando se selecciona el botón de raíz
        this.tipoOperacion = tipo;
        this.imprimirValores();
        return; // No se realiza ningún cálculo por ahora
      } else if (tipo === 'igual' && this.tipoOperacion === 'raiz') {
        // Cuando se presiona el botón igual después de seleccionar la raíz
        this.valorActual = this.calculador.raiz(parseFloat(this.valorActual));
        this.tipoOperacion = undefined;
        this.valorAnterior = '';
        this.imprimirValores();
        return;
      } else {
        // Realizar el cálculo de la operación actual
        this.tipoOperacion !== 'igual' && this.calcular(); // Realizamos el cálculo si hay una operación pendiente
        this.tipoOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = '';
      }
      this.imprimirValores();
    }
  
    agregarNumero(numero) {
      // Agregar el número al valor actual
      if (numero === '.' && this.valorActual.includes('.')) return; // Evitar múltiples puntos decimales
      this.valorActual = this.valorActual.toString() + numero.toString(); // Concatenamos el número al valor actual
      this.imprimirValores();
    }
  
    imprimirValores() {
      // Mostrar los valores en los elementos de visualización correspondientes
      this.displayValorActual.textContent = this.valorActual;
      this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
    }
  
    calcular() {
      // Realizar el cálculo basado en la operación actual y los valores anteriores y actuales
      const valorAnterior = parseFloat(this.valorAnterior);
      const valorActual = parseFloat(this.valorActual);
  
      if (isNaN(valorActual) || isNaN(valorAnterior)) return; // Verificar si los valores son válidos
  
      if (this.tipoOperacion === 'potencia') {
        this.valorActual = this.calculador.potencia(valorAnterior, valorActual);
      } else {
        this.valorActual = this.calculador[this.tipoOperacion](valorAnterior, valorActual).toString();
      }
    }
  }
  