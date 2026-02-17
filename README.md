# infoline-frontend

Application web Angular — ECF DevOps (Studi).

Servie par Nginx dans un conteneur Docker déployé sur Amazon EKS via un pipeline
GitHub Actions qui build, teste, publie l'image sur ECR et déploie sur le cluster.

## Stack technique

| Composant       | Technologie                              |
|-----------------|------------------------------------------|
| Framework       | Angular 19 (standalone components)       |
| Tests           | Vitest                                   |
| Serveur web     | Nginx Alpine                             |
| Container       | Docker — build multi-stage               |
| Registry        | Amazon ECR                               |
| Déploiement     | Amazon EKS (namespace infoline-frontend) |
| CI/CD           | GitHub Actions                           |

## Structure du projet

```
infoline-frontend/
├── src/
│   ├── app/
│   │   ├── app.ts          # Composant racine (standalone)
│   │   ├── app.config.ts   # Configuration Angular
│   │   └── app.spec.ts     # Tests Vitest
│   ├── index.html
│   ├── main.ts             # Bootstrap de l'application
│   └── styles.css
├── k8s/
│   ├── deployment.yaml     # Deployment EKS (1 replica, probes Nginx)
│   ├── service.yaml        # Service ClusterIP (port 80)
│   └── configmap.yaml      # Variables d'environnement
├── Dockerfile              # Build multi-stage Node.js → Nginx Alpine
├── nginx.conf              # Routing SPA + cache assets statiques
└── .github/
    └── workflows/
        └── ci-cd.yml       # Pipeline GitHub Actions (build → test → ECR → EKS)
```

## Développement local

### Prérequis

- Node.js 20 LTS
- npm

### Démarrage

```bash
npm install
npm start
# Application disponible sur http://localhost:4200
```

`ng` n'étant pas installé globalement, utiliser `npm start` (alias `ng serve`)
ou `npx ng` pour les autres commandes Angular CLI.

### Tests

```bash
npm test
```

### Build de production

```bash
npm run build
# Fichiers générés dans dist/infoline-app/browser/
```

### Build Docker

```bash
docker build -t infoline-frontend:latest .
docker run -p 80:80 infoline-frontend:latest
# Application disponible sur http://localhost:80
```

L'image utilise un build multi-stage (Node.js → Nginx Alpine).
Les fichiers Angular buildés sont servis par Nginx avec routing SPA
et cache navigateur d'un an sur les assets statiques.

## Pipeline CI/CD

Le pipeline `.github/workflows/ci-cd.yml` se déclenche sur push vers `develop` et `main`.

| Job               | Déclencheur     | Action                                    |
|-------------------|-----------------|-------------------------------------------|
| build-test        | Toutes branches | `npm ci` + `npm test` + `npm run build`   |
| docker-build-push | develop / main  | Build image + push ECR (tag SHA commit)   |
| deploy            | develop / main  | `kubectl apply k8s/` + redémarrage pods   |

### Secrets GitHub requis

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

## Déploiement manuel sur EKS

```bash
# Configurer kubectl
aws eks update-kubeconfig --region eu-west-3 --name infoline-eks-cluster

# Déployer
kubectl apply -f k8s/

# Vérifier
kubectl get pods -n infoline-frontend
kubectl get svc -n infoline-frontend
```

## Workflow Git

- `main` — branche stable
- `develop` — développement actif
- `feature/*` — fonctionnalités en cours

## Auteur

Loïc KERGOAT — Promotion THERY  