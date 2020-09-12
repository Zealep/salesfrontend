import { DetalleCompra } from './../../../model/detalle-compra';
import { startWith, map, catchError } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from './../../../service/producto.service';
import { Observable, EMPTY } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Producto } from './../../../model/producto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-compra',
  templateUrl: './details-compra.component.html',
  styleUrls: ['./details-compra.component.scss']
})
export class DetailsCompraComponent implements OnInit {

  productos: Producto[] = [];
  myControlProducto: FormControl = new FormControl();
  filteredOptionsProducto: Observable<any[]>;
  productoSeleccionado: Producto;

  idProductoModel: number;
  cantidadModel: number;
  precioCompraModel: number;
  precioVentaModel: number;
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

      let detalleCompra = new DetalleCompra();
      let producto = new Producto();
      producto = this.productoSeleccionado;
      detalleCompra.producto = producto;
      detalleCompra.cantidad = this.cantidadModel;
      detalleCompra.precioCompra = this.precioCompraModel;
      detalleCompra.precioVenta = this.precioVentaModel;
      detalleCompra.total = this.cantidadModel * this.precioCompraModel;
      this.dialogRef.close(detalleCompra);

  }

  close(){
    this.dialogRef.close();
  }

}

