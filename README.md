# Práctica final tema 4. Formularios y Eventos
## Fitness App

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

2. La única iteracción posible es crear el usuario
   2.1. Tras esto se invierten los display y se muestra el div btn de donde parte toda la iteracción de la app

3. Dependiendo de qué botón se pulse, lo detectarán los listeners, en ámbito general:
   3.1. Pulsar botón llama metodo show(), enviando el id del form a mostrar <br>
        3.1.1. Se oculta o no el resto de bloque según necesite el metodo <br>
   3.2. Se ejecutan los metodos del metodo especifico <br>
   3.3. Si llama a showInner, es decir, va a mostrar resultados o errores <br>
        3.3.1. Recibe el mensaje, oculta o no el resto de forms y muestra el contenido en el div de "resultados" <br>


Como funciona cada metodo individualmente está explicado a traves de comentarios en el codigo.


### Otros
- Control con inputs de tipo date, para calcula la edad y formatos para el registro de entrenamientos.
- Uso de select para elegir tipo de entrenamiento (Ciclismo, Correr, Natación, Senderismo) y posteriormente mostrar icono en el listados.
- Dos inputs para el tiempo uno de hora y otro de minuto, que funcionan como un mismo dato.
