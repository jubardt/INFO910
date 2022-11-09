<template>
    <h1 class="title">Proposition</h1>
    <div class="box" v-if="isLoaded">
        <PropositionCard v-bind:proposition="proposition"></PropositionCard>

        <div id="form">
        <div v-if="!isMaitreOeuvre && contrePropositions==null" id="form">
            <div class="field">
            <label class="label">Réponse proposition: </label>
            <div class="control">
            <textarea id="reponse" class="textarea" placeholder="Cette production de raquette doit permettre ..."/>
            </div>
            <p class="help">Réponse à la demande du client émise en plus de vos estimations sur les caractéristiques du projet</p>
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
                <p class="help">Estimation du délai de production</p>
            </div>

            <div class="field">
                <label class="label">Quantité: </label>
                <div class="control">
                    <input id="quantite" class="input" type="number" placeholder="60 000">
                </div>
                <p class="help">Estimation du cout de production en €</p>
            </div>

            <div id="caracteristiques">
                <label class="label">Caractérisque: </label>
                <div class="field" id="listCaract">
                    <div class="control">
                    <input class="input" type="text" placeholder="Resistant">
                    </div>
                    
                </div>

                <button class="button is-primary" @click="addCaract">+</button>
                
            </div>
            <button class="button is-primary" @click="sendContreProp">Envoyer contre proposition</button>
        </div>
        <div v-else-if="!isMaitreOeuvre && contrePropositions!=null">
            <div class="field">
                <label class="label">Réponse proposition: </label>
                <div class="control">
                    <textarea id="reponse" class="textarea" placeholder="Cette production de raquette doit permettre ..." v-bind:value="contrePropositions.reponse"/>
                </div>
                <p class="help">Réponse à la demande du client émise en plus de vos estimations sur les caractéristiques du projet</p>
            </div>
        
            <div class="field">
                <label class="label">Cout: </label>
                <div class="control">
                    <input id="cout" class="input" type="number" placeholder="60 000 €" v-bind:value="contrePropositions.cout">
                </div>
                <p class="help">Cout estimé du projet en <strong>€</strong></p>
            </div>

            <div class="field">
                <label class="label">Délai: </label>
                <div class="control">
                    <input id="delai" class="input" type="text" placeholder="5 mois" v-bind:value="contrePropositions.delai">
                </div>
                <p class="help">Estimation du délai de production</p>
            </div>

            <div class="field">
                <label class="label">Quantité: </label>
                <div class="control">
                    <input id="quantite" class="input" type="number" placeholder="60 000" v-bind:value="contrePropositions.quantite">
                </div>
                <p class="help">Estimation du cout de production en €</p>
            </div>

            <div id="caracteristiques">
                <label class="label">Caractérisque: </label>
                <div class="field" id="listCaract">
                    <div class="control">
                    <input id="carac" class="input" type="text" placeholder="Resistant" v-bind:value="contrePropositions.caracteristiques">
                    </div>
                </div>
            </div>
            <div>Validé par le maitre d'oeuvre:<strong> {{contrePropositions.estValide?"OUI":"NON"}}</strong></div>
            <div>
                <button class="button is-warning" @click="modifContreProp">Modifier la contre proposition</button>
                <p v-if="!contrePropositions.estAccepte"><strong>Votre proposition n'a pas encore été traité par le client</strong></p>
                <p v-else><strong>Votre proposition a été accepté par le client !</strong></p>
            </div>

        </div>
        <div v-else-if="isMaitreOeuvre && contrePropositions!=null">
        <div class="field">
                <label class="label">Réponse proposition: </label>
                <div class="control">
                    <textarea id="reponse" class="textarea" placeholder="Cette production de raquette doit permettre ..." v-bind:value="contrePropositions.reponse" readonly/>
                </div>
                <p class="help">Réponse à la demande du client émise en plus de vos estimations sur les caractéristiques du projet</p>
            </div>
        
            <div class="field">
                <label class="label">Cout: </label>
                <div class="control">
                    <input id="cout" class="input" type="number" placeholder="60 000 €" v-bind:value="contrePropositions.cout" readonly>
                </div>
                <p class="help">Cout estimé du projet en <strong>€</strong></p>
            </div>

            <div class="field">
                <label class="label">Délai: </label>
                <div class="control">
                    <input id="delai" class="input" type="text" placeholder="5 mois" v-bind:value="contrePropositions.delai" readonly>
                </div>
                <p class="help">Esitmation du délai de production</p>
            </div>

            <div class="field">
                <label class="label">Quantité: </label>
                <div class="control">
                    <input id="quantite" class="input" type="number" placeholder="60 000" v-bind:value="contrePropositions.quantite" readonly>
                </div>
                <p class="help">Estimation du cout de production en €</p>
            </div>

            <div id="caracteristiques">
                <label class="label">Caractérisque: </label>
                <div class="field" id="listCaract">
                    <div class="control">
                    <input class="input" type="text" placeholder="Resistant" v-bind:value="contrePropositions.caracteristiques">
                    </div>
                    
                </div>
            </div>
            
            <button v-if="!contrePropositions.estValide" class="button is-primary" @click="validContreProp">Valider la contre-proposition</button>
            <button v-else class="button is-primary is-outlined">Contre proposition déjà validé</button>
            <p v-if="!contrePropositions.estAccepte"><strong>Votre proposition n'a pas encore été traité par le client</strong></p>
            <p v-else><strong>Votre proposition a été accepté par le client !</strong></p>
        </div>
        <div v-else>
            Aucune contre proposition n'a encore été émise par le fabriquant ou sa dernière proposition à été refusé par le client
        </div>
    </div>
    </div>
