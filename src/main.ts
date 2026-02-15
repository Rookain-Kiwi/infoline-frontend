import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

/**
 * Point d'entrée de l'application Angular InfoLine Frontend.
 *
 * bootstrapApplication() : initialise l'application Angular en mode standalone
 * Angular sans NgModule.
 *
 * Séquence d'initialisation :
 *   1. Angular charge les providers définis dans appConfig
 *   2. Le composant App est monté sur la balise <app-root> de l'index.html
 *   3. Le change detection cycle démarre et le template est rendu dans le DOM
 *
 * Ce fichier est le point d'entrée webpack/esbuild défini dans angular.json.
 */
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
  // Capture les erreurs d'initialisation et les affiche dans la console du navigateur.
  // En production, remplacer par un service de reporting d'erreurs.