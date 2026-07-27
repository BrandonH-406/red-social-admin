import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('proyecto');

  Administradorexiste: boolean = false;
  
  constructor(){

    let usuario:any = localStorage.getItem("administrador");
    this.Administradorexiste =usuario?true:false;


  }

  logout(){
    localStorage.clear();
  }
  
}
