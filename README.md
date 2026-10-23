# SpeedXcar

SpeedXcar est une application web de location de voitures composée d'un frontend Angular et d'une API REST Spring Boot.

Le projet permet actuellement de consulter un catalogue de véhicules, de créer un compte, de se connecter avec un jeton JWT et d'administrer les voitures. Le module de réservation est prévu dans la prochaine phase de développement.

## Fonctionnalités

### Visiteur

- Parcours d'onboarding
- Consultation de la page d'accueil
- Consultation du catalogue des véhicules disponibles
- Filtrage des véhicules par catégorie
- Consultation de la fiche détaillée d'un véhicule
- Inscription et connexion

### Administrateur

- Consultation de tous les véhicules
- Ajout d'un véhicule
- Modification d'un véhicule
- Suppression d'un véhicule
- Gestion de la disponibilité d'un véhicule

### En cours de développement

- Création d'une réservation
- Vérification de la disponibilité selon les dates
- Calcul du montant total
- Espace « Mes réservations »
- Gestion des réservations par l'administrateur
- Annulation et confirmation des réservations

## Technologies utilisées

### Frontend

- Angular 22
- TypeScript 6
- RxJS
- Reactive Forms
- Vitest

### Backend

- Java 21 ou version compatible
- Spring Boot 4
- Spring Web / API REST
- Spring Data JPA
- Spring Security
- JWT avec JJWT
- Bean Validation
- Lombok

### Base de données

- MySQL
- Hibernate

## Architecture

```text
Navigateur
    |
    v
Angular - localhost:4200
    |
    | API REST / JSON
    v
Spring Boot - localhost:8080
    |
    | JPA / Hibernate
    v
MySQL - localhost:3306
```

## Structure du projet

```text
SpeedXcar-workspace/
|-- frontend-location/       # Application Angular
|   |-- public/assets/       # Images et ressources statiques
|   `-- src/app/
|       |-- core/services/   # Services HTTP et authentification
|       |-- data/            # Données de démonstration
|       |-- features/
|       |   |-- admin/       # Gestion des véhicules
|       |   |-- auth/        # Connexion et inscription
|       |   |-- onboarding/  # Écrans d'introduction
|       |   `-- public/      # Accueil, catalogue et détails
|       `-- models/          # Modèles TypeScript
|
|-- speedXcar/               # API Spring Boot
|   `-- src/main/
|       |-- java/speedcar/backend/
|       |   |-- auth/        # Authentification
|       |   |-- car/         # Gestion des véhicules
|       |   |-- config/      # Sécurité et initialisation
|       |   |-- exceptions/  # Gestion des erreurs
|       |   |-- home/        # Données de la page d'accueil
|       |   |-- security/    # JWT
|       |   `-- user/        # Utilisateurs et rôles
|       `-- resources/
|           `-- application.properties
|
|-- devops-cycle-course/     # Documentation DevOps
`-- docker-compose.yml       # Réservé à la future configuration Docker
```

## Prérequis

Installez les outils suivants :

- Node.js compatible avec Angular 22
- npm
- Java 21 ou une version compatible avec le projet
- MySQL 8 ou supérieur
- Git

Le frontend utilise la version de npm déclarée dans `frontend-location/package.json`.

## Installation

### 1. Cloner le dépôt

```bash
git clone <URL_DU_DEPOT>
cd SpeedXcar-workspace
```

### 2. Préparer MySQL

Démarrez MySQL sur le port `3306`.

La configuration actuelle utilise :

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/speedxcar_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=
```

La base `speedxcar_db` est créée automatiquement si l'utilisateur MySQL possède les permissions nécessaires.

Si votre configuration MySQL est différente, adaptez le fichier :

```text
speedXcar/src/main/resources/application.properties
```

> La configuration actuelle est destinée au développement local. Pour la production, utilisez des variables d'environnement et ne stockez jamais les secrets dans Git.

### 3. Lancer le backend

Sous Windows PowerShell :

```powershell
cd speedXcar
.\mvnw.cmd spring-boot:run
```

Sous Linux ou macOS :

```bash
cd speedXcar
chmod +x mvnw
./mvnw spring-boot:run
```

L'API est ensuite disponible sur :

```text
http://localhost:8080
```

Au premier démarrage, des véhicules de démonstration sont insérés dans la base de données.

### 4. Lancer le frontend

Dans un autre terminal :

```bash
cd frontend-location
npm install
npm start
```

Ouvrez ensuite :

```text
http://localhost:4200
```

## Authentification

L'inscription crée toujours un utilisateur avec le rôle `USER`.

Après une connexion réussie, le frontend conserve les informations suivantes dans le `localStorage` :

- `token`
- `name`
- `email`
- `role`

Les opérations administrateur nécessitent l'en-tête HTTP suivant :

```http
Authorization: Bearer <JWT>
```

### Créer un administrateur pour le développement

1. Créez un compte depuis l'écran d'inscription.
2. Connectez-vous à MySQL.
3. Attribuez le rôle `ADMIN` au compte :

```sql
USE speedxcar_db;

