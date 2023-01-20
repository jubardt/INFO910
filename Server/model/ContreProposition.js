const Proposition = require("./Proposition.js");

class ContreProposition{
    proposition;
    fabriquant = "";
    cout = 0;
    delai = 0;
    quantite =0;
    caracteristiques = [];

    constructor(proposition = new Proposition(),fabriquant="Thomas and zoz",cout=0,delai=0,quantite=0,caracteristiques=["flexible","léger","plastique"]){
        this.proposition = proposition;
        this.fabriquant = fabriquant;
        this.cout = cout;
        this.delai = delai;
        this.quantite = quantite;
        this.caracteristiques = caracteristiques;
    }

}

module.exports = ContreProposition;
