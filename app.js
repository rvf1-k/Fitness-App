class Persona {
  constructor(nombre, correo, altura, peso, fechaNacimiento) {
    this.nombre = nombre;
    this.correo = correo;
    this.altura = altura; //cm
    this.peso = peso; //kg
    this.fechaNacimiento = fechaNacimiento;
    this.entrenamientos = [];
  }

  añadirEntrenamiento(entrenamiento) {
    this.entrenamientos.push(entrenamiento);
  }

  getEntrenamientos() {
    return this.entrenamientos;
  }

  getEdad() {
    const fechaActual = new Date();
    return fechaActual.getFullYear() - this.fechaNacimiento.getFullYear();
  }

  mostrarInfo() {
    return `Nombre: ${this.nombre} | Correo: ${this.correo} | Altura: ${
      this.altura
    } | Peso: ${this.peso} | Edad: ${this.getEdad()}`;
  }
}

const Nivel = {
  MALO: "Malo",
  BUENO: "Bueno",
  MUYBUENO: "Muy bueno",
};

class Entrenamiento {
  constructor(distancia, tiempo, tipo, fecha) {
    this.distancia = distancia; //metros
    this.tiempo = tiempo; //min
    this.fecha = fecha;
    this.tipo = tipo;
    this.nivel = this.marcarNivel();
  }

  getDistancia() {
    return this.distancia;
  }

  getVelocidad() {
    //* v (km/h) = distancia (km) / tiempo (h)
    return this.distancia / this.tiempo;
  }

  getHorasMin() {
    return `${Math.floor(this.tiempo / 60)}h : ${this.tiempo % 60}min`;
  }

  getHoras() {
    return this.tiempo / 60;
  }

  getTiempo() {
    return this.tiempo;
  }

  marcarNivel() {
    const velocidad = this.getVelocidad();

    switch (this.tipo) {
      case "ciclismo":
        if (velocidad < 15) return Nivel.MALO;
        else if (velocidad < 25) return Nivel.BUENO;
        else return Nivel.MUYBUENO;

      case "correr":
        if (velocidad < 8) return Nivel.MALO;
        else if (velocidad < 15) return Nivel.BUENO;
        else return Nivel.MUYBUENO;

      case "natacion":
        if (velocidad < 2) return Nivel.MALO;
        else if (velocidad < 4) return Nivel.BUENO;
        else return Nivel.MUYBUENO;

      case "senderismo":
        if (velocidad < 3) return Nivel.MALO;
        else if (velocidad < 5) return Nivel.BUENO;
        else return Nivel.MUYBUENO;

      default:
        return Nivel.MALO;
    }
  }

