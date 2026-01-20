const prompt = require("prompt-sync")();

// ======== 1. ESTRUCTURA DE DATOS ========
//a) Crear un array de objetos llamado libros que contenga al menos 10 libros. 
// cada libro tiene id, titulo, autor, anio, genero, disponible (true/false) 
let libros = [
  { id: 1, titulo: "Harry Potter and the Sorcerers Stone", autor: " Chris Columbus ", anio: 2001, genero: "Ciencia Ficcion", disponible: true },
  { id: 2, titulo: "Mean Girls", autor: " Mark Waters ", anio: 2004, genero: "Drama", disponible: true },
  { id: 3, titulo: "La La Land", autor: " Damien Chazelle ", anio: 2016, genero: "Drama", disponible: true },
  { id: 4, titulo: "Catch Me If You Can", autor: " Steven Spielberg ", anio: 2002, genero: "Drama", disponible: true },
  { id: 5, titulo: "IT", autor: " Andy Muschietti ", anio: 2017, genero: "Terror", disponible: true },
  { id: 6, titulo: "Hereditary", autor: " Ari Aster ", anio: 2018, genero: "Horror", disponible: true },
  { id: 7, titulo: "A Quiet Place", autor: " John Krasinski ", anio: 2018, genero: "Terror", disponible: true },
  { id: 8, titulo: "Interstellar", autor: " Christopher Nolan ", anio: 2014, genero: "Ciencia Ficcion", disponible: true },
  { id: 9, titulo: "Donnie Darko", autor: " Richard Kelly ", anio: 2001, genero: "Ciencia Ficcion", disponible: true },
  { id: 10, titulo: "Die My Love", autor: " Lynne Ramsay ", anio: 2024, genero: "Drama", disponible: true }
];

// b) Crear un array de objetos llamado usuarios con al menos 5 usuarios. 
// cada usuario tiene id, nombre, email, librosPrestados (array de ids de libros)
let usuarios = [
  { id: 1, nombre: "Adriana Gutierrez", email: "adry.gc@hotmail.com", librosPrestados: [] },
  { id: 2, nombre: "Alan Renteria", email: "arenteriap@outlook.com", librosPrestados: [] },
  { id: 3, nombre: "Alicia Medina", email: "aliciamedina@hotmail.com", librosPrestados: [] },
  { id: 4, nombre: "Beatriz Zavala", email: "beatrizavala@hotmail.com", librosPrestados: [] },
  { id: 5, nombre: "Abril Munoz", email: "abrilmunoz@outlook.com", librosPrestados: [] }
  ];


  // FUNCION PARA MOSTRAR TODOS LOS LIBROS
  function mostrarTodosLosLibros() {
  console.log(" LISTA DE TODOS LOS LIBROS ");
  console.log("----------------------------");
  console.table(libros);
}


// =========================================================
// ======== 2. FUNCIONES DE GESTION DE LIBROS ==============
// =========================================================

// a) Agregar un libro al array "libros"
   // Recibe los datos y hace push al array
   // Lo agrega como disponible = true
   // Revisa que el ID no se repita

function agregarLibro(id, titulo, autor, anio, genero) {
  // Verificar que el ID no exista
  const existe = libros.some(libro => libro.id === id);

  if (existe) {
    console.log(" =====> Ya existe un libro con ese ID."); 
    return;
  }
  console.log(" =====> Agregando nuevo libro...");
  // Agregar el nuevo libro
  libros.push({
    id: id,
    titulo: titulo,
    autor: autor,
    anio: anio,
    genero: genero,
    disponible: true
  });

  console.log("\n");
  console.log(" =====> Libro agregado correctamente.");
  console.log(" =====> Libros actuales:");
  console.table(libros);
}


// b) Buscar libros por titulo, autor o genero (BUSQUEDA LINEAL)

function buscarLibro(valor) { // valor puede ser titulo, autor o genero
  let encontrados = [];
  valor = valor.toLowerCase();

  // Búsqueda lineal (uno por uno)
  for (let i = 0; i < libros.length; i++) {
    if (
      libros[i].titulo.toLowerCase().includes(valor) || 
      libros[i].autor.toLowerCase().includes(valor) ||
      libros[i].genero.toLowerCase().includes(valor)
    ) {
      encontrados.push(libros[i]);
    }
  }

  console.log("\n");
  return encontrados;
}


// c) Ordenar libros por titulo o anio usando BUBBLE SORT
  
