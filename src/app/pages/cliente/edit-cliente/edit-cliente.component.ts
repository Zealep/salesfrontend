import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from './../../../service/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './../../../model/cliente';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.scss']
})
export class EditClienteComponent implements OnInit {

  id: number;
  cliente: Cliente;

  constructor(private route: ActivatedRoute,
              private service: ClienteService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() :void{
    this.id = +this.route.snapshot.paramMap.get('id');
    this.service.getById(this.id)
      .pipe(
        catchError(error => {
          this.snackBar.open('No se puede obtener el cliente, intentalo mas tarde', null, {
            duration: 3000
          })
          return EMPTY;
        })
      )
      .subscribe(cliente => {
        this.cliente = cliente;
      });
  }

  submit(cliente : Cliente) {
    cliente.idCliente = this.id;
    this.service.save(cliente)
      .subscribe(result => {
        this.router.navigate(['/pages/cliente']);
        this.snackBar.open('El cliente fue modificado', 'Cerrar', {
          duration: 3000
        });
    });
  }

  cancel() {
    this.router.navigate(['/pages/cliente']);
  }
}
