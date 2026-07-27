import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contenido',
  standalone: false,
  templateUrl: './contenido.html',
  styleUrl: './contenido.scss',
})
export class Contenido {
  readonly http: HttpClient;
  Publicacionlista: any = [];
  PublicacionesPorUsuario: any = [];
  Comentarios: any = [];
  ComentariosPorUsuario: any = [];
  nombre: string = '';
  verComentarios: boolean = false;
  Buscar: boolean = false;

  constructor(http: HttpClient) {
    this.http = http;
    let usuario: any = localStorage.getItem('administrador');

    if (usuario) {
      this.buscarPublicacion();
      this.buscarComentario();
    } else {
      location.href = '';
    }
  }

  servicioBuscarPublicacion(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/publicacion/buscar');
  }

  buscarPublicacion() {
    this.servicioBuscarPublicacion().subscribe((data) => (this.Publicacionlista = data));
  }

  VerComentarios() {
    this.verComentarios = !this.verComentarios;
  }
  servicioBuscarComentario(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/comentario/buscar');
  }

  buscarComentario() {
    this.servicioBuscarComentario().subscribe((data) => (this.Comentarios = data));
  }

  EliminarPublicacion(pub: any) {
    const id = pub.idPublicacion;
    this.http
      .delete('http://localhost:8080/publicacion/eliminar/' + id)
      .subscribe((data) => this.finalizarDelete(data, id));
  }

  finalizarDelete(data: any, id: number) {
    console.log(data);
    this.EliminarComentarios(id);
    this.EliminarReacciones(id);
    this.buscarPublicacion();
    alert('Publlicacion eliminado');
  }

  EliminarComentarios(id: number) {
    this.http
      .delete('http://localhost:8080/comentario/EliminarComentarios/' + id)
      .subscribe((data) => this.finalizarDeleteComentarios(data));
  }

  finalizarDeleteComentarios(data: any) {
    if (data) {
      console.log(data);
      this.buscarComentario();
    }
  }

  EliminarReacciones(id: number) {
    this.http
      .delete('http://localhost:8080/reaccion/EliminarReaccion/' + id)
      .subscribe((data) => this.finalizarDeleteReacciones(data));
  }

  finalizarDeleteReacciones(data: any) {
    if (data) {
      console.log(data);
    }
  }

  EliminarC(c: any) {
    const idC: number = c.idComentario;
    this.http
      .delete('http://localhost:8080/comentario/eliminar/' + idC)
      .subscribe((data) => this.finaldeleteindividual(data));
  }

  finaldeleteindividual(data: any) {
    console.log(data);
    this.buscarPublicacion();
    this.buscarComentario();
    alert('Comentario Eliminado');
  }

  servicioBuscarComentarioporusuario(nombre: String): Observable<any> {
    return this.http.get<any>('http://localhost:8080/comentario/busquedaporusuario/' + nombre);
  }

  buscarComentarioPorUsuario(nombre: String) {
    this.servicioBuscarComentarioporusuario(nombre).subscribe(
      (data) => (this.ComentariosPorUsuario = data)
    );
  }

  BuscarInfo() {
    if (!this.nombre || this.nombre.trim() === '') {
      alert('Ingrese un nombre');
      return;
    }

    // Llamamos a las dos rutas del backend
    this.http
      .get<any>('http://localhost:8080/publicacion/busquedaporusuario/' + this.nombre)
      .subscribe({
        next: (publicaciones) => {
          this.PublicacionesPorUsuario = publicaciones;

          this.http
            .get<any>('http://localhost:8080/comentario/busquedaporusuario/' + this.nombre)
            .subscribe({
              next: (comentarios) => {
                this.ComentariosPorUsuario = comentarios;

                // ✅ Validación simple
                if (
                  (publicaciones && publicaciones.length > 0) ||
                  (comentarios && comentarios.length > 0)
                ) {
                  this.Buscar = true;
                  console.log('✅ Usuario encontrado');
                } else {
                  this.Buscar = false;
                  alert('Usuario no encontrado');
                }
              },
              error: () => {
                this.Buscar = false;
                alert('Usuario no encontrado');
              },
            });
        },
        error: () => {
          this.Buscar = false;
          alert('Usuario no encontrado');
        },
      });
  }

  final() {
    this.Buscar = false;
    this.nombre = '';
    this.ComentariosPorUsuario = [];
    this.PublicacionesPorUsuario = [];
  }
}
