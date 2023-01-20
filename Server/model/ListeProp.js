class ListeContreProp{
    liste = [];

    constructor(liste = []){
        this.liste = liste;
    }

    ajouter(contreProposition){
        this.liste.push(contreProposition);
    }

    supprimer(contreProposition){
        this.liste.splice(this.liste.indexOf(contreProposition),1);
    }

    vider(){
        this.liste = [];
    }
};

module.exports = ListeContreProp;