# 00 - Plan rapide pour entretien DevOps

Ton objectif maintenant : etre pret a expliquer DevOps clairement en entretien, meme si tu n'as pas encore tout implemente.

Le but n'est pas de memoriser 50 outils. Le but est de comprendre le cycle, les fondamentaux, et savoir expliquer comment tu appliquerais ca sur ton projet SpeedXcar.

## Priorite de revision

Ordre conseille :

```text
1. Fondamentaux : Linux, reseau, Git
2. Cycle DevOps : Plan, Code, Build, Test, Release, Deploy, Operate, Monitor, Feedback
3. CI/CD : pipeline, stages, jobs, artifacts, secrets
4. Docker : image, container, Dockerfile, Compose
5. Cloud et deploiement : VM, Nginx, ports, env vars
6. Monitoring : logs, metrics, alerting
7. Securite : secrets, scans, least privilege
8. Kubernetes : bases seulement si le recruteur demande
```

## Ce que tu dois savoir dire en entretien

Phrase simple :

```text
DevOps est une approche qui rapproche le developpement et les operations pour livrer plus vite, plus souvent et plus fiable, grace a l'automatisation, CI/CD, infrastructure as code, monitoring et feedback continu.
```

Phrase avec ton projet :

```text
Sur mon projet SpeedXcar, j'ai un frontend Angular et un backend Spring Boot. Je peux appliquer le cycle DevOps en versionnant le code avec Git, en automatisant les tests et builds avec une pipeline CI/CD, en containerisant avec Docker, en deployant sur une VM ou Kubernetes, puis en ajoutant monitoring, logs et securite.
```

## Methode pour repondre a une question

Utilise cette structure :

```text
1. Definition simple
2. Pourquoi c'est important
3. Exemple SpeedXcar
4. Outil possible
```

Exemple :

Question :

```text
C'est quoi CI/CD ?
```

Reponse :

```text
CI/CD signifie Continuous Integration et Continuous Delivery/Deployment. CI permet de tester et builder automatiquement le code a chaque push. CD permet de preparer ou effectuer le deploiement automatiquement. Dans SpeedXcar, une pipeline peut tester le frontend Angular, tester le backend Spring Boot, construire les images Docker, scanner les vulnerabilites et pousser les images vers un registry.
```

## Planning court sur 10 jours

```text
Jour 1 : Linux + reseau
Jour 2 : Git + workflow projet
Jour 3 : Docker + Docker Compose
Jour 4 : Build Angular + build Maven
Jour 5 : CI/CD theorie + pipeline
Jour 6 : Deploy sur serveur Linux + Nginx
Jour 7 : Monitoring + logs
Jour 8 : Securite DevSecOps
Jour 9 : Kubernetes bases
Jour 10 : questions/reponses + simulation entretien
```

## Ce qu'il faut eviter en entretien

```text
- dire seulement des noms d'outils sans expliquer le probleme qu'ils resolvent
- confondre image Docker et container
- confondre CI et CD
- oublier Linux, reseau et Git
- dire Kubernetes avant de comprendre Docker
- ne pas donner d'exemple concret
```