</template>

<script>
const request = require('request');
    import PropositionCard from './cards/PropositionCard.vue';
    export default {
        name:"PanelContreProp",
        components:{
            PropositionCard
        },
        data(){
            return {
                proposition: null,
                contrePropositions: null,
                isLoaded: false,
                isMaitreOeuvre: false,
                idProp:null
            }
        },
        mounted(){
            this.idProp = this.$route.params.id;
            this.isMaitreOeuvre = localStorage.getItem("userfab1") == "true";
            var options = {
                url:"http://localhost:4000/proposition",
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        "proposition_id": this.idProp
                    })
                };

                request(options, (err, res) => {
                    this.proposition = JSON.parse(res.body)[0];
                    var optionContre = {
                        url:"http://localhost:4000/contrePropositions",
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                                "proposition_id": this.idProp
                            })
                        };
                        request(optionContre,(errC,resC) =>{
                            this.contrePropositions = JSON.parse(resC.body)[0];
                            console.log(this.contrePropositions);
                            this.isLoaded = true;
                        });
                    });
        },
        methods:{
            addCaract(){
                var caract = document.getElementById("listCaract");
                var input = document.createElement("input");
                input.setAttribute("class","input");
                input.setAttribute("type","text");
                input.setAttribute("placeholder","Resistant");
                caract.appendChild(input);
            },
            sendContreProp(){
                var list = [];
                document.getElementById("listCaract").querySelectorAll("input").forEach(function(e){
                    list.push(e.value);
                });
                
                var options = {
                    url:"http://localhost:4000/addContreProposition",
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                            proposition_id:this.proposition._id,
                            reponse: document.getElementById("reponse").value,
                            cout: document.getElementById("cout").value,
                            delai: document.getElementById("delai").value,
                            quantite: document.getElementById("quantite").value,
                            caracteristiques: list
                        })
                    };

                request(options, (err, res) => {
                    console.log(res);
                    alert("Votre proposition à bien été ajouté ! Elle est en attente de validation par le maitre d'oeuvre avant envoi au client");
                    location.reload();
                });
            },
            modifContreProp(){
                var list = [];
                list = document.getElementById("carac").value.split(",");
                console.log(list);
                var options = {
                    url:"http://localhost:4000/updateContreProposition",
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                            proposition_id:this.contrePropositions._id,
                            reponse: document.getElementById("reponse").value,
                            cout: document.getElementById("cout").value,
                            delai: document.getElementById("delai").value,
                            quantite: document.getElementById("quantite").value,
                            caracteristiques: list
                        })
                    };

                request(options, (err, res) => {
                    console.log(res);
                    alert("Votre proposition à bien été modifié !");
                    location.reload();
                });
            },
            validContreProp(){
                var options = {
                url:"http://localhost:4000/updateContreProposition",
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    proposition_id:this.contrePropositions._id,
                    estValide:true
                    })
                };

                request(options, (err, res) => {
                    console.log(res.body);
                    //console.log(this.listeRequete);
                });
            }
        }
    }
</script>

<style scoped>
    #form{
        width: 50% !important;
        margin:0 auto !important;
    }
</style>