  /**
   * Este metodo da el formato de hora española
   * * No lo hemos dado en clase, lo he buscado https://www.w3schools.com/jsref/jsref_tolocalestring.asp
   */
  getFecha() {
    return this.fecha.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  getIconTipo() {
    switch (this.tipo) {
      case "ciclismo":
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
        <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
        <path d="M400 160C426.5 160 448 138.5 448 112C448 85.5 426.5 64 400 64C373.5 64 352 85.5 352 112C352 138.5 373.5 160 400 160zM427.2 224L365.4 175.2C348.1 161.6 323.7 161.4 306.3 174.9L223.2 239.1C192.5 262.9 194.7 309.9 227.5 330.7L288 369.1L288 480C288 497.7 302.3 512 320 512C337.7 512 352 497.7 352 480L352 352C352 341.3 346.7 331.3 337.8 325.4L295 296.9L355.3 248.4L396 281C401.7 285.5 408.7 288 416 288L480 288C497.7 288 512 273.7 512 256C512 238.3 497.7 224 480 224L427.2 224zM144 576C205.9 576 256 525.9 256 464C256 402.1 205.9 352 144 352C82.1 352 32 402.1 32 464C32 525.9 82.1 576 144 576zM496 576C557.9 576 608 525.9 608 464C608 402.1 557.9 352 496 352C434.1 352 384 402.1 384 464C384 525.9 434.1 576 496 576z"/></svg>`;

      case "correr":
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
          <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
          <path d="M352.5 32C383.4 32 408.5 57.1 408.5 88C408.5 118.9 383.4 144 352.5 144C321.6 144 296.5 118.9 296.5 88C296.5 57.1 321.6 32 352.5 32zM219.6 240C216.3 240 213.4 242 212.2 245L190.2 299.9C183.6 316.3 165 324.3 148.6 317.7C132.2 311.1 124.2 292.5 130.8 276.1L152.7 221.2C163.7 193.9 190.1 176 219.6 176L316.9 176C345.4 176 371.7 191.1 386 215.7L418.8 272L480.4 272C498.1 272 512.4 286.3 512.4 304C512.4 321.7 498.1 336 480.4 336L418.8 336C396 336 375 323.9 363.5 304.2L353.5 287.1L332.8 357.5L408.2 380.1C435.9 388.4 450 419.1 438.3 445.6L381.7 573C374.5 589.2 355.6 596.4 339.5 589.2C323.4 582 316.1 563.1 323.3 547L372.5 436.2L276.6 407.4C243.9 397.6 224.6 363.7 232.9 330.6L255.6 240L219.7 240zM211.6 421C224.9 435.9 242.3 447.3 262.8 453.4L267.5 454.8L260.6 474.1C254.8 490.4 244.6 504.9 231.3 515.9L148.9 583.8C135.3 595 115.1 593.1 103.9 579.5C92.7 565.9 94.6 545.7 108.2 534.5L190.6 466.6C195.1 462.9 198.4 458.1 200.4 452.7L211.6 421z"/>
          </svg>`;

      case "natacion":
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
            <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
            <path d="M552 216C552 185.1 526.9 160 496 160C465.1 160 440 185.1 440 216C440 246.9 465.1 272 496 272C526.9 272 552 246.9 552 216zM293.4 262.2L204.8 336.1C205.9 336.1 207 336 208.1 336C241.2 335.8 274.4 346.2 302.5 367.4C324.6 384 331.6 384 353.7 367.4C381.2 346.7 413.6 336.2 446.1 336C450.9 336 455.8 336.2 460.6 336.6C452.3 306.6 436.3 278.9 413.8 256.4C395.4 238 373.2 223.7 348.8 214.6L280.2 188.9C252.8 178.6 222.2 181.4 197.1 196.5L143.6 228.6C128.4 237.7 123.5 257.3 132.6 272.5C141.7 287.7 161.3 292.6 176.5 283.5L230 251.3C238.4 246.3 248.6 245.4 257.7 248.8L293.4 262.2zM403.4 444.1C424.7 428 453.3 428 474.6 444.1C493.6 458.5 516.5 472.3 541.8 477.4C568.3 482.8 596.1 478.2 622.5 458.3C633.1 450.3 635.2 435.3 627.2 424.7C619.2 414.1 604.2 412 593.6 420C578.7 431.2 565 433.1 551.3 430.3C536.4 427.3 520.4 418.4 503.5 405.7C465.1 376.7 413 376.7 374.5 405.7C350.5 423.8 333.8 432 320 432C306.2 432 289.5 423.8 265.5 405.7C227.1 376.7 175 376.7 136.5 405.7C114.9 422 95.2 431.5 77.6 431.4C68 431.3 57.7 428.4 46.4 419.9C35.8 411.9 20.8 414 12.8 424.6C4.8 435.2 7 450.3 17.6 458.3C36.7 472.7 57 479.3 77.4 479.4C111.3 479.6 141.7 462 165.5 444.1C186.8 428 215.4 428 236.7 444.1C260.9 462.4 289 480 320.1 480C351.2 480 379.2 462.3 403.5 444.1z"/></svg>`;

      case "senderismo":
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="30">
        <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
        <path d="M320 144C350.9 144 376 118.9 376 88C376 57.1 350.9 32 320 32C289.1 32 264 57.1 264 88C264 118.9 289.1 144 320 144zM233.4 291.9L256 269.3L256 338.6C256 366.6 268.2 393.3 289.5 411.5L360.9 472.7C366.8 477.8 370.7 484.8 371.8 492.5L384.4 580.6C386.9 598.1 403.1 610.3 420.6 607.8C438.1 605.3 450.3 589.1 447.8 571.6L435.2 483.5C431.9 460.4 420.3 439.4 402.6 424.2L368.1 394.6L368.1 279.4L371.9 284.1C390.1 306.9 417.7 320.1 446.9 320.1L480.1 320.1C497.8 320.1 512.1 305.8 512.1 288.1C512.1 270.4 497.8 256.1 480.1 256.1L446.9 256.1C437.2 256.1 428 251.7 421.9 244.1L404 221.7C381 192.9 346.1 176.1 309.2 176.1C277 176.1 246.1 188.9 223.4 211.7L188.1 246.6C170.1 264.6 160 289 160 314.5L160 352C160 369.7 174.3 384 192 384C209.7 384 224 369.7 224 352L224 314.5C224 306 227.4 297.9 233.4 291.9zM245.8 471.3C244.3 476.5 241.5 481.3 237.7 485.1L169.4 553.4C156.9 565.9 156.9 586.2 169.4 598.7C181.9 611.2 202.2 611.2 214.7 598.7L283 530.4C294.5 518.9 302.9 504.6 307.4 488.9L309.6 481.3L263.6 441.9C261.1 439.7 258.6 437.5 256.2 435.1L245.8 471.3z"/></svg>`;

      default:
        return "";
    }
  }

  mostrarInfo() {
    return `
    <tr>
        <td>${this.getIconTipo()}<br>${this.tipo}</td>
        <td>${this.distancia}</td>
        <td>${this.getHorasMin()}</td>
        <td>${this.getVelocidad().toFixed(2)}</td>
        <td>${this.getFecha()}</td>
        <td>${this.nivel}</td>
    </tr>
    `;
  }
}

/**
 * Este es el metodo más importante de todos, donde se encuentran todos los addEventListener
 */
function listeners() {
  //* Muestra el form de crear usuario tras pulsar Iniciar sesión
  document.getElementById("mostrarForm").addEventListener("click", () => {
    document.getElementById("div_login").style.display = "block";
  });

  //* Muestra el form de añadir entrenamiento
  document
    .getElementById("mostrarAñadirEntrenamiento")
    .addEventListener("click", () => show("añadirEntrenamiento"));

  //* Muestra el form de radio para calcular los totales
  document.getElementById("mostrarTotales").addEventListener("click", () => {
    show("totales");
  });

  //* Muestra todos los entrenamientos listados
  document
    .getElementById("mostrarEntrenamientos")
    .addEventListener("click", () => {
      showInner(mostrarEntrenamientos());
    });

  //* Muestra form Mejor Entrenamiento
  document
    .getElementById("mostrarMejorEntrenamiento")
    .addEventListener("click", () => {
      show("mejorEntrenamiento");
    });

  //* Control radio de los mejores entrenamientos
  document
    .getElementById("mejorEntrenamiento")
    .addEventListener("change", (e) => {
      let contenido;

      switch (e.target.value) {
        case "distancia":
          contenido = mejoresEntrenamientos("distancia");
          break;
        case "tiempo":
          contenido = mejoresEntrenamientos("tiempo");
          break;
        case "velocidad":
          contenido = mejoresEntrenamientos("velocidad");
          break;
        default:
          contenido = ""; //Por toleración de errores
          break;
      }

      showInner(contenido, false);
    });

  //* Control radio de los totales
  document.getElementById("totales").addEventListener("change", (e) => {
    let contenido;

    contenido = totales(e.target.value);

    showInner(contenido, false);
  });

  //* Añadir entrenamiento
  document
    .getElementById("crearEntrenamiento")
    .addEventListener("click", crearEntrenamiento);

  //* Crear usuario
  document.getElementById("crearUsuario").addEventListener("click", () => {
    //* Si es true, se cambian los display de los formularios
    if (crearUsuario()) {
      crearIndex();
    }
  });


  const inputs = document.querySelectorAll("input, select");

  inputs.forEach(el => {
    el.addEventListener("focus", () => {
      el.style.borderColor = "#888";
      el.style.boxShadow = "0 0 5px rgba(100,100,100,0.3)";
      el.style.transition = "border 0.3s, box-shadow 0.3s";
    });

    el.addEventListener("blur", () => {
      el.style.borderColor = "#ccc";
      el.style.boxShadow = "none";
    });
  });

  const buttons = document.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.addEventListener("mouseover", () => {
      btn.style.backgroundColor = "rgb(241, 241, 241)";
      btn.style.transform = "translateY(-1px)";
      btn.style.transition = "transform 0.2s, background-color 0.2s";
    });

    btn.addEventListener("mouseout", () => {
      btn.style.backgroundColor = "";
      btn.style.transform = "none";
    });

    btn.addEventListener("mousedown", () => {
      btn.style.backgroundColor = "rgb(194, 194, 194)";
      btn.style.transform = "translateY(1px)";
    });

    btn.addEventListener("mouseup", () => {
      btn.style.backgroundColor = "rgb(241, 241, 241)";
      btn.style.transform = "translateY(-1px)";
    });
  });
 

}

