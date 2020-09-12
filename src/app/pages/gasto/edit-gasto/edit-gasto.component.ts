import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GastoService } from './../../../service/gasto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Gasto } from 'src/app/model/gasto';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-edit-gasto',
  templateUrl: './edit-gasto.component.html',
  styleUrls: ['./edit-gasto.component.scss']
})
export class EditGastoComponent implements OnInit {

  id: number;
  gasto: Gasto;

  constructor(private route: ActivatedRoute,
              private service: GastoService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() :void{
    this.id = +this.route.snapshot.paramMap.get('id');
    this.service.getById(this.id)
      .pipe(
        catchError(error => {
          this.snackBar.open('No se puede obtener el gasto, intentalo mas tarde', null, {
            duration: 3000
          })
          return EMPTY;
        })
      )
      .subscribe(gasto => {
        this.gasto = gasto;
      });
  }

  submit(gasto : Gasto) {
    gasto.idGasto = this.id;
    this.service.save(gasto)
      .subscribe(result => {
        this.router.navigate(['/pages/gasto']);
        this.snackBar.open('El gasto fue modificado', 'Cerrar', {
          duration: 3000
        });
    });
  }

  cancel() {
    this.router.navigate(['/pages/gasto']);
  }
}
