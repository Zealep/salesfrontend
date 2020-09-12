import { TipoDocumento } from './../../../model/tipo-documento';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-tipo-documento',
  templateUrl: './form-tipo-documento.component.html',
  styleUrls: ['./form-tipo-documento.component.scss']
})
export class FormTipoDocumentoComponent implements OnInit {
  
  form: FormGroup = new FormGroup({
    nombre: new FormControl('')
  });

  @Input() title: string;
  @Input() labelSubmit: string;
  @Input()
  set model(m: TipoDocumento){ 
    if(!m) {
      return;
    }
    this.form.patchValue(m);
  }

  @Output() enviar: EventEmitter<TipoDocumento> = new EventEmitter<TipoDocumento>();
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
