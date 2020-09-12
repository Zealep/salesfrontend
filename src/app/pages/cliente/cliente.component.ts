import { ConfirmDialogModel } from './../../shared/models/confirm-dialog-model';
import { ConfirmDialogComponent } from './../../shared/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from './../../service/cliente.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from './../../model/cliente';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  list: Cliente[] = [];
  displayedColumns: string[] = ['nombre','dni','ruc','correo','telefono','direccion','observacion','acciones'];
  dataSource: MatTableDataSource<Cliente>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute ,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.load();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private load(){
    this.clienteService.getAll().subscribe(data => {
      let tipos = JSON.parse(JSON.stringify(data));
      this.dataSource = new MatTableDataSource(tipos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;    
    });
  }

  delete(cliente: Cliente){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: <ConfirmDialogModel>{
        title: 'Eliminar cliente',
        message: 'Deseas borrar el cliente?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result) {
          this.sendDeleteRequest(cliente);
        }
      });
  }

  private sendDeleteRequest(cliente: Cliente) {
    this.clienteService.eliminar(cliente.idCliente)
    .subscribe(response => {
      this.load();
      this.snackBar.open('Cliente eliminado', 'Cerrar', {
        duration: 3000
      });
    });
  }
  
}
