import { Component } from '@angular/core';
import { LayoutsModule } from '../layouts/layouts.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LayoutsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
