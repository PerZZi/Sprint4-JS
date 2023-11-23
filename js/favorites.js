const url = "https://moviestack.onrender.com/api/movies"
const key = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"
const option = {
    headers: {
        'x-api-key': key
    }
}


const { createApp } = Vue
const optionsVue = {
    data() {
        return {
            movies: [],
            genres: [],
            selected:"all",
            search:"",
            moviesFiltradas:[],
            favoritas:[],
            favs:[],
            favsfiltradas:[],
            // fav:[],
         
        }

    },
     beforeCreate() {

            fetch(url, option)
                .then(response => response.json())
                .then(data => {
                    this.movies = data.movies
                    this.moviesFiltradas = this.movies
                    console.log(this.movies)
                    this.genres = [...new Set(this.movies.map(movie => movie.genres).flat())]
                   this.favoritas=JSON.parse(localStorage.getItem("favs"))
                   console.log(this.favoritas)
                   this.favsfiltradas = this.movies.filter(movie =>this.favoritas.some(favorita => favorita.id === movie.id))
                   console.log(this.favsfiltradas)
                //    this.fav=this.favsFiltradas[0]
                 
                    


                })
                .catch(error => console.error(error))
    },
    methods: {
        searchs(event){
            this.search = event.target.value
            this.filtrar()
        },
        selec(event){
        this.selected = event.target.value
        this.filtrar()
        },
        filtrar(){
            this.moviesFiltradas = this.movies.filter(movie => movie.title.toLowerCase().includes(this.search.toLowerCase())&&(this.selected ==="all"||movie.genres.includes(this.selected)))
        },
        fav1(movie){
            let favoritas = JSON.parse(localStorage.getItem('favs')) || []
            let peliFav= favoritas.some( favorita => favorita.id === movie.id)
            if(peliFav){
                favoritas=favoritas.filter(favorita => favorita.id !== movie.id)
            }
            localStorage.setItem("favs",JSON.stringify(favoritas))
            this.favoritas= JSON.parse(localStorage.getItem("favs"))
            console.log(this.favoritas)
            this.favsfiltradas= this.movies.filter(movie =>this.favoritas.some(favorita => favorita.id === movie.id))
            console.log(this.favsfiltradas)
        
        }



    },
}
const app = createApp(optionsVue)
app.mount('#app')