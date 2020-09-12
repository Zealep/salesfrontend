import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoDocumentoService } from './../../../service/tipo-documento.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoDocumento } from 'src/app/model/tipo-documento';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-add-tipo-documento',
  templateUrl: './add-tipo-documento.component.html',
  styleUrls: ['./add-tipo-documento.component.scss']
})
export class AddTipoDocumentoComponent implements OnInit {
   
  constructor(private service: TipoDocumentoService,
    private router: Router,
    private snackBar: MatSnackBar) { }

ngOnInit() :void {
}

submit(tipo: TipoDocumento) {
this.service.save(tipo)
.pipe(
catchError(error => {
this.snackBar.open(error, null, {
  duration: 3000
});
return EMPTY;
})
)
.subscribe(result => {
this.router.navigate(['/pages/tipo-documento']);
this.snackBar.open('Tipo de documento fue registrado', 'Cerrar', {
duration: 3000
});
});
}

cancel() {
this.router.navigate(['/pages/tipo-documento']);
}
}
