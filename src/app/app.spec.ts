import { TestBed } from '@angular/core/testing';
import { App } from './app';

/**
 * Tests unitaires du composant racine App.
 *
 * Utilise le framework de test Angular (TestBed) avec Vitest comme runner
 * (configuré dans tsconfig.spec.json et angular.json).
 * Il sont éxécutés automatiquement par le pipeline GitHub Actions avant le build
 * de l'image Docker — un échec bloque complètement le déploiement sur EKS.
 *
 * TestBed : environnement de test Angular qui simule le module d'application
 * et permet d'instancier les composants sans démarrer un vrai navigateur (pratique).
 */
describe('App', () => {

  /**
   * Configuration du module de test avant chaque test.
   * imports: [App] : composant standalone importé directement
   * (pas besoin de NgModule — architecture Angular).
   * compileComponents() : compile les templates et styles du composant.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  /**
   * Vérifie que le composant s'instancie sans erreur.
   * Le test doit garantir que les dépendances et le template
   * sont correctement configurés.
   */
  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  /**
   * Vérifie que le titre est correctement rendu dans le Document Object Model (DOM)
   * whenStable() : attend que les opérations Angular soient terminées avant d'inspecter le DOM.
   * querySelector('h1') : ne sélectionne que le premier élément <h1> du template.
   */
  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent)
      .toContain('Hello World from InfoLine Frontend!');
  });

  /**
   * Vérifie la valeur de la propriété version du composant.
   * Test de régression — détecte tout changement involontaire de version
   * sans rebuild complet de l'application.
   */
  it('should have correct version', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.version).toBe('1.0.0');
  });

  /**
   * Vérifie que le statut initial du composant est "Running".
   * Garantit que l'indicateur de statut affiché en vert dans l'UI
   * est correctement initialisé au chargement de la page.
   */
  it('should have running status', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.status).toBe('Running');
  });
});