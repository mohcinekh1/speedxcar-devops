# 02 - Questions / reponses entretien DevOps

Ce fichier sert a reviser rapidement. Les reponses sont courtes, mais assez propres pour un entretien PFE ou stage.

## Questions generales DevOps

Question :

```text
C'est quoi DevOps ?
```

Reponse :

```text
DevOps est une culture et un ensemble de pratiques qui rapprochent developpement et operations. L'objectif est de livrer plus vite, plus souvent et plus fiable grace a l'automatisation, CI/CD, monitoring, infrastructure as code et feedback continu.
```

Question :

```text
Quels sont les avantages de DevOps ?
```

Reponse :

```text
DevOps reduit les erreurs manuelles, accelere les livraisons, ameliore la collaboration, facilite les rollbacks et permet de detecter les problemes plus rapidement avec le monitoring.
```

Question :

```text
Explique le cycle DevOps.
```

Reponse :

```text
Le cycle DevOps commence par Plan, puis Code, Build, Test, Release, Deploy, Operate, Monitor et Feedback. C'est une boucle continue : on planifie, on developpe, on teste, on deploie, on surveille, puis on ameliore.
```

## Linux

Question :

```text
Pourquoi Linux est important pour DevOps ?
```

Reponse :

```text
La plupart des serveurs de production tournent sous Linux. Un DevOps doit savoir se connecter en SSH, lire les logs, gerer les services, les permissions, les processus et diagnostiquer les problemes systeme.
```

Question :

```text
Comment verifier les logs d'un service Linux ?
```

Reponse :

```bash
journalctl -u nom-du-service
```

Question :

```text
Comment verifier si un port est ouvert ?
```

Reponse :

```bash
ss -tulnp
```

## Reseau

Question :

```text
Quelle est la difference entre HTTP et HTTPS ?
```

Reponse :

```text
HTTP transmet les donnees sans chiffrement. HTTPS utilise TLS/SSL pour chiffrer les communications et proteger les donnees entre le client et le serveur.
```

Question :

```text
C'est quoi un reverse proxy ?
```

Reponse :

```text
Un reverse proxy recoit les requetes des utilisateurs et les redirige vers les bons services internes. Par exemple, Nginx peut servir le frontend Angular et rediriger /api vers le backend Spring Boot.
```

## Git

Question :

```text
Pourquoi utiliser Git ?
```

Reponse :

```text
Git permet de versionner le code, travailler en equipe, creer des branches, suivre l'historique, faire des revues de code et revenir a une ancienne version si besoin.
```

Question :

```text
Quelle est la difference entre merge et rebase ?
```

Reponse :

```text
Merge combine deux branches en gardant l'historique tel quel. Rebase rejoue les commits d'une branche au-dessus d'une autre pour avoir un historique plus lineaire.
```

## Docker

Question :

```text
C'est quoi Docker ?
```

Reponse :

```text
Docker est une plateforme qui permet d'emballer une application avec ses dependances dans une image, puis de l'executer dans un container de maniere portable et reproductible.
```

Question :

```text
Difference entre image et container ?
```

Reponse :

```text
Une image est un modele statique qui contient l'application et ses dependances. Un container est une instance en cours d'execution de cette image.
```

Question :

```text
C'est quoi Docker Compose ?
```

Reponse :

```text
Docker Compose permet de definir et lancer plusieurs containers avec un fichier YAML. Par exemple, frontend Angular, backend Spring Boot et base de donnees peuvent etre lances ensemble.
```

## CI/CD

Question :

```text
C'est quoi CI ?
```

Reponse :

```text
CI signifie Continuous Integration. A chaque changement de code, une pipeline lance automatiquement les tests, le build et parfois l'analyse qualite pour verifier que le code peut etre integre.
```

Question :

```text
C'est quoi CD ?
```

Reponse :

```text
CD signifie Continuous Delivery ou Continuous Deployment. Continuous Delivery prepare automatiquement une version deployable. Continuous Deployment deploie automatiquement les changements valides.
```

Question :

```text
Quels sont les stages typiques d'une pipeline CI/CD ?
```

Reponse :

