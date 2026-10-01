# SpeedXcar - Plan de cours DevOps pratique

Ce dossier sert de guide pour apprendre DevOps en appliquant directement le cycle de vie sur le projet SpeedXcar.

Structure actuelle du workspace :

```text
SpeedXcar-workspace/
├── frontend-location/      # Frontend Angular
├── speedXcar/              # Backend Spring Boot / Maven
└── devops-cycle-course/    # Plan de cours DevOps pratique
```

Objectif : faire passer SpeedXcar par tout le cycle DevOps :

```text
Plan -> Code -> Build -> Test -> Release -> Deploy -> Operate -> Monitor -> Feedback
```

## Comment utiliser ce dossier

Si tu as le temps d'appliquer pratiquement, lis les fichiers dans cet ordre :

```text
1. 01-fondamentaux.md
2. 02-cycle-devops-speedxcar.md
3. 03-livrables-checklist.md
```

Si ton objectif principal est de preparer un stage PFE ou des entretiens, lis plutot :

```text
1. cours-entretien-devops/00-plan-rapide-entretien.md
2. cours-entretien-devops/01-cours-par-cycle-devops.md
3. cours-entretien-devops/02-questions-reponses-entretien.md
4. cours-entretien-devops/03-parler-de-speedxcar-en-entretien.md
```

Chaque phase explique :

- ce qu'il faut comprendre
- quels outils utiliser
- quoi appliquer dans SpeedXcar
- quel livrable produire

La partie entretien explique aussi :

- la theorie a connaitre
- les definitions simples
- les questions possibles
- les reponses courtes et propres
- comment utiliser SpeedXcar comme exemple reel

## Stack du projet

Frontend :

```text
Angular
Node.js / npm
TypeScript
```

Backend :

```text
Spring Boot
Java
Maven
```

Stack DevOps conseillee :

```text
Linux
Git / GitHub ou GitLab
Docker
Docker Compose
GitLab CI/CD ou GitHub Actions
Jenkins ensuite
Terraform
Ansible
Kubernetes
Helm
Prometheus
Grafana
ELK ou OpenSearch
SonarQube
Trivy
```

## Resultat attendu a la fin

A la fin de ce parcours, tu dois avoir :

```text
- frontend Angular containerise
- backend Spring Boot containerise
- base de donnees lancee avec Docker Compose
- pipeline CI/CD
- tests automatiques
- scan qualite/securite
- image Docker publiee dans un registry
- deploiement sur serveur Linux
- infrastructure automatisee
- monitoring et logs
- documentation technique
```