function ordenarLibros(criterio) {

  // Validamos el criterio
  if (criterio !== "titulo" && criterio !== "anio") { // Solo se permiten esos dos
    console.log(" ====> Criterio inválido. Usa 'titulo' o 'anio'.");
    return;
  }

  // Copia del array para no modificar el original
  let librosOrdenados = [...libros]; 

  // Bubble sort
  for (let i = 0; i < librosOrdenados.length - 1; i++) { // n-1 pasadas
    for (let j = 0; j < librosOrdenados.length - 1 - i; j++) { // Comparaciones

      if (criterio === "titulo") { // Comparar por título
        if (librosOrdenados[j].titulo > librosOrdenados[j + 1].titulo) { // Si están en el orden incorrecto
          // Intercambiar
          let temp = librosOrdenados[j]; // Guardar el valor actual
          librosOrdenados[j] = librosOrdenados[j + 1]; // Poner el siguiente en la posición actual
          librosOrdenados[j + 1] = temp; // Poner el valor guardado en la siguiente posición
        }
      }

      if (criterio === "anio") {
        if (librosOrdenados[j].anio > librosOrdenados[j + 1].anio) {
          let temp = librosOrdenados[j]; // Guardar el valor actual
          librosOrdenados[j] = librosOrdenados[j + 1]; // Poner el siguiente en la posición actual
          librosOrdenados[j + 1] = temp; // Poner el valor guardado en la siguiente posición
        }
      }
    }
  }

  console.log(" =====> Libros ordenados por " + criterio + ":");
  console.table(librosOrdenados); // Mostrar en tabla
}




// d) Borrar libro por ID, busca el libro por ID.. Si lo encuentra lo elimina con splice

function borrarLibro(id) {
  // Buscar la posicion del libro
  const indice = libros.findIndex(libro => libro.id === id);

  if (indice === -1) {
    console.log(" =====> No se encontro un libro con ese ID.");
    return;
  }

  // Eliminar el libro
  libros.splice(indice, 1);
  console.log(" =====>  Libro eliminado correctamente.");
}



// =========================================================
//3. ======== GESTION DE USUARIOS ==========================
// =========================================================
//a) Implementar una función registrarUsuario(nombre, email) que agregue un nuevo usuario al array usuarios.

function registrarUsuario(nombre, email) {
  // Convertimos el email a minúsculas
  email = email.toLowerCase();

  // Verificamos que el email no exista
  const existe = usuarios.some(usuario => usuario.email === email);

  if (existe) {
    console.log(" =====> Ya existe un usuario con ese email.");
    return;
  }

  // Creamos un nuevo id (sumamos 1 al total)
  const nuevoId = usuarios.length + 1;

  // Agregamos el usuario al array
  usuarios.push({
    id: nuevoId,
    nombre: nombre,
    email: email,
    librosPrestados: []
  });

  console.log(" =====> Usuario registrado correctamente.");
}

//b) Implementar una función mostrarTodosLosUsuarios() que me devuelva el array completo de usuarios
function mostrarTodosLosUsuarios() {
  return usuarios;
}


//c) Crear una función buscarUsuario(email) que devuelva la información de un usuario dado su email.
function buscarUsuario(email) {
  email = email.toLowerCase();

  // Buscamos el usuario con ese email
  const usuario = usuarios.find(u => u.email === email);

  console.log(" =====> Usuario encontrado:" + usuario.nombre + " - " + usuario.email);

  return usuario || null;
}


//d) Implementar una función borrarUsuario(nombre, email) que elimine el usuario seleccionado.
function borrarUsuario(nombre, email) {
  email = email.toLowerCase();

  // Buscamos la posición del usuario
  const indice = usuarios.findIndex(
    u => u.nombre === nombre && u.email === email
  );

  if (indice === -1) {
    console.log(" =====> Usuario no encontrado.");
    return;
  }

  // Verificamos que no tenga libros prestados
  if (usuarios[indice].librosPrestados.length > 0) {
    console.log(" =====> No se puede borrar: el usuario tiene libros prestados.");
    return;
  }

  // Eliminamos el usuario
  usuarios.splice(indice, 1);
  console.log(" =====> Usuario eliminado correctamente.");
}


// =========================================================
// ========== 4. SISTEMA DE PRÉSTAMOS ======================
// =========================================================
//a) Desarrollar una función prestarLibro(idLibro, idUsuario) 
// que marque un libro como no disponible y lo agregue a la lista de libros prestados del usuario.

