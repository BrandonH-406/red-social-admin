import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  stats = { usuarios: 0, publicaciones: 0, reacciones: 0 };
  Nomegusta: number = 0;
  Megusta: number = 0;

  TipoM: String = 'M';
  TipoN: String = 'N';

  readonly http: HttpClient;
  constructor(http: HttpClient) {
    let usuario: any = localStorage.getItem('administrador');
    this.http = http;
    if (usuario) {
      this.ConteoUsuarios();
      this.ConteoPublicaciones();
      this.ConteoReacciones();
      this.ConteoMegusta();
      this.ConteoNOMegusta();
    } else {
      location.href = '';
    }
  }

  servicioConteoUsuarios(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/usuario/totalusuarios');
  }

  ConteoUsuarios() {
    this.servicioConteoUsuarios().subscribe((data) => (this.stats.usuarios = data));
  }

  servicioConteoPublicaciones(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/publicacion/totalpublicaciones');
  }

  ConteoPublicaciones() {
    this.servicioConteoPublicaciones().subscribe((data) => (this.stats.publicaciones = data));
  }

  servicioConteoReacciones(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/reaccion/totalreacciones');
  }

  ConteoReacciones() {
    this.servicioConteoReacciones().subscribe((data) => (this.stats.reacciones = data));
  }

  servicioConteoMegusta(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/reaccion/Megusta/' + this.TipoM);
  }

  ConteoMegusta() {
    this.servicioConteoMegusta().subscribe((data) => (this.Megusta = data));
  }

  servicioConteoNOMegusta(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/reaccion/NoMegusta/' + this.TipoN);
  }

  ConteoNOMegusta() {
    this.servicioConteoNOMegusta().subscribe((data) => (this.Nomegusta = data));
  }
}
