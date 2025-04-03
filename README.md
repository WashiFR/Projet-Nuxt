# Projet-Nuxt

## Groupe

- Pailler Romain
- Weier Loris

## Structure de la base de données

[https://drawsql.app/teams/test-4619/diagrams/projet-nuxt](https://drawsql.app/teams/test-4619/diagrams/projet-nuxt)

## Description du projet

L’objectif de ce projet est de réaliser une application complète utilisant Nuxt.JS.
Cette application se présente sous la forme d’un forum interactif,
qui s’actualise en temps réel au fil que des sujets et des réponses sont créées.

### Pré-requis techniques

- L’application sera réalisée en utilisant Nuxt.JS et du SSR. Le côté interface doit
  utiliser le framework Vuetify 3.
- Il ne doit y avoir aucun backend ou API séparée. Toute la partie backend doit être
  directement réalisée via des modules serveur Nuxt.
- Pour le côté temps réel, un WebSocket sera utilisé. Un module serveur Nuxt sera mis
  en place pour réaliser un serveur WebSocket, et l’application s’y connectera afin
  d’être notifiée en temps réel des réponses apportées.
- Les données seront stockées dans une base de données MySQL. L’application
  initialisera le schéma de la base de données au premier démarrage.
- L’application devra être packagée dans un Docker, et doit fournir un fichier
  docker-compose.yml pour pouvoir être lancée via un simple docker compose up