/**
 * Este metodo muestra los distintos formularios en base al id con el que llega, y llama los distintos metodos según que formulario
 * - añadirEntrenamiento llama a ahoraDatetimeLocal() para darle el valor de la hora actual al input
 * - totales y mejorEntrenamiento, llaman a showInner() con un mensaje para que se seleccione el radio
 */
function show(id, hide = true) {
  if (hide) {
    hider();
  }
  document.getElementById("formularios_btn").style.display = "block";
  const elemento = document.getElementById(id);
  elemento.style.display = "block";

  switch (id) {
    case "añadirEntrenamiento":
      elemento.fechaEntrenamiento.value = ahoraDatetimeLocal();
      break;
    case "totales":
    case "mejorEntrenamiento":
      showInner("Selecciona una de las categorias", false);
      break;

    default:
      break;
  }
}

/**
 * El metodo muestra [section id=resultados] e imprime en este en String que llegue por @contenido , si se añade un false se mantienen los formularios y no se ocultan
 */
function showInner(contenido, hide = true) {
  const resultadoInner = document.getElementById("resultados");
  if (hide) {
    hider();
  }
  resultadoInner.style.display = "block";
  resultadoInner.innerHTML = contenido;
}

/**
 * Este metodo oculta todos los formularios y reinicia la [section id=resultados]
 */
