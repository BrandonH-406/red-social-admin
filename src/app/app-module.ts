import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormsModule } from '@angular/forms';
import { Bienvenida } from './bienvenida/bienvenida';
import { Login } from './login/login';

import { provideHttpClient } from '@angular/common/http';
import { Usuarios } from './usuarios/usuarios';
import { Dashboard } from './dashboard/dashboard';
import { Perfil } from './perfil/perfil';
import { Contenido } from './contenido/contenido';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [App, Bienvenida, Login, Usuarios, Dashboard, Perfil, Contenido],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule
  ],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
