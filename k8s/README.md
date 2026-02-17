# k8s/

Manifests Kubernetes du frontend InfoLine — déployés dans le namespace `infoline-frontend`.

## Contenu

| Fichier            | Description                                                         |
|--------------------|---------------------------------------------------------------------|
| `deployment.yaml`  | Deployment 1 replica, probes liveness/readiness, limites ressources |
| `service.yaml`     | ClusterIP port 80 → containerPort 80 (Nginx)                        |
| `configmap.yaml`   | Variables non sensibles (APPLICATION_NAME, LOG_LEVEL, ENVIRONMENT)  |

## Ressources allouées

| Paramètre         | Requests  | Limits    |
|-------------------|-----------|-----------|
| Mémoire           | 64Mi      | 128Mi     |
| CPU               | 50m       | 200m      |

Nginx est nettement moins gourmand que la JVM Spring Boot — les ressources
sont dimensionnées en conséquence pour libérer de la capacité sur le node
pour Elasticsearch et le backend.

## Probes Kubernetes

| Probe      | Délai initial | Endpoint  | Rôle                                      |
|------------|---------------|-----------|-------------------------------------------|
| Liveness   | 10s           | /         | Redémarre le pod si Nginx ne répond plus  |
| Readiness  | 5s            | /         | Retire le pod du Service si non prêt      |

Délais courts : Nginx démarre en moins d'une seconde, pas d'overhead JVM.

## Déploiement

```bash
# Appliquer les manifests
kubectl apply -f k8s/

# Vérifier l'état des pods
kubectl get pods -n infoline-frontend

# Consulter les logs Nginx
kubectl logs -n infoline-frontend -l app=infoline-frontend

# Accès local à l'application (pour démonstration ECF)
kubectl port-forward svc/infoline-frontend-service 4200:80 -n infoline-frontend
# Ouvrir http://localhost:4200
```

## Notes

Le pipeline CI/CD (`ci-cd.yml`) gère le déploiement automatiquement sur push
vers `develop` et `main`. Ce dossier est utilisé manuellement uniquement en cas
de débogage ou de re-déploiement après un `startup-infra.sh`.

Le routing Angular SPA est géré par `nginx.conf` (`try_files $uri $uri/ /index.html`) —
sans cette configuration, les routes Angular autres que `/` retourneraient HTTP 404.