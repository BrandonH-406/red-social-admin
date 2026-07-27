import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios {
  readonly http: HttpClient;

  nombre: string = '';
  estado: string = '';

  usuario: any = {};

  usuarios: any = [];

  constructor(http: HttpClient, private router: Router) {
    this.http = http;
    let usuario: any = localStorage.getItem('administrador');

    if (usuario) {
      this.buscarUsuarios();
    } else {
      location.href = '';
    }
  }

  borrar(){
    this.nombre="";
  }

  irADetallesDeUsuario(userId: number): void {

    this.router.navigate(['/perfil', userId]);
  }

  filtrarUsuario() {
    if (this.nombre !== null) {
      this.http
        .get('http://localhost:8080/usuario/' + this.nombre)
        .subscribe((data) => this.finalizarFiltrado(data));
    }
  }

  finalizarFiltrado(data: any) {
    if (data && data.length > 0) {
      this.usuario = data[0];
      console.log(this.usuario);
    } else {
      alert('No se encontró el usuario');
    }
  }
  guardarUsuario() {
    let form: any = document.getElementById('formulario1');
    if (form.reportValidity()) {
      this.http
        .post('http://localhost:8080/usuario/guardar', this.usuario)
        .subscribe((data) => this.finalizarGuardar(data));
    }
  }

  finalizarGuardar(data: any) {
    if (data) {
      console.log(data);
      alert("Usuario guardado");
      this.usuario = {};
      this.buscarUsuarios();
    }
  }

  servicioBuscarUsuarios(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/usuario/buscar');
  }

  buscarUsuarios() {
    this.servicioBuscarUsuarios().subscribe((data) => (this.usuarios = data));
  }

  modificar(objeto: any) {
    this.usuario = objeto;
  }

  eliminarUsuario() {
    const id = this.usuario.idUsuario;
    let form: any = document.getElementById('formulario1');
    if (form.reportValidity()) {
      this.http
        .delete('http://localhost:8080/usuario/eliminar/' + id)
        .subscribe((data) => this.finalizarDelete(data));
    }
  }

  finalizarDelete(data: any) {
    console.log(data);
    this.usuario = {};
    this.buscarUsuarios();
    alert("Usuario eliminado");
  }

  BloquearUsuario(estado: String) {
    this.http
      .put('http://localhost:8080/usuario/' + estado + '/' + this.usuario.idUsuario, {})
      .subscribe((data) => this.finalbloqueo(data));
  }

  finalbloqueo(data: any) {
    console.log(data);
    this.usuario = {};
    this.buscarUsuarios();
    alert("usuario Bloqueado")
  }

  Bloquear(objeto: any) {
    this.usuario = objeto;
    if (this.usuario.estado.toLowerCase() === 'activo'.toLowerCase()) {
      this.estado = 'Bloqueado';
      this.BloquearUsuario(this.estado);
    } else {
      this.estado = 'Activo';
      this.BloquearUsuario(this.estado);
    }
  }
}
