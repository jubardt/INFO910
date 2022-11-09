<template>
    <article class="message is-info">
        <div class="message-header">
            <p>Proposition: {{proposition.sujet}}</p>
        </div>
        <div class="message-body" @click="goTo('/liste/'+proposition._id)">
            <h1 class="title"><strong>Description:</strong> {{proposition.description}} </h1>
            <h1 class="title"><strong>Cout:</strong> {{proposition.cout}} €</h1>
            <h1 class="title"><strong>Délai:</strong> {{proposition.delai}} </h1>
            <h1 class="title"><strong>Quantité:</strong> {{proposition.quantite}} unité(s)</h1>
            <p class="title"><strong>Caractérisque du produit:</strong> {{proposition.caracteristiques}}</p>
        </div>
        <div v-if="isConnected">
            <div v-if="!proposition.estValide">
                <button class="button is-success is-outlined" @click="valid">Valide</button>
            </div>
            <div v-else>
                <button class="button is-success">Valide</button>
            </div>
        </div>
    </article>
</template>

<script>
const request = require('request');
export default {
    props: ['proposition'],
    mounted(){
        this.isConnected = (localStorage.getItem('user') == "true") && (localStorage.getItem('isClient') == "false");
    },
    data(){
        return {
            isConnected: false,
        }
    },
    methods: {
        goTo(path){
            this.$router.push(path);
        },
        valid(){
            var options = {
                url:"http://localhost:3000/updateProposition",
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    proposition_id:this.proposition._id,
                    isValid:true
                    })
                };

                request(options, (err, res) => {
                    console.log(JSON.parse(res.body));
                    //console.log(this.listeRequete);
                });
            }
    }
}
</script>

<style scoped>
    article{
        width: 50% !important;
        margin: 0 auto !important;
        margin-bottom: 50px !important;
    }

    button{
        width: 20%!important;
    }

</style>