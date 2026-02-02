class Usuario {
  constructor(usuario, password) {
    this.usuario = usuario;
    this.password = password;
  }
}

class Persona extends Usuario {
  constructor(
    usuario,
    password,
    nombre,
    correo,
    altura,
    peso,
    fechaNacimiento,
  ) {
    super(usuario, password);
    this.nombre = nombre;
    this.correo = correo;
    this.altura = altura; //cm
    this.peso = peso; //kg
    this.fechaNacimiento = fechaNacimiento;
    this.entrenamientos = [];
    //* Para controlar los entrenamientos creados y borrarlos, se le añade un Id unico partiendo desde 0
    this.entrenamientoId = 0;
  }

  añadirEntrenamiento(entrenamiento) {
    this.entrenamientos.push(entrenamiento);
  }

  eliminarEntrenamiento(id) {
    for (let i = 0; i < this.entrenamientos.length; i++) {
      if (this.entrenamientos[i].getId() == id) {
        this.entrenamientos.splice(i, 1);
        console.log(this.entrenamientos);

        break;
      }
    }
  }

  getEntrenamientos() {
    return this.entrenamientos;
  }

  getEdad() {
    const fechaActual = new Date();
    return fechaActual.getFullYear() - this.fechaNacimiento.getFullYear();
  }

