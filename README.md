# Practica final tema 6 - Parte 1 - JQuery
## Rafael Moreno Riquelme - 2DAW

### Refractorización

- Toda la logica ha sido actualizada con Jquery, incluyendo el contenido dinamico.

  En [docs](https://github.com/rvf1-k/Fitness-App/blob/8e32ac70ce6f16aaeda3ab7142c6bf648a532001/docs) se encuentra el codigo anterior de [app.js](https://github.com/rvf1-k/Fitness-App/blob/8e32ac70ce6f16aaeda3ab7142c6bf648a532001/app.js) comentado, pudiendo ver el traspaso de su logica.

- Mejora de clases con `.item` y `.btn`, para separar los estilos entre divs y botones.

### Animación de inicio

Al acceder a la web por primera vez, el *popup* que daba la bienvenida tiene animaciones realizadas con Jquery.

Se utilizan los metodos `height()` y `outerHeight()` para calcular la animación en base a la pantalla.

### Slide

Se ha añadido un elemento *slide* que funciona como tutorial, este es expansible y no se retrae hasta pulsar el botón de nuevo.

### Fade

Se ha incluido mi nombre en forma de botón en la zona superior, cuando el ratón se posa aparece un mensaje con fade.

### SlideShow

Las imagenes tienen integradas [fancybox](https://fancyapps.com/fancybox/) y [carousel](https://fancyapps.com/carousel/).

En este se ha utilizado el metodo css para que solo aparezcan las flechas cuando estás sobre su contenedor.

---

# Práctica final tema 6. DOM

### Mejor aspecto
- Añadido sombras y mejores contornos

### Guardar en dun div
Como en la anterior practica la impresión de entrenamientos era en una tabla, he manteniendo esa estetica

### Borrar entrenamientos
Se eliminan los entrenamientos, cada uno tiene asociado un id, mostrado en un dataset al hacer la muestra, utilizado para hacer referencia y eliminarlo de array.

### Tema oscuro
En vez de utilizar dos botones, utiliza uno que hace toggle entre los temas, guardando la ultima accion en localStorage.
Además de cambiar el icono entre un sol y una luna.

### Popup al entrar
Este popup, se genera en js este solo aparece si no a iniciado sesión.

### Uso de localStorage
En localStorage se guardan los datos de usuario, la persona y elección la elección de tema.

### Funcionalidades extra
  1. Comprobar si hubo inicio de sesión para cambiar el texto del botón de inicio
  2. Cerrar sesión los datos de localStorage
  3. Cambiar style.display = "none"/"block" por funciones con classList.
  4. Guardar en storage elección de tema 
  5. Utilización de tabla para guardar los entrenamientos en vez de un div con p
  6. Uso predeterminado de nombre de usuario en el foro 


---

# Práctica final tema 4. Formularios y Eventos

Voy a ir listando los distintos elementos, en base al documento de Práctica final tema 4.pdf


### Mejor aspecto
- Se ha arreglado problema overflow de la imagen principal.
- Mejorado el estilo general manteniendo el estilo, con gradientes, sombras y bordeando las cajas.
- Mejorado el formato de salida, en vez de una linea de texto una tabla con iconos.


### Uso de Formularios
- Formulario para iniciar sesión y crear el usuario
    - Input texto Nombre
    - Input email Correo
    - Input number Altura
    - Input number Peso
    - Input date fecha nacimiento

- Formulario para añadir entrenamiento
  - Input number Distancia (m)
  - Select Tipo de entrenamiento (Ciclismo, Correr, Natación, Senderismo)
  - Input number Horas
  - Input number Minutos
  - Input datetime-local Fecha
  - Botón Crear

- Formulario para mostrar mejor entrenamiento
  - Input radio Distancia
  - Input radio Tiempo
  - Input radio Velocidad

- Formulario para mostrar totales
  - Input radio Distancia Total
  - Input radio Tiempo Total


### Gestión de evento con Listener
- Listener para mostrar el formulario de crear usuario
  - Evento: click en botón Iniciar sesión
  - Acción: Muestra el formulario div_login

- Listener para mostrar el formulario de añadir entrenamiento
  - Evento: click en botón Añadir entrenamiento
  - Acción: Muestra el formulario añadirEntrenamiento

- Listener para mostrar formulario de totales
  - Evento: click en botón Mostrar totales
  - Acción: Muestra el formulario totales

- Listener para mostrar todos los entrenamientos listados
  - Evento: click en botón Mostrar entrenamientos
  - Acción: Muestra los entrenamientos con showInner(mostrarEntrenamientos())

- Listener para mostrar formulario de mejor entrenamiento
  - Evento: click en botón Mostrar mejor entrenamiento
  - Acción: Muestra el formulario mejorEntrenamiento

- Listener para controlar radio de mejor entrenamiento
  - Evento: change en formulario mejorEntrenamiento
  - Acción: Según el valor seleccionado (distancia, tiempo, velocidad), muestra el contenido correspondiente con showInner(mejoresEntrenamientos(valor))

- Listener para controlar radio de totales
  - Evento: change en formulario totales
  - Acción: Según el valor seleccionado (distancia o tiempo), muestra los totales con showInner(totales(valor))

- Listener para añadir entrenamiento
  - Evento: click en botón Crear dentro de formulario añadirEntrenamiento
  - Acción: Ejecuta la función crearEntrenamiento()

- Listener para crear usuario
  - Evento: click en botón Crear dentro de formulario div_login
  - Acción: Ejecuta crearUsuario(), y si devuelve true, llama a crearIndex()


### Flujo principal

1. window.onload inicia metodo imagenes y listeners
2. La unica iteracción posible es crear el usuario, tras esto se invierten los display y se muestra el div btn de donde parte toda la iteracción de la app
3. Dependiendo de que botón se pulse lo detectaran los listeners, en ambito general:
    3.1. Pulsar botón llama metodo show(), enviando el id del form a mostrar
        3.1.1. Se oculta o no el resto de bloque según necesite el metodo
    3.2. Se ejecutan los metodos del metodo especifico
    3.3. Si llama a showInner, es decir, va a mostrar resultados o errores
        3.3.1. Recibe el mensaje, oculta o no el resto de forms y muestra el contenido en el div de "resultados"

Como funciona cada metodo individualmente está explicado a traves de comentarios en el codigo.


### Otros
- Control con inputs de tipo date, para calcula la edad y formatos para el registro de entrenamientos.
- Uso de select para elegir tipo de entrenamiento (Ciclismo, Correr, Natación, Senderismo) y posteriormente mostrar icono en el listados.
- Dos inputs para el tiempo uno de hora y otro de minuto, que funcionan como un mismo dato.
