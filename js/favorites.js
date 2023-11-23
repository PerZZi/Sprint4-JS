const url = `https://moviestack.onrender.com/api/movies/`
const key = `0ff70d54-dc0b-4262-9c3d-776cb0f34dbd`
const options = {
    headers: {
        'X-API-KEY': key
    }
}

const { createApp } = Vue
const optionsVue = {
    data() {
        return {
            movies: [],
            favoritas: [],
            favoritosFiltrados: [],
        }
    },
    beforeCreate() {
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.movies = data.movies
                this.favoritas = JSON.parse(localStorage.getItem('favoritas')) || []
                console.log(this.favoritas)
                this.favoritosFiltrados = this.movies.filter(movie => this.favoritas.some(movies => movies === movie.id))
                console.log(this.favoritosFiltrados)
            }
            )
            .catch(error => console.log(error))
    },

    methods: {
        addFavs(id) {
            let nuevosFavoritos = [...this.favoritas];

            if (!nuevosFavoritos.includes(id)) {
                nuevosFavoritos.push(id);
            } else {
                nuevosFavoritos = nuevosFavoritos.filter(movie => movie !== id);
                this.favoritosFiltrados = this.favoritosFiltrados.filter(movie => movie.id !== id);
            }

            this.favoritas = [...nuevosFavoritos];

            localStorage.setItem('favoritas', JSON.stringify(nuevosFavoritos));
        },
    }
}



const app = createApp(optionsVue)
app.mount('#app')
