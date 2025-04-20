import { Routes } from '@angular/router';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { MuralComponent } from './pages/mural/mural.component';

export const routes: Routes = [
  { path: '', redirectTo: '/mural', pathMatch: 'full' }, // Redireciona para /mural
  { path: 'mural', component: MuralComponent },
  { path: 'formulario', component: FormularioComponent }
];