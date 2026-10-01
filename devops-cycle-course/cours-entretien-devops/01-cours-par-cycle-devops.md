# 01 - Cours par cycle DevOps applique a SpeedXcar

Ce document explique chaque phase du cycle DevOps comme un cours d'entretien : definition, concepts, outils, exemple SpeedXcar et questions possibles.

Cycle complet :

```text
Plan -> Code -> Build -> Test -> Release -> Deploy -> Operate -> Monitor -> Feedback
```

## 1. Plan

Definition :

```text
La phase Plan consiste a comprendre le besoin, definir les fonctionnalites, choisir l'architecture et preparer les taches.
```

Ce qu'il faut comprendre :

```text
- besoin metier
- user stories
- backlog
- architecture globale
- environnements : local, dev, staging, prod
- risques techniques
```

Exemple SpeedXcar :

```text
SpeedXcar contient un frontend Angular et un backend Spring Boot. Dans la phase Plan, je dois comprendre les fonctionnalites, les APIs backend, la base de donnees, les ports, les variables d'environnement et le mode de deploiement.
```

Outils possibles :

```text
Jira, Trello, GitHub Issues, GitLab Issues, Confluence, Markdown
```

Question entretien :

```text
Pourquoi la phase Plan est importante en DevOps ?
```

Reponse :

```text
Elle evite de construire une solution sans comprendre le besoin. En DevOps, on planifie aussi les environnements, l'automatisation, la securite et le monitoring des le debut.
```

## 2. Code

Definition :

```text
La phase Code correspond au developpement de l'application et a la gestion du code source.
```

Ce qu'il faut comprendre :

```text
- Git
- branches
- commits
- merge request / pull request
- code review
- conventions de commit
- gestion des secrets
```

Exemple SpeedXcar :

```text
Le frontend Angular et le backend Spring Boot doivent etre versionnes avec Git. On peut utiliser une branche main stable, une branche develop et des branches feature pour chaque evolution.
```

Outils possibles :

```text
Git, GitHub, GitLab, Bitbucket
```

Question entretien :

```text
C'est quoi une pull request ou merge request ?
```

Reponse :

```text
C'est une demande pour integrer une branche dans une autre. Elle permet de faire une revue de code, lancer les tests automatiquement et eviter d'integrer du code casse dans la branche principale.
```

## 3. Build

Definition :

```text
La phase Build transforme le code source en artefact executable ou deployable.
```

Ce qu'il faut comprendre :

```text
- compilation
- dependances
- artefact
- image Docker
- version de build
```

Exemple SpeedXcar :

```text
Pour Angular, le build produit des fichiers statiques HTML/CSS/JS. Pour Spring Boot, Maven produit un fichier JAR. Ensuite, on peut creer une image Docker pour chaque partie.
```

Commandes exemples :

```bash
npm install
npm run build
./mvnw clean package
docker build -t speedxcar-backend .
```

Outils possibles :

```text
Maven, npm, Docker, GitHub Actions, GitLab CI, Jenkins
```

Question entretien :

```text
C'est quoi un artefact ?
```

Reponse :

```text
Un artefact est le resultat du build. Par exemple, un fichier JAR pour le backend Spring Boot, un dossier dist pour Angular, ou une image Docker prete a etre executee.
```

## 4. Test

Definition :

```text
La phase Test verifie automatiquement que l'application fonctionne avant de la livrer.
```

Ce qu'il faut comprendre :

```text
- tests unitaires
- tests d'integration
- tests end-to-end
- lint
- analyse qualite
- tests API
```

Exemple SpeedXcar :

```text
On peut lancer les tests Angular pour le frontend et les tests JUnit/Spring Boot pour le backend. On peut aussi tester les endpoints API avec Postman ou Newman.
```

Commandes exemples :

```bash
npm test
./mvnw test
```

Outils possibles :

```text
JUnit, Mockito, Angular TestBed, Jest, Postman, Newman, SonarQube
```

Question entretien :

```text
Pourquoi automatiser les tests dans CI/CD ?
```

Reponse :

```text
Pour detecter les erreurs rapidement a chaque changement de code. Ca evite de decouvrir les bugs en production et donne plus de confiance avant le deploiement.
```

## 5. Release

Definition :

```text
La phase Release prepare une version officielle et traçable de l'application.
```

Ce qu'il faut comprendre :

```text
- versioning
- tag Git
- changelog
- image taggee
- rollback
```

Exemple SpeedXcar :

