import { catchError } from 'rxjs/operators';
import { Categoria } from './../../../model/categoria';
import { CategoriaService } from './../../../service/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.scss']
})
export class AddCategoriaComponent implements OnInit {

  constructor(private service: CategoriaService,
    private router: Router,
    private snackBar: MatSnackBar) { }

ngOnInit() :void {
}

submit(categoria: Categoria) {
this.service.save(categoria)
.pipe(
catchError(error => {
this.snackBar.open(error, null, {
  duration: 3000
});
return EMPTY;
})
)
.subscribe(result => {
this.router.navigate(['/pages/categoria']);
this.snackBar.open('Categoria fue registrada', 'Cerrar', {
duration: 3000
});
});
}

cancel() {
this.router.navigate(['/pages/categoria']);
}
}