  nextId() {
    return ++this.entrenamientoId;
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

//TODO: JQuery do
class Entrenamiento {
  constructor(id, distancia, tiempo, tipo, fecha) {
    this.id = id;
    this.distancia = distancia; //metros
    this.tiempo = tiempo; //min
    this.fecha = fecha;
    this.tipo = tipo;
    this.nivel = this.marcarNivel();
  }

  getId() {
    return this.id;
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
        return "fa-person-biking";
      case "correr":
        return "fa-person-running";
      case "natacion":
        return "fa-person-swimming";
      case "senderismo":
        return "fa-person-walking";
      default:
        return "";
    }
  }

  tipoHtml() {
    return `<i class="fa-solid ${this.getIconTipo()}"></i><br>${this.tipo}`;
  }

  mostrarInfo() {
    //const tr = document.createElement("tr");
    const tr = $("<tr>");

    const content = [
      this.tipoHtml(),
      this.distancia,
      this.getHorasMin(),
      this.getVelocidad().toFixed(2),
      this.getFecha(),
      this.nivel,
    ];

    content.forEach((elemento) => {
      //const td = document.createElement("td");
      //td.innerHTML = elemento;
      //tr.appendChild(td);
      tr.append($("<td>").html(elemento));
    });

    //const td = document.createElement("td");
    //td.innerHTML =
    //  '<button class="eliminar" title="Eliminar"><i class="fa-solid fa-trash"></i></button>';
    const td = $("<td>").html(
      '<button class="eliminar" title="Eliminar"><i class="fa-solid fa-trash"></i></button>',
    );

    //tr.appendChild(td);
    //tr.dataset.id = this.id;
    tr.append(td);
    tr.attr("data-id", this.id);

    return tr;
  }
}

/**
 * Este es el metodo más importante de todos, donde se encuentran todos los addEventListener
 */
function listeners() {
  //* Muestra el form de crear usuario tras pulsar Iniciar sesión
  //document.getElementById("mostrarForm").addEventListener("click", () => {
  $("#mostrarForm").click(() => {
    if (localStorage?.sesion) {
      const nomUsuario = localStorage.usuario;
      const password = localStorage.password;
      const correo = localStorage.correo;
      const nombre = localStorage.nombre;
      const altura = localStorage.altura;
      const peso = localStorage.peso;
      const fechaNacimiento = new Date(localStorage.fechaNacimiento);
      usuario = new Persona(
        nomUsuario,
        password,
        nombre,
        correo,
        altura,
        peso,
        fechaNacimiento,
      );
      crearIndex();
    } else {
      //TODO: JQuery do
      //registrar.classList.remove("oculto");
      $("#registrar").removeClass("oculto");
    }
  });

  //* Muestra el form de añadir entrenamiento
  //document.getElementById("mostrarAñadirEntrenamiento").addEventListener("click", () => show("añadirEntrenamiento"));
  $("#mostrarAñadirEntrenamiento").click(() => show("añadirEntrenamiento"));

  //* Muestra el form de radio para calcular los totales
  //document.getElementById("mostrarTotales").addEventListener("click", () => {
  $("#mostrarTotales").click(() => {
    show("totales");
  });
  //TODO: JQuery do
  //* Muestra el form de radio para calcular los totales
  //document.getElementById("mostrarForo").addEventListener("click", () => {
  $("#mostrarForo").click(() => {
    show("foro_form");
    show("foro", false);
    //document.getElementById("nick").placeholder = "Nick de usuario: " + localStorage.usuario;
    $("#nick").attr("placeholder", "Nick de usuario: " + localStorage.usuario);
  });

  //* Muestra todos los entrenamientos listados
  //TODO: JQuery do
  //document.getElementById("mostrarEntrenamientos").addEventListener("click", () => {
  $("#mostrarEntrenamientos").click(function () {
    showInner(mostrarEntrenamientos());

    //const borrarBtn = document.querySelectorAll(".eliminar");
    const borrarBtn = $(".eliminar");

    //borrarBtn.forEach((btn) => {
    borrarBtn.each(function (btn) {
      //btn.addEventListener("click", function () {
      btn.click(function () {
        const tr = $(this).closest("tr");
        //const id = tr.dataset.id;
        const id = tr.attr("data-id");

        usuario.eliminarEntrenamiento(id);

        tr.remove();
      });
    });
  });

  //* Muestra form Mejor Entrenamiento
  //document.getElementById("mostrarMejorEntrenamiento").addEventListener("click", () => {show("mejorEntrenamiento");});
  $("#mostrarMejorEntrenamiento").click(() => {
    show("mejorEntrenamiento");
  });

  //TODO: JQuery do
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

  //TODO: JQuery do
  //* Control radio de los totales
  //document.getElementById("totales").addEventListener("change", (e) => {
  $("#totales").on("change", function (e) {
    let contenido;

    contenido = totales(e.target.value);

    showInner(contenido, false);
  });

  //* Añadir entrenamiento
  //document.getElementById("crearEntrenamiento").addEventListener("click", crearEntrenamiento);
  $("#crearEntrenamiento").click(crearEntrenamiento);

  //* Crear Persona
  //document.getElementById("crearPersona").addEventListener("click", () => {
  $("#crearPersona").click(function () {
    //* Si es true, se cambian los display de los formularios

    //TODO: JQuery do
    if (crearPersona()) {
      //div_login.classList.remove("oculto");
      $("div_login").removeClass("oculto");
      crearIndex();
    }
  });
  //* Crear usuario
  //document.getElementById("crearUsuario").addEventListener("click", () => {
  $("#crearUsuario").click(function () {
    //* Si es true, se cambian los display de los formularios

    //TODO: JQuery do
    if (crearUsuario()) {
      hider("form_persona");

      //registrar.classList.add("oculto");
      //inicio.classList.add("oculto");
      //div_login.classList.remove("oculto");
      $("#registrar").addClass("oculto");
      $("#inicio").addClass("oculto");
      $("#div_login").removeClass("oculto");
    }
  });

  /*
  *Forma parte de la primera versión de la practica realizada en  el tema 4, he considerado más optimo utilizar las propiedades CSS

  const inputs = document.querySelectorAll("input, select");

  inputs.forEach((el) => {
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

  buttons.forEach((btn) => {
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
*/

  /*
  * Si se un elemento con la clase .cerrar, es decir la X del popup se le añade un listener.
  Esto se debe a que solo aparece mientras no se haya iniciado sesión.

  <div class="popup">
    <span class="cerrar">...
  </div>

  En este caso se elimina el padre de el span, es decir el div que conforma el popup
  */
  //TODO: JQuery do
  //document.querySelector(".cerrar")?.addEventListener("click", function () {
  //  this.parentElement.remove();
  //});
  $(".cerrar").click(function () {
    $(".blur").remove();
  });

  //* Al pulsar el botón de cerrar sesión se eliminan los datos en localStorage y se reinicia la pagina
  //document.getElementById("cerrarSesion").addEventListener("click", () => {
  $("#cerrarSesion").click(function () {
    localStorage.clear();
    location.reload();
  });

  //* Cambia el tema entre oscuro y blanco
  //document.getElementById("toggleTheme").addEventListener("click", addDarkTheme);
  $("#toggleTheme").click(addDarkTheme);

  //* Añade publicaciones al foro
  //document.getElementById("publicarPost").addEventListener("click", publicarPost);
  $("#publicarPost").click(publicarPost);

  //* Hace visible las flechas del carrusel
  $(".f-button, .is-arraw").on({
    mouseenter: function () {
      $(this).css("opacity", "100%", "!important");
    },
    mouseleave: function () {
      $(this).css("opacity", "0%", "!important");
    },
  });

  $(".me > .btn").click(function () {
    $("div.msg").toggleClass("hide");
    $(this).toggleClass("msgTop");
  });
}

/**
 * Este metodo muestra los distintos formularios en base al id con el que llega, y llama los distintos metodos según que formulario
 * - añadirEntrenamiento llama a ahoraDatetimeLocal() para darle el valor de la hora actual al input
 * - totales y mejorEntrenamiento, llaman a showInner() con un mensaje para que se seleccione el radio
 */
//TODO: JQuery do
function show(id, hide = true) {
  if (hide) {
    hider(id);
  }
  //formularios_btn.classList.remove("oculto");
  $("#formularios_btn").removeClass("oculto");

  //const elemento = document.getElementById(id);
  //elemento.classList.remove("oculto");
  $(`#${id}`).removeClass("oculto");

  switch (id) {
    case "añadirEntrenamiento":
      //elemento.fechaEntrenamiento.value = ahoraDatetimeLocal();
      $(`#${id} #fechaEntrenamiento`).val(ahoraDatetimeLocal());
      break;
    case "totales":
    case "mejorEntrenamiento":
      //const text = document.createElement("p");
      //text.textContent = "Selecciona una de las categorias";
      const text = $("<p>").text("Selecciona una de las categorias");
      showInner([text], false);
      break;

    default:
      break;
  }
}

/**
 * El metodo muestra [section id=resultados] e imprime en este en String que llegue por @contenido , si se añade un false se mantienen los formularios y no se ocultan
 */
//TODO: JQuery do
function showInner(contenido, hide = true) {
  //const resultadoInner = document.getElementById("resultados");
  //resultadoInner.innerHTML = "";
  const resultadoInner = $("#resultados");
  resultadoInner.text("");
  if (hide) {
    hider();
  }
  //resultadoInner.classList.remove("oculto");
  resultadoInner.removeClass("oculto");
  contenido.forEach((elemento) => {
    //resultadoInner.appendChild(elemento);
    resultadoInner.append(elemento);
  });
}

/**
 * Este metodo oculta todos los formularios y reinicia la [section id=resultados]
 */
//TODO: JQuery do
function hider(id = null) {
  //formularios_btn.classList.add("oculto");
  //foro.classList.add("oculto");
  $("#formularios_btn").addClass("oculto");
  $("#foro").addClass("oculto");

  //const resultadoInner = document.getElementById("resultados");
  //resultados.classList.add("oculto");
  //resultadoInner.innerHTML = "";
  $("#resultados").addClass("oculto").text("");

  //const forms = document.querySelectorAll("form");
  //forms.forEach((form) => {
  //  if (id != form.id) {
  //    form.classList.add("oculto");
  //  }
  //});
  $("form")
    .not("#" + id)
    .addClass("oculto");
}

/**
 * Este metodo crear los datos de la persona para añadirlos a @usuario
 * Busca el form donde se inician los datos siendo [form id ="form_login"] y se guarda en @persona
 * La variable @ultimatum sirve para que si uno de los inputs no es correcto, no se cree la persona, se devuelve en bool para saber si mostrar el resto de app
 * La variable @mensajes crea los mensajes de error, que se mostraran debajo para ayudar a introducir los valores correctos
 * Se recorre todos los input y en base al id con un swtich se hacen sus comprobaciones individuales con un regex llamando a comprobarRegex()
 * En @error se vuelve true si hay un error, inciando el if(error), mostrando el mensaje de error y cambiando la clase al input para ponerle estilo
 * Si @ultimatum es true se crea @usuario si no se escriben los mensajes con showInner(), se devuele false y hasta que el listener llame de nuevo
 *
 * Estos datos recogidos se añaden a localStorage
 */
//TODO: JQuery do
function crearPersona() {
  //const persona = document.getElementById("form_persona");

  let ultimatum = true;
  let mensajes = [];
  //persona.querySelectorAll("input").forEach((input) => {
  $("#form_persona input").each(function () {
    let error = false;
    let tempMsj = "";

    //switch (input.id) {
    switch (this.id) {
      case "nombre":
        //error = !comprobarRegex(/^[\w]{3,}$/, input.value);
        error = !comprobarRegex(/^[\w]{3,}$/, $(this).val());
        tempMsj = "Debe contener el nombre menos 3 caracteres";
        break;
      case "correo":
        //error = !comprobarRegex(/^[\w]{1,}@[\w]{1,}.[\w]{1,}$/, input.value);
        error = !comprobarRegex(/^[\w]{1,}@[\w]{1,}.[\w]{1,}$/, $(this).val());
        tempMsj = "Introduce un correo valido";
        break;
      case "altura":
      case "peso":
        //error = !comprobarRegex(/^[\d]{1,}$/, input.value);
        error = !comprobarRegex(/^[\d]{1,}$/, $(this).val());
        //tempMsj = "Introduce un valor valido en " + input.id;
        tempMsj = "Introduce un valor valido en " + $(this).val();
        break;
      case "fecha_nacimiento":
        error =
          //input.value == "" ||
          //input.value == null ||
          //new Date(input.value) > new Date(); //* Comprobar que la fecha no es posterior
          $(this).val() == "" ||
          $(this).val() == null ||
          new Date($(this).val()) > new Date(); //* Comprobar que la fecha no es posterior
        tempMsj = "Introduce una fecha valida";
        break;
    }

    if (error) {
      //input.value = "";
      //const error = document.createElement("p");
      //error.textContent = `[ERROR] - ${tempMsj}`;
      //error.classList.add("p-error");
      $(this).val("");
      const error = $("<p>").text(`[ERROR] - ${tempMsj}`).addClass("p-error");
      mensajes.push(error);

      //input.className = "input-error";
      $(this).removeClass("input-normal");
      $(this).addClass("input-error");
      ultimatum = false;
    } else {
      //input.className = "input-normal";
      $(this).removeClass("input-error");
      $(this).addClass("input-normal");
    }
  });

  if (ultimatum) {
    //const correo = persona.correo.value;
    //const nombre = persona.nombre.value;
    //const altura = persona.altura.value;
    //const peso = persona.peso.value;
    //const fechaNacimiento = new Date(persona.fecha_nacimiento.value);
    const correo = $("#form_persona #correo").val();
    const nombre = $("#form_persona #nombre").val();
    const altura = $("#form_persona #altura").val();
    const peso = $("#form_persona #peso").val();
    const fechaNacimiento = new Date(
      $("#form_persona #fecha_nacimiento").val(),
    );
    usuario = new Persona(
      localStorage.usuario,
      localStorage.password,
      nombre,
      correo,
      altura,
      peso,
      fechaNacimiento,
    );
    localStorage.sesion = true;
    localStorage.correo = correo;
    localStorage.nombre = nombre;
    localStorage.altura = altura;
    localStorage.peso = peso;
    //localStorage.fechaNacimiento = persona.fecha_nacimiento.value;
    localStorage.fechaNacimiento = $("#form_persona #fecha_nacimiento").val();
  } else {
    showInner(mensajes, false);
  }
  return ultimatum;
}

/**
 * Se basa en la logica de crearPersona(), pero al haber campos que terminan compartiendo valor debo compararlos juntos y no se puede desde el foreach
 * Por ello, los compruebo a parte siendo estos las horas y el tipo el tipo select que no es input
 */
//TODO: JQuery do
function crearEntrenamiento() {
  //const entrenamiento = document.getElementById("añadirEntrenamiento");

  let mensajes = [];
  let ultimatum = true;
  //entrenamiento.querySelectorAll("input").forEach((input) => {
  $("#añadirEntrenamiento input").each(function () {
    let error = false;
    let tempMsj = "";

    //switch (input.id) {
    switch (this.id) {
      case "distanciaInput":
        //error = input.value < 0 || input.value == null || input.value == "";
        //tempMsj = "Introduce un valor valido en " + input.id;
        error =
          $(this).val() < 0 || $(this).val() == null || $(this).val() == "";
        tempMsj = "Introduce un valor valido en " + $(this).val();
        break;
      case "fechaEntrenamiento":
        error =
          //input.value == "" ||
          //input.value == null ||
          //new Date(input.value) > new Date(); //* Comprobar que la fecha no es posterior
          $(this).val() == "" ||
          $(this).val() == null ||
          new Date($(this).val()) > new Date(); //* Comprobar que la fecha no es posterior
        tempMsj = "Introduce una fecha valida";
        break;
      default:
        break;
    }
    if (error) {
      //input.value = "";
      //const error = document.createElement("p");
      //error.textContent = `[ERROR] - ${tempMsj}`;
      //error.classList.add("p-error");
      $(this).val("");
      const error = $("<p>").text(`[ERROR] - ${tempMsj}`).addClass("p-error");
      mensajes.push(error);

      //input.className = "input-error";
      $(this).addClass("input-error");
      ultimatum = false;
    } else {
      //input.className = "input-normal";
      $(this).addClass("input-normal");
    }
  });

  //const distancia = Number(entrenamiento.distanciaInput.value);
  //const horas = Number(entrenamiento.horas.value);
  //const minutos = Number(entrenamiento.minutos.value);
  //const tiempo = horas * 60 + minutos; //* min
  const distancia = Number($("#añadirEntrenamiento #distanciaInput").val());
  const horas = Number($("#añadirEntrenamiento #horas").val());
  const minutos = Number($("#añadirEntrenamiento #minutos").val());
  const tiempo = horas * 60 + minutos; //* min

  //* Para controlar el tiempo, por si los dos tienen valor 0 o negativo.
  if (tiempo <= 0) {
    //const errorTiempo = document.createElement("p");
    //errorTiempo.textContent = `[ERROR] - Introdocude un tiempo valido`;
    //errorTiempo.classList.add("p-error");
    const errorTiempo = $("<p>")
      .text(`[ERROR] - Introdocude un tiempo valido`)
      .addClass("p-error");
    mensajes.push(errorTiempo);

    //entrenamiento.horas.className = "input-error";
    //entrenamiento.minutos.className = "input-error";
    $("#añadirEntrenamiento #horas").addClass("input-error");
    $("#añadirEntrenamiento #minutos").addClass("input-error");
    ultimatum = false;
  }

  //* Para controlar el tipo, por si no hay.
  //const tipo = tipoActividad.value;
  const tipo = $("#tipoActividad").val();
  if (tipo == "" || tipo == null) {
    //const errorTipo = document.createElement("p");
    //errorTipo.textContent = `[ERROR] - Introdocude el tipo de entrenamiento`;
    //errorTipo.classList.add("p-error");
    const errorTipo = $("<p>")
      .text(`[ERROR] - Introdocude el tipo de entrenamiento`)
      .addClass("p-error");
    mensajes.push(errorTipo);

    //entrenamiento.tipoActividad.className = "input-error";
    $("#añadirEntrenamiento #tipoActividad").addClass("input-error");
    ultimatum = false;
  } else {
    //entrenamiento.tipoActividad.className = "input-normal";
    $("#añadirEntrenamiento #tipoActividad").addClass("input-normal");
  }

  //const fecha = new Date(entrenamiento.fechaEntrenamiento.value);
  const fecha = new Date($("#añadirEntrenamiento #fechaEntrenamiento").val());

  if (ultimatum) {
    usuario.añadirEntrenamiento(
      new Entrenamiento(usuario.nextId(), distancia, tiempo, tipo, fecha),
    );

    //let p = document.createElement("p");
    //p.classList.add("p-exito");
    //p.textContent = `Entrenamiento ${
    //  usuario.getEntrenamientos().length
    //}º creado (pulsa Mostrar entrenamientos para ver tus entrenamientos)`;
    const p = $("<p>")
      .addClass("p-exito")
      .text(
        `Entrenamiento ${usuario.getEntrenamientos().length}º creado (pulsa Mostrar entrenamientos para ver tus entrenamientos)`,
      );

    showInner([p], false);
  } else {
    showInner(mensajes, false);
  }
  console.log(usuario);
}

/*
  Comoparte la logica de crearPersona(), pero para crear los datos de la cuenta
*/
//TODO: JQuery do
function crearUsuario() {
  //const login = document.getElementById("form_registro");

  let ultimatum = true;
  let mensajes = [];
  //login.querySelectorAll("input").forEach((input) => {
  $("#form_registro input").each(function () {
    let error = false;
    let tempMsj = "";

    //switch (input.id)) {
    switch (this.id) {
      case "usuario":
        //error = !comprobarRegex(/^[\w]{3,}$/, input.value);
        error = !comprobarRegex(/^[\w]{3,}$/, $(this).val());
        tempMsj = "Debe contener el nombre de usuario al menos 3 caracteres";
        break;
      case "password":
        error = !comprobarRegex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
          //input.value
          $(this).val(),
        );
        tempMsj =
          "Debe contener al menos 8 caracteres con una minuscula, una mayuscula y un número ";
        break;
    }

    if (error) {
      //input.value = "";
      $(this).val("");
      //const error = document.createElement("p");
      //error.textContent = `[ERROR] - ${tempMsj}`;
      //error.classList.add("p-error");
      const errorPush = $("<p>")
        .text(`[ERROR] - ${tempMsj}`)
        .addClass("p-error");
      mensajes.push(errorPush);

      //input.className = "input-error";
      $(this).removeClass("input-normal");
      $(this).addClass("input-error");
      ultimatum = false;
    } else {
      //input.className = "input-normal";
      $(this).removeClass("input-error");
      $(this).addClass("input-normal");
    }
  });

