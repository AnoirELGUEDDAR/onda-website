# 🛫 ONDA Institutional Website – DevSecOps Project  

## 📖 Description  
Ce projet consiste en la **conception et le déploiement d’un site web institutionnel** pour l’Office National des Aéroports (ONDA), visant à moderniser la présentation des aéroports marocains et à améliorer l’accès à l’information pour les usagers.  

Le site inclut :  
- 🌍 Gestion multilingue (Français, Anglais, Arabe, Espagnol)  
- 🤖 Chatbot intelligent d’assistance  
- ☁️ Affichage des conditions météorologiques en temps réel  
- 🛬 Fiches détaillées pour chaque aéroport  
- 📑 FAQ et espace réclamations/contact  
- 🏢 Espace enrichi pour l’aéroport Marrakech (RAK)  

---

## ⚙️ Architecture  
L’architecture repose sur une organisation en trois couches :  

- **Frontend** : React (avec Nginx)  
- **Backend** : Spring Boot (Maven, Java 17)  
- **Base de données** : MySQL 8  
- **Infrastructure** : Kubernetes (déploiement automatisé via Jenkins & Ansible)  
- **Sécurité & Observabilité** : Prometheus, Grafana, Alertmanager, Syft, Trivy, Cosign  

![Architecture](docs/architecture.png) <!-- Ajoute ton image ici -->  

---

## 🚀 Pipeline DevSecOps  
Mise en place d’un **pipeline CI/CD automatisé avec Jenkins** :  
1. **Build & Tests** (Maven pour backend, Node.js pour frontend)  
2. **Analyse qualité** avec SonarQube  
3. **Containerisation** avec Docker & push vers Docker Hub  
4. **Sécurité**  
   - Syft → SBOM (Software Bill of Materials)  
   - Trivy → Scan vulnérabilités  
   - Cosign → Signature des images  
5. **Déploiement** automatisé sur Kubernetes  
6. **Monitoring** avec Prometheus, Grafana & Alertmanager  

![Pipeline](docs/pipeline.png)  

---

## 📊 Supervision et Observabilité  
- **Prometheus** : collecte des métriques du backend Spring Boot (`/actuator/prometheus`)  
- **Alertmanager** : envoi d’alertes (mail, Slack)  
- **Grafana** : dashboards pour suivre :  
  - l’état global du cluster Kubernetes  
  - l’utilisation CPU/mémoire des nœuds  
  - les métriques applicatives (latence, erreurs HTTP, mémoire JVM)  

![Grafana Dashboard](docs/grafana.png)  

---

## 🔐 Sécurité & Conformité  
- **Syft** → Génération de SBOM (inventaire complet des dépendances)  
- **Trivy** → Détection de vulnérabilités et mauvaises configurations  
- **Cosign** → Signature & vérification des images Docker  
- **Secrets Kubernetes** → Gestion sécurisée des identifiants MySQL et Alertmanager  

---

## 🗂️ Structure du projet  
```bash
📦 onda-website
 ┣ 📂 backend       # Spring Boot (API REST + sécurité + persistance)
 ┣ 📂 frontend      # React (UI multilingue + chatbot + météo)
 ┣ 📂 k8s           # Manifests Kubernetes (deployments, services, secrets)
 ┣ 📂 jenkins       # Pipeline Jenkinsfile
 ┣ 📂 docs          # Diagrammes, rapports, images pour README
 ┗ README.md
