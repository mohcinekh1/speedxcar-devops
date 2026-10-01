# 03 - Checklist des livrables

Cette checklist permet de suivre ta progression. Chaque element coche signifie que tu as compris une partie du cycle DevOps en pratique.

## Fondamentaux

```text
[ ] Je sais naviguer dans Linux
[ ] Je comprends permissions, users, groups
[ ] Je sais lire les logs avec journalctl
[ ] Je comprends IP, ports, DNS, HTTP/HTTPS
[ ] Je sais tester une API avec curl
[ ] Je sais utiliser Git avec branches et commits propres
[ ] Je sais lire et ecrire un fichier YAML simple
```

## Plan

```text
[ ] docs/architecture.md
[ ] docs/environments.md
[ ] docs/variables-env.md
[ ] docs/network-and-ports.md
```

## Code

```text
[ ] docs/local-run.md
[ ] docs/git-workflow.md
[ ] README frontend mis a jour
[ ] README backend mis a jour
```

## Build

```text
[ ] build Angular fonctionne
[ ] build Maven fonctionne
[ ] Dockerfile frontend
[ ] Dockerfile backend
[ ] docker-compose.yml local
```

## Test

```text
[ ] tests frontend lances automatiquement
[ ] tests backend lances automatiquement
[ ] strategie de test documentee
[ ] test API simple ajoute
```

## CI/CD

```text
[ ] pipeline CI cree
[ ] job test frontend
[ ] job test backend
[ ] job build Docker
[ ] job scan securite
[ ] job push image vers registry
```

## Release

```text
[ ] tag Git v1.0.0
[ ] CHANGELOG.md
[ ] images Docker versionnees
[ ] procedure rollback documentee
```

## Deploy

```text
[ ] deploy/docker-compose.prod.yml
[ ] deploy/nginx.conf
[ ] application accessible depuis serveur
[ ] HTTPS configure
```

## Infrastructure as Code

```text
[ ] infra/terraform/
[ ] infra/ansible/
[ ] VM creee automatiquement
[ ] serveur configure automatiquement
```

## Kubernetes

```text
[ ] k8s/deployment-frontend.yml
[ ] k8s/deployment-backend.yml
[ ] k8s/service-frontend.yml
[ ] k8s/service-backend.yml
[ ] k8s/ingress.yml
[ ] helm/speedxcar/
```

## Monitoring

```text
[ ] Prometheus configure
[ ] Grafana configure
[ ] dashboard cree
[ ] logs centralises
[ ] alerte simple creee
```

## Securite

```text
[ ] Trivy dans pipeline
[ ] SonarQube dans pipeline
[ ] secrets retires du code
[ ] variables CI/CD securisees
[ ] checklist securite documentee
```

## Feedback

```text
[ ] panne simulee
[ ] logs analyses
[ ] rollback teste
[ ] rapport incident redige
[ ] amelioration ajoutee au backlog
```

## Definition de fin du projet DevOps

Le projet est considere complet lorsque :

```text
- le frontend Angular tourne dans un container
- le backend Spring Boot tourne dans un container
- la base de donnees est geree proprement
- un pipeline CI/CD teste et build automatiquement
- les images Docker sont publiees
- le deploiement est documente
- l'infrastructure est automatisee
- le monitoring fonctionne
- la securite de base est integree
- une procedure incident/rollback existe
```

