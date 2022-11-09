const express = require("express");
var cors = require('cors')
const mongoose = require("mongoose");
const app = express();
const portAPI = 4001;
var WebSocketClient = require('websocket').client;

const WebSocketServer = require('ws');
const { ObjectId } = require("mongodb");
const portSocket = 9051;
const wss = new WebSocketServer.Server({ port: portSocket })

app.use(cors());
app.use(express.json());

///MODEL POUR LA BDD////
const PropositionSchema = new mongoose.Schema({
  _id: ObjectId,
  sujet: String,
  description: String,
  cout: Number,
  delai: String,
  quantite: Number,
  estValide: Boolean,
  caracteristiques: [String],
},{ _id: false })

const ContrePropositionSchema = new mongoose.Schema({
  proposition: { type: mongoose.Schema.Types.ObjectId, ref: "Proposition" },
  _id: ObjectId,
  reponse: String,
  cout: Number,
  delai: String,
  quantite: Number,
  estValide: Boolean,
  estAccepte: Boolean,
  caracteristiques: [String],
},{ _id: false })

const PropositionBDD = mongoose.model("Proposition", PropositionSchema);
const ContrePropositionBDD = mongoose.model("ContreProposition", ContrePropositionSchema);




//////TEST MONGOOSE//////
main().catch(error => console.error(error));

let client = new WebSocketClient();
let connectionWS;



async function main() {

  //INITIALISATION DES LISTES DE PROPOSITIONS ET DE CONTRE-PROPOSITIONS
  await mongoose.connect("mongodb://localhost:27017/fabriquant2");
  
  client.on('connect', function(connection) {
    connectionWS = connection;
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
      console.log("Message reçu: " + message.utf8Data);
      var action = JSON.parse(message.utf8Data).action;
      var data = JSON.parse(message.utf8Data).data;
      if(action == "newOffre"){
        majProposition(data);
      }
      if(action == "deleteOffre"){
        deleteContreProposition(data.contreProp_id);
      }
      if(action == "acceptOffre"){
        //console.log("offre acceptée avec proposition "+data.proposition+" ,contre proposition "+data.contreProp_id);
        verifIsvalide(JSON.parse(message.utf8Data).contreProp_id,JSON.parse(message.utf8Data).proposition);
      }
    });
  });
  
  
  client.connect("ws://localhost:9000/", 'echo-protocol');
}
///GESTION DE L'API ET DES ENDPONTS/////////////////


///POST////////////////////////

app.post("/addProposition", (req,res) => {
  (async() => {
    var propAdd = await addProposition(req.body.demande,req.body.description,req.body.cout,req.body.delai,req.body.caracteristiques,req.body.quantite);
    console.log(propAdd);
    res.status(200).send("ajout réussi !");
  })();
})

app.post("/addContreProposition", (req,res) => {
  (async() => {
    var contrePropAdd = await addContreProposition(req.body.proposition_id,req.body.reponse,req.body.cout,req.body.delai,req.body.quantite,req.body.caracteristiques);
    console.log(contrePropAdd);
    res.status(200).send("ajout réussi !");
  })();
})

app.post("/acceptContreProposition", (req,res) => {
  (async() => {
    var propAdd = await acceptContreProposition(req.body.id_proposition,req.body.id_contreProposition);
    res.status(200).send("Proposition accepté avec succès !");
  })();
})

//////UPDATE///////////////////
app.post("/updateProposition", (req,res) => {
  (async() => {
    var propAdd = await updateProposition(req.body.proposition_id,req.body.demande,req.body.description,req.body.cout,req.body.delai,req.body.caracteristiques,req.body.quantite,req.body.isValid);
    console.log(propAdd);
    res.status(200).send("ajout réussi !");
    const caca = await getPropositions();
    console.log(caca); 
  })();
})

app.post("/updateContreProposition", (req,res) => {
  (async() => {
    var propAdd = await updateContreProposition(req.body.proposition_id,req.body.reponse,req.body.cout,req.body.delai,req.body.quantite,req.body.caracteristiques,req.body.estValide,req.body.estAccepte);
    res.status(200).send("modification réussi !");
  })();
})

////DELETE////////////////////
app.post("/deleteContreProposition", (req,res) => {
  (async() => {
    var propAdd = await deleteContreProposition(req.body.proposition_id);
    res.status(200).send("suppression réussi !");
  })();

});



/////GET////////////////////////

 app.get("/propositions", (req,res) => {
  (async() => {
    const props = await getPropositions();
    console.log(props);
    res.status(200).send(props); 
  })();

})

app.post("/proposition", (req,res) => {
  (async() => {
    const props = await getProposition(req.body.proposition_id);
    console.log(props);
    res.status(200).send(props); 
  })();

})

  app.post("/contrePropositions", (req,res) => {
    (async() => {
      const props = await getContrePropositions(req.body.proposition_id);
      console.log(props);
      res.status(200).send(props); 
    })();
   })

   app.post("/contreProposition", (req,res) => {
    (async() => {
      const props = await getContreProposition(req.body.proposition_id);
      console.log(props);
      res.status(200).send(props); 
    })();
   })

   app.post("/isAccepted", (req,res) => {
    (async() => {
      const props = await isContrePropAccepted(req.body.proposition_id);
      console.log(props);
      res.status(200).send(props); 
    })();
   })