function hider() {
  document.getElementById("formularios_btn").style.display = "none";

  const resultadoInner = document.getElementById("resultados");
  resultadoInner.style.display = "none";
  resultadoInner.innerHTML = "";

  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.style.display = "none";
  });
}

/**
 * ? Mejorable
 * Se basa en la logica de crearUsuario(), pero al haber campos que terminan compartiendo valor debo compararlos juntos y no se puede desde el foreach
 * Por ello, los compruebo a parte siendo estos las horas y el tipo el tipo select que no es input
 *
 * ? Es mejorable la logica, puede en vez de un foreach, recibir los valores y comprobarlos individualemte
 */
function crearEntrenamiento() {
  const entrenamiento = document.getElementById("añadirEntrenamiento");

  let mensaje = "";
  let ultimatum = true;
  entrenamiento.querySelectorAll("input").forEach((input) => {
    let error = false;
    let tempMsj = "";

    switch (input.id) {
      case "distanciaInput":
        error = input.value < 0 || input.value == null || input.value == "";
        tempMsj = "Introduce un valor valido en " + input.id;
        break;
      case "fechaEntrenamiento":
        error =
          input.value == "" ||
          input.value == null ||
          new Date(input.value) > new Date(); //* Comprobar que la fecha no es posterior
        tempMsj = "Introduce una fecha valida";
        break;
      default:
        break;
    }
    if (error) {
      input.value = "";
      mensaje += `<p class="p-error">[ERROR] - ${tempMsj}</p>`;
      input.className = "input-error";
      ultimatum = false;
    } else {
      input.className = "input-normal";
    }
  });

  const distancia = Number(entrenamiento.distanciaInput.value);
  const horas = Number(entrenamiento.horas.value);
  const minutos = Number(entrenamiento.minutos.value);
  const tiempo = horas * 60 + minutos; //* min

  //* Para controlar el tiempo, por si los dos tienen valor 0 o negativo.
  if (tiempo <= 0) {
    mensaje += `<p class="p-error">[ERROR] - Introdocude un tiempo valido</p>`;
    entrenamiento.horas.className = "input-error";
    entrenamiento.minutos.className = "input-error";
    ultimatum = false;
  }

  //* Para controlar el tipo, por si no hay.
  const tipo = tipoActividad.value;
  if (tipo == "" || tipo == null) {
    mensaje += `<p class="p-error">[ERROR] - Introdocude el tipo de entrenamiento</p>`;
    entrenamiento.tipoActividad.className = "input-error";
    entrenamiento.tipoActividad.className = "input-error";
    ultimatum = false;
  } else {
    entrenamiento.tipoActividad.className = "input-normal";
  }

  const fecha = new Date(entrenamiento.fechaEntrenamiento.value);

  if (ultimatum) {
    persona1.añadirEntrenamiento(
      new Entrenamiento(distancia, tiempo, tipo, fecha)
    );
    showInner(
      `<p class="p-exito">Entrenamiento ${
        persona1.getEntrenamientos().length
      }º creado (pulsa Mostrar entrenamientos para ver tus entrenamientos)</p>`,
      false
    );
  } else {
    showInner(mensaje, false);
  }
  console.log(persona1);
}

