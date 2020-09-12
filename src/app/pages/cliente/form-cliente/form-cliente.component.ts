import { Cliente } from './../../../model/cliente';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.scss']
})
export class FormClienteComponent implements OnInit {

  form: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    dni: new FormControl(''),
    ruc: new FormControl(''),
    correo: new FormControl(''),
    telefono: new FormControl(''),
    direccion: new FormControl(''),
    observacion: new FormControl('')
  });

  @Input() title: string;
  @Input() labelSubmit: string;
  @Input()
  set model(m: Cliente){ 
    if(!m) {
      return;
    }
    this.form.patchValue(m);
  }

  @Output() enviar: EventEmitter<Cliente> = new EventEmitter<Cliente>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();


  constructor() { }

  ngOnInit():void {
  }

  onSubmit() {
    if(this.form.valid) {
      this.enviar.emit(this.form.value); // Enviamos el modelo de datos: Egreso
    } else {
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
