import { Gasto } from './../../../model/gasto';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-gasto',
  templateUrl: './form-gasto.component.html',
  styleUrls: ['./form-gasto.component.scss']
})
export class FormGastoComponent implements OnInit {

  
  form: FormGroup = new FormGroup({
    fechaGasto: new FormControl(''),
    descripcion: new FormControl(''),
    costo: new FormControl('')
  });

  @Input() title: string;
  @Input() labelSubmit: string;
  @Input()
  set model(m: Gasto){ 
    if(!m) {
      return;
    }
    this.form.patchValue(m);
  }

  @Output() enviar: EventEmitter<Gasto> = new EventEmitter<Gasto>();
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
