import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  administrador:any = {};


  readonly http:HttpClient;

  constructor(http:HttpClient){

    this.http = http;

  }
/* comando para correr codigo ng serve  comando para crear una pagina nueva ng g c login*/ 
  login(){
    let form:any = document.getElementById("formulario");
    if(form.reportValidity()){
      this.http.post("http://localhost:8080/administrador/login",this.administrador).subscribe(
        data => this.validar(data)
      )
    }
  }

  validar(data:any){
    if(data[0]){
      location.href="/dashboard";
      localStorage.setItem("administrador",JSON.stringify(data[0]));
    } else{
      alert("Usuario o Password invalido");
    }
  }
}
