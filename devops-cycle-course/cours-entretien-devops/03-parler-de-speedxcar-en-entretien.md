# 03 - Parler de SpeedXcar en entretien

Ce fichier t'aide a utiliser ton projet comme exemple concret, meme si tu n'as pas encore tout implemente.

## Presentation courte du projet

Reponse possible :

```text
SpeedXcar est un projet compose d'un frontend Angular et d'un backend Spring Boot. Je l'utilise comme projet fil rouge pour appliquer le cycle DevOps : versionner le code, automatiser les tests et builds, creer des images Docker, mettre en place une pipeline CI/CD, deployer sur un environnement serveur, puis ajouter monitoring, logs et securite.
```

## Architecture simple a expliquer

```text
Utilisateur
-> Navigateur
-> Frontend Angular
-> API Backend Spring Boot
-> Base de donnees
```

Avec DevOps :

```text
Git
-> CI/CD
-> Build frontend/backend
-> Tests
-> Images Docker
-> Registry
-> Deploiement VM ou Kubernetes
-> Monitoring / logs
```

## Comment expliquer chaque phase avec SpeedXcar

## Plan

```text
Dans la phase Plan, j'identifie les composants du projet : frontend Angular, backend Spring Boot, base de donnees, ports, variables d'environnement et environnements local/dev/prod.
```

## Code

```text
Dans la phase Code, j'utilise Git pour versionner frontend et backend. Je peux organiser le workflow avec main, develop et des branches feature.
```

## Build

```text
Dans la phase Build, Angular produit des fichiers statiques avec npm run build, et Spring Boot produit un JAR avec Maven. Ensuite, je peux creer des images Docker pour rendre le deploiement reproductible.
```

## Test

```text
Dans la phase Test, je lance les tests Angular et les tests backend avec Maven. Je peux aussi ajouter des tests API pour verifier les endpoints critiques.
```

## CI/CD

```text
Dans la phase CI/CD, je mets en place une pipeline qui s'execute a chaque push : installation des dependances, tests, build, creation d'images Docker, scan de securite et publication dans un registry.
```

## Release

```text
Dans la phase Release, je cree une version comme v1.0.0, je tagge le code Git, je tagge les images Docker et je documente les changements dans un changelog.
```

## Deploy

```text
Dans la phase Deploy, je peux d'abord deployer SpeedXcar sur une VM Linux avec Docker Compose. Ensuite, pour un niveau plus avance, je peux migrer vers Kubernetes avec des manifests ou Helm.
```

## Operate

```text
Dans la phase Operate, je m'assure que les containers tournent, que le backend repond, que Nginx redirige correctement, que la base est sauvegardee et que je peux faire un rollback.
```

## Monitor

```text
Dans la phase Monitor, je peux utiliser Prometheus et Grafana pour surveiller le backend, la VM, la latence, les erreurs et l'etat des services. Pour les logs, je peux utiliser ELK ou OpenSearch.
```

## Feedback

```text
Dans la phase Feedback, j'utilise les logs, les alertes et les retours utilisateurs pour corriger les problemes, ameliorer les performances et ajouter des taches au backlog.
```

## Reponse complete type entretien

Question :

```text
Comment appliquerais-tu DevOps sur ton projet ?
```

Reponse :

```text
J'ai un projet SpeedXcar compose d'un frontend Angular et d'un backend Spring Boot. D'abord, je planifie l'architecture, les environnements et les variables. Ensuite, je versionne le code avec Git et je separe les branches. Pour le build, Angular produit le dossier dist et Spring Boot produit un JAR avec Maven. Je containerise les deux parties avec Docker et je lance l'ensemble avec Docker Compose.

Apres ca, je mets en place une pipeline CI/CD qui lance les tests, construit les images Docker, fait un scan de securite et pousse les images dans un registry. Pour le deploiement, je peux utiliser une VM Linux avec Docker Compose et Nginx, puis evoluer vers Kubernetes. Enfin, j'ajoute le monitoring avec Prometheus/Grafana, la centralisation des logs et une procedure de rollback.
```

## Questions que le recruteur peut poser sur SpeedXcar

Question :

```text
Pourquoi Dockeriser le projet ?
```

Reponse :

```text
Pour rendre l'environnement reproductible. Le frontend, le backend et leurs dependances peuvent etre executes de la meme maniere en local, en staging ou en production.
```

Question :

```text
Pourquoi separer frontend et backend ?
```

Reponse :

```text
Cela permet de developper, tester, builder et deployer chaque partie separement. Le frontend Angular peut etre servi par Nginx, tandis que le backend Spring Boot expose les APIs.
```

Question :

```text
Comment gerer les variables sensibles ?
```

Reponse :

```text
Je ne mets pas les secrets dans Git. J'utilise des variables d'environnement, des secrets CI/CD, et en production un outil comme Vault ou les secrets du cloud provider.
```

Question :

```text
Comment faire un rollback ?
```

Reponse :

```text
Je garde des versions taggees des images Docker. Si la version v1.1.0 pose probleme, je peux redeployer l'image v1.0.0 qui etait stable.
```

Question :

```text
Que surveiller apres le deploiement ?
```

Reponse :

```text
Je surveille la disponibilite, la latence, le taux d'erreur, les logs backend, CPU, RAM, disque, et la connexion a la base de donnees.
```

## Phrases utiles

```text
Je n'ai pas encore implemente toutes les phases, mais je comprends le cycle et j'ai prepare SpeedXcar comme projet fil rouge pour les appliquer progressivement.
```

```text
Mon objectif est de passer d'un projet developpe localement a un projet deployable, observable et securise avec une pipeline automatisee.
```

```text
Je commence par Docker Compose pour comprendre le deploiement simple, puis je peux evoluer vers Kubernetes lorsque l'application grandit.
```

