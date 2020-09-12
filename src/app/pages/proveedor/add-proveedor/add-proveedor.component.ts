import { catchError } from 'rxjs/operators';
import { Proveedor } from './../../../model/proveedor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProveedorService } from './../../../service/proveedor.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-add-proveedor',
  templateUrl: './add-proveedor.component.html',
  styleUrls: ['./add-proveedor.component.scss']
})
export class AddProveedorComponent implements OnInit {

  constructor(private service: ProveedorService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  submit(proveedor: Proveedor) {
    this.service.save(proveedor)
      .pipe(
        catchError(error => {
          this.snackBar.open(error, null, {
            duration: 3000
          });
          return EMPTY;
        })
      )
      .subscribe(result => {
        this.router.navigate(['/pages/proveedor']);
        this.snackBar.open('Proveedor fue registrado', 'Cerrar', {
          duration: 3000
        });
      });
  }

  cancel() {
    this.router.navigate(['/pages/proveedor']);
  }

}
