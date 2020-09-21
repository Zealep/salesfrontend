import { DetalleVenta } from './../../../model/detalle-venta';
import { startWith, map, catchError } from 'rxjs/operators';
import { DetailsCompraComponent } from './../../compra/details-compra/details-compra.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from './../../../service/producto.service';
import { Observable, EMPTY } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Producto } from './../../../model/producto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-venta',
  templateUrl: './details-venta.component.html',
  styleUrls: ['./details-venta.component.scss']
})
export class DetailsVentaComponent implements OnInit {

  productos: Producto[] = [];
  myControlProducto: FormControl = new FormControl();
  filteredOptionsProducto: Observable<any[]>;
  productoSeleccionado: Producto;

  idProductoModel: number;
  cantidadModel: number;
  precioModel: number;
  totalModel: string;

  constructor(private productoService: ProductoService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DetailsCompraComponent>
    ) { }

  ngOnInit(): void {
    this.listProductos();
    this.filteredOptionsProducto = this.myControlProducto.valueChanges
    .pipe(
      startWith(null),
      map(val => this.filterProducto(val))
    );
  }


  private listProductos() {
    this.productoService.getAll()
      .pipe(
        catchError(error => {
          this.snackBar.open('No se pudo obtener los productos, intentalo mas tarde', null, {
            duration: 3000
          });
          return EMPTY;
        })
      )
      .subscribe(producto => {
        this.productos = producto;
      });
  }

  private filterProducto(val: any) {
    if (val != null && val.idProducto > 0) {
      return this.productos.filter(option =>
        option.nombre.toLowerCase().includes(val.nombre.toLowerCase()));
    } else {
      return this.productos.filter(option =>
        option.nombre.toLowerCase().includes(val.toLowerCase()));
    }
  }

  displayFnProducto(val: Producto) {
    return val ? `${val.nombre}` : val;
  }

  seleccionarProducto(e) {
    this.productoSeleccionado = e.option.value;
  }

  send(){

      let detalleVenta = new DetalleVenta();
      let producto = new Producto();
      producto = this.productoSeleccionado;
      detalleVenta.producto = producto;
      detalleVenta.cantidad = this.cantidadModel;
      detalleVenta.precio = this.precioModel;
      detalleVenta.total = this.cantidadModel * this.precioModel;
      this.dialogRef.close(detalleVenta);

  }

  close(){
    this.dialogRef.close();
  }

}

