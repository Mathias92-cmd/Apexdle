import { Component } from '@angular/core';
import { LegendsComponent } from './components/legends/legends.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LegendsComponent],
  template: `<h1></h1><app-legends></app-legends>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