```text
Install, lint, test, build, security scan, package Docker image, push registry, deploy.
```

Question :

```text
C'est quoi un runner ?
```

Reponse :

```text
Un runner est la machine ou l'agent qui execute les jobs de la pipeline CI/CD.
```

Question :

```text
C'est quoi un artifact dans CI/CD ?
```

Reponse :

```text
Un artifact est un fichier produit par un job, comme un JAR, un dossier build Angular, un rapport de test ou un package deployable.
```

## Build et Release

Question :

```text
Pourquoi tagger les images Docker ?
```

Reponse :

```text
Pour identifier clairement les versions. Par exemple speedxcar-backend:v1.0.0 permet de savoir quelle version est deployee et facilite le rollback.
```

Question :

```text
C'est quoi le semantic versioning ?
```

Reponse :

```text
C'est une convention de version sous la forme MAJOR.MINOR.PATCH, par exemple 1.2.3. MAJOR pour changements incompatibles, MINOR pour nouvelles fonctionnalites, PATCH pour corrections.
```

## Deploy

Question :

```text
Comment deployer une application simple ?
```

Reponse :

```text
On peut utiliser une VM Linux, installer Docker, lancer l'application avec Docker Compose, configurer Nginx comme reverse proxy, ouvrir les ports necessaires et ajouter HTTPS.
```

Question :

```text
C'est quoi un rollback ?
```

Reponse :

```text
Un rollback consiste a revenir a une version precedente stable quand une nouvelle version pose probleme.
```

## Infrastructure as Code

Question :

```text
C'est quoi Infrastructure as Code ?
```

Reponse :

```text
Infrastructure as Code consiste a declarer l'infrastructure dans des fichiers de code. Cela rend la creation des serveurs, reseaux et configurations reproductible et versionnee.
```

Question :

```text
Difference entre Terraform et Ansible ?
```

Reponse :

```text
Terraform sert surtout a provisionner l'infrastructure comme VM, reseau, firewall et cloud resources. Ansible sert surtout a configurer les serveurs, installer packages, deployer fichiers et services.
```

## Kubernetes

Question :

```text
C'est quoi Kubernetes ?
```

Reponse :

```text
Kubernetes est un orchestrateur de containers. Il gere le deploiement, le scaling, le reseau, la disponibilite et les mises a jour des applications containerisees.
```

Question :

```text
C'est quoi un Pod ?
```

Reponse :

```text
Un Pod est la plus petite unite deployable dans Kubernetes. Il contient un ou plusieurs containers qui partagent le meme reseau et parfois le meme stockage.
```

Question :

```text
Difference entre Deployment et Service ?
```

Reponse :

```text
Un Deployment gere les replicas et les mises a jour des Pods. Un Service expose ces Pods avec une adresse stable pour que les autres composants puissent les joindre.
```

## Monitoring

Question :

```text
Pourquoi le monitoring est important ?
```

Reponse :

```text
Le monitoring permet de detecter rapidement les problemes de disponibilite, performance ou erreurs. Sans monitoring, on decouvre souvent les incidents grace aux utilisateurs, trop tard.
```

Question :

```text
Que surveiller dans une application ?
```

Reponse :

```text
Disponibilite, latence, taux d'erreur, CPU, RAM, disque, logs applicatifs, base de donnees et nombre de requetes.
```

## Securite DevSecOps

Question :

```text
C'est quoi DevSecOps ?
```

Reponse :

```text
DevSecOps integre la securite dans tout le cycle DevOps, pas seulement a la fin. On ajoute des scans, la gestion des secrets, le controle des permissions et les bonnes pratiques de securite dans la pipeline.
```

Question :

```text
Comment eviter les secrets dans Git ?
```

Reponse :

```text
On utilise des variables d'environnement, les secrets du CI/CD, un vault si possible, et des outils de detection de secrets. Les mots de passe ne doivent pas etre stockes dans le code.
```

Question :

```text
C'est quoi le principe du least privilege ?
```

Reponse :

```text
Chaque utilisateur, service ou application doit avoir uniquement les permissions necessaires, pas plus. Cela limite l'impact en cas de faille ou mauvaise manipulation.
```

