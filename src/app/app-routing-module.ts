import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Bienvenida } from './bienvenida/bienvenida';
import { Login } from './login/login';
import { Usuarios } from './usuarios/usuarios';
import { Dashboard } from './dashboard/dashboard';
import { Perfil } from './perfil/perfil';
import { Contenido } from './contenido/contenido';

const routes: Routes = [
  {path:'',component:Login},
  {path: 'bienvenida',component:Bienvenida},
  {path: 'usuarios',component:Usuarios},
  {path: 'dashboard',component:Dashboard},
  {path: 'contenido', component:Contenido},
  {path: 'perfil/:id', component:Perfil},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }