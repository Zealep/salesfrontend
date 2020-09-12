import { ConfirmDialogModel } from './../../shared/models/confirm-dialog-model';
import { ConfirmDialogComponent } from './../../shared/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpleadoService } from './../../service/empleado.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from './../../model/empleado';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {

  list: Empleado[] = [];
  displayedColumns: string[] = ['apellidos','nombres','fechaNacimiento','direccion','telefono','celular','correo','acciones'];
  dataSource: MatTableDataSource<Empleado>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private empleadoService: EmpleadoService,
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
    this.empleadoService.getAll().subscribe(data => {
      let tipos = JSON.parse(JSON.stringify(data));
      this.dataSource = new MatTableDataSource(tipos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;    
    });
  }

  delete(empleado: Empleado){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: <ConfirmDialogModel>{
        title: 'Eliminar empleado',
        message: 'Deseas borrar el empleado?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result) {
          this.sendDeleteRequest(empleado);
        }
      });
  }

  private sendDeleteRequest(empleado: Empleado) {
    this.empleadoService.eliminar(empleado.idEmpleado)
    .subscribe(response => {
      this.load();
      this.snackBar.open('Empleado eliminado', 'Cerrar', {
        duration: 3000
      });
    });
  }
  

}
