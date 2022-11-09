<template>
  <div class="all">
        <div v-if="isLoaded">
            <h1 class="title">Listes des propositions clients</h1>
            <div v-if="listeRequete.length!=0">
              <div v-for="element in listeRequete" :key="element.id">
                  <PropositionCard v-bind:proposition="element" :key="element.id" />
              </div>
            </div>
            <div v-else>
              <p>Aucune proposition encore formulé...</p>
            </div>

        </div>
        <div v-else>
            <p>Chargement des données...</p>
        </div>
    

    </div>
</template>

<script>
const request = require('request');
import PropositionCard from './cards/PropositionCard.vue'

export default {
  name: "listes",
  components: {
    PropositionCard,
  },
  data() {
    return {
      listeRequete: [],
      isLoaded: false,
    }
  },
  mounted() {
    request('http://localhost:3000/propositions', { json: true }, (err, res) => {
      if (err) { return console.log(err); }
      console.log(res.body)
      this.listeRequete = res.body;
      this.isLoaded = true;
    });
  },
}
</script>

<style scoped>

</style>