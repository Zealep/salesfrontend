import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpleadoService } from '../../../service/empleado.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/model/empleado';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-add-empleado',
  templateUrl: './add-empleado.component.html',
  styleUrls: ['./add-empleado.component.scss']
})
export class AddEmpleadoComponent implements OnInit {

  constructor(private service: EmpleadoService,
    private router: Router,
    private snackBar: MatSnackBar) { }

ngOnInit() :void {
}

submit(empleado: Empleado) {
this.service.save(empleado)
.pipe(
catchError(error => {
this.snackBar.open(error, null, {
  duration: 3000
});
return EMPTY;
})
)
.subscribe(result => {
this.router.navigate(['/pages/empleado']);
this.snackBar.open('Empleado fue registrado', 'Cerrar', {
duration: 3000
});
});
}

cancel() {
this.router.navigate(['/pages/empleado']);
}
}
