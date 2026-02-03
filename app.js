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
      tr.append($("<td>").html(elemento));
    });

    const td = $("<td>").html(
      '<button class="eliminar btn" title="Eliminar"><i class="fa-solid fa-trash"></i></button>',
    );

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
      $("#registrar").removeClass("oculto");
    }
  });

  //* Muestra el form de añadir entrenamiento
  $("#mostrarAñadirEntrenamiento").click(() => show("añadirEntrenamiento"));

  //* Muestra el form de radio para calcular los totales
  $("#mostrarTotales").click(() => {
    show("totales");
  });

  //* Muestra el form de radio para calcular los totales
  $("#mostrarForo").click(() => {
    show("foro_form");
    show("foro", false);
    $("#nick").attr("placeholder", "Nick de usuario: " + localStorage.usuario);
  });

  //* Muestra todos los entrenamientos listados
  $("#mostrarEntrenamientos").click(function () {
    showInner(mostrarEntrenamientos());

    $(".eliminar").click(function () {
      const tr = $(this).closest("tr");
      const id = tr.attr("data-id");

      usuario.eliminarEntrenamiento(id);

      tr.remove();
    });
  });

  //* Muestra form Mejor Entrenamiento
  $("#mostrarMejorEntrenamiento").click(() => {
    show("mejorEntrenamiento");
  });

  //* Control radio de los mejores entrenamientos
  $("#mejorEntrenamiento").on("change", (e) => {
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
  $("#totales").on("change", function (e) {
    let contenido;

    contenido = totales(e.target.value);

    showInner(contenido, false);
  });

  //* Añadir entrenamiento
  $("#crearEntrenamiento").click(crearEntrenamiento);

  //* Crear Persona
  $("#crearPersona").click(function () {
    //* Si es true, se cambian los display de los formularios

    if (crearPersona()) {
      $("div_login").removeClass("oculto");
      crearIndex();
    }
  });
  //* Crear usuario
  $("#crearUsuario").click(function () {
    //* Si es true, se cambian los display de los formularios

    if (crearUsuario()) {
      hider("form_persona");

      $("#registrar").addClass("oculto");
      $("#inicio").addClass("oculto");
      $("#div_login").removeClass("oculto");
    }
  });

  /*
  * Si se un elemento con la clase .cerrar, es decir la X del popup se le añade un listener.
  Esto se debe a que solo aparece mientras no se haya iniciado sesión.

  <div class="popup">
    <span class="cerrar">...
  </div>

  En este caso se elimina el padre de el span, es decir el div que conforma el popup
  */
  $(".cerrar").click(function () {
    $(".blur").remove();
  });

  $("#TutorialBtn").click(function(){
      $(".tutorial").slideToggle()
  })

  //* Al pulsar el botón de cerrar sesión se eliminan los datos en localStorage y se reinicia la pagina
  $("#cerrarSesion").click(function () {
    localStorage.clear();
    location.reload();
  });

  //* Cambia el tema entre oscuro y blanco
  $("#toggleTheme").click(addDarkTheme);

  //* Añade publicaciones al foro
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

  //* Funcion con fade para mostrar un mensaje al pasar sobre mi nombre
  $(".me > .btn").on({
    mouseenter: function () {
      $("div.msg").fadeToggle("slow");
      $(this).toggleClass("msgTop");
    },
    mouseleave: function () {
      $("div.msg").fadeToggle(0);
      $(this).toggleClass("msgTop");
    },
  });
}

/**
 * Este metodo muestra los distintos formularios en base al id con el que llega, y llama los distintos metodos según que formulario
 * - añadirEntrenamiento llama a ahoraDatetimeLocal() para darle el valor de la hora actual al input
 * - totales y mejorEntrenamiento, llaman a showInner() con un mensaje para que se seleccione el radio
 */
function show(id, hide = true) {
  if (hide) {
    hider(id);
  }
  $("#formularios_btn").removeClass("oculto");

  $(`#${id}`).removeClass("oculto");

  switch (id) {
    case "añadirEntrenamiento":
      $(`#${id} #fechaEntrenamiento`).val(ahoraDatetimeLocal());
      break;
    case "totales":
    case "mejorEntrenamiento":
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
function showInner(contenido, hide = true) {
  const resultadoInner = $("#resultados");
  resultadoInner.text("");
  if (hide) {
    hider();
  }
  resultadoInner.removeClass("oculto");
  contenido.forEach((elemento) => {
    resultadoInner.append(elemento);
  });
}

/**
 * Este metodo oculta todos los formularios y reinicia la [section id=resultados]
 */
function hider(id = null) {
  $("#formularios_btn").addClass("oculto");
  $("#foro").addClass("oculto");

  $("#resultados").addClass("oculto").text("");

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
function crearPersona() {

  let ultimatum = true;
  let mensajes = [];
  $("#form_persona input").each(function () {
    let error = false;
    let tempMsj = "";

    switch (this.id) {
      case "nombre":
        error = !comprobarRegex(/^[\w]{3,}$/, $(this).val());
        tempMsj = "Debe contener el nombre menos 3 caracteres";
        break;
      case "correo":
        error = !comprobarRegex(/^[\w]{1,}@[\w]{1,}.[\w]{1,}$/, $(this).val());
        tempMsj = "Introduce un correo valido";
        break;
      case "altura":
      case "peso":
        error = !comprobarRegex(/^[\d]{1,}$/, $(this).val());
        tempMsj = "Introduce un valor valido en " + $(this).val();
        break;
      case "fecha_nacimiento":
        error =
          $(this).val() == "" ||
          $(this).val() == null ||
          new Date($(this).val()) > new Date(); //* Comprobar que la fecha no es posterior
        tempMsj = "Introduce una fecha valida";
        break;
    }

    if (error) {
      $(this).val("");
      const error = $("<p>").text(`[ERROR] - ${tempMsj}`).addClass("p-error");
      mensajes.push(error);

      $(this).removeClass("input-normal");
      $(this).addClass("input-error");
      ultimatum = false;
    } else {
      $(this).removeClass("input-error");
      $(this).addClass("input-normal");
    }
  });

  if (ultimatum) {
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
function crearEntrenamiento() {

  let mensajes = [];
  let ultimatum = true;
  $("#añadirEntrenamiento input").each(function () {
    let error = false;
    let tempMsj = "";

    switch (this.id) {
      case "distanciaInput":
        error =
          $(this).val() < 0 || $(this).val() == null || $(this).val() == "";
        tempMsj = "Introduce un valor valido en " + $(this).val();
        break;
      case "fechaEntrenamiento":
        error =
          $(this).val() == "" ||
          $(this).val() == null ||
          new Date($(this).val()) > new Date(); //* Comprobar que la fecha no es posterior
        tempMsj = "Introduce una fecha valida";
        break;
      default:
        break;
    }
    if (error) {
      $(this).val("");
      const error = $("<p>").text(`[ERROR] - ${tempMsj}`).addClass("p-error");
      mensajes.push(error);

      $(this).addClass("input-error");
      ultimatum = false;
    } else {
      $(this).addClass("input-normal");
    }
  });

  const distancia = Number($("#añadirEntrenamiento #distanciaInput").val());
  const horas = Number($("#añadirEntrenamiento #horas").val());
  const minutos = Number($("#añadirEntrenamiento #minutos").val());
  const tiempo = horas * 60 + minutos; //* min

  //* Para controlar el tiempo, por si los dos tienen valor 0 o negativo.
  if (tiempo <= 0) {
    const errorTiempo = $("<p>")
      .text(`[ERROR] - Introdocude un tiempo valido`)
      .addClass("p-error");
    mensajes.push(errorTiempo);

    $("#añadirEntrenamiento #horas").addClass("input-error");
    $("#añadirEntrenamiento #minutos").addClass("input-error");
    ultimatum = false;
  }

  //* Para controlar el tipo, por si no hay.
  const tipo = $("#tipoActividad").val();
  if (tipo == "" || tipo == null) {
    const errorTipo = $("<p>")
      .text(`[ERROR] - Introdocude el tipo de entrenamiento`)
      .addClass("p-error");
    mensajes.push(errorTipo);

    $("#añadirEntrenamiento #tipoActividad").addClass("input-error");
    ultimatum = false;
  } else {
    $("#añadirEntrenamiento #tipoActividad").addClass("input-normal");
  }

  const fecha = new Date($("#añadirEntrenamiento #fechaEntrenamiento").val());

  if (ultimatum) {
    usuario.añadirEntrenamiento(
      new Entrenamiento(usuario.nextId(), distancia, tiempo, tipo, fecha),
    );

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
function crearUsuario() {

  let ultimatum = true;
  let mensajes = [];
  $("#form_registro input").each(function () {
    let error = false;
    let tempMsj = "";

    switch (this.id) {
      case "usuario":
        error = !comprobarRegex(/^[\w]{3,}$/, $(this).val());
        tempMsj = "Debe contener el nombre de usuario al menos 3 caracteres";
        break;
      case "password":
        error = !comprobarRegex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
          $(this).val(),
        );
        tempMsj =
          "Debe contener al menos 8 caracteres con una minuscula, una mayuscula y un número ";
        break;
    }

    if (error) {
      $(this).val("");
      const errorPush = $("<p>")
        .text(`[ERROR] - ${tempMsj}`)
        .addClass("p-error");
      mensajes.push(errorPush);

      $(this).removeClass("input-normal");
      $(this).addClass("input-error");
      ultimatum = false;
    } else {
      $(this).removeClass("input-error");
      $(this).addClass("input-normal");
    }
  });

  if (ultimatum) {
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
function mostrarEntrenamientos() {
  const titulo = $("<h2>").text("Entrenamientos");

  if (usuario.getEntrenamientos().length == 0) {
    const texto = $("<p>").text("No hay entrenamientos");

    return (contenido = [titulo, texto]);
  } else {
    const table = createTable();

    usuario.getEntrenamientos().forEach((entrenamiento) => {
      table.append(entrenamiento.mostrarInfo()); // ya devuelve <tr> completo
    });
    return (contenido = [titulo, table]);
  }
}

// Metodo para crear la tabla para listar los entrenamientos
function createTable() {
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
    trTitulos.append($("<th>").text(text));
  });

  return table.append(trTitulos);
}

/**
 * Recibe el @valor que se ha elegido en el [radio id=dato]
 * * Se comprueba si hay entrenamientos, si no hay se muestra
 * Por un forEach se busca el que tiene la mayor velocidad,tiempo o velocidad según @valor sobre todos los entrenamientos
 * Y se devuelve @contenido con su contenido mostrado por mostrarInfo()
 */

function mejoresEntrenamientos(valor) {
  const titulo = $("<h2>").text(`Mejor entrenamiento ${valor}`);

  if (usuario.getEntrenamientos().length == 0) {
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

function totales(valor) {
  const titulo = $("<h2>").text(`Total ${valor}`);

  if (usuario.getEntrenamientos().length == 0) {
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

    const texto = $("<p>");

    switch (valor) {
      case "tiempo":
        texto.text(`Total min entrenando: ${total} min`);
        break;
      case "distancia":
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
function crearIndex() {
  $("#inicio").addClass("oculto");
  $("#div_login").addClass("oculto");

  $("#btn").removeClass("oculto");
  $("#perfil").removeClass("oculto");
  $("#formularios_btn").removeClass("oculto");
  $("#resultados").addClass("oculto");

  mostrarPersona();
}

/**
 * Esta función inprime los datos de @usuario con innerHTML en el [p id=datosPerfil] tras la configuración de crearIndex()
 */
function mostrarPersona() {
  const p = $("#datosPerfil").html(usuario.mostrarInfo());
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
  const img = $("img").attr("src", imgs[i]);

  setInterval(() => {
    img.attr("src", imgs[i++]);

    if (i == imgs.length) i = 0;
  }, 50000);
}

//* Crea un popup que añade al html
function createPopup() {
  const popup = $("<div>").addClass("popup item");

  const equis = $("<i>").addClass("fa-solid fa-xmark");

  const cerrar = $("<span>").addClass("cerrar").append(equis);

  const titulo = $("<h2>").text("Bienvenido🙋");

  const contenido = $("<p>").text("Bienvenido al nuevo JQ-FITNESS APP :D");

  const blur = $("<div>")
    .addClass("blur")
    .append(popup.append(cerrar).append(titulo).append(contenido));

  $("body").append(blur);

  //* Aquí comienza su animación, rotar() lo pone a guirar de forma continua
  //* Con los siguientes metodos se itera y se realizan las animaciones en cadena.
  let rotacion = { deg: 0 };
  rotar(rotacion);
  popupInicio(popup);
  let iterar = 1;
  for (let i = 0; i < 30; i++) {
    if (i % 3 === 0) ++iterar;

    popupCentrifuga(popup, iterar);
  }

  popupSalir(popup, rotacion);

  //* Al hacer click en el div que ocupa toda la pantalla, si se pulsa durante la anim está se detiene 
  //* Pone el popup centrado
  $(blur).click(function () {
    let alto = $(window).height() - $(popup).outerHeight();
    let ancho = $(window).width() - $(popup).outerWidth();
    $(rotacion).stop(true);
    $(".popup")
      .stop(true, true)
      .animate({ bottom: alto / 2, left: ancho / 2 }, 0);
    $(".popup").css("transform", "rotate(0deg)");
  });
}

function rotar(rotacion) {
  $(rotacion).animate(
    { deg: 400000 },
    {
      duration: 100000,
      step: function (now) {
        $(".popup").css("transform", "rotate(" + now + "deg)");
      },
    },
  );
}
//* El inicio de la anim
//* En todos para poder hacerlo relativo a la pantalla se resta el tamaño de la pantalla al popup
//* En cada metodo se piden de nuevo, por si el layout ha cambiado
function popupInicio(popup) {
  let alto = $(window).height() - $(popup).outerHeight();
  let ancho = $(window).width() - $(popup).outerWidth();

  $(".popup").animate({ bottom: alto / 2, left: ancho / 2 }, 0);
  $(".popup")
    .animate({ bottom: alto / 2, left: ancho / 2 }, 5000)
    .animate({ bottom: alto / 2, left: ancho / 8 }, "slow");
}

//* Animación final, se pone en posición
function popupSalir(popup, rotacion) {
  let alto = $(window).height() - $(popup).outerHeight();
  let ancho = $(window).width() - $(popup).outerWidth();

  $(".popup")
    .animate({ bottom: alto / 2, left: ancho / 2 }, 0, function () {
      $(rotacion).stop(true);
      $(".popup").css("transform", "rotate(0)");
    })
    .animate({ bottom: alto / 2, left: ancho / 2 }, 0)
    .animate({ bottom: alto / 2, left: ancho / 2 }, 1000)
    .animate({ left: -1000 }, "slow")
    .animate({ left: ancho / 2, bottom: alto + 1000 }, 0)
    .animate({ left: ancho / 2, bottom: alto / 2 }, "slow");
}

//* Esta animación se itera, es la que hace girar al rededor de la pantalla
function popupCentrifuga(popup, iterar) {
  let alto = $(window).height() - $(popup).outerHeight();
  let ancho = $(window).width() - $(popup).outerWidth();
  let velocidad = 300 / iterar;

  $(".popup")
    .animate({ bottom: alto / 2 }, 0)
    .animate({ bottom: alto / 8, left: ancho / 8 }, velocidad)
    .animate({ bottom: 0, left: ancho / 2 }, velocidad)
    .animate({ bottom: alto / 8, left: ancho - ancho / 8 }, velocidad)
    .animate({ bottom: alto / 2, left: ancho }, velocidad)
    .animate({ bottom: alto - alto / 8, left: ancho - ancho / 8 }, velocidad)
    .animate({ bottom: alto, left: ancho / 2 }, velocidad)
    .animate({ bottom: alto - alto / 8, left: ancho / 8 }, velocidad)
    .animate({ bottom: alto / 2, left: 0 }, velocidad);
}

/**
 * Añade las publicaciones al foro de la web, el nickName se usa de forma predeterminado el introducido como usuario,
 * pero como se solicitaba en la practica añadir un campo para nick, este se puede modificar
 */
function publicarPost() {
  const textarea = $("#opinion");
  const nick = $("#nick");

  let nickName = localStorage.usuario;

  if (textarea.val() == "") {
    textarea
      .attr("placeholder", "[ERROR] - No hay contenido en el post")
      .addClass("input-error");
    return;
  } else {
    textarea.attr("placeholder", "Opinion..").removeClass("input-error");
  }

  if (nick.val() != "") {
    nickName = nick.val();
  }

  const divNode = $("<div>").addClass("post");

  const userPost = $("<p>")
    .addClass("user")
    .text(`${nickName} • ${new Date().toLocaleString()}`);

  const textoPost = $("<p>").addClass("texto").text(textarea.val());

  divNode.append(userPost).append(textoPost);

  $("#foro").prepend(divNode);

  textarea.text();
}

/**
 * Hace toggle entre el tema oscuro y los logos del button, guarda la ultima acción en localStorage
 */
function addDarkTheme() {
  let dark = $("body").toggleClass("dark");

  $("#toggleTheme i").toggleClass("fa-moon");
  $("#toggleTheme i").toggleClass("fa-sun");

  localStorage.darkTheme = dark;
}

//! Deprecated: Este metodo servia para actualizar las imagenes
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
    $("#mostrarForm").text("Iniciar");
  } else {
    createPopup();
  }
  listeners();
  //!imgs();
});

//* Variable donde se registran todos los usuarios
let usuario;
