import { Component } from '@angular/core';

/**
 * Composant racine de l'application Angular InfoLine Frontend.
 *
 * Rôle dans l'architecture InfoLine :
 * Utilisateur → LoadBalancer AWS (Service K8s) → Pod Nginx
 *             → fichiers Angular buildés → App component
 *
 * standalone: true : composant autonome Angular — pas besoin de NgModule
 * pour le déclarer: cela simplifie l'arborescence.
 * Bootstrappé directement dans main.ts via bootstrapApplication().
 *
 * Version actuelle : page de démonstration validant le déploiement
 * end-to-end (build Angular → image Docker → ECR → EKS → LoadBalancer).
 */
@Component({
  selector: 'app-root',      // Balise HTML pour l'index.html
  standalone: true,          // Composant autonome — pas besoin de NgModule

  // Template inline : adapté pour un composant de démonstration simple.
  // Pour une application plus complexe, il faudrait un templateUrl pointant
  // vers un fichier HTML séparé.
  template: `
    <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>

      <!-- Carte d'informations applicatives — validée lors des tests E2E -->
      <div style="margin-top: 30px; padding: 20px; background-color: #f0f0f0;
                  border-radius: 8px; display: inline-block;">
        <h2>Application Info</h2>
        <p><strong>Version:</strong> {{ version }}</p>
        <p><strong>Status:</strong> <span style="color: green;">{{ status }}</span></p>
        <p><strong>Timestamp:</strong> {{ timestamp }}</p>
      </div>
    </div>
  `,
  styles: []  // Styles déportés dans styles.css (global) — aucun style encapsulé ici
})
export class App {

  /** Titre principal affiché dans le <h1> */
  title = 'Hello World from InfoLine Frontend!';

  /** Description du projet */
  description = 'Application Angular - Projet ECF Administrateur Système DevOps';

  /** Version du frontend */
  version = '1.0.0';

  /** Statut affiché en vert — indique que l'application est opérationnelle */
  status = 'Running';

  /**
   * Horodatage de chargement de la page — généré côté client au moment
   * où le composant est instancié par Angular.
   * toLocaleString() : format adapté à la locale du navigateur.
   */
  timestamp = new Date().toLocaleString();
}