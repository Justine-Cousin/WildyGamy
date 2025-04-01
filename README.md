# Wildy Gamy 🎮

</p>

<p align="center">
  <a href="#à-propos">À propos</a> •
  <a href="#fonctionnalités">Fonctionnalités</a> •
  <a href="#technologies">Technologies</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#installation">Installation</a> •
  <a href="#utilisation">Utilisation</a> •
  <a href="#tests">Tests</a> •
  <a href="#sécurité">Sécurité</a> •
  <a href="#contributeurs">Contributeurs</a>
</p>

## À propos

Wildy Gamy est une application web pour une salle d'arcade, offrant une passerelle entre l'expérience numérique et physique. Le site permet aux utilisateurs de découvrir les jeux disponibles dans la salle d'arcade, de tester un jeu en ligne, d'accumuler des points et de les échanger contre des récompenses.

## Fonctionnalités

### 👤 Visiteurs (non connectés)
- 🎲 Consultation de la liste des jeux disponibles dans la salle d'arcade
- 🔍 Recherche de jeux spécifiques
- 🏆 Consultation de la liste des récompenses disponibles
- 📝 Création de compte utilisateur
- 📍 Consultation des informations pratiques (adresse et coordonnées)
- 📧 Contact avec l'administrateur

### 🎯 Utilisateurs connectés
- 🎮 Test d'un jeu en ligne pour gagner des points
- 👤 Gestion du profil (visualisation et modification des informations personnelles)
- ❤️ Ajout de jeux aux favoris
- 💰 Échange de points contre des récompenses
- 📊 Consultation des scores et des classements

### ⚙️ Administrateurs
- 🎲 Gestion des jeux (ajout, modification, suppression)
- 🏆 Gestion des lots (ajout, modification, suppression)
- 👥 Modération des utilisateurs (bannissement, droits d'administration)

## Technologies

### 🖥️ Front-end
- ⚛️ React.js avec Vite
- 📘 TypeScript
- 🧭 React Router
- 🔔 React Toastify
- 🎨 CSS

### 🔧 Back-end
- 🟩 Node.js
- ⚡ Express.js
- 🗄️ MySQL
- 📘 TypeScript

### 🔒 Sécurité
- 🔐 Argon2 pour le hachage des mots de passe
- 🎟️ JWT pour l'authentification
- 🛡️ Protection contre les injections SQL
- ✅ Validation des entrées utilisateur

## Architecture

Le projet suit une architecture monorepo avec la structure React-Express-MySQL. Cette architecture permet de gérer le frontend et le backend dans un seul dépôt git.

### Structure des dossiers
```
wildy-gamy/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   └── ...
├── backend/
│   ├── src/
│   │   ├── actions/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── repositories/
│   │   └── routes/
│   └── ...
└── ...
```

## Installation

### Prérequis
- Node.js (v16 ou supérieur)
- npm
- MySQL

### Étapes d'installation

1. **Clonez le dépôt**
```bash
git clone https://github.com/votre-username/wildy-gamy.git
cd wildy-gamy
```

2. **Installer les dépendances**
```bash
# Installation des dépendances du projet
npm install

# Installation des dépendances du frontend
cd frontend
npm install

# Installation des dépendances du backend
cd ../backend
npm install
```

3. **Configuration de la base de données**
```bash
# Importez le fichier schema.sql dans votre base de données MySQL
```

4. **Configuration des variables d'environnement**
```bash
# Créez un fichier .env dans le dossier backend
touch backend/.env

# Ajoutez les variables suivantes
DB_HOST=localhost
DB_PORT=3306
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
DB_NAME=wildy_gamy
JWT_SECRET=votre_cle_secrete
CLOUDINARY_CLOUD_NAME=votre_nom_cloudinary
CLOUDINARY_API_KEY=votre_cle_api_cloudinary
CLOUDINARY_API_SECRET=votre_secret_api_cloudinary
```

5. **Lancement du projet**
```bash
# Depuis la racine du projet
npm run dev
```

## Utilisation

### 👤 Utilisateurs
1. Créez un compte en accédant à la page d'inscription
2. Naviguez dans la liste des jeux et ajoutez vos favoris
3. Testez le jeu en ligne pour gagner des points
4. Échangez vos points contre des récompenses dans la section "Récompenses"

### ⚙️ Administrateurs
1. Connectez-vous avec un compte administrateur
2. Accédez au panneau d'administration via le menu
3. Gérez les jeux, les lots et les utilisateurs depuis les sections correspondantes

## Tests

Le projet inclut des tests unitaires pour les principales fonctionnalités. Pour exécuter les tests :

```bash
# Tests backend
cd backend
npm test

# Tests frontend
cd frontend
npm test
```

## Sécurité

L'application intègre plusieurs mesures de sécurité :
- 🔐 Hachage des mots de passe avec Argon2
- 🎟️ Authentification par JWT
- 🛡️ Requêtes paramétrées pour prévenir les injections SQL
- ✅ Validation des entrées utilisateur côté client et serveur
- 🔒 Contrôle d'accès basé sur les rôles

## Contributeurs

<table>
  <tr>
    <td align="center">
        <sub><b>Justine Cousin</b></sub>
      </a>
    </td>
    <td align="center">
        <sub><b>Charlotte</b></sub>
      </a>
    </td>
    <td align="center">
        <sub><b>Abdou</b></sub>
      </a>
    </td>
    <td align="center">
        <sub><b>Florentin</b></sub>
      </a>
    </td>
  </tr>
</table>

## Licence

Ce projet est sous licence MIT.