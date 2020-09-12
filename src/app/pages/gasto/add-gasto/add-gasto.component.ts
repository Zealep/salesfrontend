import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GastoService } from './../../../service/gasto.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gasto } from 'src/app/model/gasto';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-add-gasto',
  templateUrl: './add-gasto.component.html',
  styleUrls: ['./add-gasto.component.scss']
})
export class AddGastoComponent implements OnInit {

  constructor(private service: GastoService,
    private router: Router,
    private snackBar: MatSnackBar) { }

ngOnInit() :void {
}

submit(gasto: Gasto) {
this.service.save(gasto)
.pipe(
catchError(error => {
this.snackBar.open(error, null, {
  duration: 3000
});
return EMPTY;
})
)
.subscribe(result => {
this.router.navigate(['/pages/gasto']);
this.snackBar.open('Gasto fue registrado', 'Cerrar', {
duration: 3000
});
});
}

cancel() {
this.router.navigate(['/pages/gasto']);
}

}
