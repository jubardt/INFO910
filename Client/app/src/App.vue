<template>
  <router-view/>

</template>

<script>
//const request = require('request');

export default {
  name: 'App',
  components: {
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
    }
    },
    data() {
    return {
      connection: null
    }
  }
  ,mounted(){

        //Exemple requête api
        /*request('http://localhost:3000/contreprop', { json: true }, (err, res) => {
            if (err) { return console.log(err); }
            console.log(res.body);
          });*/

        //Exemple requête websocket
                //TEST WEBSOCKET

        //Etablissement de la connexion
        //this.connection = new WebSocket("ws://localhost:9000");

        //Listener réception de message
        /*this.connection.onmessage = function(event){
            console.log("j'ai reçu un message !");
            console.log(event.data);
        }

        //Listener connexion réussi
        this.connection.onopen = function(){
            console.log("Connecté au socket réussi !");
        }*/
        }
        }
        </script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button{
  margin-top: 20px;
  width: 50%;
}
</style>
