import { Proveedor } from './../../../model/proveedor';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-proveedor',
  templateUrl: './form-proveedor.component.html',
  styleUrls: ['./form-proveedor.component.scss']
})
export class FormProveedorComponent implements OnInit {

  form: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    dni: new FormControl(''),
    ruc: new FormControl(''),
    correo: new FormControl(''),
    telefono: new FormControl(''),
    direccion: new FormControl(''),
    cuenta1: new FormControl(''),
    cuenta2: new FormControl(''),
    observacion: new FormControl('')
  });

  @Input() title: string;
  @Input() labelSubmit: string;
  @Input()
  set model(m: Proveedor){
    if(!m) {
      return;
    }
    this.form.patchValue(m);
  }

  @Output() enviar: EventEmitter<Proveedor> = new EventEmitter<Proveedor>();
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
