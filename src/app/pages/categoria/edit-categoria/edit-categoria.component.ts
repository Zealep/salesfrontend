import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaService } from './../../../service/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from './../../../model/categoria';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit-categoria.component.html',
  styleUrls: ['./edit-categoria.component.scss']
})
export class EditCategoriaComponent implements OnInit {

  id: number;
  categoria: Categoria;

  constructor(private route: ActivatedRoute,
              private service: CategoriaService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() :void{
    this.id = +this.route.snapshot.paramMap.get('id');
    // GET /products/:id
    this.service.getById(this.id)
      .pipe(
        catchError(error => {
          this.snackBar.open('No se puede obtener la categoria, intentalo mas tarde', null, {
            duration: 3000
          })
          return EMPTY;
        })
      )
      .subscribe(categoria => {
        this.categoria = categoria;
      });
  }

  submit(categoria : Categoria) {
    categoria.idCategoria = this.id;
    this.service.save(categoria)
      .subscribe(result => {
        this.router.navigate(['/pages/categoria']);
        this.snackBar.open('La categoria fue modificada', 'Cerrar', {
          duration: 3000
        });
    });
  }

  cancel() {
    this.router.navigate(['/pages/categoria']);
  }


}
