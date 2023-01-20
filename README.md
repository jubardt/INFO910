# INFO910
## Réalisé par **BELHAOUZIA Zohir** et **JUBARD Théo**

## Contenu

Ce git est une dockerisation d'une application réalisé précedemment. Celle-ci simule sous la forme d'un app web les interactions entre des maitres d'oeuvre et des clients 
concernant la création de nouveaux produits.

Le projet est composé de plusieurs éléments:
- Une application front **Vue.js** permettant l'accès depuis le web à l'interface
- Une application back **Node js** permettant de faire le lien entre l'application Vue et la base de données via une API REST et Websocket
- Une base MongoDb permettant de stocker les propositions émises par les clients et les contre-propositions des diffèrents entreprises.

Chacune de ces composantes à été dockeriser:
- Il existe un Dockerfile diffèrent pour le front et le back permettant de fournir une image de chacune des 2 applications
- Un fichier **docker-compose** est là pour faire le lien entre les applications et instancier la base mongo. Il permet de lancer chacun des conteneurs et de les relancer en cas d'erreur
