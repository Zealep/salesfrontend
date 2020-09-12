import { catchError } from 'rxjs/operators';
import { Cliente } from './../../../model/cliente';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from './../../../service/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.scss']
})
export class AddClienteComponent implements OnInit {

  constructor(private service: ClienteService,
    private router: Router,
    private snackBar: MatSnackBar) { }

ngOnInit() :void {
}

submit(cliente: Cliente) {
this.service.save(cliente)
.pipe(
catchError(error => {
this.snackBar.open(error, null, {
  duration: 3000
});
return EMPTY;
})
)
.subscribe(result => {
this.router.navigate(['/pages/cliente']);
this.snackBar.open('Cliente fue registrado', 'Cerrar', {
duration: 3000
});
});
}

cancel() {
this.router.navigate(['/pages/cliente']);
}

}
