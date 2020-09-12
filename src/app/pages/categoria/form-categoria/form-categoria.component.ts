import { Categoria } from './../../../model/categoria';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.scss']
})
export class FormCategoriaComponent implements OnInit {

  form: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl('')
  });

  @Input() title: string;
  @Input() labelSubmit: string;
  @Input()
  set model(m: Categoria){ 
    if(!m) {
      return;
    }
    this.form.patchValue(m);
  }

  @Output() enviar: EventEmitter<Categoria> = new EventEmitter<Categoria>();
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
