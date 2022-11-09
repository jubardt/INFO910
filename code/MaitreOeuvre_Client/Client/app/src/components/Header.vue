<template>
    <header>
        <div id="modal" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <div class="field">
                        <label class="label">Identifiant: </label>
                        <div class="control">
                            <input id="user" class="input" type="text" placeholder="admin">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Mot de passe: </label>
                        <div class="control">
                            <input id="mdp" class="input" type="text" placeholder="1234">
                        </div>
                    </div>
                    <button class="button is-primary" @click="connect">Connexion</button>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="close"></button>
        </div>
        <button id="connect" v-if="!isConnected" class="button is-primary" @click="open">Connexion</button>
        <button id="disconnect" v-else class="button is-primary" @click="disconnect">Déconnexion</button>
    </header>
</template>

<script>
export default {
    name: 'Header', 
    data() {
        return {
            isConnected: false,
        }
    },  
    mounted() {
        this.isConnected = localStorage.getItem('user') == "true";
    },
    methods:{
    open(){
        document.getElementById("modal").classList.add("is-active");
    },
    close(){
        document.getElementById("modal").classList.remove("is-active");
    },
    connect(){
        var user = document.getElementById("user").value;
        var mdp = document.getElementById("mdp").value;
        if(user == "maitreoeuvre" && mdp == "1234"){
            localStorage.setItem("user","true");
            localStorage.setItem("isClient","false");
            this.close();
            this.isConnected = true;
        }else if(user == "client" && mdp == "0000"){
            localStorage.setItem("user","true");
            localStorage.setItem("isClient","true");
            this.close();
            this.isConnected = true;
        }else{
            document.getElementById("user").className = "input is-danger";
            document.getElementById("mdp").className = "input is-danger";
        }
    },
    disconnect(){
        localStorage.setItem("user","false");
        localStorage.setItem("isClient","false");
        this.isConnected = false;
    }
}
}
</script>
    
<style scoped>
    #connect,#disconnect{
        position: absolute;
        width: 10%!important;
        top: 10px;
        right:30px;
    }
</style>