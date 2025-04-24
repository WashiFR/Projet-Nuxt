# Pré-requis techniques

- [x] Installation de Nuxt.js
- [x] Installation de PrimeVue
- [x] Installation de serveur Nuxt
- [x] Installation de WebSocket
- [x] Création de la base de données MySQL
- [x] Création du fichier `docker-compose.yml`

# Fonctionnalités principales

- [ ] Actualisation en temps réel des sujets et des messages
- [x] Création de la bd MySQL au démarrage
- [x] Création d'un compte `admin` au démarrage

## Pages

- [x] Page d'accueil (liste des forums avec nombre de sujets)

### Sujets

- [x] Page d'un forum (liste des sujets)
- [ ] Afficher les sujets par date de dernier message décroissant
- [x] Afficher auteur + date création + auteur du dernier message
- [ ] Bouton pour créer un nouveau sujet (titre + message), doit être connecté
- [x] Pagination des sujets (20 par page)
- [ ] Bouton pour supprimer un sujet et ses messages (si admin)

### Messages

- [ ] Page d'un sujet de forum (liste des messages)
- [ ] Afficher le message initial en haut
- [ ] Afficher les messages par date de création croissante
- [ ] Afficher nom utilisateur + date création
- [ ] Bouton pour répondre à un sujet (message), doit être connecté
- [ ] Pagination des messages (20 par page)
- [ ] Bouton pour modifier son message (si auteur ou admin)
- [ ] Bouton pour supprimer message (si admin)

### Administration

- [x] Page d'administration
- [ ] Créer un nouveau compte administrateur
- [ ] Créer, modifier, supprimer un forum (supprime les sujets et messages associés)

## Authentification

- [x] Authentification
- [ ] Compte administrateur
- [x] Déconnexion
- [ ] Changer de mot de passe

# Bonus

- [ ] Bouton pour citer un message et répondre
- [ ] Avatar utilisateur (photo de profil)
- [ ] Verrouiller un sujet (si admin)
- [ ] Etat lu/non-lu des sujets et messages (si connecté)
