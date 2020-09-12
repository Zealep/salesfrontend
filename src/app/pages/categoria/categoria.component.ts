import { ConfirmDialogComponent } from './../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from './../../shared/models/confirm-dialog-model';
import { CategoriaService } from './../../service/categoria.service';
import { Categoria } from './../../model/categoria';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  list: Categoria[] = [];
  displayedColumns: string[] = [ 'nombre', 'descripcion','acciones'];
  dataSource: MatTableDataSource<Categoria>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private categoriaService: CategoriaService,
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
    this.categoriaService.getAll().subscribe(data => {
      let categorias = JSON.parse(JSON.stringify(data));
      this.dataSource = new MatTableDataSource(categorias);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;    
    });
  }

  delete(categoria: Categoria){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: <ConfirmDialogModel>{
        title: 'Eliminar categoria',
        message: 'Deseas borrar la categoria?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result) {
          this.sendDeleteRequest(categoria);
        }
      });
  }

  private sendDeleteRequest(categoria: Categoria) {
    this.categoriaService.eliminar(categoria.idCategoria)
    .subscribe(response => {
      this.load();
      this.snackBar.open('Categoria eliminada', 'Cerrar', {
        duration: 3000
      });
    });
  }
  



}
