import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <div style="margin-top: 30px; padding: 20px; background-color: #f0f0f0; border-radius: 8px; display: inline-block;">
        <h2>Application Info</h2>
        <p><strong>Version:</strong> {{ version }}</p>
        <p><strong>Status:</strong> <span style="color: green;">{{ status }}</span></p>
        <p><strong>Timestamp:</strong> {{ timestamp }}</p>
      </div>
    </div>
  `,
  styles: []
})
export class App {
  title = 'Hello World from InfoLine Frontend!';
  description = 'Application Angular - Projet ECF Administrateur Système DevOps';
  version = '1.0.0';
  status = 'Running';
  timestamp = new Date().toLocaleString();
}
