# 02 - Cycle DevOps applique a SpeedXcar

Ce fichier est le plan principal. Il suit le cycle complet DevOps avec le projet reel SpeedXcar.

## Phase 1 - Plan

But : comprendre ce que le projet doit faire et preparer le travail.

A faire :

```text
- decrire le role du frontend Angular
- decrire le role du backend Spring Boot
- identifier la base de donnees utilisee ou a utiliser
- definir les environnements : local, dev, staging, prod
- definir les ports
- definir les variables d'environnement
```

A comprendre :

```text
- architecture applicative
- environnements
- user stories
- risques techniques
```

Livrables :

```text
docs/architecture.md
docs/environments.md
docs/variables-env.md
```

## Phase 2 - Code

But : organiser le code et le workflow Git.

A faire :

```text
- verifier les README du frontend et backend
- nettoyer les fichiers inutiles si necessaire
- creer une convention de branches
- documenter comment lancer frontend et backend en local
```

A comprendre :

```text
- Git workflow
- branches
- pull request / merge request
- code review
- conventions de commit
```

Livrables :

```text
docs/local-run.md
docs/git-workflow.md
```

## Phase 3 - Build

But : transformer le code en artefacts executables.

Frontend Angular :

```bash
npm install
npm run build
```

Backend Spring Boot :

```bash
./mvnw clean package
```

A faire :

```text
- creer un Dockerfile pour le frontend
- creer un Dockerfile pour le backend
- creer un docker-compose.yml
- ajouter une base de donnees si le backend en a besoin
```

A comprendre :

```text
- build Angular
- build Maven
- artefacts
- image Docker
- Dockerfile multi-stage
- Docker Compose
```

Livrables :

```text
frontend-location/Dockerfile
speedXcar/Dockerfile
docker-compose.yml
```

## Phase 4 - Test

But : verifier automatiquement que le projet fonctionne.

A faire :

```text
- lancer les tests Angular
- lancer les tests Spring Boot
- ajouter test API simple pour le backend
- ajouter lint si disponible
```

Commandes probables :

```bash
npm test
./mvnw test
```

A comprendre :

```text
- tests unitaires
- tests integration
- qualite code
- erreurs detectees avant production
```

Outils :

```text
JUnit
Angular testing
Postman ou Newman
SonarQube
```

Livrables :

```text
docs/testing-strategy.md
```

## Phase 5 - CI/CD

But : automatiser build, test et packaging.

Pipeline minimum :

```text
push code
-> install dependencies
-> run tests
-> build frontend
-> build backend
-> build Docker images
-> scan images
-> push images to registry
```

Outils a apprendre dans cet ordre :

```text
1. GitHub Actions ou GitLab CI/CD
2. Jenkins
```

A comprendre :

```text
- pipeline
- job
- stage
- runner
- cache
- artifacts
- secrets
- registry
```

Livrables :

```text
.github/workflows/ci.yml
ou
.gitlab-ci.yml
```

## Phase 6 - Release

But : preparer une version officielle.

A faire :

```text
- creer un tag Git
- versionner les images Docker
- ecrire un changelog
- separer latest et version stable
```

Exemple :

```text
speedxcar-frontend:v1.0.0
speedxcar-backend:v1.0.0
```

A comprendre :

```text
- versioning
- semantic versioning
- tag Git
- rollback
```

Livrables :

```text
CHANGELOG.md
docs/release-process.md
```

## Phase 7 - Deploy

But : mettre SpeedXcar dans un environnement accessible.

Niveau 1 :

```text
Deploiement avec Docker Compose sur une VM Linux
```

Niveau 2 :

```text
Deploiement avec Kubernetes
```

A faire :

```text
- deployer frontend + backend + database avec Docker Compose
- ajouter Nginx comme reverse proxy
- configurer variables d'environnement
- ajouter HTTPS
```

A comprendre :

```text
- serveur Linux
- SSH
- firewall
- Docker Compose en production simple
- Nginx
- SSL
```

Livrables :

```text
deploy/docker-compose.prod.yml
deploy/nginx.conf
docs/deployment-guide.md
```

## Phase 8 - Infrastructure as Code

But : eviter de creer les serveurs manuellement.

Outils :

```text
Terraform
Ansible
```

A faire :

```text
- Terraform cree la VM, le reseau et les regles firewall
- Ansible installe Docker, Nginx et configure le serveur
```

A comprendre :

```text
- provider
- resource
- state Terraform
- inventory Ansible
- playbook
- role
```

Livrables :

```text
infra/terraform/
infra/ansible/
```

## Phase 9 - Kubernetes

But : apprendre l'orchestration moderne.

A faire :

```text
- creer Deployment frontend
- creer Deployment backend
- creer Service frontend/backend
- creer ConfigMap
- creer Secret
- creer Ingress
- creer chart Helm
```

A comprendre :

```text
- Pod
- Deployment
- Service
- Ingress
- ConfigMap
- Secret
- Namespace
- Helm
- rolling update
```

Livrables :

```text
k8s/
helm/speedxcar/
```

## Phase 10 - Operate

But : maintenir l'application en fonctionnement.

A faire :

```text
- redemarrage automatique
- backups base de donnees
- gestion logs
- procedure rollback
- procedure incident
```

A comprendre :

```text
- operations production
- backup / restore
- incident response
- disponibilite
```

Livrables :

```text
docs/operations-runbook.md
docs/backup-restore.md
```

## Phase 11 - Monitor

But : savoir si SpeedXcar va bien en production.

A faire :

```text
- monitorer CPU, RAM, disque
- monitorer backend Spring Boot
- monitorer status HTTP
- centraliser les logs
- creer dashboard Grafana
```

Outils :

```text
Prometheus
Grafana
ELK ou OpenSearch
Loki optionnel
```

A comprendre :

```text
- logs
- metrics
- traces
- alerting
- SLI / SLO / SLA
```

Livrables :

```text
monitoring/prometheus.yml
monitoring/grafana-dashboard.json
docs/monitoring.md
```

## Phase 12 - Security / DevSecOps

But : integrer la securite dans le cycle.

A faire :

```text
- scanner les images Docker avec Trivy
- scanner le code avec SonarQube
- eviter les secrets dans Git
- utiliser secrets CI/CD
- limiter les permissions
```

Outils :

```text
SonarQube
Trivy
Dependabot
GitHub/GitLab secrets
```

A comprendre :

```text
- vulnerabilites
- secrets management
- IAM
- least privilege
- RBAC Kubernetes
```

Livrables :

```text
docs/security-checklist.md
```

## Phase 13 - Feedback

But : ameliorer le systeme apres observation.

A faire :

```text
- simuler une panne backend
- lire les logs
- corriger l'erreur
- redeployer
- documenter l'incident
```

A comprendre :

```text
- post-mortem
- amelioration continue
- reliability
- rollback
```

Livrables :

```text
docs/incident-report-template.md
docs/lessons-learned.md
```

