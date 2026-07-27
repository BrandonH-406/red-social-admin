import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bienvenida',
  standalone: false,
  templateUrl: './bienvenida.html',
  styleUrl: './bienvenida.scss',
})
export class Bienvenida {
  nombre: string = '';

  administrador: any = {};

  administradores: any = [];

  calificacion: any = {};

  calificaciones: any = [];

  readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
    let usuario: any = localStorage.getItem('administrador');

    if (usuario) {
      this.buscarAdministrador();
      this.buscarcalificacion();
    } else {
      location.href = '';
    }
  }

  guardarAdministrador() {
    if (this.VerificarPassword(this.administrador.password)) {
      let form: any = document.getElementById('formulario');
      if (form.reportValidity()) {
        this.http
          .post('http://localhost:8080/administrador/guardar', this.administrador)
          .subscribe((data) => this.finalizarGuardar(data));
      }
    } else {
      alert(
        'La contraseña no cumple con los requisitos:\n' +
          '- Al menos 6 caracteres\n' +
          '- Una mayúscula\n' +
          '- Una minúscula\n' +
          '- Un número\n' +
          '- Un carácter especial (@$!%*?&)'
      );
    }
  }

  finalizarGuardar(data: any) {
    console.log(data);
    alert('Administrador creado');
    this.buscarAdministrador();
    this.administrador = {};
  }

  saludar() {
    alert('Hola ' + this.nombre);
  }

  servicioBuscarAdministradores(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/administrador/buscar');
  }

  buscarAdministrador() {
    this.servicioBuscarAdministradores().subscribe((data) => (this.administradores = data));
  }

  eliminarAdministrador() {
    const id = this.administrador.idAdministrador;
    let form: any = document.getElementById('formulario');
    if (form.reportValidity()) {
      this.http
        .delete('http://localhost:8080/administrador/eliminar/' + id)
        .subscribe((data) => this.finalizarDelete(data));
    }
  }

  finalizarDelete(data: any) {
    console.log(data);
    this.buscarAdministrador();
  }

  actualizarAdministrador() {
    let form: any = document.getElementById('formularioU');
    if (form.reportValidity()) {
      const id = this.administrador.idAdministrador;
      this.http
        .put('http://localhost:8080/administrador/actualizar/' + id, this.administrador)
        .subscribe((data) => this.finalizarUpdate(data));
    }
  }

  finalizarUpdate(data: any) {
    console.log(data);
    alert('Administrador actualizado');
    this.buscarAdministrador();
  }

  crearCalificacion() {
    let form: any = document.getElementById('formularioCali');
    if (form.reportValidity()) {
      this.http
        .post('http://localhost:8080/calificacion/guardar', this.calificacion)
        .subscribe((data) => this.finalizarGuardarC(data));
    }
  }

  finalizarGuardarC(data: any) {
    console.log(data);
    alert('Calificacion Creada');
    this.buscarcalificacion();
  }

  servicioBuscarCalificacion(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/calificacion/buscar');
  }

  buscarcalificacion() {
    this.servicioBuscarCalificacion().subscribe((data) => (this.calificaciones = data));
  }

  modificar(objeto: any) {
    this.administrador = objeto;
  }

  VerificarPassword(password: string) {
    let tieneMayuscula = false;
    let tieneMinuscula = false;
    let tieneNumero = false;
    let tieneEspecial = false;

    const especiales = '@$!%*?&¿/#¡';

    if (password.length < 6) return false;

    for (const char of password) {
      if (char >= 'A' && char <= 'Z') {
        tieneMayuscula = true;
      } else if (char >= 'a' && char <= 'z') {
        tieneMinuscula = true;
      } else if (char >= '0' && char <= '9') {
        tieneNumero = true;
      } else if (especiales.includes(char)) {
        tieneEspecial = true;
      }
    }

    return tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial;
  }
}
