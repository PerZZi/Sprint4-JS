const { createApp } = Vue

const url = "https://moviestack.onrender.com/api/movies/"
const options = {
     headers: {
         "x-api-key": "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd" 
        } }

const app = createApp({
    data() {
        return {
            movie: [],
            id : null,
            
        }
    },
    beforeCreate() {
        const search = location.search;
        const params = new URLSearchParams(search);
        this.id = params.get("id");
        fetch(url + this.id, options)
            .then(response => response.json())
            .then(data => {
                this.movie = data
                console.log(this.movie)
            }
            )
    },
})
app.mount("#app")