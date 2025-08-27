# 🌐 ONDA Web Platform – DevSecOps Project  

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/AnoirELGUEDDAR/onda-website/actions)  
[![Docker](https://img.shields.io/badge/docker-ready-blue.svg)](https://hub.docker.com/u/anoiraeg2003)  
[![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](LICENSE)  

---

## 📖 Description  

Ce projet consiste en la **conception et le déploiement** d’un site web institutionnel pour l’**Office National des Aéroports (ONDA)**, afin de moderniser la présentation des aéroports du Maroc et améliorer l’accès à l’information pour les usagers.  

Le site offre :  
- Gestion multilingue (🇫🇷 🇬🇧 🇲🇦 🇪🇸)  
- Chatbot d’assistance ✈️  
- Affichage météo en temps réel ☁️  
- Fiches détaillées pour chaque aéroport 🛬  
- Formulaire de contact & réclamations 📩  
- Espace enrichi dédié à **Marrakech Menara (RAK)**  

---

## 🏗️ Architecture  

L’application repose sur une architecture **3-tiers** :  

- **Frontend** : React + Nginx  
- **Backend** : Spring Boot (Maven)  
- **Base de données** : MySQL 8  
- **CI/CD & DevSecOps** : GitHub → Jenkins → SonarQube → Docker → Trivy/Syft → Cosign → Kubernetes  
- **Monitoring** : Prometheus, Grafana, Alertmanager  

📌 Déploiement sur **Kubernetes** avec namespace `onda-app`.  

---

## 🚀 Pipeline CI/CD  

Le pipeline Jenkins assure :  
1. Compilation (Maven + Node.js)  
2. Tests & analyse qualité (SonarQube)  
3. Conteneurisation (Docker, Docker Hub)  
4. Sécurité (Syft – SBOM, Trivy – vulnérabilités, Cosign – signature)  
5. Déploiement Kubernetes automatisé (kubectl + Ansible)  
6. Supervision (Prometheus + Grafana)  

![Pipeline CI/CD](docs/jenkins_pipeline.png)  

---

## 🛠️ Installation & Déploiement  

### 1. Prérequis  
- 🐳 Docker & Docker Hub  
- ☸️ Kubernetes cluster (Minikube ou autre)  
- ⚙️ Jenkins avec agents Kubernetes  
- 📦 Helm  

---

### 2. Build & Push des images  
```bash
# Backend
cd backend
mvn clean package -DskipTests
docker build -t anoiraeg2003/spring-backend:latest .
docker push anoiraeg2003/spring-backend:latest

# Frontend
cd ../frontend
npm install && npm run build
docker build -t anoiraeg2003/react-frontend:latest .
docker push anoiraeg2003/react-frontend:latest