function prestarLibro(idLibro, idUsuario) {
  // Buscar el libro por ID
  const libro = libros.find(l => l.id === idLibro);

  // Buscar el usuario por ID
  const usuario = usuarios.find(u => u.id === idUsuario);

  // Validaciones básicas
  if (!libro) {
    console.log(" =====> El libro no existe.");
    return;
  }

  if (!usuario) {
    console.log(" =====> El usuario no existe.");
    return;
  }

  if (libro.disponible === false) {
    console.log(" =====> El libro ya está prestado.");
    return;
  }

  // Marcar el libro como no disponible
  libro.disponible = false;

  // Agregar el ID del libro al usuario
  usuario.librosPrestados.push(idLibro);

  console.log(" =====> Libro prestado correctamente.");
}


//b) Implementar una función devolverLibro(idLibro, idUsuario) que marque un libro como disponible y lo elimine de la lista de libros prestados del usuario.

function devolverLibro(idLibro, idUsuario) {
  // Buscar el libro y el usuario
  const libro = libros.find(l => l.id === idLibro);
  const usuario = usuarios.find(u => u.id === idUsuario);

  if (!libro || !usuario) {
    console.log(" =====> El libro o el usuario no existen.");
    return;
  }

  // Buscar el libro dentro de los prestados del usuario
  const indice = usuario.librosPrestados.indexOf(idLibro);

  if (indice === -1) {
    console.log(" =====> Ese libro no está prestado a este usuario.");
    return;
  }

  // Marcar el libro como disponible
  libro.disponible = true;

  // Quitar el libro del array librosPrestados
  usuario.librosPrestados.splice(indice, 1);

  console.log(" =====> Libro devuelto correctamente.");
}

// ========================================================================
// ================ 5. REPORTES ===========================================
// ========================================================================
//a) Crear una función generarReporteLibros() que utilice métodos avanzados de arrays 
// (.map(), .filter(), .reduce()) para generar un reporte con la siguiente información:
//✔ Cantidad total de libros.
//✔ Cantidad de libros prestados.
//✔ Cantidad de libros por género.
//✔ Libro más antiguo y más nuevo

function generarReporteLibros() {

  // Primero obtengo la cantidad total de libros que hay en el sistema
  const totalLibros = libros.length;

  // Después cuento cuántos libros están prestados
  const librosPrestados = libros.filter(libro => libro.disponible === false).length;

  // Ahora voy a contar cuántos libros hay por cada género
  let contador = {};

  // Recorro el array de libros uno por uno
  for (let i = 0; i < libros.length; i++) {
    let genero = libros[i].genero;

    // Si el género todavía no existe en el contador, lo inicializo en 0
    if (!contador[genero]) {
      contador[genero] = 0;
    }

    // Luego aumento en 1 la cantidad de ese género
    contador[genero]++;
  }

  // Ahora obtengo todos los años de publicación de los libros
  const anios = libros.map(libro => libro.anio);

  // Uso Math para encontrar el año más antiguo y el más nuevo
  const anioMasAntiguo = Math.min(...anios);
  const anioMasNuevo = Math.max(...anios);

  // Creo variables para guardar el libro más antiguo y el más nuevo
  let libroMasAntiguo = null;
  let libroMasNuevo = null;

  // Recorro los libros para encontrar cuáles coinciden con esos años
  for (let i = 0; i < libros.length; i++) {
    if (libros[i].anio === anioMasAntiguo) {
      libroMasAntiguo = libros[i];
    }
    if (libros[i].anio === anioMasNuevo) {
      libroMasNuevo = libros[i];
    }
  }

  //  Reporte completo en consola
  console.log("\n");
  console.log("\nREPORTE DE LIBROS");
  console.log("----------------------------");
  console.log("Total de libros:", totalLibros);
  console.log("Libros prestados:", librosPrestados);

  console.log("\nLibros por género:");
  for (let genero in contador) {
    console.log("- " + genero + ": " + contador[genero]);
  }

  console.log("\nLibro más antiguo:");
  console.log(libroMasAntiguo.titulo + " (" + libroMasAntiguo.anio + ")");

  console.log("\nLibro más nuevo:");
  console.log(libroMasNuevo.titulo + " (" + libroMasNuevo.anio + ")");
  console.log("----------------------------");
}

// ==============================================================
// ======== 6. IDENTIFICACIÓN AVANZADA DE LIBROS ================
// ==============================================================
//a) Implementar una función librosConPalabrasEnTitulo() 
// que identifique y muestre todos los libros cuyo título contiene más de una palabra 
// (no títulos que contengan números ni otros caracteres).