UPDATE users
SET role = 'ADMIN'
WHERE email = 'admin@example.com';
```

Déconnectez-vous puis reconnectez-vous afin d'obtenir un nouveau jeton contenant le rôle administrateur.

L'espace d'administration est disponible sur :

```text
http://localhost:4200/admin/cars
```

## API REST

### Authentification

| Méthode | Endpoint | Accès | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Créer un compte |
| `POST` | `/api/auth/login` | Public | Se connecter et recevoir un JWT |

Exemple d'inscription :

```json
{
  "nom": "Utilisateur SpeedXcar",
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Catalogue public

| Méthode | Endpoint | Accès | Description |
|---|---|---|---|
| `GET` | `/api/home` | Public | Charger les données de l'accueil |
| `GET` | `/api/cars` | Public | Lister les véhicules disponibles |
| `GET` | `/api/cars/{id}` | Public | Consulter un véhicule disponible |
| `GET` | `/api/cars/featured?limit=6` | Public | Lister les véhicules mis en avant |
| `GET` | `/api/cars/categories` | Public | Lister les catégories disponibles |

### Administration des véhicules

Ces routes nécessitent un JWT possédant le rôle `ADMIN`.

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/cars` | Lister tous les véhicules |
| `GET` | `/api/admin/cars/{id}` | Consulter un véhicule |
| `POST` | `/api/admin/cars` | Ajouter un véhicule |
| `PUT` | `/api/admin/cars/{id}` | Modifier un véhicule |
| `DELETE` | `/api/admin/cars/{id}` | Supprimer un véhicule |

Exemple de véhicule :

```json
{
  "brand": "BMW",
  "model": "M4 Competition",
  "category": "Sport",
  "pricePerDay": "850",
  "gearBox": "Automat",
  "fuel": "Petrol",
  "doors": 2,
  "seats": 4,
  "imageUrl": "/assets/images/cars/SPORT/sport1.png",
  "available": true
}
```

## Commandes utiles

### Frontend

```bash
cd frontend-location

# Serveur de développement
npm start

# Build de production
npm run build

# Tests unitaires
npm test -- --watch=false
```

### Backend

Sous Windows :

```powershell
cd speedXcar

# Lancer l'application
.\mvnw.cmd spring-boot:run

# Exécuter les tests
.\mvnw.cmd test

# Générer le fichier JAR
.\mvnw.cmd clean package
```

Sous Linux ou macOS, remplacez `.\mvnw.cmd` par `./mvnw`.

## État des tests

- Le build Angular fonctionne.
- Les tests frontend existants couvrent principalement la création des composants et services.
- Le backend possède actuellement un test de chargement du contexte Spring.
- Il n'existe pas encore de tests end-to-end.

Les prochaines améliorations devraient ajouter :

- Des tests HTTP des services Angular
- Des tests des formulaires de connexion et d'inscription
- Des tests unitaires des services Spring
- Des tests d'intégration des contrôleurs REST
- Des tests des règles de disponibilité et de chevauchement des réservations

## Limites actuelles

- Le bouton de réservation ne crée pas encore de réservation en base.
- Les routes administrateur ne possèdent pas encore de guard Angular.
- Les URL de l'API et la configuration CORS sont limitées à l'environnement local.
- Le secret JWT et les paramètres MySQL doivent être externalisés avant un déploiement.
- Le prix journalier est encore représenté par une chaîne de caractères.
- `docker-compose.yml` n'est pas encore configuré.
- Les pages publiques utilisent des données de démonstration si le backend ne répond pas.

## Feuille de route

1. Ajouter le modèle et l'API de réservation.
2. Vérifier les périodes de disponibilité des véhicules.
3. Ajouter les pages « Réserver » et « Mes réservations ».
4. Ajouter la gestion admin des réservations.
5. Ajouter les guards Angular et un interceptor JWT.
6. Externaliser les paramètres avec des profils Spring et des variables d'environnement.
7. Ajouter Flyway pour gérer les migrations de base de données.
8. Compléter les tests frontend, backend et end-to-end.
9. Configurer Docker Compose pour MySQL, le backend et le frontend.
10. Préparer le déploiement et l'intégration continue.

## Sécurité avant mise en production

Avant tout déploiement public :

- Remplacez le secret JWT actuel.
- Chargez les secrets depuis des variables d'environnement.
- Utilisez un utilisateur MySQL dédié avec un mot de passe fort.
- Configurez précisément les origines CORS autorisées.
- Ajoutez une politique d'expiration et de renouvellement des sessions.
- Ajoutez une gestion centralisée des erreurs d'authentification.
- Utilisez HTTPS.

## Licence

Aucune licence n'est encore définie pour ce projet.

