import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProveedorService } from './../../../service/proveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from './../../../model/proveedor';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-edit-proveedor',
  templateUrl: './edit-proveedor.component.html',
  styleUrls: ['./edit-proveedor.component.scss']
})
export class EditProveedorComponent implements OnInit {

  id: number;
  proveedor: Proveedor;

  constructor(private route: ActivatedRoute,
              private service: ProveedorService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() :void{
    this.id = +this.route.snapshot.paramMap.get('id');
    this.service.getById(this.id)
      .pipe(
        catchError(error => {
          this.snackBar.open('No se puede obtener el proveedor, intentalo mas tarde', null, {
            duration: 3000
          })
          return EMPTY;
        })
      )
      .subscribe(proveedor => {
        this.proveedor = proveedor;
      });
  }

  submit(proveedor : Proveedor) {
    proveedor.idProveedor = this.id;
    this.service.save(proveedor)
      .subscribe(result => {
        this.router.navigate(['/pages/proveedor']);
        this.snackBar.open('El proveedor fue modificado', 'Cerrar', {
          duration: 3000
        });
    });
  }

  cancel() {
    this.router.navigate(['/pages/proveedor']);
  }
}