function librosConPalabrasEnTitulo() {
  let titulosValidos = [];

  // Recorremos todos los libros
  for (let i = 0; i < libros.length; i++) {
    let titulo = libros[i].titulo.trim();

    // 1) Verificar que tenga más de una palabra
    let palabras = titulo.split(" ");
    if (palabras.length <= 1) {
      continue; // Saltamos si solo tiene una palabra
    }

    // 2) Verificar que solo tenga letras y espacios
    let esValido = true;

    for (let j = 0; j < titulo.length; j++) {
      let caracter = titulo[j];

      // Si no es letra ni espacio, no es válido
      if (
        (caracter < "A" || caracter > "Z") &&
        (caracter < "a" || caracter > "z") &&
        caracter !== " "
      ) {
        esValido = false;
        break;
      }
    }

    // 3) Si cumple todo, lo agregamos
    if (esValido) {
      titulosValidos.push(titulo);
    }
  }

  // Mostrar en consola
console.log("  Títulos con más de una palabra: ");

for (let i = 0; i < titulosValidos.length; i++) {
  console.log("- " + titulosValidos[i]);
 
}

  // Devolver el array
  console.log("\n");
  return titulosValidos;
 
}



// =========================================================
// ============ 7. CÁLCULOS ESTADÍSTICOS ===================
// =========================================================
//a) Desarrollar una función calcularEstadisticas() 
// que utilice el objeto Math para calcular y mostrar:
//✔ Promedio de años de publicación de los libros.
//✔ Año de publicación más frecuente.
//✔ Diferencia en años entre el libro más antiguo y el más nuevo.

function calcularEstadisticas() {
  // 1) Obtener solo los años de los libros (map)
  const anios = libros.map(libro => libro.anio);

  // 2) Promedio de años
  let suma = 0;
  for (let i = 0; i < anios.length; i++) {
    suma += anios[i];
  }
  const promedio = suma / anios.length;

  // 3) Año mas antiguo y mas nuevo (Math)
  const anioMasAntiguo = Math.min(...anios);
  const anioMasNuevo = Math.max(...anios);

  // 4) Diferencia entre el mas antiguo y el mas nuevo
  const diferencia = anioMasNuevo - anioMasAntiguo;

  // 5) Año mas frecuente
  let contador = {};
  for (let i = 0; i < anios.length; i++) {
    let anio = anios[i];
    contador[anio] = (contador[anio] || 0) + 1;
  }

  let anioMasFrecuente = anios[0];
  let mayorCantidad = 1;

  for (let anio in contador) {
    if (contador[anio] > mayorCantidad) {
      mayorCantidad = contador[anio];
      anioMasFrecuente = Number(anio);
    }
  }

  // 6) Mostrar resultados
  console.log("\n");
  console.log("ESTADÍSTICAS DE LOS LIBROS");
  console.log("Promedio de años:", promedio);
  console.log("Año más frecuente:", anioMasFrecuente);
  console.log("Diferencia entre el más antiguo y el más nuevo:", diferencia);
  console.log("\n");
}


// =========================================================
// ============ 8. MANEJO DE CADENAS =======================
// =========================================================
//a) Crear una función normalizarDatos() que utilice métodos de strings para:
//✔ Convertir todos los títulos a mayúsculas.
//✔ Eliminar espacios en blanco al inicio y final de los nombres de autores.
//✔ Formatear los emails de los usuarios a minúsculas.

function normalizarDatos() {

  // 1) Normalizar los libros
  for (let i = 0; i < libros.length; i++) {

    // Convertir título a MAYÚSCULAS
    libros[i].titulo = libros[i].titulo.toUpperCase();

    // Quitar espacios al inicio y final del autor
    libros[i].autor = libros[i].autor.trim();
  }

  // 2) Normalizar los usuarios
  for (let i = 0; i < usuarios.length; i++) {

    // Convertir email a minúsculas
    usuarios[i].email = usuarios[i].email.toLowerCase();
  }

  console.log(" Libros después de normalizar los datos:");
  console.table(libros);

  console.log(" Datos normalizados correctamente.");

  console.log(" Usuarios después de normalizar los datos:");
  console.table(usuarios);

}

// =========================================================================
//================== 9. INTERFAZ DE USUARIO POR CONSOLA ====================
// =========================================================================
//a) Implementar una función menuPrincipal() que muestre un menú de opciones al usuario 
// y permita interactuar con el sistema utilizando prompt().
//b) El menú debe incluir opciones para todas las funcionalidades anteriores y utilizar 
// estructuras de control (if, switch, ciclos) para manejar la lógica.