/**
 * Este metodo crear los datos de @persona1
 * Busca el form donde se inician los datos siendo [form id ="form_login"] y se guarda en @login
 * La variable @ultimatum sirve para que si uno de los inputs no es correcto, no se cree la persona, se devuelve en bool para saber si mostrar el resto de app
 * La variable @mensaje crea los mensajes de error, que se mostraran debajo para ayudar a introducir los valores correctos
 * Se recorre todos los input y en base al id con un swtich se hacen sus comprobaciones individuales con un regex llamando a comprobarRegex()
 * En @error se vuelve true si hay un error, inciando el if(error), mostrando el mensaje de error y cambiando la clase al input para ponerle estilo
 * Si @ultimatum es true se crea @persona1 si no se escriben los mensajes con showInner(), se devuele false y hasta que el listener llame de nuevo
 */
function crearUsuario() {
  const login = document.getElementById("form_login");

  let ultimatum = true;
  let mensaje = "";
  login.querySelectorAll("input").forEach((input) => {
    let error = false;
    let tempMsj = "";

    switch (input.id) {
      case "nombre":
        error = !comprobarRegex(/^[\w]{3,}$/, input.value);
        tempMsj = "Debe contener el nombre menos 3 caracteres";
        break;
      case "correo":
        error = !comprobarRegex(/^[\w]{1,}@[\w]{1,}.[\w]{1,}$/, input.value);
        tempMsj = "Introduce un correo valido";
        break;
      case "altura":
      case "peso":
        error = !comprobarRegex(/^[\d]{1,}$/, input.value);
        tempMsj = "Introduce un valor valido en " + input.id;
        break;
      case "fecha_nacimiento":
        error =
          input.value == "" ||
          input.value == null ||
          new Date(input.value) > new Date(); //* Comprobar que la fecha no es posterior
        tempMsj = "Introduce una fecha valida";
        break;
    }

    if (error) {
      input.value = "";
      mensaje += `<p class="p-error">[ERROR] - ${tempMsj}</p>`;
      input.className = "input-error";
      ultimatum = false;
    } else {
      input.className = "input-normal";
    }
  });

  if (ultimatum) {
    const correo = login.correo.value;
    const nombre = login.nombre.value;
    const altura = login.altura.value;
    const peso = login.peso.value;
    const fechaNacimiento = new Date(login.fecha_nacimiento.value);
    persona1 = new Persona(nombre, correo, altura, peso, fechaNacimiento);
  } else {
    showInner(mensaje, false);
  }
  return ultimatum;
}

/**
 * Recibe el patron de regex en @regex y el valor a comprobar en @valor
 * Comprueba que es valido y devuelve un boolean en @returns
 */
function comprobarRegex(regex, valor) {
  return new RegExp(regex).test(valor);
}

/**
 * @returns la fecha en el formato yyyy-mm-ddThh-min para añadirla en el input de añadirEntrenamiento(), para poner la fecha actual
 */
function ahoraDatetimeLocal() {
  const d = new Date();

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");

  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}

/**
 * * Se comprueba si hay entrenamientos, si no hay se muestra
 * Por un forEach se van listando todos los entrenamientos en formato tabla
 * Y se devuelve @contenido con su contenido mostrado por mostrarInfo()
 */
function mostrarEntrenamientos() {
  let contenido = "<h2>Entrenamientos</h2>";

  if (persona1.getEntrenamientos().length == 0) {
    contenido += `No hay entrenamientos`;
  } else {
    contenido = `
<table border="1" style="border-collapse: collapse; width: 100%;">
    <tr>
        <th>Tipo</th>
        <th>Distancia (m)</th>
        <th>Tiempo</th>
        <th>Velocidad (km/h)</th>
        <th>Fecha</th>
        <th>Nivel</th>
    </tr>
`;

    persona1.getEntrenamientos().forEach((entrenamiento) => {
      contenido += entrenamiento.mostrarInfo(); // ya devuelve <tr> completo
    });

    contenido += "</table>";
  }

  return contenido;
}

/**
 * Recibe el @valor que se ha elegido en el [radio id=dato]
 * * Se comprueba si hay entrenamientos, si no hay se muestra
 * Por un forEach se busca el que tiene la mayor velocidad,tiempo o velocidad según @valor sobre todos los entrenamientos
 * Y se devuelve @contenido con su contenido mostrado por mostrarInfo()
 */
