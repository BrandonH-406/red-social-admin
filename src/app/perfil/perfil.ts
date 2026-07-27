import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil implements OnInit {
  readonly http: HttpClient;

  usuario: any = {};
  comentario: any = {};
  publicacion: any = {};
  userId!: number;
  CantidadP: number = 0;
  CantidadR: number = 0;
  CantidadC: number = 0;
  Publicacionlista: any = [];
  verComentarios: boolean = false;
  Comentarios: any = [];
  reacciones: any = [];

  constructor(http: HttpClient, private route: ActivatedRoute) {
    this.http = http;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idString = params.get('id');
      if (idString) {
        this.userId = +idString;
        this.cargarDatosDeUsuario(this.userId);
        this.Cantidaddepublicaciones(this.userId);
        this.CantidaddeReacciones(this.userId);
        this.CantidaddeComentarios(this.userId);
        this.buscarPublicacion(this.userId);
        this.buscarComentarios();
        this.buscarReacciones();
      }
    });
  }

  servicioBuscarUsuarios(id: number): Observable<any> {
    return this.http.get<any>('http://localhost:8080/usuario/buscarporid/' + id);
  }

  cargarDatosDeUsuario(id: number): void {
    this.servicioBuscarUsuarios(id).subscribe((data) => {
      if (data && data.length > 0) {
        this.usuario = data[0];
        console.log('Datos de usuario cargados:', this.usuario);
      } else {
        this.usuario = data;
      }
    });
  }

  Cantidaddepublicaciones(id: number) {
    this.http.get<number>('http://localhost:8080/publicacion/cantidad/' + id).subscribe((data) => {
      this.CantidadP = data;
      console.log('Cantidad de publicaciones:', this.CantidadP);
    });
  }

  CantidaddeReacciones(id: number) {
    this.http
      .get<number>('http://localhost:8080/reaccion/cantidadporusuario/' + id)
      .subscribe((data) => {
        this.CantidadR = data;
        console.log('Cantidad de reacciones:', this.CantidadR);
      });
  }

  CantidaddeComentarios(id: number) {
    this.http.get<number>('http://localhost:8080/comentario/cantidad/' + id).subscribe((data) => {
      this.CantidadC = data;
      console.log('Cantidad de comentarios:', this.CantidadC);
    });
  }

  servicioBuscarPublicacion(id: number): Observable<any> {
    return this.http.get<any>('http://localhost:8080/publicacion/buscarporid/' + id);
  }

  buscarPublicacion(id: number) {
    this.servicioBuscarPublicacion(id).subscribe((data) => (this.Publicacionlista = data));
  }

  servicioBuscarReacciones(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/reaccion/porusuario/' + this.userId);
  }

  buscarReacciones() {
    this.servicioBuscarReacciones().subscribe((data) => (this.reacciones = data));
  }

  VerComentarios() {
    this.verComentarios = !this.verComentarios;
  }

  servicioBuscarComentarios(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/comentario/buscar');
  }

  buscarComentarios() {
    this.servicioBuscarComentarios().subscribe((data) => (this.Comentarios = data));
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
    this.buscarPublicacion(this.userId);
    this.Cantidaddepublicaciones(this.userId);
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
      this.buscarComentarios();
      this.CantidaddeComentarios(this.userId);
    }
  }

  EliminarReacciones(id: number) {
    this.http
      .delete('http://localhost:8080/reaccion/EliminarReaccion/' + id)
      .subscribe((data) => this.finalizarDeleteReacciones(data));
  }

  finalizarDeleteReacciones(data: any) {
    if (data) {
      this.CantidaddeReacciones(this.userId);
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
    this.buscarPublicacion(this.userId);
    this.servicioBuscarComentarios();
    this.CantidaddeComentarios(this.userId);
    this.buscarComentarios();
    alert('Comentario Eliminado');
  }

  EliminarR(r: any) {
    const idr: number = r.idReaccion;
    this.http
      .delete('http://localhost:8080/reaccion/eliminar/' + idr)
      .subscribe((data) => this.finaldeleteindividualr(data));
  }

  finaldeleteindividualr(data: any) {
    console.log(data);
    this.buscarPublicacion(this.userId);
    this.buscarReacciones();
    this.CantidaddeReacciones(this.userId);
    this.CantidaddeComentarios(this.userId);
    alert("Reaccion eliminada");
  }
}
