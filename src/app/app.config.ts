import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

/**
 * Configuration globale de l'application Angular InfoLine Frontend.
 *
 * appConfig est passé à bootstrapApplication() dans le main.ts pour initialiser
 * l'application avec les providers nécessaires.
 *
 * Les providers déclarés ici sont disponibles dans toute l'application
 * sans avoir à les redéclarer dans chaque composant.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // provideBrowserGlobalErrorListeners : intercepte les erreurs JavaScript
    // non gérées (uncaught exceptions, unhandled promise rejections) au niveau
    // du navigateur et les reporte dans le système d'erreurs Angular.
    //
    // Utile pour le debugging et la remontée d'erreurs vers des outils
    // de monitoring (intégration future avec Kibana via logs Nginx par exemple).
    provideBrowserGlobalErrorListeners(),
  ]
};