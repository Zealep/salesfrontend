import { ConfirmDialogModel } from './../../shared/models/confirm-dialog-model';
import { ConfirmDialogComponent } from './../../shared/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProveedorService } from './../../service/proveedor.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Proveedor } from './../../model/proveedor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {

  list: Proveedor[] = [];
  displayedColumns: string[] = ['nombre','dni','ruc','correo','telefono','direccion','observacion','acciones'];
  dataSource: MatTableDataSource<Proveedor>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private proveedorService: ProveedorService,
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
    this.proveedorService.getAll().subscribe(data => {
      let tipos = JSON.parse(JSON.stringify(data));
      this.dataSource = new MatTableDataSource(tipos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  delete(proveedor: Proveedor){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: <ConfirmDialogModel>{
        title: 'Eliminar proveedor',
        message: 'Deseas borrar el proveedor?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result) {
          this.sendDeleteRequest(proveedor);
        }
      });
  }

  private sendDeleteRequest(proveedor: Proveedor) {
    this.proveedorService.eliminar(proveedor.idProveedor)
    .subscribe(response => {
      this.load();
      this.snackBar.open('Proveedor eliminado', 'Cerrar', {
        duration: 3000
      });
    });
  }

}
