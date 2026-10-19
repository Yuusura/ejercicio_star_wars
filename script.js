import { lineChart, barChart } from 'https://cdn.jsdelivr.net/npm/chartist@2/dist/index.min.js' // Importamos las funciones "crear gráfico de líneas" y "crear gráfico de barras"

//1
async function graficaPeliculas() { // Uso la función async/await para esperar a que se carguen los datos antes de continuar con la función
  const res = await fetch("./api_peliculas.json") // Llamada a la API "películas" (la tengo en local)
  const data = await res.json() // Datos listos para ser usados

  let nombrePelicula = data.map(pelicula => pelicula.title) // Crear un nuevo array solamente con los titulos
  let anoPublicacion = data.map(pelicula => pelicula.release_date.slice(0, 3 + 1)) // Crear un nuevo array solamente con los años de publicación

  lineChart('#peliculas', {  // Usamos la función "crear gráfico de líneas" (previamente vacía para poder usarla con nuestros datos)
    labels: nombrePelicula, // eje X
    series: [anoPublicacion] // eje Y
  })
}

graficaPeliculas() // Llamada a la función


//2
async function graficaPersonajes() {
  // Llamada a la API
  const res = await fetch("./api_personajes.json")
  const data = await res.json()
  // Obtención de los datos necesarios
  let nombrePersonaje = data.map(personaje => personaje.name)
  let diezPrimeros = [] // Escoger solo los 10 primeros para que no se solapen los nombres en las gráficas
  for(let i = 0; i < 10; i++) {
    diezPrimeros.push(nombrePersonaje[i])
  }
  let numeroPeliculas = data.map(personaje => personaje.films.length) //
  // Uso de la función
  barChart('#personajes',
    {
      labels: diezPrimeros, // Dibujamos los datos
      series: numeroPeliculas
    },
    {
      distributeSeries: true,
      axisY: {
        low: 0,
        onlyInteger: true
      }
    }
  )
}

graficaPersonajes()