import { ConfirmDialogModel } from './../../shared/models/confirm-dialog-model';
import { ConfirmDialogComponent } from './../../shared/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoDocumentoService } from './../../service/tipo-documento.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TipoDocumento } from './../../model/tipo-documento';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.scss']
})
export class TipoDocumentoComponent implements OnInit {
  
  list: TipoDocumento[] = [];
  displayedColumns: string[] = [ 'nombre','acciones'];
  dataSource: MatTableDataSource<TipoDocumento>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private tipoDocumentoService: TipoDocumentoService,
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
    this.tipoDocumentoService.getAll().subscribe(data => {
      let tipos = JSON.parse(JSON.stringify(data));
      this.dataSource = new MatTableDataSource(tipos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;    
    });
  }

  delete(tipo: TipoDocumento){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: <ConfirmDialogModel>{
        title: 'Eliminar tipo de documento',
        message: 'Deseas borrar el tipo de documento?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result) {
          this.sendDeleteRequest(tipo);
        }
      });
  }

  private sendDeleteRequest(tipo: TipoDocumento) {
    this.tipoDocumentoService.eliminar(tipo.idTipoDocumento)
    .subscribe(response => {
      this.load();
      this.snackBar.open('Tipo de documento eliminado', 'Cerrar', {
        duration: 3000
      });
    });
  }
  



}
