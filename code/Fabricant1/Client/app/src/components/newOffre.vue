<template>
          <div class="box">
            <h2 class="title">Appel d'offre</h2>

            <div class="field">
                <label class="label">Sujet: </label>
                <div class="control">
                  <input id="demande" class="input" type="text" placeholder="Production de raquettes de ping pong en bambou">
                </div>
                <p class="help">Définition de votre demande</p>
            </div>

            <div class="field">
                <label class="label">Description du projet: </label>
                <div class="control">
                  <textarea id="description" class="textarea" placeholder="Cette production de raquette doit permettre ..."/>
                </div>
                <p class="help">Description en quelques lignes du projet proposé</p>
            </div>

            <div class="field">
                <label class="label">Cout: </label>
                <div class="control">
                  <input id="cout" class="input" type="number" placeholder="60 000 €">
                </div>
                <p class="help">Cout estimé du projet en <strong>€</strong></p>
            </div>

            <div class="field">
                <label class="label">Délai: </label>
                <div class="control">
                  <input id="delai" class="input" type="text" placeholder="5 mois">
                </div>
                <p class="help">Esitmation du délai de production</p>
            </div>

            <div class="field">
                <label class="label">Quantité: </label>
                <div class="control">
                  <input id="quantite" class="input" type="number" placeholder="5 mois">
                </div>
                <p class="help">Estimation du délai de production</p>
            </div>

            <div id="caracteristiques">
                <label class="label">Caractérisque: </label>
                <div class="field" id="listCaract">
                    <div class="control">
                    <input class="input" type="text" placeholder="Resistant">
                    </div>
                    
                </div>

                <button class="button is-primary" @click="addCaract">+</button>
                <p class="help">Estimation du délai de production</p>

            </div>

            
            <button class="button is-info" @click="sendOffre">Envoyer</button>
        </div>
</template>

<script>
const request = require('request');
export default {
    name:"newOffre",
    methods:{
        addCaract(){
            var caract = document.getElementById("listCaract");
            var input = document.createElement("input");
            input.setAttribute("class","input");
            input.setAttribute("type","text");
            input.setAttribute("placeholder","Resistant");
            caract.appendChild(input);
        },
        sendOffre(){
            var list = [];
            document.getElementById("listCaract").querySelectorAll("input").forEach(function(e){
                list.push(e.value);
            });
            
            var options = {
                url:"http://localhost:4000/addProposition",
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        demande: document.getElementById("demande").value,
                        description: document.getElementById("description").value,
                        cout: document.getElementById("cout").value,
                        delai: document.getElementById("delai").value,
                        quantite: document.getElementById("quantite").value,
                        caracteristiques: list
                    })
                };

            request(options, (err, res) => {
                console.log(res);
                alert("Votre offre a bien été envoyée");
                this.$router.push("/offre/all");
            });
            }
        }
    }
</script>

<style scoped>
.box{
    width: 50%;
    margin:0 auto;
}
</style>