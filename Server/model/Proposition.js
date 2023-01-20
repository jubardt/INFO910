class Proposition {
    static ID_INC = 1;
    sujet = "";
    cout = 0;
    delai = "5 jours";
    quantite =0;
    caracteristiques = [];



    constructor(sujet="Raquette de ping pong",cout=0,delai="5 mois",caracteristiques=["Robuste","Métallique","flexible"],quantite=0) {
        this.id = Proposition.ID_INC++;
        this.sujet = sujet;
        this.cout = cout;
        this.delai = delai;
        this.caracteristiques = caracteristiques;
        this.quantite = quantite;
    }
};

module.exports = Proposition;