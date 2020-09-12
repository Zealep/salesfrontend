import { DetailsCompraComponent } from './../details-compra/details-compra.component';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleCompra } from './../../../model/detalle-compra';
import { Compra } from './../../../model/compra';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompraService } from './../../../service/compra.service';
import { EmpleadoService } from './../../../service/empleado.service';
import { ProveedorService } from './../../../service/proveedor.service';
import { TipoDocumentoService } from './../../../service/tipo-documento.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Empleado } from './../../../model/empleado';
import { Proveedor } from './../../../model/proveedor';
import { TipoDocumento } from './../../../model/tipo-documento';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-compra',
  templateUrl: './form-compra.component.html',
  styleUrls: ['./form-compra.component.scss']
})
export class FormCompraComponent implements OnInit {

  tipoDocumentos: TipoDocumento[] = [];
  proveedores: Proveedor[] = [];
  myControlProveedor: FormControl = new FormControl();
  filteredOptionsProveedor: Observable<any[]>;
  proveedorSeleccionado: Proveedor;
  idProveedor: number;

  empleados: Empleado[] = [];
  myControlEmpleado: FormControl = new FormControl();
  filteredOptionsEmpleado: Observable<any[]>;
  empleadoSeleccionado: Empleado;
  idEmpleado: number;

  displayedColumns: string[] = ['codigo', 'nombre', 'cantidad', 'precio', 'total', 'acciones'];
  //displayedIGV: string[] = ['igvTitle', 'empty', 'empty', 'empty', 'igvCantidad', 'empty'];
  //displayedTotal: string[] = ['totalTitle', 'empty', 'empty', 'empty', 'totalCantidad', 'empty'];

  dataProductos: MatTableDataSource<DetalleCompra>;
  compraDetalles: DetalleCompra[] = [];


  idCompra: number;

  form: FormGroup = new FormGroup({
    tipoDocumento: new FormControl(''),
    proveedor: new FormControl(''),
    empleado: new FormControl(''),
    codigo: new FormControl(''),
    fecha: new FormControl(''),
    subTotal: new FormControl(''),
    igv: new FormControl(''),
    total: new FormControl('')
  });


  constructor(private tipoDocumentoService: TipoDocumentoService,
    private proveedorService: ProveedorService,
    private empleadoService: EmpleadoService,
    private compraService: CompraService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    public dialog:MatDialog) { }

  ngOnInit(): void {
    this.idCompra = +this.route.snapshot.paramMap.get('buy');
    this.loadCompra(this.idCompra);
    this.listTipoDocumentos();
    this.listProveedores();
    this.listEmpleados();
    this.dataProductos = new MatTableDataSource(this.compraDetalles);

    this.filteredOptionsProveedor = this.myControlProveedor.valueChanges
      .pipe(
        startWith(null),
        map(val => this.filterProveedor(val))
      );

    this.filteredOptionsEmpleado = this.myControlEmpleado.valueChanges
      .pipe(
        startWith(null),
        map(val => this.filterEmpleado(val))
      );
  }

  getTotalCost() {
    return this.dataProductos.data.reduce((summ, v) => summ += v.total, 0);
  }

  getIGV(){
      let total = this.dataProductos.data.reduce((summ, v) => summ += v.total, 0);
      return total*0.18;
  }

  getSubTotal(){
      return this.getTotalCost()-this.getIGV();
  }

  removeProducto(index: number, t: DetalleCompra) {
    this.compraDetalles.splice(index, 1);
    this.refreshDataSource();
  }

  refreshDataSource() {
    this.dataProductos = new MatTableDataSource(this.compraDetalles);

  }

  listTipoDocumentos() {
    this.tipoDocumentoService.getAll()
      .subscribe(x => {
        this.tipoDocumentos = x;
      })

  }

  listProveedores() {
    this.proveedorService.getAll()
      .subscribe(x => {
        this.proveedores = x;
      })

  }

  private filterProveedor(val: any) {
    if (val != null && val.idProveedor > 0) {
      return this.proveedores.filter(option =>
        option.nombre.toLowerCase().includes(val.nombre.toLowerCase()));
    } else {
      return this.proveedores.filter(option =>
        option.nombre.toLowerCase().includes(val.toLowerCase()));
    }
  }

  displayFnProveedor(val: Proveedor) {
    return val ? `${val.nombre} - ${val.ruc}` : val;
  }

  seleccionarProveedor(e) {
    this.proveedorSeleccionado = e.option.value;
  }

  listEmpleados() {
    this.empleadoService.getAll()
      .subscribe(x => {
        this.empleados = x;
      })

  }

  private filterEmpleado(val: any) {
    if (val != null && val.idEmpleado > 0) {
      return this.empleados.filter(option =>
        option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()));
    } else {
      return this.empleados.filter(option =>
        option.apellidos.toLowerCase().includes(val.toLowerCase()));
    }
  }

  displayFnEmpleado(val: Empleado) {
    return val ? `${val.apellidos} ${val.nombres}` : val;
  }

  seleccionarEmpleado(e) {
    this.empleadoSeleccionado = e.option.value;
  }

  grabar() {
    console.log('form', this.form);

    let compra = new Compra();
    let tipoDocumento = new TipoDocumento();


    if (this.idCompra != 0) {
      compra.idCompra = this.idCompra;
    }
    tipoDocumento.idTipoDocumento = this.form.get('tipoDocumento').value;
    compra.tipoDocumento = tipoDocumento;
    compra.proveedor = this.proveedorSeleccionado;
    compra.empleado = this.empleadoSeleccionado;
    compra.codigo = this.form.get('codigo').value;
    compra.fecha = this.form.get('fecha').value;
    compra.detallesCompra = this.compraDetalles;

    compra.subTotal = this.getSubTotal();
    compra.igv = this.getIGV();
    compra.total = this.getTotalCost();

    this.compraService.save(compra)
      .subscribe(result => {
        this.router.navigate(['/pages/compra']);
        if (this.idCompra == 0) {
          this.snackBar.open('Compra fue registrada', 'Cerrar', {
            duration: 3000
          });
        }
        else {
          this.snackBar.open('Compra fue modificada', 'Cerrar', {
            duration: 3000
          });
        }
      });
  }

  loadCompra(id: number) {
    if (id != 0) {
      this.compraService.getById(id)
        .subscribe(r => {
          this.form.controls['tipoDocumento'].setValue(r.tipoDocumento.idTipoDocumento);
          this.form.controls['proveedor'].setValue(r.proveedor.idProveedor);
          this.form.controls['empleado'].setValue(r.empleado.idEmpleado);
          this.form.controls['codigo'].setValue(r.codigo);
          this.form.controls['fecha'].setValue(r.codigo);
          this.form.controls['subTotal'].setValue(r.subTotal);
          this.form.controls['igv'].setValue(r.igv);
          this.form.controls['total'].setValue(r.total);

        })

    }
  }

  cancelar() {
    this.router.navigate(['/pages/compra']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DetailsCompraComponent, {
      width: '550px'

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result != null) {

        if (!this.validResponseDialog(result)) {
          this.compraDetalles.push(result);
          this.refreshDataSource();
        }
        else {
          this.snackBar.open('Completa los datos obligatorios del producto', 'Close', {
            duration: 5000
          });
        }
      }

    });
  }

  validResponseDialog(det: DetalleCompra): boolean {
    return (det.producto.idProducto == null || det.precioCompra == null || det.cantidad == null
    )
  }
}
