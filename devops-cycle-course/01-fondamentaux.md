# 01 - Fondamentaux avant DevOps

Avant de toucher Docker, Kubernetes ou CI/CD, il faut comprendre les bases. Sans ces bases, tu vas copier des commandes sans savoir pourquoi elles marchent.

## 1. Linux

Objectif : etre capable de travailler sur un serveur sans interface graphique.

A comprendre :

```text
- structure des dossiers Linux
- fichiers et permissions
- users et groups
- services systemd
- processus
- logs systeme
- variables d'environnement
- SSH
- cron
```

Commandes importantes :

```bash
pwd
ls
cd
cat
less
grep
find
chmod
chown
ps
top
df -h
free -m
systemctl
journalctl
ssh
scp
```

Application sur SpeedXcar :

```text
- preparer une machine Linux pour heberger le backend et le frontend
- installer Java, Node.js, Docker
- lire les logs d'un service
- lancer une application en background
```

Livrable :

```text
docs/linux-setup.md
```

## 2. Reseau

Objectif : comprendre comment un utilisateur arrive jusqu'a ton application.

A comprendre :

```text
- IP
- ports
- TCP/UDP
- DNS
- HTTP/HTTPS
- firewall
- reverse proxy
- load balancer
- SSL/TLS
```

Commandes importantes :

```bash
ping
curl
wget
ss
netstat
dig
nslookup
traceroute
```

Application sur SpeedXcar :

```text
- frontend Angular expose sur le port 80 ou 443
- backend Spring Boot expose sur le port 8080
- Nginx comme reverse proxy
- HTTPS avec certificat SSL
```

Livrable :

```text
docs/network-and-ports.md
```

## 3. Git

Objectif : travailler proprement avec versions, branches et historique.

A comprendre :

```text
- repository
- commit
- branch
- merge
- pull request / merge request
- tag
- release
- .gitignore
```

Commandes importantes :

```bash
git status
git add
git commit
git branch
git checkout
git pull
git push
git merge
git tag
```

Application sur SpeedXcar :

```text
- une branche main stable
- une branche develop
- une branche feature par changement
- tags de release : v1.0.0, v1.1.0
```

Livrable :

```text
docs/git-workflow.md
```

## 4. Scripting

Objectif : automatiser les taches repetitives.

A apprendre :

```text
- Bash pour Linux
- YAML pour CI/CD, Docker Compose, Kubernetes
- notions Python pour scripts plus avances
- PowerShell si tu travailles sur Windows/Azure
```

Application sur SpeedXcar :

```text
- script pour demarrer le projet localement
- script pour nettoyer les anciens builds
- script pour faire backup de la base de donnees
```

Livrable :

```text
scripts/start-local.sh
scripts/backup-db.sh
```