function mejoresEntrenamientos(valor) {
  let contenido = `<h2>Mejor entrenamiento ${valor}</h2>`;

  if (persona1.getEntrenamientos().length == 0) {
    contenido += `No hay entrenamientos`;
  } else {
    let mejorMarca = persona1.getEntrenamientos()[0];

    persona1.getEntrenamientos().forEach((entrenamientos) => {
      switch (valor) {
        case "tiempo":
          if (entrenamientos.getTiempo() > mejorMarca) {
            mejorMarca = entrenamientos.getTiempo();
          }
          break;
        case "distancia":
          if (entrenamientos.getDistancia() > mejorMarca) {
            mejorMarca = entrenamientos.getDistancia();
          }
          break;
        case "velocidad":
          if (entrenamientos.getVelocidad() > mejorMarca) {
            mejorMarca = entrenamientos.getVelocidad();
          }
          break;
        default:
          break;
      }
    });

    contenido += `
<table border="1" style="border-collapse: collapse; width: 100%;">
    <tr>
        <th>Tipo</th>
        <th>Distancia (m)</th>
        <th>Tiempo</th>
        <th>Velocidad (km/h)</th>
        <th>Fecha</th>
        <th>Nivel</th>
    </tr>
`;

    contenido += mejorMarca.mostrarInfo();
    contenido += "</table>";
  }

  return contenido;
}

/**
 * Recibe el @valor que se ha elegido en el [radio id=totales]
 * * Se comprueba si hay entrenamientos, si no hay se muestra
 * Por un forEach se suma del valor que viene de @valor ya puede ser tiempo o distancia
 * A traves de otro switch se establece el formato del texto de salida
 * Y se devuelve @contenido
 */

function totales(valor) {
  let contenido = `<h2>Total ${valor}</h2>`;

  if (persona1.getEntrenamientos().length == 0) {
    contenido += `No hay entrenamientos`;
  } else {
    let total = 0;

    persona1.getEntrenamientos().forEach((entrenamientos) => {
      switch (valor) {
        case "tiempo":
          total += entrenamientos.getTiempo();
          break;
        case "distancia":
          total += entrenamientos.getDistancia();
          break;

        default:
          break;
      }
    });

    switch (valor) {
      case "tiempo":
        contenido += "Total min entrenando: " + total + " min";
        break;
      case "distancia":
        contenido += "Total km recorridos: " + total + " km";
        break;
      default:
        break;
    }
  }

  return contenido;
}

/**
 * ? Mejorable
 * Esta función muestra y oculta la sección de iniciar sesión del resto de formularios de la app
 * Inprimiendo @persona1 a traves de mostrarPersona()
 */
function crearIndex() {
  document.getElementById("login").style.display = "none";
  document.getElementById("div_login").style.display = "none";

  document.getElementById("btn").style.display = "block";
  document.getElementById("perfil").style.display = "block";
  document.getElementById("formularios_btn").style.display = "block";
  document.getElementById("resultados").style.display = "none";

  mostrarPersona();
}

/**
 * ? Mejorable
 * Esta función inprime los datos de @persona1 con innerHTML en el [p id=datosPerfil] tras la configuración de crearIndex()
 */
function mostrarPersona() {
  const p = document.getElementById("datosPerfil");

  p.innerHTML = persona1.mostrarInfo();
}

/**
 * Se crea un array con las distintas imagenes
 * En el setInterval() cada 50s se ejecuta y se establece al src la imagen de @imgs
 * La variable @i funciona como indice, y en cada iteración suma uno, si es igual al tamaño del array se resetea a 0 y vuelve a empezar
 */
function imgs() {
  let i = 0;
  const imgs = [
    "img/ZP-AI-Automation-for-Fitness-Blog-Header-800x450-1.png",
    "img/social-fitness-thumb-697e1e5.jpg",
    "img/20210203-1024x684_1200x802.webp",
    "img/strong_men.jpg",
  ];
  document.querySelector("img").src = imgs[i];

  setInterval(() => {
    document.querySelector("img").src = imgs[i++];

    if (i == imgs.length) i = 0;
  }, 50000);
}

//* Cuando inicia la web se ejecutan los metodos con permanentes
window.onload = () => {
  imgs();
  listeners();
};

//* Variable donde se construye al usuario
let persona1;
