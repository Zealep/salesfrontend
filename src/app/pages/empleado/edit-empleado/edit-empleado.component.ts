import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpleadoService } from '../../../service/empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/model/empleado';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-edit-empleado',
  templateUrl: './edit-empleado.component.html',
  styleUrls: ['./edit-empleado.component.scss']
})
export class EditEmpleadoComponent implements OnInit {

  id: number;
  empleado: Empleado;

  constructor(private route: ActivatedRoute,
              private service: EmpleadoService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() :void{
    this.id = +this.route.snapshot.paramMap.get('id');
    this.service.getById(this.id)
      .pipe(
        catchError(error => {
          this.snackBar.open('No se puede obtener el empleado, intentalo mas tarde', null, {
            duration: 3000
          })
          return EMPTY;
        })
      )
      .subscribe(empleado => {
        this.empleado = empleado;
      });
  }

  submit(empleado : Empleado) {
    empleado.idEmpleado = this.id;
    this.service.save(empleado)
      .subscribe(result => {
        this.router.navigate(['/pages/empleado']);
        this.snackBar.open('El empleado fue modificado', 'Cerrar', {
          duration: 3000
        });
    });
  }

  cancel() {
    this.router.navigate(['/pages/empleado']);
  }
}
