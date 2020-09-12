import { TipoDocumento } from './../../../model/tipo-documento';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoDocumentoService } from './../../../service/tipo-documento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-edit-tipo-documento',
  templateUrl: './edit-tipo-documento.component.html',
  styleUrls: ['./edit-tipo-documento.component.scss']
})
export class EditTipoDocumentoComponent implements OnInit {

  id: number;
  tipo: TipoDocumento;

  constructor(private route: ActivatedRoute,
              private service: TipoDocumentoService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() :void{
    this.id = +this.route.snapshot.paramMap.get('id');
    this.service.getById(this.id)
      .pipe(
        catchError(error => {
          this.snackBar.open('No se puede obtener el tipo de documento, intentalo mas tarde', null, {
            duration: 3000
          })
          return EMPTY;
        })
      )
      .subscribe(tipo => {
        this.tipo = tipo;
      });
  }

  submit(tipo : TipoDocumento) {
    tipo.idTipoDocumento = this.id;
    this.service.save(tipo)
      .subscribe(result => {
        this.router.navigate(['/pages/tipo-documento']);
        this.snackBar.open('El tipo documento fue modificado', 'Cerrar', {
          duration: 3000
        });
    });
  }

  cancel() {
    this.router.navigate(['/pages/tipo-documento']);
  }


}