```text
On peut creer une version v1.0.0, tagger le code Git, construire les images speedxcar-frontend:v1.0.0 et speedxcar-backend:v1.0.0, puis documenter les changements dans un changelog.
```

Outils possibles :

```text
Git tags, GitHub Releases, GitLab Releases, Docker Registry, Nexus, JFrog Artifactory
```

Question entretien :

```text
Pourquoi utiliser des tags de version ?
```

Reponse :

```text
Les tags permettent de savoir exactement quelle version du code est en production. En cas de probleme, on peut revenir a une version precedente plus facilement.
```

## 6. Deploy

Definition :

```text
La phase Deploy met l'application dans un environnement ou elle peut etre utilisee.
```

Ce qu'il faut comprendre :

```text
- environnement dev/staging/prod
- variables d'environnement
- ports
- reverse proxy
- Docker Compose
- Kubernetes
- rollback
```

Exemple SpeedXcar :

```text
On peut deployer SpeedXcar sur une VM Linux avec Docker Compose : un container frontend, un container backend et un container base de donnees. Nginx peut exposer le frontend et rediriger les appels API vers le backend.
```

Outils possibles :

```text
Docker Compose, Nginx, GitLab CI/CD, Jenkins, Kubernetes, Helm, Azure, AWS
```

Question entretien :

```text
Quelle est la difference entre delivery et deployment ?
```

Reponse :

```text
Continuous Delivery prepare automatiquement une version deployable, mais le passage en production peut rester manuel. Continuous Deployment va plus loin : chaque changement valide peut etre deploye automatiquement en production.
```

## 7. Operate

Definition :

```text
La phase Operate consiste a maintenir l'application en fonctionnement apres le deploiement.
```

Ce qu'il faut comprendre :

```text
- demarrage/redemarrage des services
- logs serveur
- sauvegardes
- restauration
- gestion incidents
- certificats SSL
- scalabilite
```

Exemple SpeedXcar :

```text
Pour SpeedXcar, il faut verifier que les containers tournent, que le backend repond, que la base de donnees est sauvegardee, que les logs sont accessibles et qu'une procedure de rollback existe.
```

Outils possibles :

```text
Linux, systemd, Docker, Nginx, cron, Ansible, cloud provider
```

Question entretien :

```text
Que fais-tu si l'application ne repond plus en production ?
```

Reponse :

```text
Je verifie d'abord l'etat du service, les logs, les ressources systeme CPU/RAM/disque, puis les dependances comme la base de donnees. Ensuite je corrige si possible ou je fais un rollback vers la derniere version stable.
```

## 8. Monitor

Definition :

```text
La phase Monitor permet d'observer l'application et l'infrastructure pour detecter les problemes rapidement.
```

Ce qu'il faut comprendre :

```text
- logs
- metrics
- traces
- alertes
- dashboard
- disponibilite
- latence
- taux d'erreur
```

Exemple SpeedXcar :

```text
On peut monitorer le backend Spring Boot avec Prometheus, visualiser les metriques dans Grafana, suivre les logs avec ELK/OpenSearch et creer une alerte si le backend ne repond plus.
```

Outils possibles :

```text
Prometheus, Grafana, ELK, OpenSearch, Loki, Datadog, Azure Monitor, CloudWatch
```

Question entretien :

```text
Quelle est la difference entre logs, metrics et traces ?
```

Reponse :

```text
Les logs racontent les evenements detailles. Les metrics donnent des valeurs numeriques comme CPU, RAM, latence ou nombre d'erreurs. Les traces suivent le chemin d'une requete entre plusieurs services.
```

## 9. Feedback

Definition :

```text
La phase Feedback consiste a apprendre depuis les tests, les utilisateurs, les incidents et le monitoring pour ameliorer le produit et le systeme.
```

Ce qu'il faut comprendre :

```text
- amelioration continue
- post-mortem
- retour utilisateur
- backlog technique
- fiabilite
```

Exemple SpeedXcar :

```text
Si le monitoring montre que le backend Spring Boot est lent sur une API, on analyse les logs, on cree une tache d'amelioration, on corrige, puis on redeploie via la pipeline.
```

Outils possibles :

```text
Jira, GitHub Issues, GitLab Issues, Grafana, logs, post-mortem document
```

Question entretien :

```text
Pourquoi DevOps est souvent represente comme une boucle ?
```

Reponse :

```text
Parce que le travail ne s'arrete pas au deploiement. On observe la production, on recupere du feedback, on ameliore le code et l'infrastructure, puis on recommence le cycle.
```

