const url = `https://moviestack.onrender.com/api/movies`
const apiKey = `0ff70d54-dc0b-4262-9c3d-776cb0f34dbd`
const options = {
    headers: {
        "x-api-key": apiKey
    }
}

const { createApp } = Vue

const optionsVue = {
    data() {
        return {
            movies : [],
            filtros : [],
            search : "",
            selec : "genero",
            generos : [],
            favoritas:[],
        }
    },
    beforeCreate() {
        fetch(url, options)
            .then(pelis => pelis.json())
            .then(data => {
                this.movies = data.movies
                this.filtros = this.movies
                this.generos = [...new Set(this.movies.map(genero => genero.genres).flat())]
                console.log(this.generos)
            })
            .catch(error => console.log(error))
    },
    methods : {
        filtrarPorNombre(event){
            this.search = event.target.value
            this.filtroCruzado()
        },

        filtrarPorGenero(event){
            this.selec = event.target.value
            this.filtroCruzado()
        },

        filtroCruzado(){
            const aux= this.movies.filter(movie => movie.title.toLowerCase().includes(this.search.toLowerCase()) && (this.selec == 'genero' || movie.genres.includes(this.selec)))
            this.filtros = aux
        },
        
        addFavs(id) {
            const favoritas = JSON.parse(localStorage.getItem('favoritas')) || [];
            if (!favoritas.includes(id)) {
                this.favoritas.push(id)
                localStorage.setItem('favoritas', JSON.stringify(this.favoritas))
            }
            else {
                this.favoritas = this.favoritas.filter(movie => movie !== id)
                localStorage.setItem('favoritos', JSON.stringify(this.favoritas))
            }
        },
    }
}
const app = createApp(optionsVue)
app.mount('#app')