  if (ultimatum) {
    //localStorage.usuario = login.usuario.value;
    //localStorage.password = login.password.value;
    localStorage.usuario = $("#form_registro #usuario").val();
    localStorage.password = $("#form_registro #password").val();
  } else {
    showInner(mensajes, false);
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
//TODO: JQuery do
function mostrarEntrenamientos() {
  //const titulo = document.createElement("h2");
  //titulo.textContent = "Entrenamientos";
  const titulo = $("<h2>").text("Entrenamientos");

  if (usuario.getEntrenamientos().length == 0) {
    //const texto = document.createElement("p");
    //texto.textContent = "No hay entrenamientos";
    const texto = $("<p>").text("No hay entrenamientos");

    return (contenido = [titulo, texto]);
  } else {
    //let table = createTable();
    const table = createTable();

    usuario.getEntrenamientos().forEach((entrenamiento) => {
      //table.appendChild(entrenamiento.mostrarInfo()); // ya devuelve <tr> completo
      table.append(entrenamiento.mostrarInfo()); // ya devuelve <tr> completo
    });
    return (contenido = [titulo, table]);
  }
}

// Metodo para crear la tabla para listar los entrenamientos
//TODO: JQuery do
function createTable() {
  //const table = document.createElement("table");
  //const trTitulos = document.createElement("tr");
  const table = $("<table>");
  const trTitulos = $("<tr>");

  const headers = [
    "Tipo",
    "Distancia (m)",
    "Tiempo",
    "Velocidad (km/h)",
    "Fecha",
    "Nivel",
    "Acciones",
  ];

  headers.forEach((text) => {
    //const th = document.createElement("th");
    //th.textContent = text;
    //trTitulos.appendChild(th);
    trTitulos.append($("<th>").text(text));
  });

  //table.appendChild(trTitulos);
  return table.append(trTitulos);
}

/**
 * Recibe el @valor que se ha elegido en el [radio id=dato]
 * * Se comprueba si hay entrenamientos, si no hay se muestra
 * Por un forEach se busca el que tiene la mayor velocidad,tiempo o velocidad según @valor sobre todos los entrenamientos
 * Y se devuelve @contenido con su contenido mostrado por mostrarInfo()
 */

//TODO: JQuery do
function mejoresEntrenamientos(valor) {
  //const titulo = document.createElement("h2");
  //titulo.textContent = `Mejor entrenamiento ${valor}`;
  const titulo = $("<h2>").text(`Mejor entrenamiento ${valor}`);

  if (usuario.getEntrenamientos().length == 0) {
    //const texto = document.createElement("p");
    //texto.textContent = "No hay entrenamientos";
    const texto = $("<p>").text("No hay entrenamientos");

    return (contenido = [titulo, texto]);
  } else {
    let mejorMarca = usuario.getEntrenamientos()[0];

    usuario.getEntrenamientos().forEach((entrenamientos) => {
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

    const table = createTable();

    //table.appendChild(mejorMarca.mostrarInfo());
    table.append(mejorMarca.mostrarInfo());

    return (contenido = [titulo, table]);
  }
}

/**
 * Recibe el @valor que se ha elegido en el [radio id=totales]
 * * Se comprueba si hay entrenamientos, si no hay se muestra
 * Por un forEach se suma del valor que viene de @valor ya puede ser tiempo o distancia
 * A traves de otro switch se establece el formato del texto de salida
 * Y se devuelve @contenido
 */

//TODO: JQuery do
function totales(valor) {
  //const titulo = document.createElement("h2");
  //titulo.textContent = `Total ${valor}`;
  const titulo = $("<h2>").text(`Total ${valor}`);

  if (usuario.getEntrenamientos().length == 0) {
    //const texto = document.createElement("p");
    //texto.textContent = "No hay entrenamientos";
    const texto = $("<p>").text("No hay entrenamientos");

    return (contenido = [titulo, texto]);
  } else {
    let total = 0;

    usuario.getEntrenamientos().forEach((entrenamientos) => {
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

    //let texto;
    const texto = $("<p>");

    switch (valor) {
      case "tiempo":
        //texto = document.createElement("p");
        //texto.textContent = `Total min entrenando: ${total} min`;
        texto.text(`Total min entrenando: ${total} min`);
        break;
      case "distancia":
        //texto = document.createElement("p");
        //texto.textContent = `Total min entrenando: ${total} min`;
        texto.text(`Total min entrenando: ${total} min`);
        break;
      default:
        break;
    }
    return (contenido = [titulo, texto]);
  }
}

/**
 * Esta función muestra y oculta la sección de iniciar sesión del resto de formularios de la app
 * Inprimiendo @usuario a traves de mostrarPersona()
 */
//TODO: JQuery do
function crearIndex() {
  //inicio.classList.add("oculto");
  //div_login.classList.add("oculto");
  $("#inicio").addClass("oculto");
  $("#div_login").addClass("oculto");

  //btn.classList.remove("oculto");
  //perfil.classList.remove("oculto");
  //formularios_btn.classList.remove("oculto");
  //resultados.classList.add("oculto");
  $("#btn").removeClass("oculto");
  $("#perfil").removeClass("oculto");
  $("#formularios_btn").removeClass("oculto");
  $("#resultados").addClass("oculto");

  mostrarPersona();
}

/**
 * Esta función inprime los datos de @usuario con innerHTML en el [p id=datosPerfil] tras la configuración de crearIndex()
 */
//TODO: JQuery do
function mostrarPersona() {
  //const p = document.getElementById("datosPerfil");
  //p.textContent = usuario.mostrarInfo();
  const p = $("#datosPerfil").html(usuario.mostrarInfo());
}

/**
 * Se crea un array con las distintas imagenes
 * En el setInterval() cada 50s se ejecuta y se establece al src la imagen de @imgs
 * La variable @i funciona como indice, y en cada iteración suma uno, si es igual al tamaño del array se resetea a 0 y vuelve a empezar
 */
//TODO: JQuery do
function imgs() {
  let i = 0;
  const imgs = [
    "img/ZP-AI-Automation-for-Fitness-Blog-Header-800x450-1.png",
    "img/social-fitness-thumb-697e1e5.jpg",
    "img/20210203-1024x684_1200x802.webp",
    "img/strong_men.jpg",
  ];
  //document.querySelector("img").src = imgs[i];
  const img = $("img").attr("src", imgs[i]);

  setInterval(() => {
    //document.querySelector("img").src = imgs[i++];
    img.attr("src", imgs[i++]);

    if (i == imgs.length) i = 0;
  }, 50000);
}

//TODO: JQuery do
// Crea un popup que añade al html
function createPopup() {
  //let popup = document.createElement("div");
  //popup.classList.add("popup");
  const popup = $("<div>").addClass("popup item");

  //let equis = document.createElement("i");
  //equis.classList.add("fa-solid");
  //equis.classList.add("fa-xmark");
  const equis = $("<i>").addClass("fa-solid fa-xmark");

  //let cerrar = document.createElement("span");
  //cerrar.classList.add("cerrar");
  //cerrar.appendChild(equis);
  const cerrar = $("<span>").addClass("cerrar").append(equis);

  //let titulo = document.createElement("h2");
  //titulo.textContent = "Bienvenido🙋";
  const titulo = $("<h2>").text("Bienvenido🙋");

  //let contenido = document.createElement("p");
  //contenido.textContent = "Bienvenido al nuevo FITNESS APP :D";
  const contenido = $("<p>").text("Bienvenido al nuevo JQ-FITNESS APP :D");

  //popup.appendChild(cerrar);
  //popup.appendChild(titulo);
  //popup.appendChild(contenido);
  const blur = $("<div>")
    .addClass("blur")
    .append(popup.append(cerrar).append(titulo).append(contenido));

  //document.body.appendChild(popup);
  $("body").append(blur);
}

/**
 * Añade las publicaciones al foro de la web, el nickName se usa de forma predeterminado el introducido como usuario,
 * pero como se solicitaba en la practica añadir un campo para nick, este se puede modificar
 */
//TODO: JQuery do
function publicarPost() {
  //const textarea = document.getElementById("opinion");
  //const nick = document.getElementById("nick");
  const textarea = $("#opinion");
  const nick = $("#nick");

  let nickName = localStorage.usuario;

  //if (textarea.value == "") {
  if (textarea.val() == "") {
    //textarea.placeholder = "[ERROR] - No hay contenido en el post";
    //textarea.classList.add("input-error");
    textarea
      .attr("placeholder", "[ERROR] - No hay contenido en el post")
      .addClass("input-error");
    return;
  } else {
    //textarea.placeholder = "Opinion..";
    //textarea.classList.remove("input-error");
    textarea.attr("placeholder", "Opinion..").removeClass("input-error");
  }

  //if (nick.value != "") {
  //  nickName = nick.value;
  //}
  if (nick.val() != "") {
    nickName = nick.val();
  }

  //const divNode = document.createElement("div");
  //divNode.classList.add("post");
  const divNode = $("<div>").addClass("post");

  //const userPost = document.createElement("p");
  //userPost.classList.add("user");
  //userPost.textContent = nickName + " • " + new Date().toLocaleString();
  const userPost = $("<p>")
    .addClass("user")
    .text(`${nickName} • ${new Date().toLocaleString()}`);

  //const textoPost = document.createElement("p");
  //textoPost.classList.add("texto");
  //textoPost.textContent = textarea.value;
  const textoPost = $("<p>").addClass("texto").text(textarea.val());

  divNode.append(userPost).append(textoPost);

  //const foroDiv = document.getElementById("foro");
  //foroDiv.insertBefore(divNode, foroDiv.children[0]);
  $("#foro").prepend(divNode);

  //textarea.value = "";
  textarea.text();
}

/**
 * Hace toggle entre el tema oscuro y los logos del button, guarda la ultima acción en localStorage
 */
function addDarkTheme() {
  //TODO: JQuery do
  //let dark = document.body.classList.toggle("dark");
  let dark = $("body").toggleClass("dark");

  //TODO: JQuery do
  //let btn = document.getElementById("toggleTheme").children[0];
  //btn.classList.toggle("fa-moon");
  //btn.classList.toggle("fa-sun");
  $("#toggleTheme i").toggleClass("fa-moon");
  $("#toggleTheme i").toggleClass("fa-sun");

  localStorage.darkTheme = dark;
}

function carruselImagenes() {
  Carousel(
    document.getElementById("myCarousel"),
    {
      pauseOnHover: true,
      Autoplay: {
        timeout: 10000,
      },
    },
    {
      Arrows,
      Autoplay,
    },
  ).init();

  Fancybox.bind("[data-fancybox]");
}

//* Cuando inicia la web se ejecutan los metodos con permanentes
$(document).ready(function () {
  carruselImagenes();

  if (localStorage.darkTheme === "true") {
    addDarkTheme();
  }
  if (localStorage?.sesion) {
    //TODO: JQuery do
    //document.getElementById("mostrarForm").innerHTML = "Iniciar";
    $("#mostrarForm").text("Iniciar");
  } else {
    //!createPopup();
  }
  listeners();
  //!imgs();
});

//* Variable donde se registran todos los usuarios
let usuario;
