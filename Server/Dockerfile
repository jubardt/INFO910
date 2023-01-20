# On travaille avec la dernière version de node
FROM node:lts-alpine


# définit le dossier 'app' comme dossier de travail
WORKDIR /app

# copie 'package.json' et 'package-lock.json' (si disponible)
COPY package*.json ./

# installe les dépendances du projet
RUN npm install

# copie les fichiers et dossiers du projet dans le dossier de travail (par exemple : le dossier 'app')
COPY . .

# On expose le port 3000 pour le serveur web et le port 9000 pour le serveur de socket
EXPOSE 3000
EXPOSE 9000

# On lance le serveur web et le serveur de socket
CMD [ "node", "app.js" ]