import { lineChart, barChart } from 'https://cdn.jsdelivr.net/npm/chartist@2/dist/index.min.js'; // Importamos la función "crear gráfico de líneas" y "crear gráfico de barras"

//1
async function graficaPeliculas() {
  const res = await fetch("./api_peliculas.json")
  const data = await res.json()

  let nombrePelicula = data.map(pelicula => pelicula.title)
  let anoPublicacion = data.map(pelicula => pelicula.release_date.slice(0, 3 + 1))

  lineChart('#peliculas', {  //Usamos la función "crear gráfico de líneas" (previamente vacía para poder usar nuestros datos)
    labels: nombrePelicula, //eje X
    series: [anoPublicacion] // eje Y
  })
}

graficaPeliculas()


//2
async function graficaPersonajes() {
  const res = await fetch("./api_personajes.json")
  const data = await res.json()

  let nombrePersonaje = data.map(personaje => personaje.name)
  let numeroPeliculas = data.map(personaje => personaje.films.length)

  barChart('#personajes',
    {
      labels: nombrePersonaje,
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
