<template>
  <Header/>
  <h1 class="title">
    Gestion des demandes des fabriquants
  </h1>
  <div class="wrapper">
    <button class="button is-primary"  @click="goTo('/offre')">
      Nouvelle offre
    </button>
    <button class="button is-primary" @click="goTo('/offre/all')">
      Liste de vos propositions
    </button>
  </div>
</template>

<script>
import Header from './Header.vue'
export default {
    name: 'Home',
    components: {
        Header,
      },

      methods:{
        goTo(path){
          if("/offre" == path){
            if(localStorage.getItem('user') == "false"){
                alert("Vous devez être connecté en tant que client pour avoir accès à cette page");
            }else{
                this.$router.push(path);
            }
          }else{
            this.$router.push(path);
          }
            
        },
    }
}
</script>

<style>

</style>