function menuPrincipal() {
  let salir = false; // Si es true, se termina el programa

  // while = ciclo que repite el menu hasta que el usuario elija salir
  while (!salir) {
    console.log("\n==============================");
    console.log(" MENU PRINCIPAL - BIBLIOTECA ");
    console.log("==============================");
    console.log("1) Mostrar todos los libros");
    console.log("2) Agregar libro");
    console.log("3) Buscar libro (titulo/autor/genero)");
    console.log("4) Ordenar libros (titulo/anio) - Bubble Sort");
    console.log("5) Borrar libro (por ID)");
    console.log("6) Registrar usuario");
    console.log("7) Mostrar todos los usuarios");
    console.log("8) Buscar usuario (por email)");
    console.log("9) Borrar usuario (nombre y email)");
    console.log("10) Prestar libro");
    console.log("11) Devolver libro");
    console.log("12) Generar reporte de libros");
    console.log("13) Titulos con mas de una palabra");
    console.log("14) Calcular estadisticas");
    console.log("15) Normalizar datos");
    console.log("0) Salir");

    // Pedimos la opcion al usuario
    const opcion = prompt("Elige una opcion: ").trim();
    console.log("\n");

    // switch = decide que hacer segun la opcion
    switch (opcion) {
      case "1": {
        // Mostrar todos los libros
        mostrarTodosLosLibros();
        break;
      }

      case "2": {
        // Agregar libro
        const id = Number(prompt("ID: "));
        const titulo = prompt("Titulo: ");
        const autor = prompt("Autor: ");
        const anio = Number(prompt("Anio: "));
        const genero = prompt("Genero: ");
        agregarLibro(id, titulo, autor, anio, genero);
        break;
        }
        
        case "3": {
          // Buscar libro
        const valor = prompt("Ingrese el libro a buscar [autor | titulo | genero] :").trim();

        if (valor === "") {
        console.log(" =====> Debes escribir algo para buscar.");
        break;
        }

        const resultados = buscarLibro(valor);

        if (resultados.length === 0) {
        console.log(" =====> No se encontraron libros.");
        } else {
        console.table(resultados);
        }
         break;
    }

      case "4": {
        // Ordenar libros
        const criterio = prompt("Ordenar por (titulo/anio): ").trim();
        ordenarLibros(criterio);
        break;
      }

      case "5": {
        // Borrar libro
        const id = Number(prompt("ID del libro a borrar: "));
        borrarLibro(id);
        break;
      }

      case "6": {
        // Registrar usuario
        const nombre = prompt("Nombre: ");
        const email = prompt("Email: ");
        registrarUsuario(nombre, email);
        break;
      }

      case "7": {
        // Mostrar usuarios
        console.table(mostrarTodosLosUsuarios());
        break;
      }

      case "8": {
        // Buscar usuario por email
        const email = prompt("Email del usuario: ");
        const usuario = buscarUsuario(email);

        if (usuario === null) {
          console.log(" =====> Usuario no encontrado.");
        } else {
          console.log(usuario);
        }
        break;
      }

      case "9": {
        // Borrar usuario
        const nombre = prompt("Nombre EXACTO: ");
        const email = prompt("Email: ");
        borrarUsuario(nombre, email);
        break;
      }

      case "10": {
        // Prestar libro
        const idLibro = Number(prompt("ID del libro: "));
        const idUsuario = Number(prompt("ID del usuario: "));
        prestarLibro(idLibro, idUsuario);
        break;
      }

      case "11": {
        // Devolver libro
        const idLibro = Number(prompt("ID del libro: "));
        const idUsuario = Number(prompt("ID del usuario: "));
        devolverLibro(idLibro, idUsuario);
        break;
      }

      case "12": {
        // Reporte
        generarReporteLibros();
        break;
      }

      case "13": {
        // Titulos con mas de una palabra
        librosConPalabrasEnTitulo();
        break;
      }

      case "14": {
        // Estadisticas
        calcularEstadisticas();
        break;
      }

      case "15": {
        // Normalizar datos
        normalizarDatos();
        break;
      }

      case "0": {
        // Salir del programa
        salir = true;
        console.log(" Saliendo del sistema...");
        break;
      }

      default:
        console.log(" =====> Opcion invalida. Intenta de nuevo.");
    }
  }
}



menuPrincipal();
