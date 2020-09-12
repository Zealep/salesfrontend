import { ConfirmDialogModel } from './../../shared/models/confirm-dialog-model';
import { ConfirmDialogComponent } from './../../shared/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GastoService } from './../../service/gasto.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Gasto } from './../../model/gasto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.scss']
})
export class GastoComponent implements OnInit {

  list: Gasto[] = [];
  displayedColumns: string[] = ['fechaGasto','descripcion','costo','acciones'];
  dataSource: MatTableDataSource<Gasto>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private gastoService: GastoService,
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
    this.gastoService.getAll().subscribe(data => {
      let tipos = JSON.parse(JSON.stringify(data));
      this.dataSource = new MatTableDataSource(tipos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;    
    });
  }

  delete(gasto: Gasto){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: <ConfirmDialogModel>{
        title: 'Eliminar gasto',
        message: 'Deseas borrar el gasto?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result) {
          this.sendDeleteRequest(gasto);
        }
      });
  }

  private sendDeleteRequest(gasto: Gasto) {
    this.gastoService.eliminar(gasto.idGasto)
    .subscribe(response => {
      this.load();
      this.snackBar.open('Gasto eliminado', 'Cerrar', {
        duration: 3000
      });
    });
  }
  

}
