<template>
  <div class="all">
  <h1 class="title">Requête</h1>
  <div v-if="isLoaded">
    <div v-if="listeRequete.length!=0">
      <div v-for="element in listeRequete" :key="element.id">
        <contrePropositionCard v-bind:proposition="element"></contrePropositionCard>
      </div>
    </div>
    <div v-else>
      <p>Aucune contre proposition pour cette offre...</p>
    </div>
  </div>

  </div>
</template>

<script>
const request = require('request');
import contrePropositionCard from './cards/ContrePropositionCard.vue'

export default {
  name: "listes",
  props: ['propId'],
  components: {
    contrePropositionCard,
  },
  data() {
    return {
      listeRequete: [],
      isLoaded: false,
    }
  },
  mounted() {
    /*request('http://localhost:3000/contrePropositions', { json: true }, (err, res) => {
      if (err) { return console.log(err); }
      this.listeRequete = res.body;
      this.isLoaded = true;
    });*/
    console.log(this.$route.params.id);


    var options = {
    url:"http://localhost:4000/contrePropositions",
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
            "proposition_id": this.$route.params.id
        })
    };

    request(options, (err, res) => {
        console.log(JSON.parse(res.body));
        this.listeRequete = JSON.parse(res.body);
        this.isLoaded = true;
        //console.log(this.listeRequete);
    });
  }
}
</script>

<style scoped>



</style>