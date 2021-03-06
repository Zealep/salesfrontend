import { ConfirmDialogModel } from './../../shared/models/confirm-dialog-model';
import { ConfirmDialogComponent } from './../../shared/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompraService } from './../../service/compra.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Compra } from './../../model/compra';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent implements OnInit {

  list: Compra[] = [];
  displayedColumns: string[] = [ 'proveedor', 'codigo','fecha','subtotal','igv','total','acciones'];
  dataSource: MatTableDataSource<Compra>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private compraService: CompraService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute ,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.load();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private load(){
    this.compraService.getAll().subscribe(data => {
      let productos = JSON.parse(JSON.stringify(data));
      this.dataSource = new MatTableDataSource(productos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  delete(compra: Compra){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: <ConfirmDialogModel>{
        title: 'Anular compra',
        message: 'Deseas anular la compra?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result) {
          this.sendDeleteRequest(compra);
        }
      });
  }

  private sendDeleteRequest(compra: Compra) {
    this.compraService.eliminar(compra.idCompra)
    .subscribe(response => {
      this.load();
      this.snackBar.open('Compra anulada', 'Cerrar', {
        duration: 3000
      });
    });
  }

  callEdit(idCompra: number){
    this.router.navigate(['/pages/compra/form',{buy:idCompra}]);
  }

}