app.listen(portAPI, () => console.log(`Example app listening on port ${portAPI}!`));





////////ADD////////////////////
//Ajout d'une proposition
async function addProposition(demande,description,cout,delai,caracteristiques,quantite) {
  const propositionBDD = new PropositionBDD({_id: new mongoose.Types.ObjectId().toHexString(),sujet:demande,description:description,cout:cout,delai:delai,caracteristiques:caracteristiques,estValide:false,quantite:quantite});
  await propositionBDD.save();
  return propositionBDD;
}

async function addPropositionWithId(id,demande,description,cout,delai,caracteristiques,quantite) {
  const propositionBDD = new PropositionBDD({_id: id,sujet:demande,description:description,cout:cout,delai:delai,caracteristiques:caracteristiques,estValide:true,quantite:quantite});
  await propositionBDD.save();
  console.log(propositionBDD);
  return propositionBDD;
}

//Renvoi la liste des contre propositions d'une proposition
async function addContreProposition( proposition_id,reponse,cout,delai,quantite,caracteristiques) {
  const contre = new ContrePropositionBDD({_id: new mongoose.Types.ObjectId().toHexString(),proposition:proposition_id,reponse:reponse,cout:cout,delai:delai,quantite:quantite,estValide:false,estAccepte:false,caracteristiques:caracteristiques});
  await contre.save();
  return contre;
}


///////UPDATE////////////////////
async function updateProposition(proposition_id,demande,description,cout,delai,caracteristiques,quantite, estValide) {
  PropositionBDD.updateOne({_id:proposition_id},{sujet:demande,description:description,cout:cout,delai:delai,caracteristiques:caracteristiques,estValide:estValide,quantite:quantite});
}

async function updateContreProposition(proposition_id,reponse,cout,delai,quantite,caracteristiques,estValide,estAccepte) {
  await ContrePropositionBDD.updateOne({_id:proposition_id},{
  reponse: reponse,
  cout: cout,
  delai: delai,
  quantite: quantite,
  estValide: estValide,
  estAccepte: estAccepte,
  caracteristiques: caracteristiques});
    if(estValide && !estAccepte){
      const contre = await getContreProposition(proposition_id);
      var data = {};
      data.action = "newContreOffre";
      data.data = contre;
      connectionWS.sendUTF(JSON.stringify(data));
    }
}


/////DELETE////////////////////
async function deleteContreProposition(proposition_id) {
  ContrePropositionBDD.deleteOne({_id:proposition_id},function(err,res){
    console.log(res);
  });
}

/////GET//////////
async function getContrePropositions(id_proposition) {
  const contrePropositionBDD = await ContrePropositionBDD.find({proposition:id_proposition});
  return contrePropositionBDD;
}

//Renvoi la liste des propositions
async function getPropositions() {
  const propositionsBDD =  await PropositionBDD.find();
  return propositionsBDD;
}

async function isContrePropAccepted(id_contreProposition) {
  var contreProps = await ContrePropositionBDD.find({proposition:id_contreProposition,estAccepte:true});
  console.log(contreProps);
  //contreProps = JSON.parse(contreProps);
  if(contreProps.length>0){
    return true;
  }else{
    return false;
  }
}

async function acceptContreProposition(id_contreProposition,id_proposition) {
  const estAccepte = await isContrePropAccepted(id_proposition);
  if(!estAccepte){
    await ContrePropositionBDD.updateOne({_id:id_contreProposition},{estAccepte:true});
    return true;
  }else{
    return false;
  }
   
  
}

//Renvoi la proposition ayant cette id
async function getProposition(propositionId) {
  const propositionBDD =  await PropositionBDD.find({_id:propositionId});
  return propositionBDD;
}

//Renvoi la proposition ayant cette id
async function getContreProposition(propositionId) {
  const propositionBDD =  await ContrePropositionBDD.find({_id:propositionId});
  return propositionBDD[0];
}

async function deleteAllContreProposition(propositionId) {
  await ContrePropositionBDD.deleteMany({proposition:propositionId});
}

async function deleteAllProposition() {
  await PropositionBDD.deleteMany({});
}

async function majProposition(data){
  await deleteAllProposition();

  data.forEach(element => {
    addPropositionWithId(element._id,element.sujet,element.description,element.cout,element.delai,element.caracteristiques,element.quantite)
  });
}

async function verifIsvalide(propositionId,proposition){
  const contreProp = await getContreProposition(propositionId);
  if(contreProp!=null){
    updateContreProposition(contreProp._id,contreProp.reponse,contreProp.cout,contreProp.delai,contreProp.quantite,contreProp.caracteristiques,true,true)
  }else{
    deleteAllContreProposition(proposition);
  }
}



